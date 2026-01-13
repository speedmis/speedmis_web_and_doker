




/*!

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2014 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JSZip=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){if(a){this.data=a,this.length=this.data.length,this.index=0,this.zero=0;for(var b=0;b<this.data.length;b++)a[b]=255&a[b]}}var e=a("./dataReader");d.prototype=new e,d.prototype.byteAt=function(a){return this.data[this.zero+a]},d.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f-this.zero;return-1},d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return[];var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./dataReader":6}],2:[function(a,b,c){"use strict";var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a,b){for(var c,e,f,g,h,i,j,k="",l=0;l<a.length;)c=a.charCodeAt(l++),e=a.charCodeAt(l++),f=a.charCodeAt(l++),g=c>>2,h=(3&c)<<4|e>>4,i=(15&e)<<2|f>>6,j=63&f,isNaN(e)?i=j=64:isNaN(f)&&(j=64),k=k+d.charAt(g)+d.charAt(h)+d.charAt(i)+d.charAt(j);return k},c.decode=function(a,b){var c,e,f,g,h,i,j,k="",l=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<a.length;)g=d.indexOf(a.charAt(l++)),h=d.indexOf(a.charAt(l++)),i=d.indexOf(a.charAt(l++)),j=d.indexOf(a.charAt(l++)),c=g<<2|h>>4,e=(15&h)<<4|i>>2,f=(3&i)<<6|j,k+=String.fromCharCode(c),64!=i&&(k+=String.fromCharCode(e)),64!=j&&(k+=String.fromCharCode(f));return k}},{}],3:[function(a,b,c){"use strict";function d(){this.compressedSize=0,this.uncompressedSize=0,this.crc32=0,this.compressionMethod=null,this.compressedContent=null}d.prototype={getContent:function(){return null},getCompressedContent:function(){return null}},b.exports=d},{}],4:[function(a,b,c){"use strict";c.STORE={magic:"\0\0",compress:function(a,b){return a},uncompress:function(a){return a},compressInputType:null,uncompressInputType:null},c.DEFLATE=a("./flate")},{"./flate":9}],5:[function(a,b,c){"use strict";var d=a("./utils"),e=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];b.exports=function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==d.getTypeOf(a);"undefined"==typeof b&&(b=0);var f=0,g=0,h=0;b^=-1;for(var i=0,j=a.length;i<j;i++)h=c?a[i]:a.charCodeAt(i),g=255&(b^h),f=e[g],b=b>>>8^f;return b^-1}},{"./utils":22}],6:[function(a,b,c){"use strict";function d(a){this.data=null,this.length=0,this.index=0,this.zero=0}var e=a("./utils");d.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(a){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return e.transformTo("string",this.readData(a))},readData:function(a){},lastIndexOfSignature:function(a){},readDate:function(){var a=this.readInt(4);return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1)}},b.exports=d},{"./utils":22}],7:[function(a,b,c){"use strict";c.base64=!1,c.binary=!1,c.dir=!1,c.createFolders=!1,c.date=null,c.compression=null,c.compressionOptions=null,c.comment=null,c.unixPermissions=null,c.dosPermissions=null},{}],8:[function(a,b,c){"use strict";var d=a("./utils");c.string2binary=function(a){return d.string2binary(a)},c.string2Uint8Array=function(a){return d.transformTo("uint8array",a)},c.uint8Array2String=function(a){return d.transformTo("string",a)},c.string2Blob=function(a){var b=d.transformTo("arraybuffer",a);return d.arrayBuffer2Blob(b)},c.arrayBuffer2Blob=function(a){return d.arrayBuffer2Blob(a)},c.transformTo=function(a,b){return d.transformTo(a,b)},c.getTypeOf=function(a){return d.getTypeOf(a)},c.checkSupport=function(a){return d.checkSupport(a)},c.MAX_VALUE_16BITS=d.MAX_VALUE_16BITS,c.MAX_VALUE_32BITS=d.MAX_VALUE_32BITS,c.pretty=function(a){return d.pretty(a)},c.findCompression=function(a){return d.findCompression(a)},c.isRegExp=function(a){return d.isRegExp(a)}},{"./utils":22}],9:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,e=a("pako");c.uncompressInputType=d?"uint8array":"array",c.compressInputType=d?"uint8array":"array",c.magic="\b\0",c.compress=function(a,b){return e.deflateRaw(a,{level:b.level||-1})},c.uncompress=function(a){return e.inflateRaw(a)}},{pako:25}],10:[function(a,b,c){"use strict";function d(a,b){return this instanceof d?(this.files={},this.comment=null,this.root="",a&&this.load(a,b),void(this.clone=function(){var a=new d;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a})):new d(a,b)}var e=a("./base64");d.prototype=a("./object"),d.prototype.load=a("./load"),d.support=a("./support"),d.defaults=a("./defaults"),d.utils=a("./deprecatedPublicUtils"),d.base64={encode:function(a){return e.encode(a)},decode:function(a){return e.decode(a)}},d.compressions=a("./compressions"),b.exports=d},{"./base64":2,"./compressions":4,"./defaults":7,"./deprecatedPublicUtils":8,"./load":11,"./object":14,"./support":18}],11:[function(a,b,c){"use strict";var d=a("./base64"),e=a("./utf8"),f=a("./utils"),g=a("./zipEntries");b.exports=function(a,b){var c,h,i,j;for(b=f.extend(b||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:e.utf8decode}),b.base64&&(a=d.decode(a)),h=new g(a,b),c=h.files,i=0;i<c.length;i++)j=c[i],this.file(j.fileNameStr,j.decompressed,{binary:!0,optimizedBinaryString:!0,date:j.date,dir:j.dir,comment:j.fileCommentStr.length?j.fileCommentStr:null,unixPermissions:j.unixPermissions,dosPermissions:j.dosPermissions,createFolders:b.createFolders});return h.zipComment.length&&(this.comment=h.zipComment),this}},{"./base64":2,"./utf8":21,"./utils":22,"./zipEntries":23}],12:[function(a,b,c){(function(a){"use strict";b.exports=function(b,c){return new a(b,c)},b.exports.test=function(b){return a.isBuffer(b)}}).call(this,"undefined"!=typeof Buffer?Buffer:void 0)},{}],13:[function(a,b,c){"use strict";function d(a){this.data=a,this.length=this.data.length,this.index=0,this.zero=0}var e=a("./uint8ArrayReader");d.prototype=new e,d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./uint8ArrayReader":19}],14:[function(a,b,c){"use strict";var d=a("./support"),e=a("./utils"),f=a("./crc32"),g=a("./signature"),h=a("./defaults"),i=a("./base64"),j=a("./compressions"),k=a("./compressedObject"),l=a("./nodeBuffer"),m=a("./utf8"),n=a("./stringWriter"),o=a("./uint8ArrayWriter"),p=function(a){if(a._data instanceof k&&(a._data=a._data.getContent(),a.options.binary=!0,a.options.base64=!1,"uint8array"===e.getTypeOf(a._data))){var b=a._data;a._data=new Uint8Array(b.length),0!==b.length&&a._data.set(b,0)}return a._data},q=function(a){var b=p(a),c=e.getTypeOf(b);return"string"===c?!a.options.binary&&d.nodebuffer?l(b,"utf-8"):a.asBinary():b},r=function(a){var b=p(this);return null===b||"undefined"==typeof b?"":(this.options.base64&&(b=i.decode(b)),b=a&&this.options.binary?D.utf8decode(b):e.transformTo("string",b),a||this.options.binary||(b=e.transformTo("string",D.utf8encode(b))),b)},s=function(a,b,c){this.name=a,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=b,this.options=c,this._initialMetadata={dir:c.dir,date:c.date}};s.prototype={asText:function(){return r.call(this,!0)},asBinary:function(){return r.call(this,!1)},asNodeBuffer:function(){var a=q(this);return e.transformTo("nodebuffer",a)},asUint8Array:function(){var a=q(this);return e.transformTo("uint8array",a)},asArrayBuffer:function(){return this.asUint8Array().buffer}};var t=function(a,b){var c,d="";for(c=0;c<b;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},u=function(a){return a=a||{},a.base64!==!0||null!==a.binary&&void 0!==a.binary||(a.binary=!0),a=e.extend(a,h),a.date=a.date||new Date,null!==a.compression&&(a.compression=a.compression.toUpperCase()),a},v=function(a,b,c){var d,f=e.getTypeOf(b);if(c=u(c),"string"==typeof c.unixPermissions&&(c.unixPermissions=parseInt(c.unixPermissions,8)),c.unixPermissions&&16384&c.unixPermissions&&(c.dir=!0),c.dosPermissions&&16&c.dosPermissions&&(c.dir=!0),c.dir&&(a=x(a)),c.createFolders&&(d=w(a))&&y.call(this,d,!0),c.dir||null===b||"undefined"==typeof b)c.base64=!1,c.binary=!1,b=null,f=null;else if("string"===f)c.binary&&!c.base64&&c.optimizedBinaryString!==!0&&(b=e.string2binary(b));else{if(c.base64=!1,c.binary=!0,!(f||b instanceof k))throw new Error("The data of '"+a+"' is in an unsupported format !");"arraybuffer"===f&&(b=e.transformTo("uint8array",b))}var g=new s(a,b,c);return this.files[a]=g,g},w=function(a){"/"==a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},x=function(a){return"/"!=a.slice(-1)&&(a+="/"),a},y=function(a,b){return b="undefined"!=typeof b&&b,a=x(a),this.files[a]||v.call(this,a,null,{dir:!0,createFolders:b}),this.files[a]},z=function(a,b,c){var d,g=new k;return a._data instanceof k?(g.uncompressedSize=a._data.uncompressedSize,g.crc32=a._data.crc32,0===g.uncompressedSize||a.dir?(b=j.STORE,g.compressedContent="",g.crc32=0):a._data.compressionMethod===b.magic?g.compressedContent=a._data.getCompressedContent():(d=a._data.getContent(),g.compressedContent=b.compress(e.transformTo(b.compressInputType,d),c))):(d=q(a),d&&0!==d.length&&!a.dir||(b=j.STORE,d=""),g.uncompressedSize=d.length,g.crc32=f(d),g.compressedContent=b.compress(e.transformTo(b.compressInputType,d),c)),g.compressedSize=g.compressedContent.length,g.compressionMethod=b.magic,g},A=function(a,b){var c=a;return a||(c=b?16893:33204),(65535&c)<<16},B=function(a,b){return 63&(a||0)},C=function(a,b,c,d,h,i){var j,k,l,n,o=(c.compressedContent,i!==m.utf8encode),p=e.transformTo("string",i(b.name)),q=e.transformTo("string",m.utf8encode(b.name)),r=b.comment||"",s=e.transformTo("string",i(r)),u=e.transformTo("string",m.utf8encode(r)),v=q.length!==b.name.length,w=u.length!==r.length,x=b.options,y="",z="",C="";l=b._initialMetadata.dir!==b.dir?b.dir:x.dir,n=b._initialMetadata.date!==b.date?b.date:x.date;var D=0,E=0;l&&(D|=16),"UNIX"===h?(E=798,D|=A(b.unixPermissions,l)):(E=20,D|=B(b.dosPermissions,l)),j=n.getHours(),j<<=6,j|=n.getMinutes(),j<<=5,j|=n.getSeconds()/2,k=n.getFullYear()-1980,k<<=4,k|=n.getMonth()+1,k<<=5,k|=n.getDate(),v&&(z=t(1,1)+t(f(p),4)+q,y+="up"+t(z.length,2)+z),w&&(C=t(1,1)+t(this.crc32(s),4)+u,y+="uc"+t(C.length,2)+C);var F="";F+="\n\0",F+=o||!v&&!w?"\0\0":"\0\b",F+=c.compressionMethod,F+=t(j,2),F+=t(k,2),F+=t(c.crc32,4),F+=t(c.compressedSize,4),F+=t(c.uncompressedSize,4),F+=t(p.length,2),F+=t(y.length,2);var G=g.LOCAL_FILE_HEADER+F+p+y,H=g.CENTRAL_FILE_HEADER+t(E,2)+F+t(s.length,2)+"\0\0\0\0"+t(D,4)+t(d,4)+p+y+s;return{fileRecord:G,dirRecord:H,compressedObject:c}},D={load:function(a,b){throw new Error("Load method is not defined. Is the file jszip-load.js included ?")},filter:function(a){var b,c,d,f,g=[];for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],f=new s(d.name,d._data,e.extend(d.options)),c=b.slice(this.root.length,b.length),b.slice(0,this.root.length)===this.root&&a(c,f)&&g.push(f));return g},file:function(a,b,c){if(1===arguments.length){if(e.isRegExp(a)){var d=a;return this.filter(function(a,b){return!b.dir&&d.test(a)})}return this.filter(function(b,c){return!c.dir&&b===a})[0]||null}return a=this.root+a,v.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(e.isRegExp(a))return this.filter(function(b,c){return c.dir&&a.test(b)});var b=this.root+a,c=y.call(this,b),d=this.clone();return d.root=c.name,d},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!=a.slice(-1)&&(a+="/"),b=this.files[a]),b&&!b.dir)delete this.files[a];else for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];return this},generate:function(a){a=e.extend(a||{},{base64:!0,compression:"STORE",compressionOptions:null,type:"base64",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:m.utf8encode}),e.checkSupport(a.type),"darwin"!==a.platform&&"freebsd"!==a.platform&&"linux"!==a.platform&&"sunos"!==a.platform||(a.platform="UNIX"),"win32"===a.platform&&(a.platform="DOS");var b,c,d=[],f=0,h=0,k=e.transformTo("string",a.encodeFileName(a.comment||this.comment||""));for(var l in this.files)if(this.files.hasOwnProperty(l)){var p=this.files[l],q=p.options.compression||a.compression.toUpperCase(),r=j[q];if(!r)throw new Error(q+" is not a valid compression method !");var s=p.options.compressionOptions||a.compressionOptions||{},u=z.call(this,p,r,s),v=C.call(this,l,p,u,f,a.platform,a.encodeFileName);f+=v.fileRecord.length+u.compressedSize,h+=v.dirRecord.length,d.push(v)}var w="";w=g.CENTRAL_DIRECTORY_END+"\0\0\0\0"+t(d.length,2)+t(d.length,2)+t(h,4)+t(f,4)+t(k.length,2)+k;var x=a.type.toLowerCase();for(b="uint8array"===x||"arraybuffer"===x||"blob"===x||"nodebuffer"===x?new o(f+h+w.length):new n(f+h+w.length),c=0;c<d.length;c++)b.append(d[c].fileRecord),b.append(d[c].compressedObject.compressedContent);for(c=0;c<d.length;c++)b.append(d[c].dirRecord);b.append(w);var y=b.finalize();switch(a.type.toLowerCase()){case"uint8array":case"arraybuffer":case"nodebuffer":return e.transformTo(a.type.toLowerCase(),y);case"blob":return e.arrayBuffer2Blob(e.transformTo("arraybuffer",y),a.mimeType);case"base64":return a.base64?i.encode(y):y;default:return y}},crc32:function(a,b){return f(a,b)},utf8encode:function(a){return e.transformTo("string",m.utf8encode(a))},utf8decode:function(a){return m.utf8decode(a)}};b.exports=D},{"./base64":2,"./compressedObject":3,"./compressions":4,"./crc32":5,"./defaults":7,"./nodeBuffer":12,"./signature":15,"./stringWriter":17,"./support":18,"./uint8ArrayWriter":20,"./utf8":21,"./utils":22}],15:[function(a,b,c){"use strict";c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b"},{}],16:[function(a,b,c){"use strict";function d(a,b){this.data=a,b||(this.data=f.string2binary(this.data)),this.length=this.data.length,this.index=0,this.zero=0}var e=a("./dataReader"),f=a("./utils");d.prototype=new e,d.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},d.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./dataReader":6,"./utils":22}],17:[function(a,b,c){"use strict";var d=a("./utils"),e=function(){this.data=[]};e.prototype={append:function(a){a=d.transformTo("string",a),this.data.push(a)},finalize:function(){return this.data.join("")}},b.exports=e},{"./utils":22}],18:[function(a,b,c){(function(a){"use strict";if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer="undefined"!=typeof a,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var b=new ArrayBuffer(0);try{c.blob=0===new Blob([b],{type:"application/zip"}).size}catch(d){try{var e=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,f=new e;f.append(b),c.blob=0===f.getBlob("application/zip").size}catch(d){c.blob=!1}}}}).call(this,"undefined"!=typeof Buffer?Buffer:void 0)},{}],19:[function(a,b,c){"use strict";function d(a){a&&(this.data=a,this.length=this.data.length,this.index=0,this.zero=0)}var e=a("./arrayReader");d.prototype=new e,d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return new Uint8Array(0);var b=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./arrayReader":1}],20:[function(a,b,c){"use strict";var d=a("./utils"),e=function(a){this.data=new Uint8Array(a),this.index=0};e.prototype={append:function(a){0!==a.length&&(a=d.transformTo("uint8array",a),this.data.set(a,this.index),this.index+=a.length)},finalize:function(){return this.data}},b.exports=e},{"./utils":22}],21:[function(a,b,c){"use strict";for(var d=a("./utils"),e=a("./support"),f=a("./nodeBuffer"),g=new Array(256),h=0;h<256;h++)g[h]=h>=252?6:h>=248?5:h>=240?4:h>=224?3:h>=192?2:1;g[254]=g[254]=1;var i=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=e.uint8array?new Uint8Array(i):new Array(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},j=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+g[a[c]]>b?c:b},k=function(a){var b,c,e,f,h=a.length,i=new Array(2*h);for(c=0,b=0;b<h;)if(e=a[b++],e<128)i[c++]=e;else if(f=g[e],f>4)i[c++]=65533,b+=f-1;else{for(e&=2===f?31:3===f?15:7;f>1&&b<h;)e=e<<6|63&a[b++],f--;f>1?i[c++]=65533:e<65536?i[c++]=e:(e-=65536,i[c++]=55296|e>>10&1023,i[c++]=56320|1023&e)}return i.length!==c&&(i.subarray?i=i.subarray(0,c):i.length=c),d.applyFromCharCode(i)};c.utf8encode=function(a){return e.nodebuffer?f(a,"utf-8"):i(a)},c.utf8decode=function(a){if(e.nodebuffer)return d.transformTo("nodebuffer",a).toString("utf-8");a=d.transformTo(e.uint8array?"uint8array":"array",a);for(var b=[],c=0,f=a.length,g=65536;c<f;){var h=j(a,Math.min(c+g,f));e.uint8array?b.push(k(a.subarray(c,h))):b.push(k(a.slice(c,h))),c=h}return b.join("")}},{"./nodeBuffer":12,"./support":18,"./utils":22}],22:[function(a,b,c){"use strict";function d(a){return a}function e(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function f(a){var b=65536,d=[],e=a.length,f=c.getTypeOf(a),g=0,h=!0;try{switch(f){case"uint8array":String.fromCharCode.apply(null,new Uint8Array(0));break;case"nodebuffer":String.fromCharCode.apply(null,j(0))}}catch(i){h=!1}if(!h){for(var k="",l=0;l<a.length;l++)k+=String.fromCharCode(a[l]);return k}for(;g<e&&b>1;)try{"array"===f||"nodebuffer"===f?d.push(String.fromCharCode.apply(null,a.slice(g,Math.min(g+b,e)))):d.push(String.fromCharCode.apply(null,a.subarray(g,Math.min(g+b,e)))),g+=b}catch(i){b=Math.floor(b/2)}return d.join("")}function g(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];return b}var h=a("./support"),i=a("./compressions"),j=a("./nodeBuffer");c.string2binary=function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(255&a.charCodeAt(c));return b},c.arrayBuffer2Blob=function(a,b){c.checkSupport("blob"),b=b||"application/zip";try{return new Blob([a],{type:b})}catch(d){try{var e=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,f=new e;return f.append(a),f.getBlob(b)}catch(d){throw new Error("Bug : can't construct the Blob.")}}},c.applyFromCharCode=f;var k={};k.string={string:d,array:function(a){return e(a,new Array(a.length))},arraybuffer:function(a){return k.string.uint8array(a).buffer},uint8array:function(a){return e(a,new Uint8Array(a.length))},nodebuffer:function(a){return e(a,j(a.length))}},k.array={string:f,array:d,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return j(a)}},k.arraybuffer={string:function(a){return f(new Uint8Array(a))},array:function(a){return g(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:d,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return j(new Uint8Array(a))}},k.uint8array={string:f,array:function(a){return g(a,new Array(a.length))},arraybuffer:function(a){return a.buffer},uint8array:d,nodebuffer:function(a){return j(a)}},k.nodebuffer={string:f,array:function(a){return g(a,new Array(a.length))},arraybuffer:function(a){return k.nodebuffer.uint8array(a).buffer},uint8array:function(a){return g(a,new Uint8Array(a.length))},nodebuffer:d},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=k[d][a](b);return e},c.getTypeOf=function(a){return"string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":h.nodebuffer&&j.test(a)?"nodebuffer":h.uint8array&&a instanceof Uint8Array?"uint8array":h.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=h[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this browser")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(b<16?"0":"")+b.toString(16).toUpperCase();return d},c.findCompression=function(a){for(var b in i)if(i.hasOwnProperty(b)&&i[b].magic===a)return i[b];return null},c.isRegExp=function(a){return"[object RegExp]"===Object.prototype.toString.call(a)},c.extend=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c}},{"./compressions":4,"./nodeBuffer":12,"./support":18}],23:[function(a,b,c){"use strict";function d(a,b){this.files=[],this.loadOptions=b,a&&this.load(a)}var e=a("./stringReader"),f=a("./nodeBufferReader"),g=a("./uint8ArrayReader"),h=a("./arrayReader"),i=a("./utils"),j=a("./signature"),k=a("./zipEntry"),l=a("./support");a("./object");d.prototype={checkSignature:function(a){var b=this.reader.readString(4);if(b!==a)throw new Error("Corrupted zip or bug : unexpected signature ("+i.pretty(b)+", expected "+i.pretty(a)+")")},isSignature:function(a,b){var c=this.reader.index;this.reader.setIndex(a);var d=this.reader.readString(4),e=d===b;return this.reader.setIndex(c),e},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),b=l.uint8array?"uint8array":"array",c=i.transformTo(b,a);this.zipComment=this.loadOptions.decodeFileName(c)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.versionMadeBy=this.reader.readString(2),this.versionNeeded=this.reader.readInt(2),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;e<d;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readString(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(j.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readString(4)===j.CENTRAL_FILE_HEADER;)a=new k({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(j.CENTRAL_DIRECTORY_END);if(a<0){var b=!this.isSignature(0,j.LOCAL_FILE_HEADER);throw b?new Error("Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip : can't find end of central directory")}this.reader.setIndex(a);var c=a;if(this.checkSignature(j.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(j.ZIP64_CENTRAL_DIRECTORY_LOCATOR),a<0)throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(j.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,j.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(j.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(j.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var e=c-d;if(e>0)this.isSignature(c,j.CENTRAL_FILE_HEADER)||(this.reader.zero=e);else if(e<0)throw new Error("Corrupted zip: missing "+Math.abs(e)+" bytes.")},prepareReader:function(a){var b=i.getTypeOf(a);if(i.checkSupport(b),"string"!==b||l.uint8array)if("nodebuffer"===b)this.reader=new f(a);else if(l.uint8array)this.reader=new g(i.transformTo("uint8array",a));else{if(!l.array)throw new Error("Unexpected error: unsupported type '"+b+"'");this.reader=new h(i.transformTo("array",a))}else this.reader=new e(a,this.loadOptions.optimizedBinaryString)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},b.exports=d},{"./arrayReader":1,"./nodeBufferReader":13,"./object":14,"./signature":15,"./stringReader":16,"./support":18,"./uint8ArrayReader":19,"./utils":22,"./zipEntry":24}],24:[function(a,b,c){"use strict";function d(a,b){this.options=a,this.loadOptions=b}var e=a("./stringReader"),f=a("./utils"),g=a("./compressedObject"),h=a("./object"),i=a("./support"),j=0,k=3;d.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},prepareCompressedContent:function(a,b,c){return function(){var d=a.index;a.setIndex(b);var e=a.readData(c);return a.setIndex(d),e}},prepareContent:function(a,b,c,d,e){return function(){var a=f.transformTo(d.uncompressInputType,this.getCompressedContent()),b=d.uncompress(a);if(b.length!==e)throw new Error("Bug : uncompressed data size mismatch");return b}},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(c),this.compressedSize==-1||this.uncompressedSize==-1)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");if(b=f.findCompression(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");if(this.decompressed=new g,this.decompressed.compressedSize=this.compressedSize,this.decompressed.uncompressedSize=this.uncompressedSize,this.decompressed.crc32=this.crc32,this.decompressed.compressionMethod=this.compressionMethod,this.decompressed.getCompressedContent=this.prepareCompressedContent(a,a.index,this.compressedSize,b),this.decompressed.getContent=this.prepareContent(a,a.index,this.compressedSize,b,this.uncompressedSize),this.loadOptions.checkCRC32&&(this.decompressed=f.transformTo("string",this.decompressed.getContent()),h.crc32(this.decompressed)!==this.crc32))throw new Error("Corrupted zip : CRC32 mismatch");
},readCentralPart:function(a){if(this.versionMadeBy=a.readInt(2),this.versionNeeded=a.readInt(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4),this.fileNameLength=a.readInt(2),this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");this.fileName=a.readData(this.fileNameLength),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a===j&&(this.dosPermissions=63&this.externalFileAttributes),a===k&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(a){if(this.extraFields[1]){var b=new e(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=b.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=b.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=b.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=b.readInt(4))}},readExtraFields:function(a){var b,c,d,e=a.index;for(this.extraFields=this.extraFields||{};a.index<e+this.extraFieldsLength;)b=a.readInt(2),c=a.readInt(2),d=a.readString(c),this.extraFields[b]={id:b,length:c,value:d}},handleUTF8:function(){var a=i.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(null!==b)this.fileNameStr=b;else{var c=f.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(c)}var d=this.findExtraFieldUnicodeComment();if(null!==d)this.fileCommentStr=d;else{var e=f.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(e)}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=new e(a.value);return 1!==b.readInt(1)?null:h.crc32(this.fileName)!==b.readInt(4)?null:h.utf8decode(b.readString(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var b=new e(a.value);return 1!==b.readInt(1)?null:h.crc32(this.fileComment)!==b.readInt(4)?null:h.utf8decode(b.readString(a.length-5))}return null}},b.exports=d},{"./compressedObject":3,"./object":14,"./stringReader":16,"./support":18,"./utils":22}],25:[function(a,b,c){"use strict";var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h},{"./lib/deflate":26,"./lib/inflate":27,"./lib/utils/common":28,"./lib/zlib/constants":31}],26:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);if(b.header&&h.deflateSetHeader(this.strm,b.header),b.dictionary){var e;if(e="string"==typeof b.dictionary?j.string2buf(b.dictionary):"[object ArrayBuffer]"===m.call(b.dictionary)?new Uint8Array(b.dictionary):b.dictionary,c=h.deflateSetDictionary(this.strm,e),c!==p)throw new Error(k[c]);this._dict_set=!0}}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return!1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)))}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d!==r||(this.onEnd(p),e.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g},{"./utils/common":28,"./utils/strings":29,"./zlib/deflate":33,"./zlib/messages":38,"./zlib/zstream":40}],27:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0)}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":28,"./utils/strings":29,"./zlib/constants":31,"./zlib/gzheader":34,"./zlib/inflate":36,"./zlib/messages":38,"./zlib/zstream":40}],28:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],29:[function(a,b,c){"use strict";function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(h){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){g=!1}for(var i=new e.Buf8(256),j=0;j<256;j++)i[j]=j>=252?6:j>=248?5:j>=240?4:j>=224?3:j>=192?2:1;i[254]=i[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,h=b||a.length,j=new Array(2*h);for(e=0,c=0;c<h;)if(f=a[c++],f<128)j[e++]=f;else if(g=i[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<h;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+i[a[c]]>b?c:b}},{"./common":28}],30:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0}b.exports=d},{}],31:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],32:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e},{}],33:[function(a,b,c){"use strict";function d(a,b){return a.msg=I[b],b}function e(a){return(a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(E.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0))}function h(a,b){F._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm)}function i(a,b){a.pending_buf[a.pending++]=b}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,E.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=G(a.adler,b,e,c):2===a.state.wrap&&(a.adler=H(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-la?a.strstart-(a.w_size-la):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ka,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&f<m);if(d=ka-(m-f),f=m-ka,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g]}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-la)){E.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ja)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ja-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ja)););}while(a.lookahead<la&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===J)return ua;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ua;if(a.strstart-a.block_start>=a.w_size-la&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ua:ua}function o(a,b){for(var c,d;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c)),a.match_length>=ja)if(d=F._tr_tally(a,a.strstart-a.match_start,a.match_length-ja),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ja){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function p(a,b){for(var c,d,e;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ja-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c),a.match_length<=5&&(a.strategy===U||a.match_length===ja&&a.strstart-a.match_start>4096)&&(a.match_length=ja-1)),a.prev_length>=ja&&a.match_length<=a.prev_length){e=a.strstart+a.lookahead-ja,d=F._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ja),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ja-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ua}else if(a.match_available){if(d=F._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ua}else a.match_available=1,a.strstart++,a.lookahead--}return a.match_available&&(d=F._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ka){if(m(a),a.lookahead<=ka&&b===J)return ua;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ja&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ka;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&e<f);a.match_length=ka-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead)}if(a.match_length>=ja?(c=F._tr_tally(a,1,a.match_length-ja),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===J)return ua;break}if(a.match_length=0,c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=D[a.level].max_lazy,a.good_match=D[a.level].good_length,a.nice_match=D[a.level].nice_length,a.max_chain_length=D[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ja-1,a.match_available=0,a.ins_h=0}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=$,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new E.Buf16(2*ha),this.dyn_dtree=new E.Buf16(2*(2*fa+1)),this.bl_tree=new E.Buf16(2*(2*ga+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new E.Buf16(ia+1),this.heap=new E.Buf16(2*ea+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new E.Buf16(2*ea+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Z,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?na:sa,a.adler=2===b.wrap?0:1,b.last_flush=J,F._tr_init(b),O):d(a,Q)}function w(a){var b=v(a);return b===O&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?Q:(a.state.gzhead=b,O):Q}function y(a,b,c,e,f,g){if(!a)return Q;var h=1;if(b===T&&(b=6),e<0?(h=0,e=-e):e>15&&(h=2,e-=16),f<1||f>_||c!==$||e<8||e>15||b<0||b>9||g<0||g>X)return d(a,Q);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ja-1)/ja),i.window=new E.Buf8(2*i.w_size),i.head=new E.Buf16(i.hash_size),i.prev=new E.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new E.Buf8(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,$,aa,ba,Y)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>N||b<0)return a?d(a,Q):Q;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===ta&&b!==M)return d(a,0===a.avail_out?S:Q);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===na)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=H(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=oa):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,ya),h.status=sa);else{var m=$+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=V||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=ma),m+=31-m%31,h.status=sa,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1}if(h.status===oa)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=pa)}else h.status=pa;if(h.status===pa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=qa)}else h.status=qa;if(h.status===qa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=ra)}else h.status=ra;if(h.status===ra&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=sa)):h.status=sa),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,O}else if(0===a.avail_in&&e(b)<=e(c)&&b!==M)return d(a,S);if(h.status===ta&&0!==a.avail_in)return d(a,S);if(0!==a.avail_in||0!==h.lookahead||b!==J&&h.status!==ta){var o=h.strategy===V?r(h,b):h.strategy===W?q(h,b):D[h.level].func(h,b);if(o!==wa&&o!==xa||(h.status=ta),o===ua||o===wa)return 0===a.avail_out&&(h.last_flush=-1),O;if(o===va&&(b===K?F._tr_align(h):b!==N&&(F._tr_stored_block(h,0,0,!1),b===L&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,O}return b!==M?O:h.wrap<=0?P:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?O:P)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa&&b!==ta?d(a,Q):(a.state=null,b===sa?d(a,R):O)):Q}function C(a,b){var c,d,e,g,h,i,j,k,l=b.length;if(!a||!a.state)return Q;if(c=a.state,g=c.wrap,2===g||1===g&&c.status!==na||c.lookahead)return Q;for(1===g&&(a.adler=G(a.adler,b,l,0)),c.wrap=0,l>=c.w_size&&(0===g&&(f(c.head),c.strstart=0,c.block_start=0,c.insert=0),k=new E.Buf8(c.w_size),E.arraySet(k,b,l-c.w_size,c.w_size,0),b=k,l=c.w_size),h=a.avail_in,i=a.next_in,j=a.input,a.avail_in=l,a.next_in=0,a.input=b,m(c);c.lookahead>=ja;){d=c.strstart,e=c.lookahead-(ja-1);do c.ins_h=(c.ins_h<<c.hash_shift^c.window[d+ja-1])&c.hash_mask,c.prev[d&c.w_mask]=c.head[c.ins_h],c.head[c.ins_h]=d,d++;while(--e);c.strstart=d,c.lookahead=ja-1,m(c)}return c.strstart+=c.lookahead,c.block_start=c.strstart,c.insert=c.lookahead,c.lookahead=0,c.match_length=c.prev_length=ja-1,c.match_available=0,a.next_in=i,a.input=j,a.avail_in=h,c.wrap=g,O}var D,E=a("../utils/common"),F=a("./trees"),G=a("./adler32"),H=a("./crc32"),I=a("./messages"),J=0,K=1,L=3,M=4,N=5,O=0,P=1,Q=-2,R=-3,S=-5,T=-1,U=1,V=2,W=3,X=4,Y=0,Z=2,$=8,_=9,aa=15,ba=8,ca=29,da=256,ea=da+1+ca,fa=30,ga=19,ha=2*ea+1,ia=15,ja=3,ka=258,la=ka+ja+1,ma=32,na=42,oa=69,pa=73,qa=91,ra=103,sa=113,ta=666,ua=1,va=2,wa=3,xa=4,ya=3;D=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateSetDictionary=C,c.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":28,"./adler32":30,"./crc32":32,"./messages":38,"./trees":39}],34:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],35:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],36:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,
n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":28,"./adler32":30,"./crc32":32,"./inffast":35,"./inftrees":37}],37:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(var T=0;;){T++,z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":28}],38:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],39:[function(a,b,c){"use strict";function d(a){for(var b=a.length;--b>=0;)a[b]=0}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b}function g(a){return a<256?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c)}function j(a,b,c){i(a,c[2*b],c[2*b+1])}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8)}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;f<=W;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,c=a.heap_max+1;c<V;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--)}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;for(d=1;d<=W;d++)f[d]=g=g+c[d-1]<<1;for(e=0;e<=b;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h))}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;d<Q-1;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;d<16;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;d<T;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;b<=W;b++)g[b]=0;for(a=0;a<=143;)ga[2*a+1]=8,a++,g[8]++;for(;a<=255;)ga[2*a+1]=9,a++,g[9]++;for(;a<=279;)ga[2*a+1]=7,a++,g[7]++;for(;a<=287;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;a<T;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y)}function p(a){var b;for(b=0;b<S;b++)a.dyn_ltree[2*b]=0;for(b=0;b<T;b++)a.dyn_dtree[2*b]=0;for(b=0;b<U;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b)}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;c<i;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=j<2?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count)}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;d<=c;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(h<j?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):h<=10?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4))}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;d<=c;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(h<l){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):h<=10?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4)}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;e<d;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1)}function A(a){var b,c=4093624447;for(b=0;b<=31;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;b<R;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a)}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0)}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a)}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,f<=e&&(e=f)):e=f=c+5,c+4<=e&&b!==-1?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a)}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D},{"../utils/common":28}],40:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}]},{},[10])(10)});




/** 
 * Kendo UI v2021.3.914 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2021 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
!function(a,define){define("kendo.timezones.min",["kendo.core.min"],a)}(function(){var a=window.kendo;return a.timezone.zones={"Africa/Algiers":[["-12.2","-","LMT","-2486678340000"],["-9.35","-","PMT","-1855958400000"],["0","Algeria","WE%sT","-942012000000"],["-60","Algeria","CE%sT","-733276800000"],["0","-","WET","-439430400000"],["-60","-","CET","-212025600000"],["0","Algeria","WE%sT","246240000000"],["-60","Algeria","CE%sT","309744000000"],["0","Algeria","WE%sT","357523200000"],["-60","-","CET"]],"Atlantic/Cape_Verde":[["94.06666666666668","-","LMT","-1830376800000"],["120","-","-02","-862617600000"],["120","1:00","-01","-764121600000"],["120","-","-02","186112800000"],["60","-","-01"]],"Africa/Ndjamena":[["-60.2","-","LMT","-1798848000000"],["-60","-","WAT","308707200000"],["-60","1:00","WAST","321321600000"],["-60","-","WAT"]],"Africa/Abidjan":[["16.133333333333333","-","LMT","-1798848000000"],["0","-","GMT"]],"Africa/Bamako":"Africa/Abidjan","Africa/Banjul":"Africa/Abidjan","Africa/Conakry":"Africa/Abidjan","Africa/Dakar":"Africa/Abidjan","Africa/Freetown":"Africa/Abidjan","Africa/Lome":"Africa/Abidjan","Africa/Nouakchott":"Africa/Abidjan","Africa/Ouagadougou":"Africa/Abidjan","Atlantic/St_Helena":"Africa/Abidjan","Africa/Cairo":[["-125.15","-","LMT","-2185401600000"],["-120","Egypt","EE%sT"]],"Africa/Accra":[["0.8666666666666666","-","LMT","-1609545600000"],["0","Ghana","GMT/+0020"]],"Africa/Bissau":[["62.333333333333336","-","LMT","-1830380400000"],["60","-","-01","189216000000"],["0","-","GMT"]],"Africa/Nairobi":[["-147.26666666666665","-","LMT","-1309737600000"],["-180","-","EAT","-1230854400000"],["-150","-","+0230","-915235200000"],["-165","-","+0245","-284083200000"],["-180","-","EAT"]],"Africa/Addis_Ababa":"Africa/Nairobi","Africa/Asmara":"Africa/Nairobi","Africa/Dar_es_Salaam":"Africa/Nairobi","Africa/Djibouti":"Africa/Nairobi","Africa/Kampala":"Africa/Nairobi","Africa/Mogadishu":"Africa/Nairobi","Indian/Antananarivo":"Africa/Nairobi","Indian/Comoro":"Africa/Nairobi","Indian/Mayotte":"Africa/Nairobi","Africa/Monrovia":[["43.13333333333333","-","LMT","-2745532800000"],["43.13333333333333","-","MMT","-1604361600000"],["44.5","-","MMT","63590400000"],["0","-","GMT"]],"Africa/Tripoli":[["-52.733333333333334","-","LMT","-1546387200000"],["-60","Libya","CE%sT","-315705600000"],["-120","-","EET","410140800000"],["-60","Libya","CE%sT","641779200000"],["-120","-","EET","844041600000"],["-60","Libya","CE%sT","875923200000"],["-120","-","EET","1352512800000"],["-60","Libya","CE%sT","1382666400000"],["-120","-","EET"]],"Indian/Mauritius":[["-230","-","LMT","-1956700800000"],["-240","Mauritius","+04/+05"]],"Africa/Casablanca":[["30.333333333333332","-","LMT","-1773014400000"],["0","Morocco","+00/+01","448243200000"],["-60","-","+01","536371200000"],["0","Morocco","+00/+01","1540695600000"],["-60","Morocco","+01/+00"]],"Africa/El_Aaiun":[["52.8","-","LMT","-1136073600000"],["60","-","-01","198288000000"],["0","Morocco","+00/+01","1540695600000"],["-60","Morocco","+01/+00"]],"Africa/Maputo":[["-130.33333333333331","-","LMT","-2109283200000"],["-120","-","CAT"]],"Africa/Blantyre":"Africa/Maputo","Africa/Bujumbura":"Africa/Maputo","Africa/Gaborone":"Africa/Maputo","Africa/Harare":"Africa/Maputo","Africa/Kigali":"Africa/Maputo","Africa/Lubumbashi":"Africa/Maputo","Africa/Lusaka":"Africa/Maputo","Africa/Windhoek":[["-68.4","-","LMT","-2458166400000"],["-90","-","+0130","-2109283200000"],["-120","-","SAST","-860968800000"],["-120","1:00","SAST","-845244000000"],["-120","-","SAST","637977600000"],["-120","Namibia","%s"]],"Africa/Lagos":[["-13.6","-","LMT","-1588464000000"],["-60","-","WAT"]],"Africa/Bangui":"Africa/Lagos","Africa/Brazzaville":"Africa/Lagos","Africa/Douala":"Africa/Lagos","Africa/Kinshasa":"Africa/Lagos","Africa/Libreville":"Africa/Lagos","Africa/Luanda":"Africa/Lagos","Africa/Malabo":"Africa/Lagos","Africa/Niamey":"Africa/Lagos","Africa/Porto-Novo":"Africa/Lagos","Indian/Reunion":[["-221.86666666666665","-","LMT","-1848873600000"],["-240","-","+04"]],"Africa/Sao_Tome":[["-26.933333333333334","-","LMT","-2682374400000"],["36.75","-","LMT","-1830384000000"],["0","-","GMT","1514768400000"],["-60","-","WAT","1546308000000"],["0","-","GMT"]],"Indian/Mahe":[["-221.8","-","LMT","-2006640000000"],["-240","-","+04"]],"Africa/Johannesburg":[["-112","-","LMT","-2458166400000"],["-90","-","SAST","-2109283200000"],["-120","SA","SAST"]],"Africa/Maseru":"Africa/Johannesburg","Africa/Mbabane":"Africa/Johannesburg","Africa/Khartoum":[["-130.13333333333333","-","LMT","-1199318400000"],["-120","Sudan","CA%sT","947937600000"],["-180","-","EAT","1509494400000"],["-120","-","CAT"]],"Africa/Juba":[["-126.46666666666667","-","LMT","-1199318400000"],["-120","Sudan","CA%sT","947937600000"],["-180","-","EAT"]],"Africa/Tunis":[["-40.733333333333334","-","LMT","-2797200000000"],["-9.35","-","PMT","-1855958400000"],["-60","Tunisia","CE%sT"]],"Antarctica/Casey":[["0","-","-00","-86400000"],["-480","-","+08","1255831200000"],["-660","-","+11","1267754400000"],["-480","-","+08","1319767200000"],["-660","-","+11","1329843600000"],["-480","-","+08","1477094400000"],["-660","-","+11","1520740800000"],["-480","-","+08"]],"Antarctica/Davis":[["0","-","-00","-409190400000"],["-420","-","+07","-163036800000"],["0","-","-00","-28857600000"],["-420","-","+07","1255831200000"],["-300","-","+05","1268251200000"],["-420","-","+07","1319767200000"],["-300","-","+05","1329854400000"],["-420","-","+07"]],"Antarctica/Mawson":[["0","-","-00","-501206400000"],["-360","-","+06","1255831200000"],["-300","-","+05"]],"Indian/Kerguelen":[["0","-","-00","-599702400000"],["-300","-","+05"]],"Antarctica/DumontDUrville":[["0","-","-00","-694396800000"],["-600","-","+10","-566956800000"],["0","-","-00","-415497600000"],["-600","-","+10"]],"Antarctica/Syowa":[["0","-","-00","-407808000000"],["-180","-","+03"]],"Antarctica/Troll":[["0","-","-00","1108166400000"],["0","Troll","%s"]],"Antarctica/Vostok":[["0","-","-00","-380073600000"],["-360","-","+06"]],"Antarctica/Rothera":[["0","-","-00","218246400000"],["180","-","-03"]],"Asia/Kabul":[["-276.8","-","LMT","-2493072000000"],["-240","-","+04","-757468800000"],["-270","-","+0430"]],"Asia/Yerevan":[["-178","-","LMT","-1441152000000"],["-180","-","+03","-405129600000"],["-240","RussiaAsia","+04/+05","670384800000"],["-180","RussiaAsia","+03/+04","811908000000"],["-240","-","+04","883526400000"],["-240","RussiaAsia","+04/+05","1325289600000"],["-240","Armenia","+04/+05"]],"Asia/Baku":[["-199.4","-","LMT","-1441152000000"],["-180","-","+03","-405129600000"],["-240","RussiaAsia","+04/+05","670384800000"],["-180","RussiaAsia","+03/+04","715312800000"],["-240","-","+04","851990400000"],["-240","EUAsia","+04/+05","883526400000"],["-240","Azer","+04/+05"]],"Asia/Dhaka":[["-361.6666666666667","-","LMT","-2493072000000"],["-353.3333333333333","-","HMT","-891561600000"],["-390","-","+0630","-872035200000"],["-330","-","+0530","-862617600000"],["-390","-","+0630","-576115200000"],["-360","-","+06","1262217600000"],["-360","Dhaka","+06/+07"]],"Asia/Thimphu":[["-358.6","-","LMT","-706320000000"],["-330","-","+0530","560044800000"],["-360","-","+06"]],"Indian/Chagos":[["-289.6666666666667","-","LMT","-1956700800000"],["-300","-","+05","851990400000"],["-360","-","+06"]],"Asia/Brunei":[["-459.6666666666667","-","LMT","-1383436800000"],["-450","-","+0730","-1136160000000"],["-480","-","+08"]],"Asia/Yangon":[["-384.7833333333333","-","LMT","-2808604800000"],["-384.7833333333333","-","RMT","-1546387200000"],["-390","-","+0630","-873244800000"],["-540","-","+09","-778377600000"],["-390","-","+0630"]],"Asia/Shanghai":[["-485.7166666666667","-","LMT","-2146003200000"],["-480","Shang","C%sT","-649987200000"],["-480","PRC","C%sT"]],"Asia/Urumqi":[["-350.3333333333333","-","LMT","-1293926400000"],["-360","-","+06"]],"Asia/Hong_Kong":[["-456.7","-","LMT","-2056663398000"],["-480","-","HKT","-900882000000"],["-480","1:00","HKST","-891547200000"],["-480","0:30","HKWT","-884217600000"],["-540","-","JST","-761176800000"],["-480","HK","HK%sT"]],"Asia/Taipei":[["-486","-","LMT","-2335219200000"],["-480","-","CST","-1017792000000"],["-540","-","JST","-766191600000"],["-480","Taiwan","C%sT"]],"Asia/Macau":[["-454.1666666666667","-","LMT","-2056665600000"],["-480","-","CST","-884480400000"],["-540","Macau","+09/+10","-765331200000"],["-480","Macau","C%sT"]],"Asia/Nicosia":[["-133.46666666666667","-","LMT","-1518912000000"],["-120","Cyprus","EE%sT","904608000000"],["-120","EUAsia","EE%sT"]],"Asia/Famagusta":[["-135.8","-","LMT","-1518912000000"],["-120","Cyprus","EE%sT","904608000000"],["-120","EUAsia","EE%sT","1473292800000"],["-180","-","+03","1509238800000"],["-120","EUAsia","EE%sT"]],"Europe/Nicosia":"Asia/Nicosia","Asia/Tbilisi":[["-179.18333333333334","-","LMT","-2808604800000"],["-179.18333333333334","-","TBMT","-1441152000000"],["-180","-","+03","-405129600000"],["-240","RussiaAsia","+04/+05","670384800000"],["-180","RussiaAsia","+03/+04","725760000000"],["-180","E-EurAsia","+03/+04","778377600000"],["-240","E-EurAsia","+04/+05","844128000000"],["-240","1:00","+05","857174400000"],["-240","E-EurAsia","+04/+05","1088294400000"],["-180","RussiaAsia","+03/+04","1109642400000"],["-240","-","+04"]],"Asia/Dili":[["-502.3333333333333","-","LMT","-1830384000000"],["-480","-","+08","-879123600000"],["-540","-","+09","199929600000"],["-480","-","+08","969148800000"],["-540","-","+09"]],"Asia/Kolkata":[["-353.4666666666667","-","LMT","-3645216000000"],["-353.3333333333333","-","HMT","-3124224000000"],["-321.1666666666667","-","MMT","-2019686400000"],["-330","-","IST","-891561600000"],["-330","1:00","+0630","-872035200000"],["-330","-","IST","-862617600000"],["-330","1:00","+0630","-764121600000"],["-330","-","IST"]],"Asia/Jakarta":[["-427.2","-","LMT","-3231273600000"],["-427.2","-","BMT","-1451693568000"],["-440","-","+0720","-1172880000000"],["-450","-","+0730","-876614400000"],["-540","-","+09","-766022400000"],["-450","-","+0730","-683856000000"],["-480","-","+08","-620784000000"],["-450","-","+0730","-157852800000"],["-420","-","WIB"]],"Asia/Pontianak":[["-437.3333333333333","-","LMT","-1946160000000"],["-437.3333333333333","-","PMT","-1172880000000"],["-450","-","+0730","-881193600000"],["-540","-","+09","-766022400000"],["-450","-","+0730","-683856000000"],["-480","-","+08","-620784000000"],["-450","-","+0730","-157852800000"],["-480","-","WITA","567993600000"],["-420","-","WIB"]],"Asia/Makassar":[["-477.6","-","LMT","-1546387200000"],["-477.6","-","MMT","-1172880000000"],["-480","-","+08","-880243200000"],["-540","-","+09","-766022400000"],["-480","-","WITA"]],"Asia/Jayapura":[["-562.8","-","LMT","-1172880000000"],["-540","-","+09","-799459200000"],["-570","-","+0930","-157852800000"],["-540","-","WIT"]],"Asia/Tehran":[["-205.73333333333335","-","LMT","-1672617600000"],["-205.73333333333335","-","TMT","-725932800000"],["-210","-","+0330","247190400000"],["-240","Iran","+04/+05","315446400000"],["-210","Iran","+0330/+0430"]],"Asia/Baghdad":[["-177.66666666666666","-","LMT","-2493072000000"],["-177.6","-","BMT","-1609545600000"],["-180","-","+03","389059200000"],["-180","Iraq","+03/+04"]],"Asia/Jerusalem":[["-140.9","-","LMT","-2808604800000"],["-140.66666666666666","-","JMT","-1609545600000"],["-120","Zion","I%sT"]],"Asia/Tokyo":[["-558.9833333333333","-","LMT","-2587712400000"],["-540","Japan","J%sT"]],"Asia/Amman":[["-143.73333333333335","-","LMT","-1199318400000"],["-120","Jordan","EE%sT"]],"Asia/Almaty":[["-307.8","-","LMT","-1441152000000"],["-300","-","+05","-1247529600000"],["-360","RussiaAsia","+06/+07","670384800000"],["-300","RussiaAsia","+05/+06","695786400000"],["-360","RussiaAsia","+06/+07","1099188000000"],["-360","-","+06"]],"Asia/Qyzylorda":[["-261.8666666666667","-","LMT","-1441152000000"],["-240","-","+04","-1247529600000"],["-300","-","+05","354931200000"],["-300","1:00","+06","370742400000"],["-360","-","+06","386467200000"],["-300","RussiaAsia","+05/+06","670384800000"],["-240","RussiaAsia","+04/+05","686109600000"],["-300","RussiaAsia","+05/+06","695786400000"],["-360","RussiaAsia","+06/+07","701834400000"],["-300","RussiaAsia","+05/+06","1099188000000"],["-360","-","+06","1545350400000"],["-300","-","+05"]],"Asia/Qostanay":[["-254.46666666666667","-","LMT","-1441152000000"],["-240","-","+04","-1247529600000"],["-300","-","+05","354931200000"],["-300","1:00","+06","370742400000"],["-360","-","+06","386467200000"],["-300","RussiaAsia","+05/+06","670384800000"],["-240","RussiaAsia","+04/+05","695786400000"],["-300","RussiaAsia","+05/+06","1099188000000"],["-360","-","+06"]],"Asia/Aqtobe":[["-228.66666666666666","-","LMT","-1441152000000"],["-240","-","+04","-1247529600000"],["-300","-","+05","354931200000"],["-300","1:00","+06","370742400000"],["-360","-","+06","386467200000"],["-300","RussiaAsia","+05/+06","670384800000"],["-240","RussiaAsia","+04/+05","695786400000"],["-300","RussiaAsia","+05/+06","1099188000000"],["-300","-","+05"]],"Asia/Aqtau":[["-201.06666666666666","-","LMT","-1441152000000"],["-240","-","+04","-1247529600000"],["-300","-","+05","370742400000"],["-360","-","+06","386467200000"],["-300","RussiaAsia","+05/+06","670384800000"],["-240","RussiaAsia","+04/+05","695786400000"],["-300","RussiaAsia","+05/+06","780458400000"],["-240","RussiaAsia","+04/+05","1099188000000"],["-300","-","+05"]],"Asia/Atyrau":[["-207.73333333333335","-","LMT","-1441152000000"],["-180","-","+03","-1247529600000"],["-300","-","+05","370742400000"],["-360","-","+06","386467200000"],["-300","RussiaAsia","+05/+06","670384800000"],["-240","RussiaAsia","+04/+05","695786400000"],["-300","RussiaAsia","+05/+06","922586400000"],["-240","RussiaAsia","+04/+05","1099188000000"],["-300","-","+05"]],"Asia/Oral":[["-205.4","-","LMT","-1441152000000"],["-180","-","+03","-1247529600000"],["-300","-","+05","354931200000"],["-300","1:00","+06","370742400000"],["-360","-","+06","386467200000"],["-300","RussiaAsia","+05/+06","606880800000"],["-240","RussiaAsia","+04/+05","695786400000"],["-300","RussiaAsia","+05/+06","701834400000"],["-240","RussiaAsia","+04/+05","1099188000000"],["-300","-","+05"]],"Asia/Bishkek":[["-298.4","-","LMT","-1441152000000"],["-300","-","+05","-1247529600000"],["-360","RussiaAsia","+06/+07","670384800000"],["-300","RussiaAsia","+05/+06","683604000000"],["-300","Kyrgyz","+05/+06","1123804800000"],["-360","-","+06"]],"Asia/Seoul":[["-507.8666666666667","-","LMT","-1948752000000"],["-510","-","KST","-1830384000000"],["-540","-","JST","-767318400000"],["-540","ROK","K%sT","-498096000000"],["-510","ROK","K%sT","-264902400000"],["-540","ROK","K%sT"]],"Asia/Pyongyang":[["-503","-","LMT","-1948752000000"],["-510","-","KST","-1830384000000"],["-540","-","JST","-768614400000"],["-540","-","KST","1439596800000"],["-510","-","KST","1525476600000"],["-540","-","KST"]],"Asia/Beirut":[["-142","-","LMT","-2808604800000"],["-120","Lebanon","EE%sT"]],"Asia/Kuala_Lumpur":[["-406.7666666666667","-","LMT","-2177452800000"],["-415.4166666666667","-","SMT","-2038176000000"],["-420","-","+07","-1167609600000"],["-420","0:20","+0720","-1073001600000"],["-440","-","+0720","-894153600000"],["-450","-","+0730","-879638400000"],["-540","-","+09","-766972800000"],["-450","-","+0730","378691200000"],["-480","-","+08"]],"Asia/Kuching":[["-441.3333333333333","-","LMT","-1383436800000"],["-450","-","+0730","-1136160000000"],["-480","NBorneo","+08/+0820","-879638400000"],["-540","-","+09","-766972800000"],["-480","-","+08"]],"Indian/Maldives":[["-294","-","LMT","-2808604800000"],["-294","-","MMT","-284083200000"],["-300","-","+05"]],"Asia/Hovd":[["-366.6","-","LMT","-2032905600000"],["-360","-","+06","283910400000"],["-420","Mongol","+07/+08"]],"Asia/Ulaanbaatar":[["-427.5333333333333","-","LMT","-2032905600000"],["-420","-","+07","283910400000"],["-480","Mongol","+08/+09"]],"Asia/Choibalsan":[["-458","-","LMT","-2032905600000"],["-420","-","+07","283910400000"],["-480","-","+08","418003200000"],["-540","Mongol","+09/+10","1206921600000"],["-480","Mongol","+08/+09"]],"Asia/Kathmandu":[["-341.2666666666667","-","LMT","-1546387200000"],["-330","-","+0530","536371200000"],["-345","-","+0545"]],"Asia/Karachi":[["-268.2","-","LMT","-1956700800000"],["-330","-","+0530","-862617600000"],["-330","1:00","+0630","-764121600000"],["-330","-","+0530","-576115200000"],["-300","-","+05","38793600000"],["-300","Pakistan","PK%sT"]],"Asia/Gaza":[["-137.86666666666665","-","LMT","-2185401600000"],["-120","Zion","EET/EEST","-682646400000"],["-120","EgyptAsia","EE%sT","-81302400000"],["-120","Zion","I%sT","851990400000"],["-120","Jordan","EE%sT","946598400000"],["-120","Palestine","EE%sT","1219968000000"],["-120","-","EET","1220227200000"],["-120","Palestine","EE%sT","1293753600000"],["-120","-","EET","1269648060000"],["-120","Palestine","EE%sT","1312156800000"],["-120","-","EET","1356912000000"],["-120","Palestine","EE%sT"]],"Asia/Hebron":[["-140.38333333333335","-","LMT","-2185401600000"],["-120","Zion","EET/EEST","-682646400000"],["-120","EgyptAsia","EE%sT","-81302400000"],["-120","Zion","I%sT","851990400000"],["-120","Jordan","EE%sT","946598400000"],["-120","Palestine","EE%sT"]],"Asia/Manila":[["956","-","LMT","-3944678400000"],["-484","-","LMT","-2229292800000"],["-480","Phil","P%sT","-873244800000"],["-540","-","JST","-794188800000"],["-480","Phil","P%sT"]],"Asia/Qatar":[["-206.13333333333335","-","LMT","-1546387200000"],["-240","-","+04","76204800000"],["-180","-","+03"]],"Asia/Bahrain":"Asia/Qatar","Asia/Riyadh":[["-186.86666666666665","-","LMT","-719625600000"],["-180","-","+03"]],"Asia/Aden":"Asia/Riyadh","Asia/Kuwait":"Asia/Riyadh","Asia/Singapore":[["-415.4166666666667","-","LMT","-2177452800000"],["-415.4166666666667","-","SMT","-2038176000000"],["-420","-","+07","-1167609600000"],["-420","0:20","+0720","-1073001600000"],["-440","-","+0720","-894153600000"],["-450","-","+0730","-879638400000"],["-540","-","+09","-766972800000"],["-450","-","+0730","378691200000"],["-480","-","+08"]],"Asia/Colombo":[["-319.4","-","LMT","-2808604800000"],["-319.5333333333333","-","MMT","-1988236800000"],["-330","-","+0530","-883267200000"],["-330","0:30","+06","-862617600000"],["-330","1:00","+0630","-764028000000"],["-330","-","+0530","832982400000"],["-390","-","+0630","846289800000"],["-360","-","+06","1145061000000"],["-330","-","+0530"]],"Asia/Damascus":[["-145.2","-","LMT","-1546387200000"],["-120","Syria","EE%sT"]],"Asia/Dushanbe":[["-275.2","-","LMT","-1441152000000"],["-300","-","+05","-1247529600000"],["-360","RussiaAsia","+06/+07","670384800000"],["-300","1:00","+05/+06","684381600000"],["-300","-","+05"]],"Asia/Bangkok":[["-402.06666666666666","-","LMT","-2808604800000"],["-402.06666666666666","-","BMT","-1570060800000"],["-420","-","+07"]],"Asia/Phnom_Penh":"Asia/Bangkok","Asia/Vientiane":"Asia/Bangkok","Asia/Ashgabat":[["-233.53333333333333","-","LMT","-1441152000000"],["-240","-","+04","-1247529600000"],["-300","RussiaAsia","+05/+06","670384800000"],["-240","RussiaAsia","+04/+05","695786400000"],["-300","-","+05"]],"Asia/Dubai":[["-221.2","-","LMT","-1546387200000"],["-240","-","+04"]],"Asia/Muscat":"Asia/Dubai","Asia/Samarkand":[["-267.8833333333333","-","LMT","-1441152000000"],["-240","-","+04","-1247529600000"],["-300","-","+05","354931200000"],["-300","1:00","+06","370742400000"],["-360","-","+06","386467200000"],["-300","RussiaAsia","+05/+06","725760000000"],["-300","-","+05"]],"Asia/Tashkent":[["-277.18333333333334","-","LMT","-1441152000000"],["-300","-","+05","-1247529600000"],["-360","RussiaAsia","+06/+07","670384800000"],["-300","RussiaAsia","+05/+06","725760000000"],["-300","-","+05"]],"Asia/Ho_Chi_Minh":[["-426.6666666666667","-","LMT","-2004048000000"],["-426.5","-","PLMT","-1851552000000"],["-420","-","+07","-852080400000"],["-480","-","+08","-782614800000"],["-540","-","+09","-767836800000"],["-420","-","+07","-718070400000"],["-480","-","+08","-457747200000"],["-420","-","+07","-315622800000"],["-480","-","+08","171849600000"],["-420","-","+07"]],"Australia/Darwin":[["-523.3333333333333","-","LMT","-2364076800000"],["-540","-","ACST","-2230156800000"],["-570","Aus","AC%sT"]],"Australia/Perth":[["-463.4","-","LMT","-2337897600000"],["-480","Aus","AW%sT","-836438400000"],["-480","AW","AW%sT"]],"Australia/Eucla":[["-515.4666666666667","-","LMT","-2337897600000"],["-525","Aus","+0845/+0945","-836438400000"],["-525","AW","+0845/+0945"]],"Australia/Brisbane":[["-612.1333333333333","-","LMT","-2335305600000"],["-600","Aus","AE%sT","62985600000"],["-600","AQ","AE%sT"]],"Australia/Lindeman":[["-595.9333333333334","-","LMT","-2335305600000"],["-600","Aus","AE%sT","62985600000"],["-600","AQ","AE%sT","709948800000"],["-600","Holiday","AE%sT"]],"Australia/Adelaide":[["-554.3333333333334","-","LMT","-2364076800000"],["-540","-","ACST","-2230156800000"],["-570","Aus","AC%sT","62985600000"],["-570","AS","AC%sT"]],"Australia/Hobart":[["-589.2666666666667","-","LMT","-2345760000000"],["-600","-","AEST","-1680472800000"],["-600","1:00","AEDT","-1669852800000"],["-600","Aus","AE%sT","-63244800000"],["-600","AT","AE%sT"]],"Australia/Currie":[["-575.4666666666666","-","LMT","-2345760000000"],["-600","-","AEST","-1680472800000"],["-600","1:00","AEDT","-1669852800000"],["-600","Aus","AE%sT","47174400000"],["-600","AT","AE%sT"]],"Australia/Melbourne":[["-579.8666666666667","-","LMT","-2364076800000"],["-600","Aus","AE%sT","62985600000"],["-600","AV","AE%sT"]],"Australia/Sydney":[["-604.8666666666667","-","LMT","-2364076800000"],["-600","Aus","AE%sT","62985600000"],["-600","AN","AE%sT"]],"Australia/Broken_Hill":[["-565.8","-","LMT","-2364076800000"],["-600","-","AEST","-2314915200000"],["-540","-","ACST","-2230156800000"],["-570","Aus","AC%sT","62985600000"],["-570","AN","AC%sT","978220800000"],["-570","AS","AC%sT"]],"Australia/Lord_Howe":[["-636.3333333333334","-","LMT","-2364076800000"],["-600","-","AEST","352252800000"],["-630","LH","+1030/+1130","489024000000"],["-630","LH","+1030/+11"]],"Antarctica/Macquarie":[["0","-","-00","-2214259200000"],["-600","-","AEST","-1680472800000"],["-600","1:00","AEDT","-1669852800000"],["-600","Aus","AE%sT","-1601683200000"],["0","-","-00","-687052800000"],["-600","Aus","AE%sT","-63244800000"],["-600","AT","AE%sT","1270350000000"],["-660","-","+11"]],"Indian/Christmas":[["-422.8666666666667","-","LMT","-2364076800000"],["-420","-","+07"]],"Indian/Cocos":[["-387.6666666666667","-","LMT","-2177539200000"],["-390","-","+0630"]],"Pacific/Fiji":[["-715.7333333333333","-","LMT","-1709942400000"],["-720","Fiji","+12/+13"]],"Pacific/Gambier":[["539.8","-","LMT","-1806710400000"],["540","-","-09"]],"Pacific/Marquesas":[["558","-","LMT","-1806710400000"],["570","-","-0930"]],"Pacific/Tahiti":[["598.2666666666667","-","LMT","-1806710400000"],["600","-","-10"]],"Pacific/Guam":[["861","-","LMT","-3944678400000"],["-579","-","LMT","-2146003200000"],["-600","-","GST","-885513600000"],["-540","-","+09","-802224000000"],["-600","Guam","G%sT","977529600000"],["-600","-","ChST"]],"Pacific/Saipan":"Pacific/Guam","Pacific/Tarawa":[["-692.0666666666666","-","LMT","-2146003200000"],["-720","-","+12"]],"Pacific/Enderbury":[["684.3333333333334","-","LMT","-2146003200000"],["720","-","-12","307584000000"],["660","-","-11","788832000000"],["-780","-","+13"]],"Pacific/Kiritimati":[["629.3333333333334","-","LMT","-2146003200000"],["640","-","-1040","307584000000"],["600","-","-10","788832000000"],["-840","-","+14"]],"Pacific/Majuro":[["-684.8","-","LMT","-2146003200000"],["-660","-","+11","-1743638400000"],["-540","-","+09","-1606780800000"],["-660","-","+11","-1009929600000"],["-600","-","+10","-907372800000"],["-540","-","+09","-818035200000"],["-660","-","+11","-7948800000"],["-720","-","+12"]],"Pacific/Kwajalein":[["-669.3333333333334","-","LMT","-2146003200000"],["-660","-","+11","-1009929600000"],["-600","-","+10","-907372800000"],["-540","-","+09","-817430400000"],["-660","-","+11","-7948800000"],["720","-","-12","745891200000"],["-720","-","+12"]],"Pacific/Chuuk":[["832.8666666666667","-","LMT","-3944678400000"],["-607.1333333333333","-","LMT","-2146003200000"],["-600","-","+10","-1743638400000"],["-540","-","+09","-1606780800000"],["-600","-","+10","-907372800000"],["-540","-","+09","-770601600000"],["-600","-","+10"]],"Pacific/Pohnpei":[["807.1333333333333","-","LMT","-3944678400000"],["-632.8666666666667","-","LMT","-2146003200000"],["-660","-","+11","-1743638400000"],["-540","-","+09","-1606780800000"],["-660","-","+11","-1009929600000"],["-600","-","+10","-907372800000"],["-540","-","+09","-770601600000"],["-660","-","+11"]],"Pacific/Kosrae":[["788.0666666666666","-","LMT","-3944678400000"],["-651.9333333333334","-","LMT","-2146003200000"],["-660","-","+11","-1743638400000"],["-540","-","+09","-1606780800000"],["-660","-","+11","-1009929600000"],["-600","-","+10","-907372800000"],["-540","-","+09","-770601600000"],["-660","-","+11","-7948800000"],["-720","-","+12","946598400000"],["-660","-","+11"]],"Pacific/Nauru":[["-667.6666666666666","-","LMT","-1545091200000"],["-690","-","+1130","-862876800000"],["-540","-","+09","-767318400000"],["-690","-","+1130","287460000000"],["-720","-","+12"]],"Pacific/Noumea":[["-665.8","-","LMT","-1829347200000"],["-660","NC","+11/+12"]],"Pacific/Auckland":[["-699.0666666666666","-","LMT","-3192393600000"],["-690","NZ","NZ%sT","-757382400000"],["-720","NZ","NZ%sT"]],"Pacific/Chatham":[["-733.8","-","LMT","-3192393600000"],["-735","-","+1215","-757382400000"],["-765","Chatham","+1245/+1345"]],"Antarctica/McMurdo":"Pacific/Auckland","Pacific/Rarotonga":[["639.0666666666666","-","LMT","-2146003200000"],["630","-","-1030","279676800000"],["600","Cook","-10/-0930"]],"Pacific/Niue":[["679.6666666666666","-","LMT","-2146003200000"],["680","-","-1120","-568166400000"],["690","-","-1130","276048000000"],["660","-","-11"]],"Pacific/Norfolk":[["-671.8666666666667","-","LMT","-2146003200000"],["-672","-","+1112","-568166400000"],["-690","-","+1130","152071200000"],["-690","1:00","+1230","162957600000"],["-690","-","+1130","1443924000000"],["-660","-","+11","1561939200000"],["-660","AN","+11/+12"]],"Pacific/Palau":[["902.0666666666666","-","LMT","-3944678400000"],["-537.9333333333334","-","LMT","-2146003200000"],["-540","-","+09"]],"Pacific/Port_Moresby":[["-588.6666666666666","-","LMT","-2808604800000"],["-588.5333333333334","-","PMMT","-2335305600000"],["-600","-","+10"]],"Pacific/Bougainville":[["-622.2666666666667","-","LMT","-2808604800000"],["-588.5333333333334","-","PMMT","-2335305600000"],["-600","-","+10","-867974400000"],["-540","-","+09","-768873600000"],["-600","-","+10","1419732000000"],["-660","-","+11"]],"Pacific/Pitcairn":[["520.3333333333333","-","LMT","-2146003200000"],["510","-","-0830","893635200000"],["480","-","-08"]],"Pacific/Pago_Pago":[["-757.2","-","LMT","-2445379200000"],["682.8","-","LMT","-1830470400000"],["660","-","SST"]],"Pacific/Midway":"Pacific/Pago_Pago","Pacific/Apia":[["-753.0666666666666","-","LMT","-2445379200000"],["686.9333333333334","-","LMT","-1830470400000"],["690","-","-1130","-599702400000"],["660","WS","-11/-10","1325203200000"],["-780","WS","+13/+14"]],"Pacific/Guadalcanal":[["-639.8","-","LMT","-1806710400000"],["-660","-","+11"]],"Pacific/Fakaofo":[["684.9333333333334","-","LMT","-2146003200000"],["660","-","-11","1325203200000"],["-780","-","+13"]],"Pacific/Tongatapu":[["-739.3333333333334","-","LMT","-2146003200000"],["-740","-","+1220","-883699200000"],["-780","-","+13","946598400000"],["-780","Tonga","+13/+14"]],"Pacific/Funafuti":[["-716.8666666666667","-","LMT","-2146003200000"],["-720","-","+12"]],"Pacific/Wake":[["-666.4666666666666","-","LMT","-2146003200000"],["-720","-","+12"]],"Pacific/Efate":[["-673.2666666666667","-","LMT","-1829347200000"],["-660","Vanuatu","+11/+12"]],"Pacific/Wallis":[["-735.3333333333334","-","LMT","-2146003200000"],["-720","-","+12"]],"Africa/Asmera":"Africa/Nairobi","Africa/Timbuktu":"Africa/Abidjan","America/Argentina/ComodRivadavia":"America/Argentina/Catamarca","America/Atka":"America/Adak","America/Buenos_Aires":"America/Argentina/Buenos_Aires","America/Catamarca":"America/Argentina/Catamarca","America/Coral_Harbour":"America/Atikokan","America/Cordoba":"America/Argentina/Cordoba","America/Ensenada":"America/Tijuana","America/Fort_Wayne":"America/Indiana/Indianapolis","America/Indianapolis":"America/Indiana/Indianapolis","America/Jujuy":"America/Argentina/Jujuy","America/Knox_IN":"America/Indiana/Knox","America/Louisville":"America/Kentucky/Louisville","America/Mendoza":"America/Argentina/Mendoza","America/Montreal":"America/Toronto","America/Porto_Acre":"America/Rio_Branco","America/Rosario":"America/Argentina/Cordoba","America/Santa_Isabel":"America/Tijuana","America/Shiprock":"America/Denver","America/Virgin":"America/Port_of_Spain","Antarctica/South_Pole":"Pacific/Auckland","Asia/Ashkhabad":"Asia/Ashgabat","Asia/Calcutta":"Asia/Kolkata","Asia/Chongqing":"Asia/Shanghai","Asia/Chungking":"Asia/Shanghai","Asia/Dacca":"Asia/Dhaka","Asia/Harbin":"Asia/Shanghai","Asia/Kashgar":"Asia/Urumqi","Asia/Katmandu":"Asia/Kathmandu","Asia/Macao":"Asia/Macau","Asia/Rangoon":"Asia/Yangon","Asia/Saigon":"Asia/Ho_Chi_Minh","Asia/Tel_Aviv":"Asia/Jerusalem","Asia/Thimbu":"Asia/Thimphu","Asia/Ujung_Pandang":"Asia/Makassar","Asia/Ulan_Bator":"Asia/Ulaanbaatar","Atlantic/Faeroe":"Atlantic/Faroe","Atlantic/Jan_Mayen":"Europe/Oslo","Australia/ACT":"Australia/Sydney","Australia/Canberra":"Australia/Sydney","Australia/LHI":"Australia/Lord_Howe","Australia/NSW":"Australia/Sydney","Australia/North":"Australia/Darwin","Australia/Queensland":"Australia/Brisbane","Australia/South":"Australia/Adelaide","Australia/Tasmania":"Australia/Hobart","Australia/Victoria":"Australia/Melbourne","Australia/West":"Australia/Perth","Australia/Yancowinna":"Australia/Broken_Hill","Brazil/Acre":"America/Rio_Branco","Brazil/DeNoronha":"America/Noronha","Brazil/East":"America/Sao_Paulo","Brazil/West":"America/Manaus","Canada/Atlantic":"America/Halifax","Canada/Central":"America/Winnipeg","Canada/Eastern":"America/Toronto","Canada/Mountain":"America/Edmonton","Canada/Newfoundland":"America/St_Johns","Canada/Pacific":"America/Vancouver","Canada/Saskatchewan":"America/Regina","Canada/Yukon":"America/Whitehorse","Chile/Continental":"America/Santiago","Chile/EasterIsland":"Pacific/Easter",Cuba:"America/Havana",Egypt:"Africa/Cairo",Eire:"Europe/Dublin","Etc/UCT":"Etc/UTC","Europe/Belfast":"Europe/London","Europe/Tiraspol":"Europe/Chisinau",GB:"Europe/London","GB-Eire":"Europe/London","GMT+0":"Etc/GMT","GMT-0":"Etc/GMT",GMT0:"Etc/GMT",Greenwich:"Etc/GMT",Hongkong:"Asia/Hong_Kong",Iceland:"Atlantic/Reykjavik",Iran:"Asia/Tehran",Israel:"Asia/Jerusalem",Jamaica:"America/Jamaica",Japan:"Asia/Tokyo",Kwajalein:"Pacific/Kwajalein",Libya:"Africa/Tripoli","Mexico/BajaNorte":"America/Tijuana","Mexico/BajaSur":"America/Mazatlan","Mexico/General":"America/Mexico_City",NZ:"Pacific/Auckland","NZ-CHAT":"Pacific/Chatham",Navajo:"America/Denver",PRC:"Asia/Shanghai","Pacific/Johnston":"Pacific/Honolulu","Pacific/Ponape":"Pacific/Pohnpei","Pacific/Samoa":"Pacific/Pago_Pago","Pacific/Truk":"Pacific/Chuuk","Pacific/Yap":"Pacific/Chuuk",Poland:"Europe/Warsaw",Portugal:"Europe/Lisbon",ROC:"Asia/Taipei",ROK:"Asia/Seoul",Singapore:"Asia/Singapore",Turkey:"Europe/Istanbul",UCT:"Etc/UTC","US/Alaska":"America/Anchorage","US/Aleutian":"America/Adak","US/Arizona":"America/Phoenix","US/Central":"America/Chicago","US/East-Indiana":"America/Indiana/Indianapolis","US/Eastern":"America/New_York","US/Hawaii":"Pacific/Honolulu","US/Indiana-Starke":"America/Indiana/Knox","US/Michigan":"America/Detroit","US/Mountain":"America/Denver","US/Pacific":"America/Los_Angeles","US/Samoa":"Pacific/Pago_Pago",UTC:"Etc/UTC",Universal:"Etc/UTC","W-SU":"Europe/Moscow",Zulu:"Etc/UTC","Etc/GMT":[["0","-","GMT"]],"Etc/UTC":[["0","-","UTC"]],GMT:"Etc/GMT","Etc/Universal":"Etc/UTC","Etc/Zulu":"Etc/UTC","Etc/Greenwich":"Etc/GMT","Etc/GMT-0":"Etc/GMT","Etc/GMT+0":"Etc/GMT","Etc/GMT0":"Etc/GMT","Etc/GMT-14":[["-840","-","+14"]],"Etc/GMT-13":[["-780","-","+13"]],
"Etc/GMT-12":[["-720","-","+12"]],"Etc/GMT-11":[["-660","-","+11"]],"Etc/GMT-10":[["-600","-","+10"]],"Etc/GMT-9":[["-540","-","+09"]],"Etc/GMT-8":[["-480","-","+08"]],"Etc/GMT-7":[["-420","-","+07"]],"Etc/GMT-6":[["-360","-","+06"]],"Etc/GMT-5":[["-300","-","+05"]],"Etc/GMT-4":[["-240","-","+04"]],"Etc/GMT-3":[["-180","-","+03"]],"Etc/GMT-2":[["-120","-","+02"]],"Etc/GMT-1":[["-60","-","+01"]],"Etc/GMT+1":[["60","-","-01"]],"Etc/GMT+2":[["120","-","-02"]],"Etc/GMT+3":[["180","-","-03"]],"Etc/GMT+4":[["240","-","-04"]],"Etc/GMT+5":[["300","-","-05"]],"Etc/GMT+6":[["360","-","-06"]],"Etc/GMT+7":[["420","-","-07"]],"Etc/GMT+8":[["480","-","-08"]],"Etc/GMT+9":[["540","-","-09"]],"Etc/GMT+10":[["600","-","-10"]],"Etc/GMT+11":[["660","-","-11"]],"Etc/GMT+12":[["720","-","-12"]],"Europe/London":[["1.25","-","LMT","-3852662400000"],["0","GB-Eire","%s","-37238400000"],["-60","-","BST","57722400000"],["0","GB-Eire","%s","851990400000"],["0","EU","GMT/BST"]],"Europe/Jersey":"Europe/London","Europe/Guernsey":"Europe/London","Europe/Isle_of_Man":"Europe/London","Europe/Dublin":[["25","-","LMT","-2821651200000"],["25.35","-","DMT","-1691964000000"],["25.35","1:00","IST","-1680472800000"],["0","GB-Eire","%s","-1517011200000"],["0","GB-Eire","GMT/IST","-942012000000"],["0","1:00","IST","-733356000000"],["0","-","GMT","-719445600000"],["0","1:00","IST","-699487200000"],["0","-","GMT","-684972000000"],["0","GB-Eire","GMT/IST","-37238400000"],["-60","Eire","IST/GMT"]],WET:[["0","EU","WE%sT"]],CET:[["-60","C-Eur","CE%sT"]],MET:[["-60","C-Eur","ME%sT"]],EET:[["-120","EU","EE%sT"]],"Europe/Tirane":[["-79.33333333333333","-","LMT","-1735776000000"],["-60","-","CET","-932342400000"],["-60","Albania","CE%sT","457488000000"],["-60","EU","CE%sT"]],"Europe/Andorra":[["-6.066666666666667","-","LMT","-2146003200000"],["0","-","WET","-733881600000"],["-60","-","CET","481082400000"],["-60","EU","CE%sT"]],"Europe/Vienna":[["-65.35","-","LMT","-2422051200000"],["-60","C-Eur","CE%sT","-1546387200000"],["-60","Austria","CE%sT","-938901600000"],["-60","C-Eur","CE%sT","-781048800000"],["-60","1:00","CEST","-780184800000"],["-60","-","CET","-725932800000"],["-60","Austria","CE%sT","378604800000"],["-60","EU","CE%sT"]],"Europe/Minsk":[["-110.26666666666667","-","LMT","-2808604800000"],["-110","-","MMT","-1441152000000"],["-120","-","EET","-1247529600000"],["-180","-","MSK","-899769600000"],["-60","C-Eur","CE%sT","-804643200000"],["-180","Russia","MSK/MSD","662601600000"],["-180","-","MSK","670384800000"],["-120","Russia","EE%sT","1301191200000"],["-180","-","+03"]],"Europe/Brussels":[["-17.5","-","LMT","-2808604800000"],["-17.5","-","BMT","-2450994150000"],["0","-","WET","-1740355200000"],["-60","-","CET","-1693699200000"],["-60","C-Eur","CE%sT","-1613826000000"],["0","Belgium","WE%sT","-934668000000"],["-60","C-Eur","CE%sT","-799286400000"],["-60","Belgium","CE%sT","252374400000"],["-60","EU","CE%sT"]],"Europe/Sofia":[["-93.26666666666667","-","LMT","-2808604800000"],["-116.93333333333332","-","IMT","-2369520000000"],["-120","-","EET","-857250000000"],["-60","C-Eur","CE%sT","-757468800000"],["-60","-","CET","-781045200000"],["-120","-","EET","291769200000"],["-120","Bulg","EE%sT","401857200000"],["-120","C-Eur","EE%sT","694137600000"],["-120","E-Eur","EE%sT","883526400000"],["-120","EU","EE%sT"]],"Europe/Prague":[["-57.733333333333334","-","LMT","-3755376000000"],["-57.733333333333334","-","PMT","-2469398400000"],["-60","C-Eur","CE%sT","-777859200000"],["-60","Czech","CE%sT","-728514000000"],["-60","-1:00","GMT","-721260000000"],["-60","Czech","CE%sT","315446400000"],["-60","EU","CE%sT"]],"Europe/Copenhagen":[["-50.333333333333336","-","LMT","-2493072000000"],["-50.333333333333336","-","CMT","-2398291200000"],["-60","Denmark","CE%sT","-857253600000"],["-60","C-Eur","CE%sT","-781048800000"],["-60","Denmark","CE%sT","347068800000"],["-60","EU","CE%sT"]],"Atlantic/Faroe":[["27.066666666666666","-","LMT","-1955750400000"],["0","-","WET","378604800000"],["0","EU","WE%sT"]],"America/Danmarkshavn":[["74.66666666666667","-","LMT","-1686096000000"],["180","-","-03","323834400000"],["180","EU","-03/-02","851990400000"],["0","-","GMT"]],"America/Scoresbysund":[["87.86666666666667","-","LMT","-1686096000000"],["120","-","-02","323834400000"],["120","C-Eur","-02/-01","354672000000"],["60","EU","-01/+00"]],"America/Godthab":[["206.93333333333334","-","LMT","-1686096000000"],["180","-","-03","323834400000"],["180","EU","-03/-02"]],"America/Thule":[["275.1333333333333","-","LMT","-1686096000000"],["240","Thule","A%sT"]],"Europe/Tallinn":[["-99","-","LMT","-2808604800000"],["-99","-","TMT","-1638316800000"],["-60","C-Eur","CE%sT","-1593820800000"],["-99","-","TMT","-1535932800000"],["-120","-","EET","-927936000000"],["-180","-","MSK","-892944000000"],["-60","C-Eur","CE%sT","-797644800000"],["-180","Russia","MSK/MSD","606880800000"],["-120","1:00","EEST","622605600000"],["-120","C-Eur","EE%sT","906422400000"],["-120","EU","EE%sT","941342400000"],["-120","-","EET","1014249600000"],["-120","EU","EE%sT"]],"Europe/Helsinki":[["-99.81666666666668","-","LMT","-2890252800000"],["-99.81666666666668","-","HMT","-1535932800000"],["-120","Finland","EE%sT","441676800000"],["-120","EU","EE%sT"]],"Europe/Mariehamn":"Europe/Helsinki","Europe/Paris":[["-9.35","-","LMT","-2486678340000"],["-9.35","-","PMT","-1855958340000"],["0","France","WE%sT","-932432400000"],["-60","C-Eur","CE%sT","-800064000000"],["0","France","WE%sT","-766616400000"],["-60","France","CE%sT","252374400000"],["-60","EU","CE%sT"]],"Europe/Berlin":[["-53.46666666666666","-","LMT","-2422051200000"],["-60","C-Eur","CE%sT","-776556000000"],["-60","SovietZone","CE%sT","-725932800000"],["-60","Germany","CE%sT","347068800000"],["-60","EU","CE%sT"]],"Europe/Busingen":"Europe/Zurich","Europe/Gibraltar":[["21.4","-","LMT","-2821651200000"],["0","GB-Eire","%s","-401320800000"],["-60","-","CET","410140800000"],["-60","EU","CE%sT"]],"Europe/Athens":[["-94.86666666666667","-","LMT","-2344636800000"],["-94.86666666666667","-","AMT","-1686095940000"],["-120","Greece","EE%sT","-904867200000"],["-60","Greece","CE%sT","-812419200000"],["-120","Greece","EE%sT","378604800000"],["-120","EU","EE%sT"]],"Europe/Budapest":[["-76.33333333333333","-","LMT","-2500934400000"],["-60","C-Eur","CE%sT","-1609545600000"],["-60","Hungary","CE%sT","-906768000000"],["-60","C-Eur","CE%sT","-757468800000"],["-60","Hungary","CE%sT","338954400000"],["-60","EU","CE%sT"]],"Atlantic/Reykjavik":[["88","-","LMT","-1925078400000"],["60","Iceland","-01/+00","-54774000000"],["0","-","GMT"]],"Europe/Rome":[["-49.93333333333334","-","LMT","-3252096000000"],["-49.93333333333334","-","RMT","-2403562204000"],["-60","Italy","CE%sT","-830304000000"],["-60","C-Eur","CE%sT","-807148800000"],["-60","Italy","CE%sT","347068800000"],["-60","EU","CE%sT"]],"Europe/Vatican":"Europe/Rome","Europe/San_Marino":"Europe/Rome","Europe/Riga":[["-96.56666666666668","-","LMT","-2808604800000"],["-96.56666666666668","-","RMT","-1632002400000"],["-96.56666666666668","1:00","LST","-1618693200000"],["-96.56666666666668","-","RMT","-1601676000000"],["-96.56666666666668","1:00","LST","-1597266000000"],["-96.56666666666668","-","RMT","-1377302400000"],["-120","-","EET","-928022400000"],["-180","-","MSK","-899510400000"],["-60","C-Eur","CE%sT","-795830400000"],["-180","Russia","MSK/MSD","604720800000"],["-120","1:00","EEST","620618400000"],["-120","Latvia","EE%sT","853804800000"],["-120","EU","EE%sT","951782400000"],["-120","-","EET","978393600000"],["-120","EU","EE%sT"]],"Europe/Vaduz":"Europe/Zurich","Europe/Vilnius":[["-101.26666666666667","-","LMT","-2808604800000"],["-84","-","WMT","-1641081600000"],["-95.6","-","KMT","-1585094400000"],["-60","-","CET","-1561248000000"],["-120","-","EET","-1553558400000"],["-60","-","CET","-928195200000"],["-180","-","MSK","-900115200000"],["-60","C-Eur","CE%sT","-802137600000"],["-180","Russia","MSK/MSD","606880800000"],["-120","Russia","EE%sT","686109600000"],["-120","C-Eur","EE%sT","915062400000"],["-120","-","EET","891133200000"],["-60","EU","CE%sT","941331600000"],["-120","-","EET","1041379200000"],["-120","EU","EE%sT"]],"Europe/Luxembourg":[["-24.6","-","LMT","-2069712000000"],["-60","Lux","CE%sT","-1612656000000"],["0","Lux","WE%sT","-1269813600000"],["0","Belgium","WE%sT","-935182800000"],["-60","C-Eur","WE%sT","-797979600000"],["-60","Belgium","CE%sT","252374400000"],["-60","EU","CE%sT"]],"Europe/Malta":[["-58.06666666666666","-","LMT","-2403475200000"],["-60","Italy","CE%sT","102384000000"],["-60","Malta","CE%sT","378604800000"],["-60","EU","CE%sT"]],"Europe/Chisinau":[["-115.33333333333333","-","LMT","-2808604800000"],["-115","-","CMT","-1637107200000"],["-104.4","-","BMT","-1213142400000"],["-120","Romania","EE%sT","-927158400000"],["-120","1:00","EEST","-898128000000"],["-60","C-Eur","CE%sT","-800150400000"],["-180","Russia","MSK/MSD","641959200000"],["-120","Russia","EE%sT","725760000000"],["-120","E-Eur","EE%sT","883526400000"],["-120","Moldova","EE%sT"]],"Europe/Monaco":[["-29.53333333333333","-","LMT","-2486678400000"],["-9.35","-","PMT","-1855958400000"],["0","France","WE%sT","-766616400000"],["-60","France","CE%sT","252374400000"],["-60","EU","CE%sT"]],"Europe/Amsterdam":[["-19.53333333333333","-","LMT","-4228761600000"],["-19.53333333333333","Neth","%s","-1025740800000"],["-20","Neth","+0020/+0120","-935020800000"],["-60","C-Eur","CE%sT","-781048800000"],["-60","Neth","CE%sT","252374400000"],["-60","EU","CE%sT"]],"Europe/Oslo":[["-43","-","LMT","-2366755200000"],["-60","Norway","CE%sT","-927507600000"],["-60","C-Eur","CE%sT","-781048800000"],["-60","Norway","CE%sT","347068800000"],["-60","EU","CE%sT"]],"Arctic/Longyearbyen":"Europe/Oslo","Europe/Warsaw":[["-84","-","LMT","-2808604800000"],["-84","-","WMT","-1717027200000"],["-60","C-Eur","CE%sT","-1618693200000"],["-120","Poland","EE%sT","-1501718400000"],["-60","Poland","CE%sT","-931730400000"],["-60","C-Eur","CE%sT","-796867200000"],["-60","Poland","CE%sT","252374400000"],["-60","W-Eur","CE%sT","599529600000"],["-60","EU","CE%sT"]],"Europe/Lisbon":[["36.75","-","LMT","-2682374400000"],["36.75","-","LMT","-1830384000000"],["0","Port","WE%sT","-118274400000"],["-60","-","CET","212547600000"],["0","Port","WE%sT","433299600000"],["0","W-Eur","WE%sT","717555600000"],["-60","EU","CE%sT","828234000000"],["0","EU","WE%sT"]],"Atlantic/Azores":[["102.66666666666667","-","LMT","-2682374400000"],["114.53333333333333","-","HMT","-1830376800000"],["120","Port","-02/-01","-873684000000"],["120","Port","+00","-864007200000"],["120","Port","-02/-01","-842839200000"],["120","Port","+00","-831348000000"],["120","Port","-02/-01","-810784800000"],["120","Port","+00","-799898400000"],["120","Port","-02/-01","-779335200000"],["120","Port","+00","-768448800000"],["120","Port","-02/-01","-118274400000"],["60","Port","-01/+00","433299600000"],["60","W-Eur","-01/+00","717555600000"],["0","EU","WE%sT","733280400000"],["60","EU","-01/+00"]],"Atlantic/Madeira":[["67.6","-","LMT","-2682374400000"],["67.6","-","FMT","-1830380400000"],["60","Port","-01/+00","-873684000000"],["60","Port","+01","-864007200000"],["60","Port","-01/+00","-842839200000"],["60","Port","+01","-831348000000"],["60","Port","-01/+00","-810784800000"],["60","Port","+01","-799898400000"],["60","Port","-01/+00","-779335200000"],["60","Port","+01","-768448800000"],["60","Port","-01/+00","-118274400000"],["0","Port","WE%sT","433299600000"],["0","EU","WE%sT"]],"Europe/Bucharest":[["-104.4","-","LMT","-2469398400000"],["-104.4","-","BMT","-1213142400000"],["-120","Romania","EE%sT","354679200000"],["-120","C-Eur","EE%sT","694137600000"],["-120","Romania","EE%sT","788832000000"],["-120","E-Eur","EE%sT","883526400000"],["-120","EU","EE%sT"]],"Europe/Kaliningrad":[["-82","-","LMT","-2422051200000"],["-60","C-Eur","CE%sT","-780364800000"],["-120","Poland","EE%sT","-749088000000"],["-180","Russia","MSK/MSD","606880800000"],["-120","Russia","EE%sT","1301191200000"],["-180","-","+03","1414288800000"],["-120","-","EET"]],"Europe/Moscow":[["-150.28333333333333","-","LMT","-2808604800000"],["-150.28333333333333","-","MMT","-1688256000000"],["-151.31666666666666","Russia","%s","-1593820800000"],["-180","Russia","%s","-1522713600000"],["-180","Russia","MSK/MSD","-1491177600000"],["-120","-","EET","-1247529600000"],["-180","Russia","MSK/MSD","670384800000"],["-120","Russia","EE%sT","695786400000"],["-180","Russia","MSK/MSD","1301191200000"],["-240","-","MSK","1414288800000"],["-180","-","MSK"]],"Europe/Simferopol":[["-136.4","-","LMT","-2808604800000"],["-136","-","SMT","-1441152000000"],["-120","-","EET","-1247529600000"],["-180","-","MSK","-888883200000"],["-60","C-Eur","CE%sT","-811641600000"],["-180","Russia","MSK/MSD","662601600000"],["-180","-","MSK","646797600000"],["-120","-","EET","725760000000"],["-120","E-Eur","EE%sT","767750400000"],["-180","E-Eur","MSK/MSD","828230400000"],["-180","1:00","MSD","846385200000"],["-180","Russia","MSK/MSD","883526400000"],["-180","-","MSK","857178000000"],["-120","EU","EE%sT","1396144800000"],["-240","-","MSK","1414288800000"],["-180","-","MSK"]],"Europe/Astrakhan":[["-192.2","-","LMT","-1441238400000"],["-180","-","+03","-1247529600000"],["-240","Russia","+04/+05","606880800000"],["-180","Russia","+03/+04","670384800000"],["-240","-","+04","701834400000"],["-180","Russia","+03/+04","1301191200000"],["-240","-","+04","1414288800000"],["-180","-","+03","1459044000000"],["-240","-","+04"]],"Europe/Volgograd":[["-177.66666666666666","-","LMT","-1577750400000"],["-180","-","+03","-1247529600000"],["-240","-","+04","-256867200000"],["-240","Russia","+04/+05","575431200000"],["-180","Russia","+03/+04","670384800000"],["-240","-","+04","701834400000"],["-180","Russia","+03/+04","1301191200000"],["-240","-","+04","1414288800000"],["-180","-","+03","1540692000000"],["-240","-","+04"]],"Europe/Saratov":[["-184.3","-","LMT","-1593820800000"],["-180","-","+03","-1247529600000"],["-240","Russia","+04/+05","575431200000"],["-180","Russia","+03/+04","670384800000"],["-240","-","+04","701834400000"],["-180","Russia","+03/+04","1301191200000"],["-240","-","+04","1414288800000"],["-180","-","+03","1480816800000"],["-240","-","+04"]],"Europe/Kirov":[["-198.8","-","LMT","-1593820800000"],["-180","-","+03","-1247529600000"],["-240","Russia","+04/+05","606880800000"],["-180","Russia","+03/+04","670384800000"],["-240","-","+04","701834400000"],["-180","Russia","+03/+04","1301191200000"],["-240","-","+04","1414288800000"],["-180","-","+03"]],"Europe/Samara":[["-200.33333333333334","-","LMT","-1593820800000"],["-180","-","+03","-1247529600000"],["-240","-","+04","-1102291200000"],["-240","Russia","+04/+05","606880800000"],["-180","Russia","+03/+04","670384800000"],["-120","Russia","+02/+03","686109600000"],["-180","-","+03","687927600000"],["-240","Russia","+04/+05","1269741600000"],["-180","Russia","+03/+04","1301191200000"],["-240","-","+04"]],"Europe/Ulyanovsk":[["-193.6","-","LMT","-1593820800000"],["-180","-","+03","-1247529600000"],["-240","Russia","+04/+05","606880800000"],["-180","Russia","+03/+04","670384800000"],["-120","Russia","+02/+03","695786400000"],["-180","Russia","+03/+04","1301191200000"],["-240","-","+04","1414288800000"],["-180","-","+03","1459044000000"],["-240","-","+04"]],"Asia/Yekaterinburg":[["-242.55","-","LMT","-1688256000000"],["-225.08333333333334","-","PMT","-1592596800000"],["-240","-","+04","-1247529600000"],["-300","Russia","+05/+06","670384800000"],["-240","Russia","+04/+05","695786400000"],["-300","Russia","+05/+06","1301191200000"],["-360","-","+06","1414288800000"],["-300","-","+05"]],"Asia/Omsk":[["-293.5","-","LMT","-1582070400000"],["-300","-","+05","-1247529600000"],["-360","Russia","+06/+07","670384800000"],["-300","Russia","+05/+06","695786400000"],["-360","Russia","+06/+07","1301191200000"],["-420","-","+07","1414288800000"],["-360","-","+06"]],"Asia/Barnaul":[["-335","-","LMT","-1579824000000"],["-360","-","+06","-1247529600000"],["-420","Russia","+07/+08","670384800000"],["-360","Russia","+06/+07","695786400000"],["-420","Russia","+07/+08","801619200000"],["-360","Russia","+06/+07","1301191200000"],["-420","-","+07","1414288800000"],["-360","-","+06","1459044000000"],["-420","-","+07"]],"Asia/Novosibirsk":[["-331.6666666666667","-","LMT","-1579456800000"],["-360","-","+06","-1247529600000"],["-420","Russia","+07/+08","670384800000"],["-360","Russia","+06/+07","695786400000"],["-420","Russia","+07/+08","738115200000"],["-360","Russia","+06/+07","1301191200000"],["-420","-","+07","1414288800000"],["-360","-","+06","1469325600000"],["-420","-","+07"]],"Asia/Tomsk":[["-339.85","-","LMT","-1578787200000"],["-360","-","+06","-1247529600000"],["-420","Russia","+07/+08","670384800000"],["-360","Russia","+06/+07","695786400000"],["-420","Russia","+07/+08","1020222000000"],["-360","Russia","+06/+07","1301191200000"],["-420","-","+07","1414288800000"],["-360","-","+06","1464487200000"],["-420","-","+07"]],"Asia/Novokuznetsk":[["-348.8","-","LMT","-1441238400000"],["-360","-","+06","-1247529600000"],["-420","Russia","+07/+08","670384800000"],["-360","Russia","+06/+07","695786400000"],["-420","Russia","+07/+08","1269741600000"],["-360","Russia","+06/+07","1301191200000"],["-420","-","+07"]],"Asia/Krasnoyarsk":[["-371.43333333333334","-","LMT","-1577491200000"],["-360","-","+06","-1247529600000"],["-420","Russia","+07/+08","670384800000"],["-360","Russia","+06/+07","695786400000"],["-420","Russia","+07/+08","1301191200000"],["-480","-","+08","1414288800000"],["-420","-","+07"]],"Asia/Irkutsk":[["-417.0833333333333","-","LMT","-2808604800000"],["-417.0833333333333","-","IMT","-1575849600000"],["-420","-","+07","-1247529600000"],["-480","Russia","+08/+09","670384800000"],["-420","Russia","+07/+08","695786400000"],["-480","Russia","+08/+09","1301191200000"],["-540","-","+09","1414288800000"],["-480","-","+08"]],"Asia/Chita":[["-453.8666666666667","-","LMT","-1579392000000"],["-480","-","+08","-1247529600000"],["-540","Russia","+09/+10","670384800000"],["-480","Russia","+08/+09","695786400000"],["-540","Russia","+09/+10","1301191200000"],["-600","-","+10","1414288800000"],["-480","-","+08","1459044000000"],["-540","-","+09"]],"Asia/Yakutsk":[["-518.9666666666667","-","LMT","-1579392000000"],["-480","-","+08","-1247529600000"],["-540","Russia","+09/+10","670384800000"],["-480","Russia","+08/+09","695786400000"],["-540","Russia","+09/+10","1301191200000"],["-600","-","+10","1414288800000"],["-540","-","+09"]],"Asia/Vladivostok":[["-527.5166666666667","-","LMT","-1487289600000"],["-540","-","+09","-1247529600000"],["-600","Russia","+10/+11","670384800000"],["-540","Russia","+09/+10","695786400000"],["-600","Russia","+10/+11","1301191200000"],["-660","-","+11","1414288800000"],["-600","-","+10"]],"Asia/Khandyga":[["-542.2166666666666","-","LMT","-1579392000000"],["-480","-","+08","-1247529600000"],["-540","Russia","+09/+10","670384800000"],["-480","Russia","+08/+09","695786400000"],["-540","Russia","+09/+10","1104451200000"],["-600","Russia","+10/+11","1301191200000"],["-660","-","+11","1315872000000"],["-600","-","+10","1414288800000"],["-540","-","+09"]],"Asia/Sakhalin":[["-570.8","-","LMT","-2031004800000"],["-540","-","+09","-768528000000"],["-660","Russia","+11/+12","670384800000"],["-600","Russia","+10/+11","695786400000"],["-660","Russia","+11/+12","857181600000"],["-600","Russia","+10/+11","1301191200000"],["-660","-","+11","1414288800000"],["-600","-","+10","1459044000000"],["-660","-","+11"]],"Asia/Magadan":[["-603.2","-","LMT","-1441152000000"],["-600","-","+10","-1247529600000"],["-660","Russia","+11/+12","670384800000"],["-600","Russia","+10/+11","695786400000"],["-660","Russia","+11/+12","1301191200000"],["-720","-","+12","1414288800000"],["-600","-","+10","1461463200000"],["-660","-","+11"]],"Asia/Srednekolymsk":[["-614.8666666666667","-","LMT","-1441152000000"],["-600","-","+10","-1247529600000"],["-660","Russia","+11/+12","670384800000"],["-600","Russia","+10/+11","695786400000"],["-660","Russia","+11/+12","1301191200000"],["-720","-","+12","1414288800000"],["-660","-","+11"]],"Asia/Ust-Nera":[["-572.9","-","LMT","-1579392000000"],["-480","-","+08","-1247529600000"],["-540","Russia","+09/+10","354931200000"],["-660","Russia","+11/+12","670384800000"],["-600","Russia","+10/+11","695786400000"],["-660","Russia","+11/+12","1301191200000"],["-720","-","+12","1315872000000"],["-660","-","+11","1414288800000"],["-600","-","+10"]],"Asia/Kamchatka":[["-634.6","-","LMT","-1487721600000"],["-660","-","+11","-1247529600000"],["-720","Russia","+12/+13","670384800000"],["-660","Russia","+11/+12","695786400000"],["-720","Russia","+12/+13","1269741600000"],["-660","Russia","+11/+12","1301191200000"],["-720","-","+12"]],"Asia/Anadyr":[["-709.9333333333334","-","LMT","-1441152000000"],["-720","-","+12","-1247529600000"],["-780","Russia","+13/+14","386467200000"],["-720","Russia","+12/+13","670384800000"],["-660","Russia","+11/+12","695786400000"],["-720","Russia","+12/+13","1269741600000"],["-660","Russia","+11/+12","1301191200000"],["-720","-","+12"]],"Europe/Belgrade":[["-82","-","LMT","-2682374400000"],["-60","-","CET","-905821200000"],["-60","C-Eur","CE%sT","-757468800000"],["-60","-","CET","-777938400000"],["-60","1:00","CEST","-766620000000"],["-60","-","CET","407203200000"],["-60","EU","CE%sT"]],"Europe/Ljubljana":"Europe/Belgrade","Europe/Podgorica":"Europe/Belgrade","Europe/Sarajevo":"Europe/Belgrade","Europe/Skopje":"Europe/Belgrade","Europe/Zagreb":"Europe/Belgrade","Europe/Bratislava":"Europe/Prague","Europe/Madrid":[["14.733333333333334","-","LMT","-2177453684000"],["0","Spain","WE%sT","-940208400000"],["-60","Spain","CE%sT","315446400000"],["-60","EU","CE%sT"]],"Africa/Ceuta":[["21.26666666666667","-","LMT","-2177454076000"],["0","-","WET","-1630112400000"],["0","1:00","WEST","-1616806800000"],["0","-","WET","-1420156800000"],["0","Spain","WE%sT","-1262390400000"],["0","-","WET","-63244800000"],["0","SpainAfrica","WE%sT","448243200000"],["-60","-","CET","536371200000"],["-60","EU","CE%sT"]],"Atlantic/Canary":[["61.6","-","LMT","-1509667200000"],["60","-","-01","-733878000000"],["0","-","WET","323827200000"],["0","1:00","WEST","338950800000"],["0","EU","WE%sT"]],"Europe/Stockholm":[["-72.2","-","LMT","-2871676800000"],["-60.233333333333334","-","SET","-2208988800000"],["-60","-","CET","-1692493200000"],["-60","1:00","CEST","-1680476400000"],["-60","-","CET","347068800000"],["-60","EU","CE%sT"]],"Europe/Zurich":[["-34.13333333333333","-","LMT","-3675196800000"],["-29.76666666666667","-","BMT","-2385244800000"],["-60","Swiss","CE%sT","378604800000"],["-60","EU","CE%sT"]],"Europe/Istanbul":[["-115.86666666666667","-","LMT","-2808604800000"],["-116.93333333333332","-","IMT","-1869868800000"],["-120","Turkey","EE%sT","267926400000"],["-180","Turkey","+03/+04","468122400000"],["-120","Turkey","EE%sT","1199059200000"],["-120","EU","EE%sT","1301187600000"],["-120","-","EET","1301274000000"],["-120","EU","EE%sT","1396141200000"],["-120","-","EET","1396227600000"],["-120","EU","EE%sT","1445734800000"],["-120","1:00","EEST","1446944400000"],["-120","EU","EE%sT","1473206400000"],["-180","-","+03"]],"Asia/Istanbul":"Europe/Istanbul","Europe/Kiev":[["-122.06666666666668","-","LMT","-2808604800000"],["-122.06666666666668","-","KMT","-1441152000000"],["-120","-","EET","-1247529600000"],["-180","-","MSK","-892512000000"],["-60","C-Eur","CE%sT","-825379200000"],["-180","Russia","MSK/MSD","646797600000"],["-120","1:00","EEST","686113200000"],["-120","E-Eur","EE%sT","820368000000"],["-120","EU","EE%sT"]],"Europe/Uzhgorod":[["-89.2","-","LMT","-2500934400000"],["-60","-","CET","-915235200000"],["-60","C-Eur","CE%sT","-796867200000"],["-60","1:00","CEST","-794707200000"],["-60","-","CET","-773452800000"],["-180","Russia","MSK/MSD","662601600000"],["-180","-","MSK","646797600000"],["-60","-","CET","670388400000"],["-120","-","EET","725760000000"],["-120","E-Eur","EE%sT","820368000000"],["-120","EU","EE%sT"]],"Europe/Zaporozhye":[["-140.66666666666666","-","LMT","-2808604800000"],["-140","-","+0220","-1441152000000"],["-120","-","EET","-1247529600000"],["-180","-","MSK","-894758400000"],["-60","C-Eur","CE%sT","-826416000000"],["-180","Russia","MSK/MSD","670384800000"],["-120","E-Eur","EE%sT","820368000000"],["-120","EU","EE%sT"]],EST:[["300","-","EST"]],MST:[["420","-","MST"]],HST:[["600","-","HST"]],EST5EDT:[["300","US","E%sT"]],CST6CDT:[["360","US","C%sT"]],MST7MDT:[["420","US","M%sT"]],PST8PDT:[["480","US","P%sT"]],"America/New_York":[["296.0333333333333","-","LMT","-2717668562000"],["300","US","E%sT","-1546387200000"],["300","NYC","E%sT","-852163200000"],["300","US","E%sT","-725932800000"],["300","NYC","E%sT","-63244800000"],["300","US","E%sT"]],"America/Chicago":[["350.6","-","LMT","-2717668236000"],["360","US","C%sT","-1546387200000"],["360","Chicago","C%sT","-1067810400000"],["300","-","EST","-1045432800000"],["360","Chicago","C%sT","-852163200000"],["360","US","C%sT","-725932800000"],["360","Chicago","C%sT","-63244800000"],["360","US","C%sT"]],"America/North_Dakota/Center":[["405.2","-","LMT","-2717667912000"],["420","US","M%sT","719978400000"],["360","US","C%sT"]],"America/North_Dakota/New_Salem":[["405.65","-","LMT","-2717667939000"],["420","US","M%sT","1067133600000"],["360","US","C%sT"]],"America/North_Dakota/Beulah":[["407.1166666666667","-","LMT","-2717668027000"],["420","US","M%sT","1289095200000"],["360","US","C%sT"]],"America/Denver":[["419.93333333333334","-","LMT","-2717668796000"],["420","US","M%sT","-1546387200000"],["420","Denver","M%sT","-852163200000"],["420","US","M%sT","-725932800000"],["420","Denver","M%sT","-63244800000"],["420","US","M%sT"]],"America/Los_Angeles":[["472.9666666666667","-","LMT","-2717668378000"],["480","US","P%sT","-725932800000"],["480","CA","P%sT","-63244800000"],["480","US","P%sT"]],"America/Juneau":[["-902.3166666666666","-","LMT","-3225169588000"],["537.6833333333334","-","LMT","-2188987200000"],["480","-","PST","-852163200000"],["480","US","P%sT","-725932800000"],["480","-","PST","-86400000"],["480","US","P%sT","325648800000"],["540","US","Y%sT","341373600000"],["480","US","P%sT","436327200000"],["540","US","Y%sT","438998400000"],["540","US","AK%sT"]],"America/Sitka":[["-898.7833333333334","-","LMT","-3225169800000"],["541.2166666666666","-","LMT","-2188987200000"],["480","-","PST","-852163200000"],["480","US","P%sT","-725932800000"],["480","-","PST","-86400000"],["480","US","P%sT","436327200000"],["540","US","Y%sT","438998400000"],["540","US","AK%sT"]],"America/Metlakatla":[["-913.7","-","LMT","-3225168905000"],["526.3","-","LMT","-2188987200000"],["480","-","PST","-852163200000"],["480","US","P%sT","-725932800000"],["480","-","PST","-86400000"],["480","US","P%sT","436327200000"],["480","-","PST","1446343200000"],["540","US","AK%sT","1541296800000"],["480","-","PST","1547949600000"],["540","US","AK%sT"]],"America/Yakutat":[["-881.0833333333334","-","LMT","-3225170862000"],["558.9166666666666","-","LMT","-2188987200000"],["540","-","YST","-852163200000"],["540","US","Y%sT","-725932800000"],["540","-","YST","-86400000"],["540","US","Y%sT","438998400000"],["540","US","AK%sT"]],"America/Anchorage":[["-840.4","-","LMT","-3225173303000"],["599.6","-","LMT","-2188987200000"],["600","-","AST","-852163200000"],["600","US","A%sT","-86918400000"],["600","-","AHST","-86400000"],["600","US","AH%sT","436327200000"],["540","US","Y%sT","438998400000"],["540","US","AK%sT"]],"America/Nome":[["-778.3666666666667","-","LMT","-3225177025000"],["661.6333333333333","-","LMT","-2188987200000"],["660","-","NST","-852163200000"],["660","US","N%sT","-725932800000"],["660","-","NST","-86918400000"],["660","-","BST","-86400000"],["660","US","B%sT","436327200000"],["540","US","Y%sT","438998400000"],["540","US","AK%sT"]],"America/Adak":[["-733.3666666666667","-","LMT","-3225179725000"],["706.6333333333333","-","LMT","-2188987200000"],["660","-","NST","-852163200000"],["660","US","N%sT","-725932800000"],["660","-","NST","-86918400000"],["660","-","BST","-86400000"],["660","US","B%sT","436327200000"],["600","US","AH%sT","438998400000"],["600","US","H%sT"]],"Pacific/Honolulu":[["631.4333333333334","-","LMT","-2334139200000"],["630","-","HST","-1157320800000"],["630","1:00","HDT","-1155470400000"],["630","US","H%sT","-712188000000"],["600","-","HST"]],"America/Phoenix":[["448.3","-","LMT","-2717670498000"],["420","US","M%sT","-820540740000"],["420","-","MST","-812678340000"],["420","US","M%sT","-796867140000"],["420","-","MST","-63244800000"],["420","US","M%sT","-56246400000"],["420","-","MST"]],"America/Boise":[["464.81666666666666","-","LMT","-2717667889000"],["480","US","P%sT","-1471816800000"],["420","US","M%sT","157680000000"],["420","-","MST","129088800000"],["420","US","M%sT"]],"America/Indiana/Indianapolis":[["344.6333333333333","-","LMT","-2717667878000"],["360","US","C%sT","-1546387200000"],["360","Indianapolis","C%sT","-852163200000"],["360","US","C%sT","-725932800000"],["360","Indianapolis","C%sT","-463615200000"],["300","-","EST","-386805600000"],["360","-","CST","-368661600000"],["300","-","EST","-86400000"],["300","US","E%sT","62985600000"],["300","-","EST","1167523200000"],["300","US","E%sT"]],"America/Indiana/Marengo":[["345.3833333333333","-","LMT","-2717667923000"],["360","US","C%sT","-568166400000"],["360","Marengo","C%sT","-273708000000"],["300","-","EST","-86400000"],["300","US","E%sT","126669600000"],["360","1:00","CDT","152071200000"],["300","US","E%sT","220838400000"],["300","-","EST","1167523200000"],["300","US","E%sT"]],"America/Indiana/Vincennes":[["350.1166666666667","-","LMT","-2717668207000"],["360","US","C%sT","-725932800000"],["360","Vincennes","C%sT","-179359200000"],["300","-","EST","-86400000"],["300","US","E%sT","62985600000"],["300","-","EST","1143943200000"],["360","US","C%sT","1194141600000"],["300","US","E%sT"]],"America/Indiana/Tell_City":[["347.05","-","LMT","-2717668023000"],["360","US","C%sT","-725932800000"],["360","Perry","C%sT","-179359200000"],["300","-","EST","-68680800000"],["360","US","C%sT","-21506400000"],["300","US","E%sT","62985600000"],["300","-","EST","1143943200000"],["360","US","C%sT"]],"America/Indiana/Petersburg":[["349.1166666666667","-","LMT","-2717668147000"],["360","US","C%sT","-441936000000"],["360","Pike","C%sT","-147909600000"],["300","-","EST","-100130400000"],["360","US","C%sT","247024800000"],["300","-","EST","1143943200000"],["360","US","C%sT","1194141600000"],["300","US","E%sT"]],"America/Indiana/Knox":[["346.5","-","LMT","-2717667990000"],["360","US","C%sT","-694396800000"],["360","Starke","C%sT","-242258400000"],["300","-","EST","-195084000000"],["360","US","C%sT","688528800000"],["300","-","EST","1143943200000"],["360","US","C%sT"]],"America/Indiana/Winamac":[["346.4166666666667","-","LMT","-2717667985000"],["360","US","C%sT","-725932800000"],["360","Pulaski","C%sT","-273708000000"],["300","-","EST","-86400000"],["300","US","E%sT","62985600000"],["300","-","EST","1143943200000"],["360","US","C%sT","1173578400000"],["300","US","E%sT"]],"America/Indiana/Vevay":[["340.2666666666667","-","LMT","-2717667616000"],["360","US","C%sT","-495064800000"],["300","-","EST","-86400000"],["300","US","E%sT","126144000000"],["300","-","EST","1167523200000"],["300","US","E%sT"]],"America/Kentucky/Louisville":[["343.0333333333333","-","LMT","-2717667782000"],["360","US","C%sT","-1514851200000"],["360","Louisville","C%sT","-852163200000"],["360","US","C%sT","-725932800000"],["360","Louisville","C%sT","-266450400000"],["300","-","EST","-31622400000"],["300","US","E%sT","126669600000"],["360","1:00","CDT","152071200000"],["300","US","E%sT"]],"America/Kentucky/Monticello":[["339.4","-","LMT","-2717667564000"],["360","US","C%sT","-725932800000"],["360","-","CST","-31622400000"],["360","US","C%sT","972784800000"],["300","US","E%sT"]],"America/Detroit":[["332.18333333333334","-","LMT","-2019772800000"],["360","-","CST","-1724104800000"],["300","-","EST","-852163200000"],["300","US","E%sT","-725932800000"],["300","Detroit","E%sT","-80524740000"],["300","US","E%sT","-86400000"],["300","-","EST","126144000000"],["300","US","E%sT","189216000000"],["300","-","EST","167796000000"],["300","US","E%sT"]],
"America/Menominee":[["350.45","-","LMT","-2659780800000"],["360","US","C%sT","-725932800000"],["360","Menominee","C%sT","-21506400000"],["300","-","EST","104896800000"],["360","US","C%sT"]],"America/St_Johns":[["210.86666666666665","-","LMT","-2682374400000"],["210.86666666666665","StJohns","N%sT","-1609545600000"],["210.86666666666665","Canada","N%sT","-1578009600000"],["210.86666666666665","StJohns","N%sT","-1096934400000"],["210","StJohns","N%sT","-872380800000"],["210","Canada","N%sT","-725932800000"],["210","StJohns","N%sT","1320105600000"],["210","Canada","N%sT"]],"America/Goose_Bay":[["241.66666666666666","-","LMT","-2682374400000"],["210.86666666666665","-","NST","-1609545600000"],["210.86666666666665","Canada","N%sT","-1578009600000"],["210.86666666666665","-","NST","-1096934400000"],["210","-","NST","-1041465600000"],["210","StJohns","N%sT","-872380800000"],["210","Canada","N%sT","-725932800000"],["210","StJohns","N%sT","-119916000000"],["240","StJohns","A%sT","1320105600000"],["240","Canada","A%sT"]],"America/Halifax":[["254.4","-","LMT","-2131660800000"],["240","Halifax","A%sT","-1609545600000"],["240","Canada","A%sT","-1578009600000"],["240","Halifax","A%sT","-880236000000"],["240","Canada","A%sT","-725932800000"],["240","Halifax","A%sT","157680000000"],["240","Canada","A%sT"]],"America/Glace_Bay":[["239.8","-","LMT","-2131660800000"],["240","Canada","A%sT","-505008000000"],["240","Halifax","A%sT","-473472000000"],["240","-","AST","94608000000"],["240","Halifax","A%sT","157680000000"],["240","Canada","A%sT"]],"America/Moncton":[["259.1333333333333","-","LMT","-2715897600000"],["300","-","EST","-2131660800000"],["240","Canada","A%sT","-1136160000000"],["240","Moncton","A%sT","-852163200000"],["240","Canada","A%sT","-725932800000"],["240","Moncton","A%sT","126144000000"],["240","Canada","A%sT","757296000000"],["240","Moncton","A%sT","1199059200000"],["240","Canada","A%sT"]],"America/Blanc-Sablon":[["228.46666666666667","-","LMT","-2682374400000"],["240","Canada","A%sT","31449600000"],["240","-","AST"]],"America/Toronto":[["317.5333333333333","-","LMT","-2335305600000"],["300","Canada","E%sT","-1578009600000"],["300","Toronto","E%sT","-880236000000"],["300","Canada","E%sT","-725932800000"],["300","Toronto","E%sT","157680000000"],["300","Canada","E%sT"]],"America/Thunder_Bay":[["357","-","LMT","-2335305600000"],["360","-","CST","-1862006400000"],["300","-","EST","-852163200000"],["300","Canada","E%sT","31449600000"],["300","Toronto","E%sT","126144000000"],["300","-","EST","157680000000"],["300","Canada","E%sT"]],"America/Nipigon":[["353.06666666666666","-","LMT","-2335305600000"],["300","Canada","E%sT","-923270400000"],["300","1:00","EDT","-880236000000"],["300","Canada","E%sT"]],"America/Rainy_River":[["378.2666666666667","-","LMT","-2335305600000"],["360","Canada","C%sT","-923270400000"],["360","1:00","CDT","-880236000000"],["360","Canada","C%sT"]],"America/Atikokan":[["366.4666666666667","-","LMT","-2335305600000"],["360","Canada","C%sT","-923270400000"],["360","1:00","CDT","-880236000000"],["360","Canada","C%sT","-765410400000"],["300","-","EST"]],"America/Winnipeg":[["388.6","-","LMT","-2602281600000"],["360","Winn","C%sT","1167523200000"],["360","Canada","C%sT"]],"America/Regina":[["418.6","-","LMT","-2030227200000"],["420","Regina","M%sT","-307749600000"],["360","-","CST"]],"America/Swift_Current":[["431.3333333333333","-","LMT","-2030227200000"],["420","Canada","M%sT","-749599200000"],["420","Regina","M%sT","-599702400000"],["420","Swift","M%sT","70941600000"],["360","-","CST"]],"America/Edmonton":[["453.8666666666667","-","LMT","-1998691200000"],["420","Edm","M%sT","567907200000"],["420","Canada","M%sT"]],"America/Vancouver":[["492.4666666666667","-","LMT","-2682374400000"],["480","Vanc","P%sT","567907200000"],["480","Canada","P%sT"]],"America/Dawson_Creek":[["480.93333333333334","-","LMT","-2682374400000"],["480","Canada","P%sT","-694396800000"],["480","Vanc","P%sT","83988000000"],["420","-","MST"]],"America/Fort_Nelson":[["490.7833333333333","-","LMT","-2682374400000"],["480","Vanc","P%sT","-725932800000"],["480","-","PST","-694396800000"],["480","Vanc","P%sT","567907200000"],["480","Canada","P%sT","1425780000000"],["420","-","MST"]],"America/Creston":[["466.06666666666666","-","LMT","-2682374400000"],["420","-","MST","-1680480000000"],["480","-","PST","-1627862400000"],["420","-","MST"]],"America/Pangnirtung":[["0","-","-00","-1514851200000"],["240","NT_YK","A%sT","796701600000"],["300","Canada","E%sT","941335200000"],["360","Canada","C%sT","972784800000"],["300","Canada","E%sT"]],"America/Iqaluit":[["0","-","-00","-865296000000"],["300","NT_YK","E%sT","941335200000"],["360","Canada","C%sT","972784800000"],["300","Canada","E%sT"]],"America/Resolute":[["0","-","-00","-704937600000"],["360","NT_YK","C%sT","972784800000"],["300","-","EST","986094000000"],["360","Canada","C%sT","1162087200000"],["300","-","EST","1173582000000"],["360","Canada","C%sT"]],"America/Rankin_Inlet":[["0","-","-00","-378777600000"],["360","NT_YK","C%sT","972784800000"],["300","-","EST","986094000000"],["360","Canada","C%sT"]],"America/Cambridge_Bay":[["0","-","-00","-1546387200000"],["420","NT_YK","M%sT","941335200000"],["360","Canada","C%sT","972784800000"],["300","-","EST","973382400000"],["360","-","CST","986094000000"],["420","Canada","M%sT"]],"America/Yellowknife":[["0","-","-00","-1073088000000"],["420","NT_YK","M%sT","347068800000"],["420","Canada","M%sT"]],"America/Inuvik":[["0","-","-00","-505008000000"],["480","NT_YK","P%sT","291780000000"],["420","NT_YK","M%sT","347068800000"],["420","Canada","M%sT"]],"America/Whitehorse":[["540.2","-","LMT","-2189030400000"],["540","NT_YK","Y%sT","-81993600000"],["480","NT_YK","P%sT","347068800000"],["480","Canada","P%sT"]],"America/Dawson":[["557.6666666666666","-","LMT","-2189030400000"],["540","NT_YK","Y%sT","120614400000"],["480","NT_YK","P%sT","347068800000"],["480","Canada","P%sT"]],"America/Cancun":[["347.06666666666666","-","LMT","-1514764024000"],["360","-","CST","377913600000"],["300","Mexico","E%sT","902023200000"],["360","Mexico","C%sT","1422756000000"],["300","-","EST"]],"America/Merida":[["358.4666666666667","-","LMT","-1514764708000"],["360","-","CST","377913600000"],["300","-","EST","407635200000"],["360","Mexico","C%sT"]],"America/Matamoros":[["400","-","LMT","-1514767200000"],["360","-","CST","599529600000"],["360","US","C%sT","631065600000"],["360","Mexico","C%sT","1293753600000"],["360","US","C%sT"]],"America/Monterrey":[["401.2666666666667","-","LMT","-1514767276000"],["360","-","CST","599529600000"],["360","US","C%sT","631065600000"],["360","Mexico","C%sT"]],"America/Mexico_City":[["396.6","-","LMT","-1514763396000"],["420","-","MST","-1343091600000"],["360","-","CST","-1234828800000"],["420","-","MST","-1220317200000"],["360","-","CST","-1207180800000"],["420","-","MST","-1191369600000"],["360","Mexico","C%sT","1001815200000"],["360","-","CST","1014163200000"],["360","Mexico","C%sT"]],"America/Ojinaga":[["417.6666666666667","-","LMT","-1514764660000"],["420","-","MST","-1343091600000"],["360","-","CST","-1234828800000"],["420","-","MST","-1220317200000"],["360","-","CST","-1207180800000"],["420","-","MST","-1191369600000"],["360","-","CST","851990400000"],["360","Mexico","C%sT","915062400000"],["360","-","CST","891399600000"],["420","Mexico","M%sT","1293753600000"],["420","US","M%sT"]],"America/Chihuahua":[["424.3333333333333","-","LMT","-1514765060000"],["420","-","MST","-1343091600000"],["360","-","CST","-1234828800000"],["420","-","MST","-1220317200000"],["360","-","CST","-1207180800000"],["420","-","MST","-1191369600000"],["360","-","CST","851990400000"],["360","Mexico","C%sT","915062400000"],["360","-","CST","891399600000"],["420","Mexico","M%sT"]],"America/Hermosillo":[["443.8666666666667","-","LMT","-1514766232000"],["420","-","MST","-1343091600000"],["360","-","CST","-1234828800000"],["420","-","MST","-1220317200000"],["360","-","CST","-1207180800000"],["420","-","MST","-1191369600000"],["360","-","CST","-873849600000"],["420","-","MST","-661564800000"],["480","-","PST","31449600000"],["420","Mexico","M%sT","946598400000"],["420","-","MST"]],"America/Mazatlan":[["425.6666666666667","-","LMT","-1514765140000"],["420","-","MST","-1343091600000"],["360","-","CST","-1234828800000"],["420","-","MST","-1220317200000"],["360","-","CST","-1207180800000"],["420","-","MST","-1191369600000"],["360","-","CST","-873849600000"],["420","-","MST","-661564800000"],["480","-","PST","31449600000"],["420","Mexico","M%sT"]],"America/Bahia_Banderas":[["421","-","LMT","-1514764860000"],["420","-","MST","-1343091600000"],["360","-","CST","-1234828800000"],["420","-","MST","-1220317200000"],["360","-","CST","-1207180800000"],["420","-","MST","-1191369600000"],["360","-","CST","-873849600000"],["420","-","MST","-661564800000"],["480","-","PST","31449600000"],["420","Mexico","M%sT","1270346400000"],["360","Mexico","C%sT"]],"America/Tijuana":[["468.06666666666666","-","LMT","-1514764084000"],["420","-","MST","-1420156800000"],["480","-","PST","-1343091600000"],["420","-","MST","-1234828800000"],["480","-","PST","-1222992000000"],["480","1:00","PDT","-1207267200000"],["480","-","PST","-873849600000"],["480","1:00","PWT","-769395600000"],["480","1:00","PPT","-761702400000"],["480","-","PST","-686102400000"],["480","1:00","PDT","-661564800000"],["480","-","PST","-473472000000"],["480","CA","P%sT","-252547200000"],["480","-","PST","220838400000"],["480","US","P%sT","851990400000"],["480","Mexico","P%sT","1009756800000"],["480","US","P%sT","1014163200000"],["480","Mexico","P%sT","1293753600000"],["480","US","P%sT"]],"America/Nassau":[["309.5","-","LMT","-1825113600000"],["300","Bahamas","E%sT","220838400000"],["300","US","E%sT"]],"America/Barbados":[["238.48333333333335","-","LMT","-1420156800000"],["238.48333333333335","-","BMT","-1167696000000"],["240","Barb","A%sT"]],"America/Belize":[["352.8","-","LMT","-1822521600000"],["360","Belize","%s"]],"Atlantic/Bermuda":[["259.3","-","LMT","-1262296800000"],["240","-","AST","136346400000"],["240","Canada","A%sT","220838400000"],["240","US","A%sT"]],"America/Costa_Rica":[["336.2166666666667","-","LMT","-2493072000000"],["336.2166666666667","-","SJMT","-1545091200000"],["360","CR","C%sT"]],"America/Havana":[["329.4666666666667","-","LMT","-2493072000000"],["329.6","-","HMT","-1402833600000"],["300","Cuba","C%sT"]],"America/Santo_Domingo":[["279.6","-","LMT","-2493072000000"],["280","-","SDMT","-1159790400000"],["300","DR","%s","152064000000"],["240","-","AST","972784800000"],["300","US","E%sT","975805200000"],["240","-","AST"]],"America/El_Salvador":[["356.8","-","LMT","-1514851200000"],["360","Salv","C%sT"]],"America/Guatemala":[["362.06666666666666","-","LMT","-1617062400000"],["360","Guat","C%sT"]],"America/Port-au-Prince":[["289.3333333333333","-","LMT","-2493072000000"],["289","-","PPMT","-1670500800000"],["300","Haiti","E%sT"]],"America/Tegucigalpa":[["348.8666666666667","-","LMT","-1538524800000"],["360","Hond","C%sT"]],"America/Jamaica":[["307.1666666666667","-","LMT","-2493072000000"],["307.1666666666667","-","KMT","-1827705600000"],["300","-","EST","157680000000"],["300","US","E%sT","473299200000"],["300","-","EST"]],"America/Martinique":[["244.33333333333334","-","LMT","-2493072000000"],["244.33333333333334","-","FFMT","-1851552000000"],["240","-","AST","323827200000"],["240","1:00","ADT","338947200000"],["240","-","AST"]],"America/Managua":[["345.1333333333333","-","LMT","-2493072000000"],["345.2","-","MMT","-1121126400000"],["360","-","CST","105062400000"],["300","-","EST","161740800000"],["360","Nic","C%sT","694238400000"],["300","-","EST","717292800000"],["360","-","CST","757296000000"],["300","-","EST","883526400000"],["360","Nic","C%sT"]],"America/Panama":[["318.1333333333333","-","LMT","-2493072000000"],["319.6","-","CMT","-1946937600000"],["300","-","EST"]],"America/Cayman":"America/Panama","America/Puerto_Rico":[["264.4166666666667","-","LMT","-2233051200000"],["240","-","AST","-873072000000"],["240","US","A%sT","-725932800000"],["240","-","AST"]],"America/Miquelon":[["224.66666666666666","-","LMT","-1850342400000"],["240","-","AST","325987200000"],["180","-","-03","567907200000"],["180","Canada","-03/-02"]],"America/Grand_Turk":[["284.5333333333333","-","LMT","-2493072000000"],["307.1666666666667","-","KMT","-1827705600000"],["300","-","EST","315446400000"],["300","US","E%sT","1446343200000"],["240","-","AST","1520737200000"],["300","US","E%sT"]],"US/Pacific-New":"America/Los_Angeles","America/Argentina/Buenos_Aires":[["233.8","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","Arg","-03/-02"]],"America/Argentina/Cordoba":[["256.8","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","667958400000"],["240","-","-04","687916800000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","Arg","-03/-02"]],"America/Argentina/Salta":[["261.66666666666663","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","667958400000"],["240","-","-04","687916800000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Argentina/Tucuman":[["260.8666666666667","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","667958400000"],["240","-","-04","687916800000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","-","-03","1086048000000"],["240","-","-04","1087084800000"],["180","Arg","-03/-02"]],"America/Argentina/La_Rioja":[["267.4","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","667785600000"],["240","-","-04","673574400000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","-","-03","1086048000000"],["240","-","-04","1087689600000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Argentina/San_Juan":[["274.06666666666666","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","667785600000"],["240","-","-04","673574400000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","-","-03","1085961600000"],["240","-","-04","1090713600000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Argentina/Jujuy":[["261.2","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","636508800000"],["240","-","-04","657072000000"],["240","1:00","-03","669168000000"],["240","-","-04","686707200000"],["180","1:00","-02","725760000000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Argentina/Catamarca":[["263.1333333333333","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","667958400000"],["240","-","-04","687916800000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","-","-03","1086048000000"],["240","-","-04","1087689600000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Argentina/Mendoza":[["275.2666666666667","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","636508800000"],["240","-","-04","655948800000"],["240","1:00","-03","667785600000"],["240","-","-04","687484800000"],["240","1:00","-03","699408000000"],["240","-","-04","719366400000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","-","-03","1085270400000"],["240","-","-04","1096156800000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Argentina/San_Luis":[["265.4","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","662601600000"],["180","1:00","-02","637372800000"],["240","-","-04","655948800000"],["240","1:00","-03","667785600000"],["240","-","-04","675734400000"],["180","-","-03","938908800000"],["240","1:00","-03","952041600000"],["180","-","-03","1085961600000"],["240","-","-04","1090713600000"],["180","Arg","-03/-02","1200873600000"],["240","SanLuis","-04/-03","1255219200000"],["180","-","-03"]],"America/Argentina/Rio_Gallegos":[["276.8666666666667","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","-","-03","1086048000000"],["240","-","-04","1087689600000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Argentina/Ushuaia":[["273.2","-","LMT","-2372112000000"],["256.8","-","CMT","-1567468800000"],["240","-","-04","-1233446400000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","938908800000"],["240","Arg","-04/-03","952041600000"],["180","-","-03","1085875200000"],["240","-","-04","1087689600000"],["180","Arg","-03/-02","1224288000000"],["180","-","-03"]],"America/Aruba":"America/Curacao","America/La_Paz":[["272.6","-","LMT","-2493072000000"],["272.6","-","CMT","-1205971200000"],["272.6","1:00","BST","-1192320000000"],["240","-","-04"]],"America/Noronha":[["129.66666666666669","-","LMT","-1735776000000"],["120","Brazil","-02/-01","653529600000"],["120","-","-02","938649600000"],["120","Brazil","-02/-01","971568000000"],["120","-","-02","1000339200000"],["120","Brazil","-02/-01","1033430400000"],["120","-","-02"]],"America/Belem":[["193.93333333333334","-","LMT","-1735776000000"],["180","Brazil","-03/-02","590025600000"],["180","-","-03"]],"America/Santarem":[["218.8","-","LMT","-1735776000000"],["240","Brazil","-04/-03","590025600000"],["240","-","-04","1214265600000"],["180","-","-03"]],"America/Fortaleza":[["154","-","LMT","-1735776000000"],["180","Brazil","-03/-02","653529600000"],["180","-","-03","938649600000"],["180","Brazil","-03/-02","972172800000"],["180","-","-03","1000339200000"],["180","Brazil","-03/-02","1033430400000"],["180","-","-03"]],"America/Recife":[["139.6","-","LMT","-1735776000000"],["180","Brazil","-03/-02","653529600000"],["180","-","-03","938649600000"],["180","Brazil","-03/-02","971568000000"],["180","-","-03","1000339200000"],["180","Brazil","-03/-02","1033430400000"],["180","-","-03"]],"America/Araguaina":[["192.8","-","LMT","-1735776000000"],["180","Brazil","-03/-02","653529600000"],["180","-","-03","811036800000"],["180","Brazil","-03/-02","1064361600000"],["180","-","-03","1350777600000"],["180","Brazil","-03/-02","1377993600000"],["180","-","-03"]],"America/Maceio":[["142.86666666666665","-","LMT","-1735776000000"],["180","Brazil","-03/-02","653529600000"],["180","-","-03","813542400000"],["180","Brazil","-03/-02","841795200000"],["180","-","-03","938649600000"],["180","Brazil","-03/-02","972172800000"],["180","-","-03","1000339200000"],["180","Brazil","-03/-02","1033430400000"],["180","-","-03"]],"America/Bahia":[["154.06666666666666","-","LMT","-1735776000000"],["180","Brazil","-03/-02","1064361600000"],["180","-","-03","1318723200000"],["180","Brazil","-03/-02","1350777600000"],["180","-","-03"]],"America/Sao_Paulo":[["186.46666666666667","-","LMT","-1735776000000"],["180","Brazil","-03/-02","-195436800000"],["180","1:00","-02","-157852800000"],["180","Brazil","-03/-02"]],"America/Campo_Grande":[["218.46666666666667","-","LMT","-1735776000000"],["240","Brazil","-04/-03"]],"America/Cuiaba":[["224.33333333333334","-","LMT","-1735776000000"],["240","Brazil","-04/-03","1064361600000"],["240","-","-04","1096588800000"],["240","Brazil","-04/-03"]],"America/Porto_Velho":[["255.6","-","LMT","-1735776000000"],["240","Brazil","-04/-03","590025600000"],["240","-","-04"]],"America/Boa_Vista":[["242.66666666666666","-","LMT","-1735776000000"],["240","Brazil","-04/-03","590025600000"],["240","-","-04","938649600000"],["240","Brazil","-04/-03","971568000000"],["240","-","-04"]],"America/Manaus":[["240.06666666666666","-","LMT","-1735776000000"],["240","Brazil","-04/-03","590025600000"],["240","-","-04","749174400000"],["240","Brazil","-04/-03","780192000000"],["240","-","-04"]],"America/Eirunepe":[["279.4666666666667","-","LMT","-1735776000000"],["300","Brazil","-05/-04","590025600000"],["300","-","-05","749174400000"],["300","Brazil","-05/-04","780192000000"],["300","-","-05","1214265600000"],["240","-","-04","1384041600000"],["300","-","-05"]],"America/Rio_Branco":[["271.2","-","LMT","-1735776000000"],["300","Brazil","-05/-04","590025600000"],["300","-","-05","1214265600000"],["240","-","-04","1384041600000"],["300","-","-05"]],"America/Santiago":[["282.7666666666667","-","LMT","-2493072000000"],["282.7666666666667","-","SMT","-1892678400000"],["300","-","-05","-1688428800000"],["282.7666666666667","-","SMT","-1619222400000"],["240","-","-04","-1593820800000"],["282.7666666666667","-","SMT","-1336003200000"],["300","Chile","-05/-04","-1178150400000"],["240","-","-04","-870566400000"],["300","-","-05","-865296000000"],["240","-","-04","-740534400000"],["240","1:00","-03","-736387200000"],["240","-","-04","-718070400000"],["300","-","-05","-713667600000"],["240","Chile","-04/-03"]],"America/Punta_Arenas":[["283.6666666666667","-","LMT","-2493072000000"],["282.7666666666667","-","SMT","-1892678400000"],["300","-","-05","-1688428800000"],["282.7666666666667","-","SMT","-1619222400000"],["240","-","-04","-1593820800000"],["282.7666666666667","-","SMT","-1336003200000"],["300","Chile","-05/-04","-1178150400000"],["240","-","-04","-870566400000"],["300","-","-05","-865296000000"],["240","-","-04","-718070400000"],["300","-","-05","-713667600000"],["240","Chile","-04/-03","1480809600000"],["180","-","-03"]],"Pacific/Easter":[["437.4666666666667","-","LMT","-2493072000000"],["437.4666666666667","-","EMT","-1178150400000"],["420","Chile","-07/-06","384922800000"],["360","Chile","-06/-05"]],"Antarctica/Palmer":[["0","-","-00","-126316800000"],["240","Arg","-04/-03","-7603200000"],["180","Arg","-03/-02","389059200000"],["240","Chile","-04/-03","1480809600000"],["180","-","-03"]],"America/Bogota":[["296.2666666666667","-","LMT","-2707689600000"],["296.2666666666667","-","BMT","-1739059200000"],["300","CO","-05/-04"]],"America/Curacao":[["275.7833333333333","-","LMT","-1826755200000"],["270","-","-0430","-126316800000"],["240","-","AST"]],"America/Lower_Princes":"America/Curacao","America/Kralendijk":"America/Curacao","America/Guayaquil":[["319.3333333333333","-","LMT","-2493072000000"],["314","-","QMT","-1199318400000"],["300","Ecuador","-05/-04"]],"Pacific/Galapagos":[["358.4","-","LMT","-1199318400000"],["300","-","-05","536371200000"],["360","Ecuador","-06/-05"]],"Atlantic/Stanley":[["231.4","-","LMT","-2493072000000"],["231.4","-","SMT","-1824249600000"],["240","Falk","-04/-03","420595200000"],["180","Falk","-03/-02","495590400000"],["240","Falk","-04/-03","1283652000000"],["180","-","-03"]],"America/Cayenne":[["209.33333333333334","-","LMT","-1846281600000"],["240","-","-04","-71107200000"],["180","-","-03"]],"America/Guyana":[["232.66666666666666","-","LMT","-1730592000000"],["225","-","-0345","175996800000"],["180","-","-03","694137600000"],["240","-","-04"]],"America/Asuncion":[["230.66666666666666","-","LMT","-2493072000000"],["230.66666666666666","-","AMT","-1206403200000"],["240","-","-04","86745600000"],["180","-","-03","134006400000"],["240","Para","-04/-03"]],"America/Lima":[["308.2","-","LMT","-2493072000000"],["308.6","-","LMT","-1938556800000"],["300","Peru","-05/-04"]],"Atlantic/South_Georgia":[["146.13333333333335","-","LMT","-2493072000000"],["120","-","-02"]],"America/Paramaribo":[["220.66666666666666","-","LMT","-1830470400000"],["220.86666666666665","-","PMT","-1073088000000"],["220.6","-","PMT","-765331200000"],["210","-","-0330","465436800000"],["180","-","-03"]],"America/Port_of_Spain":[["246.06666666666666","-","LMT","-1825113600000"],["240","-","AST"]],"America/Anguilla":"America/Port_of_Spain","America/Antigua":"America/Port_of_Spain","America/Dominica":"America/Port_of_Spain","America/Grenada":"America/Port_of_Spain","America/Guadeloupe":"America/Port_of_Spain","America/Marigot":"America/Port_of_Spain","America/Montserrat":"America/Port_of_Spain","America/St_Barthelemy":"America/Port_of_Spain","America/St_Kitts":"America/Port_of_Spain","America/St_Lucia":"America/Port_of_Spain","America/St_Thomas":"America/Port_of_Spain","America/St_Vincent":"America/Port_of_Spain","America/Tortola":"America/Port_of_Spain","America/Montevideo":[["224.85","-","LMT","-1942704000000"],["224.85","-","MMT","-1567468800000"],["240","-","-04","-1459641600000"],["210","Uruguay","-0330/-03","-853632000000"],["180","Uruguay","-03/-0230","-284083200000"],["180","Uruguay","-03/-02","-31622400000"],["180","Uruguay","-03/-0230","31449600000"],["180","Uruguay","-03/-02","157680000000"],["180","Uruguay","-03/-0130","132105600000"],["180","Uruguay","-03/-0230","156902400000"],["180","Uruguay","-03/-02"]],"America/Caracas":[["267.7333333333333","-","LMT","-2493072000000"],["267.6666666666667","-","CMT","-1826755200000"],["270","-","-0430","-157766400000"],["240","-","-04","1197169200000"],["270","-","-0430","1462069800000"],["240","-","-04"]]},a.timezone.rules={Algeria:[["1916","only","-","Jun","14",["23","0","0","s"],"60","S"],["1916","1919","-","Oct","Sun>=1",["23","0","0","s"],"0","-"],["1917","only","-","Mar","24",["23","0","0","s"],"60","S"],["1918","only","-","Mar","9",["23","0","0","s"],"60","S"],["1919","only","-","Mar","1",["23","0","0","s"],"60","S"],["1920","only","-","Feb","14",["23","0","0","s"],"60","S"],["1920","only","-","Oct","23",["23","0","0","s"],"0","-"],["1921","only","-","Mar","14",["23","0","0","s"],"60","S"],["1921","only","-","Jun","21",["23","0","0","s"],"0","-"],["1939","only","-","Sep","11",["23","0","0","s"],"60","S"],["1939","only","-","Nov","19",["1","0","0"],"0","-"],["1944","1945","-","Apr","Mon>=1",["2","0","0"],"60","S"],["1944","only","-","Oct","8",["2","0","0"],"0","-"],["1945","only","-","Sep","16",["1","0","0"],"0","-"],["1971","only","-","Apr","25",["23","0","0","s"],"60","S"],["1971","only","-","Sep","26",["23","0","0","s"],"0","-"],["1977","only","-","May","6",["0","0","0"],"60","S"],["1977","only","-","Oct","21",["0","0","0"],"0","-"],["1978","only","-","Mar","24",["1","0","0"],"60","S"],["1978","only","-","Sep","22",["3","0","0"],"0","-"],["1980","only","-","Apr","25",["0","0","0"],"60","S"],["1980","only","-","Oct","31",["2","0","0"],"0","-"]],Egypt:[["1940","only","-","Jul","15",["0","0","0"],"60","S"],["1940","only","-","Oct","1",["0","0","0"],"0","-"],["1941","only","-","Apr","15",["0","0","0"],"60","S"],["1941","only","-","Sep","16",["0","0","0"],"0","-"],["1942","1944","-","Apr","1",["0","0","0"],"60","S"],["1942","only","-","Oct","27",["0","0","0"],"0","-"],["1943","1945","-","Nov","1",["0","0","0"],"0","-"],["1945","only","-","Apr","16",["0","0","0"],"60","S"],["1957","only","-","May","10",["0","0","0"],"60","S"],["1957","1958","-","Oct","1",["0","0","0"],"0","-"],["1958","only","-","May","1",["0","0","0"],"60","S"],["1959","1981","-","May","1",["1","0","0"],"60","S"],["1959","1965","-","Sep","30",["3","0","0"],"0","-"],["1966","1994","-","Oct","1",["3","0","0"],"0","-"],["1982","only","-","Jul","25",["1","0","0"],"60","S"],["1983","only","-","Jul","12",["1","0","0"],"60","S"],["1984","1988","-","May","1",["1","0","0"],"60","S"],["1989","only","-","May","6",["1","0","0"],"60","S"],["1990","1994","-","May","1",["1","0","0"],"60","S"],["1995","2010","-","Apr","lastFri",["0","0","0","s"],"60","S"],["1995","2005","-","Sep","lastThu",["24","0","0"],"0","-"],["2006","only","-","Sep","21",["24","0","0"],"0","-"],["2007","only","-","Sep","Thu>=1",["24","0","0"],"0","-"],["2008","only","-","Aug","lastThu",["24","0","0"],"0","-"],["2009","only","-","Aug","20",["24","0","0"],"0","-"],["2010","only","-","Aug","10",["24","0","0"],"0","-"],["2010","only","-","Sep","9",["24","0","0"],"60","S"],["2010","only","-","Sep","lastThu",["24","0","0"],"0","-"],["2014","only","-","May","15",["24","0","0"],"60","S"],["2014","only","-","Jun","26",["24","0","0"],"0","-"],["2014","only","-","Jul","31",["24","0","0"],"60","S"],["2014","only","-","Sep","lastThu",["24","0","0"],"0","-"]],Ghana:[["1920","1942","-","Sep","1",["0","0","0"],"20","-"],["1920","1942","-","Dec","31",["0","0","0"],"0","-"]],Libya:[["1951","only","-","Oct","14",["2","0","0"],"60","S"],["1952","only","-","Jan","1",["0","0","0"],"0","-"],["1953","only","-","Oct","9",["2","0","0"],"60","S"],["1954","only","-","Jan","1",["0","0","0"],"0","-"],["1955","only","-","Sep","30",["0","0","0"],"60","S"],["1956","only","-","Jan","1",["0","0","0"],"0","-"],["1982","1984","-","Apr","1",["0","0","0"],"60","S"],["1982","1985","-","Oct","1",["0","0","0"],"0","-"],["1985","only","-","Apr","6",["0","0","0"],"60","S"],["1986","only","-","Apr","4",["0","0","0"],"60","S"],["1986","only","-","Oct","3",["0","0","0"],"0","-"],["1987","1989","-","Apr","1",["0","0","0"],"60","S"],["1987","1989","-","Oct","1",["0","0","0"],"0","-"],["1997","only","-","Apr","4",["0","0","0"],"60","S"],["1997","only","-","Oct","4",["0","0","0"],"0","-"],["2013","only","-","Mar","lastFri",["1","0","0"],"60","S"],["2013","only","-","Oct","lastFri",["2","0","0"],"0","-"]],Mauritius:[["1982","only","-","Oct","10",["0","0","0"],"60","-"],["1983","only","-","Mar","21",["0","0","0"],"0","-"],["2008","only","-","Oct","lastSun",["2","0","0"],"60","-"],["2009","only","-","Mar","lastSun",["2","0","0"],"0","-"]],Morocco:[["1939","only","-","Sep","12",["0","0","0"],"60","-"],["1939","only","-","Nov","19",["0","0","0"],"0","-"],["1940","only","-","Feb","25",["0","0","0"],"60","-"],["1945","only","-","Nov","18",["0","0","0"],"0","-"],["1950","only","-","Jun","11",["0","0","0"],"60","-"],["1950","only","-","Oct","29",["0","0","0"],"0","-"],["1967","only","-","Jun","3",["12","0","0"],"60","-"],["1967","only","-","Oct","1",["0","0","0"],"0","-"],["1974","only","-","Jun","24",["0","0","0"],"60","-"],["1974","only","-","Sep","1",["0","0","0"],"0","-"],["1976","1977","-","May","1",["0","0","0"],"60","-"],["1976","only","-","Aug","1",["0","0","0"],"0","-"],["1977","only","-","Sep","28",["0","0","0"],"0","-"],["1978","only","-","Jun","1",["0","0","0"],"60","-"],["1978","only","-","Aug","4",["0","0","0"],"0","-"],["2008","only","-","Jun","1",["0","0","0"],"60","-"],["2008","only","-","Sep","1",["0","0","0"],"0","-"],["2009","only","-","Jun","1",["0","0","0"],"60","-"],["2009","only","-","Aug","21",["0","0","0"],"0","-"],["2010","only","-","May","2",["0","0","0"],"60","-"],["2010","only","-","Aug","8",["0","0","0"],"0","-"],["2011","only","-","Apr","3",["0","0","0"],"60","-"],["2011","only","-","Jul","31",["0","0","0"],"0","-"],["2012","2013","-","Apr","lastSun",["2","0","0"],"60","-"],["2012","only","-","Jul","20",["3","0","0"],"0","-"],["2012","only","-","Aug","20",["2","0","0"],"60","-"],["2012","only","-","Sep","30",["3","0","0"],"0","-"],["2013","only","-","Jul","7",["3","0","0"],"0","-"],["2013","only","-","Aug","10",["2","0","0"],"60","-"],["2013","2018","-","Oct","lastSun",["3","0","0"],"0","-"],["2014","2018","-","Mar","lastSun",["2","0","0"],"60","-"],["2014","only","-","Jun","28",["3","0","0"],"0","-"],["2014","only","-","Aug","2",["2","0","0"],"60","-"],["2015","only","-","Jun","14",["3","0","0"],"0","-"],["2015","only","-","Jul","19",["2","0","0"],"60","-"],["2016","only","-","Jun","5",["3","0","0"],"0","-"],["2016","only","-","Jul","10",["2","0","0"],"60","-"],["2017","only","-","May","21",["3","0","0"],"0","-"],["2017","only","-","Jul","2",["2","0","0"],"60","-"],["2018","only","-","May","13",["3","0","0"],"0","-"],["2018","only","-","Jun","17",["2","0","0"],"60","-"],["2019","only","-","May","5",["3","0","0"],"-60","-"],["2019","only","-","Jun","9",["2","0","0"],"0","-"],["2020","only","-","Apr","19",["3","0","0"],"-60","-"],["2020","only","-","May","24",["2","0","0"],"0","-"],["2021","only","-","Apr","11",["3","0","0"],"-60","-"],["2021","only","-","May","16",["2","0","0"],"0","-"],["2022","only","-","Mar","27",["3","0","0"],"-60","-"],["2022","only","-","May","8",["2","0","0"],"0","-"],["2023","only","-","Mar","19",["3","0","0"],"-60","-"],["2023","only","-","Apr","23",["2","0","0"],"0","-"],["2024","only","-","Mar","10",["3","0","0"],"-60","-"],["2024","only","-","Apr","14",["2","0","0"],"0","-"],["2025","only","-","Feb","23",["3","0","0"],"-60","-"],["2025","only","-","Apr","6",["2","0","0"],"0","-"],["2026","only","-","Feb","15",["3","0","0"],"-60","-"],["2026","only","-","Mar","22",["2","0","0"],"0","-"],["2027","only","-","Feb","7",["3","0","0"],"-60","-"],["2027","only","-","Mar","14",["2","0","0"],"0","-"],["2028","only","-","Jan","23",["3","0","0"],"-60","-"],["2028","only","-","Feb","27",["2","0","0"],"0","-"],["2029","only","-","Jan","14",["3","0","0"],"-60","-"],["2029","only","-","Feb","18",["2","0","0"],"0","-"],["2029","only","-","Dec","30",["3","0","0"],"-60","-"],["2030","only","-","Feb","10",["2","0","0"],"0","-"],["2030","only","-","Dec","22",["3","0","0"],"-60","-"],["2031","only","-","Jan","26",["2","0","0"],"0","-"],["2031","only","-","Dec","14",["3","0","0"],"-60","-"],["2032","only","-","Jan","18",["2","0","0"],"0","-"],["2032","only","-","Nov","28",["3","0","0"],"-60","-"],["2033","only","-","Jan","9",["2","0","0"],"0","-"],["2033","only","-","Nov","20",["3","0","0"],"-60","-"],["2033","only","-","Dec","25",["2","0","0"],"0","-"],["2034","only","-","Nov","5",["3","0","0"],"-60","-"],["2034","only","-","Dec","17",["2","0","0"],"0","-"],["2035","only","-","Oct","28",["3","0","0"],"-60","-"],["2035","only","-","Dec","2",["2","0","0"],"0","-"],["2036","only","-","Oct","19",["3","0","0"],"-60","-"],["2036","only","-","Nov","23",["2","0","0"],"0","-"],["2037","only","-","Oct","4",["3","0","0"],"-60","-"],["2037","only","-","Nov","15",["2","0","0"],"0","-"],["2038","only","-","Sep","26",["3","0","0"],"-60","-"],["2038","only","-","Oct","31",["2","0","0"],"0","-"],["2039","only","-","Sep","18",["3","0","0"],"-60","-"],["2039","only","-","Oct","23",["2","0","0"],"0","-"],["2040","only","-","Sep","2",["3","0","0"],"-60","-"],["2040","only","-","Oct","14",["2","0","0"],"0","-"],["2041","only","-","Aug","25",["3","0","0"],"-60","-"],["2041","only","-","Sep","29",["2","0","0"],"0","-"],["2042","only","-","Aug","10",["3","0","0"],"-60","-"],["2042","only","-","Sep","21",["2","0","0"],"0","-"],["2043","only","-","Aug","2",["3","0","0"],"-60","-"],["2043","only","-","Sep","6",["2","0","0"],"0","-"],["2044","only","-","Jul","24",["3","0","0"],"-60","-"],["2044","only","-","Aug","28",["2","0","0"],"0","-"],["2045","only","-","Jul","9",["3","0","0"],"-60","-"],["2045","only","-","Aug","20",["2","0","0"],"0","-"],["2046","only","-","Jul","1",["3","0","0"],"-60","-"],["2046","only","-","Aug","5",["2","0","0"],"0","-"],["2047","only","-","Jun","23",["3","0","0"],"-60","-"],["2047","only","-","Jul","28",["2","0","0"],"0","-"],["2048","only","-","Jun","7",["3","0","0"],"-60","-"],["2048","only","-","Jul","19",["2","0","0"],"0","-"],["2049","only","-","May","30",["3","0","0"],"-60","-"],["2049","only","-","Jul","4",["2","0","0"],"0","-"],["2050","only","-","May","15",["3","0","0"],"-60","-"],["2050","only","-","Jun","26",["2","0","0"],"0","-"],["2051","only","-","May","7",["3","0","0"],"-60","-"],["2051","only","-","Jun","11",["2","0","0"],"0","-"],["2052","only","-","Apr","28",["3","0","0"],"-60","-"],["2052","only","-","Jun","2",["2","0","0"],"0","-"],["2053","only","-","Apr","13",["3","0","0"],"-60","-"],["2053","only","-","May","25",["2","0","0"],"0","-"],["2054","only","-","Apr","5",["3","0","0"],"-60","-"],["2054","only","-","May","10",["2","0","0"],"0","-"],["2055","only","-","Mar","28",["3","0","0"],"-60","-"],["2055","only","-","May","2",["2","0","0"],"0","-"],["2056","only","-","Mar","12",["3","0","0"],"-60","-"],["2056","only","-","Apr","23",["2","0","0"],"0","-"],["2057","only","-","Mar","4",["3","0","0"],"-60","-"],["2057","only","-","Apr","8",["2","0","0"],"0","-"],["2058","only","-","Feb","17",["3","0","0"],"-60","-"],["2058","only","-","Mar","31",["2","0","0"],"0","-"],["2059","only","-","Feb","9",["3","0","0"],"-60","-"],["2059","only","-","Mar","16",["2","0","0"],"0","-"],["2060","only","-","Feb","1",["3","0","0"],"-60","-"],["2060","only","-","Mar","7",["2","0","0"],"0","-"],["2061","only","-","Jan","16",["3","0","0"],"-60","-"],["2061","only","-","Feb","27",["2","0","0"],"0","-"],["2062","only","-","Jan","8",["3","0","0"],"-60","-"],["2062","only","-","Feb","12",["2","0","0"],"0","-"],["2062","only","-","Dec","31",["3","0","0"],"-60","-"],["2063","only","-","Feb","4",["2","0","0"],"0","-"],["2063","only","-","Dec","16",["3","0","0"],"-60","-"],["2064","only","-","Jan","20",["2","0","0"],"0","-"],["2064","only","-","Dec","7",["3","0","0"],"-60","-"],["2065","only","-","Jan","11",["2","0","0"],"0","-"],["2065","only","-","Nov","22",["3","0","0"],"-60","-"],["2066","only","-","Jan","3",["2","0","0"],"0","-"],["2066","only","-","Nov","14",["3","0","0"],"-60","-"],["2066","only","-","Dec","19",["2","0","0"],"0","-"],["2067","only","-","Nov","6",["3","0","0"],"-60","-"],["2067","only","-","Dec","11",["2","0","0"],"0","-"],["2068","only","-","Oct","21",["3","0","0"],"-60","-"],["2068","only","-","Dec","2",["2","0","0"],"0","-"],["2069","only","-","Oct","13",["3","0","0"],"-60","-"],["2069","only","-","Nov","17",["2","0","0"],"0","-"],["2070","only","-","Oct","5",["3","0","0"],"-60","-"],["2070","only","-","Nov","9",["2","0","0"],"0","-"],["2071","only","-","Sep","20",["3","0","0"],"-60","-"],["2071","only","-","Oct","25",["2","0","0"],"0","-"],["2072","only","-","Sep","11",["3","0","0"],"-60","-"],["2072","only","-","Oct","16",["2","0","0"],"0","-"],["2073","only","-","Aug","27",["3","0","0"],"-60","-"],["2073","only","-","Oct","8",["2","0","0"],"0","-"],["2074","only","-","Aug","19",["3","0","0"],"-60","-"],["2074","only","-","Sep","23",["2","0","0"],"0","-"],["2075","only","-","Aug","11",["3","0","0"],"-60","-"],["2075","only","-","Sep","15",["2","0","0"],"0","-"],["2076","only","-","Jul","26",["3","0","0"],"-60","-"],["2076","only","-","Sep","6",["2","0","0"],"0","-"],["2077","only","-","Jul","18",["3","0","0"],"-60","-"],["2077","only","-","Aug","22",["2","0","0"],"0","-"],["2078","only","-","Jul","10",["3","0","0"],"-60","-"],["2078","only","-","Aug","14",["2","0","0"],"0","-"],["2079","only","-","Jun","25",["3","0","0"],"-60","-"],["2079","only","-","Jul","30",["2","0","0"],"0","-"],["2080","only","-","Jun","16",["3","0","0"],"-60","-"],["2080","only","-","Jul","21",["2","0","0"],"0","-"],["2081","only","-","Jun","1",["3","0","0"],"-60","-"],["2081","only","-","Jul","13",["2","0","0"],"0","-"],["2082","only","-","May","24",["3","0","0"],"-60","-"],["2082","only","-","Jun","28",["2","0","0"],"0","-"],["2083","only","-","May","16",["3","0","0"],"-60","-"],["2083","only","-","Jun","20",["2","0","0"],"0","-"],["2084","only","-","Apr","30",["3","0","0"],"-60","-"],["2084","only","-","Jun","11",["2","0","0"],"0","-"],["2085","only","-","Apr","22",["3","0","0"],"-60","-"],["2085","only","-","May","27",["2","0","0"],"0","-"],["2086","only","-","Apr","14",["3","0","0"],"-60","-"],["2086","only","-","May","19",["2","0","0"],"0","-"],["2087","only","-","Mar","30",["3","0","0"],"-60","-"],["2087","only","-","May","4",["2","0","0"],"0","-"]],
Namibia:[["1994","only","-","Mar","21",["0","0","0"],"-60","WAT"],["1994","2017","-","Sep","Sun>=1",["2","0","0"],"0","CAT"],["1995","2017","-","Apr","Sun>=1",["2","0","0"],"-60","WAT"]],SA:[["1942","1943","-","Sep","Sun>=15",["2","0","0"],"60","-"],["1943","1944","-","Mar","Sun>=15",["2","0","0"],"0","-"]],Sudan:[["1970","only","-","May","1",["0","0","0"],"60","S"],["1970","1985","-","Oct","15",["0","0","0"],"0","-"],["1971","only","-","Apr","30",["0","0","0"],"60","S"],["1972","1985","-","Apr","lastSun",["0","0","0"],"60","S"]],Tunisia:[["1939","only","-","Apr","15",["23","0","0","s"],"60","S"],["1939","only","-","Nov","18",["23","0","0","s"],"0","-"],["1940","only","-","Feb","25",["23","0","0","s"],"60","S"],["1941","only","-","Oct","6",["0","0","0"],"0","-"],["1942","only","-","Mar","9",["0","0","0"],"60","S"],["1942","only","-","Nov","2",["3","0","0"],"0","-"],["1943","only","-","Mar","29",["2","0","0"],"60","S"],["1943","only","-","Apr","17",["2","0","0"],"0","-"],["1943","only","-","Apr","25",["2","0","0"],"60","S"],["1943","only","-","Oct","4",["2","0","0"],"0","-"],["1944","1945","-","Apr","Mon>=1",["2","0","0"],"60","S"],["1944","only","-","Oct","8",["0","0","0"],"0","-"],["1945","only","-","Sep","16",["0","0","0"],"0","-"],["1977","only","-","Apr","30",["0","0","0","s"],"60","S"],["1977","only","-","Sep","24",["0","0","0","s"],"0","-"],["1978","only","-","May","1",["0","0","0","s"],"60","S"],["1978","only","-","Oct","1",["0","0","0","s"],"0","-"],["1988","only","-","Jun","1",["0","0","0","s"],"60","S"],["1988","1990","-","Sep","lastSun",["0","0","0","s"],"0","-"],["1989","only","-","Mar","26",["0","0","0","s"],"60","S"],["1990","only","-","May","1",["0","0","0","s"],"60","S"],["2005","only","-","May","1",["0","0","0","s"],"60","S"],["2005","only","-","Sep","30",["1","0","0","s"],"0","-"],["2006","2008","-","Mar","lastSun",["2","0","0","s"],"60","S"],["2006","2008","-","Oct","lastSun",["2","0","0","s"],"0","-"]],Troll:[["2005","max","-","Mar","lastSun",["1","0","0","u"],"120","+02"],["2004","max","-","Oct","lastSun",["1","0","0","u"],"0","+00"]],EUAsia:[["1981","max","-","Mar","lastSun",["1","0","0","u"],"60","S"],["1979","1995","-","Sep","lastSun",["1","0","0","u"],"0","-"],["1996","max","-","Oct","lastSun",["1","0","0","u"],"0","-"]],"E-EurAsia":[["1981","max","-","Mar","lastSun",["0","0","0"],"60","-"],["1979","1995","-","Sep","lastSun",["0","0","0"],"0","-"],["1996","max","-","Oct","lastSun",["0","0","0"],"0","-"]],RussiaAsia:[["1981","1984","-","Apr","1",["0","0","0"],"60","-"],["1981","1983","-","Oct","1",["0","0","0"],"0","-"],["1984","1995","-","Sep","lastSun",["2","0","0","s"],"0","-"],["1985","2010","-","Mar","lastSun",["2","0","0","s"],"60","-"],["1996","2010","-","Oct","lastSun",["2","0","0","s"],"0","-"]],Armenia:[["2011","only","-","Mar","lastSun",["2","0","0","s"],"60","-"],["2011","only","-","Oct","lastSun",["2","0","0","s"],"0","-"]],Azer:[["1997","2015","-","Mar","lastSun",["4","0","0"],"60","-"],["1997","2015","-","Oct","lastSun",["5","0","0"],"0","-"]],Dhaka:[["2009","only","-","Jun","19",["23","0","0"],"60","-"],["2009","only","-","Dec","31",["24","0","0"],"0","-"]],Shang:[["1940","only","-","Jun","1",["0","0","0"],"60","D"],["1940","only","-","Oct","12",["24","0","0"],"0","S"],["1941","only","-","Mar","15",["0","0","0"],"60","D"],["1941","only","-","Nov","1",["24","0","0"],"0","S"],["1942","only","-","Jan","31",["0","0","0"],"60","D"],["1945","only","-","Sep","1",["24","0","0"],"0","S"],["1946","only","-","May","15",["0","0","0"],"60","D"],["1946","only","-","Sep","30",["24","0","0"],"0","S"],["1947","only","-","Apr","15",["0","0","0"],"60","D"],["1947","only","-","Oct","31",["24","0","0"],"0","S"],["1948","1949","-","May","1",["0","0","0"],"60","D"],["1948","1949","-","Sep","30",["24","0","0"],"0","S",""]],PRC:[["1986","only","-","May","4",["2","0","0"],"60","D"],["1986","1991","-","Sep","Sun>=11",["2","0","0"],"0","S"],["1987","1991","-","Apr","Sun>=11",["2","0","0"],"60","D"]],HK:[["1946","only","-","Apr","21",["0","0","0"],"60","S"],["1946","only","-","Dec","1",["3","30","0","s"],"0","-"],["1947","only","-","Apr","13",["3","30","0","s"],"60","S"],["1947","only","-","Nov","30",["3","30","0","s"],"0","-"],["1948","only","-","May","2",["3","30","0","s"],"60","S"],["1948","1952","-","Oct","Sun>=28",["3","30","0","s"],"0","-"],["1949","1953","-","Apr","Sun>=1",["3","30","0"],"60","S"],["1953","1964","-","Oct","Sun>=31",["3","30","0"],"0","-"],["1954","1964","-","Mar","Sun>=18",["3","30","0"],"60","S"],["1965","1976","-","Apr","Sun>=16",["3","30","0"],"60","S"],["1965","1976","-","Oct","Sun>=16",["3","30","0"],"0","-"],["1973","only","-","Dec","30",["3","30","0"],"60","S"],["1979","only","-","May","13",["3","30","0"],"60","S"],["1979","only","-","Oct","21",["3","30","0"],"0","-"]],Taiwan:[["1946","only","-","May","15",["0","0","0"],"60","D"],["1946","only","-","Oct","1",["0","0","0"],"0","S"],["1947","only","-","Apr","15",["0","0","0"],"60","D"],["1947","only","-","Nov","1",["0","0","0"],"0","S"],["1948","1951","-","May","1",["0","0","0"],"60","D"],["1948","1951","-","Oct","1",["0","0","0"],"0","S"],["1952","only","-","Mar","1",["0","0","0"],"60","D"],["1952","1954","-","Nov","1",["0","0","0"],"0","S"],["1953","1959","-","Apr","1",["0","0","0"],"60","D"],["1955","1961","-","Oct","1",["0","0","0"],"0","S"],["1960","1961","-","Jun","1",["0","0","0"],"60","D"],["1974","1975","-","Apr","1",["0","0","0"],"60","D"],["1974","1975","-","Oct","1",["0","0","0"],"0","S"],["1979","only","-","Jul","1",["0","0","0"],"60","D"],["1979","only","-","Oct","1",["0","0","0"],"0","S"]],Macau:[["1942","1943","-","Apr","30",["23","0","0"],"60","-"],["1942","only","-","Nov","17",["23","0","0"],"0","-"],["1943","only","-","Sep","30",["23","0","0"],"0","S"],["1946","only","-","Apr","30",["23","0","0","s"],"60","D"],["1946","only","-","Sep","30",["23","0","0","s"],"0","S"],["1947","only","-","Apr","19",["23","0","0","s"],"60","D"],["1947","only","-","Nov","30",["23","0","0","s"],"0","S"],["1948","only","-","May","2",["23","0","0","s"],"60","D"],["1948","only","-","Oct","31",["23","0","0","s"],"0","S"],["1949","1950","-","Apr","Sat>=1",["23","0","0","s"],"60","D"],["1949","1950","-","Oct","lastSat",["23","0","0","s"],"0","S"],["1951","only","-","Mar","31",["23","0","0","s"],"60","D"],["1951","only","-","Oct","28",["23","0","0","s"],"0","S"],["1952","1953","-","Apr","Sat>=1",["23","0","0","s"],"60","D"],["1952","only","-","Nov","1",["23","0","0","s"],"0","S"],["1953","1954","-","Oct","lastSat",["23","0","0","s"],"0","S"],["1954","1956","-","Mar","Sat>=17",["23","0","0","s"],"60","D"],["1955","only","-","Nov","5",["23","0","0","s"],"0","S"],["1956","1964","-","Nov","Sun>=1",["3","30","0"],"0","S"],["1957","1964","-","Mar","Sun>=18",["3","30","0"],"60","D"],["1965","1973","-","Apr","Sun>=16",["3","30","0"],"60","D"],["1965","1966","-","Oct","Sun>=16",["2","30","0"],"0","S"],["1967","1976","-","Oct","Sun>=16",["3","30","0"],"0","S"],["1973","only","-","Dec","30",["3","30","0"],"60","D"],["1975","1976","-","Apr","Sun>=16",["3","30","0"],"60","D"],["1979","only","-","May","13",["3","30","0"],"60","D"],["1979","only","-","Oct","Sun>=16",["3","30","0"],"0","S"]],Cyprus:[["1975","only","-","Apr","13",["0","0","0"],"60","S"],["1975","only","-","Oct","12",["0","0","0"],"0","-"],["1976","only","-","May","15",["0","0","0"],"60","S"],["1976","only","-","Oct","11",["0","0","0"],"0","-"],["1977","1980","-","Apr","Sun>=1",["0","0","0"],"60","S"],["1977","only","-","Sep","25",["0","0","0"],"0","-"],["1978","only","-","Oct","2",["0","0","0"],"0","-"],["1979","1997","-","Sep","lastSun",["0","0","0"],"0","-"],["1981","1998","-","Mar","lastSun",["0","0","0"],"60","S"]],Iran:[["1978","1980","-","Mar","20",["24","0","0"],"60","-"],["1978","only","-","Oct","20",["24","0","0"],"0","-"],["1979","only","-","Sep","18",["24","0","0"],"0","-"],["1980","only","-","Sep","22",["24","0","0"],"0","-"],["1991","only","-","May","2",["24","0","0"],"60","-"],["1992","1995","-","Mar","21",["24","0","0"],"60","-"],["1991","1995","-","Sep","21",["24","0","0"],"0","-"],["1996","only","-","Mar","20",["24","0","0"],"60","-"],["1996","only","-","Sep","20",["24","0","0"],"0","-"],["1997","1999","-","Mar","21",["24","0","0"],"60","-"],["1997","1999","-","Sep","21",["24","0","0"],"0","-"],["2000","only","-","Mar","20",["24","0","0"],"60","-"],["2000","only","-","Sep","20",["24","0","0"],"0","-"],["2001","2003","-","Mar","21",["24","0","0"],"60","-"],["2001","2003","-","Sep","21",["24","0","0"],"0","-"],["2004","only","-","Mar","20",["24","0","0"],"60","-"],["2004","only","-","Sep","20",["24","0","0"],"0","-"],["2005","only","-","Mar","21",["24","0","0"],"60","-"],["2005","only","-","Sep","21",["24","0","0"],"0","-"],["2008","only","-","Mar","20",["24","0","0"],"60","-"],["2008","only","-","Sep","20",["24","0","0"],"0","-"],["2009","2011","-","Mar","21",["24","0","0"],"60","-"],["2009","2011","-","Sep","21",["24","0","0"],"0","-"],["2012","only","-","Mar","20",["24","0","0"],"60","-"],["2012","only","-","Sep","20",["24","0","0"],"0","-"],["2013","2015","-","Mar","21",["24","0","0"],"60","-"],["2013","2015","-","Sep","21",["24","0","0"],"0","-"],["2016","only","-","Mar","20",["24","0","0"],"60","-"],["2016","only","-","Sep","20",["24","0","0"],"0","-"],["2017","2019","-","Mar","21",["24","0","0"],"60","-"],["2017","2019","-","Sep","21",["24","0","0"],"0","-"],["2020","only","-","Mar","20",["24","0","0"],"60","-"],["2020","only","-","Sep","20",["24","0","0"],"0","-"],["2021","2023","-","Mar","21",["24","0","0"],"60","-"],["2021","2023","-","Sep","21",["24","0","0"],"0","-"],["2024","only","-","Mar","20",["24","0","0"],"60","-"],["2024","only","-","Sep","20",["24","0","0"],"0","-"],["2025","2027","-","Mar","21",["24","0","0"],"60","-"],["2025","2027","-","Sep","21",["24","0","0"],"0","-"],["2028","2029","-","Mar","20",["24","0","0"],"60","-"],["2028","2029","-","Sep","20",["24","0","0"],"0","-"],["2030","2031","-","Mar","21",["24","0","0"],"60","-"],["2030","2031","-","Sep","21",["24","0","0"],"0","-"],["2032","2033","-","Mar","20",["24","0","0"],"60","-"],["2032","2033","-","Sep","20",["24","0","0"],"0","-"],["2034","2035","-","Mar","21",["24","0","0"],"60","-"],["2034","2035","-","Sep","21",["24","0","0"],"0","-"],["2036","2037","-","Mar","20",["24","0","0"],"60","-"],["2036","2037","-","Sep","20",["24","0","0"],"0","-"],["2038","2039","-","Mar","21",["24","0","0"],"60","-"],["2038","2039","-","Sep","21",["24","0","0"],"0","-"],["2040","2041","-","Mar","20",["24","0","0"],"60","-"],["2040","2041","-","Sep","20",["24","0","0"],"0","-"],["2042","2043","-","Mar","21",["24","0","0"],"60","-"],["2042","2043","-","Sep","21",["24","0","0"],"0","-"],["2044","2045","-","Mar","20",["24","0","0"],"60","-"],["2044","2045","-","Sep","20",["24","0","0"],"0","-"],["2046","2047","-","Mar","21",["24","0","0"],"60","-"],["2046","2047","-","Sep","21",["24","0","0"],"0","-"],["2048","2049","-","Mar","20",["24","0","0"],"60","-"],["2048","2049","-","Sep","20",["24","0","0"],"0","-"],["2050","2051","-","Mar","21",["24","0","0"],"60","-"],["2050","2051","-","Sep","21",["24","0","0"],"0","-"],["2052","2053","-","Mar","20",["24","0","0"],"60","-"],["2052","2053","-","Sep","20",["24","0","0"],"0","-"],["2054","2055","-","Mar","21",["24","0","0"],"60","-"],["2054","2055","-","Sep","21",["24","0","0"],"0","-"],["2056","2057","-","Mar","20",["24","0","0"],"60","-"],["2056","2057","-","Sep","20",["24","0","0"],"0","-"],["2058","2059","-","Mar","21",["24","0","0"],"60","-"],["2058","2059","-","Sep","21",["24","0","0"],"0","-"],["2060","2062","-","Mar","20",["24","0","0"],"60","-"],["2060","2062","-","Sep","20",["24","0","0"],"0","-"],["2063","only","-","Mar","21",["24","0","0"],"60","-"],["2063","only","-","Sep","21",["24","0","0"],"0","-"],["2064","2066","-","Mar","20",["24","0","0"],"60","-"],["2064","2066","-","Sep","20",["24","0","0"],"0","-"],["2067","only","-","Mar","21",["24","0","0"],"60","-"],["2067","only","-","Sep","21",["24","0","0"],"0","-"],["2068","2070","-","Mar","20",["24","0","0"],"60","-"],["2068","2070","-","Sep","20",["24","0","0"],"0","-"],["2071","only","-","Mar","21",["24","0","0"],"60","-"],["2071","only","-","Sep","21",["24","0","0"],"0","-"],["2072","2074","-","Mar","20",["24","0","0"],"60","-"],["2072","2074","-","Sep","20",["24","0","0"],"0","-"],["2075","only","-","Mar","21",["24","0","0"],"60","-"],["2075","only","-","Sep","21",["24","0","0"],"0","-"],["2076","2078","-","Mar","20",["24","0","0"],"60","-"],["2076","2078","-","Sep","20",["24","0","0"],"0","-"],["2079","only","-","Mar","21",["24","0","0"],"60","-"],["2079","only","-","Sep","21",["24","0","0"],"0","-"],["2080","2082","-","Mar","20",["24","0","0"],"60","-"],["2080","2082","-","Sep","20",["24","0","0"],"0","-"],["2083","only","-","Mar","21",["24","0","0"],"60","-"],["2083","only","-","Sep","21",["24","0","0"],"0","-"],["2084","2086","-","Mar","20",["24","0","0"],"60","-"],["2084","2086","-","Sep","20",["24","0","0"],"0","-"],["2087","only","-","Mar","21",["24","0","0"],"60","-"],["2087","only","-","Sep","21",["24","0","0"],"0","-"],["2088","max","-","Mar","20",["24","0","0"],"60","-"],["2088","max","-","Sep","20",["24","0","0"],"0","-"]],Iraq:[["1982","only","-","May","1",["0","0","0"],"60","-"],["1982","1984","-","Oct","1",["0","0","0"],"0","-"],["1983","only","-","Mar","31",["0","0","0"],"60","-"],["1984","1985","-","Apr","1",["0","0","0"],"60","-"],["1985","1990","-","Sep","lastSun",["1","0","0","s"],"0","-"],["1986","1990","-","Mar","lastSun",["1","0","0","s"],"60","-"],["1991","2007","-","Apr","1",["3","0","0","s"],"60","-"],["1991","2007","-","Oct","1",["3","0","0","s"],"0","-"]],Zion:[["1940","only","-","Jun","1",["0","0","0"],"60","D"],["1942","1944","-","Nov","1",["0","0","0"],"0","S"],["1943","only","-","Apr","1",["2","0","0"],"60","D"],["1944","only","-","Apr","1",["0","0","0"],"60","D"],["1945","only","-","Apr","16",["0","0","0"],"60","D"],["1945","only","-","Nov","1",["2","0","0"],"0","S"],["1946","only","-","Apr","16",["2","0","0"],"60","D"],["1946","only","-","Nov","1",["0","0","0"],"0","S"],["1948","only","-","May","23",["0","0","0"],"120","DD"],["1948","only","-","Sep","1",["0","0","0"],"60","D"],["1948","1949","-","Nov","1",["2","0","0"],"0","S"],["1949","only","-","May","1",["0","0","0"],"60","D"],["1950","only","-","Apr","16",["0","0","0"],"60","D"],["1950","only","-","Sep","15",["3","0","0"],"0","S"],["1951","only","-","Apr","1",["0","0","0"],"60","D"],["1951","only","-","Nov","11",["3","0","0"],"0","S"],["1952","only","-","Apr","20",["2","0","0"],"60","D"],["1952","only","-","Oct","19",["3","0","0"],"0","S"],["1953","only","-","Apr","12",["2","0","0"],"60","D"],["1953","only","-","Sep","13",["3","0","0"],"0","S"],["1954","only","-","Jun","13",["0","0","0"],"60","D"],["1954","only","-","Sep","12",["0","0","0"],"0","S"],["1955","only","-","Jun","11",["2","0","0"],"60","D"],["1955","only","-","Sep","11",["0","0","0"],"0","S"],["1956","only","-","Jun","3",["0","0","0"],"60","D"],["1956","only","-","Sep","30",["3","0","0"],"0","S"],["1957","only","-","Apr","29",["2","0","0"],"60","D"],["1957","only","-","Sep","22",["0","0","0"],"0","S"],["1974","only","-","Jul","7",["0","0","0"],"60","D"],["1974","only","-","Oct","13",["0","0","0"],"0","S"],["1975","only","-","Apr","20",["0","0","0"],"60","D"],["1975","only","-","Aug","31",["0","0","0"],"0","S"],["1980","only","-","Aug","2",["0","0","0"],"60","D"],["1980","only","-","Sep","13",["1","0","0"],"0","S"],["1984","only","-","May","5",["0","0","0"],"60","D"],["1984","only","-","Aug","25",["1","0","0"],"0","S"],["1985","only","-","Apr","14",["0","0","0"],"60","D"],["1985","only","-","Sep","15",["0","0","0"],"0","S"],["1986","only","-","May","18",["0","0","0"],"60","D"],["1986","only","-","Sep","7",["0","0","0"],"0","S"],["1987","only","-","Apr","15",["0","0","0"],"60","D"],["1987","only","-","Sep","13",["0","0","0"],"0","S"],["1988","only","-","Apr","10",["0","0","0"],"60","D"],["1988","only","-","Sep","4",["0","0","0"],"0","S"],["1989","only","-","Apr","30",["0","0","0"],"60","D"],["1989","only","-","Sep","3",["0","0","0"],"0","S"],["1990","only","-","Mar","25",["0","0","0"],"60","D"],["1990","only","-","Aug","26",["0","0","0"],"0","S"],["1991","only","-","Mar","24",["0","0","0"],"60","D"],["1991","only","-","Sep","1",["0","0","0"],"0","S"],["1992","only","-","Mar","29",["0","0","0"],"60","D"],["1992","only","-","Sep","6",["0","0","0"],"0","S"],["1993","only","-","Apr","2",["0","0","0"],"60","D"],["1993","only","-","Sep","5",["0","0","0"],"0","S"],["1994","only","-","Apr","1",["0","0","0"],"60","D"],["1994","only","-","Aug","28",["0","0","0"],"0","S"],["1995","only","-","Mar","31",["0","0","0"],"60","D"],["1995","only","-","Sep","3",["0","0","0"],"0","S"],["1996","only","-","Mar","15",["0","0","0"],"60","D"],["1996","only","-","Sep","16",["0","0","0"],"0","S"],["1997","only","-","Mar","21",["0","0","0"],"60","D"],["1997","only","-","Sep","14",["0","0","0"],"0","S"],["1998","only","-","Mar","20",["0","0","0"],"60","D"],["1998","only","-","Sep","6",["0","0","0"],"0","S"],["1999","only","-","Apr","2",["2","0","0"],"60","D"],["1999","only","-","Sep","3",["2","0","0"],"0","S"],["2000","only","-","Apr","14",["2","0","0"],"60","D"],["2000","only","-","Oct","6",["1","0","0"],"0","S"],["2001","only","-","Apr","9",["1","0","0"],"60","D"],["2001","only","-","Sep","24",["1","0","0"],"0","S"],["2002","only","-","Mar","29",["1","0","0"],"60","D"],["2002","only","-","Oct","7",["1","0","0"],"0","S"],["2003","only","-","Mar","28",["1","0","0"],"60","D"],["2003","only","-","Oct","3",["1","0","0"],"0","S"],["2004","only","-","Apr","7",["1","0","0"],"60","D"],["2004","only","-","Sep","22",["1","0","0"],"0","S"],["2005","2012","-","Apr","Fri<=1",["2","0","0"],"60","D"],["2005","only","-","Oct","9",["2","0","0"],"0","S"],["2006","only","-","Oct","1",["2","0","0"],"0","S"],["2007","only","-","Sep","16",["2","0","0"],"0","S"],["2008","only","-","Oct","5",["2","0","0"],"0","S"],["2009","only","-","Sep","27",["2","0","0"],"0","S"],["2010","only","-","Sep","12",["2","0","0"],"0","S"],["2011","only","-","Oct","2",["2","0","0"],"0","S"],["2012","only","-","Sep","23",["2","0","0"],"0","S"],["2013","max","-","Mar","Fri>=23",["2","0","0"],"60","D"],["2013","max","-","Oct","lastSun",["2","0","0"],"0","S"]],Japan:[["1948","only","-","May","Sat>=1",["24","0","0"],"60","D"],["1948","1951","-","Sep","Sat>=8",["25","0","0"],"0","S"],["1949","only","-","Apr","Sat>=1",["24","0","0"],"60","D"],["1950","1951","-","May","Sat>=1",["24","0","0"],"60","D"]],Jordan:[["1973","only","-","Jun","6",["0","0","0"],"60","S"],["1973","1975","-","Oct","1",["0","0","0"],"0","-"],["1974","1977","-","May","1",["0","0","0"],"60","S"],["1976","only","-","Nov","1",["0","0","0"],"0","-"],["1977","only","-","Oct","1",["0","0","0"],"0","-"],["1978","only","-","Apr","30",["0","0","0"],"60","S"],["1978","only","-","Sep","30",["0","0","0"],"0","-"],["1985","only","-","Apr","1",["0","0","0"],"60","S"],["1985","only","-","Oct","1",["0","0","0"],"0","-"],["1986","1988","-","Apr","Fri>=1",["0","0","0"],"60","S"],["1986","1990","-","Oct","Fri>=1",["0","0","0"],"0","-"],["1989","only","-","May","8",["0","0","0"],"60","S"],["1990","only","-","Apr","27",["0","0","0"],"60","S"],["1991","only","-","Apr","17",["0","0","0"],"60","S"],["1991","only","-","Sep","27",["0","0","0"],"0","-"],["1992","only","-","Apr","10",["0","0","0"],"60","S"],["1992","1993","-","Oct","Fri>=1",["0","0","0"],"0","-"],["1993","1998","-","Apr","Fri>=1",["0","0","0"],"60","S"],["1994","only","-","Sep","Fri>=15",["0","0","0"],"0","-"],["1995","1998","-","Sep","Fri>=15",["0","0","0","s"],"0","-"],["1999","only","-","Jul","1",["0","0","0","s"],"60","S"],["1999","2002","-","Sep","lastFri",["0","0","0","s"],"0","-"],["2000","2001","-","Mar","lastThu",["0","0","0","s"],"60","S"],["2002","2012","-","Mar","lastThu",["24","0","0"],"60","S"],["2003","only","-","Oct","24",["0","0","0","s"],"0","-"],["2004","only","-","Oct","15",["0","0","0","s"],"0","-"],["2005","only","-","Sep","lastFri",["0","0","0","s"],"0","-"],["2006","2011","-","Oct","lastFri",["0","0","0","s"],"0","-"],["2013","only","-","Dec","20",["0","0","0"],"0","-"],["2014","max","-","Mar","lastThu",["24","0","0"],"60","S"],["2014","max","-","Oct","lastFri",["0","0","0","s"],"0","-"]],Kyrgyz:[["1992","1996","-","Apr","Sun>=7",["0","0","0","s"],"60","-"],["1992","1996","-","Sep","lastSun",["0","0","0"],"0","-"],["1997","2005","-","Mar","lastSun",["2","30","0"],"60","-"],["1997","2004","-","Oct","lastSun",["2","30","0"],"0","-"]],ROK:[["1948","only","-","Jun","1",["0","0","0"],"60","D"],["1948","only","-","Sep","12",["24","0","0"],"0","S"],["1949","only","-","Apr","3",["0","0","0"],"60","D"],["1949","1951","-","Sep","Sat>=7",["24","0","0"],"0","S"],["1950","only","-","Apr","1",["0","0","0"],"60","D"],["1951","only","-","May","6",["0","0","0"],"60","D"],["1955","only","-","May","5",["0","0","0"],"60","D"],["1955","only","-","Sep","8",["24","0","0"],"0","S"],["1956","only","-","May","20",["0","0","0"],"60","D"],["1956","only","-","Sep","29",["24","0","0"],"0","S"],["1957","1960","-","May","Sun>=1",["0","0","0"],"60","D"],["1957","1960","-","Sep","Sat>=17",["24","0","0"],"0","S"],["1987","1988","-","May","Sun>=8",["2","0","0"],"60","D"],["1987","1988","-","Oct","Sun>=8",["3","0","0"],"0","S"]],Lebanon:[["1920","only","-","Mar","28",["0","0","0"],"60","S"],["1920","only","-","Oct","25",["0","0","0"],"0","-"],["1921","only","-","Apr","3",["0","0","0"],"60","S"],["1921","only","-","Oct","3",["0","0","0"],"0","-"],["1922","only","-","Mar","26",["0","0","0"],"60","S"],["1922","only","-","Oct","8",["0","0","0"],"0","-"],["1923","only","-","Apr","22",["0","0","0"],"60","S"],["1923","only","-","Sep","16",["0","0","0"],"0","-"],["1957","1961","-","May","1",["0","0","0"],"60","S"],["1957","1961","-","Oct","1",["0","0","0"],"0","-"],["1972","only","-","Jun","22",["0","0","0"],"60","S"],["1972","1977","-","Oct","1",["0","0","0"],"0","-"],["1973","1977","-","May","1",["0","0","0"],"60","S"],["1978","only","-","Apr","30",["0","0","0"],"60","S"],["1978","only","-","Sep","30",["0","0","0"],"0","-"],["1984","1987","-","May","1",["0","0","0"],"60","S"],["1984","1991","-","Oct","16",["0","0","0"],"0","-"],["1988","only","-","Jun","1",["0","0","0"],"60","S"],["1989","only","-","May","10",["0","0","0"],"60","S"],["1990","1992","-","May","1",["0","0","0"],"60","S"],["1992","only","-","Oct","4",["0","0","0"],"0","-"],["1993","max","-","Mar","lastSun",["0","0","0"],"60","S"],["1993","1998","-","Sep","lastSun",["0","0","0"],"0","-"],["1999","max","-","Oct","lastSun",["0","0","0"],"0","-"]],NBorneo:[["1935","1941","-","Sep","14",["0","0","0"],"20","-"],["1935","1941","-","Dec","14",["0","0","0"],"0","-"]],Mongol:[["1983","1984","-","Apr","1",["0","0","0"],"60","-"],["1983","only","-","Oct","1",["0","0","0"],"0","-"],["1985","1998","-","Mar","lastSun",["0","0","0"],"60","-"],["1984","1998","-","Sep","lastSun",["0","0","0"],"0","-"],["2001","only","-","Apr","lastSat",["2","0","0"],"60","-"],["2001","2006","-","Sep","lastSat",["2","0","0"],"0","-"],["2002","2006","-","Mar","lastSat",["2","0","0"],"60","-"],["2015","2016","-","Mar","lastSat",["2","0","0"],"60","-"],["2015","2016","-","Sep","lastSat",["0","0","0"],"0","-"]],Pakistan:[["2002","only","-","Apr","Sun>=2",["0","0","0"],"60","S"],["2002","only","-","Oct","Sun>=2",["0","0","0"],"0","-"],["2008","only","-","Jun","1",["0","0","0"],"60","S"],["2008","2009","-","Nov","1",["0","0","0"],"0","-"],["2009","only","-","Apr","15",["0","0","0"],"60","S"]],EgyptAsia:[["1957","only","-","May","10",["0","0","0"],"60","S"],["1957","1958","-","Oct","1",["0","0","0"],"0","-"],["1958","only","-","May","1",["0","0","0"],"60","S"],["1959","1967","-","May","1",["1","0","0"],"60","S"],["1959","1965","-","Sep","30",["3","0","0"],"0","-"],["1966","only","-","Oct","1",["3","0","0"],"0","-"]],Palestine:[["1999","2005","-","Apr","Fri>=15",["0","0","0"],"60","S"],["1999","2003","-","Oct","Fri>=15",["0","0","0"],"0","-"],["2004","only","-","Oct","1",["1","0","0"],"0","-"],["2005","only","-","Oct","4",["2","0","0"],"0","-"],["2006","2007","-","Apr","1",["0","0","0"],"60","S"],["2006","only","-","Sep","22",["0","0","0"],"0","-"],["2007","only","-","Sep","Thu>=8",["2","0","0"],"0","-"],["2008","2009","-","Mar","lastFri",["0","0","0"],"60","S"],["2008","only","-","Sep","1",["0","0","0"],"0","-"],["2009","only","-","Sep","Fri>=1",["1","0","0"],"0","-"],["2010","only","-","Mar","26",["0","0","0"],"60","S"],["2010","only","-","Aug","11",["0","0","0"],"0","-"],["2011","only","-","Apr","1",["0","1","0"],"60","S"],["2011","only","-","Aug","1",["0","0","0"],"0","-"],["2011","only","-","Aug","30",["0","0","0"],"60","S"],["2011","only","-","Sep","30",["0","0","0"],"0","-"],["2012","2014","-","Mar","lastThu",["24","0","0"],"60","S"],["2012","only","-","Sep","21",["1","0","0"],"0","-"],["2013","only","-","Sep","Fri>=21",["0","0","0"],"0","-"],["2014","2015","-","Oct","Fri>=21",["0","0","0"],"0","-"],["2015","only","-","Mar","lastFri",["24","0","0"],"60","S"],["2016","2018","-","Mar","Sat>=24",["1","0","0"],"60","S"],["2016","max","-","Oct","lastSat",["1","0","0"],"0","-"],["2019","max","-","Mar","lastFri",["0","0","0"],"60","S"]],Phil:[["1936","only","-","Nov","1",["0","0","0"],"60","D"],["1937","only","-","Feb","1",["0","0","0"],"0","S"],["1954","only","-","Apr","12",["0","0","0"],"60","D"],["1954","only","-","Jul","1",["0","0","0"],"0","S"],["1978","only","-","Mar","22",["0","0","0"],"60","D"],["1978","only","-","Sep","21",["0","0","0"],"0","S"]],Syria:[["1920","1923","-","Apr","Sun>=15",["2","0","0"],"60","S"],["1920","1923","-","Oct","Sun>=1",["2","0","0"],"0","-"],["1962","only","-","Apr","29",["2","0","0"],"60","S"],["1962","only","-","Oct","1",["2","0","0"],"0","-"],["1963","1965","-","May","1",["2","0","0"],"60","S"],["1963","only","-","Sep","30",["2","0","0"],"0","-"],["1964","only","-","Oct","1",["2","0","0"],"0","-"],["1965","only","-","Sep","30",["2","0","0"],"0","-"],["1966","only","-","Apr","24",["2","0","0"],"60","S"],["1966","1976","-","Oct","1",["2","0","0"],"0","-"],["1967","1978","-","May","1",["2","0","0"],"60","S"],["1977","1978","-","Sep","1",["2","0","0"],"0","-"],["1983","1984","-","Apr","9",["2","0","0"],"60","S"],["1983","1984","-","Oct","1",["2","0","0"],"0","-"],["1986","only","-","Feb","16",["2","0","0"],"60","S"],["1986","only","-","Oct","9",["2","0","0"],"0","-"],["1987","only","-","Mar","1",["2","0","0"],"60","S"],["1987","1988","-","Oct","31",["2","0","0"],"0","-"],["1988","only","-","Mar","15",["2","0","0"],"60","S"],["1989","only","-","Mar","31",["2","0","0"],"60","S"],["1989","only","-","Oct","1",["2","0","0"],"0","-"],["1990","only","-","Apr","1",["2","0","0"],"60","S"],["1990","only","-","Sep","30",["2","0","0"],"0","-"],["1991","only","-","Apr","1",["0","0","0"],"60","S"],["1991","1992","-","Oct","1",["0","0","0"],"0","-"],["1992","only","-","Apr","8",["0","0","0"],"60","S"],["1993","only","-","Mar","26",["0","0","0"],"60","S"],["1993","only","-","Sep","25",["0","0","0"],"0","-"],["1994","1996","-","Apr","1",["0","0","0"],"60","S"],["1994","2005","-","Oct","1",["0","0","0"],"0","-"],["1997","1998","-","Mar","lastMon",["0","0","0"],"60","S"],["1999","2006","-","Apr","1",["0","0","0"],"60","S"],["2006","only","-","Sep","22",["0","0","0"],"0","-"],["2007","only","-","Mar","lastFri",["0","0","0"],"60","S"],["2007","only","-","Nov","Fri>=1",["0","0","0"],"0","-"],["2008","only","-","Apr","Fri>=1",["0","0","0"],"60","S"],["2008","only","-","Nov","1",["0","0","0"],"0","-"],["2009","only","-","Mar","lastFri",["0","0","0"],"60","S"],["2010","2011","-","Apr","Fri>=1",["0","0","0"],"60","S"],["2012","max","-","Mar","lastFri",["0","0","0"],"60","S"],["2009","max","-","Oct","lastFri",["0","0","0"],"0","-"]],Aus:[["1917","only","-","Jan","1",["0","1","0"],"60","D"],["1917","only","-","Mar","25",["2","0","0"],"0","S"],["1942","only","-","Jan","1",["2","0","0"],"60","D"],["1942","only","-","Mar","29",["2","0","0"],"0","S"],["1942","only","-","Sep","27",["2","0","0"],"60","D"],["1943","1944","-","Mar","lastSun",["2","0","0"],"0","S"],["1943","only","-","Oct","3",["2","0","0"],"60","D"]],AW:[["1974","only","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1975","only","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1983","only","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1984","only","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1991","only","-","Nov","17",["2","0","0","s"],"60","D"],["1992","only","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["2006","only","-","Dec","3",["2","0","0","s"],"60","D"],["2007","2009","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2007","2008","-","Oct","lastSun",["2","0","0","s"],"60","D"]],AQ:[["1971","only","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1972","only","-","Feb","lastSun",["2","0","0","s"],"0","S"],["1989","1991","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1990","1992","-","Mar","Sun>=1",["2","0","0","s"],"0","S"]],Holiday:[["1992","1993","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1993","1994","-","Mar","Sun>=1",["2","0","0","s"],"0","S"]],AS:[["1971","1985","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1986","only","-","Oct","19",["2","0","0","s"],"60","D"],["1987","2007","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1972","only","-","Feb","27",["2","0","0","s"],"0","S"],["1973","1985","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1986","1990","-","Mar","Sun>=15",["2","0","0","s"],"0","S"],["1991","only","-","Mar","3",["2","0","0","s"],"0","S"],["1992","only","-","Mar","22",["2","0","0","s"],"0","S"],["1993","only","-","Mar","7",["2","0","0","s"],"0","S"],["1994","only","-","Mar","20",["2","0","0","s"],"0","S"],["1995","2005","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2006","only","-","Apr","2",["2","0","0","s"],"0","S"],["2007","only","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2008","max","-","Apr","Sun>=1",["2","0","0","s"],"0","S"],["2008","max","-","Oct","Sun>=1",["2","0","0","s"],"60","D"]],AT:[["1967","only","-","Oct","Sun>=1",["2","0","0","s"],"60","D"],["1968","only","-","Mar","lastSun",["2","0","0","s"],"0","S"],["1968","1985","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1969","1971","-","Mar","Sun>=8",["2","0","0","s"],"0","S"],["1972","only","-","Feb","lastSun",["2","0","0","s"],"0","S"],["1973","1981","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1982","1983","-","Mar","lastSun",["2","0","0","s"],"0","S"],["1984","1986","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1986","only","-","Oct","Sun>=15",["2","0","0","s"],"60","D"],["1987","1990","-","Mar","Sun>=15",["2","0","0","s"],"0","S"],["1987","only","-","Oct","Sun>=22",["2","0","0","s"],"60","D"],["1988","1990","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1991","1999","-","Oct","Sun>=1",["2","0","0","s"],"60","D"],["1991","2005","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2000","only","-","Aug","lastSun",["2","0","0","s"],"60","D"],["2001","max","-","Oct","Sun>=1",["2","0","0","s"],"60","D"],["2006","only","-","Apr","Sun>=1",["2","0","0","s"],"0","S"],["2007","only","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2008","max","-","Apr","Sun>=1",["2","0","0","s"],"0","S"]],AV:[["1971","1985","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1972","only","-","Feb","lastSun",["2","0","0","s"],"0","S"],["1973","1985","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1986","1990","-","Mar","Sun>=15",["2","0","0","s"],"0","S"],["1986","1987","-","Oct","Sun>=15",["2","0","0","s"],"60","D"],["1988","1999","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1991","1994","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1995","2005","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2000","only","-","Aug","lastSun",["2","0","0","s"],"60","D"],["2001","2007","-","Oct","lastSun",["2","0","0","s"],"60","D"],["2006","only","-","Apr","Sun>=1",["2","0","0","s"],"0","S"],["2007","only","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2008","max","-","Apr","Sun>=1",["2","0","0","s"],"0","S"],["2008","max","-","Oct","Sun>=1",["2","0","0","s"],"60","D"]],
AN:[["1971","1985","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1972","only","-","Feb","27",["2","0","0","s"],"0","S"],["1973","1981","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1982","only","-","Apr","Sun>=1",["2","0","0","s"],"0","S"],["1983","1985","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1986","1989","-","Mar","Sun>=15",["2","0","0","s"],"0","S"],["1986","only","-","Oct","19",["2","0","0","s"],"60","D"],["1987","1999","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1990","1995","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1996","2005","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2000","only","-","Aug","lastSun",["2","0","0","s"],"60","D"],["2001","2007","-","Oct","lastSun",["2","0","0","s"],"60","D"],["2006","only","-","Apr","Sun>=1",["2","0","0","s"],"0","S"],["2007","only","-","Mar","lastSun",["2","0","0","s"],"0","S"],["2008","max","-","Apr","Sun>=1",["2","0","0","s"],"0","S"],["2008","max","-","Oct","Sun>=1",["2","0","0","s"],"60","D"]],LH:[["1981","1984","-","Oct","lastSun",["2","0","0"],"60","-"],["1982","1985","-","Mar","Sun>=1",["2","0","0"],"0","-"],["1985","only","-","Oct","lastSun",["2","0","0"],"30","-"],["1986","1989","-","Mar","Sun>=15",["2","0","0"],"0","-"],["1986","only","-","Oct","19",["2","0","0"],"30","-"],["1987","1999","-","Oct","lastSun",["2","0","0"],"30","-"],["1990","1995","-","Mar","Sun>=1",["2","0","0"],"0","-"],["1996","2005","-","Mar","lastSun",["2","0","0"],"0","-"],["2000","only","-","Aug","lastSun",["2","0","0"],"30","-"],["2001","2007","-","Oct","lastSun",["2","0","0"],"30","-"],["2006","only","-","Apr","Sun>=1",["2","0","0"],"0","-"],["2007","only","-","Mar","lastSun",["2","0","0"],"0","-"],["2008","max","-","Apr","Sun>=1",["2","0","0"],"0","-"],["2008","max","-","Oct","Sun>=1",["2","0","0"],"30","-"]],Fiji:[["1998","1999","-","Nov","Sun>=1",["2","0","0"],"60","-"],["1999","2000","-","Feb","lastSun",["3","0","0"],"0","-"],["2009","only","-","Nov","29",["2","0","0"],"60","-"],["2010","only","-","Mar","lastSun",["3","0","0"],"0","-"],["2010","2013","-","Oct","Sun>=21",["2","0","0"],"60","-"],["2011","only","-","Mar","Sun>=1",["3","0","0"],"0","-"],["2012","2013","-","Jan","Sun>=18",["3","0","0"],"0","-"],["2014","only","-","Jan","Sun>=18",["2","0","0"],"0","-"],["2014","2018","-","Nov","Sun>=1",["2","0","0"],"60","-"],["2015","max","-","Jan","Sun>=12",["3","0","0"],"0","-"],["2019","max","-","Nov","Sun>=8",["2","0","0"],"60","-"]],Guam:[["1959","only","-","Jun","27",["2","0","0"],"60","D"],["1961","only","-","Jan","29",["2","0","0"],"0","S"],["1967","only","-","Sep","1",["2","0","0"],"60","D"],["1969","only","-","Jan","26",["0","1","0"],"0","S"],["1969","only","-","Jun","22",["2","0","0"],"60","D"],["1969","only","-","Aug","31",["2","0","0"],"0","S"],["1970","1971","-","Apr","lastSun",["2","0","0"],"60","D"],["1970","1971","-","Sep","Sun>=1",["2","0","0"],"0","S"],["1973","only","-","Dec","16",["2","0","0"],"60","D"],["1974","only","-","Feb","24",["2","0","0"],"0","S"],["1976","only","-","May","26",["2","0","0"],"60","D"],["1976","only","-","Aug","22",["2","1","0"],"0","S"],["1977","only","-","Apr","24",["2","0","0"],"60","D"],["1977","only","-","Aug","28",["2","0","0"],"0","S"]],NC:[["1977","1978","-","Dec","Sun>=1",["0","0","0"],"60","-"],["1978","1979","-","Feb","27",["0","0","0"],"0","-"],["1996","only","-","Dec","1",["2","0","0","s"],"60","-"],["1997","only","-","Mar","2",["2","0","0","s"],"0","-"]],NZ:[["1927","only","-","Nov","6",["2","0","0"],"60","S"],["1928","only","-","Mar","4",["2","0","0"],"0","M"],["1928","1933","-","Oct","Sun>=8",["2","0","0"],"30","S"],["1929","1933","-","Mar","Sun>=15",["2","0","0"],"0","M"],["1934","1940","-","Apr","lastSun",["2","0","0"],"0","M"],["1934","1940","-","Sep","lastSun",["2","0","0"],"30","S"],["1946","only","-","Jan","1",["0","0","0"],"0","S"],["1974","only","-","Nov","Sun>=1",["2","0","0","s"],"60","D"],["1975","only","-","Feb","lastSun",["2","0","0","s"],"0","S"],["1975","1988","-","Oct","lastSun",["2","0","0","s"],"60","D"],["1976","1989","-","Mar","Sun>=1",["2","0","0","s"],"0","S"],["1989","only","-","Oct","Sun>=8",["2","0","0","s"],"60","D"],["1990","2006","-","Oct","Sun>=1",["2","0","0","s"],"60","D"],["1990","2007","-","Mar","Sun>=15",["2","0","0","s"],"0","S"],["2007","max","-","Sep","lastSun",["2","0","0","s"],"60","D"],["2008","max","-","Apr","Sun>=1",["2","0","0","s"],"0","S"]],Chatham:[["1974","only","-","Nov","Sun>=1",["2","45","0","s"],"60","-"],["1975","only","-","Feb","lastSun",["2","45","0","s"],"0","-"],["1975","1988","-","Oct","lastSun",["2","45","0","s"],"60","-"],["1976","1989","-","Mar","Sun>=1",["2","45","0","s"],"0","-"],["1989","only","-","Oct","Sun>=8",["2","45","0","s"],"60","-"],["1990","2006","-","Oct","Sun>=1",["2","45","0","s"],"60","-"],["1990","2007","-","Mar","Sun>=15",["2","45","0","s"],"0","-"],["2007","max","-","Sep","lastSun",["2","45","0","s"],"60","-"],["2008","max","-","Apr","Sun>=1",["2","45","0","s"],"0","-"]],Cook:[["1978","only","-","Nov","12",["0","0","0"],"30","-"],["1979","1991","-","Mar","Sun>=1",["0","0","0"],"0","-"],["1979","1990","-","Oct","lastSun",["0","0","0"],"30","-"]],WS:[["2010","only","-","Sep","lastSun",["0","0","0"],"60","-"],["2011","only","-","Apr","Sat>=1",["4","0","0"],"0","-"],["2011","only","-","Sep","lastSat",["3","0","0"],"60","-"],["2012","max","-","Apr","Sun>=1",["4","0","0"],"0","-"],["2012","max","-","Sep","lastSun",["3","0","0"],"60","-"]],Tonga:[["1999","only","-","Oct","7",["2","0","0","s"],"60","-"],["2000","only","-","Mar","19",["2","0","0","s"],"0","-"],["2000","2001","-","Nov","Sun>=1",["2","0","0"],"60","-"],["2001","2002","-","Jan","lastSun",["2","0","0"],"0","-"],["2016","only","-","Nov","Sun>=1",["2","0","0"],"60","-"],["2017","only","-","Jan","Sun>=15",["3","0","0"],"0","-"]],Vanuatu:[["1983","only","-","Sep","25",["0","0","0"],"60","-"],["1984","1991","-","Mar","Sun>=23",["0","0","0"],"0","-"],["1984","only","-","Oct","23",["0","0","0"],"60","-"],["1985","1991","-","Sep","Sun>=23",["0","0","0"],"60","-"],["1992","1993","-","Jan","Sun>=23",["0","0","0"],"0","-"],["1992","only","-","Oct","Sun>=23",["0","0","0"],"60","-"]],"GB-Eire":[["1916","only","-","May","21",["2","0","0","s"],"60","BST"],["1916","only","-","Oct","1",["2","0","0","s"],"0","GMT"],["1917","only","-","Apr","8",["2","0","0","s"],"60","BST"],["1917","only","-","Sep","17",["2","0","0","s"],"0","GMT"],["1918","only","-","Mar","24",["2","0","0","s"],"60","BST"],["1918","only","-","Sep","30",["2","0","0","s"],"0","GMT"],["1919","only","-","Mar","30",["2","0","0","s"],"60","BST"],["1919","only","-","Sep","29",["2","0","0","s"],"0","GMT"],["1920","only","-","Mar","28",["2","0","0","s"],"60","BST"],["1920","only","-","Oct","25",["2","0","0","s"],"0","GMT"],["1921","only","-","Apr","3",["2","0","0","s"],"60","BST"],["1921","only","-","Oct","3",["2","0","0","s"],"0","GMT"],["1922","only","-","Mar","26",["2","0","0","s"],"60","BST"],["1922","only","-","Oct","8",["2","0","0","s"],"0","GMT"],["1923","only","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1923","1924","-","Sep","Sun>=16",["2","0","0","s"],"0","GMT"],["1924","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1925","1926","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1925","1938","-","Oct","Sun>=2",["2","0","0","s"],"0","GMT"],["1927","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1928","1929","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1930","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1931","1932","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1933","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1934","only","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1935","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1936","1937","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1938","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1939","only","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1939","only","-","Nov","Sun>=16",["2","0","0","s"],"0","GMT"],["1940","only","-","Feb","Sun>=23",["2","0","0","s"],"60","BST"],["1941","only","-","May","Sun>=2",["1","0","0","s"],"120","BDST"],["1941","1943","-","Aug","Sun>=9",["1","0","0","s"],"60","BST"],["1942","1944","-","Apr","Sun>=2",["1","0","0","s"],"120","BDST"],["1944","only","-","Sep","Sun>=16",["1","0","0","s"],"60","BST"],["1945","only","-","Apr","Mon>=2",["1","0","0","s"],"120","BDST"],["1945","only","-","Jul","Sun>=9",["1","0","0","s"],"60","BST"],["1945","1946","-","Oct","Sun>=2",["2","0","0","s"],"0","GMT"],["1946","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1947","only","-","Mar","16",["2","0","0","s"],"60","BST"],["1947","only","-","Apr","13",["1","0","0","s"],"120","BDST"],["1947","only","-","Aug","10",["1","0","0","s"],"60","BST"],["1947","only","-","Nov","2",["2","0","0","s"],"0","GMT"],["1948","only","-","Mar","14",["2","0","0","s"],"60","BST"],["1948","only","-","Oct","31",["2","0","0","s"],"0","GMT"],["1949","only","-","Apr","3",["2","0","0","s"],"60","BST"],["1949","only","-","Oct","30",["2","0","0","s"],"0","GMT"],["1950","1952","-","Apr","Sun>=14",["2","0","0","s"],"60","BST"],["1950","1952","-","Oct","Sun>=21",["2","0","0","s"],"0","GMT"],["1953","only","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1953","1960","-","Oct","Sun>=2",["2","0","0","s"],"0","GMT"],["1954","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1955","1956","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1957","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1958","1959","-","Apr","Sun>=16",["2","0","0","s"],"60","BST"],["1960","only","-","Apr","Sun>=9",["2","0","0","s"],"60","BST"],["1961","1963","-","Mar","lastSun",["2","0","0","s"],"60","BST"],["1961","1968","-","Oct","Sun>=23",["2","0","0","s"],"0","GMT"],["1964","1967","-","Mar","Sun>=19",["2","0","0","s"],"60","BST"],["1968","only","-","Feb","18",["2","0","0","s"],"60","BST"],["1972","1980","-","Mar","Sun>=16",["2","0","0","s"],"60","BST"],["1972","1980","-","Oct","Sun>=23",["2","0","0","s"],"0","GMT"],["1981","1995","-","Mar","lastSun",["1","0","0","u"],"60","BST"],["1981","1989","-","Oct","Sun>=23",["1","0","0","u"],"0","GMT"],["1990","1995","-","Oct","Sun>=22",["1","0","0","u"],"0","GMT"]],Eire:[["1971","only","-","Oct","31",["2","0","0","u"],"-60","-"],["1972","1980","-","Mar","Sun>=16",["2","0","0","u"],"0","-"],["1972","1980","-","Oct","Sun>=23",["2","0","0","u"],"-60","-"],["1981","max","-","Mar","lastSun",["1","0","0","u"],"0","-"],["1981","1989","-","Oct","Sun>=23",["1","0","0","u"],"-60","-"],["1990","1995","-","Oct","Sun>=22",["1","0","0","u"],"-60","-"],["1996","max","-","Oct","lastSun",["1","0","0","u"],"-60","-"]],EU:[["1977","1980","-","Apr","Sun>=1",["1","0","0","u"],"60","S"],["1977","only","-","Sep","lastSun",["1","0","0","u"],"0","-"],["1978","only","-","Oct","1",["1","0","0","u"],"0","-"],["1979","1995","-","Sep","lastSun",["1","0","0","u"],"0","-"],["1981","max","-","Mar","lastSun",["1","0","0","u"],"60","S"],["1996","max","-","Oct","lastSun",["1","0","0","u"],"0","-"]],"W-Eur":[["1977","1980","-","Apr","Sun>=1",["1","0","0","s"],"60","S"],["1977","only","-","Sep","lastSun",["1","0","0","s"],"0","-"],["1978","only","-","Oct","1",["1","0","0","s"],"0","-"],["1979","1995","-","Sep","lastSun",["1","0","0","s"],"0","-"],["1981","max","-","Mar","lastSun",["1","0","0","s"],"60","S"],["1996","max","-","Oct","lastSun",["1","0","0","s"],"0","-"]],"C-Eur":[["1916","only","-","Apr","30",["23","0","0"],"60","S"],["1916","only","-","Oct","1",["1","0","0"],"0","-"],["1917","1918","-","Apr","Mon>=15",["2","0","0","s"],"60","S"],["1917","1918","-","Sep","Mon>=15",["2","0","0","s"],"0","-"],["1940","only","-","Apr","1",["2","0","0","s"],"60","S"],["1942","only","-","Nov","2",["2","0","0","s"],"0","-"],["1943","only","-","Mar","29",["2","0","0","s"],"60","S"],["1943","only","-","Oct","4",["2","0","0","s"],"0","-"],["1944","1945","-","Apr","Mon>=1",["2","0","0","s"],"60","S"],["1944","only","-","Oct","2",["2","0","0","s"],"0","-"],["1945","only","-","Sep","16",["2","0","0","s"],"0","-"],["1977","1980","-","Apr","Sun>=1",["2","0","0","s"],"60","S"],["1977","only","-","Sep","lastSun",["2","0","0","s"],"0","-"],["1978","only","-","Oct","1",["2","0","0","s"],"0","-"],["1979","1995","-","Sep","lastSun",["2","0","0","s"],"0","-"],["1981","max","-","Mar","lastSun",["2","0","0","s"],"60","S"],["1996","max","-","Oct","lastSun",["2","0","0","s"],"0","-"]],"E-Eur":[["1977","1980","-","Apr","Sun>=1",["0","0","0"],"60","S"],["1977","only","-","Sep","lastSun",["0","0","0"],"0","-"],["1978","only","-","Oct","1",["0","0","0"],"0","-"],["1979","1995","-","Sep","lastSun",["0","0","0"],"0","-"],["1981","max","-","Mar","lastSun",["0","0","0"],"60","S"],["1996","max","-","Oct","lastSun",["0","0","0"],"0","-"]],Russia:[["1917","only","-","Jul","1",["23","0","0"],"60","MST",""],["1917","only","-","Dec","28",["0","0","0"],"0","MMT",""],["1918","only","-","May","31",["22","0","0"],"120","MDST",""],["1918","only","-","Sep","16",["1","0","0"],"60","MST"],["1919","only","-","May","31",["23","0","0"],"120","MDST"],["1919","only","-","Jul","1",["0","0","0","u"],"60","MSD"],["1919","only","-","Aug","16",["0","0","0"],"0","MSK"],["1921","only","-","Feb","14",["23","0","0"],"60","MSD"],["1921","only","-","Mar","20",["23","0","0"],"120","+05"],["1921","only","-","Sep","1",["0","0","0"],"60","MSD"],["1921","only","-","Oct","1",["0","0","0"],"0","-"],["1981","1984","-","Apr","1",["0","0","0"],"60","S"],["1981","1983","-","Oct","1",["0","0","0"],"0","-"],["1984","1995","-","Sep","lastSun",["2","0","0","s"],"0","-"],["1985","2010","-","Mar","lastSun",["2","0","0","s"],"60","S"],["1996","2010","-","Oct","lastSun",["2","0","0","s"],"0","-"]],Albania:[["1940","only","-","Jun","16",["0","0","0"],"60","S"],["1942","only","-","Nov","2",["3","0","0"],"0","-"],["1943","only","-","Mar","29",["2","0","0"],"60","S"],["1943","only","-","Apr","10",["3","0","0"],"0","-"],["1974","only","-","May","4",["0","0","0"],"60","S"],["1974","only","-","Oct","2",["0","0","0"],"0","-"],["1975","only","-","May","1",["0","0","0"],"60","S"],["1975","only","-","Oct","2",["0","0","0"],"0","-"],["1976","only","-","May","2",["0","0","0"],"60","S"],["1976","only","-","Oct","3",["0","0","0"],"0","-"],["1977","only","-","May","8",["0","0","0"],"60","S"],["1977","only","-","Oct","2",["0","0","0"],"0","-"],["1978","only","-","May","6",["0","0","0"],"60","S"],["1978","only","-","Oct","1",["0","0","0"],"0","-"],["1979","only","-","May","5",["0","0","0"],"60","S"],["1979","only","-","Sep","30",["0","0","0"],"0","-"],["1980","only","-","May","3",["0","0","0"],"60","S"],["1980","only","-","Oct","4",["0","0","0"],"0","-"],["1981","only","-","Apr","26",["0","0","0"],"60","S"],["1981","only","-","Sep","27",["0","0","0"],"0","-"],["1982","only","-","May","2",["0","0","0"],"60","S"],["1982","only","-","Oct","3",["0","0","0"],"0","-"],["1983","only","-","Apr","18",["0","0","0"],"60","S"],["1983","only","-","Oct","1",["0","0","0"],"0","-"],["1984","only","-","Apr","1",["0","0","0"],"60","S"]],Austria:[["1920","only","-","Apr","5",["2","0","0","s"],"60","S"],["1920","only","-","Sep","13",["2","0","0","s"],"0","-"],["1946","only","-","Apr","14",["2","0","0","s"],"60","S"],["1946","only","-","Oct","7",["2","0","0","s"],"0","-"],["1947","1948","-","Oct","Sun>=1",["2","0","0","s"],"0","-"],["1947","only","-","Apr","6",["2","0","0","s"],"60","S"],["1948","only","-","Apr","18",["2","0","0","s"],"60","S"],["1980","only","-","Apr","6",["0","0","0"],"60","S"],["1980","only","-","Sep","28",["0","0","0"],"0","-"]],Belgium:[["1918","only","-","Mar","9",["0","0","0","s"],"60","S"],["1918","1919","-","Oct","Sat>=1",["23","0","0","s"],"0","-"],["1919","only","-","Mar","1",["23","0","0","s"],"60","S"],["1920","only","-","Feb","14",["23","0","0","s"],"60","S"],["1920","only","-","Oct","23",["23","0","0","s"],"0","-"],["1921","only","-","Mar","14",["23","0","0","s"],"60","S"],["1921","only","-","Oct","25",["23","0","0","s"],"0","-"],["1922","only","-","Mar","25",["23","0","0","s"],"60","S"],["1922","1927","-","Oct","Sat>=1",["23","0","0","s"],"0","-"],["1923","only","-","Apr","21",["23","0","0","s"],"60","S"],["1924","only","-","Mar","29",["23","0","0","s"],"60","S"],["1925","only","-","Apr","4",["23","0","0","s"],"60","S"],["1926","only","-","Apr","17",["23","0","0","s"],"60","S"],["1927","only","-","Apr","9",["23","0","0","s"],"60","S"],["1928","only","-","Apr","14",["23","0","0","s"],"60","S"],["1928","1938","-","Oct","Sun>=2",["2","0","0","s"],"0","-"],["1929","only","-","Apr","21",["2","0","0","s"],"60","S"],["1930","only","-","Apr","13",["2","0","0","s"],"60","S"],["1931","only","-","Apr","19",["2","0","0","s"],"60","S"],["1932","only","-","Apr","3",["2","0","0","s"],"60","S"],["1933","only","-","Mar","26",["2","0","0","s"],"60","S"],["1934","only","-","Apr","8",["2","0","0","s"],"60","S"],["1935","only","-","Mar","31",["2","0","0","s"],"60","S"],["1936","only","-","Apr","19",["2","0","0","s"],"60","S"],["1937","only","-","Apr","4",["2","0","0","s"],"60","S"],["1938","only","-","Mar","27",["2","0","0","s"],"60","S"],["1939","only","-","Apr","16",["2","0","0","s"],"60","S"],["1939","only","-","Nov","19",["2","0","0","s"],"0","-"],["1940","only","-","Feb","25",["2","0","0","s"],"60","S"],["1944","only","-","Sep","17",["2","0","0","s"],"0","-"],["1945","only","-","Apr","2",["2","0","0","s"],"60","S"],["1945","only","-","Sep","16",["2","0","0","s"],"0","-"],["1946","only","-","May","19",["2","0","0","s"],"60","S"],["1946","only","-","Oct","7",["2","0","0","s"],"0","-"]],Bulg:[["1979","only","-","Mar","31",["23","0","0"],"60","S"],["1979","only","-","Oct","1",["1","0","0"],"0","-"],["1980","1982","-","Apr","Sat>=1",["23","0","0"],"60","S"],["1980","only","-","Sep","29",["1","0","0"],"0","-"],["1981","only","-","Sep","27",["2","0","0"],"0","-"]],Czech:[["1945","only","-","Apr","Mon>=1",["2","0","0","s"],"60","S"],["1945","only","-","Oct","1",["2","0","0","s"],"0","-"],["1946","only","-","May","6",["2","0","0","s"],"60","S"],["1946","1949","-","Oct","Sun>=1",["2","0","0","s"],"0","-"],["1947","1948","-","Apr","Sun>=15",["2","0","0","s"],"60","S"],["1949","only","-","Apr","9",["2","0","0","s"],"60","S"]],Denmark:[["1916","only","-","May","14",["23","0","0"],"60","S"],["1916","only","-","Sep","30",["23","0","0"],"0","-"],["1940","only","-","May","15",["0","0","0"],"60","S"],["1945","only","-","Apr","2",["2","0","0","s"],"60","S"],["1945","only","-","Aug","15",["2","0","0","s"],"0","-"],["1946","only","-","May","1",["2","0","0","s"],"60","S"],["1946","only","-","Sep","1",["2","0","0","s"],"0","-"],["1947","only","-","May","4",["2","0","0","s"],"60","S"],["1947","only","-","Aug","10",["2","0","0","s"],"0","-"],["1948","only","-","May","9",["2","0","0","s"],"60","S"],["1948","only","-","Aug","8",["2","0","0","s"],"0","-"]],Thule:[["1991","1992","-","Mar","lastSun",["2","0","0"],"60","D"],["1991","1992","-","Sep","lastSun",["2","0","0"],"0","S"],["1993","2006","-","Apr","Sun>=1",["2","0","0"],"60","D"],["1993","2006","-","Oct","lastSun",["2","0","0"],"0","S"],["2007","max","-","Mar","Sun>=8",["2","0","0"],"60","D"],["2007","max","-","Nov","Sun>=1",["2","0","0"],"0","S"]],Finland:[["1942","only","-","Apr","2",["24","0","0"],"60","S"],["1942","only","-","Oct","4",["1","0","0"],"0","-"],["1981","1982","-","Mar","lastSun",["2","0","0"],"60","S"],["1981","1982","-","Sep","lastSun",["3","0","0"],"0","-"]],France:[["1916","only","-","Jun","14",["23","0","0","s"],"60","S"],["1916","1919","-","Oct","Sun>=1",["23","0","0","s"],"0","-"],["1917","only","-","Mar","24",["23","0","0","s"],"60","S"],["1918","only","-","Mar","9",["23","0","0","s"],"60","S"],["1919","only","-","Mar","1",["23","0","0","s"],"60","S"],["1920","only","-","Feb","14",["23","0","0","s"],"60","S"],["1920","only","-","Oct","23",["23","0","0","s"],"0","-"],["1921","only","-","Mar","14",["23","0","0","s"],"60","S"],["1921","only","-","Oct","25",["23","0","0","s"],"0","-"],["1922","only","-","Mar","25",["23","0","0","s"],"60","S"],["1922","1938","-","Oct","Sat>=1",["23","0","0","s"],"0","-"],["1923","only","-","May","26",["23","0","0","s"],"60","S"],["1924","only","-","Mar","29",["23","0","0","s"],"60","S"],["1925","only","-","Apr","4",["23","0","0","s"],"60","S"],["1926","only","-","Apr","17",["23","0","0","s"],"60","S"],["1927","only","-","Apr","9",["23","0","0","s"],"60","S"],["1928","only","-","Apr","14",["23","0","0","s"],"60","S"],["1929","only","-","Apr","20",["23","0","0","s"],"60","S"],["1930","only","-","Apr","12",["23","0","0","s"],"60","S"],["1931","only","-","Apr","18",["23","0","0","s"],"60","S"],["1932","only","-","Apr","2",["23","0","0","s"],"60","S"],["1933","only","-","Mar","25",["23","0","0","s"],"60","S"],["1934","only","-","Apr","7",["23","0","0","s"],"60","S"],["1935","only","-","Mar","30",["23","0","0","s"],"60","S"],["1936","only","-","Apr","18",["23","0","0","s"],"60","S"],["1937","only","-","Apr","3",["23","0","0","s"],"60","S"],["1938","only","-","Mar","26",["23","0","0","s"],"60","S"],["1939","only","-","Apr","15",["23","0","0","s"],"60","S"],["1939","only","-","Nov","18",["23","0","0","s"],"0","-"],["1940","only","-","Feb","25",["2","0","0"],"60","S"],["1941","only","-","May","5",["0","0","0"],"120","M",""],["1941","only","-","Oct","6",["0","0","0"],"60","S"],["1942","only","-","Mar","9",["0","0","0"],"120","M"],["1942","only","-","Nov","2",["3","0","0"],"60","S"],["1943","only","-","Mar","29",["2","0","0"],"120","M"],["1943","only","-","Oct","4",["3","0","0"],"60","S"],["1944","only","-","Apr","3",["2","0","0"],"120","M"],["1944","only","-","Oct","8",["1","0","0"],"60","S"],["1945","only","-","Apr","2",["2","0","0"],"120","M"],["1945","only","-","Sep","16",["3","0","0"],"0","-"],["1976","only","-","Mar","28",["1","0","0"],"60","S"],["1976","only","-","Sep","26",["1","0","0"],"0","-"]],Germany:[["1946","only","-","Apr","14",["2","0","0","s"],"60","S"],["1946","only","-","Oct","7",["2","0","0","s"],"0","-"],["1947","1949","-","Oct","Sun>=1",["2","0","0","s"],"0","-"],["1947","only","-","Apr","6",["3","0","0","s"],"60","S"],["1947","only","-","May","11",["2","0","0","s"],"120","M"],["1947","only","-","Jun","29",["3","0","0"],"60","S"],["1948","only","-","Apr","18",["2","0","0","s"],"60","S"],["1949","only","-","Apr","10",["2","0","0","s"],"60","S"]],SovietZone:[["1945","only","-","May","24",["2","0","0"],"120","M",""],["1945","only","-","Sep","24",["3","0","0"],"60","S"],["1945","only","-","Nov","18",["2","0","0","s"],"0","-"]],Greece:[["1932","only","-","Jul","7",["0","0","0"],"60","S"],["1932","only","-","Sep","1",["0","0","0"],"0","-"],["1941","only","-","Apr","7",["0","0","0"],"60","S"],["1942","only","-","Nov","2",["3","0","0"],"0","-"],["1943","only","-","Mar","30",["0","0","0"],"60","S"],["1943","only","-","Oct","4",["0","0","0"],"0","-"],["1952","only","-","Jul","1",["0","0","0"],"60","S"],["1952","only","-","Nov","2",["0","0","0"],"0","-"],["1975","only","-","Apr","12",["0","0","0","s"],"60","S"],["1975","only","-","Nov","26",["0","0","0","s"],"0","-"],["1976","only","-","Apr","11",["2","0","0","s"],"60","S"],["1976","only","-","Oct","10",["2","0","0","s"],"0","-"],["1977","1978","-","Apr","Sun>=1",["2","0","0","s"],"60","S"],["1977","only","-","Sep","26",["2","0","0","s"],"0","-"],["1978","only","-","Sep","24",["4","0","0"],"0","-"],["1979","only","-","Apr","1",["9","0","0"],"60","S"],["1979","only","-","Sep","29",["2","0","0"],"0","-"],["1980","only","-","Apr","1",["0","0","0"],"60","S"],["1980","only","-","Sep","28",["0","0","0"],"0","-"]],Hungary:[["1918","only","-","Apr","1",["3","0","0"],"60","S"],["1918","only","-","Sep","16",["3","0","0"],"0","-"],["1919","only","-","Apr","15",["3","0","0"],"60","S"],["1919","only","-","Nov","24",["3","0","0"],"0","-"],["1945","only","-","May","1",["23","0","0"],"60","S"],["1945","only","-","Nov","1",["0","0","0"],"0","-"],["1946","only","-","Mar","31",["2","0","0","s"],"60","S"],["1946","1949","-","Oct","Sun>=1",["2","0","0","s"],"0","-"],["1947","1949","-","Apr","Sun>=4",["2","0","0","s"],"60","S"],["1950","only","-","Apr","17",["2","0","0","s"],"60","S"],["1950","only","-","Oct","23",["2","0","0","s"],"0","-"],["1954","1955","-","May","23",["0","0","0"],"60","S"],["1954","1955","-","Oct","3",["0","0","0"],"0","-"],["1956","only","-","Jun","Sun>=1",["0","0","0"],"60","S"],["1956","only","-","Sep","lastSun",["0","0","0"],"0","-"],["1957","only","-","Jun","Sun>=1",["1","0","0"],"60","S"],["1957","only","-","Sep","lastSun",["3","0","0"],"0","-"],["1980","only","-","Apr","6",["1","0","0"],"60","S"]],Iceland:[["1917","1919","-","Feb","19",["23","0","0"],"60","-"],["1917","only","-","Oct","21",["1","0","0"],"0","-"],["1918","1919","-","Nov","16",["1","0","0"],"0","-"],["1921","only","-","Mar","19",["23","0","0"],"60","-"],["1921","only","-","Jun","23",["1","0","0"],"0","-"],["1939","only","-","Apr","29",["23","0","0"],"60","-"],["1939","only","-","Oct","29",["2","0","0"],"0","-"],["1940","only","-","Feb","25",["2","0","0"],"60","-"],["1940","1941","-","Nov","Sun>=2",["1","0","0","s"],"0","-"],["1941","1942","-","Mar","Sun>=2",["1","0","0","s"],"60","-"],["1943","1946","-","Mar","Sun>=1",["1","0","0","s"],"60","-"],["1942","1948","-","Oct","Sun>=22",["1","0","0","s"],"0","-"],["1947","1967","-","Apr","Sun>=1",["1","0","0","s"],"60","-"],["1949","only","-","Oct","30",["1","0","0","s"],"0","-"],["1950","1966","-","Oct","Sun>=22",["1","0","0","s"],"0","-"],["1967","only","-","Oct","29",["1","0","0","s"],"0","-"]],Italy:[["1916","only","-","Jun","3",["24","0","0"],"60","S"],["1916","1917","-","Sep","30",["24","0","0"],"0","-"],["1917","only","-","Mar","31",["24","0","0"],"60","S"],["1918","only","-","Mar","9",["24","0","0"],"60","S"],["1918","only","-","Oct","6",["24","0","0"],"0","-"],["1919","only","-","Mar","1",["24","0","0"],"60","S"],["1919","only","-","Oct","4",["24","0","0"],"0","-"],["1920","only","-","Mar","20",["24","0","0"],"60","S"],["1920","only","-","Sep","18",["24","0","0"],"0","-"],["1940","only","-","Jun","14",["24","0","0"],"60","S"],["1942","only","-","Nov","2",["2","0","0","s"],"0","-"],["1943","only","-","Mar","29",["2","0","0","s"],"60","S"],["1943","only","-","Oct","4",["2","0","0","s"],"0","-"],["1944","only","-","Apr","2",["2","0","0","s"],"60","S"],["1944","only","-","Sep","17",["2","0","0","s"],"0","-"],["1945","only","-","Apr","2",["2","0","0"],"60","S"],["1945","only","-","Sep","15",["1","0","0"],"0","-"],["1946","only","-","Mar","17",["2","0","0","s"],"60","S"],["1946","only","-","Oct","6",["2","0","0","s"],"0","-"],["1947","only","-","Mar","16",["0","0","0","s"],"60","S"],["1947","only","-","Oct","5",["0","0","0","s"],"0","-"],["1948","only","-","Feb","29",["2","0","0","s"],"60","S"],["1948","only","-","Oct","3",["2","0","0","s"],"0","-"],["1966","1968","-","May","Sun>=22",["0","0","0","s"],"60","S"],["1966","only","-","Sep","24",["24","0","0"],"0","-"],["1967","1969","-","Sep","Sun>=22",["0","0","0","s"],"0","-"],["1969","only","-","Jun","1",["0","0","0","s"],"60","S"],["1970","only","-","May","31",["0","0","0","s"],"60","S"],["1970","only","-","Sep","lastSun",["0","0","0","s"],"0","-"],["1971","1972","-","May","Sun>=22",["0","0","0","s"],"60","S"],["1971","only","-","Sep","lastSun",["0","0","0","s"],"0","-"],["1972","only","-","Oct","1",["0","0","0","s"],"0","-"],["1973","only","-","Jun","3",["0","0","0","s"],"60","S"],["1973","1974","-","Sep","lastSun",["0","0","0","s"],"0","-"],["1974","only","-","May","26",["0","0","0","s"],"60","S"],["1975","only","-","Jun","1",["0","0","0","s"],"60","S"],["1975","1977","-","Sep","lastSun",["0","0","0","s"],"0","-"],["1976","only","-","May","30",["0","0","0","s"],"60","S"],["1977","1979","-","May","Sun>=22",["0","0","0","s"],"60","S"],["1978","only","-","Oct","1",["0","0","0","s"],"0","-"],["1979","only","-","Sep","30",["0","0","0","s"],"0","-"]],Latvia:[["1989","1996","-","Mar","lastSun",["2","0","0","s"],"60","S"],["1989","1996","-","Sep","lastSun",["2","0","0","s"],"0","-"]],Lux:[["1916","only","-","May","14",["23","0","0"],"60","S"],["1916","only","-","Oct","1",["1","0","0"],"0","-"],["1917","only","-","Apr","28",["23","0","0"],"60","S"],["1917","only","-","Sep","17",["1","0","0"],"0","-"],["1918","only","-","Apr","Mon>=15",["2","0","0","s"],"60","S"],["1918","only","-","Sep","Mon>=15",["2","0","0","s"],"0","-"],["1919","only","-","Mar","1",["23","0","0"],"60","S"],["1919","only","-","Oct","5",["3","0","0"],"0","-"],["1920","only","-","Feb","14",["23","0","0"],"60","S"],["1920","only","-","Oct","24",["2","0","0"],"0","-"],["1921","only","-","Mar","14",["23","0","0"],"60","S"],["1921","only","-","Oct","26",["2","0","0"],"0","-"],["1922","only","-","Mar","25",["23","0","0"],"60","S"],["1922","only","-","Oct","Sun>=2",["1","0","0"],"0","-"],["1923","only","-","Apr","21",["23","0","0"],"60","S"],["1923","only","-","Oct","Sun>=2",["2","0","0"],"0","-"],["1924","only","-","Mar","29",["23","0","0"],"60","S"],["1924","1928","-","Oct","Sun>=2",["1","0","0"],"0","-"],["1925","only","-","Apr","5",["23","0","0"],"60","S"],["1926","only","-","Apr","17",["23","0","0"],"60","S"],["1927","only","-","Apr","9",["23","0","0"],"60","S"],["1928","only","-","Apr","14",["23","0","0"],"60","S"],["1929","only","-","Apr","20",["23","0","0"],"60","S"]],Malta:[["1973","only","-","Mar","31",["0","0","0","s"],"60","S"],["1973","only","-","Sep","29",["0","0","0","s"],"0","-"],["1974","only","-","Apr","21",["0","0","0","s"],"60","S"],["1974","only","-","Sep","16",["0","0","0","s"],"0","-"],["1975","1979","-","Apr","Sun>=15",["2","0","0"],"60","S"],["1975","1980","-","Sep","Sun>=15",["2","0","0"],"0","-"],["1980","only","-","Mar","31",["2","0","0"],"60","S"]],Moldova:[["1997","max","-","Mar","lastSun",["2","0","0"],"60","S"],["1997","max","-","Oct","lastSun",["3","0","0"],"0","-"]],Neth:[["1916","only","-","May","1",["0","0","0"],"60","NST",""],["1916","only","-","Oct","1",["0","0","0"],"0","AMT",""],["1917","only","-","Apr","16",["2","0","0","s"],"60","NST"],["1917","only","-","Sep","17",["2","0","0","s"],"0","AMT"],["1918","1921","-","Apr","Mon>=1",["2","0","0","s"],"60","NST"],["1918","1921","-","Sep","lastMon",["2","0","0","s"],"0","AMT"],["1922","only","-","Mar","lastSun",["2","0","0","s"],"60","NST"],["1922","1936","-","Oct","Sun>=2",["2","0","0","s"],"0","AMT"],["1923","only","-","Jun","Fri>=1",["2","0","0","s"],"60","NST"],["1924","only","-","Mar","lastSun",["2","0","0","s"],"60","NST"],["1925","only","-","Jun","Fri>=1",["2","0","0","s"],"60","NST"],["1926","1931","-","May","15",["2","0","0","s"],"60","NST"],["1932","only","-","May","22",["2","0","0","s"],"60","NST"],["1933","1936","-","May","15",["2","0","0","s"],"60","NST"],["1937","only","-","May","22",["2","0","0","s"],"60","NST"],["1937","only","-","Jul","1",["0","0","0"],"60","S"],["1937","1939","-","Oct","Sun>=2",["2","0","0","s"],"0","-"],["1938","1939","-","May","15",["2","0","0","s"],"60","S"],["1945","only","-","Apr","2",["2","0","0","s"],"60","S"],["1945","only","-","Sep","16",["2","0","0","s"],"0","-"]],Norway:[["1916","only","-","May","22",["1","0","0"],"60","S"],["1916","only","-","Sep","30",["0","0","0"],"0","-"],["1945","only","-","Apr","2",["2","0","0","s"],"60","S"],["1945","only","-","Oct","1",["2","0","0","s"],"0","-"],["1959","1964","-","Mar","Sun>=15",["2","0","0","s"],"60","S"],["1959","1965","-","Sep","Sun>=15",["2","0","0","s"],"0","-"],["1965","only","-","Apr","25",["2","0","0","s"],"60","S"]],Poland:[["1918","1919","-","Sep","16",["2","0","0","s"],"0","-"],["1919","only","-","Apr","15",["2","0","0","s"],"60","S"],["1944","only","-","Apr","3",["2","0","0","s"],"60","S"],["1944","only","-","Oct","4",["2","0","0"],"0","-"],["1945","only","-","Apr","29",["0","0","0"],"60","S"],["1945","only","-","Nov","1",["0","0","0"],"0","-"],["1946","only","-","Apr","14",["0","0","0","s"],"60","S"],["1946","only","-","Oct","7",["2","0","0","s"],"0","-"],["1947","only","-","May","4",["2","0","0","s"],"60","S"],["1947","1949","-","Oct","Sun>=1",["2","0","0","s"],"0","-"],["1948","only","-","Apr","18",["2","0","0","s"],"60","S"],["1949","only","-","Apr","10",["2","0","0","s"],"60","S"],["1957","only","-","Jun","2",["1","0","0","s"],"60","S"],["1957","1958","-","Sep","lastSun",["1","0","0","s"],"0","-"],["1958","only","-","Mar","30",["1","0","0","s"],"60","S"],["1959","only","-","May","31",["1","0","0","s"],"60","S"],["1959","1961","-","Oct","Sun>=1",["1","0","0","s"],"0","-"],["1960","only","-","Apr","3",["1","0","0","s"],"60","S"],["1961","1964","-","May","lastSun",["1","0","0","s"],"60","S"],["1962","1964","-","Sep","lastSun",["1","0","0","s"],"0","-"]],
Port:[["1916","only","-","Jun","17",["23","0","0"],"60","S"],["1916","only","-","Nov","1",["1","0","0"],"0","-"],["1917","only","-","Feb","28",["23","0","0","s"],"60","S"],["1917","1921","-","Oct","14",["23","0","0","s"],"0","-"],["1918","only","-","Mar","1",["23","0","0","s"],"60","S"],["1919","only","-","Feb","28",["23","0","0","s"],"60","S"],["1920","only","-","Feb","29",["23","0","0","s"],"60","S"],["1921","only","-","Feb","28",["23","0","0","s"],"60","S"],["1924","only","-","Apr","16",["23","0","0","s"],"60","S"],["1924","only","-","Oct","14",["23","0","0","s"],"0","-"],["1926","only","-","Apr","17",["23","0","0","s"],"60","S"],["1926","1929","-","Oct","Sat>=1",["23","0","0","s"],"0","-"],["1927","only","-","Apr","9",["23","0","0","s"],"60","S"],["1928","only","-","Apr","14",["23","0","0","s"],"60","S"],["1929","only","-","Apr","20",["23","0","0","s"],"60","S"],["1931","only","-","Apr","18",["23","0","0","s"],"60","S"],["1931","1932","-","Oct","Sat>=1",["23","0","0","s"],"0","-"],["1932","only","-","Apr","2",["23","0","0","s"],"60","S"],["1934","only","-","Apr","7",["23","0","0","s"],"60","S"],["1934","1938","-","Oct","Sat>=1",["23","0","0","s"],"0","-"],["1935","only","-","Mar","30",["23","0","0","s"],"60","S"],["1936","only","-","Apr","18",["23","0","0","s"],"60","S"],["1937","only","-","Apr","3",["23","0","0","s"],"60","S"],["1938","only","-","Mar","26",["23","0","0","s"],"60","S"],["1939","only","-","Apr","15",["23","0","0","s"],"60","S"],["1939","only","-","Nov","18",["23","0","0","s"],"0","-"],["1940","only","-","Feb","24",["23","0","0","s"],"60","S"],["1940","1941","-","Oct","5",["23","0","0","s"],"0","-"],["1941","only","-","Apr","5",["23","0","0","s"],"60","S"],["1942","1945","-","Mar","Sat>=8",["23","0","0","s"],"60","S"],["1942","only","-","Apr","25",["22","0","0","s"],"120","M",""],["1942","only","-","Aug","15",["22","0","0","s"],"60","S"],["1942","1945","-","Oct","Sat>=24",["23","0","0","s"],"0","-"],["1943","only","-","Apr","17",["22","0","0","s"],"120","M"],["1943","1945","-","Aug","Sat>=25",["22","0","0","s"],"60","S"],["1944","1945","-","Apr","Sat>=21",["22","0","0","s"],"120","M"],["1946","only","-","Apr","Sat>=1",["23","0","0","s"],"60","S"],["1946","only","-","Oct","Sat>=1",["23","0","0","s"],"0","-"],["1947","1949","-","Apr","Sun>=1",["2","0","0","s"],"60","S"],["1947","1949","-","Oct","Sun>=1",["2","0","0","s"],"0","-"],["1951","1965","-","Apr","Sun>=1",["2","0","0","s"],"60","S"],["1951","1965","-","Oct","Sun>=1",["2","0","0","s"],"0","-"],["1977","only","-","Mar","27",["0","0","0","s"],"60","S"],["1977","only","-","Sep","25",["0","0","0","s"],"0","-"],["1978","1979","-","Apr","Sun>=1",["0","0","0","s"],"60","S"],["1978","only","-","Oct","1",["0","0","0","s"],"0","-"],["1979","1982","-","Sep","lastSun",["1","0","0","s"],"0","-"],["1980","only","-","Mar","lastSun",["0","0","0","s"],"60","S"],["1981","1982","-","Mar","lastSun",["1","0","0","s"],"60","S"],["1983","only","-","Mar","lastSun",["2","0","0","s"],"60","S"]],Romania:[["1932","only","-","May","21",["0","0","0","s"],"60","S"],["1932","1939","-","Oct","Sun>=1",["0","0","0","s"],"0","-"],["1933","1939","-","Apr","Sun>=2",["0","0","0","s"],"60","S"],["1979","only","-","May","27",["0","0","0"],"60","S"],["1979","only","-","Sep","lastSun",["0","0","0"],"0","-"],["1980","only","-","Apr","5",["23","0","0"],"60","S"],["1980","only","-","Sep","lastSun",["1","0","0"],"0","-"],["1991","1993","-","Mar","lastSun",["0","0","0","s"],"60","S"],["1991","1993","-","Sep","lastSun",["0","0","0","s"],"0","-"]],Spain:[["1918","only","-","Apr","15",["23","0","0"],"60","S"],["1918","1919","-","Oct","6",["24","0","0","s"],"0","-"],["1919","only","-","Apr","6",["23","0","0"],"60","S"],["1924","only","-","Apr","16",["23","0","0"],"60","S"],["1924","only","-","Oct","4",["24","0","0","s"],"0","-"],["1926","only","-","Apr","17",["23","0","0"],"60","S"],["1926","1929","-","Oct","Sat>=1",["24","0","0","s"],"0","-"],["1927","only","-","Apr","9",["23","0","0"],"60","S"],["1928","only","-","Apr","15",["0","0","0"],"60","S"],["1929","only","-","Apr","20",["23","0","0"],"60","S"],["1937","only","-","Jun","16",["23","0","0"],"60","S"],["1937","only","-","Oct","2",["24","0","0","s"],"0","-"],["1938","only","-","Apr","2",["23","0","0"],"60","S"],["1938","only","-","Apr","30",["23","0","0"],"120","M"],["1938","only","-","Oct","2",["24","0","0"],"60","S"],["1939","only","-","Oct","7",["24","0","0","s"],"0","-"],["1942","only","-","May","2",["23","0","0"],"60","S"],["1942","only","-","Sep","1",["1","0","0"],"0","-"],["1943","1946","-","Apr","Sat>=13",["23","0","0"],"60","S"],["1943","1944","-","Oct","Sun>=1",["1","0","0"],"0","-"],["1945","1946","-","Sep","lastSun",["1","0","0"],"0","-"],["1949","only","-","Apr","30",["23","0","0"],"60","S"],["1949","only","-","Oct","2",["1","0","0"],"0","-"],["1974","1975","-","Apr","Sat>=12",["23","0","0"],"60","S"],["1974","1975","-","Oct","Sun>=1",["1","0","0"],"0","-"],["1976","only","-","Mar","27",["23","0","0"],"60","S"],["1976","1977","-","Sep","lastSun",["1","0","0"],"0","-"],["1977","only","-","Apr","2",["23","0","0"],"60","S"],["1978","only","-","Apr","2",["2","0","0","s"],"60","S"],["1978","only","-","Oct","1",["2","0","0","s"],"0","-"]],SpainAfrica:[["1967","only","-","Jun","3",["12","0","0"],"60","S"],["1967","only","-","Oct","1",["0","0","0"],"0","-"],["1974","only","-","Jun","24",["0","0","0"],"60","S"],["1974","only","-","Sep","1",["0","0","0"],"0","-"],["1976","1977","-","May","1",["0","0","0"],"60","S"],["1976","only","-","Aug","1",["0","0","0"],"0","-"],["1977","only","-","Sep","28",["0","0","0"],"0","-"],["1978","only","-","Jun","1",["0","0","0"],"60","S"],["1978","only","-","Aug","4",["0","0","0"],"0","-"]],Swiss:[["1941","1942","-","May","Mon>=1",["1","0","0"],"60","S"],["1941","1942","-","Oct","Mon>=1",["2","0","0"],"0","-"]],Turkey:[["1916","only","-","May","1",["0","0","0"],"60","S"],["1916","only","-","Oct","1",["0","0","0"],"0","-"],["1920","only","-","Mar","28",["0","0","0"],"60","S"],["1920","only","-","Oct","25",["0","0","0"],"0","-"],["1921","only","-","Apr","3",["0","0","0"],"60","S"],["1921","only","-","Oct","3",["0","0","0"],"0","-"],["1922","only","-","Mar","26",["0","0","0"],"60","S"],["1922","only","-","Oct","8",["0","0","0"],"0","-"],["1924","only","-","May","13",["0","0","0"],"60","S"],["1924","1925","-","Oct","1",["0","0","0"],"0","-"],["1925","only","-","May","1",["0","0","0"],"60","S"],["1940","only","-","Jul","1",["0","0","0"],"60","S"],["1940","only","-","Oct","6",["0","0","0"],"0","-"],["1940","only","-","Dec","1",["0","0","0"],"60","S"],["1941","only","-","Sep","21",["0","0","0"],"0","-"],["1942","only","-","Apr","1",["0","0","0"],"60","S"],["1945","only","-","Oct","8",["0","0","0"],"0","-"],["1946","only","-","Jun","1",["0","0","0"],"60","S"],["1946","only","-","Oct","1",["0","0","0"],"0","-"],["1947","1948","-","Apr","Sun>=16",["0","0","0"],"60","S"],["1947","1951","-","Oct","Sun>=2",["0","0","0"],"0","-"],["1949","only","-","Apr","10",["0","0","0"],"60","S"],["1950","only","-","Apr","16",["0","0","0"],"60","S"],["1951","only","-","Apr","22",["0","0","0"],"60","S"],["1962","only","-","Jul","15",["0","0","0"],"60","S"],["1963","only","-","Oct","30",["0","0","0"],"0","-"],["1964","only","-","May","15",["0","0","0"],"60","S"],["1964","only","-","Oct","1",["0","0","0"],"0","-"],["1973","only","-","Jun","3",["1","0","0"],"60","S"],["1973","1976","-","Oct","Sun>=31",["2","0","0"],"0","-"],["1974","only","-","Mar","31",["2","0","0"],"60","S"],["1975","only","-","Mar","22",["2","0","0"],"60","S"],["1976","only","-","Mar","21",["2","0","0"],"60","S"],["1977","1978","-","Apr","Sun>=1",["2","0","0"],"60","S"],["1977","1978","-","Oct","Sun>=15",["2","0","0"],"0","-"],["1978","only","-","Jun","29",["0","0","0"],"0","-"],["1983","only","-","Jul","31",["2","0","0"],"60","S"],["1983","only","-","Oct","2",["2","0","0"],"0","-"],["1985","only","-","Apr","20",["1","0","0","s"],"60","S"],["1985","only","-","Sep","28",["1","0","0","s"],"0","-"],["1986","1993","-","Mar","lastSun",["1","0","0","s"],"60","S"],["1986","1995","-","Sep","lastSun",["1","0","0","s"],"0","-"],["1994","only","-","Mar","20",["1","0","0","s"],"60","S"],["1995","2006","-","Mar","lastSun",["1","0","0","s"],"60","S"],["1996","2006","-","Oct","lastSun",["1","0","0","s"],"0","-"]],US:[["1918","1919","-","Mar","lastSun",["2","0","0"],"60","D"],["1918","1919","-","Oct","lastSun",["2","0","0"],"0","S"],["1942","only","-","Feb","9",["2","0","0"],"60","W",""],["1945","only","-","Aug","14",["23","0","0","u"],"60","P",""],["1945","only","-","Sep","30",["2","0","0"],"0","S"],["1967","2006","-","Oct","lastSun",["2","0","0"],"0","S"],["1967","1973","-","Apr","lastSun",["2","0","0"],"60","D"],["1974","only","-","Jan","6",["2","0","0"],"60","D"],["1975","only","-","Feb","lastSun",["2","0","0"],"60","D"],["1976","1986","-","Apr","lastSun",["2","0","0"],"60","D"],["1987","2006","-","Apr","Sun>=1",["2","0","0"],"60","D"],["2007","max","-","Mar","Sun>=8",["2","0","0"],"60","D"],["2007","max","-","Nov","Sun>=1",["2","0","0"],"0","S"]],NYC:[["1920","only","-","Mar","lastSun",["2","0","0"],"60","D"],["1920","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1921","1966","-","Apr","lastSun",["2","0","0"],"60","D"],["1921","1954","-","Sep","lastSun",["2","0","0"],"0","S"],["1955","1966","-","Oct","lastSun",["2","0","0"],"0","S"]],Chicago:[["1920","only","-","Jun","13",["2","0","0"],"60","D"],["1920","1921","-","Oct","lastSun",["2","0","0"],"0","S"],["1921","only","-","Mar","lastSun",["2","0","0"],"60","D"],["1922","1966","-","Apr","lastSun",["2","0","0"],"60","D"],["1922","1954","-","Sep","lastSun",["2","0","0"],"0","S"],["1955","1966","-","Oct","lastSun",["2","0","0"],"0","S"]],Denver:[["1920","1921","-","Mar","lastSun",["2","0","0"],"60","D"],["1920","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1921","only","-","May","22",["2","0","0"],"0","S"],["1965","1966","-","Apr","lastSun",["2","0","0"],"60","D"],["1965","1966","-","Oct","lastSun",["2","0","0"],"0","S"]],CA:[["1948","only","-","Mar","14",["2","1","0"],"60","D"],["1949","only","-","Jan","1",["2","0","0"],"0","S"],["1950","1966","-","Apr","lastSun",["1","0","0"],"60","D"],["1950","1961","-","Sep","lastSun",["2","0","0"],"0","S"],["1962","1966","-","Oct","lastSun",["2","0","0"],"0","S"]],Indianapolis:[["1941","only","-","Jun","22",["2","0","0"],"60","D"],["1941","1954","-","Sep","lastSun",["2","0","0"],"0","S"],["1946","1954","-","Apr","lastSun",["2","0","0"],"60","D"]],Marengo:[["1951","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1951","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1954","1960","-","Apr","lastSun",["2","0","0"],"60","D"],["1954","1960","-","Sep","lastSun",["2","0","0"],"0","S"]],Vincennes:[["1946","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1946","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1953","1954","-","Apr","lastSun",["2","0","0"],"60","D"],["1953","1959","-","Sep","lastSun",["2","0","0"],"0","S"],["1955","only","-","May","1",["0","0","0"],"60","D"],["1956","1963","-","Apr","lastSun",["2","0","0"],"60","D"],["1960","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1961","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1962","1963","-","Oct","lastSun",["2","0","0"],"0","S"]],Perry:[["1955","only","-","May","1",["0","0","0"],"60","D"],["1955","1960","-","Sep","lastSun",["2","0","0"],"0","S"],["1956","1963","-","Apr","lastSun",["2","0","0"],"60","D"],["1961","1963","-","Oct","lastSun",["2","0","0"],"0","S"]],Pike:[["1955","only","-","May","1",["0","0","0"],"60","D"],["1955","1960","-","Sep","lastSun",["2","0","0"],"0","S"],["1956","1964","-","Apr","lastSun",["2","0","0"],"60","D"],["1961","1964","-","Oct","lastSun",["2","0","0"],"0","S"]],Starke:[["1947","1961","-","Apr","lastSun",["2","0","0"],"60","D"],["1947","1954","-","Sep","lastSun",["2","0","0"],"0","S"],["1955","1956","-","Oct","lastSun",["2","0","0"],"0","S"],["1957","1958","-","Sep","lastSun",["2","0","0"],"0","S"],["1959","1961","-","Oct","lastSun",["2","0","0"],"0","S"]],Pulaski:[["1946","1960","-","Apr","lastSun",["2","0","0"],"60","D"],["1946","1954","-","Sep","lastSun",["2","0","0"],"0","S"],["1955","1956","-","Oct","lastSun",["2","0","0"],"0","S"],["1957","1960","-","Sep","lastSun",["2","0","0"],"0","S"]],Louisville:[["1921","only","-","May","1",["2","0","0"],"60","D"],["1921","only","-","Sep","1",["2","0","0"],"0","S"],["1941","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1941","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1946","only","-","Apr","lastSun",["0","1","0"],"60","D"],["1946","only","-","Jun","2",["2","0","0"],"0","S"],["1950","1961","-","Apr","lastSun",["2","0","0"],"60","D"],["1950","1955","-","Sep","lastSun",["2","0","0"],"0","S"],["1956","1961","-","Oct","lastSun",["2","0","0"],"0","S"]],Detroit:[["1948","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1948","only","-","Sep","lastSun",["2","0","0"],"0","S"]],Menominee:[["1946","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1946","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1966","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1966","only","-","Oct","lastSun",["2","0","0"],"0","S"]],Canada:[["1918","only","-","Apr","14",["2","0","0"],"60","D"],["1918","only","-","Oct","27",["2","0","0"],"0","S"],["1942","only","-","Feb","9",["2","0","0"],"60","W",""],["1945","only","-","Aug","14",["23","0","0","u"],"60","P",""],["1945","only","-","Sep","30",["2","0","0"],"0","S"],["1974","1986","-","Apr","lastSun",["2","0","0"],"60","D"],["1974","2006","-","Oct","lastSun",["2","0","0"],"0","S"],["1987","2006","-","Apr","Sun>=1",["2","0","0"],"60","D"],["2007","max","-","Mar","Sun>=8",["2","0","0"],"60","D"],["2007","max","-","Nov","Sun>=1",["2","0","0"],"0","S"]],StJohns:[["1917","only","-","Apr","8",["2","0","0"],"60","D"],["1917","only","-","Sep","17",["2","0","0"],"0","S"],["1919","only","-","May","5",["23","0","0"],"60","D"],["1919","only","-","Aug","12",["23","0","0"],"0","S"],["1920","1935","-","May","Sun>=1",["23","0","0"],"60","D"],["1920","1935","-","Oct","lastSun",["23","0","0"],"0","S"],["1936","1941","-","May","Mon>=9",["0","0","0"],"60","D"],["1936","1941","-","Oct","Mon>=2",["0","0","0"],"0","S"],["1946","1950","-","May","Sun>=8",["2","0","0"],"60","D"],["1946","1950","-","Oct","Sun>=2",["2","0","0"],"0","S"],["1951","1986","-","Apr","lastSun",["2","0","0"],"60","D"],["1951","1959","-","Sep","lastSun",["2","0","0"],"0","S"],["1960","1986","-","Oct","lastSun",["2","0","0"],"0","S"],["1987","only","-","Apr","Sun>=1",["0","1","0"],"60","D"],["1987","2006","-","Oct","lastSun",["0","1","0"],"0","S"],["1988","only","-","Apr","Sun>=1",["0","1","0"],"120","DD"],["1989","2006","-","Apr","Sun>=1",["0","1","0"],"60","D"],["2007","2011","-","Mar","Sun>=8",["0","1","0"],"60","D"],["2007","2010","-","Nov","Sun>=1",["0","1","0"],"0","S"]],Halifax:[["1916","only","-","Apr","1",["0","0","0"],"60","D"],["1916","only","-","Oct","1",["0","0","0"],"0","S"],["1920","only","-","May","9",["0","0","0"],"60","D"],["1920","only","-","Aug","29",["0","0","0"],"0","S"],["1921","only","-","May","6",["0","0","0"],"60","D"],["1921","1922","-","Sep","5",["0","0","0"],"0","S"],["1922","only","-","Apr","30",["0","0","0"],"60","D"],["1923","1925","-","May","Sun>=1",["0","0","0"],"60","D"],["1923","only","-","Sep","4",["0","0","0"],"0","S"],["1924","only","-","Sep","15",["0","0","0"],"0","S"],["1925","only","-","Sep","28",["0","0","0"],"0","S"],["1926","only","-","May","16",["0","0","0"],"60","D"],["1926","only","-","Sep","13",["0","0","0"],"0","S"],["1927","only","-","May","1",["0","0","0"],"60","D"],["1927","only","-","Sep","26",["0","0","0"],"0","S"],["1928","1931","-","May","Sun>=8",["0","0","0"],"60","D"],["1928","only","-","Sep","9",["0","0","0"],"0","S"],["1929","only","-","Sep","3",["0","0","0"],"0","S"],["1930","only","-","Sep","15",["0","0","0"],"0","S"],["1931","1932","-","Sep","Mon>=24",["0","0","0"],"0","S"],["1932","only","-","May","1",["0","0","0"],"60","D"],["1933","only","-","Apr","30",["0","0","0"],"60","D"],["1933","only","-","Oct","2",["0","0","0"],"0","S"],["1934","only","-","May","20",["0","0","0"],"60","D"],["1934","only","-","Sep","16",["0","0","0"],"0","S"],["1935","only","-","Jun","2",["0","0","0"],"60","D"],["1935","only","-","Sep","30",["0","0","0"],"0","S"],["1936","only","-","Jun","1",["0","0","0"],"60","D"],["1936","only","-","Sep","14",["0","0","0"],"0","S"],["1937","1938","-","May","Sun>=1",["0","0","0"],"60","D"],["1937","1941","-","Sep","Mon>=24",["0","0","0"],"0","S"],["1939","only","-","May","28",["0","0","0"],"60","D"],["1940","1941","-","May","Sun>=1",["0","0","0"],"60","D"],["1946","1949","-","Apr","lastSun",["2","0","0"],"60","D"],["1946","1949","-","Sep","lastSun",["2","0","0"],"0","S"],["1951","1954","-","Apr","lastSun",["2","0","0"],"60","D"],["1951","1954","-","Sep","lastSun",["2","0","0"],"0","S"],["1956","1959","-","Apr","lastSun",["2","0","0"],"60","D"],["1956","1959","-","Sep","lastSun",["2","0","0"],"0","S"],["1962","1973","-","Apr","lastSun",["2","0","0"],"60","D"],["1962","1973","-","Oct","lastSun",["2","0","0"],"0","S"]],Moncton:[["1933","1935","-","Jun","Sun>=8",["1","0","0"],"60","D"],["1933","1935","-","Sep","Sun>=8",["1","0","0"],"0","S"],["1936","1938","-","Jun","Sun>=1",["1","0","0"],"60","D"],["1936","1938","-","Sep","Sun>=1",["1","0","0"],"0","S"],["1939","only","-","May","27",["1","0","0"],"60","D"],["1939","1941","-","Sep","Sat>=21",["1","0","0"],"0","S"],["1940","only","-","May","19",["1","0","0"],"60","D"],["1941","only","-","May","4",["1","0","0"],"60","D"],["1946","1972","-","Apr","lastSun",["2","0","0"],"60","D"],["1946","1956","-","Sep","lastSun",["2","0","0"],"0","S"],["1957","1972","-","Oct","lastSun",["2","0","0"],"0","S"],["1993","2006","-","Apr","Sun>=1",["0","1","0"],"60","D"],["1993","2006","-","Oct","lastSun",["0","1","0"],"0","S"]],Toronto:[["1919","only","-","Mar","30",["23","30","0"],"60","D"],["1919","only","-","Oct","26",["0","0","0"],"0","S"],["1920","only","-","May","2",["2","0","0"],"60","D"],["1920","only","-","Sep","26",["0","0","0"],"0","S"],["1921","only","-","May","15",["2","0","0"],"60","D"],["1921","only","-","Sep","15",["2","0","0"],"0","S"],["1922","1923","-","May","Sun>=8",["2","0","0"],"60","D"],["1922","1926","-","Sep","Sun>=15",["2","0","0"],"0","S"],["1924","1927","-","May","Sun>=1",["2","0","0"],"60","D"],["1927","1937","-","Sep","Sun>=25",["2","0","0"],"0","S"],["1928","1937","-","Apr","Sun>=25",["2","0","0"],"60","D"],["1938","1940","-","Apr","lastSun",["2","0","0"],"60","D"],["1938","1939","-","Sep","lastSun",["2","0","0"],"0","S"],["1945","1946","-","Sep","lastSun",["2","0","0"],"0","S"],["1946","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1947","1949","-","Apr","lastSun",["0","0","0"],"60","D"],["1947","1948","-","Sep","lastSun",["0","0","0"],"0","S"],["1949","only","-","Nov","lastSun",["0","0","0"],"0","S"],["1950","1973","-","Apr","lastSun",["2","0","0"],"60","D"],["1950","only","-","Nov","lastSun",["2","0","0"],"0","S"],["1951","1956","-","Sep","lastSun",["2","0","0"],"0","S"],["1957","1973","-","Oct","lastSun",["2","0","0"],"0","S"]],Winn:[["1916","only","-","Apr","23",["0","0","0"],"60","D"],["1916","only","-","Sep","17",["0","0","0"],"0","S"],["1918","only","-","Apr","14",["2","0","0"],"60","D"],["1918","only","-","Oct","27",["2","0","0"],"0","S"],["1937","only","-","May","16",["2","0","0"],"60","D"],["1937","only","-","Sep","26",["2","0","0"],"0","S"],["1942","only","-","Feb","9",["2","0","0"],"60","W",""],["1945","only","-","Aug","14",["23","0","0","u"],"60","P",""],["1945","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1946","only","-","May","12",["2","0","0"],"60","D"],["1946","only","-","Oct","13",["2","0","0"],"0","S"],["1947","1949","-","Apr","lastSun",["2","0","0"],"60","D"],["1947","1949","-","Sep","lastSun",["2","0","0"],"0","S"],["1950","only","-","May","1",["2","0","0"],"60","D"],["1950","only","-","Sep","30",["2","0","0"],"0","S"],["1951","1960","-","Apr","lastSun",["2","0","0"],"60","D"],["1951","1958","-","Sep","lastSun",["2","0","0"],"0","S"],["1959","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1960","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1963","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1963","only","-","Sep","22",["2","0","0"],"0","S"],["1966","1986","-","Apr","lastSun",["2","0","0","s"],"60","D"],["1966","2005","-","Oct","lastSun",["2","0","0","s"],"0","S"],["1987","2005","-","Apr","Sun>=1",["2","0","0","s"],"60","D"]],Regina:[["1918","only","-","Apr","14",["2","0","0"],"60","D"],["1918","only","-","Oct","27",["2","0","0"],"0","S"],["1930","1934","-","May","Sun>=1",["0","0","0"],"60","D"],["1930","1934","-","Oct","Sun>=1",["0","0","0"],"0","S"],["1937","1941","-","Apr","Sun>=8",["0","0","0"],"60","D"],["1937","only","-","Oct","Sun>=8",["0","0","0"],"0","S"],["1938","only","-","Oct","Sun>=1",["0","0","0"],"0","S"],["1939","1941","-","Oct","Sun>=8",["0","0","0"],"0","S"],["1942","only","-","Feb","9",["2","0","0"],"60","W",""],["1945","only","-","Aug","14",["23","0","0","u"],"60","P",""],["1945","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1946","only","-","Apr","Sun>=8",["2","0","0"],"60","D"],["1946","only","-","Oct","Sun>=8",["2","0","0"],"0","S"],["1947","1957","-","Apr","lastSun",["2","0","0"],"60","D"],["1947","1957","-","Sep","lastSun",["2","0","0"],"0","S"],["1959","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1959","only","-","Oct","lastSun",["2","0","0"],"0","S"]],Swift:[["1957","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1957","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1959","1961","-","Apr","lastSun",["2","0","0"],"60","D"],["1959","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1960","1961","-","Sep","lastSun",["2","0","0"],"0","S"]],Edm:[["1918","1919","-","Apr","Sun>=8",["2","0","0"],"60","D"],["1918","only","-","Oct","27",["2","0","0"],"0","S"],["1919","only","-","May","27",["2","0","0"],"0","S"],["1920","1923","-","Apr","lastSun",["2","0","0"],"60","D"],["1920","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1921","1923","-","Sep","lastSun",["2","0","0"],"0","S"],["1942","only","-","Feb","9",["2","0","0"],"60","W",""],["1945","only","-","Aug","14",["23","0","0","u"],"60","P",""],["1945","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1947","only","-","Apr","lastSun",["2","0","0"],"60","D"],["1947","only","-","Sep","lastSun",["2","0","0"],"0","S"],["1972","1986","-","Apr","lastSun",["2","0","0"],"60","D"],["1972","2006","-","Oct","lastSun",["2","0","0"],"0","S"]],Vanc:[["1918","only","-","Apr","14",["2","0","0"],"60","D"],["1918","only","-","Oct","27",["2","0","0"],"0","S"],["1942","only","-","Feb","9",["2","0","0"],"60","W",""],["1945","only","-","Aug","14",["23","0","0","u"],"60","P",""],["1945","only","-","Sep","30",["2","0","0"],"0","S"],["1946","1986","-","Apr","lastSun",["2","0","0"],"60","D"],["1946","only","-","Sep","29",["2","0","0"],"0","S"],["1947","1961","-","Sep","lastSun",["2","0","0"],"0","S"],["1962","2006","-","Oct","lastSun",["2","0","0"],"0","S"]],NT_YK:[["1918","only","-","Apr","14",["2","0","0"],"60","D"],["1918","only","-","Oct","27",["2","0","0"],"0","S"],["1919","only","-","May","25",["2","0","0"],"60","D"],["1919","only","-","Nov","1",["0","0","0"],"0","S"],["1942","only","-","Feb","9",["2","0","0"],"60","W",""],["1945","only","-","Aug","14",["23","0","0","u"],"60","P",""],["1945","only","-","Sep","30",["2","0","0"],"0","S"],["1965","only","-","Apr","lastSun",["0","0","0"],"120","DD"],["1965","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1980","1986","-","Apr","lastSun",["2","0","0"],"60","D"],["1980","2006","-","Oct","lastSun",["2","0","0"],"0","S"],["1987","2006","-","Apr","Sun>=1",["2","0","0"],"60","D"]],Mexico:[["1939","only","-","Feb","5",["0","0","0"],"60","D"],["1939","only","-","Jun","25",["0","0","0"],"0","S"],["1940","only","-","Dec","9",["0","0","0"],"60","D"],["1941","only","-","Apr","1",["0","0","0"],"0","S"],["1943","only","-","Dec","16",["0","0","0"],"60","W",""],["1944","only","-","May","1",["0","0","0"],"0","S"],["1950","only","-","Feb","12",["0","0","0"],"60","D"],["1950","only","-","Jul","30",["0","0","0"],"0","S"],["1996","2000","-","Apr","Sun>=1",["2","0","0"],"60","D"],["1996","2000","-","Oct","lastSun",["2","0","0"],"0","S"],["2001","only","-","May","Sun>=1",["2","0","0"],"60","D"],["2001","only","-","Sep","lastSun",["2","0","0"],"0","S"],["2002","max","-","Apr","Sun>=1",["2","0","0"],"60","D"],["2002","max","-","Oct","lastSun",["2","0","0"],"0","S"]],Bahamas:[["1964","1975","-","Oct","lastSun",["2","0","0"],"0","S"],["1964","1975","-","Apr","lastSun",["2","0","0"],"60","D"]],Barb:[["1977","only","-","Jun","12",["2","0","0"],"60","D"],["1977","1978","-","Oct","Sun>=1",["2","0","0"],"0","S"],["1978","1980","-","Apr","Sun>=15",["2","0","0"],"60","D"],["1979","only","-","Sep","30",["2","0","0"],"0","S"],["1980","only","-","Sep","25",["2","0","0"],"0","S"]],Belize:[["1918","1942","-","Oct","Sun>=2",["0","0","0"],"30","-0530"],["1919","1943","-","Feb","Sun>=9",["0","0","0"],"0","CST"],["1973","only","-","Dec","5",["0","0","0"],"60","CDT"],["1974","only","-","Feb","9",["0","0","0"],"0","CST"],["1982","only","-","Dec","18",["0","0","0"],"60","CDT"],["1983","only","-","Feb","12",["0","0","0"],"0","CST"]],CR:[["1979","1980","-","Feb","lastSun",["0","0","0"],"60","D"],["1979","1980","-","Jun","Sun>=1",["0","0","0"],"0","S"],["1991","1992","-","Jan","Sat>=15",["0","0","0"],"60","D"],["1991","only","-","Jul","1",["0","0","0"],"0","S"],["1992","only","-","Mar","15",["0","0","0"],"0","S"]],Cuba:[["1928","only","-","Jun","10",["0","0","0"],"60","D"],["1928","only","-","Oct","10",["0","0","0"],"0","S"],["1940","1942","-","Jun","Sun>=1",["0","0","0"],"60","D"],["1940","1942","-","Sep","Sun>=1",["0","0","0"],"0","S"],["1945","1946","-","Jun","Sun>=1",["0","0","0"],"60","D"],["1945","1946","-","Sep","Sun>=1",["0","0","0"],"0","S"],["1965","only","-","Jun","1",["0","0","0"],"60","D"],["1965","only","-","Sep","30",["0","0","0"],"0","S"],["1966","only","-","May","29",["0","0","0"],"60","D"],["1966","only","-","Oct","2",["0","0","0"],"0","S"],["1967","only","-","Apr","8",["0","0","0"],"60","D"],["1967","1968","-","Sep","Sun>=8",["0","0","0"],"0","S"],["1968","only","-","Apr","14",["0","0","0"],"60","D"],["1969","1977","-","Apr","lastSun",["0","0","0"],"60","D"],["1969","1971","-","Oct","lastSun",["0","0","0"],"0","S"],["1972","1974","-","Oct","8",["0","0","0"],"0","S"],["1975","1977","-","Oct","lastSun",["0","0","0"],"0","S"],["1978","only","-","May","7",["0","0","0"],"60","D"],["1978","1990","-","Oct","Sun>=8",["0","0","0"],"0","S"],["1979","1980","-","Mar","Sun>=15",["0","0","0"],"60","D"],["1981","1985","-","May","Sun>=5",["0","0","0"],"60","D"],["1986","1989","-","Mar","Sun>=14",["0","0","0"],"60","D"],["1990","1997","-","Apr","Sun>=1",["0","0","0"],"60","D"],["1991","1995","-","Oct","Sun>=8",["0","0","0","s"],"0","S"],["1996","only","-","Oct","6",["0","0","0","s"],"0","S"],["1997","only","-","Oct","12",["0","0","0","s"],"0","S"],["1998","1999","-","Mar","lastSun",["0","0","0","s"],"60","D"],["1998","2003","-","Oct","lastSun",["0","0","0","s"],"0","S"],["2000","2003","-","Apr","Sun>=1",["0","0","0","s"],"60","D"],["2004","only","-","Mar","lastSun",["0","0","0","s"],"60","D"],["2006","2010","-","Oct","lastSun",["0","0","0","s"],"0","S"],["2007","only","-","Mar","Sun>=8",["0","0","0","s"],"60","D"],["2008","only","-","Mar","Sun>=15",["0","0","0","s"],"60","D"],["2009","2010","-","Mar","Sun>=8",["0","0","0","s"],"60","D"],["2011","only","-","Mar","Sun>=15",["0","0","0","s"],"60","D"],["2011","only","-","Nov","13",["0","0","0","s"],"0","S"],["2012","only","-","Apr","1",["0","0","0","s"],"60","D"],["2012","max","-","Nov","Sun>=1",["0","0","0","s"],"0","S"],["2013","max","-","Mar","Sun>=8",["0","0","0","s"],"60","D"]],DR:[["1966","only","-","Oct","30",["0","0","0"],"60","EDT"],["1967","only","-","Feb","28",["0","0","0"],"0","EST"],["1969","1973","-","Oct","lastSun",["0","0","0"],"30","-0430"],["1970","only","-","Feb","21",["0","0","0"],"0","EST"],["1971","only","-","Jan","20",["0","0","0"],"0","EST"],["1972","1974","-","Jan","21",["0","0","0"],"0","EST"]],Salv:[["1987","1988","-","May","Sun>=1",["0","0","0"],"60","D"],["1987","1988","-","Sep","lastSun",["0","0","0"],"0","S"]],Guat:[["1973","only","-","Nov","25",["0","0","0"],"60","D"],["1974","only","-","Feb","24",["0","0","0"],"0","S"],["1983","only","-","May","21",["0","0","0"],"60","D"],["1983","only","-","Sep","22",["0","0","0"],"0","S"],["1991","only","-","Mar","23",["0","0","0"],"60","D"],["1991","only","-","Sep","7",["0","0","0"],"0","S"],["2006","only","-","Apr","30",["0","0","0"],"60","D"],["2006","only","-","Oct","1",["0","0","0"],"0","S"]],Haiti:[["1983","only","-","May","8",["0","0","0"],"60","D"],["1984","1987","-","Apr","lastSun",["0","0","0"],"60","D"],["1983","1987","-","Oct","lastSun",["0","0","0"],"0","S"],["1988","1997","-","Apr","Sun>=1",["1","0","0","s"],"60","D"],["1988","1997","-","Oct","lastSun",["1","0","0","s"],"0","S"],["2005","2006","-","Apr","Sun>=1",["0","0","0"],"60","D"],["2005","2006","-","Oct","lastSun",["0","0","0"],"0","S"],["2012","2015","-","Mar","Sun>=8",["2","0","0"],"60","D"],["2012","2015","-","Nov","Sun>=1",["2","0","0"],"0","S"],["2017","max","-","Mar","Sun>=8",["2","0","0"],"60","D"],["2017","max","-","Nov","Sun>=1",["2","0","0"],"0","S"]],Hond:[["1987","1988","-","May","Sun>=1",["0","0","0"],"60","D"],["1987","1988","-","Sep","lastSun",["0","0","0"],"0","S"],["2006","only","-","May","Sun>=1",["0","0","0"],"60","D"],["2006","only","-","Aug","Mon>=1",["0","0","0"],"0","S"]],Nic:[["1979","1980","-","Mar","Sun>=16",["0","0","0"],"60","D"],["1979","1980","-","Jun","Mon>=23",["0","0","0"],"0","S"],["2005","only","-","Apr","10",["0","0","0"],"60","D"],["2005","only","-","Oct","Sun>=1",["0","0","0"],"0","S"],["2006","only","-","Apr","30",["2","0","0"],"60","D"],["2006","only","-","Oct","Sun>=1",["1","0","0"],"0","S"]],Arg:[["1930","only","-","Dec","1",["0","0","0"],"60","-"],["1931","only","-","Apr","1",["0","0","0"],"0","-"],["1931","only","-","Oct","15",["0","0","0"],"60","-"],["1932","1940","-","Mar","1",["0","0","0"],"0","-"],["1932","1939","-","Nov","1",["0","0","0"],"60","-"],["1940","only","-","Jul","1",["0","0","0"],"60","-"],["1941","only","-","Jun","15",["0","0","0"],"0","-"],["1941","only","-","Oct","15",["0","0","0"],"60","-"],["1943","only","-","Aug","1",["0","0","0"],"0","-"],["1943","only","-","Oct","15",["0","0","0"],"60","-"],["1946","only","-","Mar","1",["0","0","0"],"0","-"],["1946","only","-","Oct","1",["0","0","0"],"60","-"],["1963","only","-","Oct","1",["0","0","0"],"0","-"],["1963","only","-","Dec","15",["0","0","0"],"60","-"],["1964","1966","-","Mar","1",["0","0","0"],"0","-"],["1964","1966","-","Oct","15",["0","0","0"],"60","-"],["1967","only","-","Apr","2",["0","0","0"],"0","-"],["1967","1968","-","Oct","Sun>=1",["0","0","0"],"60","-"],["1968","1969","-","Apr","Sun>=1",["0","0","0"],"0","-"],["1974","only","-","Jan","23",["0","0","0"],"60","-"],["1974","only","-","May","1",["0","0","0"],"0","-"],["1988","only","-","Dec","1",["0","0","0"],"60","-"],["1989","1993","-","Mar","Sun>=1",["0","0","0"],"0","-"],["1989","1992","-","Oct","Sun>=15",["0","0","0"],"60","-"],["1999","only","-","Oct","Sun>=1",["0","0","0"],"60","-"],["2000","only","-","Mar","3",["0","0","0"],"0","-"],["2007","only","-","Dec","30",["0","0","0"],"60","-"],["2008","2009","-","Mar","Sun>=15",["0","0","0"],"0","-"],["2008","only","-","Oct","Sun>=15",["0","0","0"],"60","-"]],SanLuis:[["2008","2009","-","Mar","Sun>=8",["0","0","0"],"0","-"],["2007","2008","-","Oct","Sun>=8",["0","0","0"],"60","-"]],Brazil:[["1931","only","-","Oct","3",["11","0","0"],"60","-"],["1932","1933","-","Apr","1",["0","0","0"],"0","-"],["1932","only","-","Oct","3",["0","0","0"],"60","-"],["1949","1952","-","Dec","1",["0","0","0"],"60","-"],["1950","only","-","Apr","16",["1","0","0"],"0","-"],["1951","1952","-","Apr","1",["0","0","0"],"0","-"],["1953","only","-","Mar","1",["0","0","0"],"0","-"],["1963","only","-","Dec","9",["0","0","0"],"60","-"],["1964","only","-","Mar","1",["0","0","0"],"0","-"],["1965","only","-","Jan","31",["0","0","0"],"60","-"],["1965","only","-","Mar","31",["0","0","0"],"0","-"],["1965","only","-","Dec","1",["0","0","0"],"60","-"],["1966","1968","-","Mar","1",["0","0","0"],"0","-"],["1966","1967","-","Nov","1",["0","0","0"],"60","-"],["1985","only","-","Nov","2",["0","0","0"],"60","-"],["1986","only","-","Mar","15",["0","0","0"],"0","-"],["1986","only","-","Oct","25",["0","0","0"],"60","-"],["1987","only","-","Feb","14",["0","0","0"],"0","-"],["1987","only","-","Oct","25",["0","0","0"],"60","-"],["1988","only","-","Feb","7",["0","0","0"],"0","-"],["1988","only","-","Oct","16",["0","0","0"],"60","-"],["1989","only","-","Jan","29",["0","0","0"],"0","-"],["1989","only","-","Oct","15",["0","0","0"],"60","-"],["1990","only","-","Feb","11",["0","0","0"],"0","-"],["1990","only","-","Oct","21",["0","0","0"],"60","-"],["1991","only","-","Feb","17",["0","0","0"],"0","-"],["1991","only","-","Oct","20",["0","0","0"],"60","-"],["1992","only","-","Feb","9",["0","0","0"],"0","-"],["1992","only","-","Oct","25",["0","0","0"],"60","-"],["1993","only","-","Jan","31",["0","0","0"],"0","-"],["1993","1995","-","Oct","Sun>=11",["0","0","0"],"60","-"],["1994","1995","-","Feb","Sun>=15",["0","0","0"],"0","-"],["1996","only","-","Feb","11",["0","0","0"],"0","-"],["1996","only","-","Oct","6",["0","0","0"],"60","-"],["1997","only","-","Feb","16",["0","0","0"],"0","-"],["1997","only","-","Oct","6",["0","0","0"],"60","-"],["1998","only","-","Mar","1",["0","0","0"],"0","-"],["1998","only","-","Oct","11",["0","0","0"],"60","-"],["1999","only","-","Feb","21",["0","0","0"],"0","-"],["1999","only","-","Oct","3",["0","0","0"],"60","-"],["2000","only","-","Feb","27",["0","0","0"],"0","-"],["2000","2001","-","Oct","Sun>=8",["0","0","0"],"60","-"],["2001","2006","-","Feb","Sun>=15",["0","0","0"],"0","-"],["2002","only","-","Nov","3",["0","0","0"],"60","-"],["2003","only","-","Oct","19",["0","0","0"],"60","-"],["2004","only","-","Nov","2",["0","0","0"],"60","-"],["2005","only","-","Oct","16",["0","0","0"],"60","-"],["2006","only","-","Nov","5",["0","0","0"],"60","-"],["2007","only","-","Feb","25",["0","0","0"],"0","-"],["2007","only","-","Oct","Sun>=8",["0","0","0"],"60","-"],["2008","2017","-","Oct","Sun>=15",["0","0","0"],"60","-"],["2008","2011","-","Feb","Sun>=15",["0","0","0"],"0","-"],["2012","only","-","Feb","Sun>=22",["0","0","0"],"0","-"],["2013","2014","-","Feb","Sun>=15",["0","0","0"],"0","-"],["2015","only","-","Feb","Sun>=22",["0","0","0"],"0","-"],["2016","2019","-","Feb","Sun>=15",["0","0","0"],"0","-"],["2018","only","-","Nov","Sun>=1",["0","0","0"],"60","-"]],
Chile:[["1927","1931","-","Sep","1",["0","0","0"],"60","-"],["1928","1932","-","Apr","1",["0","0","0"],"0","-"],["1968","only","-","Nov","3",["4","0","0","u"],"60","-"],["1969","only","-","Mar","30",["3","0","0","u"],"0","-"],["1969","only","-","Nov","23",["4","0","0","u"],"60","-"],["1970","only","-","Mar","29",["3","0","0","u"],"0","-"],["1971","only","-","Mar","14",["3","0","0","u"],"0","-"],["1970","1972","-","Oct","Sun>=9",["4","0","0","u"],"60","-"],["1972","1986","-","Mar","Sun>=9",["3","0","0","u"],"0","-"],["1973","only","-","Sep","30",["4","0","0","u"],"60","-"],["1974","1987","-","Oct","Sun>=9",["4","0","0","u"],"60","-"],["1987","only","-","Apr","12",["3","0","0","u"],"0","-"],["1988","1990","-","Mar","Sun>=9",["3","0","0","u"],"0","-"],["1988","1989","-","Oct","Sun>=9",["4","0","0","u"],"60","-"],["1990","only","-","Sep","16",["4","0","0","u"],"60","-"],["1991","1996","-","Mar","Sun>=9",["3","0","0","u"],"0","-"],["1991","1997","-","Oct","Sun>=9",["4","0","0","u"],"60","-"],["1997","only","-","Mar","30",["3","0","0","u"],"0","-"],["1998","only","-","Mar","Sun>=9",["3","0","0","u"],"0","-"],["1998","only","-","Sep","27",["4","0","0","u"],"60","-"],["1999","only","-","Apr","4",["3","0","0","u"],"0","-"],["1999","2010","-","Oct","Sun>=9",["4","0","0","u"],"60","-"],["2000","2007","-","Mar","Sun>=9",["3","0","0","u"],"0","-"],["2008","only","-","Mar","30",["3","0","0","u"],"0","-"],["2009","only","-","Mar","Sun>=9",["3","0","0","u"],"0","-"],["2010","only","-","Apr","Sun>=1",["3","0","0","u"],"0","-"],["2011","only","-","May","Sun>=2",["3","0","0","u"],"0","-"],["2011","only","-","Aug","Sun>=16",["4","0","0","u"],"60","-"],["2012","2014","-","Apr","Sun>=23",["3","0","0","u"],"0","-"],["2012","2014","-","Sep","Sun>=2",["4","0","0","u"],"60","-"],["2016","2018","-","May","Sun>=9",["3","0","0","u"],"0","-"],["2016","2018","-","Aug","Sun>=9",["4","0","0","u"],"60","-"],["2019","max","-","Apr","Sun>=2",["3","0","0","u"],"0","-"],["2019","max","-","Sep","Sun>=2",["4","0","0","u"],"60","-"]],CO:[["1992","only","-","May","3",["0","0","0"],"60","-"],["1993","only","-","Apr","4",["0","0","0"],"0","-"]],Ecuador:[["1992","only","-","Nov","28",["0","0","0"],"60","-"],["1993","only","-","Feb","5",["0","0","0"],"0","-"]],Falk:[["1937","1938","-","Sep","lastSun",["0","0","0"],"60","-"],["1938","1942","-","Mar","Sun>=19",["0","0","0"],"0","-"],["1939","only","-","Oct","1",["0","0","0"],"60","-"],["1940","1942","-","Sep","lastSun",["0","0","0"],"60","-"],["1943","only","-","Jan","1",["0","0","0"],"0","-"],["1983","only","-","Sep","lastSun",["0","0","0"],"60","-"],["1984","1985","-","Apr","lastSun",["0","0","0"],"0","-"],["1984","only","-","Sep","16",["0","0","0"],"60","-"],["1985","2000","-","Sep","Sun>=9",["0","0","0"],"60","-"],["1986","2000","-","Apr","Sun>=16",["0","0","0"],"0","-"],["2001","2010","-","Apr","Sun>=15",["2","0","0"],"0","-"],["2001","2010","-","Sep","Sun>=1",["2","0","0"],"60","-"]],Para:[["1975","1988","-","Oct","1",["0","0","0"],"60","-"],["1975","1978","-","Mar","1",["0","0","0"],"0","-"],["1979","1991","-","Apr","1",["0","0","0"],"0","-"],["1989","only","-","Oct","22",["0","0","0"],"60","-"],["1990","only","-","Oct","1",["0","0","0"],"60","-"],["1991","only","-","Oct","6",["0","0","0"],"60","-"],["1992","only","-","Mar","1",["0","0","0"],"0","-"],["1992","only","-","Oct","5",["0","0","0"],"60","-"],["1993","only","-","Mar","31",["0","0","0"],"0","-"],["1993","1995","-","Oct","1",["0","0","0"],"60","-"],["1994","1995","-","Feb","lastSun",["0","0","0"],"0","-"],["1996","only","-","Mar","1",["0","0","0"],"0","-"],["1996","2001","-","Oct","Sun>=1",["0","0","0"],"60","-"],["1997","only","-","Feb","lastSun",["0","0","0"],"0","-"],["1998","2001","-","Mar","Sun>=1",["0","0","0"],"0","-"],["2002","2004","-","Apr","Sun>=1",["0","0","0"],"0","-"],["2002","2003","-","Sep","Sun>=1",["0","0","0"],"60","-"],["2004","2009","-","Oct","Sun>=15",["0","0","0"],"60","-"],["2005","2009","-","Mar","Sun>=8",["0","0","0"],"0","-"],["2010","max","-","Oct","Sun>=1",["0","0","0"],"60","-"],["2010","2012","-","Apr","Sun>=8",["0","0","0"],"0","-"],["2013","max","-","Mar","Sun>=22",["0","0","0"],"0","-"]],Peru:[["1938","only","-","Jan","1",["0","0","0"],"60","-"],["1938","only","-","Apr","1",["0","0","0"],"0","-"],["1938","1939","-","Sep","lastSun",["0","0","0"],"60","-"],["1939","1940","-","Mar","Sun>=24",["0","0","0"],"0","-"],["1986","1987","-","Jan","1",["0","0","0"],"60","-"],["1986","1987","-","Apr","1",["0","0","0"],"0","-"],["1990","only","-","Jan","1",["0","0","0"],"60","-"],["1990","only","-","Apr","1",["0","0","0"],"0","-"],["1994","only","-","Jan","1",["0","0","0"],"60","-"],["1994","only","-","Apr","1",["0","0","0"],"0","-"]],Uruguay:[["1923","1925","-","Oct","1",["0","0","0"],"30","-"],["1924","1926","-","Apr","1",["0","0","0"],"0","-"],["1933","1938","-","Oct","lastSun",["0","0","0"],"30","-"],["1934","1941","-","Mar","lastSat",["24","0","0"],"0","-"],["1939","only","-","Oct","1",["0","0","0"],"30","-"],["1940","only","-","Oct","27",["0","0","0"],"30","-"],["1941","only","-","Aug","1",["0","0","0"],"30","-"],["1942","only","-","Dec","14",["0","0","0"],"30","-"],["1943","only","-","Mar","14",["0","0","0"],"0","-"],["1959","only","-","May","24",["0","0","0"],"30","-"],["1959","only","-","Nov","15",["0","0","0"],"0","-"],["1960","only","-","Jan","17",["0","0","0"],"60","-"],["1960","only","-","Mar","6",["0","0","0"],"0","-"],["1965","only","-","Apr","4",["0","0","0"],"60","-"],["1965","only","-","Sep","26",["0","0","0"],"0","-"],["1968","only","-","May","27",["0","0","0"],"30","-"],["1968","only","-","Dec","1",["0","0","0"],"0","-"],["1970","only","-","Apr","25",["0","0","0"],"60","-"],["1970","only","-","Jun","14",["0","0","0"],"0","-"],["1972","only","-","Apr","23",["0","0","0"],"60","-"],["1972","only","-","Jul","16",["0","0","0"],"0","-"],["1974","only","-","Jan","13",["0","0","0"],"90","-"],["1974","only","-","Mar","10",["0","0","0"],"30","-"],["1974","only","-","Sep","1",["0","0","0"],"0","-"],["1974","only","-","Dec","22",["0","0","0"],"60","-"],["1975","only","-","Mar","30",["0","0","0"],"0","-"],["1976","only","-","Dec","19",["0","0","0"],"60","-"],["1977","only","-","Mar","6",["0","0","0"],"0","-"],["1977","only","-","Dec","4",["0","0","0"],"60","-"],["1978","1979","-","Mar","Sun>=1",["0","0","0"],"0","-"],["1978","only","-","Dec","17",["0","0","0"],"60","-"],["1979","only","-","Apr","29",["0","0","0"],"60","-"],["1980","only","-","Mar","16",["0","0","0"],"0","-"],["1987","only","-","Dec","14",["0","0","0"],"60","-"],["1988","only","-","Feb","28",["0","0","0"],"0","-"],["1988","only","-","Dec","11",["0","0","0"],"60","-"],["1989","only","-","Mar","5",["0","0","0"],"0","-"],["1989","only","-","Oct","29",["0","0","0"],"60","-"],["1990","only","-","Feb","25",["0","0","0"],"0","-"],["1990","1991","-","Oct","Sun>=21",["0","0","0"],"60","-"],["1991","1992","-","Mar","Sun>=1",["0","0","0"],"0","-"],["1992","only","-","Oct","18",["0","0","0"],"60","-"],["1993","only","-","Feb","28",["0","0","0"],"0","-"],["2004","only","-","Sep","19",["0","0","0"],"60","-"],["2005","only","-","Mar","27",["2","0","0"],"0","-"],["2005","only","-","Oct","9",["2","0","0"],"60","-"],["2006","2015","-","Mar","Sun>=8",["2","0","0"],"0","-"],["2006","2014","-","Oct","Sun>=1",["2","0","0"],"60","-"]],SystemV:[["NaN","1973","-","Apr","lastSun",["2","0","0"],"60","D"],["NaN","1973","-","Oct","lastSun",["2","0","0"],"0","S"],["1974","only","-","Jan","6",["2","0","0"],"60","D"],["1974","only","-","Nov","lastSun",["2","0","0"],"0","S"],["1975","only","-","Feb","23",["2","0","0"],"60","D"],["1975","only","-","Oct","lastSun",["2","0","0"],"0","S"],["1976","max","-","Apr","lastSun",["2","0","0"],"60","D"],["1976","max","-","Oct","lastSun",["2","0","0"],"0","S"]]},a.timezone.zones_titles=[{name:"(GMT) Casablanca",other_zone:"Morocco Standard Time"},{name:"(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London",other_zone:"GMT Standard Time"},{name:"(GMT) Monrovia, Reykjavik",other_zone:"Greenwich Standard Time"},{name:"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",other_zone:"W. Europe Standard Time"},{name:"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",other_zone:"Central Europe Standard Time"},{name:"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris",other_zone:"Romance Standard Time"},{name:"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb",other_zone:"Central European Standard Time"},{name:"(GMT+01:00) West Central Africa",other_zone:"W. Central Africa Standard Time"},{name:"(GMT+02:00) Amman",other_zone:"Jordan Standard Time"},{name:"(GMT+02:00) Athens, Bucharest, Istanbul",other_zone:"GTB Standard Time"},{name:"(GMT+02:00) Beirut",other_zone:"Middle East Standard Time"},{name:"(GMT+02:00) Cairo",other_zone:"Egypt Standard Time"},{name:"(GMT+02:00) Harare, Pretoria",other_zone:"South Africa Standard Time"},{name:"(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",other_zone:"FLE Standard Time"},{name:"(GMT+02:00) Jerusalem",other_zone:"Israel Standard Time"},{name:"(GMT+02:00) Minsk",other_zone:"E. Europe Standard Time"},{name:"(GMT+02:00) Windhoek",other_zone:"Namibia Standard Time"},{name:"(GMT+03:00) Baghdad",other_zone:"Arabic Standard Time"},{name:"(GMT+03:00) Kuwait, Riyadh",other_zone:"Arab Standard Time"},{name:"(GMT+03:00) Moscow, St. Petersburg, Volgograd",other_zone:"Russian Standard Time"},{name:"(GMT+03:00) Nairobi",other_zone:"E. Africa Standard Time"},{name:"(GMT+03:00) Tbilisi",other_zone:"Georgian Standard Time"},{name:"(GMT+03:30) Tehran",other_zone:"Iran Standard Time"},{name:"(GMT+04:00) Abu Dhabi, Muscat",other_zone:"Arabian Standard Time"},{name:"(GMT+04:00) Baku",other_zone:"Azerbaijan Standard Time"},{name:"(GMT+04:00) Port Louis",other_zone:"Mauritius Standard Time"},{name:"(GMT+04:00) Yerevan",other_zone:"Caucasus Standard Time"},{name:"(GMT+04:30) Kabul",other_zone:"Afghanistan Standard Time"},{name:"(GMT+05:00) Ekaterinburg",other_zone:"Ekaterinburg Standard Time"},{name:"(GMT+05:00) Islamabad, Karachi",other_zone:"Pakistan Standard Time"},{name:"(GMT+05:00) Tashkent",other_zone:"West Asia Standard Time"},{name:"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",other_zone:"India Standard Time"},{name:"(GMT+05:30) Sri Jayawardenepura",other_zone:"Sri Lanka Standard Time"},{name:"(GMT+05:45) Kathmandu",other_zone:"Nepal Standard Time"},{name:"(GMT+06:00) Almaty, Novosibirsk",other_zone:"N. Central Asia Standard Time"},{name:"(GMT+06:00) Astana, Dhaka",other_zone:"Central Asia Standard Time"},{name:"(GMT+06:30) Yangon (Rangoon)",other_zone:"Myanmar Standard Time"},{name:"(GMT+07:00) Bangkok, Hanoi, Jakarta",other_zone:"SE Asia Standard Time"},{name:"(GMT+07:00) Krasnoyarsk",other_zone:"North Asia Standard Time"},{name:"(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi",other_zone:"China Standard Time"},{name:"(GMT+08:00) Irkutsk, Ulaan Bataar",other_zone:"North Asia East Standard Time"},{name:"(GMT+08:00) Kuala Lumpur, Singapore",other_zone:"Singapore Standard Time"},{name:"(GMT+08:00) Perth",other_zone:"W. Australia Standard Time"},{name:"(GMT+08:00) Taipei",other_zone:"Taipei Standard Time"},{name:"(GMT+09:00) Osaka, Sapporo, Tokyo",other_zone:"Tokyo Standard Time"},{name:"(GMT+09:00) Seoul",other_zone:"Korea Standard Time"},{name:"(GMT+09:00) Yakutsk",other_zone:"Yakutsk Standard Time"},{name:"(GMT+09:30) Adelaide",other_zone:"Cen. Australia Standard Time"},{name:"(GMT+09:30) Darwin",other_zone:"AUS Central Standard Time"},{name:"(GMT+10:00) Brisbane",other_zone:"E. Australia Standard Time"},{name:"(GMT+10:00) Canberra, Melbourne, Sydney",other_zone:"AUS Eastern Standard Time"},{name:"(GMT+10:00) Guam, Port Moresby",other_zone:"West Pacific Standard Time"},{name:"(GMT+10:00) Hobart",other_zone:"Tasmania Standard Time"},{name:"(GMT+10:00) Vladivostok",other_zone:"Vladivostok Standard Time"},{name:"(GMT+11:00) Magadan, Solomon Is., New Caledonia",other_zone:"Central Pacific Standard Time"},{name:"(GMT+12:00) Auckland, Wellington",other_zone:"New Zealand Standard Time"},{name:"(GMT+12:00) Fiji, Kamchatka, Marshall Is.",other_zone:"Fiji Standard Time"},{name:"(GMT+13:00) Nuku'alofa",other_zone:"Tonga Standard Time"},{name:"(GMT-01:00) Azores",other_zone:"Azores Standard Time"},{name:"(GMT-01:00) Cape Verde Is.",other_zone:"Cape Verde Standard Time"},{name:"(GMT-03:00) Brasilia",other_zone:"E. South America Standard Time"},{name:"(GMT-03:00) Buenos Aires",other_zone:"Argentina Standard Time"},{name:"(GMT-03:00) Georgetown",other_zone:"SA Eastern Standard Time"},{name:"(GMT-03:00) Greenland",other_zone:"Greenland Standard Time"},{name:"(GMT-03:00) Montevideo",other_zone:"Montevideo Standard Time"},{name:"(GMT-03:30) Newfoundland",other_zone:"Newfoundland Standard Time"},{name:"(GMT-04:00) Atlantic Time (Canada)",other_zone:"Atlantic Standard Time"},{name:"(GMT-04:00) La Paz",other_zone:"SA Western Standard Time"},{name:"(GMT-04:00) Manaus",other_zone:"Central Brazilian Standard Time"},{name:"(GMT-04:00) Santiago",other_zone:"Pacific SA Standard Time"},{name:"(GMT-04:30) Caracas",other_zone:"Venezuela Standard Time"},{name:"(GMT-05:00) Bogota, Lima, Quito, Rio Branco",other_zone:"SA Pacific Standard Time"},{name:"(GMT-05:00) Eastern Time (US & Canada)",other_zone:"Eastern Standard Time"},{name:"(GMT-05:00) Indiana (East)",other_zone:"US Eastern Standard Time"},{name:"(GMT-06:00) Central America",other_zone:"Central America Standard Time"},{name:"(GMT-06:00) Central Time (US & Canada)",other_zone:"Central Standard Time"},{name:"(GMT-06:00) Guadalajara, Mexico City, Monterrey",other_zone:"Central Standard Time (Mexico)"},{name:"(GMT-06:00) Saskatchewan",other_zone:"Canada Central Standard Time"},{name:"(GMT-07:00) Arizona",other_zone:"US Mountain Standard Time"},{name:"(GMT-07:00) Chihuahua, La Paz, Mazatlan",other_zone:"Mountain Standard Time (Mexico)"},{name:"(GMT-07:00) Mountain Time (US & Canada)",other_zone:"Mountain Standard Time"},{name:"(GMT-08:00) Pacific Time (US & Canada)",other_zone:"Pacific Standard Time"},{name:"(GMT-08:00) Tijuana, Baja California",other_zone:"Pacific Standard Time (Mexico)"},{name:"(GMT-09:00) Alaska",other_zone:"Alaskan Standard Time"},{name:"(GMT-10:00) Hawaii",other_zone:"Hawaiian Standard Time"},{name:"(GMT-11:00) Midway Island, Samoa",other_zone:"Samoa Standard Time"},{name:"(GMT-12:00) International Date Line West",other_zone:"Dateline Standard Time"}],a.timezone.windows_zones=[{other_zone:"Dateline Standard Time",zone:"Etc/GMT+12",territory:"GMT+12"},{other_zone:"UTC-11",zone:"Etc/GMT+11",territory:"GMT+11"},{other_zone:"UTC-11",zone:"Pacific/Pago_Pago",territory:"Pago Pago"},{other_zone:"UTC-11",zone:"Pacific/Niue",territory:"Niue"},{other_zone:"UTC-11",zone:"Pacific/Midway",territory:"Midway"},{other_zone:"Hawaiian Standard Time",zone:"Pacific/Honolulu",territory:"Honolulu"},{other_zone:"Hawaiian Standard Time",zone:"Pacific/Rarotonga",territory:"Rarotonga"},{other_zone:"Hawaiian Standard Time",zone:"Pacific/Tahiti",territory:"Tahiti"},{other_zone:"Hawaiian Standard Time",zone:"Pacific/Johnston",territory:"Johnston"},{other_zone:"Hawaiian Standard Time",zone:"Etc/GMT+10",territory:"GMT+10"},{other_zone:"Alaskan Standard Time",zone:"America/Anchorage",territory:"Anchorage"},{other_zone:"Alaskan Standard Time",zone:"America/Juneau",territory:"Juneau"},{other_zone:"Alaskan Standard Time",zone:"America/Nome",territory:"Nome"},{other_zone:"Alaskan Standard Time",zone:"America/Sitka",territory:"Sitka"},{other_zone:"Alaskan Standard Time",zone:"America/Yakutat",territory:"Yakutat"},{other_zone:"Pacific Standard Time (Mexico)",zone:"America/Santa_Isabel",territory:"Santa Isabel"},{other_zone:"Pacific Standard Time",zone:"America/Los_Angeles",territory:"Los Angeles"},{other_zone:"Pacific Standard Time",zone:"America/Vancouver",territory:"Vancouver"},{other_zone:"Pacific Standard Time",zone:"America/Dawson",territory:"Dawson"},{other_zone:"Pacific Standard Time",zone:"America/Whitehorse",territory:"Whitehorse"},{other_zone:"Pacific Standard Time",zone:"America/Tijuana",territory:"Tijuana"},{other_zone:"US Mountain Standard Time",zone:"America/Phoenix",territory:"Phoenix"},{other_zone:"US Mountain Standard Time",zone:"America/Dawson_Creek",territory:"Dawson Creek"},{other_zone:"US Mountain Standard Time",zone:"America/Creston",territory:"Creston"},{other_zone:"US Mountain Standard Time",zone:"America/Hermosillo",territory:"Hermosillo"},{other_zone:"US Mountain Standard Time",zone:"Etc/GMT+7",territory:"GMT+7"},{other_zone:"Mountain Standard Time (Mexico)",zone:"America/Chihuahua",territory:"Chihuahua"},{other_zone:"Mountain Standard Time (Mexico)",zone:"America/Mazatlan",territory:"Mazatlan"},{other_zone:"Mountain Standard Time",zone:"America/Denver",territory:"Denver"},{other_zone:"Mountain Standard Time",zone:"America/Edmonton",territory:"Edmonton"},{other_zone:"Mountain Standard Time",zone:"America/Cambridge_Bay",territory:"Cambridge Bay"},{other_zone:"Mountain Standard Time",zone:"America/Inuvik",territory:"Inuvik"},{other_zone:"Mountain Standard Time",zone:"America/Yellowknife",territory:"Yellowknife"},{other_zone:"Mountain Standard Time",zone:"America/Ojinaga",territory:"Ojinaga"},{other_zone:"Mountain Standard Time",zone:"America/Boise",territory:"Boise"},{other_zone:"Mountain Standard Time",zone:"America/Shiprock",territory:"Shiprock"},{other_zone:"Central America Standard Time",zone:"America/Guatemala",territory:"Guatemala"},{other_zone:"Central America Standard Time",zone:"America/Belize",territory:"Belize"},{other_zone:"Central America Standard Time",zone:"America/Costa_Rica",territory:"Costa Rica"},{other_zone:"Central America Standard Time",zone:"Pacific/Galapagos",territory:"Galapagos"},{other_zone:"Central America Standard Time",zone:"America/Tegucigalpa",territory:"Tegucigalpa"},{other_zone:"Central America Standard Time",zone:"America/Managua",territory:"Managua"},{other_zone:"Central America Standard Time",zone:"America/El_Salvador",territory:"El Salvador"},{other_zone:"Central America Standard Time",zone:"Etc/GMT+6",territory:"GMT+6"},{other_zone:"Central Standard Time",zone:"America/Chicago",territory:"Chicago"},{other_zone:"Central Standard Time",zone:"America/Winnipeg",territory:"Winnipeg"},{other_zone:"Central Standard Time",zone:"America/Rainy_River",territory:"Rainy River"},{other_zone:"Central Standard Time",zone:"America/Rankin_Inlet",territory:"Rankin Inlet"},{other_zone:"Central Standard Time",zone:"America/Resolute",territory:"Resolute"},{other_zone:"Central Standard Time",zone:"America/Matamoros",territory:"Matamoros"},{other_zone:"Central Standard Time",zone:"America/Indiana/Knox",territory:"Indiana"},{other_zone:"Central Standard Time",zone:"America/Indiana/Tell_City",territory:"Indiana"},{other_zone:"Central Standard Time",zone:"America/Menominee",territory:"Menominee"},{other_zone:"Central Standard Time",zone:"America/North_Dakota/Beulah",territory:"North Dakota"},{other_zone:"Central Standard Time",zone:"America/North_Dakota/Center",territory:"North Dakota"},{other_zone:"Central Standard Time",zone:"America/North_Dakota/New_Salem",territory:"North Dakota"},{other_zone:"Central Standard Time (Mexico)",zone:"America/Mexico_City",territory:"Mexico City"},{other_zone:"Central Standard Time (Mexico)",zone:"America/Bahia_Banderas",territory:"Bahia Banderas"},{other_zone:"Central Standard Time (Mexico)",zone:"America/Cancun",territory:"Cancun"},{other_zone:"Central Standard Time (Mexico)",zone:"America/Merida",territory:"Merida"},{other_zone:"Central Standard Time (Mexico)",zone:"America/Monterrey",territory:"Monterrey"},{other_zone:"Canada Central Standard Time",zone:"America/Regina",territory:"Regina"},{other_zone:"Canada Central Standard Time",zone:"America/Swift_Current",territory:"Swift Current"},{other_zone:"SA Pacific Standard Time",zone:"America/Bogota",territory:"Bogota"},{other_zone:"SA Pacific Standard Time",zone:"America/Coral_Harbour",territory:"Coral Harbour"},{other_zone:"SA Pacific Standard Time",zone:"America/Guayaquil",territory:"Guayaquil"},{other_zone:"SA Pacific Standard Time",zone:"America/Port-au-Prince",territory:"Port-au-Prince"},{other_zone:"SA Pacific Standard Time",zone:"America/Jamaica",territory:"Jamaica"},{other_zone:"SA Pacific Standard Time",zone:"America/Cayman",territory:"Cayman"},{other_zone:"SA Pacific Standard Time",zone:"America/Panama",territory:"Panama"},{other_zone:"SA Pacific Standard Time",zone:"America/Lima",territory:"Lima"},{other_zone:"SA Pacific Standard Time",zone:"Etc/GMT+5",territory:"GMT+5"},{other_zone:"Eastern Standard Time",zone:"America/New_York",territory:"New York"},{other_zone:"Eastern Standard Time",zone:"America/Nassau",territory:"Nassau"},{other_zone:"Eastern Standard Time",zone:"America/Toronto",territory:"Toronto"},{other_zone:"Eastern Standard Time",zone:"America/Iqaluit",territory:"Iqaluit"},{other_zone:"Eastern Standard Time",zone:"America/Montreal",territory:"Montreal"},{other_zone:"Eastern Standard Time",zone:"America/Nipigon",territory:"Nipigon"},{other_zone:"Eastern Standard Time",zone:"America/Pangnirtung",territory:"Pangnirtung"},{other_zone:"Eastern Standard Time",zone:"America/Thunder_Bay",territory:"Thunder Bay"},{other_zone:"Eastern Standard Time",zone:"America/Grand_Turk",territory:"Grand Turk"},{other_zone:"Eastern Standard Time",zone:"America/Detroit",territory:"Detroit"},{other_zone:"Eastern Standard Time",zone:"America/Indiana/Petersburg",territory:"Indiana"},{other_zone:"Eastern Standard Time",zone:"America/Indiana/Vincennes",territory:"Indiana"},{other_zone:"Eastern Standard Time",zone:"America/Indiana/Winamac",territory:"Indiana"},{other_zone:"Eastern Standard Time",zone:"America/Kentucky/Monticello",territory:"Kentucky"},{other_zone:"Eastern Standard Time",zone:"America/Louisville",territory:"Louisville"},{other_zone:"US Eastern Standard Time",zone:"America/Indianapolis",territory:"Indianapolis"},{other_zone:"US Eastern Standard Time",zone:"America/Indiana/Marengo",territory:"Indiana"},{other_zone:"US Eastern Standard Time",zone:"America/Indiana/Vevay",territory:"Indiana"},{other_zone:"Venezuela Standard Time",zone:"America/Caracas",territory:"Caracas"},{other_zone:"Paraguay Standard Time",zone:"America/Asuncion",territory:"Asuncion"},{other_zone:"Atlantic Standard Time",zone:"America/Halifax",territory:"Halifax"},{other_zone:"Atlantic Standard Time",zone:"Atlantic/Bermuda",territory:"Bermuda"},{other_zone:"Atlantic Standard Time",zone:"America/Glace_Bay",territory:"Glace Bay"},{other_zone:"Atlantic Standard Time",zone:"America/Goose_Bay",territory:"Goose Bay"},{other_zone:"Atlantic Standard Time",zone:"America/Moncton",territory:"Moncton"},{other_zone:"Atlantic Standard Time",zone:"America/Thule",territory:"Thule"},{other_zone:"Central Brazilian Standard Time",zone:"America/Cuiaba",territory:"Cuiaba"},{other_zone:"Central Brazilian Standard Time",zone:"America/Campo_Grande",territory:"Campo Grande"},{other_zone:"SA Western Standard Time",zone:"America/La_Paz",territory:"La Paz"},{other_zone:"SA Western Standard Time",zone:"America/Antigua",territory:"Antigua"},{other_zone:"SA Western Standard Time",zone:"America/Anguilla",territory:"Anguilla"},{other_zone:"SA Western Standard Time",zone:"America/Aruba",territory:"Aruba"},{other_zone:"SA Western Standard Time",zone:"America/Barbados",territory:"Barbados"},{other_zone:"SA Western Standard Time",zone:"America/St_Barthelemy",territory:"St Barthelemy"},{other_zone:"SA Western Standard Time",zone:"America/Kralendijk",territory:"Kralendijk"},{other_zone:"SA Western Standard Time",zone:"America/Manaus",territory:"Manaus"},{other_zone:"SA Western Standard Time",zone:"America/Boa_Vista",territory:"Boa Vista"},{other_zone:"SA Western Standard Time",zone:"America/Eirunepe",territory:"Eirunepe"},{other_zone:"SA Western Standard Time",zone:"America/Porto_Velho",territory:"Porto Velho"},{other_zone:"SA Western Standard Time",zone:"America/Rio_Branco",territory:"Rio Branco"},{other_zone:"SA Western Standard Time",zone:"America/Blanc-Sablon",territory:"Blanc-Sablon"},{other_zone:"SA Western Standard Time",zone:"America/Curacao",territory:"Curacao"},{other_zone:"SA Western Standard Time",zone:"America/Dominica",territory:"Dominica"},{other_zone:"SA Western Standard Time",zone:"America/Santo_Domingo",territory:"Santo Domingo"},{other_zone:"SA Western Standard Time",zone:"America/Grenada",territory:"Grenada"},{other_zone:"SA Western Standard Time",zone:"America/Guadeloupe",territory:"Guadeloupe"},{other_zone:"SA Western Standard Time",zone:"America/Guyana",territory:"Guyana"},{other_zone:"SA Western Standard Time",zone:"America/St_Kitts",territory:"St Kitts"},{other_zone:"SA Western Standard Time",zone:"America/St_Lucia",territory:"St Lucia"},{other_zone:"SA Western Standard Time",zone:"America/Marigot",territory:"Marigot"},{other_zone:"SA Western Standard Time",zone:"America/Martinique",territory:"Martinique"},{other_zone:"SA Western Standard Time",zone:"America/Montserrat",territory:"Montserrat"},{other_zone:"SA Western Standard Time",zone:"America/Puerto_Rico",territory:"Puerto Rico"},{other_zone:"SA Western Standard Time",zone:"America/Lower_Princes",territory:"Lower Princes"},{other_zone:"SA Western Standard Time",zone:"America/Port_of_Spain",territory:"Port of Spain"},{other_zone:"SA Western Standard Time",zone:"America/St_Vincent",territory:"St Vincent"},{other_zone:"SA Western Standard Time",zone:"America/Tortola",territory:"Tortola"},{other_zone:"SA Western Standard Time",zone:"America/St_Thomas",territory:"St Thomas"},{other_zone:"SA Western Standard Time",zone:"Etc/GMT+4",territory:"GMT+4"},{other_zone:"Pacific SA Standard Time",zone:"America/Santiago",territory:"Santiago"},{other_zone:"Pacific SA Standard Time",zone:"Antarctica/Palmer",territory:"Palmer"},{other_zone:"Newfoundland Standard Time",zone:"America/St_Johns",territory:"St Johns"},{other_zone:"E. South America Standard Time",zone:"America/Sao_Paulo",territory:"Sao Paulo"},{other_zone:"E. South America Standard Time",zone:"America/Araguaina",territory:"Araguaina"},{other_zone:"Argentina Standard Time",zone:"America/Buenos_Aires",territory:"Buenos Aires"},{other_zone:"Argentina Standard Time",zone:"America/Argentina/La_Rioja",territory:"Argentina"},{other_zone:"Argentina Standard Time",zone:"America/Argentina/Rio_Gallegos",territory:"Argentina"},{other_zone:"Argentina Standard Time",zone:"America/Argentina/Salta",territory:"Argentina"},{other_zone:"Argentina Standard Time",zone:"America/Argentina/San_Juan",territory:"Argentina"},{other_zone:"Argentina Standard Time",zone:"America/Argentina/San_Luis",territory:"Argentina"},{other_zone:"Argentina Standard Time",zone:"America/Argentina/Tucuman",territory:"Argentina"},{other_zone:"Argentina Standard Time",zone:"America/Argentina/Ushuaia",territory:"Argentina"},{other_zone:"Argentina Standard Time",zone:"America/Catamarca",territory:"Catamarca"},{other_zone:"Argentina Standard Time",zone:"America/Cordoba",territory:"Cordoba"},{other_zone:"Argentina Standard Time",zone:"America/Jujuy",territory:"Jujuy"},{other_zone:"Argentina Standard Time",zone:"America/Mendoza",territory:"Mendoza"},{other_zone:"SA Eastern Standard Time",zone:"America/Cayenne",territory:"Cayenne"},{other_zone:"SA Eastern Standard Time",zone:"Antarctica/Rothera",territory:"Rothera"},{other_zone:"SA Eastern Standard Time",zone:"America/Fortaleza",territory:"Fortaleza"},{other_zone:"SA Eastern Standard Time",zone:"America/Belem",territory:"Belem"},{other_zone:"SA Eastern Standard Time",zone:"America/Maceio",territory:"Maceio"},{other_zone:"SA Eastern Standard Time",zone:"America/Recife",territory:"Recife"},{other_zone:"SA Eastern Standard Time",zone:"America/Santarem",territory:"Santarem"},{other_zone:"SA Eastern Standard Time",zone:"Atlantic/Stanley",territory:"Stanley"},{other_zone:"SA Eastern Standard Time",zone:"America/Paramaribo",territory:"Paramaribo"},{other_zone:"SA Eastern Standard Time",zone:"Etc/GMT+3",territory:"GMT+3"},{other_zone:"Greenland Standard Time",zone:"America/Godthab",territory:"Godthab"},{other_zone:"Montevideo Standard Time",zone:"America/Montevideo",territory:"Montevideo"},{other_zone:"Bahia Standard Time",zone:"America/Bahia",territory:"Bahia"},{other_zone:"UTC-02",zone:"Etc/GMT+2",territory:"GMT+2"},{other_zone:"UTC-02",zone:"America/Noronha",territory:"Noronha"},{other_zone:"UTC-02",zone:"Atlantic/South_Georgia",territory:"South Georgia"},{other_zone:"Azores Standard Time",zone:"Atlantic/Azores",territory:"Azores"},{other_zone:"Azores Standard Time",zone:"America/Scoresbysund",territory:"Scoresbysund"},{other_zone:"Cape Verde Standard Time",zone:"Atlantic/Cape_Verde",territory:"Cape Verde"},{other_zone:"Cape Verde Standard Time",zone:"Etc/GMT+1",territory:"GMT+1"},{other_zone:"Morocco Standard Time",zone:"Africa/Casablanca",territory:"Casablanca"},{other_zone:"UTC",zone:"Etc/GMT",territory:"GMT"},{other_zone:"UTC",zone:"America/Danmarkshavn",territory:"Danmarkshavn"},{other_zone:"GMT Standard Time",zone:"Europe/London",territory:"London"},{other_zone:"GMT Standard Time",zone:"Atlantic/Canary",territory:"Canary"},{other_zone:"GMT Standard Time",zone:"Atlantic/Faeroe",territory:"Faeroe"},{other_zone:"GMT Standard Time",zone:"Europe/Guernsey",territory:"Guernsey"},{other_zone:"GMT Standard Time",zone:"Europe/Dublin",territory:"Dublin"},{other_zone:"GMT Standard Time",zone:"Europe/Isle_of_Man",territory:"Isle of Man"},{other_zone:"GMT Standard Time",zone:"Europe/Jersey",territory:"Jersey"},{other_zone:"GMT Standard Time",zone:"Europe/Lisbon",territory:"Lisbon"},{other_zone:"GMT Standard Time",zone:"Atlantic/Madeira",territory:"Madeira"},{other_zone:"Greenwich Standard Time",zone:"Atlantic/Reykjavik",territory:"Reykjavik"},{other_zone:"Greenwich Standard Time",zone:"Africa/Ouagadougou",territory:"Ouagadougou"},{other_zone:"Greenwich Standard Time",zone:"Africa/Abidjan",territory:"Abidjan"},{other_zone:"Greenwich Standard Time",zone:"Africa/El_Aaiun",territory:"El Aaiun"},{other_zone:"Greenwich Standard Time",zone:"Africa/Accra",territory:"Accra"},{other_zone:"Greenwich Standard Time",zone:"Africa/Banjul",territory:"Banjul"},{other_zone:"Greenwich Standard Time",zone:"Africa/Conakry",territory:"Conakry"},{other_zone:"Greenwich Standard Time",zone:"Africa/Bissau",territory:"Bissau"},{other_zone:"Greenwich Standard Time",zone:"Africa/Monrovia",territory:"Monrovia"},{other_zone:"Greenwich Standard Time",zone:"Africa/Bamako",territory:"Bamako"},{other_zone:"Greenwich Standard Time",zone:"Africa/Nouakchott",territory:"Nouakchott"},{other_zone:"Greenwich Standard Time",zone:"Atlantic/St_Helena",territory:"St Helena"},{other_zone:"Greenwich Standard Time",zone:"Africa/Freetown",territory:"Freetown"},{other_zone:"Greenwich Standard Time",zone:"Africa/Dakar",territory:"Dakar"},{other_zone:"Greenwich Standard Time",zone:"Africa/Sao_Tome",territory:"Sao Tome"},{other_zone:"Greenwich Standard Time",zone:"Africa/Lome",territory:"Lome"},{other_zone:"W. Europe Standard Time",zone:"Europe/Berlin",territory:"Berlin"},{other_zone:"W. Europe Standard Time",zone:"Europe/Andorra",territory:"Andorra"},{other_zone:"W. Europe Standard Time",zone:"Europe/Vienna",territory:"Vienna"},{other_zone:"W. Europe Standard Time",zone:"Europe/Zurich",territory:"Zurich"},{other_zone:"W. Europe Standard Time",zone:"Europe/Busingen",territory:"Busingen"},{other_zone:"W. Europe Standard Time",zone:"Europe/Gibraltar",territory:"Gibraltar"},{other_zone:"W. Europe Standard Time",zone:"Europe/Rome",territory:"Rome"},{other_zone:"W. Europe Standard Time",zone:"Europe/Vaduz",territory:"Vaduz"},{other_zone:"W. Europe Standard Time",zone:"Europe/Luxembourg",territory:"Luxembourg"},{other_zone:"W. Europe Standard Time",zone:"Africa/Tripoli",territory:"Tripoli"},{other_zone:"W. Europe Standard Time",zone:"Europe/Monaco",territory:"Monaco"},{other_zone:"W. Europe Standard Time",zone:"Europe/Malta",territory:"Malta"},{other_zone:"W. Europe Standard Time",zone:"Europe/Amsterdam",territory:"Amsterdam"},{other_zone:"W. Europe Standard Time",
zone:"Europe/Oslo",territory:"Oslo"},{other_zone:"W. Europe Standard Time",zone:"Europe/Stockholm",territory:"Stockholm"},{other_zone:"W. Europe Standard Time",zone:"Arctic/Longyearbyen",territory:"Longyearbyen"},{other_zone:"W. Europe Standard Time",zone:"Europe/San_Marino",territory:"San Marino"},{other_zone:"W. Europe Standard Time",zone:"Europe/Vatican",territory:"Vatican"},{other_zone:"Central Europe Standard Time",zone:"Europe/Budapest",territory:"Budapest"},{other_zone:"Central Europe Standard Time",zone:"Europe/Tirane",territory:"Tirane"},{other_zone:"Central Europe Standard Time",zone:"Europe/Prague",territory:"Prague"},{other_zone:"Central Europe Standard Time",zone:"Europe/Podgorica",territory:"Podgorica"},{other_zone:"Central Europe Standard Time",zone:"Europe/Belgrade",territory:"Belgrade"},{other_zone:"Central Europe Standard Time",zone:"Europe/Ljubljana",territory:"Ljubljana"},{other_zone:"Central Europe Standard Time",zone:"Europe/Bratislava",territory:"Bratislava"},{other_zone:"Romance Standard Time",zone:"Europe/Paris",territory:"Paris"},{other_zone:"Romance Standard Time",zone:"Europe/Brussels",territory:"Brussels"},{other_zone:"Romance Standard Time",zone:"Europe/Copenhagen",territory:"Copenhagen"},{other_zone:"Romance Standard Time",zone:"Europe/Madrid",territory:"Madrid"},{other_zone:"Romance Standard Time",zone:"Africa/Ceuta",territory:"Ceuta"},{other_zone:"Central European Standard Time",zone:"Europe/Warsaw",territory:"Warsaw"},{other_zone:"Central European Standard Time",zone:"Europe/Sarajevo",territory:"Sarajevo"},{other_zone:"Central European Standard Time",zone:"Europe/Zagreb",territory:"Zagreb"},{other_zone:"Central European Standard Time",zone:"Europe/Skopje",territory:"Skopje"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Lagos",territory:"Lagos"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Luanda",territory:"Luanda"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Porto-Novo",territory:"Porto-Novo"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Kinshasa",territory:"Kinshasa"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Bangui",territory:"Bangui"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Brazzaville",territory:"Brazzaville"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Douala",territory:"Douala"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Algiers",territory:"Algiers"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Libreville",territory:"Libreville"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Malabo",territory:"Malabo"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Niamey",territory:"Niamey"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Ndjamena",territory:"Ndjamena"},{other_zone:"W. Central Africa Standard Time",zone:"Africa/Tunis",territory:"Tunis"},{other_zone:"W. Central Africa Standard Time",zone:"Etc/GMT-1",territory:"GMT-1"},{other_zone:"Namibia Standard Time",zone:"Africa/Windhoek",territory:"Windhoek"},{other_zone:"GTB Standard Time",zone:"Europe/Bucharest",territory:"Bucharest"},{other_zone:"GTB Standard Time",zone:"Europe/Athens",territory:"Athens"},{other_zone:"GTB Standard Time",zone:"Europe/Chisinau",territory:"Chisinau"},{other_zone:"Middle East Standard Time",zone:"Asia/Beirut",territory:"Beirut"},{other_zone:"Egypt Standard Time",zone:"Africa/Cairo",territory:"Cairo"},{other_zone:"Egypt Standard Time",zone:"Asia/Gaza",territory:"Gaza"},{other_zone:"Egypt Standard Time",zone:"Asia/Hebron",territory:"Hebron"},{other_zone:"Syria Standard Time",zone:"Asia/Damascus",territory:"Damascus"},{other_zone:"E. Europe Standard Time",zone:"Asia/Nicosia",territory:"Nicosia"},{other_zone:"South Africa Standard Time",zone:"Africa/Johannesburg",territory:"Johannesburg"},{other_zone:"South Africa Standard Time",zone:"Africa/Bujumbura",territory:"Bujumbura"},{other_zone:"South Africa Standard Time",zone:"Africa/Gaborone",territory:"Gaborone"},{other_zone:"South Africa Standard Time",zone:"Africa/Lubumbashi",territory:"Lubumbashi"},{other_zone:"South Africa Standard Time",zone:"Africa/Maseru",territory:"Maseru"},{other_zone:"South Africa Standard Time",zone:"Africa/Blantyre",territory:"Blantyre"},{other_zone:"South Africa Standard Time",zone:"Africa/Maputo",territory:"Maputo"},{other_zone:"South Africa Standard Time",zone:"Africa/Kigali",territory:"Kigali"},{other_zone:"South Africa Standard Time",zone:"Africa/Mbabane",territory:"Mbabane"},{other_zone:"South Africa Standard Time",zone:"Africa/Lusaka",territory:"Lusaka"},{other_zone:"South Africa Standard Time",zone:"Africa/Harare",territory:"Harare"},{other_zone:"South Africa Standard Time",zone:"Etc/GMT-2",territory:"GMT-2"},{other_zone:"FLE Standard Time",zone:"Europe/Kiev",territory:"Kiev"},{other_zone:"FLE Standard Time",zone:"Europe/Mariehamn",territory:"Mariehamn"},{other_zone:"FLE Standard Time",zone:"Europe/Sofia",territory:"Sofia"},{other_zone:"FLE Standard Time",zone:"Europe/Tallinn",territory:"Tallinn"},{other_zone:"FLE Standard Time",zone:"Europe/Helsinki",territory:"Helsinki"},{other_zone:"FLE Standard Time",zone:"Europe/Vilnius",territory:"Vilnius"},{other_zone:"FLE Standard Time",zone:"Europe/Riga",territory:"Riga"},{other_zone:"FLE Standard Time",zone:"Europe/Simferopol",territory:"Simferopol"},{other_zone:"FLE Standard Time",zone:"Europe/Uzhgorod",territory:"Uzhgorod"},{other_zone:"FLE Standard Time",zone:"Europe/Zaporozhye",territory:"Zaporozhye"},{other_zone:"Turkey Standard Time",zone:"Europe/Istanbul",territory:"Istanbul"},{other_zone:"Israel Standard Time",zone:"Asia/Jerusalem",territory:"Jerusalem"},{other_zone:"Jordan Standard Time",zone:"Asia/Amman",territory:"Amman"},{other_zone:"Arabic Standard Time",zone:"Asia/Baghdad",territory:"Baghdad"},{other_zone:"Kaliningrad Standard Time",zone:"Europe/Kaliningrad",territory:"Kaliningrad"},{other_zone:"Kaliningrad Standard Time",zone:"Europe/Minsk",territory:"Minsk"},{other_zone:"Arab Standard Time",zone:"Asia/Riyadh",territory:"Riyadh"},{other_zone:"Arab Standard Time",zone:"Asia/Bahrain",territory:"Bahrain"},{other_zone:"Arab Standard Time",zone:"Asia/Kuwait",territory:"Kuwait"},{other_zone:"Arab Standard Time",zone:"Asia/Qatar",territory:"Qatar"},{other_zone:"Arab Standard Time",zone:"Asia/Aden",territory:"Aden"},{other_zone:"E. Africa Standard Time",zone:"Africa/Nairobi",territory:"Nairobi"},{other_zone:"E. Africa Standard Time",zone:"Antarctica/Syowa",territory:"Syowa"},{other_zone:"E. Africa Standard Time",zone:"Africa/Djibouti",territory:"Djibouti"},{other_zone:"E. Africa Standard Time",zone:"Africa/Asmera",territory:"Asmera"},{other_zone:"E. Africa Standard Time",zone:"Africa/Addis_Ababa",territory:"Addis Ababa"},{other_zone:"E. Africa Standard Time",zone:"Indian/Comoro",territory:"Comoro"},{other_zone:"E. Africa Standard Time",zone:"Indian/Antananarivo",territory:"Antananarivo"},{other_zone:"E. Africa Standard Time",zone:"Africa/Khartoum",territory:"Khartoum"},{other_zone:"E. Africa Standard Time",zone:"Africa/Mogadishu",territory:"Mogadishu"},{other_zone:"E. Africa Standard Time",zone:"Africa/Juba",territory:"Juba"},{other_zone:"E. Africa Standard Time",zone:"Africa/Dar_es_Salaam",territory:"Dar es Salaam"},{other_zone:"E. Africa Standard Time",zone:"Africa/Kampala",territory:"Kampala"},{other_zone:"E. Africa Standard Time",zone:"Indian/Mayotte",territory:"Mayotte"},{other_zone:"E. Africa Standard Time",zone:"Etc/GMT-3",territory:"GMT-3"},{other_zone:"Iran Standard Time",zone:"Asia/Tehran",territory:"Tehran"},{other_zone:"Arabian Standard Time",zone:"Asia/Dubai",territory:"Dubai"},{other_zone:"Arabian Standard Time",zone:"Asia/Muscat",territory:"Muscat"},{other_zone:"Arabian Standard Time",zone:"Etc/GMT-4",territory:"GMT-4"},{other_zone:"Azerbaijan Standard Time",zone:"Asia/Baku",territory:"Baku"},{other_zone:"Russian Standard Time",zone:"Europe/Moscow",territory:"Moscow"},{other_zone:"Russian Standard Time",zone:"Europe/Samara",territory:"Samara"},{other_zone:"Russian Standard Time",zone:"Europe/Volgograd",territory:"Volgograd"},{other_zone:"Mauritius Standard Time",zone:"Indian/Mauritius",territory:"Mauritius"},{other_zone:"Mauritius Standard Time",zone:"Indian/Reunion",territory:"Reunion"},{other_zone:"Mauritius Standard Time",zone:"Indian/Mahe",territory:"Mahe"},{other_zone:"Georgian Standard Time",zone:"Asia/Tbilisi",territory:"Tbilisi"},{other_zone:"Caucasus Standard Time",zone:"Asia/Yerevan",territory:"Yerevan"},{other_zone:"Afghanistan Standard Time",zone:"Asia/Kabul",territory:"Kabul"},{other_zone:"Pakistan Standard Time",zone:"Asia/Karachi",territory:"Karachi"},{other_zone:"West Asia Standard Time",zone:"Asia/Tashkent",territory:"Tashkent"},{other_zone:"West Asia Standard Time",zone:"Antarctica/Mawson",territory:"Mawson"},{other_zone:"West Asia Standard Time",zone:"Asia/Oral",territory:"Oral"},{other_zone:"West Asia Standard Time",zone:"Asia/Aqtau",territory:"Aqtau"},{other_zone:"West Asia Standard Time",zone:"Asia/Aqtobe",territory:"Aqtobe"},{other_zone:"West Asia Standard Time",zone:"Indian/Maldives",territory:"Maldives"},{other_zone:"West Asia Standard Time",zone:"Indian/Kerguelen",territory:"Kerguelen"},{other_zone:"West Asia Standard Time",zone:"Asia/Dushanbe",territory:"Dushanbe"},{other_zone:"West Asia Standard Time",zone:"Asia/Ashgabat",territory:"Ashgabat"},{other_zone:"West Asia Standard Time",zone:"Asia/Samarkand",territory:"Samarkand"},{other_zone:"West Asia Standard Time",zone:"Etc/GMT-5",territory:"GMT-5"},{other_zone:"India Standard Time",zone:"Asia/Calcutta",territory:"Calcutta"},{other_zone:"Sri Lanka Standard Time",zone:"Asia/Colombo",territory:"Colombo"},{other_zone:"Nepal Standard Time",zone:"Asia/Katmandu",territory:"Katmandu"},{other_zone:"Central Asia Standard Time",zone:"Asia/Almaty",territory:"Almaty"},{other_zone:"Central Asia Standard Time",zone:"Antarctica/Vostok",territory:"Vostok"},{other_zone:"Central Asia Standard Time",zone:"Indian/Chagos",territory:"Chagos"},{other_zone:"Central Asia Standard Time",zone:"Asia/Bishkek",territory:"Bishkek"},{other_zone:"Central Asia Standard Time",zone:"Asia/Qyzylorda",territory:"Qyzylorda"},{other_zone:"Central Asia Standard Time",zone:"Etc/GMT-6",territory:"GMT-6"},{other_zone:"Bangladesh Standard Time",zone:"Asia/Dhaka",territory:"Dhaka"},{other_zone:"Bangladesh Standard Time",zone:"Asia/Thimphu",territory:"Thimphu"},{other_zone:"Ekaterinburg Standard Time",zone:"Asia/Yekaterinburg",territory:"Yekaterinburg"},{other_zone:"Myanmar Standard Time",zone:"Asia/Rangoon",territory:"Rangoon"},{other_zone:"Myanmar Standard Time",zone:"Indian/Cocos",territory:"Cocos"},{other_zone:"SE Asia Standard Time",zone:"Asia/Bangkok",territory:"Bangkok"},{other_zone:"SE Asia Standard Time",zone:"Antarctica/Davis",territory:"Davis"},{other_zone:"SE Asia Standard Time",zone:"Indian/Christmas",territory:"Christmas"},{other_zone:"SE Asia Standard Time",zone:"Asia/Jakarta",territory:"Jakarta"},{other_zone:"SE Asia Standard Time",zone:"Asia/Pontianak",territory:"Pontianak"},{other_zone:"SE Asia Standard Time",zone:"Asia/Phnom_Penh",territory:"Phnom Penh"},{other_zone:"SE Asia Standard Time",zone:"Asia/Vientiane",territory:"Vientiane"},{other_zone:"SE Asia Standard Time",zone:"Asia/Hovd",territory:"Hovd"},{other_zone:"SE Asia Standard Time",zone:"Asia/Saigon",territory:"Saigon"},{other_zone:"SE Asia Standard Time",zone:"Etc/GMT-7",territory:"GMT-7"},{other_zone:"N. Central Asia Standard Time",zone:"Asia/Novosibirsk",territory:"Novosibirsk"},{other_zone:"N. Central Asia Standard Time",zone:"Asia/Novokuznetsk",territory:"Novokuznetsk"},{other_zone:"N. Central Asia Standard Time",zone:"Asia/Omsk",territory:"Omsk"},{other_zone:"China Standard Time",zone:"Asia/Shanghai",territory:"Shanghai"},{other_zone:"China Standard Time",zone:"Asia/Chongqing",territory:"Chongqing"},{other_zone:"China Standard Time",zone:"Asia/Harbin",territory:"Harbin"},{other_zone:"China Standard Time",zone:"Asia/Kashgar",territory:"Kashgar"},{other_zone:"China Standard Time",zone:"Asia/Urumqi",territory:"Urumqi"},{other_zone:"China Standard Time",zone:"Asia/Hong_Kong",territory:"Hong Kong"},{other_zone:"China Standard Time",zone:"Asia/Macau",territory:"Macau"},{other_zone:"North Asia Standard Time",zone:"Asia/Krasnoyarsk",territory:"Krasnoyarsk"},{other_zone:"Singapore Standard Time",zone:"Asia/Singapore",territory:"Singapore"},{other_zone:"Singapore Standard Time",zone:"Asia/Brunei",territory:"Brunei"},{other_zone:"Singapore Standard Time",zone:"Asia/Makassar",territory:"Makassar"},{other_zone:"Singapore Standard Time",zone:"Asia/Kuala_Lumpur",territory:"Kuala Lumpur"},{other_zone:"Singapore Standard Time",zone:"Asia/Kuching",territory:"Kuching"},{other_zone:"Singapore Standard Time",zone:"Asia/Manila",territory:"Manila"},{other_zone:"Singapore Standard Time",zone:"Etc/GMT-8",territory:"GMT-8"},{other_zone:"W. Australia Standard Time",zone:"Australia/Perth",territory:"Perth"},{other_zone:"W. Australia Standard Time",zone:"Antarctica/Casey",territory:"Casey"},{other_zone:"Taipei Standard Time",zone:"Asia/Taipei",territory:"Taipei"},{other_zone:"Ulaanbaatar Standard Time",zone:"Asia/Ulaanbaatar",territory:"Ulaanbaatar"},{other_zone:"Ulaanbaatar Standard Time",zone:"Asia/Choibalsan",territory:"Choibalsan"},{other_zone:"North Asia East Standard Time",zone:"Asia/Irkutsk",territory:"Irkutsk"},{other_zone:"Tokyo Standard Time",zone:"Asia/Tokyo",territory:"Tokyo"},{other_zone:"Tokyo Standard Time",zone:"Asia/Jayapura",territory:"Jayapura"},{other_zone:"Tokyo Standard Time",zone:"Pacific/Palau",territory:"Palau"},{other_zone:"Tokyo Standard Time",zone:"Asia/Dili",territory:"Dili"},{other_zone:"Tokyo Standard Time",zone:"Etc/GMT-9",territory:"GMT-9"},{other_zone:"Korea Standard Time",zone:"Asia/Seoul",territory:"Seoul"},{other_zone:"Korea Standard Time",zone:"Asia/Pyongyang",territory:"Pyongyang"},{other_zone:"Cen. Australia Standard Time",zone:"Australia/Adelaide",territory:"Adelaide"},{other_zone:"Cen. Australia Standard Time",zone:"Australia/Broken_Hill",territory:"Broken Hill"},{other_zone:"AUS Central Standard Time",zone:"Australia/Darwin",territory:"Darwin"},{other_zone:"E. Australia Standard Time",zone:"Australia/Brisbane",territory:"Brisbane"},{other_zone:"E. Australia Standard Time",zone:"Australia/Lindeman",territory:"Lindeman"},{other_zone:"AUS Eastern Standard Time",zone:"Australia/Sydney",territory:"Sydney"},{other_zone:"AUS Eastern Standard Time",zone:"Australia/Melbourne",territory:"Melbourne"},{other_zone:"West Pacific Standard Time",zone:"Pacific/Port_Moresby",territory:"Port Moresby"},{other_zone:"West Pacific Standard Time",zone:"Antarctica/DumontDUrville",territory:"DumontDUrville"},{other_zone:"West Pacific Standard Time",zone:"Pacific/Truk",territory:"Truk"},{other_zone:"West Pacific Standard Time",zone:"Pacific/Guam",territory:"Guam"},{other_zone:"West Pacific Standard Time",zone:"Pacific/Saipan",territory:"Saipan"},{other_zone:"West Pacific Standard Time",zone:"Etc/GMT-10",territory:"GMT-10"},{other_zone:"Tasmania Standard Time",zone:"Australia/Hobart",territory:"Hobart"},{other_zone:"Tasmania Standard Time",zone:"Australia/Currie",territory:"Currie"},{other_zone:"Yakutsk Standard Time",zone:"Asia/Yakutsk",territory:"Yakutsk"},{other_zone:"Yakutsk Standard Time",zone:"Asia/Khandyga",territory:"Khandyga"},{other_zone:"Central Pacific Standard Time",zone:"Pacific/Guadalcanal",territory:"Guadalcanal"},{other_zone:"Central Pacific Standard Time",zone:"Antarctica/Macquarie",territory:"Macquarie"},{other_zone:"Central Pacific Standard Time",zone:"Pacific/Ponape",territory:"Ponape"},{other_zone:"Central Pacific Standard Time",zone:"Pacific/Kosrae",territory:"Kosrae"},{other_zone:"Central Pacific Standard Time",zone:"Pacific/Noumea",territory:"Noumea"},{other_zone:"Central Pacific Standard Time",zone:"Pacific/Efate",territory:"Efate"},{other_zone:"Central Pacific Standard Time",zone:"Etc/GMT-11",territory:"GMT-11"},{other_zone:"Vladivostok Standard Time",zone:"Asia/Vladivostok",territory:"Vladivostok"},{other_zone:"Vladivostok Standard Time",zone:"Asia/Sakhalin",territory:"Sakhalin"},{other_zone:"Vladivostok Standard Time",zone:"Asia/Ust-Nera",territory:"Ust-Nera"},{other_zone:"New Zealand Standard Time",zone:"Pacific/Auckland",territory:"Auckland"},{other_zone:"New Zealand Standard Time",zone:"Antarctica/South_Pole",territory:"South Pole"},{other_zone:"New Zealand Standard Time",zone:"Antarctica/McMurdo",territory:"McMurdo"},{other_zone:"UTC+12",zone:"Etc/GMT-12",territory:"GMT-12"},{other_zone:"UTC+12",zone:"Pacific/Tarawa",territory:"Tarawa"},{other_zone:"UTC+12",zone:"Pacific/Majuro",territory:"Majuro"},{other_zone:"UTC+12",zone:"Pacific/Kwajalein",territory:"Kwajalein"},{other_zone:"UTC+12",zone:"Pacific/Nauru",territory:"Nauru"},{other_zone:"UTC+12",zone:"Pacific/Funafuti",territory:"Funafuti"},{other_zone:"UTC+12",zone:"Pacific/Wake",territory:"Wake"},{other_zone:"UTC+12",zone:"Pacific/Wallis",territory:"Wallis"},{other_zone:"Fiji Standard Time",zone:"Pacific/Fiji",territory:"Fiji"},{other_zone:"Magadan Standard Time",zone:"Asia/Magadan",territory:"Magadan"},{other_zone:"Magadan Standard Time",zone:"Asia/Anadyr",territory:"Anadyr"},{other_zone:"Magadan Standard Time",zone:"Asia/Kamchatka",territory:"Kamchatka"},{other_zone:"Tonga Standard Time",zone:"Pacific/Tongatapu",territory:"Tongatapu"},{other_zone:"Tonga Standard Time",zone:"Pacific/Enderbury",territory:"Enderbury"},{other_zone:"Tonga Standard Time",zone:"Pacific/Fakaofo",territory:"Fakaofo"},{other_zone:"Tonga Standard Time",zone:"Etc/GMT-13",territory:"GMT-13"},{other_zone:"Samoa Standard Time",zone:"Pacific/Apia",territory:"Apia"}],a},"function"==typeof define&&define.amd?define:function(a,n,r){(r||n)()});
//# sourceMappingURL=kendo.timezones.min.js.map





//download.js v3.0, by dandavis; 2008-2014. [CCBY2] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support

// data can be a string, Blob, File, or dataURL

		 
						 
						 
function download(data, strFileName, strMimeType) {
	
	var self = window, // this script is only for browsers anyway...
		u = "application/octet-stream", // this default mime also triggers iframe downloads
		m = strMimeType || u, 
		x = data,
		D = document,
		a = D.createElement("a"),
		z = function(a){return String(a);},
		
		
		B = self.Blob || self.MozBlob || self.WebKitBlob || z,
		BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
		fn = strFileName || "download",
		blob, 
		b,
		ua,
		fr;

	//if(typeof B.bind === 'function' ){ B=B.bind(self); }
	
	if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
		x=[x, m];
		m=x[0];
		x=x[1]; 
	}
	
	
	
	//go ahead and download dataURLs right away
	if(String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)){
		return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
			navigator.msSaveBlob(d2b(x), fn) : 
			saver(x) ; // everyone else can save dataURLs un-processed
	}//end if dataURL passed?
	
	try{
	
		blob = x instanceof B ? 
			x : 
			new B([x], {type: m}) ;
	}catch(y){
		if(BB){
			b = new BB();
			b.append([x]);
			blob = b.getBlob(m); // the blob
		}
		
	}
	
	
	
	function d2b(u) {
		var p= u.split(/[:;,]/),
		t= p[1],
		dec= p[2] == "base64" ? atob : decodeURIComponent,
		bin= dec(p.pop()),
		mx= bin.length,
		i= 0,
		uia= new Uint8Array(mx);

		for(i;i<mx;++i) uia[i]= bin.charCodeAt(i);

		return new B([uia], {type: t});
	 }
	  
	function saver(url, winMode){
		
		
		if ('download' in a) { //html5 A[download] 			
			a.href = url;
			a.setAttribute("download", fn);
			a.innerHTML = "downloading...";
			D.body.appendChild(a);
			setTimeout(function() {
				a.click();
				D.body.removeChild(a);
				if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(a.href);}, 250 );}
			}, 66);
			return true;
		}
		
		//do iframe dataURL download (old ch+FF):
		var f = D.createElement("iframe");
		D.body.appendChild(f);
		if(!winMode){ // force a mime that will download:
			url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
		}
		 
	
		f.src = url;
		setTimeout(function(){ D.body.removeChild(f); }, 333);
		
	}//end saver 
		

	if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
		return navigator.msSaveBlob(blob, fn);
	} 	
	
	if(self.URL){ // simple fast and modern way using Blob and URL:
		saver(self.URL.createObjectURL(blob), true);
	}else{
		// handle non-Blob()+non-URL browsers:
		if(typeof blob === "string" || blob.constructor===z ){
			try{
				return saver( "data:" +  m   + ";base64,"  +  self.btoa(blob)  ); 
			}catch(y){
				return saver( "data:" +  m   + "," + encodeURIComponent(blob)  ); 
			}
		}
		
		// Blob but not URL:
		fr=new FileReader();
		fr.onload=function(e){
			saver(this.result); 
		};
		fr.readAsDataURL(blob);
	}	
	return true;
} /* end download() */






// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// This is CodeMirror (https://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.CodeMirror = factory());
}(this, (function () { 'use strict';

  // Kludges for bugs and behavior differences that can't be feature
  // detected are enabled based on userAgent etc sniffing.
  var userAgent = navigator.userAgent;
  var platform = navigator.platform;

  var gecko = /gecko\/\d/i.test(userAgent);
  var ie_upto10 = /MSIE \d/.test(userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
  var edge = /Edge\/(\d+)/.exec(userAgent);
  var ie = ie_upto10 || ie_11up || edge;
  var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
  var webkit = !edge && /WebKit\//.test(userAgent);
  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
  var chrome = !edge && /Chrome\//.test(userAgent);
  var presto = /Opera\//.test(userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
  var phantom = /PhantomJS/.test(userAgent);

  var ios = !edge && /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
  var android = /Android/.test(userAgent);
  // This is woefully incomplete. Suggestions for alternative methods welcome.
  var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
  var mac = ios || /Mac/.test(platform);
  var chromeOS = /\bCrOS\b/.test(userAgent);
  var windows = /win/i.test(platform);

  var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
  if (presto_version) { presto_version = Number(presto_version[1]); }
  if (presto_version && presto_version >= 15) { presto = false; webkit = true; }
  // Some browsers use the wrong event properties to signal cmd/ctrl on OS X
  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
  var captureRightClick = gecko || (ie && ie_version >= 9);

  function classTest(cls) { return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*") }

  var rmClass = function(node, cls) {
    var current = node.className;
    var match = classTest(cls).exec(current);
    if (match) {
      var after = current.slice(match.index + match[0].length);
      node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
    }
  };

  function removeChildren(e) {
    for (var count = e.childNodes.length; count > 0; --count)
      { e.removeChild(e.firstChild); }
    return e
  }

  function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e)
  }

  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className) { e.className = className; }
    if (style) { e.style.cssText = style; }
    if (typeof content == "string") { e.appendChild(document.createTextNode(content)); }
    else if (content) { for (var i = 0; i < content.length; ++i) { e.appendChild(content[i]); } }
    return e
  }
  // wrapper for elt, which removes the elt from the accessibility tree
  function eltP(tag, content, className, style) {
    var e = elt(tag, content, className, style);
    e.setAttribute("role", "presentation");
    return e
  }

  var range;
  if (document.createRange) { range = function(node, start, end, endNode) {
    var r = document.createRange();
    r.setEnd(endNode || node, end);
    r.setStart(node, start);
    return r
  }; }
  else { range = function(node, start, end) {
    var r = document.body.createTextRange();
    try { r.moveToElementText(node.parentNode); }
    catch(e) { return r }
    r.collapse(true);
    r.moveEnd("character", end);
    r.moveStart("character", start);
    return r
  }; }

  function contains(parent, child) {
    if (child.nodeType == 3) // Android browser always returns false when child is a textnode
      { child = child.parentNode; }
    if (parent.contains)
      { return parent.contains(child) }
    do {
      if (child.nodeType == 11) { child = child.host; }
      if (child == parent) { return true }
    } while (child = child.parentNode)
  }

  function activeElt() {
    // IE and Edge may throw an "Unspecified Error" when accessing document.activeElement.
    // IE < 10 will throw when accessed while the page is loading or in an iframe.
    // IE > 9 and Edge will throw when accessed in an iframe if document.body is unavailable.
    var activeElement;
    try {
      activeElement = document.activeElement;
    } catch(e) {
      activeElement = document.body || null;
    }
    while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement)
      { activeElement = activeElement.shadowRoot.activeElement; }
    return activeElement
  }

  function addClass(node, cls) {
    var current = node.className;
    if (!classTest(cls).test(current)) { node.className += (current ? " " : "") + cls; }
  }
  function joinClasses(a, b) {
    var as = a.split(" ");
    for (var i = 0; i < as.length; i++)
      { if (as[i] && !classTest(as[i]).test(b)) { b += " " + as[i]; } }
    return b
  }

  var selectInput = function(node) { node.select(); };
  if (ios) // Mobile Safari apparently has a bug where select() is broken.
    { selectInput = function(node) { node.selectionStart = 0; node.selectionEnd = node.value.length; }; }
  else if (ie) // Suppress mysterious IE10 errors
    { selectInput = function(node) { try { node.select(); } catch(_e) {} }; }

  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){return f.apply(null, args)}
  }

  function copyObj(obj, target, overwrite) {
    if (!target) { target = {}; }
    for (var prop in obj)
      { if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
        { target[prop] = obj[prop]; } }
    return target
  }

  // Counts the column offset in a string, taking tabs into account.
  // Used mostly to find indentation.
  function countColumn(string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) { end = string.length; }
    }
    for (var i = startIndex || 0, n = startValue || 0;;) {
      var nextTab = string.indexOf("\t", i);
      if (nextTab < 0 || nextTab >= end)
        { return n + (end - i) }
      n += nextTab - i;
      n += tabSize - (n % tabSize);
      i = nextTab + 1;
    }
  }

  var Delayed = function() {
    this.id = null;
    this.f = null;
    this.time = 0;
    this.handler = bind(this.onTimeout, this);
  };
  Delayed.prototype.onTimeout = function (self) {
    self.id = 0;
    if (self.time <= +new Date) {
      self.f();
    } else {
      setTimeout(self.handler, self.time - +new Date);
    }
  };
  Delayed.prototype.set = function (ms, f) {
    this.f = f;
    var time = +new Date + ms;
    if (!this.id || time < this.time) {
      clearTimeout(this.id);
      this.id = setTimeout(this.handler, ms);
      this.time = time;
    }
  };

  function indexOf(array, elt) {
    for (var i = 0; i < array.length; ++i)
      { if (array[i] == elt) { return i } }
    return -1
  }

  // Number of pixels added to scroller and sizer to hide scrollbar
  var scrollerGap = 30;

  // Returned or thrown by various protocols to signal 'I'm not
  // handling this'.
  var Pass = {toString: function(){return "CodeMirror.Pass"}};

  // Reused option objects for setSelection & friends
  var sel_dontScroll = {scroll: false}, sel_mouse = {origin: "*mouse"}, sel_move = {origin: "+move"};

  // The inverse of countColumn -- find the offset that corresponds to
  // a particular column.
  function findColumn(string, goal, tabSize) {
    for (var pos = 0, col = 0;;) {
      var nextTab = string.indexOf("\t", pos);
      if (nextTab == -1) { nextTab = string.length; }
      var skipped = nextTab - pos;
      if (nextTab == string.length || col + skipped >= goal)
        { return pos + Math.min(skipped, goal - col) }
      col += nextTab - pos;
      col += tabSize - (col % tabSize);
      pos = nextTab + 1;
      if (col >= goal) { return pos }
    }
  }

  var spaceStrs = [""];
  function spaceStr(n) {
    while (spaceStrs.length <= n)
      { spaceStrs.push(lst(spaceStrs) + " "); }
    return spaceStrs[n]
  }

  function lst(arr) { return arr[arr.length-1] }

  function map(array, f) {
    var out = [];
    for (var i = 0; i < array.length; i++) { out[i] = f(array[i], i); }
    return out
  }

  function insertSorted(array, value, score) {
    var pos = 0, priority = score(value);
    while (pos < array.length && score(array[pos]) <= priority) { pos++; }
    array.splice(pos, 0, value);
  }

  function nothing() {}

  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing();
    }
    if (props) { copyObj(props, inst); }
    return inst
  }

  var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  function isWordCharBasic(ch) {
    return /\w/.test(ch) || ch > "\x80" &&
      (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch))
  }
  function isWordChar(ch, helper) {
    if (!helper) { return isWordCharBasic(ch) }
    if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) { return true }
    return helper.test(ch)
  }

  function isEmpty(obj) {
    for (var n in obj) { if (obj.hasOwnProperty(n) && obj[n]) { return false } }
    return true
  }

  // Extending unicode characters. A series of a non-extending char +
  // any number of extending chars is treated as a single unit as far
  // as editing and measuring is concerned. This is not fully correct,
  // since some scripts/fonts/browsers also treat other configurations
  // of code points as a group.
  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function isExtendingChar(ch) { return ch.charCodeAt(0) >= 768 && extendingChars.test(ch) }

  // Returns a number from the range [`0`; `str.length`] unless `pos` is outside that range.
  function skipExtendingChars(str, pos, dir) {
    while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) { pos += dir; }
    return pos
  }

  // Returns the value from the range [`from`; `to`] that satisfies
  // `pred` and is closest to `from`. Assumes that at least `to`
  // satisfies `pred`. Supports `from` being greater than `to`.
  function findFirst(pred, from, to) {
    // At any point we are certain `to` satisfies `pred`, don't know
    // whether `from` does.
    var dir = from > to ? -1 : 1;
    for (;;) {
      if (from == to) { return from }
      var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
      if (mid == from) { return pred(mid) ? from : to }
      if (pred(mid)) { to = mid; }
      else { from = mid + dir; }
    }
  }

  // BIDI HELPERS

  function iterateBidiSections(order, from, to, f) {
    if (!order) { return f(from, to, "ltr", 0) }
    var found = false;
    for (var i = 0; i < order.length; ++i) {
      var part = order[i];
      if (part.from < to && part.to > from || from == to && part.to == from) {
        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i);
        found = true;
      }
    }
    if (!found) { f(from, to, "ltr"); }
  }

  var bidiOther = null;
  function getBidiPartAt(order, ch, sticky) {
    var found;
    bidiOther = null;
    for (var i = 0; i < order.length; ++i) {
      var cur = order[i];
      if (cur.from < ch && cur.to > ch) { return i }
      if (cur.to == ch) {
        if (cur.from != cur.to && sticky == "before") { found = i; }
        else { bidiOther = i; }
      }
      if (cur.from == ch) {
        if (cur.from != cur.to && sticky != "before") { found = i; }
        else { bidiOther = i; }
      }
    }
    return found != null ? found : bidiOther
  }

  // Bidirectional ordering algorithm
  // See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
  // that this (partially) implements.

  // One-char codes used for character types:
  // L (L):   Left-to-Right
  // R (R):   Right-to-Left
  // r (AL):  Right-to-Left Arabic
  // 1 (EN):  European Number
  // + (ES):  European Number Separator
  // % (ET):  European Number Terminator
  // n (AN):  Arabic Number
  // , (CS):  Common Number Separator
  // m (NSM): Non-Spacing Mark
  // b (BN):  Boundary Neutral
  // s (B):   Paragraph Separator
  // t (S):   Segment Separator
  // w (WS):  Whitespace
  // N (ON):  Other Neutrals

  // Returns null if characters are ordered as they appear
  // (left-to-right), or an array of sections ({from, to, level}
  // objects) in the order in which they occur visually.
  var bidiOrdering = (function() {
    // Character types for codepoints 0 to 0xff
    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
    // Character types for codepoints 0x600 to 0x6f9
    var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
    function charType(code) {
      if (code <= 0xf7) { return lowTypes.charAt(code) }
      else if (0x590 <= code && code <= 0x5f4) { return "R" }
      else if (0x600 <= code && code <= 0x6f9) { return arabicTypes.charAt(code - 0x600) }
      else if (0x6ee <= code && code <= 0x8ac) { return "r" }
      else if (0x2000 <= code && code <= 0x200b) { return "w" }
      else if (code == 0x200c) { return "b" }
      else { return "L" }
    }

    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;

    function BidiSpan(level, from, to) {
      this.level = level;
      this.from = from; this.to = to;
    }

    return function(str, direction) {
      var outerType = direction == "ltr" ? "L" : "R";

      if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) { return false }
      var len = str.length, types = [];
      for (var i = 0; i < len; ++i)
        { types.push(charType(str.charCodeAt(i))); }

      // W1. Examine each non-spacing mark (NSM) in the level run, and
      // change the type of the NSM to the type of the previous
      // character. If the NSM is at the start of the level run, it will
      // get the type of sor.
      for (var i$1 = 0, prev = outerType; i$1 < len; ++i$1) {
        var type = types[i$1];
        if (type == "m") { types[i$1] = prev; }
        else { prev = type; }
      }

      // W2. Search backwards from each instance of a European number
      // until the first strong type (R, L, AL, or sor) is found. If an
      // AL is found, change the type of the European number to Arabic
      // number.
      // W3. Change all ALs to R.
      for (var i$2 = 0, cur = outerType; i$2 < len; ++i$2) {
        var type$1 = types[i$2];
        if (type$1 == "1" && cur == "r") { types[i$2] = "n"; }
        else if (isStrong.test(type$1)) { cur = type$1; if (type$1 == "r") { types[i$2] = "R"; } }
      }

      // W4. A single European separator between two European numbers
      // changes to a European number. A single common separator between
      // two numbers of the same type changes to that type.
      for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
        var type$2 = types[i$3];
        if (type$2 == "+" && prev$1 == "1" && types[i$3+1] == "1") { types[i$3] = "1"; }
        else if (type$2 == "," && prev$1 == types[i$3+1] &&
                 (prev$1 == "1" || prev$1 == "n")) { types[i$3] = prev$1; }
        prev$1 = type$2;
      }

      // W5. A sequence of European terminators adjacent to European
      // numbers changes to all European numbers.
      // W6. Otherwise, separators and terminators change to Other
      // Neutral.
      for (var i$4 = 0; i$4 < len; ++i$4) {
        var type$3 = types[i$4];
        if (type$3 == ",") { types[i$4] = "N"; }
        else if (type$3 == "%") {
          var end = (void 0);
          for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {}
          var replace = (i$4 && types[i$4-1] == "!") || (end < len && types[end] == "1") ? "1" : "N";
          for (var j = i$4; j < end; ++j) { types[j] = replace; }
          i$4 = end - 1;
        }
      }

      // W7. Search backwards from each instance of a European number
      // until the first strong type (R, L, or sor) is found. If an L is
      // found, then change the type of the European number to L.
      for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
        var type$4 = types[i$5];
        if (cur$1 == "L" && type$4 == "1") { types[i$5] = "L"; }
        else if (isStrong.test(type$4)) { cur$1 = type$4; }
      }

      // N1. A sequence of neutrals takes the direction of the
      // surrounding strong text if the text on both sides has the same
      // direction. European and Arabic numbers act as if they were R in
      // terms of their influence on neutrals. Start-of-level-run (sor)
      // and end-of-level-run (eor) are used at level run boundaries.
      // N2. Any remaining neutrals take the embedding direction.
      for (var i$6 = 0; i$6 < len; ++i$6) {
        if (isNeutral.test(types[i$6])) {
          var end$1 = (void 0);
          for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {}
          var before = (i$6 ? types[i$6-1] : outerType) == "L";
          var after = (end$1 < len ? types[end$1] : outerType) == "L";
          var replace$1 = before == after ? (before ? "L" : "R") : outerType;
          for (var j$1 = i$6; j$1 < end$1; ++j$1) { types[j$1] = replace$1; }
          i$6 = end$1 - 1;
        }
      }

      // Here we depart from the documented algorithm, in order to avoid
      // building up an actual levels array. Since there are only three
      // levels (0, 1, 2) in an implementation that doesn't take
      // explicit embedding into account, we can build up the order on
      // the fly, without following the level-based algorithm.
      var order = [], m;
      for (var i$7 = 0; i$7 < len;) {
        if (countsAsLeft.test(types[i$7])) {
          var start = i$7;
          for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {}
          order.push(new BidiSpan(0, start, i$7));
        } else {
          var pos = i$7, at = order.length, isRTL = direction == "rtl" ? 1 : 0;
          for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {}
          for (var j$2 = pos; j$2 < i$7;) {
            if (countsAsNum.test(types[j$2])) {
              if (pos < j$2) { order.splice(at, 0, new BidiSpan(1, pos, j$2)); at += isRTL; }
              var nstart = j$2;
              for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {}
              order.splice(at, 0, new BidiSpan(2, nstart, j$2));
              at += isRTL;
              pos = j$2;
            } else { ++j$2; }
          }
          if (pos < i$7) { order.splice(at, 0, new BidiSpan(1, pos, i$7)); }
        }
      }
      if (direction == "ltr") {
        if (order[0].level == 1 && (m = str.match(/^\s+/))) {
          order[0].from = m[0].length;
          order.unshift(new BidiSpan(0, 0, m[0].length));
        }
        if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
          lst(order).to -= m[0].length;
          order.push(new BidiSpan(0, len - m[0].length, len));
        }
      }

      return direction == "rtl" ? order.reverse() : order
    }
  })();

  // Get the bidi ordering for the given line (and cache it). Returns
  // false for lines that are fully left-to-right, and an array of
  // BidiSpan objects otherwise.
  function getOrder(line, direction) {
    var order = line.order;
    if (order == null) { order = line.order = bidiOrdering(line.text, direction); }
    return order
  }

  // EVENT HANDLING

  // Lightweight event framework. on/off also work on DOM nodes,
  // registering native DOM handlers.

  var noHandlers = [];

  var on = function(emitter, type, f) {
    if (emitter.addEventListener) {
      emitter.addEventListener(type, f, false);
    } else if (emitter.attachEvent) {
      emitter.attachEvent("on" + type, f);
    } else {
      var map$$1 = emitter._handlers || (emitter._handlers = {});
      map$$1[type] = (map$$1[type] || noHandlers).concat(f);
    }
  };

  function getHandlers(emitter, type) {
    return emitter._handlers && emitter._handlers[type] || noHandlers
  }

  function off(emitter, type, f) {
    if (emitter.removeEventListener) {
      emitter.removeEventListener(type, f, false);
    } else if (emitter.detachEvent) {
      emitter.detachEvent("on" + type, f);
    } else {
      var map$$1 = emitter._handlers, arr = map$$1 && map$$1[type];
      if (arr) {
        var index = indexOf(arr, f);
        if (index > -1)
          { map$$1[type] = arr.slice(0, index).concat(arr.slice(index + 1)); }
      }
    }
  }

  function signal(emitter, type /*, values...*/) {
    var handlers = getHandlers(emitter, type);
    if (!handlers.length) { return }
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < handlers.length; ++i) { handlers[i].apply(null, args); }
  }

  // The DOM events that CodeMirror handles can be overridden by
  // registering a (non-DOM) handler on the editor for the event name,
  // and preventDefault-ing the event in that handler.
  function signalDOMEvent(cm, e, override) {
    if (typeof e == "string")
      { e = {type: e, preventDefault: function() { this.defaultPrevented = true; }}; }
    signal(cm, override || e.type, cm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore
  }

  function signalCursorActivity(cm) {
    var arr = cm._handlers && cm._handlers.cursorActivity;
    if (!arr) { return }
    var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
    for (var i = 0; i < arr.length; ++i) { if (indexOf(set, arr[i]) == -1)
      { set.push(arr[i]); } }
  }

  function hasHandler(emitter, type) {
    return getHandlers(emitter, type).length > 0
  }

  // Add on and off methods to a constructor's prototype, to make
  // registering events on such objects more convenient.
  function eventMixin(ctor) {
    ctor.prototype.on = function(type, f) {on(this, type, f);};
    ctor.prototype.off = function(type, f) {off(this, type, f);};
  }

  // Due to the fact that we still support jurassic IE versions, some
  // compatibility wrappers are needed.

  function e_preventDefault(e) {
    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
  }
  function e_stopPropagation(e) {
    if (e.stopPropagation) { e.stopPropagation(); }
    else { e.cancelBubble = true; }
  }
  function e_defaultPrevented(e) {
    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false
  }
  function e_stop(e) {e_preventDefault(e); e_stopPropagation(e);}

  function e_target(e) {return e.target || e.srcElement}
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1) { b = 1; }
      else if (e.button & 2) { b = 3; }
      else if (e.button & 4) { b = 2; }
    }
    if (mac && e.ctrlKey && b == 1) { b = 3; }
    return b
  }

  // Detect drag-and-drop
  var dragAndDrop = function() {
    // There is *some* kind of drag-and-drop support in IE6-8, but I
    // couldn't get it to work yet.
    if (ie && ie_version < 9) { return false }
    var div = elt('div');
    return "draggable" in div || "dragDrop" in div
  }();

  var zwspSupported;
  function zeroWidthElement(measure) {
    if (zwspSupported == null) {
      var test = elt("span", "\u200b");
      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
      if (measure.firstChild.offsetHeight != 0)
        { zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8); }
    }
    var node = zwspSupported ? elt("span", "\u200b") :
      elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
    node.setAttribute("cm-text", "");
    return node
  }

  // Feature-detect IE's crummy client rect reporting for bidi text
  var badBidiRects;
  function hasBadBidiRects(measure) {
    if (badBidiRects != null) { return badBidiRects }
    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
    var r0 = range(txt, 0, 1).getBoundingClientRect();
    var r1 = range(txt, 1, 2).getBoundingClientRect();
    removeChildren(measure);
    if (!r0 || r0.left == r0.right) { return false } // Safari returns null in some cases (#2780)
    return badBidiRects = (r1.right - r0.right < 3)
  }

  // See if "".split is the broken IE version, if so, provide an
  // alternative way to split lines.
  var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function (string) {
    var pos = 0, result = [], l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1) { nl = string.length; }
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result
  } : function (string) { return string.split(/\r\n?|\n/); };

  var hasSelection = window.getSelection ? function (te) {
    try { return te.selectionStart != te.selectionEnd }
    catch(e) { return false }
  } : function (te) {
    var range$$1;
    try {range$$1 = te.ownerDocument.selection.createRange();}
    catch(e) {}
    if (!range$$1 || range$$1.parentElement() != te) { return false }
    return range$$1.compareEndPoints("StartToEnd", range$$1) != 0
  };

  var hasCopyEvent = (function () {
    var e = elt("div");
    if ("oncopy" in e) { return true }
    e.setAttribute("oncopy", "return;");
    return typeof e.oncopy == "function"
  })();

  var badZoomedRects = null;
  function hasBadZoomedRects(measure) {
    if (badZoomedRects != null) { return badZoomedRects }
    var node = removeChildrenAndAdd(measure, elt("span", "x"));
    var normal = node.getBoundingClientRect();
    var fromRange = range(node, 0, 1).getBoundingClientRect();
    return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1
  }

  // Known modes, by name and by MIME
  var modes = {}, mimeModes = {};

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  function defineMode(name, mode) {
    if (arguments.length > 2)
      { mode.dependencies = Array.prototype.slice.call(arguments, 2); }
    modes[name] = mode;
  }

  function defineMIME(mime, spec) {
    mimeModes[mime] = spec;
  }

  // Given a MIME type, a {name, ...options} config object, or a name
  // string, return a mode config object.
  function resolveMode(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string") { found = {name: found}; }
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return resolveMode("application/xml")
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
      return resolveMode("application/json")
    }
    if (typeof spec == "string") { return {name: spec} }
    else { return spec || {name: "null"} }
  }

  // Given a mode spec (anything that resolveMode accepts), find and
  // initialize an actual mode object.
  function getMode(options, spec) {
    spec = resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) { return getMode(options, "text/plain") }
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop in exts) {
        if (!exts.hasOwnProperty(prop)) { continue }
        if (modeObj.hasOwnProperty(prop)) { modeObj["_" + prop] = modeObj[prop]; }
        modeObj[prop] = exts[prop];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType) { modeObj.helperType = spec.helperType; }
    if (spec.modeProps) { for (var prop$1 in spec.modeProps)
      { modeObj[prop$1] = spec.modeProps[prop$1]; } }

    return modeObj
  }

  // This can be used to attach properties to mode objects from
  // outside the actual mode definition.
  var modeExtensions = {};
  function extendMode(mode, properties) {
    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : (modeExtensions[mode] = {});
    copyObj(properties, exts);
  }

  function copyState(mode, state) {
    if (state === true) { return state }
    if (mode.copyState) { return mode.copyState(state) }
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) { val = val.concat([]); }
      nstate[n] = val;
    }
    return nstate
  }

  // Given a mode and a state (for that mode), find the inner mode and
  // state at the position that the state refers to.
  function innerMode(mode, state) {
    var info;
    while (mode.innerMode) {
      info = mode.innerMode(state);
      if (!info || info.mode == mode) { break }
      state = info.state;
      mode = info.mode;
    }
    return info || {mode: mode, state: state}
  }

  function startState(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true
  }

  // STRING STREAM

  // Fed to the mode parsers, provides helper functions to make
  // parsers more succinct.

  var StringStream = function(string, tabSize, lineOracle) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
    this.lineOracle = lineOracle;
  };

  StringStream.prototype.eol = function () {return this.pos >= this.string.length};
  StringStream.prototype.sol = function () {return this.pos == this.lineStart};
  StringStream.prototype.peek = function () {return this.string.charAt(this.pos) || undefined};
  StringStream.prototype.next = function () {
    if (this.pos < this.string.length)
      { return this.string.charAt(this.pos++) }
  };
  StringStream.prototype.eat = function (match) {
    var ch = this.string.charAt(this.pos);
    var ok;
    if (typeof match == "string") { ok = ch == match; }
    else { ok = ch && (match.test ? match.test(ch) : match(ch)); }
    if (ok) {++this.pos; return ch}
  };
  StringStream.prototype.eatWhile = function (match) {
    var start = this.pos;
    while (this.eat(match)){}
    return this.pos > start
  };
  StringStream.prototype.eatSpace = function () {
      var this$1 = this;

    var start = this.pos;
    while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) { ++this$1.pos; }
    return this.pos > start
  };
  StringStream.prototype.skipToEnd = function () {this.pos = this.string.length;};
  StringStream.prototype.skipTo = function (ch) {
    var found = this.string.indexOf(ch, this.pos);
    if (found > -1) {this.pos = found; return true}
  };
  StringStream.prototype.backUp = function (n) {this.pos -= n;};
  StringStream.prototype.column = function () {
    if (this.lastColumnPos < this.start) {
      this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
      this.lastColumnPos = this.start;
    }
    return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0)
  };
  StringStream.prototype.indentation = function () {
    return countColumn(this.string, null, this.tabSize) -
      (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0)
  };
  StringStream.prototype.match = function (pattern, consume, caseInsensitive) {
    if (typeof pattern == "string") {
      var cased = function (str) { return caseInsensitive ? str.toLowerCase() : str; };
      var substr = this.string.substr(this.pos, pattern.length);
      if (cased(substr) == cased(pattern)) {
        if (consume !== false) { this.pos += pattern.length; }
        return true
      }
    } else {
      var match = this.string.slice(this.pos).match(pattern);
      if (match && match.index > 0) { return null }
      if (match && consume !== false) { this.pos += match[0].length; }
      return match
    }
  };
  StringStream.prototype.current = function (){return this.string.slice(this.start, this.pos)};
  StringStream.prototype.hideFirstChars = function (n, inner) {
    this.lineStart += n;
    try { return inner() }
    finally { this.lineStart -= n; }
  };
  StringStream.prototype.lookAhead = function (n) {
    var oracle = this.lineOracle;
    return oracle && oracle.lookAhead(n)
  };
  StringStream.prototype.baseToken = function () {
    var oracle = this.lineOracle;
    return oracle && oracle.baseToken(this.pos)
  };

  // Find the line object corresponding to the given line number.
  function getLine(doc, n) {
    n -= doc.first;
    if (n < 0 || n >= doc.size) { throw new Error("There is no line " + (n + doc.first) + " in the document.") }
    var chunk = doc;
    while (!chunk.lines) {
      for (var i = 0;; ++i) {
        var child = chunk.children[i], sz = child.chunkSize();
        if (n < sz) { chunk = child; break }
        n -= sz;
      }
    }
    return chunk.lines[n]
  }

  // Get the part of a document between two positions, as an array of
  // strings.
  function getBetween(doc, start, end) {
    var out = [], n = start.line;
    doc.iter(start.line, end.line + 1, function (line) {
      var text = line.text;
      if (n == end.line) { text = text.slice(0, end.ch); }
      if (n == start.line) { text = text.slice(start.ch); }
      out.push(text);
      ++n;
    });
    return out
  }
  // Get the lines between from and to, as array of strings.
  function getLines(doc, from, to) {
    var out = [];
    doc.iter(from, to, function (line) { out.push(line.text); }); // iter aborts when callback returns truthy value
    return out
  }

  // Update the height of a line, propagating the height change
  // upwards to parent nodes.
  function updateLineHeight(line, height) {
    var diff = height - line.height;
    if (diff) { for (var n = line; n; n = n.parent) { n.height += diff; } }
  }

  // Given a line object, find its line number by walking up through
  // its parent links.
  function lineNo(line) {
    if (line.parent == null) { return null }
    var cur = line.parent, no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0;; ++i) {
        if (chunk.children[i] == cur) { break }
        no += chunk.children[i].chunkSize();
      }
    }
    return no + cur.first
  }

  // Find the line at the given vertical position, using the height
  // information in the document tree.
  function lineAtHeight(chunk, h) {
    var n = chunk.first;
    outer: do {
      for (var i$1 = 0; i$1 < chunk.children.length; ++i$1) {
        var child = chunk.children[i$1], ch = child.height;
        if (h < ch) { chunk = child; continue outer }
        h -= ch;
        n += child.chunkSize();
      }
      return n
    } while (!chunk.lines)
    var i = 0;
    for (; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i], lh = line.height;
      if (h < lh) { break }
      h -= lh;
    }
    return n + i
  }

  function isLine(doc, l) {return l >= doc.first && l < doc.first + doc.size}

  function lineNumberFor(options, i) {
    return String(options.lineNumberFormatter(i + options.firstLineNumber))
  }

  // A Pos instance represents a position within the text.
  function Pos(line, ch, sticky) {
    if ( sticky === void 0 ) sticky = null;

    if (!(this instanceof Pos)) { return new Pos(line, ch, sticky) }
    this.line = line;
    this.ch = ch;
    this.sticky = sticky;
  }

  // Compare two positions, return 0 if they are the same, a negative
  // number when a is less, and a positive number otherwise.
  function cmp(a, b) { return a.line - b.line || a.ch - b.ch }

  function equalCursorPos(a, b) { return a.sticky == b.sticky && cmp(a, b) == 0 }

  function copyPos(x) {return Pos(x.line, x.ch)}
  function maxPos(a, b) { return cmp(a, b) < 0 ? b : a }
  function minPos(a, b) { return cmp(a, b) < 0 ? a : b }

  // Most of the external API clips given positions to make sure they
  // actually exist within the document.
  function clipLine(doc, n) {return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1))}
  function clipPos(doc, pos) {
    if (pos.line < doc.first) { return Pos(doc.first, 0) }
    var last = doc.first + doc.size - 1;
    if (pos.line > last) { return Pos(last, getLine(doc, last).text.length) }
    return clipToLen(pos, getLine(doc, pos.line).text.length)
  }
  function clipToLen(pos, linelen) {
    var ch = pos.ch;
    if (ch == null || ch > linelen) { return Pos(pos.line, linelen) }
    else if (ch < 0) { return Pos(pos.line, 0) }
    else { return pos }
  }
  function clipPosArray(doc, array) {
    var out = [];
    for (var i = 0; i < array.length; i++) { out[i] = clipPos(doc, array[i]); }
    return out
  }

  var SavedContext = function(state, lookAhead) {
    this.state = state;
    this.lookAhead = lookAhead;
  };

  var Context = function(doc, state, line, lookAhead) {
    this.state = state;
    this.doc = doc;
    this.line = line;
    this.maxLookAhead = lookAhead || 0;
    this.baseTokens = null;
    this.baseTokenPos = 1;
  };

  Context.prototype.lookAhead = function (n) {
    var line = this.doc.getLine(this.line + n);
    if (line != null && n > this.maxLookAhead) { this.maxLookAhead = n; }
    return line
  };

  Context.prototype.baseToken = function (n) {
      var this$1 = this;

    if (!this.baseTokens) { return null }
    while (this.baseTokens[this.baseTokenPos] <= n)
      { this$1.baseTokenPos += 2; }
    var type = this.baseTokens[this.baseTokenPos + 1];
    return {type: type && type.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - n}
  };

  Context.prototype.nextLine = function () {
    this.line++;
    if (this.maxLookAhead > 0) { this.maxLookAhead--; }
  };

  Context.fromSaved = function (doc, saved, line) {
    if (saved instanceof SavedContext)
      { return new Context(doc, copyState(doc.mode, saved.state), line, saved.lookAhead) }
    else
      { return new Context(doc, copyState(doc.mode, saved), line) }
  };

  Context.prototype.save = function (copy) {
    var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
    return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state
  };


  // Compute a style array (an array starting with a mode generation
  // -- for invalidation -- followed by pairs of end positions and
  // style strings), which is used to highlight the tokens on the
  // line.
  function highlightLine(cm, line, context, forceToEnd) {
    // A styles array always starts with a number identifying the
    // mode/overlays that it is based on (for easy invalidation).
    var st = [cm.state.modeGen], lineClasses = {};
    // Compute the base array of styles
    runMode(cm, line.text, cm.doc.mode, context, function (end, style) { return st.push(end, style); },
            lineClasses, forceToEnd);
    var state = context.state;

    // Run overlays, adjust style array.
    var loop = function ( o ) {
      context.baseTokens = st;
      var overlay = cm.state.overlays[o], i = 1, at = 0;
      context.state = true;
      runMode(cm, line.text, overlay.mode, context, function (end, style) {
        var start = i;
        // Ensure there's a token end at the current position, and that i points at it
        while (at < end) {
          var i_end = st[i];
          if (i_end > end)
            { st.splice(i, 1, end, st[i+1], i_end); }
          i += 2;
          at = Math.min(end, i_end);
        }
        if (!style) { return }
        if (overlay.opaque) {
          st.splice(start, i - start, end, "overlay " + style);
          i = start + 2;
        } else {
          for (; start < i; start += 2) {
            var cur = st[start+1];
            st[start+1] = (cur ? cur + " " : "") + "overlay " + style;
          }
        }
      }, lineClasses);
      context.state = state;
      context.baseTokens = null;
      context.baseTokenPos = 1;
    };

    for (var o = 0; o < cm.state.overlays.length; ++o) loop( o );

    return {styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null}
  }

  function getLineStyles(cm, line, updateFrontier) {
    if (!line.styles || line.styles[0] != cm.state.modeGen) {
      var context = getContextBefore(cm, lineNo(line));
      var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
      var result = highlightLine(cm, line, context);
      if (resetState) { context.state = resetState; }
      line.stateAfter = context.save(!resetState);
      line.styles = result.styles;
      if (result.classes) { line.styleClasses = result.classes; }
      else if (line.styleClasses) { line.styleClasses = null; }
      if (updateFrontier === cm.doc.highlightFrontier)
        { cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier); }
    }
    return line.styles
  }

  function getContextBefore(cm, n, precise) {
    var doc = cm.doc, display = cm.display;
    if (!doc.mode.startState) { return new Context(doc, true, n) }
    var start = findStartLine(cm, n, precise);
    var saved = start > doc.first && getLine(doc, start - 1).stateAfter;
    var context = saved ? Context.fromSaved(doc, saved, start) : new Context(doc, startState(doc.mode), start);

    doc.iter(start, n, function (line) {
      processLine(cm, line.text, context);
      var pos = context.line;
      line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
      context.nextLine();
    });
    if (precise) { doc.modeFrontier = context.line; }
    return context
  }

  // Lightweight form of highlight -- proceed over this line and
  // update state, but don't save a style array. Used for lines that
  // aren't currently visible.
  function processLine(cm, text, context, startAt) {
    var mode = cm.doc.mode;
    var stream = new StringStream(text, cm.options.tabSize, context);
    stream.start = stream.pos = startAt || 0;
    if (text == "") { callBlankLine(mode, context.state); }
    while (!stream.eol()) {
      readToken(mode, stream, context.state);
      stream.start = stream.pos;
    }
  }

  function callBlankLine(mode, state) {
    if (mode.blankLine) { return mode.blankLine(state) }
    if (!mode.innerMode) { return }
    var inner = innerMode(mode, state);
    if (inner.mode.blankLine) { return inner.mode.blankLine(inner.state) }
  }

  function readToken(mode, stream, state, inner) {
    for (var i = 0; i < 10; i++) {
      if (inner) { inner[0] = innerMode(mode, state).mode; }
      var style = mode.token(stream, state);
      if (stream.pos > stream.start) { return style }
    }
    throw new Error("Mode " + mode.name + " failed to advance stream.")
  }

  var Token = function(stream, type, state) {
    this.start = stream.start; this.end = stream.pos;
    this.string = stream.current();
    this.type = type || null;
    this.state = state;
  };

  // Utility for getTokenAt and getLineTokens
  function takeToken(cm, pos, precise, asArray) {
    var doc = cm.doc, mode = doc.mode, style;
    pos = clipPos(doc, pos);
    var line = getLine(doc, pos.line), context = getContextBefore(cm, pos.line, precise);
    var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
    if (asArray) { tokens = []; }
    while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
      stream.start = stream.pos;
      style = readToken(mode, stream, context.state);
      if (asArray) { tokens.push(new Token(stream, style, copyState(doc.mode, context.state))); }
    }
    return asArray ? tokens : new Token(stream, style, context.state)
  }

  function extractLineClasses(type, output) {
    if (type) { for (;;) {
      var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
      if (!lineClass) { break }
      type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
      var prop = lineClass[1] ? "bgClass" : "textClass";
      if (output[prop] == null)
        { output[prop] = lineClass[2]; }
      else if (!(new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)")).test(output[prop]))
        { output[prop] += " " + lineClass[2]; }
    } }
    return type
  }

  // Run the given mode's parser over a line, calling f for each token.
  function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
    var flattenSpans = mode.flattenSpans;
    if (flattenSpans == null) { flattenSpans = cm.options.flattenSpans; }
    var curStart = 0, curStyle = null;
    var stream = new StringStream(text, cm.options.tabSize, context), style;
    var inner = cm.options.addModeClass && [null];
    if (text == "") { extractLineClasses(callBlankLine(mode, context.state), lineClasses); }
    while (!stream.eol()) {
      if (stream.pos > cm.options.maxHighlightLength) {
        flattenSpans = false;
        if (forceToEnd) { processLine(cm, text, context, stream.pos); }
        stream.pos = text.length;
        style = null;
      } else {
        style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
      }
      if (inner) {
        var mName = inner[0].name;
        if (mName) { style = "m-" + (style ? mName + " " + style : mName); }
      }
      if (!flattenSpans || curStyle != style) {
        while (curStart < stream.start) {
          curStart = Math.min(stream.start, curStart + 5000);
          f(curStart, curStyle);
        }
        curStyle = style;
      }
      stream.start = stream.pos;
    }
    while (curStart < stream.pos) {
      // Webkit seems to refuse to render text nodes longer than 57444
      // characters, and returns inaccurate measurements in nodes
      // starting around 5000 chars.
      var pos = Math.min(stream.pos, curStart + 5000);
      f(pos, curStyle);
      curStart = pos;
    }
  }

  // Finds the line to start with when starting a parse. Tries to
  // find a line with a stateAfter, so that it can start with a
  // valid state. If that fails, it returns the line with the
  // smallest indentation, which tends to need the least context to
  // parse correctly.
  function findStartLine(cm, n, precise) {
    var minindent, minline, doc = cm.doc;
    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
    for (var search = n; search > lim; --search) {
      if (search <= doc.first) { return doc.first }
      var line = getLine(doc, search - 1), after = line.stateAfter;
      if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc.modeFrontier))
        { return search }
      var indented = countColumn(line.text, null, cm.options.tabSize);
      if (minline == null || minindent > indented) {
        minline = search - 1;
        minindent = indented;
      }
    }
    return minline
  }

  function retreatFrontier(doc, n) {
    doc.modeFrontier = Math.min(doc.modeFrontier, n);
    if (doc.highlightFrontier < n - 10) { return }
    var start = doc.first;
    for (var line = n - 1; line > start; line--) {
      var saved = getLine(doc, line).stateAfter;
      // change is on 3
      // state on line 1 looked ahead 2 -- so saw 3
      // test 1 + 2 < 3 should cover this
      if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
        start = line + 1;
        break
      }
    }
    doc.highlightFrontier = Math.min(doc.highlightFrontier, start);
  }

  // Optimize some code when these features are not used.
  var sawReadOnlySpans = false, sawCollapsedSpans = false;

  function seeReadOnlySpans() {
    sawReadOnlySpans = true;
  }

  function seeCollapsedSpans() {
    sawCollapsedSpans = true;
  }

  // TEXTMARKER SPANS

  function MarkedSpan(marker, from, to) {
    this.marker = marker;
    this.from = from; this.to = to;
  }

  // Search an array of spans for a span matching the given marker.
  function getMarkedSpanFor(spans, marker) {
    if (spans) { for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.marker == marker) { return span }
    } }
  }
  // Remove a span from an array, returning undefined if no spans are
  // left (we don't store arrays for lines without spans).
  function removeMarkedSpan(spans, span) {
    var r;
    for (var i = 0; i < spans.length; ++i)
      { if (spans[i] != span) { (r || (r = [])).push(spans[i]); } }
    return r
  }
  // Add a span to a line.
  function addMarkedSpan(line, span) {
    line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
    span.marker.attachLine(line);
  }

  // Used for the algorithm that adjusts markers for a change in the
  // document. These functions cut an array of spans at a given
  // character position, returning an array of remaining chunks (or
  // undefined if nothing remains).
  function markedSpansBefore(old, startCh, isInsert) {
    var nw;
    if (old) { for (var i = 0; i < old.length; ++i) {
      var span = old[i], marker = span.marker;
      var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
      if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh)
        ;(nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
      }
    } }
    return nw
  }
  function markedSpansAfter(old, endCh, isInsert) {
    var nw;
    if (old) { for (var i = 0; i < old.length; ++i) {
      var span = old[i], marker = span.marker;
      var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
      if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh)
        ;(nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh,
                                              span.to == null ? null : span.to - endCh));
      }
    } }
    return nw
  }

  // Given a change object, compute the new set of marker spans that
  // cover the line in which the change took place. Removes spans
  // entirely within the change, reconnects spans belonging to the
  // same marker that appear on both sides of the change, and cuts off
  // spans partially within the change. Returns an array of span
  // arrays with one element for each line in (after) the change.
  function stretchSpansOverChange(doc, change) {
    if (change.full) { return null }
    var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
    var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
    if (!oldFirst && !oldLast) { return null }

    var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
    // Get the spans that 'stick out' on both sides
    var first = markedSpansBefore(oldFirst, startCh, isInsert);
    var last = markedSpansAfter(oldLast, endCh, isInsert);

    // Next, merge those two ends
    var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
    if (first) {
      // Fix up .to properties of first
      for (var i = 0; i < first.length; ++i) {
        var span = first[i];
        if (span.to == null) {
          var found = getMarkedSpanFor(last, span.marker);
          if (!found) { span.to = startCh; }
          else if (sameLine) { span.to = found.to == null ? null : found.to + offset; }
        }
      }
    }
    if (last) {
      // Fix up .from in last (or move them into first in case of sameLine)
      for (var i$1 = 0; i$1 < last.length; ++i$1) {
        var span$1 = last[i$1];
        if (span$1.to != null) { span$1.to += offset; }
        if (span$1.from == null) {
          var found$1 = getMarkedSpanFor(first, span$1.marker);
          if (!found$1) {
            span$1.from = offset;
            if (sameLine) { (first || (first = [])).push(span$1); }
          }
        } else {
          span$1.from += offset;
          if (sameLine) { (first || (first = [])).push(span$1); }
        }
      }
    }
    // Make sure we didn't create any zero-length spans
    if (first) { first = clearEmptySpans(first); }
    if (last && last != first) { last = clearEmptySpans(last); }

    var newMarkers = [first];
    if (!sameLine) {
      // Fill gap with whole-line-spans
      var gap = change.text.length - 2, gapMarkers;
      if (gap > 0 && first)
        { for (var i$2 = 0; i$2 < first.length; ++i$2)
          { if (first[i$2].to == null)
            { (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$2].marker, null, null)); } } }
      for (var i$3 = 0; i$3 < gap; ++i$3)
        { newMarkers.push(gapMarkers); }
      newMarkers.push(last);
    }
    return newMarkers
  }

  // Remove spans that are empty and don't have a clearWhenEmpty
  // option of false.
  function clearEmptySpans(spans) {
    for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false)
        { spans.splice(i--, 1); }
    }
    if (!spans.length) { return null }
    return spans
  }

  // Used to 'clip' out readOnly ranges when making a change.
  function removeReadOnlyRanges(doc, from, to) {
    var markers = null;
    doc.iter(from.line, to.line + 1, function (line) {
      if (line.markedSpans) { for (var i = 0; i < line.markedSpans.length; ++i) {
        var mark = line.markedSpans[i].marker;
        if (mark.readOnly && (!markers || indexOf(markers, mark) == -1))
          { (markers || (markers = [])).push(mark); }
      } }
    });
    if (!markers) { return null }
    var parts = [{from: from, to: to}];
    for (var i = 0; i < markers.length; ++i) {
      var mk = markers[i], m = mk.find(0);
      for (var j = 0; j < parts.length; ++j) {
        var p = parts[j];
        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) { continue }
        var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom)
          { newParts.push({from: p.from, to: m.from}); }
        if (dto > 0 || !mk.inclusiveRight && !dto)
          { newParts.push({from: m.to, to: p.to}); }
        parts.splice.apply(parts, newParts);
        j += newParts.length - 3;
      }
    }
    return parts
  }

  // Connect or disconnect spans from a line.
  function detachMarkedSpans(line) {
    var spans = line.markedSpans;
    if (!spans) { return }
    for (var i = 0; i < spans.length; ++i)
      { spans[i].marker.detachLine(line); }
    line.markedSpans = null;
  }
  function attachMarkedSpans(line, spans) {
    if (!spans) { return }
    for (var i = 0; i < spans.length; ++i)
      { spans[i].marker.attachLine(line); }
    line.markedSpans = spans;
  }

  // Helpers used when computing which overlapping collapsed span
  // counts as the larger one.
  function extraLeft(marker) { return marker.inclusiveLeft ? -1 : 0 }
  function extraRight(marker) { return marker.inclusiveRight ? 1 : 0 }

  // Returns a number indicating which of two overlapping collapsed
  // spans is larger (and thus includes the other). Falls back to
  // comparing ids when the spans cover exactly the same range.
  function compareCollapsedMarkers(a, b) {
    var lenDiff = a.lines.length - b.lines.length;
    if (lenDiff != 0) { return lenDiff }
    var aPos = a.find(), bPos = b.find();
    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
    if (fromCmp) { return -fromCmp }
    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
    if (toCmp) { return toCmp }
    return b.id - a.id
  }

  // Find out whether a line ends or starts in a collapsed span. If
  // so, return the marker for that span.
  function collapsedSpanAtSide(line, start) {
    var sps = sawCollapsedSpans && line.markedSpans, found;
    if (sps) { for (var sp = (void 0), i = 0; i < sps.length; ++i) {
      sp = sps[i];
      if (sp.marker.collapsed && (start ? sp.from : sp.to) == null &&
          (!found || compareCollapsedMarkers(found, sp.marker) < 0))
        { found = sp.marker; }
    } }
    return found
  }
  function collapsedSpanAtStart(line) { return collapsedSpanAtSide(line, true) }
  function collapsedSpanAtEnd(line) { return collapsedSpanAtSide(line, false) }

  function collapsedSpanAround(line, ch) {
    var sps = sawCollapsedSpans && line.markedSpans, found;
    if (sps) { for (var i = 0; i < sps.length; ++i) {
      var sp = sps[i];
      if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) &&
          (!found || compareCollapsedMarkers(found, sp.marker) < 0)) { found = sp.marker; }
    } }
    return found
  }

  // Test whether there exists a collapsed span that partially
  // overlaps (covers the start or end, but not both) of a new span.
  // Such overlap is not allowed.
  function conflictingCollapsedRange(doc, lineNo$$1, from, to, marker) {
    var line = getLine(doc, lineNo$$1);
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) { for (var i = 0; i < sps.length; ++i) {
      var sp = sps[i];
      if (!sp.marker.collapsed) { continue }
      var found = sp.marker.find(0);
      var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
      var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
      if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) { continue }
      if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) ||
          fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0))
        { return true }
    } }
  }

  // A visual line is a line as drawn on the screen. Folding, for
  // example, can cause multiple logical lines to appear on the same
  // visual line. This finds the start of the visual line that the
  // given line is part of (usually that is the line itself).
  function visualLine(line) {
    var merged;
    while (merged = collapsedSpanAtStart(line))
      { line = merged.find(-1, true).line; }
    return line
  }

  function visualLineEnd(line) {
    var merged;
    while (merged = collapsedSpanAtEnd(line))
      { line = merged.find(1, true).line; }
    return line
  }

  // Returns an array of logical lines that continue the visual line
  // started by the argument, or undefined if there are no such lines.
  function visualLineContinued(line) {
    var merged, lines;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line
      ;(lines || (lines = [])).push(line);
    }
    return lines
  }

  // Get the line number of the start of the visual line that the
  // given line number is part of.
  function visualLineNo(doc, lineN) {
    var line = getLine(doc, lineN), vis = visualLine(line);
    if (line == vis) { return lineN }
    return lineNo(vis)
  }

  // Get the line number of the start of the next visual line after
  // the given line.
  function visualLineEndNo(doc, lineN) {
    if (lineN > doc.lastLine()) { return lineN }
    var line = getLine(doc, lineN), merged;
    if (!lineIsHidden(doc, line)) { return lineN }
    while (merged = collapsedSpanAtEnd(line))
      { line = merged.find(1, true).line; }
    return lineNo(line) + 1
  }

  // Compute whether a line is hidden. Lines count as hidden when they
  // are part of a visual line that starts with another line, or when
  // they are entirely covered by collapsed, non-widget span.
  function lineIsHidden(doc, line) {
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) { for (var sp = (void 0), i = 0; i < sps.length; ++i) {
      sp = sps[i];
      if (!sp.marker.collapsed) { continue }
      if (sp.from == null) { return true }
      if (sp.marker.widgetNode) { continue }
      if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp))
        { return true }
    } }
  }
  function lineIsHiddenInner(doc, line, span) {
    if (span.to == null) {
      var end = span.marker.find(1, true);
      return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker))
    }
    if (span.marker.inclusiveRight && span.to == line.text.length)
      { return true }
    for (var sp = (void 0), i = 0; i < line.markedSpans.length; ++i) {
      sp = line.markedSpans[i];
      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to &&
          (sp.to == null || sp.to != span.from) &&
          (sp.marker.inclusiveLeft || span.marker.inclusiveRight) &&
          lineIsHiddenInner(doc, line, sp)) { return true }
    }
  }

  // Find the height above the given line.
  function heightAtLine(lineObj) {
    lineObj = visualLine(lineObj);

    var h = 0, chunk = lineObj.parent;
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i];
      if (line == lineObj) { break }
      else { h += line.height; }
    }
    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
      for (var i$1 = 0; i$1 < p.children.length; ++i$1) {
        var cur = p.children[i$1];
        if (cur == chunk) { break }
        else { h += cur.height; }
      }
    }
    return h
  }

  // Compute the character length of a line, taking into account
  // collapsed ranges (see markText) that might hide parts, and join
  // other lines onto it.
  function lineLength(line) {
    if (line.height == 0) { return 0 }
    var len = line.text.length, merged, cur = line;
    while (merged = collapsedSpanAtStart(cur)) {
      var found = merged.find(0, true);
      cur = found.from.line;
      len += found.from.ch - found.to.ch;
    }
    cur = line;
    while (merged = collapsedSpanAtEnd(cur)) {
      var found$1 = merged.find(0, true);
      len -= cur.text.length - found$1.from.ch;
      cur = found$1.to.line;
      len += cur.text.length - found$1.to.ch;
    }
    return len
  }

  // Find the longest line in the document.
  function findMaxLine(cm) {
    var d = cm.display, doc = cm.doc;
    d.maxLine = getLine(doc, doc.first);
    d.maxLineLength = lineLength(d.maxLine);
    d.maxLineChanged = true;
    doc.iter(function (line) {
      var len = lineLength(line);
      if (len > d.maxLineLength) {
        d.maxLineLength = len;
        d.maxLine = line;
      }
    });
  }

  // LINE DATA STRUCTURE

  // Line objects. These hold state related to a line, including
  // highlighting info (the styles array).
  var Line = function(text, markedSpans, estimateHeight) {
    this.text = text;
    attachMarkedSpans(this, markedSpans);
    this.height = estimateHeight ? estimateHeight(this) : 1;
  };

  Line.prototype.lineNo = function () { return lineNo(this) };
  eventMixin(Line);

  // Change the content (text, markers) of a line. Automatically
  // invalidates cached information and tries to re-estimate the
  // line's height.
  function updateLine(line, text, markedSpans, estimateHeight) {
    line.text = text;
    if (line.stateAfter) { line.stateAfter = null; }
    if (line.styles) { line.styles = null; }
    if (line.order != null) { line.order = null; }
    detachMarkedSpans(line);
    attachMarkedSpans(line, markedSpans);
    var estHeight = estimateHeight ? estimateHeight(line) : 1;
    if (estHeight != line.height) { updateLineHeight(line, estHeight); }
  }

  // Detach a line from the document tree and its markers.
  function cleanUpLine(line) {
    line.parent = null;
    detachMarkedSpans(line);
  }

  // Convert a style as returned by a mode (either null, or a string
  // containing one or more styles) to a CSS style. This is cached,
  // and also looks for line-wide styles.
  var styleToClassCache = {}, styleToClassCacheWithMode = {};
  function interpretTokenStyle(style, options) {
    if (!style || /^\s*$/.test(style)) { return null }
    var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
    return cache[style] ||
      (cache[style] = style.replace(/\S+/g, "cm-$&"))
  }

  // Render the DOM representation of the text of a line. Also builds
  // up a 'line map', which points at the DOM nodes that represent
  // specific stretches of text, and is used by the measuring code.
  // The returned object contains the DOM node, this map, and
  // information about line-wide styles that were set by the mode.
  function buildLineContent(cm, lineView) {
    // The padding-right forces the element to have a 'border', which
    // is needed on Webkit to be able to get line-level bounding
    // rectangles for it (in measureChar).
    var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
    var builder = {pre: eltP("pre", [content], "CodeMirror-line"), content: content,
                   col: 0, pos: 0, cm: cm,
                   trailingSpace: false,
                   splitSpaces: cm.getOption("lineWrapping")};
    lineView.measure = {};

    // Iterate over the logical lines that make up this visual line.
    for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
      var line = i ? lineView.rest[i - 1] : lineView.line, order = (void 0);
      builder.pos = 0;
      builder.addToken = buildToken;
      // Optionally wire in some hacks into the token-rendering
      // algorithm, to deal with browser quirks.
      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction)))
        { builder.addToken = buildTokenBadBidi(builder.addToken, order); }
      builder.map = [];
      var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
      insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
      if (line.styleClasses) {
        if (line.styleClasses.bgClass)
          { builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || ""); }
        if (line.styleClasses.textClass)
          { builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || ""); }
      }

      // Ensure at least a single node is present, for measuring.
      if (builder.map.length == 0)
        { builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure))); }

      // Store the map and a cache object for the current logical line
      if (i == 0) {
        lineView.measure.map = builder.map;
        lineView.measure.cache = {};
      } else {
  (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map)
        ;(lineView.measure.caches || (lineView.measure.caches = [])).push({});
      }
    }

    // See issue #2901
    if (webkit) {
      var last = builder.content.lastChild;
      if (/\bcm-tab\b/.test(last.className) || (last.querySelector && last.querySelector(".cm-tab")))
        { builder.content.className = "cm-tab-wrap-hack"; }
    }

    signal(cm, "renderLine", cm, lineView.line, builder.pre);
    if (builder.pre.className)
      { builder.textClass = joinClasses(builder.pre.className, builder.textClass || ""); }

    return builder
  }

  function defaultSpecialCharPlaceholder(ch) {
    var token = elt("span", "\u2022", "cm-invalidchar");
    token.title = "\\u" + ch.charCodeAt(0).toString(16);
    token.setAttribute("aria-label", token.title);
    return token
  }

  // Build up the DOM representation for a single token, and add it to
  // the line map. Takes care to render special characters separately.
  function buildToken(builder, text, style, startStyle, endStyle, css, attributes) {
    if (!text) { return }
    var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
    var special = builder.cm.state.specialChars, mustWrap = false;
    var content;
    if (!special.test(text)) {
      builder.col += text.length;
      content = document.createTextNode(displayText);
      builder.map.push(builder.pos, builder.pos + text.length, content);
      if (ie && ie_version < 9) { mustWrap = true; }
      builder.pos += text.length;
    } else {
      content = document.createDocumentFragment();
      var pos = 0;
      while (true) {
        special.lastIndex = pos;
        var m = special.exec(text);
        var skipped = m ? m.index - pos : text.length - pos;
        if (skipped) {
          var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
          if (ie && ie_version < 9) { content.appendChild(elt("span", [txt])); }
          else { content.appendChild(txt); }
          builder.map.push(builder.pos, builder.pos + skipped, txt);
          builder.col += skipped;
          builder.pos += skipped;
        }
        if (!m) { break }
        pos += skipped + 1;
        var txt$1 = (void 0);
        if (m[0] == "\t") {
          var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
          txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
          txt$1.setAttribute("role", "presentation");
          txt$1.setAttribute("cm-text", "\t");
          builder.col += tabWidth;
        } else if (m[0] == "\r" || m[0] == "\n") {
          txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
          txt$1.setAttribute("cm-text", m[0]);
          builder.col += 1;
        } else {
          txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
          txt$1.setAttribute("cm-text", m[0]);
          if (ie && ie_version < 9) { content.appendChild(elt("span", [txt$1])); }
          else { content.appendChild(txt$1); }
          builder.col += 1;
        }
        builder.map.push(builder.pos, builder.pos + 1, txt$1);
        builder.pos++;
      }
    }
    builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
    if (style || startStyle || endStyle || mustWrap || css) {
      var fullStyle = style || "";
      if (startStyle) { fullStyle += startStyle; }
      if (endStyle) { fullStyle += endStyle; }
      var token = elt("span", [content], fullStyle, css);
      if (attributes) {
        for (var attr in attributes) { if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class")
          { token.setAttribute(attr, attributes[attr]); } }
      }
      return builder.content.appendChild(token)
    }
    builder.content.appendChild(content);
  }

  // Change some spaces to NBSP to prevent the browser from collapsing
  // trailing spaces at the end of a line when rendering text (issue #1362).
  function splitSpaces(text, trailingBefore) {
    if (text.length > 1 && !/  /.test(text)) { return text }
    var spaceBefore = trailingBefore, result = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch == " " && spaceBefore && (i == text.length - 1 || text.charCodeAt(i + 1) == 32))
        { ch = "\u00a0"; }
      result += ch;
      spaceBefore = ch == " ";
    }
    return result
  }

  // Work around nonsense dimensions being reported for stretches of
  // right-to-left text.
  function buildTokenBadBidi(inner, order) {
    return function (builder, text, style, startStyle, endStyle, css, attributes) {
      style = style ? style + " cm-force-border" : "cm-force-border";
      var start = builder.pos, end = start + text.length;
      for (;;) {
        // Find the part that overlaps with the start of this text
        var part = (void 0);
        for (var i = 0; i < order.length; i++) {
          part = order[i];
          if (part.to > start && part.from <= start) { break }
        }
        if (part.to >= end) { return inner(builder, text, style, startStyle, endStyle, css, attributes) }
        inner(builder, text.slice(0, part.to - start), style, startStyle, null, css, attributes);
        startStyle = null;
        text = text.slice(part.to - start);
        start = part.to;
      }
    }
  }

  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
    var widget = !ignoreWidget && marker.widgetNode;
    if (widget) { builder.map.push(builder.pos, builder.pos + size, widget); }
    if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
      if (!widget)
        { widget = builder.content.appendChild(document.createElement("span")); }
      widget.setAttribute("cm-marker", marker.id);
    }
    if (widget) {
      builder.cm.display.input.setUneditable(widget);
      builder.content.appendChild(widget);
    }
    builder.pos += size;
    builder.trailingSpace = false;
  }

  // Outputs a number of spans to make up a line, taking highlighting
  // and marked text into account.
  function insertLineContent(line, builder, styles) {
    var spans = line.markedSpans, allText = line.text, at = 0;
    if (!spans) {
      for (var i$1 = 1; i$1 < styles.length; i$1+=2)
        { builder.addToken(builder, allText.slice(at, at = styles[i$1]), interpretTokenStyle(styles[i$1+1], builder.cm.options)); }
      return
    }

    var len = allText.length, pos = 0, i = 1, text = "", style, css;
    var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
    for (;;) {
      if (nextChange == pos) { // Update current marker set
        spanStyle = spanEndStyle = spanStartStyle = css = "";
        attributes = null;
        collapsed = null; nextChange = Infinity;
        var foundBookmarks = [], endStyles = (void 0);
        for (var j = 0; j < spans.length; ++j) {
          var sp = spans[j], m = sp.marker;
          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
            foundBookmarks.push(m);
          } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
            if (sp.to != null && sp.to != pos && nextChange > sp.to) {
              nextChange = sp.to;
              spanEndStyle = "";
            }
            if (m.className) { spanStyle += " " + m.className; }
            if (m.css) { css = (css ? css + ";" : "") + m.css; }
            if (m.startStyle && sp.from == pos) { spanStartStyle += " " + m.startStyle; }
            if (m.endStyle && sp.to == nextChange) { (endStyles || (endStyles = [])).push(m.endStyle, sp.to); }
            // support for the old title property
            // https://github.com/codemirror/CodeMirror/pull/5673
            if (m.title) { (attributes || (attributes = {})).title = m.title; }
            if (m.attributes) {
              for (var attr in m.attributes)
                { (attributes || (attributes = {}))[attr] = m.attributes[attr]; }
            }
            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0))
              { collapsed = sp; }
          } else if (sp.from > pos && nextChange > sp.from) {
            nextChange = sp.from;
          }
        }
        if (endStyles) { for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2)
          { if (endStyles[j$1 + 1] == nextChange) { spanEndStyle += " " + endStyles[j$1]; } } }

        if (!collapsed || collapsed.from == pos) { for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2)
          { buildCollapsedSpan(builder, 0, foundBookmarks[j$2]); } }
        if (collapsed && (collapsed.from || 0) == pos) {
          buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos,
                             collapsed.marker, collapsed.from == null);
          if (collapsed.to == null) { return }
          if (collapsed.to == pos) { collapsed = false; }
        }
      }
      if (pos >= len) { break }

      var upto = Math.min(len, nextChange);
      while (true) {
        if (text) {
          var end = pos + text.length;
          if (!collapsed) {
            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
            builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle,
                             spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", css, attributes);
          }
          if (end >= upto) {text = text.slice(upto - pos); pos = upto; break}
          pos = end;
          spanStartStyle = "";
        }
        text = allText.slice(at, at = styles[i++]);
        style = interpretTokenStyle(styles[i++], builder.cm.options);
      }
    }
  }


  // These objects are used to represent the visible (currently drawn)
  // part of the document. A LineView may correspond to multiple
  // logical lines, if those are connected by collapsed ranges.
  function LineView(doc, line, lineN) {
    // The starting line
    this.line = line;
    // Continuing lines, if any
    this.rest = visualLineContinued(line);
    // Number of logical lines in this visual line
    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
    this.node = this.text = null;
    this.hidden = lineIsHidden(doc, line);
  }

  // Create a range of LineView objects for the given lines.
  function buildViewArray(cm, from, to) {
    var array = [], nextPos;
    for (var pos = from; pos < to; pos = nextPos) {
      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
      nextPos = pos + view.size;
      array.push(view);
    }
    return array
  }

  var operationGroup = null;

  function pushOperation(op) {
    if (operationGroup) {
      operationGroup.ops.push(op);
    } else {
      op.ownsGroup = operationGroup = {
        ops: [op],
        delayedCallbacks: []
      };
    }
  }

  function fireCallbacksForOps(group) {
    // Calls delayed callbacks and cursorActivity handlers until no
    // new ones appear
    var callbacks = group.delayedCallbacks, i = 0;
    do {
      for (; i < callbacks.length; i++)
        { callbacks[i].call(null); }
      for (var j = 0; j < group.ops.length; j++) {
        var op = group.ops[j];
        if (op.cursorActivityHandlers)
          { while (op.cursorActivityCalled < op.cursorActivityHandlers.length)
            { op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm); } }
      }
    } while (i < callbacks.length)
  }

  function finishOperation(op, endCb) {
    var group = op.ownsGroup;
    if (!group) { return }

    try { fireCallbacksForOps(group); }
    finally {
      operationGroup = null;
      endCb(group);
    }
  }

  var orphanDelayedCallbacks = null;

  // Often, we want to signal events at a point where we are in the
  // middle of some work, but don't want the handler to start calling
  // other methods on the editor, which might be in an inconsistent
  // state or simply not expect any other events to happen.
  // signalLater looks whether there are any handlers, and schedules
  // them to be executed when the last operation ends, or, if no
  // operation is active, when a timeout fires.
  function signalLater(emitter, type /*, values...*/) {
    var arr = getHandlers(emitter, type);
    if (!arr.length) { return }
    var args = Array.prototype.slice.call(arguments, 2), list;
    if (operationGroup) {
      list = operationGroup.delayedCallbacks;
    } else if (orphanDelayedCallbacks) {
      list = orphanDelayedCallbacks;
    } else {
      list = orphanDelayedCallbacks = [];
      setTimeout(fireOrphanDelayed, 0);
    }
    var loop = function ( i ) {
      list.push(function () { return arr[i].apply(null, args); });
    };

    for (var i = 0; i < arr.length; ++i)
      loop( i );
  }

  function fireOrphanDelayed() {
    var delayed = orphanDelayedCallbacks;
    orphanDelayedCallbacks = null;
    for (var i = 0; i < delayed.length; ++i) { delayed[i](); }
  }

  // When an aspect of a line changes, a string is added to
  // lineView.changes. This updates the relevant part of the line's
  // DOM structure.
  function updateLineForChanges(cm, lineView, lineN, dims) {
    for (var j = 0; j < lineView.changes.length; j++) {
      var type = lineView.changes[j];
      if (type == "text") { updateLineText(cm, lineView); }
      else if (type == "gutter") { updateLineGutter(cm, lineView, lineN, dims); }
      else if (type == "class") { updateLineClasses(cm, lineView); }
      else if (type == "widget") { updateLineWidgets(cm, lineView, dims); }
    }
    lineView.changes = null;
  }

  // Lines with gutter elements, widgets or a background class need to
  // be wrapped, and have the extra elements added to the wrapper div
  function ensureLineWrapped(lineView) {
    if (lineView.node == lineView.text) {
      lineView.node = elt("div", null, null, "position: relative");
      if (lineView.text.parentNode)
        { lineView.text.parentNode.replaceChild(lineView.node, lineView.text); }
      lineView.node.appendChild(lineView.text);
      if (ie && ie_version < 8) { lineView.node.style.zIndex = 2; }
    }
    return lineView.node
  }

  function updateLineBackground(cm, lineView) {
    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
    if (cls) { cls += " CodeMirror-linebackground"; }
    if (lineView.background) {
      if (cls) { lineView.background.className = cls; }
      else { lineView.background.parentNode.removeChild(lineView.background); lineView.background = null; }
    } else if (cls) {
      var wrap = ensureLineWrapped(lineView);
      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
      cm.display.input.setUneditable(lineView.background);
    }
  }

  // Wrapper around buildLineContent which will reuse the structure
  // in display.externalMeasured when possible.
  function getLineContent(cm, lineView) {
    var ext = cm.display.externalMeasured;
    if (ext && ext.line == lineView.line) {
      cm.display.externalMeasured = null;
      lineView.measure = ext.measure;
      return ext.built
    }
    return buildLineContent(cm, lineView)
  }

  // Redraw the line's text. Interacts with the background and text
  // classes because the mode may output tokens that influence these
  // classes.
  function updateLineText(cm, lineView) {
    var cls = lineView.text.className;
    var built = getLineContent(cm, lineView);
    if (lineView.text == lineView.node) { lineView.node = built.pre; }
    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
    lineView.text = built.pre;
    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
      lineView.bgClass = built.bgClass;
      lineView.textClass = built.textClass;
      updateLineClasses(cm, lineView);
    } else if (cls) {
      lineView.text.className = cls;
    }
  }

  function updateLineClasses(cm, lineView) {
    updateLineBackground(cm, lineView);
    if (lineView.line.wrapClass)
      { ensureLineWrapped(lineView).className = lineView.line.wrapClass; }
    else if (lineView.node != lineView.text)
      { lineView.node.className = ""; }
    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
    lineView.text.className = textClass || "";
  }

  function updateLineGutter(cm, lineView, lineN, dims) {
    if (lineView.gutter) {
      lineView.node.removeChild(lineView.gutter);
      lineView.gutter = null;
    }
    if (lineView.gutterBackground) {
      lineView.node.removeChild(lineView.gutterBackground);
      lineView.gutterBackground = null;
    }
    if (lineView.line.gutterClass) {
      var wrap = ensureLineWrapped(lineView);
      lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass,
                                      ("left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + (dims.gutterTotalWidth) + "px"));
      cm.display.input.setUneditable(lineView.gutterBackground);
      wrap.insertBefore(lineView.gutterBackground, lineView.text);
    }
    var markers = lineView.line.gutterMarkers;
    if (cm.options.lineNumbers || markers) {
      var wrap$1 = ensureLineWrapped(lineView);
      var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", ("left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px"));
      cm.display.input.setUneditable(gutterWrap);
      wrap$1.insertBefore(gutterWrap, lineView.text);
      if (lineView.line.gutterClass)
        { gutterWrap.className += " " + lineView.line.gutterClass; }
      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"]))
        { lineView.lineNumber = gutterWrap.appendChild(
          elt("div", lineNumberFor(cm.options, lineN),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              ("left: " + (dims.gutterLeft["CodeMirror-linenumbers"]) + "px; width: " + (cm.display.lineNumInnerWidth) + "px"))); }
      if (markers) { for (var k = 0; k < cm.display.gutterSpecs.length; ++k) {
        var id = cm.display.gutterSpecs[k].className, found = markers.hasOwnProperty(id) && markers[id];
        if (found)
          { gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt",
                                     ("left: " + (dims.gutterLeft[id]) + "px; width: " + (dims.gutterWidth[id]) + "px"))); }
      } }
    }
  }

  function updateLineWidgets(cm, lineView, dims) {
    if (lineView.alignable) { lineView.alignable = null; }
    var isWidget = classTest("CodeMirror-linewidget");
    for (var node = lineView.node.firstChild, next = (void 0); node; node = next) {
      next = node.nextSibling;
      if (isWidget.test(node.className)) { lineView.node.removeChild(node); }
    }
    insertLineWidgets(cm, lineView, dims);
  }

  // Build a line's DOM representation from scratch
  function buildLineElement(cm, lineView, lineN, dims) {
    var built = getLineContent(cm, lineView);
    lineView.text = lineView.node = built.pre;
    if (built.bgClass) { lineView.bgClass = built.bgClass; }
    if (built.textClass) { lineView.textClass = built.textClass; }

    updateLineClasses(cm, lineView);
    updateLineGutter(cm, lineView, lineN, dims);
    insertLineWidgets(cm, lineView, dims);
    return lineView.node
  }

  // A lineView may contain multiple logical lines (when merged by
  // collapsed spans). The widgets for all of them need to be drawn.
  function insertLineWidgets(cm, lineView, dims) {
    insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
    if (lineView.rest) { for (var i = 0; i < lineView.rest.length; i++)
      { insertLineWidgetsFor(cm, lineView.rest[i], lineView, dims, false); } }
  }

  function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
    if (!line.widgets) { return }
    var wrap = ensureLineWrapped(lineView);
    for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
      var widget = ws[i], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
      if (!widget.handleMouseEvents) { node.setAttribute("cm-ignore-events", "true"); }
      positionLineWidget(widget, node, lineView, dims);
      cm.display.input.setUneditable(node);
      if (allowAbove && widget.above)
        { wrap.insertBefore(node, lineView.gutter || lineView.text); }
      else
        { wrap.appendChild(node); }
      signalLater(widget, "redraw");
    }
  }

  function positionLineWidget(widget, node, lineView, dims) {
    if (widget.noHScroll) {
  (lineView.alignable || (lineView.alignable = [])).push(node);
      var width = dims.wrapperWidth;
      node.style.left = dims.fixedPos + "px";
      if (!widget.coverGutter) {
        width -= dims.gutterTotalWidth;
        node.style.paddingLeft = dims.gutterTotalWidth + "px";
      }
      node.style.width = width + "px";
    }
    if (widget.coverGutter) {
      node.style.zIndex = 5;
      node.style.position = "relative";
      if (!widget.noHScroll) { node.style.marginLeft = -dims.gutterTotalWidth + "px"; }
    }
  }

  function widgetHeight(widget) {
    if (widget.height != null) { return widget.height }
    var cm = widget.doc.cm;
    if (!cm) { return 0 }
    if (!contains(document.body, widget.node)) {
      var parentStyle = "position: relative;";
      if (widget.coverGutter)
        { parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;"; }
      if (widget.noHScroll)
        { parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;"; }
      removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
    }
    return widget.height = widget.node.parentNode.offsetHeight
  }

  // Return true when the given mouse event happened in a widget
  function eventInWidget(display, e) {
    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
      if (!n || (n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true") ||
          (n.parentNode == display.sizer && n != display.mover))
        { return true }
    }
  }

  // POSITION MEASUREMENT

  function paddingTop(display) {return display.lineSpace.offsetTop}
  function paddingVert(display) {return display.mover.offsetHeight - display.lineSpace.offsetHeight}
  function paddingH(display) {
    if (display.cachedPaddingH) { return display.cachedPaddingH }
    var e = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    var data = {left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight)};
    if (!isNaN(data.left) && !isNaN(data.right)) { display.cachedPaddingH = data; }
    return data
  }

  function scrollGap(cm) { return scrollerGap - cm.display.nativeBarWidth }
  function displayWidth(cm) {
    return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth
  }
  function displayHeight(cm) {
    return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight
  }

  // Ensure the lineView.wrapping.heights array is populated. This is
  // an array of bottom offsets for the lines that make up a drawn
  // line. When lineWrapping is on, there might be more than one
  // height.
  function ensureLineHeights(cm, lineView, rect) {
    var wrapping = cm.options.lineWrapping;
    var curWidth = wrapping && displayWidth(cm);
    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
      var heights = lineView.measure.heights = [];
      if (wrapping) {
        lineView.measure.width = curWidth;
        var rects = lineView.text.firstChild.getClientRects();
        for (var i = 0; i < rects.length - 1; i++) {
          var cur = rects[i], next = rects[i + 1];
          if (Math.abs(cur.bottom - next.bottom) > 2)
            { heights.push((cur.bottom + next.top) / 2 - rect.top); }
        }
      }
      heights.push(rect.bottom - rect.top);
    }
  }

  // Find a line map (mapping character offsets to text nodes) and a
  // measurement cache for the given line number. (A line view might
  // contain multiple lines when collapsed ranges are present.)
  function mapFromLineView(lineView, line, lineN) {
    if (lineView.line == line)
      { return {map: lineView.measure.map, cache: lineView.measure.cache} }
    for (var i = 0; i < lineView.rest.length; i++)
      { if (lineView.rest[i] == line)
        { return {map: lineView.measure.maps[i], cache: lineView.measure.caches[i]} } }
    for (var i$1 = 0; i$1 < lineView.rest.length; i$1++)
      { if (lineNo(lineView.rest[i$1]) > lineN)
        { return {map: lineView.measure.maps[i$1], cache: lineView.measure.caches[i$1], before: true} } }
  }

  // Render a line into the hidden node display.externalMeasured. Used
  // when measurement is needed for a line that's not in the viewport.
  function updateExternalMeasurement(cm, line) {
    line = visualLine(line);
    var lineN = lineNo(line);
    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
    view.lineN = lineN;
    var built = view.built = buildLineContent(cm, view);
    view.text = built.pre;
    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
    return view
  }

  // Get a {top, bottom, left, right} box (in line-local coordinates)
  // for a given character.
  function measureChar(cm, line, ch, bias) {
    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias)
  }

  // Find a line view that corresponds to the given line number.
  function findViewForLine(cm, lineN) {
    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo)
      { return cm.display.view[findViewIndex(cm, lineN)] }
    var ext = cm.display.externalMeasured;
    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size)
      { return ext }
  }

  // Measurement can be split in two steps, the set-up work that
  // applies to the whole line, and the measurement of the actual
  // character. Functions like coordsChar, that need to do a lot of
  // measurements in a row, can thus ensure that the set-up work is
  // only done once.
  function prepareMeasureForLine(cm, line) {
    var lineN = lineNo(line);
    var view = findViewForLine(cm, lineN);
    if (view && !view.text) {
      view = null;
    } else if (view && view.changes) {
      updateLineForChanges(cm, view, lineN, getDimensions(cm));
      cm.curOp.forceUpdate = true;
    }
    if (!view)
      { view = updateExternalMeasurement(cm, line); }

    var info = mapFromLineView(view, line, lineN);
    return {
      line: line, view: view, rect: null,
      map: info.map, cache: info.cache, before: info.before,
      hasHeights: false
    }
  }

  // Given a prepared measurement object, measures the position of an
  // actual character (or fetches it from the cache).
  function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
    if (prepared.before) { ch = -1; }
    var key = ch + (bias || ""), found;
    if (prepared.cache.hasOwnProperty(key)) {
      found = prepared.cache[key];
    } else {
      if (!prepared.rect)
        { prepared.rect = prepared.view.text.getBoundingClientRect(); }
      if (!prepared.hasHeights) {
        ensureLineHeights(cm, prepared.view, prepared.rect);
        prepared.hasHeights = true;
      }
      found = measureCharInner(cm, prepared, ch, bias);
      if (!found.bogus) { prepared.cache[key] = found; }
    }
    return {left: found.left, right: found.right,
            top: varHeight ? found.rtop : found.top,
            bottom: varHeight ? found.rbottom : found.bottom}
  }

  var nullRect = {left: 0, right: 0, top: 0, bottom: 0};

  function nodeAndOffsetInLineMap(map$$1, ch, bias) {
    var node, start, end, collapse, mStart, mEnd;
    // First, search the line map for the text node corresponding to,
    // or closest to, the target character.
    for (var i = 0; i < map$$1.length; i += 3) {
      mStart = map$$1[i];
      mEnd = map$$1[i + 1];
      if (ch < mStart) {
        start = 0; end = 1;
        collapse = "left";
      } else if (ch < mEnd) {
        start = ch - mStart;
        end = start + 1;
      } else if (i == map$$1.length - 3 || ch == mEnd && map$$1[i + 3] > ch) {
        end = mEnd - mStart;
        start = end - 1;
        if (ch >= mEnd) { collapse = "right"; }
      }
      if (start != null) {
        node = map$$1[i + 2];
        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right"))
          { collapse = bias; }
        if (bias == "left" && start == 0)
          { while (i && map$$1[i - 2] == map$$1[i - 3] && map$$1[i - 1].insertLeft) {
            node = map$$1[(i -= 3) + 2];
            collapse = "left";
          } }
        if (bias == "right" && start == mEnd - mStart)
          { while (i < map$$1.length - 3 && map$$1[i + 3] == map$$1[i + 4] && !map$$1[i + 5].insertLeft) {
            node = map$$1[(i += 3) + 2];
            collapse = "right";
          } }
        break
      }
    }
    return {node: node, start: start, end: end, collapse: collapse, coverStart: mStart, coverEnd: mEnd}
  }

  function getUsefulRect(rects, bias) {
    var rect = nullRect;
    if (bias == "left") { for (var i = 0; i < rects.length; i++) {
      if ((rect = rects[i]).left != rect.right) { break }
    } } else { for (var i$1 = rects.length - 1; i$1 >= 0; i$1--) {
      if ((rect = rects[i$1]).left != rect.right) { break }
    } }
    return rect
  }

  function measureCharInner(cm, prepared, ch, bias) {
    var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
    var node = place.node, start = place.start, end = place.end, collapse = place.collapse;

    var rect;
    if (node.nodeType == 3) { // If it is a text node, use a range to retrieve the coordinates.
      for (var i$1 = 0; i$1 < 4; i$1++) { // Retry a maximum of 4 times when nonsense rectangles are returned
        while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) { --start; }
        while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) { ++end; }
        if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart)
          { rect = node.parentNode.getBoundingClientRect(); }
        else
          { rect = getUsefulRect(range(node, start, end).getClientRects(), bias); }
        if (rect.left || rect.right || start == 0) { break }
        end = start;
        start = start - 1;
        collapse = "right";
      }
      if (ie && ie_version < 11) { rect = maybeUpdateRectForZooming(cm.display.measure, rect); }
    } else { // If it is a widget, simply get the box for the whole widget.
      if (start > 0) { collapse = bias = "right"; }
      var rects;
      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1)
        { rect = rects[bias == "right" ? rects.length - 1 : 0]; }
      else
        { rect = node.getBoundingClientRect(); }
    }
    if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
      var rSpan = node.parentNode.getClientRects()[0];
      if (rSpan)
        { rect = {left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom}; }
      else
        { rect = nullRect; }
    }

    var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
    var mid = (rtop + rbot) / 2;
    var heights = prepared.view.measure.heights;
    var i = 0;
    for (; i < heights.length - 1; i++)
      { if (mid < heights[i]) { break } }
    var top = i ? heights[i - 1] : 0, bot = heights[i];
    var result = {left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
                  right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
                  top: top, bottom: bot};
    if (!rect.left && !rect.right) { result.bogus = true; }
    if (!cm.options.singleCursorHeightPerLine) { result.rtop = rtop; result.rbottom = rbot; }

    return result
  }

  // Work around problem with bounding client rects on ranges being
  // returned incorrectly when zoomed on IE10 and below.
  function maybeUpdateRectForZooming(measure, rect) {
    if (!window.screen || screen.logicalXDPI == null ||
        screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure))
      { return rect }
    var scaleX = screen.logicalXDPI / screen.deviceXDPI;
    var scaleY = screen.logicalYDPI / screen.deviceYDPI;
    return {left: rect.left * scaleX, right: rect.right * scaleX,
            top: rect.top * scaleY, bottom: rect.bottom * scaleY}
  }

  function clearLineMeasurementCacheFor(lineView) {
    if (lineView.measure) {
      lineView.measure.cache = {};
      lineView.measure.heights = null;
      if (lineView.rest) { for (var i = 0; i < lineView.rest.length; i++)
        { lineView.measure.caches[i] = {}; } }
    }
  }

  function clearLineMeasurementCache(cm) {
    cm.display.externalMeasure = null;
    removeChildren(cm.display.lineMeasure);
    for (var i = 0; i < cm.display.view.length; i++)
      { clearLineMeasurementCacheFor(cm.display.view[i]); }
  }

  function clearCaches(cm) {
    clearLineMeasurementCache(cm);
    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
    if (!cm.options.lineWrapping) { cm.display.maxLineChanged = true; }
    cm.display.lineNumChars = null;
  }

  function pageScrollX() {
    // Work around https://bugs.chromium.org/p/chromium/issues/detail?id=489206
    // which causes page_Offset and bounding client rects to use
    // different reference viewports and invalidate our calculations.
    if (chrome && android) { return -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) }
    return window.pageXOffset || (document.documentElement || document.body).scrollLeft
  }
  function pageScrollY() {
    if (chrome && android) { return -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) }
    return window.pageYOffset || (document.documentElement || document.body).scrollTop
  }

  function widgetTopHeight(lineObj) {
    var height = 0;
    if (lineObj.widgets) { for (var i = 0; i < lineObj.widgets.length; ++i) { if (lineObj.widgets[i].above)
      { height += widgetHeight(lineObj.widgets[i]); } } }
    return height
  }

  // Converts a {top, bottom, left, right} box from line-local
  // coordinates into another coordinate system. Context may be one of
  // "line", "div" (display.lineDiv), "local"./null (editor), "window",
  // or "page".
  function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
    if (!includeWidgets) {
      var height = widgetTopHeight(lineObj);
      rect.top += height; rect.bottom += height;
    }
    if (context == "line") { return rect }
    if (!context) { context = "local"; }
    var yOff = heightAtLine(lineObj);
    if (context == "local") { yOff += paddingTop(cm.display); }
    else { yOff -= cm.display.viewOffset; }
    if (context == "page" || context == "window") {
      var lOff = cm.display.lineSpace.getBoundingClientRect();
      yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
      rect.left += xOff; rect.right += xOff;
    }
    rect.top += yOff; rect.bottom += yOff;
    return rect
  }

  // Coverts a box from "div" coords to another coordinate system.
  // Context may be "window", "page", "div", or "local"./null.
  function fromCoordSystem(cm, coords, context) {
    if (context == "div") { return coords }
    var left = coords.left, top = coords.top;
    // First move into "page" coordinate system
    if (context == "page") {
      left -= pageScrollX();
      top -= pageScrollY();
    } else if (context == "local" || !context) {
      var localBox = cm.display.sizer.getBoundingClientRect();
      left += localBox.left;
      top += localBox.top;
    }

    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
    return {left: left - lineSpaceBox.left, top: top - lineSpaceBox.top}
  }

  function charCoords(cm, pos, context, lineObj, bias) {
    if (!lineObj) { lineObj = getLine(cm.doc, pos.line); }
    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context)
  }

  // Returns a box for a given cursor position, which may have an
  // 'other' property containing the position of the secondary cursor
  // on a bidi boundary.
  // A cursor Pos(line, char, "before") is on the same visual line as `char - 1`
  // and after `char - 1` in writing order of `char - 1`
  // A cursor Pos(line, char, "after") is on the same visual line as `char`
  // and before `char` in writing order of `char`
  // Examples (upper-case letters are RTL, lower-case are LTR):
  //     Pos(0, 1, ...)
  //     before   after
  // ab     a|b     a|b
  // aB     a|B     aB|
  // Ab     |Ab     A|b
  // AB     B|A     B|A
  // Every position after the last character on a line is considered to stick
  // to the last character on the line.
  function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
    lineObj = lineObj || getLine(cm.doc, pos.line);
    if (!preparedMeasure) { preparedMeasure = prepareMeasureForLine(cm, lineObj); }
    function get(ch, right) {
      var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left", varHeight);
      if (right) { m.left = m.right; } else { m.right = m.left; }
      return intoCoordSystem(cm, lineObj, m, context)
    }
    var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
    if (ch >= lineObj.text.length) {
      ch = lineObj.text.length;
      sticky = "before";
    } else if (ch <= 0) {
      ch = 0;
      sticky = "after";
    }
    if (!order) { return get(sticky == "before" ? ch - 1 : ch, sticky == "before") }

    function getBidi(ch, partPos, invert) {
      var part = order[partPos], right = part.level == 1;
      return get(invert ? ch - 1 : ch, right != invert)
    }
    var partPos = getBidiPartAt(order, ch, sticky);
    var other = bidiOther;
    var val = getBidi(ch, partPos, sticky == "before");
    if (other != null) { val.other = getBidi(ch, other, sticky != "before"); }
    return val
  }

  // Used to cheaply estimate the coordinates for a position. Used for
  // intermediate scroll updates.
  function estimateCoords(cm, pos) {
    var left = 0;
    pos = clipPos(cm.doc, pos);
    if (!cm.options.lineWrapping) { left = charWidth(cm.display) * pos.ch; }
    var lineObj = getLine(cm.doc, pos.line);
    var top = heightAtLine(lineObj) + paddingTop(cm.display);
    return {left: left, right: left, top: top, bottom: top + lineObj.height}
  }

  // Positions returned by coordsChar contain some extra information.
  // xRel is the relative x position of the input coordinates compared
  // to the found position (so xRel > 0 means the coordinates are to
  // the right of the character position, for example). When outside
  // is true, that means the coordinates lie outside the line's
  // vertical range.
  function PosWithInfo(line, ch, sticky, outside, xRel) {
    var pos = Pos(line, ch, sticky);
    pos.xRel = xRel;
    if (outside) { pos.outside = outside; }
    return pos
  }

  // Compute the character position closest to the given coordinates.
  // Input must be lineSpace-local ("div" coordinate system).
  function coordsChar(cm, x, y) {
    var doc = cm.doc;
    y += cm.display.viewOffset;
    if (y < 0) { return PosWithInfo(doc.first, 0, null, -1, -1) }
    var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
    if (lineN > last)
      { return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, null, 1, 1) }
    if (x < 0) { x = 0; }

    var lineObj = getLine(doc, lineN);
    for (;;) {
      var found = coordsCharInner(cm, lineObj, lineN, x, y);
      var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
      if (!collapsed) { return found }
      var rangeEnd = collapsed.find(1);
      if (rangeEnd.line == lineN) { return rangeEnd }
      lineObj = getLine(doc, lineN = rangeEnd.line);
    }
  }

  function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
    y -= widgetTopHeight(lineObj);
    var end = lineObj.text.length;
    var begin = findFirst(function (ch) { return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y; }, end, 0);
    end = findFirst(function (ch) { return measureCharPrepared(cm, preparedMeasure, ch).top > y; }, begin, end);
    return {begin: begin, end: end}
  }

  function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
    if (!preparedMeasure) { preparedMeasure = prepareMeasureForLine(cm, lineObj); }
    var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
    return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop)
  }

  // Returns true if the given side of a box is after the given
  // coordinates, in top-to-bottom, left-to-right order.
  function boxIsAfter(box, x, y, left) {
    return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x
  }

  function coordsCharInner(cm, lineObj, lineNo$$1, x, y) {
    // Move y into line-local coordinate space
    y -= heightAtLine(lineObj);
    var preparedMeasure = prepareMeasureForLine(cm, lineObj);
    // When directly calling `measureCharPrepared`, we have to adjust
    // for the widgets at this line.
    var widgetHeight$$1 = widgetTopHeight(lineObj);
    var begin = 0, end = lineObj.text.length, ltr = true;

    var order = getOrder(lineObj, cm.doc.direction);
    // If the line isn't plain left-to-right text, first figure out
    // which bidi section the coordinates fall into.
    if (order) {
      var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)
                   (cm, lineObj, lineNo$$1, preparedMeasure, order, x, y);
      ltr = part.level != 1;
      // The awkward -1 offsets are needed because findFirst (called
      // on these below) will treat its first bound as inclusive,
      // second as exclusive, but we want to actually address the
      // characters in the part's range
      begin = ltr ? part.from : part.to - 1;
      end = ltr ? part.to : part.from - 1;
    }

    // A binary search to find the first character whose bounding box
    // starts after the coordinates. If we run across any whose box wrap
    // the coordinates, store that.
    var chAround = null, boxAround = null;
    var ch = findFirst(function (ch) {
      var box = measureCharPrepared(cm, preparedMeasure, ch);
      box.top += widgetHeight$$1; box.bottom += widgetHeight$$1;
      if (!boxIsAfter(box, x, y, false)) { return false }
      if (box.top <= y && box.left <= x) {
        chAround = ch;
        boxAround = box;
      }
      return true
    }, begin, end);

    var baseX, sticky, outside = false;
    // If a box around the coordinates was found, use that
    if (boxAround) {
      // Distinguish coordinates nearer to the left or right side of the box
      var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
      ch = chAround + (atStart ? 0 : 1);
      sticky = atStart ? "after" : "before";
      baseX = atLeft ? boxAround.left : boxAround.right;
    } else {
      // (Adjust for extended bound, if necessary.)
      if (!ltr && (ch == end || ch == begin)) { ch++; }
      // To determine which side to associate with, get the box to the
      // left of the character and compare it's vertical position to the
      // coordinates
      sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" :
        (measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight$$1 <= y) == ltr ?
        "after" : "before";
      // Now get accurate coordinates for this place, in order to get a
      // base X position
      var coords = cursorCoords(cm, Pos(lineNo$$1, ch, sticky), "line", lineObj, preparedMeasure);
      baseX = coords.left;
      outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
    }

    ch = skipExtendingChars(lineObj.text, ch, 1);
    return PosWithInfo(lineNo$$1, ch, sticky, outside, x - baseX)
  }

  function coordsBidiPart(cm, lineObj, lineNo$$1, preparedMeasure, order, x, y) {
    // Bidi parts are sorted left-to-right, and in a non-line-wrapping
    // situation, we can take this ordering to correspond to the visual
    // ordering. This finds the first part whose end is after the given
    // coordinates.
    var index = findFirst(function (i) {
      var part = order[i], ltr = part.level != 1;
      return boxIsAfter(cursorCoords(cm, Pos(lineNo$$1, ltr ? part.to : part.from, ltr ? "before" : "after"),
                                     "line", lineObj, preparedMeasure), x, y, true)
    }, 0, order.length - 1);
    var part = order[index];
    // If this isn't the first part, the part's start is also after
    // the coordinates, and the coordinates aren't on the same line as
    // that start, move one part back.
    if (index > 0) {
      var ltr = part.level != 1;
      var start = cursorCoords(cm, Pos(lineNo$$1, ltr ? part.from : part.to, ltr ? "after" : "before"),
                               "line", lineObj, preparedMeasure);
      if (boxIsAfter(start, x, y, true) && start.top > y)
        { part = order[index - 1]; }
    }
    return part
  }

  function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
    // In a wrapped line, rtl text on wrapping boundaries can do things
    // that don't correspond to the ordering in our `order` array at
    // all, so a binary search doesn't work, and we want to return a
    // part that only spans one line so that the binary search in
    // coordsCharInner is safe. As such, we first find the extent of the
    // wrapped line, and then do a flat search in which we discard any
    // spans that aren't on the line.
    var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
    var begin = ref.begin;
    var end = ref.end;
    if (/\s/.test(lineObj.text.charAt(end - 1))) { end--; }
    var part = null, closestDist = null;
    for (var i = 0; i < order.length; i++) {
      var p = order[i];
      if (p.from >= end || p.to <= begin) { continue }
      var ltr = p.level != 1;
      var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
      // Weigh against spans ending before this, so that they are only
      // picked if nothing ends after
      var dist = endX < x ? x - endX + 1e9 : endX - x;
      if (!part || closestDist > dist) {
        part = p;
        closestDist = dist;
      }
    }
    if (!part) { part = order[order.length - 1]; }
    // Clip the part to the wrapped line.
    if (part.from < begin) { part = {from: begin, to: part.to, level: part.level}; }
    if (part.to > end) { part = {from: part.from, to: end, level: part.level}; }
    return part
  }

  var measureText;
  // Compute the default text height.
  function textHeight(display) {
    if (display.cachedTextHeight != null) { return display.cachedTextHeight }
    if (measureText == null) {
      measureText = elt("pre", null, "CodeMirror-line-like");
      // Measure a bunch of lines, for browsers that compute
      // fractional heights.
      for (var i = 0; i < 49; ++i) {
        measureText.appendChild(document.createTextNode("x"));
        measureText.appendChild(elt("br"));
      }
      measureText.appendChild(document.createTextNode("x"));
    }
    removeChildrenAndAdd(display.measure, measureText);
    var height = measureText.offsetHeight / 50;
    if (height > 3) { display.cachedTextHeight = height; }
    removeChildren(display.measure);
    return height || 1
  }

  // Compute the default character width.
  function charWidth(display) {
    if (display.cachedCharWidth != null) { return display.cachedCharWidth }
    var anchor = elt("span", "xxxxxxxxxx");
    var pre = elt("pre", [anchor], "CodeMirror-line-like");
    removeChildrenAndAdd(display.measure, pre);
    var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
    if (width > 2) { display.cachedCharWidth = width; }
    return width || 10
  }

  // Do a bulk-read of the DOM positions and sizes needed to draw the
  // view, so that we don't interleave reading and writing to the DOM.
  function getDimensions(cm) {
    var d = cm.display, left = {}, width = {};
    var gutterLeft = d.gutters.clientLeft;
    for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
      var id = cm.display.gutterSpecs[i].className;
      left[id] = n.offsetLeft + n.clientLeft + gutterLeft;
      width[id] = n.clientWidth;
    }
    return {fixedPos: compensateForHScroll(d),
            gutterTotalWidth: d.gutters.offsetWidth,
            gutterLeft: left,
            gutterWidth: width,
            wrapperWidth: d.wrapper.clientWidth}
  }

  // Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
  // but using getBoundingClientRect to get a sub-pixel-accurate
  // result.
  function compensateForHScroll(display) {
    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left
  }

  // Returns a function that estimates the height of a line, to use as
  // first approximation until the line becomes visible (and is thus
  // properly measurable).
  function estimateHeight(cm) {
    var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
    return function (line) {
      if (lineIsHidden(cm.doc, line)) { return 0 }

      var widgetsHeight = 0;
      if (line.widgets) { for (var i = 0; i < line.widgets.length; i++) {
        if (line.widgets[i].height) { widgetsHeight += line.widgets[i].height; }
      } }

      if (wrapping)
        { return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th }
      else
        { return widgetsHeight + th }
    }
  }

  function estimateLineHeights(cm) {
    var doc = cm.doc, est = estimateHeight(cm);
    doc.iter(function (line) {
      var estHeight = est(line);
      if (estHeight != line.height) { updateLineHeight(line, estHeight); }
    });
  }

  // Given a mouse event, find the corresponding position. If liberal
  // is false, it checks whether a gutter or scrollbar was clicked,
  // and returns null if it was. forRect is used by rectangular
  // selections, and tries to estimate a character position even for
  // coordinates beyond the right of the text.
  function posFromMouse(cm, e, liberal, forRect) {
    var display = cm.display;
    if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") { return null }

    var x, y, space = display.lineSpace.getBoundingClientRect();
    // Fails unpredictably on IE[67] when mouse is dragged around quickly.
    try { x = e.clientX - space.left; y = e.clientY - space.top; }
    catch (e) { return null }
    var coords = coordsChar(cm, x, y), line;
    if (forRect && coords.xRel > 0 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
      coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
    }
    return coords
  }

  // Find the view element corresponding to a given line. Return null
  // when the line isn't visible.
  function findViewIndex(cm, n) {
    if (n >= cm.display.viewTo) { return null }
    n -= cm.display.viewFrom;
    if (n < 0) { return null }
    var view = cm.display.view;
    for (var i = 0; i < view.length; i++) {
      n -= view[i].size;
      if (n < 0) { return i }
    }
  }

  // Updates the display.view data structure for a given change to the
  // document. From and to are in pre-change coordinates. Lendiff is
  // the amount of lines added or subtracted by the change. This is
  // used for changes that span multiple lines, or change the way
  // lines are divided into visual lines. regLineChange (below)
  // registers single-line changes.
  function regChange(cm, from, to, lendiff) {
    if (from == null) { from = cm.doc.first; }
    if (to == null) { to = cm.doc.first + cm.doc.size; }
    if (!lendiff) { lendiff = 0; }

    var display = cm.display;
    if (lendiff && to < display.viewTo &&
        (display.updateLineNumbers == null || display.updateLineNumbers > from))
      { display.updateLineNumbers = from; }

    cm.curOp.viewChanged = true;

    if (from >= display.viewTo) { // Change after
      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo)
        { resetView(cm); }
    } else if (to <= display.viewFrom) { // Change before
      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
        resetView(cm);
      } else {
        display.viewFrom += lendiff;
        display.viewTo += lendiff;
      }
    } else if (from <= display.viewFrom && to >= display.viewTo) { // Full overlap
      resetView(cm);
    } else if (from <= display.viewFrom) { // Top overlap
      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cut) {
        display.view = display.view.slice(cut.index);
        display.viewFrom = cut.lineN;
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    } else if (to >= display.viewTo) { // Bottom overlap
      var cut$1 = viewCuttingPoint(cm, from, from, -1);
      if (cut$1) {
        display.view = display.view.slice(0, cut$1.index);
        display.viewTo = cut$1.lineN;
      } else {
        resetView(cm);
      }
    } else { // Gap in the middle
      var cutTop = viewCuttingPoint(cm, from, from, -1);
      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cutTop && cutBot) {
        display.view = display.view.slice(0, cutTop.index)
          .concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN))
          .concat(display.view.slice(cutBot.index));
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    }

    var ext = display.externalMeasured;
    if (ext) {
      if (to < ext.lineN)
        { ext.lineN += lendiff; }
      else if (from < ext.lineN + ext.size)
        { display.externalMeasured = null; }
    }
  }

  // Register a change to a single line. Type must be one of "text",
  // "gutter", "class", "widget"
  function regLineChange(cm, line, type) {
    cm.curOp.viewChanged = true;
    var display = cm.display, ext = cm.display.externalMeasured;
    if (ext && line >= ext.lineN && line < ext.lineN + ext.size)
      { display.externalMeasured = null; }

    if (line < display.viewFrom || line >= display.viewTo) { return }
    var lineView = display.view[findViewIndex(cm, line)];
    if (lineView.node == null) { return }
    var arr = lineView.changes || (lineView.changes = []);
    if (indexOf(arr, type) == -1) { arr.push(type); }
  }

  // Clear the view.
  function resetView(cm) {
    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
    cm.display.view = [];
    cm.display.viewOffset = 0;
  }

  function viewCuttingPoint(cm, oldN, newN, dir) {
    var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
    if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size)
      { return {index: index, lineN: newN} }
    var n = cm.display.viewFrom;
    for (var i = 0; i < index; i++)
      { n += view[i].size; }
    if (n != oldN) {
      if (dir > 0) {
        if (index == view.length - 1) { return null }
        diff = (n + view[index].size) - oldN;
        index++;
      } else {
        diff = n - oldN;
      }
      oldN += diff; newN += diff;
    }
    while (visualLineNo(cm.doc, newN) != newN) {
      if (index == (dir < 0 ? 0 : view.length - 1)) { return null }
      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
      index += dir;
    }
    return {index: index, lineN: newN}
  }

  // Force the view to cover a given range, adding empty view element
  // or clipping off existing ones as needed.
  function adjustView(cm, from, to) {
    var display = cm.display, view = display.view;
    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
      display.view = buildViewArray(cm, from, to);
      display.viewFrom = from;
    } else {
      if (display.viewFrom > from)
        { display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view); }
      else if (display.viewFrom < from)
        { display.view = display.view.slice(findViewIndex(cm, from)); }
      display.viewFrom = from;
      if (display.viewTo < to)
        { display.view = display.view.concat(buildViewArray(cm, display.viewTo, to)); }
      else if (display.viewTo > to)
        { display.view = display.view.slice(0, findViewIndex(cm, to)); }
    }
    display.viewTo = to;
  }

  // Count the number of lines in the view whose DOM representation is
  // out of date (or nonexistent).
  function countDirtyView(cm) {
    var view = cm.display.view, dirty = 0;
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (!lineView.hidden && (!lineView.node || lineView.changes)) { ++dirty; }
    }
    return dirty
  }

  function updateSelection(cm) {
    cm.display.input.showSelection(cm.display.input.prepareSelection());
  }

  function prepareSelection(cm, primary) {
    if ( primary === void 0 ) primary = true;

    var doc = cm.doc, result = {};
    var curFragment = result.cursors = document.createDocumentFragment();
    var selFragment = result.selection = document.createDocumentFragment();

    for (var i = 0; i < doc.sel.ranges.length; i++) {
      if (!primary && i == doc.sel.primIndex) { continue }
      var range$$1 = doc.sel.ranges[i];
      if (range$$1.from().line >= cm.display.viewTo || range$$1.to().line < cm.display.viewFrom) { continue }
      var collapsed = range$$1.empty();
      if (collapsed || cm.options.showCursorWhenSelecting)
        { drawSelectionCursor(cm, range$$1.head, curFragment); }
      if (!collapsed)
        { drawSelectionRange(cm, range$$1, selFragment); }
    }
    return result
  }

  // Draws a cursor for the given range
  function drawSelectionCursor(cm, head, output) {
    var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);

    var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
    cursor.style.left = pos.left + "px";
    cursor.style.top = pos.top + "px";
    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";

    if (pos.other) {
      // Secondary cursor, shown when on a 'jump' in bi-directional text
      var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      otherCursor.style.display = "";
      otherCursor.style.left = pos.other.left + "px";
      otherCursor.style.top = pos.other.top + "px";
      otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
    }
  }

  function cmpCoords(a, b) { return a.top - b.top || a.left - b.left }

  // Draws the given range as a highlighted selection
  function drawSelectionRange(cm, range$$1, output) {
    var display = cm.display, doc = cm.doc;
    var fragment = document.createDocumentFragment();
    var padding = paddingH(cm.display), leftSide = padding.left;
    var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
    var docLTR = doc.direction == "ltr";

    function add(left, top, width, bottom) {
      if (top < 0) { top = 0; }
      top = Math.round(top);
      bottom = Math.round(bottom);
      fragment.appendChild(elt("div", null, "CodeMirror-selected", ("position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px")));
    }

    function drawForLine(line, fromArg, toArg) {
      var lineObj = getLine(doc, line);
      var lineLen = lineObj.text.length;
      var start, end;
      function coords(ch, bias) {
        return charCoords(cm, Pos(line, ch), "div", lineObj, bias)
      }

      function wrapX(pos, dir, side) {
        var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
        var prop = (dir == "ltr") == (side == "after") ? "left" : "right";
        var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
        return coords(ch, prop)[prop]
      }

      var order = getOrder(lineObj, doc.direction);
      iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function (from, to, dir, i) {
        var ltr = dir == "ltr";
        var fromPos = coords(from, ltr ? "left" : "right");
        var toPos = coords(to - 1, ltr ? "right" : "left");

        var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
        var first = i == 0, last = !order || i == order.length - 1;
        if (toPos.top - fromPos.top <= 3) { // Single line
          var openLeft = (docLTR ? openStart : openEnd) && first;
          var openRight = (docLTR ? openEnd : openStart) && last;
          var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
          var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
          add(left, fromPos.top, right - left, fromPos.bottom);
        } else { // Multiple lines
          var topLeft, topRight, botLeft, botRight;
          if (ltr) {
            topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
            topRight = docLTR ? rightSide : wrapX(from, dir, "before");
            botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
            botRight = docLTR && openEnd && last ? rightSide : toPos.right;
          } else {
            topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
            topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
            botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
            botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
          }
          add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
          if (fromPos.bottom < toPos.top) { add(leftSide, fromPos.bottom, null, toPos.top); }
          add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
        }

        if (!start || cmpCoords(fromPos, start) < 0) { start = fromPos; }
        if (cmpCoords(toPos, start) < 0) { start = toPos; }
        if (!end || cmpCoords(fromPos, end) < 0) { end = fromPos; }
        if (cmpCoords(toPos, end) < 0) { end = toPos; }
      });
      return {start: start, end: end}
    }

    var sFrom = range$$1.from(), sTo = range$$1.to();
    if (sFrom.line == sTo.line) {
      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
    } else {
      var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
      var singleVLine = visualLine(fromLine) == visualLine(toLine);
      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
      if (singleVLine) {
        if (leftEnd.top < rightStart.top - 2) {
          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
        } else {
          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
        }
      }
      if (leftEnd.bottom < rightStart.top)
        { add(leftSide, leftEnd.bottom, null, rightStart.top); }
    }

    output.appendChild(fragment);
  }

  // Cursor-blinking
  function restartBlink(cm) {
    if (!cm.state.focused) { return }
    var display = cm.display;
    clearInterval(display.blinker);
    var on = true;
    display.cursorDiv.style.visibility = "";
    if (cm.options.cursorBlinkRate > 0)
      { display.blinker = setInterval(function () { return display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden"; },
        cm.options.cursorBlinkRate); }
    else if (cm.options.cursorBlinkRate < 0)
      { display.cursorDiv.style.visibility = "hidden"; }
  }

  function ensureFocus(cm) {
    if (!cm.state.focused) { cm.display.input.focus(); onFocus(cm); }
  }

  function delayBlurEvent(cm) {
    cm.state.delayingBlurEvent = true;
    setTimeout(function () { if (cm.state.delayingBlurEvent) {
      cm.state.delayingBlurEvent = false;
      onBlur(cm);
    } }, 100);
  }

  function onFocus(cm, e) {
    if (cm.state.delayingBlurEvent) { cm.state.delayingBlurEvent = false; }

    if (cm.options.readOnly == "nocursor") { return }
    if (!cm.state.focused) {
      signal(cm, "focus", cm, e);
      cm.state.focused = true;
      addClass(cm.display.wrapper, "CodeMirror-focused");
      // This test prevents this from firing when a context
      // menu is closed (since the input reset would kill the
      // select-all detection hack)
      if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
        cm.display.input.reset();
        if (webkit) { setTimeout(function () { return cm.display.input.reset(true); }, 20); } // Issue #1730
      }
      cm.display.input.receivedFocus();
    }
    restartBlink(cm);
  }
  function onBlur(cm, e) {
    if (cm.state.delayingBlurEvent) { return }

    if (cm.state.focused) {
      signal(cm, "blur", cm, e);
      cm.state.focused = false;
      rmClass(cm.display.wrapper, "CodeMirror-focused");
    }
    clearInterval(cm.display.blinker);
    setTimeout(function () { if (!cm.state.focused) { cm.display.shift = false; } }, 150);
  }

  // Read the actual heights of the rendered lines, and update their
  // stored heights to match.
  function updateHeightsInViewport(cm) {
    var display = cm.display;
    var prevBottom = display.lineDiv.offsetTop;
    for (var i = 0; i < display.view.length; i++) {
      var cur = display.view[i], wrapping = cm.options.lineWrapping;
      var height = (void 0), width = 0;
      if (cur.hidden) { continue }
      if (ie && ie_version < 8) {
        var bot = cur.node.offsetTop + cur.node.offsetHeight;
        height = bot - prevBottom;
        prevBottom = bot;
      } else {
        var box = cur.node.getBoundingClientRect();
        height = box.bottom - box.top;
        // Check that lines don't extend past the right of the current
        // editor width
        if (!wrapping && cur.text.firstChild)
          { width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1; }
      }
      var diff = cur.line.height - height;
      if (diff > .005 || diff < -.005) {
        updateLineHeight(cur.line, height);
        updateWidgetHeight(cur.line);
        if (cur.rest) { for (var j = 0; j < cur.rest.length; j++)
          { updateWidgetHeight(cur.rest[j]); } }
      }
      if (width > cm.display.sizerWidth) {
        var chWidth = Math.ceil(width / charWidth(cm.display));
        if (chWidth > cm.display.maxLineLength) {
          cm.display.maxLineLength = chWidth;
          cm.display.maxLine = cur.line;
          cm.display.maxLineChanged = true;
        }
      }
    }
  }

  // Read and store the height of line widgets associated with the
  // given line.
  function updateWidgetHeight(line) {
    if (line.widgets) { for (var i = 0; i < line.widgets.length; ++i) {
      var w = line.widgets[i], parent = w.node.parentNode;
      if (parent) { w.height = parent.offsetHeight; }
    } }
  }

  // Compute the lines that are visible in a given viewport (defaults
  // the the current scroll position). viewport may contain top,
  // height, and ensure (see op.scrollToPos) properties.
  function visibleLines(display, doc, viewport) {
    var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
    top = Math.floor(top - paddingTop(display));
    var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;

    var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
    // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
    // forces those lines into the viewport (if possible).
    if (viewport && viewport.ensure) {
      var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
      if (ensureFrom < from) {
        from = ensureFrom;
        to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
      } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
        from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
        to = ensureTo;
      }
    }
    return {from: from, to: Math.max(to, from + 1)}
  }

  // SCROLLING THINGS INTO VIEW

  // If an editor sits on the top or bottom of the window, partially
  // scrolled out of view, this ensures that the cursor is visible.
  function maybeScrollWindow(cm, rect) {
    if (signalDOMEvent(cm, "scrollCursorIntoView")) { return }

    var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
    if (rect.top + box.top < 0) { doScroll = true; }
    else if (rect.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) { doScroll = false; }
    if (doScroll != null && !phantom) {
      var scrollNode = elt("div", "\u200b", null, ("position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + (rect.left) + "px; width: " + (Math.max(2, rect.right - rect.left)) + "px;"));
      cm.display.lineSpace.appendChild(scrollNode);
      scrollNode.scrollIntoView(doScroll);
      cm.display.lineSpace.removeChild(scrollNode);
    }
  }

  // Scroll a given position into view (immediately), verifying that
  // it actually became visible (as line heights are accurately
  // measured, the position of something may 'drift' during drawing).
  function scrollPosIntoView(cm, pos, end, margin) {
    if (margin == null) { margin = 0; }
    var rect;
    if (!cm.options.lineWrapping && pos == end) {
      // Set pos and end to the cursor positions around the character pos sticks to
      // If pos.sticky == "before", that is around pos.ch - 1, otherwise around pos.ch
      // If pos == Pos(_, 0, "before"), pos and end are unchanged
      pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
      end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
    }
    for (var limit = 0; limit < 5; limit++) {
      var changed = false;
      var coords = cursorCoords(cm, pos);
      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
      rect = {left: Math.min(coords.left, endCoords.left),
              top: Math.min(coords.top, endCoords.top) - margin,
              right: Math.max(coords.left, endCoords.left),
              bottom: Math.max(coords.bottom, endCoords.bottom) + margin};
      var scrollPos = calculateScrollPos(cm, rect);
      var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
      if (scrollPos.scrollTop != null) {
        updateScrollTop(cm, scrollPos.scrollTop);
        if (Math.abs(cm.doc.scrollTop - startTop) > 1) { changed = true; }
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) { changed = true; }
      }
      if (!changed) { break }
    }
    return rect
  }

  // Scroll a given set of coordinates into view (immediately).
  function scrollIntoView(cm, rect) {
    var scrollPos = calculateScrollPos(cm, rect);
    if (scrollPos.scrollTop != null) { updateScrollTop(cm, scrollPos.scrollTop); }
    if (scrollPos.scrollLeft != null) { setScrollLeft(cm, scrollPos.scrollLeft); }
  }

  // Calculate a new scroll position needed to scroll the given
  // rectangle into view. Returns an object with scrollTop and
  // scrollLeft properties. When these are undefined, the
  // vertical/horizontal position does not need to be adjusted.
  function calculateScrollPos(cm, rect) {
    var display = cm.display, snapMargin = textHeight(cm.display);
    if (rect.top < 0) { rect.top = 0; }
    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
    var screen = displayHeight(cm), result = {};
    if (rect.bottom - rect.top > screen) { rect.bottom = rect.top + screen; }
    var docBottom = cm.doc.height + paddingVert(display);
    var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
    if (rect.top < screentop) {
      result.scrollTop = atTop ? 0 : rect.top;
    } else if (rect.bottom > screentop + screen) {
      var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen);
      if (newTop != screentop) { result.scrollTop = newTop; }
    }

    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
    var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
    var tooWide = rect.right - rect.left > screenw;
    if (tooWide) { rect.right = rect.left + screenw; }
    if (rect.left < 10)
      { result.scrollLeft = 0; }
    else if (rect.left < screenleft)
      { result.scrollLeft = Math.max(0, rect.left - (tooWide ? 0 : 10)); }
    else if (rect.right > screenw + screenleft - 3)
      { result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw; }
    return result
  }

  // Store a relative adjustment to the scroll position in the current
  // operation (to be applied when the operation finishes).
  function addToScrollTop(cm, top) {
    if (top == null) { return }
    resolveScrollToPos(cm);
    cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
  }

  // Make sure that at the end of the operation the current cursor is
  // shown.
  function ensureCursorVisible(cm) {
    resolveScrollToPos(cm);
    var cur = cm.getCursor();
    cm.curOp.scrollToPos = {from: cur, to: cur, margin: cm.options.cursorScrollMargin};
  }

  function scrollToCoords(cm, x, y) {
    if (x != null || y != null) { resolveScrollToPos(cm); }
    if (x != null) { cm.curOp.scrollLeft = x; }
    if (y != null) { cm.curOp.scrollTop = y; }
  }

  function scrollToRange(cm, range$$1) {
    resolveScrollToPos(cm);
    cm.curOp.scrollToPos = range$$1;
  }

  // When an operation has its scrollToPos property set, and another
  // scroll action is applied before the end of the operation, this
  // 'simulates' scrolling that position into view in a cheap way, so
  // that the effect of intermediate scroll commands is not ignored.
  function resolveScrollToPos(cm) {
    var range$$1 = cm.curOp.scrollToPos;
    if (range$$1) {
      cm.curOp.scrollToPos = null;
      var from = estimateCoords(cm, range$$1.from), to = estimateCoords(cm, range$$1.to);
      scrollToCoordsRange(cm, from, to, range$$1.margin);
    }
  }

  function scrollToCoordsRange(cm, from, to, margin) {
    var sPos = calculateScrollPos(cm, {
      left: Math.min(from.left, to.left),
      top: Math.min(from.top, to.top) - margin,
      right: Math.max(from.right, to.right),
      bottom: Math.max(from.bottom, to.bottom) + margin
    });
    scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
  }

  // Sync the scrollable area and scrollbars, ensure the viewport
  // covers the visible area.
  function updateScrollTop(cm, val) {
    if (Math.abs(cm.doc.scrollTop - val) < 2) { return }
    if (!gecko) { updateDisplaySimple(cm, {top: val}); }
    setScrollTop(cm, val, true);
    if (gecko) { updateDisplaySimple(cm); }
    startWorker(cm, 100);
  }

  function setScrollTop(cm, val, forceScroll) {
    val = Math.max(0, Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val));
    if (cm.display.scroller.scrollTop == val && !forceScroll) { return }
    cm.doc.scrollTop = val;
    cm.display.scrollbars.setScrollTop(val);
    if (cm.display.scroller.scrollTop != val) { cm.display.scroller.scrollTop = val; }
  }

  // Sync scroller and scrollbar, ensure the gutter elements are
  // aligned.
  function setScrollLeft(cm, val, isScroller, forceScroll) {
    val = Math.max(0, Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth));
    if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) { return }
    cm.doc.scrollLeft = val;
    alignHorizontally(cm);
    if (cm.display.scroller.scrollLeft != val) { cm.display.scroller.scrollLeft = val; }
    cm.display.scrollbars.setScrollLeft(val);
  }

  // SCROLLBARS

  // Prepare DOM reads needed to update the scrollbars. Done in one
  // shot to minimize update/measure roundtrips.
  function measureForScrollbars(cm) {
    var d = cm.display, gutterW = d.gutters.offsetWidth;
    var docH = Math.round(cm.doc.height + paddingVert(cm.display));
    return {
      clientHeight: d.scroller.clientHeight,
      viewHeight: d.wrapper.clientHeight,
      scrollWidth: d.scroller.scrollWidth, clientWidth: d.scroller.clientWidth,
      viewWidth: d.wrapper.clientWidth,
      barLeft: cm.options.fixedGutter ? gutterW : 0,
      docHeight: docH,
      scrollHeight: docH + scrollGap(cm) + d.barHeight,
      nativeBarWidth: d.nativeBarWidth,
      gutterWidth: gutterW
    }
  }

  var NativeScrollbars = function(place, scroll, cm) {
    this.cm = cm;
    var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
    var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    vert.tabIndex = horiz.tabIndex = -1;
    place(vert); place(horiz);

    on(vert, "scroll", function () {
      if (vert.clientHeight) { scroll(vert.scrollTop, "vertical"); }
    });
    on(horiz, "scroll", function () {
      if (horiz.clientWidth) { scroll(horiz.scrollLeft, "horizontal"); }
    });

    this.checkedZeroWidth = false;
    // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
    if (ie && ie_version < 8) { this.horiz.style.minHeight = this.vert.style.minWidth = "18px"; }
  };

  NativeScrollbars.prototype.update = function (measure) {
    var needsH = measure.scrollWidth > measure.clientWidth + 1;
    var needsV = measure.scrollHeight > measure.clientHeight + 1;
    var sWidth = measure.nativeBarWidth;

    if (needsV) {
      this.vert.style.display = "block";
      this.vert.style.bottom = needsH ? sWidth + "px" : "0";
      var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
      // A bug in IE8 can cause this value to be negative, so guard it.
      this.vert.firstChild.style.height =
        Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
    } else {
      this.vert.style.display = "";
      this.vert.firstChild.style.height = "0";
    }

    if (needsH) {
      this.horiz.style.display = "block";
      this.horiz.style.right = needsV ? sWidth + "px" : "0";
      this.horiz.style.left = measure.barLeft + "px";
      var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
      this.horiz.firstChild.style.width =
        Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
    } else {
      this.horiz.style.display = "";
      this.horiz.firstChild.style.width = "0";
    }

    if (!this.checkedZeroWidth && measure.clientHeight > 0) {
      if (sWidth == 0) { this.zeroWidthHack(); }
      this.checkedZeroWidth = true;
    }

    return {right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0}
  };

  NativeScrollbars.prototype.setScrollLeft = function (pos) {
    if (this.horiz.scrollLeft != pos) { this.horiz.scrollLeft = pos; }
    if (this.disableHoriz) { this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz"); }
  };

  NativeScrollbars.prototype.setScrollTop = function (pos) {
    if (this.vert.scrollTop != pos) { this.vert.scrollTop = pos; }
    if (this.disableVert) { this.enableZeroWidthBar(this.vert, this.disableVert, "vert"); }
  };

  NativeScrollbars.prototype.zeroWidthHack = function () {
    var w = mac && !mac_geMountainLion ? "12px" : "18px";
    this.horiz.style.height = this.vert.style.width = w;
    this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
    this.disableHoriz = new Delayed;
    this.disableVert = new Delayed;
  };

  NativeScrollbars.prototype.enableZeroWidthBar = function (bar, delay, type) {
    bar.style.pointerEvents = "auto";
    function maybeDisable() {
      // To find out whether the scrollbar is still visible, we
      // check whether the element under the pixel in the bottom
      // right corner of the scrollbar box is the scrollbar box
      // itself (when the bar is still visible) or its filler child
      // (when the bar is hidden). If it is still visible, we keep
      // it enabled, if it's hidden, we disable pointer events.
      var box = bar.getBoundingClientRect();
      var elt$$1 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2)
          : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
      if (elt$$1 != bar) { bar.style.pointerEvents = "none"; }
      else { delay.set(1000, maybeDisable); }
    }
    delay.set(1000, maybeDisable);
  };

  NativeScrollbars.prototype.clear = function () {
    var parent = this.horiz.parentNode;
    parent.removeChild(this.horiz);
    parent.removeChild(this.vert);
  };

  var NullScrollbars = function () {};

  NullScrollbars.prototype.update = function () { return {bottom: 0, right: 0} };
  NullScrollbars.prototype.setScrollLeft = function () {};
  NullScrollbars.prototype.setScrollTop = function () {};
  NullScrollbars.prototype.clear = function () {};

  function updateScrollbars(cm, measure) {
    if (!measure) { measure = measureForScrollbars(cm); }
    var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
    updateScrollbarsInner(cm, measure);
    for (var i = 0; i < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i++) {
      if (startWidth != cm.display.barWidth && cm.options.lineWrapping)
        { updateHeightsInViewport(cm); }
      updateScrollbarsInner(cm, measureForScrollbars(cm));
      startWidth = cm.display.barWidth; startHeight = cm.display.barHeight;
    }
  }

  // Re-synchronize the fake scrollbars with the actual size of the
  // content.
  function updateScrollbarsInner(cm, measure) {
    var d = cm.display;
    var sizes = d.scrollbars.update(measure);

    d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
    d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
    d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";

    if (sizes.right && sizes.bottom) {
      d.scrollbarFiller.style.display = "block";
      d.scrollbarFiller.style.height = sizes.bottom + "px";
      d.scrollbarFiller.style.width = sizes.right + "px";
    } else { d.scrollbarFiller.style.display = ""; }
    if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
      d.gutterFiller.style.display = "block";
      d.gutterFiller.style.height = sizes.bottom + "px";
      d.gutterFiller.style.width = measure.gutterWidth + "px";
    } else { d.gutterFiller.style.display = ""; }
  }

  var scrollbarModel = {"native": NativeScrollbars, "null": NullScrollbars};

  function initScrollbars(cm) {
    if (cm.display.scrollbars) {
      cm.display.scrollbars.clear();
      if (cm.display.scrollbars.addClass)
        { rmClass(cm.display.wrapper, cm.display.scrollbars.addClass); }
    }

    cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function (node) {
      cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
      // Prevent clicks in the scrollbars from killing focus
      on(node, "mousedown", function () {
        if (cm.state.focused) { setTimeout(function () { return cm.display.input.focus(); }, 0); }
      });
      node.setAttribute("cm-not-content", "true");
    }, function (pos, axis) {
      if (axis == "horizontal") { setScrollLeft(cm, pos); }
      else { updateScrollTop(cm, pos); }
    }, cm);
    if (cm.display.scrollbars.addClass)
      { addClass(cm.display.wrapper, cm.display.scrollbars.addClass); }
  }

  // Operations are used to wrap a series of changes to the editor
  // state in such a way that each change won't have to update the
  // cursor and display (which would be awkward, slow, and
  // error-prone). Instead, display updates are batched and then all
  // combined and executed at once.

  var nextOpId = 0;
  // Start a new operation.
  function startOperation(cm) {
    cm.curOp = {
      cm: cm,
      viewChanged: false,      // Flag that indicates that lines might need to be redrawn
      startHeight: cm.doc.height, // Used to detect need to update scrollbar
      forceUpdate: false,      // Used to force a redraw
      updateInput: 0,       // Whether to reset the input textarea
      typing: false,           // Whether this reset should be careful to leave existing text (for compositing)
      changeObjs: null,        // Accumulated changes, for firing change events
      cursorActivityHandlers: null, // Set of handlers to fire cursorActivity on
      cursorActivityCalled: 0, // Tracks which cursorActivity handlers have been called already
      selectionChanged: false, // Whether the selection needs to be redrawn
      updateMaxLine: false,    // Set when the widest line needs to be determined anew
      scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
      scrollToPos: null,       // Used to scroll to a specific position
      focus: false,
      id: ++nextOpId           // Unique ID
    };
    pushOperation(cm.curOp);
  }

  // Finish an operation, updating the display and signalling delayed events
  function endOperation(cm) {
    var op = cm.curOp;
    if (op) { finishOperation(op, function (group) {
      for (var i = 0; i < group.ops.length; i++)
        { group.ops[i].cm.curOp = null; }
      endOperations(group);
    }); }
  }

  // The DOM updates done when an operation finishes are batched so
  // that the minimum number of relayouts are required.
  function endOperations(group) {
    var ops = group.ops;
    for (var i = 0; i < ops.length; i++) // Read DOM
      { endOperation_R1(ops[i]); }
    for (var i$1 = 0; i$1 < ops.length; i$1++) // Write DOM (maybe)
      { endOperation_W1(ops[i$1]); }
    for (var i$2 = 0; i$2 < ops.length; i$2++) // Read DOM
      { endOperation_R2(ops[i$2]); }
    for (var i$3 = 0; i$3 < ops.length; i$3++) // Write DOM (maybe)
      { endOperation_W2(ops[i$3]); }
    for (var i$4 = 0; i$4 < ops.length; i$4++) // Read DOM
      { endOperation_finish(ops[i$4]); }
  }

  function endOperation_R1(op) {
    var cm = op.cm, display = cm.display;
    maybeClipScrollbars(cm);
    if (op.updateMaxLine) { findMaxLine(cm); }

    op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null ||
      op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom ||
                         op.scrollToPos.to.line >= display.viewTo) ||
      display.maxLineChanged && cm.options.lineWrapping;
    op.update = op.mustUpdate &&
      new DisplayUpdate(cm, op.mustUpdate && {top: op.scrollTop, ensure: op.scrollToPos}, op.forceUpdate);
  }

  function endOperation_W1(op) {
    op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
  }

  function endOperation_R2(op) {
    var cm = op.cm, display = cm.display;
    if (op.updatedDisplay) { updateHeightsInViewport(cm); }

    op.barMeasure = measureForScrollbars(cm);

    // If the max line changed since it was last measured, measure it,
    // and ensure the document's width matches it.
    // updateDisplay_W2 will use these properties to do the actual resizing
    if (display.maxLineChanged && !cm.options.lineWrapping) {
      op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
      cm.display.sizerWidth = op.adjustWidthTo;
      op.barMeasure.scrollWidth =
        Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
      op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
    }

    if (op.updatedDisplay || op.selectionChanged)
      { op.preparedSelection = display.input.prepareSelection(); }
  }

  function endOperation_W2(op) {
    var cm = op.cm;

    if (op.adjustWidthTo != null) {
      cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
      if (op.maxScrollLeft < cm.doc.scrollLeft)
        { setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true); }
      cm.display.maxLineChanged = false;
    }

    var takeFocus = op.focus && op.focus == activeElt();
    if (op.preparedSelection)
      { cm.display.input.showSelection(op.preparedSelection, takeFocus); }
    if (op.updatedDisplay || op.startHeight != cm.doc.height)
      { updateScrollbars(cm, op.barMeasure); }
    if (op.updatedDisplay)
      { setDocumentHeight(cm, op.barMeasure); }

    if (op.selectionChanged) { restartBlink(cm); }

    if (cm.state.focused && op.updateInput)
      { cm.display.input.reset(op.typing); }
    if (takeFocus) { ensureFocus(op.cm); }
  }

  function endOperation_finish(op) {
    var cm = op.cm, display = cm.display, doc = cm.doc;

    if (op.updatedDisplay) { postUpdateDisplay(cm, op.update); }

    // Abort mouse wheel delta measurement, when scrolling explicitly
    if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos))
      { display.wheelStartX = display.wheelStartY = null; }

    // Propagate the scroll position to the actual DOM scroller
    if (op.scrollTop != null) { setScrollTop(cm, op.scrollTop, op.forceScroll); }

    if (op.scrollLeft != null) { setScrollLeft(cm, op.scrollLeft, true, true); }
    // If we need to scroll a specific position into view, do so.
    if (op.scrollToPos) {
      var rect = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from),
                                   clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
      maybeScrollWindow(cm, rect);
    }

    // Fire events for markers that are hidden/unidden by editing or
    // undoing
    var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
    if (hidden) { for (var i = 0; i < hidden.length; ++i)
      { if (!hidden[i].lines.length) { signal(hidden[i], "hide"); } } }
    if (unhidden) { for (var i$1 = 0; i$1 < unhidden.length; ++i$1)
      { if (unhidden[i$1].lines.length) { signal(unhidden[i$1], "unhide"); } } }

    if (display.wrapper.offsetHeight)
      { doc.scrollTop = cm.display.scroller.scrollTop; }

    // Fire change events, and delayed event handlers
    if (op.changeObjs)
      { signal(cm, "changes", cm, op.changeObjs); }
    if (op.update)
      { op.update.finish(); }
  }

  // Run the given function in an operation
  function runInOp(cm, f) {
    if (cm.curOp) { return f() }
    startOperation(cm);
    try { return f() }
    finally { endOperation(cm); }
  }
  // Wraps a function in an operation. Returns the wrapped function.
  function operation(cm, f) {
    return function() {
      if (cm.curOp) { return f.apply(cm, arguments) }
      startOperation(cm);
      try { return f.apply(cm, arguments) }
      finally { endOperation(cm); }
    }
  }
  // Used to add methods to editor and doc instances, wrapping them in
  // operations.
  function methodOp(f) {
    return function() {
      if (this.curOp) { return f.apply(this, arguments) }
      startOperation(this);
      try { return f.apply(this, arguments) }
      finally { endOperation(this); }
    }
  }
  function docMethodOp(f) {
    return function() {
      var cm = this.cm;
      if (!cm || cm.curOp) { return f.apply(this, arguments) }
      startOperation(cm);
      try { return f.apply(this, arguments) }
      finally { endOperation(cm); }
    }
  }

  // HIGHLIGHT WORKER

  function startWorker(cm, time) {
    if (cm.doc.highlightFrontier < cm.display.viewTo)
      { cm.state.highlight.set(time, bind(highlightWorker, cm)); }
  }

  function highlightWorker(cm) {
    var doc = cm.doc;
    if (doc.highlightFrontier >= cm.display.viewTo) { return }
    var end = +new Date + cm.options.workTime;
    var context = getContextBefore(cm, doc.highlightFrontier);
    var changedLines = [];

    doc.iter(context.line, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function (line) {
      if (context.line >= cm.display.viewFrom) { // Visible
        var oldStyles = line.styles;
        var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc.mode, context.state) : null;
        var highlighted = highlightLine(cm, line, context, true);
        if (resetState) { context.state = resetState; }
        line.styles = highlighted.styles;
        var oldCls = line.styleClasses, newCls = highlighted.classes;
        if (newCls) { line.styleClasses = newCls; }
        else if (oldCls) { line.styleClasses = null; }
        var ischange = !oldStyles || oldStyles.length != line.styles.length ||
          oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
        for (var i = 0; !ischange && i < oldStyles.length; ++i) { ischange = oldStyles[i] != line.styles[i]; }
        if (ischange) { changedLines.push(context.line); }
        line.stateAfter = context.save();
        context.nextLine();
      } else {
        if (line.text.length <= cm.options.maxHighlightLength)
          { processLine(cm, line.text, context); }
        line.stateAfter = context.line % 5 == 0 ? context.save() : null;
        context.nextLine();
      }
      if (+new Date > end) {
        startWorker(cm, cm.options.workDelay);
        return true
      }
    });
    doc.highlightFrontier = context.line;
    doc.modeFrontier = Math.max(doc.modeFrontier, context.line);
    if (changedLines.length) { runInOp(cm, function () {
      for (var i = 0; i < changedLines.length; i++)
        { regLineChange(cm, changedLines[i], "text"); }
    }); }
  }

  // DISPLAY DRAWING

  var DisplayUpdate = function(cm, viewport, force) {
    var display = cm.display;

    this.viewport = viewport;
    // Store some values that we'll need later (but don't want to force a relayout for)
    this.visible = visibleLines(display, cm.doc, viewport);
    this.editorIsHidden = !display.wrapper.offsetWidth;
    this.wrapperHeight = display.wrapper.clientHeight;
    this.wrapperWidth = display.wrapper.clientWidth;
    this.oldDisplayWidth = displayWidth(cm);
    this.force = force;
    this.dims = getDimensions(cm);
    this.events = [];
  };

  DisplayUpdate.prototype.signal = function (emitter, type) {
    if (hasHandler(emitter, type))
      { this.events.push(arguments); }
  };
  DisplayUpdate.prototype.finish = function () {
      var this$1 = this;

    for (var i = 0; i < this.events.length; i++)
      { signal.apply(null, this$1.events[i]); }
  };

  function maybeClipScrollbars(cm) {
    var display = cm.display;
    if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
      display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
      display.heightForcer.style.height = scrollGap(cm) + "px";
      display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
      display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
      display.scrollbarsClipped = true;
    }
  }

  function selectionSnapshot(cm) {
    if (cm.hasFocus()) { return null }
    var active = activeElt();
    if (!active || !contains(cm.display.lineDiv, active)) { return null }
    var result = {activeElt: active};
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
        result.anchorNode = sel.anchorNode;
        result.anchorOffset = sel.anchorOffset;
        result.focusNode = sel.focusNode;
        result.focusOffset = sel.focusOffset;
      }
    }
    return result
  }

  function restoreSelection(snapshot) {
    if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt()) { return }
    snapshot.activeElt.focus();
    if (snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
      var sel = window.getSelection(), range$$1 = document.createRange();
      range$$1.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
      range$$1.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range$$1);
      sel.extend(snapshot.focusNode, snapshot.focusOffset);
    }
  }

  // Does the actual updating of the line display. Bails out
  // (returning false) when there is nothing to be done and forced is
  // false.
  function updateDisplayIfNeeded(cm, update) {
    var display = cm.display, doc = cm.doc;

    if (update.editorIsHidden) {
      resetView(cm);
      return false
    }

    // Bail out if the visible area is already rendered and nothing changed.
    if (!update.force &&
        update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo &&
        (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) &&
        display.renderedView == display.view && countDirtyView(cm) == 0)
      { return false }

    if (maybeUpdateLineNumberWidth(cm)) {
      resetView(cm);
      update.dims = getDimensions(cm);
    }

    // Compute a suitable new viewport (from & to)
    var end = doc.first + doc.size;
    var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
    var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
    if (display.viewFrom < from && from - display.viewFrom < 20) { from = Math.max(doc.first, display.viewFrom); }
    if (display.viewTo > to && display.viewTo - to < 20) { to = Math.min(end, display.viewTo); }
    if (sawCollapsedSpans) {
      from = visualLineNo(cm.doc, from);
      to = visualLineEndNo(cm.doc, to);
    }

    var different = from != display.viewFrom || to != display.viewTo ||
      display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
    adjustView(cm, from, to);

    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
    // Position the mover div to align with the current scroll position
    cm.display.mover.style.top = display.viewOffset + "px";

    var toUpdate = countDirtyView(cm);
    if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view &&
        (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo))
      { return false }

    // For big changes, we hide the enclosing element during the
    // update, since that speeds up the operations on most browsers.
    var selSnapshot = selectionSnapshot(cm);
    if (toUpdate > 4) { display.lineDiv.style.display = "none"; }
    patchDisplay(cm, display.updateLineNumbers, update.dims);
    if (toUpdate > 4) { display.lineDiv.style.display = ""; }
    display.renderedView = display.view;
    // There might have been a widget with a focused element that got
    // hidden or updated, if so re-focus it.
    restoreSelection(selSnapshot);

    // Prevent selection and cursors from interfering with the scroll
    // width and height.
    removeChildren(display.cursorDiv);
    removeChildren(display.selectionDiv);
    display.gutters.style.height = display.sizer.style.minHeight = 0;

    if (different) {
      display.lastWrapHeight = update.wrapperHeight;
      display.lastWrapWidth = update.wrapperWidth;
      startWorker(cm, 400);
    }

    display.updateLineNumbers = null;

    return true
  }

  function postUpdateDisplay(cm, update) {
    var viewport = update.viewport;

    for (var first = true;; first = false) {
      if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
        // Clip forced viewport to actual scrollable area.
        if (viewport && viewport.top != null)
          { viewport = {top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top)}; }
        // Updated line heights might result in the drawn area not
        // actually covering the viewport. Keep looping until it does.
        update.visible = visibleLines(cm.display, cm.doc, viewport);
        if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo)
          { break }
      }
      if (!updateDisplayIfNeeded(cm, update)) { break }
      updateHeightsInViewport(cm);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.force = false;
    }

    update.signal(cm, "update", cm);
    if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
      update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
      cm.display.reportedViewFrom = cm.display.viewFrom; cm.display.reportedViewTo = cm.display.viewTo;
    }
  }

  function updateDisplaySimple(cm, viewport) {
    var update = new DisplayUpdate(cm, viewport);
    if (updateDisplayIfNeeded(cm, update)) {
      updateHeightsInViewport(cm);
      postUpdateDisplay(cm, update);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.finish();
    }
  }

  // Sync the actual display DOM structure with display.view, removing
  // nodes for lines that are no longer in view, and creating the ones
  // that are not there yet, and updating the ones that are out of
  // date.
  function patchDisplay(cm, updateNumbersFrom, dims) {
    var display = cm.display, lineNumbers = cm.options.lineNumbers;
    var container = display.lineDiv, cur = container.firstChild;

    function rm(node) {
      var next = node.nextSibling;
      // Works around a throw-scroll bug in OS X Webkit
      if (webkit && mac && cm.display.currentWheelTarget == node)
        { node.style.display = "none"; }
      else
        { node.parentNode.removeChild(node); }
      return next
    }

    var view = display.view, lineN = display.viewFrom;
    // Loop over the elements in the view, syncing cur (the DOM nodes
    // in display.lineDiv) with the view as we go.
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (lineView.hidden) ; else if (!lineView.node || lineView.node.parentNode != container) { // Not drawn yet
        var node = buildLineElement(cm, lineView, lineN, dims);
        container.insertBefore(node, cur);
      } else { // Already drawn
        while (cur != lineView.node) { cur = rm(cur); }
        var updateNumber = lineNumbers && updateNumbersFrom != null &&
          updateNumbersFrom <= lineN && lineView.lineNumber;
        if (lineView.changes) {
          if (indexOf(lineView.changes, "gutter") > -1) { updateNumber = false; }
          updateLineForChanges(cm, lineView, lineN, dims);
        }
        if (updateNumber) {
          removeChildren(lineView.lineNumber);
          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
        }
        cur = lineView.node.nextSibling;
      }
      lineN += lineView.size;
    }
    while (cur) { cur = rm(cur); }
  }

  function updateGutterSpace(display) {
    var width = display.gutters.offsetWidth;
    display.sizer.style.marginLeft = width + "px";
  }

  function setDocumentHeight(cm, measure) {
    cm.display.sizer.style.minHeight = measure.docHeight + "px";
    cm.display.heightForcer.style.top = measure.docHeight + "px";
    cm.display.gutters.style.height = (measure.docHeight + cm.display.barHeight + scrollGap(cm)) + "px";
  }

  // Re-align line numbers and gutter marks to compensate for
  // horizontal scrolling.
  function alignHorizontally(cm) {
    var display = cm.display, view = display.view;
    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) { return }
    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
    var gutterW = display.gutters.offsetWidth, left = comp + "px";
    for (var i = 0; i < view.length; i++) { if (!view[i].hidden) {
      if (cm.options.fixedGutter) {
        if (view[i].gutter)
          { view[i].gutter.style.left = left; }
        if (view[i].gutterBackground)
          { view[i].gutterBackground.style.left = left; }
      }
      var align = view[i].alignable;
      if (align) { for (var j = 0; j < align.length; j++)
        { align[j].style.left = left; } }
    } }
    if (cm.options.fixedGutter)
      { display.gutters.style.left = (comp + gutterW) + "px"; }
  }

  // Used to ensure that the line number gutter is still the right
  // size for the current document size. Returns true when an update
  // is needed.
  function maybeUpdateLineNumberWidth(cm) {
    if (!cm.options.lineNumbers) { return false }
    var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
    if (last.length != display.lineNumChars) {
      var test = display.measure.appendChild(elt("div", [elt("div", last)],
                                                 "CodeMirror-linenumber CodeMirror-gutter-elt"));
      var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
      display.lineGutter.style.width = "";
      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
      display.lineNumWidth = display.lineNumInnerWidth + padding;
      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
      display.lineGutter.style.width = display.lineNumWidth + "px";
      updateGutterSpace(cm.display);
      return true
    }
    return false
  }

  function getGutters(gutters, lineNumbers) {
    var result = [], sawLineNumbers = false;
    for (var i = 0; i < gutters.length; i++) {
      var name = gutters[i], style = null;
      if (typeof name != "string") { style = name.style; name = name.className; }
      if (name == "CodeMirror-linenumbers") {
        if (!lineNumbers) { continue }
        else { sawLineNumbers = true; }
      }
      result.push({className: name, style: style});
    }
    if (lineNumbers && !sawLineNumbers) { result.push({className: "CodeMirror-linenumbers", style: null}); }
    return result
  }

  // Rebuild the gutter elements, ensure the margin to the left of the
  // code matches their width.
  function renderGutters(display) {
    var gutters = display.gutters, specs = display.gutterSpecs;
    removeChildren(gutters);
    display.lineGutter = null;
    for (var i = 0; i < specs.length; ++i) {
      var ref = specs[i];
      var className = ref.className;
      var style = ref.style;
      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
      if (style) { gElt.style.cssText = style; }
      if (className == "CodeMirror-linenumbers") {
        display.lineGutter = gElt;
        gElt.style.width = (display.lineNumWidth || 1) + "px";
      }
    }
    gutters.style.display = specs.length ? "" : "none";
    updateGutterSpace(display);
  }

  function updateGutters(cm) {
    renderGutters(cm.display);
    regChange(cm);
    alignHorizontally(cm);
  }

  // The display handles the DOM integration, both for input reading
  // and content drawing. It holds references to DOM nodes and
  // display-related state.

  function Display(place, doc, input, options) {
    var d = this;
    this.input = input;

    // Covers bottom-right square when both scrollbars are present.
    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
    d.scrollbarFiller.setAttribute("cm-not-content", "true");
    // Covers bottom of gutter when coverGutterNextToScrollbar is on
    // and h scrollbar is present.
    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
    d.gutterFiller.setAttribute("cm-not-content", "true");
    // Will contain the actual code, positioned to cover the viewport.
    d.lineDiv = eltP("div", null, "CodeMirror-code");
    // Elements are added to these to represent selection and cursors.
    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
    // A visibility: hidden element used to find the size of things.
    d.measure = elt("div", null, "CodeMirror-measure");
    // When lines outside of the viewport are measured, they are drawn in this.
    d.lineMeasure = elt("div", null, "CodeMirror-measure");
    // Wraps everything that needs to exist inside the vertically-padded coordinate system
    d.lineSpace = eltP("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
                      null, "position: relative; outline: none");
    var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
    // Moved around its parent to cover visible view.
    d.mover = elt("div", [lines], null, "position: relative");
    // Set to the height of the document, allowing scrolling.
    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
    d.sizerWidth = null;
    // Behavior of elts with overflow: auto and padding is
    // inconsistent across browsers. This is used to ensure the
    // scrollable area is big enough.
    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
    // Will contain the gutters, if any.
    d.gutters = elt("div", null, "CodeMirror-gutters");
    d.lineGutter = null;
    // Actual scrollable element.
    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
    d.scroller.setAttribute("tabIndex", "-1");
    // The element in which the editor lives.
    d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");

    // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
    if (ie && ie_version < 8) { d.gutters.style.zIndex = -1; d.scroller.style.paddingRight = 0; }
    if (!webkit && !(gecko && mobile)) { d.scroller.draggable = true; }

    if (place) {
      if (place.appendChild) { place.appendChild(d.wrapper); }
      else { place(d.wrapper); }
    }

    // Current rendered range (may be bigger than the view window).
    d.viewFrom = d.viewTo = doc.first;
    d.reportedViewFrom = d.reportedViewTo = doc.first;
    // Information about the rendered lines.
    d.view = [];
    d.renderedView = null;
    // Holds info about a single rendered line when it was rendered
    // for measurement, while not in view.
    d.externalMeasured = null;
    // Empty space (in pixels) above the view
    d.viewOffset = 0;
    d.lastWrapHeight = d.lastWrapWidth = 0;
    d.updateLineNumbers = null;

    d.nativeBarWidth = d.barHeight = d.barWidth = 0;
    d.scrollbarsClipped = false;

    // Used to only resize the line number gutter when necessary (when
    // the amount of lines crosses a boundary that makes its width change)
    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
    // Set to true when a non-horizontal-scrolling line widget is
    // added. As an optimization, line widget aligning is skipped when
    // this is false.
    d.alignWidgets = false;

    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;

    // Tracks the maximum line length so that the horizontal scrollbar
    // can be kept static when scrolling.
    d.maxLine = null;
    d.maxLineLength = 0;
    d.maxLineChanged = false;

    // Used for measuring wheel scrolling granularity
    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;

    // True when shift is held down.
    d.shift = false;

    // Used to track whether anything happened since the context menu
    // was opened.
    d.selForContextMenu = null;

    d.activeTouch = null;

    d.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
    renderGutters(d);

    input.init(d);
  }

  // Since the delta values reported on mouse wheel events are
  // unstandardized between browsers and even browser versions, and
  // generally horribly unpredictable, this code starts by measuring
  // the scroll effect that the first few mouse wheel events have,
  // and, from that, detects the way it can convert deltas to pixel
  // offsets afterwards.
  //
  // The reason we want to know the amount a wheel event will scroll
  // is that it gives us a chance to update the display before the
  // actual scrolling happens, reducing flickering.

  var wheelSamples = 0, wheelPixelsPerUnit = null;
  // Fill in a browser-detected starting value on browsers where we
  // know one. These don't have to be accurate -- the result of them
  // being wrong would just be a slight flicker on the first wheel
  // scroll (if it is large enough).
  if (ie) { wheelPixelsPerUnit = -.53; }
  else if (gecko) { wheelPixelsPerUnit = 15; }
  else if (chrome) { wheelPixelsPerUnit = -.7; }
  else if (safari) { wheelPixelsPerUnit = -1/3; }

  function wheelEventDelta(e) {
    var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) { dx = e.detail; }
    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) { dy = e.detail; }
    else if (dy == null) { dy = e.wheelDelta; }
    return {x: dx, y: dy}
  }
  function wheelEventPixels(e) {
    var delta = wheelEventDelta(e);
    delta.x *= wheelPixelsPerUnit;
    delta.y *= wheelPixelsPerUnit;
    return delta
  }

  function onScrollWheel(cm, e) {
    var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;

    var display = cm.display, scroll = display.scroller;
    // Quit if there's nothing to scroll here
    var canScrollX = scroll.scrollWidth > scroll.clientWidth;
    var canScrollY = scroll.scrollHeight > scroll.clientHeight;
    if (!(dx && canScrollX || dy && canScrollY)) { return }

    // Webkit browsers on OS X abort momentum scrolls when the target
    // of the scroll event is removed from the scrollable element.
    // This hack (see related code in patchDisplay) makes sure the
    // element is kept around.
    if (dy && mac && webkit) {
      outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
        for (var i = 0; i < view.length; i++) {
          if (view[i].node == cur) {
            cm.display.currentWheelTarget = cur;
            break outer
          }
        }
      }
    }

    // On some browsers, horizontal scrolling will cause redraws to
    // happen before the gutter has been realigned, causing it to
    // wriggle around in a most unseemly way. When we have an
    // estimated pixels/delta value, we just handle horizontal
    // scrolling entirely here. It'll be slightly off from native, but
    // better than glitching out.
    if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
      if (dy && canScrollY)
        { updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * wheelPixelsPerUnit)); }
      setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * wheelPixelsPerUnit));
      // Only prevent default scrolling if vertical scrolling is
      // actually possible. Otherwise, it causes vertical scroll
      // jitter on OSX trackpads when deltaX is small and deltaY
      // is large (issue #3579)
      if (!dy || (dy && canScrollY))
        { e_preventDefault(e); }
      display.wheelStartX = null; // Abort measurement, if in progress
      return
    }

    // 'Project' the visible viewport to cover the area that is being
    // scrolled into view (if we know enough to estimate it).
    if (dy && wheelPixelsPerUnit != null) {
      var pixels = dy * wheelPixelsPerUnit;
      var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
      if (pixels < 0) { top = Math.max(0, top + pixels - 50); }
      else { bot = Math.min(cm.doc.height, bot + pixels + 50); }
      updateDisplaySimple(cm, {top: top, bottom: bot});
    }

    if (wheelSamples < 20) {
      if (display.wheelStartX == null) {
        display.wheelStartX = scroll.scrollLeft; display.wheelStartY = scroll.scrollTop;
        display.wheelDX = dx; display.wheelDY = dy;
        setTimeout(function () {
          if (display.wheelStartX == null) { return }
          var movedX = scroll.scrollLeft - display.wheelStartX;
          var movedY = scroll.scrollTop - display.wheelStartY;
          var sample = (movedY && display.wheelDY && movedY / display.wheelDY) ||
            (movedX && display.wheelDX && movedX / display.wheelDX);
          display.wheelStartX = display.wheelStartY = null;
          if (!sample) { return }
          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
          ++wheelSamples;
        }, 200);
      } else {
        display.wheelDX += dx; display.wheelDY += dy;
      }
    }
  }

  // Selection objects are immutable. A new one is created every time
  // the selection changes. A selection is one or more non-overlapping
  // (and non-touching) ranges, sorted, and an integer that indicates
  // which one is the primary selection (the one that's scrolled into
  // view, that getCursor returns, etc).
  var Selection = function(ranges, primIndex) {
    this.ranges = ranges;
    this.primIndex = primIndex;
  };

  Selection.prototype.primary = function () { return this.ranges[this.primIndex] };

  Selection.prototype.equals = function (other) {
      var this$1 = this;

    if (other == this) { return true }
    if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) { return false }
    for (var i = 0; i < this.ranges.length; i++) {
      var here = this$1.ranges[i], there = other.ranges[i];
      if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) { return false }
    }
    return true
  };

  Selection.prototype.deepCopy = function () {
      var this$1 = this;

    var out = [];
    for (var i = 0; i < this.ranges.length; i++)
      { out[i] = new Range(copyPos(this$1.ranges[i].anchor), copyPos(this$1.ranges[i].head)); }
    return new Selection(out, this.primIndex)
  };

  Selection.prototype.somethingSelected = function () {
      var this$1 = this;

    for (var i = 0; i < this.ranges.length; i++)
      { if (!this$1.ranges[i].empty()) { return true } }
    return false
  };

  Selection.prototype.contains = function (pos, end) {
      var this$1 = this;

    if (!end) { end = pos; }
    for (var i = 0; i < this.ranges.length; i++) {
      var range = this$1.ranges[i];
      if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0)
        { return i }
    }
    return -1
  };

  var Range = function(anchor, head) {
    this.anchor = anchor; this.head = head;
  };

  Range.prototype.from = function () { return minPos(this.anchor, this.head) };
  Range.prototype.to = function () { return maxPos(this.anchor, this.head) };
  Range.prototype.empty = function () { return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch };

  // Take an unsorted, potentially overlapping set of ranges, and
  // build a selection out of it. 'Consumes' ranges array (modifying
  // it).
  function normalizeSelection(cm, ranges, primIndex) {
    var mayTouch = cm && cm.options.selectionsMayTouch;
    var prim = ranges[primIndex];
    ranges.sort(function (a, b) { return cmp(a.from(), b.from()); });
    primIndex = indexOf(ranges, prim);
    for (var i = 1; i < ranges.length; i++) {
      var cur = ranges[i], prev = ranges[i - 1];
      var diff = cmp(prev.to(), cur.from());
      if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
        var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
        if (i <= primIndex) { --primIndex; }
        ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
      }
    }
    return new Selection(ranges, primIndex)
  }

  function simpleSelection(anchor, head) {
    return new Selection([new Range(anchor, head || anchor)], 0)
  }

  // Compute the position of the end of a change (its 'to' property
  // refers to the pre-change end).
  function changeEnd(change) {
    if (!change.text) { return change.to }
    return Pos(change.from.line + change.text.length - 1,
               lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0))
  }

  // Adjust a position to refer to the post-change position of the
  // same text, or the end of the change if the change covers it.
  function adjustForChange(pos, change) {
    if (cmp(pos, change.from) < 0) { return pos }
    if (cmp(pos, change.to) <= 0) { return changeEnd(change) }

    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
    if (pos.line == change.to.line) { ch += changeEnd(change).ch - change.to.ch; }
    return Pos(line, ch)
  }

  function computeSelAfterChange(doc, change) {
    var out = [];
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      var range = doc.sel.ranges[i];
      out.push(new Range(adjustForChange(range.anchor, change),
                         adjustForChange(range.head, change)));
    }
    return normalizeSelection(doc.cm, out, doc.sel.primIndex)
  }

  function offsetPos(pos, old, nw) {
    if (pos.line == old.line)
      { return Pos(nw.line, pos.ch - old.ch + nw.ch) }
    else
      { return Pos(nw.line + (pos.line - old.line), pos.ch) }
  }

  // Used by replaceSelections to allow moving the selection to the
  // start or around the replaced test. Hint may be "start" or "around".
  function computeReplacedSel(doc, changes, hint) {
    var out = [];
    var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      var from = offsetPos(change.from, oldPrev, newPrev);
      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
      oldPrev = change.to;
      newPrev = to;
      if (hint == "around") {
        var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
        out[i] = new Range(inv ? to : from, inv ? from : to);
      } else {
        out[i] = new Range(from, from);
      }
    }
    return new Selection(out, doc.sel.primIndex)
  }

  // Used to get the editor into a consistent state again when options change.

  function loadMode(cm) {
    cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
    resetModeState(cm);
  }

  function resetModeState(cm) {
    cm.doc.iter(function (line) {
      if (line.stateAfter) { line.stateAfter = null; }
      if (line.styles) { line.styles = null; }
    });
    cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
    startWorker(cm, 100);
    cm.state.modeGen++;
    if (cm.curOp) { regChange(cm); }
  }

  // DOCUMENT DATA STRUCTURE

  // By default, updates that start and end at the beginning of a line
  // are treated specially, in order to make the association of line
  // widgets and marker elements with the text behave more intuitive.
  function isWholeLineUpdate(doc, change) {
    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" &&
      (!doc.cm || doc.cm.options.wholeLineUpdateBefore)
  }

  // Perform a change on the document data structure.
  function updateDoc(doc, change, markedSpans, estimateHeight$$1) {
    function spansFor(n) {return markedSpans ? markedSpans[n] : null}
    function update(line, text, spans) {
      updateLine(line, text, spans, estimateHeight$$1);
      signalLater(line, "change", line, change);
    }
    function linesFor(start, end) {
      var result = [];
      for (var i = start; i < end; ++i)
        { result.push(new Line(text[i], spansFor(i), estimateHeight$$1)); }
      return result
    }

    var from = change.from, to = change.to, text = change.text;
    var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
    var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;

    // Adjust the line structure
    if (change.full) {
      doc.insert(0, linesFor(0, text.length));
      doc.remove(text.length, doc.size - text.length);
    } else if (isWholeLineUpdate(doc, change)) {
      // This is a whole-line replace. Treated specially to make
      // sure line objects move the way they are supposed to.
      var added = linesFor(0, text.length - 1);
      update(lastLine, lastLine.text, lastSpans);
      if (nlines) { doc.remove(from.line, nlines); }
      if (added.length) { doc.insert(from.line, added); }
    } else if (firstLine == lastLine) {
      if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
      } else {
        var added$1 = linesFor(1, text.length - 1);
        added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight$$1));
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        doc.insert(from.line + 1, added$1);
      }
    } else if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
      doc.remove(from.line + 1, nlines);
    } else {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
      var added$2 = linesFor(1, text.length - 1);
      if (nlines > 1) { doc.remove(from.line + 1, nlines - 1); }
      doc.insert(from.line + 1, added$2);
    }

    signalLater(doc, "change", doc, change);
  }

  // Call f for all linked documents.
  function linkedDocs(doc, f, sharedHistOnly) {
    function propagate(doc, skip, sharedHist) {
      if (doc.linked) { for (var i = 0; i < doc.linked.length; ++i) {
        var rel = doc.linked[i];
        if (rel.doc == skip) { continue }
        var shared = sharedHist && rel.sharedHist;
        if (sharedHistOnly && !shared) { continue }
        f(rel.doc, shared);
        propagate(rel.doc, doc, shared);
      } }
    }
    propagate(doc, null, true);
  }

  // Attach a document to an editor.
  function attachDoc(cm, doc) {
    if (doc.cm) { throw new Error("This document is already in use.") }
    cm.doc = doc;
    doc.cm = cm;
    estimateLineHeights(cm);
    loadMode(cm);
    setDirectionClass(cm);
    if (!cm.options.lineWrapping) { findMaxLine(cm); }
    cm.options.mode = doc.modeOption;
    regChange(cm);
  }

  function setDirectionClass(cm) {
  (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
  }

  function directionChanged(cm) {
    runInOp(cm, function () {
      setDirectionClass(cm);
      regChange(cm);
    });
  }

  function History(startGen) {
    // Arrays of change events and selections. Doing something adds an
    // event to done and clears undo. Undoing moves events from done
    // to undone, redoing moves them in the other direction.
    this.done = []; this.undone = [];
    this.undoDepth = Infinity;
    // Used to track when changes can be merged into a single undo
    // event
    this.lastModTime = this.lastSelTime = 0;
    this.lastOp = this.lastSelOp = null;
    this.lastOrigin = this.lastSelOrigin = null;
    // Used by the isClean() method
    this.generation = this.maxGeneration = startGen || 1;
  }

  // Create a history change event from an updateDoc-style change
  // object.
  function historyChangeFromChange(doc, change) {
    var histChange = {from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to)};
    attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    linkedDocs(doc, function (doc) { return attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1); }, true);
    return histChange
  }

  // Pop all selection events off the end of a history array. Stop at
  // a change event.
  function clearSelectionEvents(array) {
    while (array.length) {
      var last = lst(array);
      if (last.ranges) { array.pop(); }
      else { break }
    }
  }

  // Find the top change event in the history. Pop off selection
  // events that are in the way.
  function lastChangeEvent(hist, force) {
    if (force) {
      clearSelectionEvents(hist.done);
      return lst(hist.done)
    } else if (hist.done.length && !lst(hist.done).ranges) {
      return lst(hist.done)
    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
      hist.done.pop();
      return lst(hist.done)
    }
  }

  // Register a change in the history. Merges changes that are within
  // a single operation, or are close together with an origin that
  // allows merging (starting with "+") into a single event.
  function addChangeToHistory(doc, change, selAfter, opId) {
    var hist = doc.history;
    hist.undone.length = 0;
    var time = +new Date, cur;
    var last;

    if ((hist.lastOp == opId ||
         hist.lastOrigin == change.origin && change.origin &&
         ((change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc.cm ? doc.cm.options.historyEventDelay : 500)) ||
          change.origin.charAt(0) == "*")) &&
        (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
      // Merge this change into the last event
      last = lst(cur.changes);
      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
        // Optimized case for simple insertion -- don't want to add
        // new changesets for every character typed
        last.to = changeEnd(change);
      } else {
        // Add new sub-event
        cur.changes.push(historyChangeFromChange(doc, change));
      }
    } else {
      // Can not be merged, start a new event.
      var before = lst(hist.done);
      if (!before || !before.ranges)
        { pushSelectionToHistory(doc.sel, hist.done); }
      cur = {changes: [historyChangeFromChange(doc, change)],
             generation: hist.generation};
      hist.done.push(cur);
      while (hist.done.length > hist.undoDepth) {
        hist.done.shift();
        if (!hist.done[0].ranges) { hist.done.shift(); }
      }
    }
    hist.done.push(selAfter);
    hist.generation = ++hist.maxGeneration;
    hist.lastModTime = hist.lastSelTime = time;
    hist.lastOp = hist.lastSelOp = opId;
    hist.lastOrigin = hist.lastSelOrigin = change.origin;

    if (!last) { signal(doc, "historyAdded"); }
  }

  function selectionEventCanBeMerged(doc, origin, prev, sel) {
    var ch = origin.charAt(0);
    return ch == "*" ||
      ch == "+" &&
      prev.ranges.length == sel.ranges.length &&
      prev.somethingSelected() == sel.somethingSelected() &&
      new Date - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500)
  }

  // Called whenever the selection changes, sets the new selection as
  // the pending selection in the history, and pushes the old pending
  // selection into the 'done' array when it was significantly
  // different (in number of selected ranges, emptiness, or time).
  function addSelectionToHistory(doc, sel, opId, options) {
    var hist = doc.history, origin = options && options.origin;

    // A new event is started when the previous origin does not match
    // the current, or the origins don't allow matching. Origins
    // starting with * are always merged, those starting with + are
    // merged when similar and close together in time.
    if (opId == hist.lastSelOp ||
        (origin && hist.lastSelOrigin == origin &&
         (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin ||
          selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))))
      { hist.done[hist.done.length - 1] = sel; }
    else
      { pushSelectionToHistory(sel, hist.done); }

    hist.lastSelTime = +new Date;
    hist.lastSelOrigin = origin;
    hist.lastSelOp = opId;
    if (options && options.clearRedo !== false)
      { clearSelectionEvents(hist.undone); }
  }

  function pushSelectionToHistory(sel, dest) {
    var top = lst(dest);
    if (!(top && top.ranges && top.equals(sel)))
      { dest.push(sel); }
  }

  // Used to store marked span information in the history.
  function attachLocalSpans(doc, change, from, to) {
    var existing = change["spans_" + doc.id], n = 0;
    doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function (line) {
      if (line.markedSpans)
        { (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans; }
      ++n;
    });
  }

  // When un/re-doing restores text containing marked spans, those
  // that have been explicitly cleared should not be restored.
  function removeClearedSpans(spans) {
    if (!spans) { return null }
    var out;
    for (var i = 0; i < spans.length; ++i) {
      if (spans[i].marker.explicitlyCleared) { if (!out) { out = spans.slice(0, i); } }
      else if (out) { out.push(spans[i]); }
    }
    return !out ? spans : out.length ? out : null
  }

  // Retrieve and filter the old marked spans stored in a change event.
  function getOldSpans(doc, change) {
    var found = change["spans_" + doc.id];
    if (!found) { return null }
    var nw = [];
    for (var i = 0; i < change.text.length; ++i)
      { nw.push(removeClearedSpans(found[i])); }
    return nw
  }

  // Used for un/re-doing changes from the history. Combines the
  // result of computing the existing spans with the set of spans that
  // existed in the history (so that deleting around a span and then
  // undoing brings back the span).
  function mergeOldSpans(doc, change) {
    var old = getOldSpans(doc, change);
    var stretched = stretchSpansOverChange(doc, change);
    if (!old) { return stretched }
    if (!stretched) { return old }

    for (var i = 0; i < old.length; ++i) {
      var oldCur = old[i], stretchCur = stretched[i];
      if (oldCur && stretchCur) {
        spans: for (var j = 0; j < stretchCur.length; ++j) {
          var span = stretchCur[j];
          for (var k = 0; k < oldCur.length; ++k)
            { if (oldCur[k].marker == span.marker) { continue spans } }
          oldCur.push(span);
        }
      } else if (stretchCur) {
        old[i] = stretchCur;
      }
    }
    return old
  }

  // Used both to provide a JSON-safe object in .getHistory, and, when
  // detaching a document, to split the history in two
  function copyHistoryArray(events, newGroup, instantiateSel) {
    var copy = [];
    for (var i = 0; i < events.length; ++i) {
      var event = events[i];
      if (event.ranges) {
        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
        continue
      }
      var changes = event.changes, newChanges = [];
      copy.push({changes: newChanges});
      for (var j = 0; j < changes.length; ++j) {
        var change = changes[j], m = (void 0);
        newChanges.push({from: change.from, to: change.to, text: change.text});
        if (newGroup) { for (var prop in change) { if (m = prop.match(/^spans_(\d+)$/)) {
          if (indexOf(newGroup, Number(m[1])) > -1) {
            lst(newChanges)[prop] = change[prop];
            delete change[prop];
          }
        } } }
      }
    }
    return copy
  }

  // The 'scroll' parameter given to many of these indicated whether
  // the new cursor position should be scrolled into view after
  // modifying the selection.

  // If shift is held or the extend flag is set, extends a range to
  // include a given position (and optionally a second position).
  // Otherwise, simply returns the range between the given positions.
  // Used for cursor motion and such.
  function extendRange(range, head, other, extend) {
    if (extend) {
      var anchor = range.anchor;
      if (other) {
        var posBefore = cmp(head, anchor) < 0;
        if (posBefore != (cmp(other, anchor) < 0)) {
          anchor = head;
          head = other;
        } else if (posBefore != (cmp(head, other) < 0)) {
          head = other;
        }
      }
      return new Range(anchor, head)
    } else {
      return new Range(other || head, head)
    }
  }

  // Extend the primary selection range, discard the rest.
  function extendSelection(doc, head, other, options, extend) {
    if (extend == null) { extend = doc.cm && (doc.cm.display.shift || doc.extend); }
    setSelection(doc, new Selection([extendRange(doc.sel.primary(), head, other, extend)], 0), options);
  }

  // Extend all selections (pos is an array of selections with length
  // equal the number of selections)
  function extendSelections(doc, heads, options) {
    var out = [];
    var extend = doc.cm && (doc.cm.display.shift || doc.extend);
    for (var i = 0; i < doc.sel.ranges.length; i++)
      { out[i] = extendRange(doc.sel.ranges[i], heads[i], null, extend); }
    var newSel = normalizeSelection(doc.cm, out, doc.sel.primIndex);
    setSelection(doc, newSel, options);
  }

  // Updates a single range in the selection.
  function replaceOneSelection(doc, i, range, options) {
    var ranges = doc.sel.ranges.slice(0);
    ranges[i] = range;
    setSelection(doc, normalizeSelection(doc.cm, ranges, doc.sel.primIndex), options);
  }

  // Reset the selection to a single range.
  function setSimpleSelection(doc, anchor, head, options) {
    setSelection(doc, simpleSelection(anchor, head), options);
  }

  // Give beforeSelectionChange handlers a change to influence a
  // selection update.
  function filterSelectionChange(doc, sel, options) {
    var obj = {
      ranges: sel.ranges,
      update: function(ranges) {
        var this$1 = this;

        this.ranges = [];
        for (var i = 0; i < ranges.length; i++)
          { this$1.ranges[i] = new Range(clipPos(doc, ranges[i].anchor),
                                     clipPos(doc, ranges[i].head)); }
      },
      origin: options && options.origin
    };
    signal(doc, "beforeSelectionChange", doc, obj);
    if (doc.cm) { signal(doc.cm, "beforeSelectionChange", doc.cm, obj); }
    if (obj.ranges != sel.ranges) { return normalizeSelection(doc.cm, obj.ranges, obj.ranges.length - 1) }
    else { return sel }
  }

  function setSelectionReplaceHistory(doc, sel, options) {
    var done = doc.history.done, last = lst(done);
    if (last && last.ranges) {
      done[done.length - 1] = sel;
      setSelectionNoUndo(doc, sel, options);
    } else {
      setSelection(doc, sel, options);
    }
  }

  // Set a new selection.
  function setSelection(doc, sel, options) {
    setSelectionNoUndo(doc, sel, options);
    addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
  }

  function setSelectionNoUndo(doc, sel, options) {
    if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange"))
      { sel = filterSelectionChange(doc, sel, options); }

    var bias = options && options.bias ||
      (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
    setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));

    if (!(options && options.scroll === false) && doc.cm)
      { ensureCursorVisible(doc.cm); }
  }

  function setSelectionInner(doc, sel) {
    if (sel.equals(doc.sel)) { return }

    doc.sel = sel;

    if (doc.cm) {
      doc.cm.curOp.updateInput = 1;
      doc.cm.curOp.selectionChanged = true;
      signalCursorActivity(doc.cm);
    }
    signalLater(doc, "cursorActivity", doc);
  }

  // Verify that the selection does not partially select any atomic
  // marked ranges.
  function reCheckSelection(doc) {
    setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false));
  }

  // Return a selection that does not partially select any atomic
  // ranges.
  function skipAtomicInSelection(doc, sel, bias, mayClear) {
    var out;
    for (var i = 0; i < sel.ranges.length; i++) {
      var range = sel.ranges[i];
      var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i];
      var newAnchor = skipAtomic(doc, range.anchor, old && old.anchor, bias, mayClear);
      var newHead = skipAtomic(doc, range.head, old && old.head, bias, mayClear);
      if (out || newAnchor != range.anchor || newHead != range.head) {
        if (!out) { out = sel.ranges.slice(0, i); }
        out[i] = new Range(newAnchor, newHead);
      }
    }
    return out ? normalizeSelection(doc.cm, out, sel.primIndex) : sel
  }

  function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
    var line = getLine(doc, pos.line);
    if (line.markedSpans) { for (var i = 0; i < line.markedSpans.length; ++i) {
      var sp = line.markedSpans[i], m = sp.marker;

      // Determine if we should prevent the cursor being placed to the left/right of an atomic marker
      // Historically this was determined using the inclusiveLeft/Right option, but the new way to control it
      // is with selectLeft/Right
      var preventCursorLeft = ("selectLeft" in m) ? !m.selectLeft : m.inclusiveLeft;
      var preventCursorRight = ("selectRight" in m) ? !m.selectRight : m.inclusiveRight;

      if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) &&
          (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
        if (mayClear) {
          signal(m, "beforeCursorEnter");
          if (m.explicitlyCleared) {
            if (!line.markedSpans) { break }
            else {--i; continue}
          }
        }
        if (!m.atomic) { continue }

        if (oldPos) {
          var near = m.find(dir < 0 ? 1 : -1), diff = (void 0);
          if (dir < 0 ? preventCursorRight : preventCursorLeft)
            { near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null); }
          if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0))
            { return skipAtomicInner(doc, near, pos, dir, mayClear) }
        }

        var far = m.find(dir < 0 ? -1 : 1);
        if (dir < 0 ? preventCursorLeft : preventCursorRight)
          { far = movePos(doc, far, dir, far.line == pos.line ? line : null); }
        return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null
      }
    } }
    return pos
  }

  // Ensure a given position is not inside an atomic range.
  function skipAtomic(doc, pos, oldPos, bias, mayClear) {
    var dir = bias || 1;
    var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) ||
        (!mayClear && skipAtomicInner(doc, pos, oldPos, dir, true)) ||
        skipAtomicInner(doc, pos, oldPos, -dir, mayClear) ||
        (!mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true));
    if (!found) {
      doc.cantEdit = true;
      return Pos(doc.first, 0)
    }
    return found
  }

  function movePos(doc, pos, dir, line) {
    if (dir < 0 && pos.ch == 0) {
      if (pos.line > doc.first) { return clipPos(doc, Pos(pos.line - 1)) }
      else { return null }
    } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
      if (pos.line < doc.first + doc.size - 1) { return Pos(pos.line + 1, 0) }
      else { return null }
    } else {
      return new Pos(pos.line, pos.ch + dir)
    }
  }

  function selectAll(cm) {
    cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
  }

  // UPDATING

  // Allow "beforeChange" event handlers to influence a change
  function filterChange(doc, change, update) {
    var obj = {
      canceled: false,
      from: change.from,
      to: change.to,
      text: change.text,
      origin: change.origin,
      cancel: function () { return obj.canceled = true; }
    };
    if (update) { obj.update = function (from, to, text, origin) {
      if (from) { obj.from = clipPos(doc, from); }
      if (to) { obj.to = clipPos(doc, to); }
      if (text) { obj.text = text; }
      if (origin !== undefined) { obj.origin = origin; }
    }; }
    signal(doc, "beforeChange", doc, obj);
    if (doc.cm) { signal(doc.cm, "beforeChange", doc.cm, obj); }

    if (obj.canceled) {
      if (doc.cm) { doc.cm.curOp.updateInput = 2; }
      return null
    }
    return {from: obj.from, to: obj.to, text: obj.text, origin: obj.origin}
  }

  // Apply a change to a document, and add it to the document's
  // history, and propagating it to all linked documents.
  function makeChange(doc, change, ignoreReadOnly) {
    if (doc.cm) {
      if (!doc.cm.curOp) { return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly) }
      if (doc.cm.state.suppressEdits) { return }
    }

    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
      change = filterChange(doc, change, true);
      if (!change) { return }
    }

    // Possibly split or suppress the update based on the presence
    // of read-only spans in its range.
    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
    if (split) {
      for (var i = split.length - 1; i >= 0; --i)
        { makeChangeInner(doc, {from: split[i].from, to: split[i].to, text: i ? [""] : change.text, origin: change.origin}); }
    } else {
      makeChangeInner(doc, change);
    }
  }

  function makeChangeInner(doc, change) {
    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) { return }
    var selAfter = computeSelAfterChange(doc, change);
    addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);

    makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
    var rebased = [];

    linkedDocs(doc, function (doc, sharedHist) {
      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
        rebaseHist(doc.history, change);
        rebased.push(doc.history);
      }
      makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
    });
  }

  // Revert a change stored in a document's history.
  function makeChangeFromHistory(doc, type, allowSelectionOnly) {
    var suppress = doc.cm && doc.cm.state.suppressEdits;
    if (suppress && !allowSelectionOnly) { return }

    var hist = doc.history, event, selAfter = doc.sel;
    var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;

    // Verify that there is a useable event (so that ctrl-z won't
    // needlessly clear selection events)
    var i = 0;
    for (; i < source.length; i++) {
      event = source[i];
      if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges)
        { break }
    }
    if (i == source.length) { return }
    hist.lastOrigin = hist.lastSelOrigin = null;

    for (;;) {
      event = source.pop();
      if (event.ranges) {
        pushSelectionToHistory(event, dest);
        if (allowSelectionOnly && !event.equals(doc.sel)) {
          setSelection(doc, event, {clearRedo: false});
          return
        }
        selAfter = event;
      } else if (suppress) {
        source.push(event);
        return
      } else { break }
    }

    // Build up a reverse change object to add to the opposite history
    // stack (redo when undoing, and vice versa).
    var antiChanges = [];
    pushSelectionToHistory(selAfter, dest);
    dest.push({changes: antiChanges, generation: hist.generation});
    hist.generation = event.generation || ++hist.maxGeneration;

    var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");

    var loop = function ( i ) {
      var change = event.changes[i];
      change.origin = type;
      if (filter && !filterChange(doc, change, false)) {
        source.length = 0;
        return {}
      }

      antiChanges.push(historyChangeFromChange(doc, change));

      var after = i ? computeSelAfterChange(doc, change) : lst(source);
      makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
      if (!i && doc.cm) { doc.cm.scrollIntoView({from: change.from, to: changeEnd(change)}); }
      var rebased = [];

      // Propagate to the linked documents
      linkedDocs(doc, function (doc, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc.history) == -1) {
          rebaseHist(doc.history, change);
          rebased.push(doc.history);
        }
        makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
      });
    };

    for (var i$1 = event.changes.length - 1; i$1 >= 0; --i$1) {
      var returned = loop( i$1 );

      if ( returned ) return returned.v;
    }
  }

  // Sub-views need their line numbers shifted when text is added
  // above or below them in the parent document.
  function shiftDoc(doc, distance) {
    if (distance == 0) { return }
    doc.first += distance;
    doc.sel = new Selection(map(doc.sel.ranges, function (range) { return new Range(
      Pos(range.anchor.line + distance, range.anchor.ch),
      Pos(range.head.line + distance, range.head.ch)
    ); }), doc.sel.primIndex);
    if (doc.cm) {
      regChange(doc.cm, doc.first, doc.first - distance, distance);
      for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++)
        { regLineChange(doc.cm, l, "gutter"); }
    }
  }

  // More lower-level change function, handling only a single document
  // (not linked ones).
  function makeChangeSingleDoc(doc, change, selAfter, spans) {
    if (doc.cm && !doc.cm.curOp)
      { return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans) }

    if (change.to.line < doc.first) {
      shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
      return
    }
    if (change.from.line > doc.lastLine()) { return }

    // Clip the change to the size of this doc
    if (change.from.line < doc.first) {
      var shift = change.text.length - 1 - (doc.first - change.from.line);
      shiftDoc(doc, shift);
      change = {from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
                text: [lst(change.text)], origin: change.origin};
    }
    var last = doc.lastLine();
    if (change.to.line > last) {
      change = {from: change.from, to: Pos(last, getLine(doc, last).text.length),
                text: [change.text[0]], origin: change.origin};
    }

    change.removed = getBetween(doc, change.from, change.to);

    if (!selAfter) { selAfter = computeSelAfterChange(doc, change); }
    if (doc.cm) { makeChangeSingleDocInEditor(doc.cm, change, spans); }
    else { updateDoc(doc, change, spans); }
    setSelectionNoUndo(doc, selAfter, sel_dontScroll);

    if (doc.cantEdit && skipAtomic(doc, Pos(doc.firstLine(), 0)))
      { doc.cantEdit = false; }
  }

  // Handle the interaction of a change to a document with the editor
  // that this document is part of.
  function makeChangeSingleDocInEditor(cm, change, spans) {
    var doc = cm.doc, display = cm.display, from = change.from, to = change.to;

    var recomputeMaxLength = false, checkWidthStart = from.line;
    if (!cm.options.lineWrapping) {
      checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
      doc.iter(checkWidthStart, to.line + 1, function (line) {
        if (line == display.maxLine) {
          recomputeMaxLength = true;
          return true
        }
      });
    }

    if (doc.sel.contains(change.from, change.to) > -1)
      { signalCursorActivity(cm); }

    updateDoc(doc, change, spans, estimateHeight(cm));

    if (!cm.options.lineWrapping) {
      doc.iter(checkWidthStart, from.line + change.text.length, function (line) {
        var len = lineLength(line);
        if (len > display.maxLineLength) {
          display.maxLine = line;
          display.maxLineLength = len;
          display.maxLineChanged = true;
          recomputeMaxLength = false;
        }
      });
      if (recomputeMaxLength) { cm.curOp.updateMaxLine = true; }
    }

    retreatFrontier(doc, from.line);
    startWorker(cm, 400);

    var lendiff = change.text.length - (to.line - from.line) - 1;
    // Remember that these lines changed, for updating the display
    if (change.full)
      { regChange(cm); }
    else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change))
      { regLineChange(cm, from.line, "text"); }
    else
      { regChange(cm, from.line, to.line + 1, lendiff); }

    var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
    if (changeHandler || changesHandler) {
      var obj = {
        from: from, to: to,
        text: change.text,
        removed: change.removed,
        origin: change.origin
      };
      if (changeHandler) { signalLater(cm, "change", cm, obj); }
      if (changesHandler) { (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj); }
    }
    cm.display.selForContextMenu = null;
  }

  function replaceRange(doc, code, from, to, origin) {
    var assign;

    if (!to) { to = from; }
    if (cmp(to, from) < 0) { (assign = [to, from], from = assign[0], to = assign[1]); }
    if (typeof code == "string") { code = doc.splitLines(code); }
    makeChange(doc, {from: from, to: to, text: code, origin: origin});
  }

  // Rebasing/resetting history to deal with externally-sourced changes

  function rebaseHistSelSingle(pos, from, to, diff) {
    if (to < pos.line) {
      pos.line += diff;
    } else if (from < pos.line) {
      pos.line = from;
      pos.ch = 0;
    }
  }

  // Tries to rebase an array of history events given a change in the
  // document. If the change touches the same lines as the event, the
  // event, and everything 'behind' it, is discarded. If the change is
  // before the event, the event's positions are updated. Uses a
  // copy-on-write scheme for the positions, to avoid having to
  // reallocate them all on every rebase, but also avoid problems with
  // shared position objects being unsafely updated.
  function rebaseHistArray(array, from, to, diff) {
    for (var i = 0; i < array.length; ++i) {
      var sub = array[i], ok = true;
      if (sub.ranges) {
        if (!sub.copied) { sub = array[i] = sub.deepCopy(); sub.copied = true; }
        for (var j = 0; j < sub.ranges.length; j++) {
          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
        }
        continue
      }
      for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
        var cur = sub.changes[j$1];
        if (to < cur.from.line) {
          cur.from = Pos(cur.from.line + diff, cur.from.ch);
          cur.to = Pos(cur.to.line + diff, cur.to.ch);
        } else if (from <= cur.to.line) {
          ok = false;
          break
        }
      }
      if (!ok) {
        array.splice(0, i + 1);
        i = 0;
      }
    }
  }

  function rebaseHist(hist, change) {
    var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
    rebaseHistArray(hist.done, from, to, diff);
    rebaseHistArray(hist.undone, from, to, diff);
  }

  // Utility for applying a change to a line by handle or number,
  // returning the number and optionally registering the line as
  // changed.
  function changeLine(doc, handle, changeType, op) {
    var no = handle, line = handle;
    if (typeof handle == "number") { line = getLine(doc, clipLine(doc, handle)); }
    else { no = lineNo(handle); }
    if (no == null) { return null }
    if (op(line, no) && doc.cm) { regLineChange(doc.cm, no, changeType); }
    return line
  }

  // The document is represented as a BTree consisting of leaves, with
  // chunk of lines in them, and branches, with up to ten leaves or
  // other branch nodes below them. The top node is always a branch
  // node, and is the document object itself (meaning it has
  // additional methods and properties).
  //
  // All nodes have parent links. The tree is used both to go from
  // line numbers to line objects, and to go from objects to numbers.
  // It also indexes by height, and is used to convert between height
  // and line object, and to find the total height of the document.
  //
  // See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html

  function LeafChunk(lines) {
    var this$1 = this;

    this.lines = lines;
    this.parent = null;
    var height = 0;
    for (var i = 0; i < lines.length; ++i) {
      lines[i].parent = this$1;
      height += lines[i].height;
    }
    this.height = height;
  }

  LeafChunk.prototype = {
    chunkSize: function() { return this.lines.length },

    // Remove the n lines at offset 'at'.
    removeInner: function(at, n) {
      var this$1 = this;

      for (var i = at, e = at + n; i < e; ++i) {
        var line = this$1.lines[i];
        this$1.height -= line.height;
        cleanUpLine(line);
        signalLater(line, "delete");
      }
      this.lines.splice(at, n);
    },

    // Helper used to collapse a small branch into a single leaf.
    collapse: function(lines) {
      lines.push.apply(lines, this.lines);
    },

    // Insert the given array of lines at offset 'at', count them as
    // having the given height.
    insertInner: function(at, lines, height) {
      var this$1 = this;

      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i = 0; i < lines.length; ++i) { lines[i].parent = this$1; }
    },

    // Used to iterate over a part of the tree.
    iterN: function(at, n, op) {
      var this$1 = this;

      for (var e = at + n; at < e; ++at)
        { if (op(this$1.lines[at])) { return true } }
    }
  };

  function BranchChunk(children) {
    var this$1 = this;

    this.children = children;
    var size = 0, height = 0;
    for (var i = 0; i < children.length; ++i) {
      var ch = children[i];
      size += ch.chunkSize(); height += ch.height;
      ch.parent = this$1;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }

  BranchChunk.prototype = {
    chunkSize: function() { return this.size },

    removeInner: function(at, n) {
      var this$1 = this;

      this.size -= n;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this$1.children[i], sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at), oldHeight = child.height;
          child.removeInner(at, rm);
          this$1.height -= oldHeight - child.height;
          if (sz == rm) { this$1.children.splice(i--, 1); child.parent = null; }
          if ((n -= rm) == 0) { break }
          at = 0;
        } else { at -= sz; }
      }
      // If the result is smaller than 25 lines, ensure that it is a
      // single leaf node.
      if (this.size - n < 25 &&
          (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },

    collapse: function(lines) {
      var this$1 = this;

      for (var i = 0; i < this.children.length; ++i) { this$1.children[i].collapse(lines); }
    },

    insertInner: function(at, lines, height) {
      var this$1 = this;

      this.size += lines.length;
      this.height += height;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this$1.children[i], sz = child.chunkSize();
        if (at <= sz) {
          child.insertInner(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            // To avoid memory thrashing when child.lines is huge (e.g. first view of a large file), it's never spliced.
            // Instead, small slices are taken. They're taken in order because sequential memory accesses are fastest.
            var remaining = child.lines.length % 25 + 25;
            for (var pos = remaining; pos < child.lines.length;) {
              var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
              child.height -= leaf.height;
              this$1.children.splice(++i, 0, leaf);
              leaf.parent = this$1;
            }
            child.lines = child.lines.slice(0, remaining);
            this$1.maybeSpill();
          }
          break
        }
        at -= sz;
      }
    },

    // When a node has grown, check whether it should be split.
    maybeSpill: function() {
      if (this.children.length <= 10) { return }
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) { // Become the parent node
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
       } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10)
      me.parent.maybeSpill();
    },

    iterN: function(at, n, op) {
      var this$1 = this;

      for (var i = 0; i < this.children.length; ++i) {
        var child = this$1.children[i], sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op)) { return true }
          if ((n -= used) == 0) { break }
          at = 0;
        } else { at -= sz; }
      }
    }
  };

  // Line widgets are block elements displayed above or below a line.

  var LineWidget = function(doc, node, options) {
    var this$1 = this;

    if (options) { for (var opt in options) { if (options.hasOwnProperty(opt))
      { this$1[opt] = options[opt]; } } }
    this.doc = doc;
    this.node = node;
  };

  LineWidget.prototype.clear = function () {
      var this$1 = this;

    var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
    if (no == null || !ws) { return }
    for (var i = 0; i < ws.length; ++i) { if (ws[i] == this$1) { ws.splice(i--, 1); } }
    if (!ws.length) { line.widgets = null; }
    var height = widgetHeight(this);
    updateLineHeight(line, Math.max(0, line.height - height));
    if (cm) {
      runInOp(cm, function () {
        adjustScrollWhenAboveVisible(cm, line, -height);
        regLineChange(cm, no, "widget");
      });
      signalLater(cm, "lineWidgetCleared", cm, this, no);
    }
  };

  LineWidget.prototype.changed = function () {
      var this$1 = this;

    var oldH = this.height, cm = this.doc.cm, line = this.line;
    this.height = null;
    var diff = widgetHeight(this) - oldH;
    if (!diff) { return }
    if (!lineIsHidden(this.doc, line)) { updateLineHeight(line, line.height + diff); }
    if (cm) {
      runInOp(cm, function () {
        cm.curOp.forceUpdate = true;
        adjustScrollWhenAboveVisible(cm, line, diff);
        signalLater(cm, "lineWidgetChanged", cm, this$1, lineNo(line));
      });
    }
  };
  eventMixin(LineWidget);

  function adjustScrollWhenAboveVisible(cm, line, diff) {
    if (heightAtLine(line) < ((cm.curOp && cm.curOp.scrollTop) || cm.doc.scrollTop))
      { addToScrollTop(cm, diff); }
  }

  function addLineWidget(doc, handle, node, options) {
    var widget = new LineWidget(doc, node, options);
    var cm = doc.cm;
    if (cm && widget.noHScroll) { cm.display.alignWidgets = true; }
    changeLine(doc, handle, "widget", function (line) {
      var widgets = line.widgets || (line.widgets = []);
      if (widget.insertAt == null) { widgets.push(widget); }
      else { widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget); }
      widget.line = line;
      if (cm && !lineIsHidden(doc, line)) {
        var aboveVisible = heightAtLine(line) < doc.scrollTop;
        updateLineHeight(line, line.height + widgetHeight(widget));
        if (aboveVisible) { addToScrollTop(cm, widget.height); }
        cm.curOp.forceUpdate = true;
      }
      return true
    });
    if (cm) { signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle)); }
    return widget
  }

  // TEXTMARKERS

  // Created with markText and setBookmark methods. A TextMarker is a
  // handle that can be used to clear or find a marked position in the
  // document. Line objects hold arrays (markedSpans) containing
  // {from, to, marker} object pointing to such marker objects, and
  // indicating that such a marker is present on that line. Multiple
  // lines may point to the same marker when it spans across lines.
  // The spans will have null for their from/to properties when the
  // marker continues beyond the start/end of the line. Markers have
  // links back to the lines they currently touch.

  // Collapsed markers have unique ids, in order to be able to order
  // them, which is needed for uniquely determining an outer marker
  // when they overlap (they may nest, but not partially overlap).
  var nextMarkerId = 0;

  var TextMarker = function(doc, type) {
    this.lines = [];
    this.type = type;
    this.doc = doc;
    this.id = ++nextMarkerId;
  };

  // Clear the marker.
  TextMarker.prototype.clear = function () {
      var this$1 = this;

    if (this.explicitlyCleared) { return }
    var cm = this.doc.cm, withOp = cm && !cm.curOp;
    if (withOp) { startOperation(cm); }
    if (hasHandler(this, "clear")) {
      var found = this.find();
      if (found) { signalLater(this, "clear", found.from, found.to); }
    }
    var min = null, max = null;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this$1.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this$1);
      if (cm && !this$1.collapsed) { regLineChange(cm, lineNo(line), "text"); }
      else if (cm) {
        if (span.to != null) { max = lineNo(line); }
        if (span.from != null) { min = lineNo(line); }
      }
      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
      if (span.from == null && this$1.collapsed && !lineIsHidden(this$1.doc, line) && cm)
        { updateLineHeight(line, textHeight(cm.display)); }
    }
    if (cm && this.collapsed && !cm.options.lineWrapping) { for (var i$1 = 0; i$1 < this.lines.length; ++i$1) {
      var visual = visualLine(this$1.lines[i$1]), len = lineLength(visual);
      if (len > cm.display.maxLineLength) {
        cm.display.maxLine = visual;
        cm.display.maxLineLength = len;
        cm.display.maxLineChanged = true;
      }
    } }

    if (min != null && cm && this.collapsed) { regChange(cm, min, max + 1); }
    this.lines.length = 0;
    this.explicitlyCleared = true;
    if (this.atomic && this.doc.cantEdit) {
      this.doc.cantEdit = false;
      if (cm) { reCheckSelection(cm.doc); }
    }
    if (cm) { signalLater(cm, "markerCleared", cm, this, min, max); }
    if (withOp) { endOperation(cm); }
    if (this.parent) { this.parent.clear(); }
  };

  // Find the position of the marker in the document. Returns a {from,
  // to} object by default. Side can be passed to get a specific side
  // -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
  // Pos objects returned contain a line object, rather than a line
  // number (used to prevent looking up the same line twice).
  TextMarker.prototype.find = function (side, lineObj) {
      var this$1 = this;

    if (side == null && this.type == "bookmark") { side = 1; }
    var from, to;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this$1.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this$1);
      if (span.from != null) {
        from = Pos(lineObj ? line : lineNo(line), span.from);
        if (side == -1) { return from }
      }
      if (span.to != null) {
        to = Pos(lineObj ? line : lineNo(line), span.to);
        if (side == 1) { return to }
      }
    }
    return from && {from: from, to: to}
  };

  // Signals that the marker's widget changed, and surrounding layout
  // should be recomputed.
  TextMarker.prototype.changed = function () {
      var this$1 = this;

    var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
    if (!pos || !cm) { return }
    runInOp(cm, function () {
      var line = pos.line, lineN = lineNo(pos.line);
      var view = findViewForLine(cm, lineN);
      if (view) {
        clearLineMeasurementCacheFor(view);
        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
      }
      cm.curOp.updateMaxLine = true;
      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
        var oldHeight = widget.height;
        widget.height = null;
        var dHeight = widgetHeight(widget) - oldHeight;
        if (dHeight)
          { updateLineHeight(line, line.height + dHeight); }
      }
      signalLater(cm, "markerChanged", cm, this$1);
    });
  };

  TextMarker.prototype.attachLine = function (line) {
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1)
        { (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this); }
    }
    this.lines.push(line);
  };

  TextMarker.prototype.detachLine = function (line) {
    this.lines.splice(indexOf(this.lines, line), 1);
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp
      ;(op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
    }
  };
  eventMixin(TextMarker);

  // Create a marker, wire it up to the right lines, and
  function markText(doc, from, to, options, type) {
    // Shared markers (across linked documents) are handled separately
    // (markTextShared will call out to this again, once per
    // document).
    if (options && options.shared) { return markTextShared(doc, from, to, options, type) }
    // Ensure we are in an operation.
    if (doc.cm && !doc.cm.curOp) { return operation(doc.cm, markText)(doc, from, to, options, type) }

    var marker = new TextMarker(doc, type), diff = cmp(from, to);
    if (options) { copyObj(options, marker, false); }
    // Don't connect empty markers unless clearWhenEmpty is false
    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false)
      { return marker }
    if (marker.replacedWith) {
      // Showing up as a widget implies collapsed (widget replaces text)
      marker.collapsed = true;
      marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
      if (!options.handleMouseEvents) { marker.widgetNode.setAttribute("cm-ignore-events", "true"); }
      if (options.insertLeft) { marker.widgetNode.insertLeft = true; }
    }
    if (marker.collapsed) {
      if (conflictingCollapsedRange(doc, from.line, from, to, marker) ||
          from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker))
        { throw new Error("Inserting collapsed marker partially overlapping an existing one") }
      seeCollapsedSpans();
    }

    if (marker.addToHistory)
      { addChangeToHistory(doc, {from: from, to: to, origin: "markText"}, doc.sel, NaN); }

    var curLine = from.line, cm = doc.cm, updateMaxLine;
    doc.iter(curLine, to.line + 1, function (line) {
      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine)
        { updateMaxLine = true; }
      if (marker.collapsed && curLine != from.line) { updateLineHeight(line, 0); }
      addMarkedSpan(line, new MarkedSpan(marker,
                                         curLine == from.line ? from.ch : null,
                                         curLine == to.line ? to.ch : null));
      ++curLine;
    });
    // lineIsHidden depends on the presence of the spans, so needs a second pass
    if (marker.collapsed) { doc.iter(from.line, to.line + 1, function (line) {
      if (lineIsHidden(doc, line)) { updateLineHeight(line, 0); }
    }); }

    if (marker.clearOnEnter) { on(marker, "beforeCursorEnter", function () { return marker.clear(); }); }

    if (marker.readOnly) {
      seeReadOnlySpans();
      if (doc.history.done.length || doc.history.undone.length)
        { doc.clearHistory(); }
    }
    if (marker.collapsed) {
      marker.id = ++nextMarkerId;
      marker.atomic = true;
    }
    if (cm) {
      // Sync editor state
      if (updateMaxLine) { cm.curOp.updateMaxLine = true; }
      if (marker.collapsed)
        { regChange(cm, from.line, to.line + 1); }
      else if (marker.className || marker.startStyle || marker.endStyle || marker.css ||
               marker.attributes || marker.title)
        { for (var i = from.line; i <= to.line; i++) { regLineChange(cm, i, "text"); } }
      if (marker.atomic) { reCheckSelection(cm.doc); }
      signalLater(cm, "markerAdded", cm, marker);
    }
    return marker
  }

  // SHARED TEXTMARKERS

  // A shared marker spans multiple linked documents. It is
  // implemented as a meta-marker-object controlling multiple normal
  // markers.
  var SharedTextMarker = function(markers, primary) {
    var this$1 = this;

    this.markers = markers;
    this.primary = primary;
    for (var i = 0; i < markers.length; ++i)
      { markers[i].parent = this$1; }
  };

  SharedTextMarker.prototype.clear = function () {
      var this$1 = this;

    if (this.explicitlyCleared) { return }
    this.explicitlyCleared = true;
    for (var i = 0; i < this.markers.length; ++i)
      { this$1.markers[i].clear(); }
    signalLater(this, "clear");
  };

  SharedTextMarker.prototype.find = function (side, lineObj) {
    return this.primary.find(side, lineObj)
  };
  eventMixin(SharedTextMarker);

  function markTextShared(doc, from, to, options, type) {
    options = copyObj(options);
    options.shared = false;
    var markers = [markText(doc, from, to, options, type)], primary = markers[0];
    var widget = options.widgetNode;
    linkedDocs(doc, function (doc) {
      if (widget) { options.widgetNode = widget.cloneNode(true); }
      markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
      for (var i = 0; i < doc.linked.length; ++i)
        { if (doc.linked[i].isParent) { return } }
      primary = lst(markers);
    });
    return new SharedTextMarker(markers, primary)
  }

  function findSharedMarkers(doc) {
    return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function (m) { return m.parent; })
  }

  function copySharedMarkers(doc, markers) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i], pos = marker.find();
      var mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
      if (cmp(mFrom, mTo)) {
        var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
        marker.markers.push(subMark);
        subMark.parent = marker;
      }
    }
  }

  function detachSharedMarkers(markers) {
    var loop = function ( i ) {
      var marker = markers[i], linked = [marker.primary.doc];
      linkedDocs(marker.primary.doc, function (d) { return linked.push(d); });
      for (var j = 0; j < marker.markers.length; j++) {
        var subMarker = marker.markers[j];
        if (indexOf(linked, subMarker.doc) == -1) {
          subMarker.parent = null;
          marker.markers.splice(j--, 1);
        }
      }
    };

    for (var i = 0; i < markers.length; i++) loop( i );
  }

  var nextDocId = 0;
  var Doc = function(text, mode, firstLine, lineSep, direction) {
    if (!(this instanceof Doc)) { return new Doc(text, mode, firstLine, lineSep, direction) }
    if (firstLine == null) { firstLine = 0; }

    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
    this.first = firstLine;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = false;
    this.cleanGeneration = 1;
    this.modeFrontier = this.highlightFrontier = firstLine;
    var start = Pos(firstLine, 0);
    this.sel = simpleSelection(start);
    this.history = new History(null);
    this.id = ++nextDocId;
    this.modeOption = mode;
    this.lineSep = lineSep;
    this.direction = (direction == "rtl") ? "rtl" : "ltr";
    this.extend = false;

    if (typeof text == "string") { text = this.splitLines(text); }
    updateDoc(this, {from: start, to: start, text: text});
    setSelection(this, simpleSelection(start), sel_dontScroll);
  };

  Doc.prototype = createObj(BranchChunk.prototype, {
    constructor: Doc,
    // Iterate over the document. Supports two forms -- with only one
    // argument, it calls that for each line in the document. With
    // three, it iterates over the range given by the first two (with
    // the second being non-inclusive).
    iter: function(from, to, op) {
      if (op) { this.iterN(from - this.first, to - from, op); }
      else { this.iterN(this.first, this.first + this.size, from); }
    },

    // Non-public interface for adding and removing lines.
    insert: function(at, lines) {
      var height = 0;
      for (var i = 0; i < lines.length; ++i) { height += lines[i].height; }
      this.insertInner(at - this.first, lines, height);
    },
    remove: function(at, n) { this.removeInner(at - this.first, n); },

    // From here, the methods are part of the public interface. Most
    // are also available from CodeMirror (editor) instances.

    getValue: function(lineSep) {
      var lines = getLines(this, this.first, this.first + this.size);
      if (lineSep === false) { return lines }
      return lines.join(lineSep || this.lineSeparator())
    },
    setValue: docMethodOp(function(code) {
      var top = Pos(this.first, 0), last = this.first + this.size - 1;
      makeChange(this, {from: top, to: Pos(last, getLine(this, last).text.length),
                        text: this.splitLines(code), origin: "setValue", full: true}, true);
      if (this.cm) { scrollToCoords(this.cm, 0, 0); }
      setSelection(this, simpleSelection(top), sel_dontScroll);
    }),
    replaceRange: function(code, from, to, origin) {
      from = clipPos(this, from);
      to = to ? clipPos(this, to) : from;
      replaceRange(this, code, from, to, origin);
    },
    getRange: function(from, to, lineSep) {
      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
      if (lineSep === false) { return lines }
      return lines.join(lineSep || this.lineSeparator())
    },

    getLine: function(line) {var l = this.getLineHandle(line); return l && l.text},

    getLineHandle: function(line) {if (isLine(this, line)) { return getLine(this, line) }},
    getLineNumber: function(line) {return lineNo(line)},

    getLineHandleVisualStart: function(line) {
      if (typeof line == "number") { line = getLine(this, line); }
      return visualLine(line)
    },

    lineCount: function() {return this.size},
    firstLine: function() {return this.first},
    lastLine: function() {return this.first + this.size - 1},

    clipPos: function(pos) {return clipPos(this, pos)},

    getCursor: function(start) {
      var range$$1 = this.sel.primary(), pos;
      if (start == null || start == "head") { pos = range$$1.head; }
      else if (start == "anchor") { pos = range$$1.anchor; }
      else if (start == "end" || start == "to" || start === false) { pos = range$$1.to(); }
      else { pos = range$$1.from(); }
      return pos
    },
    listSelections: function() { return this.sel.ranges },
    somethingSelected: function() {return this.sel.somethingSelected()},

    setCursor: docMethodOp(function(line, ch, options) {
      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
    }),
    setSelection: docMethodOp(function(anchor, head, options) {
      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
    }),
    extendSelection: docMethodOp(function(head, other, options) {
      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
    }),
    extendSelections: docMethodOp(function(heads, options) {
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    extendSelectionsBy: docMethodOp(function(f, options) {
      var heads = map(this.sel.ranges, f);
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    setSelections: docMethodOp(function(ranges, primary, options) {
      var this$1 = this;

      if (!ranges.length) { return }
      var out = [];
      for (var i = 0; i < ranges.length; i++)
        { out[i] = new Range(clipPos(this$1, ranges[i].anchor),
                           clipPos(this$1, ranges[i].head)); }
      if (primary == null) { primary = Math.min(ranges.length - 1, this.sel.primIndex); }
      setSelection(this, normalizeSelection(this.cm, out, primary), options);
    }),
    addSelection: docMethodOp(function(anchor, head, options) {
      var ranges = this.sel.ranges.slice(0);
      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
      setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
    }),

    getSelection: function(lineSep) {
      var this$1 = this;

      var ranges = this.sel.ranges, lines;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
        lines = lines ? lines.concat(sel) : sel;
      }
      if (lineSep === false) { return lines }
      else { return lines.join(lineSep || this.lineSeparator()) }
    },
    getSelections: function(lineSep) {
      var this$1 = this;

      var parts = [], ranges = this.sel.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
        if (lineSep !== false) { sel = sel.join(lineSep || this$1.lineSeparator()); }
        parts[i] = sel;
      }
      return parts
    },
    replaceSelection: function(code, collapse, origin) {
      var dup = [];
      for (var i = 0; i < this.sel.ranges.length; i++)
        { dup[i] = code; }
      this.replaceSelections(dup, collapse, origin || "+input");
    },
    replaceSelections: docMethodOp(function(code, collapse, origin) {
      var this$1 = this;

      var changes = [], sel = this.sel;
      for (var i = 0; i < sel.ranges.length; i++) {
        var range$$1 = sel.ranges[i];
        changes[i] = {from: range$$1.from(), to: range$$1.to(), text: this$1.splitLines(code[i]), origin: origin};
      }
      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
      for (var i$1 = changes.length - 1; i$1 >= 0; i$1--)
        { makeChange(this$1, changes[i$1]); }
      if (newSel) { setSelectionReplaceHistory(this, newSel); }
      else if (this.cm) { ensureCursorVisible(this.cm); }
    }),
    undo: docMethodOp(function() {makeChangeFromHistory(this, "undo");}),
    redo: docMethodOp(function() {makeChangeFromHistory(this, "redo");}),
    undoSelection: docMethodOp(function() {makeChangeFromHistory(this, "undo", true);}),
    redoSelection: docMethodOp(function() {makeChangeFromHistory(this, "redo", true);}),

    setExtending: function(val) {this.extend = val;},
    getExtending: function() {return this.extend},

    historySize: function() {
      var hist = this.history, done = 0, undone = 0;
      for (var i = 0; i < hist.done.length; i++) { if (!hist.done[i].ranges) { ++done; } }
      for (var i$1 = 0; i$1 < hist.undone.length; i$1++) { if (!hist.undone[i$1].ranges) { ++undone; } }
      return {undo: done, redo: undone}
    },
    clearHistory: function() {
      var this$1 = this;

      this.history = new History(this.history.maxGeneration);
      linkedDocs(this, function (doc) { return doc.history = this$1.history; }, true);
    },

    markClean: function() {
      this.cleanGeneration = this.changeGeneration(true);
    },
    changeGeneration: function(forceSplit) {
      if (forceSplit)
        { this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null; }
      return this.history.generation
    },
    isClean: function (gen) {
      return this.history.generation == (gen || this.cleanGeneration)
    },

    getHistory: function() {
      return {done: copyHistoryArray(this.history.done),
              undone: copyHistoryArray(this.history.undone)}
    },
    setHistory: function(histData) {
      var hist = this.history = new History(this.history.maxGeneration);
      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
    },

    setGutterMarker: docMethodOp(function(line, gutterID, value) {
      return changeLine(this, line, "gutter", function (line) {
        var markers = line.gutterMarkers || (line.gutterMarkers = {});
        markers[gutterID] = value;
        if (!value && isEmpty(markers)) { line.gutterMarkers = null; }
        return true
      })
    }),

    clearGutter: docMethodOp(function(gutterID) {
      var this$1 = this;

      this.iter(function (line) {
        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
          changeLine(this$1, line, "gutter", function () {
            line.gutterMarkers[gutterID] = null;
            if (isEmpty(line.gutterMarkers)) { line.gutterMarkers = null; }
            return true
          });
        }
      });
    }),

    lineInfo: function(line) {
      var n;
      if (typeof line == "number") {
        if (!isLine(this, line)) { return null }
        n = line;
        line = getLine(this, line);
        if (!line) { return null }
      } else {
        n = lineNo(line);
        if (n == null) { return null }
      }
      return {line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
              textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
              widgets: line.widgets}
    },

    addLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
        var prop = where == "text" ? "textClass"
                 : where == "background" ? "bgClass"
                 : where == "gutter" ? "gutterClass" : "wrapClass";
        if (!line[prop]) { line[prop] = cls; }
        else if (classTest(cls).test(line[prop])) { return false }
        else { line[prop] += " " + cls; }
        return true
      })
    }),
    removeLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
        var prop = where == "text" ? "textClass"
                 : where == "background" ? "bgClass"
                 : where == "gutter" ? "gutterClass" : "wrapClass";
        var cur = line[prop];
        if (!cur) { return false }
        else if (cls == null) { line[prop] = null; }
        else {
          var found = cur.match(classTest(cls));
          if (!found) { return false }
          var end = found.index + found[0].length;
          line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
        }
        return true
      })
    }),

    addLineWidget: docMethodOp(function(handle, node, options) {
      return addLineWidget(this, handle, node, options)
    }),
    removeLineWidget: function(widget) { widget.clear(); },

    markText: function(from, to, options) {
      return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range")
    },
    setBookmark: function(pos, options) {
      var realOpts = {replacedWith: options && (options.nodeType == null ? options.widget : options),
                      insertLeft: options && options.insertLeft,
                      clearWhenEmpty: false, shared: options && options.shared,
                      handleMouseEvents: options && options.handleMouseEvents};
      pos = clipPos(this, pos);
      return markText(this, pos, pos, realOpts, "bookmark")
    },
    findMarksAt: function(pos) {
      pos = clipPos(this, pos);
      var markers = [], spans = getLine(this, pos.line).markedSpans;
      if (spans) { for (var i = 0; i < spans.length; ++i) {
        var span = spans[i];
        if ((span.from == null || span.from <= pos.ch) &&
            (span.to == null || span.to >= pos.ch))
          { markers.push(span.marker.parent || span.marker); }
      } }
      return markers
    },
    findMarks: function(from, to, filter) {
      from = clipPos(this, from); to = clipPos(this, to);
      var found = [], lineNo$$1 = from.line;
      this.iter(from.line, to.line + 1, function (line) {
        var spans = line.markedSpans;
        if (spans) { for (var i = 0; i < spans.length; i++) {
          var span = spans[i];
          if (!(span.to != null && lineNo$$1 == from.line && from.ch >= span.to ||
                span.from == null && lineNo$$1 != from.line ||
                span.from != null && lineNo$$1 == to.line && span.from >= to.ch) &&
              (!filter || filter(span.marker)))
            { found.push(span.marker.parent || span.marker); }
        } }
        ++lineNo$$1;
      });
      return found
    },
    getAllMarks: function() {
      var markers = [];
      this.iter(function (line) {
        var sps = line.markedSpans;
        if (sps) { for (var i = 0; i < sps.length; ++i)
          { if (sps[i].from != null) { markers.push(sps[i].marker); } } }
      });
      return markers
    },

    posFromIndex: function(off) {
      var ch, lineNo$$1 = this.first, sepSize = this.lineSeparator().length;
      this.iter(function (line) {
        var sz = line.text.length + sepSize;
        if (sz > off) { ch = off; return true }
        off -= sz;
        ++lineNo$$1;
      });
      return clipPos(this, Pos(lineNo$$1, ch))
    },
    indexFromPos: function (coords) {
      coords = clipPos(this, coords);
      var index = coords.ch;
      if (coords.line < this.first || coords.ch < 0) { return 0 }
      var sepSize = this.lineSeparator().length;
      this.iter(this.first, coords.line, function (line) { // iter aborts when callback returns a truthy value
        index += line.text.length + sepSize;
      });
      return index
    },

    copy: function(copyHistory) {
      var doc = new Doc(getLines(this, this.first, this.first + this.size),
                        this.modeOption, this.first, this.lineSep, this.direction);
      doc.scrollTop = this.scrollTop; doc.scrollLeft = this.scrollLeft;
      doc.sel = this.sel;
      doc.extend = false;
      if (copyHistory) {
        doc.history.undoDepth = this.history.undoDepth;
        doc.setHistory(this.getHistory());
      }
      return doc
    },

    linkedDoc: function(options) {
      if (!options) { options = {}; }
      var from = this.first, to = this.first + this.size;
      if (options.from != null && options.from > from) { from = options.from; }
      if (options.to != null && options.to < to) { to = options.to; }
      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
      if (options.sharedHist) { copy.history = this.history
      ; }(this.linked || (this.linked = [])).push({doc: copy, sharedHist: options.sharedHist});
      copy.linked = [{doc: this, isParent: true, sharedHist: options.sharedHist}];
      copySharedMarkers(copy, findSharedMarkers(this));
      return copy
    },
    unlinkDoc: function(other) {
      var this$1 = this;

      if (other instanceof CodeMirror) { other = other.doc; }
      if (this.linked) { for (var i = 0; i < this.linked.length; ++i) {
        var link = this$1.linked[i];
        if (link.doc != other) { continue }
        this$1.linked.splice(i, 1);
        other.unlinkDoc(this$1);
        detachSharedMarkers(findSharedMarkers(this$1));
        break
      } }
      // If the histories were shared, split them again
      if (other.history == this.history) {
        var splitIds = [other.id];
        linkedDocs(other, function (doc) { return splitIds.push(doc.id); }, true);
        other.history = new History(null);
        other.history.done = copyHistoryArray(this.history.done, splitIds);
        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
      }
    },
    iterLinkedDocs: function(f) {linkedDocs(this, f);},

    getMode: function() {return this.mode},
    getEditor: function() {return this.cm},

    splitLines: function(str) {
      if (this.lineSep) { return str.split(this.lineSep) }
      return splitLinesAuto(str)
    },
    lineSeparator: function() { return this.lineSep || "\n" },

    setDirection: docMethodOp(function (dir) {
      if (dir != "rtl") { dir = "ltr"; }
      if (dir == this.direction) { return }
      this.direction = dir;
      this.iter(function (line) { return line.order = null; });
      if (this.cm) { directionChanged(this.cm); }
    })
  });

  // Public alias.
  Doc.prototype.eachLine = Doc.prototype.iter;

  // Kludge to work around strange IE behavior where it'll sometimes
  // re-fire a series of drag-related events right after the drop (#1551)
  var lastDrop = 0;

  function onDrop(e) {
    var cm = this;
    clearDragCursor(cm);
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
      { return }
    e_preventDefault(e);
    if (ie) { lastDrop = +new Date; }
    var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
    if (!pos || cm.isReadOnly()) { return }
    // Might be a file drop, in which case we simply extract the text
    // and insert it.
    if (files && files.length && window.FileReader && window.File) {
      var n = files.length, text = Array(n), read = 0;
      var markAsReadAndPasteIfAllFilesAreRead = function () {
        if (++read == n) {
          operation(cm, function () {
            pos = clipPos(cm.doc, pos);
            var change = {from: pos, to: pos,
                          text: cm.doc.splitLines(
                              text.filter(function (t) { return t != null; }).join(cm.doc.lineSeparator())),
                          origin: "paste"};
            makeChange(cm.doc, change);
            setSelectionReplaceHistory(cm.doc, simpleSelection(clipPos(cm.doc, pos), clipPos(cm.doc, changeEnd(change))));
          })();
        }
      };
      var readTextFromFile = function (file, i) {
        if (cm.options.allowDropFileTypes &&
            indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
          markAsReadAndPasteIfAllFilesAreRead();
          return
        }
        var reader = new FileReader;
        reader.onerror = function () { return markAsReadAndPasteIfAllFilesAreRead(); };
        reader.onload = function () {
          var content = reader.result;
          if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
            markAsReadAndPasteIfAllFilesAreRead();
            return
          }
          text[i] = content;
          markAsReadAndPasteIfAllFilesAreRead();
        };
        reader.readAsText(file);
      };
      for (var i = 0; i < files.length; i++) { readTextFromFile(files[i], i); }
    } else { // Normal drop
      // Don't do a replace if the drop happened inside of the selected text.
      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
        cm.state.draggingText(e);
        // Ensure the editor is re-focused
        setTimeout(function () { return cm.display.input.focus(); }, 20);
        return
      }
      try {
        var text$1 = e.dataTransfer.getData("Text");
        if (text$1) {
          var selected;
          if (cm.state.draggingText && !cm.state.draggingText.copy)
            { selected = cm.listSelections(); }
          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
          if (selected) { for (var i$1 = 0; i$1 < selected.length; ++i$1)
            { replaceRange(cm.doc, "", selected[i$1].anchor, selected[i$1].head, "drag"); } }
          cm.replaceSelection(text$1, "around", "paste");
          cm.display.input.focus();
        }
      }
      catch(e){}
    }
  }

  function onDragStart(cm, e) {
    if (ie && (!cm.state.draggingText || +new Date - lastDrop < 100)) { e_stop(e); return }
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) { return }

    e.dataTransfer.setData("Text", cm.getSelection());
    e.dataTransfer.effectAllowed = "copyMove";

    // Use dummy image instead of default browsers image.
    // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
    if (e.dataTransfer.setDragImage && !safari) {
      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (presto) {
        img.width = img.height = 1;
        cm.display.wrapper.appendChild(img);
        // Force a relayout, or Opera won't use our image for some obscure reason
        img._top = img.offsetTop;
      }
      e.dataTransfer.setDragImage(img, 0, 0);
      if (presto) { img.parentNode.removeChild(img); }
    }
  }

  function onDragOver(cm, e) {
    var pos = posFromMouse(cm, e);
    if (!pos) { return }
    var frag = document.createDocumentFragment();
    drawSelectionCursor(cm, pos, frag);
    if (!cm.display.dragCursor) {
      cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
      cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
    }
    removeChildrenAndAdd(cm.display.dragCursor, frag);
  }

  function clearDragCursor(cm) {
    if (cm.display.dragCursor) {
      cm.display.lineSpace.removeChild(cm.display.dragCursor);
      cm.display.dragCursor = null;
    }
  }

  // These must be handled carefully, because naively registering a
  // handler for each editor will cause the editors to never be
  // garbage collected.

  function forEachCodeMirror(f) {
    if (!document.getElementsByClassName) { return }
    var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
    for (var i = 0; i < byClass.length; i++) {
      var cm = byClass[i].CodeMirror;
      if (cm) { editors.push(cm); }
    }
    if (editors.length) { editors[0].operation(function () {
      for (var i = 0; i < editors.length; i++) { f(editors[i]); }
    }); }
  }

  var globalsRegistered = false;
  function ensureGlobalHandlers() {
    if (globalsRegistered) { return }
    registerGlobalHandlers();
    globalsRegistered = true;
  }
  function registerGlobalHandlers() {
    // When the window resizes, we need to refresh active editors.
    var resizeTimer;
    on(window, "resize", function () {
      if (resizeTimer == null) { resizeTimer = setTimeout(function () {
        resizeTimer = null;
        forEachCodeMirror(onResize);
      }, 100); }
    });
    // When the window loses focus, we want to show the editor as blurred
    on(window, "blur", function () { return forEachCodeMirror(onBlur); });
  }
  // Called when the window resizes
  function onResize(cm) {
    var d = cm.display;
    // Might be a text scaling operation, clear size caches.
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.scrollbarsClipped = false;
    cm.setSize();
  }

  var keyNames = {
    3: "Pause", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
    19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
    36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
    46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod",
    106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 145: "ScrollLock",
    173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
    221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
    63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"
  };

  // Number keys
  for (var i = 0; i < 10; i++) { keyNames[i + 48] = keyNames[i + 96] = String(i); }
  // Alphabetic keys
  for (var i$1 = 65; i$1 <= 90; i$1++) { keyNames[i$1] = String.fromCharCode(i$1); }
  // Function keys
  for (var i$2 = 1; i$2 <= 12; i$2++) { keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2; }

  var keyMap = {};

  keyMap.basic = {
    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
    "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
    "Tab": "defaultTab", "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
    "Esc": "singleSelection"
  };
  // Note that the save and find-related commands aren't defined by
  // default. User code or addons can define them. Unknown commands
  // are simply ignored.
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown",
    "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
    "fallthrough": "basic"
  };
  // Very basic readline/emacs-style bindings, which are standard on Mac.
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
    "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars",
    "Ctrl-O": "openLine"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
    "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight",
    "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd",
    "fallthrough": ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;

  // KEYMAP DISPATCH

  function normalizeKeyName(name) {
    var parts = name.split(/-(?!$)/);
    name = parts[parts.length - 1];
    var alt, ctrl, shift, cmd;
    for (var i = 0; i < parts.length - 1; i++) {
      var mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod)) { cmd = true; }
      else if (/^a(lt)?$/i.test(mod)) { alt = true; }
      else if (/^(c|ctrl|control)$/i.test(mod)) { ctrl = true; }
      else if (/^s(hift)?$/i.test(mod)) { shift = true; }
      else { throw new Error("Unrecognized modifier name: " + mod) }
    }
    if (alt) { name = "Alt-" + name; }
    if (ctrl) { name = "Ctrl-" + name; }
    if (cmd) { name = "Cmd-" + name; }
    if (shift) { name = "Shift-" + name; }
    return name
  }

  // This is a kludge to keep keymaps mostly working as raw objects
  // (backwards compatibility) while at the same time support features
  // like normalization and multi-stroke key bindings. It compiles a
  // new normalized keymap, and then updates the old object to reflect
  // this.
  function normalizeKeyMap(keymap) {
    var copy = {};
    for (var keyname in keymap) { if (keymap.hasOwnProperty(keyname)) {
      var value = keymap[keyname];
      if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) { continue }
      if (value == "...") { delete keymap[keyname]; continue }

      var keys = map(keyname.split(" "), normalizeKeyName);
      for (var i = 0; i < keys.length; i++) {
        var val = (void 0), name = (void 0);
        if (i == keys.length - 1) {
          name = keys.join(" ");
          val = value;
        } else {
          name = keys.slice(0, i + 1).join(" ");
          val = "...";
        }
        var prev = copy[name];
        if (!prev) { copy[name] = val; }
        else if (prev != val) { throw new Error("Inconsistent bindings for " + name) }
      }
      delete keymap[keyname];
    } }
    for (var prop in copy) { keymap[prop] = copy[prop]; }
    return keymap
  }

  function lookupKey(key, map$$1, handle, context) {
    map$$1 = getKeyMap(map$$1);
    var found = map$$1.call ? map$$1.call(key, context) : map$$1[key];
    if (found === false) { return "nothing" }
    if (found === "...") { return "multi" }
    if (found != null && handle(found)) { return "handled" }

    if (map$$1.fallthrough) {
      if (Object.prototype.toString.call(map$$1.fallthrough) != "[object Array]")
        { return lookupKey(key, map$$1.fallthrough, handle, context) }
      for (var i = 0; i < map$$1.fallthrough.length; i++) {
        var result = lookupKey(key, map$$1.fallthrough[i], handle, context);
        if (result) { return result }
      }
    }
  }

  // Modifier key presses don't count as 'real' key presses for the
  // purpose of keymap fallthrough.
  function isModifierKey(value) {
    var name = typeof value == "string" ? value : keyNames[value.keyCode];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod"
  }

  function addModifierNames(name, event, noShift) {
    var base = name;
    if (event.altKey && base != "Alt") { name = "Alt-" + name; }
    if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") { name = "Ctrl-" + name; }
    if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Cmd") { name = "Cmd-" + name; }
    if (!noShift && event.shiftKey && base != "Shift") { name = "Shift-" + name; }
    return name
  }

  // Look up the name of a key as indicated by an event object.
  function keyName(event, noShift) {
    if (presto && event.keyCode == 34 && event["char"]) { return false }
    var name = keyNames[event.keyCode];
    if (name == null || event.altGraphKey) { return false }
    // Ctrl-ScrollLock has keyCode 3, same as Ctrl-Pause,
    // so we'll use event.code when available (Chrome 48+, FF 38+, Safari 10.1+)
    if (event.keyCode == 3 && event.code) { name = event.code; }
    return addModifierNames(name, event, noShift)
  }

  function getKeyMap(val) {
    return typeof val == "string" ? keyMap[val] : val
  }

  // Helper for deleting text near the selection(s), used to implement
  // backspace, delete, and similar functionality.
  function deleteNearSelection(cm, compute) {
    var ranges = cm.doc.sel.ranges, kill = [];
    // Build up a set of ranges to kill first, merging overlapping
    // ranges.
    for (var i = 0; i < ranges.length; i++) {
      var toKill = compute(ranges[i]);
      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
        var replaced = kill.pop();
        if (cmp(replaced.from, toKill.from) < 0) {
          toKill.from = replaced.from;
          break
        }
      }
      kill.push(toKill);
    }
    // Next, remove those actual ranges.
    runInOp(cm, function () {
      for (var i = kill.length - 1; i >= 0; i--)
        { replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete"); }
      ensureCursorVisible(cm);
    });
  }

  function moveCharLogically(line, ch, dir) {
    var target = skipExtendingChars(line.text, ch + dir, dir);
    return target < 0 || target > line.text.length ? null : target
  }

  function moveLogically(line, start, dir) {
    var ch = moveCharLogically(line, start.ch, dir);
    return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before")
  }

  function endOfLine(visually, cm, lineObj, lineNo, dir) {
    if (visually) {
      if (cm.doc.direction == "rtl") { dir = -dir; }
      var order = getOrder(lineObj, cm.doc.direction);
      if (order) {
        var part = dir < 0 ? lst(order) : order[0];
        var moveInStorageOrder = (dir < 0) == (part.level == 1);
        var sticky = moveInStorageOrder ? "after" : "before";
        var ch;
        // With a wrapped rtl chunk (possibly spanning multiple bidi parts),
        // it could be that the last bidi part is not on the last visual line,
        // since visual lines contain content order-consecutive chunks.
        // Thus, in rtl, we are looking for the first (content-order) character
        // in the rtl chunk that is on the last line (that is, the same line
        // as the last (content-order) character).
        if (part.level > 0 || cm.doc.direction == "rtl") {
          var prep = prepareMeasureForLine(cm, lineObj);
          ch = dir < 0 ? lineObj.text.length - 1 : 0;
          var targetTop = measureCharPrepared(cm, prep, ch).top;
          ch = findFirst(function (ch) { return measureCharPrepared(cm, prep, ch).top == targetTop; }, (dir < 0) == (part.level == 1) ? part.from : part.to - 1, ch);
          if (sticky == "before") { ch = moveCharLogically(lineObj, ch, 1); }
        } else { ch = dir < 0 ? part.to : part.from; }
        return new Pos(lineNo, ch, sticky)
      }
    }
    return new Pos(lineNo, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after")
  }

  function moveVisually(cm, line, start, dir) {
    var bidi = getOrder(line, cm.doc.direction);
    if (!bidi) { return moveLogically(line, start, dir) }
    if (start.ch >= line.text.length) {
      start.ch = line.text.length;
      start.sticky = "before";
    } else if (start.ch <= 0) {
      start.ch = 0;
      start.sticky = "after";
    }
    var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
    if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
      // Case 1: We move within an ltr part in an ltr editor. Even with wrapped lines,
      // nothing interesting happens.
      return moveLogically(line, start, dir)
    }

    var mv = function (pos, dir) { return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir); };
    var prep;
    var getWrappedLineExtent = function (ch) {
      if (!cm.options.lineWrapping) { return {begin: 0, end: line.text.length} }
      prep = prep || prepareMeasureForLine(cm, line);
      return wrappedLineExtentChar(cm, line, prep, ch)
    };
    var wrappedLineExtent = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);

    if (cm.doc.direction == "rtl" || part.level == 1) {
      var moveInStorageOrder = (part.level == 1) == (dir < 0);
      var ch = mv(start, moveInStorageOrder ? 1 : -1);
      if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent.begin : ch <= part.to && ch <= wrappedLineExtent.end)) {
        // Case 2: We move within an rtl part or in an rtl editor on the same visual line
        var sticky = moveInStorageOrder ? "before" : "after";
        return new Pos(start.line, ch, sticky)
      }
    }

    // Case 3: Could not move within this bidi part in this visual line, so leave
    // the current bidi part

    var searchInVisualLine = function (partPos, dir, wrappedLineExtent) {
      var getRes = function (ch, moveInStorageOrder) { return moveInStorageOrder
        ? new Pos(start.line, mv(ch, 1), "before")
        : new Pos(start.line, ch, "after"); };

      for (; partPos >= 0 && partPos < bidi.length; partPos += dir) {
        var part = bidi[partPos];
        var moveInStorageOrder = (dir > 0) == (part.level != 1);
        var ch = moveInStorageOrder ? wrappedLineExtent.begin : mv(wrappedLineExtent.end, -1);
        if (part.from <= ch && ch < part.to) { return getRes(ch, moveInStorageOrder) }
        ch = moveInStorageOrder ? part.from : mv(part.to, -1);
        if (wrappedLineExtent.begin <= ch && ch < wrappedLineExtent.end) { return getRes(ch, moveInStorageOrder) }
      }
    };

    // Case 3a: Look for other bidi parts on the same visual line
    var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent);
    if (res) { return res }

    // Case 3b: Look for other bidi parts on the next visual line
    var nextCh = dir > 0 ? wrappedLineExtent.end : mv(wrappedLineExtent.begin, -1);
    if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
      res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
      if (res) { return res }
    }

    // Case 4: Nowhere to move
    return null
  }

  // Commands are parameter-less actions that can be performed on an
  // editor, mostly used for keybindings.
  var commands = {
    selectAll: selectAll,
    singleSelection: function (cm) { return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll); },
    killLine: function (cm) { return deleteNearSelection(cm, function (range) {
      if (range.empty()) {
        var len = getLine(cm.doc, range.head.line).text.length;
        if (range.head.ch == len && range.head.line < cm.lastLine())
          { return {from: range.head, to: Pos(range.head.line + 1, 0)} }
        else
          { return {from: range.head, to: Pos(range.head.line, len)} }
      } else {
        return {from: range.from(), to: range.to()}
      }
    }); },
    deleteLine: function (cm) { return deleteNearSelection(cm, function (range) { return ({
      from: Pos(range.from().line, 0),
      to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
    }); }); },
    delLineLeft: function (cm) { return deleteNearSelection(cm, function (range) { return ({
      from: Pos(range.from().line, 0), to: range.from()
    }); }); },
    delWrappedLineLeft: function (cm) { return deleteNearSelection(cm, function (range) {
      var top = cm.charCoords(range.head, "div").top + 5;
      var leftPos = cm.coordsChar({left: 0, top: top}, "div");
      return {from: leftPos, to: range.from()}
    }); },
    delWrappedLineRight: function (cm) { return deleteNearSelection(cm, function (range) {
      var top = cm.charCoords(range.head, "div").top + 5;
      var rightPos = cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div");
      return {from: range.from(), to: rightPos }
    }); },
    undo: function (cm) { return cm.undo(); },
    redo: function (cm) { return cm.redo(); },
    undoSelection: function (cm) { return cm.undoSelection(); },
    redoSelection: function (cm) { return cm.redoSelection(); },
    goDocStart: function (cm) { return cm.extendSelection(Pos(cm.firstLine(), 0)); },
    goDocEnd: function (cm) { return cm.extendSelection(Pos(cm.lastLine())); },
    goLineStart: function (cm) { return cm.extendSelectionsBy(function (range) { return lineStart(cm, range.head.line); },
      {origin: "+move", bias: 1}
    ); },
    goLineStartSmart: function (cm) { return cm.extendSelectionsBy(function (range) { return lineStartSmart(cm, range.head); },
      {origin: "+move", bias: 1}
    ); },
    goLineEnd: function (cm) { return cm.extendSelectionsBy(function (range) { return lineEnd(cm, range.head.line); },
      {origin: "+move", bias: -1}
    ); },
    goLineRight: function (cm) { return cm.extendSelectionsBy(function (range) {
      var top = cm.cursorCoords(range.head, "div").top + 5;
      return cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div")
    }, sel_move); },
    goLineLeft: function (cm) { return cm.extendSelectionsBy(function (range) {
      var top = cm.cursorCoords(range.head, "div").top + 5;
      return cm.coordsChar({left: 0, top: top}, "div")
    }, sel_move); },
    goLineLeftSmart: function (cm) { return cm.extendSelectionsBy(function (range) {
      var top = cm.cursorCoords(range.head, "div").top + 5;
      var pos = cm.coordsChar({left: 0, top: top}, "div");
      if (pos.ch < cm.getLine(pos.line).search(/\S/)) { return lineStartSmart(cm, range.head) }
      return pos
    }, sel_move); },
    goLineUp: function (cm) { return cm.moveV(-1, "line"); },
    goLineDown: function (cm) { return cm.moveV(1, "line"); },
    goPageUp: function (cm) { return cm.moveV(-1, "page"); },
    goPageDown: function (cm) { return cm.moveV(1, "page"); },
    goCharLeft: function (cm) { return cm.moveH(-1, "char"); },
    goCharRight: function (cm) { return cm.moveH(1, "char"); },
    goColumnLeft: function (cm) { return cm.moveH(-1, "column"); },
    goColumnRight: function (cm) { return cm.moveH(1, "column"); },
    goWordLeft: function (cm) { return cm.moveH(-1, "word"); },
    goGroupRight: function (cm) { return cm.moveH(1, "group"); },
    goGroupLeft: function (cm) { return cm.moveH(-1, "group"); },
    goWordRight: function (cm) { return cm.moveH(1, "word"); },
    delCharBefore: function (cm) { return cm.deleteH(-1, "char"); },
    delCharAfter: function (cm) { return cm.deleteH(1, "char"); },
    delWordBefore: function (cm) { return cm.deleteH(-1, "word"); },
    delWordAfter: function (cm) { return cm.deleteH(1, "word"); },
    delGroupBefore: function (cm) { return cm.deleteH(-1, "group"); },
    delGroupAfter: function (cm) { return cm.deleteH(1, "group"); },
    indentAuto: function (cm) { return cm.indentSelection("smart"); },
    indentMore: function (cm) { return cm.indentSelection("add"); },
    indentLess: function (cm) { return cm.indentSelection("subtract"); },
    insertTab: function (cm) { return cm.replaceSelection("\t"); },
    insertSoftTab: function (cm) {
      var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
      for (var i = 0; i < ranges.length; i++) {
        var pos = ranges[i].from();
        var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
        spaces.push(spaceStr(tabSize - col % tabSize));
      }
      cm.replaceSelections(spaces);
    },
    defaultTab: function (cm) {
      if (cm.somethingSelected()) { cm.indentSelection("add"); }
      else { cm.execCommand("insertTab"); }
    },
    // Swap the two chars left and right of each selection's head.
    // Move cursor behind the two swapped characters afterwards.
    //
    // Doesn't consider line feeds a character.
    // Doesn't scan more than one line above to find a character.
    // Doesn't do anything on an empty line.
    // Doesn't do anything with non-empty selections.
    transposeChars: function (cm) { return runInOp(cm, function () {
      var ranges = cm.listSelections(), newSel = [];
      for (var i = 0; i < ranges.length; i++) {
        if (!ranges[i].empty()) { continue }
        var cur = ranges[i].head, line = getLine(cm.doc, cur.line).text;
        if (line) {
          if (cur.ch == line.length) { cur = new Pos(cur.line, cur.ch - 1); }
          if (cur.ch > 0) {
            cur = new Pos(cur.line, cur.ch + 1);
            cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
                            Pos(cur.line, cur.ch - 2), cur, "+transpose");
          } else if (cur.line > cm.doc.first) {
            var prev = getLine(cm.doc, cur.line - 1).text;
            if (prev) {
              cur = new Pos(cur.line, 1);
              cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() +
                              prev.charAt(prev.length - 1),
                              Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
            }
          }
        }
        newSel.push(new Range(cur, cur));
      }
      cm.setSelections(newSel);
    }); },
    newlineAndIndent: function (cm) { return runInOp(cm, function () {
      var sels = cm.listSelections();
      for (var i = sels.length - 1; i >= 0; i--)
        { cm.replaceRange(cm.doc.lineSeparator(), sels[i].anchor, sels[i].head, "+input"); }
      sels = cm.listSelections();
      for (var i$1 = 0; i$1 < sels.length; i$1++)
        { cm.indentLine(sels[i$1].from().line, null, true); }
      ensureCursorVisible(cm);
    }); },
    openLine: function (cm) { return cm.replaceSelection("\n", "start"); },
    toggleOverwrite: function (cm) { return cm.toggleOverwrite(); }
  };


  function lineStart(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLine(line);
    if (visual != line) { lineN = lineNo(visual); }
    return endOfLine(true, cm, visual, lineN, 1)
  }
  function lineEnd(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLineEnd(line);
    if (visual != line) { lineN = lineNo(visual); }
    return endOfLine(true, cm, line, lineN, -1)
  }
  function lineStartSmart(cm, pos) {
    var start = lineStart(cm, pos.line);
    var line = getLine(cm.doc, start.line);
    var order = getOrder(line, cm.doc.direction);
    if (!order || order[0].level == 0) {
      var firstNonWS = Math.max(start.ch, line.text.search(/\S/));
      var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
      return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky)
    }
    return start
  }

  // Run a handler that was bound to a key.
  function doHandleBinding(cm, bound, dropShift) {
    if (typeof bound == "string") {
      bound = commands[bound];
      if (!bound) { return false }
    }
    // Ensure previous input has been read, so that the handler sees a
    // consistent view of the document
    cm.display.input.ensurePolled();
    var prevShift = cm.display.shift, done = false;
    try {
      if (cm.isReadOnly()) { cm.state.suppressEdits = true; }
      if (dropShift) { cm.display.shift = false; }
      done = bound(cm) != Pass;
    } finally {
      cm.display.shift = prevShift;
      cm.state.suppressEdits = false;
    }
    return done
  }

  function lookupKeyForEditor(cm, name, handle) {
    for (var i = 0; i < cm.state.keyMaps.length; i++) {
      var result = lookupKey(name, cm.state.keyMaps[i], handle, cm);
      if (result) { return result }
    }
    return (cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm))
      || lookupKey(name, cm.options.keyMap, handle, cm)
  }

  // Note that, despite the name, this function is also used to check
  // for bound mouse clicks.

  var stopSeq = new Delayed;

  function dispatchKey(cm, name, e, handle) {
    var seq = cm.state.keySeq;
    if (seq) {
      if (isModifierKey(name)) { return "handled" }
      if (/\'$/.test(name))
        { cm.state.keySeq = null; }
      else
        { stopSeq.set(50, function () {
          if (cm.state.keySeq == seq) {
            cm.state.keySeq = null;
            cm.display.input.reset();
          }
        }); }
      if (dispatchKeyInner(cm, seq + " " + name, e, handle)) { return true }
    }
    return dispatchKeyInner(cm, name, e, handle)
  }

  function dispatchKeyInner(cm, name, e, handle) {
    var result = lookupKeyForEditor(cm, name, handle);

    if (result == "multi")
      { cm.state.keySeq = name; }
    if (result == "handled")
      { signalLater(cm, "keyHandled", cm, name, e); }

    if (result == "handled" || result == "multi") {
      e_preventDefault(e);
      restartBlink(cm);
    }

    return !!result
  }

  // Handle a key from the keydown event.
  function handleKeyBinding(cm, e) {
    var name = keyName(e, true);
    if (!name) { return false }

    if (e.shiftKey && !cm.state.keySeq) {
      // First try to resolve full name (including 'Shift-'). Failing
      // that, see if there is a cursor-motion command (starting with
      // 'go') bound to the keyname without 'Shift-'.
      return dispatchKey(cm, "Shift-" + name, e, function (b) { return doHandleBinding(cm, b, true); })
          || dispatchKey(cm, name, e, function (b) {
               if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion)
                 { return doHandleBinding(cm, b) }
             })
    } else {
      return dispatchKey(cm, name, e, function (b) { return doHandleBinding(cm, b); })
    }
  }

  // Handle a key from the keypress event
  function handleCharBinding(cm, e, ch) {
    return dispatchKey(cm, "'" + ch + "'", e, function (b) { return doHandleBinding(cm, b, true); })
  }

  var lastStoppedKey = null;
  function onKeyDown(e) {
    var cm = this;
    cm.curOp.focus = activeElt();
    if (signalDOMEvent(cm, e)) { return }
    // IE does strange things with escape.
    if (ie && ie_version < 11 && e.keyCode == 27) { e.returnValue = false; }
    var code = e.keyCode;
    cm.display.shift = code == 16 || e.shiftKey;
    var handled = handleKeyBinding(cm, e);
    if (presto) {
      lastStoppedKey = handled ? code : null;
      // Opera has no cut event... we try to at least catch the key combo
      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey))
        { cm.replaceSelection("", null, "cut"); }
    }
    if (gecko && !mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand)
      { document.execCommand("cut"); }

    // Turn mouse into crosshair when Alt is held on Mac.
    if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className))
      { showCrossHair(cm); }
  }

  function showCrossHair(cm) {
    var lineDiv = cm.display.lineDiv;
    addClass(lineDiv, "CodeMirror-crosshair");

    function up(e) {
      if (e.keyCode == 18 || !e.altKey) {
        rmClass(lineDiv, "CodeMirror-crosshair");
        off(document, "keyup", up);
        off(document, "mouseover", up);
      }
    }
    on(document, "keyup", up);
    on(document, "mouseover", up);
  }

  function onKeyUp(e) {
    if (e.keyCode == 16) { this.doc.sel.shift = false; }
    signalDOMEvent(this, e);
  }

  function onKeyPress(e) {
    var cm = this;
    if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) { return }
    var keyCode = e.keyCode, charCode = e.charCode;
    if (presto && keyCode == lastStoppedKey) {lastStoppedKey = null; e_preventDefault(e); return}
    if ((presto && (!e.which || e.which < 10)) && handleKeyBinding(cm, e)) { return }
    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
    // Some browsers fire keypress events for backspace
    if (ch == "\x08") { return }
    if (handleCharBinding(cm, e, ch)) { return }
    cm.display.input.onKeyPress(e);
  }

  var DOUBLECLICK_DELAY = 400;

  var PastClick = function(time, pos, button) {
    this.time = time;
    this.pos = pos;
    this.button = button;
  };

  PastClick.prototype.compare = function (time, pos, button) {
    return this.time + DOUBLECLICK_DELAY > time &&
      cmp(pos, this.pos) == 0 && button == this.button
  };

  var lastClick, lastDoubleClick;
  function clickRepeat(pos, button) {
    var now = +new Date;
    if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
      lastClick = lastDoubleClick = null;
      return "triple"
    } else if (lastClick && lastClick.compare(now, pos, button)) {
      lastDoubleClick = new PastClick(now, pos, button);
      lastClick = null;
      return "double"
    } else {
      lastClick = new PastClick(now, pos, button);
      lastDoubleClick = null;
      return "single"
    }
  }

  // A mouse down can be a single click, double click, triple click,
  // start of selection drag, start of text drag, new cursor
  // (ctrl-click), rectangle drag (alt-drag), or xwin
  // middle-click-paste. Or it might be a click on something we should
  // not interfere with, such as a scrollbar or widget.
  function onMouseDown(e) {
    var cm = this, display = cm.display;
    if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) { return }
    display.input.ensurePolled();
    display.shift = e.shiftKey;

    if (eventInWidget(display, e)) {
      if (!webkit) {
        // Briefly turn off draggability, to allow widgets to do
        // normal dragging things.
        display.scroller.draggable = false;
        setTimeout(function () { return display.scroller.draggable = true; }, 100);
      }
      return
    }
    if (clickInGutter(cm, e)) { return }
    var pos = posFromMouse(cm, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
    window.focus();

    // #3261: make sure, that we're not starting a second selection
    if (button == 1 && cm.state.selectingText)
      { cm.state.selectingText(e); }

    if (pos && handleMappedButton(cm, button, pos, repeat, e)) { return }

    if (button == 1) {
      if (pos) { leftButtonDown(cm, pos, repeat, e); }
      else if (e_target(e) == display.scroller) { e_preventDefault(e); }
    } else if (button == 2) {
      if (pos) { extendSelection(cm.doc, pos); }
      setTimeout(function () { return display.input.focus(); }, 20);
    } else if (button == 3) {
      if (captureRightClick) { cm.display.input.onContextMenu(e); }
      else { delayBlurEvent(cm); }
    }
  }

  function handleMappedButton(cm, button, pos, repeat, event) {
    var name = "Click";
    if (repeat == "double") { name = "Double" + name; }
    else if (repeat == "triple") { name = "Triple" + name; }
    name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;

    return dispatchKey(cm,  addModifierNames(name, event), event, function (bound) {
      if (typeof bound == "string") { bound = commands[bound]; }
      if (!bound) { return false }
      var done = false;
      try {
        if (cm.isReadOnly()) { cm.state.suppressEdits = true; }
        done = bound(cm, pos) != Pass;
      } finally {
        cm.state.suppressEdits = false;
      }
      return done
    })
  }

  function configureMouse(cm, repeat, event) {
    var option = cm.getOption("configureMouse");
    var value = option ? option(cm, repeat, event) : {};
    if (value.unit == null) {
      var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
      value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
    }
    if (value.extend == null || cm.doc.extend) { value.extend = cm.doc.extend || event.shiftKey; }
    if (value.addNew == null) { value.addNew = mac ? event.metaKey : event.ctrlKey; }
    if (value.moveOnDrag == null) { value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey); }
    return value
  }

  function leftButtonDown(cm, pos, repeat, event) {
    if (ie) { setTimeout(bind(ensureFocus, cm), 0); }
    else { cm.curOp.focus = activeElt(); }

    var behavior = configureMouse(cm, repeat, event);

    var sel = cm.doc.sel, contained;
    if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() &&
        repeat == "single" && (contained = sel.contains(pos)) > -1 &&
        (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) &&
        (cmp(contained.to(), pos) > 0 || pos.xRel < 0))
      { leftButtonStartDrag(cm, event, pos, behavior); }
    else
      { leftButtonSelect(cm, event, pos, behavior); }
  }

  // Start a text drag. When it ends, see if any dragging actually
  // happen, and treat as a click if it didn't.
  function leftButtonStartDrag(cm, event, pos, behavior) {
    var display = cm.display, moved = false;
    var dragEnd = operation(cm, function (e) {
      if (webkit) { display.scroller.draggable = false; }
      cm.state.draggingText = false;
      off(display.wrapper.ownerDocument, "mouseup", dragEnd);
      off(display.wrapper.ownerDocument, "mousemove", mouseMove);
      off(display.scroller, "dragstart", dragStart);
      off(display.scroller, "drop", dragEnd);
      if (!moved) {
        e_preventDefault(e);
        if (!behavior.addNew)
          { extendSelection(cm.doc, pos, null, null, behavior.extend); }
        // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
        if (webkit || ie && ie_version == 9)
          { setTimeout(function () {display.wrapper.ownerDocument.body.focus(); display.input.focus();}, 20); }
        else
          { display.input.focus(); }
      }
    });
    var mouseMove = function(e2) {
      moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
    };
    var dragStart = function () { return moved = true; };
    // Let the drag handler handle this.
    if (webkit) { display.scroller.draggable = true; }
    cm.state.draggingText = dragEnd;
    dragEnd.copy = !behavior.moveOnDrag;
    // IE's approach to draggable
    if (display.scroller.dragDrop) { display.scroller.dragDrop(); }
    on(display.wrapper.ownerDocument, "mouseup", dragEnd);
    on(display.wrapper.ownerDocument, "mousemove", mouseMove);
    on(display.scroller, "dragstart", dragStart);
    on(display.scroller, "drop", dragEnd);

    delayBlurEvent(cm);
    setTimeout(function () { return display.input.focus(); }, 20);
  }

  function rangeForUnit(cm, pos, unit) {
    if (unit == "char") { return new Range(pos, pos) }
    if (unit == "word") { return cm.findWordAt(pos) }
    if (unit == "line") { return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0))) }
    var result = unit(cm, pos);
    return new Range(result.from, result.to)
  }

  // Normal selection, as opposed to text dragging.
  function leftButtonSelect(cm, event, start, behavior) {
    var display = cm.display, doc = cm.doc;
    e_preventDefault(event);

    var ourRange, ourIndex, startSel = doc.sel, ranges = startSel.ranges;
    if (behavior.addNew && !behavior.extend) {
      ourIndex = doc.sel.contains(start);
      if (ourIndex > -1)
        { ourRange = ranges[ourIndex]; }
      else
        { ourRange = new Range(start, start); }
    } else {
      ourRange = doc.sel.primary();
      ourIndex = doc.sel.primIndex;
    }

    if (behavior.unit == "rectangle") {
      if (!behavior.addNew) { ourRange = new Range(start, start); }
      start = posFromMouse(cm, event, true, true);
      ourIndex = -1;
    } else {
      var range$$1 = rangeForUnit(cm, start, behavior.unit);
      if (behavior.extend)
        { ourRange = extendRange(ourRange, range$$1.anchor, range$$1.head, behavior.extend); }
      else
        { ourRange = range$$1; }
    }

    if (!behavior.addNew) {
      ourIndex = 0;
      setSelection(doc, new Selection([ourRange], 0), sel_mouse);
      startSel = doc.sel;
    } else if (ourIndex == -1) {
      ourIndex = ranges.length;
      setSelection(doc, normalizeSelection(cm, ranges.concat([ourRange]), ourIndex),
                   {scroll: false, origin: "*mouse"});
    } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
      setSelection(doc, normalizeSelection(cm, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
                   {scroll: false, origin: "*mouse"});
      startSel = doc.sel;
    } else {
      replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
    }

    var lastPos = start;
    function extendTo(pos) {
      if (cmp(lastPos, pos) == 0) { return }
      lastPos = pos;

      if (behavior.unit == "rectangle") {
        var ranges = [], tabSize = cm.options.tabSize;
        var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
        var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
        var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
        for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line));
             line <= end; line++) {
          var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
          if (left == right)
            { ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos))); }
          else if (text.length > leftPos)
            { ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize)))); }
        }
        if (!ranges.length) { ranges.push(new Range(start, start)); }
        setSelection(doc, normalizeSelection(cm, startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex),
                     {origin: "*mouse", scroll: false});
        cm.scrollIntoView(pos);
      } else {
        var oldRange = ourRange;
        var range$$1 = rangeForUnit(cm, pos, behavior.unit);
        var anchor = oldRange.anchor, head;
        if (cmp(range$$1.anchor, anchor) > 0) {
          head = range$$1.head;
          anchor = minPos(oldRange.from(), range$$1.anchor);
        } else {
          head = range$$1.anchor;
          anchor = maxPos(oldRange.to(), range$$1.head);
        }
        var ranges$1 = startSel.ranges.slice(0);
        ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc, anchor), head));
        setSelection(doc, normalizeSelection(cm, ranges$1, ourIndex), sel_mouse);
      }
    }

    var editorSize = display.wrapper.getBoundingClientRect();
    // Used to ensure timeout re-tries don't fire when another extend
    // happened in the meantime (clearTimeout isn't reliable -- at
    // least on Chrome, the timeouts still happen even when cleared,
    // if the clear happens after their scheduled firing time).
    var counter = 0;

    function extend(e) {
      var curCount = ++counter;
      var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
      if (!cur) { return }
      if (cmp(cur, lastPos) != 0) {
        cm.curOp.focus = activeElt();
        extendTo(cur);
        var visible = visibleLines(display, doc);
        if (cur.line >= visible.to || cur.line < visible.from)
          { setTimeout(operation(cm, function () {if (counter == curCount) { extend(e); }}), 150); }
      } else {
        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
        if (outside) { setTimeout(operation(cm, function () {
          if (counter != curCount) { return }
          display.scroller.scrollTop += outside;
          extend(e);
        }), 50); }
      }
    }

    function done(e) {
      cm.state.selectingText = false;
      counter = Infinity;
      // If e is null or undefined we interpret this as someone trying
      // to explicitly cancel the selection rather than the user
      // letting go of the mouse button.
      if (e) {
        e_preventDefault(e);
        display.input.focus();
      }
      off(display.wrapper.ownerDocument, "mousemove", move);
      off(display.wrapper.ownerDocument, "mouseup", up);
      doc.history.lastSelOrigin = null;
    }

    var move = operation(cm, function (e) {
      if (e.buttons === 0 || !e_button(e)) { done(e); }
      else { extend(e); }
    });
    var up = operation(cm, done);
    cm.state.selectingText = up;
    on(display.wrapper.ownerDocument, "mousemove", move);
    on(display.wrapper.ownerDocument, "mouseup", up);
  }

  // Used when mouse-selecting to adjust the anchor to the proper side
  // of a bidi jump depending on the visual position of the head.
  function bidiSimplify(cm, range$$1) {
    var anchor = range$$1.anchor;
    var head = range$$1.head;
    var anchorLine = getLine(cm.doc, anchor.line);
    if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) { return range$$1 }
    var order = getOrder(anchorLine);
    if (!order) { return range$$1 }
    var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
    if (part.from != anchor.ch && part.to != anchor.ch) { return range$$1 }
    var boundary = index + ((part.from == anchor.ch) == (part.level != 1) ? 0 : 1);
    if (boundary == 0 || boundary == order.length) { return range$$1 }

    // Compute the relative visual position of the head compared to the
    // anchor (<0 is to the left, >0 to the right)
    var leftSide;
    if (head.line != anchor.line) {
      leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
    } else {
      var headIndex = getBidiPartAt(order, head.ch, head.sticky);
      var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
      if (headIndex == boundary - 1 || headIndex == boundary)
        { leftSide = dir < 0; }
      else
        { leftSide = dir > 0; }
    }

    var usePart = order[boundary + (leftSide ? -1 : 0)];
    var from = leftSide == (usePart.level == 1);
    var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
    return anchor.ch == ch && anchor.sticky == sticky ? range$$1 : new Range(new Pos(anchor.line, ch, sticky), head)
  }


  // Determines whether an event happened in the gutter, and fires the
  // handlers for the corresponding event.
  function gutterEvent(cm, e, type, prevent) {
    var mX, mY;
    if (e.touches) {
      mX = e.touches[0].clientX;
      mY = e.touches[0].clientY;
    } else {
      try { mX = e.clientX; mY = e.clientY; }
      catch(e) { return false }
    }
    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) { return false }
    if (prevent) { e_preventDefault(e); }

    var display = cm.display;
    var lineBox = display.lineDiv.getBoundingClientRect();

    if (mY > lineBox.bottom || !hasHandler(cm, type)) { return e_defaultPrevented(e) }
    mY -= lineBox.top - display.viewOffset;

    for (var i = 0; i < cm.display.gutterSpecs.length; ++i) {
      var g = display.gutters.childNodes[i];
      if (g && g.getBoundingClientRect().right >= mX) {
        var line = lineAtHeight(cm.doc, mY);
        var gutter = cm.display.gutterSpecs[i];
        signal(cm, type, cm, line, gutter.className, e);
        return e_defaultPrevented(e)
      }
    }
  }

  function clickInGutter(cm, e) {
    return gutterEvent(cm, e, "gutterClick", true)
  }

  // CONTEXT MENU HANDLING

  // To make the context menu work, we need to briefly unhide the
  // textarea (making it as unobtrusive as possible) to let the
  // right-click take effect on it.
  function onContextMenu(cm, e) {
    if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) { return }
    if (signalDOMEvent(cm, e, "contextmenu")) { return }
    if (!captureRightClick) { cm.display.input.onContextMenu(e); }
  }

  function contextMenuInGutter(cm, e) {
    if (!hasHandler(cm, "gutterContextMenu")) { return false }
    return gutterEvent(cm, e, "gutterContextMenu", false)
  }

  function themeChanged(cm) {
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    clearCaches(cm);
  }

  var Init = {toString: function(){return "CodeMirror.Init"}};

  var defaults = {};
  var optionHandlers = {};

  function defineOptions(CodeMirror) {
    var optionHandlers = CodeMirror.optionHandlers;

    function option(name, deflt, handle, notOnInit) {
      CodeMirror.defaults[name] = deflt;
      if (handle) { optionHandlers[name] =
        notOnInit ? function (cm, val, old) {if (old != Init) { handle(cm, val, old); }} : handle; }
    }

    CodeMirror.defineOption = option;

    // Passed to option handlers when there is no old value.
    CodeMirror.Init = Init;

    // These two are, on init, called from the constructor because they
    // have to be initialized before the editor can start at all.
    option("value", "", function (cm, val) { return cm.setValue(val); }, true);
    option("mode", null, function (cm, val) {
      cm.doc.modeOption = val;
      loadMode(cm);
    }, true);

    option("indentUnit", 2, loadMode, true);
    option("indentWithTabs", false);
    option("smartIndent", true);
    option("tabSize", 4, function (cm) {
      resetModeState(cm);
      clearCaches(cm);
      regChange(cm);
    }, true);

    option("lineSeparator", null, function (cm, val) {
      cm.doc.lineSep = val;
      if (!val) { return }
      var newBreaks = [], lineNo = cm.doc.first;
      cm.doc.iter(function (line) {
        for (var pos = 0;;) {
          var found = line.text.indexOf(val, pos);
          if (found == -1) { break }
          pos = found + val.length;
          newBreaks.push(Pos(lineNo, found));
        }
        lineNo++;
      });
      for (var i = newBreaks.length - 1; i >= 0; i--)
        { replaceRange(cm.doc, val, newBreaks[i], Pos(newBreaks[i].line, newBreaks[i].ch + val.length)); }
    });
    option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function (cm, val, old) {
      cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
      if (old != Init) { cm.refresh(); }
    });
    option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function (cm) { return cm.refresh(); }, true);
    option("electricChars", true);
    option("inputStyle", mobile ? "contenteditable" : "textarea", function () {
      throw new Error("inputStyle can not (yet) be changed in a running editor") // FIXME
    }, true);
    option("spellcheck", false, function (cm, val) { return cm.getInputField().spellcheck = val; }, true);
    option("autocorrect", false, function (cm, val) { return cm.getInputField().autocorrect = val; }, true);
    option("autocapitalize", false, function (cm, val) { return cm.getInputField().autocapitalize = val; }, true);
    option("rtlMoveVisually", !windows);
    option("wholeLineUpdateBefore", true);

    option("theme", "default", function (cm) {
      themeChanged(cm);
      updateGutters(cm);
    }, true);
    option("keyMap", "default", function (cm, val, old) {
      var next = getKeyMap(val);
      var prev = old != Init && getKeyMap(old);
      if (prev && prev.detach) { prev.detach(cm, next); }
      if (next.attach) { next.attach(cm, prev || null); }
    });
    option("extraKeys", null);
    option("configureMouse", null);

    option("lineWrapping", false, wrappingChanged, true);
    option("gutters", [], function (cm, val) {
      cm.display.gutterSpecs = getGutters(val, cm.options.lineNumbers);
      updateGutters(cm);
    }, true);
    option("fixedGutter", true, function (cm, val) {
      cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
      cm.refresh();
    }, true);
    option("coverGutterNextToScrollbar", false, function (cm) { return updateScrollbars(cm); }, true);
    option("scrollbarStyle", "native", function (cm) {
      initScrollbars(cm);
      updateScrollbars(cm);
      cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
      cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
    }, true);
    option("lineNumbers", false, function (cm, val) {
      cm.display.gutterSpecs = getGutters(cm.options.gutters, val);
      updateGutters(cm);
    }, true);
    option("firstLineNumber", 1, updateGutters, true);
    option("lineNumberFormatter", function (integer) { return integer; }, updateGutters, true);
    option("showCursorWhenSelecting", false, updateSelection, true);

    option("resetSelectionOnContextMenu", true);
    option("lineWiseCopyCut", true);
    option("pasteLinesPerSelection", true);
    option("selectionsMayTouch", false);

    option("readOnly", false, function (cm, val) {
      if (val == "nocursor") {
        onBlur(cm);
        cm.display.input.blur();
      }
      cm.display.input.readOnlyChanged(val);
    });
    option("disableInput", false, function (cm, val) {if (!val) { cm.display.input.reset(); }}, true);
    option("dragDrop", true, dragDropChanged);
    option("allowDropFileTypes", null);

    option("cursorBlinkRate", 530);
    option("cursorScrollMargin", 0);
    option("cursorHeight", 1, updateSelection, true);
    option("singleCursorHeightPerLine", true, updateSelection, true);
    option("workTime", 100);
    option("workDelay", 100);
    option("flattenSpans", true, resetModeState, true);
    option("addModeClass", false, resetModeState, true);
    option("pollInterval", 100);
    option("undoDepth", 200, function (cm, val) { return cm.doc.history.undoDepth = val; });
    option("historyEventDelay", 1250);
    option("viewportMargin", 10, function (cm) { return cm.refresh(); }, true);
    option("maxHighlightLength", 10000, resetModeState, true);
    option("moveInputWithCursor", true, function (cm, val) {
      if (!val) { cm.display.input.resetPosition(); }
    });

    option("tabindex", null, function (cm, val) { return cm.display.input.getField().tabIndex = val || ""; });
    option("autofocus", null);
    option("direction", "ltr", function (cm, val) { return cm.doc.setDirection(val); }, true);
    option("phrases", null);
  }

  function dragDropChanged(cm, value, old) {
    var wasOn = old && old != Init;
    if (!value != !wasOn) {
      var funcs = cm.display.dragFunctions;
      var toggle = value ? on : off;
      toggle(cm.display.scroller, "dragstart", funcs.start);
      toggle(cm.display.scroller, "dragenter", funcs.enter);
      toggle(cm.display.scroller, "dragover", funcs.over);
      toggle(cm.display.scroller, "dragleave", funcs.leave);
      toggle(cm.display.scroller, "drop", funcs.drop);
    }
  }

  function wrappingChanged(cm) {
    if (cm.options.lineWrapping) {
      addClass(cm.display.wrapper, "CodeMirror-wrap");
      cm.display.sizer.style.minWidth = "";
      cm.display.sizerWidth = null;
    } else {
      rmClass(cm.display.wrapper, "CodeMirror-wrap");
      findMaxLine(cm);
    }
    estimateLineHeights(cm);
    regChange(cm);
    clearCaches(cm);
    setTimeout(function () { return updateScrollbars(cm); }, 100);
  }

  // A CodeMirror instance represents an editor. This is the object
  // that user code is usually dealing with.

  function CodeMirror(place, options) {
    var this$1 = this;

    if (!(this instanceof CodeMirror)) { return new CodeMirror(place, options) }

    this.options = options = options ? copyObj(options) : {};
    // Determine effective options based on given values and defaults.
    copyObj(defaults, options, false);

    var doc = options.value;
    if (typeof doc == "string") { doc = new Doc(doc, options.mode, null, options.lineSeparator, options.direction); }
    else if (options.mode) { doc.modeOption = options.mode; }
    this.doc = doc;

    var input = new CodeMirror.inputStyles[options.inputStyle](this);
    var display = this.display = new Display(place, doc, input, options);
    display.wrapper.CodeMirror = this;
    themeChanged(this);
    if (options.lineWrapping)
      { this.display.wrapper.className += " CodeMirror-wrap"; }
    initScrollbars(this);

    this.state = {
      keyMaps: [],  // stores maps added by addKeyMap
      overlays: [], // highlighting overlays, as added by addOverlay
      modeGen: 0,   // bumped when mode/overlay changes, used to invalidate highlighting info
      overwrite: false,
      delayingBlurEvent: false,
      focused: false,
      suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
      pasteIncoming: -1, cutIncoming: -1, // help recognize paste/cut edits in input.poll
      selectingText: false,
      draggingText: false,
      highlight: new Delayed(), // stores highlight worker timeout
      keySeq: null,  // Unfinished key sequence
      specialChars: null
    };

    if (options.autofocus && !mobile) { display.input.focus(); }

    // Override magic textarea content restore that IE sometimes does
    // on our hidden textarea on reload
    if (ie && ie_version < 11) { setTimeout(function () { return this$1.display.input.reset(true); }, 20); }

    registerEventHandlers(this);
    ensureGlobalHandlers();

    startOperation(this);
    this.curOp.forceUpdate = true;
    attachDoc(this, doc);

    if ((options.autofocus && !mobile) || this.hasFocus())
      { setTimeout(bind(onFocus, this), 20); }
    else
      { onBlur(this); }

    for (var opt in optionHandlers) { if (optionHandlers.hasOwnProperty(opt))
      { optionHandlers[opt](this$1, options[opt], Init); } }
    maybeUpdateLineNumberWidth(this);
    if (options.finishInit) { options.finishInit(this); }
    for (var i = 0; i < initHooks.length; ++i) { initHooks[i](this$1); }
    endOperation(this);
    // Suppress optimizelegibility in Webkit, since it breaks text
    // measuring on line wrapping boundaries.
    if (webkit && options.lineWrapping &&
        getComputedStyle(display.lineDiv).textRendering == "optimizelegibility")
      { display.lineDiv.style.textRendering = "auto"; }
  }

  // The default configuration options.
  CodeMirror.defaults = defaults;
  // Functions to run when options are changed.
  CodeMirror.optionHandlers = optionHandlers;

  // Attach the necessary event handlers when initializing the editor
  function registerEventHandlers(cm) {
    var d = cm.display;
    on(d.scroller, "mousedown", operation(cm, onMouseDown));
    // Older IE's will not fire a second mousedown for a double click
    if (ie && ie_version < 11)
      { on(d.scroller, "dblclick", operation(cm, function (e) {
        if (signalDOMEvent(cm, e)) { return }
        var pos = posFromMouse(cm, e);
        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) { return }
        e_preventDefault(e);
        var word = cm.findWordAt(pos);
        extendSelection(cm.doc, word.anchor, word.head);
      })); }
    else
      { on(d.scroller, "dblclick", function (e) { return signalDOMEvent(cm, e) || e_preventDefault(e); }); }
    // Some browsers fire contextmenu *after* opening the menu, at
    // which point we can't mess with it anymore. Context menu is
    // handled in onMouseDown for these browsers.
    on(d.scroller, "contextmenu", function (e) { return onContextMenu(cm, e); });
    on(d.input.getField(), "contextmenu", function (e) {
      if (!d.scroller.contains(e.target)) { onContextMenu(cm, e); }
    });

    // Used to suppress mouse event handling when a touch happens
    var touchFinished, prevTouch = {end: 0};
    function finishTouch() {
      if (d.activeTouch) {
        touchFinished = setTimeout(function () { return d.activeTouch = null; }, 1000);
        prevTouch = d.activeTouch;
        prevTouch.end = +new Date;
      }
    }
    function isMouseLikeTouchEvent(e) {
      if (e.touches.length != 1) { return false }
      var touch = e.touches[0];
      return touch.radiusX <= 1 && touch.radiusY <= 1
    }
    function farAway(touch, other) {
      if (other.left == null) { return true }
      var dx = other.left - touch.left, dy = other.top - touch.top;
      return dx * dx + dy * dy > 20 * 20
    }
    on(d.scroller, "touchstart", function (e) {
      if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
        d.input.ensurePolled();
        clearTimeout(touchFinished);
        var now = +new Date;
        d.activeTouch = {start: now, moved: false,
                         prev: now - prevTouch.end <= 300 ? prevTouch : null};
        if (e.touches.length == 1) {
          d.activeTouch.left = e.touches[0].pageX;
          d.activeTouch.top = e.touches[0].pageY;
        }
      }
    });
    on(d.scroller, "touchmove", function () {
      if (d.activeTouch) { d.activeTouch.moved = true; }
    });
    on(d.scroller, "touchend", function (e) {
      var touch = d.activeTouch;
      if (touch && !eventInWidget(d, e) && touch.left != null &&
          !touch.moved && new Date - touch.start < 300) {
        var pos = cm.coordsChar(d.activeTouch, "page"), range;
        if (!touch.prev || farAway(touch, touch.prev)) // Single tap
          { range = new Range(pos, pos); }
        else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) // Double tap
          { range = cm.findWordAt(pos); }
        else // Triple tap
          { range = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0))); }
        cm.setSelection(range.anchor, range.head);
        cm.focus();
        e_preventDefault(e);
      }
      finishTouch();
    });
    on(d.scroller, "touchcancel", finishTouch);

    // Sync scrolling between fake scrollbars and real scrollable
    // area, ensure viewport is updated when scrolling.
    on(d.scroller, "scroll", function () {
      if (d.scroller.clientHeight) {
        updateScrollTop(cm, d.scroller.scrollTop);
        setScrollLeft(cm, d.scroller.scrollLeft, true);
        signal(cm, "scroll", cm);
      }
    });

    // Listen to wheel events in order to try and update the viewport on time.
    on(d.scroller, "mousewheel", function (e) { return onScrollWheel(cm, e); });
    on(d.scroller, "DOMMouseScroll", function (e) { return onScrollWheel(cm, e); });

    // Prevent wrapper from ever scrolling
    on(d.wrapper, "scroll", function () { return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0; });

    d.dragFunctions = {
      enter: function (e) {if (!signalDOMEvent(cm, e)) { e_stop(e); }},
      over: function (e) {if (!signalDOMEvent(cm, e)) { onDragOver(cm, e); e_stop(e); }},
      start: function (e) { return onDragStart(cm, e); },
      drop: operation(cm, onDrop),
      leave: function (e) {if (!signalDOMEvent(cm, e)) { clearDragCursor(cm); }}
    };

    var inp = d.input.getField();
    on(inp, "keyup", function (e) { return onKeyUp.call(cm, e); });
    on(inp, "keydown", operation(cm, onKeyDown));
    on(inp, "keypress", operation(cm, onKeyPress));
    on(inp, "focus", function (e) { return onFocus(cm, e); });
    on(inp, "blur", function (e) { return onBlur(cm, e); });
  }

  var initHooks = [];
  CodeMirror.defineInitHook = function (f) { return initHooks.push(f); };

  // Indent the given line. The how parameter can be "smart",
  // "add"/null, "subtract", or "prev". When aggressive is false
  // (typically set to true for forced single-line indents), empty
  // lines are not indented, and places where the mode returns Pass
  // are left alone.
  function indentLine(cm, n, how, aggressive) {
    var doc = cm.doc, state;
    if (how == null) { how = "add"; }
    if (how == "smart") {
      // Fall back to "prev" when the mode doesn't have an indentation
      // method.
      if (!doc.mode.indent) { how = "prev"; }
      else { state = getContextBefore(cm, n).state; }
    }

    var tabSize = cm.options.tabSize;
    var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
    if (line.stateAfter) { line.stateAfter = null; }
    var curSpaceString = line.text.match(/^\s*/)[0], indentation;
    if (!aggressive && !/\S/.test(line.text)) {
      indentation = 0;
      how = "not";
    } else if (how == "smart") {
      indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      if (indentation == Pass || indentation > 150) {
        if (!aggressive) { return }
        how = "prev";
      }
    }
    if (how == "prev") {
      if (n > doc.first) { indentation = countColumn(getLine(doc, n-1).text, null, tabSize); }
      else { indentation = 0; }
    } else if (how == "add") {
      indentation = curSpace + cm.options.indentUnit;
    } else if (how == "subtract") {
      indentation = curSpace - cm.options.indentUnit;
    } else if (typeof how == "number") {
      indentation = curSpace + how;
    }
    indentation = Math.max(0, indentation);

    var indentString = "", pos = 0;
    if (cm.options.indentWithTabs)
      { for (var i = Math.floor(indentation / tabSize); i; --i) {pos += tabSize; indentString += "\t";} }
    if (pos < indentation) { indentString += spaceStr(indentation - pos); }

    if (indentString != curSpaceString) {
      replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
      line.stateAfter = null;
      return true
    } else {
      // Ensure that, if the cursor was in the whitespace at the start
      // of the line, it is moved to the end of that space.
      for (var i$1 = 0; i$1 < doc.sel.ranges.length; i$1++) {
        var range = doc.sel.ranges[i$1];
        if (range.head.line == n && range.head.ch < curSpaceString.length) {
          var pos$1 = Pos(n, curSpaceString.length);
          replaceOneSelection(doc, i$1, new Range(pos$1, pos$1));
          break
        }
      }
    }
  }

  // This will be set to a {lineWise: bool, text: [string]} object, so
  // that, when pasting, we know what kind of selections the copied
  // text was made out of.
  var lastCopied = null;

  function setLastCopied(newLastCopied) {
    lastCopied = newLastCopied;
  }

  function applyTextInput(cm, inserted, deleted, sel, origin) {
    var doc = cm.doc;
    cm.display.shift = false;
    if (!sel) { sel = doc.sel; }

    var recent = +new Date - 200;
    var paste = origin == "paste" || cm.state.pasteIncoming > recent;
    var textLines = splitLinesAuto(inserted), multiPaste = null;
    // When pasting N lines into N selections, insert one line per selection
    if (paste && sel.ranges.length > 1) {
      if (lastCopied && lastCopied.text.join("\n") == inserted) {
        if (sel.ranges.length % lastCopied.text.length == 0) {
          multiPaste = [];
          for (var i = 0; i < lastCopied.text.length; i++)
            { multiPaste.push(doc.splitLines(lastCopied.text[i])); }
        }
      } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
        multiPaste = map(textLines, function (l) { return [l]; });
      }
    }

    var updateInput = cm.curOp.updateInput;
    // Normal behavior is to insert the new text into every selection
    for (var i$1 = sel.ranges.length - 1; i$1 >= 0; i$1--) {
      var range$$1 = sel.ranges[i$1];
      var from = range$$1.from(), to = range$$1.to();
      if (range$$1.empty()) {
        if (deleted && deleted > 0) // Handle deletion
          { from = Pos(from.line, from.ch - deleted); }
        else if (cm.state.overwrite && !paste) // Handle overwrite
          { to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length)); }
        else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == inserted)
          { from = to = Pos(from.line, 0); }
      }
      var changeEvent = {from: from, to: to, text: multiPaste ? multiPaste[i$1 % multiPaste.length] : textLines,
                         origin: origin || (paste ? "paste" : cm.state.cutIncoming > recent ? "cut" : "+input")};
      makeChange(cm.doc, changeEvent);
      signalLater(cm, "inputRead", cm, changeEvent);
    }
    if (inserted && !paste)
      { triggerElectric(cm, inserted); }

    ensureCursorVisible(cm);
    if (cm.curOp.updateInput < 2) { cm.curOp.updateInput = updateInput; }
    cm.curOp.typing = true;
    cm.state.pasteIncoming = cm.state.cutIncoming = -1;
  }

  function handlePaste(e, cm) {
    var pasted = e.clipboardData && e.clipboardData.getData("Text");
    if (pasted) {
      e.preventDefault();
      if (!cm.isReadOnly() && !cm.options.disableInput)
        { runInOp(cm, function () { return applyTextInput(cm, pasted, 0, null, "paste"); }); }
      return true
    }
  }

  function triggerElectric(cm, inserted) {
    // When an 'electric' character is inserted, immediately trigger a reindent
    if (!cm.options.electricChars || !cm.options.smartIndent) { return }
    var sel = cm.doc.sel;

    for (var i = sel.ranges.length - 1; i >= 0; i--) {
      var range$$1 = sel.ranges[i];
      if (range$$1.head.ch > 100 || (i && sel.ranges[i - 1].head.line == range$$1.head.line)) { continue }
      var mode = cm.getModeAt(range$$1.head);
      var indented = false;
      if (mode.electricChars) {
        for (var j = 0; j < mode.electricChars.length; j++)
          { if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
            indented = indentLine(cm, range$$1.head.line, "smart");
            break
          } }
      } else if (mode.electricInput) {
        if (mode.electricInput.test(getLine(cm.doc, range$$1.head.line).text.slice(0, range$$1.head.ch)))
          { indented = indentLine(cm, range$$1.head.line, "smart"); }
      }
      if (indented) { signalLater(cm, "electricInput", cm, range$$1.head.line); }
    }
  }

  function copyableRanges(cm) {
    var text = [], ranges = [];
    for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
      var line = cm.doc.sel.ranges[i].head.line;
      var lineRange = {anchor: Pos(line, 0), head: Pos(line + 1, 0)};
      ranges.push(lineRange);
      text.push(cm.getRange(lineRange.anchor, lineRange.head));
    }
    return {text: text, ranges: ranges}
  }

  function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
    field.setAttribute("autocorrect", autocorrect ? "" : "off");
    field.setAttribute("autocapitalize", autocapitalize ? "" : "off");
    field.setAttribute("spellcheck", !!spellcheck);
  }

  function hiddenTextarea() {
    var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none");
    var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    // The textarea is kept positioned near the cursor to prevent the
    // fact that it'll be scrolled into view on input from scrolling
    // our fake cursor out of view. On webkit, when wrap=off, paste is
    // very slow. So make the area wide instead.
    if (webkit) { te.style.width = "1000px"; }
    else { te.setAttribute("wrap", "off"); }
    // If border: 0; -- iOS fails to open keyboard (issue #1287)
    if (ios) { te.style.border = "1px solid black"; }
    disableBrowserMagic(te);
    return div
  }

  // The publicly visible API. Note that methodOp(f) means
  // 'wrap f in an operation, performed on its `this` parameter'.

  // This is not the complete set of editor methods. Most of the
  // methods defined on the Doc type are also injected into
  // CodeMirror.prototype, for backwards compatibility and
  // convenience.

  function addEditorMethods(CodeMirror) {
    var optionHandlers = CodeMirror.optionHandlers;

    var helpers = CodeMirror.helpers = {};

    CodeMirror.prototype = {
      constructor: CodeMirror,
      focus: function(){window.focus(); this.display.input.focus();},

      setOption: function(option, value) {
        var options = this.options, old = options[option];
        if (options[option] == value && option != "mode") { return }
        options[option] = value;
        if (optionHandlers.hasOwnProperty(option))
          { operation(this, optionHandlers[option])(this, value, old); }
        signal(this, "optionChange", this, option);
      },

      getOption: function(option) {return this.options[option]},
      getDoc: function() {return this.doc},

      addKeyMap: function(map$$1, bottom) {
        this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map$$1));
      },
      removeKeyMap: function(map$$1) {
        var maps = this.state.keyMaps;
        for (var i = 0; i < maps.length; ++i)
          { if (maps[i] == map$$1 || maps[i].name == map$$1) {
            maps.splice(i, 1);
            return true
          } }
      },

      addOverlay: methodOp(function(spec, options) {
        var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
        if (mode.startState) { throw new Error("Overlays may not be stateful.") }
        insertSorted(this.state.overlays,
                     {mode: mode, modeSpec: spec, opaque: options && options.opaque,
                      priority: (options && options.priority) || 0},
                     function (overlay) { return overlay.priority; });
        this.state.modeGen++;
        regChange(this);
      }),
      removeOverlay: methodOp(function(spec) {
        var this$1 = this;

        var overlays = this.state.overlays;
        for (var i = 0; i < overlays.length; ++i) {
          var cur = overlays[i].modeSpec;
          if (cur == spec || typeof spec == "string" && cur.name == spec) {
            overlays.splice(i, 1);
            this$1.state.modeGen++;
            regChange(this$1);
            return
          }
        }
      }),

      indentLine: methodOp(function(n, dir, aggressive) {
        if (typeof dir != "string" && typeof dir != "number") {
          if (dir == null) { dir = this.options.smartIndent ? "smart" : "prev"; }
          else { dir = dir ? "add" : "subtract"; }
        }
        if (isLine(this.doc, n)) { indentLine(this, n, dir, aggressive); }
      }),
      indentSelection: methodOp(function(how) {
        var this$1 = this;

        var ranges = this.doc.sel.ranges, end = -1;
        for (var i = 0; i < ranges.length; i++) {
          var range$$1 = ranges[i];
          if (!range$$1.empty()) {
            var from = range$$1.from(), to = range$$1.to();
            var start = Math.max(end, from.line);
            end = Math.min(this$1.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
            for (var j = start; j < end; ++j)
              { indentLine(this$1, j, how); }
            var newRanges = this$1.doc.sel.ranges;
            if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i].from().ch > 0)
              { replaceOneSelection(this$1.doc, i, new Range(from, newRanges[i].to()), sel_dontScroll); }
          } else if (range$$1.head.line > end) {
            indentLine(this$1, range$$1.head.line, how, true);
            end = range$$1.head.line;
            if (i == this$1.doc.sel.primIndex) { ensureCursorVisible(this$1); }
          }
        }
      }),

      // Fetch the parser token for a given character. Useful for hacks
      // that want to inspect the mode state (say, for completion).
      getTokenAt: function(pos, precise) {
        return takeToken(this, pos, precise)
      },

      getLineTokens: function(line, precise) {
        return takeToken(this, Pos(line), precise, true)
      },

      getTokenTypeAt: function(pos) {
        pos = clipPos(this.doc, pos);
        var styles = getLineStyles(this, getLine(this.doc, pos.line));
        var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
        var type;
        if (ch == 0) { type = styles[2]; }
        else { for (;;) {
          var mid = (before + after) >> 1;
          if ((mid ? styles[mid * 2 - 1] : 0) >= ch) { after = mid; }
          else if (styles[mid * 2 + 1] < ch) { before = mid + 1; }
          else { type = styles[mid * 2 + 2]; break }
        } }
        var cut = type ? type.indexOf("overlay ") : -1;
        return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1)
      },

      getModeAt: function(pos) {
        var mode = this.doc.mode;
        if (!mode.innerMode) { return mode }
        return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode
      },

      getHelper: function(pos, type) {
        return this.getHelpers(pos, type)[0]
      },

      getHelpers: function(pos, type) {
        var this$1 = this;

        var found = [];
        if (!helpers.hasOwnProperty(type)) { return found }
        var help = helpers[type], mode = this.getModeAt(pos);
        if (typeof mode[type] == "string") {
          if (help[mode[type]]) { found.push(help[mode[type]]); }
        } else if (mode[type]) {
          for (var i = 0; i < mode[type].length; i++) {
            var val = help[mode[type][i]];
            if (val) { found.push(val); }
          }
        } else if (mode.helperType && help[mode.helperType]) {
          found.push(help[mode.helperType]);
        } else if (help[mode.name]) {
          found.push(help[mode.name]);
        }
        for (var i$1 = 0; i$1 < help._global.length; i$1++) {
          var cur = help._global[i$1];
          if (cur.pred(mode, this$1) && indexOf(found, cur.val) == -1)
            { found.push(cur.val); }
        }
        return found
      },

      getStateAfter: function(line, precise) {
        var doc = this.doc;
        line = clipLine(doc, line == null ? doc.first + doc.size - 1: line);
        return getContextBefore(this, line + 1, precise).state
      },

      cursorCoords: function(start, mode) {
        var pos, range$$1 = this.doc.sel.primary();
        if (start == null) { pos = range$$1.head; }
        else if (typeof start == "object") { pos = clipPos(this.doc, start); }
        else { pos = start ? range$$1.from() : range$$1.to(); }
        return cursorCoords(this, pos, mode || "page")
      },

      charCoords: function(pos, mode) {
        return charCoords(this, clipPos(this.doc, pos), mode || "page")
      },

      coordsChar: function(coords, mode) {
        coords = fromCoordSystem(this, coords, mode || "page");
        return coordsChar(this, coords.left, coords.top)
      },

      lineAtHeight: function(height, mode) {
        height = fromCoordSystem(this, {top: height, left: 0}, mode || "page").top;
        return lineAtHeight(this.doc, height + this.display.viewOffset)
      },
      heightAtLine: function(line, mode, includeWidgets) {
        var end = false, lineObj;
        if (typeof line == "number") {
          var last = this.doc.first + this.doc.size - 1;
          if (line < this.doc.first) { line = this.doc.first; }
          else if (line > last) { line = last; end = true; }
          lineObj = getLine(this.doc, line);
        } else {
          lineObj = line;
        }
        return intoCoordSystem(this, lineObj, {top: 0, left: 0}, mode || "page", includeWidgets || end).top +
          (end ? this.doc.height - heightAtLine(lineObj) : 0)
      },

      defaultTextHeight: function() { return textHeight(this.display) },
      defaultCharWidth: function() { return charWidth(this.display) },

      getViewport: function() { return {from: this.display.viewFrom, to: this.display.viewTo}},

      addWidget: function(pos, node, scroll, vert, horiz) {
        var display = this.display;
        pos = cursorCoords(this, clipPos(this.doc, pos));
        var top = pos.bottom, left = pos.left;
        node.style.position = "absolute";
        node.setAttribute("cm-ignore-events", "true");
        this.display.input.setUneditable(node);
        display.sizer.appendChild(node);
        if (vert == "over") {
          top = pos.top;
        } else if (vert == "above" || vert == "near") {
          var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
          hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
          // Default to positioning above (if specified and possible); otherwise default to positioning below
          if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight)
            { top = pos.top - node.offsetHeight; }
          else if (pos.bottom + node.offsetHeight <= vspace)
            { top = pos.bottom; }
          if (left + node.offsetWidth > hspace)
            { left = hspace - node.offsetWidth; }
        }
        node.style.top = top + "px";
        node.style.left = node.style.right = "";
        if (horiz == "right") {
          left = display.sizer.clientWidth - node.offsetWidth;
          node.style.right = "0px";
        } else {
          if (horiz == "left") { left = 0; }
          else if (horiz == "middle") { left = (display.sizer.clientWidth - node.offsetWidth) / 2; }
          node.style.left = left + "px";
        }
        if (scroll)
          { scrollIntoView(this, {left: left, top: top, right: left + node.offsetWidth, bottom: top + node.offsetHeight}); }
      },

      triggerOnKeyDown: methodOp(onKeyDown),
      triggerOnKeyPress: methodOp(onKeyPress),
      triggerOnKeyUp: onKeyUp,
      triggerOnMouseDown: methodOp(onMouseDown),

      execCommand: function(cmd) {
        if (commands.hasOwnProperty(cmd))
          { return commands[cmd].call(null, this) }
      },

      triggerElectric: methodOp(function(text) { triggerElectric(this, text); }),

      findPosH: function(from, amount, unit, visually) {
        var this$1 = this;

        var dir = 1;
        if (amount < 0) { dir = -1; amount = -amount; }
        var cur = clipPos(this.doc, from);
        for (var i = 0; i < amount; ++i) {
          cur = findPosH(this$1.doc, cur, dir, unit, visually);
          if (cur.hitSide) { break }
        }
        return cur
      },

      moveH: methodOp(function(dir, unit) {
        var this$1 = this;

        this.extendSelectionsBy(function (range$$1) {
          if (this$1.display.shift || this$1.doc.extend || range$$1.empty())
            { return findPosH(this$1.doc, range$$1.head, dir, unit, this$1.options.rtlMoveVisually) }
          else
            { return dir < 0 ? range$$1.from() : range$$1.to() }
        }, sel_move);
      }),

      deleteH: methodOp(function(dir, unit) {
        var sel = this.doc.sel, doc = this.doc;
        if (sel.somethingSelected())
          { doc.replaceSelection("", null, "+delete"); }
        else
          { deleteNearSelection(this, function (range$$1) {
            var other = findPosH(doc, range$$1.head, dir, unit, false);
            return dir < 0 ? {from: other, to: range$$1.head} : {from: range$$1.head, to: other}
          }); }
      }),

      findPosV: function(from, amount, unit, goalColumn) {
        var this$1 = this;

        var dir = 1, x = goalColumn;
        if (amount < 0) { dir = -1; amount = -amount; }
        var cur = clipPos(this.doc, from);
        for (var i = 0; i < amount; ++i) {
          var coords = cursorCoords(this$1, cur, "div");
          if (x == null) { x = coords.left; }
          else { coords.left = x; }
          cur = findPosV(this$1, coords, dir, unit);
          if (cur.hitSide) { break }
        }
        return cur
      },

      moveV: methodOp(function(dir, unit) {
        var this$1 = this;

        var doc = this.doc, goals = [];
        var collapse = !this.display.shift && !doc.extend && doc.sel.somethingSelected();
        doc.extendSelectionsBy(function (range$$1) {
          if (collapse)
            { return dir < 0 ? range$$1.from() : range$$1.to() }
          var headPos = cursorCoords(this$1, range$$1.head, "div");
          if (range$$1.goalColumn != null) { headPos.left = range$$1.goalColumn; }
          goals.push(headPos.left);
          var pos = findPosV(this$1, headPos, dir, unit);
          if (unit == "page" && range$$1 == doc.sel.primary())
            { addToScrollTop(this$1, charCoords(this$1, pos, "div").top - headPos.top); }
          return pos
        }, sel_move);
        if (goals.length) { for (var i = 0; i < doc.sel.ranges.length; i++)
          { doc.sel.ranges[i].goalColumn = goals[i]; } }
      }),

      // Find the word at the given position (as returned by coordsChar).
      findWordAt: function(pos) {
        var doc = this.doc, line = getLine(doc, pos.line).text;
        var start = pos.ch, end = pos.ch;
        if (line) {
          var helper = this.getHelper(pos, "wordChars");
          if ((pos.sticky == "before" || end == line.length) && start) { --start; } else { ++end; }
          var startChar = line.charAt(start);
          var check = isWordChar(startChar, helper)
            ? function (ch) { return isWordChar(ch, helper); }
            : /\s/.test(startChar) ? function (ch) { return /\s/.test(ch); }
            : function (ch) { return (!/\s/.test(ch) && !isWordChar(ch)); };
          while (start > 0 && check(line.charAt(start - 1))) { --start; }
          while (end < line.length && check(line.charAt(end))) { ++end; }
        }
        return new Range(Pos(pos.line, start), Pos(pos.line, end))
      },

      toggleOverwrite: function(value) {
        if (value != null && value == this.state.overwrite) { return }
        if (this.state.overwrite = !this.state.overwrite)
          { addClass(this.display.cursorDiv, "CodeMirror-overwrite"); }
        else
          { rmClass(this.display.cursorDiv, "CodeMirror-overwrite"); }

        signal(this, "overwriteToggle", this, this.state.overwrite);
      },
      hasFocus: function() { return this.display.input.getField() == activeElt() },
      isReadOnly: function() { return !!(this.options.readOnly || this.doc.cantEdit) },

      scrollTo: methodOp(function (x, y) { scrollToCoords(this, x, y); }),
      getScrollInfo: function() {
        var scroller = this.display.scroller;
        return {left: scroller.scrollLeft, top: scroller.scrollTop,
                height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
                width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
                clientHeight: displayHeight(this), clientWidth: displayWidth(this)}
      },

      scrollIntoView: methodOp(function(range$$1, margin) {
        if (range$$1 == null) {
          range$$1 = {from: this.doc.sel.primary().head, to: null};
          if (margin == null) { margin = this.options.cursorScrollMargin; }
        } else if (typeof range$$1 == "number") {
          range$$1 = {from: Pos(range$$1, 0), to: null};
        } else if (range$$1.from == null) {
          range$$1 = {from: range$$1, to: null};
        }
        if (!range$$1.to) { range$$1.to = range$$1.from; }
        range$$1.margin = margin || 0;

        if (range$$1.from.line != null) {
          scrollToRange(this, range$$1);
        } else {
          scrollToCoordsRange(this, range$$1.from, range$$1.to, range$$1.margin);
        }
      }),

      setSize: methodOp(function(width, height) {
        var this$1 = this;

        var interpret = function (val) { return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val; };
        if (width != null) { this.display.wrapper.style.width = interpret(width); }
        if (height != null) { this.display.wrapper.style.height = interpret(height); }
        if (this.options.lineWrapping) { clearLineMeasurementCache(this); }
        var lineNo$$1 = this.display.viewFrom;
        this.doc.iter(lineNo$$1, this.display.viewTo, function (line) {
          if (line.widgets) { for (var i = 0; i < line.widgets.length; i++)
            { if (line.widgets[i].noHScroll) { regLineChange(this$1, lineNo$$1, "widget"); break } } }
          ++lineNo$$1;
        });
        this.curOp.forceUpdate = true;
        signal(this, "refresh", this);
      }),

      operation: function(f){return runInOp(this, f)},
      startOperation: function(){return startOperation(this)},
      endOperation: function(){return endOperation(this)},

      refresh: methodOp(function() {
        var oldHeight = this.display.cachedTextHeight;
        regChange(this);
        this.curOp.forceUpdate = true;
        clearCaches(this);
        scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
        updateGutterSpace(this.display);
        if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5)
          { estimateLineHeights(this); }
        signal(this, "refresh", this);
      }),

      swapDoc: methodOp(function(doc) {
        var old = this.doc;
        old.cm = null;
        // Cancel the current text selection if any (#5821)
        if (this.state.selectingText) { this.state.selectingText(); }
        attachDoc(this, doc);
        clearCaches(this);
        this.display.input.reset();
        scrollToCoords(this, doc.scrollLeft, doc.scrollTop);
        this.curOp.forceScroll = true;
        signalLater(this, "swapDoc", this, old);
        return old
      }),

      phrase: function(phraseText) {
        var phrases = this.options.phrases;
        return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText
      },

      getInputField: function(){return this.display.input.getField()},
      getWrapperElement: function(){return this.display.wrapper},
      getScrollerElement: function(){return this.display.scroller},
      getGutterElement: function(){return this.display.gutters}
    };
    eventMixin(CodeMirror);

    CodeMirror.registerHelper = function(type, name, value) {
      if (!helpers.hasOwnProperty(type)) { helpers[type] = CodeMirror[type] = {_global: []}; }
      helpers[type][name] = value;
    };
    CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
      CodeMirror.registerHelper(type, name, value);
      helpers[type]._global.push({pred: predicate, val: value});
    };
  }

  // Used for horizontal relative motion. Dir is -1 or 1 (left or
  // right), unit can be "char", "column" (like char, but doesn't
  // cross line boundaries), "word" (across next word), or "group" (to
  // the start of next group of word or non-word-non-whitespace
  // chars). The visually param controls whether, in right-to-left
  // text, direction 1 means to move towards the next index in the
  // string, or towards the character to the right of the current
  // position. The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosH(doc, pos, dir, unit, visually) {
    var oldPos = pos;
    var origDir = dir;
    var lineObj = getLine(doc, pos.line);
    var lineDir = visually && doc.direction == "rtl" ? -dir : dir;
    function findNextLine() {
      var l = pos.line + lineDir;
      if (l < doc.first || l >= doc.first + doc.size) { return false }
      pos = new Pos(l, pos.ch, pos.sticky);
      return lineObj = getLine(doc, l)
    }
    function moveOnce(boundToLine) {
      var next;
      if (visually) {
        next = moveVisually(doc.cm, lineObj, pos, dir);
      } else {
        next = moveLogically(lineObj, pos, dir);
      }
      if (next == null) {
        if (!boundToLine && findNextLine())
          { pos = endOfLine(visually, doc.cm, lineObj, pos.line, lineDir); }
        else
          { return false }
      } else {
        pos = next;
      }
      return true
    }

    if (unit == "char") {
      moveOnce();
    } else if (unit == "column") {
      moveOnce(true);
    } else if (unit == "word" || unit == "group") {
      var sawType = null, group = unit == "group";
      var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
      for (var first = true;; first = false) {
        if (dir < 0 && !moveOnce(!first)) { break }
        var cur = lineObj.text.charAt(pos.ch) || "\n";
        var type = isWordChar(cur, helper) ? "w"
          : group && cur == "\n" ? "n"
          : !group || /\s/.test(cur) ? null
          : "p";
        if (group && !first && !type) { type = "s"; }
        if (sawType && sawType != type) {
          if (dir < 0) {dir = 1; moveOnce(); pos.sticky = "after";}
          break
        }

        if (type) { sawType = type; }
        if (dir > 0 && !moveOnce(!first)) { break }
      }
    }
    var result = skipAtomic(doc, pos, oldPos, origDir, true);
    if (equalCursorPos(oldPos, result)) { result.hitSide = true; }
    return result
  }

  // For relative vertical movement. Dir may be -1 or 1. Unit can be
  // "page" or "line". The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosV(cm, pos, dir, unit) {
    var doc = cm.doc, x = pos.left, y;
    if (unit == "page") {
      var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      var moveAmount = Math.max(pageSize - .5 * textHeight(cm.display), 3);
      y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;

    } else if (unit == "line") {
      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
    }
    var target;
    for (;;) {
      target = coordsChar(cm, x, y);
      if (!target.outside) { break }
      if (dir < 0 ? y <= 0 : y >= doc.height) { target.hitSide = true; break }
      y += dir * 5;
    }
    return target
  }

  // CONTENTEDITABLE INPUT STYLE

  var ContentEditableInput = function(cm) {
    this.cm = cm;
    this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
    this.polling = new Delayed();
    this.composing = null;
    this.gracePeriod = false;
    this.readDOMTimeout = null;
  };

  ContentEditableInput.prototype.init = function (display) {
      var this$1 = this;

    var input = this, cm = input.cm;
    var div = input.div = display.lineDiv;
    disableBrowserMagic(div, cm.options.spellcheck, cm.options.autocorrect, cm.options.autocapitalize);

    on(div, "paste", function (e) {
      if (signalDOMEvent(cm, e) || handlePaste(e, cm)) { return }
      // IE doesn't fire input events, so we schedule a read for the pasted content in this way
      if (ie_version <= 11) { setTimeout(operation(cm, function () { return this$1.updateFromDOM(); }), 20); }
    });

    on(div, "compositionstart", function (e) {
      this$1.composing = {data: e.data, done: false};
    });
    on(div, "compositionupdate", function (e) {
      if (!this$1.composing) { this$1.composing = {data: e.data, done: false}; }
    });
    on(div, "compositionend", function (e) {
      if (this$1.composing) {
        if (e.data != this$1.composing.data) { this$1.readFromDOMSoon(); }
        this$1.composing.done = true;
      }
    });

    on(div, "touchstart", function () { return input.forceCompositionEnd(); });

    on(div, "input", function () {
      if (!this$1.composing) { this$1.readFromDOMSoon(); }
    });

    function onCopyCut(e) {
      if (signalDOMEvent(cm, e)) { return }
      if (cm.somethingSelected()) {
        setLastCopied({lineWise: false, text: cm.getSelections()});
        if (e.type == "cut") { cm.replaceSelection("", null, "cut"); }
      } else if (!cm.options.lineWiseCopyCut) {
        return
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({lineWise: true, text: ranges.text});
        if (e.type == "cut") {
          cm.operation(function () {
            cm.setSelections(ranges.ranges, 0, sel_dontScroll);
            cm.replaceSelection("", null, "cut");
          });
        }
      }
      if (e.clipboardData) {
        e.clipboardData.clearData();
        var content = lastCopied.text.join("\n");
        // iOS exposes the clipboard API, but seems to discard content inserted into it
        e.clipboardData.setData("Text", content);
        if (e.clipboardData.getData("Text") == content) {
          e.preventDefault();
          return
        }
      }
      // Old-fashioned briefly-focus-a-textarea hack
      var kludge = hiddenTextarea(), te = kludge.firstChild;
      cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
      te.value = lastCopied.text.join("\n");
      var hadFocus = document.activeElement;
      selectInput(te);
      setTimeout(function () {
        cm.display.lineSpace.removeChild(kludge);
        hadFocus.focus();
        if (hadFocus == div) { input.showPrimarySelection(); }
      }, 50);
    }
    on(div, "copy", onCopyCut);
    on(div, "cut", onCopyCut);
  };

  ContentEditableInput.prototype.prepareSelection = function () {
    var result = prepareSelection(this.cm, false);
    result.focus = this.cm.state.focused;
    return result
  };

  ContentEditableInput.prototype.showSelection = function (info, takeFocus) {
    if (!info || !this.cm.display.view.length) { return }
    if (info.focus || takeFocus) { this.showPrimarySelection(); }
    this.showMultipleSelections(info);
  };

  ContentEditableInput.prototype.getSelection = function () {
    return this.cm.display.wrapper.ownerDocument.getSelection()
  };

  ContentEditableInput.prototype.showPrimarySelection = function () {
    var sel = this.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
    var from = prim.from(), to = prim.to();

    if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
      sel.removeAllRanges();
      return
    }

    var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad &&
        cmp(minPos(curAnchor, curFocus), from) == 0 &&
        cmp(maxPos(curAnchor, curFocus), to) == 0)
      { return }

    var view = cm.display.view;
    var start = (from.line >= cm.display.viewFrom && posToDOM(cm, from)) ||
        {node: view[0].measure.map[2], offset: 0};
    var end = to.line < cm.display.viewTo && posToDOM(cm, to);
    if (!end) {
      var measure = view[view.length - 1].measure;
      var map$$1 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
      end = {node: map$$1[map$$1.length - 1], offset: map$$1[map$$1.length - 2] - map$$1[map$$1.length - 3]};
    }

    if (!start || !end) {
      sel.removeAllRanges();
      return
    }

    var old = sel.rangeCount && sel.getRangeAt(0), rng;
    try { rng = range(start.node, start.offset, end.offset, end.node); }
    catch(e) {} // Our model of the DOM might be outdated, in which case the range we try to set can be impossible
    if (rng) {
      if (!gecko && cm.state.focused) {
        sel.collapse(start.node, start.offset);
        if (!rng.collapsed) {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
      } else {
        sel.removeAllRanges();
        sel.addRange(rng);
      }
      if (old && sel.anchorNode == null) { sel.addRange(old); }
      else if (gecko) { this.startGracePeriod(); }
    }
    this.rememberSelection();
  };

  ContentEditableInput.prototype.startGracePeriod = function () {
      var this$1 = this;

    clearTimeout(this.gracePeriod);
    this.gracePeriod = setTimeout(function () {
      this$1.gracePeriod = false;
      if (this$1.selectionChanged())
        { this$1.cm.operation(function () { return this$1.cm.curOp.selectionChanged = true; }); }
    }, 20);
  };

  ContentEditableInput.prototype.showMultipleSelections = function (info) {
    removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
    removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
  };

  ContentEditableInput.prototype.rememberSelection = function () {
    var sel = this.getSelection();
    this.lastAnchorNode = sel.anchorNode; this.lastAnchorOffset = sel.anchorOffset;
    this.lastFocusNode = sel.focusNode; this.lastFocusOffset = sel.focusOffset;
  };

  ContentEditableInput.prototype.selectionInEditor = function () {
    var sel = this.getSelection();
    if (!sel.rangeCount) { return false }
    var node = sel.getRangeAt(0).commonAncestorContainer;
    return contains(this.div, node)
  };

  ContentEditableInput.prototype.focus = function () {
    if (this.cm.options.readOnly != "nocursor") {
      if (!this.selectionInEditor())
        { this.showSelection(this.prepareSelection(), true); }
      this.div.focus();
    }
  };
  ContentEditableInput.prototype.blur = function () { this.div.blur(); };
  ContentEditableInput.prototype.getField = function () { return this.div };

  ContentEditableInput.prototype.supportsTouch = function () { return true };

  ContentEditableInput.prototype.receivedFocus = function () {
    var input = this;
    if (this.selectionInEditor())
      { this.pollSelection(); }
    else
      { runInOp(this.cm, function () { return input.cm.curOp.selectionChanged = true; }); }

    function poll() {
      if (input.cm.state.focused) {
        input.pollSelection();
        input.polling.set(input.cm.options.pollInterval, poll);
      }
    }
    this.polling.set(this.cm.options.pollInterval, poll);
  };

  ContentEditableInput.prototype.selectionChanged = function () {
    var sel = this.getSelection();
    return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset ||
      sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset
  };

  ContentEditableInput.prototype.pollSelection = function () {
    if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) { return }
    var sel = this.getSelection(), cm = this.cm;
    // On Android Chrome (version 56, at least), backspacing into an
    // uneditable block element will put the cursor in that element,
    // and then, because it's not editable, hide the virtual keyboard.
    // Because Android doesn't allow us to actually detect backspace
    // presses in a sane way, this code checks for when that happens
    // and simulates a backspace press in this case.
    if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
      this.cm.triggerOnKeyDown({type: "keydown", keyCode: 8, preventDefault: Math.abs});
      this.blur();
      this.focus();
      return
    }
    if (this.composing) { return }
    this.rememberSelection();
    var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var head = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (anchor && head) { runInOp(cm, function () {
      setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
      if (anchor.bad || head.bad) { cm.curOp.selectionChanged = true; }
    }); }
  };

  ContentEditableInput.prototype.pollContent = function () {
    if (this.readDOMTimeout != null) {
      clearTimeout(this.readDOMTimeout);
      this.readDOMTimeout = null;
    }

    var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
    var from = sel.from(), to = sel.to();
    if (from.ch == 0 && from.line > cm.firstLine())
      { from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length); }
    if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine())
      { to = Pos(to.line + 1, 0); }
    if (from.line < display.viewFrom || to.line > display.viewTo - 1) { return false }

    var fromIndex, fromLine, fromNode;
    if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
      fromLine = lineNo(display.view[0].line);
      fromNode = display.view[0].node;
    } else {
      fromLine = lineNo(display.view[fromIndex].line);
      fromNode = display.view[fromIndex - 1].node.nextSibling;
    }
    var toIndex = findViewIndex(cm, to.line);
    var toLine, toNode;
    if (toIndex == display.view.length - 1) {
      toLine = display.viewTo - 1;
      toNode = display.lineDiv.lastChild;
    } else {
      toLine = lineNo(display.view[toIndex + 1].line) - 1;
      toNode = display.view[toIndex + 1].node.previousSibling;
    }

    if (!fromNode) { return false }
    var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
    var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
    while (newText.length > 1 && oldText.length > 1) {
      if (lst(newText) == lst(oldText)) { newText.pop(); oldText.pop(); toLine--; }
      else if (newText[0] == oldText[0]) { newText.shift(); oldText.shift(); fromLine++; }
      else { break }
    }

    var cutFront = 0, cutEnd = 0;
    var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
    while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront))
      { ++cutFront; }
    var newBot = lst(newText), oldBot = lst(oldText);
    var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0),
                             oldBot.length - (oldText.length == 1 ? cutFront : 0));
    while (cutEnd < maxCutEnd &&
           newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1))
      { ++cutEnd; }
    // Try to move start of change to start of selection if ambiguous
    if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
      while (cutFront && cutFront > from.ch &&
             newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
        cutFront--;
        cutEnd++;
      }
    }

    newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
    newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");

    var chFrom = Pos(fromLine, cutFront);
    var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
    if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
      replaceRange(cm.doc, newText, chFrom, chTo, "+input");
      return true
    }
  };

  ContentEditableInput.prototype.ensurePolled = function () {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.reset = function () {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.forceCompositionEnd = function () {
    if (!this.composing) { return }
    clearTimeout(this.readDOMTimeout);
    this.composing = null;
    this.updateFromDOM();
    this.div.blur();
    this.div.focus();
  };
  ContentEditableInput.prototype.readFromDOMSoon = function () {
      var this$1 = this;

    if (this.readDOMTimeout != null) { return }
    this.readDOMTimeout = setTimeout(function () {
      this$1.readDOMTimeout = null;
      if (this$1.composing) {
        if (this$1.composing.done) { this$1.composing = null; }
        else { return }
      }
      this$1.updateFromDOM();
    }, 80);
  };

  ContentEditableInput.prototype.updateFromDOM = function () {
      var this$1 = this;

    if (this.cm.isReadOnly() || !this.pollContent())
      { runInOp(this.cm, function () { return regChange(this$1.cm); }); }
  };

  ContentEditableInput.prototype.setUneditable = function (node) {
    node.contentEditable = "false";
  };

  ContentEditableInput.prototype.onKeyPress = function (e) {
    if (e.charCode == 0 || this.composing) { return }
    e.preventDefault();
    if (!this.cm.isReadOnly())
      { operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0); }
  };

  ContentEditableInput.prototype.readOnlyChanged = function (val) {
    this.div.contentEditable = String(val != "nocursor");
  };

  ContentEditableInput.prototype.onContextMenu = function () {};
  ContentEditableInput.prototype.resetPosition = function () {};

  ContentEditableInput.prototype.needsContentAttribute = true;

  function posToDOM(cm, pos) {
    var view = findViewForLine(cm, pos.line);
    if (!view || view.hidden) { return null }
    var line = getLine(cm.doc, pos.line);
    var info = mapFromLineView(view, line, pos.line);

    var order = getOrder(line, cm.doc.direction), side = "left";
    if (order) {
      var partPos = getBidiPartAt(order, pos.ch);
      side = partPos % 2 ? "right" : "left";
    }
    var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
    result.offset = result.collapse == "right" ? result.end : result.start;
    return result
  }

  function isInGutter(node) {
    for (var scan = node; scan; scan = scan.parentNode)
      { if (/CodeMirror-gutter-wrapper/.test(scan.className)) { return true } }
    return false
  }

  function badPos(pos, bad) { if (bad) { pos.bad = true; } return pos }

  function domTextBetween(cm, from, to, fromLine, toLine) {
    var text = "", closing = false, lineSep = cm.doc.lineSeparator(), extraLinebreak = false;
    function recognizeMarker(id) { return function (marker) { return marker.id == id; } }
    function close() {
      if (closing) {
        text += lineSep;
        if (extraLinebreak) { text += lineSep; }
        closing = extraLinebreak = false;
      }
    }
    function addText(str) {
      if (str) {
        close();
        text += str;
      }
    }
    function walk(node) {
      if (node.nodeType == 1) {
        var cmText = node.getAttribute("cm-text");
        if (cmText) {
          addText(cmText);
          return
        }
        var markerID = node.getAttribute("cm-marker"), range$$1;
        if (markerID) {
          var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
          if (found.length && (range$$1 = found[0].find(0)))
            { addText(getBetween(cm.doc, range$$1.from, range$$1.to).join(lineSep)); }
          return
        }
        if (node.getAttribute("contenteditable") == "false") { return }
        var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
        if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) { return }

        if (isBlock) { close(); }
        for (var i = 0; i < node.childNodes.length; i++)
          { walk(node.childNodes[i]); }

        if (/^(pre|p)$/i.test(node.nodeName)) { extraLinebreak = true; }
        if (isBlock) { closing = true; }
      } else if (node.nodeType == 3) {
        addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
      }
    }
    for (;;) {
      walk(from);
      if (from == to) { break }
      from = from.nextSibling;
      extraLinebreak = false;
    }
    return text
  }

  function domToPos(cm, node, offset) {
    var lineNode;
    if (node == cm.display.lineDiv) {
      lineNode = cm.display.lineDiv.childNodes[offset];
      if (!lineNode) { return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true) }
      node = null; offset = 0;
    } else {
      for (lineNode = node;; lineNode = lineNode.parentNode) {
        if (!lineNode || lineNode == cm.display.lineDiv) { return null }
        if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) { break }
      }
    }
    for (var i = 0; i < cm.display.view.length; i++) {
      var lineView = cm.display.view[i];
      if (lineView.node == lineNode)
        { return locateNodeInLineView(lineView, node, offset) }
    }
  }

  function locateNodeInLineView(lineView, node, offset) {
    var wrapper = lineView.text.firstChild, bad = false;
    if (!node || !contains(wrapper, node)) { return badPos(Pos(lineNo(lineView.line), 0), true) }
    if (node == wrapper) {
      bad = true;
      node = wrapper.childNodes[offset];
      offset = 0;
      if (!node) {
        var line = lineView.rest ? lst(lineView.rest) : lineView.line;
        return badPos(Pos(lineNo(line), line.text.length), bad)
      }
    }

    var textNode = node.nodeType == 3 ? node : null, topNode = node;
    if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
      textNode = node.firstChild;
      if (offset) { offset = textNode.nodeValue.length; }
    }
    while (topNode.parentNode != wrapper) { topNode = topNode.parentNode; }
    var measure = lineView.measure, maps = measure.maps;

    function find(textNode, topNode, offset) {
      for (var i = -1; i < (maps ? maps.length : 0); i++) {
        var map$$1 = i < 0 ? measure.map : maps[i];
        for (var j = 0; j < map$$1.length; j += 3) {
          var curNode = map$$1[j + 2];
          if (curNode == textNode || curNode == topNode) {
            var line = lineNo(i < 0 ? lineView.line : lineView.rest[i]);
            var ch = map$$1[j] + offset;
            if (offset < 0 || curNode != textNode) { ch = map$$1[j + (offset ? 1 : 0)]; }
            return Pos(line, ch)
          }
        }
      }
    }
    var found = find(textNode, topNode, offset);
    if (found) { return badPos(found, bad) }

    // FIXME this is all really shaky. might handle the few cases it needs to handle, but likely to cause problems
    for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
      found = find(after, after.firstChild, 0);
      if (found)
        { return badPos(Pos(found.line, found.ch - dist), bad) }
      else
        { dist += after.textContent.length; }
    }
    for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
      found = find(before, before.firstChild, -1);
      if (found)
        { return badPos(Pos(found.line, found.ch + dist$1), bad) }
      else
        { dist$1 += before.textContent.length; }
    }
  }

  // TEXTAREA INPUT STYLE

  var TextareaInput = function(cm) {
    this.cm = cm;
    // See input.poll and input.reset
    this.prevInput = "";

    // Flag that indicates whether we expect input to appear real soon
    // now (after some event like 'keypress' or 'input') and are
    // polling intensively.
    this.pollingFast = false;
    // Self-resetting timeout for the poller
    this.polling = new Delayed();
    // Used to work around IE issue with selection being forgotten when focus moves away from textarea
    this.hasSelection = false;
    this.composing = null;
  };

  TextareaInput.prototype.init = function (display) {
      var this$1 = this;

    var input = this, cm = this.cm;
    this.createField(display);
    var te = this.textarea;

    display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);

    // Needed to hide big blue blinking cursor on Mobile Safari (doesn't seem to work in iOS 8 anymore)
    if (ios) { te.style.width = "0px"; }

    on(te, "input", function () {
      if (ie && ie_version >= 9 && this$1.hasSelection) { this$1.hasSelection = null; }
      input.poll();
    });

    on(te, "paste", function (e) {
      if (signalDOMEvent(cm, e) || handlePaste(e, cm)) { return }

      cm.state.pasteIncoming = +new Date;
      input.fastPoll();
    });

    function prepareCopyCut(e) {
      if (signalDOMEvent(cm, e)) { return }
      if (cm.somethingSelected()) {
        setLastCopied({lineWise: false, text: cm.getSelections()});
      } else if (!cm.options.lineWiseCopyCut) {
        return
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({lineWise: true, text: ranges.text});
        if (e.type == "cut") {
          cm.setSelections(ranges.ranges, null, sel_dontScroll);
        } else {
          input.prevInput = "";
          te.value = ranges.text.join("\n");
          selectInput(te);
        }
      }
      if (e.type == "cut") { cm.state.cutIncoming = +new Date; }
    }
    on(te, "cut", prepareCopyCut);
    on(te, "copy", prepareCopyCut);

    on(display.scroller, "paste", function (e) {
      if (eventInWidget(display, e) || signalDOMEvent(cm, e)) { return }
      if (!te.dispatchEvent) {
        cm.state.pasteIncoming = +new Date;
        input.focus();
        return
      }

      // Pass the `paste` event to the textarea so it's handled by its event listener.
      var event = new Event("paste");
      event.clipboardData = e.clipboardData;
      te.dispatchEvent(event);
    });

    // Prevent normal selection in the editor (we handle our own)
    on(display.lineSpace, "selectstart", function (e) {
      if (!eventInWidget(display, e)) { e_preventDefault(e); }
    });

    on(te, "compositionstart", function () {
      var start = cm.getCursor("from");
      if (input.composing) { input.composing.range.clear(); }
      input.composing = {
        start: start,
        range: cm.markText(start, cm.getCursor("to"), {className: "CodeMirror-composing"})
      };
    });
    on(te, "compositionend", function () {
      if (input.composing) {
        input.poll();
        input.composing.range.clear();
        input.composing = null;
      }
    });
  };

  TextareaInput.prototype.createField = function (_display) {
    // Wraps and hides input textarea
    this.wrapper = hiddenTextarea();
    // The semihidden textarea that is focused when the editor is
    // focused, and receives input.
    this.textarea = this.wrapper.firstChild;
  };

  TextareaInput.prototype.prepareSelection = function () {
    // Redraw the selection and/or cursor
    var cm = this.cm, display = cm.display, doc = cm.doc;
    var result = prepareSelection(cm);

    // Move the hidden textarea near the cursor to prevent scrolling artifacts
    if (cm.options.moveInputWithCursor) {
      var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
      var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
      result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10,
                                          headPos.top + lineOff.top - wrapOff.top));
      result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10,
                                           headPos.left + lineOff.left - wrapOff.left));
    }

    return result
  };

  TextareaInput.prototype.showSelection = function (drawn) {
    var cm = this.cm, display = cm.display;
    removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
    removeChildrenAndAdd(display.selectionDiv, drawn.selection);
    if (drawn.teTop != null) {
      this.wrapper.style.top = drawn.teTop + "px";
      this.wrapper.style.left = drawn.teLeft + "px";
    }
  };

  // Reset the input to correspond to the selection (or to be empty,
  // when not typing and nothing is selected)
  TextareaInput.prototype.reset = function (typing) {
    if (this.contextMenuPending || this.composing) { return }
    var cm = this.cm;
    if (cm.somethingSelected()) {
      this.prevInput = "";
      var content = cm.getSelection();
      this.textarea.value = content;
      if (cm.state.focused) { selectInput(this.textarea); }
      if (ie && ie_version >= 9) { this.hasSelection = content; }
    } else if (!typing) {
      this.prevInput = this.textarea.value = "";
      if (ie && ie_version >= 9) { this.hasSelection = null; }
    }
  };

  TextareaInput.prototype.getField = function () { return this.textarea };

  TextareaInput.prototype.supportsTouch = function () { return false };

  TextareaInput.prototype.focus = function () {
    if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
      try { this.textarea.focus(); }
      catch (e) {} // IE8 will throw if the textarea is display: none or not in DOM
    }
  };

  TextareaInput.prototype.blur = function () { this.textarea.blur(); };

  TextareaInput.prototype.resetPosition = function () {
    this.wrapper.style.top = this.wrapper.style.left = 0;
  };

  TextareaInput.prototype.receivedFocus = function () { this.slowPoll(); };

  // Poll for input changes, using the normal rate of polling. This
  // runs as long as the editor is focused.
  TextareaInput.prototype.slowPoll = function () {
      var this$1 = this;

    if (this.pollingFast) { return }
    this.polling.set(this.cm.options.pollInterval, function () {
      this$1.poll();
      if (this$1.cm.state.focused) { this$1.slowPoll(); }
    });
  };

  // When an event has just come in that is likely to add or change
  // something in the input textarea, we poll faster, to ensure that
  // the change appears on the screen quickly.
  TextareaInput.prototype.fastPoll = function () {
    var missed = false, input = this;
    input.pollingFast = true;
    function p() {
      var changed = input.poll();
      if (!changed && !missed) {missed = true; input.polling.set(60, p);}
      else {input.pollingFast = false; input.slowPoll();}
    }
    input.polling.set(20, p);
  };

  // Read input from the textarea, and update the document to match.
  // When something is selected, it is present in the textarea, and
  // selected (unless it is huge, in which case a placeholder is
  // used). When nothing is selected, the cursor sits after previously
  // seen text (can be empty), which is stored in prevInput (we must
  // not reset the textarea when typing, because that breaks IME).
  TextareaInput.prototype.poll = function () {
      var this$1 = this;

    var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
    // Since this is called a *lot*, try to bail out as cheaply as
    // possible when it is clear that nothing happened. hasSelection
    // will be the case when there is a lot of text in the textarea,
    // in which case reading its value would be expensive.
    if (this.contextMenuPending || !cm.state.focused ||
        (hasSelection(input) && !prevInput && !this.composing) ||
        cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq)
      { return false }

    var text = input.value;
    // If nothing changed, bail.
    if (text == prevInput && !cm.somethingSelected()) { return false }
    // Work around nonsensical selection resetting in IE9/10, and
    // inexplicable appearance of private area unicode characters on
    // some key combos in Mac (#2689).
    if (ie && ie_version >= 9 && this.hasSelection === text ||
        mac && /[\uf700-\uf7ff]/.test(text)) {
      cm.display.input.reset();
      return false
    }

    if (cm.doc.sel == cm.display.selForContextMenu) {
      var first = text.charCodeAt(0);
      if (first == 0x200b && !prevInput) { prevInput = "\u200b"; }
      if (first == 0x21da) { this.reset(); return this.cm.execCommand("undo") }
    }
    // Find the part of the input that is actually new
    var same = 0, l = Math.min(prevInput.length, text.length);
    while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) { ++same; }

    runInOp(cm, function () {
      applyTextInput(cm, text.slice(same), prevInput.length - same,
                     null, this$1.composing ? "*compose" : null);

      // Don't leave long text in the textarea, since it makes further polling slow
      if (text.length > 1000 || text.indexOf("\n") > -1) { input.value = this$1.prevInput = ""; }
      else { this$1.prevInput = text; }

      if (this$1.composing) {
        this$1.composing.range.clear();
        this$1.composing.range = cm.markText(this$1.composing.start, cm.getCursor("to"),
                                           {className: "CodeMirror-composing"});
      }
    });
    return true
  };

  TextareaInput.prototype.ensurePolled = function () {
    if (this.pollingFast && this.poll()) { this.pollingFast = false; }
  };

  TextareaInput.prototype.onKeyPress = function () {
    if (ie && ie_version >= 9) { this.hasSelection = null; }
    this.fastPoll();
  };

  TextareaInput.prototype.onContextMenu = function (e) {
    var input = this, cm = input.cm, display = cm.display, te = input.textarea;
    if (input.contextMenuPending) { input.contextMenuPending(); }
    var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
    if (!pos || presto) { return } // Opera is difficult.

    // Reset the current text selection only if the click is done outside of the selection
    // and 'resetSelectionOnContextMenu' option is true.
    var reset = cm.options.resetSelectionOnContextMenu;
    if (reset && cm.doc.sel.contains(pos) == -1)
      { operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll); }

    var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
    var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
    input.wrapper.style.cssText = "position: static";
    te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
    var oldScrollY;
    if (webkit) { oldScrollY = window.scrollY; } // Work around Chrome issue (#2712)
    display.input.focus();
    if (webkit) { window.scrollTo(null, oldScrollY); }
    display.input.reset();
    // Adds "Select all" to context menu in FF
    if (!cm.somethingSelected()) { te.value = input.prevInput = " "; }
    input.contextMenuPending = rehide;
    display.selForContextMenu = cm.doc.sel;
    clearTimeout(display.detectingSelectAll);

    // Select-all will be greyed out if there's nothing to select, so
    // this adds a zero-width space so that we can later check whether
    // it got selected.
    function prepareSelectAllHack() {
      if (te.selectionStart != null) {
        var selected = cm.somethingSelected();
        var extval = "\u200b" + (selected ? te.value : "");
        te.value = "\u21da"; // Used to catch context-menu undo
        te.value = extval;
        input.prevInput = selected ? "" : "\u200b";
        te.selectionStart = 1; te.selectionEnd = extval.length;
        // Re-set this, in case some other handler touched the
        // selection in the meantime.
        display.selForContextMenu = cm.doc.sel;
      }
    }
    function rehide() {
      if (input.contextMenuPending != rehide) { return }
      input.contextMenuPending = false;
      input.wrapper.style.cssText = oldWrapperCSS;
      te.style.cssText = oldCSS;
      if (ie && ie_version < 9) { display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos); }

      // Try to detect the user choosing select-all
      if (te.selectionStart != null) {
        if (!ie || (ie && ie_version < 9)) { prepareSelectAllHack(); }
        var i = 0, poll = function () {
          if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 &&
              te.selectionEnd > 0 && input.prevInput == "\u200b") {
            operation(cm, selectAll)(cm);
          } else if (i++ < 10) {
            display.detectingSelectAll = setTimeout(poll, 500);
          } else {
            display.selForContextMenu = null;
            display.input.reset();
          }
        };
        display.detectingSelectAll = setTimeout(poll, 200);
      }
    }

    if (ie && ie_version >= 9) { prepareSelectAllHack(); }
    if (captureRightClick) {
      e_stop(e);
      var mouseup = function () {
        off(window, "mouseup", mouseup);
        setTimeout(rehide, 20);
      };
      on(window, "mouseup", mouseup);
    } else {
      setTimeout(rehide, 50);
    }
  };

  TextareaInput.prototype.readOnlyChanged = function (val) {
    if (!val) { this.reset(); }
    this.textarea.disabled = val == "nocursor";
  };

  TextareaInput.prototype.setUneditable = function () {};

  TextareaInput.prototype.needsContentAttribute = false;

  function fromTextArea(textarea, options) {
    options = options ? copyObj(options) : {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabIndex)
      { options.tabindex = textarea.tabIndex; }
    if (!options.placeholder && textarea.placeholder)
      { options.placeholder = textarea.placeholder; }
    // Set autofocus to true if this textarea is focused, or if it has
    // autofocus and no other element is focused.
    if (options.autofocus == null) {
      var hasFocus = activeElt();
      options.autofocus = hasFocus == textarea ||
        textarea.getAttribute("autofocus") != null && hasFocus == document.body;
    }

    function save() {textarea.value = cm.getValue();}

    var realSubmit;
    if (textarea.form) {
      on(textarea.form, "submit", save);
      // Deplorable hack to make the submit method do the right thing.
      if (!options.leaveSubmitMethodAlone) {
        var form = textarea.form;
        realSubmit = form.submit;
        try {
          var wrappedSubmit = form.submit = function () {
            save();
            form.submit = realSubmit;
            form.submit();
            form.submit = wrappedSubmit;
          };
        } catch(e) {}
      }
    }

    options.finishInit = function (cm) {
      cm.save = save;
      cm.getTextArea = function () { return textarea; };
      cm.toTextArea = function () {
        cm.toTextArea = isNaN; // Prevent this from being ran twice
        save();
        textarea.parentNode.removeChild(cm.getWrapperElement());
        textarea.style.display = "";
        if (textarea.form) {
          off(textarea.form, "submit", save);
          if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function")
            { textarea.form.submit = realSubmit; }
        }
      };
    };

    textarea.style.display = "none";
    var cm = CodeMirror(function (node) { return textarea.parentNode.insertBefore(node, textarea.nextSibling); },
      options);
    return cm
  }

  function addLegacyProps(CodeMirror) {
    CodeMirror.off = off;
    CodeMirror.on = on;
    CodeMirror.wheelEventPixels = wheelEventPixels;
    CodeMirror.Doc = Doc;
    CodeMirror.splitLines = splitLinesAuto;
    CodeMirror.countColumn = countColumn;
    CodeMirror.findColumn = findColumn;
    CodeMirror.isWordChar = isWordCharBasic;
    CodeMirror.Pass = Pass;
    CodeMirror.signal = signal;
    CodeMirror.Line = Line;
    CodeMirror.changeEnd = changeEnd;
    CodeMirror.scrollbarModel = scrollbarModel;
    CodeMirror.Pos = Pos;
    CodeMirror.cmpPos = cmp;
    CodeMirror.modes = modes;
    CodeMirror.mimeModes = mimeModes;
    CodeMirror.resolveMode = resolveMode;
    CodeMirror.getMode = getMode;
    CodeMirror.modeExtensions = modeExtensions;
    CodeMirror.extendMode = extendMode;
    CodeMirror.copyState = copyState;
    CodeMirror.startState = startState;
    CodeMirror.innerMode = innerMode;
    CodeMirror.commands = commands;
    CodeMirror.keyMap = keyMap;
    CodeMirror.keyName = keyName;
    CodeMirror.isModifierKey = isModifierKey;
    CodeMirror.lookupKey = lookupKey;
    CodeMirror.normalizeKeyMap = normalizeKeyMap;
    CodeMirror.StringStream = StringStream;
    CodeMirror.SharedTextMarker = SharedTextMarker;
    CodeMirror.TextMarker = TextMarker;
    CodeMirror.LineWidget = LineWidget;
    CodeMirror.e_preventDefault = e_preventDefault;
    CodeMirror.e_stopPropagation = e_stopPropagation;
    CodeMirror.e_stop = e_stop;
    CodeMirror.addClass = addClass;
    CodeMirror.contains = contains;
    CodeMirror.rmClass = rmClass;
    CodeMirror.keyNames = keyNames;
  }

  // EDITOR CONSTRUCTOR

  defineOptions(CodeMirror);

  addEditorMethods(CodeMirror);

  // Set up methods on CodeMirror's prototype to redirect to the editor's document.
  var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
  for (var prop in Doc.prototype) { if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0)
    { CodeMirror.prototype[prop] = (function(method) {
      return function() {return method.apply(this.doc, arguments)}
    })(Doc.prototype[prop]); } }

  eventMixin(Doc);
  CodeMirror.inputStyles = {"textarea": TextareaInput, "contenteditable": ContentEditableInput};

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  CodeMirror.defineMode = function(name/*, mode, …*/) {
    if (!CodeMirror.defaults.mode && name != "null") { CodeMirror.defaults.mode = name; }
    defineMode.apply(this, arguments);
  };

  CodeMirror.defineMIME = defineMIME;

  // Minimal default mode.
  CodeMirror.defineMode("null", function () { return ({token: function (stream) { return stream.skipToEnd(); }}); });
  CodeMirror.defineMIME("text/plain", "null");

  // EXTENSIONS

  CodeMirror.defineExtension = function (name, func) {
    CodeMirror.prototype[name] = func;
  };
  CodeMirror.defineDocExtension = function (name, func) {
    Doc.prototype[name] = func;
  };

  CodeMirror.fromTextArea = fromTextArea;

  addLegacyProps(CodeMirror);

  CodeMirror.version = "5.52.0";

  return CodeMirror;

})));





// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  var ie_lt8 = /MSIE \d/.test(navigator.userAgent) &&
    (document.documentMode == null || document.documentMode < 8);

  var Pos = CodeMirror.Pos;

  var matching = {"(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<", "<": ">>", ">": "<<"};

  function bracketRegex(config) {
    return config && config.bracketRegex || /[(){}[\]]/
  }

  function findMatchingBracket(cm, where, config) {
    var line = cm.getLineHandle(where.line), pos = where.ch - 1;
    var afterCursor = config && config.afterCursor
    if (afterCursor == null)
      afterCursor = /(^| )cm-fat-cursor($| )/.test(cm.getWrapperElement().className)
    var re = bracketRegex(config)

    // A cursor is defined as between two characters, but in in vim command mode
    // (i.e. not insert mode), the cursor is visually represented as a
    // highlighted box on top of the 2nd character. Otherwise, we allow matches
    // from before or after the cursor.
    var match = (!afterCursor && pos >= 0 && re.test(line.text.charAt(pos)) && matching[line.text.charAt(pos)]) ||
        re.test(line.text.charAt(pos + 1)) && matching[line.text.charAt(++pos)];
    if (!match) return null;
    var dir = match.charAt(1) == ">" ? 1 : -1;
    if (config && config.strict && (dir > 0) != (pos == where.ch)) return null;
    var style = cm.getTokenTypeAt(Pos(where.line, pos + 1));

    var found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 : 0)), dir, style || null, config);
    if (found == null) return null;
    return {from: Pos(where.line, pos), to: found && found.pos,
            match: found && found.ch == match.charAt(0), forward: dir > 0};
  }

  // bracketRegex is used to specify which type of bracket to scan
  // should be a regexp, e.g. /[[\]]/
  //
  // Note: If "where" is on an open bracket, then this bracket is ignored.
  //
  // Returns false when no bracket was found, null when it reached
  // maxScanLines and gave up
  function scanForBracket(cm, where, dir, style, config) {
    var maxScanLen = (config && config.maxScanLineLength) || 10000;
    var maxScanLines = (config && config.maxScanLines) || 1000;

    var stack = [];
    var re = bracketRegex(config)
    var lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1)
                          : Math.max(cm.firstLine() - 1, where.line - maxScanLines);
    for (var lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
      var line = cm.getLine(lineNo);
      if (!line) continue;
      var pos = dir > 0 ? 0 : line.length - 1, end = dir > 0 ? line.length : -1;
      if (line.length > maxScanLen) continue;
      if (lineNo == where.line) pos = where.ch - (dir < 0 ? 1 : 0);
      for (; pos != end; pos += dir) {
        var ch = line.charAt(pos);
        if (re.test(ch) && (style === undefined || cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style)) {
          var match = matching[ch];
          if (match && (match.charAt(1) == ">") == (dir > 0)) stack.push(ch);
          else if (!stack.length) return {pos: Pos(lineNo, pos), ch: ch};
          else stack.pop();
        }
      }
    }
    return lineNo - dir == (dir > 0 ? cm.lastLine() : cm.firstLine()) ? false : null;
  }

  function matchBrackets(cm, autoclear, config) {
    // Disable brace matching in long lines, since it'll cause hugely slow updates
    var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1000;
    var marks = [], ranges = cm.listSelections();
    for (var i = 0; i < ranges.length; i++) {
      var match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, config);
      if (match && cm.getLine(match.from.line).length <= maxHighlightLen) {
        var style = match.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
        marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), {className: style}));
        if (match.to && cm.getLine(match.to.line).length <= maxHighlightLen)
          marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), {className: style}));
      }
    }

    if (marks.length) {
      // Kludge to work around the IE bug from issue #1193, where text
      // input stops going to the textare whever this fires.
      if (ie_lt8 && cm.state.focused) cm.focus();

      var clear = function() {
        cm.operation(function() {
          for (var i = 0; i < marks.length; i++) marks[i].clear();
        });
      };
      if (autoclear) setTimeout(clear, 800);
      else return clear;
    }
  }

  function doMatchBrackets(cm) {
    cm.operation(function() {
      if (cm.state.matchBrackets.currentlyHighlighted) {
        cm.state.matchBrackets.currentlyHighlighted();
        cm.state.matchBrackets.currentlyHighlighted = null;
      }
      cm.state.matchBrackets.currentlyHighlighted = matchBrackets(cm, false, cm.state.matchBrackets);
    });
  }

  CodeMirror.defineOption("matchBrackets", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.off("cursorActivity", doMatchBrackets);
      if (cm.state.matchBrackets && cm.state.matchBrackets.currentlyHighlighted) {
        cm.state.matchBrackets.currentlyHighlighted();
        cm.state.matchBrackets.currentlyHighlighted = null;
      }
    }
    if (val) {
      cm.state.matchBrackets = typeof val == "object" ? val : {};
      cm.on("cursorActivity", doMatchBrackets);
    }
  });

  CodeMirror.defineExtension("matchBrackets", function() {matchBrackets(this, true);});
  CodeMirror.defineExtension("findMatchingBracket", function(pos, config, oldConfig){
    // Backwards-compatibility kludge
    if (oldConfig || typeof config == "boolean") {
      if (!oldConfig) {
        config = config ? {strict: true} : null
      } else {
        oldConfig.strict = config
        config = oldConfig
      }
    }
    return findMatchingBracket(this, pos, config)
  });
  CodeMirror.defineExtension("scanForBracket", function(pos, dir, style, config){
    return scanForBracket(this, pos, dir, style, config);
  });
});





// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var defaultTags = {
    script: [
      ["lang", /(javascript|babel)/i, "javascript"],
      ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
      ["type", /./, "text/plain"],
      [null, null, "javascript"]
    ],
    style:  [
      ["lang", /^css$/i, "css"],
      ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
      ["type", /./, "text/plain"],
      [null, null, "css"]
    ]
  };

  function maybeBackup(stream, pat, style) {
    var cur = stream.current(), close = cur.search(pat);
    if (close > -1) {
      stream.backUp(cur.length - close);
    } else if (cur.match(/<\/?$/)) {
      stream.backUp(cur.length);
      if (!stream.match(pat, false)) stream.match(cur);
    }
    return style;
  }

  var attrRegexpCache = {};
  function getAttrRegexp(attr) {
    var regexp = attrRegexpCache[attr];
    if (regexp) return regexp;
    return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
  }

  function getAttrValue(text, attr) {
    var match = text.match(getAttrRegexp(attr))
    return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : ""
  }

  function getTagRegexp(tagName, anchored) {
    return new RegExp((anchored ? "^" : "") + "<\/\s*" + tagName + "\s*>", "i");
  }

  function addTags(from, to) {
    for (var tag in from) {
      var dest = to[tag] || (to[tag] = []);
      var source = from[tag];
      for (var i = source.length - 1; i >= 0; i--)
        dest.unshift(source[i])
    }
  }

  function findMatchingMode(tagInfo, tagText) {
    for (var i = 0; i < tagInfo.length; i++) {
      var spec = tagInfo[i];
      if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0]))) return spec[2];
    }
  }

  CodeMirror.defineMode("htmlmixed", function (config, parserConfig) {
    var htmlMode = CodeMirror.getMode(config, {
      name: "xml",
      htmlMode: true,
      multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
      multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag
    });

    var tags = {};
    var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
    addTags(defaultTags, tags);
    if (configTags) addTags(configTags, tags);
    if (configScript) for (var i = configScript.length - 1; i >= 0; i--)
      tags.script.unshift(["type", configScript[i].matches, configScript[i].mode])

    function html(stream, state) {
      var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName
      if (tag && !/[<>\s\/]/.test(stream.current()) &&
          (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) &&
          tags.hasOwnProperty(tagName)) {
        state.inTag = tagName + " "
      } else if (state.inTag && tag && />$/.test(stream.current())) {
        var inTag = /^([\S]+) (.*)/.exec(state.inTag)
        state.inTag = null
        var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2])
        var mode = CodeMirror.getMode(config, modeSpec)
        var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
        state.token = function (stream, state) {
          if (stream.match(endTagA, false)) {
            state.token = html;
            state.localState = state.localMode = null;
            return null;
          }
          return maybeBackup(stream, endTag, state.localMode.token(stream, state.localState));
        };
        state.localMode = mode;
        state.localState = CodeMirror.startState(mode, htmlMode.indent(state.htmlState, "", ""));
      } else if (state.inTag) {
        state.inTag += stream.current()
        if (stream.eol()) state.inTag += " "
      }
      return style;
    };

    return {
      startState: function () {
        var state = CodeMirror.startState(htmlMode);
        return {token: html, inTag: null, localMode: null, localState: null, htmlState: state};
      },

      copyState: function (state) {
        var local;
        if (state.localState) {
          local = CodeMirror.copyState(state.localMode, state.localState);
        }
        return {token: state.token, inTag: state.inTag,
                localMode: state.localMode, localState: local,
                htmlState: CodeMirror.copyState(htmlMode, state.htmlState)};
      },

      token: function (stream, state) {
        return state.token(stream, state);
      },

      indent: function (state, textAfter, line) {
        if (!state.localMode || /^\s*<\//.test(textAfter))
          return htmlMode.indent(state.htmlState, textAfter, line);
        else if (state.localMode.indent)
          return state.localMode.indent(state.localState, textAfter, line);
        else
          return CodeMirror.Pass;
      },

      innerMode: function (state) {
        return {state: state.localState || state.htmlState, mode: state.localMode || htmlMode};
      }
    };
  }, "xml", "javascript", "css");

  CodeMirror.defineMIME("text/html", "htmlmixed");
});





// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

var htmlConfig = {
  autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                    'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                    'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                    'track': true, 'wbr': true, 'menuitem': true},
  implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                     'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                     'th': true, 'tr': true},
  contextGrabbers: {
    'dd': {'dd': true, 'dt': true},
    'dt': {'dd': true, 'dt': true},
    'li': {'li': true},
    'option': {'option': true, 'optgroup': true},
    'optgroup': {'optgroup': true},
    'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
          'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
          'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
          'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
          'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
    'rp': {'rp': true, 'rt': true},
    'rt': {'rp': true, 'rt': true},
    'tbody': {'tbody': true, 'tfoot': true},
    'td': {'td': true, 'th': true},
    'tfoot': {'tbody': true},
    'th': {'td': true, 'th': true},
    'thead': {'tbody': true, 'tfoot': true},
    'tr': {'tr': true}
  },
  doNotIndent: {"pre": true},
  allowUnquoted: true,
  allowMissing: true,
  caseFold: true
}

var xmlConfig = {
  autoSelfClosers: {},
  implicitlyClosed: {},
  contextGrabbers: {},
  doNotIndent: {},
  allowUnquoted: false,
  allowMissing: false,
  allowMissingTagName: false,
  caseFold: false
}

CodeMirror.defineMode("xml", function(editorConf, config_) {
  var indentUnit = editorConf.indentUnit
  var config = {}
  var defaults = config_.htmlMode ? htmlConfig : xmlConfig
  for (var prop in defaults) config[prop] = defaults[prop]
  for (var prop in config_) config[prop] = config_[prop]

  // Return variables for tokenizers
  var type, setStyle;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        } else if (stream.match("--")) {
          return chain(inBlock("comment", "-->"));
        } else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        } else {
          return null;
        }
      } else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      } else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        state.tokenize = inTag;
        return "tag bracket";
      }
    } else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    } else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }
  inText.isInText = true;

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag bracket";
    } else if (ch == "=") {
      type = "equals";
      return null;
    } else if (ch == "<") {
      state.tokenize = inText;
      state.state = baseState;
      state.tagName = state.tagStart = null;
      var next = state.tokenize(stream, state);
      return next ? next + " tag error" : "tag error";
    } else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      state.stringStartCol = stream.column();
      return state.tokenize(stream, state);
    } else {
      stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    var closure = function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
    closure.isInAttribute = true;
    return closure;
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    }
  }

  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  function Context(state, tagName, startOfLine) {
    this.prev = state.context;
    this.tagName = tagName;
    this.indent = state.indented;
    this.startOfLine = startOfLine;
    if (config.doNotIndent.hasOwnProperty(tagName) || (state.context && state.context.noIndent))
      this.noIndent = true;
  }
  function popContext(state) {
    if (state.context) state.context = state.context.prev;
  }
  function maybePopContext(state, nextTagName) {
    var parentTagName;
    while (true) {
      if (!state.context) {
        return;
      }
      parentTagName = state.context.tagName;
      if (!config.contextGrabbers.hasOwnProperty(parentTagName) ||
          !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext(state);
    }
  }

  function baseState(type, stream, state) {
    if (type == "openTag") {
      state.tagStart = stream.column();
      return tagNameState;
    } else if (type == "closeTag") {
      return closeTagNameState;
    } else {
      return baseState;
    }
  }
  function tagNameState(type, stream, state) {
    if (type == "word") {
      state.tagName = stream.current();
      setStyle = "tag";
      return attrState;
    } else if (config.allowMissingTagName && type == "endTag") {
      setStyle = "tag bracket";
      return attrState(type, stream, state);
    } else {
      setStyle = "error";
      return tagNameState;
    }
  }
  function closeTagNameState(type, stream, state) {
    if (type == "word") {
      var tagName = stream.current();
      if (state.context && state.context.tagName != tagName &&
          config.implicitlyClosed.hasOwnProperty(state.context.tagName))
        popContext(state);
      if ((state.context && state.context.tagName == tagName) || config.matchClosing === false) {
        setStyle = "tag";
        return closeState;
      } else {
        setStyle = "tag error";
        return closeStateErr;
      }
    } else if (config.allowMissingTagName && type == "endTag") {
      setStyle = "tag bracket";
      return closeState(type, stream, state);
    } else {
      setStyle = "error";
      return closeStateErr;
    }
  }

  function closeState(type, _stream, state) {
    if (type != "endTag") {
      setStyle = "error";
      return closeState;
    }
    popContext(state);
    return baseState;
  }
  function closeStateErr(type, stream, state) {
    setStyle = "error";
    return closeState(type, stream, state);
  }

  function attrState(type, _stream, state) {
    if (type == "word") {
      setStyle = "attribute";
      return attrEqState;
    } else if (type == "endTag" || type == "selfcloseTag") {
      var tagName = state.tagName, tagStart = state.tagStart;
      state.tagName = state.tagStart = null;
      if (type == "selfcloseTag" ||
          config.autoSelfClosers.hasOwnProperty(tagName)) {
        maybePopContext(state, tagName);
      } else {
        maybePopContext(state, tagName);
        state.context = new Context(state, tagName, tagStart == state.indented);
      }
      return baseState;
    }
    setStyle = "error";
    return attrState;
  }
  function attrEqState(type, stream, state) {
    if (type == "equals") return attrValueState;
    if (!config.allowMissing) setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrValueState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
    setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrContinuedState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    return attrState(type, stream, state);
  }

  return {
    startState: function(baseIndent) {
      var state = {tokenize: inText,
                   state: baseState,
                   indented: baseIndent || 0,
                   tagName: null, tagStart: null,
                   context: null}
      if (baseIndent != null) state.baseIndent = baseIndent
      return state
    },

    token: function(stream, state) {
      if (!state.tagName && stream.sol())
        state.indented = stream.indentation();

      if (stream.eatSpace()) return null;
      type = null;
      var style = state.tokenize(stream, state);
      if ((style || type) && style != "comment") {
        setStyle = null;
        state.state = state.state(type || style, stream, state);
        if (setStyle)
          style = setStyle == "error" ? style + " error" : setStyle;
      }
      return style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      // Indent multi-line strings (e.g. css).
      if (state.tokenize.isInAttribute) {
        if (state.tagStart == state.indented)
          return state.stringStartCol + 1;
        else
          return state.indented + indentUnit;
      }
      if (context && context.noIndent) return CodeMirror.Pass;
      if (state.tokenize != inTag && state.tokenize != inText)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      // Indent the starts of attribute names.
      if (state.tagName) {
        if (config.multilineTagIndentPastTag !== false)
          return state.tagStart + state.tagName.length + 2;
        else
          return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
      }
      if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
      if (tagAfter && tagAfter[1]) { // Closing tag spotted
        while (context) {
          if (context.tagName == tagAfter[2]) {
            context = context.prev;
            break;
          } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
            context = context.prev;
          } else {
            break;
          }
        }
      } else if (tagAfter) { // Opening tag spotted
        while (context) {
          var grabbers = config.contextGrabbers[context.tagName];
          if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
            context = context.prev;
          else
            break;
        }
      }
      while (context && context.prev && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return state.baseIndent || 0;
    },

    electricInput: /<\/[\s\w:]+>$/,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",

    configuration: config.htmlMode ? "html" : "xml",
    helperType: config.htmlMode ? "html" : "xml",

    skipAttribute: function(state) {
      if (state.state == attrValueState)
        state.state = attrState
    },

    xmlCurrentTag: function(state) {
      return state.tagName ? {name: state.tagName, close: state.type == "closeTag"} : null
    },

    xmlCurrentContext: function(state) {
      var context = []
      for (var cx = state.context; cx; cx = cx.prev)
        if (cx.tagName) context.push(cx.tagName)
      return context.reverse()
    }
  };
});

CodeMirror.defineMIME("text/xml", "xml");
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});

});





// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var statementIndent = parserConfig.statementIndent;
  var jsonldMode = parserConfig.jsonld;
  var jsonMode = parserConfig.json || jsonldMode;
  var isTS = parserConfig.typescript;
  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

    return {
      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": D, "break": D, "continue": D, "new": kw("new"), "delete": C, "void": C, "throw": C,
      "debugger": kw("debugger"), "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
      "await": C
    };
  }();

  var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

  function readRegexp(stream) {
    var escaped = false, next, inSet = false;
    while ((next = stream.next()) != null) {
      if (!escaped) {
        if (next == "/" && !inSet) return;
        if (next == "[") inSet = true;
        else if (inSet && next == "]") inSet = false;
      }
      escaped = !escaped && next == "\\";
    }
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }
  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
      return ret("number", "number");
    } else if (ch == "." && stream.match("..")) {
      return ret("spread", "meta");
    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      return ret(ch);
    } else if (ch == "=" && stream.eat(">")) {
      return ret("=>", "operator");
    } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
      return ret("number", "number");
    } else if (/\d/.test(ch)) {
      stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
      return ret("number", "number");
    } else if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      } else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (expressionAllowed(stream, state, 1)) {
        readRegexp(stream);
        stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
        return ret("regexp", "string-2");
      } else {
        stream.eat("=");
        return ret("operator", "operator", stream.current());
      }
    } else if (ch == "`") {
      state.tokenize = tokenQuasi;
      return tokenQuasi(stream, state);
    } else if (ch == "#") {
      stream.skipToEnd();
      return ret("error", "error");
    } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->")) {
      stream.skipToEnd()
      return ret("comment", "comment")
    } else if (isOperatorChar.test(ch)) {
      if (ch != ">" || !state.lexical || state.lexical.type != ">") {
        if (stream.eat("=")) {
          if (ch == "!" || ch == "=") stream.eat("=")
        } else if (/[<>*+\-]/.test(ch)) {
          stream.eat(ch)
          if (ch == ">") stream.eat(ch)
        }
      }
      return ret("operator", "operator", stream.current());
    } else if (wordRE.test(ch)) {
      stream.eatWhile(wordRE);
      var word = stream.current()
      if (state.lastType != ".") {
        if (keywords.propertyIsEnumerable(word)) {
          var kw = keywords[word]
          return ret(kw.type, kw.style, word)
        }
        if (word == "async" && stream.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/, false))
          return ret("async", "keyword", word)
      }
      return ret("variable", "variable", word)
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next;
      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
        state.tokenize = tokenBase;
        return ret("jsonld-keyword", "meta");
      }
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) break;
        escaped = !escaped && next == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenQuasi(stream, state) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
        state.tokenize = tokenBase;
        break;
      }
      escaped = !escaped && next == "\\";
    }
    return ret("quasi", "string-2", stream.current());
  }

  var brackets = "([{}])";
  // This is a crude lookahead trick to try and notice that we're
  // parsing the argument patterns for a fat-arrow function before we
  // actually hit the arrow token. It only works if the arrow is on
  // the same line as the arguments and there's no strange noise
  // (comments) in between. Fallback is to only notice when we hit the
  // arrow, and not declare the arguments as locals for the arrow
  // body.
  function findFatArrow(stream, state) {
    if (state.fatArrowAt) state.fatArrowAt = null;
    var arrow = stream.string.indexOf("=>", stream.start);
    if (arrow < 0) return;

    if (isTS) { // Try to skip TypeScript return type declarations after the arguments
      var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow))
      if (m) arrow = m.index
    }

    var depth = 0, sawSomething = false;
    for (var pos = arrow - 1; pos >= 0; --pos) {
      var ch = stream.string.charAt(pos);
      var bracket = brackets.indexOf(ch);
      if (bracket >= 0 && bracket < 3) {
        if (!depth) { ++pos; break; }
        if (--depth == 0) { if (ch == "(") sawSomething = true; break; }
      } else if (bracket >= 3 && bracket < 6) {
        ++depth;
      } else if (wordRE.test(ch)) {
        sawSomething = true;
      } else if (/["'\/`]/.test(ch)) {
        for (;; --pos) {
          if (pos == 0) return
          var next = stream.string.charAt(pos - 1)
          if (next == ch && stream.string.charAt(pos - 2) != "\\") { pos--; break }
        }
      } else if (sawSomething && !depth) {
        ++pos;
        break;
      }
    }
    if (sawSomething && !depth) state.fatArrowAt = pos;
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
    for (var cx = state.context; cx; cx = cx.prev) {
      for (var v = cx.vars; v; v = v.next)
        if (v.name == varname) return true;
    }
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function inList(name, list) {
    for (var v = list; v; v = v.next) if (v.name == name) return true
    return false;
  }
  function register(varname) {
    var state = cx.state;
    cx.marked = "def";
    if (state.context) {
      if (state.lexical.info == "var" && state.context && state.context.block) {
        // FIXME function decls are also not block scoped
        var newContext = registerVarScoped(varname, state.context)
        if (newContext != null) {
          state.context = newContext
          return
        }
      } else if (!inList(varname, state.localVars)) {
        state.localVars = new Var(varname, state.localVars)
        return
      }
    }
    // Fall through means this is global
    if (parserConfig.globalVars && !inList(varname, state.globalVars))
      state.globalVars = new Var(varname, state.globalVars)
  }
  function registerVarScoped(varname, context) {
    if (!context) {
      return null
    } else if (context.block) {
      var inner = registerVarScoped(varname, context.prev)
      if (!inner) return null
      if (inner == context.prev) return context
      return new Context(inner, context.vars, true)
    } else if (inList(varname, context.vars)) {
      return context
    } else {
      return new Context(context.prev, new Var(varname, context.vars), false)
    }
  }

  function isModifier(name) {
    return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly"
  }

  // Combinators

  function Context(prev, vars, block) { this.prev = prev; this.vars = vars; this.block = block }
  function Var(name, next) { this.name = name; this.next = next }

  var defaultVars = new Var("this", new Var("arguments", null))
  function pushcontext() {
    cx.state.context = new Context(cx.state.context, cx.state.localVars, false)
    cx.state.localVars = defaultVars
  }
  function pushblockcontext() {
    cx.state.context = new Context(cx.state.context, cx.state.localVars, true)
    cx.state.localVars = null
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars
    cx.state.context = cx.state.context.prev
  }
  popcontext.lex = true
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state, indent = state.indented;
      if (state.lexical.type == "stat") indent = state.lexical.indented;
      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
        indent = outer.indented;
      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    function exp(type) {
      if (type == wanted) return cont();
      else if (wanted == ";" || type == "}" || type == ")" || type == "]") return pass();
      else return cont(exp);
    };
    return exp;
  }

  function statement(type, value) {
    if (type == "var") return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
    if (type == "debugger") return cont(expect(";"));
    if (type == "{") return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
    if (type == ";") return cont();
    if (type == "if") {
      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
        cx.state.cc.pop()();
      return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
    }
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
    if (type == "class" || (isTS && value == "interface")) {
      cx.marked = "keyword"
      return cont(pushlex("form", type == "class" ? type : value), className, poplex)
    }
    if (type == "variable") {
      if (isTS && value == "declare") {
        cx.marked = "keyword"
        return cont(statement)
      } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
        cx.marked = "keyword"
        if (value == "enum") return cont(enumdef);
        else if (value == "type") return cont(typename, expect("operator"), typeexpr, expect(";"));
        else return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex)
      } else if (isTS && value == "namespace") {
        cx.marked = "keyword"
        return cont(pushlex("form"), expression, statement, poplex)
      } else if (isTS && value == "abstract") {
        cx.marked = "keyword"
        return cont(statement)
      } else {
        return cont(pushlex("stat"), maybelabel);
      }
    }
    if (type == "switch") return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext,
                                      block, poplex, poplex, popcontext);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
    if (type == "async") return cont(statement)
    if (value == "@") return cont(expression, statement)
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function maybeCatchBinding(type) {
    if (type == "(") return cont(funarg, expect(")"))
  }
  function expression(type, value) {
    return expressionInner(type, value, false);
  }
  function expressionNoComma(type, value) {
    return expressionInner(type, value, true);
  }
  function parenExpr(type) {
    if (type != "(") return pass()
    return cont(pushlex(")"), expression, expect(")"), poplex)
  }
  function expressionInner(type, value, noComma) {
    if (cx.state.fatArrowAt == cx.stream.start) {
      var body = noComma ? arrowBodyNoComma : arrowBody;
      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
    }

    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
    if (type == "function") return cont(functiondef, maybeop);
    if (type == "class" || (isTS && value == "interface")) { cx.marked = "keyword"; return cont(pushlex("form"), classExpression, poplex); }
    if (type == "keyword c" || type == "async") return cont(noComma ? expressionNoComma : expression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
    if (type == "quasi") return pass(quasi, maybeop);
    if (type == "new") return cont(maybeTarget(noComma));
    if (type == "import") return cont(expression);
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }

  function maybeoperatorComma(type, value) {
    if (type == ",") return cont(maybeexpression);
    return maybeoperatorNoComma(type, value, false);
  }
  function maybeoperatorNoComma(type, value, noComma) {
    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
    var expr = noComma == false ? expression : expressionNoComma;
    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
    if (type == "operator") {
      if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
      if (isTS && value == "<" && cx.stream.match(/^([^>]|<.*?>)*>\s*\(/, false))
        return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
      if (value == "?") return cont(expression, expect(":"), expr);
      return cont(expr);
    }
    if (type == "quasi") { return pass(quasi, me); }
    if (type == ";") return;
    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
    if (type == ".") return cont(property, me);
    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
    if (isTS && value == "as") { cx.marked = "keyword"; return cont(typeexpr, me) }
    if (type == "regexp") {
      cx.state.lastType = cx.marked = "operator"
      cx.stream.backUp(cx.stream.pos - cx.stream.start - 1)
      return cont(expr)
    }
  }
  function quasi(type, value) {
    if (type != "quasi") return pass();
    if (value.slice(value.length - 2) != "${") return cont(quasi);
    return cont(expression, continueQuasi);
  }
  function continueQuasi(type) {
    if (type == "}") {
      cx.marked = "string-2";
      cx.state.tokenize = tokenQuasi;
      return cont(quasi);
    }
  }
  function arrowBody(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expression);
  }
  function arrowBodyNoComma(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expressionNoComma);
  }
  function maybeTarget(noComma) {
    return function(type) {
      if (type == ".") return cont(noComma ? targetNoComma : target);
      else if (type == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma)
      else return pass(noComma ? expressionNoComma : expression);
    };
  }
  function target(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
  }
  function targetNoComma(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperatorComma, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type, value) {
    if (type == "async") {
      cx.marked = "property";
      return cont(objprop);
    } else if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(getterSetter);
      var m // Work around fat-arrow-detection complication for detecting typescript typed arrow params
      if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
        cx.state.fatArrowAt = cx.stream.pos + m[0].length
      return cont(afterprop);
    } else if (type == "number" || type == "string") {
      cx.marked = jsonldMode ? "property" : (cx.style + " property");
      return cont(afterprop);
    } else if (type == "jsonld-keyword") {
      return cont(afterprop);
    } else if (isTS && isModifier(value)) {
      cx.marked = "keyword"
      return cont(objprop)
    } else if (type == "[") {
      return cont(expression, maybetype, expect("]"), afterprop);
    } else if (type == "spread") {
      return cont(expressionNoComma, afterprop);
    } else if (value == "*") {
      cx.marked = "keyword";
      return cont(objprop);
    } else if (type == ":") {
      return pass(afterprop)
    }
  }
  function getterSetter(type) {
    if (type != "variable") return pass(afterprop);
    cx.marked = "property";
    return cont(functiondef);
  }
  function afterprop(type) {
    if (type == ":") return cont(expressionNoComma);
    if (type == "(") return pass(functiondef);
  }
  function commasep(what, end, sep) {
    function proceed(type, value) {
      if (sep ? sep.indexOf(type) > -1 : type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
        return cont(function(type, value) {
          if (type == end || value == end) return pass()
          return pass(what)
        }, proceed);
      }
      if (type == end || value == end) return cont();
      if (sep && sep.indexOf(";") > -1) return pass(what)
      return cont(expect(end));
    }
    return function(type, value) {
      if (type == end || value == end) return cont();
      return pass(what, proceed);
    };
  }
  function contCommasep(what, end, info) {
    for (var i = 3; i < arguments.length; i++)
      cx.cc.push(arguments[i]);
    return cont(pushlex(end, info), commasep(what, end), poplex);
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function maybetype(type, value) {
    if (isTS) {
      if (type == ":") return cont(typeexpr);
      if (value == "?") return cont(maybetype);
    }
  }
  function maybetypeOrIn(type, value) {
    if (isTS && (type == ":" || value == "in")) return cont(typeexpr)
  }
  function mayberettype(type) {
    if (isTS && type == ":") {
      if (cx.stream.match(/^\s*\w+\s+is\b/, false)) return cont(expression, isKW, typeexpr)
      else return cont(typeexpr)
    }
  }
  function isKW(_, value) {
    if (value == "is") {
      cx.marked = "keyword"
      return cont()
    }
  }
  function typeexpr(type, value) {
    if (value == "keyof" || value == "typeof" || value == "infer") {
      cx.marked = "keyword"
      return cont(value == "typeof" ? expressionNoComma : typeexpr)
    }
    if (type == "variable" || value == "void") {
      cx.marked = "type"
      return cont(afterType)
    }
    if (value == "|" || value == "&") return cont(typeexpr)
    if (type == "string" || type == "number" || type == "atom") return cont(afterType);
    if (type == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType)
    if (type == "{") return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex, afterType)
    if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType, afterType)
    if (type == "<") return cont(commasep(typeexpr, ">"), typeexpr)
  }
  function maybeReturnType(type) {
    if (type == "=>") return cont(typeexpr)
  }
  function typeprop(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property"
      return cont(typeprop)
    } else if (value == "?" || type == "number" || type == "string") {
      return cont(typeprop)
    } else if (type == ":") {
      return cont(typeexpr)
    } else if (type == "[") {
      return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop)
    } else if (type == "(") {
      return pass(functiondecl, typeprop)
    }
  }
  function typearg(type, value) {
    if (type == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?") return cont(typearg)
    if (type == ":") return cont(typeexpr)
    if (type == "spread") return cont(typearg)
    return pass(typeexpr)
  }
  function afterType(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
    if (value == "|" || type == "." || value == "&") return cont(typeexpr)
    if (type == "[") return cont(typeexpr, expect("]"), afterType)
    if (value == "extends" || value == "implements") { cx.marked = "keyword"; return cont(typeexpr) }
    if (value == "?") return cont(typeexpr, expect(":"), typeexpr)
  }
  function maybeTypeArgs(_, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
  }
  function typeparam() {
    return pass(typeexpr, maybeTypeDefault)
  }
  function maybeTypeDefault(_, value) {
    if (value == "=") return cont(typeexpr)
  }
  function vardef(_, value) {
    if (value == "enum") {cx.marked = "keyword"; return cont(enumdef)}
    return pass(pattern, maybetype, maybeAssign, vardefCont);
  }
  function pattern(type, value) {
    if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(pattern) }
    if (type == "variable") { register(value); return cont(); }
    if (type == "spread") return cont(pattern);
    if (type == "[") return contCommasep(eltpattern, "]");
    if (type == "{") return contCommasep(proppattern, "}");
  }
  function proppattern(type, value) {
    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
      register(value);
      return cont(maybeAssign);
    }
    if (type == "variable") cx.marked = "property";
    if (type == "spread") return cont(pattern);
    if (type == "}") return pass();
    if (type == "[") return cont(expression, expect(']'), expect(':'), proppattern);
    return cont(expect(":"), pattern, maybeAssign);
  }
  function eltpattern() {
    return pass(pattern, maybeAssign)
  }
  function maybeAssign(_type, value) {
    if (value == "=") return cont(expressionNoComma);
  }
  function vardefCont(type) {
    if (type == ",") return cont(vardef);
  }
  function maybeelse(type, value) {
    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
  }
  function forspec(type, value) {
    if (value == "await") return cont(forspec);
    if (type == "(") return cont(pushlex(")"), forspec1, poplex);
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef, forspec2);
    if (type == "variable") return cont(forspec2);
    return pass(forspec2)
  }
  function forspec2(type, value) {
    if (type == ")") return cont()
    if (type == ";") return cont(forspec2)
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression, forspec2) }
    return pass(expression, forspec2)
  }
  function functiondef(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef)
  }
  function functiondecl(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondecl);}
    if (type == "variable") {register(value); return cont(functiondecl);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl)
  }
  function typename(type, value) {
    if (type == "keyword" || type == "variable") {
      cx.marked = "type"
      return cont(typename)
    } else if (value == "<") {
      return cont(pushlex(">"), commasep(typeparam, ">"), poplex)
    }
  }
  function funarg(type, value) {
    if (value == "@") cont(expression, funarg)
    if (type == "spread") return cont(funarg);
    if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(funarg); }
    if (isTS && type == "this") return cont(maybetype, maybeAssign)
    return pass(pattern, maybetype, maybeAssign);
  }
  function classExpression(type, value) {
    // Class expressions may have an optional name.
    if (type == "variable") return className(type, value);
    return classNameAfter(type, value);
  }
  function className(type, value) {
    if (type == "variable") {register(value); return cont(classNameAfter);}
  }
  function classNameAfter(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter)
    if (value == "extends" || value == "implements" || (isTS && type == ",")) {
      if (value == "implements") cx.marked = "keyword";
      return cont(isTS ? typeexpr : expression, classNameAfter);
    }
    if (type == "{") return cont(pushlex("}"), classBody, poplex);
  }
  function classBody(type, value) {
    if (type == "async" ||
        (type == "variable" &&
         (value == "static" || value == "get" || value == "set" || (isTS && isModifier(value))) &&
         cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false))) {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      return cont(isTS ? classfield : functiondef, classBody);
    }
    if (type == "number" || type == "string") return cont(isTS ? classfield : functiondef, classBody);
    if (type == "[")
      return cont(expression, maybetype, expect("]"), isTS ? classfield : functiondef, classBody)
    if (value == "*") {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (isTS && type == "(") return pass(functiondecl, classBody)
    if (type == ";" || type == ",") return cont(classBody);
    if (type == "}") return cont();
    if (value == "@") return cont(expression, classBody)
  }
  function classfield(type, value) {
    if (value == "?") return cont(classfield)
    if (type == ":") return cont(typeexpr, maybeAssign)
    if (value == "=") return cont(expressionNoComma)
    var context = cx.state.lexical.prev, isInterface = context && context.info == "interface"
    return pass(isInterface ? functiondecl : functiondef)
  }
  function afterExport(type, value) {
    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
    if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
    return pass(statement);
  }
  function exportField(type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(expect("variable")); }
    if (type == "variable") return pass(expressionNoComma, exportField);
  }
  function afterImport(type) {
    if (type == "string") return cont();
    if (type == "(") return pass(expression);
    return pass(importSpec, maybeMoreImports, maybeFrom);
  }
  function importSpec(type, value) {
    if (type == "{") return contCommasep(importSpec, "}");
    if (type == "variable") register(value);
    if (value == "*") cx.marked = "keyword";
    return cont(maybeAs);
  }
  function maybeMoreImports(type) {
    if (type == ",") return cont(importSpec, maybeMoreImports)
  }
  function maybeAs(_type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
  }
  function maybeFrom(_type, value) {
    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
  }
  function arrayLiteral(type) {
    if (type == "]") return cont();
    return pass(commasep(expressionNoComma, "]"));
  }
  function enumdef() {
    return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex)
  }
  function enummember() {
    return pass(pattern, maybeAssign);
  }

  function isContinuedStatement(state, textAfter) {
    return state.lastType == "operator" || state.lastType == "," ||
      isOperatorChar.test(textAfter.charAt(0)) ||
      /[,.]/.test(textAfter.charAt(0));
  }

  function expressionAllowed(stream, state, backUp) {
    return state.tokenize == tokenBase &&
      /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
      (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
  }

  // Interface

  return {
    startState: function(basecolumn) {
      var state = {
        tokenize: tokenBase,
        lastType: "sof",
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        context: parserConfig.localVars && new Context(null, null, false),
        indented: basecolumn || 0
      };
      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
        state.globalVars = parserConfig.globalVars;
      return state;
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
        findFatArrow(stream, state);
      }
      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize == tokenComment) return CodeMirror.Pass;
      if (state.tokenize != tokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top
      // Kludge to prevent 'maybelse' from blocking lexical scope pops
      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
        var c = state.cc[i];
        if (c == poplex) lexical = lexical.prev;
        else if (c != maybeelse) break;
      }
      while ((lexical.type == "stat" || lexical.type == "form") &&
             (firstChar == "}" || ((top = state.cc[state.cc.length - 1]) &&
                                   (top == maybeoperatorComma || top == maybeoperatorNoComma) &&
                                   !/^[,\.=+\-*:?[\(]/.test(textAfter))))
        lexical = lexical.prev;
      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
        lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;

      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "form") return lexical.indented + indentUnit;
      else if (type == "stat")
        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
    blockCommentStart: jsonMode ? null : "/*",
    blockCommentEnd: jsonMode ? null : "*/",
    blockCommentContinue: jsonMode ? null : " * ",
    lineComment: jsonMode ? null : "//",
    fold: "brace",
    closeBrackets: "()[]{}''\"\"``",

    helperType: jsonMode ? "json" : "javascript",
    jsonldMode: jsonldMode,
    jsonMode: jsonMode,

    expressionAllowed: expressionAllowed,

    skipExpression: function(state) {
      var top = state.cc[state.cc.length - 1]
      if (top == expression || top == expressionNoComma) state.cc.pop()
    }
  };
});

CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/x-javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });

});





// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("css", function(config, parserConfig) {
  var inline = parserConfig.inline
  if (!parserConfig.propertyKeywords) parserConfig = CodeMirror.resolveMode("text/css");

  var indentUnit = config.indentUnit,
      tokenHooks = parserConfig.tokenHooks,
      documentTypes = parserConfig.documentTypes || {},
      mediaTypes = parserConfig.mediaTypes || {},
      mediaFeatures = parserConfig.mediaFeatures || {},
      mediaValueKeywords = parserConfig.mediaValueKeywords || {},
      propertyKeywords = parserConfig.propertyKeywords || {},
      nonStandardPropertyKeywords = parserConfig.nonStandardPropertyKeywords || {},
      fontProperties = parserConfig.fontProperties || {},
      counterDescriptors = parserConfig.counterDescriptors || {},
      colorKeywords = parserConfig.colorKeywords || {},
      valueKeywords = parserConfig.valueKeywords || {},
      allowNested = parserConfig.allowNested,
      lineComment = parserConfig.lineComment,
      supportsAtComponent = parserConfig.supportsAtComponent === true;

  var type, override;
  function ret(style, tp) { type = tp; return style; }

  // Tokenizers

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (tokenHooks[ch]) {
      var result = tokenHooks[ch](stream, state);
      if (result !== false) return result;
    }
    if (ch == "@") {
      stream.eatWhile(/[\w\\\-]/);
      return ret("def", stream.current());
    } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
      return ret(null, "compare");
    } else if (ch == "\"" || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "#") {
      stream.eatWhile(/[\w\\\-]/);
      return ret("atom", "hash");
    } else if (ch == "!") {
      stream.match(/^\s*\w*/);
      return ret("keyword", "important");
    } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
      stream.eatWhile(/[\w.%]/);
      return ret("number", "unit");
    } else if (ch === "-") {
      if (/[\d.]/.test(stream.peek())) {
        stream.eatWhile(/[\w.%]/);
        return ret("number", "unit");
      } else if (stream.match(/^-[\w\\\-]*/)) {
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false))
          return ret("variable-2", "variable-definition");
        return ret("variable-2", "variable");
      } else if (stream.match(/^\w+-/)) {
        return ret("meta", "meta");
      }
    } else if (/[,+>*\/]/.test(ch)) {
      return ret(null, "select-op");
    } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
      return ret("qualifier", "qualifier");
    } else if (/[:;{}\[\]\(\)]/.test(ch)) {
      return ret(null, ch);
    } else if (stream.match(/[\w-.]+(?=\()/)) {
      if (/^(url(-prefix)?|domain|regexp)$/.test(stream.current().toLowerCase())) {
        state.tokenize = tokenParenthesized;
      }
      return ret("variable callee", "variable");
    } else if (/[\w\\\-]/.test(ch)) {
      stream.eatWhile(/[\w\\\-]/);
      return ret("property", "word");
    } else {
      return ret(null, null);
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, ch;
      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped) {
          if (quote == ")") stream.backUp(1);
          break;
        }
        escaped = !escaped && ch == "\\";
      }
      if (ch == quote || !escaped && quote != ")") state.tokenize = null;
      return ret("string", "string");
    };
  }

  function tokenParenthesized(stream, state) {
    stream.next(); // Must be '('
    if (!stream.match(/\s*[\"\')]/, false))
      state.tokenize = tokenString(")");
    else
      state.tokenize = null;
    return ret(null, "(");
  }

  // Context management

  function Context(type, indent, prev) {
    this.type = type;
    this.indent = indent;
    this.prev = prev;
  }

  function pushContext(state, stream, type, indent) {
    state.context = new Context(type, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
    return type;
  }

  function popContext(state) {
    if (state.context.prev)
      state.context = state.context.prev;
    return state.context.type;
  }

  function pass(type, stream, state) {
    return states[state.context.type](type, stream, state);
  }
  function popAndPass(type, stream, state, n) {
    for (var i = n || 1; i > 0; i--)
      state.context = state.context.prev;
    return pass(type, stream, state);
  }

  // Parser

  function wordAsValue(stream) {
    var word = stream.current().toLowerCase();
    if (valueKeywords.hasOwnProperty(word))
      override = "atom";
    else if (colorKeywords.hasOwnProperty(word))
      override = "keyword";
    else
      override = "variable";
  }

  var states = {};

  states.top = function(type, stream, state) {
    if (type == "{") {
      return pushContext(state, stream, "block");
    } else if (type == "}" && state.context.prev) {
      return popContext(state);
    } else if (supportsAtComponent && /@component/i.test(type)) {
      return pushContext(state, stream, "atComponentBlock");
    } else if (/^@(-moz-)?document$/i.test(type)) {
      return pushContext(state, stream, "documentTypes");
    } else if (/^@(media|supports|(-moz-)?document|import)$/i.test(type)) {
      return pushContext(state, stream, "atBlock");
    } else if (/^@(font-face|counter-style)/i.test(type)) {
      state.stateArg = type;
      return "restricted_atBlock_before";
    } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(type)) {
      return "keyframes";
    } else if (type && type.charAt(0) == "@") {
      return pushContext(state, stream, "at");
    } else if (type == "hash") {
      override = "builtin";
    } else if (type == "word") {
      override = "tag";
    } else if (type == "variable-definition") {
      return "maybeprop";
    } else if (type == "interpolation") {
      return pushContext(state, stream, "interpolation");
    } else if (type == ":") {
      return "pseudo";
    } else if (allowNested && type == "(") {
      return pushContext(state, stream, "parens");
    }
    return state.context.type;
  };

  states.block = function(type, stream, state) {
    if (type == "word") {
      var word = stream.current().toLowerCase();
      if (propertyKeywords.hasOwnProperty(word)) {
        override = "property";
        return "maybeprop";
      } else if (nonStandardPropertyKeywords.hasOwnProperty(word)) {
        override = "string-2";
        return "maybeprop";
      } else if (allowNested) {
        override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
        return "block";
      } else {
        override += " error";
        return "maybeprop";
      }
    } else if (type == "meta") {
      return "block";
    } else if (!allowNested && (type == "hash" || type == "qualifier")) {
      override = "error";
      return "block";
    } else {
      return states.top(type, stream, state);
    }
  };

  states.maybeprop = function(type, stream, state) {
    if (type == ":") return pushContext(state, stream, "prop");
    return pass(type, stream, state);
  };

  states.prop = function(type, stream, state) {
    if (type == ";") return popContext(state);
    if (type == "{" && allowNested) return pushContext(state, stream, "propBlock");
    if (type == "}" || type == "{") return popAndPass(type, stream, state);
    if (type == "(") return pushContext(state, stream, "parens");

    if (type == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
      override += " error";
    } else if (type == "word") {
      wordAsValue(stream);
    } else if (type == "interpolation") {
      return pushContext(state, stream, "interpolation");
    }
    return "prop";
  };

  states.propBlock = function(type, _stream, state) {
    if (type == "}") return popContext(state);
    if (type == "word") { override = "property"; return "maybeprop"; }
    return state.context.type;
  };

  states.parens = function(type, stream, state) {
    if (type == "{" || type == "}") return popAndPass(type, stream, state);
    if (type == ")") return popContext(state);
    if (type == "(") return pushContext(state, stream, "parens");
    if (type == "interpolation") return pushContext(state, stream, "interpolation");
    if (type == "word") wordAsValue(stream);
    return "parens";
  };

  states.pseudo = function(type, stream, state) {
    if (type == "meta") return "pseudo";

    if (type == "word") {
      override = "variable-3";
      return state.context.type;
    }
    return pass(type, stream, state);
  };

  states.documentTypes = function(type, stream, state) {
    if (type == "word" && documentTypes.hasOwnProperty(stream.current())) {
      override = "tag";
      return state.context.type;
    } else {
      return states.atBlock(type, stream, state);
    }
  };

  states.atBlock = function(type, stream, state) {
    if (type == "(") return pushContext(state, stream, "atBlock_parens");
    if (type == "}" || type == ";") return popAndPass(type, stream, state);
    if (type == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");

    if (type == "interpolation") return pushContext(state, stream, "interpolation");

    if (type == "word") {
      var word = stream.current().toLowerCase();
      if (word == "only" || word == "not" || word == "and" || word == "or")
        override = "keyword";
      else if (mediaTypes.hasOwnProperty(word))
        override = "attribute";
      else if (mediaFeatures.hasOwnProperty(word))
        override = "property";
      else if (mediaValueKeywords.hasOwnProperty(word))
        override = "keyword";
      else if (propertyKeywords.hasOwnProperty(word))
        override = "property";
      else if (nonStandardPropertyKeywords.hasOwnProperty(word))
        override = "string-2";
      else if (valueKeywords.hasOwnProperty(word))
        override = "atom";
      else if (colorKeywords.hasOwnProperty(word))
        override = "keyword";
      else
        override = "error";
    }
    return state.context.type;
  };

  states.atComponentBlock = function(type, stream, state) {
    if (type == "}")
      return popAndPass(type, stream, state);
    if (type == "{")
      return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
    if (type == "word")
      override = "error";
    return state.context.type;
  };

  states.atBlock_parens = function(type, stream, state) {
    if (type == ")") return popContext(state);
    if (type == "{" || type == "}") return popAndPass(type, stream, state, 2);
    return states.atBlock(type, stream, state);
  };

  states.restricted_atBlock_before = function(type, stream, state) {
    if (type == "{")
      return pushContext(state, stream, "restricted_atBlock");
    if (type == "word" && state.stateArg == "@counter-style") {
      override = "variable";
      return "restricted_atBlock_before";
    }
    return pass(type, stream, state);
  };

  states.restricted_atBlock = function(type, stream, state) {
    if (type == "}") {
      state.stateArg = null;
      return popContext(state);
    }
    if (type == "word") {
      if ((state.stateArg == "@font-face" && !fontProperties.hasOwnProperty(stream.current().toLowerCase())) ||
          (state.stateArg == "@counter-style" && !counterDescriptors.hasOwnProperty(stream.current().toLowerCase())))
        override = "error";
      else
        override = "property";
      return "maybeprop";
    }
    return "restricted_atBlock";
  };

  states.keyframes = function(type, stream, state) {
    if (type == "word") { override = "variable"; return "keyframes"; }
    if (type == "{") return pushContext(state, stream, "top");
    return pass(type, stream, state);
  };

  states.at = function(type, stream, state) {
    if (type == ";") return popContext(state);
    if (type == "{" || type == "}") return popAndPass(type, stream, state);
    if (type == "word") override = "tag";
    else if (type == "hash") override = "builtin";
    return "at";
  };

  states.interpolation = function(type, stream, state) {
    if (type == "}") return popContext(state);
    if (type == "{" || type == ";") return popAndPass(type, stream, state);
    if (type == "word") override = "variable";
    else if (type != "variable" && type != "(" && type != ")") override = "error";
    return "interpolation";
  };

  return {
    startState: function(base) {
      return {tokenize: null,
              state: inline ? "block" : "top",
              stateArg: null,
              context: new Context(inline ? "block" : "top", base || 0, null)};
    },

    token: function(stream, state) {
      if (!state.tokenize && stream.eatSpace()) return null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style && typeof style == "object") {
        type = style[1];
        style = style[0];
      }
      override = style;
      if (type != "comment")
        state.state = states[state.state](type, stream, state);
      return override;
    },

    indent: function(state, textAfter) {
      var cx = state.context, ch = textAfter && textAfter.charAt(0);
      var indent = cx.indent;
      if (cx.type == "prop" && (ch == "}" || ch == ")")) cx = cx.prev;
      if (cx.prev) {
        if (ch == "}" && (cx.type == "block" || cx.type == "top" ||
                          cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
          // Resume indentation from parent context.
          cx = cx.prev;
          indent = cx.indent;
        } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") ||
            ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
          // Dedent relative to current context.
          indent = Math.max(0, cx.indent - indentUnit);
        }
      }
      return indent;
    },

    electricChars: "}",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    blockCommentContinue: " * ",
    lineComment: lineComment,
    fold: "brace"
  };
});

  function keySet(array) {
    var keys = {};
    for (var i = 0; i < array.length; ++i) {
      keys[array[i].toLowerCase()] = true;
    }
    return keys;
  }

  var documentTypes_ = [
    "domain", "regexp", "url", "url-prefix"
  ], documentTypes = keySet(documentTypes_);

  var mediaTypes_ = [
    "all", "aural", "braille", "handheld", "print", "projection", "screen",
    "tty", "tv", "embossed"
  ], mediaTypes = keySet(mediaTypes_);

  var mediaFeatures_ = [
    "width", "min-width", "max-width", "height", "min-height", "max-height",
    "device-width", "min-device-width", "max-device-width", "device-height",
    "min-device-height", "max-device-height", "aspect-ratio",
    "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio",
    "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color",
    "max-color", "color-index", "min-color-index", "max-color-index",
    "monochrome", "min-monochrome", "max-monochrome", "resolution",
    "min-resolution", "max-resolution", "scan", "grid", "orientation",
    "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio",
    "pointer", "any-pointer", "hover", "any-hover"
  ], mediaFeatures = keySet(mediaFeatures_);

  var mediaValueKeywords_ = [
    "landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover",
    "interlace", "progressive"
  ], mediaValueKeywords = keySet(mediaValueKeywords_);

  var propertyKeywords_ = [
    "align-content", "align-items", "align-self", "alignment-adjust",
    "alignment-baseline", "anchor-point", "animation", "animation-delay",
    "animation-direction", "animation-duration", "animation-fill-mode",
    "animation-iteration-count", "animation-name", "animation-play-state",
    "animation-timing-function", "appearance", "azimuth", "backface-visibility",
    "background", "background-attachment", "background-blend-mode", "background-clip",
    "background-color", "background-image", "background-origin", "background-position",
    "background-repeat", "background-size", "baseline-shift", "binding",
    "bleed", "bookmark-label", "bookmark-level", "bookmark-state",
    "bookmark-target", "border", "border-bottom", "border-bottom-color",
    "border-bottom-left-radius", "border-bottom-right-radius",
    "border-bottom-style", "border-bottom-width", "border-collapse",
    "border-color", "border-image", "border-image-outset",
    "border-image-repeat", "border-image-slice", "border-image-source",
    "border-image-width", "border-left", "border-left-color",
    "border-left-style", "border-left-width", "border-radius", "border-right",
    "border-right-color", "border-right-style", "border-right-width",
    "border-spacing", "border-style", "border-top", "border-top-color",
    "border-top-left-radius", "border-top-right-radius", "border-top-style",
    "border-top-width", "border-width", "bottom", "box-decoration-break",
    "box-shadow", "box-sizing", "break-after", "break-before", "break-inside",
    "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count",
    "column-fill", "column-gap", "column-rule", "column-rule-color",
    "column-rule-style", "column-rule-width", "column-span", "column-width",
    "columns", "content", "counter-increment", "counter-reset", "crop", "cue",
    "cue-after", "cue-before", "cursor", "direction", "display",
    "dominant-baseline", "drop-initial-after-adjust",
    "drop-initial-after-align", "drop-initial-before-adjust",
    "drop-initial-before-align", "drop-initial-size", "drop-initial-value",
    "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis",
    "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap",
    "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings",
    "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust",
    "font-stretch", "font-style", "font-synthesis", "font-variant",
    "font-variant-alternates", "font-variant-caps", "font-variant-east-asian",
    "font-variant-ligatures", "font-variant-numeric", "font-variant-position",
    "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow",
    "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap",
    "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap",
    "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns",
    "grid-template-rows", "hanging-punctuation", "height", "hyphens",
    "icon", "image-orientation", "image-rendering", "image-resolution",
    "inline-box-align", "justify-content", "justify-items", "justify-self", "left", "letter-spacing",
    "line-break", "line-height", "line-stacking", "line-stacking-ruby",
    "line-stacking-shift", "line-stacking-strategy", "list-style",
    "list-style-image", "list-style-position", "list-style-type", "margin",
    "margin-bottom", "margin-left", "margin-right", "margin-top",
    "marks", "marquee-direction", "marquee-loop",
    "marquee-play-count", "marquee-speed", "marquee-style", "max-height",
    "max-width", "min-height", "min-width", "mix-blend-mode", "move-to", "nav-down", "nav-index",
    "nav-left", "nav-right", "nav-up", "object-fit", "object-position",
    "opacity", "order", "orphans", "outline",
    "outline-color", "outline-offset", "outline-style", "outline-width",
    "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y",
    "padding", "padding-bottom", "padding-left", "padding-right", "padding-top",
    "page", "page-break-after", "page-break-before", "page-break-inside",
    "page-policy", "pause", "pause-after", "pause-before", "perspective",
    "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position",
    "presentation-level", "punctuation-trim", "quotes", "region-break-after",
    "region-break-before", "region-break-inside", "region-fragment",
    "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness",
    "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang",
    "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin",
    "shape-outside", "size", "speak", "speak-as", "speak-header",
    "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set",
    "tab-size", "table-layout", "target", "target-name", "target-new",
    "target-position", "text-align", "text-align-last", "text-decoration",
    "text-decoration-color", "text-decoration-line", "text-decoration-skip",
    "text-decoration-style", "text-emphasis", "text-emphasis-color",
    "text-emphasis-position", "text-emphasis-style", "text-height",
    "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow",
    "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position",
    "text-wrap", "top", "transform", "transform-origin", "transform-style",
    "transition", "transition-delay", "transition-duration",
    "transition-property", "transition-timing-function", "unicode-bidi",
    "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration",
    "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress",
    "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break",
    "word-spacing", "word-wrap", "z-index",
    // SVG-specific
    "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color",
    "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events",
    "color-interpolation", "color-interpolation-filters",
    "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering",
    "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke",
    "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin",
    "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering",
    "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal",
    "glyph-orientation-vertical", "text-anchor", "writing-mode"
  ], propertyKeywords = keySet(propertyKeywords_);

  var nonStandardPropertyKeywords_ = [
    "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color",
    "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color",
    "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside",
    "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button",
    "searchfield-results-decoration", "zoom"
  ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);

  var fontProperties_ = [
    "font-family", "src", "unicode-range", "font-variant", "font-feature-settings",
    "font-stretch", "font-weight", "font-style"
  ], fontProperties = keySet(fontProperties_);

  var counterDescriptors_ = [
    "additive-symbols", "fallback", "negative", "pad", "prefix", "range",
    "speak-as", "suffix", "symbols", "system"
  ], counterDescriptors = keySet(counterDescriptors_);

  var colorKeywords_ = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
    "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
    "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod",
    "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
    "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
    "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
    "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
    "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew",
    "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
    "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
    "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown",
    "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
    "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
    "whitesmoke", "yellow", "yellowgreen"
  ], colorKeywords = keySet(colorKeywords_);

  var valueKeywords_ = [
    "above", "absolute", "activeborder", "additive", "activecaption", "afar",
    "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate",
    "always", "amharic", "amharic-abegede", "antialiased", "appworkspace",
    "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page",
    "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary",
    "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box",
    "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel",
    "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian",
    "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret",
    "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch",
    "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote",
    "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse",
    "compact", "condensed", "contain", "content", "contents",
    "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop",
    "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal",
    "decimal-leading-zero", "default", "default-button", "dense", "destination-atop",
    "destination-in", "destination-out", "destination-over", "devanagari", "difference",
    "disc", "discard", "disclosure-closed", "disclosure-open", "document",
    "dot-dash", "dot-dot-dash",
    "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out",
    "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede",
    "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er",
    "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er",
    "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et",
    "ethiopic-halehame-gez", "ethiopic-halehame-om-et",
    "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et",
    "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig",
    "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed",
    "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes",
    "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove",
    "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew",
    "help", "hidden", "hide", "higher", "highlight", "highlighttext",
    "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore",
    "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite",
    "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis",
    "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert",
    "italic", "japanese-formal", "japanese-informal", "justify", "kannada",
    "katakana", "katakana-iroha", "keep-all", "khmer",
    "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal",
    "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten",
    "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem",
    "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian",
    "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian",
    "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d",
    "media-controls-background", "media-current-time-display",
    "media-fullscreen-button", "media-mute-button", "media-play-button",
    "media-return-to-realtime-button", "media-rewind-button",
    "media-seek-back-button", "media-seek-forward-button", "media-slider",
    "media-sliderthumb", "media-time-remaining-display", "media-volume-slider",
    "media-volume-slider-container", "media-volume-sliderthumb", "medium",
    "menu", "menulist", "menulist-button", "menulist-text",
    "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic",
    "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize",
    "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop",
    "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap",
    "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote",
    "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset",
    "outside", "outside-shape", "overlay", "overline", "padding", "padding-box",
    "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter",
    "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d",
    "progress", "push-button", "radial-gradient", "radio", "read-only",
    "read-write", "read-write-plaintext-only", "rectangle", "region",
    "relative", "repeat", "repeating-linear-gradient",
    "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse",
    "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY",
    "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running",
    "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen",
    "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield",
    "searchfield-cancel-button", "searchfield-decoration",
    "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end",
    "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama",
    "simp-chinese-formal", "simp-chinese-informal", "single",
    "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal",
    "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow",
    "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali",
    "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square",
    "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub",
    "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table",
    "table-caption", "table-cell", "table-column", "table-column-group",
    "table-footer-group", "table-header-group", "table-row", "table-row-group",
    "tamil",
    "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai",
    "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight",
    "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er",
    "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top",
    "trad-chinese-formal", "trad-chinese-informal", "transform",
    "translate", "translate3d", "translateX", "translateY", "translateZ",
    "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up",
    "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal",
    "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url",
    "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted",
    "visibleStroke", "visual", "w-resize", "wait", "wave", "wider",
    "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor",
    "xx-large", "xx-small"
  ], valueKeywords = keySet(valueKeywords_);

  var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_)
    .concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_)
    .concat(valueKeywords_);
  CodeMirror.registerHelper("hintWords", "css", allWords);

  function tokenCComment(stream, state) {
    var maybeEnd = false, ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == "/") {
        state.tokenize = null;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ["comment", "comment"];
  }

  CodeMirror.defineMIME("text/css", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css"
  });

  CodeMirror.defineMIME("text/x-scss", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      ":": function(stream) {
        if (stream.match(/\s*\{/, false))
          return [null, null]
        return false;
      },
      "$": function(stream) {
        stream.match(/^[\w-]+/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "#": function(stream) {
        if (!stream.eat("{")) return false;
        return [null, "interpolation"];
      }
    },
    name: "css",
    helperType: "scss"
  });

  CodeMirror.defineMIME("text/x-less", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      "@": function(stream) {
        if (stream.eat("{")) return [null, "interpolation"];
        if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false)) return false;
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "&": function() {
        return ["atom", "atom"];
      }
    },
    name: "css",
    helperType: "less"
  });

  CodeMirror.defineMIME("text/x-gss", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    supportsAtComponent: true,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css",
    helperType: "gss"
  });

});





// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

function Context(indented, column, type, info, align, prev) {
  this.indented = indented;
  this.column = column;
  this.type = type;
  this.info = info;
  this.align = align;
  this.prev = prev;
}
function pushContext(state, col, type, info) {
  var indent = state.indented;
  if (state.context && state.context.type == "statement" && type != "statement")
    indent = state.context.indented;
  return state.context = new Context(indent, col, type, info, null, state.context);
}
function popContext(state) {
  var t = state.context.type;
  if (t == ")" || t == "]" || t == "}")
    state.indented = state.context.indented;
  return state.context = state.context.prev;
}

function typeBefore(stream, state, pos) {
  if (state.prevToken == "variable" || state.prevToken == "type") return true;
  if (/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(stream.string.slice(0, pos))) return true;
  if (state.typeAtEndOfLine && stream.column() == stream.indentation()) return true;
}

function isTopScope(context) {
  for (;;) {
    if (!context || context.type == "top") return true;
    if (context.type == "}" && context.prev.info != "namespace") return false;
    context = context.prev;
  }
}

CodeMirror.defineMode("clike", function(config, parserConfig) {
  var indentUnit = config.indentUnit,
      statementIndentUnit = parserConfig.statementIndentUnit || indentUnit,
      dontAlignCalls = parserConfig.dontAlignCalls,
      keywords = parserConfig.keywords || {},
      types = parserConfig.types || {},
      builtin = parserConfig.builtin || {},
      blockKeywords = parserConfig.blockKeywords || {},
      defKeywords = parserConfig.defKeywords || {},
      atoms = parserConfig.atoms || {},
      hooks = parserConfig.hooks || {},
      multiLineStrings = parserConfig.multiLineStrings,
      indentStatements = parserConfig.indentStatements !== false,
      indentSwitch = parserConfig.indentSwitch !== false,
      namespaceSeparator = parserConfig.namespaceSeparator,
      isPunctuationChar = parserConfig.isPunctuationChar || /[\[\]{}\(\),;\:\.]/,
      numberStart = parserConfig.numberStart || /[\d\.]/,
      number = parserConfig.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
      isOperatorChar = parserConfig.isOperatorChar || /[+\-*&%=<>!?|\/]/,
      isIdentifierChar = parserConfig.isIdentifierChar || /[\w\$_\xa1-\uffff]/,
      // An optional function that takes a {string} token and returns true if it
      // should be treated as a builtin.
      isReservedIdentifier = parserConfig.isReservedIdentifier || false;

  var curPunc, isDefKeyword;

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (hooks[ch]) {
      var result = hooks[ch](stream, state);
      if (result !== false) return result;
    }
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    }
    if (isPunctuationChar.test(ch)) {
      curPunc = ch;
      return null;
    }
    if (numberStart.test(ch)) {
      stream.backUp(1)
      if (stream.match(number)) return "number"
      stream.next()
    }
    if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      }
      if (stream.eat("/")) {
        stream.skipToEnd();
        return "comment";
      }
    }
    if (isOperatorChar.test(ch)) {
      while (!stream.match(/^\/[\/*]/, false) && stream.eat(isOperatorChar)) {}
      return "operator";
    }
    stream.eatWhile(isIdentifierChar);
    if (namespaceSeparator) while (stream.match(namespaceSeparator))
      stream.eatWhile(isIdentifierChar);

    var cur = stream.current();
    if (contains(keywords, cur)) {
      if (contains(blockKeywords, cur)) curPunc = "newstatement";
      if (contains(defKeywords, cur)) isDefKeyword = true;
      return "keyword";
    }
    if (contains(types, cur)) return "type";
    if (contains(builtin, cur)
        || (isReservedIdentifier && isReservedIdentifier(cur))) {
      if (contains(blockKeywords, cur)) curPunc = "newstatement";
      return "builtin";
    }
    if (contains(atoms, cur)) return "atom";
    return "variable";
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next, end = false;
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) {end = true; break;}
        escaped = !escaped && next == "\\";
      }
      if (end || !(escaped || multiLineStrings))
        state.tokenize = null;
      return "string";
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = null;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return "comment";
  }

  function maybeEOL(stream, state) {
    if (parserConfig.typeFirstDefinitions && stream.eol() && isTopScope(state.context))
      state.typeAtEndOfLine = typeBefore(stream, state, stream.pos)
  }

  // Interface

  return {
    startState: function(basecolumn) {
      return {
        tokenize: null,
        context: new Context((basecolumn || 0) - indentUnit, 0, "top", null, false),
        indented: 0,
        startOfLine: true,
        prevToken: null
      };
    },

    token: function(stream, state) {
      var ctx = state.context;
      if (stream.sol()) {
        if (ctx.align == null) ctx.align = false;
        state.indented = stream.indentation();
        state.startOfLine = true;
      }
      if (stream.eatSpace()) { maybeEOL(stream, state); return null; }
      curPunc = isDefKeyword = null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style == "comment" || style == "meta") return style;
      if (ctx.align == null) ctx.align = true;

      if (curPunc == ";" || curPunc == ":" || (curPunc == "," && stream.match(/^\s*(?:\/\/.*)?$/, false)))
        while (state.context.type == "statement") popContext(state);
      else if (curPunc == "{") pushContext(state, stream.column(), "}");
      else if (curPunc == "[") pushContext(state, stream.column(), "]");
      else if (curPunc == "(") pushContext(state, stream.column(), ")");
      else if (curPunc == "}") {
        while (ctx.type == "statement") ctx = popContext(state);
        if (ctx.type == "}") ctx = popContext(state);
        while (ctx.type == "statement") ctx = popContext(state);
      }
      else if (curPunc == ctx.type) popContext(state);
      else if (indentStatements &&
               (((ctx.type == "}" || ctx.type == "top") && curPunc != ";") ||
                (ctx.type == "statement" && curPunc == "newstatement"))) {
        pushContext(state, stream.column(), "statement", stream.current());
      }

      if (style == "variable" &&
          ((state.prevToken == "def" ||
            (parserConfig.typeFirstDefinitions && typeBefore(stream, state, stream.start) &&
             isTopScope(state.context) && stream.match(/^\s*\(/, false)))))
        style = "def";

      if (hooks.token) {
        var result = hooks.token(stream, state, style);
        if (result !== undefined) style = result;
      }

      if (style == "def" && parserConfig.styleDefs === false) style = "variable";

      state.startOfLine = false;
      state.prevToken = isDefKeyword ? "def" : style || curPunc;
      maybeEOL(stream, state);
      return style;
    },

    indent: function(state, textAfter) {
      if (state.tokenize != tokenBase && state.tokenize != null || state.typeAtEndOfLine) return CodeMirror.Pass;
      var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
      var closing = firstChar == ctx.type;
      if (ctx.type == "statement" && firstChar == "}") ctx = ctx.prev;
      if (parserConfig.dontIndentStatements)
        while (ctx.type == "statement" && parserConfig.dontIndentStatements.test(ctx.info))
          ctx = ctx.prev
      if (hooks.indent) {
        var hook = hooks.indent(state, ctx, textAfter, indentUnit);
        if (typeof hook == "number") return hook
      }
      var switchBlock = ctx.prev && ctx.prev.info == "switch";
      if (parserConfig.allmanIndentation && /[{(]/.test(firstChar)) {
        while (ctx.type != "top" && ctx.type != "}") ctx = ctx.prev
        return ctx.indented
      }
      if (ctx.type == "statement")
        return ctx.indented + (firstChar == "{" ? 0 : statementIndentUnit);
      if (ctx.align && (!dontAlignCalls || ctx.type != ")"))
        return ctx.column + (closing ? 0 : 1);
      if (ctx.type == ")" && !closing)
        return ctx.indented + statementIndentUnit;

      return ctx.indented + (closing ? 0 : indentUnit) +
        (!closing && switchBlock && !/^(?:case|default)\b/.test(textAfter) ? indentUnit : 0);
    },

    electricInput: indentSwitch ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    blockCommentContinue: " * ",
    lineComment: "//",
    fold: "brace"
  };
});

  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }
  function contains(words, word) {
    if (typeof words === "function") {
      return words(word);
    } else {
      return words.propertyIsEnumerable(word);
    }
  }
  var cKeywords = "auto if break case register continue return default do sizeof " +
    "static else struct switch extern typedef union for goto while enum const " +
    "volatile inline restrict asm fortran";

  // Keywords from https://en.cppreference.com/w/cpp/keyword includes C++20.
  var cppKeywords = "alignas alignof and and_eq audit axiom bitand bitor catch " +
  "class compl concept constexpr const_cast decltype delete dynamic_cast " +
  "explicit export final friend import module mutable namespace new noexcept " +
  "not not_eq operator or or_eq override private protected public " +
  "reinterpret_cast requires static_assert static_cast template this " +
  "thread_local throw try typeid typename using virtual xor xor_eq";

  var objCKeywords = "bycopy byref in inout oneway out self super atomic nonatomic retain copy " +
  "readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd " +
  "@interface @implementation @end @protocol @encode @property @synthesize @dynamic @class " +
  "@public @package @private @protected @required @optional @try @catch @finally @import " +
  "@selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available";

  var objCBuiltins = "FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION " +
  " NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER " +
  "NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION " +
  "NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT"

  // Do not use this. Use the cTypes function below. This is global just to avoid
  // excessive calls when cTypes is being called multiple times during a parse.
  var basicCTypes = words("int long char short double float unsigned signed " +
    "void bool");

  // Do not use this. Use the objCTypes function below. This is global just to avoid
  // excessive calls when objCTypes is being called multiple times during a parse.
  var basicObjCTypes = words("SEL instancetype id Class Protocol BOOL");

  // Returns true if identifier is a "C" type.
  // C type is defined as those that are reserved by the compiler (basicTypes),
  // and those that end in _t (Reserved by POSIX for types)
  // http://www.gnu.org/software/libc/manual/html_node/Reserved-Names.html
  function cTypes(identifier) {
    return contains(basicCTypes, identifier) || /.+_t$/.test(identifier);
  }

  // Returns true if identifier is a "Objective C" type.
  function objCTypes(identifier) {
    return cTypes(identifier) || contains(basicObjCTypes, identifier);
  }

  var cBlockKeywords = "case do else for if switch while struct enum union";
  var cDefKeywords = "struct enum union";

  function cppHook(stream, state) {
    if (!state.startOfLine) return false
    for (var ch, next = null; ch = stream.peek();) {
      if (ch == "\\" && stream.match(/^.$/)) {
        next = cppHook
        break
      } else if (ch == "/" && stream.match(/^\/[\/\*]/, false)) {
        break
      }
      stream.next()
    }
    state.tokenize = next
    return "meta"
  }

  function pointerHook(_stream, state) {
    if (state.prevToken == "type") return "type";
    return false;
  }

  // For C and C++ (and ObjC): identifiers starting with __
  // or _ followed by a capital letter are reserved for the compiler.
  function cIsReservedIdentifier(token) {
    if (!token || token.length < 2) return false;
    if (token[0] != '_') return false;
    return (token[1] == '_') || (token[1] !== token[1].toLowerCase());
  }

  function cpp14Literal(stream) {
    stream.eatWhile(/[\w\.']/);
    return "number";
  }

  function cpp11StringHook(stream, state) {
    stream.backUp(1);
    // Raw strings.
    if (stream.match(/(R|u8R|uR|UR|LR)/)) {
      var match = stream.match(/"([^\s\\()]{0,16})\(/);
      if (!match) {
        return false;
      }
      state.cpp11RawStringDelim = match[1];
      state.tokenize = tokenRawString;
      return tokenRawString(stream, state);
    }
    // Unicode strings/chars.
    if (stream.match(/(u8|u|U|L)/)) {
      if (stream.match(/["']/, /* eat */ false)) {
        return "string";
      }
      return false;
    }
    // Ignore this hook.
    stream.next();
    return false;
  }

  function cppLooksLikeConstructor(word) {
    var lastTwo = /(\w+)::~?(\w+)$/.exec(word);
    return lastTwo && lastTwo[1] == lastTwo[2];
  }

  // C#-style strings where "" escapes a quote.
  function tokenAtString(stream, state) {
    var next;
    while ((next = stream.next()) != null) {
      if (next == '"' && !stream.eat('"')) {
        state.tokenize = null;
        break;
      }
    }
    return "string";
  }

  // C++11 raw string literal is <prefix>"<delim>( anything )<delim>", where
  // <delim> can be a string up to 16 characters long.
  function tokenRawString(stream, state) {
    // Escape characters that have special regex meanings.
    var delim = state.cpp11RawStringDelim.replace(/[^\w\s]/g, '\\$&');
    var match = stream.match(new RegExp(".*?\\)" + delim + '"'));
    if (match)
      state.tokenize = null;
    else
      stream.skipToEnd();
    return "string";
  }

  function def(mimes, mode) {
    if (typeof mimes == "string") mimes = [mimes];
    var words = [];
    function add(obj) {
      if (obj) for (var prop in obj) if (obj.hasOwnProperty(prop))
        words.push(prop);
    }
    add(mode.keywords);
    add(mode.types);
    add(mode.builtin);
    add(mode.atoms);
    if (words.length) {
      mode.helperType = mimes[0];
      CodeMirror.registerHelper("hintWords", mimes[0], words);
    }

    for (var i = 0; i < mimes.length; ++i)
      CodeMirror.defineMIME(mimes[i], mode);
  }

  def(["text/x-csrc", "text/x-c", "text/x-chdr"], {
    name: "clike",
    keywords: words(cKeywords),
    types: cTypes,
    blockKeywords: words(cBlockKeywords),
    defKeywords: words(cDefKeywords),
    typeFirstDefinitions: true,
    atoms: words("NULL true false"),
    isReservedIdentifier: cIsReservedIdentifier,
    hooks: {
      "#": cppHook,
      "*": pointerHook,
    },
    modeProps: {fold: ["brace", "include"]}
  });

  def(["text/x-c++src", "text/x-c++hdr"], {
    name: "clike",
    keywords: words(cKeywords + " " + cppKeywords),
    types: cTypes,
    blockKeywords: words(cBlockKeywords + " class try catch"),
    defKeywords: words(cDefKeywords + " class namespace"),
    typeFirstDefinitions: true,
    atoms: words("true false NULL nullptr"),
    dontIndentStatements: /^template$/,
    isIdentifierChar: /[\w\$_~\xa1-\uffff]/,
    isReservedIdentifier: cIsReservedIdentifier,
    hooks: {
      "#": cppHook,
      "*": pointerHook,
      "u": cpp11StringHook,
      "U": cpp11StringHook,
      "L": cpp11StringHook,
      "R": cpp11StringHook,
      "0": cpp14Literal,
      "1": cpp14Literal,
      "2": cpp14Literal,
      "3": cpp14Literal,
      "4": cpp14Literal,
      "5": cpp14Literal,
      "6": cpp14Literal,
      "7": cpp14Literal,
      "8": cpp14Literal,
      "9": cpp14Literal,
      token: function(stream, state, style) {
        if (style == "variable" && stream.peek() == "(" &&
            (state.prevToken == ";" || state.prevToken == null ||
             state.prevToken == "}") &&
            cppLooksLikeConstructor(stream.current()))
          return "def";
      }
    },
    namespaceSeparator: "::",
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-java", {
    name: "clike",
    keywords: words("abstract assert break case catch class const continue default " +
                    "do else enum extends final finally for goto if implements import " +
                    "instanceof interface native new package private protected public " +
                    "return static strictfp super switch synchronized this throw throws transient " +
                    "try volatile while @interface"),
    types: words("byte short int long float double boolean char void Boolean Byte Character Double Float " +
                 "Integer Long Number Object Short String StringBuffer StringBuilder Void"),
    blockKeywords: words("catch class do else finally for if switch try while"),
    defKeywords: words("class interface enum @interface"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
    hooks: {
      "@": function(stream) {
        // Don't match the @interface keyword.
        if (stream.match('interface', false)) return false;

        stream.eatWhile(/[\w\$_]/);
        return "meta";
      }
    },
    modeProps: {fold: ["brace", "import"]}
  });

  def("text/x-csharp", {
    name: "clike",
    keywords: words("abstract as async await base break case catch checked class const continue" +
                    " default delegate do else enum event explicit extern finally fixed for" +
                    " foreach goto if implicit in interface internal is lock namespace new" +
                    " operator out override params private protected public readonly ref return sealed" +
                    " sizeof stackalloc static struct switch this throw try typeof unchecked" +
                    " unsafe using virtual void volatile while add alias ascending descending dynamic from get" +
                    " global group into join let orderby partial remove select set value var yield"),
    types: words("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func" +
                 " Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32" +
                 " UInt64 bool byte char decimal double short int long object"  +
                 " sbyte float string ushort uint ulong"),
    blockKeywords: words("catch class do else finally for foreach if struct switch try while"),
    defKeywords: words("class interface namespace struct var"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    hooks: {
      "@": function(stream, state) {
        if (stream.eat('"')) {
          state.tokenize = tokenAtString;
          return tokenAtString(stream, state);
        }
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      }
    }
  });

  function tokenTripleString(stream, state) {
    var escaped = false;
    while (!stream.eol()) {
      if (!escaped && stream.match('"""')) {
        state.tokenize = null;
        break;
      }
      escaped = stream.next() == "\\" && !escaped;
    }
    return "string";
  }

  function tokenNestedComment(depth) {
    return function (stream, state) {
      var ch
      while (ch = stream.next()) {
        if (ch == "*" && stream.eat("/")) {
          if (depth == 1) {
            state.tokenize = null
            break
          } else {
            state.tokenize = tokenNestedComment(depth - 1)
            return state.tokenize(stream, state)
          }
        } else if (ch == "/" && stream.eat("*")) {
          state.tokenize = tokenNestedComment(depth + 1)
          return state.tokenize(stream, state)
        }
      }
      return "comment"
    }
  }

  def("text/x-scala", {
    name: "clike",
    keywords: words(
      /* scala */
      "abstract case catch class def do else extends final finally for forSome if " +
      "implicit import lazy match new null object override package private protected return " +
      "sealed super this throw trait try type val var while with yield _ " +

      /* package scala */
      "assert assume require print println printf readLine readBoolean readByte readShort " +
      "readChar readInt readLong readFloat readDouble"
    ),
    types: words(
      "AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either " +
      "Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable " +
      "Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering " +
      "Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder " +
      "StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector " +

      /* package java.lang */
      "Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable " +
      "Compiler Double Exception Float Integer Long Math Number Object Package Pair Process " +
      "Runtime Runnable SecurityManager Short StackTraceElement StrictMath String " +
      "StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"
    ),
    multiLineStrings: true,
    blockKeywords: words("catch class enum do else finally for forSome if match switch try while"),
    defKeywords: words("class enum def object package trait type val var"),
    atoms: words("true false null"),
    indentStatements: false,
    indentSwitch: false,
    isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      },
      '"': function(stream, state) {
        if (!stream.match('""')) return false;
        state.tokenize = tokenTripleString;
        return state.tokenize(stream, state);
      },
      "'": function(stream) {
        stream.eatWhile(/[\w\$_\xa1-\uffff]/);
        return "atom";
      },
      "=": function(stream, state) {
        var cx = state.context
        if (cx.type == "}" && cx.align && stream.eat(">")) {
          state.context = new Context(cx.indented, cx.column, cx.type, cx.info, null, cx.prev)
          return "operator"
        } else {
          return false
        }
      },

      "/": function(stream, state) {
        if (!stream.eat("*")) return false
        state.tokenize = tokenNestedComment(1)
        return state.tokenize(stream, state)
      }
    },
    modeProps: {closeBrackets: {pairs: '()[]{}""', triples: '"'}}
  });

  function tokenKotlinString(tripleString){
    return function (stream, state) {
      var escaped = false, next, end = false;
      while (!stream.eol()) {
        if (!tripleString && !escaped && stream.match('"') ) {end = true; break;}
        if (tripleString && stream.match('"""')) {end = true; break;}
        next = stream.next();
        if(!escaped && next == "$" && stream.match('{'))
          stream.skipTo("}");
        escaped = !escaped && next == "\\" && !tripleString;
      }
      if (end || !tripleString)
        state.tokenize = null;
      return "string";
    }
  }

  def("text/x-kotlin", {
    name: "clike",
    keywords: words(
      /*keywords*/
      "package as typealias class interface this super val operator " +
      "var fun for is in This throw return annotation " +
      "break continue object if else while do try when !in !is as? " +

      /*soft keywords*/
      "file import where by get set abstract enum open inner override private public internal " +
      "protected catch finally out final vararg reified dynamic companion constructor init " +
      "sealed field property receiver param sparam lateinit data inline noinline tailrec " +
      "external annotation crossinline const operator infix suspend actual expect setparam"
    ),
    types: words(
      /* package java.lang */
      "Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable " +
      "Compiler Double Exception Float Integer Long Math Number Object Package Pair Process " +
      "Runtime Runnable SecurityManager Short StackTraceElement StrictMath String " +
      "StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray " +
      "ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy " +
      "LazyThreadSafetyMode LongArray Nothing ShortArray Unit"
    ),
    intendSwitch: false,
    indentStatements: false,
    multiLineStrings: true,
    number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
    blockKeywords: words("catch class do else finally for if where try while enum"),
    defKeywords: words("class val var object interface fun"),
    atoms: words("true false null this"),
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      },
      '*': function(_stream, state) {
        return state.prevToken == '.' ? 'variable' : 'operator';
      },
      '"': function(stream, state) {
        state.tokenize = tokenKotlinString(stream.match('""'));
        return state.tokenize(stream, state);
      },
      "/": function(stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenNestedComment(1);
        return state.tokenize(stream, state)
      },
      indent: function(state, ctx, textAfter, indentUnit) {
        var firstChar = textAfter && textAfter.charAt(0);
        if ((state.prevToken == "}" || state.prevToken == ")") && textAfter == "")
          return state.indented;
        if ((state.prevToken == "operator" && textAfter != "}" && state.context.type != "}") ||
          state.prevToken == "variable" && firstChar == "." ||
          (state.prevToken == "}" || state.prevToken == ")") && firstChar == ".")
          return indentUnit * 2 + ctx.indented;
        if (ctx.align && ctx.type == "}")
          return ctx.indented + (state.context.type == (textAfter || "").charAt(0) ? 0 : indentUnit);
      }
    },
    modeProps: {closeBrackets: {triples: '"'}}
  });

  def(["x-shader/x-vertex", "x-shader/x-fragment"], {
    name: "clike",
    keywords: words("sampler1D sampler2D sampler3D samplerCube " +
                    "sampler1DShadow sampler2DShadow " +
                    "const attribute uniform varying " +
                    "break continue discard return " +
                    "for while do if else struct " +
                    "in out inout"),
    types: words("float int bool void " +
                 "vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 " +
                 "mat2 mat3 mat4"),
    blockKeywords: words("for while do if else struct"),
    builtin: words("radians degrees sin cos tan asin acos atan " +
                    "pow exp log exp2 sqrt inversesqrt " +
                    "abs sign floor ceil fract mod min max clamp mix step smoothstep " +
                    "length distance dot cross normalize ftransform faceforward " +
                    "reflect refract matrixCompMult " +
                    "lessThan lessThanEqual greaterThan greaterThanEqual " +
                    "equal notEqual any all not " +
                    "texture1D texture1DProj texture1DLod texture1DProjLod " +
                    "texture2D texture2DProj texture2DLod texture2DProjLod " +
                    "texture3D texture3DProj texture3DLod texture3DProjLod " +
                    "textureCube textureCubeLod " +
                    "shadow1D shadow2D shadow1DProj shadow2DProj " +
                    "shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod " +
                    "dFdx dFdy fwidth " +
                    "noise1 noise2 noise3 noise4"),
    atoms: words("true false " +
                "gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex " +
                "gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 " +
                "gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 " +
                "gl_FogCoord gl_PointCoord " +
                "gl_Position gl_PointSize gl_ClipVertex " +
                "gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor " +
                "gl_TexCoord gl_FogFragCoord " +
                "gl_FragCoord gl_FrontFacing " +
                "gl_FragData gl_FragDepth " +
                "gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix " +
                "gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse " +
                "gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse " +
                "gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose " +
                "gl_ProjectionMatrixInverseTranspose " +
                "gl_ModelViewProjectionMatrixInverseTranspose " +
                "gl_TextureMatrixInverseTranspose " +
                "gl_NormalScale gl_DepthRange gl_ClipPlane " +
                "gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel " +
                "gl_FrontLightModelProduct gl_BackLightModelProduct " +
                "gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ " +
                "gl_FogParameters " +
                "gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords " +
                "gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats " +
                "gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits " +
                "gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits " +
                "gl_MaxDrawBuffers"),
    indentSwitch: false,
    hooks: {"#": cppHook},
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-nesc", {
    name: "clike",
    keywords: words(cKeywords + " as atomic async call command component components configuration event generic " +
                    "implementation includes interface module new norace nx_struct nx_union post provides " +
                    "signal task uses abstract extends"),
    types: cTypes,
    blockKeywords: words(cBlockKeywords),
    atoms: words("null true false"),
    hooks: {"#": cppHook},
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-objectivec", {
    name: "clike",
    keywords: words(cKeywords + " " + objCKeywords),
    types: objCTypes,
    builtin: words(objCBuiltins),
    blockKeywords: words(cBlockKeywords + " @synthesize @try @catch @finally @autoreleasepool @synchronized"),
    defKeywords: words(cDefKeywords + " @interface @implementation @protocol @class"),
    dontIndentStatements: /^@.*$/,
    typeFirstDefinitions: true,
    atoms: words("YES NO NULL Nil nil true false nullptr"),
    isReservedIdentifier: cIsReservedIdentifier,
    hooks: {
      "#": cppHook,
      "*": pointerHook,
    },
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-objectivec++", {
    name: "clike",
    keywords: words(cKeywords + " " + objCKeywords + " " + cppKeywords),
    types: objCTypes,
    builtin: words(objCBuiltins),
    blockKeywords: words(cBlockKeywords + " @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch"),
    defKeywords: words(cDefKeywords + " @interface @implementation @protocol @class class namespace"),
    dontIndentStatements: /^@.*$|^template$/,
    typeFirstDefinitions: true,
    atoms: words("YES NO NULL Nil nil true false nullptr"),
    isReservedIdentifier: cIsReservedIdentifier,
    hooks: {
      "#": cppHook,
      "*": pointerHook,
      "u": cpp11StringHook,
      "U": cpp11StringHook,
      "L": cpp11StringHook,
      "R": cpp11StringHook,
      "0": cpp14Literal,
      "1": cpp14Literal,
      "2": cpp14Literal,
      "3": cpp14Literal,
      "4": cpp14Literal,
      "5": cpp14Literal,
      "6": cpp14Literal,
      "7": cpp14Literal,
      "8": cpp14Literal,
      "9": cpp14Literal,
      token: function(stream, state, style) {
        if (style == "variable" && stream.peek() == "(" &&
            (state.prevToken == ";" || state.prevToken == null ||
             state.prevToken == "}") &&
            cppLooksLikeConstructor(stream.current()))
          return "def";
      }
    },
    namespaceSeparator: "::",
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-squirrel", {
    name: "clike",
    keywords: words("base break clone continue const default delete enum extends function in class" +
                    " foreach local resume return this throw typeof yield constructor instanceof static"),
    types: cTypes,
    blockKeywords: words("case catch class else for foreach if switch try while"),
    defKeywords: words("function local class"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    hooks: {"#": cppHook},
    modeProps: {fold: ["brace", "include"]}
  });

  // Ceylon Strings need to deal with interpolation
  var stringTokenizer = null;
  function tokenCeylonString(type) {
    return function(stream, state) {
      var escaped = false, next, end = false;
      while (!stream.eol()) {
        if (!escaped && stream.match('"') &&
              (type == "single" || stream.match('""'))) {
          end = true;
          break;
        }
        if (!escaped && stream.match('``')) {
          stringTokenizer = tokenCeylonString(type);
          end = true;
          break;
        }
        next = stream.next();
        escaped = type == "single" && !escaped && next == "\\";
      }
      if (end)
          state.tokenize = null;
      return "string";
    }
  }

  def("text/x-ceylon", {
    name: "clike",
    keywords: words("abstracts alias assembly assert assign break case catch class continue dynamic else" +
                    " exists extends finally for function given if import in interface is let module new" +
                    " nonempty object of out outer package return satisfies super switch then this throw" +
                    " try value void while"),
    types: function(word) {
        // In Ceylon all identifiers that start with an uppercase are types
        var first = word.charAt(0);
        return (first === first.toUpperCase() && first !== first.toLowerCase());
    },
    blockKeywords: words("case catch class dynamic else finally for function if interface module new object switch try while"),
    defKeywords: words("class dynamic function interface module object package value"),
    builtin: words("abstract actual aliased annotation by default deprecated doc final formal late license" +
                   " native optional sealed see serializable shared suppressWarnings tagged throws variable"),
    isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
    isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
    numberStart: /[\d#$]/,
    number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
    multiLineStrings: true,
    typeFirstDefinitions: true,
    atoms: words("true false null larger smaller equal empty finished"),
    indentSwitch: false,
    styleDefs: false,
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      },
      '"': function(stream, state) {
          state.tokenize = tokenCeylonString(stream.match('""') ? "triple" : "single");
          return state.tokenize(stream, state);
        },
      '`': function(stream, state) {
          if (!stringTokenizer || !stream.match('`')) return false;
          state.tokenize = stringTokenizer;
          stringTokenizer = null;
          return state.tokenize(stream, state);
        },
      "'": function(stream) {
        stream.eatWhile(/[\w\$_\xa1-\uffff]/);
        return "atom";
      },
      token: function(_stream, state, style) {
          if ((style == "variable" || style == "type") &&
              state.prevToken == ".") {
            return "variable-2";
          }
        }
    },
    modeProps: {
        fold: ["brace", "import"],
        closeBrackets: {triples: '"'}
    }
  });

});





// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../clike/clike"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../clike/clike"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  function keywords(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }

  // Helper for phpString
  function matchSequence(list, end, escapes) {
    if (list.length == 0) return phpString(end);
    return function (stream, state) {
      var patterns = list[0];
      for (var i = 0; i < patterns.length; i++) if (stream.match(patterns[i][0])) {
        state.tokenize = matchSequence(list.slice(1), end);
        return patterns[i][1];
      }
      state.tokenize = phpString(end, escapes);
      return "string";
    };
  }
  function phpString(closing, escapes) {
    return function(stream, state) { return phpString_(stream, state, closing, escapes); };
  }
  function phpString_(stream, state, closing, escapes) {
    // "Complex" syntax
    if (escapes !== false && stream.match("${", false) || stream.match("{$", false)) {
      state.tokenize = null;
      return "string";
    }

    // Simple syntax
    if (escapes !== false && stream.match(/^\$[a-zA-Z_][a-zA-Z0-9_]*/)) {
      // After the variable name there may appear array or object operator.
      if (stream.match("[", false)) {
        // Match array operator
        state.tokenize = matchSequence([
          [["[", null]],
          [[/\d[\w\.]*/, "number"],
           [/\$[a-zA-Z_][a-zA-Z0-9_]*/, "variable-2"],
           [/[\w\$]+/, "variable"]],
          [["]", null]]
        ], closing, escapes);
      }
      if (stream.match(/\-\>\w/, false)) {
        // Match object operator
        state.tokenize = matchSequence([
          [["->", null]],
          [[/[\w]+/, "variable"]]
        ], closing, escapes);
      }
      return "variable-2";
    }

    var escaped = false;
    // Normal string
    while (!stream.eol() &&
           (escaped || escapes === false ||
            (!stream.match("{$", false) &&
             !stream.match(/^(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{)/, false)))) {
      if (!escaped && stream.match(closing)) {
        state.tokenize = null;
        state.tokStack.pop(); state.tokStack.pop();
        break;
      }
      escaped = stream.next() == "\\" && !escaped;
    }
    return "string";
  }

  var phpKeywords = "abstract and array as break case catch class clone const continue declare default " +
    "do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final " +
    "for foreach function global goto if implements interface instanceof namespace " +
    "new or private protected public static switch throw trait try use var while xor " +
    "die echo empty exit eval include include_once isset list require require_once return " +
    "print unset __halt_compiler self static parent yield insteadof finally";
  var phpAtoms = "true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__ __TRAIT__";
  var phpBuiltin = "func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex hex2bin sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents file_put_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists array_intersect_key array_combine array_column pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport http_response_code get_declared_traits getimagesizefromstring socket_import_stream stream_set_chunk_size trait_exists header_register_callback class_uses session_status session_register_shutdown echo print global static exit array empty eval isset unset die include require include_once require_once json_decode json_encode json_last_error json_last_error_msg curl_close curl_copy_handle curl_errno curl_error curl_escape curl_exec curl_file_create curl_getinfo curl_init curl_multi_add_handle curl_multi_close curl_multi_exec curl_multi_getcontent curl_multi_info_read curl_multi_init curl_multi_remove_handle curl_multi_select curl_multi_setopt curl_multi_strerror curl_pause curl_reset curl_setopt_array curl_setopt curl_share_close curl_share_init curl_share_setopt curl_strerror curl_unescape curl_version mysqli_affected_rows mysqli_autocommit mysqli_change_user mysqli_character_set_name mysqli_close mysqli_commit mysqli_connect_errno mysqli_connect_error mysqli_connect mysqli_data_seek mysqli_debug mysqli_dump_debug_info mysqli_errno mysqli_error_list mysqli_error mysqli_fetch_all mysqli_fetch_array mysqli_fetch_assoc mysqli_fetch_field_direct mysqli_fetch_field mysqli_fetch_fields mysqli_fetch_lengths mysqli_fetch_object mysqli_fetch_row mysqli_field_count mysqli_field_seek mysqli_field_tell mysqli_free_result mysqli_get_charset mysqli_get_client_info mysqli_get_client_stats mysqli_get_client_version mysqli_get_connection_stats mysqli_get_host_info mysqli_get_proto_info mysqli_get_server_info mysqli_get_server_version mysqli_info mysqli_init mysqli_insert_id mysqli_kill mysqli_more_results mysqli_multi_query mysqli_next_result mysqli_num_fields mysqli_num_rows mysqli_options mysqli_ping mysqli_prepare mysqli_query mysqli_real_connect mysqli_real_escape_string mysqli_real_query mysqli_reap_async_query mysqli_refresh mysqli_rollback mysqli_select_db mysqli_set_charset mysqli_set_local_infile_default mysqli_set_local_infile_handler mysqli_sqlstate mysqli_ssl_set mysqli_stat mysqli_stmt_init mysqli_store_result mysqli_thread_id mysqli_thread_safe mysqli_use_result mysqli_warning_count";
  CodeMirror.registerHelper("hintWords", "php", [phpKeywords, phpAtoms, phpBuiltin].join(" ").split(" "));
  CodeMirror.registerHelper("wordChars", "php", /[\w$]/);

  var phpConfig = {
    name: "clike",
    helperType: "php",
    keywords: keywords(phpKeywords),
    blockKeywords: keywords("catch do else elseif for foreach if switch try while finally"),
    defKeywords: keywords("class function interface namespace trait"),
    atoms: keywords(phpAtoms),
    builtin: keywords(phpBuiltin),
    multiLineStrings: true,
    hooks: {
      "$": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "variable-2";
      },
      "<": function(stream, state) {
        var before;
        if (before = stream.match(/<<\s*/)) {
          var quoted = stream.eat(/['"]/);
          stream.eatWhile(/[\w\.]/);
          var delim = stream.current().slice(before[0].length + (quoted ? 2 : 1));
          if (quoted) stream.eat(quoted);
          if (delim) {
            (state.tokStack || (state.tokStack = [])).push(delim, 0);
            state.tokenize = phpString(delim, quoted != "'");
            return "string";
          }
        }
        return false;
      },
      "#": function(stream) {
        while (!stream.eol() && !stream.match("?>", false)) stream.next();
        return "comment";
      },
      "/": function(stream) {
        if (stream.eat("/")) {
          while (!stream.eol() && !stream.match("?>", false)) stream.next();
          return "comment";
        }
        return false;
      },
      '"': function(_stream, state) {
        (state.tokStack || (state.tokStack = [])).push('"', 0);
        state.tokenize = phpString('"');
        return "string";
      },
      "{": function(_stream, state) {
        if (state.tokStack && state.tokStack.length)
          state.tokStack[state.tokStack.length - 1]++;
        return false;
      },
      "}": function(_stream, state) {
        if (state.tokStack && state.tokStack.length > 0 &&
            !--state.tokStack[state.tokStack.length - 1]) {
          state.tokenize = phpString(state.tokStack[state.tokStack.length - 2]);
        }
        return false;
      }
    }
  };

  CodeMirror.defineMode("php", function(config, parserConfig) {
    var htmlMode = CodeMirror.getMode(config, (parserConfig && parserConfig.htmlMode) || "text/html");
    var phpMode = CodeMirror.getMode(config, phpConfig);

    function dispatch(stream, state) {
      var isPHP = state.curMode == phpMode;
      if (stream.sol() && state.pending && state.pending != '"' && state.pending != "'") state.pending = null;
      if (!isPHP) {
        if (stream.match(/^<\?\w*/)) {
          state.curMode = phpMode;
          if (!state.php) state.php = CodeMirror.startState(phpMode, htmlMode.indent(state.html, "", ""))
          state.curState = state.php;
          return "meta";
        }
        if (state.pending == '"' || state.pending == "'") {
          while (!stream.eol() && stream.next() != state.pending) {}
          var style = "string";
        } else if (state.pending && stream.pos < state.pending.end) {
          stream.pos = state.pending.end;
          var style = state.pending.style;
        } else {
          var style = htmlMode.token(stream, state.curState);
        }
        if (state.pending) state.pending = null;
        var cur = stream.current(), openPHP = cur.search(/<\?/), m;
        if (openPHP != -1) {
          if (style == "string" && (m = cur.match(/[\'\"]$/)) && !/\?>/.test(cur)) state.pending = m[0];
          else state.pending = {end: stream.pos, style: style};
          stream.backUp(cur.length - openPHP);
        }
        return style;
      } else if (isPHP && state.php.tokenize == null && stream.match("?>")) {
        state.curMode = htmlMode;
        state.curState = state.html;
        if (!state.php.context.prev) state.php = null;
        return "meta";
      } else {
        return phpMode.token(stream, state.curState);
      }
    }

    return {
      startState: function() {
        var html = CodeMirror.startState(htmlMode)
        var php = parserConfig.startOpen ? CodeMirror.startState(phpMode) : null
        return {html: html,
                php: php,
                curMode: parserConfig.startOpen ? phpMode : htmlMode,
                curState: parserConfig.startOpen ? php : html,
                pending: null};
      },

      copyState: function(state) {
        var html = state.html, htmlNew = CodeMirror.copyState(htmlMode, html),
            php = state.php, phpNew = php && CodeMirror.copyState(phpMode, php), cur;
        if (state.curMode == htmlMode) cur = htmlNew;
        else cur = phpNew;
        return {html: htmlNew, php: phpNew, curMode: state.curMode, curState: cur,
                pending: state.pending};
      },

      token: dispatch,

      indent: function(state, textAfter, line) {
        if ((state.curMode != phpMode && /^\s*<\//.test(textAfter)) ||
            (state.curMode == phpMode && /^\?>/.test(textAfter)))
          return htmlMode.indent(state.html, textAfter, line);
        return state.curMode.indent(state.curState, textAfter, line);
      },

      blockCommentStart: "/*",
      blockCommentEnd: "*/",
      lineComment: "//",

      innerMode: function(state) { return {state: state.curState, mode: state.curMode}; }
    };
  }, "htmlmixed", "clike");

  CodeMirror.defineMIME("application/x-httpd-php", "php");
  CodeMirror.defineMIME("application/x-httpd-php-open", {name: "php", startOpen: true});
  CodeMirror.defineMIME("text/x-php", phpConfig);
});





﻿var char_34 = String.fromCharCode(34);			//"
var char_39 = String.fromCharCode(39);			//'
var char_92 = String.fromCharCode(92);			//\
var char_nbsp = "&nbsp;";

var __entityMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': '&quot;', "'": '&#39;', "/": '&#x2F;' }; 
String.prototype.escapeHTML = function() { return String(this).replace(/[&<>"'\/]/g, function (s) { return __entityMap[s]; }); }

// 웹 페이지 내부의 JavaScript (www.speedmis.com/v6)
function onGoogleLoginButtonClicked() {
    // AndroidApp은 위에서 addJavascriptInterface로 정의한 이름입니다.
    if (typeof AndroidApp !== 'undefined' && AndroidApp.startGoogleAuth) {
        AndroidApp.startGoogleAuth();
    } else {
        // 네이티브 앱 환경이 아님 (일반 브라우저 접속)
        console.log("네이티브 로그인 인터페이스를 찾을 수 없습니다.");
        // 웹 기반 OAuth 로그인 로직을 실행하도록 폴백(Fallback) 처리
    }
}

// ⭐️ 안드로이드앱 웹뷰 구글 OAuth 로그인 성공 후 호출될 JS 함수
window.onGoogleAuthSuccess = function(data) {

  console.log('ID Token:', data.idToken);
  console.log('Email:', data.email);
  console.log('Name:', data.displayName);
  const loginData = {
    app_email: data.email,       // 실제 이메일 값으로 대체
    app_displayName: data.displayName       // 실제 표시 이름 값으로 대체
  };

  const targetUrl = '/_mis/google_oauth/callback.php';

  const form = document.createElement('form');
  form.setAttribute('method', 'post'); // POST 방식으로 설정
  form.setAttribute('action', targetUrl);     // 전송할 URL 설정

  // 2. 현재 문서의 body에 폼 추가 (폼이 실제로 보이지는 않음)
  document.body.appendChild(form);
  // 3. 데이터 객체를 반복하며 Hidden Input 요소 생성 및 폼에 추가
  for (const key in loginData) {
      if (loginData.hasOwnProperty(key)) {
          const hiddenField = document.createElement('input');
          hiddenField.setAttribute('type', 'hidden'); // 사용자에게 보이지 않게 숨김
          hiddenField.setAttribute('name', key);      // 'email' 또는 'displayName'
          hiddenField.setAttribute('value', loginData[key]); // 실제 값

          form.appendChild(hiddenField);
      }
  }
  // 4. 폼을 제출(submit)하여 데이터 전송과 동시에 페이지 이동
  form.submit();

};


// ⭐️ AuthActivity에서 최종 성공 후 토큰을 받았을 때 호출될 JS 함수
function handleNativeLoginToken(token) {
    console.log("네이티브로부터 ID 토큰 수신:", token);
    
    // TODO: 이 토큰을 SpeedMIS 서버로 전송하여 최종 로그인 처리 및 세션 설정
    // 예: fetch('/api/verify-token', { method: 'POST', body: token })...
    
    alert("SpeedMIS 로그인 완료!");
}


function autocomplete_dataBound_color(e) {
    
  v = e.sender.value();
  if(v!='') {
      if($('ul.k-list.k-reset > li:contains("'+v+'")').is(":visible")) {
          $('ul.k-list.k-reset > li:contains("'+v+'")').css("background", "blueviolet");
          $('ul.k-list.k-reset > li:contains("'+v+'")').css("color", "white");
      }
  }

}

function install_speedmis_app_load() {
  
  if ('serviceWorker' in navigator && isMainFrame()==true) {
 

    navigator.serviceWorker.register('/_mis/service-worker.js?a=11')
    .then(function(registration) {
      console.log('ServiceWorker 등록 성공:', registration.scope);

      // 등록이 성공하고 나서 구독 시도
      return registration.pushManager.getSubscription().then(async function(subscription) {
        if (subscription) {
          console.log('이미 구독되어 있음:', subscription);
          return subscription;
        }

        const vapidPublicKey = 'BLHNMIlgjlixE-Zqc1YcqLxplAtxJMeilyhrhzXP_aqdMxd93yY7fa_r3aNF6gLqwlk70gntuX3ZWFQMm1D7Ky8';
        const convertedKey = urlBase64ToUint8Array(vapidPublicKey);

        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey
        });
      });
    })
    .then(function(subscription) {
      console.log('✅ 푸시 구독 성공 & endpoint 생성완료');
      document.getElementById('push_endpoint').value = subscription.endpoint;
      document.getElementById('push_p256dh').value = subscription.toJSON().keys.p256dh;
      document.getElementById('push_auth').value = subscription.toJSON().keys.auth;

      //신규endpoint save
      const send_data = {
        endpoint: document.getElementById('push_endpoint').value,
        p256dh: document.getElementById('push_p256dh').value,
        auth: document.getElementById('push_auth').value
      };
    
      fetch('push_info_save.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(send_data)
      })
      .then(response => response.json())  // response.json()을 반환해야 Promise가 제대로 처리됨
      .then(data => {
          console.log('Success:', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
      
      
    })
    .catch(function(error) {
      console.error('❌ 오류:', error);
    });


  }
}
// VAPID 키 변환 함수
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}
//telegram_sendMessage.php 에서 전송되며, 텔레그램 전송우선 && 없으면 이메일 발송.
function push_sendMessage(p_userid, p_title, p_body, p_url) {
  const send_data = {
    userid: p_userid,   // 이미 문자열
    title: p_title,
    body: p_body,
    url: p_url || ''
  };

  fetch('push_sendMessage.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(send_data)
  })
  .then(response => response.json())
  .then(data => {
      console.log('✅ Success:', data);
  })
  .catch(error => {
      console.error('❌ Error:', error);
  });
}


function install_btn_visible() {
  

  window.addEventListener('beforeinstallprompt', (e) => {
      if (isInstallHiddenRecently()) {
          console.log('3일 제한으로 설치 버튼 숨김');
          return;
      }
      e.preventDefault();
      deferredPrompt = e;
      console.log('beforeinstallprompt event fired');
      document.getElementById('installBtn').style.display = 'block';


      // 원하는 위치에서 사용자에게 설치 버튼 제공 가능
      // deferredPrompt.prompt() 로 실행 가능
  });

  document.getElementById('installBtn').addEventListener('click', async () => {
      if (deferredPrompt) {
          deferredPrompt.prompt(); // 설치 창 띄움

          const { outcome } = await deferredPrompt.userChoice;
          console.log(`사용자 선택: ${outcome}`);

          if (outcome === 'dismissed') {
              // 사용자가 거절한 경우: 현재 시간 저장
              localStorage.setItem('installDismissedAt', Date.now().toString());
          }
          // 다시 사용하지 않도록 null 처리
          deferredPrompt = null;

          // 버튼 숨기기
          document.getElementById('installBtn').style.display = 'none';
      }
  });
}

function triggerPWAInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      console.log('설치 결과:', choiceResult.outcome);
      deferredPrompt = null;
    });
  } else {
    alert('https 가 아니거나, 설치 가능한 상태가 아닙니다.');
  }
}


// 날짜 계산 함수
function isInstallHiddenRecently() {
  const lastDismiss = localStorage.getItem('installDismissedAt');
  if (!lastDismiss) return false;

  const threeDays = 30 * 24 * 60 * 60 * 1000; // 30일 in ms
  const now = Date.now();
  return now - parseInt(lastDismiss, 10) < threeDays;
}
function isSystemDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function isValidCarNumber(carNumber) {
  // 정규 표현식으로 차량 번호판 규칙 검사
  const regex = /^(?:\d{3}[가-힣]\d{4}|\d{2}[가-힣]\d{4}|\d{3}[가-힣]\d{3})$/;
  return regex.test(carNumber);
}
function getEvents(element) {
    var elemEvents = $._data(element, "events");
    var allDocEvnts = $._data(document, "events");
    for(var evntType in allDocEvnts) {
        if(allDocEvnts.hasOwnProperty(evntType)) {
            var evts = allDocEvnts[evntType];
            for(var i = 0; i < evts.length; i++) {
                if($(element).is(evts[i].selector)) {
                    if(elemEvents == null) {
                        elemEvents = {};
                    }
                    if(!elemEvents.hasOwnProperty(evntType)) {
                        elemEvents[evntType] = [];
                    }
                    elemEvents[evntType].push(evts[i]);
                }
            }
        }
    }
    return elemEvents;
}
function kendo_format_n(p_number, p_point) {
  if(p_number==undefined) p_number = "";
  p_number = replaceAll(p_number+"",",","");
  if(!isNumeric(p_number)) return "";
  if(p_point==undefined) p_point = "";
  return kendo.toString(p_number*1, "n"+p_point);
}
function kendoDateNumber_into_day10(p_number) {
  if(isNumeric(p_number)) return kendo.toString(new Date(3600*24*1000 * (p_number*1 - 25569)), "yyyy-MM-dd");
  else return p_number;
}
function kendoDateNumber_into_day16(p_number) {
  if(isNumeric(p_number)) return kendo.toString(new Date(3600*24*1000 * (p_number*1 - 25569)), "yyyy-MM-dd HH:mm");
  else return p_number;
}
function kendoDateNumber_into_time5(p_number) {
  if(isNumeric(p_number)) return kendo.toString(new Date(3600*24*1000 * p_number+3600*(new Date().getUTCHours()-new Date().getHours())*1000), "HH:mm");
  else return p_number;
}

function changeText(selector, text) {
	if(selector[0]) {
    if(selector.text()!='') {
      selector[0].title = selector.text();
      selector[0].innerHTML = replaceAll(selector[0].innerHTML.toLowerCase(),selector.text().toLowerCase(),"@^^@");
      selector[0].innerHTML = replaceAll(selector[0].innerHTML,"@^^@",text);
    } else {
      selector[0].title = text;
    }
	}
}

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function javaFuncName(fun) {
  let result = fun;
  result = replaceAll(result, "_change", "Change");
  result = replaceAll(result, "_json", "Json");
  result = replaceAll(result, "_init", "Init");
  result = replaceAll(result, "_load", "Load");
  result = replaceAll(result, "_template", "Template");
  result = replaceAll(result, "_pildok", "Pildoc");
  result = replaceAll(result, "_update", "Update");
  result = replaceAll(result, "_delete", "Delete");
  result = replaceAll(result, "_write", "Write");
  result = replaceAll(result, "_push", "Push");
  result = replaceAll(result, "_sql", "Sql");
  result = replaceAll(result, "_brief", "Brief");
  result = replaceAll(result, "_page", "Page");
  result = replaceAll(result, "_treat", "Treat");
  result = replaceAll(result, "_index", "Index");
  return result;
}


function intoWord() {
  preLoadjscssfile('jQuery-Word-Export/FileSaver.js');
  setTimeout( function() {
      preLoadjscssfile('jQuery-Word-Export/jquery.wordexport.js');
      setTimeout( function() {
          if($('#userDefine_page_print').length==1 && $('.viewPrint').is(':visible')==true) $('.viewPrint').wordExport($('.viewPrintTitle')[0].innerText);
          else if($('.viewPrintDivRound').length==1 && $('.viewPrint').is(':visible')==true) $('.viewPrintDivRound').wordExport($('.viewPrintTitle')[0].innerText);
          else {
            alert('내용의 인쇄폼에서만 워드문서로 저장이 가능합니다.');
          }
      },500);
  },500);
}
function listprint_PDF(selector, fname, paperSize, margin, scale, landscape) {

  gwidth = 0;
  if(opener) {
    p_columns = opener.p_columns;
    for(i=0;i<p_columns.length;i++) {
        if(p_columns[i].field!=undefined && InStr(p_columns[i].field,"(")==0) {
            if(p_columns[i].width) gwidth = gwidth + p_columns[i].width;
        } else if(p_columns[i].title!=undefined && p_columns[i].field==undefined) {
            for(j=0;j<p_columns[i].columns.length;j++) {
                if(p_columns[i].columns[j].width) gwidth = gwidth + p_columns[i].columns[j].width;
            }
        } 
    }
  }
  p_scale = 1;
  p_landscape = false;
  if(gwidth>=1200){
    p_scale = 0.8 * 1200 / gwidth;
    p_landscape = true;
  } else {
    p_scale = 660 / gwidth;
  }
  if(p_scale>0.95) p_scale = 0.95;
  getPDF(selector, fname, 'A4', ['5px', '40px'], p_scale, p_landscape);
}

function getPDF(selector, fname, options_pdf) {
  //paperSize 와 margin 는 옵션이지만 동시에 값을 넣어야 함.
  //A4, 1cm 식으로.
  paperSize = options_pdf.paperSize;
  margin = options_pdf.margin;
  scale = options_pdf.scale;
  landscape = options_pdf.landscape;

  $(selector).find('.no-print').css('display','none');
  kendo.drawing.drawDOM($(selector), {
    paperSize: iif(paperSize,paperSize,"auto"),
    margin: iif(margin,margin,0),
    scale: iif(scale,scale,1),
    landscape: iif(landscape,landscape,false)
  }).then(function (group) {
    setTimeout( function(p_group,p_fname) {
      kendo.drawing.pdf.saveAs(p_group, p_fname, undefined, function(){
        url = location.href;
        if($('li.k-state-active[tabid]').attr('tabid')!=undefined) {
          if(getUrlParameter('tabid')==undefined) {
            url = url + '&tabid='+$('li.k-state-active[tabid]').attr('tabid');
          }
        }
        url = replaceAll(url, '&idx='+getUrlParameter('idx'), '&idx='+document.getElementById('idx').value);
        location.href = url;
      });
	  },0,group,fname);
    $(selector).find('.no-print').css('display','block');
  });
}
/* json 관련 함수 start */
function getJson_commonCode(p_RealCid) {
  var url = "commonCode_json.php?RealCid="+p_RealCid;
  return JSON.parse(ajax_url_return(url));
}

function isJsonString(str) {
  if(str==null) return false;
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

function jsonFromIndex(json, index) {
	var ii = 0;
    for(key in json) {
        if(ii==index) {
            return { "key" : key, "value" : json[key] }
            break;
        }
        ++ii;
    }
}
function json_unempty( obj ) {
  switch ( true ) {
  case obj === null:
  case typeof obj === 'undefined':
  case typeof obj === 'string' && obj.trim() === '':
    return true

  case Array.isArray( obj ):
    for ( let i = obj.length - 1; i >= 0; i-- ) {
      if ( json_unempty( obj[i] ) ) obj.splice( i, 1 )
    }
    return obj.length === 0

  case typeof obj === 'object':
    Object.keys( obj ).forEach( ( key ) => {
      if ( json_unempty( obj[key] ) ) delete obj[key]
    } )
    return Object.keys( obj ).length === 0

  default:
    return false
  }
}
//json 의 각 value 의 length 중 0보다 크면 리턴.
function maxArrayFromJson(json) {
	var ii = 0;
    for(key in json) {
        if(json[key].length>0) {
            return json[key].length;
            break;
        }
        ++ii;
    }
    return 0;
}
//json 의 length
function json_length(json) {
	var ii = 0;
    for(key in json) {
        ++ii;
    }
    return ii;
}

function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getObjects(obj[i], key, val));    
      } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      //if (i == key && obj[i] == val || i == key && val == '') { //???????????????????????????????????
      if (i == key && obj[i] == val) { //???????????????????????????????????
        objects.push(obj);
      } else if (obj[i] == val && key == ''){
          //only add if the object is not already in the array
          if (objects.lastIndexOf(obj) == -1){
              objects.push(obj);
          }
      }
  }
  return objects;
}

function getObjectsIndex(obj, key, val) {
  var ii = -1;
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        if(obj[i][key]==val) {
          ii = i;
          break;
        }
      }
  }
  return ii*1;
}
//ex : getFieldAttr(document.getElementById("key_aliasName").value, "format");
function getFieldAttr(p_field, p_attr) {
  return getObjects($("#grid").data("kendoGrid").columns, "field", p_field)[0][p_attr];
}

//return an array of values that match on a certain key
function getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getValues(obj[i], key));
      } else if (i == key) {
          objects.push(obj[i]);
      }
  }
  return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(getKeys(obj[i], val));
      } else if (obj[i] == val) {
          objects.push(i);
      }
  }
  return objects;
}


/* json 찾기 관련 함수 end */
function json_char_receive(p_char) {
  p_char = replaceAll(p_char, String.fromCharCode(65279), "");
  p_char = replaceAll(p_char, String.fromCharCode(12288), "");
  p_char = replaceAll(p_char, "_andShap@", "&#");
  return p_char;
};


//telegram_sendMessage.php 에서 전송되며, 텔레그램 전송우선 && 없으면 이메일 발송.
function telegram_sendMessage(p_chat_id, p_userid, p_text, p_parse_mode, p_sendername) {
  url = "/_mis/telegram_sendMessage.php?";
  p_text = encodeURIComponent(p_text);
  url = url + "text="+p_text;
  if(p_chat_id!=undefined && p_chat_id!="") url = url + "&chat_id="+p_chat_id;
  if(p_userid!=undefined && p_userid!="") url = url + "&userid="+encodeURIComponent(p_userid);
  if(p_parse_mode!=undefined && p_parse_mode!="") url = url + "&parse_mode="+p_parse_mode;
  if(p_sendername!=undefined && p_sendername!="") url = url + "&sendername="+encodeURIComponent(p_sendername);
  r_msg = ajax_url_return(url);
  if(Left(r_msg,7)=='@alert:' && location.pathname=='/_mis/index.php') {
    r_msg = Mid(r_msg,8,999);
    alert(r_msg);
  } else if(Left(r_msg,9)=='@confirm:' && location.pathname=='/_mis/index.php') {
    r_msg = Mid(r_msg,10,999);
    if(confirm(r_msg)) {
      window.open('index.php?gubun=338&tabid=email&isMenuIn=auto');
    };
  }
}

function email_sendGroupMessage(p_pushList, p_title, p_contents, p_sendername) {
  if(p_pushList=="") return false;
  if(p_title=="") return false;
  if(p_contents=="") return false;


  var values = {
    'pushList': p_pushList,
    'title': p_title,
    'contents': p_contents,
    'sendername': p_sendername
  };

  $.ajax({
    url: "/_mis/email_sendMessage.php",
    type: "POST",
    data: values
  });
}
function telegram_sendGroupMessage(p_pushList, p_text, p_sendername) {
  if(p_pushList=="") return false;
  if(p_text=="") return false;

  var p = p_pushList.split(",");
  for(i=0;i<p.length;i++) {
    receive_id = p[i];
    if(receive_id!="") telegram_sendMessage("", receive_id, p_text, "HTML", p_sendername);
  }
}

//console.log(getReadableByte(120, 2))
function getReadableByte(count, decimal=0, level=0, plus='Y') {
  if(!isNumeric(count)) return '';
  count = count*1;
  if(count<0) {
    count = -count;
    plus = 'N';
  }
  let unitList = ["B", "KB", "MB", "GB", "TB", "PT"];

  if (count >= 1024.0 && (level+1 < unitList.length)) {
      return getReadableByte(count/1024, decimal, ++level, plus)
  }
  vv = `${decimal ? (count).toFixed(decimal) : Math.round(count)} ${unitList[level]}`
  if(plus=='N') vv = '-'+vv;
  return vv;
}

function this_debugger(p_this, p1, p2) {
  debugger;
  return trun;
}
function loadjscssfile(filename, filetype) {
  if (filetype == "js") { //if filename is a external JavaScript file
    // alert('called');
    var fileref = document.createElement('script')
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", filename)
  } else if (filetype == "css") { //if filename is an external CSS file
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref)
}
function preLoadjscssfile(filename) {
  loadjscssfile(filename,filename.split(".")[filename.split(".").length-1]);
}
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}
function displayLoading(target) {   //최대10초
  
  if($('body').is(':visible')==false) return false;
  if(parent.$('.k-loading-image').length>0) return false;
  
  if(!isMainFrame() && typeof parent.displayLoading=="function") {
    parent.displayLoading(target);
    return false;
  }

	if(document.getElementById("displayLoading")) document.getElementById("displayLoading").value = "Y";

  
  setTimeout( function() {
    if(target=="" || target==undefined) {
      element = parent.$("body");
    } else {
      element = $(target);
    }
    kendo.ui.progress(element, true);
  },0);
  setTimeout( function() {
    displayLoadingOff();
  },10000);
}
function displayLoading_long(target) {   //최대1시간
  
  if($('body').is(':visible')==false) return false;
  if(parent.$('.k-loading-image').length>0) return false;

  if(!isMainFrame() && typeof parent.displayLoading=="function") {
    parent.displayLoading(target);
    return false;
  }

	if(document.getElementById("displayLoading")) document.getElementById("displayLoading").value = "Y";

  
  setTimeout( function() {
    if(target=="" || target==undefined) {
      element = parent.$("body");
    } else {
      element = $(target);
    }
    kendo.ui.progress(element, true);
  },0);
  setTimeout( function() {
    displayLoadingOff();
  },1000*3600);
}
function displayLoadingOff(p_target) {

  setTimeout( function(p_target) {
    kendo.ui.progress($('body'), false);
    if(parent.document.getElementById("displayLoading")) parent.document.getElementById("displayLoading").value = "";

    if(p_target=="" || p_target==undefined) {
      element = parent.$("body");
    } else {
      element = $(p_target);
    }
    kendo.ui.progress(element, false);
    kendo.ui.progress($('div'), false);
  },500,p_target);

  if(!isMainFrame() && typeof parent.displayLoading=="function") {
    if(typeof p_target=="string") p_target = $(p_target);
    if(p_target) kendo.ui.progress(p_target, false);
    parent.displayLoadingOff(p_target);
    return false;
  }


}

function htmlDecode(value) {
  return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function print_onclick() {
  if($(".viewPrintDiv #getStyle").length==0) {
      ii = $('body style').index($('body #frm style'));
      $(".viewPrintDiv").append('<div id="getStyle">');
      $('body style').each( function(i,t) {
          if(i>ii) {
              $(".viewPrintDiv #getStyle").append(t);
          }
      });;
  }
  setTimeout( function() {
      $(".viewPrintDiv").printThis();
  },0);
}


function windowID () {
  if(window.frameElement) return window.frameElement.id;
  else return "";
}

Date.prototype.yyyymmdd = function() {
  if(!isDateObject(this)) return '';
  var yyyy = this.getFullYear();
  var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
  var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  return "".concat(yyyy).concat(mm).concat(dd);
};
Date.prototype.yyyymmdd10 = function() {
  var dd = this.yyyymmdd();
  if(dd=="") return "";
  else return Left(dd,4)+"-"+Mid(dd,5,2)+"-"+Right(dd,2);
 };


 Date.prototype.yyyymmddhhmm = function() {
  if(!isDateObject(this)) return '';
  var yyyy = this.getFullYear();
  var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
  var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
  var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
  return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min);
 };
 Date.prototype.yyyymmddhhmm16 = function() {
  var dd = this.yyyymmddhhmm();
  if(dd=="") return "";
  else return Left(dd,4)+"-"+Mid(dd,5,2)+"-"+Mid(dd,7,2)+" "+Mid(dd,9,2)+":"+Right(dd,2);
 };
 Date.prototype.yyyymmddhhmm19 = function() {
  var dd = this.yyyymmddhhmmss();
  if(dd=="") return "";
  else return Left(dd,4)+"-"+Mid(dd,5,2)+"-"+Mid(dd,7,2)+" "+Mid(dd,9,2)+":"+Mid(dd,11,2)+":"+Right(dd,2);
 };
Date.prototype.yyyymmddhhmmss = function() {
  if(!isDateObject(this)) return '';
  var yyyy = this.getFullYear();
  var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
  var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
  var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
  var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
  return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);
 };
 function getWeekName(date, lang) {

  if(typeof date == 'string') {
    date = new Date(date);
  } 
  // getDay 메소드가 반환하는 인덱스에 맞추어 일~토 순서로 요일 입력
  const week_ko = ['일', '월', '화', '수', '목', '금', '토'];
  const week_en = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  if(lang=='en') {
    return week_en[date.getDay()];
  } else {
    return week_ko[date.getDay()];
  }

}
 
 function getWeek(date) {
  var weekMap = [6, 0, 1, 2, 3, 4, 5];    //월시작
  var now = new Date(date);
  now.setHours(0, 0, 0, 0);
  var monday = new Date(now);
  monday.setDate(monday.getDate() - weekMap[monday.getDay()]);
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - weekMap[sunday.getDay()] + 6);
  sunday.setHours(23, 59, 59, 999);
  return [monday, sunday];
}

function getWeekSun(date) {
  var weekMap = [0, 1, 2, 3, 4, 5, 6];    //일시작
  var now = new Date(date);
  now.setHours(0, 0, 0, 0);
  var monday = new Date(now);
  monday.setDate(monday.getDate() - weekMap[monday.getDay()]);
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - weekMap[sunday.getDay()] + 6);
  sunday.setHours(23, 59, 59, 999);
  return [monday, sunday];
}

 
 function date10(p_date) {
  if(typeof p_date=='string') {
    if(p_date.length==8) {
      p_date = Left(p_date,4)+"-"+Mid(p_date,5,2)+"-"+Mid(p_date,7,2);
    }
    if(isDate(p_date)==false) {
        return p_date;
    }
  }
  d = new Date(p_date).yyyymmdd();
  return Left(d,4)+"-"+Mid(d,5,2)+"-"+Mid(d,7,2);
}

 function today10() {
	d = new Date().yyyymmdd();
	return Left(d,4)+"-"+Mid(d,5,2)+"-"+Mid(d,7,2);
}


function today8() {
	return new Date().yyyymmdd();
}

function today14() {
	return new Date().yyyymmddhhmmss();
}
function today15() {
	d = new Date().yyyymmddhhmmss();
	return Left(d,8)+"_"+Mid(d,9,6);
}

function today19() {
	d = new Date().yyyymmddhhmmss();
	return Left(d,4)+"-"+Mid(d,5,2)+"-"+Mid(d,7,2)+" "+Mid(d,9,2)+":"+Mid(d,11,2)+":"+Mid(d,13,2);
}

function isMobile() {
  if (navigator.userAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
    return true;
  }
  else {
    return false;
  }
}
function isApple() {
  if (navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i) != null) {
    return true;
  }
  else {
    return false;
  }
}
function isGoodBrower() {
  try {
      b = 0;
      var a = 'b = typeof ``';
      eval(a);
      return b=='string';
  } catch (error) {
    return false;
  }
}
//불량이면 출력한다.
function messageBedBrower() {
	if(isGoodBrower()==false) {
    if(typeof parent.toastr=="object") toastr_obj = parent.toastr; else toastr_obj = toastr;
    toastr_obj.error("업무처리용으로 사용이 불가능한 브라우저입니다.<br/><br/>크롬 또는 엣지 브라우저를 사용하세요.<br/><br/>크롬 다운로드 : <a style='font-size:14px; font-weight:bold; color:blue;' target=_blank href='https://www.google.co.kr/intl/ko/chrome/browser/desktop/index.html'>여기를 클릭하세요!!!</a>", "", { "closeButton": true, "timeOut": "0", "extendedTimeOut": "0"});
		return true;
	}
	return false;
}

//좋아도 출력한다.
function checkBedBrower() {
  if(typeof parent.toastr=="object") toastr_obj = parent.toastr; else toastr_obj = toastr;
	if(!messageBedBrower()) toastr_obj.success("업무처리용으로 사용가능한 브라우저입니다.");
}



function isMainFrame() {
  return window.location == window.parent.location;
}

function window_resize() {
  $(window).resize();
}
/*
//특정 배열값 삭제. 무거워서 removeItem 로 대체함.
Array.prototype.remByVal = function(val) {
  for (var i = 0; i < this.length; i++) {
      if (this[i].value!=undefined) {
        if (this[i].value==val.value) {
          this.splice(i, 1);
          i--;
        }
      } else if (this[i] === val) {
          this.splice(i, 1);
          i--;
      }
  }
  return this;
}
*/
function DoEvents() {
  ajax_url_return('/_mis_kendo/js/kendo.all.min.js');
}

function charLength(p_this) {
  if(uni_len(p_this.value)>480) p_this.value = uni_left(p_this.value, 480);
  charMsg = location.host + ' - 제한 : ' + uni_len(p_this.value)+'/480자';
  $(p_this).closest('.k-widget.k-window.k-dialog.k-prompt').find('span.k-window-title.k-dialog-title').text(charMsg);
}

function sendMsgForm(p_userid, p_username, p_msg) {

  if(isMainFrame()==false && top.sendMsgForm) {
    top.sendMsgForm(p_userid, p_username, p_msg);
    return false;
  }

  p_username = p_username.split('|')[0];

  setTimeout( function() {
      $('.k-prompt-container input')[0].outerHTML = '<textarea onkeyup="charLength(this);" style="width: 350px;height: 165px;" class="k-textbox" title="Input" aria-label="Input"></textarea>';
  }, 0);

  kendo.prompt(p_username+'님에게 텔레그램으로 전송할 내용을 넣으세요(한글450자).', p_msg).then(function (msg) {
      telegram_sendMessage('', p_userid, uni_left(msg,450), '', '');
      if(document.getElementById('MisSession_UserID').value!=p_userid) telegram_sendMessage('', document.getElementById('MisSession_UserID').value, p_username+'님에게 보낸 메시지: '+uni_left(msg,450), '', '알리미');
      
  }, function () {
      
  })


}
function pushMsgForm(p_userid, p_username, p_msg) {

  if(isMainFrame()==false && top.sendMsgForm) {
    top.pushMsgForm(p_userid, p_username, p_msg);
    return false;
  }

  p_username = p_username.split('|')[0];

  setTimeout( function() {
      $('.k-prompt-container input')[0].outerHTML = '<textarea onkeyup="charLength(this);" style="width: 350px;height: 165px;" class="k-textbox" title="Input" aria-label="Input"></textarea>';
  }, 0);

  kendo.prompt(p_username+'님에게 전송할 알림 내용을 넣으세요(한글450자).', p_msg).then(function (msg) {
      push_sendMessage(p_userid, document.getElementById('MisSession_UserID').value+'님의 메시지', uni_left(msg,450));
      
  }, function () {
      
  })


}
function get_filesize(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
                           //  to get only the header
  xhr.onreadystatechange = function() {
    if (this.readyState == this.DONE) {
        callback(parseInt(xhr.getResponseHeader("Content-Length")));
    }
  };
  xhr.send();
}
function scrollbarVisible_X(element) {
  return element.scrollWidth > element.clientWidth;
}
function scrollbarVisible_Y(element) {
  return element.scrollHeight > element.clientHeight;
}

function sendMsg_opinion() {

  setTimeout( function() {
      $('.k-prompt-container input')[0].outerHTML = '<textarea onkeyup="charLength(this);" style="width: 350px;height: 165px;" class="k-textbox" title="Input" aria-label="Input"></textarea>';
      $('.k-prompt-container textarea')[0].value = '성명:  \n연락처:  \n내용:\n';
    }, 0);

  kendo.prompt('관리자에게 문의하실 내용을 넣으시고, OK 를 클릭하세요(한글480자).', '').then(function (msg) {
    telegram_sendMessage('', 'gadmin', '문의글:\n'+uni_left(msg,450), '');
    //telegram_sendMessage('', 'admin', '문의글: '+uni_left(msg,450), '');
    if(document.getElementById('MisSession_UserID').value!='gadmin') telegram_sendMessage('', document.getElementById('MisSession_UserID').value, '관리자에게 보낸 문의내용:\n'+uni_left(msg,450), '', '알리미');
  }, function () {
      
  })


}
function topsite() {
  if(top.document.getElementById('MisJoinPid')==null) return "notmis";
  else return "mis";
}
function kendo_alert(content, title) {
	if(title==undefined) {
		$('<div>'+content+'</div>').kendoAlert({
		}).data("kendoAlert").open();
	} else {
		$('<div>'+content+'</div>').kendoAlert({
		  messages:{
			okText: title
		  }
		}).data("kendoAlert").open();
	}
}


function removeItem(array, item){

  for (var i = 0; i < array.length; i++) {
      if (array[i].value!=undefined) {
        if (array[i].value==item.value) {
          array.splice(i, 1);
          i--;
        }
      } else if (array[i] === item) {
        array.splice(i, 1);
          i--;
      }
  }
  return array;

}

function getFileInfo(e) {
  return $.map(e.files, function(file) {
      var info = file.name;

      // File size is not available in all browsers
      if (file.size > 0) {
          info  += " (" + Math.ceil(file.size / 1024) + " KB)";
      }
      return info;
  }).join(", ");
}


var popCnt = 0;


function toggleFullScreen(p_boolean) {
  
  //if(p_boolean==true && event.ctrlKey==false) return false;
  setTimeout( function() {
    gridHeight();
  },100);
  var docEl = document.documentElement;

  var fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;

  var requestFullScreen = docEl.requestFullscreen ||
      docEl.msRequestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullscreen;

  var exitFullScreen = document.exitFullscreen ||
      document.msExitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen;

  if (p_boolean==undefined && !requestFullScreen) {
    return;
  }

  
  if (p_boolean==undefined && !fullscreenElement || p_boolean) {
    requestFullScreen.call(docEl, Element.ALLOW_KEYBOARD_INPUT);
  } else {
    if(fullscreenElement) exitFullScreen.call(document);
  }
}

function query_popup(p_url) {
  parent_popup_jquery(p_url,'개발을 위한 참고용 쿼리문',800,500);
}
  function query_error_popup(p_this, p_url) {
  parent_popup_jquery('about:blank','개발을 위한 참고용 에러쿼리문',800,500);
      sql_msg = '';
      if(p_url!='') {
          sql_msg = '\n\n'+ajax_url_return(p_url);
      }
      if($('.windowPop.k-window-content')[0]) {
          $('.windowPop.k-window-content')[$('.windowPop.k-window-content').length-1].innerText = $(p_this).attr('msg')+sql_msg;
          setTimeout( function() {
              $('.windowPop.k-window-content')[$('.windowPop.k-window-content').length-1].style.overflowY = 'auto';
              $('.windowPop.k-window-content')[$('.windowPop.k-window-content').length-1].style.padding = '20px 15px';
          },1000);
      } else {
          top.$('.windowPop.k-window-content')[top.$('.windowPop.k-window-content').length-1].innerText = $(p_this).attr('msg')+sql_msg;
          setTimeout( function() {
              top.$('.windowPop.k-window-content')[top.$('.windowPop.k-window-content').length-1].style.overflowY = 'auto';
              top.$('.windowPop.k-window-content')[top.$('.windowPop.k-window-content').length-1].style.padding = '20px 15px';
          },1000);
      }
}

function parent_popup_jquery(p_url, p_title, p_width, p_height, p_modal) {

	if(!isMainFrame() && typeof parent.parent_popup_jquery=="function") {
    parent.parent_popup_jquery(p_url,p_title, p_width, p_height, p_modal);
    return false;
	}
  
  ++popCnt;
  var obj = document.getElementById('txt_window');
  obj.outerHTML = obj.outerHTML + replaceAll(obj.value, "{popCnt}", popCnt);
  document.getElementById('ifr_window'+popCnt).src = p_url;

  var myWindow = $("#window"+popCnt);
  if(p_modal==undefined) p_modal = false;

  myWindow.kendoWindow({
      width: iif(p_width,p_width,"90%"),
      height: iif(p_height,p_height,$(window).height()*0.9),
      title: p_title,
      scroll: "no",
      resizable: false,
      modal: p_modal,
      visible: false,
      actions: [
          "Refresh",
          "Minimize",
          "Maximize",
          "Close"
      ],
      close: function() {
        if(typeof popup_close_run == 'function') {
          popup_close_run(this);
        }
      },
      refresh: function(e) {
        popCnt = replaceAll(event.currentTarget.children[1].id, "window", "");
        $("#ifr_window"+popCnt).attr("src", p_url);
        if(Right(p_url,4)=='.txt') {
          $(getFrameObjBody('ifr_'+event.currentTarget.children[1].id)).css('color',theme_font());
          $(getFrameObjBody('ifr_'+event.currentTarget.children[1].id)).css('background-color',theme_back());
        }
      },
      activate: function(e) {
        if($(event.currentTarget).find('iframe')[0]) {
          if(Right($(event.currentTarget).find('iframe')[0].src,4)=='.txt') {
            $(getFrameObjBody('ifr_'+event.currentTarget.children[1].id)).css('color',theme_font());
            $(getFrameObjBody('ifr_'+event.currentTarget.children[1].id)).css('background-color',theme_back());
          }
        }
        $(event.currentTarget).find('iframe').on('load', function() {
          if(Right(this.src,4)=='.txt') {
            $(getFrameObjBody(this.id)).css('color',theme_font());
            $(getFrameObjBody(this.id)).css('background-color',theme_back());
          }
        });
      }
      
  }).data("kendoWindow").center();  

  if(window.innerWidth<1200) myWindow.data("kendoWindow").open().maximize(); else myWindow.data("kendoWindow").open();

  $("span.k-i-window-minimize").attr("title", "key: Alt+↓");
  $("span.k-i-window-maximize").attr("title", "key: Alt+↑");
  $("span.k-i-close").attr("title", "key: ESC");
  
}



function popup_jquery(p_url, p_title, p_width, p_height, p_modal, p_maximize) {


  ++popCnt;
  var obj = document.getElementById('txt_window');
  obj.outerHTML = obj.outerHTML + replaceAll(obj.value, "{popCnt}", popCnt);
  document.getElementById('ifr_window'+popCnt).src = p_url;

    var myWindow = $("#window"+popCnt);
    if(p_modal==undefined) p_modal = false;

    myWindow.kendoWindow({
        width: iif(p_width,p_width,"90%"),
        height: iif(p_height,p_height,$(window).height()*0.9),
        title: p_title,
        scroll: "no",
        resizable: false,
        modal: p_modal,
        visible: false,
        actions: iif(p_maximize, [
            "Refresh",
            "Close"
        ], [
          "Refresh",
          "Minimize",
          "Maximize",
          "Close"
      ]),
        close: function() {
          if(typeof popup_close_run == 'function') {
            popup_close_run(this);
          }
        },
        refresh: function(e) {
          popCnt = replaceAll(event.currentTarget.children[1].id, "window", "");
          $("#ifr_window"+popCnt).attr("src", p_url);
        },
        activate: function(e) {
          if($(event.currentTarget).find('iframe')[0]) {
            if(Right($(event.currentTarget).find('iframe')[0].src,4)=='.txt') {
              $(getFrameObjBody('ifr_'+event.currentTarget.children[1].id)).css('color',theme_font());
            }
          }
          $(event.currentTarget).find('iframe').on('load', function() {
            if(Right(this.src,4)=='.txt') {
              $(getFrameObjBody(this.id)).css('color',theme_font());
            }
          });
        }
    }).data("kendoWindow").center();  
    if(p_maximize) myWindow.data("kendoWindow").maximize();
    myWindow.data("kendoWindow").open();

    $("span.k-i-window-minimize").attr("title", "key: Alt+↓");
    $("span.k-i-window-maximize").attr("title", "key: Alt+↑");
    $("span.k-i-close").attr("title", "key: ESC");
      
}
  
if(typeof toastr=="object") {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}


function toastrAlert(p_msg, p_type, p_timeOut) {
//http://codeseven.github.io/toastr/demo.html
  //p_type : success,info,warning,error
  if(p_type==undefined || p_type=="") p_type = "info";
  if(p_timeOut==undefined || p_timeOut=="") p_timeOut = "5000";

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": p_timeOut,
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  toastr.options.timeOut = p_timeOut;

  Command: toastr[p_type](p_msg);

}


//iframe obj
function getFrameObj(objid){
  var iFrame =  document.getElementById(objid);
  if(iFrame==undefined) return iFrame;
  var objDoc = iFrame.contentWindow;
  return objDoc;
}


//iframe obj
function getFrameObjBody(objid){
  var iFrame =  document.getElementById(objid);
  var iFrameBody;

   iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];

   return iFrameBody;
}


function getSelectTxt(obj) {
	if(obj.selectedIndex>-1) return obj.options[obj.selectedIndex].text;
	else return "";
}



function getRecIndx() {
  if(!isNumeric(colM[0].dataIndx) && colM[0].dataIndx!="state" && colM[0]._nodrop==undefined) return colM[0].dataIndx;
  else if(!isNumeric(colM[1].dataIndx) && colM[1].dataIndx!="state" && colM[1]._nodrop==undefined) return colM[1].dataIndx;
  else return colM[2].dataIndx;
}

function makeCodeSelectTxt(p_response) {
  var json_codeSelect = p_response.json_codeSelect;
  var input_json_codeSelect = "";
  for(kk=0;kk<Object.keys(json_codeSelect).length;kk++) {
          key = Object.keys(json_codeSelect)[kk];
          value = json_codeSelect[key];
          input_json_codeSelect = input_json_codeSelect + "<input id='json_"+key+"' class='json_codeSelect' type='hidden'/>";

  }
  $("#div_json_codeSelect").html(input_json_codeSelect);             
  for(kk=0;kk<Object.keys(json_codeSelect).length;kk++) {
          key = Object.keys(json_codeSelect)[kk];
          value = json_codeSelect[key];
          $("input#json_"+key).val(value);
  }
}


function openPopupUrl(p_title, p_url, p_idx, p_rowIndx) {

  //한번클릭에 두개창 열리는 현상 방지.
  setTimeout("document.getElementById('pre_popupInfo').value = 'init';console.log('0초후 콘솔='+document.getElementById('pre_popupInfo').value);",0);
  if(document.getElementById("pre_popupInfo").value==p_title+p_url+p_idx+p_rowIndx) {
    console.log("안열어,pre_popupInfo="+document.getElementById("pre_popupInfo").value);
    return false;
  }
    console.log("열어,pre_popupInfo="+document.getElementById("pre_popupInfo").value);
  document.getElementById("pre_popupInfo").value = p_title+p_url+p_idx+p_rowIndx;

  ++popCnt;
  var obj = document.getElementById('txt_window');
  obj.outerHTML = obj.outerHTML + replaceAll(obj.value, "{popCnt}", popCnt);
  document.getElementById('ifr_window'+popCnt).src = p_url;
  document.getElementById('txt_windowIdx'+popCnt).value = p_idx;
  document.getElementById('txt_windowRowIndx'+popCnt).value = p_rowIndx;

      var myWindow = $("#window"+popCnt);

      myWindow.css("z-index", 999999);
      myWindow.kendoWindow({
          width: "90%",
          height: "85%",
          title: p_title,
          scroll: "no",
          resizable: false,
          actions: [
              "Refresh",
              "Minimize",
              "Maximize",
              "Close"
          ],
          close: function() {
            //debugger;
            if(parent.$("#select_colIndx").val()!="") {
              parent.$("#stopEvent").val('Y');
              rowIndx = parent.$("#select_rowIndx").val();
              dataIndx = parent.colM[parent.$("#select_colIndx").val()].dataIndx;
              parent.$("#grid_filter").pqGrid("setSelection", { rowIndx: rowIndx, dataIndx: dataIndx });
              parent.$("#stopEvent").val('N');
            }
          },
          refresh: function() {
            popCnt = replaceAll(event.currentTarget.children[1].id, "window", "");
            $("#ifr_window"+popCnt).attr("src", p_url);
          },
          /*
          minimize: function() {
            popCnt = replaceAll(event.currentTarget.children[1].id, "window", "");
            $("div#window"+popCnt).parent().css("max-width", "270px");

        $("span.k-i-window-restore").click( function() {
              popCnt = replaceAll(event.currentTarget.parentNode.parentNode.parentNode.parentNode.children[1].id, "window", "");
          $("div#window"+popCnt).parent().css("max-width", "inherit");
        });
          },
          maximize: function() {
            popCnt = replaceAll(event.currentTarget.children[1].id, "window", "");
            $("div#window"+popCnt).parent().css("max-width", "inherit");
          },
          */
      }).data("kendoWindow").center().open();

      $("span.k-i-window-minimize").attr("title", "key: Alt+↓");
      $("span.k-i-window-maximize").attr("title", "key: Alt+↑");
      $("span.k-i-close").attr("title", "key: ESC");

  }



function ajax_french(p_dataIndx, p_pre, p_RealPid) {

  $('div#french_v1'+p_dataIndx+'.typeahead__result').remove();

  $('.js-typeahead-french_v1'+p_dataIndx).appendTo('#form-french_v1'+p_dataIndx+' > div.typeahead__container');    //speed: 위치이동시켜서 레이어가 가리지 않게 해줌

  if($('.js-typeahead-french_v1'+p_dataIndx).length>0) {

      $.typeahead({
          input: '.js-typeahead-french_v1'+p_dataIndx,
          dynamic: true,
          delay: 500,
          minLength: 0,
          maxItem: 15,
          //order: "asc",
          hint: true,
          accent: true,
          searchOnFocus: true,

          source: {
                  ajax: function (query) {
                      return {
                          type: "get",
                          url: "json_gridList.php?line=2504&flag=ajax_french&pre="+p_pre+"&RealPid="+p_RealPid,
                          path: "",
                          data: {
                              key: "{{query}}",
                              col: p_dataIndx
                          },
                          callback: {
                              done: function (data) {
                                  return data;

                              }
                          }
                      }
                  }
       
          },
          callback: {
              onClick: function (node, a, item, event) {
                  //alert(JSON.stringify(item));
                  setTimeout("$('.js-typeahead-french_v1"+p_dataIndx+"').keyup();",0);
       
              },
              onSendRequest: function (node, query) {
                  searchFocus_name = this.name;

                  console.log('request is sent');
              },
              onReceiveRequest: function (node, query) {
                  console.log('onReceiveRequest');

                  if($(".typeahead__result")[$(".typeahead__result").length-1]) {
                      if($(".typeahead__result")[$(".typeahead__result").length-1].id=="") {
                          $(".typeahead__result")[$(".typeahead__result").length-1].id = "french_v1"+p_dataIndx;

                          $("#french_v1"+p_dataIndx).prependTo("#grid_filter");
                          $("#french_v1"+p_dataIndx).css("position", "absolute");
                          $("#french_v1"+p_dataIndx).css("top", $("form#form-french_v1"+p_dataIndx+" > .typeahead__container").position().top+23);
                          $("#french_v1"+p_dataIndx).css("left", $("form#form-french_v1"+p_dataIndx+" > .typeahead__container").position().left);

                      }
                      $("#french_v1"+p_dataIndx).show();
                  }
                  //console.log('request is received')
              }
          },
          //debug: true
      });


      $(".js-typeahead-french_v1"+p_dataIndx).focus(
          function() {
              
              console.log('위의 포커스 초입 searchFocus_name : ' + searchFocus_name);
              $(".js-typeahead-french_v1"+p_dataIndx).keyup();
              
          }
      );

      $(".js-typeahead-french_v1"+p_dataIndx).blur(
          function() { 
              console.log('위의 blur 도망 초입 searchFocus_name : ' + searchFocus_name);
              searchFocus_name = this.name;
              setTimeout("$('#french_v1"+p_dataIndx+"').hide();",200);
              ////if(this.value!='') $('.typeahead__cancel-button').css("visibility","visible");
          }
      );

  }

}



function getIndxFromDataIndx(p_dataIndx) {

  for(kk=0;kk<colM.length;kk++) {
      if(colM[kk].dataIndx==p_dataIndx) {
          return kk;
          break;
      }
  }
  return "";
}


    function formLoad_init() {

        //form 관련 start ----------------
        if($('div.panel-bordered').length==0) return false;


        $('.panel-bordered>.panel-heading>.panel-title').html(
            replaceAll($('.panel-bordered>.panel-heading>.panel-title').html(),'...','')
        );

        $('.panel-bordered>.panel-heading').css('visibility','visible');

        var panel_heading_width = $('div.panel-bordered').width()+4;
        var panel_heading_height = $('.panel-bordered>.panel-heading').height();

        var panel_heading_top = $('div.panel-bordered').offset().top;
        var panel_heading_left = $('div.panel-bordered').offset().left;
        var panel_heading_outerHTML = $(".panel-bordered>.panel-heading")[0].outerHTML;

        if(getCookie('isMobile')!="Y") {
            if($('div#formTitleAddHeight').length==0) {
                $(".panel-bordered>.panel-heading")[0].outerHTML = panel_heading_outerHTML + "<div id='formTitleAddHeight' style='height:"+panel_heading_height+"px;'>&nbsp;</div>";
            }
            $(".panel-bordered>.panel-heading").css("top",panel_heading_top+"px");
            $(".panel-bordered>.panel-heading").css("left",panel_heading_left+"px");
            $(".panel-bordered>.panel-heading").css("width",panel_heading_width+"px");
        } else {
            $(".panel-bordered>.panel-heading").css("left",panel_heading_left-3+"px");
            $(".panel-bordered>.panel-heading")[0].style.setProperty("position", "relative", "important");
            $(".panel-bordered>.panel-heading").css("width",panel_heading_width+"px");
        }

        //edit form 에서.
        //첨부파일이 여러개일 경우, 수정필요할듯.
        $('button.dropify-clear').click(function() { 
            var attTxt = $(this).parent().parent().find("input")[0].name;
            $("[name='"+attTxt+"']").val('');
            $("[name='"+attTxt+"']").change();
        });

        //아래부터는 폼타이틀의 우측 아이콘 노출 및 이벤트 설정.

        var formActionFlag = Left($('.panel-bordered>.panel-heading>.panel-title').text(),2);

        if(formActionFlag=="입력") {
            $('a.wb-check-circle[title="입력완료"]').removeClass('hide');
        }


        if(formActionFlag=="수정") {
            $('a.wb-check-circle[title="저장"]').removeClass('hide');
        }


        if(formActionFlag=="수정") {
            $('a.wb-eye').click( function() {
                copy_viewRow();
                return false;
            });
            $('a.wb-eye').removeClass('hide');
        }

    
        if(formActionFlag=="내용") {

            $('a.wb-edit').click( function() {
                copy_editRow();
                return false;
            });
            $('a.wb-edit').removeClass('hide');

            $('a.wb-plus-circle[title="새로입력"]').click( function() {
                copy_addRow();
                return false;
            });
            $('a.wb-plus-circle[title="새로입력"]').removeClass('hide');


            $('a.wb-plus-circle[title="참조입력"]').click( function() {
                copy_refAddRow();
                return false;
            });
            $('a.wb-plus-circle[title="참조입력"]').removeClass('hide');

            $('a.wb-minus-circle').removeClass('hide');


        }


        $('a.wb-refresh').click( function() {

            if(formActionFlag=="수정") copy_editRow();
            if(formActionFlag=="입력") copy_addRow();
            if(formActionFlag=="내용") copy_viewRow();
            
            return false;
        });

        $('a.wb-close').click( function() { 
            $('#popup-dialog-filter').html(''); 
            $(document).scrollTop( 0 );
            return false;
        } );

        

        if(getCookie('isMobile')=="Y") $('.panel-bordered>.panel-heading>.panel-title').html('&nbsp;');
 
        //form 관련 end ----------------

    }










var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function getStringUrlParameter(p_url, p_param) {
  return new URLSearchParams(p_url).get(p_param);
}

function innerTEXT(obj) {
	document.getElementById("div_temp1").innerHTML = replaceAll(replaceAll(replaceAll(obj.innerHTML,"<script>","<!--"),"</script>","-->"),"\n"," ");
	return Trim(document.getElementById("div_temp1").innerText);
}
function innerTEXT0(obj) {  //여러 태그 중에 최상위 레벨의 text만 뽑아옴.
	textValue = '';
    $('<div>'+obj.outerHTML+'</div>').find('*').each( function(i,t) {
        if(i==0) textValue = t.outerHTML;
        else textValue = replaceAll(textValue, t.outerHTML, '');
    });
    return $(textValue).text();
}

//////////// FF 문제 해결

  function  FixPrototypeForGecko()
  {
      HTMLElement.prototype.__defineGetter__("runtimeStyle",element_prototype_get_runtimeStyle);
      window.constructor.prototype.__defineGetter__("event",window_prototype_get_event);
      Event.prototype.__defineGetter__("srcElement",event_prototype_get_srcElement);
      Event.prototype.__defineGetter__("fromElement",  element_prototype_get_fromElement);
      Event.prototype.__defineGetter__("toElement", element_prototype_get_toElement);
 
  }  
 
  function  element_prototype_get_runtimeStyle() { return  this.style; }
  function  window_prototype_get_event() { return  SearchEvent(); }
  function  event_prototype_get_srcElement() { return  this.target; }  
 
  function element_prototype_get_fromElement() {
      var node;
      if(this.type == "mouseover") node = this.relatedTarget;
      else if (this.type == "mouseout") node = this.target;
      if(!node) return;
      while (node.nodeType != 1)
          node = node.parentNode;
      return node;
  }
 
  function  element_prototype_get_toElement() {
          var node;
          if(this.type == "mouseout")  node = this.relatedTarget;
          else if (this.type == "mouseover") node = this.target;
          if(!node) return;
          while (node.nodeType != 1)
             node = node.parentNode;
          return node;
  }
 
  function  SearchEvent()
  {
      if(document.all) return  window.event;  
 
      func = SearchEvent.caller;  
 
      while(func!=null){
          var  arg0=func.arguments[0];  
 
          if(arg0 instanceof Event) {
              return  arg0;
          }
         func=func.caller;
      }
      return   null;
  }
/*******************************************************
작성목적  :  파이어폭스에서 윈도우 이벤트 키 리스너 등록 & innertext 적용
*******************************************************/
if (navigator.userAgent.indexOf('Firefox') >= 0) {
 
   if(window.addEventListener) { FixPrototypeForGecko(); }  

    (function() {
        var events = ["mousedown", "mouseover", "mouseout", "mousemove",
                  "mousedrag", "click", "dblclick"];
        for (var i = 0; i < events.length; i++) {
            window.addEventListener(events[i], function(e) {
                window.event = e;
            }, true);
        }
        setInnerTextProperty();
    } ());
};

function setInnerTextProperty() {
    if(typeof HTMLElement != "undefined" && typeof HTMLElement.prototype.__defineGetter__ != "undefined") {
        HTMLElement.prototype.__defineGetter__("innerText",function() {
            if(this.textContent) {
                return(this.textContent)
            } 
            else {
                var r = this.ownerDocument.createRange();
                r.selectNodeContents(this);
                return r.toString();
            }
        });
        
        HTMLElement.prototype.__defineSetter__("innerText",function(sText) {
            this.innerHTML = sText
        });
    }
}


/////////////////////////////////

//nnnnnnnn +n-line 후 하단프레임에서 상단프레임으로 라인추가시켜줌.


function isMSIE() {
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("msie") != -1) return true; else return false;
}




function scroll_top() {
	var pScrollTop = parent.document.body.scrollTop;
	if(pScrollTop==0) pScrollTop = parent.document.documentElement.scrollTop;
	return pScrollTop;

}


///////////////////////////////

function getName(gname) { 
  return document.getElementsByName(gname)[0]; 
}

function getID(id) { 
  return document.getElementById(id); 
}
//function $(id) { return document.getElementById(id); }



//=== 서버소스를 textarea 안에 출력할 경우, 변환이 필요함.
function textareaEncode(webSource) {
	return replaceAll(replaceAll(replaceAll(replaceAll(webSource,'@lt;','<'),'@gt;','>'),'~^~lt;','@lt;'),'~^~gt;','@gt;');
}



//======= textarea 에서 tab 키 인식시키기.
function textareaTab(objId) {
	document.getElementById(objId).onkeydown = function(e) {
	  if(!e) {
		  if (event.keyCode == 9)
		  {
			event.returnValue = false;
			insertAtCursor(document.getElementById(objId), "\t");
		  }
	  }
	  else if (e.keyCode == 9)
	  {
		e.preventDefault();
		insertAtCursor(document.getElementById(objId), "\t");
	  }
	}
}




//우측마우스방지함수
function LockF5(){
	if (event.keyCode == 116) {
		event.keyCode = 0;
		return false;
	}	
}



function setCookie(name,value,days) {
   var expires = "";
   if (days) {
       var date = new Date();
       date.setTime(date.getTime() + (days*24*60*60*1000));
       expires = "; expires=" + date.toUTCString();
   }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

 function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


function setLocalStorage(name,value) {
  if(value==null) {
    localStorage.removeItem(name);
  } else {
    localStorage.setItem(name,value);
  }
}
function getLocalStorage(name,value) {
  return localStorage.getItem(name);
}
function setSessionStorage(name,value) {
  if(value==null) {
    sessionStorage.removeItem(name);
  } else {
    sessionStorage.setItem(name,value);
  }
}
function getSessionStorage(name,value) {
  return sessionStorage.getItem(name);
}
function intoText(innerHTML_value) {
	var ret = innerHTML_value;
	ret = ret.replace(/&nbsp;/ig," ");
	ret = ret.replace(/<br>/ig,"\n");
	ret = ret.replace(/<br[^>]+>/ig,"\n");
	ret = ret.replace(/<[^>]+>/g,"");
	return ret;
}

function TextToHtml(temp) {
	var TextToHtml;
	TextToHtml = replaceAll(replaceAll(replaceAll(replaceAll(temp,"<","&lt;"),">","&gt;"),"\n","<br>")," ","&nbsp;");
	return TextToHtml;
}


String.prototype.innerText_value = function(){
     var ret = this;
     ret = ret.replace(/&nbsp;/ig," ");
     ret = ret.replace(/<br>/ig,"\n");
     ret = ret.replace(/<br[^>]+>/ig,"\n");
     ret = ret.replace(/<[^>]+>/g,"");
     return ret;
}

//ajax app function-------------------------

function getXmlHttpRequest(){
	var xmlhttp = false;
	
	if(window.XMLHttpRequest){
		xmlhttp= new XMLHttpRequest();
		
		}else{
		
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		//xmlhttp = new ActiveXObject("MSXML2.ServerXMLHTTP");
		
		}
		
		return xmlhttp;
}


function ajax_url_innerhtml(ajax_url,div_id){

	if(document.getElementById("full_site")) {
		if(Left(ajax_url,1)=="/") {
			ajax_url = document.getElementById("full_site").value + ajax_url;
		} else if(Left(ajax_url,4)!="http") {
			ajax_url = document.getElementById("full_site").value + "/_mis/" + ajax_url;
		}
	}


	if(InStr(ajax_url,"?")==0) ajax_url = ajax_url + "?ts=" + new Date().getTime();
	else ajax_url = ajax_url + "&ts=" + new Date().getTime();
	var xmlhttp = getXmlHttpRequest();
	xmlhttp.open("get", ajax_url, true);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				var el = document.getElementById(div_id);
				if(el) el.innerHTML = unescape(xmlhttp.responseText);
			}
		}
	}

	xmlhttp.send(null);

}


//innerHTML 을 변환시켜주면서 script 를 실행시켜줌
function stripAndExecuteScript(text) {
    var scripts = '';
    var cleaned = text.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
        scripts += arguments[1] + '\n';
        return '';
    });

    if (window.execScript){
        window.execScript(scripts);
    } else {
        var head = document.getElementsByTagName('head')[0];
        var scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.innerText = scripts;
        head.appendChild(scriptElement);
        head.removeChild(scriptElement);
    }
    return cleaned;
}


//타사이트 끌어오면서 innerHTML 의 스크립트까지 실행시켜줌.
function ajax_url_innerhtml_script(ajax_url,div_id){

	if(document.getElementById("full_site")) {
		if(Left(ajax_url,1)=="/") {
			ajax_url = document.getElementById("full_site").value + ajax_url;
		} else if(Left(ajax_url,4)!="http") {
			ajax_url = document.getElementById("full_site").value + "/_mis/" + ajax_url;
		}
	}

	ajax_url = "GrabPage2.asp?" + ajax_url;
	var xmlhttp = getXmlHttpRequest();
	xmlhttp.open("get", ajax_url, true);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				var el = document.getElementById(div_id);
				if(el) el.innerHTML = stripAndExecuteScript(unescape(xmlhttp.responseText));
			}
		}
	}

	xmlhttp.send(null);

}



//타사이트 끌어오면서 iframe 로 스크립트까지 실행시켜줌.
function ajax_url_iframe_script(ajax_url,div_id){

	if(document.getElementById("full_site")) {
		if(Left(ajax_url,1)=="/") {
			ajax_url = document.getElementById("full_site").value + ajax_url;
		} else if(Left(ajax_url,4)!="http") {
			ajax_url = document.getElementById("full_site").value + "/_mis/" + ajax_url;
		}
	}

	var ori_ajax_url = ajax_url;
	ajax_url = "GrabPage2.asp?" + ajax_url;
	var xmlhttp = getXmlHttpRequest();
	xmlhttp.open("get", ajax_url, true);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				var el = document.getElementById(div_id);
				if(el) el.contentDocument.body.innerHTML = "<html><head><base href=\"" + ori_ajax_url + "\"/><base target='_blank'/>" 
					+ stripAndExecuteScript(unescape(xmlhttp.responseText));
			}
		}
	}

	xmlhttp.send(null);
}



//비동기이며, 리턴값없음.
function ajax_url_touch(ajax_url){

	if(InStr(ajax_url,"?")==0) ajax_url = ajax_url + "?ts=" + new Date().getTime();
	else ajax_url = ajax_url + "&ts=" + new Date().getTime();
	var xmlhttp = getXmlHttpRequest();
	xmlhttp.open("get", ajax_url, true);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				//var el = document.getElementById(div_id);
				//if(el) el.innerHTML = unescape(xmlhttp.responseText);
			}
		}
	}

	xmlhttp.send(null);

}



function ajax_url_value(ajax_url,txt_id){

	if(InStr(ajax_url,"?")==0) ajax_url = ajax_url + "?ts=" + new Date().getTime();
	else ajax_url = ajax_url + "&ts=" + new Date().getTime();
	var xmlhttp = getXmlHttpRequest();
	//특성상, 비동기 아님.
	xmlhttp.open("get", ajax_url, false);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				var el = document.getElementById(txt_id);
				el.value = unescape(xmlhttp.responseText);
			}
		}
	}

	xmlhttp.send(null);

}


function ajax_url_return(ajax_url){

	if(InStr(ajax_url,"?")==0) ajax_url = ajax_url + "?ts=" + new Date().getTime();
	else ajax_url = ajax_url + "&ts=" + new Date().getTime();
	var xmlhttp = getXmlHttpRequest();
	var rValue="";
	//특성상, 비동기 아님.
	//console.log(ajax_url);
	xmlhttp.open("get", ajax_url, false);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				rValue = unescape(xmlhttp.responseText);
			}
		}
	}

	xmlhttp.send(null);
	//console.log(rValue);
	return rValue;

}


function ajax_url_return_noTS(ajax_url){

	var xmlhttp = getXmlHttpRequest();
	var rValue="";
	//특성상, 비동기 아님.

	//console.log(ajax_url);
	xmlhttp.open("get", ajax_url, false);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				rValue = unescape(xmlhttp.responseText);
			}
		}
	}

	xmlhttp.send(null);
	//console.log(rValue);
	return rValue;

}

//보이는 영역의 text 만 추출.
function getVisibleText(element) {
  window.getSelection().removeAllRanges();

  let range = document.createRange();
  range.selectNode(element);
  window.getSelection().addRange(range);

  let visibleText = window.getSelection().toString().trim();
  window.getSelection().removeAllRanges();

  return visibleText;
}

//ajax_url_return 와는 또다른 접근방법.
function ajax_url_return2(ajax_url){

	ajax_url = "/_mis/file_get_contents_new.php?" + ajax_url;
	var xmlhttp = getXmlHttpRequest();
	var rValue="";
	//특성상, 비동기 아님.

	//console.log(ajax_url);
	xmlhttp.open("get", ajax_url, false);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){

			if (xmlhttp.status == 200){
				rValue = unescape(xmlhttp.responseText);
			}
		}
	}

	xmlhttp.send(null);
	//console.log(rValue);
	return rValue;

}

//자동업데이트 체크 및 진행.
function speedmis_update() {

  //웹업데이트는 항상 체크&진행. 안내문구는 gadmin 에게만.
  
  file_url = 'https://www.speedmis.com/_mis';
  if(document.getElementById('MS_MJ_MY').value=='MY') web_url = 'https://speedmismy.mycafe24.com/_mis';
  else web_url = file_url;

  if(document.getElementById("RealPid").value=='speedmis001043') {
    //엔진 업데이트
    version_my = ajax_url_return2('/_mis/speedmis_file_version.txt');
	  url = file_url + '/speedmis_file_version.txt';

    version_speedmis = ajax_url_return2(url);
    if(version_my!=version_speedmis && document.getElementById('MisSession_UserID').value=='gadmin') {
      toastr.warning("<a href='https://www.speedmis.com/_mis/index.php?gubun=1040&idx=46' target=_blank>수정된 엔진버전이 감지되었습니다. 엔진업데이트를 진행해야 좋습니다. 도움말 바로가기</a>", "", {progressBar: true, timeOut: 10000, closeButton: false, positionClass: "toast-bottom-right"});
    }
  } else {

    if(ajax_url_return2('/_mis_addLogic/updateVersion/autoUpdate.txt')=='Y') {
      if(ajax_url_return2(web_url+'_addLogic/updateVersion/updateVersion_last.txt')*1 > ajax_url_return2('/_mis_addLogic/updateVersion/updateVersion_last.txt')*1) {
          autoUpdate_url = 'index.php?RealPid=speedmis001043&openUpdate=Y';
          ifr_id = "ifr_"+Math.floor(Math.random()*10000000000000000);
          $('body').append('<iframe id="'+ifr_id+'" style="display:none;"></iframe>');
          $('iframe#'+ifr_id)[0].src = autoUpdate_url;
          if(document.getElementById('MisSession_UserID').value=='gadmin') toastr.success("자동업데이트 설정에 의해 업데이트가 시작되었습니다.", "", {progressBar: true, timeOut: 5000, closeButton: false, positionClass: "toast-bottom-right"});
      }
      
      //엔진 업데이트
      if(document.getElementById("MisSession_UserID").value=='gadmin') {
        version_my = ajax_url_return2('/_mis/speedmis_file_version.txt');
        version_speedmis = ajax_url_return2(file_url+'/speedmis_file_version.txt');
        if(version_my!=version_speedmis) {
          toastr.warning("<a href='https://www.speedmis.com/_mis/index.php?gubun=1040&idx=46' target=_blank>수정된 엔진버전이 감지되었습니다. 엔진업데이트를 진행해야 좋습니다. 도움말 바로가기</a>", "", {progressBar: true, timeOut: 10000, closeButton: false, positionClass: "toast-bottom-right"});
        }
      }

    } else if(document.getElementById("MisSession_UserID").value=='gadmin') {
      if(ajax_url_return2(web_url+'_addLogic/updateVersion/updateVersion_last.txt')*1 > ajax_url_return2('/_mis_addLogic/updateVersion/updateVersion_last.txt')*1) {
          toastr.warning("", "<a href='index.php?RealPid=speedmis001043&isMenuIn=auto'>gadmin 님, 자동업데이트 설정을 하시려면 여기를 클릭해주세요.</a>", {progressBar: true, timeOut: 10000, closeButton: false, positionClass: "toast-bottom-right"});
      }
    }
  }

}

function shortUrl2(url) {
	var t1 = ajax_url_return_noTS("shortURL.asp?"+shortUrl_replace(url));
	return t1;
}

function shortUrl_replace(url) {
	return replaceAll(replaceAll(replaceAll(url,"1=1","@il=il"),"&","@nd;"),"%","@per;")
}

function siteHome() {
  var url = window.location.href;
  var arr = url.split("/");
  var result = arr[0] + "//" + arr[2];
  return result;
}

function nowTrans(text, fromLang, toLang) {
  if(fromLang==toLang) return text;
  else {
    var uu = siteHome() + "/_mis/speedmisTrans.php";
    var t1 = ajax_url_return_noTS(uu + "?from=" + fromLang + "&to=" + toLang + "&text=" + encodeURIComponent(text));
    //if(InStr(t1, "\"")) t1 = replaceAll(t1, t1.split("\"")[0], "");
    //t1 = replaceAll(t1,"\\/","/");
    if(InStr(t1, "Exception:")+InStr(t1, "correct UR")==0) return t1;
    else return text;
  }
}


//ajax app function-------------------------

function devQueryOnOff() {
  if(getCookie('devQueryOn')=='Y') {
    setCookie('devQueryOn','N');
    parent.toastr.success("이제 쿼리문이 더이상 노출되지 않습니다.");
  } else {
    setCookie('devQueryOn','Y');
    parent.toastr.success("이제부터 조회/저장 시에 쿼리문을 보실 수 있습니다!");
  }
}


function InStr(strSearch, charSearchFor)
{
  if(!strSearch) return -1;
  strSearch = strSearch+'';
	return strSearch.indexOf(charSearchFor)+1;
	 
}


function Mid(str, start, len)
{
// Make sure start and len are within proper bounds
	if (str==null) return 0;
	if (start < 0 || len < 0) return "";
	var iEnd, iLen = String(str).length;
	if (start + len > iLen)
		iEnd = iLen+1;
	else
		iEnd = start + len -1;
	return String(str).substring(start-1,iEnd);
}

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}


function StringAdd(num,str)
{
// Make sure start and len are within proper bounds
	if (num==null) return str;
	var return_str='';
	for (var i = 0; i < num; i++) {
		return_str = return_str + str
	}
	return return_str;

}


function replaceAll(oldString,searchStr, replaceStr )
{
	if (oldString==null) return false;
	var str;
	str = (oldString+"").split(searchStr).join(replaceStr);
	return str;
	
}



function Trim(str){
	if (str==null) return false;
	var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	for (var i = 0; i < str.length; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}
	for (i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';

} 



function Len(aa) {
  if(aa==null) return 0;
  bb=aa.length;
  return bb;
}

function uni_len(aa) {
	bb=aa.length;
	for(ii = 1; ii <= aa.length; ii++) {
		if(Mid(aa,ii,1)!="") {
			if(Mid(aa,ii,1).charCodeAt(0)>500) bb=bb+1;
			
			//alert(aa + ',' + ii + ',' + Mid(aa,ii,1) + ',' + Mid(aa,ii,1).charCodeAt(0));
			
		}
	}
	return bb;
}


function uni_left(aa,bb) {
	for(ii = 1; ii <= bb; ii++) {
		if(Mid(aa,ii,1)!="") {
			if(Mid(aa,ii,1).charCodeAt(0)>500 && ii<=bb) bb=bb-1;
		}
	}
	return Left(aa,bb);
}



function iif(evl, arg1, arg2) {

	if(evl) {
		return arg1;
	}
	else {
		return arg2;
	}
}
function formatnum(pVal,pFmt) {
	return kendo.toString(pVal,pFmt);
}
function isNumeric(val){return(parseFloat(val,10)==(val*1));}

function isImage(p_filename) {
  if(InStr(";.jpg;.png;.gif;jpeg;.bmp;", ";"+Right(p_filename,4).toLocaleLowerCase()+";")>0) {
    return true;
  } else return false;
}

function isWebPlayFile(p_filename) {
  if(InStr(";.jpg;.png;.gif;jpeg;.bmp;.pdf;.htm;html;.mp4;.mp3;.txt;.svg;", ";"+Right(p_filename,4).toLocaleLowerCase()+";")>0) {
    return true;
  } else return false;
}

function isDateObject(sDate) { 
  return (null != sDate) && !isNaN(sDate) && ("undefined" !== typeof sDate.getDate); 
}

function isDate(sDate) {
 if(sDate=="" || sDate==null) return false;
 if(isDateObject(sDate)) return true;

 var sOrgDate, sPatt;
 var sYear = "", sMonth = "", sDay = "";   
 var iYear = 0, iMonth = 0, iDay = 0;

 sPatt = /\//g; sDate = sDate.replace(sPatt,"");
 sPatt = /-/g;  sDate = sDate.replace(sPatt,"");
 sPatt = /\./g; sDate = sDate.replace(sPatt,"");

 if(sDate == "") return false;
 if(sDate.length != 8) return false;
 else {
     sYear = sDate.substring(0,4);
     sMonth = sDate.substring(4,6); 
     sDay = sDate.substring(6,8); 
 }  
    
    if(isNaN(sYear) || isNaN(sMonth) || isNaN(sDay)) return false;

  iYear = parseInt(sYear,'10'); 
    iMonth = parseInt(sMonth,'10'); 
    iDay = parseInt(sDay,'10'); 

    if (iYear < 1) iYear = 0;
    if (iMonth < 1 || iMonth > 12)  iMonth = 0;
    if (iDay < 1) iDay = 0;
       
    if ( iMonth == 1 || iMonth == 3 || iMonth == 5 || iMonth == 7 || iMonth == 8 ||
         iMonth == 10 || iMonth == 12)  { 
  if (iDay > 31) iDay = 0;  
    } else if (iMonth == 4 || iMonth == 6 ||  iMonth == 9 || iMonth == 11) {
  if (iDay > 30) iDay = 0;  
    } else if (iMonth == 2 )  { 
  if (iYear % 4 != 0 || (iYear % 100 == 0 && iYear % 400 != 0)) {
   if (iDay > 28) iDay = 0;  
  } else if (iDay > 29) iDay = 0;  
    } 
    if(iYear == 0 || iMonth == 0 || iDay == 0) return false;
 else return true;
}


function encode_cafe24(ajax_sql) {
	ajax_sql = replaceAll(ajax_sql,"wget","_@w_get");
  return ajax_sql;
}

function encode_firewall(ajax_sql) {

	ajax_sql = replaceAll(ajax_sql,"00","_@@@@");
	ajax_sql = replaceAll(ajax_sql,"'","_@dda");
	ajax_sql = replaceAll(ajax_sql,"%","_@percent");
	ajax_sql = replaceAll(ajax_sql,")","_@karoB");
	ajax_sql = replaceAll(ajax_sql,"(","_@karoA");
	ajax_sql = replaceAll(ajax_sql,"+","_@plus");
	ajax_sql = replaceAll(ajax_sql,"&","_@_nd");
	ajax_sql = replaceAll(ajax_sql,"#","_@shap");
	ajax_sql = replaceAll(ajax_sql,"able","_@ab");
	ajax_sql = replaceAll(ajax_sql,"select","_@se");
	ajax_sql = replaceAll(ajax_sql,"update","_@up");
	ajax_sql = replaceAll(ajax_sql,"script","_@sc");
	ajax_sql = replaceAll(ajax_sql,"from","_@fr");
	ajax_sql = replaceAll(ajax_sql,"where","_@wh");
	ajax_sql = replaceAll(ajax_sql,"and","_@an");
	ajax_sql = replaceAll(ajax_sql,"distinct","_@di");
	ajax_sql = replaceAll(ajax_sql,".dbo.","_@.d");
	ajax_sql = replaceAll(ajax_sql,"convert","_@co");
	ajax_sql = replaceAll(ajax_sql,"varchar","_@var");
	ajax_sql = replaceAll(ajax_sql,"join","_@jo");
	ajax_sql = replaceAll(ajax_sql,"char","_@ch");
	ajax_sql = replaceAll(ajax_sql,"click","_@cl");
	ajax_sql = replaceAll(ajax_sql,"inner","_@in");
	ajax_sql = replaceAll(ajax_sql,"left","_@le");
	ajax_sql = replaceAll(ajax_sql,"outer","_@ou");
	ajax_sql = replaceAll(ajax_sql,"like","_@li");
	ajax_sql = replaceAll(ajax_sql,"declare","_@dec");
	ajax_sql = replaceAll(ajax_sql,"isnull","_@isn");
	ajax_sql = replaceAll(ajax_sql,"getdate","_@get");
	ajax_sql = replaceAll(ajax_sql,"union","_@uni");


	return ajax_sql;
}



function ignoreSpaces(string) {
var temp = "";
string = '' + string;
splitstring = string.split(" ");
for(i = 0; i < splitstring.length; i++){
temp += splitstring[i];
}
return temp;
}


function getElementsByClass(node,searchClass,tag) {
	var classElements = new Array();
	var els = node.getElementsByTagName(tag); // use "*" for all elements
	var elsLen = els.length;
	var pattern = new RegExp("\\b"+searchClass+"\\b");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


function monthDiff(d1, d2) {
  var months;
  var d1 = new Date(d1);
  var d2 = new Date(d2);
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function DateDiff(date1, date2) {
     var asdf
     var dtDate1 = Date.parse(date1);
     var dtDate2 = Date.parse(date2);
     return (dtDate2 - dtDate1) / (24 * 60 * 60 * 1000);    
}

function DateAdd(t, v, sDate) {
  var yy = parseInt(sDate.substr(0, 4), 10);
  var mm = parseInt(sDate.substr(5, 2), 10);
  var dd = parseInt(sDate.substr(8), 10);

  if(t == "d"){
    d = new Date(yy, mm - 1, dd + v);
  }else if(t == "m"){
    d = new Date(yy, mm - 1 + v, dd);
  }else if(t == "y"){
    d = new Date(yy + v, mm - 1, dd);
  }else{
    d = new Date(yy, mm - 1, dd + v);
  }

  yy = d.getFullYear();
  mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
  dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

  return '' + yy + '-' +  mm  + '-' + dd;
}


var rgbToHexColor = (function () {
  var rx = /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;

  function pad(num) {
      if (num.length === 1) {
          num = "0" + num;
      }

      return num;
  }

  return function (rgb, uppercase) {
      var rxArray = rgb.match(rx),
          hex;

      if (rxArray !== null) {
          hex = pad(parseInt(rxArray[1], 10).toString(16)) + pad(parseInt(rxArray[2], 10).toString(16)) + pad(parseInt(rxArray[3], 10).toString(16));

          if (uppercase === true) {
              hex = hex.toUpperCase();
          }

          return "#"+hex;
      }

      return;
  };
}());

//================= msi_ajsx start =====================
function sqlReplace(obj_value) {
	//obj_value = replaceAll(obj_value,"'","'+char(39)+'");
	obj_value = replaceAll(obj_value,"'","''");
	//obj_value = replaceAll(obj_value,"<","'+char(60)+'");
	//obj_value = replaceAll(obj_value,">","'+char(62)+'");
	obj_value = replaceAll(obj_value,String.fromCharCode(1),"");
	return obj_value;
}


function isPhoneNumber(HP_No) {
	if(HP_No==null) return false;
	else {
		var temp1 = replaceAll(replaceAll(HP_No," ",""),"-","");
		if(!isNumeric(temp1) || uni_len(temp1) < 9 || uni_len(temp1) > 11 || Left(temp1,1) != "0") return false;
		else return true;
	}
}

function formatPhoneNumber(HP_No) {
	if(!isPhoneNumber(HP_No)) return HP_No;
	else {
		var temp1 = replaceAll(replaceAll(HP_No," ",""),"-","");
		if(uni_len(temp1) == 9)	return Left(temp1,2) + "-" + Mid(temp1,3,3) + "-" + Right(temp1,4);
		else if(uni_len(temp1) == 10) return Left(temp1,3) + "-" + Mid(temp1,4,3) + "-" + Right(temp1,4);
		else if(uni_len(temp1) == 11) return Left(temp1,3) + "-" + Mid(temp1,4,4) + "-" + Right(temp1,4);
	}
}



function check_email(val){
  if(!val.match(/\S+@\S+\.\S+/)){ // Jaymon's / Squirtle's solution
      // Do something
      return false;
  }
  if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
      // Do something
      return false;
  }
  return true;
}




function copyStringToClipboard(string) {
  if(window.clipboardData) window.clipboardData.setData('Text',string);
  else {
    function handler (event){
        event.clipboardData.setData('text/plain', string);
        event.preventDefault();
        document.removeEventListener('copy', handler, true);
    }

    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
  }
}

function guestLogin() {
	var dm = document.domain;
	if(dm=="www.speedmis.com") {
		$('input#MisSession_UserID').val('방문고객');
		$('input#MisSession_UserPW').val('1234');
		if(getUrlParameter("isStop")=="Y") return false;
		submit_ok();
	}
}




/*
 * Note that this is toastr v2.1.3, the "latest" version in url has no more maintenance,
 * please go to https://cdnjs.com/libraries/toastr.js and pick a certain version you want to use,
 * make sure you copy the url from the website since the url may change between versions.
 * */
!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return g({type:O.error,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=m()),v=e("#"+t.containerId),v.length?v:(n&&(v=d(t)),v)}function o(e,t,n){return g({type:O.info,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t})}function s(e){C=e}function i(e,t,n){return g({type:O.success,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return g({type:O.warning,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e,t){var o=m();v||n(o),u(e,o,t)||l(o)}function c(t){var o=m();return v||n(o),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function l(t){for(var n=v.children(),o=n.length-1;o>=0;o--)u(e(n[o]),t)}function u(t,n,o){var s=!(!o||!o.force)&&o.force;return!(!t||!s&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0)}function d(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1}}function f(e){C&&C(e)}function g(t){function o(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(){c(),u(),d(),p(),g(),C(),l(),i()}function i(){var e="";switch(t.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}I.attr("aria-live",e)}function a(){E.closeOnHover&&I.hover(H,D),!E.onclick&&E.tapToDismiss&&I.click(b),E.closeButton&&j&&j.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),E.onCloseClick&&E.onCloseClick(e),b(!0)}),E.onclick&&I.click(function(e){E.onclick(e),b()})}function r(){I.hide(),I[E.showMethod]({duration:E.showDuration,easing:E.showEasing,complete:E.onShown}),E.timeOut>0&&(k=setTimeout(b,E.timeOut),F.maxHideTime=parseFloat(E.timeOut),F.hideEta=(new Date).getTime()+F.maxHideTime,E.progressBar&&(F.intervalId=setInterval(x,10)))}function c(){t.iconClass&&I.addClass(E.toastClass).addClass(y)}function l(){E.newestOnTop?v.prepend(I):v.append(I)}function u(){if(t.title){var e=t.title;E.escapeHtml&&(e=o(t.title)),M.append(e).addClass(E.titleClass),I.append(M)}}function d(){if(t.message){var e=t.message;E.escapeHtml&&(e=o(t.message)),B.append(e).addClass(E.messageClass),I.append(B)}}function p(){E.closeButton&&(j.addClass(E.closeClass).attr("role","button"),I.prepend(j))}function g(){E.progressBar&&(q.addClass(E.progressClass),I.prepend(q))}function C(){E.rtl&&I.addClass("rtl")}function O(e,t){if(e.preventDuplicates){if(t.message===w)return!0;w=t.message}return!1}function b(t){var n=t&&E.closeMethod!==!1?E.closeMethod:E.hideMethod,o=t&&E.closeDuration!==!1?E.closeDuration:E.hideDuration,s=t&&E.closeEasing!==!1?E.closeEasing:E.hideEasing;if(!e(":focus",I).length||t)return clearTimeout(F.intervalId),I[n]({duration:o,easing:s,complete:function(){h(I),clearTimeout(k),E.onHidden&&"hidden"!==P.state&&E.onHidden(),P.state="hidden",P.endTime=new Date,f(P)}})}function D(){(E.timeOut>0||E.extendedTimeOut>0)&&(k=setTimeout(b,E.extendedTimeOut),F.maxHideTime=parseFloat(E.extendedTimeOut),F.hideEta=(new Date).getTime()+F.maxHideTime)}function H(){clearTimeout(k),F.hideEta=0,I.stop(!0,!0)[E.showMethod]({duration:E.showDuration,easing:E.showEasing})}function x(){var e=(F.hideEta-(new Date).getTime())/F.maxHideTime*100;q.width(e+"%")}var E=m(),y=t.iconClass||E.iconClass;if("undefined"!=typeof t.optionsOverride&&(E=e.extend(E,t.optionsOverride),y=t.optionsOverride.iconClass||y),!O(E,t)){T++,v=n(E,!0);var k=null,I=e("<div/>"),M=e("<div/>"),B=e("<div/>"),q=e("<div/>"),j=e(E.closeHtml),F={intervalId:null,hideEta:null,maxHideTime:null},P={toastId:T,state:"visible",startTime:new Date,options:E,map:t};return s(),r(),a(),f(P),E.debug&&console&&console.log(P),I}}function m(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),w=void 0))}var v,C,w,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:c,error:t,getContainer:n,info:o,options:{},subscribe:s,success:i,version:"2.1.3",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});

