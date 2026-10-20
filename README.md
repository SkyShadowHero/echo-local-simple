# EchoMusic简单本地音乐

本地音乐播放插件，支持浏览和播放本地音频文件。

## 功能

- 扫描本地文件夹中的音乐文件（MP3/FLAC/WAV 等）
- 内嵌标签解析（jsmediatags）：标题、歌手、专辑、封面，支持 MP3 ID3v1/v2、FLAC、MP4/M4A 等
- 歌词文件关联（同目录 .lrc/.txt）
- 酷狗在线匹配封面（可选，匿名请求不依赖账号）
- 搜索、排序、文件夹筛选
- 播放历史定位、快速回顶

## 使用

1. 插件设置 → 添加音乐文件夹
2. 侧栏「本地音乐」查看歌曲列表
3. 双击播放，支持搜索和排序

## 设置

- **显示文件夹标签** — 歌曲行右侧显示来源文件夹
- **在线匹配封面** — 通过酷狗搜索补全歌曲封面（播放时按需匹配）

## 内嵌标签（jsmediatags）

标签读取全部交给 [jsmediatags](https://github.com/aadsm/jsmediatags)，不再自己解析二进制格式。

- 版本：`3.9.7`（`dist/jsmediatags.min.js`），MIT License
- 覆盖格式：MP3（ID3v1、ID3v2.2–2.4）、FLAC（VORBIS_COMMENT + PICTURE）、MP4/M4A（iTunes 原子）
- 读取顺序：先用 `ctx.fs.getFileUrl()` 拿到 `echo-plugin-media://` 地址交给 jsmediatags，走 Range 请求只读标签所在片段；失败时回退为读取最多 4 MB 头部构造 `File` 再解析
- 输出：`title` / `artist` / `album`、`picture`（转封面 Blob URL）、ID3v2 `USLT` 歌词

插件是以 `blob:` ES module 方式加载的，无法相对 `import` 同目录文件，因此 jsmediatags 的最小化构建内联在 `index.js` 顶部：用 IIFE 捕获 `window.jsmediatags` 后返回，不污染全局。升级时替换这段内联代码即可。

已知限制：jsmediatags 的 FLAC 解析只取 `TITLE` / `ARTIST` / `ALBUM` / `TRACKNUMBER` / `GENRE` 与 `PICTURE`，不读取 `VORBIS_COMMENT` 里的 `LYRICS`，FLAC 内嵌歌词请继续使用同名 `.lrc`。
