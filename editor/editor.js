var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
/// <reference path="../reference.ts" />
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
            }
            Array.prototype.getAll = function () {
                return this.objects;
            };
            Array.prototype.forEach = function (callback) {
                return this.objects.forEach(callback);
            };
            Array.prototype.push = function (object) {
                this.objects.push(GALLERY.Objects.Object.init(object));
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
            Array.prototype.removeBlockOnPosition = function (position, storey) {
                //r(position);
                for (var i in this.objects) {
                    if (this.objects[i].type == 'block') {
                        //r(05-objects[i]);
                        if (this.objects[i].position.x == position.x && this.objects[i].position.y == position.y && this.objects[i].storey == storey) {
                            this.objects.splice(i, 1);
                            return true;
                        }
                    }
                }
                return false;
            };
            return Array;
        }());
        Objects.Array = Array;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
//todo shared reference.ts file
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Object = (function () {
            function Object(object) {
                object.storey = object.storey || '1NP';
                for (var key in object) {
                    var this_key = key;
                    if (this_key == '_id')
                        this_key = 'id'; //todo maybe better solution
                    this[this_key] = object[key];
                }
            }
            Object.init = function (object) {
                if (object instanceof GALLERY.Objects.Object) {
                    return (object);
                }
                //----------------------------------
                if (object.type == 'block') {
                    //r(GALLERY);
                    object = new GALLERY.Objects.Block(object);
                }
                else if (object.type == 'light') {
                    object = new GALLERY.Objects.Light(object);
                }
                else if (object.type == 'label') {
                    object = new GALLERY.Objects.Label(object);
                }
                else if (object.type == 'image') {
                    object = new GALLERY.Objects.Image(object);
                }
                else if (object.type == 'tree') {
                    object = new GALLERY.Objects.Tree(object);
                }
                else if (object.type == 'stairs') {
                    object = new GALLERY.Objects.Stairs(object);
                }
                else if (object.type == 'link') {
                    object = new GALLERY.Objects.Link(object);
                }
                else if (object.type == 'gate') {
                    object = new GALLERY.Objects.Gate(object);
                }
                else {
                    console.log(object);
                    throw new Error('Cant put item into Gallery Objects Array because of unrecognized object type ' + object.type);
                }
                //----------------------------------
                return (object);
            };
            Object.prototype.clone = function () {
                return (Object.init(JSON.parse(JSON.stringify(this))));
            };
            /*create$Element(){
                return this._create$Element();
            }*/
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
            return Object;
        }());
        Objects.Object = Object;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
