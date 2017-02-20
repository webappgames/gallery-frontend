var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TOWNS;
(function (TOWNS) {
    var CDN;
    (function (CDN) {
        var URL = 'http://cdn.pavolhejny.com/';
        var FILE_ACCEPTED_TYPES = [
            'image/jpeg',
            'image/jpg',
            'image/gif',
            'image/png'
        ];
        var FILE_MAX_SIZE = 25 * Math.pow(1024, 2 /*MB*/) * 0.9;
        var REQUEST_MAX_SIZE = FILE_MAX_SIZE * 10;
        function uploadFiles(files, onProgress, onDone, onFail) {
            // process all File 05-objects
            var formData = new FormData();
            var files_key = {};
            var request_size = 1024; //todo is it OK?
            //var filenames = [];
            for (var i = 0; i < files.length; i++) {
                if (FILE_ACCEPTED_TYPES.indexOf(files[i].type) == -1) {
                    onFail('Můžete nahrávat pouze obrázky.');
                    return;
                }
                if (files[i].size > FILE_MAX_SIZE) {
                    onFail('Celková velikost jednoho souboru může být maximálně' + ' ' + bytesToSize(FILE_MAX_SIZE));
                    return;
                }
                request_size += files[i].size;
                var key = 'image' + i;
                formData.append(key, files[i]);
                files_key[key] = files[i];
            } //r(files_key);
            //filenames = filenames.join(', ');
            if (request_size > REQUEST_MAX_SIZE) {
                //alert('Soubory jsou moc velké.');
                onFail('Celková velikost všech souborů může být maximálně ' + ' ' + bytesToSize(REQUEST_MAX_SIZE));
                return;
            }
            // now post a new XHR request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', URL);
            //var message = Message.info();
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable) {
                    var progress = (event.loaded / event.total * 100 | 0);
                    onProgress(progress);
                }
            };
            xhr.onload = function () {
                if (xhr.status === 200) {
                    try {
                        console.log('all done: ' + xhr.status);
                        var responseObject = (JSON.parse(xhr.response));
                        var responseArray = [];
                        var index = void 0;
                        for (var key_1 in responseObject) {
                            index = parseInt(key_1.split('image').join(''));
                            responseArray[index] = responseObject[key_1];
                        }
                        onDone(responseArray);
                        return;
                    }
                    catch (error) {
                        onFail('Chyba při nahrávání.');
                        throw error;
                        return;
                    }
                }
                else {
                    onFail('Chyba při nahrávání (HTTP status = ' + xhr.status + ').');
                    return;
                }
            };
            xhr.send(formData);
        }
        CDN.uploadFiles = uploadFiles;
    })(CDN = TOWNS.CDN || (TOWNS.CDN = {}));
})(TOWNS || (TOWNS = {}));
/*! URI.js v1.17.1 http://medialize.github.io/URI.js/ */
/* build contains: IPv6.js, punycode.js, SecondLevelDomains.js, URI.js */
/* jshint ignore:start */
(function (k, n) { "object" === typeof exports ? module.exports = n() : "function" === typeof define && define.amd ? define(n) : k.IPv6 = n(k); })(this, function (k) {
    var n = k && k.IPv6;
    return { best: function (g) {
            g = g.toLowerCase().split(":");
            var f = g.length, d = 8;
            "" === g[0] && "" === g[1] && "" === g[2] ? (g.shift(), g.shift()) : "" === g[0] && "" === g[1] ? g.shift() : "" === g[f - 1] && "" === g[f - 2] && g.pop();
            f = g.length;
            -1 !== g[f - 1].indexOf(".") && (d = 7);
            var h;
            for (h = 0; h < f && "" !== g[h]; h++)
                ;
            if (h < d)
                for (g.splice(h, 1, "0000"); g.length < d;)
                    g.splice(h, 0, "0000");
            for (h = 0; h < d; h++) {
                for (var f = g[h].split(""), k = 0; 3 > k; k++)
                    if ("0" === f[0] && 1 < f.length)
                        f.splice(0, 1);
                    else
                        break;
                g[h] = f.join("");
            }
            var f = -1, p = k = 0, n = -1, u = !1;
            for (h = 0; h < d; h++)
                u ? "0" === g[h] ? p += 1 : (u = !1, p > k && (f = n, k = p)) : "0" === g[h] && (u = !0, n = h, p = 1);
            p > k && (f = n, k = p);
            1 < k && g.splice(f, k, "");
            f = g.length;
            d = "";
            "" === g[0] && (d = ":");
            for (h = 0; h < f; h++) {
                d += g[h];
                if (h === f - 1)
                    break;
                d += ":";
            }
            "" === g[f - 1] && (d += ":");
            return d;
        }, noConflict: function () { k.IPv6 === this && (k.IPv6 = n); return this; } };
});
(function (k) {
    function n(d) { throw new RangeError(e[d]); }
    function g(d, e) { for (var f = d.length, h = []; f--;)
        h[f] = e(d[f]); return h; }
    function f(d, e) { var f = d.split("@"), h = ""; 1 < f.length && (h = f[0] + "@", d = f[1]); d = d.replace(H, "."); f = d.split("."); f = g(f, e).join("."); return h + f; }
    function d(d) { for (var e = [], f = 0, h = d.length, g, a; f < h;)
        g = d.charCodeAt(f++), 55296 <= g && 56319 >= g && f < h ? (a = d.charCodeAt(f++), 56320 == (a & 64512) ? e.push(((g & 1023) << 10) + (a & 1023) + 65536) : (e.push(g), f--)) : e.push(g); return e; }
    function h(d) {
        return g(d, function (d) {
            var e = "";
            65535 < d && (d -= 65536, e += t(d >>> 10 & 1023 | 55296), d = 56320 | d & 1023);
            return e += t(d);
        }).join("");
    }
    function w(d, e) { return d + 22 + 75 * (26 > d) - ((0 != e) << 5); }
    function p(d, e, f) { var h = 0; d = f ? r(d / 700) : d >> 1; for (d += r(d / e); 455 < d; h += 36)
        d = r(d / 35); return r(h + 36 * d / (d + 38)); }
    function D(d) {
        var e = [], f = d.length, g, k = 0, a = 128, b = 72, c, l, m, q, y;
        c = d.lastIndexOf("-");
        0 > c && (c = 0);
        for (l = 0; l < c; ++l)
            128 <= d.charCodeAt(l) && n("not-basic"), e.push(d.charCodeAt(l));
        for (c = 0 < c ? c + 1 : 0; c < f;) {
            l = k;
            g = 1;
            for (m = 36;; m += 36) {
                c >= f && n("invalid-input");
                q = d.charCodeAt(c++);
                q = 10 > q - 48 ? q - 22 : 26 > q - 65 ? q - 65 : 26 > q - 97 ? q - 97 : 36;
                (36 <= q || q > r((2147483647 - k) / g)) && n("overflow");
                k += q * g;
                y = m <= b ? 1 : m >= b + 26 ? 26 : m - b;
                if (q < y)
                    break;
                q = 36 - y;
                g > r(2147483647 / q) && n("overflow");
                g *= q;
            }
            g = e.length + 1;
            b = p(k - l, g, 0 == l);
            r(k / g) > 2147483647 - a && n("overflow");
            a += r(k / g);
            k %= g;
            e.splice(k++, 0, a);
        }
        return h(e);
    }
    function u(e) {
        var f, g, h, k, a, b, c, l, m, q = [], y, E, I;
        e = d(e);
        y = e.length;
        f = 128;
        g = 0;
        a = 72;
        for (b = 0; b < y; ++b)
            m = e[b], 128 > m && q.push(t(m));
        for ((h = k = q.length) && q.push("-"); h < y;) {
            c = 2147483647;
            for (b = 0; b < y; ++b)
                m = e[b], m >= f && m < c && (c = m);
            E = h + 1;
            c - f > r((2147483647 - g) / E) && n("overflow");
            g += (c - f) * E;
            f = c;
            for (b = 0; b < y; ++b)
                if (m = e[b], m < f && 2147483647 < ++g && n("overflow"), m == f) {
                    l = g;
                    for (c = 36;; c += 36) {
                        m = c <= a ? 1 : c >= a + 26 ? 26 : c - a;
                        if (l < m)
                            break;
                        I = l - m;
                        l = 36 - m;
                        q.push(t(w(m + I % l, 0)));
                        l = r(I / l);
                    }
                    q.push(t(w(l, 0)));
                    a = p(g, E, h == k);
                    g = 0;
                    ++h;
                }
            ++g;
            ++f;
        }
        return q.join("");
    }
    var B = "object" == typeof exports && exports && !exports.nodeType && exports, C = "object" == typeof module && module && !module.nodeType && module, z = "object" == typeof global && global;
    if (z.global === z || z.window === z || z.self === z)
        k =
            z;
    var v, A = /^xn--/, F = /[^\x20-\x7E]/, H = /[\x2E\u3002\uFF0E\uFF61]/g, e = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, r = Math.floor, t = String.fromCharCode, x;
    v = { version: "1.3.2", ucs2: { decode: d, encode: h }, decode: D, encode: u, toASCII: function (d) { return f(d, function (d) { return F.test(d) ? "xn--" + u(d) : d; }); }, toUnicode: function (d) { return f(d, function (d) { return A.test(d) ? D(d.slice(4).toLowerCase()) : d; }); } };
    if ("function" ==
        typeof define && "object" == typeof define.amd && define.amd)
        define("punycode", function () { return v; });
    else if (B && C)
        if (module.exports == B)
            C.exports = v;
        else
            for (x in v)
                v.hasOwnProperty(x) && (B[x] = v[x]);
    else
        k.punycode = v;
})(this);
(function (k, n) { "object" === typeof exports ? module.exports = n() : "function" === typeof define && define.amd ? define(n) : k.SecondLevelDomains = n(k); })(this, function (k) {
    var n = k && k.SecondLevelDomains, g = { list: { ac: " com gov mil net org ", ae: " ac co gov mil name net org pro sch ", af: " com edu gov net org ", al: " com edu gov mil net org ", ao: " co ed gv it og pb ", ar: " com edu gob gov int mil net org tur ", at: " ac co gv or ", au: " asn com csiro edu gov id net org ", ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
            bb: " biz co com edu gov info net org store tv ", bh: " biz cc com edu gov info net org ", bn: " com edu gov net org ", bo: " com edu gob gov int mil net org tv ", br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ", bs: " com edu gov net org ", bz: " du et om ov rg ", ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
            ck: " biz co edu gen gov info net org ", cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ", co: " com edu gov mil net nom org ", cr: " ac c co ed fi go or sa ", cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ", "do": " art com edu gob gov mil net org sld web ", dz: " art asso com edu gov net org pol ", ec: " com edu fin gov info med mil net org pro ", eg: " com edu eun gov mil name net org sci ", er: " com edu gov ind mil net org rochest w ",
            es: " com edu gob nom org ", et: " biz com edu gov info name net org ", fj: " ac biz com info mil name net org pro ", fk: " ac co gov net nom org ", fr: " asso com f gouv nom prd presse tm ", gg: " co net org ", gh: " com edu gov mil org ", gn: " ac com gov net org ", gr: " com edu gov mil net org ", gt: " com edu gob ind mil net org ", gu: " com edu gov net org ", hk: " com edu gov idv net org ", hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
            id: " ac co go mil net or sch web ", il: " ac co gov idf k12 muni net org ", "in": " ac co edu ernet firm gen gov i ind mil net nic org res ", iq: " com edu gov i mil net org ", ir: " ac co dnssec gov i id net org sch ", it: " edu gov ", je: " co net org ", jo: " com edu gov mil name net org sch ", jp: " ac ad co ed go gr lg ne or ", ke: " ac co go info me mobi ne or sc ", kh: " com edu gov mil net org per ", ki: " biz com de edu gov info mob net org tel ", km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
            kn: " edu gov net org ", kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ", kw: " com edu gov net org ", ky: " com edu gov net org ", kz: " com edu gov mil net org ", lb: " com edu gov net org ", lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ", lr: " com edu gov net org ", lv: " asn com conf edu gov id mil net org ", ly: " com edu gov id med net org plc sch ", ma: " ac co gov m net org press ",
            mc: " asso tm ", me: " ac co edu gov its net org priv ", mg: " com edu gov mil nom org prd tm ", mk: " com edu gov inf name net org pro ", ml: " com edu gov net org presse ", mn: " edu gov org ", mo: " com edu gov net org ", mt: " com edu gov net org ", mv: " aero biz com coop edu gov info int mil museum name net org pro ", mw: " ac co com coop edu gov int museum net org ", mx: " com edu gob net org ", my: " com edu gov mil name net org sch ", nf: " arts com firm info net other per rec store web ", ng: " biz com edu gov mil mobi name net org sch ",
            ni: " ac co com edu gob mil net nom org ", np: " com edu gov mil net org ", nr: " biz com edu gov info net org ", om: " ac biz co com edu gov med mil museum net org pro sch ", pe: " com edu gob mil net nom org sld ", ph: " com edu gov i mil net ngo org ", pk: " biz com edu fam gob gok gon gop gos gov net org web ", pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ", pr: " ac biz com edu est gov info isla name net org pro prof ",
            ps: " com edu gov net org plo sec ", pw: " belau co ed go ne or ", ro: " arts com firm info nom nt org rec store tm www ", rs: " ac co edu gov in org ", sb: " com edu gov net org ", sc: " com edu gov net org ", sh: " co com edu gov net nom org ", sl: " com edu gov net org ", st: " co com consulado edu embaixada gov mil net org principe saotome store ", sv: " com edu gob org red ", sz: " ac co org ", tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ", tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
            tw: " club com ebiz edu game gov idv mil net org ", mu: " ac co com gov net or org ", mz: " ac co edu gov org ", na: " co com ", nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ", pa: " abo ac com edu gob ing med net nom org sld ", pt: " com edu gov int net nome org publ ", py: " com edu gov mil net org ", qa: " com edu gov mil net org ", re: " asso com nom ", ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
            rw: " ac co com edu gouv gov int mil net ", sa: " com edu gov med net org pub sch ", sd: " com edu gov info med net org tv ", se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ", sg: " com edu gov idn net org per ", sn: " art com edu gouv org perso univ ", sy: " com edu gov mil net news org ", th: " ac co go in mi net or ", tj: " ac biz co com edu go gov info int mil name net nic org test web ", tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
            tz: " ac co go ne or ", ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ", ug: " ac co go ne or org sc ", uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
            us: " dni fed isa kids nsn ", uy: " com edu gub mil net org ", ve: " co com edu gob info mil net org web ", vi: " co com k12 net org ", vn: " ac biz com edu gov health info int name net org pro ", ye: " co com gov ltd me net org plc ", yu: " ac co edu gov org ", za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ", zm: " ac co com edu gov net org sch " }, has: function (f) {
            var d = f.lastIndexOf(".");
            if (0 >= d || d >= f.length - 1)
                return !1;
            var h = f.lastIndexOf(".", d - 1);
            if (0 >= h || h >= d - 1)
                return !1;
            var k = g.list[f.slice(d + 1)];
            return k ? 0 <= k.indexOf(" " + f.slice(h + 1, d) + " ") : !1;
        }, is: function (f) { var d = f.lastIndexOf("."); if (0 >= d || d >= f.length - 1 || 0 <= f.lastIndexOf(".", d - 1))
            return !1; var h = g.list[f.slice(d + 1)]; return h ? 0 <= h.indexOf(" " + f.slice(0, d) + " ") : !1; }, get: function (f) {
            var d = f.lastIndexOf(".");
            if (0 >= d || d >= f.length - 1)
                return null;
            var h = f.lastIndexOf(".", d - 1);
            if (0 >= h || h >= d - 1)
                return null;
            var k = g.list[f.slice(d + 1)];
            return !k || 0 > k.indexOf(" " + f.slice(h +
                1, d) + " ") ? null : f.slice(h + 1);
        }, noConflict: function () { k.SecondLevelDomains === this && (k.SecondLevelDomains = n); return this; } };
    return g;
});
(function (k, n) { "object" === typeof exports ? module.exports = n(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" === typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], n) : k.URI = n(k.punycode, k.IPv6, k.SecondLevelDomains, k); })(this, function (k, n, g, f) {
    function d(a, b) {
        var c = 1 <= arguments.length, l = 2 <= arguments.length;
        if (!(this instanceof d))
            return c ? l ? new d(a, b) : new d(a) : new d;
        if (void 0 === a) {
            if (c)
                throw new TypeError("undefined is not a valid argument for URI");
            a = "undefined" !== typeof location ? location.href + "" : "";
        }
        this.href(a);
        return void 0 !== b ? this.absoluteTo(b) : this;
    }
    function h(a) { return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"); }
    function w(a) { return void 0 === a ? "Undefined" : String(Object.prototype.toString.call(a)).slice(8, -1); }
    function p(a) { return "Array" === w(a); }
    function D(a, b) {
        var c = {}, d, m;
        if ("RegExp" === w(b))
            c = null;
        else if (p(b))
            for (d = 0, m = b.length; d < m; d++)
                c[b[d]] = !0;
        else
            c[b] = !0;
        d = 0;
        for (m = a.length; d < m; d++)
            if (c && void 0 !== c[a[d]] || !c && b.test(a[d]))
                a.splice(d, 1), m--, d--;
        return a;
    }
    function u(a, b) { var c, d; if (p(b)) {
        c = 0;
        for (d = b.length; c < d; c++)
            if (!u(a, b[c]))
                return !1;
        return !0;
    } var m = w(b); c = 0; for (d = a.length; c < d; c++)
        if ("RegExp" === m) {
            if ("string" === typeof a[c] && a[c].match(b))
                return !0;
        }
        else if (a[c] === b)
            return !0; return !1; }
    function B(a, b) { if (!p(a) || !p(b) || a.length !== b.length)
        return !1; a.sort(); b.sort(); for (var c = 0, d = a.length; c < d; c++)
        if (a[c] !== b[c])
            return !1; return !0; }
    function C(a) { return a.replace(/^\/+|\/+$/g, ""); }
    function z(a) { return escape(a); }
    function v(a) {
        return encodeURIComponent(a).replace(/[!'()*]/g, z).replace(/\*/g, "%2A");
    }
    function A(a) { return function (b, c) { if (void 0 === b)
        return this._parts[a] || ""; this._parts[a] = b || null; this.build(!c); return this; }; }
    function F(a, b) { return function (c, d) { if (void 0 === c)
        return this._parts[a] || ""; null !== c && (c += "", c.charAt(0) === b && (c = c.substring(1))); this._parts[a] = c; this.build(!d); return this; }; }
    var H = f && f.URI;
    d.version = "1.17.1";
    var e = d.prototype, r = Object.prototype.hasOwnProperty;
    d._parts = function () {
        return { protocol: null, username: null, password: null, hostname: null, urn: null,
            port: null, path: null, query: null, fragment: null, duplicateQueryParameters: d.duplicateQueryParameters, escapeQuerySpace: d.escapeQuerySpace };
    };
    d.duplicateQueryParameters = !1;
    d.escapeQuerySpace = !0;
    d.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
    d.idn_expression = /[^a-z0-9\.-]/i;
    d.punycode_expression = /(xn--)/i;
    d.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    d.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    d.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;
    d.findUri = { start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi, end: /[\s\r\n]|$/, trim: /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/ };
    d.defaultPorts = { http: "80", https: "443", ftp: "21", gopher: "70", ws: "80", wss: "443" };
    d.invalid_hostname_characters =
        /[^a-zA-Z0-9\.-]/;
    d.domAttributes = { a: "href", blockquote: "cite", link: "href", base: "href", script: "src", form: "action", img: "src", area: "href", iframe: "src", embed: "src", source: "src", track: "src", input: "src", audio: "src", video: "src" };
    d.getDomAttribute = function (a) { if (a && a.nodeName) {
        var b = a.nodeName.toLowerCase();
        return "input" === b && "image" !== a.type ? void 0 : d.domAttributes[b];
    } };
    d.encode = v;
    d.decode = decodeURIComponent;
    d.iso8859 = function () { d.encode = escape; d.decode = unescape; };
    d.unicode = function () {
        d.encode = v;
        d.decode =
            decodeURIComponent;
    };
    d.characters = { pathname: { encode: { expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig, map: { "%24": "$", "%26": "&", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%3A": ":", "%40": "@" } }, decode: { expression: /[\/\?#]/g, map: { "/": "%2F", "?": "%3F", "#": "%23" } } }, reserved: { encode: { expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig, map: { "%3A": ":", "%2F": "/", "%3F": "?", "%23": "#", "%5B": "[", "%5D": "]", "%40": "@", "%21": "!", "%24": "$", "%26": "&", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",",
                    "%3B": ";", "%3D": "=" } } }, urnpath: { encode: { expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig, map: { "%21": "!", "%24": "$", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%40": "@" } }, decode: { expression: /[\/\?#:]/g, map: { "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" } } } };
    d.encodeQuery = function (a, b) { var c = d.encode(a + ""); void 0 === b && (b = d.escapeQuerySpace); return b ? c.replace(/%20/g, "+") : c; };
    d.decodeQuery = function (a, b) {
        a += "";
        void 0 === b && (b = d.escapeQuerySpace);
        try {
            return d.decode(b ? a.replace(/\+/g, "%20") : a);
        }
        catch (c) {
            return a;
        }
    };
    var t = { encode: "encode", decode: "decode" }, x, G = function (a, b) { return function (c) { try {
        return d[b](c + "").replace(d.characters[a][b].expression, function (c) { return d.characters[a][b].map[c]; });
    }
    catch (l) {
        return c;
    } }; };
    for (x in t)
        d[x + "PathSegment"] = G("pathname", t[x]), d[x + "UrnPathSegment"] = G("urnpath", t[x]);
    t = function (a, b, c) { return function (l) { var m; m = c ? function (a) { return d[b](d[c](a)); } : d[b]; l = (l + "").split(a); for (var e = 0, f = l.length; e < f; e++)
        l[e] = m(l[e]); return l.join(a); }; };
    d.decodePath =
        t("/", "decodePathSegment");
    d.decodeUrnPath = t(":", "decodeUrnPathSegment");
    d.recodePath = t("/", "encodePathSegment", "decode");
    d.recodeUrnPath = t(":", "encodeUrnPathSegment", "decode");
    d.encodeReserved = G("reserved", "encode");
    d.parse = function (a, b) {
        var c;
        b || (b = {});
        c = a.indexOf("#");
        -1 < c && (b.fragment = a.substring(c + 1) || null, a = a.substring(0, c));
        c = a.indexOf("?");
        -1 < c && (b.query = a.substring(c + 1) || null, a = a.substring(0, c));
        "//" === a.substring(0, 2) ? (b.protocol = null, a = a.substring(2), a = d.parseAuthority(a, b)) : (c = a.indexOf(":"),
            -1 < c && (b.protocol = a.substring(0, c) || null, b.protocol && !b.protocol.match(d.protocol_expression) ? b.protocol = void 0 : "//" === a.substring(c + 1, c + 3) ? (a = a.substring(c + 3), a = d.parseAuthority(a, b)) : (a = a.substring(c + 1), b.urn = !0)));
        b.path = a;
        return b;
    };
    d.parseHost = function (a, b) {
        a = a.replace(/\\/g, "/");
        var c = a.indexOf("/"), d;
        -1 === c && (c = a.length);
        if ("[" === a.charAt(0))
            d = a.indexOf("]"), b.hostname = a.substring(1, d) || null, b.port = a.substring(d + 2, c) || null, "/" === b.port && (b.port = null);
        else {
            var m = a.indexOf(":");
            d = a.indexOf("/");
            m = a.indexOf(":", m + 1);
            -1 !== m && (-1 === d || m < d) ? (b.hostname = a.substring(0, c) || null, b.port = null) : (d = a.substring(0, c).split(":"), b.hostname = d[0] || null, b.port = d[1] || null);
        }
        b.hostname && "/" !== a.substring(c).charAt(0) && (c++, a = "/" + a);
        return a.substring(c) || "/";
    };
    d.parseAuthority = function (a, b) { a = d.parseUserinfo(a, b); return d.parseHost(a, b); };
    d.parseUserinfo = function (a, b) {
        var c = a.indexOf("/"), l = a.lastIndexOf("@", -1 < c ? c : a.length - 1);
        -1 < l && (-1 === c || l < c) ? (c = a.substring(0, l).split(":"), b.username = c[0] ? d.decode(c[0]) : null,
            c.shift(), b.password = c[0] ? d.decode(c.join(":")) : null, a = a.substring(l + 1)) : (b.username = null, b.password = null);
        return a;
    };
    d.parseQuery = function (a, b) { if (!a)
        return {}; a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, ""); if (!a)
        return {}; for (var c = {}, l = a.split("&"), m = l.length, e, f, g = 0; g < m; g++)
        if (e = l[g].split("="), f = d.decodeQuery(e.shift(), b), e = e.length ? d.decodeQuery(e.join("="), b) : null, r.call(c, f)) {
            if ("string" === typeof c[f] || null === c[f])
                c[f] = [c[f]];
            c[f].push(e);
        }
        else
            c[f] = e; return c; };
    d.build = function (a) {
        var b = "";
        a.protocol && (b += a.protocol + ":");
        a.urn || !b && !a.hostname || (b += "//");
        b += d.buildAuthority(a) || "";
        "string" === typeof a.path && ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (b += "/"), b += a.path);
        "string" === typeof a.query && a.query && (b += "?" + a.query);
        "string" === typeof a.fragment && a.fragment && (b += "#" + a.fragment);
        return b;
    };
    d.buildHost = function (a) { var b = ""; if (a.hostname)
        b = d.ip6_expression.test(a.hostname) ? b + ("[" + a.hostname + "]") : b + a.hostname;
    else
        return ""; a.port && (b += ":" + a.port); return b; };
    d.buildAuthority =
        function (a) { return d.buildUserinfo(a) + d.buildHost(a); };
    d.buildUserinfo = function (a) { var b = ""; a.username && (b += d.encode(a.username), a.password && (b += ":" + d.encode(a.password)), b += "@"); return b; };
    d.buildQuery = function (a, b, c) { var l = "", m, e, f, g; for (e in a)
        if (r.call(a, e) && e)
            if (p(a[e]))
                for (m = {}, f = 0, g = a[e].length; f < g; f++)
                    void 0 !== a[e][f] && void 0 === m[a[e][f] + ""] && (l += "&" + d.buildQueryParameter(e, a[e][f], c), !0 !== b && (m[a[e][f] + ""] = !0));
            else
                void 0 !== a[e] && (l += "&" + d.buildQueryParameter(e, a[e], c)); return l.substring(1); };
    d.buildQueryParameter = function (a, b, c) { return d.encodeQuery(a, c) + (null !== b ? "=" + d.encodeQuery(b, c) : ""); };
    d.addQuery = function (a, b, c) { if ("object" === typeof b)
        for (var l in b)
            r.call(b, l) && d.addQuery(a, l, b[l]);
    else if ("string" === typeof b)
        void 0 === a[b] ? a[b] = c : ("string" === typeof a[b] && (a[b] = [a[b]]), p(c) || (c = [c]), a[b] = (a[b] || []).concat(c));
    else
        throw new TypeError("URI.addQuery() accepts an object, string as the name parameter"); };
    d.removeQuery = function (a, b, c) {
        var l;
        if (p(b))
            for (c = 0, l = b.length; c < l; c++)
                a[b[c]] =
                    void 0;
        else if ("RegExp" === w(b))
            for (l in a)
                b.test(l) && (a[l] = void 0);
        else if ("object" === typeof b)
            for (l in b)
                r.call(b, l) && d.removeQuery(a, l, b[l]);
        else if ("string" === typeof b)
            void 0 !== c ? "RegExp" === w(c) ? !p(a[b]) && c.test(a[b]) ? a[b] = void 0 : a[b] = D(a[b], c) : a[b] !== String(c) || p(c) && 1 !== c.length ? p(a[b]) && (a[b] = D(a[b], c)) : a[b] = void 0 : a[b] = void 0;
        else
            throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter");
    };
    d.hasQuery = function (a, b, c, l) {
        switch (w(b)) {
            case "String": break;
            case "RegExp":
                for (var e in a)
                    if (r.call(a, e) && b.test(e) && (void 0 === c || d.hasQuery(a, e, c)))
                        return !0;
                return !1;
            case "Object":
                for (var f in b)
                    if (r.call(b, f) && !d.hasQuery(a, f, b[f]))
                        return !1;
                return !0;
            default: throw new TypeError("URI.hasQuery() accepts a string, regular expression or object as the name parameter");
        }
        switch (w(c)) {
            case "Undefined": return b in a;
            case "Boolean": return a = !(p(a[b]) ? !a[b].length : !a[b]), c === a;
            case "Function": return !!c(a[b], b, a);
            case "Array": return p(a[b]) ? (l ? u : B)(a[b], c) : !1;
            case "RegExp": return p(a[b]) ?
                l ? u(a[b], c) : !1 : !(!a[b] || !a[b].match(c));
            case "Number": c = String(c);
            case "String": return p(a[b]) ? l ? u(a[b], c) : !1 : a[b] === c;
            default: throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
        }
    };
    d.commonPath = function (a, b) {
        var c = Math.min(a.length, b.length), d;
        for (d = 0; d < c; d++)
            if (a.charAt(d) !== b.charAt(d)) {
                d--;
                break;
            }
        if (1 > d)
            return a.charAt(0) === b.charAt(0) && "/" === a.charAt(0) ? "/" : "";
        if ("/" !== a.charAt(d) || "/" !== b.charAt(d))
            d = a.substring(0, d).lastIndexOf("/");
        return a.substring(0, d + 1);
    };
    d.withinString = function (a, b, c) { c || (c = {}); var l = c.start || d.findUri.start, e = c.end || d.findUri.end, f = c.trim || d.findUri.trim, g = /[a-z0-9-]=["']?$/i; for (l.lastIndex = 0;;) {
        var h = l.exec(a);
        if (!h)
            break;
        h = h.index;
        if (c.ignoreHtml) {
            var k = a.slice(Math.max(h - 3, 0), h);
            if (k && g.test(k))
                continue;
        }
        var k = h + a.slice(h).search(e), n = a.slice(h, k).replace(f, "");
        c.ignore && c.ignore.test(n) || (k = h + n.length, n = b(n, h, k, a), a = a.slice(0, h) + n + a.slice(k), l.lastIndex = h + n.length);
    } l.lastIndex = 0; return a; };
    d.ensureValidHostname =
        function (a) { if (a.match(d.invalid_hostname_characters)) {
            if (!k)
                throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
            if (k.toASCII(a).match(d.invalid_hostname_characters))
                throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
        } };
    d.noConflict = function (a) {
        if (a)
            return a = { URI: this.noConflict() }, f.URITemplate && "function" === typeof f.URITemplate.noConflict && (a.URITemplate = f.URITemplate.noConflict()), f.IPv6 && "function" ===
                typeof f.IPv6.noConflict && (a.IPv6 = f.IPv6.noConflict()), f.SecondLevelDomains && "function" === typeof f.SecondLevelDomains.noConflict && (a.SecondLevelDomains = f.SecondLevelDomains.noConflict()), a;
        f.URI === this && (f.URI = H);
        return this;
    };
    e.build = function (a) { if (!0 === a)
        this._deferred_build = !0;
    else if (void 0 === a || this._deferred_build)
        this._string = d.build(this._parts), this._deferred_build = !1; return this; };
    e.clone = function () { return new d(this); };
    e.valueOf = e.toString = function () { return this.build(!1)._string; };
    e.protocol =
        A("protocol");
    e.username = A("username");
    e.password = A("password");
    e.hostname = A("hostname");
    e.port = A("port");
    e.query = F("query", "?");
    e.fragment = F("fragment", "#");
    e.search = function (a, b) { var c = this.query(a, b); return "string" === typeof c && c.length ? "?" + c : c; };
    e.hash = function (a, b) { var c = this.fragment(a, b); return "string" === typeof c && c.length ? "#" + c : c; };
    e.pathname = function (a, b) {
        if (void 0 === a || !0 === a) {
            var c = this._parts.path || (this._parts.hostname ? "/" : "");
            return a ? (this._parts.urn ? d.decodeUrnPath : d.decodePath)(c) : c;
        }
        this._parts.path =
            this._parts.urn ? a ? d.recodeUrnPath(a) : "" : a ? d.recodePath(a) : "/";
        this.build(!b);
        return this;
    };
    e.path = e.pathname;
    e.href = function (a, b) {
        var c;
        if (void 0 === a)
            return this.toString();
        this._string = "";
        this._parts = d._parts();
        var l = a instanceof d, e = "object" === typeof a && (a.hostname || a.path || a.pathname);
        a.nodeName && (e = d.getDomAttribute(a), a = a[e] || "", e = !1);
        !l && e && void 0 !== a.pathname && (a = a.toString());
        if ("string" === typeof a || a instanceof String)
            this._parts = d.parse(String(a), this._parts);
        else if (l || e)
            for (c in l = l ? a._parts :
                a, l)
                r.call(this._parts, c) && (this._parts[c] = l[c]);
        else
            throw new TypeError("invalid input");
        this.build(!b);
        return this;
    };
    e.is = function (a) {
        var b = !1, c = !1, e = !1, f = !1, h = !1, k = !1, n = !1, p = !this._parts.urn;
        this._parts.hostname && (p = !1, c = d.ip4_expression.test(this._parts.hostname), e = d.ip6_expression.test(this._parts.hostname), b = c || e, h = (f = !b) && g && g.has(this._parts.hostname), k = f && d.idn_expression.test(this._parts.hostname), n = f && d.punycode_expression.test(this._parts.hostname));
        switch (a.toLowerCase()) {
            case "relative": return p;
            case "absolute": return !p;
            case "domain":
            case "name": return f;
            case "sld": return h;
            case "ip": return b;
            case "ip4":
            case "ipv4":
            case "inet4": return c;
            case "ip6":
            case "ipv6":
            case "inet6": return e;
            case "idn": return k;
            case "url": return !this._parts.urn;
            case "urn": return !!this._parts.urn;
            case "punycode": return n;
        }
        return null;
    };
    var J = e.protocol, K = e.port, L = e.hostname;
    e.protocol = function (a, b) {
        if (void 0 !== a && a && (a = a.replace(/:(\/\/)?$/, ""), !a.match(d.protocol_expression)))
            throw new TypeError('Protocol "' + a + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]");
        return J.call(this, a, b);
    };
    e.scheme = e.protocol;
    e.port = function (a, b) { if (this._parts.urn)
        return void 0 === a ? "" : this; if (void 0 !== a && (0 === a && (a = null), a && (a += "", ":" === a.charAt(0) && (a = a.substring(1)), a.match(/[^0-9]/))))
        throw new TypeError('Port "' + a + '" contains characters other than [0-9]'); return K.call(this, a, b); };
    e.hostname = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        if (void 0 !== a) {
            var c = {};
            if ("/" !== d.parseHost(a, c))
                throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
            a = c.hostname;
        }
        return L.call(this, a, b);
    };
    e.origin = function (a, b) { if (this._parts.urn)
        return void 0 === a ? "" : this; if (void 0 === a) {
        var c = this.protocol();
        return this.authority() ? (c ? c + "://" : "") + this.authority() : "";
    } c = d(a); this.protocol(c.protocol()).authority(c.authority()).build(!b); return this; };
    e.host = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        if (void 0 === a)
            return this._parts.hostname ? d.buildHost(this._parts) : "";
        if ("/" !== d.parseHost(a, this._parts))
            throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
        this.build(!b);
        return this;
    };
    e.authority = function (a, b) { if (this._parts.urn)
        return void 0 === a ? "" : this; if (void 0 === a)
        return this._parts.hostname ? d.buildAuthority(this._parts) : ""; if ("/" !== d.parseAuthority(a, this._parts))
        throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]'); this.build(!b); return this; };
    e.userinfo = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.username)
                return "";
            var c = d.buildUserinfo(this._parts);
            return c.substring(0, c.length -
                1);
        }
        "@" !== a[a.length - 1] && (a += "@");
        d.parseUserinfo(a, this._parts);
        this.build(!b);
        return this;
    };
    e.resource = function (a, b) { var c; if (void 0 === a)
        return this.path() + this.search() + this.hash(); c = d.parse(a); this._parts.path = c.path; this._parts.query = c.query; this._parts.fragment = c.fragment; this.build(!b); return this; };
    e.subdomain = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))
                return "";
            var c = this._parts.hostname.length - this.domain().length - 1;
            return this._parts.hostname.substring(0, c) || "";
        }
        c = this._parts.hostname.length - this.domain().length;
        c = this._parts.hostname.substring(0, c);
        c = new RegExp("^" + h(c));
        a && "." !== a.charAt(a.length - 1) && (a += ".");
        a && d.ensureValidHostname(a);
        this._parts.hostname = this._parts.hostname.replace(c, a);
        this.build(!b);
        return this;
    };
    e.domain = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        "boolean" === typeof a && (b = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))
                return "";
            var c = this._parts.hostname.match(/\./g);
            if (c && 2 > c.length)
                return this._parts.hostname;
            c = this._parts.hostname.length - this.tld(b).length - 1;
            c = this._parts.hostname.lastIndexOf(".", c - 1) + 1;
            return this._parts.hostname.substring(c) || "";
        }
        if (!a)
            throw new TypeError("cannot set domain empty");
        d.ensureValidHostname(a);
        !this._parts.hostname || this.is("IP") ? this._parts.hostname = a : (c = new RegExp(h(this.domain()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a));
        this.build(!b);
        return this;
    };
    e.tld = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        "boolean" === typeof a && (b = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))
                return "";
            var c = this._parts.hostname.lastIndexOf("."), c = this._parts.hostname.substring(c + 1);
            return !0 !== b && g && g.list[c.toLowerCase()] ? g.get(this._parts.hostname) || c : c;
        }
        if (a)
            if (a.match(/[^a-zA-Z0-9-]/))
                if (g && g.is(a))
                    c = new RegExp(h(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a);
                else
                    throw new TypeError('TLD "' + a + '" contains characters other than [A-Z0-9]');
            else {
                if (!this._parts.hostname || this.is("IP"))
                    throw new ReferenceError("cannot set TLD on non-domain host");
                c = new RegExp(h(this.tld()) + "$");
                this._parts.hostname = this._parts.hostname.replace(c, a);
            }
        else
            throw new TypeError("cannot set TLD empty");
        this.build(!b);
        return this;
    };
    e.directory = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path && !this._parts.hostname)
                return "";
            if ("/" === this._parts.path)
                return "/";
            var c = this._parts.path.length - this.filename().length - 1, c = this._parts.path.substring(0, c) || (this._parts.hostname ? "/" : "");
            return a ? d.decodePath(c) : c;
        }
        c = this._parts.path.length -
            this.filename().length;
        c = this._parts.path.substring(0, c);
        c = new RegExp("^" + h(c));
        this.is("relative") || (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a));
        a && "/" !== a.charAt(a.length - 1) && (a += "/");
        a = d.recodePath(a);
        this._parts.path = this._parts.path.replace(c, a);
        this.build(!b);
        return this;
    };
    e.filename = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path)
                return "";
            var c = this._parts.path.lastIndexOf("/"), c = this._parts.path.substring(c + 1);
            return a ?
                d.decodePathSegment(c) : c;
        }
        c = !1;
        "/" === a.charAt(0) && (a = a.substring(1));
        a.match(/\.?\//) && (c = !0);
        var e = new RegExp(h(this.filename()) + "$");
        a = d.recodePath(a);
        this._parts.path = this._parts.path.replace(e, a);
        c ? this.normalizePath(b) : this.build(!b);
        return this;
    };
    e.suffix = function (a, b) {
        if (this._parts.urn)
            return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path)
                return "";
            var c = this.filename(), e = c.lastIndexOf(".");
            if (-1 === e)
                return "";
            c = c.substring(e + 1);
            c = /^[a-z0-9%]+$/i.test(c) ?
                c : "";
            return a ? d.decodePathSegment(c) : c;
        }
        "." === a.charAt(0) && (a = a.substring(1));
        if (c = this.suffix())
            e = a ? new RegExp(h(c) + "$") : new RegExp(h("." + c) + "$");
        else {
            if (!a)
                return this;
            this._parts.path += "." + d.recodePath(a);
        }
        e && (a = d.recodePath(a), this._parts.path = this._parts.path.replace(e, a));
        this.build(!b);
        return this;
    };
    e.segment = function (a, b, c) {
        var d = this._parts.urn ? ":" : "/", e = this.path(), f = "/" === e.substring(0, 1), e = e.split(d);
        void 0 !== a && "number" !== typeof a && (c = b, b = a, a = void 0);
        if (void 0 !== a && "number" !== typeof a)
            throw Error('Bad segment "' +
                a + '", must be 0-based integer');
        f && e.shift();
        0 > a && (a = Math.max(e.length + a, 0));
        if (void 0 === b)
            return void 0 === a ? e : e[a];
        if (null === a || void 0 === e[a])
            if (p(b)) {
                e = [];
                a = 0;
                for (var g = b.length; a < g; a++)
                    if (b[a].length || e.length && e[e.length - 1].length)
                        e.length && !e[e.length - 1].length && e.pop(), e.push(C(b[a]));
            }
            else {
                if (b || "string" === typeof b)
                    b = C(b), "" === e[e.length - 1] ? e[e.length - 1] = b : e.push(b);
            }
        else
            b ? e[a] = C(b) : e.splice(a, 1);
        f && e.unshift("");
        return this.path(e.join(d), c);
    };
    e.segmentCoded = function (a, b, c) {
        var e, f;
        "number" !==
            typeof a && (c = b, b = a, a = void 0);
        if (void 0 === b) {
            a = this.segment(a, b, c);
            if (p(a))
                for (e = 0, f = a.length; e < f; e++)
                    a[e] = d.decode(a[e]);
            else
                a = void 0 !== a ? d.decode(a) : void 0;
            return a;
        }
        if (p(b))
            for (e = 0, f = b.length; e < f; e++)
                b[e] = d.encode(b[e]);
        else
            b = "string" === typeof b || b instanceof String ? d.encode(b) : b;
        return this.segment(a, b, c);
    };
    var M = e.query;
    e.query = function (a, b) {
        if (!0 === a)
            return d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("function" === typeof a) {
            var c = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace), e = a.call(this, c);
            this._parts.query = d.buildQuery(e || c, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            this.build(!b);
            return this;
        }
        return void 0 !== a && "string" !== typeof a ? (this._parts.query = d.buildQuery(a, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!b), this) : M.call(this, a, b);
    };
    e.setQuery = function (a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("string" === typeof a || a instanceof String)
            e[a] = void 0 !== b ? b : null;
        else if ("object" ===
            typeof a)
            for (var f in a)
                r.call(a, f) && (e[f] = a[f]);
        else
            throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this;
    };
    e.addQuery = function (a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        d.addQuery(e, a, void 0 === b ? null : b);
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this;
    };
    e.removeQuery = function (a, b, c) { var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace); d.removeQuery(e, a, b); this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); "string" !== typeof a && (c = b); this.build(!c); return this; };
    e.hasQuery = function (a, b, c) { var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace); return d.hasQuery(e, a, b, c); };
    e.setSearch = e.setQuery;
    e.addSearch = e.addQuery;
    e.removeSearch =
        e.removeQuery;
    e.hasSearch = e.hasQuery;
    e.normalize = function () { return this._parts.urn ? this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build(); };
    e.normalizeProtocol = function (a) { "string" === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a)); return this; };
    e.normalizeHostname = function (a) {
        this._parts.hostname &&
            (this.is("IDN") && k ? this._parts.hostname = k.toASCII(this._parts.hostname) : this.is("IPv6") && n && (this._parts.hostname = n.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!a));
        return this;
    };
    e.normalizePort = function (a) { "string" === typeof this._parts.protocol && this._parts.port === d.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a)); return this; };
    e.normalizePath = function (a) {
        var b = this._parts.path;
        if (!b)
            return this;
        if (this._parts.urn)
            return this._parts.path =
                d.recodeUrnPath(this._parts.path), this.build(!a), this;
        if ("/" === this._parts.path)
            return this;
        var b = d.recodePath(b), c, e = "", f, g;
        "/" !== b.charAt(0) && (c = !0, b = "/" + b);
        if ("/.." === b.slice(-3) || "/." === b.slice(-2))
            b += "/";
        b = b.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");
        c && (e = b.substring(1).match(/^(\.\.\/)+/) || "") && (e = e[0]);
        for (;;) {
            f = b.search(/\/\.\.(\/|$)/);
            if (-1 === f)
                break;
            else if (0 === f) {
                b = b.substring(3);
                continue;
            }
            g = b.substring(0, f).lastIndexOf("/");
            -1 === g && (g = f);
            b = b.substring(0, g) + b.substring(f +
                3);
        }
        c && this.is("relative") && (b = e + b.substring(1));
        this._parts.path = b;
        this.build(!a);
        return this;
    };
    e.normalizePathname = e.normalizePath;
    e.normalizeQuery = function (a) { "string" === typeof this._parts.query && (this._parts.query.length ? this.query(d.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!a)); return this; };
    e.normalizeFragment = function (a) { this._parts.fragment || (this._parts.fragment = null, this.build(!a)); return this; };
    e.normalizeSearch = e.normalizeQuery;
    e.normalizeHash =
        e.normalizeFragment;
    e.iso8859 = function () { var a = d.encode, b = d.decode; d.encode = escape; d.decode = decodeURIComponent; try {
        this.normalize();
    }
    finally {
        d.encode = a, d.decode = b;
    } return this; };
    e.unicode = function () { var a = d.encode, b = d.decode; d.encode = v; d.decode = unescape; try {
        this.normalize();
    }
    finally {
        d.encode = a, d.decode = b;
    } return this; };
    e.readable = function () {
        var a = this.clone();
        a.username("").password("").normalize();
        var b = "";
        a._parts.protocol && (b += a._parts.protocol + "://");
        a._parts.hostname && (a.is("punycode") && k ? (b += k.toUnicode(a._parts.hostname),
            a._parts.port && (b += ":" + a._parts.port)) : b += a.host());
        a._parts.hostname && a._parts.path && "/" !== a._parts.path.charAt(0) && (b += "/");
        b += a.path(!0);
        if (a._parts.query) {
            for (var c = "", e = 0, f = a._parts.query.split("&"), g = f.length; e < g; e++) {
                var h = (f[e] || "").split("="), c = c + ("&" + d.decodeQuery(h[0], this._parts.escapeQuerySpace).replace(/&/g, "%26"));
                void 0 !== h[1] && (c += "=" + d.decodeQuery(h[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"));
            }
            b += "?" + c.substring(1);
        }
        return b += d.decodeQuery(a.hash(), !0);
    };
    e.absoluteTo = function (a) {
        var b = this.clone(), c = ["protocol", "username", "password", "hostname", "port"], e, f;
        if (this._parts.urn)
            throw Error("URNs do not have any generally defined hierarchical components");
        a instanceof d || (a = new d(a));
        b._parts.protocol || (b._parts.protocol = a._parts.protocol);
        if (this._parts.hostname)
            return b;
        for (e = 0; f = c[e]; e++)
            b._parts[f] = a._parts[f];
        b._parts.path ? ".." === b._parts.path.substring(-2) && (b._parts.path += "/") : (b._parts.path = a._parts.path, b._parts.query || (b._parts.query = a._parts.query));
        "/" !== b.path().charAt(0) &&
            (c = (c = a.directory()) ? c : 0 === a.path().indexOf("/") ? "/" : "", b._parts.path = (c ? c + "/" : "") + b._parts.path, b.normalizePath());
        b.build();
        return b;
    };
    e.relativeTo = function (a) {
        var b = this.clone().normalize(), c, e, f;
        if (b._parts.urn)
            throw Error("URNs do not have any generally defined hierarchical components");
        a = (new d(a)).normalize();
        c = b._parts;
        e = a._parts;
        f = b.path();
        a = a.path();
        if ("/" !== f.charAt(0))
            throw Error("URI is already relative");
        if ("/" !== a.charAt(0))
            throw Error("Cannot calculate a URI relative to another relative URI");
        c.protocol === e.protocol && (c.protocol = null);
        if (c.username === e.username && c.password === e.password && null === c.protocol && null === c.username && null === c.password && c.hostname === e.hostname && c.port === e.port)
            c.hostname = null, c.port = null;
        else
            return b.build();
        if (f === a)
            return c.path = "", b.build();
        f = d.commonPath(f, a);
        if (!f)
            return b.build();
        e = e.path.substring(f.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
        c.path = e + c.path.substring(f.length) || "./";
        return b.build();
    };
    e.equals = function (a) {
        var b = this.clone();
        a = new d(a);
        var c = {}, e = {}, f = {}, g;
        b.normalize();
        a.normalize();
        if (b.toString() === a.toString())
            return !0;
        c = b.query();
        e = a.query();
        b.query("");
        a.query("");
        if (b.toString() !== a.toString() || c.length !== e.length)
            return !1;
        c = d.parseQuery(c, this._parts.escapeQuerySpace);
        e = d.parseQuery(e, this._parts.escapeQuerySpace);
        for (g in c)
            if (r.call(c, g)) {
                if (!p(c[g])) {
                    if (c[g] !== e[g])
                        return !1;
                }
                else if (!B(c[g], e[g]))
                    return !1;
                f[g] = !0;
            }
        for (g in e)
            if (r.call(e, g) && !f[g])
                return !1;
        return !0;
    };
    e.duplicateQueryParameters = function (a) {
        this._parts.duplicateQueryParameters =
            !!a;
        return this;
    };
    e.escapeQuerySpace = function (a) { this._parts.escapeQuerySpace = !!a; return this; };
    return d;
});
/* jshint ignore:end */
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Array = (function () {
            function Array(objects) {
                if (objects === void 0) { objects = []; }
                this.objects = [];
                var self = this;
                objects.forEach(function (object) {
                    self.push(object);
                });
                this.reset();
            }
            Array.prototype.next = function () {
                if (this.objects.length <= this.index) {
                    return null;
                }
                return this.objects[this.index++];
            };
            Array.prototype.reset = function () {
                this.index = 0;
            };
            Array.prototype.getAll = function () {
                return this.objects;
            };
            Array.prototype.getObjectByIndex = function (index) {
                return this.objects[index];
            };
            Array.prototype.forEach = function (callback) {
                return this.objects.forEach(callback);
            };
            Array.prototype.sort = function (callback) {
                this.objects.sort(callback);
                return this;
            };
            Array.prototype.push = function (object) {
                this.objects.push(Objects.Object.init(object));
            };
            Array.prototype.findBy = function (key, value) {
                //r('findBy',key,value);
                var value_;
                for (var i = 0, l = this.objects.length; i < l; i++) {
                    value_ = this.objects[i][key];
                    if (typeof value_ !== 'undefined') {
                        if (value_ == value) {
                            return (this.objects[i]);
                        }
                    }
                }
                return null;
            };
            Array.prototype.filterBy = function (key, value) {
                var filtered_objects = new Array();
                var value_;
                for (var i = 0, l = this.objects.length; i < l; i++) {
                    value_ = this.objects[i][key];
                    if (typeof value_ !== 'undefined') {
                        if (value_ == value) {
                            filtered_objects.push(this.objects[i]);
                        }
                    }
                }
                return (filtered_objects);
            };
            Array.prototype.filter = function (callback) {
                var filtered_objects = new Array();
                this.forEach(function (object) {
                    if (callback(object)) {
                        filtered_objects.push(object);
                    }
                });
                return (filtered_objects);
            };
            Array.prototype.getAllWorlds = function () {
                var worlds = [];
                this.forEach(function (object) {
                    if (worlds.indexOf(object.world) === -1) {
                        worlds.push(object.world);
                    }
                });
                return (worlds);
            };
            Array.prototype.filterWorld = function (world) {
                var filtered_objects = new Array();
                this.forEach(function (object) {
                    if (object.world !== world)
                        return;
                    filtered_objects.getAll().push(object);
                });
                return (filtered_objects);
            };
            Array.prototype.filterStorey = function (storey) {
                var filtered_objects = new Array();
                this.forEach(function (object) {
                    if (object.storey !== storey)
                        return;
                    filtered_objects.getAll().push(object);
                });
                return (filtered_objects);
            };
            Array.prototype.filterTypes = function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i - 0] = arguments[_i];
                }
                var filtered_objects = new Array();
                this.forEach(function (object) {
                    if (types.indexOf(object.type) == -1)
                        return; //todo better
                    filtered_objects.getAll().push(object);
                });
                return (filtered_objects);
            };
            Array.prototype.removeTypes = function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i - 0] = arguments[_i];
                }
                var filtered_objects = new Array();
                this.forEach(function (object) {
                    if (types.indexOf(object.type) == -1) {
                        filtered_objects.getAll().push(object);
                    }
                });
                return (filtered_objects);
            };
            Array.prototype.splitTypes = function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i - 0] = arguments[_i];
                }
                var filtered_objects_true = new Array();
                var filtered_objects_false = new Array();
                this.forEach(function (object) {
                    if (types.indexOf(object.type) !== -1) {
                        filtered_objects_true.getAll().push(object); //r('yes');
                    }
                    else {
                        filtered_objects_false.getAll().push(object); //r('no');
                    }
                });
                return ([filtered_objects_true, filtered_objects_false]);
            };
            Array.prototype.filterSquare = function (x, y, width, height) {
                //todo better
                x -= .5;
                y -= .5;
                width += 1;
                height += 1;
                var filtered_objects = new Array();
                this.forEach(function (object) {
                    if (object.position.x >= x &&
                        object.position.y >= y &&
                        object.position.x <= x + width &&
                        object.position.y <= y + height) {
                        filtered_objects.getAll().push(object);
                    }
                });
                return (filtered_objects);
            };
            Array.prototype.getObjectById = function (id) {
                for (var i = 0, l = this.objects.length; i < l; i++) {
                    if (this.objects[i].id == id)
                        return (this.objects[i]);
                }
                return null;
                //throw new Error('Unknown id '+id);
            };
            Array.prototype.removeObjectById = function (id) {
                for (var i in this.objects) {
                    if (this.objects[i].id == id) {
                        this.objects.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            Array.prototype.removeBlockOnPosition = function (position, storey, world) {
                //r(position);
                for (var i in this.objects) {
                    if (this.objects[i].type == 'block') {
                        //r(05-objects[i]);
                        if (this.objects[i].position.x == position.x && this.objects[i].position.y == position.y && this.objects[i].storey == storey && this.objects[i].world == world) {
                            this.objects.splice(i, 1);
                            return true;
                        }
                    }
                }
                return false;
            };
            Array.prototype.getBlockOnPosition = function (position, storey, world) {
                //r(position);
                for (var i in this.objects) {
                    if (this.objects[i].type == 'block') {
                        //r(05-objects[i]);
                        if (this.objects[i].position.x == position.x && this.objects[i].position.y == position.y && this.objects[i].storey == storey && this.objects[i].world == world) {
                            return this.objects[i];
                        }
                    }
                }
                return null;
            };
            return Array;
        }());
        Objects.Array = Array;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
//todo to other place
function isBlockOn(boxes, x, y, z) {
    for (var i = 0, l = boxes.length; i < l; i++) {
        if (boxes[i].x === x && boxes[i].y === y && boxes[i].z === z && boxes[i].processed === false) {
            return (true);
        }
    }
    return (false);
}
function isBlockOnSearchAllMaterials(boxes_materials, x, y, z) {
    for (var material in boxes_materials) {
        if (isBlockOn(boxes_materials[material], x, y, z)) {
            return (true);
        }
    }
    return (false);
}
function getBlockOn(boxes, x, y, z) {
    for (var i = 0, l = boxes.length; i < l; i++) {
        if (boxes[i].x === x && boxes[i].y === y && boxes[i].z === z && boxes[i].processed === false) {
            return (boxes[i]);
        }
    }
    return (null);
}
function processAllBlocksOn(boxes, x, y, z) {
    for (var i = 0, l = boxes.length; i < l; i++) {
        if (boxes[i].x === x && boxes[i].y === y && boxes[i].z === z && boxes[i].processed === false) {
            boxes[i].processed = true;
        }
    }
}
function isAllRangeOn(boxes, range) {
    //r('isAllRangeOn');
    for (var x = range.x.start; x <= range.x.end; x++) {
        for (var y = range.y.start; y <= range.y.end; y++) {
            for (var z = range.z.start; z <= range.z.end; z++) {
                //r(x,y,z);
                if (!isBlockOn(boxes, x, y, z)) {
                    //r('Empty place',isBlockOn(boxes,x,y,z),boxes);
                    return false;
                }
            }
        }
    }
    return true;
}
function processAllRange(boxes, range) {
    for (var x = range.x.start; x <= range.x.end; x++) {
        for (var y = range.y.start; y <= range.y.end; y++) {
            for (var z = range.z.start; z <= range.z.end; z++) {
                processAllBlocksOn(boxes, x, y, z);
            }
        }
    }
}
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var CompiledArray = (function (_super) {
            __extends(CompiledArray, _super);
            function CompiledArray() {
                _super.apply(this, arguments);
            }
            CompiledArray.compile = function (objects) {
                var start = new Date().getTime();
                function time() {
                    var end = new Date().getTime();
                    return (Math.round((end - start) / 1000 * 10) / 10 + 's');
                }
                r('Compilation started');
                var compiled_objects = new CompiledArray();
                var _a = objects.removeTypes('deploy').splitTypes('block'), blocks = _a[0], non_blocks = _a[1];
                r('Working on ' + non_blocks.getAll().length + ' non block objects!');
                non_blocks.forEach(function (object) {
                    compiled_objects.push(object);
                });
                var block_stat = {
                    all: blocks.getAll().length,
                    done: 0
                };
                r('Working on ' + blocks.getAll().length + ' non block objects!');
                var worlds = blocks.getAllWorlds();
                r('Compiling blocks of these worlds: ' + worlds.join(', '));
                worlds.forEach(function (world) {
                    r('Compiling world ' + world + ' at ' + time());
                    //=========================================================================BEGIN WORLD PROCESSING
                    var boxes_materials = {};
                    blocks.filterWorld(world).sort(function (blockA, blockB) {
                        return (BLOCKS_STOREYS_LEVELS[blockA.storey] - BLOCKS_STOREYS_LEVELS[blockB.storey]);
                    }).forEach(function (object) {
                        object.storey = object.storey || '1NP';
                        var level = BLOCKS_STOREYS_LEVELS[object.storey];
                        /*var position = new BABYLON.Vector3(
                         object.position.x * -BLOCK_SIZE,
                         (level+BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                         object.position.y * BLOCK_SIZE
                         );*/
                        object.material = object.material || 'stone-plain';
                        //var position_vertical = new BABYLON.Vector3(0, BLOCK_SIZE*1.00001, 0);
                        var vertical = BLOCKS_2D_3D_SHAPES[object.shape];
                        var box;
                        //position.x -=BLOCK_SIZE/2;
                        //position.z +=BLOCK_SIZE/2;
                        //r(level);
                        for (var i = 0, l = vertical.length; i < l; i++) {
                            if (vertical[i]) {
                                /*block =  box_prototypes[object.material].createInstance("room");
                                 block.isPickable = true;
                                 block.checkCollisions = true;
                                 block.position = position;*/
                                //todo check if there is box on that position
                                var x = object.position.x, y = object.position.y, z = i + level;
                                if (isBlockOnSearchAllMaterials(boxes_materials, x, y, z)) {
                                }
                                else {
                                    boxes_materials[object.material + '|' + object.opacity] = boxes_materials[object.material + '|' + object.opacity] || [];
                                    boxes_materials[object.material + '|' + object.opacity].push({
                                        x: x,
                                        y: y,
                                        z: z,
                                        processed: false
                                    });
                                }
                            }
                        }
                        //blocks.removeObjectById(object.id);
                        block_stat.done++;
                        if (block_stat.done % 500 === 500 - 1) {
                            r((Math.round(block_stat.done / block_stat.all * 100 * 100) / 100) + '% Converting blocks to boxes (' + world + ')');
                        }
                    });
                    r('In world ' + world + ' are all blocks converted to boxes.');
                    for (var material in boxes_materials) {
                        var boxes = boxes_materials[material];
                        //---------------------------------------
                        r(world + '[' + material + ']: ' + ' Sorting boxes.');
                        boxes.sort(function (boxA, boxB) {
                            return (boxB.z - boxA.z);
                        });
                        r(world + '[' + material + ']: ' + ' Boxes sorted');
                        //---------------------------------------
                        var last_boxes_length = boxes.length;
                        while (boxes.length !== 0) {
                            //boxes.forEach(function (box, box_i) {
                            //if (box_i % 1000 === 1000 - 1) {
                            //    r(world + '[' + material + ']: ' + (Math.round(box_i / boxes.length * 100 * 100) / 100) + '% Making  multiblocks from ' + boxes.length + ' boxes.');
                            //}
                            if (boxes.length + 1000 < last_boxes_length) {
                                last_boxes_length = boxes.length;
                                r(world + '[' + material + ']: ' + ' Making  multiblocks from remaining ' + boxes.length + ' boxes.');
                            }
                            //if (box.processed === false) {
                            //r(1);
                            var box = boxes[0];
                            var range = {
                                x: { start: box.x, end: box.x },
                                y: { start: box.y, end: box.y },
                                z: { start: box.z, end: box.z }
                            };
                            //r(range);
                            //ee();
                            [1, 2, 3, 4, 5, 6].forEach(function (operation) {
                                var limit = 1000;
                                while (isAllRangeOn(boxes, range) && limit > 0) {
                                    limit--;
                                    //r(operation);
                                    if (operation === 0) {
                                    }
                                    else if (operation === 1) {
                                        range.x.end++;
                                    }
                                    else if (operation === 2) {
                                        range.x.start--;
                                    }
                                    else if (operation === 3) {
                                        range.y.end++;
                                    }
                                    else if (operation === 4) {
                                        range.y.start--;
                                    }
                                    else if (operation === 5) {
                                        range.z.end++;
                                    }
                                    else if (operation === 6) {
                                        range.z.start--;
                                    }
                                }
                                if (limit == 1000) {
                                    //r(range);
                                    throw new Error('wtf');
                                }
                                if (operation === 0) {
                                }
                                else if (operation === 1) {
                                    range.x.end--;
                                }
                                else if (operation === 2) {
                                    range.x.start++;
                                }
                                else if (operation === 3) {
                                    range.y.end--;
                                }
                                else if (operation === 4) {
                                    range.y.start++;
                                }
                                else if (operation === 5) {
                                    range.z.end--;
                                }
                                else if (operation === 6) {
                                    range.z.start++;
                                }
                            });
                            //r(range);
                            processAllRange(boxes, range);
                            boxes = boxes.filter(function (box) {
                                return (!box.processed);
                            });
                            var extMaterial = material.split('|');
                            compiled_objects.push({
                                type: 'multiblock',
                                world: world,
                                material: extMaterial[0],
                                opacity: parseFloat(extMaterial[1]),
                                position: {
                                    x: (range.x.start + range.x.end) / 2,
                                    y: (range.y.start + range.y.end) / 2,
                                    z: (range.z.start + range.z.end) / 2
                                },
                                size: {
                                    x: Math.abs(range.x.end - range.x.start) + 1,
                                    y: Math.abs(range.y.end - range.y.start) + 1,
                                    z: Math.abs(range.z.end - range.z.start) + 1,
                                }
                            });
                        }
                        ;
                    }
                    //=========================================================================END OF WORLD PROCESSING
                    r('World ' + world + ' compiled at ' + time());
                });
                r('Final sorting at ' + time());
                compiled_objects.getAll().sort(function (objectA, objectB) {
                    var indexA = 0, indexB = 0;
                    if (objectA.type == 'link')
                        indexA = -1;
                    if (objectB.type == 'link')
                        indexB = -1;
                    if (objectA.type == 'environment')
                        indexA = 1;
                    if (objectB.type == 'environment')
                        indexB = 1;
                    return (indexB - indexA);
                });
                r('Created ' + compiled_objects.getAll().length + ' compiled objects from ' + objects.getAll().length + ' objects in time of ' + time() + '!');
                return (compiled_objects);
            };
            return CompiledArray;
        }(Objects.Array));
        Objects.CompiledArray = CompiledArray;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Object = (function () {
            //todo storey
            //todo get parameters for editing
            function Object(object) {
                if (typeof object !== 'object') {
                    throw new Error('In GALLERY.Objects.Object constructor should be Object!');
                }
                if (!object) {
                    throw new Error('In GALLERY.Objects.Object constructor should not be null!');
                }
                object.world = object.world || 'main';
                object.storey = object.storey || '1NP';
                object.hidden = object.hidden || false;
                for (var key in object) {
                    var this_key = key;
                    if (this_key == '_id')
                        this_key = 'id'; //todo maybe better solution
                    this[this_key] = object[key];
                }
                if (typeof this.id == 'string')
                    if (this.id.split('-', 2)[0] !== this.type) {
                        this.id = this.type + '-' + this.id;
                    }
                if ("uri" in this) {
                    if (this.uri == '/:' + this.id) {
                        this.uri = 'none';
                    }
                }
            }
            Object.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'world': return ('<input type="text">');
                    case 'hidden': return ('<input type="checkbox">');
                    default: return ('');
                }
            };
            Object.prototype.getBabylonMesh = function (scene, getMaterial, environment) {
                if ("_babylonMesh" in this) {
                }
                else {
                    this._babylonMesh = this.createBabylonMesh(scene, getMaterial, environment);
                    if (this.hidden)
                        this.hide();
                }
                return this._babylonMesh;
            };
            Object.prototype.getCreatedBabylonMesh = function () {
                if ("_babylonMesh" in this) {
                    return this._babylonMesh;
                }
                else {
                    return null;
                }
            };
            Object.prototype.createBabylonMesh = function (scene, getMaterial, environment) {
                return (null);
            };
            Object.prototype.createVirtualObjects = function () {
                return (null);
            };
            Object.prototype.handlePointerPress = function (event, pickResult) {
            };
            Object.prototype.handlePointerRelease = function (pressed, event, pickResult) {
            };
            Object.init = function (object) {
                if (object instanceof Object) {
                    return (object);
                }
                //----------------------------------
                if (object.type == 'environment') {
                    object = new Objects.Environment(object);
                }
                else if (object.type == 'block') {
                    object = new Objects.Block(object);
                }
                else if (object.type == 'multiblock') {
                    object = new Objects.MultiBlock(object);
                }
                else if (object.type == 'light') {
                    object = new Objects.Light(object);
                }
                else if (object.type == 'label') {
                    object = new Objects.Label(object);
                }
                else if (object.type == 'image') {
                    object = new Objects.Image(object);
                }
                else if (object.type == 'poster') {
                    object = new Objects.Poster(object);
                }
                else if (object.type == 'button') {
                    object = new Objects.Button(object);
                }
                else if (object.type == 'tree') {
                    object = new Objects.Tree(object);
                }
                else if (object.type == 'stairs') {
                    object = new Objects.Stairs(object);
                }
                else if (object.type == 'link') {
                    object = new Objects.Link(object);
                }
                else if (object.type == 'gate') {
                    object = new Objects.Gate(object);
                }
                else if (object.type == 'zone') {
                    object = new Objects.Zone(object);
                }
                else if (object.type == 'groundhole') {
                    object = new Objects.GroundHole(object);
                }
                else if (object.type == 'deploy') {
                    object = new Objects.Deploy(object);
                }
                else if (object.type == 'analytics') {
                    object = new Objects.Analytics(object);
                }
                else if (object.type == 'board') {
                    object = new Objects.Board(object);
                }
                else if (object.type == 'boardamorph') {
                    object = new Objects.BoardAmorph(object);
                }
                else {
                    console.warn("Unknown object type \"" + object.type + "\" - creating universal object.");
                    object = new Object(object);
                }
                //----------------------------------
                return (object);
            };
            Object.prototype.show = function () {
                this.getCreatedBabylonMesh().visibility = 1;
            };
            Object.prototype.hide = function () {
                this.getCreatedBabylonMesh().visibility = 0;
            };
            Object.prototype.getConsoleName = function () {
                if (this.name || false) {
                    return (this.name + ' (' + this.type + ')');
                }
                else {
                    return (this.id);
                }
            };
            Object.prototype.clone = function () {
                return (Object.init(JSON.parse(JSON.stringify(this))));
            };
            /*create$Element(){
                return this._create$Element();
            }*/
            Object.prototype.getUri = function () {
                var uri;
                if ("uri" in this) {
                    if (this.uri != 'none') {
                        uri = this.uri;
                    }
                }
                if (typeof uri === 'undefined') {
                    uri = '/:' + this.id;
                }
                return (uri);
            };
            Object.prototype._create$Element = function () {
                var object = this;
                var element = '<div></div>';
                var $element = $(element);
                if (typeof object.position !== 'undefined') {
                    $element.css('position', 'absolute');
                    //if (object.type !== 'image') {
                    $element.css('top', object.position.y * zoom_selected + window_center.y);
                    $element.css('left', object.position.x * zoom_selected + window_center.x);
                }
                //$element.addClass('object');
                $element.addClass(object.type);
                $element.attr('id', object.id);
                $element.css('width', zoom_selected);
                $element.css('height', zoom_selected);
                return ($element);
            };
            Object.prototype.getLevelNumber = function () {
                return (BLOCKS_STOREYS_LEVELS[this.storey || '1NP']);
            };
            Object.prototype.getBabylonPosition = function () {
                var position = new BABYLON.Vector3(this.position.x * -BLOCK_SIZE, (this.getLevelNumber() + BLOCKS_1NP_LEVEL) * BLOCK_SIZE, //(0.5 - 0.9) * BLOCK_SIZE,
                this.position.y * BLOCK_SIZE);
                return (position);
            };
            return Object;
        }());
        Objects.Object = Object;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
