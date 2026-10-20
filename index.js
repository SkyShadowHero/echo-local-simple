// ── echo-local-simple ──

// 宿主未提供独立 ctx.log 接口，官方插件统一用 console 输出（见 EchoMusic 插件开发文档），
// 加 [echo-local-simple] 前缀方便在 DevTools Console 中过滤
function createLogger() {
  const tag = '[echo-local-simple]';
  return {
    debug: (...a) => console.debug(tag, '[debug]', ...a),
    info: (...a) => console.info(tag, '[info]', ...a),
    warn: (...a) => console.warn(tag, '[warn]', ...a),
    error: (...a) => console.error(tag, '[error]', ...a),
  };
}

// ══ jsmediatags v3.9.7 (MIT) ══
// Vendored from https://github.com/aadsm/jsmediatags dist/jsmediatags.min.js.
// 插件以 blob: ES module 方式加载，无法相对 import 额外文件，因此内联。
// 该 bundle 会把 API 挂到 window.jsmediatags，这里捕获后返回，避免污染全局。
const jsmediatags = (function () {
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(d,r,q){d!=Array.prototype&&d!=Object.prototype&&(d[r]=q.value)};$jscomp.getGlobal=function(d){return"undefined"!=typeof window&&window===d?d:"undefined"!=typeof global&&null!=global?global:d};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(d,r,q,n){if(r){q=$jscomp.global;d=d.split(".");for(n=0;n<d.length-1;n++){var u=d[n];u in q||(q[u]={});q=q[u]}d=d[d.length-1];n=q[d];r=r(n);r!=n&&null!=r&&$jscomp.defineProperty(q,d,{configurable:!0,writable:!0,value:r})}};$jscomp.polyfill("Object.setPrototypeOf",function(d){return d?d:"object"!=typeof"".__proto__?null:function(d,q){d.__proto__=q;if(d.__proto__!==q)throw new TypeError(d+" is not extensible");return d}},"es6","es5");
$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(d){var r=function(){};r.prototype=d;return new r};$jscomp.construct="undefined"!=typeof Reflect&&Reflect.construct||function(d,r,q){void 0===q&&(q=d);q=$jscomp.objectCreate(q.prototype||Object.prototype);return Function.prototype.apply.call(d,q,r)||q};$jscomp.polyfill("Reflect.construct",function(d){return d||$jscomp.construct},"es6","es3");
(function(d){"object"===typeof exports&&"undefined"!==typeof module?module.exports=d():"function"===typeof define&&define.amd?define([],d):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).jsmediatags=d()})(function(){return function(){function d(r,q,n){function u(e,b){if(!q[e]){if(!r[e]){var h="function"==typeof require&&require;if(!b&&h)return h(e,!0);if(v)return v(e,!0);b=Error("Cannot find module '"+e+"'");throw b.code="MODULE_NOT_FOUND",
b;}b=q[e]={exports:{}};r[e][0].call(b.exports,function(b){return u(r[e][1][b]||b)},b,b.exports,d,r,q,n)}return q[e].exports}for(var v="function"==typeof require&&require,p=0;p<n.length;p++)u(n[p]);return u}return d}()({1:[function(d,r,q){},{}],2:[function(d,r,q){r.exports=XMLHttpRequest},{}],3:[function(d,r,q){function n(f){"@babel/helpers - typeof";n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===
Symbol&&a!==Symbol.prototype?"symbol":typeof a};return n(f)}function u(f,a){for(var c=0;c<a.length;c++){var k=a[c];k.enumerable=k.enumerable||!1;k.configurable=!0;"value"in k&&(k.writable=!0);Object.defineProperty(f,k.key,k)}}function v(f,a,c){a&&u(f.prototype,a);c&&u(f,c);return f}function p(f,a){if("function"!==typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");f.prototype=Object.create(a&&a.prototype,{constructor:{value:f,writable:!0,configurable:!0}});
a&&e(f,a)}function e(f,a){e=Object.setPrototypeOf||function(a,k){a.__proto__=k;return a};return e(f,a)}function b(f){var a=l();return function(){var c=t(f);if(a){var k=t(this).constructor;c=Reflect.construct(c,arguments,k)}else c=c.apply(this,arguments);c=!c||"object"!==n(c)&&"function"!==typeof c?h(this):c;return c}}function h(f){if(void 0===f)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return f}function l(){if("undefined"===typeof Reflect||!Reflect.construct||
Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(f){return!1}}function t(f){t=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)};return t(f)}function m(f,a,c){a in f?Object.defineProperty(f,a,{value:c,enumerable:!0,configurable:!0,writable:!0}):f[a]=c;return f}d=function(f){function a(k){if(!(this instanceof a))throw new TypeError("Cannot call a class as a function");
var g=c.call(this);m(h(g),"_array",void 0);m(h(g),"_size",void 0);g._array=k;g._size=k.length;g._isInitialized=!0;return g}p(a,f);var c=b(a);v(a,[{key:"init",value:function(a){setTimeout(a.onSuccess,0)}},{key:"loadRange",value:function(a,g){setTimeout(g.onSuccess,0)}},{key:"getByteAt",value:function(a){if(a>=this._array.length)throw Error("Offset "+a+" hasn't been loaded yet.");return this._array[a]}}],[{key:"canReadFile",value:function(a){return Array.isArray(a)||"function"===typeof Buffer&&Buffer.isBuffer(a)}}]);
return a}(d("./MediaFileReader"));r.exports=d},{"./MediaFileReader":11}],4:[function(d,r,q){function n(a){"@babel/helpers - typeof";n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};return n(a)}function u(a,c){for(var k=0;k<c.length;k++){var g=c[k];g.enumerable=g.enumerable||!1;g.configurable=!0;"value"in g&&(g.writable=!0);Object.defineProperty(a,
g.key,g)}}function v(a,c,k){c&&u(a.prototype,c);k&&u(a,k);return a}function p(a,c){if("function"!==typeof c&&null!==c)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(c&&c.prototype,{constructor:{value:a,writable:!0,configurable:!0}});c&&e(a,c)}function e(a,c){e=Object.setPrototypeOf||function(a,g){a.__proto__=g;return a};return e(a,c)}function b(a){var c=l();return function(){var k=t(a);if(c){var g=t(this).constructor;k=Reflect.construct(k,arguments,
g)}else k=k.apply(this,arguments);k=!k||"object"!==n(k)&&"function"!==typeof k?h(this):k;return k}}function h(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function l(){if("undefined"===typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}function t(a){t=Object.setPrototypeOf?
Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)};return t(a)}function m(a,c,k){c in a?Object.defineProperty(a,c,{value:k,enumerable:!0,configurable:!0,writable:!0}):a[c]=k;return a}var f=d("./ChunkedFileData");d=function(a){function c(a){if(!(this instanceof c))throw new TypeError("Cannot call a class as a function");var g=k.call(this);m(h(g),"_blob",void 0);m(h(g),"_fileData",void 0);g._blob=a;g._fileData=new f;return g}p(c,a);var k=b(c);v(c,[{key:"_init",value:function(a){this._size=
this._blob.size;setTimeout(a.onSuccess,1)}},{key:"loadRange",value:function(a,c){var g=this,k=(this._blob.slice||this._blob.mozSlice||this._blob.webkitSlice).call(this._blob,a[0],a[1]+1),f=new FileReader;f.onloadend=function(k){k=new Uint8Array(f.result);g._fileData.addData(a[0],k);c.onSuccess()};f.onerror=f.onabort=function(a){if(c.onError)c.onError({type:"blob",info:f.error})};f.readAsArrayBuffer(k)}},{key:"getByteAt",value:function(a){return this._fileData.getByteAt(a)}}],[{key:"canReadFile",value:function(a){return"undefined"!==
typeof Blob&&a instanceof Blob||"undefined"!==typeof File&&a instanceof File}}]);return c}(d("./MediaFileReader"));r.exports=d},{"./ChunkedFileData":5,"./MediaFileReader":11}],5:[function(d,r,q){function n(d,p){for(var e=0;e<p.length;e++){var b=p[e];b.enumerable=b.enumerable||!1;b.configurable=!0;"value"in b&&(b.writable=!0);Object.defineProperty(d,b.key,b)}}function u(d,p,e){p&&n(d.prototype,p);e&&n(d,e);return d}d=function(){function d(){if(!(this instanceof d))throw new TypeError("Cannot call a class as a function");
"_fileData"in this?Object.defineProperty(this,"_fileData",{value:void 0,enumerable:!0,configurable:!0,writable:!0}):this._fileData=void 0;this._fileData=[]}u(d,[{key:"addData",value:function(d,e){var b=d+e.length-1,h=this._getChunkRange(d,b);if(-1===h.startIx)this._fileData.splice(h.insertIx||0,0,{offset:d,data:e});else{var l=this._fileData[h.startIx],p=this._fileData[h.endIx];b=b<p.offset+p.data.length-1;var m={offset:Math.min(d,l.offset),data:e};d>l.offset&&(d=this._sliceData(l.data,0,d-l.offset),
m.data=this._concatData(d,e));b&&(d=this._sliceData(m.data,0,p.offset-m.offset),m.data=this._concatData(d,p.data));this._fileData.splice(h.startIx,h.endIx-h.startIx+1,m)}}},{key:"_concatData",value:function(d,e){if("undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView&&ArrayBuffer.isView(d)){var b=new d.constructor(d.length+e.length);b.set(d,0);b.set(e,d.length);return b}return d.concat(e)}},{key:"_sliceData",value:function(d,e,b){return d.slice?d.slice(e,b):d.subarray(e,b)}},{key:"_getChunkRange",
value:function(d,e){for(var b,h,l=-1,t=-1,m=0,f=0;f<this._fileData.length;f++,m=f){h=this._fileData[f].offset;b=h+this._fileData[f].data.length;if(e<h-1)break;if(d<=b+1&&e>=h-1){l=f;break}}if(-1===l)return{startIx:-1,endIx:-1,insertIx:m};for(f=l;f<this._fileData.length&&!(h=this._fileData[f].offset,b=h+this._fileData[f].data.length,e>=h-1&&(t=f),e<=b+1);f++);-1===t&&(t=l);return{startIx:l,endIx:t}}},{key:"hasDataRange",value:function(d,e){for(var b=0;b<this._fileData.length;b++){var h=this._fileData[b];
if(e<h.offset)break;if(d>=h.offset&&e<h.offset+h.data.length)return!0}return!1}},{key:"getByteAt",value:function(d){for(var e,b=0;b<this._fileData.length;b++){var h=this._fileData[b].offset,l=h+this._fileData[b].data.length-1;if(d>=h&&d<=l){e=this._fileData[b];break}}if(e)return e.data[d-e.offset];throw Error("Offset "+d+" hasn't been loaded yet.");}}],[{key:"NOT_FOUND",get:function(){return-1}}]);return d}();r.exports=d},{}],6:[function(d,r,q){function n(a){"@babel/helpers - typeof";n="function"===
typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};return n(a)}function u(a,g){for(var c=0;c<g.length;c++){var k=g[c];k.enumerable=k.enumerable||!1;k.configurable=!0;"value"in k&&(k.writable=!0);Object.defineProperty(a,k.key,k)}}function v(a,g,c){g&&u(a.prototype,g);c&&u(a,c);return a}function p(a,c){if("function"!==typeof c&&null!==c)throw new TypeError("Super expression must either be null or a function");
a.prototype=Object.create(c&&c.prototype,{constructor:{value:a,writable:!0,configurable:!0}});c&&e(a,c)}function e(a,c){e=Object.setPrototypeOf||function(a,c){a.__proto__=c;return a};return e(a,c)}function b(a){var c=l();return function(){var g=t(a);if(c){var k=t(this).constructor;g=Reflect.construct(g,arguments,k)}else g=g.apply(this,arguments);g=!g||"object"!==n(g)&&"function"!==typeof g?h(this):g;return g}}function h(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return a}function l(){if("undefined"===typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(k){return!1}}function t(a){t=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)};return t(a)}function m(a,c,f){c in a?Object.defineProperty(a,c,{value:f,enumerable:!0,configurable:!0,writable:!0}):a[c]=f;return a}
var f=[4,132],a=[6,134],c="Other;32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. label side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(";");d=function(k){function g(){if(!(this instanceof g))throw new TypeError("Cannot call a class as a function");
var a=arguments.length;for(var c=Array(a),f=0;f<a;f++)c[f]=arguments[f];a=w.call.apply(w,[this].concat(c));m(h(a),"_commentOffset",void 0);m(h(a),"_pictureOffset",void 0);return a}p(g,k);var w=b(g);v(g,[{key:"_loadData",value:function(a,c){var g=this;a.loadRange([4,7],{onSuccess:function(){g._loadBlock(a,4,c)}})}},{key:"_loadBlock",value:function(c,g,k){var b=this,m=c.getByteAt(g),w=c.getInteger24At(g+1,!0);if(-1!==f.indexOf(m)){var e=g+4;c.loadRange([e,e+w],{onSuccess:function(){b._commentOffset=
e;b._nextBlock(c,g,m,w,k)}})}else-1!==a.indexOf(m)?(e=g+4,c.loadRange([e,e+w],{onSuccess:function(){b._pictureOffset=e;b._nextBlock(c,g,m,w,k)}})):b._nextBlock(c,g,m,w,k)}},{key:"_nextBlock",value:function(a,c,g,f,k){var b=this;if(127<g)if(b._commentOffset)k.onSuccess();else k.onError({type:"loadData",info:"Comment block could not be found."});else a.loadRange([c+4+f,c+4+4+f],{onSuccess:function(){b._loadBlock(a,c+4+f,k)}})}},{key:"_parseData",value:function(a,g){var f=a.getLongAt(this._commentOffset,
!1)+(this._commentOffset+4);g=a.getLongAt(f,!1);f+=4;for(var k,b,m,w,e,d,h=0;h<g;h++){var x=a.getLongAt(f,!1),l=a.getStringWithCharsetAt(f+4,x,"utf-8").toString(),y=l.indexOf("=");l=[l.slice(0,y),l.slice(y+1)];switch(l[0].toUpperCase()){case "TITLE":k=l[1];break;case "ARTIST":b=l[1];break;case "ALBUM":m=l[1];break;case "TRACKNUMBER":w=l[1];break;case "GENRE":e=l[1]}f+=4+x}this._pictureOffset&&(d=a.getLongAt(this._pictureOffset,!0),g=this._pictureOffset+4,f=a.getLongAt(g,!0),h=g+4,g=a.getStringAt(h,
f),f=h+f,h=a.getLongAt(f,!0),x=f+4,f=a.getStringWithCharsetAt(x,h,"utf-8").toString(),h=x+h+16,x=a.getLongAt(h,!0),a=a.getBytesAt(h+4,x,!0),d={format:g,type:c[d],description:f,data:a});return{type:"FLAC",version:"1",tags:{title:k,artist:b,album:m,track:w,genre:e,picture:d}}}}],[{key:"getTagIdentifierByteRange",value:function(){return{offset:0,length:4}}},{key:"canReadTagFormat",value:function(a){return"fLaC"===String.fromCharCode.apply(String,a.slice(0,4))}}]);return g}(d("./MediaTagReader"));r.exports=
d},{"./MediaTagReader":12}],7:[function(d,r,q){function n(b){"@babel/helpers - typeof";n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(f){return typeof f}:function(f){return f&&"function"===typeof Symbol&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f};return n(b)}function u(b,f){for(var a=0;a<f.length;a++){var c=f[a];c.enumerable=c.enumerable||!1;c.configurable=!0;"value"in c&&(c.writable=!0);Object.defineProperty(b,c.key,c)}}function v(b,f,a){f&&u(b.prototype,
f);a&&u(b,a);return b}function p(b,f){if("function"!==typeof f&&null!==f)throw new TypeError("Super expression must either be null or a function");b.prototype=Object.create(f&&f.prototype,{constructor:{value:b,writable:!0,configurable:!0}});f&&e(b,f)}function e(b,f){e=Object.setPrototypeOf||function(a,c){a.__proto__=c;return a};return e(b,f)}function b(b){var f=h();return function(){var a=l(b);if(f){var c=l(this).constructor;a=Reflect.construct(a,arguments,c)}else a=a.apply(this,arguments);if(!a||
"object"!==n(a)&&"function"!==typeof a){if(void 0===this)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");a=this}return a}}function h(){if("undefined"===typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(m){return!1}}function l(b){l=Object.setPrototypeOf?Object.getPrototypeOf:function(f){return f.__proto__||Object.getPrototypeOf(f)};
return l(b)}q=d("./MediaTagReader");d("./MediaFileReader");d=function(m){function f(){if(!(this instanceof f))throw new TypeError("Cannot call a class as a function");return a.apply(this,arguments)}p(f,m);var a=b(f);v(f,[{key:"_loadData",value:function(a,f){var c=a.getSize();a.loadRange([c-128,c-1],f)}},{key:"_parseData",value:function(a,f){var c=a.getSize()-128,b=a.getStringWithCharsetAt(c+3,30).toString(),k=a.getStringWithCharsetAt(c+33,30).toString(),m=a.getStringWithCharsetAt(c+63,30).toString(),
e=a.getStringWithCharsetAt(c+93,4).toString();var d=a.getByteAt(c+97+28);f=a.getByteAt(c+97+29);if(0==d&&0!=f){var h="1.1";d=a.getStringWithCharsetAt(c+97,28).toString()}else h="1.0",d=a.getStringWithCharsetAt(c+97,30).toString(),f=0;a=a.getByteAt(c+97+30);a={type:"ID3",version:h,tags:{title:b,artist:k,album:m,year:e,comment:d,genre:255>a?t[a]:""}};f&&(a.tags.track=f);return a}}],[{key:"getTagIdentifierByteRange",value:function(){return{offset:-128,length:128}}},{key:"canReadTagFormat",value:function(a){return"TAG"===
String.fromCharCode.apply(String,a.slice(0,3))}}]);return f}(q);var t="Blues;Classic Rock;Country;Dance;Disco;Funk;Grunge;Hip-Hop;Jazz;Metal;New Age;Oldies;Other;Pop;R&B;Rap;Reggae;Rock;Techno;Industrial;Alternative;Ska;Death Metal;Pranks;Soundtrack;Euro-Techno;Ambient;Trip-Hop;Vocal;Jazz+Funk;Fusion;Trance;Classical;Instrumental;Acid;House;Game;Sound Clip;Gospel;Noise;AlternRock;Bass;Soul;Punk;Space;Meditative;Instrumental Pop;Instrumental Rock;Ethnic;Gothic;Darkwave;Techno-Industrial;Electronic;Pop-Folk;Eurodance;Dream;Southern Rock;Comedy;Cult;Gangsta;Top 40;Christian Rap;Pop/Funk;Jungle;Native American;Cabaret;New Wave;Psychadelic;Rave;Showtunes;Trailer;Lo-Fi;Tribal;Acid Punk;Acid Jazz;Polka;Retro;Musical;Rock & Roll;Hard Rock;Folk;Folk-Rock;National Folk;Swing;Fast Fusion;Bebob;Latin;Revival;Celtic;Bluegrass;Avantgarde;Gothic Rock;Progressive Rock;Psychedelic Rock;Symphonic Rock;Slow Rock;Big Band;Chorus;Easy Listening;Acoustic;Humour;Speech;Chanson;Opera;Chamber Music;Sonata;Symphony;Booty Bass;Primus;Porn Groove;Satire;Slow Jam;Club;Tango;Samba;Folklore;Ballad;Power Ballad;Rhythmic Soul;Freestyle;Duet;Punk Rock;Drum Solo;Acapella;Euro-House;Dance Hall".split(";");
r.exports=d},{"./MediaFileReader":11,"./MediaTagReader":12}],8:[function(d,r,q){function n(b,f){for(var a=0;a<f.length;a++){var c=f[a];c.enumerable=c.enumerable||!1;c.configurable=!0;"value"in c&&(c.writable=!0);Object.defineProperty(b,c.key,c)}}function u(b,f,a){f&&n(b.prototype,f);a&&n(b,a);return b}function v(b){switch(b){case 0:b="iso-8859-1";break;case 1:b="utf-16";break;case 2:b="utf-16be";break;case 3:b="utf-8";break;default:b="iso-8859-1"}return b}function p(b,f,a,c){var k=a.getStringWithCharsetAt(b+
1,f-1,c);b=a.getStringWithCharsetAt(b+1+k.bytesReadCount,f-1-k.bytesReadCount,c);return{user_description:k.toString(),data:b.toString()}}d("./MediaFileReader");var e=d("./StringUtils"),b=d("./ArrayFileReader"),h={BUF:"Recommended buffer size",CNT:"Play counter",COM:"Comments",CRA:"Audio encryption",CRM:"Encrypted meta frame",ETC:"Event timing codes",EQU:"Equalization",GEO:"General encapsulated object",IPL:"Involved people list",LNK:"Linked information",MCI:"Music CD Identifier",MLL:"MPEG location lookup table",
PIC:"Attached picture",POP:"Popularimeter",REV:"Reverb",RVA:"Relative volume adjustment",SLT:"Synchronized lyric/text",STC:"Synced tempo codes",TAL:"Album/Movie/Show title",TBP:"BPM (Beats Per Minute)",TCM:"Composer",TCO:"Content type",TCR:"Copyright message",TDA:"Date",TDY:"Playlist delay",TEN:"Encoded by",TFT:"File type",TIM:"Time",TKE:"Initial key",TLA:"Language(s)",TLE:"Length",TMT:"Media type",TOA:"Original artist(s)/performer(s)",TOF:"Original filename",TOL:"Original Lyricist(s)/text writer(s)",
TOR:"Original release year",TOT:"Original album/Movie/Show title",TP1:"Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group",TP2:"Band/Orchestra/Accompaniment",TP3:"Conductor/Performer refinement",TP4:"Interpreted, remixed, or otherwise modified by",TPA:"Part of a set",TPB:"Publisher",TRC:"ISRC (International Standard Recording Code)",TRD:"Recording dates",TRK:"Track number/Position in set",TSI:"Size",TSS:"Software/hardware and settings used for encoding",TT1:"Content group description",TT2:"Title/Songname/Content description",
TT3:"Subtitle/Description refinement",TXT:"Lyricist/text writer",TXX:"User defined text information frame",TYE:"Year",UFI:"Unique file identifier",ULT:"Unsychronized lyric/text transcription",WAF:"Official audio file webpage",WAR:"Official artist/performer webpage",WAS:"Official audio source webpage",WCM:"Commercial information",WCP:"Copyright/Legal information",WPB:"Publishers official webpage",WXX:"User defined URL link frame",AENC:"Audio encryption",APIC:"Attached picture",ASPI:"Audio seek point index",
CHAP:"Chapter",CTOC:"Table of contents",COMM:"Comments",COMR:"Commercial frame",ENCR:"Encryption method registration",EQU2:"Equalisation (2)",EQUA:"Equalization",ETCO:"Event timing codes",GEOB:"General encapsulated object",GRID:"Group identification registration",IPLS:"Involved people list",LINK:"Linked information",MCDI:"Music CD identifier",MLLT:"MPEG location lookup table",OWNE:"Ownership frame",PRIV:"Private frame",PCNT:"Play counter",POPM:"Popularimeter",POSS:"Position synchronisation frame",
RBUF:"Recommended buffer size",RVA2:"Relative volume adjustment (2)",RVAD:"Relative volume adjustment",RVRB:"Reverb",SEEK:"Seek frame",SYLT:"Synchronized lyric/text",SYTC:"Synchronized tempo codes",TALB:"Album/Movie/Show title",TBPM:"BPM (beats per minute)",TCOM:"Composer",TCON:"Content type",TCOP:"Copyright message",TDAT:"Date",TDLY:"Playlist delay",TDRC:"Recording time",TDRL:"Release time",TDTG:"Tagging time",TENC:"Encoded by",TEXT:"Lyricist/Text writer",TFLT:"File type",TIME:"Time",TIPL:"Involved people list",
TIT1:"Content group description",TIT2:"Title/songname/content description",TIT3:"Subtitle/Description refinement",TKEY:"Initial key",TLAN:"Language(s)",TLEN:"Length",TMCL:"Musician credits list",TMED:"Media type",TMOO:"Mood",TOAL:"Original album/movie/show title",TOFN:"Original filename",TOLY:"Original lyricist(s)/text writer(s)",TOPE:"Original artist(s)/performer(s)",TORY:"Original release year",TOWN:"File owner/licensee",TPE1:"Lead performer(s)/Soloist(s)",TPE2:"Band/orchestra/accompaniment",TPE3:"Conductor/performer refinement",
TPE4:"Interpreted, remixed, or otherwise modified by",TPOS:"Part of a set",TPRO:"Produced notice",TPUB:"Publisher",TRCK:"Track number/Position in set",TRDA:"Recording dates",TRSN:"Internet radio station name",TRSO:"Internet radio station owner",TSOA:"Album sort order",TSOP:"Performer sort order",TSOT:"Title sort order",TSIZ:"Size",TSRC:"ISRC (international standard recording code)",TSSE:"Software/Hardware and settings used for encoding",TSST:"Set subtitle",TYER:"Year",TXXX:"User defined text information frame",
UFID:"Unique file identifier",USER:"Terms of use",USLT:"Unsychronized lyric/text transcription",WCOM:"Commercial information",WCOP:"Copyright/Legal information",WOAF:"Official audio file webpage",WOAR:"Official artist/performer webpage",WOAS:"Official audio source webpage",WORS:"Official internet radio station homepage",WPAY:"Payment",WPUB:"Publishers official webpage",WXXX:"User defined URL link frame"};d=function(){function e(){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");
}u(e,null,[{key:"getFrameReaderFunction",value:function(b){return b in l?l[b]:"T"===b[0]?l["T*"]:"W"===b[0]?l["W*"]:null}},{key:"readFrames",value:function(b,a,c,k,g){for(var f={},d=this._getFrameHeaderSize(k);b<a-d;){var h=this._readFrameHeader(c,b,k),m=h.id;if(!m)break;var l=h.flags,t=h.size,p=b+h.headerSize,n=c;b+=h.headerSize+h.size;if(!g||-1!==g.indexOf(m)){if("MP3e"===m||"\x00MP3"===m||"\x00\x00MP"===m||" MP3"===m)break;l&&l.format.unsynchronisation&&!k.flags.unsynchronisation&&(n=this.getUnsyncFileReader(n,
p,t),p=0,t=n.getSize());l&&l.format.data_length_indicator&&(p+=4,t-=4);l=(h=e.getFrameReaderFunction(m))?h.apply(this,[p,t,n,l,k]):null;p=this._getFrameDescription(m);t={id:m,size:t,description:p,data:l};m in f?(f[m].id&&(f[m]=[f[m]]),f[m].push(t)):f[m]=t}}return f}},{key:"_getFrameHeaderSize",value:function(b){b=b.major;return 2==b?6:3==b||4==b?10:0}},{key:"_readFrameHeader",value:function(b,a,c){var f=c.major,g=null;c=this._getFrameHeaderSize(c);switch(f){case 2:var e=b.getStringAt(a,3);var m=b.getInteger24At(a+
3,!0);break;case 3:e=b.getStringAt(a,4);m=b.getLongAt(a+4,!0);break;case 4:e=b.getStringAt(a,4),m=b.getSynchsafeInteger32At(a+4)}if(e==String.fromCharCode(0,0,0)||e==String.fromCharCode(0,0,0,0))e="";e&&2<f&&(g=this._readFrameFlags(b,a+8));return{id:e||"",size:m||0,headerSize:c||0,flags:g}}},{key:"_readFrameFlags",value:function(b,a){return{message:{tag_alter_preservation:b.isBitSetAt(a,6),file_alter_preservation:b.isBitSetAt(a,5),read_only:b.isBitSetAt(a,4)},format:{grouping_identity:b.isBitSetAt(a+
1,7),compression:b.isBitSetAt(a+1,3),encryption:b.isBitSetAt(a+1,2),unsynchronisation:b.isBitSetAt(a+1,1),data_length_indicator:b.isBitSetAt(a+1,0)}}}},{key:"_getFrameDescription",value:function(b){return b in h?h[b]:"Unknown"}},{key:"getUnsyncFileReader",value:function(f,a,c){f=f.getBytesAt(a,c);for(a=0;a<f.length-1;a++)255===f[a]&&0===f[a+1]&&f.splice(a+1,1);return new b(f)}}]);return e}();var l={APIC:function(b,f,a,c,k){c=b;var g=v(a.getByteAt(b));switch(k&&k.major){case 2:k=a.getStringAt(b+1,
3);b+=4;break;case 3:case 4:k=a.getStringWithCharsetAt(b+1,f-1);b+=1+k.bytesReadCount;break;default:throw Error("Couldn't read ID3v2 major version.");}var e=a.getByteAt(b);e=t[e];g=a.getStringWithCharsetAt(b+1,f-(b-c)-1,g);b+=1+g.bytesReadCount;return{format:k.toString(),type:e,description:g.toString(),data:a.getBytesAt(b,c+f-b)}},CHAP:function(b,f,a,c,k){c=b;var g={},h=e.readNullTerminatedString(a.getBytesAt(b,f));g.id=h.toString();b+=h.bytesReadCount;g.startTime=a.getLongAt(b,!0);b+=4;g.endTime=
a.getLongAt(b,!0);b+=4;g.startOffset=a.getLongAt(b,!0);b+=4;g.endOffset=a.getLongAt(b,!0);b+=4;g.subFrames=this.readFrames(b,b+(f-(b-c)),a,k);return g},CTOC:function(b,f,a,c,k){c=b;var g={childElementIds:[],id:void 0,topLevel:void 0,ordered:void 0,entryCount:void 0,subFrames:void 0},h=e.readNullTerminatedString(a.getBytesAt(b,f));g.id=h.toString();b+=h.bytesReadCount;g.topLevel=a.isBitSetAt(b,1);g.ordered=a.isBitSetAt(b,0);b++;g.entryCount=a.getByteAt(b);b++;for(h=0;h<g.entryCount;h++){var d=e.readNullTerminatedString(a.getBytesAt(b,
f-(b-c)));g.childElementIds.push(d.toString());b+=d.bytesReadCount}g.subFrames=this.readFrames(b,b+(f-(b-c)),a,k);return g},COMM:function(b,f,a,c,k){var g=b,e=v(a.getByteAt(b));c=a.getStringAt(b+1,3);k=a.getStringWithCharsetAt(b+4,f-4,e);b+=4+k.bytesReadCount;b=a.getStringWithCharsetAt(b,g+f-b,e);return{language:c,short_description:k.toString(),text:b.toString()}}};l.COM=l.COMM;l.PIC=function(b,f,a,c,k){return l.APIC(b,f,a,c,k)};l.PCNT=function(b,f,a,c,k){return a.getLongAt(b,!1)};l.CNT=l.PCNT;l["T*"]=
function(b,f,a,c,k){c=v(a.getByteAt(b));return a.getStringWithCharsetAt(b+1,f-1,c).toString()};l.TXXX=function(b,f,a,c,k){c=v(a.getByteAt(b));return p(b,f,a,c)};l.WXXX=function(b,f,a,c,k){if(0===f)return null;c=v(a.getByteAt(b));return p(b,f,a,c)};l["W*"]=function(b,f,a,c,k){return 0===f?null:a.getStringWithCharsetAt(b,f,"iso-8859-1").toString()};l.TCON=function(b,f,a,c){return l["T*"].apply(this,arguments).replace(/^\(\d+\)/,"")};l.TCO=l.TCON;l.USLT=function(b,f,a,c,k){var g=b,e=v(a.getByteAt(b));
c=a.getStringAt(b+1,3);k=a.getStringWithCharsetAt(b+4,f-4,e);b+=4+k.bytesReadCount;b=a.getStringWithCharsetAt(b,g+f-b,e);return{language:c,descriptor:k.toString(),lyrics:b.toString()}};l.ULT=l.USLT;l.UFID=function(b,f,a,c,k){c=e.readNullTerminatedString(a.getBytesAt(b,f));b+=c.bytesReadCount;b=a.getBytesAt(b,f-c.bytesReadCount);return{ownerIdentifier:c.toString(),identifier:b}};var t="Other;32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. label side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(";");
r.exports=d},{"./ArrayFileReader":3,"./MediaFileReader":11,"./StringUtils":13}],9:[function(d,r,q){function n(b){"@babel/helpers - typeof";n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};return n(b)}function u(b,a){for(var c=0;c<a.length;c++){var f=a[c];f.enumerable=f.enumerable||!1;f.configurable=!0;"value"in f&&(f.writable=!0);Object.defineProperty(b,
f.key,f)}}function v(b,a,c){a&&u(b.prototype,a);c&&u(b,c);return b}function p(b,a){if("function"!==typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");b.prototype=Object.create(a&&a.prototype,{constructor:{value:b,writable:!0,configurable:!0}});a&&e(b,a)}function e(b,a){e=Object.setPrototypeOf||function(a,b){a.__proto__=b;return a};return e(b,a)}function b(b){var a=h();return function(){var c=l(b);if(a){var f=l(this).constructor;c=Reflect.construct(c,arguments,
f)}else c=c.apply(this,arguments);if(!c||"object"!==n(c)&&"function"!==typeof c){if(void 0===this)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");c=this}return c}}function h(){if("undefined"===typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(f){return!1}}function l(b){l=Object.setPrototypeOf?Object.getPrototypeOf:
function(a){return a.__proto__||Object.getPrototypeOf(a)};return l(b)}q=d("./MediaTagReader");d("./MediaFileReader");var t=d("./ID3v2FrameReader");d=function(f){function a(){if(!(this instanceof a))throw new TypeError("Cannot call a class as a function");return c.apply(this,arguments)}p(a,f);var c=b(a);v(a,[{key:"_loadData",value:function(a,b){a.loadRange([6,9],{onSuccess:function(){a.loadRange([0,10+a.getSynchsafeInteger32At(6)-1],b)},onError:b.onError})}},{key:"_parseData",value:function(a,b){var c,
g=0,f=a.getByteAt(g+3);if(4<f)return{type:"ID3",version:">2.4",tags:{}};var e=a.getByteAt(g+4),k=a.isBitSetAt(g+5,7),h=a.isBitSetAt(g+5,6),d=a.isBitSetAt(g+5,5),l=a.getSynchsafeInteger32At(g+6);g+=10;if(h)if(4===f){var p=a.getSynchsafeInteger32At(g);g+=p}else p=a.getLongAt(g,!0),g+=p+4;p={type:"ID3",version:"2."+f+"."+e,major:f,revision:e,flags:{unsynchronisation:k,extended_header:h,experimental_indicator:d,footer_present:!1},size:l,tags:{}};b&&(c=this._expandShortcutTags(b));b=l+10;p.flags.unsynchronisation&&
(a=t.getUnsyncFileReader(a,g,l),g=0,b=a.getSize());a=t.readFrames(g,b,a,p,c);for(var n in m)m.hasOwnProperty(n)&&(c=this._getFrameData(a,m[n]))&&(p.tags[n]=c);for(var q in a)a.hasOwnProperty(q)&&(p.tags[q]=a[q]);return p}},{key:"_getFrameData",value:function(a,b){for(var c=0,g;g=b[c];c++)if(g in a)return a=a[g]instanceof Array?a[g][0]:a[g],a.data}},{key:"getShortcuts",value:function(){return m}}],[{key:"getTagIdentifierByteRange",value:function(){return{offset:0,length:10}}},{key:"canReadTagFormat",
value:function(a){return"ID3"===String.fromCharCode.apply(String,a.slice(0,3))}}]);return a}(q);var m={title:["TIT2","TT2"],artist:["TPE1","TP1"],album:["TALB","TAL"],year:["TYER","TYE"],comment:["COMM","COM"],track:["TRCK","TRK"],genre:["TCON","TCO"],picture:["APIC","PIC"],lyrics:["USLT","ULT"]};r.exports=d},{"./ID3v2FrameReader":8,"./MediaFileReader":11,"./MediaTagReader":12}],10:[function(d,r,q){function n(a){"@babel/helpers - typeof";n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?
function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};return n(a)}function u(a,b){for(var c=0;c<b.length;c++){var g=b[c];g.enumerable=g.enumerable||!1;g.configurable=!0;"value"in g&&(g.writable=!0);Object.defineProperty(a,g.key,g)}}function v(a,b,f){b&&u(a.prototype,b);f&&u(a,f);return a}function p(a,b){if("function"!==typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");
a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}});b&&e(a,b)}function e(a,b){e=Object.setPrototypeOf||function(a,b){a.__proto__=b;return a};return e(a,b)}function b(a){var b=h();return function(){var c=l(a);if(b){var g=l(this).constructor;c=Reflect.construct(c,arguments,g)}else c=c.apply(this,arguments);if(!c||"object"!==n(c)&&"function"!==typeof c){if(void 0===this)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");c=this}return c}}
function h(){if("undefined"===typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}function l(a){l=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)};return l(a)}q=d("./MediaTagReader");d("./MediaFileReader");d=function(a){function c(){if(!(this instanceof c))throw new TypeError("Cannot call a class as a function");
return e.apply(this,arguments)}p(c,a);var e=b(c);v(c,[{key:"_loadData",value:function(a,b){var c=this;a.loadRange([0,16],{onSuccess:function(){c._loadAtom(a,0,"",b)},onError:b.onError})}},{key:"_loadAtom",value:function(a,b,c,f){if(b>=a.getSize())f.onSuccess();else{var g=this,e=a.getLongAt(b,!0);if(0==e||isNaN(e))f.onSuccess();else{var h=a.getStringAt(b+4,4);if(this._isContainerAtom(h)){"meta"==h&&(b+=4);var d=(c?c+".":"")+h;"moov.udta.meta.ilst"===d?a.loadRange([b,b+e],f):a.loadRange([b+8,b+8+8],
{onSuccess:function(){g._loadAtom(a,b+8,d,f)},onError:f.onError})}else a.loadRange([b+e,b+e+8],{onSuccess:function(){g._loadAtom(a,b+e,c,f)},onError:f.onError})}}}},{key:"_isContainerAtom",value:function(a){return 0<=["moov","udta","meta","ilst"].indexOf(a)}},{key:"_canReadAtom",value:function(a){return"----"!==a}},{key:"_parseData",value:function(a,b){var c={};b=this._expandShortcutTags(b);this._readAtom(c,a,0,a.getSize(),b);for(var g in f)f.hasOwnProperty(g)&&(b=c[f[g]])&&(c[g]="track"===g?b.data.track:
b.data);return{type:"MP4",ftyp:a.getStringAt(8,4),version:a.getLongAt(12,!0),tags:c}}},{key:"_readAtom",value:function(a,b,c,f,e,h,d){d=void 0===d?"":d+"  ";for(var g=c;g<c+f;){var l=b.getLongAt(g,!0);if(0==l)break;var k=b.getStringAt(g+4,4);if(this._isContainerAtom(k)){"meta"==k&&(g+=4);this._readAtom(a,b,g+8,l-8,e,(h?h+".":"")+k,d);break}(!e||0<=e.indexOf(k))&&"moov.udta.meta.ilst"===h&&this._canReadAtom(k)&&(a[k]=this._readMetadataAtom(b,g));g+=l}}},{key:"_readMetadataAtom",value:function(a,b){var c=
a.getLongAt(b,!0),g=a.getStringAt(b+4,4),f=a.getInteger24At(b+16+1,!0);f=t[f];if("trkn"==g)var e={track:a.getShortAt(b+16+10,!0),total:a.getShortAt(b+16+14,!0)};else if("disk"==g)e={disk:a.getShortAt(b+16+10,!0),total:a.getShortAt(b+16+14,!0)};else{b+=24;var h=c-24;"covr"===g&&"uint8"===f&&(f="jpeg");switch(f){case "text":e=a.getStringWithCharsetAt(b,h,"utf-8").toString();break;case "uint8":e=a.getShortAt(b,!1);break;case "int":case "uint":e=("int"==f?1==h?a.getSByteAt:2==h?a.getSShortAt:4==h?a.getSLongAt:
a.getLongAt:1==h?a.getByteAt:2==h?a.getShortAt:a.getLongAt).call(a,b+(8==h?4:0),!0);break;case "jpeg":case "png":e={format:"image/"+f,data:a.getBytesAt(b,h)}}}return{id:g,size:c,description:m[g]||"Unknown",data:e}}},{key:"getShortcuts",value:function(){return f}}],[{key:"getTagIdentifierByteRange",value:function(){return{offset:0,length:16}}},{key:"canReadTagFormat",value:function(a){return"ftyp"===String.fromCharCode.apply(String,a.slice(4,8))}}]);return c}(q);var t={0:"uint8",1:"text",13:"jpeg",
14:"png",21:"int",22:"uint"},m={"\u00a9alb":"Album","\u00a9ART":"Artist",aART:"Album Artist","\u00a9day":"Release Date","\u00a9nam":"Title","\u00a9gen":"Genre",gnre:"Genre",trkn:"Track Number","\u00a9wrt":"Composer","\u00a9too":"Encoding Tool","\u00a9enc":"Encoded By",cprt:"Copyright",covr:"Cover Art","\u00a9grp":"Grouping",keyw:"Keywords","\u00a9lyr":"Lyrics","\u00a9cmt":"Comment",tmpo:"Tempo",cpil:"Compilation",disk:"Disc Number",tvsh:"TV Show Name",tven:"TV Episode ID",tvsn:"TV Season",tves:"TV Episode",
tvnn:"TV Network",desc:"Description",ldes:"Long Description",sonm:"Sort Name",soar:"Sort Artist",soaa:"Sort Album",soco:"Sort Composer",sosn:"Sort Show",purd:"Purchase Date",pcst:"Podcast",purl:"Podcast URL",catg:"Category",hdvd:"HD Video",stik:"Media Type",rtng:"Content Rating",pgap:"Gapless Playback",apID:"Purchase Account",sfID:"Country Code",atID:"Artist ID",cnID:"Catalog ID",plID:"Collection ID",geID:"Genre ID","xid ":"Vendor Information",flvr:"Codec Flavor"},f={title:"\u00a9nam",artist:"\u00a9ART",
album:"\u00a9alb",year:"\u00a9day",comment:"\u00a9cmt",track:"trkn",genre:"\u00a9gen",picture:"covr",lyrics:"\u00a9lyr"};r.exports=d},{"./MediaFileReader":11,"./MediaTagReader":12}],11:[function(d,r,q){function n(e,b){for(var h=0;h<b.length;h++){var d=b[h];d.enumerable=d.enumerable||!1;d.configurable=!0;"value"in d&&(d.writable=!0);Object.defineProperty(e,d.key,d)}}function u(e,b,h){b&&n(e.prototype,b);h&&n(e,h);return e}function v(e,b,h){b in e?Object.defineProperty(e,b,{value:h,enumerable:!0,configurable:!0,
writable:!0}):e[b]=h;return e}var p=d("./StringUtils");d=function(){function e(b){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");v(this,"_isInitialized",void 0);v(this,"_size",void 0);this._isInitialized=!1;this._size=0}u(e,[{key:"init",value:function(b){var e=this;if(this._isInitialized)setTimeout(b.onSuccess,1);else return this._init({onSuccess:function(){e._isInitialized=!0;b.onSuccess()},onError:b.onError})}},{key:"_init",value:function(b){throw Error("Must implement init function");
}},{key:"loadRange",value:function(b,e){throw Error("Must implement loadRange function");}},{key:"getSize",value:function(){if(!this._isInitialized)throw Error("init() must be called first.");return this._size}},{key:"getByteAt",value:function(b){throw Error("Must implement getByteAt function");}},{key:"getBytesAt",value:function(b,e){for(var h=Array(e),d=0;d<e;d++)h[d]=this.getByteAt(b+d);return h}},{key:"isBitSetAt",value:function(b,e){return 0!=(this.getByteAt(b)&1<<e)}},{key:"getSByteAt",value:function(b){b=
this.getByteAt(b);return 127<b?b-256:b}},{key:"getShortAt",value:function(b,e){b=e?(this.getByteAt(b)<<8)+this.getByteAt(b+1):(this.getByteAt(b+1)<<8)+this.getByteAt(b);0>b&&(b+=65536);return b}},{key:"getSShortAt",value:function(b,e){b=this.getShortAt(b,e);return 32767<b?b-65536:b}},{key:"getLongAt",value:function(b,e){var d=this.getByteAt(b),h=this.getByteAt(b+1),m=this.getByteAt(b+2);b=this.getByteAt(b+3);e=e?(((d<<8)+h<<8)+m<<8)+b:(((b<<8)+m<<8)+h<<8)+d;0>e&&(e+=4294967296);return e}},{key:"getSLongAt",
value:function(b,e){b=this.getLongAt(b,e);return 2147483647<b?b-4294967296:b}},{key:"getInteger24At",value:function(b,e){var d=this.getByteAt(b),h=this.getByteAt(b+1);b=this.getByteAt(b+2);e=e?((d<<8)+h<<8)+b:((b<<8)+h<<8)+d;0>e&&(e+=16777216);return e}},{key:"getStringAt",value:function(b,e){for(var d=[],h=b,m=0;h<b+e;h++,m++)d[m]=String.fromCharCode(this.getByteAt(h));return d.join("")}},{key:"getStringWithCharsetAt",value:function(b,e,d){b=this.getBytesAt(b,e);switch((d||"").toLowerCase()){case "utf-16":case "utf-16le":case "utf-16be":d=
p.readUTF16String(b,"utf-16be"===d);break;case "utf-8":d=p.readUTF8String(b);break;default:d=p.readNullTerminatedString(b)}return d}},{key:"getCharAt",value:function(b){return String.fromCharCode(this.getByteAt(b))}},{key:"getSynchsafeInteger32At",value:function(b){var e=this.getByteAt(b),d=this.getByteAt(b+1),p=this.getByteAt(b+2);return this.getByteAt(b+3)&127|(p&127)<<7|(d&127)<<14|(e&127)<<21}}],[{key:"canReadFile",value:function(b){throw Error("Must implement canReadFile function");}}]);return e}();
r.exports=d},{"./StringUtils":13}],12:[function(d,r,q){function n(d,e){for(var b=0;b<e.length;b++){var h=e[b];h.enumerable=h.enumerable||!1;h.configurable=!0;"value"in h&&(h.writable=!0);Object.defineProperty(d,h.key,h)}}function u(d,e,b){e&&n(d.prototype,e);b&&n(d,b);return d}function v(d,e,b){e in d?Object.defineProperty(d,e,{value:b,enumerable:!0,configurable:!0,writable:!0}):d[e]=b;return d}d("./MediaFileReader");d=function(){function d(e){if(!(this instanceof d))throw new TypeError("Cannot call a class as a function");
v(this,"_mediaFileReader",void 0);v(this,"_tags",void 0);this._mediaFileReader=e;this._tags=null}u(d,[{key:"setTagsToRead",value:function(e){this._tags=e;return this}},{key:"read",value:function(e){var b=this;this._mediaFileReader.init({onSuccess:function(){b._loadData(b._mediaFileReader,{onSuccess:function(){try{var d=b._parseData(b._mediaFileReader,b._tags)}catch(l){if(e.onError){e.onError({type:"parseData",info:l.message});return}}e.onSuccess(d)},onError:e.onError})},onError:e.onError})}},{key:"getShortcuts",
value:function(){return{}}},{key:"_loadData",value:function(e,b){throw Error("Must implement _loadData function");}},{key:"_parseData",value:function(e,b){throw Error("Must implement _parseData function");}},{key:"_expandShortcutTags",value:function(e){if(!e)return null;for(var b=[],d=this.getShortcuts(),l=0,n;n=e[l];l++)b=b.concat(d[n]||[n]);return b}}],[{key:"getTagIdentifierByteRange",value:function(){throw Error("Must implement");}},{key:"canReadTagFormat",value:function(e){throw Error("Must implement");
}}]);return d}();r.exports=d},{"./MediaFileReader":11}],13:[function(d,r,q){function n(e,b){for(var d=0;d<b.length;d++){var l=b[d];l.enumerable=l.enumerable||!1;l.configurable=!0;"value"in l&&(l.writable=!0);Object.defineProperty(e,l.key,l)}}function u(e,b,d){b&&n(e.prototype,b);d&&n(e,d);return e}function v(e,b,d){b in e?Object.defineProperty(e,b,{value:d,enumerable:!0,configurable:!0,writable:!0}):e[b]=d;return e}var p=function(){function e(b,d){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");
v(this,"_value",void 0);v(this,"bytesReadCount",void 0);v(this,"length",void 0);this._value=b;this.bytesReadCount=d;this.length=b.length}u(e,[{key:"toString",value:function(){return this._value}}]);return e}();r.exports={readUTF16String:function(e,b,d){var h=0,n=1,m=0;d=Math.min(d||e.length,e.length);254==e[0]&&255==e[1]?(b=!0,h=2):255==e[0]&&254==e[1]&&(b=!1,h=2);b&&(n=0,m=1);b=[];for(var f=0;h<d;f++){var a=e[h+n],c=(a<<8)+e[h+m];h+=2;if(0==c)break;else 216>a||224<=a?b[f]=String.fromCharCode(c):
(a=(e[h+n]<<8)+e[h+m],h+=2,b[f]=String.fromCharCode(c,a))}return new p(b.join(""),h)},readUTF8String:function(e,b){var d=0;b=Math.min(b||e.length,e.length);239==e[0]&&187==e[1]&&191==e[2]&&(d=3);for(var l=[],n=0;d<b;n++){var m=e[d++];if(0==m)break;else if(128>m)l[n]=String.fromCharCode(m);else if(194<=m&&224>m){var f=e[d++];l[n]=String.fromCharCode(((m&31)<<6)+(f&63))}else if(224<=m&&240>m){f=e[d++];var a=e[d++];l[n]=String.fromCharCode(((m&255)<<12)+((f&63)<<6)+(a&63))}else if(240<=m&&245>m){f=e[d++];
a=e[d++];var c=e[d++];a=((m&7)<<18)+((f&63)<<12)+((a&63)<<6)+(c&63)-65536;l[n]=String.fromCharCode((a>>10)+55296,(a&1023)+56320)}}return new p(l.join(""),d)},readNullTerminatedString:function(e,b){var d=[];b=b||e.length;for(var l=0;l<b;){var n=e[l++];if(0==n)break;d[l-1]=String.fromCharCode(n)}return new p(d.join(""),l)}}},{}],14:[function(d,r,q){function n(a){"@babel/helpers - typeof";n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&
"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};return n(a)}function u(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1;d.configurable=!0;"value"in d&&(d.writable=!0);Object.defineProperty(a,d.key,d)}}function v(a,b,d){b&&u(a.prototype,b);d&&u(a,d);return a}function p(a,b){if("function"!==typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,
writable:!0,configurable:!0}});b&&e(a,b)}function e(a,b){e=Object.setPrototypeOf||function(a,b){a.__proto__=b;return a};return e(a,b)}function b(a){var b=l();return function(){var c=t(a);if(b){var d=t(this).constructor;c=Reflect.construct(c,arguments,d)}else c=c.apply(this,arguments);c=!c||"object"!==n(c)&&"function"!==typeof c?h(this):c;return c}}function h(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function l(){if("undefined"===
typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}function t(a){t=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)};return t(a)}function m(a,b,d){b in a?Object.defineProperty(a,b,{value:d,enumerable:!0,configurable:!0,writable:!0}):a[b]=d;return a}var f=d("./ChunkedFileData");q=function(a){function c(a){if(!(this instanceof
c))throw new TypeError("Cannot call a class as a function");var b=e.call(this);m(h(b),"_url",void 0);m(h(b),"_fileData",void 0);b._url=a;b._fileData=new f;return b}p(c,a);var e=b(c);v(c,[{key:"_init",value:function(a){c._config.avoidHeadRequests?this._fetchSizeWithGetRequest(a):this._fetchSizeWithHeadRequest(a)}},{key:"_fetchSizeWithHeadRequest",value:function(a){var b=this;this._makeXHRRequest("HEAD",null,{onSuccess:function(c){(c=b._parseContentLength(c))?(b._size=c,a.onSuccess()):b._fetchSizeWithGetRequest(a)},
onError:a.onError})}},{key:"_fetchSizeWithGetRequest",value:function(a){var b=this,c=this._roundRangeToChunkMultiple([0,0]);this._makeXHRRequest("GET",c,{onSuccess:function(c){var d=b._parseContentRange(c);c=b._getXhrResponseContent(c);if(d){if(null==d.instanceLength){b._fetchEntireFile(a);return}b._size=d.instanceLength}else b._size=c.length;b._fileData.addData(0,c);a.onSuccess()},onError:a.onError})}},{key:"_fetchEntireFile",value:function(a){var b=this;this._makeXHRRequest("GET",null,{onSuccess:function(c){c=
b._getXhrResponseContent(c);b._size=c.length;b._fileData.addData(0,c);a.onSuccess()},onError:a.onError})}},{key:"_getXhrResponseContent",value:function(a){return a.responseBody||a.responseText||""}},{key:"_parseContentLength",value:function(a){a=this._getResponseHeader(a,"Content-Length");return null==a?a:parseInt(a,10)}},{key:"_parseContentRange",value:function(a){if(a=this._getResponseHeader(a,"Content-Range")){var b=a.match(/bytes (\d+)-(\d+)\/(?:(\d+)|\*)/i);if(!b)throw Error("FIXME: Unknown Content-Range syntax: "+
a);return{firstBytePosition:parseInt(b[1],10),lastBytePosition:parseInt(b[2],10),instanceLength:b[3]?parseInt(b[3],10):null}}return null}},{key:"loadRange",value:function(a,b){var c=this;c._fileData.hasDataRange(a[0],Math.min(c._size,a[1]))?setTimeout(b.onSuccess,1):(a=this._roundRangeToChunkMultiple(a),a[1]=Math.min(c._size,a[1]),this._makeXHRRequest("GET",a,{onSuccess:function(d){d=c._getXhrResponseContent(d);c._fileData.addData(a[0],d);b.onSuccess()},onError:b.onError}))}},{key:"_roundRangeToChunkMultiple",
value:function(a){return[a[0],a[0]+1024*Math.ceil((a[1]-a[0]+1)/1024)-1]}},{key:"_makeXHRRequest",value:function(a,b,d){var e=this._createXHRObject();e.open(a,this._url);var f=function(){if(200===e.status||206===e.status)d.onSuccess(e);else if(d.onError)d.onError({type:"xhr",info:"Unexpected HTTP status "+e.status+".",xhr:e});e=null};"undefined"!==typeof e.onload?(e.onload=f,e.onerror=function(){if(d.onError)d.onError({type:"xhr",info:"Generic XHR error, check xhr object.",xhr:e})}):e.onreadystatechange=
function(){4===e.readyState&&f()};c._config.timeoutInSec&&(e.timeout=1E3*c._config.timeoutInSec,e.ontimeout=function(){if(d.onError)d.onError({type:"xhr",info:"Timeout after "+e.timeout/1E3+"s. Use jsmediatags.Config.setXhrTimeout to override.",xhr:e})});e.overrideMimeType("text/plain; charset=x-user-defined");b&&this._setRequestHeader(e,"Range","bytes="+b[0]+"-"+b[1]);this._setRequestHeader(e,"If-Modified-Since","Sat, 01 Jan 1970 00:00:00 GMT");e.send(null)}},{key:"_setRequestHeader",value:function(a,
b,d){0>c._config.disallowedXhrHeaders.indexOf(b.toLowerCase())&&a.setRequestHeader(b,d)}},{key:"_hasResponseHeader",value:function(a,b){a=a.getAllResponseHeaders();if(!a)return!1;a=a.split("\r\n");for(var c=[],d=0;d<a.length;d++)c[d]=a[d].split(":")[0].toLowerCase();return 0<=c.indexOf(b.toLowerCase())}},{key:"_getResponseHeader",value:function(a,b){return this._hasResponseHeader(a,b)?a.getResponseHeader(b):null}},{key:"getByteAt",value:function(a){return this._fileData.getByteAt(a).charCodeAt(0)&
255}},{key:"_isWebWorker",value:function(){return"undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope}},{key:"_createXHRObject",value:function(){if("undefined"===typeof window&&!this._isWebWorker())return new (d("xhr2").XMLHttpRequest);if("undefined"!==typeof XMLHttpRequest)return new XMLHttpRequest;throw Error("XMLHttpRequest is not supported");}}],[{key:"canReadFile",value:function(a){return"string"===typeof a&&/^[a-z]+:\/\//i.test(a)}},{key:"setConfig",value:function(a){for(var b in a)a.hasOwnProperty(b)&&
(this._config[b]=a[b]);a=this._config.disallowedXhrHeaders;for(b=0;b<a.length;b++)a[b]=a[b].toLowerCase()}}]);return c}(d("./MediaFileReader"));m(q,"_config",void 0);q._config={avoidHeadRequests:!1,disallowedXhrHeaders:[],timeoutInSec:30};r.exports=q},{"./ChunkedFileData":5,"./MediaFileReader":11,xhr2:2}],15:[function(d,r,q){function n(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function");}function u(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||
!1;d.configurable=!0;"value"in d&&(d.writable=!0);Object.defineProperty(a,d.key,d)}}function v(a,b,c){b&&u(a.prototype,b);c&&u(a,c);return a}function p(a,b,c){b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c;return a}function e(a,b){var c=0>a.offset&&(-a.offset>b||0<a.offset+a.length);return!(0<=a.offset&&a.offset+a.length>=b||c)}d("./MediaFileReader");var b=d("./XhrFileReader"),h=d("./BlobFileReader"),l=d("./ArrayFileReader");d("./MediaTagReader");var t=
d("./ID3v1TagReader"),m=d("./ID3v2TagReader"),f=d("./MP4TagReader"),a=d("./FLACTagReader"),c=[],k=[],g=function(){function a(b){n(this,a);p(this,"_file",void 0);p(this,"_tagsToRead",void 0);p(this,"_fileReader",void 0);p(this,"_tagReader",void 0);this._file=b}v(a,[{key:"setTagsToRead",value:function(a){this._tagsToRead=a;return this}},{key:"setFileReader",value:function(a){this._fileReader=a;return this}},{key:"setTagReader",value:function(a){this._tagReader=a;return this}},{key:"read",value:function(a){var b=
new (this._getFileReader())(this._file),c=this;b.init({onSuccess:function(){c._getTagReader(b,{onSuccess:function(d){(new d(b)).setTagsToRead(c._tagsToRead).read(a)},onError:a.onError})},onError:a.onError})}},{key:"_getFileReader",value:function(){return this._fileReader?this._fileReader:this._findFileReader()}},{key:"_findFileReader",value:function(){for(var a=0;a<c.length;a++)if(c[a].canReadFile(this._file))return c[a];throw Error("No suitable file reader found for "+this._file);}},{key:"_getTagReader",
value:function(a,b){if(this._tagReader){var c=this._tagReader;setTimeout(function(){b.onSuccess(c)},1)}else this._findTagReader(a,b)}},{key:"_findTagReader",value:function(a,b){for(var c=[],d=[],f=a.getSize(),g=0;g<k.length;g++){var h=k[g].getTagIdentifierByteRange();e(h,f)&&(0<=h.offset&&h.offset<f/2||0>h.offset&&h.offset<-f/2?c.push(k[g]):d.push(k[g]))}var l=!1;g={onSuccess:function(){if(l){for(var c=0;c<k.length;c++){var d=k[c].getTagIdentifierByteRange();if(e(d,f)){try{var g=a.getBytesAt(0<=d.offset?
d.offset:d.offset+f,d.length)}catch(z){if(b.onError)b.onError({type:"fileReader",info:z.message});return}if(k[c].canReadTagFormat(g)){b.onSuccess(k[c]);return}}}if(b.onError)b.onError({type:"tagFormat",info:"No suitable tag reader found"})}else l=!0},onError:b.onError};this._loadTagIdentifierRanges(a,c,g);this._loadTagIdentifierRanges(a,d,g)}},{key:"_loadTagIdentifierRanges",value:function(a,b,c){if(0===b.length)setTimeout(c.onSuccess,1);else{for(var d=[Number.MAX_VALUE,0],e=a.getSize(),f=0;f<b.length;f++){var g=
b[f].getTagIdentifierByteRange(),h=0<=g.offset?g.offset:g.offset+e;g=h+g.length-1;d[0]=Math.min(h,d[0]);d[1]=Math.max(g,d[1])}a.loadRange(d,c)}}}]);return a}();q=function(){function a(){n(this,a)}v(a,null,[{key:"addFileReader",value:function(b){c.push(b);return a}},{key:"addTagReader",value:function(b){k.push(b);return a}},{key:"removeTagReader",value:function(b){b=k.indexOf(b);0<=b&&k.splice(b,1);return a}},{key:"EXPERIMENTAL_avoidHeadRequests",value:function(){b.setConfig({avoidHeadRequests:!0})}},
{key:"setDisallowedXhrHeaders",value:function(a){b.setConfig({disallowedXhrHeaders:a})}},{key:"setXhrTimeoutInSec",value:function(a){b.setConfig({timeoutInSec:a})}}]);return a}();q.addFileReader(b).addFileReader(h).addFileReader(l).addTagReader(m).addTagReader(t).addTagReader(f).addTagReader(a);"undefined"===typeof process||process.browser||(d="undefined"!==typeof navigator&&"ReactNative"===navigator.product?d("./ReactNativeFileReader"):d("./NodeFileReader"),q.addFileReader(d));r.exports={read:function(a,
b){(new g(a)).read(b)},Reader:g,Config:q}},{"./ArrayFileReader":3,"./BlobFileReader":4,"./FLACTagReader":6,"./ID3v1TagReader":7,"./ID3v2TagReader":9,"./MP4TagReader":10,"./MediaFileReader":11,"./MediaTagReader":12,"./NodeFileReader":1,"./ReactNativeFileReader":1,"./XhrFileReader":14}]},{},[15])(15)});

