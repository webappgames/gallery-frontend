var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        Viewer.MODE = 'WEB';
        Viewer.LOCKED = false;
        Viewer.current_label = null;
        function currentLinks() {
            $('a').each(function () {
                if ($(this).attr('href') == window.document.location.pathname) {
                    $(this).addClass('current');
                }
                else {
                    $(this).removeClass('current');
                }
            });
        }
        Viewer.currentLinks = currentLinks;
        currentLinks();
        function appState(location, standGround, immediately) {
            if (standGround === void 0) { standGround = false; }
            if (immediately === void 0) { immediately = true; }
            Viewer.current_label = objects.filterTypes('label').findBy('uri', location);
            history.replaceState(null, "Gallery", location); //todo normal name
            history.pushState(null, "Gallery", location); //todo normal name
            GALLERY.Viewer.processStateFromLocation(/*window.document.location*/ location, standGround, immediately);
            currentLinks();
        }
        Viewer.appState = appState;
        function appStateBack(standGround, immediately) {
            if (standGround === void 0) { standGround = false; }
            if (immediately === void 0) { immediately = true; }
            history.back();
            appState(window.document.location.toString(), standGround, immediately);
        }
        Viewer.appStateBack = appStateBack;
        function processStateFromLocation(location, standGround, immediately) {
            if (standGround === void 0) { standGround = false; }
            if (immediately === void 0) { immediately = true; }
            r('Processing location...');
            var uri = new URI(location);
            var pathname = uri.pathname();
            var rootLabel = objects.filterTypes('label').findBy('uri', '/');
            var label;
            /*if (pathname.substr(0, 2) === '/:') {
    
                let objectId = pathname.substr(2);
                label = objects.filterTypes('label').getObjectById(objectId);
    
    
            } else {*/
            label = objects.filterTypes('label').findBy('uri', pathname);
            if (!label) {
                label = rootLabel;
            }
            //}
            if (label == rootLabel || !label.name) {
                window.document.title = rootLabel.name;
            }
            else {
                window.document.title = label.name + ' | ' + rootLabel.name;
            }
            if (!standGround) {
                Viewer.moveToObject(label, immediately);
            }
            Viewer.unlockGatesAndActivateKeys(uri.hash());
            //r(uri);
        }
        Viewer.processStateFromLocation = processStateFromLocation;
        function appStateNext() {
            if (Viewer.LOCKED == 'NEXT')
                return;
            var label = getAppStateLabel();
            var label_next = objects.filterTypes('label').findBy('uri', label.next);
            if (label_next) {
                Viewer.LOCKED = 'NEXT';
                appState(label_next.uri, false, false);
            }
        }
        Viewer.appStateNext = appStateNext;
        function appStatePrevious() {
            if (Viewer.LOCKED == 'PREVIOUS')
                return;
            var label = getAppStateLabel();
            var label_previous = objects.filterTypes('label').findBy('next', label.uri);
            if (label_previous) {
                Viewer.LOCKED = 'PREVIOUS';
                appState(label_previous.uri, false, false);
            }
        }
        Viewer.appStatePrevious = appStatePrevious;
        function appStateTurnLeft() {
            var babylon_rotation = new BABYLON.Vector3(0, Viewer.camera.rotation.y - Math.PI / 2, 0);
            Viewer.rotateToBabylon(babylon_rotation);
        }
        Viewer.appStateTurnLeft = appStateTurnLeft;
        function appStateTurnRight() {
            var babylon_rotation = new BABYLON.Vector3(0, Viewer.camera.rotation.y + Math.PI / 2, 0);
            Viewer.rotateToBabylon(babylon_rotation);
        }
        Viewer.appStateTurnRight = appStateTurnRight;
        function appStateTurnBack() {
            var babylon_rotation = new BABYLON.Vector3(0, Viewer.camera.rotation.y + Math.PI, 0);
            Viewer.rotateToBabylon(babylon_rotation);
        }
        Viewer.appStateTurnBack = appStateTurnBack;
        function getAppStateLabel() {
            //r(objects.filterTypes('label'),window.document.location);
            var pathname = window.document.location.pathname;
            return objects.filterTypes('label').findBy('uri', pathname);
            /*if(pathname.substr(0,2)=='/:'){
                //r(pathname.substr(2));
                return objects.findBy('id',pathname.substr(2));
            }else{
                return objects.filterTypes('label').findBy('uri',pathname);
            }*/
        }
        Viewer.getAppStateLabel = getAppStateLabel;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
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
                    default: return ('');
                }
            };
            Object.prototype.getBabylonMesh = function (scene) {
                if ("_babylonMesh" in this) {
                }
                else {
                    this._babylonMesh = this.createBabylonMesh(scene);
                }
                return this._babylonMesh;
            };
            Object.prototype.createBabylonMesh = function (scene) {
                return (null);
            };
            Object.prototype.createVirtualObjects = function () {
                return (null);
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
                this.design = this.design || 'board';
                this.name = this.name || '';
                this.html = this.html || '';
                this.buttons = this.buttons || '';
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
                    case 'design':
                        return ('<input type="text">');
                    case 'name':
                        return ('<input type="text">');
                    case 'html':
                        return ('<textarea></textarea>');
                    case 'buttons':
                        return ('<textarea></textarea>');
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
            return Environment;
        }(Objects.Object));
        Objects.Environment = Environment;
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
                image00.material = GALLERY.Viewer.getImageMaterial(this.src, quality, this.isEmitting, this.hasAlpha, this.backFace);
                var lods = 5;
                var mesh;
                for (var lod = 0; lod < lods; lod++) {
                    quality = quality / 2;
                    distance = distance * 2;
                    mesh = BABYLON.Mesh.CreatePlane(this.id, BLOCK_SIZE, scene);
                    mesh.material = GALLERY.Viewer.getImageMaterial(this.src, quality, this.isEmitting, this.hasAlpha, this.backFace);
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
                    position.y -= this.offsetVertical * BLOCK_SIZE;
                    position.x -= this.offsetHorizontal * Math.cos(rotation_rad) * BLOCK_SIZE;
                    position.z -= this.offsetHorizontal * Math.sin(rotation_rad) * BLOCK_SIZE;
                    position.x += Math.sin(rotation_rad) * BLOCK_SIZE * this.offsetFrontal;
                    position.z += Math.cos(rotation_rad) * BLOCK_SIZE * this.offsetFrontal;
                    image.position = position;
                    //(level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE
                    //image.position.y = (/*level + BLOCKS_1NP_LEVEL +*/ EYE_VERTICAL) * BLOCK_SIZE ;
                    image.rotation.y = Math.PI + rotation_rad;
                    image.position.y += (EYE_VERTICAL - BLOCKS_1NP_LEVEL) * BLOCK_SIZE;
                    if (object.isSolid) {
                        var boxMesh = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
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
                _super.call(this, object);
                this.posterHtml = this.posterHtml || '';
                this.posterDesign = this.posterDesign || 'board';
                this.src = this.src || 'http://cdn.pavolhejny.com/?file=5888cb789f36f-M2Q5OGMxNTk1N2M1ZjVkZDIyN2U1M2RiYzdjYmI2MGQuanBn'; //todo remove
                this.width = this.width || 1;
                this.height = this.height || 1;
                this.voxelPixelRatio = this.voxelPixelRatio || 10;
            }
            Poster.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'posterHtml': return ('<textarea></textarea>');
                    case 'posterDesign': return ('<input type="text" />');
                    case 'voxelPixelRatio': return ('<input type="number" />');
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
                var posterElement = object.getPosterElement(document.getElementById('posters'));
                html2canvas(posterElement, {
                    onrendered: function (canvas) {
                        var image_texture = new BABYLON.DynamicTexture('posterTexture', {
                            width: canvas.width,
                            height: canvas.height
                        }, scene, false);
                        var image_texture_ctx = image_texture.getContext();
                        //object._ctx = image_texture_ctx;
                        image_texture_ctx.drawImage(canvas, 0, 0);
                        image_texture.update();
                        if (object.isEmitting) {
                            material.emissiveTexture = image_texture;
                            material.backFaceCulling = !(object.backFace);
                            material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                            material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                            material.specularPower = 32;
                            //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                            material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                            material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                        }
                        else {
                            material.diffuseTexture = image_texture;
                        }
                        GALLERY.Viewer.renderTick();
                    }
                });
                var redraw = function () {
                };
                //posterElement.onmousemove = redraw;
                redraw();
                var material = new BABYLON.StandardMaterial("texture4", scene);
                //material.freeze();
                var image00 = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
                image00.material = material;
                return (image00);
            };
            Poster.prototype.createVirtualObjects = function () {
                var virtualObjects = new Objects.Array();
                var posterElement = this.getPosterElement(document.getElementById('posters'));
                r(posterElement);
                var buttons = posterElement.getElementsByTagName('button');
                for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                    var button = buttons_1[_i];
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
                        width: button.offsetWidth / this.voxelPixelRatio,
                        height: button.offsetHeight / this.voxelPixelRatio,
                        offsetHorizontal: (button.offsetLeft - posterElement.offsetLeft - posterElement.offsetWidth / 2) / this.voxelPixelRatio,
                        offsetVertical: (button.offsetTop - posterElement.offsetTop - posterElement.offsetHeight / 2) / this.voxelPixelRatio,
                        offsetFrontal: 0.2,
                        posterHtml: button.outerHTML,
                        posterDesign: 'none',
                        voxelPixelRatio: this.voxelPixelRatio,
                        isSolid: true,
                    });
                    buttonMesh.offsetHorizontal += buttonMesh.width / 2;
                    buttonMesh.offsetVertical += buttonMesh.height / 2;
                    virtualObjects.push(buttonMesh);
                }
                return (virtualObjects);
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
        var ProtoBoard = (function (_super) {
            __extends(ProtoBoard, _super);
            function ProtoBoard(object) {
                _super.call(this, object);
                this.design = this.design || 'board';
                this.name = this.name || '';
                this.html = this.html || '';
                this.buttons = this.buttons || '';
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
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            ProtoBoard.prototype._createBoard = function (container) {
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
                element.style.display = 'none';
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
                element.innerHTML = ''
                    + (this.name ? '<h1>' + this.name + '</h1>' : '')
                    + '<div class="text">' + html + '</div>'
                    + (this.buttons ? '<div class="buttons">' + this.buttons + '</div>' : '')
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
                    GALLERY.Viewer.appState($(this).attr('href'), false, false);
                });
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
                    this._board = this._createBoard(container);
                }
                return this._board;
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
/// <reference path="07-protoboard" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Board = (function (_super) {
            __extends(Board, _super);
            function Board(object) {
                _super.call(this, object);
                this.isPerspective = this.isPerspective || false;
            }
            Board.prototype.getEditorInputHtml = function (key) {
                switch (key) {
                    case 'isPerspective':
                        return ('<input type="checkbox">');
                    default:
                        return (_super.prototype.getEditorInputHtml.call(this, key));
                }
            };
            Board.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-file-text-o" aria-hidden="true"></i>');
                return $element;
            };
            return Board;
        }(Objects.ProtoBoard));
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
                _super.call(this, object);
            }
            Button.prototype.createVirtualObjects = function () {
                return (null);
            };
            Button.prototype.handleEventPress = function () {
                this.reshape();
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
            Zone.prototype._createMesh = function (scene) {
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
            Zone.prototype.getMesh = function (scene) {
                if ("_mesh" in this) {
                }
                else {
                    this._mesh = this._createMesh(scene);
                }
                return this._mesh;
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
var STATSERVER_URL = 'http://webappgames.com:48567';
var OBJECT_TYPES = ['zone', 'groundhole', 'stairs', 'poster', 'environment', 'light', 'label', 'tree', 'link', 'gate', 'deploy', 'analytics', 'board'];
var DOT_OBJECTS = ['zone', 'groundhole', 'environment', 'light', 'label', 'tree', 'link', 'gate', 'deploy', 'analytics', 'board'];
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
/// <reference path="script/05-objects/10-environment.ts" />
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
/// <reference path="script/scene-config.ts" />
/// <reference path="script/00-common.ts" />
/// <reference path="script/guid.ts" />
/// <reference path="script/notifications.ts" />
/**
 * Ion.Sound
 * version 3.0.7 Build 89
 * © Denis Ineshin, 2016
 *
 * Project page:    http://ionden.com/a/plugins/ion.sound/en.html
 * GitHub page:     https://github.com/IonDen/ion.sound
 *
 * Released under MIT licence:
 * http://ionden.com/a/plugins/licence-en.html
 */
;
(function (window, navigator, $, undefined) {
    "use strict";
    window.ion = window.ion || {};
    if (ion.sound) {
        return;
    }
    var warn = function (text) {
        if (!text)
            text = "undefined";
        if (window.console) {
            if (console.warn && typeof console.warn === "function") {
                console.warn(text);
            }
            else if (console.log && typeof console.log === "function") {
                console.log(text);
            }
            var d = $ && $("#debug");
            if (d && d.length) {
                var a = d.html();
                d.html(a + text + '<br/>');
            }
        }
    };
    var extend = function (parent, child) {
        var prop;
        child = child || {};
        for (prop in parent) {
            if (parent.hasOwnProperty(prop)) {
                child[prop] = parent[prop];
            }
        }
        return child;
    };
    /**
     * DISABLE for unsupported browsers
     */
    if (typeof Audio !== "function" && typeof Audio !== "object") {
        var func = function () {
            warn("HTML5 Audio is not supported in this browser");
        };
        ion.sound = func;
        ion.sound.play = func;
        ion.sound.stop = func;
        ion.sound.pause = func;
        ion.sound.preload = func;
        ion.sound.destroy = func;
        func();
        return;
    }
    /**
     * CORE
     * - creating sounds collection
     * - public methods
     */
    var is_iOS = /iPad|iPhone|iPod/.test(navigator.appVersion), sounds_num = 0, settings = {}, sounds = {}, i;
    if (!settings.supported && is_iOS) {
        settings.supported = ["mp3", "mp4", "aac"];
    }
    else if (!settings.supported) {
        settings.supported = ["mp3", "ogg", "mp4", "aac", "wav"];
    }
    var createSound = function (obj) {
        var name = obj.alias || obj.name;
        if (!sounds[name]) {
            sounds[name] = new Sound(obj);
            sounds[name].init();
        }
    };
    ion.sound = function (options) {
        extend(options, settings);
        settings.path = settings.path || "";
        settings.volume = settings.volume || 1;
        settings.preload = settings.preload || false;
        settings.multiplay = settings.multiplay || false;
        settings.loop = settings.loop || false;
        settings.sprite = settings.sprite || null;
        settings.scope = settings.scope || null;
        settings.ready_callback = settings.ready_callback || null;
        settings.ended_callback = settings.ended_callback || null;
        sounds_num = settings.sounds.length;
        if (!sounds_num) {
            warn("No sound-files provided!");
            return;
        }
        for (i = 0; i < sounds_num; i++) {
            createSound(settings.sounds[i]);
        }
    };
    ion.sound.VERSION = "3.0.7";
    ion.sound._method = function (method, name, options) {
        if (name) {
            sounds[name] && sounds[name][method](options);
        }
        else {
            for (i in sounds) {
                if (!sounds.hasOwnProperty(i) || !sounds[i]) {
                    continue;
                }
                sounds[i][method](options);
            }
        }
    };
    ion.sound.preload = function (name, options) {
        options = options || {};
        extend({ preload: true }, options);
        ion.sound._method("init", name, options);
    };
    ion.sound.destroy = function (name) {
        ion.sound._method("destroy", name);
        if (name) {
            sounds[name] = null;
        }
        else {
            for (i in sounds) {
                if (!sounds.hasOwnProperty(i)) {
                    continue;
                }
                if (sounds[i]) {
                    sounds[i] = null;
                }
            }
        }
    };
    ion.sound.play = function (name, options) {
        ion.sound._method("play", name, options);
    };
    ion.sound.stop = function (name, options) {
        ion.sound._method("stop", name, options);
    };
    ion.sound.pause = function (name, options) {
        ion.sound._method("pause", name, options);
    };
    ion.sound.volume = function (name, options) {
        ion.sound._method("volume", name, options);
    };
    if ($) {
        $.ionSound = ion.sound;
    }
    /**
     * Web Audio API core
     * - for most advanced browsers
     */
    var AudioContext = window.AudioContext || window.webkitAudioContext, audio;
    if (AudioContext) {
        audio = new AudioContext();
    }
    var Sound = function (options) {
        this.options = extend(settings);
        delete this.options.sounds;
        extend(options, this.options);
        this.request = null;
        this.streams = {};
        this.result = {};
        this.ext = 0;
        this.url = "";
        this.loaded = false;
        this.decoded = false;
        this.no_file = false;
        this.autoplay = false;
    };
    Sound.prototype = {
        init: function (options) {
            if (options) {
                extend(options, this.options);
            }
            if (this.options.preload) {
                this.load();
            }
        },
        destroy: function () {
            var stream;
            for (i in this.streams) {
                stream = this.streams[i];
                if (stream) {
                    stream.destroy();
                    stream = null;
                }
            }
            this.streams = {};
            this.result = null;
            this.options.buffer = null;
            this.options = null;
            if (this.request) {
                this.request.removeEventListener("load", this.ready.bind(this), false);
                this.request.removeEventListener("error", this.error.bind(this), false);
                this.request.abort();
                this.request = null;
            }
        },
        createUrl: function () {
            var no_cache = new Date().valueOf();
            this.url = this.options.path + encodeURIComponent(this.options.name) + "." + this.options.supported[this.ext] + "?" + no_cache;
        },
        load: function () {
            if (this.no_file) {
                warn("No sources for \"" + this.options.name + "\" sound :(");
                return;
            }
            if (this.request) {
                return;
            }
            this.createUrl();
            this.request = new XMLHttpRequest();
            this.request.open("GET", this.url, true);
            this.request.responseType = "arraybuffer";
            this.request.addEventListener("load", this.ready.bind(this), false);
            this.request.addEventListener("error", this.error.bind(this), false);
            this.request.send();
        },
        reload: function () {
            this.ext++;
            if (this.options.supported[this.ext]) {
                this.load();
            }
            else {
                this.no_file = true;
                warn("No sources for \"" + this.options.name + "\" sound :(");
            }
        },
        ready: function (data) {
            this.result = data.target;
            if (this.result.readyState !== 4) {
                this.reload();
                return;
            }
            if (this.result.status !== 200 && this.result.status !== 0) {
                warn(this.url + " was not found on server!");
                this.reload();
                return;
            }
            this.request.removeEventListener("load", this.ready.bind(this), false);
            this.request.removeEventListener("error", this.error.bind(this), false);
            this.request = null;
            this.loaded = true;
            //warn("Loaded: " + this.options.name + "." + settings.supported[this.ext]);
            this.decode();
        },
        decode: function () {
            if (!audio) {
                return;
            }
            audio.decodeAudioData(this.result.response, this.setBuffer.bind(this), this.error.bind(this));
        },
        setBuffer: function (buffer) {
            this.options.buffer = buffer;
            this.decoded = true;
            //warn("Decoded: " + this.options.name + "." + settings.supported[this.ext]);
            var config = {
                name: this.options.name,
                alias: this.options.alias,
                ext: this.options.supported[this.ext],
                duration: this.options.buffer.duration
            };
            if (this.options.ready_callback && typeof this.options.ready_callback === "function") {
                this.options.ready_callback.call(this.options.scope, config);
            }
            if (this.options.sprite) {
                for (i in this.options.sprite) {
                    this.options.start = this.options.sprite[i][0];
                    this.options.end = this.options.sprite[i][1];
                    this.streams[i] = new Stream(this.options, i);
                }
            }
            else {
                this.streams[0] = new Stream(this.options);
            }
            if (this.autoplay) {
                this.autoplay = false;
                this.play();
            }
        },
        error: function () {
            this.reload();
        },
        play: function (options) {
            delete this.options.part;
            if (options) {
                extend(options, this.options);
            }
            if (!this.loaded) {
                this.autoplay = true;
                this.load();
                return;
            }
            if (this.no_file || !this.decoded) {
                return;
            }
            if (this.options.sprite) {
                if (this.options.part) {
                    this.streams[this.options.part].play(this.options);
                }
                else {
                    for (i in this.options.sprite) {
                        this.streams[i].play(this.options);
                    }
                }
            }
            else {
                this.streams[0].play(this.options);
            }
        },
        stop: function (options) {
            if (this.options.sprite) {
                if (options) {
                    this.streams[options.part].stop();
                }
                else {
                    for (i in this.options.sprite) {
                        this.streams[i].stop();
                    }
                }
            }
            else {
                this.streams[0].stop();
            }
        },
        pause: function (options) {
            if (this.options.sprite) {
                if (options) {
                    this.streams[options.part].pause();
                }
                else {
                    for (i in this.options.sprite) {
                        this.streams[i].pause();
                    }
                }
            }
            else {
                this.streams[0].pause();
            }
        },
        volume: function (options) {
            var stream;
            if (options) {
                extend(options, this.options);
            }
            else {
                return;
            }
            if (this.options.sprite) {
                if (this.options.part) {
                    stream = this.streams[this.options.part];
                    stream && stream.setVolume(this.options);
                }
                else {
                    for (i in this.options.sprite) {
                        stream = this.streams[i];
                        stream && stream.setVolume(this.options);
                    }
                }
            }
            else {
                stream = this.streams[0];
                stream && stream.setVolume(this.options);
            }
        }
    };
    var Stream = function (options, sprite_part) {
        this.alias = options.alias;
        this.name = options.name;
        this.sprite_part = sprite_part;
        this.buffer = options.buffer;
        this.start = options.start || 0;
        this.end = options.end || this.buffer.duration;
        this.multiplay = options.multiplay || false;
        this.volume = options.volume || 1;
        this.scope = options.scope;
        this.ended_callback = options.ended_callback;
        this.setLoop(options);
        this.source = null;
        this.gain = null;
        this.playing = false;
        this.paused = false;
        this.time_started = 0;
        this.time_ended = 0;
        this.time_played = 0;
        this.time_offset = 0;
    };
    Stream.prototype = {
        destroy: function () {
            this.stop();
            this.buffer = null;
            this.source = null;
            this.gain && this.gain.disconnect();
            this.source && this.source.disconnect();
            this.gain = null;
            this.source = null;
        },
        setLoop: function (options) {
            if (options.loop === true) {
                this.loop = 9999999;
            }
            else if (typeof options.loop === "number") {
                this.loop = +options.loop - 1;
            }
            else {
                this.loop = false;
            }
        },
        update: function (options) {
            this.setLoop(options);
            if ("volume" in options) {
                this.volume = options.volume;
            }
        },
        play: function (options) {
            if (options) {
                this.update(options);
            }
            if (!this.multiplay && this.playing) {
                return;
            }
            this.gain = audio.createGain();
            this.source = audio.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.gain);
            this.gain.connect(audio.destination);
            this.gain.gain.value = this.volume;
            this.source.onended = this.ended.bind(this);
            this._play();
        },
        _play: function () {
            var start, end;
            if (this.paused) {
                start = this.start + this.time_offset;
                end = this.end - this.time_offset;
            }
            else {
                start = this.start;
                end = this.end;
            }
            if (end <= 0) {
                this.clear();
                return;
            }
            if (typeof this.source.start === "function") {
                this.source.start(0, start, end);
            }
            else {
                this.source.noteOn(0, start, end);
            }
            this.playing = true;
            this.paused = false;
            this.time_started = new Date().valueOf();
        },
        stop: function () {
            if (this.playing && this.source) {
                if (typeof this.source.stop === "function") {
                    this.source.stop(0);
                }
                else {
                    this.source.noteOff(0);
                }
            }
            this.clear();
        },
        pause: function () {
            if (this.paused) {
                this.play();
                return;
            }
            if (!this.playing) {
                return;
            }
            this.source && this.source.stop(0);
            this.paused = true;
        },
        ended: function () {
            this.playing = false;
            this.time_ended = new Date().valueOf();
            this.time_played = (this.time_ended - this.time_started) / 1000;
            this.time_offset += this.time_played;
            if (this.time_offset >= this.end || this.end - this.time_offset < 0.015) {
                this._ended();
                this.clear();
                if (this.loop) {
                    this.loop--;
                    this.play();
                }
            }
        },
        _ended: function () {
            var config = {
                name: this.name,
                alias: this.alias,
                part: this.sprite_part,
                start: this.start,
                duration: this.end
            };
            if (this.ended_callback && typeof this.ended_callback === "function") {
                this.ended_callback.call(this.scope, config);
            }
        },
        clear: function () {
            this.time_played = 0;
            this.time_offset = 0;
            this.paused = false;
            this.playing = false;
        },
        setVolume: function (options) {
            this.volume = options.volume;
            if (this.gain) {
                this.gain.gain.value = this.volume;
            }
        }
    };
    if (audio) {
        return;
    }
    /**
     * Fallback for HTML5 audio
     * - for not so modern browsers
     */
    var checkSupport = function () {
        var sound = new Audio(), can_play_mp3 = sound.canPlayType('audio/mpeg'), can_play_ogg = sound.canPlayType('audio/ogg'), can_play_aac = sound.canPlayType('audio/mp4; codecs="mp4a.40.2"'), item, i;
        for (i = 0; i < settings.supported.length; i++) {
            item = settings.supported[i];
            if (!can_play_mp3 && item === "mp3") {
                settings.supported.splice(i, 1);
            }
            if (!can_play_ogg && item === "ogg") {
                settings.supported.splice(i, 1);
            }
            if (!can_play_aac && item === "aac") {
                settings.supported.splice(i, 1);
            }
            if (!can_play_aac && item === "mp4") {
                settings.supported.splice(i, 1);
            }
        }
        sound = null;
    };
    checkSupport();
    Sound.prototype = {
        init: function (options) {
            if (options) {
                extend(options, this.options);
            }
            this.inited = true;
            if (this.options.preload) {
                this.load();
            }
        },
        destroy: function () {
            var stream;
            for (i in this.streams) {
                stream = this.streams[i];
                if (stream) {
                    stream.destroy();
                    stream = null;
                }
            }
            this.streams = {};
            this.loaded = false;
            this.inited = false;
        },
        load: function () {
            var part;
            this.options.preload = true;
            this.options._ready = this.ready;
            this.options._scope = this;
            if (this.options.sprite) {
                for (i in this.options.sprite) {
                    part = this.options.sprite[i];
                    this.options.start = part[0];
                    this.options.end = part[1];
                    this.streams[i] = new Stream(this.options, i);
                }
            }
            else {
                this.streams[0] = new Stream(this.options);
            }
        },
        ready: function (duration) {
            if (this.loaded) {
                return;
            }
            this.loaded = true;
            var config = {
                name: this.options.name,
                alias: this.options.alias,
                ext: this.options.supported[this.ext],
                duration: duration
            };
            if (this.options.ready_callback && typeof this.options.ready_callback === "function") {
                this.options.ready_callback.call(this.options.scope, config);
            }
            if (this.autoplay) {
                this.autoplay = false;
                this.play();
            }
        },
        play: function (options) {
            if (!this.inited) {
                return;
            }
            delete this.options.part;
            if (options) {
                extend(options, this.options);
            }
            console.log(1);
            if (!this.loaded) {
                if (!this.options.preload) {
                    this.autoplay = true;
                    this.load();
                }
                else {
                    this.autoplay = true;
                }
                return;
            }
            if (this.options.sprite) {
                if (this.options.part) {
                    this.streams[this.options.part].play(this.options);
                }
                else {
                    for (i in this.options.sprite) {
                        this.streams[i].play(this.options);
                    }
                }
            }
            else {
                this.streams[0].play(this.options);
            }
        },
        stop: function (options) {
            if (!this.inited) {
                return;
            }
            if (this.options.sprite) {
                if (options) {
                    this.streams[options.part].stop();
                }
                else {
                    for (i in this.options.sprite) {
                        this.streams[i].stop();
                    }
                }
            }
            else {
                this.streams[0].stop();
            }
        },
        pause: function (options) {
            if (!this.inited) {
                return;
            }
            if (this.options.sprite) {
                if (options) {
                    this.streams[options.part].pause();
                }
                else {
                    for (i in this.options.sprite) {
                        this.streams[i].pause();
                    }
                }
            }
            else {
                this.streams[0].pause();
            }
        },
        volume: function (options) {
            var stream;
            if (options) {
                extend(options, this.options);
            }
            else {
                return;
            }
            if (this.options.sprite) {
                if (this.options.part) {
                    stream = this.streams[this.options.part];
                    stream && stream.setVolume(this.options);
                }
                else {
                    for (i in this.options.sprite) {
                        stream = this.streams[i];
                        stream && stream.setVolume(this.options);
                    }
                }
            }
            else {
                stream = this.streams[0];
                stream && stream.setVolume(this.options);
            }
        }
    };
    Stream = function (options, sprite_part) {
        this.name = options.name;
        this.alias = options.alias;
        this.sprite_part = sprite_part;
        this.multiplay = options.multiplay;
        this.volume = options.volume;
        this.preload = options.preload;
        this.path = settings.path;
        this.start = options.start || 0;
        this.end = options.end || 0;
        this.scope = options.scope;
        this.ended_callback = options.ended_callback;
        this._scope = options._scope;
        this._ready = options._ready;
        this.setLoop(options);
        this.sound = null;
        this.url = null;
        this.loaded = false;
        this.start_time = 0;
        this.paused_time = 0;
        this.played_time = 0;
        this.init();
    };
    Stream.prototype = {
        init: function () {
            this.sound = new Audio();
            this.sound.volume = this.volume;
            this.createUrl();
            this.sound.addEventListener("ended", this.ended.bind(this), false);
            this.sound.addEventListener("canplaythrough", this.can_play_through.bind(this), false);
            this.sound.addEventListener("timeupdate", this._update.bind(this), false);
            this.load();
        },
        destroy: function () {
            this.stop();
            this.sound.removeEventListener("ended", this.ended.bind(this), false);
            this.sound.removeEventListener("canplaythrough", this.can_play_through.bind(this), false);
            this.sound.removeEventListener("timeupdate", this._update.bind(this), false);
            this.sound = null;
            this.loaded = false;
        },
        createUrl: function () {
            var rand = new Date().valueOf();
            this.url = this.path + encodeURIComponent(this.name) + "." + settings.supported[0] + "?" + rand;
        },
        can_play_through: function () {
            if (this.preload) {
                this.ready();
            }
        },
        load: function () {
            this.sound.src = this.url;
            this.sound.preload = this.preload ? "auto" : "none";
            if (this.preload) {
                this.sound.load();
            }
        },
        setLoop: function (options) {
            if (options.loop === true) {
                this.loop = 9999999;
            }
            else if (typeof options.loop === "number") {
                this.loop = +options.loop - 1;
            }
            else {
                this.loop = false;
            }
        },
        update: function (options) {
            this.setLoop(options);
            if ("volume" in options) {
                this.volume = options.volume;
            }
        },
        ready: function () {
            if (this.loaded || !this.sound) {
                return;
            }
            this.loaded = true;
            this._ready.call(this._scope, this.sound.duration);
            if (!this.end) {
                this.end = this.sound.duration;
            }
        },
        play: function (options) {
            if (options) {
                this.update(options);
            }
            if (!this.multiplay && this.playing) {
                return;
            }
            this._play();
        },
        _play: function () {
            if (this.paused) {
                this.paused = false;
            }
            else {
                try {
                    this.sound.currentTime = this.start;
                }
                catch (e) { }
            }
            this.playing = true;
            this.start_time = new Date().valueOf();
            this.sound.volume = this.volume;
            this.sound.play();
        },
        stop: function () {
            if (!this.playing) {
                return;
            }
            this.playing = false;
            this.paused = false;
            this.sound.pause();
            this.clear();
            try {
                this.sound.currentTime = this.start;
            }
            catch (e) { }
        },
        pause: function () {
            if (this.paused) {
                this._play();
            }
            else {
                this.playing = false;
                this.paused = true;
                this.sound.pause();
                this.paused_time = new Date().valueOf();
                this.played_time += this.paused_time - this.start_time;
            }
        },
        _update: function () {
            if (!this.start_time) {
                return;
            }
            var current_time = new Date().valueOf(), played_time = current_time - this.start_time, played = (this.played_time + played_time) / 1000;
            if (played >= this.end) {
                if (this.playing) {
                    this.stop();
                    this._ended();
                }
            }
        },
        ended: function () {
            if (this.playing) {
                this.stop();
                this._ended();
            }
        },
        _ended: function () {
            this.playing = false;
            var config = {
                name: this.name,
                alias: this.alias,
                part: this.sprite_part,
                start: this.start,
                duration: this.end
            };
            if (this.ended_callback && typeof this.ended_callback === "function") {
                this.ended_callback.call(this.scope, config);
            }
            if (this.loop) {
                setTimeout(this.looper.bind(this), 15);
            }
        },
        looper: function () {
            this.loop--;
            this.play();
        },
        clear: function () {
            this.start_time = 0;
            this.played_time = 0;
            this.paused_time = 0;
        },
        setVolume: function (options) {
            this.volume = options.volume;
            if (this.sound) {
                this.sound.volume = this.volume;
            }
        }
    };
}(window, navigator, window.jQuery || window.$));
/// <reference path="../reference.ts" />
function createTreeMesh(name, size, length, psi, bow, kink, detail, sections, branches, spirals, scale, start, scene) {
    var angle = 2 * Math.PI / spirals;
    var tree_base = createBranch("branch", size, length, 0, bow, kink, detail, sections, branches, 0, 0, start, scale, scene); //trunk
    var tree = tree_base.branch; //mesh for tree
    var tree_points = tree_base.points; //array of points for starting positions
    var tree_scales = tree_base.scales; // array of scales to scale branch width by position
    psi = -psi;
    var n = 1;
    var b = 0;
    while (size * Math.pow(scale, n) > 0.1 && b < branches) {
        var new_tree = drawTree(name, tree, tree_scales[b], length * tree_scales[b], psi, bow, kink, detail, sections, branches, b, 1, scale, tree_points[b], scene);
        n++;
        b++;
        tree = BABYLON.Mesh.MergeMeshes([tree, new_tree]); //merge for final rotation
    }
    tree.scaling = new BABYLON.Vector3(size, size, size);
    tree.rotation.x = -Math.PI / 2; //stand tree up (result of extrusion along z)
    return tree;
    //Note many parameters randomized by +/- 5 percent
    function createBranch(name, size, length, psi, bow, kink, detail, sections, branches, turn, direction, start, scale, scene) {
        psi += Math.random() * psi / 10 - psi / 20;
        //cross section to extrude
        var cross_section = [];
        var cross_section_radius = size;
        for (theta = 0; theta < 2 * Math.PI; theta += Math.PI / 10) {
            cross_section.push(new BABYLON.Vector3(cross_section_radius * Math.cos(theta), cross_section_radius * Math.sin(theta), 0));
        }
        cross_section.push(cross_section[0]);
        length -= Math.random() * length / 10;
        var height = length * (1 - Math.pow(scale, (sections + 1))) / (1 - scale); //full height of tree
        var gap = (height - length) / branches; //gap between branches
        var twist = (height - length) / sections; //used for bow occurances
        branch_direction = []; //path for extrusion
        var ring_size = height / (detail * sections);
        var Bdirection;
        for (var d = 0; d < length; d += ring_size) {
            Bdirection = new BABYLON.Vector3(0, bow * Math.sin(Math.PI * d / twist), d);
            Bdirection.x += Math.random() * (Bdirection.x / 10) - Bdirection.x / 20;
            Bdirection.y += Math.random() * (Bdirection.y / 10) - Bdirection.y / 20;
            Bdirection.z += Math.random() * (Bdirection.z / 10) - Bdirection.z / 20;
            branch_direction.push(Bdirection);
        }
        for (var s = 0; s < sections - 1; s++) {
            for (var d = length + s * gap * Math.pow(scale, s); d < length + (s + 1) * gap * Math.pow(scale, s + 1); d += ring_size) {
                Bdirection = new BABYLON.Vector3(((s + 1) * kink * Math.pow(scale, s + 1) * d / height + s * kink * Math.pow(scale, s)), bow * Math.pow(scale, s) * Math.sin(Math.PI * d / twist) + (s + 1) * kink * Math.pow(scale, s + 1) * d / height + s * kink * Math.pow(scale, s), d);
                Bdirection.x += Math.random() * (Bdirection.x / 10) - Bdirection.x / 20;
                Bdirection.y += Math.random() * (Bdirection.y / 10) - Bdirection.y / 20;
                Bdirection.z += Math.random() * (Bdirection.z / 10) - Bdirection.z / 20;
                branch_direction.push(Bdirection);
            }
        }
        var branch_scales = [];
        var branch_heights = new BABYLON.Path3D(branch_direction).getDistances();
        var max_height = 0;
        var branch_height;
        while (branch_heights.length > 0) {
            branch_height = branch_heights.pop();
            branch_scales.push(branch_height * 0.975 / max_height);
            max_height = Math.max(max_height, branch_height);
        }
        var branch_points = [];
        var branch_point_scales = [];
        var blen = branch_direction.length;
        for (var b = 0; b < branches; b++) {
            branch_points[b] = branch_direction[Math.floor((length + b * gap) * blen / height)];
            branch_point_scales[b] = branch_scales[Math.floor((length * 0.8 + b * gap) * blen / height)];
        }
        var branch_scale = function (i, distance) {
            var scale = 1 - distance * 0.975 / max_height;
            return scale;
        };
        var branch = BABYLON.MeshBuilder.ExtrudeShapeCustom(name, { shape: cross_section, path: branch_direction, scaleFunction: branch_scale }, scene);
        branch.scaling.y = size;
        branch_points = branch_points.map(function (vec3) {
            return new BABYLON.Vector3(vec3.x, vec3.y * size, vec3.z);
        });
        branch.position = start;
        var Aturn = angle * turn;
        Aturn += Math.random() * Aturn / 10 - Aturn / 20;
        if (direction > 0) {
            branch.rotate(BABYLON.Axis.X, psi, BABYLON.Space.WORLD);
            branch_points = branch_points.map(function (vec3) {
                return new BABYLON.Vector3(vec3.x, vec3.y * Math.cos(psi) - vec3.z * Math.sin(psi), vec3.y * Math.sin(psi) + vec3.z * Math.cos(psi));
            });
            branch.rotate(BABYLON.Axis.Z, Aturn, BABYLON.Space.WORLD);
            branch_points = branch_points.map(function (vec3) {
                return new BABYLON.Vector3(vec3.x * Math.cos(Aturn) - vec3.y * Math.sin(Aturn), vec3.x * Math.sin(Aturn) + vec3.y * Math.cos(Aturn), vec3.z);
            });
        }
        else {
            branch.rotate(BABYLON.Axis.Y, Aturn, BABYLON.Space.WORLD);
            branch_points = branch_points.map(function (vec3) {
                return new BABYLON.Vector3(vec3.x * Math.cos(Aturn) + vec3.z * Math.sin(Aturn), vec3.y, -vec3.x * Math.sin(Aturn) + vec3.z * Math.cos(Aturn));
            });
        }
        branch_points = branch_points.map(function (vec3) {
            return vec3.addInPlace(start);
        });
        return { branch: branch, points: branch_points, scales: branch_point_scales };
    }
    //recursive function to draw tree
    function drawTree(name, tree, size, length, psi, bow, kink, detail, sections, branches, turn, direction, scale, start, scene) {
        var branch_base = createBranch("branch", size, length, psi, bow, kink, detail, sections, branches, turn, direction, start, scale, scene);
        var branch_mesh = branch_base.branch;
        var branch_points = branch_base.points;
        var branch_scales = branch_base.scales;
        var n = 1;
        var b = 0;
        tree = BABYLON.Mesh.MergeMeshes([tree, branch_mesh]);
        while (size * Math.pow(scale, n) > 0.1 && b < branches) {
            var spur = branch_points[b];
            var new_tree = drawTree("branch", tree, size * branch_scales[b], length * branch_scales[b], psi, bow, kink, detail, sections, branches, b, (direction + 1) % 2, scale, spur, scene);
            n++;
            b++;
            tree = BABYLON.Mesh.MergeMeshes([tree, new_tree]);
        }
        return tree;
    }
}
/// <reference path="../reference.ts" />
function createStairsMesh(name, stairs_count, isFull, scene) {
    var pathTopA = [];
    var pathTopB = [];
    var pathBottomA = [];
    var pathBottomB = [];
    var a = new BABYLON.Vector3(0, 0, 0.5);
    var b = new BABYLON.Vector3(0, 0, -0.5);
    var i1, i2;
    var bottom_y;
    for (var i = 0; i < stairs_count; i++) {
        i1 = (Math.floor((i - 1) / 2) * 2 + 2);
        i2 = (Math.floor(i / 2) * 2);
        var top_1 = new BABYLON.Vector3(1 - (i1 / stairs_count) - 0.5, (i2) / stairs_count, 0);
        if (isFull) {
            bottom_y = 0;
        }
        else {
            bottom_y = i / stairs_count - (2 / stairs_count);
        }
        var bottom = new BABYLON.Vector3(1 - (i / stairs_count) - 0.5, bottom_y, 0);
        pathTopA.push(top_1.add(a));
        pathTopB.push(top_1.add(b));
        pathBottomA.push(bottom.add(a));
        pathBottomB.push(bottom.add(b));
    }
    var ribbonTop = BABYLON.Mesh.CreateRibbon("ribbon", [pathTopB, pathTopA,], false, false, 0, scene);
    var ribbonBottom = BABYLON.Mesh.CreateRibbon("ribbon", [pathBottomA, pathBottomB], false, false, 0, scene);
    var ribbonA = BABYLON.Mesh.CreateRibbon("ribbon", [pathTopA, pathBottomA], false, false, 0, scene);
    var ribbonB = BABYLON.Mesh.CreateRibbon("ribbon", [pathBottomB, pathTopB], false, false, 0, scene);
    var stairs_mesh = BABYLON.Mesh.MergeMeshes([ribbonTop, ribbonBottom, ribbonA, ribbonB]);
    stairs_mesh.id = name; //todo better
    stairs_mesh.name = name;
    /*
    var stairs_meshes = [];

    for(var i=0;i<stairs_count;i++){



        var stair = BABYLON.Mesh.CreateBox("box", 1, scene);


        stair.scaling.x=1/stairs_count;
        stair.scaling.y=1/(stairs_count+3.33)*2;


        stair.position.x=(-i/stairs_count)+0.5-(1/stairs_count);
        stair.position.y=i/stairs_count-(1.666/stairs_count);



        //r(stair.scaling,stair.position);

        stairs_meshes.push(stair);

    }


    //r(stairs_meshes);
    var stairs_mesh = BABYLON.Mesh.MergeMeshes(stairs_meshes);
    stairs_mesh.id = 'stairs';//todo better
    stairs_mesh.name = 'stairs';
    //r(stairs_mesh);

     */
    return stairs_mesh;
}
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function createScene(engine, canvas) {
            Viewer.scene = new BABYLON.Scene(engine);
            // Lights
            //var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
            //var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);
            // Need a free camera for collisions
            //var camera = new BABYLON.VirtualJoysticksCamera("VJC", BABYLON.Vector3.Zero(), scene);
            var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, EYE_VERTICAL * BLOCK_SIZE, 30 * BLOCK_SIZE), Viewer.scene);
            camera.ellipsoid = new BABYLON.Vector3(1, (EYE_VERTICAL - 0.1111 /*todo why?*/) * BLOCK_SIZE / 2, 1);
            Viewer.scene.activeCamera = camera;
            camera.rotation.y = Math.PI;
            camera.attachControl(canvas, true);
            camera.angularSensibility = -MOUSE_ANGULAR_SENSIBILITY; //todo const
            //camera.panningSensibility = 10000;
            //var inputManager = camera.inputs;
            /*setTimeout(function () {
             r('mousedown');
             $(canvas).trigger('mousedown');
             },1500);*/
            camera.keysUp.push(87); // "w"
            camera.keysDown.push(83); // "s"
            //camera.keysLeft.push(65); // "s"
            //camera.keysRight.push(68); // "d"
            camera.keysLeft = [37, 65]; //arrow <-
            camera.keysRight = [39, 68]; //arrow ->
            camera.speed = SPEED;
            camera.inertia = SPEED_INERTIA;
            camera.fov = 1.3;
            camera.onCollide = function () {
                Viewer.onCollide.apply(this, arguments); //todo why?
                //r('collide',onCollide);
            };
            //Set gravity for the scene (G force like, on Y-axis)
            Viewer.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
            //scene.enablePhysics(scene.gravity, new BABYLON.OimoJSPlugin());
            // Enable Collisions
            Viewer.scene.collisionsEnabled = true;
            //Then apply collisions and gravity to the active camera
            camera.checkCollisions = true;
            camera.applyGravity = true;
            //Set the ellipsoid around the camera (e.g. your player's size)
            /*camera._oldPositionForCollisions = camera.position;
             camera.moveWithCollisions = function(velocity: Vector3): void {
    
             r(this);
    
             var globalPosition = this.position;//getAbsolutePosition();
    
             globalPosition.subtractFromFloatsToRef(0, this.ellipsoid.y, 0, this._oldPositionForCollisions);
             //this._oldPositionForCollisions.addInPlace(this.ellipsoidOffset);
             this._collider.radius = this.ellipsoid;
    
             this.getScene().collisionCoordinator.getNewPosition(this._oldPositionForCollisions, velocity, this._collider, 3, this, this._onCollisionPositionChange, this.uniqueId);
             };*/
            canvas.addEventListener("mousemove", function (event) {
                var pickResult = Viewer.scene.pick(Viewer.scene.pointerX, Viewer.scene.pointerY);
                Viewer.onPointerHover(event, pickResult);
            });
            var inZonesLast = [];
            Viewer.scene.registerBeforeRender(function () {
                if (GALLERY.Viewer.MODE == 'WEB') {
                    if (Viewer.current_label) {
                        //r(current_label.uri);
                        //r(current_label);
                        if (Viewer.current_label.rotationSpeed) {
                            camera.rotation.y += Viewer.current_label.rotationSpeed / 180 * Math.PI / engine.getFps();
                        }
                    }
                }
                //r(scene.isReady());
                if (GALLERY.Viewer.LOCKED)
                    return;
                camera.cameraDirection.y += 0.01;
                //camera.moveWithCollisions(scene.gravity);
                /*if (!ground.intersectsPoint(camera.position)) {
                 camera.position.addInPlace(scene.gravity);
                 }*/
                /*camera_mesh.position = camera.position;
                 camera_mesh.moveWithCollisions(scene.gravity);
                 camera.position = camera_mesh.position;*/
                if (camera.position.y < RESPAWN_VERTICAL * BLOCK_SIZE) {
                    if (GALLERY.Viewer.running) {
                        GALLERY.Viewer.appStateBack();
                    }
                }
                var limit = (Math.PI / 2) * (3 / 4);
                if (camera.rotation.x < -limit) {
                    camera.rotation.x = -limit;
                }
                if (camera.rotation.x > limit) {
                    camera.rotation.x = limit;
                }
                //=============================================================Zones
                var inZonesAll = [];
                //r(zones);aaa;
                Viewer.zones.forEach(function (zone) {
                    if (zone.isIn(camera.position, camera.rotation)) {
                        inZonesAll.push(zone);
                    }
                });
                inZonesAll.sort(function (zone_a, zone_b) {
                    if (zone_a.uri_level > zone_b.uri_level) {
                        return (-1);
                    }
                    else if (zone_a.uri_level < zone_b.uri_level) {
                        return (1);
                    }
                    else {
                        return (0);
                    }
                });
                var oneUnimportant = false;
                var inZones = inZonesAll.filter(function (inZone, i) {
                    if (inZone.isImportant) {
                        return (true);
                    }
                    else {
                        if (!oneUnimportant) {
                            oneUnimportant = true;
                            return (true);
                        }
                        else {
                            return (false);
                        }
                    }
                });
                var inZonesPlus = [];
                var inZonesMinus = [];
                for (var i = 0, l = inZones.length; i < l; i++) {
                    if (inZonesLast.indexOf(inZones[i]) == -1) {
                        inZonesPlus.push(inZones[i]);
                    }
                }
                for (var i = 0, l = inZonesLast.length; i < l; i++) {
                    if (inZones.indexOf(inZonesLast[i]) == -1) {
                        inZonesMinus.push(inZonesLast[i]);
                    }
                }
                inZonesLast = inZones; //.slice();
                //----------------------------------------------------------Creating new app state
                if (inZonesPlus.length || inZonesMinus.length) {
                    inZones = inZones.filter(function (zone) {
                        return (zone.uri.substr(0, 1) == '/');
                    });
                    inZones.sort(function (zone_a, zone_b) {
                        if (zone_a.uri_level > zone_b.uri_level) {
                            return (-1);
                        }
                        else if (zone_a.uri_level < zone_b.uri_level) {
                            return (1);
                        }
                        else {
                            return (0);
                        }
                    });
                    r(inZones);
                    r('Creating new app uri from zone ', inZones[0]);
                    var uri = void 0;
                    if (inZones.length == 0) {
                        uri = '/';
                    }
                    else {
                        uri = inZones[0].uri;
                    }
                    GALLERY.Viewer.appState(uri + window.location.hash, true);
                }
                //----------------------------------------------------------
                //----------------------------------------------------------Showing/hiding divs
                inZonesPlus.forEach(function (zone) {
                    //$('#zone-'+zone_id).show();
                    r('In the zone ' + zone.name);
                    zone.showBoard();
                    //let $zone_sections = $('#zone-' + zone_id);
                    //$zone_sections.stop().slideDown();
                    //$zone_sections.show().stop().animate({'margin-top': '50px'},1000);
                });
                inZonesMinus.forEach(function (zone) {
                    //$('#zone-'+zone_id).hide();
                    r('Out of the zone ' + zone.name);
                    zone.hideBoard();
                    //let zone = objects.getObjectById(zone_id);
                    //let $zone_sections = $('#zone-' + zone_id);
                    //$zone_sections.stop().slideUp();
                    //$zone_sections.stop().hide('slide', {direction: 'up'}, 1400);
                });
                //----------------------------------------------------------
                //=============================================================
                //=============================================================Boards
                Viewer.boards.forEach(function (board) {
                    //r( board.mesh.position.x);
                    /*r(mesh.position);
    
                     var p = BABYLON.Vector3.Project(
    
                     mesh.position,
                     BABYLON.Matrix.Identity(),
                     scene.getTransformMatrix(),
                     camera.viewport.toGlobal(engine)
    
    
                     );*/
                    var position = BABYLON.Vector3.Project(board.mesh.position, BABYLON.Matrix.Identity(), Viewer.scene.getTransformMatrix(), camera.viewport.toGlobal(canvas.clientWidth, canvas.clientHeight));
                    if (position.z > 1) {
                        board.element.style.display = 'none';
                        return;
                    }
                    var pickInfo = Viewer.scene.pick(position.x, position.y);
                    if (pickInfo.pickedMesh !== board.mesh) {
                        board.element.style.display = 'none';
                        return;
                    }
                    //r(pickInfo.pickedMesh.name);
                    var distance = BABYLON.Vector3.Distance(camera.position, board.mesh.position);
                    var zoom = 1 / distance;
                    //zoom = 1;
                    board.element.style.zIndex = 1000000000 - distance; //todo better
                    //board.element.style.zoom = zoom*100;
                    //board.element.style.transform = 'rotateY('+Math.round(camera.rotation.y /Math.PI * 180 -45)+'deg)';
                    //board.element.style.transform = 'translateZ('+(distance*-10)+'px)';
                    //board.element.childNodes[0].style.transform = 'scale('+(zoom*100)+')';
                    board.element.childNodes[0].style.zoom = zoom * 100;
                    board.element.style.position = 'absolute';
                    board.element.style.left = (position.x) - (board.element.clientWidth / 2) + 'px';
                    board.element.style.top = (position.y - board.top) + 'px';
                    board.element.style.display = 'block';
                });
                //=============================================================
            });
            //document.getElementById('zones').style.perspective='500px';
            //r(camera.viewport);
            //r(camera.viewport.toGlobal(engine));
            //camera.mode = 1;
            /*var camera_mesh = BABYLON.Mesh.CreateSphere("crate", 16, 1, scene);
             camera_mesh.checkCollisions = true;
             camera_mesh.applyGravity = true;
    
             camera_mesh.scaling.y = EYE_VERTICAL * BLOCK_SIZE/2;*/
            /*camera.onCollide = function(event){
             r(event);
    
             };*/
            var sun = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(-0.7, -1, -0.5), Viewer.scene);
            var sun2 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0.7, -1, 0.5), Viewer.scene);
            sun2.intensity = 0.5;
            /*
             // Skybox
             var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
             var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
             skyboxMaterial.backFaceCulling = false;
             skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../media/images/skyboxes/tropical-sunny-day/TropicalSunnyDay", scene);
             skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
             skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
             skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
             skyboxMaterial.disableLighting = true;
             skybox.material = skyboxMaterial;
             skybox.position = new BABYLON.Vector3(0, 0, 0);
             skybox.isPickable = false;
             /**/
            /*$( canvas ).keydown(function( event ) {
    
             console.log(event.which);
    
    
             if ( event.which == 39 ) {
    
             camera.rotation.y += 0.2;
             }
             if ( event.which == 37 ) {
    
             camera.rotation.y -= 0.2;
    
             }
    
    
    
             });*/
            //-----------------------------------------------------------------Pointer Events
            var onDownCamera, onDownTimestamp;
            var pointerDown = false;
            var enginePlayReasonDragging = new Viewer.EnginePlayReason('dragging');
            //When pointer down event is raised
            Viewer.scene.onPointerDown = function () {
                pointerDown = true;
                if (Viewer.MODE == 'WEB') {
                    //r('down');
                    onDownCamera = camera.rotation.clone();
                    onDownTimestamp = new Date() / 1000;
                    Viewer.playEngine(enginePlayReasonDragging);
                }
            };
            /*scene.onPointerMove = function(){
    
             r('move');
             movement++;
    
    
             };*/
            Viewer.scene.onPointerUp = function () {
                pointerDown = false;
                if (Viewer.MODE == 'WEB') {
                    var distance = BABYLON.Vector3.Distance(camera.rotation, onDownCamera);
                    var distanceTime = (new Date() / 1000) - onDownTimestamp;
                    r(distance, distanceTime);
                    if (distance > 0.1 || distanceTime > 1) {
                    }
                    else {
                        Viewer.onPointerUp.apply(this, arguments);
                    }
                    Viewer.pauseEngine(enginePlayReasonDragging);
                }
            };
            /*scene.registerBeforeRender(function () {
    
                if(pointerDown) {
                    camera.position.x += Math.sin(camera.rotation.y) * 0.5;
                    camera.position.z += Math.cos(camera.rotation.y) * 0.5;
                }
    
            });*/
            //-----------------------------------------------------------------
            /*var movement = {
             z: 0
             };
             scene.registerBeforeRender(function () {
    
             //r(movement);
             camera.position.y += movement.z;
    
             movement.z *= 0.9;
             if(movement.z<0.1)movement.z=0;
    
             });*/
            return ({
                scene: Viewer.scene,
                camera: camera,
                sun: sun,
            });
        }
        Viewer.createScene = createScene;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        var EnginePlayReason = (function () {
            function EnginePlayReason(name) {
                this.name = name;
            }
            return EnginePlayReason;
        }());
        Viewer.EnginePlayReason = EnginePlayReason;
        Viewer.engineRunning = false;
        Viewer.enginePlayReasons = [];
        function renderTick() {
            Viewer.scene.render();
        }
        Viewer.renderTick = renderTick;
        function _enginePlayReasonsChanged() {
            if (Viewer.enginePlayReasons.length > 0) {
                var enginePlayReasonsNames = Viewer.enginePlayReasons.map(function (enginePlayReason) {
                    return (enginePlayReason.name);
                }).join(' and ');
                r('Starting engine because of ' + enginePlayReasonsNames + '.');
                Viewer.engine.runRenderLoop(renderTick);
                Viewer.engineRunning = true;
            }
            else {
                r('Pausing engine');
                Viewer.engine.stopRenderLoop(renderTick);
                Viewer.engineRunning = false;
            }
        }
        function playEngine(enginePlayReason) {
            Viewer.enginePlayReasons.push(enginePlayReason);
            _enginePlayReasonsChanged();
        }
        Viewer.playEngine = playEngine;
        function pauseEngine(enginePlayReason) {
            Viewer.enginePlayReasons = Viewer.enginePlayReasons.filter(function (enginePlayReason_) {
                return (enginePlayReason != enginePlayReason_);
            });
            setTimeout(_enginePlayReasonsChanged, 100);
        }
        Viewer.pauseEngine = pauseEngine;
        Viewer.canvas = document.getElementById("scene");
        Viewer.engine = new BABYLON.Engine(Viewer.canvas, true, { preserveDrawingBuffer: true });
        var scene_ = Viewer.createScene(Viewer.engine, Viewer.canvas);
        Viewer.scene = scene_.scene;
        Viewer.camera = scene_.camera;
        Viewer.sun = scene_.sun;
        // Resize
        window.addEventListener("resize", function () {
            Viewer.engine.resize();
            renderTick();
        });
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        Viewer.running = false;
        Viewer.develop = false;
        Viewer.deployObject = '';
        Viewer.analyticsObject = '';
        function run(compiled_objects, develop_, deployObject_, analyticsObject_) {
            //r(compiled_objects);aaa;
            if (develop_ === void 0) { develop_ = false; }
            if (deployObject_ === void 0) { deployObject_ = null; }
            if (analyticsObject_ === void 0) { analyticsObject_ = null; }
            Viewer.running = true;
            Viewer.develop = develop_;
            Viewer.deployObject = deployObject_;
            Viewer.analyticsObject = analyticsObject_;
            objects = compiled_objects;
            r('Running gallery with ' + objects.getAll().length + ' objects in ' + (Viewer.develop ? 'develop' : 'production') + ' mode.');
            if (Viewer.develop) {
                //showStats();
                Viewer.developMenu();
                $('.develop-menu').draggable();
            }
            else {
                //runStats();
                Raven.config('https://71d6fb2b651845dea3ef3861e8df529d@sentry.io/122195').install({});
            }
            /*
            todo
            var $zones = $('#zones');
            $zones.html('');
    
            objects.filterTypes('zone').forEach(function (zone) {
    
                let $zone = $('<div></div>');
                $zone.addClass('zone');
                $zone.attr('id','zone-'+zone.id);
                //$zone.css('display','none');
                $zone.html(zone.html);
    
                $zones.append($zone);
    
    
            });*/
            //r('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            //r($zones.html());
            window.onpopstate = function (event) {
                //r("location: " + document.location + ", state: " + JSON.stringify(event.state));
                Viewer.processStateFromLocation(window.document.location);
            };
            Viewer.appState(window.document.location.toString());
            //processStateFromLocation(window.document.location);
            //console.log(getStateFromLocation(document.location.toString()));
            /*alert("location: " + document.location);
            history.pushState({page: 1}, "title 1", "?page=1");
            history.pushState({page: 2}, "title 2", "?page=2");
            history.replaceState({page: 3}, "title 3", "?page=3");
            history.back(); // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"
            history.back(); // alerts "location: http://example.com/example.html, state: null
            history.go(2);  // alerts "location: http://example.com/example.html?page=3, state: {"page":3}
            */
        }
        Viewer.run = run;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        Viewer.rendered = false;
        Viewer.meshes = [];
        Viewer.zones = [];
        Viewer.boards = [];
        //export var hooverLayer;
        function runWorld(objects_world, textures) {
            r('Running gallery with ' + objects_world.getAll().length + ' objects.', objects_world);
            Viewer.rendered = false;
            Viewer.meshes = [];
            Viewer.zones = [];
            Viewer.boards = [];
            var sunShadowGenerator = new BABYLON.ShadowGenerator(1024, Viewer.sun);
            sunShadowGenerator.useVarianceShadowMap = true;
            var building_blocks = [];
            var lights = [];
            var bark = new BABYLON.StandardMaterial("Mat", Viewer.scene);
            bark.diffuseTexture = new BABYLON.Texture("../media/images/textures/bark.jpg", Viewer.scene);
            bark.diffuseTexture.uScale = 1; //Vertical offset of 10%
            bark.diffuseTexture.vScale = 1; //Horizontal offset of 40%
            bark.freeze();
            Viewer.gates = [];
            links = [];
            var endlessStructures = false;
            var endlessStructuresFromStorey = false;
            //var wasVideo = false;
            /*hooverLayer = new BABYLON.HighlightLayer("hooverLayer", scene, {camera: camera});
            hooverLayer.blurHorizontalSize = 0.5;
            hooverLayer.blurVerticalSize = 0.5;*/
            //==================================================================================================================
            var zoneIdsCreatedForImages = [];
            function processObject(object) {
                var position = object.getBabylonPosition();
                if (object.type == 'environment') {
                    endlessStructures = object.endlessStructures;
                    endlessStructuresFromStorey = object.endlessStructuresFromStorey;
                    Viewer.scene.clearColor = BABYLON.Color3.FromHexString(object.clearColor);
                    if (object.ground !== 'none') {
                        //todo position
                        /**/
                        //Ground
                        /*var ground = BABYLON.Mesh.CreatePlane("ground", 10000, scene);
                        ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
                        ground.material = getMaterial(object.ground,1,true);
                        if("diffuseTexture" in ground.material) {
                            ground.material.diffuseTexture.uScale = 100;//Vertical offset of 10%
                            ground.material.diffuseTexture.vScale = 100;//Horizontal offset of 40%
                        }
                        ground.receiveShadows = true;
                        ground.isPickable = true;
                        ground.checkCollisions = true;
                        meshes.push(ground);*/
                        var groundMesh_1 = BABYLON.Mesh.CreateBox("ground", BLOCK_SIZE, Viewer.scene);
                        groundMesh_1.position.y = BLOCK_SIZE * -1 / 2;
                        groundMesh_1.scaling.x = 10000 / BLOCK_SIZE;
                        groundMesh_1.scaling.z = 10000 / BLOCK_SIZE;
                        groundMesh_1.material = Viewer.getMaterial(object.ground, 1, true);
                        //groundMesh.material.backFaceCulling = false;
                        objects_world.filterTypes('groundhole').forEach(function (holeObject) {
                            r('asshole', holeObject);
                            var holePosition = holeObject.getBabylonPosition();
                            var holeMesh = BABYLON.Mesh.CreateBox(holeObject.id, BLOCK_SIZE, Viewer.scene);
                            holeMesh.material = groundMesh_1.material; //getMaterial('#00ff00',1,true);
                            holeMesh.position = holePosition;
                            holePosition.y = 0;
                            holeMesh.scaling.y = BLOCK_SIZE;
                            holeMesh.scaling.x = holeObject.width;
                            holeMesh.scaling.z = holeObject.height;
                            var groundCSG = BABYLON.CSG.FromMesh(groundMesh_1);
                            var holeCSG = BABYLON.CSG.FromMesh(holeMesh);
                            var groundWithHoleCSG = groundCSG.subtract(holeCSG);
                            r(groundCSG, holeCSG, groundWithHoleCSG);
                            var newGround = groundWithHoleCSG.toMesh("ground", groundMesh_1.material, Viewer.scene);
                            // Disposing original meshes since we don't want to see them on the scene
                            groundMesh_1.dispose();
                            holeMesh.dispose();
                            groundMesh_1 = newGround; /**/
                        });
                        if (object.shadows) {
                            groundMesh_1.receiveShadows = true;
                        }
                        groundMesh_1.isPickable = true;
                        groundMesh_1.checkCollisions = true;
                        Viewer.meshes.push(groundMesh_1);
                    } //else {
                    if (object.skybox !== 'none') {
                        var url = object.skybox + '/' + object.skybox;
                        // Skybox
                        var skybox = BABYLON.Mesh.CreateBox("skyBox", object.skyboxSize, Viewer.scene);
                        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", Viewer.scene);
                        skyboxMaterial.backFaceCulling = false;
                        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../media/images/skyboxes/" + url, Viewer.scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
                        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
                        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                        skyboxMaterial.disableLighting = true;
                        skybox.material = skyboxMaterial;
                        skybox.position = position; //new BABYLON.Vector3(0, 0, 0);
                        skybox.position.y = 0;
                        skybox.isPickable = false;
                        Viewer.meshes.push(skybox);
                        if (object.skybox_reverse) {
                            skybox.rotation.z = Math.PI;
                        }
                    }
                    if (object.fogDensity) {
                        Viewer.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
                        Viewer.scene.fogDensity = object.fogDensity;
                        Viewer.scene.fogColor = BABYLON.Color3.FromHexString(object.fogColor);
                    }
                    else {
                        Viewer.scene.fogMode = BABYLON.Scene.FOGMODE_NONE;
                    }
                    if ((zoneIdsCreatedForImages.indexOf(object.id) == -1)) {
                        r('Creating zone for ' + object.name);
                        zoneIdsCreatedForImages.push(object.id); //todo rename zoneIdsCreatedForImages
                        var zone = new GALLERY.Objects.Zone({
                            id: createGuid(),
                            type: 'zone',
                            world: object.world,
                            storey: object.storey,
                            position: {
                                x: 0,
                                y: 0,
                            },
                            width: 500,
                            height: 500,
                            design: object.design,
                            name: object.name,
                            html: object.html,
                            buttons: object.buttons,
                            uri: 'none',
                            uri_level: 1,
                            isImportant: true
                        });
                        processObject(zone); //todo better
                        objects.push(zone);
                    }
                }
                else if (object.type == 'zone') {
                    Viewer.zones.push(object);
                }
                else if (object.type == 'block') {
                    throw new Error('Block should not be in compiled objects.');
                }
                else if (object.type == 'multiblock') {
                    //--------------------------------------Endless
                    if (endlessStructures) {
                        var bottom = object.position.z - object.size.z / 2;
                        if (bottom <= BLOCKS_STOREYS_LEVELS[endlessStructuresFromStorey]) {
                            var top_2 = object.position.z + object.size.z / 2;
                            bottom -= 1000;
                            object.position.z = (top_2 + bottom) / 2;
                            object.size.z = top_2 - bottom;
                        }
                    }
                    //--------------------------------------
                    var position = new BABYLON.Vector3(object.position.x * -BLOCK_SIZE, (object.position.z + BLOCKS_1NP_LEVEL) * BLOCK_SIZE, //(0.5 - 0.9) * BLOCK_SIZE,
                    object.position.y * BLOCK_SIZE);
                    var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, Viewer.scene);
                    box.material = Viewer.getMaterial(object.material, object.opacity);
                    box.isPickable = true;
                    box.checkCollisions = true;
                    box.position = position;
                    box.scaling.x = object.size.x;
                    box.scaling.y = object.size.z;
                    box.scaling.z = object.size.y;
                    sunShadowGenerator.getShadowMap().renderList.push(box);
                    Viewer.meshes.push(box);
                }
                else if (object.type == 'light') {
                    //r('creating light');
                    var light = new BABYLON.PointLight("light", position, Viewer.scene);
                    light.diffuse = BABYLON.Color3.FromHexString(object.color);
                    light.specular = light.diffuse;
                    light.intensity = object.intensity / 4;
                    light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;
                    lights.push(light);
                    Viewer.meshes.push(light);
                }
                else if (object.type == 'label') {
                }
                else if (object.type == 'tree') {
                    var PHI = 2 / (1 + Math.sqrt(5)); //golden ratio for scale
                    /*{
                     size:1
                     length:15,
                     psi:8*Math.PI/32,
                     bow:0.5, kink:0.5,
                     detail:8,
                     sections:4,
                     branches:5,
                     spirals:5,
                     start:new BABYLON.Vector3(0,0,0),
                     scale:PHI
                     }*/
                    var tree_data = {
                        size: 1 + Math.random(),
                        length: 7 + 15 * Math.random(),
                        psi: 8 * Math.PI / 32,
                        bow: 0.3 + 0.4 * Math.random(),
                        kink: 0.3 + 0.4 * Math.random(),
                        detail: 8,
                        sections: 4,
                        branches: 5,
                        spirals: 5,
                        start: new BABYLON.Vector3(0, 0, 0),
                        scale: PHI
                    };
                    var tree_mesh = createTreeMesh("tree", tree_data.size, tree_data.length, tree_data.psi, tree_data.bow, tree_data.kink, tree_data.detail, tree_data.sections, tree_data.branches, tree_data.spirals, tree_data.scale, tree_data.start, Viewer.scene);
                    tree_mesh.position = position;
                    tree_mesh.material = bark;
                    sunShadowGenerator.getShadowMap().renderList.push(tree_mesh);
                    Viewer.meshes.push(tree_mesh);
                }
                else if (object.type == 'stairs') {
                    var stairs_mesh = createStairsMesh(/*object.id*/ 'stairs', 30, object.isFull, Viewer.scene);
                    //stairs_mesh.position = position;
                    //r(position);
                    stairs_mesh.scaling.x = object.width * BLOCK_SIZE;
                    stairs_mesh.scaling.z = object.height * BLOCK_SIZE;
                    stairs_mesh.scaling.y = (BLOCKS_2D_3D_SHAPES.room.length) * BLOCK_SIZE;
                    r(stairs_mesh.scaling);
                    stairs_mesh.position = position;
                    //stairs_mesh.position.y = -BLOCK_SIZE;
                    stairs_mesh.rotation.y = (object.rotation) / 180 * Math.PI;
                    stairs_mesh.material = Viewer.getMaterial(object.material, object.opacity);
                    /**/
                    stairs_mesh.checkCollisions = true;
                    sunShadowGenerator.getShadowMap().renderList.push(stairs_mesh);
                    Viewer.meshes.push(stairs_mesh);
                }
                else if (object.type == 'link') {
                    var link = new BABYLON.Mesh.CreateSphere(object.id, 16, object.radius * BLOCK_SIZE, Viewer.scene);
                    link.position = position;
                    link.position.y += EYE_VERTICAL * BLOCK_SIZE;
                    link.material = new BABYLON.StandardMaterial("texture2", Viewer.scene);
                    link.material.diffuseColor = BABYLON.Color3.FromHexString(object.color);
                    //link.material.alpha = object.opacity;
                    if (object.hidden) {
                        link.material.alpha = 0;
                    }
                    link.checkCollisions = true;
                    //light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;
                    links.push({
                        object: object,
                        mesh: link
                    });
                    Viewer.meshes.push(link);
                }
                else if (object.type == 'board') {
                    var board = new BABYLON.Mesh.CreateSphere(object.id, 2, 4 * BLOCK_SIZE, Viewer.scene);
                    board.position = position;
                    board.position.y += EYE_VERTICAL * BLOCK_SIZE;
                    board.material = new BABYLON.StandardMaterial("texture2", Viewer.scene);
                    board.material.diffuseColor = BABYLON.Color3.FromHexString('#000000');
                    board.material.alpha = 0;
                    board.checkCollisions = false;
                    /*let element = document.createElement('div');
                    element.style.position = 'fixed';
                    element.classList.add('zone');
                    //element.style.zIndex = '100000';
                    element.innerHTML = object.html;
    
    
                    document.getElementById('zones').appendChild(element);*/
                    var container = document.createElement('div');
                    document.getElementById('boards').appendChild(container);
                    object.getBoard(container).style.display = 'block';
                    container.style.position = 'fixed';
                    Viewer.boards.push({
                        mesh: board,
                        element: container,
                        top: 0
                    });
                    Viewer.meshes.push(board);
                }
                else if (object.type == 'gate') {
                    var rotation_rad = (object.rotation / 180) * Math.PI;
                    //var gate = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
                    var gate = BABYLON.Mesh.CreateBox(object.id, BLOCK_SIZE, Viewer.scene);
                    gate.material = new BABYLON.StandardMaterial("texture", Viewer.scene);
                    //gate.material.backFaceCulling = false;
                    gate.material.diffuseColor = BABYLON.Color3.FromHexString(object.color);
                    //gate.material.alpha = object.opacity;
                    //gate.material.freeze();
                    gate.position = position;
                    gate.scaling.x = object.size;
                    gate.scaling.z = 0.1;
                    gate.scaling.y = BLOCKS_2D_3D_SHAPES.room.length - 1;
                    gate.rotation.y = Math.PI + rotation_rad;
                    gate.position.y += gate.scaling.y * BLOCK_SIZE * 0.5;
                    gate.checkCollisions = true;
                    Viewer.gates.push({
                        object: object,
                        mesh: gate
                    });
                    Viewer.meshes.push(gate);
                }
                else {
                    console.warn('Unknown object type "' + object.type + '", maybe version mismatch between editor and this viewer.');
                }
                var mesh = object.getBabylonMesh(Viewer.scene);
                if (mesh) {
                    Viewer.meshes.push(mesh);
                }
                var virtualObjects = object.createVirtualObjects();
                if (virtualObjects) {
                    virtualObjects.forEach(function (object) {
                        processObject(object);
                        objects.push(object);
                    });
                }
            }
            objects_world.forEach(processObject);
            Viewer.rendered = true;
            //unlockGatesAndActivateKeys();
        }
        Viewer.runWorld = runWorld;
        function clearWorld() {
            Viewer.meshes.forEach(function (mesh) {
                mesh.dispose();
            });
            Viewer.meshes = [];
        }
        Viewer.clearWorld = clearWorld;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        var controls_keys = {
            'UP': [38, 87],
            'DOWN': [40, 83],
            'LEFT': [37, 65],
            'RIGHT': [39, 68],
            'JUMP': [32],
            //'REFRESH': [80],
            'PRINTSCR': [80],
            'CHAT': [13],
        };
        var merged_keys = [];
        for (var keyName in controls_keys) {
            controls_keys[keyName].forEach(function (key) {
                merged_keys.push(key);
            });
        }
        //------------------------------------------------------------
        window.addEventListener('keydown', function (e) {
            if (window_opened === false) {
                if (merged_keys.indexOf(e.keyCode) != -1) {
                    e.preventDefault();
                    r('Pressed ket ' + e.keyCode + ' - prevented default.');
                }
            }
        }, false);
        //------------------------------------------------------------
        var keys = [];
        var moving = false;
        var _lastMessage = ''; //todo move
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
            if (window_opened === false) {
                r('DOWN', e.keyCode);
                if (keys.indexOf(e.keyCode) === -1) {
                    keys.push(e.keyCode);
                    controls_down.update();
                }
            }
        });
        window.addEventListener('keyup', function (e) {
            //if(T.UI.Status.focusOnMap()) {
            //r('UP', e.keyCode);
            var i = keys.indexOf(e.keyCode);
            if (i != -1) {
                keys.splice(i, 1);
                controls_down.update();
            }
            //}
        });
        var last = null;
        var keys_tick = function (timestamp) {
            if (!last)
                last = timestamp;
            var progress = (timestamp - last) / 1000;
            last = timestamp;
            //if(window_opened)return;
            /*
    
             if (controls_down.UP) {
    
    
             ion.sound.play("step");
    
             //camera.position.x += Math.sin(camera.rotation.y)*5;
             //camera.position.z += Math.cos(camera.rotation.y)*5;
    
             }
    
    
             if (controls_down.DOWN) {
    
             //camera.position.x -= Math.sin(camera.rotation.y)*5;
             //camera.position.z -= Math.cos(camera.rotation.y)*5;
    
             }
             */
            /*if (controls_down.LEFT) {
             camera.rotation.y -= SPEED_ROTATION*progress;
             if(camera.rotation.y<0){
             camera.rotation.y+=Math.PI*2;
             }
             }
    
    
             if (controls_down.RIGHT) {
             camera.rotation.y += SPEED_ROTATION*progress;
             if(camera.rotation.y>Math.PI*2){
             camera.rotation.y-=Math.PI*2;
             }
             }*/
            if (controls_down.JUMP) {
                if (GALLERY.Viewer.develop) {
                    Viewer.camera.position.y += 1.6;
                }
            }
            /*if (controls_down.REFRESH) {
    
             runGallery(objects);
    
             }*/
            if (controls_down.PRINTSCR) {
                controls_down.PRINTSCR = false;
                r('print_scr');
                //r(scene,scene.engine, scene.camera);
                BABYLON.Tools.CreateScreenshot(Viewer.engine, Viewer.scene.activeCamera, {
                    precision: 1,
                }, function (screenshot) {
                    var filename = "screenshot-4K-gallery-" + (new Date()) + ".png";
                    /*r('print_scr_ready');
    
                     function downloadURI(uri, name) {
                     var link = document.createElement("a");
                     link.download = name;
                     link.href = uri;
                     document.body.appendChild(link);
                     link.click();
                     document.body.removeChild(link);
                     delete link;
                     }
    
                     downloadURI(screenshot, filename);*/
                    saveAs(dataURItoBlob(screenshot), filename);
                });
            }
            if (controls_down.CHAT) {
                controls_down.CHAT = false;
                r('chat ' + _lastMessage);
                Window.open('Napsat zprávu', "\n            <input type=\"text\" id=\"player-message\" />\n                    ", function (status) {
                    Viewer.gameSync.connect(function () {
                        var send;
                        if (status === false) {
                            send = false;
                        }
                        else {
                            if (Viewer.gameSync.getName()) {
                                send = true;
                            }
                            else {
                                var name_1 = prompt('Vyplňte prosím své jméno nebo přezdívku, abyste mohli poslat zprávu:', '');
                                if (name_1) {
                                    Viewer.gameSync.setName(name_1);
                                    send = true;
                                }
                                else {
                                    alert('Zpráva nebyla poslána ale uložena, dokud nevyplníte svoje jnéno nebo přezdívku.'); //todo maybe Info popup
                                    send = false;
                                }
                            }
                        }
                        if (send) {
                            Viewer.gameSync.sendMessage(document.getElementById('player-message').value);
                            _lastMessage = '';
                        }
                        else {
                            _lastMessage = document.getElementById('player-message').value;
                        }
                    });
                }, 'COMMAND');
                document.getElementById('player-message').value = _lastMessage;
                document.getElementById('player-message').focus();
            }
            requestAnimationFrame(keys_tick);
        };
        requestAnimationFrame(keys_tick);
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
//var on_air = true;
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function onCollide(collidedMesh) {
            //r(collidedMesh);
            //collidedMesh.checkCollisions = false;
            /*if (['ground', 'room', 'stairs','ground_merged', 'room_merged', 'stairs_merged'].indexOf(collidedMesh.id) !== -1) {
    
                //on_air = false;
    
                //r('collide with '+collidedMesh.id);
                //ion.sound.play("step-" + collidedMesh.id);
                //return;
            }*/
            var object = objects.getObjectById(collidedMesh.name);
            if (object) {
                r('collide', object);
                if (object.type == 'link') {
                    if (object.href.substr(0, 1) === '#') {
                        if (window.location.hash != object.href) {
                            GALLERY.Viewer.appState('/:' + object.id + object.href, true);
                            //window.location.hash = object.href;
                            //unlockGatesAndActivateKeys(object.href);
                            ion.sound.play("link-key");
                        }
                    }
                    else if (object.href.substr(0, 1) === '/') {
                        r('teleporting...');
                        objects.filterTypes('label').forEach(function (label) {
                            //r(object.uri,object.href);
                            if (label.uri == object.href) {
                                GALLERY.Viewer.appState(label.uri + window.location.hash);
                            }
                        });
                    }
                    else if (object.href.substr(0, 4) === 'http') {
                        r('opening new tab...');
                        /*function openInNewTab(url) {
                         var win = window.open(url, '_blank');
                         win.focus();
                         }
                         openInNewTab(object.href);*/
                        Window.open(object.name, '<iframe src="' + object.href + '"></iframe>', function () {
                        }, 'NORMAL');
                        collidedMesh.dispose();
                    }
                    if (object.script) {
                        collidedMesh.dispose();
                        try {
                            eval(object.script);
                        }
                        catch (error) {
                            console.warn(error);
                        }
                    }
                }
                else if (object.type == 'gate') {
                    //camera.position.x -= Math.sin(camera.rotation.y)*5;
                    //camera.position.z -= Math.cos(camera.rotation.y)*5;
                    ion.sound.play("gate-locked");
                }
            }
            else {
            }
        }
        Viewer.onCollide = onCollide;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function goToParent() {
            var current = GALLERY.Viewer.getAppStateLabel();
            //r(current);
            if (current.parent && current.parent !== 'none') {
                //r('Going to parent');
                GALLERY.Viewer.appState(current.parent, false, false);
            }
            else if (current.next && current.next !== 'none') {
            }
        }
        Viewer.goToParent = goToParent;
        function onPointerUp(evt, pickResult) {
            var current = GALLERY.Viewer.getAppStateLabel();
            r('current', current);
            //canvas.requestPointerLock();
            // if the click hits the ground object, we change the impact position
            if (pickResult.hit) {
                //r(pickResult.pickedMesh.name);
                if (['ground', 'ground_merged', 'room', 'room_merged'].indexOf(pickResult.pickedMesh.name) != -1) {
                    r(pickResult.pickedMesh.name + ' picked');
                    goToParent();
                }
                else {
                    var object = objects.getObjectById(pickResult.pickedMesh.name);
                    if (object.type === 'poster') {
                        var position = pickResult.pickedMesh.position.subtract(pickResult.pickedPoint);
                        var vec2 = {
                            x: /*Math.sqrt(Math.pow(position.x, 2) + Math.pow(position.z, 2))*/ (Math.abs(position.x) > Math.abs(position.z) ? position.x : position.z),
                            y: position.y
                        };
                        vec2.x /= pickResult.pickedMesh.scaling.x * BLOCK_SIZE;
                        vec2.y /= pickResult.pickedMesh.scaling.y * BLOCK_SIZE;
                        vec2.x += 0.5;
                        vec2.y += 0.5;
                        vec2.x *= object.width * object.voxelPixelRatio;
                        vec2.y *= object.height * object.voxelPixelRatio;
                        /*let posterElement = object.getPosterElement();
                        r(posterElement);
                        let subElement = posterElement.elementFromPoint( vec2.x, vec2.y);
    
                        r(subElement);*/
                        var ctx = pickResult.pickedMesh.material.emissiveTexture.getContext();
                        ctx.beginPath();
                        ctx.arc(vec2.x, vec2.y, 10, 0, 2 * Math.PI);
                        ctx.fill();
                        pickResult.pickedMesh.material.emissiveTexture.update();
                        GALLERY.Viewer.renderTick();
                        return;
                    }
                    r('pick', object, current);
                    if (object)
                        if (current.getUri() == object.getUri()) {
                            goToParent();
                        }
                        else {
                            GALLERY.Viewer.appState(object.getUri(), false, false);
                        }
                }
            }
            else {
                goToParent();
            }
            /**/
        }
        Viewer.onPointerUp = onPointerUp;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function moveTo(x, y, rotation, world, storey, immediately) {
            if (immediately === void 0) { immediately = true; }
            if (Viewer.world_selected !== world) {
                r('Moving to new world "' + world + '" from world "' + Viewer.world_selected + '"');
                document.getElementById("scene").focus();
                Viewer.clearWorld();
                Viewer.runWorld(objects.filterWorld(world), objects.filterWorld('textures') /*todo cache this*/);
                Viewer.world_selected = world;
                immediately = true;
            }
            r('Moving to ', x, y, world, storey, rotation, immediately);
            /*camera.rotation.y = -Math.PI/2 - rotation/180*Math.PI;
             camera.rotation.x = 0;
             camera.rotation.z = 0;
    
             camera.position.x = x * -BLOCK_SIZE;
             camera.position.z = y * BLOCK_SIZE;*/
            var babylon_rotation;
            if (rotation === null) {
                babylon_rotation = null;
            }
            else {
                babylon_rotation = new BABYLON.Vector3(0, (180 + rotation) / 180 * Math.PI, 0);
            }
            var level = BLOCKS_STOREYS_LEVELS[storey];
            var babylon_position = new BABYLON.Vector3(x * -BLOCK_SIZE, (level + EYE_VERTICAL) * BLOCK_SIZE, y * BLOCK_SIZE);
            moveToBabylon(babylon_position, babylon_rotation, immediately);
        }
        Viewer.moveTo = moveTo;
        function moveToObject(object, immediately) {
            if (immediately === void 0) { immediately = true; }
            object.rotation = object.rotation || 0; //todo better
            var rotation;
            if (object.rotationNotImportant) {
                rotation = null;
            }
            else {
                rotation = object.rotation / 1;
            }
            moveTo(object.position.x, object.position.y, rotation, object.world, object.storey, immediately);
        }
        Viewer.moveToObject = moveToObject;
        function moveToURI(uri, immediately) {
            if (immediately === void 0) { immediately = true; }
            var label = objects.filterTypes('label').findBy('uri', uri);
            if (label) {
                moveToObject(label, immediately);
                //moveTo(label.position.x, label.position.y, label.rotation / 1, label.world, label.storey, immediately);
                return (true);
            }
            else {
                console.warn('There is no label with uri "' + uri + '".');
                return (false);
            }
        }
        Viewer.moveToURI = moveToURI;
        Viewer.duration = 1;
        Viewer.easingFunction = new BABYLON.CircleEase();
        Viewer.easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        function moveToBabylon(babylon_position, babylon_rotation, immediately) {
            if (immediately) {
                Viewer.camera.position = babylon_position;
                if (babylon_rotation !== null) {
                    Viewer.camera.rotation = babylon_rotation;
                }
                Viewer.renderTick();
                return;
            }
            if (!Viewer.LOCKED) {
                Viewer.LOCKED = true;
            }
            // 3 parameters to create an event:
            // - The frame at which the event will be triggered
            // - The action to execute
            // - A boolean if the event should execute only once (false by default)
            /*var finished = new BABYLON.AnimationEvent(60, function() {
             console.log("Animation Finished!");
             GALLERY.Viewer.LOCKED = false;
             }, true);*/
            Viewer.scene._pendingData = [];
            var enginePlayReasonMoving = new Viewer.EnginePlayReason('moving');
            Viewer.playEngine(enginePlayReasonMoving);
            var animation = BABYLON.Animation.CreateAndStartAnimation("anim", Viewer.camera, "position", 30, 30 * Viewer.duration, Viewer.camera.position, babylon_position, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, Viewer.easingFunction, function () {
                console.log("Animation Finished!");
                Viewer.LOCKED = false;
                Viewer.pauseEngine(enginePlayReasonMoving);
            });
            if (babylon_rotation !== null) {
                rotateToBabylon(babylon_rotation);
            }
        }
        Viewer.moveToBabylon = moveToBabylon;
        function rotateToBabylon(babylon_rotation) {
            function parseRadians(rad) {
                if (rad < 0)
                    rad += Math.PI * 2;
                if (rad > Math.PI * 2)
                    rad -= Math.PI * 2;
                return rad;
            }
            Viewer.camera.rotation.y = parseRadians(Viewer.camera.rotation.y);
            babylon_rotation.y = parseRadians(babylon_rotation.y);
            var diff = Viewer.camera.rotation.y - babylon_rotation.y;
            if (diff > Math.PI)
                Viewer.camera.rotation.y -= Math.PI * 2;
            if (diff < -Math.PI)
                Viewer.camera.rotation.y += Math.PI * 2;
            var enginePlayReasonRotating = new Viewer.EnginePlayReason('rotating');
            Viewer.playEngine(enginePlayReasonRotating);
            Viewer.LOCKED = true;
            BABYLON.Animation.CreateAndStartAnimation("anim", Viewer.camera, "rotation", 30, 30 * Viewer.duration, Viewer.camera.rotation, babylon_rotation, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, Viewer.easingFunction, function () {
                console.log("Animation Finished!");
                Viewer.LOCKED = false;
                Viewer.pauseEngine(enginePlayReasonRotating);
            });
        }
        Viewer.rotateToBabylon = rotateToBabylon;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var Window = {};