//r('created block');
//r(GALLERY.Objects.Object);
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Block = (function (_super) {
            __extends(Block, _super);
            function Block() {
                _super.apply(this, arguments);
            }
            Block.prototype.create$Element = function () {
                var $element = this._create$Element();
                //r($element);
                var object = this;
                $element.attr('data-shape', object.shape);
                $element.attr('data-material', object.material);
                $element.css('top', '-=' + 0.5 * zoom_selected);
                $element.css('left', '-=' + 0.5 * zoom_selected);
                object.material = object.material || 'stone-plain';
                $element.css('background', 'url("/media/images/textures/' + object.material + '.jpg")');
                $element.css('background-size', 'cover');
                if (['window', 'door', 'gate'].indexOf(object.shape) != -1) {
                    $element.html('<img src="/media/images/icons/' + object.shape + '.svg">');
                    $element.css('background-color', 'rgba(0,0,0,0.5)');
                    $element.css('background-blend-mode', 'overlay');
                }
                else if (object.shape == 'room') {
                    $element.css('background-color', 'rgba(0,0,0,0.5)');
                    $element.css('background-blend-mode', 'overlay');
                }
                else if (object.shape == 'none') {
                    $element.css('background', 'none');
                    $element.html('<i class="fa fa-times" aria-hidden="true"></i>');
                    $element.css('background-color', 'transparent');
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
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image() {
                _super.apply(this, arguments);
            }
            Image.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $image_0 = $('<img>').addClass('image-0').hide();
                var $image_90 = $('<img>').addClass('image-90').hide();
                var $image_180 = $('<img>').addClass('image-180').hide();
                var $image_270 = $('<img>').addClass('image-270').hide();
                $image_0.css('height', object.height * zoom_selected);
                $image_180.css('height', object.height * zoom_selected);
                $image_90.css('width', object.height * zoom_selected);
                $image_270.css('width', object.height * zoom_selected);
                var src = object.src;
                var src_uri = URI(src)
                    .removeSearch("width");
                var src_normal = src_uri.addSearch({ width: 100 }).toString();
                $image_0.attr('src', src_normal);
                $image_90.attr('src', src_normal + '&rotation=90');
                $image_180.attr('src', src_normal + '&rotation=180');
                $image_270.attr('src', src_normal + '&rotation=270');
                //rotateImage($image_90[0],90);
                //rotateImage($image_180[0],180);
                //rotateImage($image_270[0],270);
                if (object.rotation === 0)
                    $image_0.show();
                else if (object.rotation === 90)
                    $image_90.show();
                else if (object.rotation === 180)
                    $image_180.show();
                else if (object.rotation === 270)
                    $image_270.show();
                else
                    $image_0.show();
                $element.append($image_0);
                $element.append($image_90);
                $element.append($image_180);
                $element.append($image_270);
                return $element;
            };
            return Image;
        }(Objects.Object));
        Objects.Image = Image;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label() {
                _super.apply(this, arguments);
            }
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
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Light = (function (_super) {
            __extends(Light, _super);
            function Light() {
                _super.apply(this, arguments);
            }
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
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Stairs = (function (_super) {
            __extends(Stairs, _super);
            function Stairs() {
                _super.apply(this, arguments);
            }
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
/// <reference path="../reference.ts" />
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
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Link = (function (_super) {
            __extends(Link, _super);
            function Link() {
                _super.apply(this, arguments);
            }
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
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Gate = (function (_super) {
            __extends(Gate, _super);
            function Gate() {
                _super.apply(this, arguments);
            }
            Gate.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $inner = $('<img src="/media/images/icons/gate.svg">');
                $inner.css('width', object.size * zoom_selected);
                $element.css('transform', 'rotate(' + object.rotation + 'deg)');
                $inner.css('height', 5);
                $inner.css('background-color', object.color);
                $element.append($inner);
                return $element;
            };
            return Gate;
        }(Objects.Object));
        Objects.Gate = Gate;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
var r = console.log.bind(console);
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
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        //if(T.UI.Status.focusOnMap()){
        e.preventDefault();
    }
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
var $admin_storeys;
$(function () {
    $admin_storeys = $('#admin-world');
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
        $admin_storeys.css('top', '+=' + speed + 'px');
    }
    if (controls_down.DOWN) {
        window_center.y -= speed;
        $admin_storeys.css('top', '-=' + speed + 'px');
    }
    if (controls_down.LEFT) {
        window_center.x += speed;
        $admin_storeys.css('left', '+=' + speed + 'px');
    }
    if (controls_down.RIGHT) {
        window_center.x -= speed;
        $admin_storeys.css('left', '-=' + speed + 'px');
    }
    if (controls_down.UP || controls_down.DOWN || controls_down.LEFT || controls_down.RIGHT) {
        moving = true;
        drawing = false;
    }
    else {
        if (moving) {
            moving = false;
            $admin_storeys.css('top', '0px').css('left', '0px');
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
        $('#show-gallery').attr('href', '../viewer?gallery=' + gallery);
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
                    $('#show-gallery').attr('href', '../viewer?gallery=' + gallery);
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
                if (text)
                    message.close();
                return message;
            }
        }, {
            key: 'success',
            value: function success(text) {
                var message = new Message(text, 'SUCCESS');
                if (text)
                    message.close();
                return message;
            }
        }, {
            key: 'info',
            value: function info(text) {
                var message = new Message(text, 'INFO');
                if (text)
                    message.close();
                return message;
            }
        }]);
    return _class;
}();
/// <reference path="reference.ts" />
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
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
            if (object.storey == storey_selected) {
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
    if (confirm('Opravdu chete vymazat vše a začít znovu?')) {
        objects = new GALLERY.Objects.Array();
        saveAndRedraw();
    }
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
function save() {
    //last_objects = JSON.parse(JSON.stringify(objects.getAll()));
    if (!loaded) {
        console.warn('Cant save because not yet loaded!');
        return;
    }
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
        save();
    });
});
/// <reference path="reference.ts" />
//var TOWNS_CDN_URL='http://towns-cdn.local/';
var TOWNS_CDN_URL = 'http://cdn.pavolhejny.com/';
var TOWNS_CDN_FILE_ACCEPTED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/png'
];
var TOWNS_CDN_FILE_MAX_SIZE = 25 * Math.pow(1024, 2 /*MB*/);
var TOWNS_CDN_REQUEST_MAX_SIZE = TOWNS_CDN_FILE_MAX_SIZE * 10;
//----------------------------------------------------------------------
// file drop
document.addEventListener("dragover", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("dragleave", function (e) {
    e.preventDefault();
}, false);
function setImageWidth(src, id, height) {
    var image = new Image();
    image.src = src;
    image.onload = function () {
        var object = objects.getObjectById(id);
        var width = (this.width * height) / this.height;
        object.width = width;
        r('setting image width', object);
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
    // process all File 05-objects
    var formData = new FormData();
    var files_key = {};
    var request_size = 1024; //todo is it OK?
    var filenames = [];
    for (var i = 0; i < files.length; i++) {
        if (TOWNS_CDN_FILE_ACCEPTED_TYPES.indexOf(files[i].type) == -1) {
            Message.error('Můžete nahrávat pouze obrázky.');
            throw new Error('Not allowed filetype.');
        }
        if (files[i].size > TOWNS_CDN_FILE_MAX_SIZE) {
            //alert('Jeden nebo více souborů jsou moc velké.');
            Message.error('Celková velikost jednoho souboru může být maximálně' + ' ' + bytesToSize(TOWNS_CDN_FILE_MAX_SIZE));
            throw new Error('File too big');
        }
        request_size += files[i].size;
        var key = 'image' + i;
        formData.append(key, files[i]);
        files_key[key] = files[i];
        filenames.push(files[i].name);
    } //r(files_key);
    filenames = filenames.join(', ');
    if (request_size > TOWNS_CDN_REQUEST_MAX_SIZE) {
        //alert('Soubory jsou moc velké.');
        Message.error('Celková velikost všech souborů může být maximálně ' + ' ' + bytesToSize(TOWNS_CDN_REQUEST_MAX_SIZE));
        throw new Error('Request too big');
    }
    // now post a new XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', TOWNS_CDN_URL);
    var message = Message.info();
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            message.text('Nahráno ' + filenames + ' ' + complete + '%');
        }
    };
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                console.log('all done: ' + xhr.status);
                r(e);
                var position = getPositionFromLeftTop(e.clientX, e.clientY);
                r(position);
                var response = (JSON.parse(xhr.response));
                var object;
                for (var key in files_key) {
                    objects.push(object = {
                        id: createGuid(),
                        type: 'image',
                        position: position,
                        storey: storey_selected,
                        name: files_key[key].name,
                        src: response[key],
                        height: 2,
                        rotation: 0,
                        name: '',
                        uri: ''
                    });
                    setImageWidth(response[key], object.id, 2);
                    position = { x: position.x, y: position.y + 2 };
                }
                createMap();
                message.text('Nahráno ' + filenames + ' 100%', 'success').close();
            }
            catch (e) {
                message.text('Chyba při nahrávání ', 'error').close();
                console.log('Error when processing data...');
                r(e);
            }
        }
        else {
            console.log('Something went terribly wrong...');
        }
    };
    xhr.send(formData);
    //-----------------
}, false);
//});
/// <reference path="reference.ts" />
var storey_selected;
var STOREYS = [
    '1NP',
    '2NP',
    '3NP',
    '4NP',
    '5NP',
    '6NP'
];
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
    }).first().trigger('click');
});
//-------------------------------------------------------------
var zoom_selected;
var ZOOMS = [
    '5',
    '10',
    '20',
    '30',
    '50'
];
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
var BLOCK_MATERIALS = [
    'color-white',
    'clay-bricks',
    'clay-roof',
    'grass',
    'iron-plates',
    'stone-bricks',
    'stone-plain',
    'wood-boards',
    'wood-fence',
    'wood-raw'];