return window.jsmediatags;
}).call(window);

const STORAGE_KEY = 'echo-local-simple-settings';
const SORT_KEY = 'echo-local-simple-sort';
const _counts = {}; let _seq = 0; let _songs = [];
// 内存封面缓存（blob: / http(s) URL），跨页面导航持久化
const _coverCache = new Map();
// 已登记的内嵌封面 blob URL：path → { mt, url }。同一文件内容未变时复用同一
// URL，被替换时才 revoke，避免每次扫描/启动都新建 object URL 造成泄漏
const _blobCovers = new Map();

async function hashStr(s) { const d = new TextEncoder().encode(s); const h = await crypto.subtle.digest('SHA-256', d); return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0, 16); }

/** 统一设置歌曲封面：登记/复用/回收内嵌封面 blob URL */
function applyCover(sg, url, mt) {
  if (!url || sg.coverUrl === url) return;
  const old = sg.coverUrl;
  if (url.startsWith('blob:')) {
    const ent = _blobCovers.get(sg._path);
    if (ent && ent.mt === mt && ent.url !== url) {
      // 同一文件（内容未变）被重复解析：丢弃新生成的重复 blob，复用已登记的
      try { URL.revokeObjectURL(url); } catch {}
      url = ent.url;
    } else if (ent && ent.mt !== mt) {
      // 文件已变更：旧 blob 失效，回收后登记新值
      if (ent.url !== old) { try { URL.revokeObjectURL(ent.url); } catch {} }
      _blobCovers.set(sg._path, { mt, url });
    } else if (!ent) {
      _blobCovers.set(sg._path, { mt, url });
    }
    if (old === url) return;
  }
  sg.coverUrl = url;
  if (old && old !== url && old.startsWith('blob:')) { try { URL.revokeObjectURL(old); } catch {} }
}