var window_opened = false;
var IMMEDIATELY_MS = 50;
Window._listenToKeys = function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        Window.close(true);
    }
    else if (e.keyCode == 27) {
        e.preventDefault();
        Window.close(false);
    }
};
/**
 * Changes title of opened popup window
 * @param title
 */
Window.setTitle = function (title) {
    $('.popup-window .header').html(title); //todo refactor html class header to title
};
/**
 * Changes content of opened popup window
 * @param content
 */
Window.setContent = function (content) {
    $('.popup-window .content').html(content);
    setTimeout(function () {
        $('.popup-window .content').find("[autofocus]").focus();
    }, IMMEDIATELY_MS);
    //todo uiScript();
};
/**
 * Changes format of opened popup window
 * @param format NORMAL, SMALL, VERTICAL, COMMAND
 */
Window.setFormat = function (format) {
    $('.popup-window').removeClass('popup-window-small');
    $('.popup-window').removeClass('popup-window-vertical');
    $('.popup-window').removeClass('popup-window-command');
    if (format == "SMALL") {
        $('.popup-window').addClass('popup-window-small');
    }
    else if (format == "VERTICAL") {
        $('.popup-window').addClass('popup-window-vertical');
    }
    else if (format == "COMMAND") {
        $('.popup-window').addClass('popup-window-command');
    }
};
/**
 * Open popup window
 * @param title
 * @param content
 * @param close_callback
 */
