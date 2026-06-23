// ── echo-local-simple ──

function createLogger(ctx) {
  const noop = () => {};
  return { debug: noop, info: noop, warn: noop, error: noop };
}

const STORAGE_KEY = 'echo-local-simple-settings';
const _counts = {}; let _seq = 0; let _songs = [];
const _coverCache = new Map(); // id → data:URL，内存封面缓存，跨页面导航持久化

async function hashStr(s) { const d = new TextEncoder().encode(s); const h = await crypto.subtle.digest('SHA-256', d); return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0, 16); }

function parseFileName(name) {
  const b = (name.lastIndexOf('.') > 0 ? name.slice(0, name.lastIndexOf('.')) : name).replace(/^\d+\s*[.\-——]\s*/, '').trim();
  for (const s of [' - ', ' – ', ' — ']) { const i = b.indexOf(s); if (i > 0) { const a = b.slice(0, i).trim(), t = b.slice(i + s.length).trim(); if (a && t) return { artist: a, title: t }; } }
  return { artist: '未知歌手', title: b || '未知歌曲' };
}

async function loadSettings(ctx) { const s = await ctx.storage.get(STORAGE_KEY); if (!s || typeof s !== 'object') return { folders: [], showTag: false, useKugouCover: false }; return { folders: Array.isArray(s.folders) ? s.folders : [], showTag: !!s.showTag, useKugouCover: !!s.useKugouCover }; }
async function saveSettings(ctx, s) { await ctx.storage.set(STORAGE_KEY, s); }

/** 解析 ID3v2 标签，返回 { title, artist, album, coverUrl, lyric } */
function parseID3Meta(buf) {
  const r = { title: '', artist: '', album: '', coverUrl: '', lyric: '' };
  if (buf.length < 10 || buf[0] !== 0x49 || buf[1] !== 0x44 || buf[2] !== 0x33) return { ...r, _isID3: false };
  const v = buf[3];
  const tagSize = (v >= 4 ? ((buf[6] << 21) | (buf[7] << 14) | (buf[8] << 7) | buf[9]) : ((buf[6] << 24) | (buf[7] << 16) | (buf[8] << 8) | buf[9])) + 10;
  const end = Math.min(tagSize, buf.length); let p = 10;
  let iter = 0;
  while (p + 10 <= end && iter++ < 5000) {
    if (buf[p] === 0) break;
    const fid = String.fromCharCode(buf[p], buf[p + 1], buf[p + 2], buf[p + 3]);
    const fsz = v >= 4 ? ((buf[p + 4] << 21) | (buf[p + 5] << 14) | (buf[p + 6] << 7) | buf[p + 7]) : ((buf[p + 4] << 24) | (buf[p + 5] << 16) | (buf[p + 6] << 8) | buf[p + 7]);
    p += 10; if (fsz <= 0 || p + fsz > end) break;
    if ((fid === 'APIC' || fid === 'PIC') && !r.coverUrl) {
      try {
        let off = p + 1; const frameEnd = p + fsz;
        if (fid === 'PIC') off = p + 5;
        let me = off; while (me < frameEnd && buf[me] !== 0) me++;
        const mime = new TextDecoder('latin1').decode(new Uint8Array(buf.slice(off, me)));
        off = me + 1; if (fid !== 'PIC') off++;
        while (off < frameEnd && buf[off] !== 0) off++; off++;
        const imgLen = frameEnd - off;
        if (imgLen > 256 && mime.includes('image')) r.coverUrl = URL.createObjectURL(new Blob([new Uint8Array(buf.slice(off, frameEnd))], { type: mime }));
      } catch {}
      p += fsz; continue;
    }
    if ((fid === 'USLT' || fid === 'ULT') && !r.lyric) {
      try {
        const enc = buf[p];
        // 跳过 encoding(1) + language(3) + content descriptor(null-terminated)
        let off = p + 4;
        while (off < p + fsz && buf[off] !== 0) off++;
        off++;
        if (enc === 1 || enc === 2) { while (off < p + fsz && buf[off] === 0) off++; }
        const d = new Uint8Array(buf.slice(off, p + fsz));
        const dec = (e) => { if (e === 1 || e === 2) return new TextDecoder('utf-16le').decode(d.slice(2)); return new TextDecoder('utf-8').decode(d); };
        r.lyric = dec(enc).replace(/\0/g, '').trim();
      } catch {}
      p += fsz; continue;
    }
    const d = new Uint8Array(buf.slice(p + 1, p + fsz));
    const dec = (enc) => { if (enc === 1 || enc === 2) return new TextDecoder('utf-16le').decode(d.slice(enc === 1 ? 0 : 2)); return new TextDecoder('utf-8').decode(d); };
    try {
      const text = dec(buf[p]).replace(/\0/g, '').trim();
      if (fid === 'TIT2' && !r.title) r.title = text;
      else if (fid === 'TPE1' && !r.artist) r.artist = text;
      else if (fid === 'TALB' && !r.album) r.album = text;
    } catch {}
    p += fsz;
  }
  return { ...r, _isID3: true };
}