/** 内嵌封面落盘缓存：写入 <dir>/covers/<hash>.img，用文件 URL，避免每次重读音频文件 */
async function applyEmbeddedCover(ctx, sg, blobUrl, mt) {
  if (!blobUrl) return;
  try {
    const key = await hashStr(sg._path + ':' + mt);
    const file = ctx.descriptor.directory + '/cover-cache/' + key + '.img';
    const res = await fetch(blobUrl);
    const bytes = new Uint8Array(await res.arrayBuffer());
    await ctx.fs.writeFile(file, bytes, { overwrite: true, createDirectories: true });
    const u = await ctx.fs.getFileUrl(file);
    const url = u && u.ok ? u.url : blobUrl;
    sg._coverFile = file;
    applyCover(sg, url, mt);
    if (url !== blobUrl) { try { URL.revokeObjectURL(blobUrl); } catch {} }
    return;
  } catch {}
  applyCover(sg, blobUrl, mt);
}

/** 从落盘缓存恢复封面文件 URL（避免读音频文件） */
async function restoreCoverFile(ctx, sg) {
  if (!sg || !sg._coverFile || sg.coverUrl) return;
  try {
    const u = await ctx.fs.getFileUrl(sg._coverFile);
    if (u && u.ok && u.url) { sg.coverUrl = u.url; _coverCache.set(sg.id, u.url); }
  } catch {}
}