Window.open = function (title, content, close_callback, format) {
    if (window_opened) {
        Window.close(false);
    }
    if (close_callback) {
        Window.closeCallback = close_callback;
    }
    Window.setFormat(format);
    Window.setTitle(title);
    Window.setContent(content);
    /*r(T.URI.writed);
    if(T.URI.writed>1){

        $('.js-popup-window-back').show();

    }*/
    $('.overlay').show();
    $('.popup-window').show();
    $('.overlay').unbind('click').click(function (e) {
        Window.close(false);
    });
    $('.js-popup-window-close').unbind('click').click(function (e) {
        Window.close(false);
    });
    $('.js-popup-window-confirm').unbind('click').click(function (e) {
        Window.close(true);
    });
    /*$('.popup-window .content').unbind('mousedown').mousedown(function () {

        $('body').enableSelection();
    });
    $('body').enableSelection();*/
    //document.exitPointerLock();
    window_opened = true;
    window.addEventListener('keydown', Window._listenToKeys, false);
};
/**
 * Close popup window and run close callback
 * @param {boolean} dont_run_close_callback
 */
Window.close = function (close_status, dont_run_close_callback) {
    if (close_status === void 0) { close_status = true; }
    if (dont_run_close_callback === void 0) { dont_run_close_callback = false; }
    r('Closing window status=' + close_status);
    //-------------------------------------------Play sound
    //todo sounds ion.sound.play("door_bump");
    //-------------------------------------------
    //-------------------------------------------Hide popup window
    //todo document.title = T.Locale.get('page','title');
    $('.overlay').hide();
    $('.popup-window').hide();
    //$('body').disableSelection();
    window_opened = false;
    //-------------------------------------------
    //-------------------------------------------Run close callback
    if (Window.closeCallback) {
        if (dont_run_close_callback === false) {
            Window.closeCallback(close_status);
        }
        delete Window.closeCallback;
    }
    //-------------------------------------------
    window.removeEventListener('keydown', Window._listenToKeys, false);
    document.getElementById('scene').focus();
};
function fbDiscuss(url) {
    Window.open('Diskuse', '<iframe src="?comments"></iframe>', function () {
    }, 'VERTICAL');
}
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function unlockGatesAndActivateKeys(key) {
            var opening = 0, closing = 0;
            Viewer.gates.forEach(function (gate) {
                if (gate.object.key == key) {
                    gate.mesh.checkCollisions = false;
                    gate.mesh.material.alpha = 0.1;
                    opening++;
                }
                else {
                    gate.mesh.checkCollisions = true;
                    gate.mesh.material.alpha = 0.95;
                    closing++;
                }
            });
            var activating = 0, inactivating = 0;
            links.forEach(function (link) {
                //r(link.object.href.substr(0,1));
                if (link.object.href.substr(0, 1) === '#') {
                    if (link.object.href == key) {
                        link.mesh.checkCollisions = false;
                        link.mesh.material.alpha = 0.1;
                        inactivating++;
                    }
                    else {
                        link.mesh.checkCollisions = true;
                        link.mesh.material.alpha = 0.95;
                        activating++;
                    }
                }
            });
            r('Opening ' + opening + ' gates, closing ' + closing + ' gates. Activating ' + activating + ' keys, inactivating ' + inactivating + ' keys.');
        }
        Viewer.unlockGatesAndActivateKeys = unlockGatesAndActivateKeys;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