/** FLAC 元数据解析（PICTURE 封面 + VORBIS_COMMENT 歌词） */
function parseFlacMeta(buf) {
  const r = { coverUrl: '', lyric: '' };
  if (buf.length < 42 || buf[0] !== 0x66 || buf[1] !== 0x4C || buf[2] !== 0x61 || buf[3] !== 0x43) return r;
  let pos = 4, iter = 0;
  while (pos + 4 <= buf.length && iter++ < 5000) {
    const isLast = (buf[pos] & 0x80) !== 0;
    const blockType = buf[pos] & 0x7F;
    const blockSize = (buf[pos+1] << 16) | (buf[pos+2] << 8) | buf[pos+3];
    pos += 4;
    if (pos + blockSize > buf.length) break;
    if (blockType === 4 && blockSize > 4 && !r.lyric) {
      try {
        const bdv = new DataView(buf.buffer, buf.byteOffset + pos, blockSize);
        let pp = 0;
        const vendorLen = bdv.getUint32(pp, true); pp += 4 + vendorLen;
        const commentCount = bdv.getUint32(pp, true); pp += 4;
        for (let i = 0; i < commentCount && pp + 4 <= blockSize; i++) {
          const len = bdv.getUint32(pp, true); pp += 4;
          if (pp + len > blockSize) break;
          const entry = new TextDecoder().decode(buf.slice(pos + pp, pos + pp + len));
          pp += len;
          const eu = entry.toUpperCase();
          if (eu.startsWith('LYRICS=')) { r.lyric = entry.slice(7); break; }
          if (eu.startsWith('UNSYNCEDLYRICS=')) { r.lyric = entry.slice(15); break; }
        }
      } catch {}
    }
    if (blockType === 6 && blockSize > 4 && !r.coverUrl) {
      try {
        let pp = pos + 4;
        const mimeLen = new DataView(buf.buffer, buf.byteOffset + pp, 4).getUint32(0, false);
        pp += 4;
        const mime = new TextDecoder().decode(buf.slice(pp, pp + mimeLen));
        pp += mimeLen;
        const descLen = new DataView(buf.buffer, buf.byteOffset + pp, 4).getUint32(0, false);
        pp += 4 + descLen + 16;
        const picLen = new DataView(buf.buffer, buf.byteOffset + pp, 4).getUint32(0, false);
        pp += 4;
        if (picLen > 256 && mime.includes('image') && pp + picLen <= pos + blockSize)
          r.coverUrl = URL.createObjectURL(new Blob([buf.slice(pp, pp + picLen)], { type: mime }));
      } catch {}
    }
    pos += blockSize;
    if (isLast) break;
  }
  return r;
}

/** 将酷狗图片路径格式化为可用的 HTTPS URL */
function formatPicUrl(value) {
  if (!value) return '';
  let pic = String(value).replaceAll('{size}', '400');
  if (pic.startsWith('//')) pic = 'https:' + pic;
  pic = pic.replace('http://', 'https://');
  pic = pic.replace('c1.kgimg.com', 'imge.kugou.com');
  return pic;
}