// ── 元数据缓存（song-cache.json）──
let _metaSaveTimer = null;
const _metaCacheFile = (ctx) => ctx.descriptor.directory + '/song-cache.json';
/** 防抖保存歌曲元数据缓存（仅持久化小体积字段：文本元数据 + http(s) 封面 URL + _noEmbed 标记） */
function persistMetaCache(ctx, songs, folderPaths) {
  clearTimeout(_metaSaveTimer);
  _metaSaveTimer = setTimeout(async () => {
    _metaSaveTimer = null;
    try {
      const folderHash = await hashStr(folderPaths.map(f => (typeof f === 'string' ? f : f?.path || '')).sort().join('|'));
      const meta = songs.map(sg => ({
        id: sg.id, title: sg.title, name: sg.name, artist: sg.artist, album: sg.album,
        audioUrl: sg.audioUrl, hash: sg.hash, mixSongId: sg.mixSongId,
        source: sg.source, lyric: sg.lyric,
        // 内嵌封面是 blob URL，无法持久化；http(s) 在线封面很小，直接写入 JSON
        coverUrl: sg.coverUrl && /^https?:\/\//.test(sg.coverUrl) ? sg.coverUrl : '',
        _coverFile: sg._coverFile || '',
        _noEmbed: !!sg._noEmbed,
        _mt: sg._mt, _path: sg._path, _folder: sg._folder, _alias: sg._alias,
      }));
      await ctx.fs.writeFile(_metaCacheFile(ctx), JSON.stringify({ songs: meta, folderHash, _seq }), { overwrite: true, createDirectories: true });
    } catch {}
  }, 300);
}
async function readMetaCache(ctx) {
  try { const r = await ctx.fs.readTextFile(_metaCacheFile(ctx), { encoding: 'utf8' }); if (r.ok) return JSON.parse(r.content); } catch {}
  return null;
}