//r('created block');
//r(GALLERY.Objects.Object);
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Block = (function (_super) {
            __extends(Block, _super);
            function Block(object) {
                _super.call(this, object);
                this.opacity = this.opacity || 1;
            }
            Block.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'opacity':
                        return ('<input type="range" min="0" max="1" step="0.1">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Block.prototype.create$Element = function () {
                var $element = this._create$Element();
                //r($element);
                var object = this;
                $element.attr('data-shape', object.shape);
                $element.attr('data-material', object.material);
                $element.attr('data-opacity', object.opacity);
                $element.css('opacity', object.opacity);
                $element.css('top', '-=' + 0.5 * zoom_selected);
                $element.css('left', '-=' + 0.5 * zoom_selected);
                object.material = object.material || 'stone-plain';
                if (object.material.substr(0, 1) == '#') {
                    $element.css('background-color', object.material);
                }
                else {
                    $element.css('background', 'url("/media/images/textures/' + object.material + '.jpg")');
                    $element.css('background-size', 'cover');
                }
                if (object.shape != 'room') {
                    $element.html('<img src="/media/images/shapes/' + object.shape + '.png">');
                }
                return $element;
            };
            Block.isWallOn = function (objects, position, storey) {
                var objects_ = objects.getAll();
                var object;
                //r(objects_);
                for (var _i = 0, objects_1 = objects_; _i < objects_1.length; _i++) {
                    var object_1 = objects_1[_i];
                    if (object_1.type == 'block' && object_1.storey == storey) {
                        //r('isWallOn testing',object.position,position,object);
                        if (object_1.position.x - 0.5 <= position.x &&
                            object_1.position.y - 0.5 <= position.y &&
                            object_1.position.x + 0.5 >= position.x &&
                            object_1.position.y + 0.5 >= position.y) {
                            if (object_1.shape == 'wall') {
                                return (true);
                            }
                            else {
                                return (false);
                            }
                        }
                    }
                }
                return (null);
            };
            Block.wallRotation = function (objects, position, storey) {
                //r('wallRotation',position);
                var a = this.isWallOn(objects, { x: position.x + 0.5, y: position.y + 0.5 }, storey);
                var b = this.isWallOn(objects, { x: position.x - 0.5, y: position.y + 0.5 }, storey);
                var c = this.isWallOn(objects, { x: position.x - 0.5, y: position.y - 0.5 }, storey);
                var d = this.isWallOn(objects, { x: position.x + 0.5, y: position.y - 0.5 }, storey);
                //r(a,b,c,d);
                if (a && b && !c && !d) {
                    return (180);
                }
                else if (!a && b && c && !d) {
                    return (270);
                }
                else if (!a && !b && c && d) {
                    return (0);
                }
                else if (a && !b && !c && d) {
                    return (90);
                }
                else {
                    return (false);
                }
            };
            return Block;
        }(Objects.Object));
        Objects.Block = Block;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