// ── 设置面板 ──
function settingsPanel(ctx, state, log) {
  const { h, ref, defineAsyncComponent: a } = ctx.vue;
  const Btn = a(ctx.ui.components.Button), Dlg = a(ctx.ui.components.Dialog), Inp = a(ctx.ui.components.Input), Sw = a(ctx.ui.components.Switch);
  return ctx.vue.defineComponent({
    setup() {
      const folders = ref([]), showTag = ref(false);
      const showRm = ref(false), showEdit = ref(false), rmT = ref(null), editT = ref(null), aliasV = ref('');
      const useKugouCover = ref(false);
      const isMiuix = ref(document.documentElement.classList.contains('miuix-bg-active'));
      loadSettings(ctx).then(s => { folders.value = s.folders; showTag.value = s.showTag; useKugouCover.value = !!s.useKugouCover; });
      const addFolder = async () => {
        const r = await ctx.dialog.selectDirectory({ title: '选择音乐文件夹' });
        if (r.canceled || !r.paths?.[0]) return;
        const path = r.paths[0];
        if (folders.value.some((f) => f.path === path)) { ctx.toast.info('已添加过'); return; }
        const label = path.split('/').filter(Boolean).pop() || '本地音乐';
        folders.value.push({ path, label, alias: '' });
        await saveSettings(ctx, { folders: folders.value.slice(), showTag: showTag.value, useKugouCover: useKugouCover.value });
        try { const res = await ctx.fs.listFiles(path, { recursive: true, kinds: ['audio', 'lyric'] }); const c = res.ok ? res.files.filter((f) => f.kind === 'audio').length : 0; _counts[path] = c; if (res.ok) ctx.toast.success(`已添加 (${c} 首)`); else ctx.toast.warning(`失败: ${res.error}`); } catch { _counts[path] = 0; ctx.toast.warning('异常'); }
        state._tk = Date.now();
      };
      const confirmRm = async () => { if (!rmT.value) return; folders.value = folders.value.filter((f) => f.path !== rmT.value.path); showRm.value = false; rmT.value = null; await saveSettings(ctx, { folders: folders.value.slice(), showTag: showTag.value, useKugouCover: useKugouCover.value }); state._tk = Date.now(); ctx.toast.success('已移除'); };
      const saveEdit = async () => { if (!editT.value) return; editT.value.alias = aliasV.value.trim(); showEdit.value = false; editT.value = null; await saveSettings(ctx, { folders: folders.value.slice(), showTag: showTag.value, useKugouCover: useKugouCover.value }); ctx.toast.success('别名已保存'); };
      const openEdit = (f) => { editT.value = f; aliasV.value = f.alias || ''; showEdit.value = true; };
      const setShowTag = async (v) => { showTag.value = v; await saveSettings(ctx, { folders: folders.value.slice(), showTag: showTag.value, useKugouCover: useKugouCover.value }); state._tk = Date.now(); };
      const setKugou = async (v) => { useKugouCover.value = v; await saveSettings(ctx, { folders: folders.value.slice(), showTag: showTag.value, useKugouCover: useKugouCover.value }); };
      const _mc = isMiuix.value ? 'settings-card' : '';
      const _mi = isMiuix.value ? 'settings-item' : '';
      const _onBg = isMiuix.value ? 'var(--miuix-on-background)' : 'var(--color-text-main)';
      const _onSec = isMiuix.value ? 'var(--miuix-on-background)' : 'var(--color-text-secondary)';
      return () => h('div', { style: 'display:flex;flex-direction:column;gap:8px;' }, [
        h('div', { class:_mc, style: isMiuix.value ? 'border-radius:16px;overflow:hidden;width:100%' : 'width:100%' }, [
          h('div', { class:_mi, style:'display:flex;justify-content:space-between;align-items:center;gap:12px' + (isMiuix.value ? '' : ';padding:10px 14px') }, [
            h('div', { style:'flex:1;min-width:0' }, [
              h('div', { style:'font-weight:600;font-size:14px;color:' + _onBg + ';line-height:1.4' }, '显示文件夹标签'),
              h('div', { style:'font-size:12px;color:' + _onSec + ';opacity:0.6;margin-top:2px;line-height:1.5' }, '在歌曲行右侧显示文件夹别名徽章'),
            ]),
            h(Sw, { modelValue: showTag.value, 'onUpdate:modelValue': setShowTag }),
          ]),
          h('div', { class:_mi, style:'display:flex;justify-content:space-between;align-items:center;gap:12px' + (isMiuix.value ? '' : ';padding:10px 14px') }, [
            h('div', { style:'flex:1;min-width:0' }, [
              h('div', { style:'font-weight:600;font-size:14px;color:' + _onBg + ';line-height:1.4' }, '使用在线功能（封面/歌词等）'),
              h('div', { style:'font-size:12px;color:' + _onSec + ';opacity:0.6;margin-top:2px;line-height:1.5' }, '通过酷狗搜索匹配歌曲封面和歌词'),
            ]),
            h(Sw, { modelValue: useKugouCover.value, 'onUpdate:modelValue': setKugou }),
          ]),
          h('div', { class:_mi, style:'display:flex;justify-content:space-between;align-items:center;gap:12px' + (isMiuix.value ? '' : ';padding:10px 14px') }, [
            h('div', { style:'flex:1;min-width:0' }, [
              h('div', { style:'font-weight:600;font-size:14px;color:' + _onBg + ';line-height:1.4' }, 'GitHub'),
              h('div', { style:'font-size:12px;color:' + _onSec + ';opacity:0.6;margin-top:2px;line-height:1.5' }, '点击跳转 GitHub 地址，欢迎 Star'),
            ]),
            h(Btn, { size:'xs', onClick: () => window.open('https://github.com/SkyShadowHero/echo-local-simple', '_blank') }, 'Github'),
          ]),
        ]),
        h('div', { class:_mc, style: isMiuix.value ? 'border-radius:16px;overflow:hidden;width:100%' : 'width:100%' }, [
          h('div', { class:_mi, style:'display:flex;align-items:center;justify-content:space-between;' + (isMiuix.value ? '' : ';padding:10px 14px') }, [
            h('span', { style:'font-weight:600;font-size:14px;color:' + _onBg + '' }, '音乐文件夹'),
            h(Btn, { onClick: addFolder, size:'xs' }, { default:()=>'添加' }),
          ]),
          folders.value.length > 0 ? folders.value.map((f) => h('div', { class: _mi, key: f.path, style: 'display:flex;align-items:center;justify-content:space-between;gap:12px;' + (isMiuix.value ? '' : ';padding:10px 14px') }, [
            h('div', { style: 'flex:1;min-width:0;' }, [
              h('div', { style: 'display:flex;align-items:center;gap:6px;' }, [
                h('span', { style: 'font-size:14px;font-weight:600;color:var(--color-text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' }, f.alias || f.label),
                f.alias && h('span', { style: 'font-size:11px;color:var(--color-text-secondary);opacity:0.5;white-space:nowrap;' }, '(' + f.label + ')'),
              ]),
              h('div', { style: 'font-size:12px;color:var(--color-text-secondary);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' }, f.path + (_counts[f.path] !== undefined ? ` (${_counts[f.path]} 首)` : '')),
            ]),
            h('div', { style: 'display:flex;gap:6px;flex-shrink:0;' }, [
              h(Btn, { onClick:()=>openEdit(f), size:'xs', variant:'outline' }, { default:()=>'别名' }),
              h(Btn, { onClick:()=>{rmT.value=f;showRm.value=true}, size:'xs', variant:'outline', style:'color:var(--color-danger);border-color:color-mix(in srgb,var(--color-danger)30%,transparent)' }, { default:()=>'移除' }),
            ]),
          ])) : null,
        ]),
        showRm.value && h(Dlg, { open:showRm.value, 'onUpdate:open':(v)=>{if(!v){showRm.value=false;rmT.value=null}} }, { default:()=>h('div',{style:'padding:20px;text-align:center'}, [
          h('p',{style:'font-size:14px;font-weight:600;margin-bottom:12px'}, `移除 "${rmT.value?.alias||rmT.value?.label||''}"？`),
          h('p',{style:'font-size:12px;color:var(--color-text-secondary);margin-bottom:20px'}, '歌曲列表将同步更新'),
          h('div',{style:'display:flex;gap:8px;justify-content:center'}, [
            h(Btn,{size:'xs',variant:'outline',onClick:()=>{showRm.value=false;rmT.value=null}},{default:()=>'取消'}),
            h(Btn,{size:'xs',onClick:confirmRm},{default:()=>'移除'}),
          ]),
        ])}),
        showEdit.value && h(Dlg, { open:showEdit.value, 'onUpdate:open':(v)=>{if(!v){showEdit.value=false;editT.value=null}} }, { default:()=>h('div',{style:'padding:20px;display:flex;flex-direction:column;gap:16px;'}, [
          h('p',{style:'font-size:14px;font-weight:600;'}, `为 "${editT.value?.label||''}" 设置别名`),
          h(Inp,{modelValue:aliasV.value,'onUpdate:modelValue':(v)=>{aliasV.value=v},placeholder:'输入别名...',style:'width:100%'}),
          h('div',{style:'display:flex;gap:8px;justify-content:center'}, [
            h(Btn,{size:'xs',variant:'outline',onClick:()=>{showEdit.value=false;editT.value=null}},{default:()=>'取消'}),
            h(Btn,{size:'xs',onClick:saveEdit},{default:()=>'保存'}),
          ]),
        ])}),
      ]);
    },
  });
}