var BLOCK_SHAPES = ['none', 'room', 'wall', 'door', 'window'];
$(function () {
    BLOCK_MATERIALS.forEach(function (material) {
        //r('creating block to pallete');
        $('.select-materials').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'wall',
            material: material
        })));
    });
    BLOCK_SHAPES.forEach(function (shape) {
        $('.select-shapes').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: shape,
            material: 'stone-plain'
        })));
    });
    $('.palette').find('.select-materials').find('.block').click(function () {
        $('.palette').find('.select-materials').find('.block').removeClass('selected');
        $(this).addClass('selected');
        material_selected = $(this).attr('data-material');
    }).first().trigger('click');
    $('.palette').find('.select-shapes').find('.block').click(function () {
        $('.palette').find('.select-shapes').find('.block').removeClass('selected');
        $(this).addClass('selected');
        shape_selected = $(this).attr('data-shape');
    }).first().trigger('click');
});
//===================================================================================================
$(function () {
    ['light', 'label', 'tree', 'stairs', 'link', 'gate'].forEach(function (type) {
        var $dot_object = createObject$(GALLERY.Objects.Object.init({
            type: type
        }));
        $dot_object.draggable({
            //helper: 'clone',
            stop: function () {
                var offset = $(this).offset();
                var position = getPositionFromLeftTop(offset.left, offset.top);
                var object = {
                    id: createGuid(),
                    type: type,
                    position: position,
                    storey: storey_selected
                };
                if (type == 'light') {
                    object.color = '#ffffff';
                    object.intensity = 1;
                }
                else if (type == 'label') {
                    object.name = '';
                    object.uri = '';
                    object.rotation = 0;
                }
                if (type == 'stairs') {
                    object.width = 10;
                    object.height = 2;
                    object.rotation = 0;
                }
                else if (type == 'link') {
                    object.radius = 1;
                    object.href = '/';
                    object.target = '';
                    object.color = '#00ff00';
                    object.opacity = '0.9';
                }
                else if (type == 'gate') {
                    object.size = 2;
                    object.rotation = 0;
                    object.color = '#00ff00';
                    object.opacity = '0.9';
                    object.key = '#red';
                }
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
/// <reference path="../../shared/lib/jquery.d.ts" />
/// <reference path="../../shared/script/uri-plugin.ts" />
/// <reference path="../../shared/script/05-objects/00-array.ts" />
/// <reference path="../../shared/script/05-objects/05-object.ts" />
/// <reference path="../../shared/script/05-objects/10-block.ts" />
/// <reference path="../../shared/script/05-objects/10-image.ts" />
/// <reference path="../../shared/script/05-objects/10-label.ts" />
/// <reference path="../../shared/script/05-objects/10-light.ts" />
/// <reference path="../../shared/script/05-objects/10-stairs.ts" />
/// <reference path="../../shared/script/05-objects/10-tree.ts" />
/// <reference path="../../shared/script/05-objects/10-link.ts" />
/// <reference path="../../shared/script/05-objects/10-gate.ts" />
/// <reference path="../../shared/script/00-common.ts" />
/// <reference path="10-create-map.ts" />
/// <reference path="10-create-object.ts" />
/// <reference path="10-keys.ts" />
/// <reference path="10-load.ts" />
/// <reference path="10-message.ts" />
/// <reference path="10-new.ts" />
/// <reference path="10-outer-html.ts" />
/// <reference path="10-plugins.ts" />
/// <reference path="10-position.ts" />
/// <reference path="10-save.ts" />
/// <reference path="20-filedrop.ts" />
/// <reference path="20-palette.ts" />
/// <reference path="50-plugins/generators/simple-garden.ts" />
/// <reference path="reference.ts" />
var objects = new GALLERY.Objects.Array();
var drawing = false;
var moving = false;
var selected_object;
var window_center = {
    x: $(window).width() / 2,
    y: $(window).height() / 2
};
function createMap() {
    var $admin_world_basement = $('#admin-world-basement');
    $admin_world_basement.html('');
    var storey_selected_basement = (parseInt(storey_selected) - 1) + 'NP';
    objects.forEach(function (object) {
        if (object.storey !== storey_selected_basement)
            return;
        $admin_world_basement.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });
    var $admin_world = $('#admin-world');
    $admin_world.html('');
    objects.forEach(function (object) {
        if (object.storey !== storey_selected)
            return;
        $admin_world.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });
    $admin_world.disableSelection();
    var $blocks = $admin_world.find('.block');
    var $blocks_gates = $admin_world.find('.block[data-shape="gate"]');
    var $images = $admin_world.find('.image');
    var $stairs = $admin_world.find('.stairs');
    var $dot_objects = $admin_world.find('.light, .label, .tree, .link, .gate');
    /*$admin_world.mousemove(function (e) {
        var position = getPositionFromLeftTop(e.clientX,e.clientY);
        document.title = isWallOn(05-objects,position);
    });*/
    //----------------------------------------------------------------------------SELECTING
    var $dot = $('#dot');
    var $selected_properties = $('#selected-properties');
    var select_callback = function () {
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
        $this.css('z-index', 10000);
        $selected_properties.html('');
        $selected_properties.append('<legend>Objekt</legend>');
        var input_element, $input_element;
        for (var key in object) {
            input_element = false;
            if (['name', 'uri', 'key', 'href', 'target'].indexOf(key) !== -1) {
                input_element = '<input type="text">';
            }
            else if (key == 'intensity') {
                input_element = '<input type="range" min="0.1" max="5" step="0.1">';
            }
            else if (key == 'opacity') {
                input_element = '<input type="range" min="0" max="1" step="0.1">';
            }
            else if (key == 'radius') {
                input_element = '<input type="range" min="0.4" max="5" step="0.1">';
            }
            else if (key == 'size') {
                input_element = '<input type="range" min="0.2" max="10" step="0.02">';
            }
            else 
            /*if(key=='width' || key=='height'){
                input_element='<input type="range" min="0.2" max="10" step="0.02">';
            }else*/
            if (key == 'color') {
                input_element = '<input type="color">';
            }
            else if (key == 'rotation' && object.type !== 'image') {
                input_element = '<input type="range" min="0" max="360" step="10">';
            }
            if (input_element) {
                $input_element = $(input_element);
                //r(object[key]);
                $input_element.attr('value', object[key]);
                $input_element.attr('data-id', id);
                $input_element.attr('data-key', key);
                input_element = $input_element.outerHTML();
                //r(input_element);
                $selected_properties.append('<div class="field">' +
                    '<label>' + key + '</label>' +
                    input_element +
                    '</div>');
            }
        }
        $selected_properties.find('input').change(function () {
            var $this = $(this);
            var val = $this.val();
            var id = $this.attr('data-id');
            var key = $this.attr('data-key');
            var object = objects.getObjectById(id);
            object[key] = val;
            createMap();
            save();
            //r(object);
        });
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
                var object = {
                    id: createGuid(),
                    type: 'block',
                    position: {
                        x: drawing_x + x * signum_x,
                        y: drawing_y + y * signum_y
                    },
                    storey: storey_selected,
                    material: material_selected,
                    shape: shape_selected != 'wall' ? shape_selected : ((x == 0 || y == 0 || x == size_x || y == size_y) ? 'wall' : 'room')
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
        drawing_objects.forEach(function (object) {
            //r('object',object);
            //r('object.position',object.position);
            removed_stat += objects.removeBlockOnPosition(object.position, object.storey) ? 1 : 0;
            if (object.shape !== 'none') {
                objects.push(object);
            }
        });
        r('removed ' + removed_stat + ' objects');
        createMap();
        save();
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
            //ui.position.left = (Math.floor((ui.position.left-window_center.x) / zoom_selected )+0.5) * zoom_selected+window_center.x;
            //ui.position.top  = (Math.floor((ui.position.top -window_center.y) / zoom_selected )+0.5) * zoom_selected+window_center.y;
            var grid = zoom_selected / 2;
            var offset = -4; //todo wth -4
            //ui.position.left-=7;
            ui.position.left = Math.floor((ui.position.left + offset) / grid) * grid - offset;
            ui.position.top = Math.floor((ui.position.top + offset) / grid) * grid - offset;
            //ui.position.left+=7;
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
        //grid: [ zoom_selected, zoom_selected ],
        snap: ".block[data-shape='wall']",
        //snap: ".block",
        //snapMode: "outer",
        //snapTolerance: 10,
        /*drag: function(event,ui){

            ui.position.left = (Math.floor((ui.position.left-window_center.x) / zoom_selected )+0.5) * zoom_selected+window_center.x;
            ui.position.top  = (Math.floor((ui.position.top -window_center.y) / zoom_selected )+0.5) * zoom_selected+window_center.y;



            var draggable = $(this).data("ui-draggable");
            draggable._trigger("snapped", event, ui);

th


        },*/
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
        drag: function (event, ui) {
            var draggable = $(this).data("ui-draggable");
            $.each(draggable.snapElements, function (index, element) {
                ui = $.extend({}, ui, {
                    snapElement: $(element.item),
                    snapping: element.snapping
                });
                if (element.snapping) {
                    if (!element.snappingKnown) {
                        element.snappingKnown = true;
                        draggable._trigger("snapped", event, ui);
                    }
                }
                else if (element.snappingKnown) {
                    element.snappingKnown = false;
                    draggable._trigger("snapped", event, ui);
                }
            });
        },
        snapped: function (event, ui) {
            /*r(event);
            $(event.toElement).css("border",'1px solid red');
            $(event.toElement).css("z-index",'10000');

            setTimeout(function () {

                $(event.toElement).css("border",'none');
                $(event.toElement).css("z-index",'10');

            },3000);*/
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left - 7, offset.top); //todo wtf 7
            position.x = Math.round(position.x * 2) / 2;
            position.y = Math.round(position.y * 2) / 2;
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
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