//todo for sounds use babylon
// init bunch of sounds
ion.sound({
    sounds: [],
    // main config
    path: "/media/sound/",
    preload: true,
    multiplay: true,
    volume: 1
});
/*
namespace GALLERY.Viewer{



    export function runStats() {


        var cookie = window.localStorage.getItem('cookie');
        if (!cookie) {
            cookie = createGuid();
            window.localStorage.setItem('cookie', cookie);
        }

        var session = createGuid();


        $.post({
            url: STATSERVER_URL+'/sessions',

            contentType: 'application/json',
            data: JSON.stringify({
                session: session,
                cookie: cookie,
                gallery: window.location.hostname,
                //ip: String,
                //user_agent: String
            })

        }).done(function (response) {
            r('Stats initialized!');
        });


        var xl, yl, zl;


        setInterval(function () {


            let x = camera.position.x / -BLOCK_SIZE;
            let y = camera.position.z / BLOCK_SIZE;
            let z = camera.position.y / BLOCK_SIZE; //- BLOCKS_1NP_LEVEL;

            x = Math.round(x * 100) / 100;
            y = Math.round(y * 100) / 100;
            z = Math.round(z * 100) / 100;


            if (x != xl || y != yl || z != zl) {

                xl = x;
                yl = y;
                zl = z;


                $.post({
                    url: STATSERVER_URL+'/states',

                    contentType: 'application/json',
                    data: JSON.stringify({
                        session: session,
                        world: world_selected,
                        time: new Date() / 1000,
                        x: x,
                        y: y,
                        z: z
                    })

                }).done(function (response) {
                    r('Stats position send!');
                });

            }


        }, 300);


    }

}*/ 
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        window.addEventListener('keydown', function (e) {
            if (e.keyCode == 70) {
                var $fps_1 = $('.fps');
                setInterval(function () {
                    if (!Viewer.rendered)
                        return;
                    var fps = Viewer.engine.getFps();
                    var html = '';
                    if (Viewer.engineRunning) {
                        html += '<i class="fa fa-play-circle-o" aria-hidden="true"></i>';
                    }
                    else {
                        html += '<i class="fa fa-pause-circle-o" aria-hidden="true"></i>';
                    }
                    html += '&nbsp;';
                    html += fps.toFixed(1);
                    //html += '<br>'+engine.drawCalls;
                    $fps_1.html(html);
                }, 50);
                $fps_1.show();
            }
        }, false);
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
    // Old code
    // var bb = new BlobBuilder();
    // bb.append(ab);
    // return bb.getBlob(mimeString);
}
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function developMenu() {
            var $developMenu = $("\n                <div class=\"develop-menu\">\n                    <a onclick=\"GALLERY.Viewer.deployToFTP();\">Deploy to FTP</a>\n                    <a onclick=\"GALLERY.Viewer.downloadZip();\">Download as ZIP</a>\n                    <a onclick=\"GALLERY.Viewer.showStats();\">Show stats</a>\n                </div>\n            ");
            var $labelsMenu = $('<ul></ul>');
            console.log($labelsMenu);
            objects.filterTypes('label').forEach(function (label) {
                //todo href="'+label.uri+'"
                var $labelsItem = $('<li><a onclick="GALLERY.Viewer.appState(\'' + label.uri + '\'+window.location.hash);">' + label.name + ' (' + label.uri + ')</a></li>');
                $labelsMenu.append($labelsItem);
            });
            $($developMenu).append($labelsMenu);
            $('body').append($developMenu);
        }
        Viewer.developMenu = developMenu;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