// ── 酷狗封面匹配（单一实现 + 全局串行限流，供播放/切歌两处共用）──
let _kugouChain = Promise.resolve();
let _kugouLastTs = 0;
function buildKugouKeyword(sg) {
  const artist = sg.artist && sg.artist !== '未知歌手' ? sg.artist : '';
  let keyword = artist ? `${artist} ${sg.title}` : sg.title;
  return keyword.replace(/[&·•,()（）【】\[\]<>{}|\\/:*?"'`]/g, ' ').replace(/\s+/g, ' ').trim();
}
/** 串行执行酷狗搜索并做 800ms 全局限流，命中返回封面 http(s) URL，否则返回 '' */
function searchKugouCoverUrl(ctx, sg, log) {
  const run = async () => {
    if (sg.coverUrl) return ''; // 已被其它路径补上
    const now = Date.now();
    const wait = 800 - (now - _kugouLastTs);
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    _kugouLastTs = Date.now();
    try {
      const keyword = buildKugouKeyword(sg);
      if (!keyword) return '';
      const result = await ctx.kugou.search.search(keyword, 'song', 1, 5);
      const lists = result?.data?.lists || result?.data?.list || result?.lists || [];
      const first = lists[0];
      return formatPicUrl(first?.Image || first?.trans_param?.union_cover || first?.cover || '') || '';
    } catch (e) { log?.error(`酷狗搜索失败: ${sg.title} — ${e?.message || e}`); return ''; }
  };
  const p = _kugouChain.then(run, run);
  _kugouChain = p.catch(() => {});
  return p;
}
/** 为单曲匹配酷狗封面：成功时写入 sg.coverUrl 与内存缓存，返回是否命中 */
async function enrichCoverFromKugou(ctx, sg, log, settings) {
  if (!sg || sg.coverUrl || !ctx.kugou) return false;
  let s;
  try { s = settings || (await loadSettings(ctx)); } catch { return false; }
  if (!s.useKugouCover) return false;
  const url = await searchKugouCoverUrl(ctx, sg, log);
  if (!url) return false;
  sg.coverUrl = url; // http(s) URL 无需登记，直接赋值
  _coverCache.set(sg.id, url);
  return true;
}

function parseFileName(name) {
  const b = (name.lastIndexOf('.') > 0 ? name.slice(0, name.lastIndexOf('.')) : name).replace(/^\d+\s*[.\-——]\s*/, '').trim();
  for (const s of [' - ', ' – ', ' — ']) { const i = b.indexOf(s); if (i > 0) { const a = b.slice(0, i).trim(), t = b.slice(i + s.length).trim(); if (a && t) return { artist: a, title: t }; } }
  return { artist: '未知歌手', title: b || '未知歌曲' };
}

async function loadSettings(ctx) { const s = await ctx.storage.get(STORAGE_KEY); if (!s || typeof s !== 'object') return { folders: [], showTag: false, useKugouCover: false }; return { folders: Array.isArray(s.folders) ? s.folders : [], showTag: !!s.showTag, useKugouCover: !!s.useKugouCover }; }
async function saveSettings(ctx, s) { await ctx.storage.set(STORAGE_KEY, s); }

/** 修正被当成 Latin-1 解码的 GBK/Big5/Shift-JIS 标签文本（老 MP3 常见 ID3v2 encoding=0 帧）。
 *  逐个编码试解，按「汉字数量 - 控制字符 - 替换符」打分，取最高分。 */
function fixTagEncoding(text) {
  if (!text) return text;
  const hasCJK = /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(text);
  const highLatin = (text.match(/[\u0080-\u00ff]/g) || []).length;
  if (hasCJK || highLatin < 3) return text;
  let bytes;
  try {
    bytes = Uint8Array.from(Array.from(text, (ch) => ch.charCodeAt(0) & 0xff));
  } catch {
    return text;
  }
  const score = (value) => {
    const cjk = (value.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
    const ctrl = (value.match(/[\u0000-\u001f\u007f-\u009f]/g) || []).length;
    const bad = (value.match(/\uFFFD/g) || []).length;
    return cjk * 3 - ctrl * 6 - bad * 12;
  };
  let best = null;
  let bestScore = 0;
  for (const encoding of ['gbk', 'big5', 'shift_jis', 'euc-kr']) {
    let decoded = '';
    try {
      decoded = new TextDecoder(encoding, { fatal: true }).decode(bytes);
    } catch {
      continue;
    }
    const value = decoded.trim();
    const current = score(value);
    if (current > bestScore) {
      bestScore = current;
      best = value;
    }
  }
  return best || text;
}

/**
 * 读取内嵌标签（标题 / 歌手 / 专辑 / 封面 / 歌词）。
 * 解析交给 jsmediatags：MP3 走 ID3v1/v2，FLAC 走 VORBIS_COMMENT + PICTURE，
 * MP4/M4A 走 iTunes 原子，不再维护自写解析器。
 */
async function readEmbeddedTags(ctx, filePath) {
  const empty = { title: '', artist: '', album: '', coverUrl: '', lyric: '' };
  const toText = (v) => (typeof v === 'string' ? v.trim() : '');

  const readVia = (target) => new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), 15000);
    try {
      jsmediatags.read(target, {
        onSuccess: (tag) => finish((tag && tag.tags) || {}),
        onError: () => finish(null),
      });
    } catch {
      finish(null);
    }
  });

  let tags = null;
  try {
    const urlResult = await ctx.fs.getFileUrl(filePath);
    const url = urlResult && urlResult.ok ? urlResult.url : typeof urlResult === 'string' ? urlResult : '';
    if (url) tags = await readVia(url);
  } catch {}

  // 自定义协议或 Range 不可用时，退回读取有限字节构造 Blob。
  if (!tags) {
    try {
      const buf = await ctx.fs.readFileBytes(filePath, { maxBytes: 4 * 1024 * 1024 });
      if (buf && buf.ok && buf.data) {
        tags = await readVia(new File([new Uint8Array(buf.data)], 'audio', { type: 'application/octet-stream' }));
      }
    } catch {}
  }
  if (!tags) return empty;

  const out = { ...empty };
  out.title = fixTagEncoding(toText(tags.title));
  out.artist = fixTagEncoding(toText(tags.artist));
  out.album = fixTagEncoding(toText(tags.album));

  const lyricValue = tags.lyrics;
  if (typeof lyricValue === 'string') out.lyric = lyricValue.trim();
  else if (lyricValue && typeof lyricValue.lyrics === 'string') out.lyric = lyricValue.lyrics.trim();
  if (!out.lyric) {
    for (const key of Object.keys(tags)) {
      const upper = key.toUpperCase();
      if (upper !== 'LYRICS' && upper !== 'UNSYNCEDLYRICS' && upper !== 'LYRIC') continue;
      if (typeof tags[key] === 'string' && tags[key].trim()) {
        out.lyric = tags[key].trim();
        break;
      }
    }
  }

  if (out.lyric) {
    out.lyric = fixTagEncoding(out.lyric);
    // 解码失败（大量替换符）时宁可不显示，也别显示成一排问号
    const bad = (out.lyric.match(/\uFFFD/g) || []).length;
    if (bad > out.lyric.length * 0.2) out.lyric = '';
  }

  const pic = tags.picture;
  if (pic && pic.data && pic.data.length > 256) {
    try {
      const bytes = pic.data instanceof Uint8Array ? pic.data : new Uint8Array(pic.data);
      out.coverUrl = URL.createObjectURL(new Blob([bytes], { type: pic.format || 'image/jpeg' }));
    } catch {}
  }
  return out;
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
      const isMiuix = ref(document.documentElement.classList.contains('miuix-theme-active'));
      loadSettings(ctx).then(s => { folders.value = s.folders; showTag.value = s.showTag; useKugouCover.value = !!s.useKugouCover; });
      const addFolder = async () => {
        const r = await ctx.dialog.selectDirectory({ title: '选择音乐文件夹' });
        if (r.canceled || !r.paths?.[0]) return;
        const path = r.paths[0];
        if (folders.value.some((f) => f.path === path)) { ctx.toast.info('已添加过'); return; }
        const label = path.split('/').filter(Boolean).pop() || '本地音乐';
        folders.value.push({ path, label, alias: '' });
        await saveSettings(ctx, { folders: folders.value.slice(), showTag: showTag.value, useKugouCover: useKugouCover.value });
        try { const res = await ctx.fs.listFiles(path, { recursive: true, kinds: ['audio', 'lyric'], limit: 10000 }); const c = res.ok ? res.files.filter((f) => f.kind === 'audio').length : 0; _counts[path] = c; if (res.ok) ctx.toast.success(`已添加 (${c} 首)`); else ctx.toast.warning(`失败: ${res.error}`); } catch { _counts[path] = 0; ctx.toast.warning('异常'); }
        state._tk = Date.now();
      };
      const confirmRm = async () => { if (!rmT.value) return; const p = rmT.value.path; folders.value = folders.value.filter((f) => f.path !== p); delete _counts[p]; showRm.value = false; rmT.value = null; await saveSettings(ctx, { folders: folders.value.slice(), showTag: showTag.value, useKugouCover: useKugouCover.value }); state._tk = Date.now(); ctx.toast.success('已移除'); };
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
  const { h, ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent: a } = ctx.vue;
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
      const query = ref('');
      // 歌曲 / 歌手 / 专辑 各自独立的排序方式
      const sorts = ref({ songs: 'name', artists: 'name', albums: 'name' });
      // 恢复上次的排序方式（跨页面/重进保留）
      Promise.resolve(ctx.storage.get(SORT_KEY)).then(function (v) {
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          sorts.value = {
            songs: v.songs || 'name',
            artists: v.artists || 'name',
            albums: v.albums || 'name',
          };
        }
      }).catch(function () {});
      const showTag = ref(false);
      const filterFolder = ref('');
      const folderList = ref([]);
      const listEl = ref(null);
      // 检测 miuix 插件是否启用（html 上有 miuix-bg-active 类）
      const isMiuix = ref(document.documentElement.classList.contains('miuix-theme-active'));
      const activeTab = ref('songs'); // 'songs' | 'artists' | 'albums'
      const selectedGroup = ref(null); // { name, songs } 二级页面选中项
      const tabIndStyle = ref({});
      const ICON_BACK = '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>';
      // 当前 tab 的排序方式（读）；修改时按 tab 分别保存
      const sortBy = computed(() => sorts.value[activeTab.value] || 'name');
      function setSort(v) {
        sorts.value = { ...sorts.value, [activeTab.value]: String(v) };
        try { ctx.storage.set(SORT_KEY, sorts.value); } catch {}
      }
      function switchTab(tab) {
        activeTab.value = tab;
        selectedGroup.value = null;
        const idx = tab === 'songs' ? 0 : tab === 'artists' ? 1 : 2;
        tabIndStyle.value = { '--lg-tab-index': String(idx) };
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
        const lyricTasks = [];
        for (const f of s.folders) {
          try {
            const r = await ctx.fs.listFiles(f.path, { recursive: true, kinds: ['audio', 'lyric'], limit: 10000 });
            if (!r.ok) continue;
            const lb = f.label || f.path.split('/').filter(Boolean).pop() || '本地音乐';
            const alias = f.alias || lb;
            const af = r.files.filter((x) => x.kind === 'audio'), lf = r.files.filter((x) => x.kind === 'lyric');
            const li = new Map(); for (const x of lf) li.set(x.name.replace(/\.(lrc|txt)$/i, '').toLowerCase(), x);
            for (const a of af) {
              const { artist, title } = parseFileName(a.name);
              const id = (++_seq).toString();
              const cachedCover = prevCovers.get(a.path) || '';
              const sg = { id, title, artist, name: title, album: alias, duration: 0, coverUrl: cachedCover, audioUrl: a.url, hash: '', mixSongId: id, source: 'local-music', lyric: '', _mt: a.modifiedAt, _path: a.path, _folder: f.path, _alias: alias };
              sg._hashPromise = hashStr(a.path);
              const k = a.name.replace(/\.[^.]+$/, '').toLowerCase(); const lm = li.get(k);
              // 歌词读取与目录遍历解耦，统一批量等待，避免逐首串行阻塞扫描
              if (lm) lyricTasks.push(ctx.fs.readFileBytes(lm.path, { maxBytes: 2097152 }).then(b => { if (!b?.ok || !b.data) return; const bytes = new Uint8Array(b.data); try { sg.lyric = new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { try { sg.lyric = new TextDecoder('gbk').decode(bytes); } catch { sg.lyric = new TextDecoder('utf-8').decode(bytes); } } }).catch(() => {}));
              all.push(sg);
            }
            _counts[f.path] = af.length;
          } catch {}
        }
        // 等待歌词读取与 SHA-256 hash 计算完成
        await Promise.all([...lyricTasks, ...all.map(sg => sg._hashPromise.then(h => { sg.hash = h; delete sg._hashPromise; }))]);
        songs.value = all; _songs = all; loading.value = false;
        if (!silent && all.length) ctx.toast.success(`共 ${all.length} 首`);
        scanPhase.value = '';

        // 异步加载 ID3/FLAC 元数据和封面（分批并发读文件头，替代逐首 50ms 串行等待）
        (async () => {
          scanPhase.value = 'parsing';
          scanStatus.value = '解析标签与封面中...';
          const BATCH = 6;
          for (let i = 0; i < all.length; i += BATCH) {
            const batch = all.slice(i, i + BATCH);
            const changedFlags = await Promise.all(batch.map(async (sg) => {
              let changed = false, embedded = false;
              try {
                const tags = await readEmbeddedTags(ctx, sg._path);
                if (tags.title) { sg.title = tags.title; sg.name = tags.title; changed = true; }
                if (tags.artist) { sg.artist = tags.artist; changed = true; }
                if (tags.album) { sg.album = tags.album; changed = true; }
                if (tags.coverUrl) { await applyEmbeddedCover(ctx, sg, tags.coverUrl, sg._mt); changed = true; embedded = true; }
                if (tags.lyric) { sg.lyric = tags.lyric; changed = true; embedded = true; }
              } catch {}
              // 文件内既无封面也无内嵌歌词 → 打标记，下次启动跳过重复读取
              if (!embedded) sg._noEmbed = true;
              return changed;
            }));
            scanStatus.value = `解析标签与封面中 ${Math.min(i + BATCH, all.length)}/${all.length}`;
            if (changedFlags.some(Boolean)) songs.value = songs.value.slice();
          }
          songs.value = songs.value.slice();
          log.info('元数据完成: ' + all.length);
          // 更新缓存（元数据 + _noEmbed 标记）
          persistMetaCache(ctx, all, s.folders);
          scanPhase.value = '';
          scanStatus.value = '';
        })();
      };

      // ── 从缓存恢复 ──
      async function tryLoadCache() {
        const settings = await loadSettings(ctx);
        if (!settings.folders?.length) return false;
        showTag.value = settings.showTag;
        folderList.value = settings.folders.map(f => ({ path: f.path, label: f.label, alias: f.alias || '' }));
        const folderHash = await hashStr(settings.folders.map(f => f.path).sort().join('|'));
        const meta = await readMetaCache(ctx);
        if (!meta || meta.folderHash !== folderHash) return false;
        _seq = meta._seq || 0;
        songs.value = meta.songs; _songs = meta.songs;
        // 旧缓存可能没有 name 字段，补齐（播放栏标题读 name）
        songs.value.forEach(function (s) { if (s && !s.name && s.title) s.name = s.title; });
        // 旧缓存里的乱码标题在加载时就修正，省得重新扫描
        songs.value.forEach(function (s) {
          if (!s) return;
          s.title = fixTagEncoding(s.title || '');
          s.name = fixTagEncoding(s.name || s.title);
          s.artist = fixTagEncoding(s.artist || '');
          s.album = fixTagEncoding(s.album || '');
        });
        // 先用落盘封面缓存恢复封面（命中就不再读音频文件）
        await Promise.all(songs.value.map((sg) => restoreCoverFile(ctx, sg)));
        // 剩下没有封面的再从音频文件解析
        loadCoversBg();
        return true;
      }

      // ── 后台解析封面（从音频文件 ID3/FLAC 标签自动读取）──
      async function loadCoversBg() {
        const all = songs.value;
        if (!all || !all.length) return;
        scanPhase.value = 'parsing';
        scanStatus.value = '解析封面中...';
        const settings = await loadSettings(ctx);
        const batchSize = 10;
        let metaDirty = false;
        for (let i = 0; i < all.length; i += batchSize) {
          const batch = all.slice(i, i + batchSize);
          const results = await Promise.all(batch.map(async sg => {
            if (sg.coverUrl) return false;
            // 已有落盘封面缓存 → 直接恢复，不读文件
            if (sg._coverFile) { await restoreCoverFile(ctx, sg); if (sg.coverUrl) return false; }
            // 上次扫描已确认文件内无内嵌封面/歌词 → 跳过重复读取
            if (sg._noEmbed) return false;
            const cached = _coverCache.get(sg.id);
            if (cached) { sg.coverUrl = cached; return true; }
            try {
              const tags = await readEmbeddedTags(ctx, sg._path);
              if (tags.lyric && !sg.lyric) { sg.lyric = tags.lyric; metaDirty = true; }
              const cover = tags.coverUrl || '';
              if (cover) {
                applyCover(sg, cover, sg._mt);
                _coverCache.set(sg.id, sg.coverUrl);
                return true;
              }
              if (!sg._noEmbed) { sg._noEmbed = true; metaDirty = true; }
            } catch {}
            return false;
          }));
          if (results.some(r => r)) songs.value = all.slice();
          scanStatus.value = `解析封面中 ${Math.min(i + batchSize, all.length)}/${all.length}`;
        }
        if (metaDirty) persistMetaCache(ctx, all, settings.folders);
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
        try {
          if (await enrichCoverFromKugou(ctx, sg, log)) {
            songs.value = songs.value.slice();
            const s = await loadSettings(ctx);
            persistMetaCache(ctx, songs.value, s.folders);
          }
        } catch (e) { log.error('在线封面匹配失败: ' + e); }
      };

      const refresh = () => scan(false);
      const openSettings = () => { try { ctx.router.push('/main/settings/plugins'); } catch {} };
      onMounted(async () => {
        // 内存中已有数据，直接恢复（切页面不丢）
        if (_songs.length > 0) {
          songs.value = _songs;
          loading.value = false;
        } else {
          const hit = await tryLoadCache();
          if (!hit) { scan(true); }
        }
        // 监听 miuix 插件动态启用/停用
        const _miuixObs = new MutationObserver(() => { isMiuix.value = document.documentElement.classList.contains('miuix-theme-active'); });
        _miuixObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        ctx.dispose(() => _miuixObs.disconnect());
      });
      watch(() => state._tk, () => scan(true));
      // 外部获取封面后触发 UI 更新
      watch(() => state._coverRefresh, () => {
        const all = songs.value;
        let changed = false;
        for (const sg of all) {
          if (!sg.coverUrl && _coverCache.has(sg.id)) {
            sg.coverUrl = _coverCache.get(sg.id);
            changed = true;
          }
        }
        if (changed) songs.value = all.slice();
      });

      const scrollToTop = () => {
        // 两种模式下滚动容器都是列表本身（miuix 不再用页面级滚动）
        const el = listEl.value;
        if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
      };
      const showBackToTop = ref(false);
      const onListScroll = () => {
        const el = listEl.value;
        if (el) showBackToTop.value = el.scrollTop > 300;
      };
      const locateCurrent = () => {
        const el = listEl.value;
        if (!el) return;
        const curId = ctx.stores.player.currentTrackId;
        if (curId == null) return;
        const row = el.querySelector(`[data-song-id="${curId}"]`);
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };
      let _scrollCleanup = null;
      const _bindScroll = () => {
        if (_scrollCleanup) { _scrollCleanup(); _scrollCleanup = null; }
        const el = listEl.value;
        if (!el) return;
        el.addEventListener('scroll', onListScroll, { passive: true });
        _scrollCleanup = () => el.removeEventListener('scroll', onListScroll);
        onListScroll();
      };
      onMounted(() => { setTimeout(_bindScroll, 0); });
      onUnmounted(() => { if (_scrollCleanup) _scrollCleanup(); });
      watch(isMiuix, () => { setTimeout(_bindScroll, 0); });
      watch(() => songs.value.length, () => { setTimeout(_bindScroll, 0); });

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

        // miuix 模式：顶部（Header+Toolbar+Tab）吸顶；非 miuix 顶部本就固定
        const headerBlock = [
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
            h(Sel, { options:currentSortOpts.value, modelValue:sortBy.value, 'onUpdate:modelValue':(v)=>{ setSort(v); }, clearable:false }),
            h('div', { style:'flex:1;' }),
            h('button', { onClick: locateCurrent, title: '定位当前播放', style: 'width:28px;height:28px;border-radius:8px;border:1px solid var(--border-subtle);background:var(--color-bg-elevated);color:var(--color-text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;' },
              h('svg', { viewBox: '0 0 24 24', width: 14, height: 14, innerHTML: ICON_LOCATE })
            ),
          ]),
          // Tab row
          t > 0 && h('div', { class: 'local-tab-root' + (isMiuix.value ? ' miuix' : '') }, [
            h('div', { class: 'local-tab-indicator', style: { '--lg-tab-index': (tabIndStyle.value['--lg-tab-index'] != null ? tabIndStyle.value['--lg-tab-index'] : activeTab.value === 'songs' ? 0 : activeTab.value === 'artists' ? 1 : 2) } }),
            h('div', { class: 'local-tab-item' + (activeTab.value === 'songs' ? ' active' : ''), onClick: () => switchTab('songs') }, '歌曲'),
            h('div', { class: 'local-tab-item' + (activeTab.value === 'artists' ? ' active' : ''), onClick: () => switchTab('artists') }, '歌手'),
            h('div', { class: 'local-tab-item' + (activeTab.value === 'albums' ? ' active' : ''), onClick: () => switchTab('albums') }, '专辑'),
          ]),
        ];

        // 页面根不涂背景：EchoMusic 新版约定页面区域透明，让主画布与顶部氛围渐变
        // （.layout-accent-gradient）透出；画布底色由宿主 .main-layout 提供
        return h('div', { class: isMiuix.value ? 'local-page-miuix' : '', style: 'height:100%;display:flex;flex-direction:column;overflow:hidden;' }, [
          // 顶部区块固定不吸顶、也不涂任何底色：列表在下方独立滚动，
          // 内容不会滚到它后面（与普通样式一致）
          headerBlock,
          // Empty / loading states
          loading.value && t===0 && h('div', { class:'local-empty', style:'padding:60px 24px;text-align:center;font-size:13px;color:var(--color-text-secondary);' }, '正在扫描音乐文件...'),
          !loading.value && t===0 && h('div', { class:'local-empty', style:'padding:60px 24px;text-align:center;font-size:13px;color:var(--color-text-secondary);' }, '暂无歌曲，请在设置中添加文件夹'),
          // Song list / grouped list
          // miuix：列表区域本身是（透明）滚动容器，里面是白色大卡片 + 卡片后面的滚动留白；
          // 留白在卡片外侧、且属于可滚动内容，滚到最下面才会露出来
          t>0 && h('div', { ref: listEl, class:'local-list' + (isMiuix.value ? ' miuix-scroll' : ''), style: isMiuix.value
            ? 'flex:1;min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(128,128,128,0.35) transparent;position:relative;'
            : 'flex:1;min-height:0;overflow-y:scroll;scrollbar-width:thin;scrollbar-color:rgba(128,128,128,0.35) transparent;padding:8px 24px 100px;position:relative;'
          }, isMiuix.value
            ? [
                h('div', { class:'miuix-card', key:'card' }, [_listContent()]),
                h('div', { class:'miuix-card-bottom-space', key:'bottom-space' }),
              ]
            : [_listContent()]),
          // 回到顶部：类名与主应用 BackToTop 一致，让 echo-liquid-glass 等插件的 .back-to-top-btn 样式命中。
          // 始终渲染 + class 控制显隐，CSS animation 提供进入/消失动画
          h('button', {
            onClick: scrollToTop,
            title: '回到顶部',
            class: 'back-to-top-btn local-back-top' + (showBackToTop.value ? ' lg-backtop-visible' : ''),
            'aria-label': '回到顶部',
          }, [
            h('svg', { viewBox: '0 0 24 24', width: 20, height: 20, innerHTML: ICON_UP }),
          ]),
        ]);
      };
    },
  });
}