//r('created block');
//r(GALLERY.Objects.Object);
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var MultiBlock = (function (_super) {
            __extends(MultiBlock, _super);
            function MultiBlock() {
                _super.apply(this, arguments);
            }
            MultiBlock.prototype.createBabylonMesh = function (scene, getMaterial, environment) {
                /**/
                //--------------------------------------Endless
                if (environment.endlessStructures) {
                    var bottom = this.position.z - this.size.z / 2;
                    if (bottom <= BLOCKS_STOREYS_LEVELS[environment.endlessStructuresFromStorey]) {
                        var top_1 = this.position.z + this.size.z / 2;
                        bottom -= 1000;
                        this.position.z = (top_1 + bottom) / 2;
                        this.size.z = top_1 - bottom;
                    }
                }
                //--------------------------------------
                var position = new BABYLON.Vector3(this.position.x * -BLOCK_SIZE, (this.position.z + BLOCKS_1NP_LEVEL) * BLOCK_SIZE, //(0.5 - 0.9) * BLOCK_SIZE,
                this.position.y * BLOCK_SIZE);
                var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                box.material = getMaterial(this.material, this.opacity, false, this.size.x, this.size.z);
                /**/
                /*var box = BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
    
    
    
                let f  = getMaterial(this.material, 0.5, true, this.size.z, this.size.x);
                let ba = f;
                let l  = getMaterial(this.material, this.opacity, true, this.size.z, this.size.y);
                let r  = l;
                let t  = getMaterial(this.material, this.opacity, true, this.size.x, this.size.y);
                let bo = t;
    
    
                var multi = new BABYLON.MultiMaterial("multimaterial", scene);
                multi.subMaterials.push(f);
                multi.subMaterials.push(ba);
                multi.subMaterials.push(l);
                multi.subMaterials.push(r);
                multi.subMaterials.push(t);
                multi.subMaterials.push(bo);
    
                //apply material
                box.subMeshes = [];
                var verticesCount = box.getTotalVertices();
                box.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, box));
                box.subMeshes.push(new BABYLON.SubMesh(1, 1, verticesCount, 6, 6, box));
                box.subMeshes.push(new BABYLON.SubMesh(2, 2, verticesCount, 12, 6, box));
                box.subMeshes.push(new BABYLON.SubMesh(3, 3, verticesCount, 18, 6, box));
                box.subMeshes.push(new BABYLON.SubMesh(4, 4, verticesCount, 24, 6, box));
                box.subMeshes.push(new BABYLON.SubMesh(5, 5, verticesCount, 30, 6, box));
                box.material = multi;*/
                box.isPickable = true;
                box.checkCollisions = true;
                box.position = position;
                box.scaling.x = this.size.x;
                box.scaling.y = this.size.z;
                box.scaling.z = this.size.y;
                return box;
            };
            return MultiBlock;
        }(Objects.Object));
        Objects.MultiBlock = MultiBlock;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image(object) {
                _super.call(this, object);
                this.design = this.design || 'board';
                this.name = this.name || '';
                this.html = this.html || '';
                this.uri = this.uri || 'none';
                this.parent = this.parent || 'none';
                this.rotation = this.rotation || 0;
                this.onGround = this.onGround || false;
                this.hasAlpha = this.hasAlpha || false;
                if (typeof this.isEmitting == 'undefined') {
                    this.isEmitting = true;
                }
                this.checkCollisions = this.checkCollisions || false;
                this.backFace = this.backFace || false;
                this.isSolid = this.isSolid || false;
                this.offsetHorizontal = this.offsetHorizontal || 0;
                this.offsetVertical = this.offsetVertical || 0;
                if (typeof this.offsetFrontal == 'undefined') {
                    this.offsetFrontal = 1 / 100;
                }
            }
            Image.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'width':
                        return ('<input type="number">');
                    case 'height':
                        return ('<input type="number">');
                    case 'offsetHorizontal':
                        return ('<input type="number">');
                    case 'offsetVertical':
                        return ('<input type="number">');
                    case 'offsetFrontal':
                        return ('<input type="number">');
                    case 'uri':
                        return ('<input type="text">');
                    case 'parent':
                        return ('<input type="text">');
                    case 'rotation':
                        return ('<input type="number">');
                    case 'onGround':
                        return ('<input type="checkbox">');
                    case 'hasAlpha':
                        return ('<input type="checkbox">');
                    case 'isEmitting':
                        return ('<input type="checkbox">');
                    case 'checkCollisions':
                        return ('<input type="checkbox">');
                    case 'backFace':
                        return ('<input type="checkbox">');
                    case 'isSolid':
                        return ('<input type="checkbox">');
                    case 'design':
                        return ('<input type="text">');
                    case 'name':
                        return ('<input type="text">');
                    case 'html':
                        return ('<textarea></textarea>');
                    case 'buttons':
                        return ('<textarea></textarea>');
                    default: return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Image.prototype.create$Element = function () {
                var $element = this._create$Element();
                //let object = this;
                /* var src = object.src;
                 var src_uri = URI(src)
                     .removeSearch("width");
                 var src_normal = src_uri.addSearch({width: 100}).toString();*/
                if (this.onGround) {
                    var $image = $('<img>').addClass('image');
                    var width = this.width * zoom_selected;
                    var height = this.height * zoom_selected;
                    $image.css('width', width);
                    $image.css('height', height);
                    $image.attr('src', this.getSrc(100));
                    $image.css('position', 'relative');
                    $image.css('top', -height / 2);
                    $image.css('left', -width / 2);
                    //r(object.rotation);
                    if (this.rotation) {
                        $image.css('transform', 'rotate(' + this.rotation + 'deg)');
                    }
                    $element.append($image);
                }
                else {
                    var $image_0 = $('<img>').addClass('image-0').hide();
                    var $image_90 = $('<img>').addClass('image-90').hide();
                    var $image_180 = $('<img>').addClass('image-180').hide();
                    var $image_270 = $('<img>').addClass('image-270').hide();
                    $image_0.css('height', this.height * zoom_selected);
                    $image_180.css('height', this.height * zoom_selected);
                    $image_90.css('width', this.height * zoom_selected);
                    $image_270.css('width', this.height * zoom_selected);
                    $image_0.attr('src', this.getSrc(100, 0, 0));
                    $image_90.attr('src', this.getSrc(100, 0, 90));
                    $image_180.attr('src', this.getSrc(100, 0, 180));
                    $image_270.attr('src', this.getSrc(100, 0, 270));
                    //rotateImage($image_90[0],90);
                    //rotateImage($image_180[0],180);
                    //rotateImage($image_270[0],270);
                    if (this.rotation === 0) {
                        $image_0.show();
                    }
                    else if (this.rotation === 90) {
                        $image_90.show();
                    }
                    else if (this.rotation === 180) {
                        $image_180.show();
                    }
                    else if (this.rotation === 270) {
                        $image_270.show();
                    }
                    else {
                        $image_0.show();
                    }
                    $element.append($image_0);
                    $element.append($image_90);
                    $element.append($image_180);
                    $element.append($image_270);
                }
                return $element;
            };
            Image.prototype.getSrc = function (width, ratio, rotation) {
                if (width === void 0) { width = 0; }
                if (ratio === void 0) { ratio = 0; }
                if (rotation === void 0) { rotation = 0; }
                var uri = URI(this.src);
                if (width)
                    uri.addSearch({ width: width });
                if (ratio)
                    uri.addSearch({ ratio: ratio });
                if (rotation)
                    uri.addSearch({ rotation: rotation });
                return uri.toString();
            };
            Image.prototype.getTexture = function () {
                return (this.src);
            };
            Image.prototype.createImageMesh = function (scene) {
                var quality;
                if (window.innerWidth > 1024) {
                    quality = 1024;
                }
                else if (window.innerWidth > 512) {
                    quality = 512;
                }
                else {
                    quality = 256;
                }
                var distance = 5;
                var image00 = BABYLON.Mesh.CreatePlane(this.id, BLOCK_SIZE, scene);
                image00.material = Viewer.getImageMaterial(this.src, quality, this.isEmitting, this.hasAlpha, this.backFace);
                var lods = 5;
                var mesh;
                for (var lod = 0; lod < lods; lod++) {
                    quality = quality / 2;
                    distance = distance * 2;
                    mesh = BABYLON.Mesh.CreatePlane(this.id, BLOCK_SIZE, scene);
                    mesh.material = Viewer.getImageMaterial(this.src, quality, this.isEmitting, this.hasAlpha, this.backFace);
                    image00.addLODLevel(distance, mesh);
                }
                return image00;
            };
            Image.prototype.createBabylonMesh = function (scene) {
                var object = this;
                var position = this.getBabylonPosition();
                if (typeof this.rotation !== 'number') {
                    this.rotation = 0;
                } //todo remove
                var rotation_rad = (object.rotation / 180) * Math.PI;
                var image = this.createImageMesh(scene);
                image.scaling.x = object.width;
                image.scaling.y = object.height;
                if (object.onGround) {
                    image.position = position;
                    image.position.y = (this.getLevelNumber() + BLOCKS_1NP_LEVEL + 0.5) * BLOCK_SIZE + 0.1;
                    image.rotation.x = Math.PI / 2;
                    image.rotation.y = Math.PI + rotation_rad;
                }
                else {
                    this._vectorVertical = new BABYLON.Vector3(0, -BLOCK_SIZE, 0);
                    this._vectorHorizontal = new BABYLON.Vector3(-Math.cos(rotation_rad) * BLOCK_SIZE, 0, -Math.sin(rotation_rad) * BLOCK_SIZE);
                    this._vectorFrontal = new BABYLON.Vector3(Math.sin(rotation_rad) * BLOCK_SIZE, 0, Math.cos(rotation_rad) * BLOCK_SIZE);
                    position
                        .addInPlace(this._vectorVertical.scale(this.offsetVertical))
                        .addInPlace(this._vectorHorizontal.scale(this.offsetHorizontal))
                        .addInPlace(this._vectorFrontal.scale(this.offsetFrontal));
                    /*position.y -= this.offsetVertical * BLOCK_SIZE;
    
                    position.x -= this.offsetHorizontal * Math.cos(rotation_rad) * BLOCK_SIZE ;
                    position.z -= this.offsetHorizontal * Math.sin(rotation_rad) * BLOCK_SIZE ;
    
    
                    position.x += Math.sin(rotation_rad) * BLOCK_SIZE * this.offsetFrontal;
                    position.z += Math.cos(rotation_rad) * BLOCK_SIZE * this.offsetFrontal;*/
                    image.position = position;
                    //(level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE
                    //image.position.y = (/*level + BLOCKS_1NP_LEVEL +*/ EYE_VERTICAL) * BLOCK_SIZE ;
                    image.rotation.y = Math.PI + rotation_rad;
                    image.position.y += (EYE_VERTICAL - BLOCKS_1NP_LEVEL) * BLOCK_SIZE;
                    if (object.isSolid) {
                        var boxMesh = new BABYLON.Mesh.CreateBox(this.id, BLOCK_SIZE, scene);
                        var textureA = image.material;
                        var textureB = new BABYLON.StandardMaterial("material1", scene);
                        textureB.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
                        var multiTexture = new BABYLON.MultiMaterial("multimaterial", scene);
                        multiTexture.subMaterials.push(textureB);
                        multiTexture.subMaterials.push(textureA);
                        multiTexture.subMaterials.push(textureB);
                        multiTexture.subMaterials.push(textureB);
                        multiTexture.subMaterials.push(textureB);
                        multiTexture.subMaterials.push(textureB);
                        boxMesh.subMeshes = [];
                        var verticesCount = boxMesh.getTotalVertices();
                        boxMesh.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, boxMesh));
                        boxMesh.subMeshes.push(new BABYLON.SubMesh(1, 1, verticesCount, 6, 6, boxMesh));
                        boxMesh.subMeshes.push(new BABYLON.SubMesh(2, 2, verticesCount, 12, 6, boxMesh));
                        boxMesh.subMeshes.push(new BABYLON.SubMesh(3, 3, verticesCount, 18, 6, boxMesh));
                        boxMesh.subMeshes.push(new BABYLON.SubMesh(4, 4, verticesCount, 24, 6, boxMesh));
                        boxMesh.subMeshes.push(new BABYLON.SubMesh(5, 5, verticesCount, 30, 6, boxMesh));
                        boxMesh.material = multiTexture;
                        boxMesh.rotation = image.rotation;
                        boxMesh.position = image.position.clone();
                        boxMesh.scaling = image.scaling.clone();
                        boxMesh.scaling.z = this.offsetFrontal;
                        boxMesh.position.x += Math.sin(rotation_rad) * BLOCK_SIZE * this.offsetFrontal * -0.5;
                        boxMesh.position.z += Math.cos(rotation_rad) * BLOCK_SIZE * this.offsetFrontal * -0.5;
                        image.dispose();
                        return (boxMesh);
                    }
                }
                //image.scaling.z = 0.1;
                image.checkCollisions = object.checkCollisions;
                r('Created image mesh', image);
                return (image);
                //r(object);
                //r(image);
            };
            Image.prototype.reshape = function () {
            };
            Image.prototype.createVirtualObjects = function () {
                var virtualObjects = new Objects.Array();
                var object = this;
                var position = this.getBabylonPosition();
                if (typeof this.rotation !== 'number') {
                    this.rotation = 0;
                } //todo remove
                var rotation_rad = (object.rotation / 180) * Math.PI; //todo method
                if (typeof object.rotation === 'number') {
                    if (!object.onGround) {
                        r('Creating zone for ' + object.name);
                        var uri = void 0;
                        if (object.uri && object.uri != 'none') {
                            uri = object.uri;
                        }
                        else if (object.name) {
                            uri = '/' + createUriFromName(object.name);
                            object.uri = uri;
                        }
                        else {
                            //uri = '/' + (object.id.split('-')[0]);
                            uri = '/:' + object.id;
                        }
                        var size = Math.max(object.width, object.height);
                        var x = Math.sin(rotation_rad) * size / -2;
                        var y = Math.cos(rotation_rad) * size / 2;
                        var zone = new Objects.Zone({
                            id: createGuid(),
                            type: 'zone',
                            world: object.world,
                            storey: object.storey,
                            position: {
                                x: object.position.x + x,
                                y: object.position.y + y,
                            },
                            limit: true,
                            limitRotation: object.rotation + 180,
                            limitRotationTolerance: 90,
                            width: object.width * Math.cos(rotation_rad) + size * Math.sin(rotation_rad),
                            height: object.width * Math.sin(rotation_rad) + size * Math.cos(rotation_rad),
                            design: object.design,
                            name: object.name,
                            html: object.html,
                            uri: uri,
                            uri_level: 10000,
                        });
                        virtualObjects.push(zone);
                        var label = new Objects.Label({
                            id: createGuid(),
                            type: 'label',
                            world: object.world,
                            storey: object.storey,
                            position: {
                                x: object.position.x + (x * 1.9),
                                y: object.position.y + (y * 1.9),
                            },
                            rotation: object.rotation,
                            name: object.name,
                            uri: uri,
                            parent: object.parent,
                        });
                        virtualObjects.push(zone);
                    }
                    return (virtualObjects);
                }
            };
            return Image;
        }(Objects.Object));
        Objects.Image = Image;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Poster = (function (_super) {
            __extends(Poster, _super);
            function Poster(object) {
                this.virtualObjects = null;
                this.posterHtml = this.posterHtml || '';
                this.posterDesign = this.posterDesign || 'board';
                this.posterBackgroundColor = this.posterBackgroundColor || '#ffffff';
                this.posterTextColor = this.posterTextColor || '#000000';
                this.opened = this.opened || false;
                this.src = this.src || 'http://cdn.pavolhejny.com/?file=5888cb789f36f-M2Q5OGMxNTk1N2M1ZjVkZDIyN2U1M2RiYzdjYmI2MGQuanBn'; //todo remove
                this.width = this.width || 1;
                this.height = this.height || 1;
                this.voxelPixelRatio = this.voxelPixelRatio || 10;
                _super.call(this, object);
            }
            Poster.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'posterHtml': return ('<textarea></textarea>');
                    case 'posterDesign': return ('<input type="text" />');
                    case 'voxelPixelRatio': return ('<input type="number" />');
                    case 'posterBackgroundColor': return ('<input type="color" />');
                    case 'posterTextColor': return ('<input type="color" />');
                    case 'opened': return ('<input type="checkbox" />');
                    default: return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            /*getSrc(width=0,ratio=0,rotation=0):string{
    
                html2canvas($('body')[0], {
                    onrendered: function(canvas) {
                        canvas.toDataURL();
                    }
                });
    
            }*/
            Poster.prototype.createPosterElement = function (container) {
                var posterElement = document.createElement('div');
                posterElement.innerHTML = this.posterHtml;
                posterElement.classList.add('zone-' + this.posterDesign);
                //posterElement.style.border = '2px solid red';
                //posterElement.style.backgroundColor = '#fff';
                posterElement.style.width = this.width * this.voxelPixelRatio + 'px';
                posterElement.style.height = this.height * this.voxelPixelRatio + 'px';
                posterElement.style.overflow = 'hidden';
                container.appendChild(posterElement);
                return (posterElement);
            };
            Poster.prototype.getPosterElement = function (container) {
                if (container === void 0) { container = null; }
                if ("_posterElement" in this) {
                }
                else {
                    if (!container) {
                        container = document.getElementById('zones');
                    }
                    this._posterElement = this.createPosterElement(container);
                }
                return this._posterElement;
            };
            Poster.prototype.createImageMesh = function (scene) {
                var object = this; //todo
                this._posterTexture = new BABYLON.DynamicTexture('posterTexture', {
                    width: this.width * this.voxelPixelRatio,
                    height: this.height * this.voxelPixelRatio
                }, scene, false);
                var posterTextureCtx = this._posterTexture.getContext();
                posterTextureCtx.beginPath();
                posterTextureCtx.rect(0, 0, posterTextureCtx.canvas.width, posterTextureCtx.canvas.height);
                posterTextureCtx.fillStyle = this.posterBackgroundColor;
                posterTextureCtx.fill();
                this._posterTexture.update();
                var material = new BABYLON.StandardMaterial("texture4", scene);
                if (this.isEmitting) {
                    material.emissiveTexture = this._posterTexture;
                    material.backFaceCulling = !(this.backFace);
                    material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                    material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                    material.specularPower = 32;
                    //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                    material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                }
                else {
                    material.diffuseTexture = this._posterTexture;
                }
                /*setTimeout(function () {
                    this.redrawPosterTexture();
                }.bind(this));*/
                //set interval this.redrawPosterTexture();
                var image00 = BABYLON.Mesh.CreatePlane(this.id, BLOCK_SIZE, scene);
                image00.material = material;
                return (image00);
            };
            Poster.prototype.redrawPosterTexture = function () {
                var object = this; //todo
                var posterElement = this.getPosterElement(document.getElementById('posters')); //todo DI to constructor
                var buttons = posterElement.getElementsByTagName('button');
                for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                    var button = buttons_1[_i];
                    button.style.visibility = 'hidden';
                }
                html2canvas(posterElement, {
                    background: '#FFFFFF',
                    onrendered: function (canvas) {
                        var posterTextureCtx = object._posterTexture.getContext();
                        //object._ctx = image_texture_ctx;
                        posterTextureCtx.drawImage(canvas, 0, 0);
                        object._posterTexture.update();
                        GALLERY.Viewer.renderTick(); //todo DI
                    }
                });
            };
            ;
            Poster.prototype.handlePointerRelease = function (pressed, event, pickResult) {
                if (pressed) {
                    this.virtualObjects.getObjectByIndex(0).show();
                    this.hide();
                }
            };
            Poster.prototype.handlePointerPress = function (event, pickResult) {
                this.redrawPosterTexture();
                /*
                let object = this;//todo remove
    
                let position = pickResult.pickedMesh.position.subtract(pickResult.pickedPoint);
    
                let vec2 = {
                    x: (Math.abs(position.x)>Math.abs(position.z)?position.x:position.z),
                    y: position.y
                };
    
    
                vec2.x /= pickResult.pickedMesh.scaling.x * BLOCK_SIZE;
                vec2.y /= pickResult.pickedMesh.scaling.y * BLOCK_SIZE;
    
                vec2.x += 0.5;
                vec2.y += 0.5;
    
                vec2.x *= object.width * object.voxelPixelRatio;
                vec2.y *= object.height * object.voxelPixelRatio;
    
    
    
                let ctx = pickResult.pickedMesh.material.emissiveTexture.getContext();
    
                ctx.beginPath();
                ctx.arc(vec2.x, vec2.y, 10, 0, 2 * Math.PI);
                ctx.fill();
    
    
                pickResult.pickedMesh.material.emissiveTexture.update();//todo getBabylonMesh
                */
            };
            Poster.prototype.createVirtualObjects = function () {
                this.virtualObjects = new Objects.Array();
                //------------------------------------------------------------
                this.virtualObjects.push(new Objects.Board({
                    id: createGuid(),
                    type: 'board',
                    world: this.world,
                    storey: this.storey,
                    position: {
                        x: this.position.x,
                        y: this.position.y,
                    },
                    rotation: this.rotation,
                    width: this.width,
                    height: this.height,
                    voxelPixelRatio: this.voxelPixelRatio,
                    name: this.name,
                    html: this.posterHtml,
                }, this));
                if (this.opened) {
                    this.hide();
                }
                else {
                    //this.virtualObjects.getObjectByIndex(0).hide();
                    this.virtualObjects.getObjectByIndex(0).hidden = true;
                }
                //------------------------------------------------------------
                var posterElement = this.getPosterElement(document.getElementById('posters'));
                //r(posterElement);
                /*let buttons = posterElement.getElementsByTagName('button');
    
                for(let button of buttons){
    
    
                    let buttonMesh = new Objects.Button({
    
                        id: createGuid(),
                        type: 'button',
    
                        world: this.world,
                        storey: this.storey,
                        position: {
                            x: this.position.x,
                            y: this.position.y,
                        },
    
                        rotation: this.rotation,
    
                        width: button.offsetWidth / this.voxelPixelRatio,
                        height:  button.offsetHeight / this.voxelPixelRatio,
    
                        offsetHorizontal: (button.offsetLeft-posterElement.offsetLeft-posterElement.offsetWidth/2) / this.voxelPixelRatio,
                        offsetVertical: (button.offsetTop-posterElement.offsetTop-posterElement.offsetHeight/2) / this.voxelPixelRatio,
    
    
                        posterHtml: button.innerHTML,
                        voxelPixelRatio: this.voxelPixelRatio,
    
                        onClick: button.onclick
    
    
    
    
    
                    });
    
                    buttonMesh.offsetHorizontal += buttonMesh.width/2;
                    buttonMesh.offsetVertical += buttonMesh.height/2;
    
                    virtualObjects.push(buttonMesh);
    
                }*/
                //----------------------------------------------------
                var cumulativeOffset = function (element) {
                    var top = 0, left = 0;
                    do {
                        top += element.offsetTop || 0;
                        left += element.offsetLeft || 0;
                        element = element.offsetParent;
                    } while (element);
                    return {
                        top: top,
                        left: left
                    };
                };
                function offsetFromParent(element, parent) {
                    var elementOffset = cumulativeOffset(element);
                    var parentOffset = cumulativeOffset(parent);
                    return {
                        top: elementOffset.top - parentOffset.top,
                        left: elementOffset.left - parentOffset.left
                    };
                }
                var cells = posterElement.querySelectorAll('td,th,button');
                r(cells);
                for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                    var cell = cells_1[_i];
                    var offset = offsetFromParent(cell, posterElement);
                    r('row', offset);
                    //r(posterElement.offsetWidth,this.width);
                    var buttonMesh = new Objects.Button({
                        id: createGuid(),
                        type: 'button',
                        world: this.world,
                        storey: this.storey,
                        position: {
                            x: this.position.x,
                            y: this.position.y,
                        },
                        rotation: this.rotation,
                        width: cell.offsetWidth / this.voxelPixelRatio,
                        height: cell.offsetHeight / this.voxelPixelRatio,
                        offsetHorizontal: (offset.left) / this.voxelPixelRatio,
                        offsetVertical: (offset.top) / this.voxelPixelRatio,
                        posterHtml: cell.innerHTML,
                        voxelPixelRatio: this.voxelPixelRatio,
                        posterBackgroundColor: '#0000ff',
                        posterTextColor: '#000000',
                        onClick: cell.onclick
                    });
                    buttonMesh.offsetHorizontal += buttonMesh.width / 2;
                    buttonMesh.offsetVertical += buttonMesh.height / 2;
                    buttonMesh.offsetHorizontal -= this.width / 2;
                    buttonMesh.offsetVertical -= this.height / 2;
                    this.virtualObjects.push(buttonMesh);
                }
                /*let tables = posterElement.getElementsByTagName('table');
                for(let table of tables) {
    
                    r('table',table.offsetTop,table.offsetLeft);
                    let rows = table.getElementsByTagName('tr');
                    for (let row of rows) {
    
                        r('row',row.offsetTop,row.offsetLeft);
                        let cells = row.getElementsByTagName('td');
                        for (let cell of cells) {
    
    
                            r('cell',cell.offsetTop,cell.offsetLeft);
    
                            let buttonMesh = new Objects.Button({
    
                                id: createGuid(),
                                type: 'button',
    
                                world: this.world,
                                storey: this.storey,
                                position: {
                                    x: this.position.x,
                                    y: this.position.y,
                                },
    
                                rotation: this.rotation,
    
                                //width: cell.offsetWidth / this.voxelPixelRatio,
                                //height:  cell.offsetHeight / this.voxelPixelRatio,
                                width: 0.1,
                                height: 0.1,
    
                                offsetHorizontal: (cell.offsetLeft) / this.voxelPixelRatio,
                                offsetVertical: (cell.offsetTop) / this.voxelPixelRatio,
    
    
                                posterHtml: cell.innerHTML,
                                voxelPixelRatio: this.voxelPixelRatio,
    
                                posterBackgroundColor: '#0000ff',
                                posterTextColor: '#000000',
    
                                //onClick: cell.onclick
    
    
    
    
    
                            });
    
                            //buttonMesh.offsetHorizontal += buttonMesh.width/2;
                            //buttonMesh.offsetVertical += buttonMesh.height/2;
    
                            buttonMesh.offsetHorizontal -= this.width/2;
                            buttonMesh.offsetVertical -= this.height/2;
    
    
                            virtualObjects.push(buttonMesh);
    
    
    
    
    
                        }
                    }
                }*/
                //r(virtualObjects);
                return (this.virtualObjects);
            };
            return Poster;
        }(Objects.Image));
        Objects.Poster = Poster;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="05-object" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        //import analyticsObject = GALLERY.Viewer.analyticsObject;
        //import appState = GALLERY.Viewer.appState;
        Objects.BOARD_STRUCTURE = "\n{{#name}}\n<h1>{{name}}</h1>\n{{/name}}\n<div class=\"text\">{{{html}}}</div>\n{{#buttons}}\n<div class=\"buttons\">{{{buttons}}}</div>\n{{/buttons}}\n";
        var ProtoBoard = (function (_super) {
            __extends(ProtoBoard, _super);
            function ProtoBoard(object) {
                _super.call(this, object);
                this.design = this.design || 'board';
                this.name = this.name || '';
                this.html = this.html || ''; //todo deprecated
                this.structure = this.structure || Objects.BOARD_STRUCTURE;
                this.buttons = this.buttons || ''; //todo deprecated
            }
            ProtoBoard.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'design':
                        return ('<input type="text">');
                    case 'name':
                        return ('<input type="text">');
                    case 'html':
                        return ('<textarea></textarea>');
                    case 'buttons':
                        return ('<textarea></textarea>');
                    case 'structure':
                        return ('<textarea></textarea>');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            //todo use React
            /*createBoard(container:HTMLElement):HTMLElement{
                export class Hello extends React.Component<HelloProps, undefined> {
                    render() {
                        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
                    }
                }
    
            }*/
            ProtoBoard.prototype.createBoard = function (container) {
                //if (object.name || object.html) {
                var isNext = false;
                var label = objects.filterTypes('label').findBy('uri', this.uri);
                if (label) {
                    if (label.next !== 'none') {
                        isNext = true;
                    }
                }
                var element = document.createElement('div');
                element.id = 'zone-' + this.id;
                element.classList.add('zone-' + this.design);
                var html = this.html;
                html = Mustache.render(html, { gallery: function () {
                        return function (val, render) {
                            var images = objects.filterTypes('image');
                            var conds = JSON.parse(val);
                            for (var key in conds) {
                                images = images.filterBy(key, conds[key]);
                            }
                            var html = '';
                            images.forEach(function (image) {
                                html += '<img src="' + image.getSrc(90, 1) + '" onclick="GALLERY.Viewer.appState(\'/:' + image.id + '\', false, false);" />';
                            });
                            html = '<div class="gallery">' + html + '</div>';
                            return html;
                        };
                    } });
                element.innerHTML = Mustache.render(this.structure, this);
                element.innerHTML += ''
                    + (isNext ? '<div class="next" onclick="GALLERY.Viewer.appStateNext();"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>' : '');
                var fullUrl = 'http://' + window.location.hostname + '/' + this.getUri(); //+analyticsObject.domain;
                //let fullUrl = 'http://'+analyticsObject.domain+this.getUri();
                r(fullUrl);
                if (this.design == 'board' && !isNext) {
                    //element.innerHTML += `<button class="fb-share-button" data-href="http://www.your-domain.com/your-page.html"></button>`;
                    element.innerHTML += "<button onclick=\"GALLERY.Viewer.goToParent();\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> Zp\u011Bt</button>";
                    element.innerHTML += "<button onclick=\"GALLERY.Viewer.appStateTurnBack();\"><i class=\"fa fa-repeat\" aria-hidden=\"true\"></i> Oto\u010Dit se</button>";
                    element.innerHTML += "<button class=\"discuss\" onclick=\"fbDiscuss('" + fullUrl + "');\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> P\u0159idat koment\u00E1\u0159</button>";
                    $.ajax({
                        url: 'http://graph.facebook.com/v2.1/' + encodeURIComponent(fullUrl),
                        dataType: 'jsonp',
                        success: function (data) {
                            data.share = data.share || {};
                            var count = data.share.comment_count || 0;
                            r(data, count);
                            var text = '<i class="fa fa-pencil" aria-hidden="true"></i> ';
                            if (count == 0) {
                                text += 'Přidat komentář';
                            }
                            else if (count == 1) {
                                text += '1 komentář';
                            }
                            else if (count < 5) {
                                text += count + ' komentáře';
                            }
                            else if (count >= 5) {
                                text += count + ' komentářů';
                            }
                            element.getElementsByClassName('discuss')[0].innerHTML = text;
                            //alert("comments: " + data.comments);
                        }
                    });
                }
                container.appendChild(element);
                $(element).find('a').click(function (e) {
                    e.preventDefault();
                    Viewer.appState($(this).attr('href'), false, false);
                });
                Viewer.processPopups(element);
                return (element);
                //}
            };
            ProtoBoard.prototype.getBoard = function (container) {
                if (container === void 0) { container = null; }
                if ("_board" in this) {
                }
                else {
                    if (!container) {
                        container = document.getElementById('zones');
                    }
                    this._board = this.createBoard(container);
                    this._board.style.display = 'none';
                    if (this.hidden)
                        this.hide();
                }
                return this._board;
            };
            ProtoBoard.prototype.getCreatedBoard = function () {
                if ("_board" in this) {
                    return this._board;
                }
                else {
                    return null;
                }
            };
            ProtoBoard.prototype.showBoard = function () {
                //this.getBoard().style.display = 'block';
                $(this.getBoard()).stop().slideDown();
            };
            ProtoBoard.prototype.hideBoard = function () {
                //this.getBoard().style.display = 'none';
                $(this.getBoard()).stop().slideUp();
            };
            return ProtoBoard;
        }(Objects.Object));
        Objects.ProtoBoard = ProtoBoard;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