;
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        var DeployFile = (function () {
            function DeployFile(name, content) {
                this.name = name;
                this.content = content;
            }
            return DeployFile;
        }());
        Viewer.DeployFile = DeployFile;
        function createZip(onDone) {
            var deployNotification = new PH.Notification('Deploy', 'Downloading files');
            var index;
            var screenshots;
            var media;
            index = new Promise(function (resolve, reject) {
                var deployFiles = [];
                var xhr = new XMLHttpRequest();
                xhr.open("GET", '/index-src.php');
                xhr.responseType = "text";
                xhr.onload = function () {
                    //r(this);
                    deployFiles.push(new DeployFile('index.php', this.response));
                    if (this.status == 200) {
                        resolve(deployFiles);
                    }
                    else {
                        reject(deployFiles);
                    }
                };
                xhr.send();
            });
            screenshots = new Promise(function (resolve, reject) {
                resolve([]);
                /*
                var labels = objects.filterTypes('label');
    
                let width = canvas.width;
                let height = canvas.height;
    
                canvas.width = 1920;
                canvas.height = 1080;
                GALLERY.Viewer.makeScreenshots(labels, {precision: 1},function (screenshots) {
    
    
    
    
                    let deployFiles = [];
                    screenshots.forEach(function (screenshot,index) {
    
                        let label = labels.getAll()[index];//todo .getObjectByIndex(index);
    
                        let name = label.uri.split('/').join('-');
                        let screenshotName = 'screenshots/screenshot'+name+'.png';
    
                        label.screenshot = '/'+screenshotName;
    
                        deployFiles.push(new DeployFile(screenshotName,screenshot));
                        //deployFiles.push(new DeployFile(routeName,``));
    
    
    
                    });
    
    
                    canvas.width = width;
                    canvas.height = height;
    
                    //r(deployFiles);
                    resolve(deployFiles);
    
                });
    
                /**/
            });
            media = new Promise(function (resolve, reject) {
                var sources = [
                    //'viewer/index.html',
                    '/viewer/style/viewer.css',
                    //'viewer/script/lib/babylon.js',
                    //'node_modules/handjs/hand.min.js',
                    //'media/images/backgrounds/menu.png',
                    //'media/images/backgrounds/page.png',
                    //'media/images/ui/mouse-lock.png',
                    //'media/images/ui/keys-text.png',
                    /*'media/sound/link-key.mp3',
                    'media/sound/link-teleport.mp3',
                    'media/sound/link-key-none.mp3',
                    'media/sound/gate-locked.mp3',
                    'media/sound/step-stairs.mp3',
                    'media/sound/step-ground.mp3',
                    'media/sound/step-room.mp3',*/
                    /*'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_ft.jpg',
                    'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_rt.jpg',
                    'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_up.jpg',
                    'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_bk.jpg',
                    'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_dn.jpg',
                    'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_lf.jpg',*/
                    '/media/images/other/eye.jpg',
                    'https://code.jquery.com/jquery-2.2.4.min.js',
                    'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js',
                    'https://cdn.ravenjs.com/3.9.1/raven.min.js',
                    '/node_modules/jszip/dist/jszip.min.js',
                    '/node_modules/file-saver/FileSaver.min.js',
                    '/node_modules/mustache/mustache.min.js',
                    '/viewer/script/lib/babylon.js',
                    '/node_modules/handjs/hand.min.js',
                    //'http://www.babylonjs.com/hand.minified-1.2.js',
                    //'http://www.babylonjs.com/babylon.js',
                    '/viewer/script/viewer.js'
                ];
                var materials = [];
                objects.forEach(function (object) {
                    if ("material" in object) {
                        materials.push(object.material);
                    }
                });
                objects.filterTypes('environment').forEach(function (environment) {
                    if (environment.ground != 'none') {
                        materials.push(environment.ground);
                    }
                    if (environment.skybox != 'none') {
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_ft.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_rt.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_up.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_bk.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_dn.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_lf.jpg');
                    }
                });
                materials = materials.filter(function (material) {
                    return (material.substr(0, 1) !== '#');
                });
                sources = sources.concat(materials.map(function (material) {
                    return '/media/images/textures/' + material + '.jpg';
                }));
                sources = sources.filter(function (v, i, a) { return a.indexOf(v) === i; });
                //r(sources);
                var promises = sources.map(function (url) {
                    var responseType;
                    if (url.substr(-3) == '.js') {
                        responseType = 'text';
                    }
                    else {
                        responseType = 'blob';
                    }
                    return new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url);
                        xhr.responseType = responseType;
                        xhr.onload = function () {
                            var file = new DeployFile(url, this.response);
                            if (this.status == 200) {
                                resolve(file);
                            }
                            else {
                                reject(file);
                            }
                        };
                        xhr.send();
                        /*$.ajax({url: '/' + url, dataType: dataType}).always(function (response) {
    
    
                            let file = new DeployFile(url,response.responseText);
                            r(this);
                            if(response.status == 200){
                                resolve(file);
    
                            }else{
                                reject(file);
                            }
                        });*/
                    });
                });
                //r(promises);
                Promise.all(promises).then(function (results) {
                    resolve(results);
                }, function () {
                    reject();
                });
            });
            //----------------------------------------------------------------
            Promise.all([index, screenshots, media]).then(function (results) {
                deployNotification.update('Creating zip file');
                var index = results[0], screenshots = results[1], media = results[2];
                var deployFiles = [].concat(screenshots, media);
                var jsFiles = deployFiles.filter(function (file) {
                    return (file.name.substr(-3) == '.js');
                });
                deployFiles = deployFiles.filter(function (file) {
                    return (file.name.substr(-3) !== '.js');
                });
                var scripts = jsFiles.map(function (file) {
                    return file.content;
                });
                scripts.push("\n            $.get('/objects.compiled.json').done(function(response){\n                GALLERY.Viewer.run(new GALLERY.Objects.CompiledArray(response));\n            });\n");
                /*scripts.push(`(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v2.8&appId=602465393294706";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));`);*/
                var script = scripts.join(';/**/\n');
                //let gallery_folder = gallery_domain.split('.').join('-');
                var zip = new JSZip();
                //let zipRoot = zip.folder(gallery_folder);
                zip.file('script-bundle.js', script);
                zip.file('objects.compiled.json', JSON.stringify(objects.getAll().map(function (object) {
                    var pureObject = {};
                    for (var key in object) {
                        if (key.substr(0, 1) !== '_') {
                            pureObject[key] = object[key];
                        }
                    }
                    return (pureObject);
                }), null, true));
                zip.file('.htaccess', "\nRewriteEngine On\n\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . / [L,QSA]\n");
                //r(deployFiles);
                deployFiles.forEach(function (deployFile) {
                    zip.file(deployFile.name, deployFile.content);
                });
                var html = index[0].content;
                var COMMENT = /<!--((?!-->)(.|\s))*-->/g;
                var SCRIPT = /<script((?!script>)(.|\s))*script>/g;
                html = html.replace(SCRIPT, '');
                html = html.split('<!--GALLERY SCRIPT-->').join('<script src="/script-bundle.js" async></script>');
                html = html.replace(COMMENT, '');
                zip.file('index.php', html);
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    onDone(content, deployNotification);
                });
            }, function () {
                // one or more failed
            });
            //r(screenshots);
        }
        Viewer.createZip = createZip;
        function downloadZip() {
            createZip(function (content) {
                var gallery_folder = Viewer.analyticsObject.domain.split('.').join('-');
                saveAs(content, gallery_folder + ".zip");
            });
        }
        Viewer.downloadZip = downloadZip;
        function deployToFTP() {
            createZip(function (content, deployNotification) {
                var formData = new FormData();
                formData.append("update", content);
                formData.append("server", Viewer.deployObject.server);
                formData.append("username", Viewer.deployObject.username);
                formData.append("password", Viewer.deployObject.password);
                formData.append("directory", Viewer.deployObject.directory);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'tools/ftp-deploy.php', true);
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        percentComplete = Math.floor(percentComplete);
                        deployNotification.update('Uploading zip file ' + percentComplete + '%');
                    }
                };
                deployNotification.update('Uploading');
                xhr.onload = function () {
                    if (this.status == 200) {
                        deployNotification.update('Finished');
                    }
                    else {
                        deployNotification.update('Error while uploading');
                    }
                };
                xhr.send(formData);
                /*var formData = new FormData();
                formData.append("gallery", content);
    
                formData.append("password", gallery_password);
    
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://'+gallery_domain+'/.gallery/update.php', true);
    
    
                xhr.upload.onprogress = function(e) {
    
                    if (e.lengthComputable) {
                        let percentComplete = (e.loaded / e.total) * 100;
                        percentComplete = Math.floor(percentComplete);
                        deployNotification.update('Uploading zip file '+percentComplete + '%' );
                    }
                };
    
    
                deployNotification.update('Uploading');
    
                xhr.onload = function() {
                    if (this.status == 200) {
                        deployNotification.update('Finished');
                    }else{
                        deployNotification.update('Error while uploading');
                    }
                };
                xhr.send(formData);*/
            });
        }
        Viewer.deployToFTP = deployToFTP;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