export async function activate(ctx) {
  const log = createLogger();
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
  // 播放器自动切歌时也触发封面匹配（与页面播放共用同一限流/匹配逻辑）
  ctx.vue.watch(() => ctx.stores.player.currentTrackId, async (id) => {
    try {
      if (id == null || !_songs.length) return;
      const sg = _songs.find(s => String(s.id) === String(id) || s.hash === String(id));
      if (!sg || sg.coverUrl) return;
      if (await enrichCoverFromKugou(ctx, sg, log)) {
        state._coverRefresh = Date.now(); // 通知页面刷新 UI
        const s = await loadSettings(ctx);
        persistMetaCache(ctx, _songs, s.folders);
      }
    } catch (e) { log.error('切歌封面匹配失败: ' + e); }
  });
  const state = ctx.vue.reactive({ _tk: 0, _coverRefresh: 0 });
  ctx.ui.settings.define({ title: '本地音乐 设置', component: settingsPanel(ctx, state, log) });
  ctx.ui.addPage({ id: 'browser', title: '本地音乐', icon: 'material-symbols:folder-outline', component: browserPage(ctx, state, log), sidebar: { section: 'library', sectionTitle: '本地音乐', order: 10 } });
  log.info('就绪');
}
export async function deactivate() {
  // 回收本插件生成的内嵌封面 blob URL（其它资源随插件卸载自动清理）
  if (_metaSaveTimer) { clearTimeout(_metaSaveTimer); _metaSaveTimer = null; }
  for (const { url } of _blobCovers.values()) { try { URL.revokeObjectURL(url); } catch {} }
  _blobCovers.clear();
  _coverCache.clear();
  _songs = [];
  for (const k in _counts) delete _counts[k];
}