// ── 主页面 ──
function browserPage(ctx, state, log) {
  const { h, ref, computed, onMounted, watch, defineAsyncComponent: a } = ctx.vue;
  const Btn = a(ctx.ui.components.Button), Sel = a(ctx.ui.components.Select);

  // SVG icons (inline for simplicity)
  const ICON_UP = '<path d="M12 8l-6 6h12z" fill="currentColor"/>';
  const ICON_LOCATE = '<circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>';
  const ICON_PLAY = '<path d="M8 5v14l11-7z" fill="currentColor"/>';
  const ICON_PAUSE = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>';
  const ICON_NOTE = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/>';

  return ctx.vue.defineComponent({
    setup() {
      const songs = ref([]), loading = ref(false);
      const query = ref(''), sortBy = ref('name');
      const showTag = ref(false);
      const filterFolder = ref('');
      const folderList = ref([]);
      const listEl = ref(null);
      // 检测 miuix 插件是否启用（html 上有 miuix-bg-active 类）
      const isMiuix = ref(document.documentElement.classList.contains('miuix-bg-active'));
      const activeTab = ref('songs'); // 'songs' | 'artists' | 'albums'
      const selectedGroup = ref(null); // { name, songs } 二级页面选中项
      const tabIndStyle = ref({});
      let _tabPending = false;
      const ICON_BACK = '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>';
      function switchTab(tab) {
        activeTab.value = tab;
        selectedGroup.value = null;
        if (tab !== 'songs' && sortBy.value === 'time') sortBy.value = 'name';
        updateTabInd();
      }
      function updateTabInd() {
        if (_tabPending) return;
        _tabPending = true;
        requestAnimationFrame(() => {
          _tabPending = false;
          const root = document.querySelector('.local-tab-root');
          if (!root) return;
          const active = root.querySelector('.local-tab-item.active');
          if (!active) return;
          const rr = root.getBoundingClientRect();
          const ar = active.getBoundingClientRect();
          const isMiuixMode = root.classList.contains('miuix');
          const w = isMiuixMode ? ar.width : Math.round(ar.width * 0.5);
          const x = isMiuixMode ? (ar.left - rr.left) : (ar.left - rr.left + Math.round(ar.width * 0.25));
          tabIndStyle.value = { transform: 'translateX(' + x + 'px)', width: w + 'px' };
        });
      }
      const scanPhase = ref(''); // '' | 'parsing' | 'kugou'
      const scanStatus = ref('');

      const list = computed(() => {
        let l = songs.value;
        const w = query.value.trim().toLowerCase();
        if (w) l = l.filter((s) => s.title.toLowerCase().includes(w) || s.artist.toLowerCase().includes(w));
        if (filterFolder.value) l = l.filter((s) => s._folder === filterFolder.value);
        const f = sortBy.value;
        if (f === 'name') l = [...l].sort((a, b) => a.title.localeCompare(b.title, 'zh'));
        else if (f === 'time') l = [...l].sort((a, b) => (b._mt || 0) - (a._mt || 0));
        return l;
      });
      const artistGroups = computed(() => {
        const map = {};
        for (const sg of list.value) {
          const key = sg.artist || '未知歌手';
          if (!map[key]) map[key] = { name: key, songs: [] };
          map[key].songs.push(sg);
        }
        return Object.values(map).sort((a, b) => a.name.localeCompare(b.name, 'zh'));
      });
      const albumGroups = computed(() => {
        const map = {};
        for (const sg of list.value) {
          const key = sg.album || sg._alias || '未知专辑';
          if (!map[key]) map[key] = { name: key, songs: [] };
          map[key].songs.push(sg);
        }
        return Object.values(map).sort((a, b) => a.name.localeCompare(b.name, 'zh'));
      });

      const folderOpts = computed(() => {
        const opts = [{ label: '全部文件夹', value: '' }];
        for (const f of folderList.value) opts.push({ label: f.alias || f.label, value: f.path });
        return opts;
      });

      const sortOps = [{ label: '按名称排序', value: 'name' }, { label: '按修改时间', value: 'time' }];
      const currentSortOpts = computed(() => {
        if (activeTab.value === 'songs') return sortOps;
        return [{ label: '按名称排序', value: 'name' }, { label: '按数量排序', value: 'count' }];
      });

      const scan = async (silent) => {
        const s = await loadSettings(ctx);
        showTag.value = s.showTag;
        if (!s.folders?.length) { songs.value = []; loading.value = false; folderList.value = []; return; }
        if (!silent) loading.value = true;
        folderList.value = s.folders.map((f) => ({ path: f.path, label: f.label, alias: f.alias || '' }));
        // 从已有数据恢复封面 URL（避免重复获取）
        const prevCovers = new Map();
        for (const es of songs.value) { if (es.coverUrl) prevCovers.set(es._path, es.coverUrl); }
        const all = [];
        for (const f of s.folders) {
          try {
            const r = await ctx.fs.listFiles(f.path, { recursive: true, kinds: ['audio', 'lyric'] });
            if (!r.ok) continue;
            const lb = f.label || f.path.split('/').filter(Boolean).pop() || '本地音乐';
            const alias = f.alias || lb;
            const af = r.files.filter((x) => x.kind === 'audio'), lf = r.files.filter((x) => x.kind === 'lyric');
            const li = new Map(); for (const x of lf) li.set(x.name.replace(/\.(lrc|txt)$/i, '').toLowerCase(), x);
            for (const a of af) {
              const { artist, title } = parseFileName(a.name);
              const id = (++_seq).toString();
              const cachedCover = prevCovers.get(a.path) || '';
              const sg = { id, title, artist, album: alias, duration: 0, coverUrl: cachedCover, audioUrl: a.url, hash: '', mixSongId: id, source: 'local-music', lyric: '', _mt: a.modifiedAt, _path: a.path, _folder: f.path, _alias: alias };
              sg._hashPromise = hashStr(a.path);
              const k = a.name.replace(/\.[^.]+$/, '').toLowerCase(); const lm = li.get(k);
              if (lm) { try { const l = await ctx.fs.readTextFile(lm.path, { encoding: 'utf8' }); if (l.ok) sg.lyric = l.content; } catch {} }
              all.push(sg);
            }
            _counts[f.path] = af.length;
          } catch {}
        }
        // 等待所有 SHA-256 hash 计算完成
        await Promise.all(all.map(sg => sg._hashPromise.then(h => { sg.hash = h; delete sg._hashPromise; })));
        songs.value = all; _songs = all; loading.value = false;
        if (!silent && all.length) ctx.toast.success(`共 ${all.length} 首`);
        scanPhase.value = '';

        // 异步加载 ID3 元数据和封面
        (async () => {
          scanPhase.value = 'parsing';
          scanStatus.value = '获取封面中...';
          let i = 0;
          for (const sg of all) {
            i++;
            if (i > 1) await new Promise(r => setTimeout(r, 50));
            scanStatus.value = `获取封面中 ${i}/${all.length}`;
            let changed = false;
            try {
              const buf = await Promise.race([
                ctx.fs.readFileBytes(sg._path, { maxBytes: 2097152 }),
                new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 15000))
              ]);
              if (buf.ok && buf.data) {
                const u8 = new Uint8Array(buf.data);
                const id3 = parseID3Meta(u8);
                if (id3._isID3) {
                  if (id3.title) { sg.title = id3.title; changed = true; }
                  if (id3.artist) { sg.artist = id3.artist; changed = true; }
                  if (id3.album) { sg.album = id3.album; changed = true; }
                  if (id3.coverUrl) { sg.coverUrl = id3.coverUrl; changed = true; }
                  if (id3.lyric) { sg.lyric = id3.lyric; changed = true; }
                } else {
                  const flac = parseFlacMeta(u8);
                  if (flac.coverUrl) { sg.coverUrl = flac.coverUrl; changed = true; }
                  if (flac.lyric) { sg.lyric = flac.lyric; changed = true; }
                }
              }
            } catch {}
            if (changed) { songs.value = songs.value.slice(); saveCache(all, s); }
          }
          songs.value = songs.value.slice();
          log.info('元数据完成: ' + all.length);
          
          // 更新缓存（元数据 + 独立封面文件）
          saveCache(all, s);
          scanStatus.value = '';

          scanStatus.value = '';
        })();
      };
      
      const cacheDir = ctx.descriptor.directory;
      const metaPath = cacheDir + '/song-cache.json';

      async function writeMeta(data) {
        try { await ctx.fs.writeFile(metaPath, JSON.stringify(data), { overwrite: true, createDirectories: true }); } catch {}
      }
      async function readMeta() {
        try { const r = await ctx.fs.readTextFile(metaPath, { encoding: 'utf8' }); if (r.ok) return JSON.parse(r.content); } catch {}
        return null;
      }

      // ── 保存缓存（仅元数据，不缓存封面）──
      let _saveTimer = null;
      function saveCache(all, settings) {
        clearTimeout(_saveTimer);
        _saveTimer = setTimeout(async () => {
          const folderHash = await hashStr(settings.folders.map(f => f.path).sort().join('|'));
          const meta = all.map(sg => ({
            id: sg.id, title: sg.title, artist: sg.artist, album: sg.album,
            audioUrl: sg.audioUrl, hash: sg.hash, mixSongId: sg.mixSongId,
            source: sg.source, lyric: sg.lyric,
            // 在线封面 URL（HTTP）很小，直接缓存在 JSON 里
            coverUrl: sg.coverUrl && /^https?:\/\//.test(sg.coverUrl) ? sg.coverUrl : '',
            _mt: sg._mt, _path: sg._path, _folder: sg._folder, _alias: sg._alias,
          }));
          writeMeta({ songs: meta, folderHash, _seq }).catch(() => {});
          _saveTimer = null;
        }, 300);
      }

      // ── 从缓存恢复 ──
      async function tryLoadCache() {
        const settings = await loadSettings(ctx);
        if (!settings.folders?.length) return false;
        showTag.value = settings.showTag;
        folderList.value = settings.folders.map(f => ({ path: f.path, label: f.label, alias: f.alias || '' }));
        const folderHash = await hashStr(settings.folders.map(f => f.path).sort().join('|'));
        const meta = await readMeta();
        if (!meta || meta.folderHash !== folderHash) return false;
        _seq = meta._seq || 0;
        songs.value = meta.songs; _songs = meta.songs;
        // 后台从音频文件自动解析封面
        loadCoversBg();
        return true;
      }

      // ── 后台解析封面（从音频文件 ID3/FLAC 标签自动读取）──
      async function loadCoversBg() {
        const all = songs.value;
        if (!all || !all.length) return;
        scanPhase.value = 'parsing';
        scanStatus.value = '解析封面中...';
        const batchSize = 10;
        for (let i = 0; i < all.length; i += batchSize) {
          const batch = all.slice(i, i + batchSize);
          const results = await Promise.all(batch.map(async sg => {
            if (sg.coverUrl) return false;
            const cached = _coverCache.get(sg.id);
            if (cached) { sg.coverUrl = cached; return true; }
            try {
              const buf = await ctx.fs.readFileBytes(sg._path, { maxBytes: 2097152 });
              if (buf.ok && buf.data) {
                const u8 = new Uint8Array(buf.data);
                const id3 = parseID3Meta(u8);
                if (id3._isID3 && id3.coverUrl) {
                  sg.coverUrl = id3.coverUrl;
                  _coverCache.set(sg.id, id3.coverUrl);
                  return true;
                }
                const flac = parseFlacMeta(u8);
                if (flac.coverUrl) {
                  sg.coverUrl = flac.coverUrl;
                  _coverCache.set(sg.id, flac.coverUrl);
                  return true;
                }
              }
            } catch {}
            return false;
          }));
          if (results.some(r => r)) songs.value = all.slice();
          scanStatus.value = `解析封面中 ${Math.min(i + batchSize, all.length)}/${all.length}`;
        }
        scanPhase.value = '';
        scanStatus.value = '';
      }

      const playAll = async () => {
        if (!list.value.length) { ctx.toast.info('暂无歌曲'); return; }
        try { await ctx.player.replaceQueueAndPlay(list.value); log.info('播放全部: ' + list.value.length); } catch (e) { log.error('播放失败: ' + e); ctx.toast.danger('播放失败'); }
      };
      const playSong = async (sg) => {
        if (!sg) return;
        const l = list.value;
        const i = l.findIndex((s) => s.id === sg.id);
        try { await ctx.player.replaceQueueAndPlay(i >= 0 ? [...l.slice(i), ...l.slice(0, i)] : l, { requestedSong: sg }); log.info('播放: ' + sg.title); } catch (e) { log.error('播放失败: ' + e); ctx.toast.danger('播放失败'); }
        // 播放时如果没封面且开启在线匹配，按需调酷狗（单首，不批量）
        if (!sg.coverUrl) {
          const settings = await loadSettings(ctx);
          if (settings.useKugouCover) {
            const ok = await enrichFromKugou(sg);
            if (ok) { songs.value = songs.value.slice(); saveCache(songs.value, settings); }
          }
        }
      };

      // ── 单首歌曲酷狗匹配（仅播放时按需调用，避免批量触发风控）──
      let _kugouLastCall = 0;
      async function enrichFromKugou(sg) {
        if (!sg || sg.coverUrl || !ctx.kugou) return false;
        // 限流：每次调用间隔至少 800ms
        const now = Date.now();
        const wait = 800 - (now - _kugouLastCall);
        if (wait > 0) await new Promise(r => setTimeout(r, wait));
        _kugouLastCall = Date.now();
        const artist = sg.artist && sg.artist !== '未知歌手' ? sg.artist : '';
        let keyword = artist ? `${artist} ${sg.title}` : sg.title;
        keyword = keyword.replace(/[&·•,()（）【】\[\]<>{}|\\/:*?"'`]/g, ' ').replace(/\s+/g, ' ').trim();
        try {
          const result = await ctx.kugou.search.search(keyword, 'song', 1, 5);
          const lists = result?.data?.lists || result?.data?.list || result?.lists || [];
          if (lists.length > 0) {
            const match = lists[0];
            const cu = formatPicUrl(match.Image || match.trans_param?.union_cover || match.cover || '');
            if (cu) {
              sg.coverUrl = cu;
              _coverCache.set(sg.id, cu);
              return true;
            }
          }
        } catch (e) { log.error(`酷狗搜索失败: ${sg.title} — ${e?.message || e}`); }
        return false;
      }

      const refresh = () => scan(false);
      const openSettings = () => { try { ctx.router.push('/main/settings/plugins'); } catch {} };
      onMounted(async () => {
        // 内存中已有数据，直接恢复（切页面不丢）
        if (_songs.length > 0) {
          songs.value = _songs;
          loading.value = false;
          return;
        }
        const hit = await tryLoadCache();
        if (!hit) { scan(true); return; }
        // 初始化 tab 指示器位置
        requestAnimationFrame(() => updateTabInd());
        // 监听 miuix 插件动态启用/停用
        const _miuixObs = new MutationObserver(() => { isMiuix.value = document.documentElement.classList.contains('miuix-bg-active'); });
        _miuixObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        ctx.dispose(() => _miuixObs.disconnect());
      });
      watch(() => state._tk, () => scan(true));

      const scrollToTop = () => { const el = listEl.value; if (el) el.scrollTo({ top: 0, behavior: 'smooth' }); };
      const locateCurrent = () => {
        const el = listEl.value;
        if (!el) return;
        const curId = ctx.stores.player.currentTrackId;
        if (curId == null) return;
        const row = el.querySelector(`[data-song-id="${curId}"]`);
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };

      return () => {
        const t = songs.value.length;
        const curId = ctx.stores.player.currentTrackId;
        const isPlaying = ctx.stores.player.isPlaying;

        // 歌曲行渲染函数（被三个 tab 共用）
        const _songRow = (sg, idx) => {
          const sid = String(sg.id);
          const active = curId != null && String(curId) === sid;
          const hasCover = !!sg.coverUrl;
          const hasLyric = !!sg.lyric;
          return h('div', { key: sg.id, class:'local-row group' + (active ? ' is-active' : ''), 'data-song-id': sid, onDblclick: () => playSong(sg) }, [
            h('div', { class:'local-row-inner' }, [
              h('div', { class:'local-col-index' }, [
                h('div', { class:'local-idx-cell' }, [
                  active ? h('svg', { class:'local-idx-icon', viewBox:'0 0 24 24', width:14, height:14, innerHTML: isPlaying ? ICON_PAUSE : ICON_PLAY, onClick:(e)=>{e.stopPropagation();ctx.player.toggle();} })
                    : [ h('span',{class:'local-idx-num'},String(idx+1)), h('svg',{class:'local-idx-play',viewBox:'0 0 24 24',width:14,height:14,innerHTML:ICON_PLAY,onClick:(e)=>{e.stopPropagation();playSong(sg);}}) ],
                ]),
              ]),
              h('div', { class:'local-col-song' }, [
                h('div', { class:'local-cover' }, [
                  hasCover ? h('img',{src:sg.coverUrl,class:'local-cover-img',alt:'cover',loading:'lazy',onError:(e)=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}) : null,
                  h('svg',{style:hasCover?'display:none;':'display:flex;',class:'local-cover-note',viewBox:'0 0 24 24',width:20,height:20,innerHTML:ICON_NOTE}),
                ]),
                h('div', { class:'local-song-info' }, [
                  h('span',{class:'local-song-title'},sg.title),
                  h('span',{class:'local-song-artist'},sg.artist),
                ]),
              ]),
              hasLyric && h('span',{class:'local-tag-lyric'},'词'),
              sg.album && sg.album !== sg._alias && h('span',{class:'local-tag-album'},sg.album),
              showTag.value && sg._alias && h('span',{class:'local-tag-alias'},sg._alias),
              h('span',{style:'width:16px;flex-shrink:0;'}),
            ]),
          ]);
        };
        // 分组项卡片（第一级：显示名称和数量，点击进入二级）
        const _groupCard = (g) => h('div', {
          key: g.name, class:'local-group-card', onClick: () => { selectedGroup.value = g; },
          style: 'display:flex;align-items:center;justify-content:space-between;padding:14px 16px;cursor:pointer;border-radius:12px;transition:background 0.12s;',
          onMouseenter: (e) => { e.currentTarget.style.background = 'var(--row-hover-bg)'; },
          onMouseleave: (e) => { e.currentTarget.style.background = 'transparent'; },
        }, [
          h('span', { style:'font-size:14px;font-weight:600;color:var(--color-text-main);' }, g.name),
          h('span', { style:'font-size:12px;color:var(--color-text-secondary);opacity:0.6;' }, g.songs.length + ' 首'),
        ]);
        const _sortGroups = (groups) => groups.slice().sort((a, b) =>
          sortBy.value === 'count' ? b.songs.length - a.songs.length : a.name.localeCompare(b.name, 'zh')
        );
        // 根据 tab 渲染列表内容
        const _listContent = () => {
          if (activeTab.value === 'artists') {
            if (selectedGroup.value) {
              // 二级：该歌手的歌曲
              return [
                h('div', { key:'back', style:'display:flex;align-items:center;gap:8px;padding:8px 16px;cursor:pointer;font-size:14px;font-weight:600;color:var(--color-text-main);', onClick: () => { selectedGroup.value = null; } }, [
                  h('svg', { viewBox:'0 0 24 24', width:20, height:20, innerHTML:ICON_BACK, style:'flex-shrink:0;' }),
                  h('span', {}, selectedGroup.value.name),
                ]),
                ...selectedGroup.value.songs.map((sg, i) => _songRow(sg, i)),
              ];
            }
            // 一级：歌手列表
            return _sortGroups(artistGroups.value).map(g => _groupCard(g));
          }
          if (activeTab.value === 'albums') {
            if (selectedGroup.value) {
              // 二级：该专辑的歌曲
              return [
                h('div', { key:'back', style:'display:flex;align-items:center;gap:8px;padding:8px 16px;cursor:pointer;font-size:14px;font-weight:600;color:var(--color-text-main);', onClick: () => { selectedGroup.value = null; } }, [
                  h('svg', { viewBox:'0 0 24 24', width:20, height:20, innerHTML:ICON_BACK, style:'flex-shrink:0;' }),
                  h('span', {}, selectedGroup.value.name),
                ]),
                ...selectedGroup.value.songs.map((sg, i) => _songRow(sg, i)),
              ];
            }
            // 一级：专辑列表
            return _sortGroups(albumGroups.value).map(g => _groupCard(g));
          }
          return list.value.map((sg, idx) => _songRow(sg, idx));
        };

        return h('div', { class: isMiuix.value ? 'local-page-miuix' : '', style: 'height:100%;display:flex;flex-direction:column;overflow:hidden;background:var(--color-bg-main);' }, [
          // Header
          h('div', { style: 'flex-shrink:0;padding:16px 24px 0;display:flex;align-items:center;justify-content:space-between;gap:12px;' }, [
            h('div', { style: 'flex:1;min-width:0;' }, [
              h('h1', { style: 'font-size:22px;font-weight:700;margin:0;color:var(--color-text-main);' }, '本地音乐'),
              h('div', { style: 'font-size:12px;color:var(--color-text-secondary);margin-top:4px;display:flex;align-items:center;gap:6px;' }, [
                h('span', {}, loading.value ? '扫描中...' : (t > 0 ? `${t} 首` : '暂无歌曲')),
                scanStatus.value && !loading.value && h('span', { style: 'opacity:0.7;' }, '· ' + scanStatus.value),
              ]),
            ]),
            h('div', { style: 'display:flex;gap:6px;flex-shrink:0;' }, [
              h(Btn, { onClick: refresh, size:'xs', variant:'outline' }, { default:()=>'刷新' }),
              h(Btn, { onClick: playAll, size:'xs', style:'--btn-bg:var(--color-primary);color:white;' }, { default:()=>'播放全部' }),
              h(Btn, { onClick: openSettings, size:'xs', variant:'outline' }, { default:()=>'管理文件夹' }),
            ]),
          ]),
          // Toolbar
          t > 0 && h('div', { style: 'flex-shrink:0;padding:12px 24px 8px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border-subtle);flex-wrap:wrap;' }, [
            h('div', { style: 'position:relative;min-width:150px;flex:1;max-width:240px;' }, [
              h('input', { type:'text', placeholder:'搜索歌曲...', value:query.value, onInput:(e)=>{query.value=e.target.value}, style:'width:100%;padding:7px 12px 7px 34px;border-radius:10px;border:none;background:var(--bg-info-card);font-size:13px;outline:none;color:var(--color-text-main);box-sizing:border-box;' }),
              h('span', { style:'position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex;color:var(--color-text-secondary);', innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 16.5L21 21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' }),
            ]),
            folderList.value.length > 1 && h(Sel, { options:folderOpts.value, modelValue:filterFolder.value, 'onUpdate:modelValue':(v)=>{filterFolder.value=String(v)}, clearable:false }),
            h('span', { style:'font-size:13px;color:var(--color-text-secondary);flex-shrink:0;' }, '排序：'),
            h(Sel, { options:currentSortOpts.value, modelValue:sortBy.value, 'onUpdate:modelValue':(v)=>{sortBy.value=String(v)}, clearable:false }),
            h('div', { style:'flex:1;' }),
            h('button', { onClick: locateCurrent, title: '定位当前播放', style: 'width:28px;height:28px;border-radius:8px;border:1px solid var(--border-subtle);background:var(--color-bg-elevated);color:var(--color-text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;' },
              h('svg', { viewBox: '0 0 24 24', width: 14, height: 14, innerHTML: ICON_LOCATE })
            ),
            h('button', { onClick: scrollToTop, title: '回到顶部', style: 'width:28px;height:28px;border-radius:50%;border:1px solid var(--border-subtle);background:var(--color-bg-elevated);color:var(--color-text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;' },
              h('svg', { viewBox: '0 0 24 24', width: 14, height: 14, innerHTML: ICON_UP })
            ),
          ]),
          // Tab row
          t > 0 && h('div', { class: 'local-tab-root' + (isMiuix.value ? ' miuix' : '') }, [
            h('div', { class: 'local-tab-indicator', style: tabIndStyle.value.width
              ? Object.entries(tabIndStyle.value).map(([k,v]) => k + ':' + v).join(';')
              : 'transform:translateX(0);width:30%;left:0;'
            }),
            h('div', { class: 'local-tab-item' + (activeTab.value === 'songs' ? ' active' : ''), onClick: () => switchTab('songs') }, '歌曲'),
            h('div', { class: 'local-tab-item' + (activeTab.value === 'artists' ? ' active' : ''), onClick: () => switchTab('artists') }, '歌手'),
            h('div', { class: 'local-tab-item' + (activeTab.value === 'albums' ? ' active' : ''), onClick: () => switchTab('albums') }, '专辑'),
          ]),
          // Empty / loading states
          loading.value && t===0 && h('div', { class:'local-empty', style:'padding:60px 24px;text-align:center;font-size:13px;color:var(--color-text-secondary);' }, '正在扫描音乐文件...'),
          !loading.value && t===0 && h('div', { class:'local-empty', style:'padding:60px 24px;text-align:center;font-size:13px;color:var(--color-text-secondary);' }, '暂无歌曲，请在设置中添加文件夹'),
          // Song list / grouped list
          t>0 && h('div', { ref: listEl, class:'local-list' + (isMiuix.value ? ' miuix-card' : ''), style: isMiuix.value
            ? 'flex:none;overflow:visible;padding:4px 26px 0;position:relative;scrollbar-width:thin;scrollbar-color:rgba(128,128,128,0.35) transparent;'
            : 'flex:1;min-height:0;overflow-y:scroll;scrollbar-width:thin;scrollbar-color:rgba(128,128,128,0.35) transparent;padding:8px 24px 24px;position:relative;'
          }, [_listContent()]),
        ]);
      };
    },
  });
}

export async function activate(ctx) {
  const log = createLogger(ctx);
  log.info('启动');
  ctx.player.audioSource.register({ id: 'local-simple-resolver', match: (c) => c.track.source === 'local-music', resolve: (c) => c.track.audioUrl || null });
  // 拦截歌词请求：本地音乐直接返回本地歌词
  ctx.lyrics.registerResolver({
    id: 'local-lyric',
    order: -100,
    match: (c) => c.track?.source === 'local-music',
    resolve: (c) => {
      const sg = _songs.find(s => String(s.hash) === String(c.hash));
      if (sg?.lyric) return { decodeContent: sg.lyric, source: 'local-file' };
      return { decodeContent: '\u00A0', source: 'local-none' };
    },
  });
  // 拦截封面兜底：本地音乐不请求酷狗封面
  ctx.ui.cover.setFallback({
    resolveUrl: (c) => {
      if (c.track?.source === 'local-music') return '';
      return null;
    },
  });
  const state = ctx.vue.reactive({ _tk: 0 });
  ctx.ui.settings.define({ title: '本地音乐 设置', component: settingsPanel(ctx, state, log) });
  ctx.ui.addPage({ id: 'browser', title: '本地音乐', icon: 'material-symbols:folder-outline', component: browserPage(ctx, state, log), sidebar: { section: 'library', sectionTitle: '本地音乐', order: 10 } });
  log.info('就绪');
}
export async function deactivate() {}