//document.getElementById("para1").innerHTML = dateToSmartString(new Date('2016-01-01T13:39:45.794Z'));
function dayOfUniverse(date) {
    return Math.round((date) / 8.64e7);
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function dateToSmartString(date) {
    var now = new Date();
    var hours = pad(date.getHours(), 2);
    var minutes = pad(date.getMinutes(), 2);
    var hhmm = hours + ':' + minutes;
    var day_name;
    if (dayOfUniverse(date) == dayOfUniverse(now)) {
        //day_name='Today';
        return hhmm;
    }
    else if (dayOfUniverse(date) == dayOfUniverse(now) - 1) {
        day_name = 'Yesterday';
    }
    else 
    /*if(dayOfUniverse(date)==dayOfUniverse(now)-2){

        day_name='Předevčírem';

    }else*/ {
        return (date.getDate()) + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }
    return day_name + ' at ' + hhmm;
}
function isValidDate(d) {
    if (Object.prototype.toString.call(d) !== "[object Date]")
        return false;
    return !isNaN(d.getTime());
}
function dateFromDotString(str) {
    var pattern = /(\d{1,2})\.(\d{1,2})\.(\d{4})/;
    if (!pattern.test(str))
        return false; //todo maybe invalid date of error
    var d = parseInt(str.replace(pattern, '$1'));
    var m = parseInt(str.replace(pattern, '$2'));
    var y = parseInt(str.replace(pattern, '$3'));
    var date = new Date();
    date.setFullYear(y);
    date.setMonth(m - 1);
    date.setDate(d - 1);
    //todo minutes seconds hours
    return (date);
}
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        var GameSync = (function () {
            function GameSync(server, camera, scene) {
                this.server = server;
                this.camera = camera;
                this.scene = scene;
                this._connected = false;
                this._name = '';
                this._chatbox = document.createElement('div');
                this._chatbox.classList.add('chatbox');
                document.body.appendChild(this._chatbox);
            }
            GameSync.prototype.connect = function (onDone) {
                if (this._connected) {
                    console.warn('Already connected.');
                    onDone();
                    return;
                }
                var self = this;
                //todo connect to ws
                //todo listen to ws
                this._connection = new WebSocket("ws://" + this.server);
                //r(this.ws);
                this._connection.onopen = function () {
                    // Web Socket is connected, send data using send()
                    //ws.send("Message to send");
                    //alert("Message is sent...");
                    self._connection.send(JSON.stringify({
                        gallery: window.location.hostname,
                    }));
                    self._connected = true;
                    onDone();
                };
                this._gamePlayers = {};
                this._connection.onmessage = function (evt) {
                    //var received_msg = evt.data;
                    //alert("Message is received...");
                    var players = JSON.parse(evt.data);
                    for (var player in players) {
                        if (players[player]) {
                            if (!(player in self._gamePlayers)) {
                                self._gamePlayers[player] = new Viewer.GamePlayer(self.scene);
                                r('Player ' + player + ' connected.');
                            }
                            if ("timestamp" in players[player]) {
                                self._gamePlayers[player].date = new Date(players[player].timestamp * 1000);
                            }
                            if ("name" in players[player]) {
                                self._gamePlayers[player].setName(players[player].name);
                            }
                            if ("message" in players[player]) {
                                self._gamePlayers[player].setMessage(players[player].message);
                                self._addToChatbox(self._gamePlayers[player].name, self._gamePlayers[player].date, players[player].message);
                            }
                            if ("position" in players[player]) {
                                var _ = players[player].position;
                                var position = new BABYLON.Vector3(_.x * -BLOCK_SIZE, _.z * BLOCK_SIZE, _.y * BLOCK_SIZE);
                                self._gamePlayers[player].setPosition(position);
                            }
                            if ("rotation" in players[player]) {
                                self._gamePlayers[player].setRotation(new BABYLON.Vector3(players[player].rotation.x, players[player].rotation.y, players[player].rotation.z));
                            }
                        }
                        else {
                            r('Player ' + player + ' disconnected.');
                            self._gamePlayers[player].destruct();
                            delete self._gamePlayers[player];
                        }
                    }
                };
                this._connection.onclose = function () {
                    this.connected = false;
                    clearInterval(self._loop);
                    //alert("Closed");
                };
                var _lastPosition, _lastRotation;
                this._loop = setInterval(function () {
                    var x = Viewer.camera.position.x / -BLOCK_SIZE;
                    var y = Viewer.camera.position.z / BLOCK_SIZE;
                    var z = Viewer.camera.position.y / BLOCK_SIZE; //- BLOCKS_1NP_LEVEL;
                    x = Math.round(x * 100) / 100;
                    y = Math.round(y * 100) / 100;
                    z = Math.round(z * 100) / 100;
                    var _currentPosition = [
                        x, y, z
                    ].join(',');
                    var _currentRotation = [
                        Viewer.camera.rotation.x, Viewer.camera.rotation.y, Viewer.camera.rotation.z
                    ].join(',');
                    if (_lastPosition != _currentPosition) {
                        _lastPosition = _currentPosition;
                        self._connection.send(JSON.stringify({
                            position: {
                                x: x,
                                y: y,
                                z: z
                            }
                        }));
                    }
                    if (_lastRotation != _currentRotation) {
                        _lastRotation = _currentRotation;
                        self._connection.send(JSON.stringify({
                            rotation: {
                                x: Viewer.camera.rotation.x,
                                y: Viewer.camera.rotation.y,
                                z: Viewer.camera.rotation.z
                            }
                        }));
                    }
                }, 100);
            };
            GameSync.prototype._addToChatbox = function (playerName, date, message) {
                var html = '';
                if (date) {
                    html += '<span class="date">[' + dateToSmartString(date) + ']</span>';
                }
                if (playerName) {
                    html += '<span class="name">[' + playerName + ']</span>';
                }
                if (message) {
                    html += '<span class="message">' + message + '</span>';
                }
                var message = document.createElement('p');
                message.innerHTML = html;
                this._chatbox.appendChild(message);
                if (this._chatbox.childNodes.length > 8) {
                    this._chatbox.removeChild(this._chatbox.firstChild);
                }
            };
            GameSync.prototype.setName = function (name) {
                this._name = name;
                /*let self = this;
                if(!this._connected){
                    this.connect(function () {
                        self.setName(name);
                    });
                    return;
                }*/
                this._connection.send(JSON.stringify({
                    name: name
                }));
            };
            GameSync.prototype.getName = function () {
                return (this._name);
            };
            GameSync.prototype.sendMessage = function (message) {
                /*let self = this;
                if(!this._connected){
                    this.connect(function () {
                        self.sendMessage(message);
                    });
                    return;
                }*/
                message = message.trim();
                this._addToChatbox(this._name, new Date(), message);
                this._connection.send(JSON.stringify({
                    message: message
                }));
            };
            GameSync.prototype.disconnect = function () {
                //alert("Closing");
                this._connection.close();
                //todo
            };
            return GameSync;
        }());
        Viewer.GameSync = GameSync;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
/// <reference path="game-sync" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function gameMode() {
            Window.open('Herní mód' //todo use mustache
            , "\n        \n            <p>\n            V hern\u00EDm m\u00F3du se budete moci pohybovat galeri\u00ED zcela voln\u011B pomoc\u00ED <b>my\u0161i</b> a kl\u00E1ves <span class=\"inline-key\">W</span><span class=\"inline-key\">A</span><span class=\"inline-key\">S</span><span class=\"inline-key\">D</span> nebo <b>\u0161ipek</b>. Tak\u00E9 budete vid\u011Bt dal\u0161\u00ED p\u0159ipojen\u00E9 \"hr\u00E1\u010De\" a oni v\u00E1s, proto mus\u00EDte zadat sv\u00E9 jm\u00E9no nebo p\u0159ezd\u00EDvku. Pomoc\u00ED kl\u00E1vesy <span class=\"inline-key\">Enter</span> m\u016F\u017Eete ps\u00E1t zpr\u00E1vy.\n            </p>\n          \n            \n            <div>\n            <label>\n                Va\u0161e jm\u00E9no:\n                <input type=\"text\" id=\"player-name\" value=\"" + Viewer.gameSync.getName() + "\" placeholder=\"nap\u0159.: Jan Nov\u00E1k, tester123,...\" />\n            </label>\n            \n         \n            \n            <button onclick=\"Window.close(true);\">\n                Za\u010D\u00EDt\n            </button>\n             </div>\n            \n            \n\n        ", function (status) {
                if (status) {
                    GALLERY.Viewer.gameModeStart(window.document.getElementById('player-name').value);
                }
            }, 'SMALL');
        }
        Viewer.gameMode = gameMode;
        //let playerName:string;
        function gameModeStart(playerName) {
            //Window.close();
            Viewer.canvas.requestPointerLock();
            r('canvas.requestPointerLock();');
            if (typeof playerName === 'string') {
                Viewer.gameSync.setName(playerName);
            }
            //playerName = _playerName;
        }
        Viewer.gameModeStart = gameModeStart;
        var enginePlayReasonGameMode = new Viewer.EnginePlayReason('game mode');
        //let pointer_lock = document.getElementById("pointer-lock");
        var wasd = document.getElementById("wasd");
        //var $hints = $('.hints');
        Viewer.canvas.requestPointerLock = Viewer.canvas.requestPointerLock ||
            Viewer.canvas.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock ||
            document.mozExitPointerLock;
        // Hook pointer lock state change events for different browsers
        document.addEventListener('pointerlockchange', lockChangeAlert, false);
        document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
        var WS_SERVER = 'webappgames.com:1357';
        Viewer.gameSync = new Viewer.GameSync(WS_SERVER, Viewer.camera, Viewer.scene);
        //gameSync.connect();
        //playEngine(enginePlayReasonGameMode);
        function lockChangeAlert() {
            if (document.pointerLockElement === Viewer.canvas ||
                document.mozPointerLockElement === Viewer.canvas) {
                console.log('The pointer lock status is now locked');
                document.addEventListener("mousemove", mouseMove, false);
                Viewer.canvas.focus();
                //pointer_lock.innerHTML='Web mode';
                //$hints.hide();
                //pointer_lock.style.display = 'none';
                $('.game-mode').css('opacity', '0.2');
                wasd.style.display = 'block';
                Viewer.MODE = 'GAME';
                Viewer.camera.angularSensibility = MOUSE_ANGULAR_SENSIBILITY;
                Viewer.playEngine(enginePlayReasonGameMode);
                //triggerMouseEvent (canvas, "mousedown");
                Viewer.gameSync.connect();
            }
            else {
                console.log('The pointer lock status is now unlocked');
                document.removeEventListener("mousemove", mouseMove, false);
                //pointer_lock.innerHTML='Game mode';
                //$hints.show();
                //pointer_lock.style.display = 'block';
                $('.game-mode').css('opacity', '1');
                wasd.style.display = 'none';
                Viewer.camera.detachControl(Viewer.canvas);
                setTimeout(function () {
                    Viewer.camera.attachControl(Viewer.canvas);
                }, IMMEDIATELY_MS);
                //$(canvas).trigger('mouseup');
                Viewer.MODE = 'WEB';
                Viewer.camera.angularSensibility = -MOUSE_ANGULAR_SENSIBILITY;
            }
        }
        window.addEventListener('keydown', function (e) {
            if (Viewer.camera.keysUp.indexOf(e.keyCode) != -1 ||
                Viewer.camera.keysDown.indexOf(e.keyCode) != -1 ||
                Viewer.camera.keysLeft.indexOf(e.keyCode) != -1 ||
                Viewer.camera.keysRight.indexOf(e.keyCode) != -1) {
                $(wasd).fadeOut();
            }
        }, false);
        function mouseMove(e) {
            //r('mousemove');
            var movementX = e.movementX ||
                e.mozMovementX ||
                0;
            var movementY = e.movementY ||
                e.mozMovementY ||
                0;
            Viewer.camera.rotation.y += (movementX / 10) / 180 * Math.PI;
            Viewer.camera.rotation.x += (movementY / 10) / 180 * Math.PI;
        }
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../shared/reference.ts" />
/// <reference path="lib/ion.sound.ts" />
//todo deprecated
/// <reference path="babylon-plugins/babylon-tree" />
/// <reference path="babylon-plugins/babylon-stairs" />
/// <reference path="compatibility" />
/// <reference path="scene" />
/// <reference path="engine" />
/// <reference path="run-viewer" />
/// <reference path="run-world" />
/// <reference path="keys" />
/// <reference path="scene-collide" />
/// <reference path="scene-pick" />
/// <reference path="move-to" />
/// <reference path="reference" />
/// <reference path="popup-window" />
/// <reference path="gates" />
/// <reference path="sounds" />
/// <reference path="stat" />
/// <reference path="fps-meter" />
/// <reference path="data-uri-to-blob" />
/// <reference path="develop-menu" />
/// <reference path="develop-deploy" />
/// <reference path="error-reporting" />
/// <reference path="date-functions" />
/// <reference path="game-mode" />
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        if (BABYLON.Engine.isSupported()) {
        }
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
var defaultDiacriticsRemovalMap = [
    {
        'base': 'A',
        'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
    },
    { 'base': 'AA', 'letters': /[\uA732]/g },
    { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
    { 'base': 'AO', 'letters': /[\uA734]/g },
    { 'base': 'AU', 'letters': /[\uA736]/g },
    { 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
    { 'base': 'AY', 'letters': /[\uA73C]/g },
    { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
    {
        'base': 'C',
        'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
    },
    {
        'base': 'D',
        'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
    },
    { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
    { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
    {
        'base': 'E',
        'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
    },
    { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
    {
        'base': 'G',
        'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
    },
    {
        'base': 'H',
        'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
    },
    {
        'base': 'I',
        'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
    },
    { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
    {
        'base': 'K',
        'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
    },
    {
        'base': 'L',
        'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
    },
    { 'base': 'LJ', 'letters': /[\u01C7]/g },
    { 'base': 'Lj', 'letters': /[\u01C8]/g },
    { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
    {
        'base': 'N',
        'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
    },
    { 'base': 'NJ', 'letters': /[\u01CA]/g },
    { 'base': 'Nj', 'letters': /[\u01CB]/g },
    {
        'base': 'O',
        'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
    },
    { 'base': 'OI', 'letters': /[\u01A2]/g },
    { 'base': 'OO', 'letters': /[\uA74E]/g },
    { 'base': 'OU', 'letters': /[\u0222]/g },
    {
        'base': 'P',
        'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
    },
    { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
    {
        'base': 'R',
        'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
    },
    {
        'base': 'S',
        'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
    },
    {
        'base': 'T',
        'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
    },
    { 'base': 'TZ', 'letters': /[\uA728]/g },
    {
        'base': 'U',
        'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
    },
    { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
    { 'base': 'VY', 'letters': /[\uA760]/g },
    {
        'base': 'W',
        'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
    },
    { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
    {
        'base': 'Y',
        'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
    },
    {
        'base': 'Z',
        'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
    },
    {
        'base': 'a',
        'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
    },
    { 'base': 'aa', 'letters': /[\uA733]/g },
    { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g },
    { 'base': 'ao', 'letters': /[\uA735]/g },
    { 'base': 'au', 'letters': /[\uA737]/g },
    { 'base': 'av', 'letters': /[\uA739\uA73B]/g },
    { 'base': 'ay', 'letters': /[\uA73D]/g },
    { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
    {
        'base': 'c',
        'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
    },
    {
        'base': 'd',
        'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
    },
    { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g },
    {
        'base': 'e',
        'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
    },
    { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
    {
        'base': 'g',
        'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
    },
    {
        'base': 'h',
        'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
    },
    { 'base': 'hv', 'letters': /[\u0195]/g },
    {
        'base': 'i',
        'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
    },
    { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
    {
        'base': 'k',
        'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
    },
    {
        'base': 'l',
        'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
    },
    { 'base': 'lj', 'letters': /[\u01C9]/g },
    { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
    {
        'base': 'n',
        'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
    },
    { 'base': 'nj', 'letters': /[\u01CC]/g },
    {
        'base': 'o',
        'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
    },
    { 'base': 'oi', 'letters': /[\u01A3]/g },
    { 'base': 'ou', 'letters': /[\u0223]/g },
    { 'base': 'oo', 'letters': /[\uA74F]/g },
    {
        'base': 'p',
        'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
    },
    { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
    {
        'base': 'r',
        'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
    },
    {
        'base': 's',
        'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
    },
    {
        'base': 't',
        'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
    },
    { 'base': 'tz', 'letters': /[\uA729]/g },
    {
        'base': 'u',
        'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
    },
    { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
    { 'base': 'vy', 'letters': /[\uA761]/g },
    {
        'base': 'w',
        'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
    },
    { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
    {
        'base': 'y',
        'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
    },
    {
        'base': 'z',
        'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
    }
];
var changes;
function removeDiacritics(str) {
    if (!changes) {
        changes = defaultDiacriticsRemovalMap;
    }
    for (var i = 0; i < changes.length; i++) {
        str = str.replace(changes[i].letters, changes[i].base);
    }
    return str;
}
function createUriFromName(name) {
    name = removeDiacritics(name);
    name = name.toLocaleLowerCase();
    name = name.split(' ').join('-');
    return name;
}
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function showStats() {
            if (!Viewer.analyticsObject)
                return;
            if (Viewer.analyticsObject.analyticsType == 'gallery') {
                $.get(STATSERVER_URL + '/' + Viewer.analyticsObject.domain).done(function (sessions) {
                    sessions.forEach(function (session) {
                        if (session.states.length < 2)
                            return;
                        var positions = session.states.map(function (state) {
                            var position = new BABYLON.Vector3(state.x * -BLOCK_SIZE, state.z * BLOCK_SIZE, //todo no use BLOCKS_1NP_LEVEL
                            state.y * BLOCK_SIZE);
                            return (position);
                        });
                        r(positions);
                        var tube = BABYLON.Mesh.CreateTube("tube", positions, 0.5, 3, null, 0, Viewer.scene, false, BABYLON.Mesh.FRONTSIDE);
                        //var lines = BABYLON.Mesh.CreateTube("lines",positions,2,3, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
                    });
                });
            }
        }
        Viewer.showStats = showStats;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        var Effects;
        (function (Effects) {
            function nuke() {
                Viewer.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
                Viewer.scene.fogDensity = 0.5;
                Viewer.scene.fogColor = BABYLON.Color3.FromHexString('#ffffff');
                Viewer.running = true;
                Viewer.scene.registerBeforeRender(function () {
                    if (!Viewer.running)
                        return;
                    Viewer.scene.fogDensity = Viewer.scene.fogDensity * 0.995;
                    if (Viewer.scene.fogDensity < 0.02) {
                        Viewer.scene.fogDensity = 0.02;
                        Viewer.running = false;
                    }
                });
                setTimeout(function () {
                    ion.sound.play("nuke");
                }, 300);
                /*var easingFunction = new BABYLON.CircleEase();
                easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        
        
                BABYLON.Animation.CreateAndStartAnimation(
                    "anim",
                    scene,
                    "fogDensity",
                    30,
                    60,
                    camera.position,
                    0.02,
        
                    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
                    easingFunction
                );*/
            }
            Effects.nuke = nuke;
        })(Effects = Viewer.Effects || (Viewer.Effects = {}));
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        var personToClone;
        BABYLON.SceneLoader.ImportMesh("", "/media/meshes/dude/", "dude.babylon", Viewer.scene, function (newMeshes, particleSystems, skeletons) {
            newMeshes[0].scaling.x = 0.2;
            newMeshes[0].scaling.y = 0.2;
            newMeshes[0].scaling.z = 0.2;
            personToClone = {
                meshes: newMeshes,
                skeleton: skeletons[0]
            };
        });
        var GamePlayer = (function () {
            function GamePlayer(scene) {
                this.scene = scene;
                var self = this;
                //r('Creating player');
                this._clonePlayerMesh();
                scene.registerBeforeRender(function () {
                    self._easeHead();
                    self._easeMovement();
                });
                /*this.mesh = BABYLON.Mesh.CreateSphere("player", 16, 2, scene);
    
                this.mesh.material = new BABYLON.StandardMaterial("Mat", scene);
    
                this.mesh.material.diffuseTexture = new BABYLON.Texture('/media/images/other/eye.jpg', scene);
                this.mesh.material.diffuseTexture.uScale = 1;
                this.mesh.material.diffuseTexture.vScale = 1;*/
                this.element = document.createElement('div');
                this.element.style.position = 'fixed';
                this.element.classList.add('zone-player');
                //element.innerHTML = 'xxx '+this.name;
                document.getElementById('zones').appendChild(this.element);
                /*boards.push({//todo DI
                    mesh: this.mesh,
                    element: this.element,
                    top: 20
                });*/
                // todo remove meshes or meshes.push(board);
                this.setName('');
                this.setMessage('');
            }
            GamePlayer.prototype._clonePlayerMesh = function () {
                var self = this;
                this.babylonPosition = new BABYLON.Vector3(0, 0, 0);
                this.babylonRotation = new BABYLON.Vector3(0, 0, 0);
                this._babylonPositionMovement = new BABYLON.Vector3(0, 0, 0);
                this.clonedPreson = {
                    meshes: [],
                    skeleton: personToClone.skeleton.clone('player-skeleton')
                };
                personToClone.meshes.forEach(function (mesh, i) {
                    if (i == 0)
                        return;
                    self.clonedPreson.meshes[i] = mesh.clone('player');
                    self.clonedPreson.meshes[i].rotation = self.babylonRotation;
                    self.clonedPreson.meshes[i].position = self.babylonPosition;
                    self.clonedPreson.meshes[i].skeleton = self.clonedPreson.skeleton;
                });
            };
            GamePlayer.prototype._redrawBoard = function () {
                this.element.innerHTML = '';
                if (this.name) {
                    this.element.innerHTML += '<span class="name">[' + this.name + ']</span>';
                }
                if (this.message) {
                    this.element.innerHTML += '<span class="message">' + this.message + '</span>';
                }
            };
            GamePlayer.prototype.setName = function (name) {
                this.name = name;
                this._redrawBoard();
            };
            GamePlayer.prototype.setPosition = function (position, first) {
                if (first === void 0) { first = false; }
                var self = this;
                /*this.babylonPosition.x=position.x/0.2;
                this.babylonPosition.y=(position.y-EYE_VERTICAL*BLOCK_SIZE)/0.2;
                this.babylonPosition.z=position.z/0.2;
                    */
                position.y -= EYE_VERTICAL * BLOCK_SIZE;
                position.x /= 0.2;
                position.y /= 0.2;
                position.z /= 0.2;
                /*if(!first) {
    
                    this._babylonPositionMovement = new BABYLON.Vector3(
                        position.x-this.babylonPosition.x,
                        position.y-this.babylonPosition.y,
                        position.z-this.babylonPosition.z
                    );
    
    
                }
    
    
                this.babylonPosition.x=position.x;
                this.babylonPosition.y=position.y;
                this.babylonPosition.z=position.z;*/
                this.clonedPreson.meshes.forEach(function (mesh) {
                    BABYLON.Animation.CreateAndStartAnimation("anim", mesh, "position", 30, 30 * 0.1, mesh.position, position, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
                });
                if (!this._inStep) {
                    this._inStep = true;
                    Viewer.scene.beginAnimation(this.clonedPreson.skeleton, 100 - 80, 80, false, 3, function () {
                        self._inStep = false;
                    });
                }
                //this.mesh.position = position;
            };
            GamePlayer.prototype._easeMovement = function () {
                this.babylonPosition.x += this._babylonPositionMovement.x * 0.1;
                this.babylonPosition.y += this._babylonPositionMovement.y * 0.1;
                this.babylonPosition.z += this._babylonPositionMovement.z * 0.1;
            };
            GamePlayer.prototype.setRotation = function (rotation) {
                this.headRotation = rotation.x;
                rotation.x = 0;
                rotation.z = 0;
                rotation.y += Math.PI;
                this.clonedPreson.meshes.forEach(function (mesh) {
                    BABYLON.Animation.CreateAndStartAnimation("anim", mesh, "rotation", 30, 30 * 0.1, mesh.rotation, rotation, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
                });
                //this.babylonRotation.y=rotation.y+Math.PI;
                /*rotation.y += Math.PI/2;
    
                let _=rotation.x;
                rotation.x = rotation.z;
                rotation.z = _;
    
    
                //this.mesh.rotation = rotation;
                BABYLON.Animation.CreateAndStartAnimation(
                    "anim",
                    this.mesh,
                    "rotation",
                    30,
                    30 * 0.1,
                    this.mesh.rotation,
                    rotation,
                    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
                );*/
            };
            GamePlayer.prototype._easeHead = function () {
                //let from = this.clonedPreson.skeleton.bones[7].getRotation().z;
                var to = this.headRotation;
                //let current = (from+to)/2;
                this.clonedPreson.skeleton.bones[7].setRotation(new BABYLON.Vector3(0, 0, to));
            };
            GamePlayer.prototype.setMessage = function (message) {
                this.message = message;
                this._redrawBoard();
            };
            GamePlayer.prototype.destruct = function () {
                this.clonedPreson.skeleton.dispose();
                this.clonedPreson.meshes.forEach(function (mesh) {
                    mesh.dispose();
                });
                //this.mesh.dispose();
                this.element.parentNode.removeChild(this.element);
            };
            return GamePlayer;
        }());
        Viewer.GamePlayer = GamePlayer;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        /*
        let image_texture = new BABYLON.Texture('/media/images/sprite.jpg', scene);
        image_texture.hasAlpha = false;
    
    
    
    
        export function getImageMaterial(src: string, isEmitting: boolean, hasAlpha: boolean, backFace: boolean) {
    
    
            let material = new BABYLON.StandardMaterial("texture4", scene);
            material.diffuseTexture = image_texture;
            return(material);
    
    
        }*/
        var enginePlayReasonLoadingTextures = new Viewer.EnginePlayReason('loading textures');
        Viewer.playEngine(enginePlayReasonLoadingTextures);
        var texturesCount = 0;
        var texturesLoaded = 0;
        var onTextureLoad = function () {
            texturesLoaded++;
            //r('Loaded texture '+texturesLoaded+' / '+texturesCount);
            if (texturesLoaded == texturesCount) {
                Viewer.pauseEngine(enginePlayReasonLoadingTextures);
            }
        };
        var imagesMaterials = {}; //todo DI
        function getImageMaterial(src, width, isEmitting, hasAlpha, backFace) {
            var key = src + width + isEmitting + hasAlpha + backFace; //todo better - maybe hash
            if (typeof imagesMaterials[key] === 'undefined') {
                var src = src;
                var src_uri = URI(src) //todo Di
                    .removeSearch("width");
                var src_normal = src_uri.addSearch({ width: width }).toString();
                var onLoad = function () {
                    r('Loaded texture!');
                    Viewer.renderTick();
                };
                texturesCount++;
                var image_texture = new BABYLON.Texture(src_normal, Viewer.scene, false, true, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, onTextureLoad);
                image_texture.hasAlpha = hasAlpha;
                //image_texture.delayLoadState = BABYLON.Engine.DELAYLOADSTATE_NOTLOADED;
                var material = new BABYLON.StandardMaterial("texture4", Viewer.scene);
                if (isEmitting) {
                    material.emissiveTexture = image_texture;
                    material.backFaceCulling = !(backFace);
                    material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                    material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                    material.specularPower = 32;
                    //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                    material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                }
                else {
                    material.diffuseTexture = image_texture;
                }
                material.freeze();
                imagesMaterials[key] = material;
            }
            return (imagesMaterials[key]);
        }
        Viewer.getImageMaterial = getImageMaterial;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/*
todo delete file

namespace GALLERY.Viewer {


    export function getImageMesh(object){


        if(window.innerWidth>1024){
            let quality = 1024;
        }else
        if(window.innerWidth>512){
            let quality = 512;
        }else{
            let quality = 256;
        }

        let distance = 5;

        let image00 = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
        image00.material = getImageMaterial(object.src, quality, object.isEmitting, object.hasAlpha, object.backFace);



        const lods = 5;
        let mesh;

        for(let lod=0;lod<lods;lod++){

            quality = quality/2;
            distance = distance*2;

            let mesh = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
            mesh.material = getImageMaterial(object.src, quality, object.isEmitting, object.hasAlpha, object.backFace);
            image00.addLODLevel(distance,  mesh);


        }





        return image00;

    }





}

*/ 
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function getTextureUrl(key) {
            var url;
            if (BLOCK_MATERIALS.indexOf(key) !== -1) {
                url = "/media/images/textures/" + key + ".jpg";
                r('Creating native texture ' + key + '.');
            }
            else {
                var image = textures.findBy('name', key);
                r('finded', image);
                if (image) {
                    url = image.getTexture();
                    r('Creating texture ' + key + ' from ' + url + '.');
                }
                else {
                    console.warn('There is no texture image with name ' + key + '!');
                }
            }
            return (url);
        }
        Viewer.getTextureUrl = getTextureUrl;
        var materials = {}; //todo maybe DI
        function getMaterial(key, opacity, noCache) {
            if (noCache === void 0) { noCache = false; }
            if (typeof materials[key] === 'undefined' || noCache) {
                var material = new BABYLON.StandardMaterial("Mat", Viewer.scene);
                if (key.substr(0, 1) == '#') {
                    material.diffuseColor = BABYLON.Color3.FromHexString(key);
                }
                else {
                    material.diffuseTexture = new BABYLON.Texture(getTextureUrl(key), Viewer.scene);
                    material.diffuseTexture.uScale = 10; //Vertical offset of 10%
                    material.diffuseTexture.vScale = 10; //Horizontal offset of 40%
                }
                material.alpha = opacity;
                material.freeze();
                if (noCache) {
                    return (material);
                }
                else {
                    materials[key] = material;
                }
            }
            return (materials[key]);
        }
        Viewer.getMaterial = getMaterial;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        function makeScreenshots(labels, options, done, screenshots) {
            if (screenshots === void 0) { screenshots = []; }
            r('Making screenshot...');
            var label = labels.next();
            if (!label) {
                done(screenshots);
                return;
            }
            GALLERY.Viewer.appState(label.uri + window.location.hash);
            setTimeout(function () {
                BABYLON.Tools.CreateScreenshot(Viewer.engine, Viewer.scene.activeCamera, options, function (screenshot) {
                    //r(screenshot);
                    //saveAs(dataURItoBlob(screenshot),'screenshot.png');
                    //sss;
                    screenshots.push(dataURItoBlob(screenshot));
                    //r('Screenshot created');
                    makeScreenshots(labels, options, done, screenshots);
                });
            }, 40);
        }
        Viewer.makeScreenshots = makeScreenshots;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        var last_hoovered_mesh = null;
        function onPointerHover(evt, pickResult) {
            var hoovered_mesh;
            if (pickResult.hit) {
                r(pickResult.pickedMesh.name);
                if (pickResult.pickedMesh.name.split('-', 2)[0] !== 'image') {
                    hoovered_mesh = null;
                }
                else {
                    hoovered_mesh = pickResult.pickedMesh;
                }
            }
            else {
                hoovered_mesh = null;
            }
            if (hoovered_mesh !== last_hoovered_mesh) {
                if (hoovered_mesh) {
                    onPointerEnter(hoovered_mesh);
                }
                if (last_hoovered_mesh) {
                    onPointerLeave(last_hoovered_mesh);
                }
                last_hoovered_mesh = hoovered_mesh;
            }
        }
        Viewer.onPointerHover = onPointerHover;
        var beforeHoverScaling;
        //let hooverInterval;
        //let hoverColor = BABYLON.Color3.White();//BABYLON.Color3.FromHexString('#37beff');
        function onPointerEnter(mesh) {
            //r('onPointerEnter',mesh);
            var distance = BABYLON.Vector3.Distance(Viewer.camera.position, mesh.position) / BLOCK_SIZE;
            beforeHoverScaling = mesh.scaling;
            mesh.scaling = beforeHoverScaling.clone();
            var q = 1 + 0.005 * distance;
            mesh.scaling.x *= q;
            mesh.scaling.y *= q;
            Viewer.renderTick();
            /*let rad = 0;
            hooverInterval = setInterval(function () {
    
                rad += 30 / 180 * Math.PI;
                let q = 1+(-Math.cos(rad)+1)/5;
    
                mesh.scaling = beforeHoverScaling.clone();
                mesh.scaling.x *= q;
                mesh.scaling.y *= q;
    
    
            },50);*/
            //hooverLayer.addMesh(mesh, hoverColor);
        }
        Viewer.onPointerEnter = onPointerEnter;
        function onPointerLeave(mesh) {
            //r('onPointerLeave');
            //clearInterval(hooverInterval);
            mesh.scaling = beforeHoverScaling;
            Viewer.renderTick();
            //hooverLayer.removeMesh(mesh);
        }
        Viewer.onPointerLeave = onPointerLeave;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        document.onwheel = function (event) {
            if (Viewer.MODE == 'WEB' /* && !LOCKED*/) {
                if (event.deltaY > 0) {
                    Viewer.appStateNext();
                }
                else if (event.deltaY < 0) {
                    Viewer.appStatePrevious();
                }
            }
            else {
            }
        };
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