//import {ProtoBoard} from './07-protoboard.ts';
/// <reference path="07-protoboard" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var BoardAmorph = (function (_super) {
            __extends(BoardAmorph, _super);
            function BoardAmorph(object, realObject) {
                if (realObject === void 0) { realObject = null; }
                _super.call(this, object);
                this.realObject = realObject;
                this.isPerspective = this.isPerspective || false;
            }
            BoardAmorph.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'isPerspective':
                        return ('<input type="checkbox">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            BoardAmorph.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-file-text-o" aria-hidden="true"></i>');
                return $element;
            };
            BoardAmorph.prototype.createBoard = function (container) {
                var element = _super.prototype.createBoard.call(this, container);
                var self = this;
                if (this.realObject) {
                    element.addEventListener('click', function (event) {
                        r(self);
                        self.realObject.show();
                        self.hide();
                    });
                }
                return element;
            };
            BoardAmorph.prototype.show = function () {
                //super.show();
                this.getCreatedBoard().style.display = 'block';
            };
            BoardAmorph.prototype.hide = function () {
                //super.hide();
                this.getCreatedBoard().style.display = 'none';
            };
            return BoardAmorph;
        }(Objects.ProtoBoard));
        Objects.BoardAmorph = BoardAmorph;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="10-boardamorph" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Board = (function (_super) {
            __extends(Board, _super);
            function Board(object, realObject) {
                if (realObject === void 0) { realObject = null; }
                _super.call(this, object);
                this.realObject = realObject;
                this.width = this.width || 2;
                this.height = this.height || 4;
                this.voxelPixelRatio = this.voxelPixelRatio || 100;
            }
            Board.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'width':
                        return ('<input type="number">');
                    case 'height':
                        return ('<input type="number">');
                    case 'voxelPixelRatio':
                        return ('<input type="number">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Board.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-square-o" aria-hidden="true"></i>');
                return $element;
            };
            Board.prototype.createBoard = function (container) {
                var element = _super.prototype.createBoard.call(this, container);
                element.style.width = this.width * this.voxelPixelRatio;
                element.style.height = this.height * this.voxelPixelRatio;
                element.style.overflow = 'hidden';
                return element;
            };
            return Board;
        }(Objects.BoardAmorph));
        Objects.Board = Board;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="10-board" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(object) {
                this.posterBackgroundColor = this.posterBackgroundColor || '#0098ff';
                this.posterTextColor = this.posterTextColor || '#ffffff';
                this.posterDesign = this.posterDesign || 'button';
                if (typeof this.offsetFrontal == 'undefined') {
                    this.offsetFrontal = 1 / 5;
                }
                if (typeof this.isSolid == 'undefined') {
                    this.isSolid = true;
                }
                if (typeof this.offsetFrontalPressed == 'undefined') {
                    this.offsetFrontalPressed = 1 / 20;
                }
                this.onClick = this.onClick || 'console.log("Button pressed!");';
                _super.call(this, object);
            }
            Button.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'offsetFrontalPressed': return ('<input type="number" />');
                    case 'onClick': return ('<textarea></textarea>');
                    default: return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Button.prototype.createPosterElement = function (container) {
                var element = _super.prototype.createPosterElement.call(this, container);
                element.style.backgroundColor = this.posterBackgroundColor;
                element.style.color = this.posterTextColor;
                return element;
            };
            Button.prototype.createVirtualObjects = function () {
                return (null);
            };
            Button.prototype.handlePointerPress = function (event, pickResult) {
                //todo DI Viewer.scene to object
                this.redrawPosterTexture();
                var mesh = this.getBabylonMesh(Viewer.scene);
                var vector = this._vectorFrontal.scale(this.offsetFrontalPressed - this.offsetFrontal);
                mesh.position.addInPlace(vector);
                //Viewer.renderTick();
            };
            Button.prototype.handlePointerRelease = function (pressed, event, pickResult) {
                var mesh = this.getBabylonMesh(Viewer.scene);
                var vector = this._vectorFrontal.scale(this.offsetFrontalPressed - this.offsetFrontal);
                mesh.position.subtractInPlace(vector);
                //Viewer.renderTick();
                if (pressed) {
                    r(this);
                    if (typeof this.onClick == 'string') {
                        eval(this.onClick);
                    }
                    else if (typeof this.onClick == 'function') {
                        this.onClick();
                    }
                }
            };
            return Button;
        }(Objects.Poster));
        Objects.Button = Button;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(object) {
                _super.call(this, object);
                this.name = this.name || '';
                this.uri = this.uri || '';
                this.next = this.next || 'none';
                this.rotation = this.rotation || 0;
                this.rotationNotImportant = this.rotationNotImportant || false;
                this.rotationSpeed = this.rotationSpeed || 0;
            }
            Label.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'name':
                        return ('<input type="text">');
                    case 'uri':
                        return ('<input type="text">');
                    case 'next':
                        return ('<input type="text">');
                    case 'rotation':
                        return ('<input type="number">');
                    case 'rotationNotImportant':
                        return ('<input type="checkbox">');
                    case 'rotationSpeed':
                        return ('<input type="number">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Label.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                // style="transform: rotate('+object.rotation+'deg);"
                $element.html('<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>');
                $element.css('transform', 'rotate(' + object.rotation + 'deg)');
                return $element;
            };
            return Label;
        }(Objects.Object));
        Objects.Label = Label;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Light = (function (_super) {
            __extends(Light, _super);
            function Light(object) {
                _super.call(this, object);
                this.color = this.color || '#ffffff';
                this.intensity = this.intensity || 1;
            }
            Light.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'color':
                        return ('<input type="color">');
                    case 'intensity':
                        return ('<input type="number">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Light.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i style="color:' + object.color + ';" class="fa fa-sun-o" aria-hidden="true"></i>');
                return $element;
            };
            return Light;
        }(Objects.Object));
        Objects.Light = Light;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Stairs = (function (_super) {
            __extends(Stairs, _super);
            function Stairs(object) {
                _super.call(this, object);
                this.material = this.material || '#cccccc';
                this.width = this.width || 10;
                this.height = this.height || 2;
                this.rotation = this.rotation || 0;
                this.isFull = this.isFull || false;
                this.opacity = this.opacity || 1;
            }
            Stairs.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'material':
                        return ('<input type="text">');
                    case 'width':
                        return ('<input type="number">');
                    case 'height':
                        return ('<input type="number">');
                    case 'rotation':
                        return ('<input type="number">');
                    case 'isFull':
                        return ('<input type="checkbox">');
                    case 'opacity':
                        return ('<input type="number">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Stairs.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $image = $('<img>').addClass('image');
                var width = object.width * zoom_selected;
                var height = object.height * zoom_selected;
                $image.css('width', width);
                $image.css('height', height);
                $image.attr('src', '/media/images/icons/stairs.jpg');
                $image.css('position', 'relative');
                $image.css('top', -height / 2);
                $image.css('left', -width / 2);
                $image.css('transform', 'rotate(' + object.rotation + 'deg)');
                $element.append($image);
                //$element.css('transform','rotate('+object.rotation+'deg)');
                return $element;
            };
            return Stairs;
        }(Objects.Object));
        Objects.Stairs = Stairs;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Tree = (function (_super) {
            __extends(Tree, _super);
            function Tree() {
                _super.apply(this, arguments);
            }
            Tree.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-pagelines" aria-hidden="true"></i>');
                return $element;
            };
            return Tree;
        }(Objects.Object));
        Objects.Tree = Tree;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Link = (function (_super) {
            __extends(Link, _super);
            function Link(object) {
                _super.call(this, object);
                this.radius = this.radius || 1;
                this.href = this.href || '/';
                this.script = this.script || '';
                this.target = this.target || '';
                this.color = this.color || '#00ff00';
                this.hidden = this.hidden || false;
            }
            Link.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'radius':
                        return ('<input type="number">');
                    case 'href':
                        return ('<input type="text">');
                    case 'script':
                        return ('<textarea></textarea>');
                    case 'target':
                        return ('<input type="text">');
                    case 'color':
                        return ('<input type="color">');
                    case 'hidden':
                        return ('<input type="checkbox">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Link.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $inner = $('<i class="fa fa-key" aria-hidden="true"></i>');
                $inner.css('width', object.radius * zoom_selected);
                $inner.css('height', object.radius * zoom_selected);
                $inner.css('border-radius', object.radius * zoom_selected);
                $inner.css('border', '2px solid #000');
                $element.append($inner);
                return $element;
            };
            return Link;
        }(Objects.Object));
        Objects.Link = Link;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Gate = (function (_super) {
            __extends(Gate, _super);
            function Gate(object) {
                _super.call(this, object);
                this.size = this.size || 2;
                this.rotation = this.rotation || 0;
                this.color = this.color || '#00ff00';
                this.key = this.key || '#green';
            }
            Gate.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'size':
                        return ('<input type="number">');
                    case 'rotation':
                        return ('<input type="number">');
                    case 'color':
                        return ('<input type="color">');
                    case 'key':
                        return ('<input type="text">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Gate.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                if (typeof object.size !== 'undefined') {
                    //todo all like this
                    $element.css('width', '0px');
                    $element.css('height', '0px');
                    $element.css('transform', 'rotate(' + object.rotation + 'deg)');
                    var $square = $('<span></span>');
                    $square.css('display', 'block');
                    $square.css('width', object.size * zoom_selected);
                    $square.css('transform', 'translate(-50%, -50%)');
                    $square.css('height', 5);
                    $square.css('background-color', object.color);
                    $element.append($square);
                }
                else {
                    $element.css('width', 20);
                    $element.css('height', 20);
                    $element.css('background-color', '#ccc');
                }
                return $element;
            };
            return Gate;
        }(Objects.Object));
        Objects.Gate = Gate;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Deploy = (function (_super) {
            __extends(Deploy, _super);
            function Deploy(object) {
                _super.call(this, object);
                this.deployType = this.deployType || 'ftp';
                this.server = this.server || '';
                this.username = this.username || '';
                this.password = this.password || '';
                this.directory = this.directory || '';
            }
            Deploy.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'deployType':
                        return ('<input type="text">');
                    case 'server':
                        return ('<input type="text">');
                    case 'username':
                        return ('<input type="text">');
                    case 'password':
                        return ('<input type="password">');
                    case 'directory':
                        return ('<input type="text">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Deploy.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-cloud-upload" aria-hidden="true"></i>');
                return $element;
            };
            return Deploy;
        }(Objects.Object));
        Objects.Deploy = Deploy;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Analytics = (function (_super) {
            __extends(Analytics, _super);
            function Analytics(object) {
                _super.call(this, object);
                this.analyticsType = this.analyticsType || 'gallery';
                this.domain = this.domain || '';
            }
            Analytics.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'analyticsType':
                        return ('<input type="text">');
                    case 'domain':
                        return ('<input type="text">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Analytics.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-database" aria-hidden="true"></i>');
                return $element;
            };
            return Analytics;
        }(Objects.Object));
        Objects.Analytics = Analytics;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="07-protoboard" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        //import analyticsObject = GALLERY.Viewer.analyticsObject;
        //import appState = GALLERY.Viewer.appState;
        var Zone = (function (_super) {
            __extends(Zone, _super);
            function Zone(object) {
                _super.call(this, object);
                this.width = this.width || 1;
                this.height = this.height || 1;
                this.uri = this.uri || '';
                this.uri_level = this.uri_level || 0;
                this.isPickable = this.isPickable || false;
                this.isImportant = this.isImportant || false;
                this.limit = this.limit || false;
                this.limitRotation = this.limitRotation || 0;
                this.limitRotationTolerance = this.limitRotationTolerance || 0;
                //this.selector = this.selector || '';
            }
            Zone.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'design':
                        return ('<input type="text">');
                    case 'name':
                        return ('<input type="text">');
                    case 'html':
                        return ('<textarea></textarea>');
                    case 'buttons':
                        return ('<textarea></textarea>');
                    case 'width':
                        return ('<input type="number">');
                    case 'height':
                        return ('<input type="number">');
                    case 'uri_level':
                        return ('<input type="number">');
                    case 'isPickable':
                        return ('<input type="checkbox">');
                    case 'isImportant':
                        return ('<input type="checkbox">');
                    case 'limit':
                        return ('<input type="checkbox">');
                    case 'limitRotation':
                        return ('<input type="number">');
                    case 'limitRotationTolerance':
                        return ('<input type="number">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Zone.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $block = $('<div>').addClass('image');
                var width = object.width * zoom_selected;
                var height = object.height * zoom_selected;
                $block.css('width', width);
                $block.css('height', height);
                $block.css('background-color', 'rgba(0,0,0,0.5)');
                $block.css('position', 'relative');
                $block.css('top', -height / 2);
                $block.css('left', -width / 2);
                $block.css('transform', 'rotate(' + object.rotation + 'deg)');
                $element.append($block);
                //$element.css('transform','rotate('+object.rotation+'deg)');
                return $element;
            };
            Zone.prototype.createBabylonMesh = function (scene) {
                var mesh = BABYLON.Mesh.CreateBox(this.id, BLOCK_SIZE, scene);
                mesh.material = new BABYLON.StandardMaterial("texture1", scene);
                mesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                mesh.material.alpha = 0.2;
                mesh.position = this.getBabylonPosition();
                mesh.position.y += BLOCK_SIZE; //* BLOCKS_2D_3D_SHAPES.room.length / 2;
                mesh.scaling.y = 1;
                mesh.scaling.x = this.width;
                mesh.scaling.z = this.height;
                mesh.checkCollisions = false;
                mesh.isPickable = false;
                //meshes.push(mesh);
                return (mesh);
            };
            Zone.prototype.isIn = function (position, rotation) {
                var center = this.getBabylonPosition();
                //center.y += BLOCK_SIZE * BLOCKS_2D_3D_SHAPES.room.length / 2;
                var scaling = new BABYLON.Vector3(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                scaling.y = scaling.y * BLOCKS_2D_3D_SHAPES.room.length;
                scaling.x = Math.abs(scaling.x * this.width);
                scaling.z = Math.abs(scaling.z * this.height);
                //r((center.x-scaling.x)+' - '+position.x+' - '+(center.x+scaling.x));
                var isInPosition = (center.x - scaling.x / 2 <= position.x &&
                    center.x + scaling.x / 2 >= position.x &&
                    center.y - scaling.y / 2 <= position.y &&
                    center.y + scaling.y / 2 >= position.y &&
                    center.z - scaling.z / 2 <= position.z &&
                    center.z + scaling.z / 2 >= position.z);
                if (!isInPosition) {
                    return false;
                }
                else if (!this.limit) {
                    return true;
                }
                else {
                    var rotation_deg = (rotation.y / Math.PI) * 180;
                    var delta = rotation_deg - this.limitRotation;
                    delta = Math.abs(delta % 360);
                    //r(delta);
                    if (delta < this.limitRotationTolerance / 2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            };
            return Zone;
        }(Objects.ProtoBoard));
        Objects.Zone = Zone;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var GroundHole = (function (_super) {
            __extends(GroundHole, _super);
            function GroundHole(object) {
                _super.call(this, object);
                this.width = this.width || 1;
                this.height = this.height || 1;
            }
            GroundHole.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'width':
                        return ('<input type="number">');
                    case 'height':
                        return ('<input type="number">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            GroundHole.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $block = $('<div>').addClass('image');
                var width = object.width * zoom_selected;
                var height = object.height * zoom_selected;
                $block.css('width', width);
                $block.css('height', height);
                $block.css('background-color', 'rgba(0,0,100,0.5)');
                $block.css('position', 'relative');
                $block.css('top', -height / 2);
                $block.css('left', -width / 2);
                $block.css('transform', 'rotate(' + object.rotation + 'deg)');
                $element.append($block);
                //$element.css('transform','rotate('+object.rotation+'deg)');
                return $element;
            };
            return GroundHole;
        }(Objects.Object));
        Objects.GroundHole = GroundHole;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
//import {Zone} from '10-zone';
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Environment = (function (_super) {
            __extends(Environment, _super);
            function Environment(object) {
                _super.call(this, object);
                this.ground = this.ground || 'grass';
                this.skybox = this.skybox || 'TropicalSunnyDay';
                this.skyboxSize = this.skyboxSize || 10000;
                this.skybox_reverse = this.skybox_reverse || false;
                this.fogDensity = this.fogDensity || 0;
                this.fogColor = this.fogColor || '#ffffff';
                this.clearColor = this.clearColor || '#ffffff';
                this.endlessStructures = this.endlessStructures || false;
                this.endlessStructuresFromStorey = this.endlessStructuresFromStorey || '1NP';
                this.shadows = this.shadows || false;
            }
            Environment.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'ground':
                        return ('<input type="text">');
                    case 'skybox':
                        return ('<input type="text">');
                    case 'skyboxSize':
                        return ('<input type="number">');
                    case 'skybox_reverse':
                        return ('<input type="checkbox">');
                    case 'fogDensity':
                        return ('<input type="range" min="0" max="0.05" step="0.0001">');
                    case 'fogColor':
                        return ('<input type="color">');
                    case 'clearColor':
                        return ('<input type="color">');
                    case 'endlessStructures':
                        return ('<input type="checkbox">');
                    case 'endlessStructuresFromStorey':
                        return ('<input type="text">');
                    case 'shadows':
                        return ('<input type="checkbox">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Environment.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-cube" aria-hidden="true"></i>');
                return $element;
            };
            Environment.prototype.createBabylonMesh = function (scene) {
                return null;
            };
            Environment.prototype.isIn = function () {
                return true;
            };
            return Environment;
        }(Objects.Zone));
        Objects.Environment = Environment;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
var STATSERVER_URL = 'http://webappgames.com:48567';
var OBJECT_TYPES = ['zone', 'groundhole', 'stairs', 'poster', 'button', 'environment', 'light', 'label', 'tree', 'link', 'gate', 'deploy', 'analytics', 'board', 'boardamorph'];
var DOT_OBJECTS = ['zone', 'groundhole', 'environment', 'light', 'label', 'tree', 'link', 'gate', 'deploy', 'analytics', 'board', 'boardamorph'];
var BLOCK_SIZE = 5;
//var BLOCK_SIZE_VERTICAL=10;
//var BLOCK_SIZE_DOOR=2;
var RESPAWN_VERTICAL = -30;
var EYE_VERTICAL = 2.5;
var LIGHT_VERTICAL = 3;
var SPEED = 7;
var SPEED_INERTIA = 0.5;
var SPEED_ROTATION = Math.PI / 2;
var MOUSE_ANGULAR_SENSIBILITY = 1000;
var BLOCK_SHAPES = ['none', 'current', 'room', 'wall', 'wall-noroof', 'door', 'big-door', 'giant-door', 'giant-door-noroof', 'window', 'low-window', 'floor', 'ceil', 'small-fence', 'medium-fence', 'big-fence', 'combo-wall'];
var BLOCKS_2D_3D_SHAPES = {
    'room': [1, 0, 0, 0, 0, 0, 0, 0, 1],
    'door': [1, 0, 0, 0, 1, 1, 1, 1, 1],
    'big-door': [1, 0, 0, 0, 0, 1, 1, 1, 1],
    'giant-door': [1, 0, 0, 0, 0, 0, 1, 1, 1],
    'giant-door-noroof': [1, 0, 0, 0, 0, 0, 1, 1, 0],
    'gate': [1, 0, 0, 0, 1, 1, 1, 1, 1],
    'wall': [1, 1, 1, 1, 1, 1, 1, 1, 1],
    'wall-noroof': [1, 1, 1, 1, 1, 1, 1, 1, 0],
    'window': [1, 1, 1, 0, 0, 1, 1, 1, 1],
    'low-window': [1, 1, 0, 0, 1, 1, 1, 1, 1],
    'floor': [1, 0, 0, 0, 0, 0, 0, 0, 0],
    'ceil': [0, 0, 0, 0, 0, 0, 0, 0, 1],
    'small-fence': [1, 1, 0, 0, 0, 0, 0, 0, 0],
    'medium-fence': [1, 1, 1, 0, 0, 0, 0, 0, 0],
    'big-fence': [1, 1, 1, 1, 0, 0, 0, 0, 0]
};
var STOREYS = [
    '3PP',
    '2PP',
    '1PP',
    '1NP',
    '2NP',
    '3NP',
    '4NP',
    '5NP',
    '6NP'
];
var BLOCKS_1NP_LEVEL = (0.5 - 0.9);
var BLOCKS_STOREYS_LEVELS = {
    '3PP': -3 * 8,
    '2PP': -2 * 8,
    '1PP': -1 * 8,
    '1NP': 0 * 8,
    '2NP': 1 * 8,
    '3NP': 2 * 8,
    '4NP': 3 * 8,
    '5NP': 4 * 8,
    '6NP': 5 * 8,
};
var BLOCK_MATERIALS = [
    //'color-white',
    'color-light-gray',
    'color-dark-gray',
    'clay-bricks',
    'clay-roof',
    'grass',
    'iron-plates',
    'stone-bricks',
    'stone-plain',
    'wood-boards',
    'wood-fence',
    'wood-raw'];
//--------------------------------------------------------------Only for Editor
var ZOOMS = [
    '5',
    '10',
    '20',
    '30',
    '50'
];
/// <reference path="../reference.ts" />
var r = console.log.bind(console);
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
var PH;
(function (PH) {
    var Notification = (function () {
        function Notification(work, text) {
            this.work = work;
            this.tag = 'tag' + Math.random();
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                console.warn("This browser does not support desktop notification");
            }
            else if (window.Notification.permission === "granted") {
                // If it's okay let's create a notification
                this.create(text);
            }
            else if (window.Notification.permission !== 'denied') {
                window.Notification.requestPermission(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        this.create(text);
                    }
                });
            }
            // At last, if the user has denied notifications, and you
            // want to be respectful there is no need to bother them any more.
        }
        Notification.prototype.create = function (text) {
            console.log(this.work + ': ' + text);
            this.notification = new window.Notification(this.work + ': ' + text, { tag: this.tag });
        };
        Notification.prototype.update = function (text) {
            try {
                this.notification.close();
                this.create(text);
            }
            catch (e) {
            }
        };
        return Notification;
    }());
    PH.Notification = Notification;
})(PH || (PH = {}));
/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/babylon.d.ts" />
/// <reference path="script/uri-plugin.ts" />
/// <reference path="script/05-objects/00-array.ts" />
/// <reference path="script/05-objects/05-compiled-array.ts" />
/// <reference path="script/05-objects/05-object.ts" />
/// <reference path="script/05-objects/10-block.ts" />
/// <reference path="script/05-objects/10-multiblock.ts" />
/// <reference path="script/05-objects/10-image.ts" />
/// <reference path="script/05-objects/10-poster.ts" />
/// <reference path="script/05-objects/10-button.ts" />
/// <reference path="script/05-objects/10-label.ts" />
/// <reference path="script/05-objects/10-light.ts" />
/// <reference path="script/05-objects/10-stairs.ts" />
/// <reference path="script/05-objects/10-tree.ts" />
/// <reference path="script/05-objects/10-link.ts" />
/// <reference path="script/05-objects/10-gate.ts" />
/// <reference path="script/05-objects/10-deploy.ts" />
/// <reference path="script/05-objects/10-analytics.ts" />
/// <reference path="script/05-objects/10-zone.ts" />
/// <reference path="script/05-objects/10-groundhole.ts" />
/// <reference path="script/05-objects/10-board.ts" />
/// <reference path="script/05-objects/20-environment.ts" />
/// <reference path="script/scene-config.ts" />
/// <reference path="script/00-common.ts" />
/// <reference path="script/guid.ts" />
/// <reference path="script/notifications.ts" />
/// <reference path="reference.ts" />
function createObject$(object) {
    //r(object.create$Element());
    return object.create$Element();
}
/// <reference path="reference.ts" />
var controls_keys = {
    'UP': [38, 87],
    'DOWN': [40, 83],
    'LEFT': [37, 65],
    'RIGHT': [39, 68]
};
//------------------------------------------------------------
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 90 && e.ctrlKey) {
        undo();
    }
    // space and arrow keys
    /*if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {

        //if(T.UI.Status.focusOnMap()){
        e.preventDefault();
        //}


    }*/
}, false);
//------------------------------------------------------------
var keys = [];
var moving = false;
var controls_down = {
    update: function () {
        for (var control in controls_keys) {
            this[control] = false;
            for (var i = 0, l = keys.length; i < l; i++) {
                if (controls_keys[control].indexOf(keys[i]) !== -1) {
                    this[control] = true;
                }
            }
        }
    }
};
window.addEventListener('keydown', function (e) {
    //if(T.UI.Status.focusOnMap()) {
    r('DOWN', e.keyCode);
    if (keys.indexOf(e.keyCode) === -1) {
        keys.push(e.keyCode);
        controls_down.update();
    }
    //}
});
window.addEventListener('keyup', function (e) {
    //if(T.UI.Status.focusOnMap()) {
    r('UP', e.keyCode);
    var i = keys.indexOf(e.keyCode);
    if (i != -1) {
        keys.splice(i, 1);
        controls_down.update();
    }
    //}
});
var $admin_world_parts;
$(function () {
    $admin_world_parts = $('#admin-world-parts').find('#admin-world, #admin-world-canvas');
    r('$admin_world_parts', $admin_world_parts);
});
var last = null;
var keys_tick = function (timestamp) {
    if (!last)
        last = timestamp;
    var progress = (timestamp - last) / 1000;
    last = timestamp;
    //if(window_opened)return;
    var speed = progress * 300;
    if (controls_down.UP) {
        window_center.y += speed;
        $admin_world_parts.css('top', '+=' + speed + 'px');
    }
    if (controls_down.DOWN) {
        window_center.y -= speed;
        $admin_world_parts.css('top', '-=' + speed + 'px');
    }
    if (controls_down.LEFT) {
        window_center.x += speed;
        $admin_world_parts.css('left', '+=' + speed + 'px');
    }
    if (controls_down.RIGHT) {
        window_center.x -= speed;
        $admin_world_parts.css('left', '-=' + speed + 'px');
    }
    if (controls_down.UP || controls_down.DOWN || controls_down.LEFT || controls_down.RIGHT) {
        moving = true;
        drawing = false;
    }
    else {
        if (moving) {
            moving = false;
            $admin_world_parts.css('top', '0px').css('left', '0px');
            createMap();
        }
    }
    requestAnimationFrame(keys_tick);
};
requestAnimationFrame(keys_tick);
/// <reference path="reference.ts" />
var gallery = false;
var password = false;
var config;
$.get('../../config.json').done(function (response) {
    config = response;
    r('loaded config');
    $.get(config.GALLERY_API_URL + 'galleries').done(function (response) {
        var $ul = $('#select-gallery').find('ul');
        $ul.html('');
        response.forEach(function (item) {
            $ul.append('<li>' + item + '</li>');
        });
        $ul.find('li').click(function () {
            $('#select-gallery').find('input[name="gallery"]').val($(this).html());
        });
        processFirstLogin();
    });
});
var objects;
var loaded = false;
function loginOrCreate(testing_gallery, testing_password) {
    $.get({
        url: config.GALLERY_API_URL + 'galleries/' + testing_gallery,
        headers: { 'x-auth': testing_password }
    }).done(function (response) {
        gallery = testing_gallery;
        password = testing_password;
        window.localStorage.setItem('gallery', gallery);
        window.localStorage.setItem('password', password);
        loaded = true;
        r(response);
        objects = new GALLERY.Objects.Array(response);
        //$('#show-gallery').attr('href','../viewer?gallery='+gallery);
        createMap();
        $('#select-gallery').hide();
    }).fail(function (response) {
        if (response.status == 403) {
            alert('Špatné heslo!');
        }
        else if (response.status == 404) {
            if (confirm('Galerie s názvem ' + testing_gallery + ' neexistuje, chcete vytvořit novou prázdnou se zadaným heslem?')) {
                $.post({
                    url: config.GALLERY_API_URL + 'galleries/' + testing_gallery,
                    contentType: "application/json",
                    data: JSON.stringify([]),
                    headers: { 'x-auth': testing_password }
                }).done(function (response) {
                    console.log('done', response);
                    Message.success('Byla vytvořena nová galerie!');
                    gallery = testing_gallery;
                    password = testing_password;
                    window.localStorage.setItem('gallery', gallery);
                    window.localStorage.setItem('password', password);
                    loaded = true;
                    objects = new GALLERY.Objects.Array();
                    //$('#show-gallery').attr('href','../viewer?gallery='+gallery);
                    createMap();
                    $('#select-gallery').hide();
                }).fail(function () {
                });
            }
        }
    });
}
function logout() {
    if (confirm('Opravdu se chcete odhlásit?')) {
        gallery = undefined;
        password = undefined;
        window.localStorage.removeItem('gallery');
        window.localStorage.removeItem('password');
        loaded = false;
        $('#select-gallery').show();
    }
}
function processFirstLogin() {
    var testing_gallery = window.localStorage.getItem('gallery');
    var testing_password = window.localStorage.getItem('password');
    if (testing_gallery && testing_password) {
        loginOrCreate(testing_gallery, testing_password);
    }
    $('#select-gallery').submit(function (e) {
        e.preventDefault();
        var testing_gallery = $(this).find('input[name="gallery"]').val();
        var testing_password = $(this).find('input[name="password"]').val();
        loginOrCreate(testing_gallery, testing_password);
    });
    /*$.get(config.GALLERY_API_URL +'galleries/'+ gallery).done(function (response) {


        console.log('done', response);

        05-objects = response;
        createMap()


    }).fail(function () {


        $.post({
            url: config.GALLERY_API_URL +'galleries/'+ gallery,
            contentType: "application/json",
            data: JSON.stringify([])

        }).done(function (response) {


            console.log('done', response);

            Message.success('Byla vytvořena nová galerie!');

            05-objects = [];
            createMap()


        }).fail(function () {
        });


    });*/
    /*$('#select-gallery').find('input[name="gallery"]').val('test-local2');
    $('#select-gallery').find('input[name="password"]').val('xxx');
    $('#select-gallery').trigger('submit');
    /**/
}
;
'use strict';
var MESSAGE_DURATION = 1;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
var Message = function () {
    function _class(text) {
        var type = arguments.length <= 1 || arguments[1] === undefined ? 'INFO' : arguments[1];
        var additional = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        _classCallCheck(this, _class);
        //todo [PH] play sound here
        //ion.sound.play("bell_ring");
        this.$element = $('<div class="message"></div>').addClass(type.toLowerCase()).text(text);
        if (additional) {
            this.$element.append(additional);
        }
        if (!text && !additional) {
            this.$element.hide();
        }
        var self = this;
        $('#message-zone').append(self.$element);
    }
    _createClass(_class, [{
            key: 'get$',
            value: function get$() {
                return this.$element;
            }
        }, {
            key: 'close',
            value: function close() {
                var s = arguments.length <= 0 || arguments[0] === undefined ? MESSAGE_DURATION : arguments[0];
                var self = this;
                return setTimeout(function () {
                    $(function () {
                        self.$element.remove();
                    });
                    //self.$element.fadeOut(MESSAGE_FADEOUT, function() {$( this ).remove();});
                }, s * 1000);
            }
        }, {
            key: 'text',
            value: function text(_text, type) {
                if (_text) {
                    this.$element.text(_text).show();
                }
                if (type) {
                    this.$element.removeClass('error');
                    this.$element.removeClass('success');
                    this.$element.removeClass('info');
                    this.$element.removeClass('warning');
                    this.$element.addClass(type.toLowerCase());
                }
                return this;
            }
        }], [{
            key: 'error',
            value: function error(text) {
                var message = new Message(text, 'ERROR');
                //if (text) message.close();
                return message;
            }
        }, {
            key: 'success',
            value: function success(text) {
                var message = new Message(text, 'SUCCESS');
                //if (text) message.close();
                return message;
            }
        }, {
            key: 'info',
            value: function info(text) {
                var message = new Message(text, 'INFO');
                //if (text) message.close();
                return message;
            }
        }]);
    return _class;
}();
/// <reference path="reference.ts" />
$(function () {
    $('.new').click(function () {
        var size = {
            x: 16,
            y: 8
        };
        var shape;
        blocks = [];
        for (var y = -size.y; y <= size.y; y++) {
            for (var x = -size.x; x <= size.x; x++) {
                if (y == size.y && x == 0) {
                    shape = 'door';
                }
                else if (x == size.x || y == size.y || x == -size.x || y == -size.y) {
                    shape = 'wall';
                }
                else {
                    shape = 'room';
                }
                blocks.push({
                    id: createGuid(),
                    type: 'block',
                    position: { x: x, y: y },
                    shape: shape
                });
            }
        }
        objects = blocks;
        createMap();
        save();
    });
});
/// <reference path="reference.ts" />
jQuery.fn.outerHTML = function (s) {
    var html = '';
    for (var i = 0, l = this.length; i < l; i++) {
        if (typeof this[i].outerHTML === 'string') {
            html += this[i].outerHTML;
        }
    }
    return (html);
};
/// <reference path="reference.ts" />
function runGenerator(generatorFunction) {
    var images = objects.filter(function (object) {
        return (object.type === 'image');
    });
    //r(images);
    var new_objects = generatorFunction(images);
    objects = new_objects;
    save();
    createMap();
}
/// <reference path="reference.ts" />
function getPositionFromLeftTop(left, top) {
    var offset = $(this).offset();
    var x = (left - window_center.x) / zoom_selected;
    var y = (top - window_center.y) / zoom_selected;
    return ({ x: x, y: y });
}
/// <reference path="reference.ts" />
var last_objects;
function cleanStorey() {
    if (confirm('Opravdu chcete vymazat vše v aktuálním podlaží ' + storey_selected + '?')) {
        var new_objects = objects.getAll().filter(function (object) {
            if (object.storey == storey_selected && object.world == world_selected) {
                return (false);
            }
            else {
                return (true);
            }
        });
        objects = new GALLERY.Objects.Array(new_objects);
        saveAndRedraw();
    }
}
function cleanWorld() {
    if (confirm('Opravdu chete vymazat vše ve světě ' + world_selected + ' a začít znovu?')) {
        var new_objects = objects.getAll().filter(function (object) {
            if (object.world == world_selected) {
                return (false);
            }
            else {
                return (true);
            }
        });
        objects = new GALLERY.Objects.Array(new_objects);
        saveAndRedraw();
    }
}
function copyStorey() {
    var storey = prompt('Jaké podlaží chcete zkopírovat?', (parseInt(storey_selected) - 1) + 'NP');
    var new_objects = objects.filterWorld(world_selected).filterStorey(storey);
    new_objects.forEach(function (object) {
        var new_object = object.clone();
        new_object.id = createGuid();
        new_object.storey = storey_selected;
        objects.push(new_object);
    });
    saveAndRedraw();
}
function saveAndRedraw() {
    createMap();
    save();
}
function undo() {
    console.warn('Undo not yet working');
    //objects = last_objects;
    //createMap();
}
function save(force) {
    if (force === void 0) { force = false; }
    if (!loaded) {
        console.warn('Cant save because not yet loaded!');
        return;
    }
    $button = $('#save');
    if (!force && objects.getAll().length > 1000) {
        $button.addClass('unsaved');
        $button.html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Uložit'); //todo fa
    }
    else {
        $button.removeClass('unsaved');
        putToServer();
    }
}
function putToServer() {
    //last_objects = JSON.parse(JSON.stringify(objects.getAll()));
    $button = $('#save');
    $button.html('<i class="fa fa-refresh fa-spin fa-fw"></i>Ukládání'); //todo fa
    /*blocks = [];

     $('#admin-world').find('.block,.light').each(function () {

     var $this = $(this);
     var x = $this.attr('data-x');
     var y = $this.attr('data-y');
     var type = $this.attr('data-type');
     var material = $this.attr('data-material');



     blocks.push({
     position:{x:x,y:y},
     type: type,
     material: material
     });
     //createMap();

     });*/
    $.ajax({
        method: 'PUT',
        url: config.GALLERY_API_URL + 'galleries/' + gallery,
        contentType: "application/json",
        data: JSON.stringify(objects.getAll()),
        headers: { 'x-auth': password }
    }).done(function (response) {
        var date = new Date();
        var datetime = date.getHours() + ":" + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes()); //+ ":" + date.getSeconds();
        $button.html('Uloženo ' + datetime); //todo datum
        //console.log('done',response);
    }).fail(function (response) {
        //console.log('fail',response);
    });
}
;
$(function () {
    $('#save').click(function () {
        save(true);
    });
});
var GALLERY;
(function (GALLERY) {
    var ImagesCollection = (function () {
        /**
         *
         * @param {object} files
         * @param {string} url Prefix of image urls
         * @constructor
         */
        function ImagesCollection() {
            this.images = {};
            this.colors = {};
            this.images_loaded = 0;
            this.images_count = 0;
        }
        ImagesCollection.prototype.addImageAsDOM = function (key, image) {
            this.images[key] = image;
            this.images_loaded++;
            this.images_count++;
        };
        ImagesCollection.prototype.addImage = function (key, src) {
            var image = document.createElement("img");
            image.src = src;
            this.addImageAsDOM(key, image);
        };
        ImagesCollection.prototype.getOrAdd = function (key, src) {
            if (typeof this.images[key] === 'undefined') {
                this.addImage(key, src);
            }
            return (this.get(key));
        };
        ImagesCollection.prototype.loaded = function () {
            var percent = this.images_loaded / this.images_count;
            if (percent > 1)
                percent = 1;
            return (percent);
        };
        ImagesCollection.prototype.get = function (key) {
            if (typeof this.images[key] === 'undefined') {
                console.log(this.images);
                throw new Error('In this collection is not image with key ' + key + '. There are only these keys.');
            }
            return (this.images[key]);
        };
        ImagesCollection.prototype.getColor = function (key) {
            if (this.loaded() !== 1) {
                throw new Error('Not yet loaded!');
            }
            //r(this.colors);
            if (typeof this.colors[key] === 'undefined') {
                var image = this.get(key);
                this.colors[key] = getAverageRGB(image);
            }
            return (this.colors[key]);
        };
        //todo jsdoc
        ImagesCollection.prototype.getAll = function (key) {
            return (this.images);
        };
        //todo jsdoc
        ImagesCollection.prototype.getInput = function (NameOfRadios, AdditionalClass) {
            if (AdditionalClass === void 0) { AdditionalClass = ''; }
            var html = '';
            //r(this.files);
            for (var key in this.files) {
                html += "\n            <input type=\"radio\" name=\"" + NameOfRadios + "\" id=\"" + NameOfRadios + "-" + key + "\" value=\"" + key + "\" class=\"" + AdditionalClass + "\" />\n            <label for=\"" + NameOfRadios + "-" + key + "\">\n                <img src=\"" + this.url + this.files[key] + "\">\n            </label>\n            ";
            }
            html = '<div class="textures-input">' + html + '</div>';
            //r(html);
            //alert(html);//todo purge Towns from commented alert, r, console.log, ect..
            return (html);
        };
        return ImagesCollection;
    }());
    GALLERY.ImagesCollection = ImagesCollection;
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
//----------------------------------------------------------------------
// file drop
document.addEventListener("dragover", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("dragleave", function (e) {
    e.preventDefault();
}, false);
function setImageWidth(src, object, height, onDone) {
    var image = new Image();
    image.src = src;
    image.onload = function () {
        /*let object = objects.getObjectById(id);
        if(!object){
            throw new Error('There is no object with id '+id);
        }*/
        var width = (this.width * height) / this.height;
        object.width = width;
        r('setting image width', object);
        onDone();
        save();
    };
}
document.addEventListener("drop", function (e) {
    e.preventDefault();
    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
    //r(files);
    if (files.length == 0) {
        r('Shit dropped.');
        return;
    }
    r(files);
    //r(files[0].name.substr(-5));
    if (files.length == 1 && files[0].name.substr(-5) == '.json') {
        //alert('json');
        var reader = new FileReader();
        reader.onloadend = function (e) {
            var new_objects = JSON.parse(this.result);
            if (confirm('Chcete importovat ' + new_objects.length + ' objektů a přepsat vše ostatní?')) {
                objects = new GALLERY.Objects.Array(new_objects);
                saveAndRedraw();
            }
        };
        reader.readAsText(files[0]);
        return;
    }
    var position = getPositionFromLeftTop(e.clientX, e.clientY);
    var filesArray = [];
    for (var i = 0; i < files.length; i++) {
        filesArray.push(files[i]);
    }
    filesArray.forEach(function (file) {
        var filename = file.name;
        var message = Message.info(filename + ': Nahrávání...');
        TOWNS.CDN.uploadFiles([file], function (progress) {
            message.text(filename + ': ' + progress + '%');
        }, function (response) {
            var url = response[0];
            var object;
            objects.push(object = new GALLERY.Objects.Image({
                id: createGuid(),
                type: 'image',
                position: position,
                storey: storey_selected,
                world: world_selected,
                name: file.name,
                src: url,
                height: 2,
                rotation: 0,
                onGround: false,
                hasAlpha: false,
                isEmitting: true,
                name: '',
                uri: ''
            }));
            message.text(filename + ': Nastavování velikosti obrázku');
            setImageWidth(url, object, 2, function () {
                message.text(filename + ': Hotovo', 'success').close();
            });
            //position={x:position.x,y:position.y+2};
            createMap();
        }, function (errorMessage) {
            console.warn('error while uploading', errorMessage);
            message.text(filename + ': ' + errorMessage, 'error');
        });
    });
    //-----------------
}, false);
//});
/// <reference path="reference.ts" />
var world_selected;
var WORLDS = ['main'];
function createWorldsPallete() {
    $('.select-worlds').find('ul').html('');
    var $ul = $('.select-worlds').find('ul');
    WORLDS.forEach(function (world) {
        var $li = $('<li></li>');
        $li.text(world);
        $li.attr('data-world', world);
        if (world == world_selected) {
            $li.addClass('selected');
        }
        $ul.append($li);
    });
    $('.select-worlds').find('ul').find('li').click(function () {
        world_selected = $(this).attr('data-world');
        if (selected_object) {
            r('Moving selected object to new world!');
            selected_object.world = world_selected;
        }
        saveAndRedraw();
    });
}
$(function () {
    createWorldsPallete();
    $('.select-worlds').find('ul').find('li').first().trigger('click');
});
//-------------------------------------------------------------
var storey_selected;
$(function () {
    STOREYS.forEach(function (storey) {
        $('.select-storeys').find('ul').append($('<li></li>').text(storey).attr('data-storey', storey));
    });
    $('.select-storeys').find('ul').find('li').click(function () {
        //r(this);
        $('.select-storeys').find('ul').find('li').removeClass('selected');
        $(this).addClass('selected');
        storey_selected = $(this).attr('data-storey');
        if (selected_object) {
            r('Moving selected object to new storey!');
            selected_object.storey = storey_selected;
        }
        saveAndRedraw();
    }).first().next().next().next().trigger('click');
});
//-------------------------------------------------------------
var zoom_selected;
$(function () {
    ZOOMS.forEach(function (zoom) {
        $('.select-zooms').find('ul').append($('<li></li>').text(zoom).attr('data-zoom', zoom));
    });
    $('.select-zooms').find('ul').find('li').click(function () {
        //r(this);
        $('.select-zooms').find('ul').find('li').removeClass('selected');
        $(this).addClass('selected');
        zoom_selected = $(this).attr('data-zoom') / 1;
        createMap();
    }).first().next().next().next().trigger('click'); //todo better
});
//-------------------------------------------------------------
var material_selected, shape_selected, opacity_selected;
$(function () {
    BLOCK_MATERIALS.forEach(function (material) {
        //r('creating block to pallete');
        $('.select-textures').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: material
        })));
    });
    ['#cccccc', '#444444'].forEach(function (material) {
        //r('creating block to pallete');
        $('.select-colors').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: material
        })));
    });
    $('.select-colors').find('input').change(function () {
        $('.select-colors').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: $(this).val()
        })));
        materialClick();
    });
    BLOCK_SHAPES.forEach(function (shape) {
        $('.select-shapes').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: shape,
            material: 'stone-plain',
        })));
    });
    for (var opacity = 1; opacity > 0; opacity -= 0.1) {
        $('.select-opacity').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: 'stone-plain',
            opacity: opacity
        })));
    }
    function materialClick() {
        $('.palette').find('.select-materials').find('.block').click(function () {
            $('.palette').find('.select-materials').find('.block').removeClass('selected');
            $(this).addClass('selected');
            material_selected = $(this).attr('data-material');
        }).last().trigger('click');
    }
    materialClick();
    $('.palette').find('.select-shapes').find('.block').click(function () {
        $('.palette').find('.select-shapes').find('.block').removeClass('selected');
        $(this).addClass('selected');
        shape_selected = $(this).attr('data-shape');
    }).first().trigger('click');
    $('.palette').find('.select-opacity').find('.block').click(function () {
        $('.palette').find('.select-opacity').find('.block').removeClass('selected');
        $(this).addClass('selected');
        opacity_selected = parseFloat($(this).attr('data-opacity'));
        r(opacity_selected);
    }).first().trigger('click');
});
//===================================================================================================
$(function () {
    OBJECT_TYPES.forEach(function (type) {
        var $dot_object = createObject$(GALLERY.Objects.Object.init({
            type: type
        }));
        //r(type,$dot_object);
        $dot_object.draggable({
            //helper: 'clone',
            stop: function () {
                var offset = $(this).offset();
                var position = getPositionFromLeftTop(offset.left, offset.top);
                var object = {
                    id: createGuid(),
                    type: type,
                    position: position,
                    world: world_selected,
                    storey: storey_selected
                };
                /*if(type == 'light'){
                    object.color = '#ffffff';
                    object.intensity = 1;
                }else
                if(type == 'label'){
                    object.name = '';
                    object.uri = '';
                    object.rotation = 0;
                }
                if(type == 'stairs'){
                    object.width = 10;
                    object.height = 2;
                    object.rotation = 0;
                    object.isFull = false;

                }else
                if(type == 'link'){


                    object.radius = 1;
                    object.href = '/';
                    object.target = '';


                    object.color = '#00ff00';
                    object.opacity = '0.9';



                }else
                if(type == 'gate'){
                    object.size = 2;
                    object.rotation = 0;
                    object.color = '#00ff00';
                    object.opacity = '0.9';
                    object.key = '#red';
                }*/
                objects.push(object);
                createMap();
                save();
                $(this)
                    .css('left', 0)
                    .css('top', 0);
                //r(x,y);
            }
        });
        $('.select-dot-objects').append($dot_object);
    });
});
/*function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
*/
/*
function download(filename, contentType, content)
{
    if(!contentType) contentType = 'application/octet-stream';
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}*/
var GALLERY;
(function (GALLERY) {
    var Editor;
    (function (Editor) {
        function exportJSON() {
            saveAs(new Blob([JSON.stringify(objects.getAll(), null, 4)], { type: "application/json;charset=utf-8" }), gallery + ".json");
            //download(gallery+'.json','application/json',JSON.stringify(objects.getAll(),null,4));
        }
        Editor.exportJSON = exportJSON;
        function exportJSONCompiled() {
            compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);
            saveAs(new Blob([JSON.stringify(compiled_objects.getAll(), null, 4)], { type: "application/json;charset=utf-8" }), gallery + ".compiled.json");
            //download(gallery+'.json','application/json',JSON.stringify(objects.getAll(),null,4));
        }
        Editor.exportJSONCompiled = exportJSONCompiled;
    })(Editor = GALLERY.Editor || (GALLERY.Editor = {}));
})(GALLERY || (GALLERY = {}));
/*<?php

    error_reporting(E_ALL & ~E_NOTICE);

$config = json_decode(file_get_contents('../config.json'),true);


if(isset($_GET['gallery'])) {

    $gallery = $_GET['gallery'];

}else{

    http_response_code(404);
    die('Galerie neexistuje!');

}




$response = file_get_contents($config['GALLERY_API_URL'].'galleries/'.($gallery));
if($response) {

    $objects = json_decode($response, true);

}else{

    http_response_code(404);
    die('Galerie neexistuje!');

}


$page = array();
foreach($objects as $object) {

    if ($object['uri'] == '/') {

        $page['name'] = $object['name'];
        $index_label = $object;

    }
    if ($object['name'] == 'favicon') {

        $page['favicon'] = $object['src'];

    }
}


?>
*/
/*$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
                // setup all variables
                var xhr = new XMLHttpRequest(),
                    url = options.url,
                    type = options.type,
                    async = options.async || true,
                    // blob or arraybuffer. Default is blob
                    dataType = options.responseType || "blob",
                    data = options.data || null,
                    username = options.username || null,
                    password = options.password || null;

                xhr.addEventListener('load', function(){
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers ) {
                    xhr.setRequestHeader(i, headers[i] );
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});*/
var compiled_objects;
var GALLERY;
(function (GALLERY) {
    var Editor;
    (function (Editor) {
        function compile() {
            compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);
            r(compiled_objects);
            previewHTML();
        }
        Editor.compile = compile;
        function previewHTML() {
            var gallery_domain;
            var gallery_password;
            var analyticsObject = objects.filterTypes('analytics').findBy('analyticsType', 'gallery');
            var deployObject = objects.filterTypes('deploy').findBy('deployType', 'ftp');
            localStorage.setItem('preview-compiledObjects', JSON.stringify(compiled_objects.getAll()));
            localStorage.setItem('preview-analyticsObject', JSON.stringify(analyticsObject));
            localStorage.setItem('preview-deployObject', JSON.stringify(deployObject));
            var previewWindow = window.open("../#preview", "gallery-preview");
            /*let previewLoaded = setInterval(function () {
    
                try{
    
                    let compiled_objects_ = new preview.GALLERY.Objects.Array(JSON.parse(JSON.stringify(compiled_objects.getAll())));
                    preview.GALLERY.Viewer.run.call(preview,compiled_objects_,true,deployObject,analyticsObject);
                    clearInterval(previewLoaded);
    
                }catch(e){
    
                    r('Not yet loaded!');
                    r(e);
                }
    
    
            },500);*/
            /*var theWindow = window.open("../viewer", "gallery-preview"),
                theDoc = theWindow.document,
                theScript = document.createElement('script');
            function injectThis() {
                // The code you want to inject goes here
                alert(document.body.innerHTML);
            }
            theScript.innerHTML = 'window.onload = ' + injectThis.toString() + ';';
            theDoc.body.appendChild(theScript);*/
            /*preview.onload = function () {
    
                r('loaded');
    
                preview.objects = compiled_objects;
                preview.moveToBegining();
    
            };
    
            */
        }
        Editor.previewHTML = previewHTML;
    })(Editor = GALLERY.Editor || (GALLERY.Editor = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var VIEWER_SCRIPT, VIEWER_STYLE;
/*
r('VIEWER_SCRIPT');
$.get('/viewer/script/viewer.js').done(function (response) {

    VIEWER_SCRIPT = response;
    r('VIEWER_SCRIPT',VIEWER_SCRIPT);


});*/
var request_script = new XMLHttpRequest();
request_script.open('GET', '/viewer/script/viewer.js');
request_script.onreadystatechange = function () {
    VIEWER_SCRIPT = request_script.responseText;
};
request_script.send();
var request_style = new XMLHttpRequest();
request_style.open('GET', '/viewer/style/viewer.css');
request_style.onreadystatechange = function () {
    VIEWER_STYLE = request_style.responseText;
};
request_style.send();
var GALLERY;
(function (GALLERY) {
    var Plugins;
    (function (Plugins) {
        var Generators;
        (function (Generators) {
            function SimpleGarden(images) {
                var min_size = 10;
                var distance_between_images = 1;
                var width = 0; //4 * distance_between_images;
                images.forEach(function (image) {
                    //r(image);
                    width += image.width;
                    width += distance_between_images;
                });
                width = width / 4;
                width = Math.ceil(width);
                width += 2;
                var new_objects = [];
                var shape;
                for (var x = 0; x < width; x++) {
                    for (var y = 0; y < width; y++) {
                        if (x === 0 || y === 0 || x === width - 1 || y === width - 1) {
                            shape = 'wall';
                        }
                        else {
                            shape = 'room';
                        }
                        new_objects.push({
                            type: 'block',
                            position: { x: x - width / 2, y: y - width / 2 },
                            storey: '1NP',
                            shape: shape,
                            material: 'stone-plain'
                        });
                    }
                }
                var walls = new_objects.filter(function (object) {
                    return (object.type === 'block' && object.shape === 'wall');
                });
                var positions_rotations = [];
                walls.forEach(function (wall) {
                    var testing_positions_rotations = [
                        { x: wall.position.x - 1, y: wall.position.y, rotation: 0 },
                        { x: wall.position.x + 1, y: wall.position.y, rotation: 180 },
                        { x: wall.position.x, y: wall.position.y - 1, rotation: 270 },
                        { x: wall.position.x, y: wall.position.y + 1, rotation: 90 }
                    ];
                    testing_positions_rotations.forEach(function (position) {
                        if (!GALLERY.Objects.Block.isWallOn(walls, position, storey_selected)) {
                            positions_rotations.push(position);
                        }
                    });
                });
                r(positions_rotations);
                if (positions_rotations.length < images.length) {
                    throw new Error('Not enough positions for images.');
                }
                images.forEach(function (image, i) {
                    image.position = {
                        x: positions_rotations[i].x,
                        y: positions_rotations[i].y
                    };
                    image.rotation = positions_rotations.rotation;
                    new_objects.push(image);
                });
                /*let section = 0;
                let section_x = 0;
                images.forEach(function (image) {
        
                    r(section,section_x);
        
                    image.storey = '1NP';
        
                    let position;
                    if(section===0){
                        position = {
                            x: width/2,
                            y: section_x-width/2
                        };
                        image.rotation = 90;
                    }else
                    if(section===1){
                        position = {
                            x: width/2-section_x,
                            y: width/-2
                        };
                        image.rotation = 180;
                    }else
                    if(section===2){
                        position = {
                            x: width/2/-2,
                            y: width-section_x
                        };
                        image.rotation = 270;
                    }else
                    if(section===3){
                        position = {
                            x: section_x-width/2,
                            y: width/2
                        };
                        image.rotation = 0;
                    }else{
                        throw new Error('images overflow');
                    }
        
                    section_x += image.width + distance_between_images;
                    if(section_x>width){
                        section_x = 0;
                        section++;
                    }
        
                    image.position = position;
                    new_objects.push(image);
        
        
                });*/
                return (new_objects);
                //r(width);
            }
            Generators.SimpleGarden = SimpleGarden;
        })(Generators = Plugins.Generators || (Plugins.Generators = {}));
    })(Plugins = GALLERY.Plugins || (GALLERY.Plugins = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../shared/reference.ts" />
/// <reference path="create-map.ts" />
/// <reference path="create-object.ts" />
/// <reference path="keys.ts" />
/// <reference path="load.ts" />
/// <reference path="message.ts" />
/// <reference path="new.ts" />
/// <reference path="outer-html.ts" />
/// <reference path="plugins.ts" />
/// <reference path="position.ts" />
/// <reference path="save.ts" />
/// <reference path="image-collection.ts" />
/// <reference path="filedrop.ts" />
/// <reference path="palette.ts" />
/// <reference path="export.ts" />
/// <reference path="publish.ts" />
/// <reference path="compile.ts" />
/// <reference path="load-scripts-to-deploy" />
/// <reference path="plugins/generators/simple-garden.ts" />
/// <reference path="reference.ts" />
var objects = new GALLERY.Objects.Array();
var drawing = false;
var moving = false;
var selected_object;
var window_size = {
    x: $(window).width(),
    y: $(window).height()
};
var window_center = {
    x: $(window).width() / 2,
    y: $(window).height() / 2
};
var materialsImages = new GALLERY.ImagesCollection();
var shapesImages = new GALLERY.ImagesCollection();
function createMap() {
    WORLDS = [];
    objects.forEach(function (object) {
        if (WORLDS.indexOf(object.world) == -1) {
            WORLDS.push(object.world);
        }
    });
    createWorldsPallete();
    var x = (-window_center.x) / zoom_selected;
    var y = (-window_center.y) / zoom_selected;
    var width = window_size.x / zoom_selected;
    var height = window_size.y / zoom_selected;
    width -= 5;
    //r(x,y,width,height);
    var objects_world = objects.filterWorld(world_selected).filterStorey(storey_selected).filterSquare(x, y, width, height);
    //let objects_world = objects.filterWorld(world_selected).filterSquare(x+5,y+5,width,height-10);
    var objects_world_ = objects_world.splitTypes('block');
    //r(objects_world_);
    objects_world = objects_world_[1];
    var objects_world_blocks = objects_world_[0];
    var canvas = document.getElementById("admin-world-canvas");
    var $canvas = $(canvas);
    $canvas.css('width', '100vw');
    $canvas.css('height', '100vh');
    $canvas.attr('width', $canvas.width());
    $canvas.attr('height', $canvas.height());
    var ctx = canvas.getContext("2d");
    //let img = imageCollection.getOrAdd('/media/images/textures/grass.jpg');
    //let door = imageCollection.getOrAdd('/media/images/icons/door.jpg');
    objects_world_blocks.forEach(function (block) {
        var x = (block.position.x - 0.5) * zoom_selected + window_center.x;
        var y = (block.position.y - 0.5) * zoom_selected + window_center.y;
        if (block.material.substr(0, 1) == '#') {
            ctx.fillStyle = block.material;
            ctx.fillRect(x, y, zoom_selected, zoom_selected);
        }
        else {
            ctx.drawImage(materialsImages.getOrAdd(block.material, '/media/images/textures/' + block.material + '.jpg'), x, y, zoom_selected, zoom_selected);
        }
        if (block.shape !== 'room') {
            ctx.drawImage(shapesImages.getOrAdd(block.shape, '/media/images/shapes/' + block.shape + '.png'), x, y, zoom_selected, zoom_selected);
        }
        ctx.fillStyle = 'rgba(255,255,255,' + (1 - block.opacity) + ')';
        ctx.fillRect(x, y, zoom_selected, zoom_selected);
        /*ctx.rect(
            x,
            y,
            zoom_selected,
            zoom_selected
        );*/
        ctx.stroke();
    });
    /*let $admin_world_basement = $('#admin-world-basement');
    $admin_world_basement.html('');
    let storey_selected_basement = (parseInt(storey_selected)-1)+'NP';
    objects_world.forEach(function (object) {
        if(object.storey!==storey_selected_basement)return;
        $admin_world_basement.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });*/
    var $admin_world = $('#admin-world');
    $admin_world.html('');
    objects_world.forEach(function (object) {
        //if(object.storey!==storey_selected)return;
        $admin_world.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });
    $admin_world.disableSelection();
    var $blocks = $admin_world.find('.block');
    var $blocks_gates = $admin_world.find('.block[data-shape="gate"]');
    var $images = $admin_world.find('.image, .poster, .button');
    var $stairs = $admin_world.find('.stairs');
    var $dot_objects = $admin_world.find(DOT_OBJECTS.map(function (item) { return ('.' + item); }).join(', '));
    $dot_objects.css('z-index', 2);
    $('.zone,.groundhole').css('z-index', 1);
    /*$admin_world.mousemove(function (e) {
        var position = getPositionFromLeftTop(e.clientX,e.clientY);
        document.title = isWallOn(05-objects,position);
    });*/
    //----------------------------------------------------------------------------SELECTING
    var $dot = $('#dot');
    var $selected_properties = $('#selected-properties');
    var select_callback = function () {
        unselect_callback();
        $this = $(this);
        var id = $this.attr('id');
        var object = objects.getObjectById(id);
        r(object);
        selected_object = object;
        $dot.css('position', 'absolute');
        $dot.css('top', object.position.y * zoom_selected + window_center.y - 5);
        $dot.css('left', object.position.x * zoom_selected + window_center.x - 5);
        var offset = $this.offset();
        var width = $this.outerWidth();
        var height = $this.outerHeight();
        $admin_world.find('div').addClass('not-selected-object').css('z-index', '');
        $this.removeClass('not-selected-object');
        $selected_properties.html('');
        $selected_properties.append('<legend>Objekt</legend>');
        $selected_properties.append('<div class="field">' +
            '<label>id</label>' +
            object.id +
            '</div>');
        var input_element, $input_element;
        var check_element, $check_element;
        for (var key in object) {
            input_element = null;
            check_element = null;
            input_element = object.getEditorInputHtml(key);
            /*if(!input_element) {
                if (['name', 'design', 'uri', 'next', 'parent', 'key', 'href', 'target', 'world', 'material', 'skybox', 'ground', 'url', 'server', 'username', 'password', 'directory', 'domain', 'endlessStructuresFromStorey'].indexOf(key) !== -1) {
                    input_element = '<input type="text">';
                } else if (['script', 'html', 'buttons', 'selector'].indexOf(key) !== -1) {
                    input_element = ' <textarea></textarea>';
                } else if (key == 'intensity') {
                    input_element = '<input type="range" min="0.1" max="5" step="0.1">';
                } else if (key == 'opacity') {
                    input_element = '<input type="range" min="0" max="1" step="0.1">';
                } else if (key == 'radius') {
                    input_element = '<input type="range" min="0.4" max="5" step="0.1">';
                } else if (key == 'size') {
                    input_element = '<input type="range" min="0.2" max="10" step="0.02">';
                } else if (key == 'width' || key == 'height') {
                    input_element = '<input type="range" min="0.2" max="25" step="0.02">';
                } else if (key == 'fogDensity') {
                    input_element = '<input type="range" min="0" max="0.05" step="0.0001">';
                } else if (key == 'color' || key == 'fogColor' || key == 'clearColor') {
                    input_element = '<input type="color">';
                } else if (key == 'skyboxSize' || key == 'uri_level') {
                    input_element = '<input type="number">';
                } else if (key == 'rotation'/!* && (object.type!=='image' && object.onGround!=='image' )*!/) {
                    input_element = '<input type="range" min="0" max="360" step="10">';
                } else if (key == 'rotationSpeed') {
                    input_element = '<input type="number" min="-360" max="360" step="1">';
                } else if (/!*['onGround','hasAlpha','isEmitting','checkCollisions','isFull'].indexOf(key)!==-1*!/typeof object[key] === "boolean") {

                    check_element = '<input type="checkbox">';
                }
            }*/
            if (input_element) {
                $input_element = $(input_element);
                //r($input_element,object[key]);
                //r(object[key]);
                //$input_element.val(object[key]);
                if ($input_element.prop("tagName") == 'INPUT') {
                    $input_element.attr('value', object[key]);
                }
                else {
                    $input_element.text(object[key]);
                }
                $input_element.attr('data-id', id);
                $input_element.attr('data-key', key);
                input_element = $input_element.outerHTML();
                //r(input_element);
                $selected_properties.append('<div class="field">' +
                    '<label>' + key + '</label>' +
                    input_element +
                    '</div>');
            }
            if (check_element) {
                $check_element = $(check_element);
                if (object[key]) {
                    $check_element.attr('checked', 'checked');
                }
                $check_element.attr('data-id', id);
                $check_element.attr('data-key', key);
                check_element = $check_element.outerHTML();
                $selected_properties.append('<div class="field">' +
                    '<label>' + check_element + key + '</label>' +
                    '</div>');
            }
        }
        var save_callback = function () {
            createMap();
            save();
            var $this = $(this);
            r($this);
            if ($this.attr('type') !== 'checkbox') {
                var val = $this.val();
                if (val / 1 == val) {
                    val = val / 1;
                }
                var id = $this.attr('data-id');
                var key = $this.attr('data-key');
                var object = objects.getObjectById(id);
                object[key] = val;
            }
            else {
                var val = $this.prop('checked');
                var id = $this.attr('data-id');
                var key = $this.attr('data-key');
                var object = objects.getObjectById(id);
                object[key] = val;
            }
            r(object);
        };
        $selected_properties.find('input, textarea').change(save_callback);
        $selected_properties.find('input, textarea').keyup(save_callback);
        //$selected_properties.find('input, textarea').keypress(function(){let self = this;setTimeout(save_callback.call(self),50)});
        $selected_properties.show();
        $delete_button = $('<button>Smazat</button>');
        $delete_button.click(function () {
            objects.removeObjectById(id);
            $selected_properties.hide();
            saveAndRedraw();
        });
        $selected_properties.append($delete_button);
        $delete_button = $('<button>Duplikovat</button>');
        $delete_button.click(function () {
            var object = objects.getObjectById(id);
            var new_object = object.clone();
            new_object.id = createGuid();
            new_object.position.x += 1;
            new_object.position.y += 1;
            objects.push(new_object);
            $selected_properties.hide();
            saveAndRedraw();
            r($('#' + new_object.id));
            $('#' + new_object.id).trigger('mousedown');
        });
        $selected_properties.append($delete_button);
        /*
        $rotate
            .css('display', 'block')
            .css('position', 'absolute')
            .css('top',-10)
            .css('right',0)
            .css('z-index',top_z_index++);

        r($rotate.css('top'),$rotate.css('left'));*/
        //r(top_z_index++);
    };
    var unselect_callback = function () {
        selected_object = null;
        $('.not-selected-object').removeClass('not-selected-object');
        $selected_properties.hide();
    };
    $blocks_gates.mousedown(select_callback);
    $images.mousedown(select_callback);
    $stairs.mousedown(select_callback);
    $dot_objects.mousedown(select_callback);
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------BLOCKS drawing
    var drawing_x, drawing_y, drawing_objects;
    $admin_world.unbind('mousedown').mousedown(function (event) {
        if ($(event.target).hasClass('block') || $(event.target).attr('id') == 'admin-world') {
        }
        else {
            return;
        }
        if ($selected_properties.css('display') == 'block') {
            unselect_callback();
            return;
        }
        r('start drawing');
        drawing = true;
        drawing_x = Math.round((event.clientX - window_center.x) / zoom_selected); //+0.5;
        drawing_y = Math.round((event.clientY - window_center.y) / zoom_selected); //+0.5;
        drawing_objects = [];
        r('material: ' + material_selected + ' | shape: ' + shape_selected);
    });
    var admin_world_mousemove;
    $admin_world.unbind('mousemove').mousemove(admin_world_mousemove = function (event) {
        if (!drawing)
            return;
        //r('drawing rect');
        //r( event.clientY -window_center.y );
        var stop_x = Math.round((event.clientX - window_center.x) / zoom_selected); //+0.5;
        var stop_y = Math.round((event.clientY - window_center.y) / zoom_selected); //+0.5;
        size_x = Math.abs(stop_x - drawing_x);
        size_y = Math.abs(stop_y - drawing_y);
        signum_x = (stop_x - drawing_x) > 0 ? 1 : -1;
        signum_y = (stop_y - drawing_y) > 0 ? 1 : -1;
        drawing_objects.forEach(function (object) {
            $('#' + object.id).remove();
        });
        drawing_objects = new GALLERY.Objects.Array();
        for (var y = 0; y <= size_y; y++) {
            for (var x = 0; x <= size_x; x++) {
                var shape = void 0;
                if (shape_selected == 'wall') {
                    shape = ((x == 0 || y == 0 || x == size_x || y == size_y) ? 'wall' : 'room');
                }
                else if (shape_selected == 'combo-wall') {
                    shape = (x + y) % 2 ? 'medium-fence' : 'big-fence'; //((x==0 || y==0 || x==size_x || y==size_y)?'wall':'room');
                }
                else {
                    shape = shape_selected;
                }
                var object = {
                    id: createGuid(),
                    type: 'block',
                    position: {
                        x: drawing_x + x * signum_x,
                        y: drawing_y + y * signum_y
                    },
                    world: world_selected,
                    storey: storey_selected,
                    material: material_selected,
                    opacity: opacity_selected,
                    shape: shape
                };
                if (shape_selected == 'gate') {
                    object.key_type = 'blue';
                }
                //05-objects.push(object);
                drawing_objects.push(object);
                $admin_world.append('\n').append(createObject$(GALLERY.Objects.Object.init(object))); //todo use also in pallete
            }
        }
    });
    $admin_world.unbind('mouseup').mouseup(function (event) {
        if (!drawing)
            return;
        admin_world_mousemove(event);
        drawing = false;
        var removed_stat = 0;
        r(drawing_objects);
        if (drawing_objects.getAll().length === 1 && false) {
            var object = drawing_objects.getAll()[0];
            var object_on_position = objects.getBlockOnPosition(object.position, object.storey, object.world);
            if (object_on_position) {
                shape_selected = object_on_position.shape;
                material_selected = object_on_position.material;
                opacity_selected = object_on_position.opacity;
            }
            else {
                shape_selected = 'none';
            }
        }
        else {
            drawing_objects.forEach(function (object) {
                if (object.shape == 'current') {
                    var object_on_position = objects.getBlockOnPosition(object.position, object.storey, object.world);
                    if (object_on_position) {
                        object_on_position.material = object.material;
                        object_on_position.opacity = object.opacity;
                    }
                }
                else {
                    removed_stat += objects.removeBlockOnPosition(object.position, object.storey, object.world) ? 1 : 0;
                    if (object.shape !== 'none') {
                        objects.push(object);
                    }
                }
            });
            r('removed ' + removed_stat + ' objects');
            save();
        }
        createMap();
    });
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------LIGHTS, LABELS,TREES drag
    var drag_normal_options = {
        drag: function () {
        },
        stop: function () {
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left, offset.top);
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;
            //select_callback.call(this);
            //createMap();
            save();
        }
    };
    $dot_objects.draggable(drag_normal_options);
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------STAIRS drag
    var drag_stairs_options = {
        //grid: [zoom_selected/2,zoom_selected/2],
        //snap: ".block[data-shape='wall']",
        //snapMode: "outer",
        drag: function (e, ui) {
            ui.position.left = (Math.floor((ui.position.left - window_center.x) / zoom_selected) + 0.5) * zoom_selected + window_center.x;
            ui.position.top = (Math.floor((ui.position.top - window_center.y) / zoom_selected) + 0.5) * zoom_selected + window_center.y;
            /*let grid = zoom_selected/2;
            let offset = {
                x: 0,//todo wth -4
                y: zoom_selected/2
            };


            ui.position.left = Math.floor((ui.position.left+offset.x)/grid)*grid-offset.x;
            ui.position.top = Math.floor((ui.position.top+offset.y)/grid)*grid-offset.y;*/
        },
        stop: function () {
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left, offset.top);
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;
            //select_callback.call(this);
            //createMap();
            save();
        }
    };
    $stairs.draggable(drag_stairs_options);
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------IMAGES
    var drag_snap_options = {
        grid: [zoom_selected / 2, zoom_selected / 2],
        //snap: ".block[data-shape='wall']",
        //snap: ".block",
        //snapMode: "outer",
        //snapTolerance: 10,
        drag: function (event, ui) {
            //r('drag');
            //ui.position.left = (Math.floor((ui.position.left-window_center.x) / zoom_selected *2 )/2+0.5) * zoom_selected+window_center.x;
            //ui.position.top  = (Math.floor((ui.position.top -window_center.y) / zoom_selected *2 )/2+0.5) * zoom_selected+window_center.y;
            var draggable = $(this).data("ui-draggable");
            draggable._trigger("snapped", event, ui);
        },
        stop: function (event, ui) {
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left - 7, offset.top); //todo wth -7
            position.x = Math.round(position.x * 2) / 2;
            position.y = Math.round(position.y * 2) / 2;
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;
            select_callback.call(this);
            save(); //todo refactor to function
        },
        /*drag: function(event, ui) {
            var draggable = $(this).data("ui-draggable");
            $.each(draggable.snapElements, function(index, element) {
                ui = $.extend({}, ui, {
                    snapElement: $(element.item),
                    snapping: element.snapping
                });
                if (element.snapping) {
                    if (!element.snappingKnown) {
                        element.snappingKnown = true;
                        draggable._trigger("snapped", event, ui);
                    }
                } else if (element.snappingKnown) {
                    element.snappingKnown = false;
                    draggable._trigger("snapped", event, ui);
                }
            });
        },*/
        snapped: function (event, ui) {
            /*r(event);
            $(event.toElement).css("border",'1px solid red');
            $(event.toElement).css("z-index",'10000');

            setTimeout(function () {

                $(event.toElement).css("border",'none');
                $(event.toElement).css("z-index",'10');

            },3000);*/
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            if (object.onGround) {
                return;
            }
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left - 7, offset.top); //todo wtf 7
            position.x = Math.round(position.x * 2) / 2;
            position.y = Math.round(position.y * 2) / 2;
            object.position = position;
            var rotation = GALLERY.Objects.Block.wallRotation(objects, position, storey_selected);
            var rotation_rad = rotation / 180 * Math.PI;
            //r(position,rotation);
            if (rotation === false) {
            }
            else {
                $(this).find('img').hide();
                $(this).find('.image-' + rotation).show();
                object.rotation = rotation;
            }
        }
    };
    $images.draggable(drag_snap_options);
    //----------------------------------------------------------------------------
}
