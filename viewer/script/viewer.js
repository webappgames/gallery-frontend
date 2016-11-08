var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//document.getElementById("para1").innerHTML = dateToSmartString(new Date('2016-01-01T13:39:45.794Z'));
function dayOfUniverse(date) {
    return Math.round((date) / 8.64e7);
}
function dateToSmartString(date) {
    var now = new Date();
    var day_name;
    if (dayOfUniverse(date) == dayOfUniverse(now)) {
        day_name = 'Today';
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
    return day_name + ' at ' + date.getHours() + ':' + date.getMinutes();
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
        var Effects;
        (function (Effects) {
            function nuke() {
                scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
                scene.fogDensity = 0.5;
                scene.fogColor = BABYLON.Color3.FromHexString('#ffffff');
                Viewer.running = true;
                scene.registerBeforeRender(function () {
                    if (!Viewer.running)
                        return;
                    scene.fogDensity = scene.fogDensity * 0.995;
                    if (scene.fogDensity < 0.02) {
                        scene.fogDensity = 0.02;
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
var gates, keys;
function unlockGatesAndActivateKeys(key) {
    var opening = 0, closing = 0;
    gates.forEach(function (gate) {
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
            }
            Array.prototype.getAll = function () {
                return this.objects;
            };
            Array.prototype.forEach = function (callback) {
                return this.objects.forEach(callback);
            };
            Array.prototype.sort = function (callback) {
                this.objects.sort(callback);
                return this;
            };
            Array.prototype.push = function (object) {
                this.objects.push(GALLERY.Objects.Object.init(object));
            };
            Array.prototype.findBy = function (key, value) {
                r('findBy', key, value);
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
            function Object(object) {
                object.world = object.world || 'main';
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
                if (object.type == 'environment') {
                    object = new GALLERY.Objects.Environment(object);
                }
                else if (object.type == 'block') {
                    object = new GALLERY.Objects.Block(object);
                }
                else if (object.type == 'multiblock') {
                    object = new GALLERY.Objects.MultiBlock(object);
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
                else if (object.type == 'zone') {
                    object = new GALLERY.Objects.Zone(object);
                }
                else if (object.type == 'deploy') {
                    object = new GALLERY.Objects.Deploy(object);
                }
                else if (object.type == 'board') {
                    object = new GALLERY.Objects.Board(object);
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
            Object.prototype.getBabylonPosition = function () {
                var level = BLOCKS_STOREYS_LEVELS[object.storey];
                var position = new BABYLON.Vector3(object.position.x * -BLOCK_SIZE, (level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE, //(0.5 - 0.9) * BLOCK_SIZE,
                object.position.y * BLOCK_SIZE);
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
            }
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
                this.rotation = this.rotation || 0;
                this.onGround = this.onGround || false;
                this.hasAlpha = this.hasAlpha || false;
                if (typeof this.isEmitting == 'undefined') {
                    this.isEmitting = true;
                }
                this.checkCollisions = this.checkCollisions || false;
                this.backFace = this.backFace || false;
            }
            Image.prototype.getTexture = function () {
                return (this.src);
            };
            Image.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var src = object.src;
                var src_uri = URI(src)
                    .removeSearch("width");
                var src_normal = src_uri.addSearch({ width: 100 }).toString();
                if (object.onGround) {
                    var $image = $('<img>').addClass('image');
                    var width = object.width * zoom_selected;
                    var height = object.height * zoom_selected;
                    $image.css('width', width);
                    $image.css('height', height);
                    $image.attr('src', src_normal);
                    $image.css('position', 'relative');
                    $image.css('top', -height / 2);
                    $image.css('left', -width / 2);
                    //r(object.rotation);
                    if (object.rotation) {
                        $image.css('transform', 'rotate(' + object.rotation + 'deg)');
                    }
                    $element.append($image);
                }
                else {
                    var $image_0 = $('<img>').addClass('image-0').hide();
                    var $image_90 = $('<img>').addClass('image-90').hide();
                    var $image_180 = $('<img>').addClass('image-180').hide();
                    var $image_270 = $('<img>').addClass('image-270').hide();
                    $image_0.css('height', object.height * zoom_selected);
                    $image_180.css('height', object.height * zoom_selected);
                    $image_90.css('width', object.height * zoom_selected);
                    $image_270.css('width', object.height * zoom_selected);
                    $image_0.attr('src', src_normal);
                    $image_90.attr('src', src_normal + '&rotation=90');
                    $image_180.attr('src', src_normal + '&rotation=180');
                    $image_270.attr('src', src_normal + '&rotation=270');
                    //rotateImage($image_90[0],90);
                    //rotateImage($image_180[0],180);
                    //rotateImage($image_270[0],270);
                    if (object.rotation === 0) {
                        $image_0.show();
                    }
                    else if (object.rotation === 90) {
                        $image_90.show();
                    }
                    else if (object.rotation === 180) {
                        $image_180.show();
                    }
                    else if (object.rotation === 270) {
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
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(object) {
                _super.call(this, object);
                this.name = this.name || '';
                this.uri = this.uri || '';
                this.rotation = this.rotation || 0;
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
                this.material = this.material || 'stone-plain';
                this.width = this.width || 10;
                this.height = this.height || 2;
                this.rotation = this.rotation || 0;
                this.isFull = this.isFull || false;
                this.opacity = this.opacity || 1;
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
                this.name = this.name || '';
                this.url = this.url || '';
                this.password = this.password || '';
            }
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
        var Zone = (function (_super) {
            __extends(Zone, _super);
            //public selector: string;
            function Zone(object) {
                _super.call(this, object);
                this.width = this.width || 5;
                this.height = this.height || 5;
                this.html = this.html || '';
                //this.selector = this.selector || '';
            }
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
            return Zone;
        }(Objects.Object));
        Objects.Zone = Zone;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Board = (function (_super) {
            __extends(Board, _super);
            function Board(object) {
                _super.call(this, object);
                this.html = this.html || '';
            }
            Board.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-file-text-o" aria-hidden="true"></i>');
                return $element;
            };
            return Board;
        }(Objects.Object));
        Objects.Board = Board;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
var OBJECT_TYPES = ['zone', 'stairs', 'environment', 'light', 'label', 'tree', 'link', 'gate', 'deploy', 'board'];
var DOT_OBJECTS = ['zone', 'environment', 'light', 'label', 'tree', 'link', 'gate', 'deploy', 'board'];
var BLOCK_SIZE = 5;
//var BLOCK_SIZE_VERTICAL=10;
//var BLOCK_SIZE_DOOR=2;
var RESPAWN_VERTICAL = -30;
var EYE_VERTICAL = 2.5;
var LIGHT_VERTICAL = 3;
var SPEED = 7;
var SPEED_INERTIA = 0.5;
var SPEED_ROTATION = Math.PI / 2;
var BLOCK_SHAPES = ['none', 'current', 'room', 'wall', 'door', 'window', 'low-window', 'floor', 'ceil', 'small-fence', 'medium-fence', 'big-fence', 'combo-wall'];
var BLOCKS_2D_3D_SHAPES = {
    room: [1, 0, 0, 0, 0, 0, 0, 0, 1],
    door: [1, 0, 0, 0, 1, 1, 1, 1, 1],
    gate: [1, 0, 0, 0, 1, 1, 1, 1, 1],
    wall: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    window: [1, 1, 1, 0, 0, 1, 1, 1, 1],
    'low-window': [1, 1, 0, 0, 1, 1, 1, 1, 1],
    floor: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    ceil: [0, 0, 0, 0, 0, 0, 0, 0, 1],
    'small-fence': [1, 1, 0, 0, 0, 0, 0, 0, 0],
    'medium-fence': [1, 1, 1, 0, 0, 0, 0, 0, 0],
    'big-fence': [1, 1, 1, 1, 0, 0, 0, 0, 0]
};
var STOREYS = [
    '1NP',
    '2NP',
    '3NP',
    '4NP',
    '5NP',
    '6NP'
];
var BLOCKS_1NP_LEVEL = (0.5 - 0.9);
var BLOCKS_STOREYS_LEVELS = {
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
/// <reference path="lib/jquery.d.ts" />
/// <reference path="script/uri-plugin.ts" />
/// <reference path="script/05-objects/00-array.ts" />
/// <reference path="script/05-objects/05-compiled-array.ts" />
/// <reference path="script/05-objects/05-object.ts" />
/// <reference path="script/05-objects/10-environment.ts" />
/// <reference path="script/05-objects/10-block.ts" />
/// <reference path="script/05-objects/10-multiblock.ts" />
/// <reference path="script/05-objects/10-image.ts" />
/// <reference path="script/05-objects/10-label.ts" />
/// <reference path="script/05-objects/10-light.ts" />
/// <reference path="script/05-objects/10-stairs.ts" />
/// <reference path="script/05-objects/10-tree.ts" />
/// <reference path="script/05-objects/10-link.ts" />
/// <reference path="script/05-objects/10-gate.ts" />
/// <reference path="script/05-objects/10-deploy.ts" />
/// <reference path="script/05-objects/10-zone.ts" />
/// <reference path="script/05-objects/10-board.ts" />
/// <reference path="script/scene-config.ts" />
/// <reference path="script/00-common.ts" />
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
var GALLERY;
(function (GALLERY) {
    var Viewer;
    (function (Viewer) {
        Viewer.running = false;
        function run(compiled_objects) {
            Viewer.running = true;
            objects = compiled_objects;
            r('Running gallery with ' + objects.getAll().length + ' objects.');
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
                processStateFromLocation(window.document.location);
            };
            appState(window.document.location.toString());
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
        function appState(location, standGround) {
            if (standGround === void 0) { standGround = false; }
            history.replaceState(null, "Gallery", location); //todo normal name
            history.pushState(null, "Gallery", location); //todo normal name
            GALLERY.Viewer.processStateFromLocation(window.document.location, standGround);
        }
        Viewer.appState = appState;
        function appStateBack(location, standGround) {
            if (standGround === void 0) { standGround = false; }
            history.back();
            appState(window.document.location.toString());
        }
        Viewer.appStateBack = appStateBack;
        function processStateFromLocation(location, standGround) {
            if (standGround === void 0) { standGround = false; }
            r('Processing location...');
            var uri = new URI(location);
            var pathname = uri.pathname();
            if (!standGround) {
                if (pathname.substr(0, 2) === '/:') {
                    var objectId = pathname.substr(2);
                    moveToObject(objects.getObjectById(objectId));
                }
                else {
                    if (!moveToURI(pathname)) {
                        moveToURI('/');
                    }
                }
            }
            unlockGatesAndActivateKeys(uri.hash());
            //r(uri);
        }
        Viewer.processStateFromLocation = processStateFromLocation;
    })(Viewer = GALLERY.Viewer || (GALLERY.Viewer = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
//var objects;
var meshes = [];
var zones = [];
var boards = [];
function runWorld(objects, textures) {
    r('Running gallery with ' + objects.getAll().length + ' objects.');
    r(objects);
    meshes = [];
    zones = [];
    boards = [];
    var sunShadowGenerator = new BABYLON.ShadowGenerator(1024, sun);
    sunShadowGenerator.useVarianceShadowMap = true;
    var building_blocks = [];
    var lights = [];
    var bark = new BABYLON.StandardMaterial("Mat", scene);
    bark.diffuseTexture = new BABYLON.Texture("../media/images/textures/bark.jpg", scene);
    bark.diffuseTexture.uScale = 1; //Vertical offset of 10%
    bark.diffuseTexture.vScale = 1; //Horizontal offset of 40%
    bark.freeze();
    gates = [];
    links = [];
    function getTextureUrl(key) {
        var url;
        if (BLOCK_MATERIALS.indexOf(key) !== -1) {
            url = "../media/images/textures/" + key + ".jpg";
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
    var materials = {}; //todo DI
    function getMaterial(key, opacity) {
        if (typeof materials[key] === 'undefined') {
            var material = new BABYLON.StandardMaterial("Mat", scene);
            if (key.substr(0, 1) == '#') {
                material.diffuseColor = BABYLON.Color3.FromHexString(key);
            }
            else {
                material.diffuseTexture = new BABYLON.Texture(getTextureUrl(key), scene);
                material.diffuseTexture.uScale = 10; //Vertical offset of 10%
                material.diffuseTexture.vScale = 10; //Horizontal offset of 40%
            }
            material.alpha = opacity;
            material.freeze();
            materials[key] = material;
        }
        return (materials[key]);
    }
    var imagesMaterials = {}; //todo DI
    function getImageMaterial(src, isEmitting, hasAlpha, backFace) {
        var key = src + isEmitting + hasAlpha + backFace; //todo better - maybe hash
        if (typeof imagesMaterials[key] === 'undefined') {
            var src = src;
            var src_uri = URI(src) //todo Di
                .removeSearch("width");
            var src_normal = src_uri.addSearch({ width: 512 }).toString();
            var image_texture = new BABYLON.Texture(src_normal, scene);
            image_texture.vOffset = 1; //Vertical offset of 10%
            image_texture.uOffset = 1; //Horizontal offset of 40%
            image_texture.hasAlpha = hasAlpha;
            var material = new BABYLON.StandardMaterial("texture4", scene);
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
    var endless = false;
    //var wasVideo = false;
    //==================================================================================================================
    objects.forEach(function (object) {
        //todo use getBabylonPosition
        object.storey = object.storey || '1NP';
        var level = BLOCKS_STOREYS_LEVELS[object.storey];
        var position = new BABYLON.Vector3(object.position.x * -BLOCK_SIZE, (level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE, //(0.5 - 0.9) * BLOCK_SIZE,
        object.position.y * BLOCK_SIZE);
        if (object.type == 'environment') {
            if (object.ground !== 'none') {
                //todo position
                /**/
                //Ground
                var ground = BABYLON.Mesh.CreatePlane("ground", 10000, scene);
                ground.material = new BABYLON.StandardMaterial("groundMat", scene);
                //ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.9, 0.7);
                //ground.material.backFaceCulling = false;
                ground.material.diffuseTexture = new BABYLON.Texture(getTextureUrl(object.ground), scene);
                ground.material.diffuseTexture.opacity = 0.5;
                ground.material.diffuseTexture.uScale = 100; //Vertical offset of 10%
                ground.material.diffuseTexture.vScale = 100; //Horizontal offset of 40%
                ground.material.reflectionColor = new BABYLON.Color3(0, 0, 0);
                ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
                ground.position = new BABYLON.Vector3(0, 0, 0);
                ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
                ground.receiveShadows = true;
                ground.isPickable = true;
                ground.checkCollisions = true;
                meshes.push(ground);
            }
            else {
                endless = true;
                r('Activating endless multiblocks.');
            }
            if (object.skybox !== 'none') {
                var url = object.skybox + '/' + object.skybox;
                // Skybox
                var skybox = BABYLON.Mesh.CreateBox("skyBox", object.skyboxSize, scene);
                var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
                skyboxMaterial.backFaceCulling = false;
                skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../media/images/skyboxes/" + url, scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
                skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
                skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                skyboxMaterial.disableLighting = true;
                skybox.material = skyboxMaterial;
                skybox.position = position; //new BABYLON.Vector3(0, 0, 0);
                skybox.position.y = 0;
                skybox.isPickable = false;
                meshes.push(skybox);
                if (object.skybox_reverse) {
                    skybox.rotation.z = Math.PI;
                }
            }
            if (object.fogDensity) {
                scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
                scene.fogDensity = object.fogDensity;
                scene.fogColor = BABYLON.Color3.FromHexString(object.fogColor);
            }
            else {
                scene.fogMode = BABYLON.Scene.FOGMODE_NONE;
            }
        }
        else if (object.type == 'zone') {
            var mesh = BABYLON.Mesh.CreateBox(object.id, BLOCK_SIZE, scene);
            mesh.material = new BABYLON.StandardMaterial("texture1", scene);
            mesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            mesh.material.alpha = 0;
            //mesh.material = getMaterial('stone-plain',0.5);
            mesh.position = position;
            position.y += BLOCK_SIZE * BLOCKS_2D_3D_SHAPES.room.length / 2;
            mesh.scaling.y = BLOCKS_2D_3D_SHAPES.room.length;
            mesh.scaling.x = object.width;
            mesh.scaling.z = object.height;
            var element = document.createElement('div');
            element.id = 'zone-' + object.id;
            element.style.display = 'none';
            element.classList.add('zone');
            element.innerHTML = object.html;
            r(element);
            document.getElementById('zones').appendChild(element);
            mesh.checkCollisions = false;
            //r(mesh);
            zones.push({
                mesh: mesh,
                element: element
            });
            meshes.push(mesh);
        }
        else if (object.type == 'block') {
            throw new Error('Block should not be in compiled objects.');
        }
        else if (object.type == 'multiblock') {
            //--------------------------------------Endless
            if (endless) {
                var bottom = object.position.z - object.size.z / 2;
                if (bottom <= 0) {
                    var top_2 = object.position.z + object.size.z / 2;
                    bottom -= 1000;
                    object.position.z = (top_2 + bottom) / 2;
                    object.size.z = top_2 - bottom;
                }
            }
            //--------------------------------------
            var position = new BABYLON.Vector3(object.position.x * -BLOCK_SIZE, (object.position.z + BLOCKS_1NP_LEVEL) * BLOCK_SIZE, //(0.5 - 0.9) * BLOCK_SIZE,
            object.position.y * BLOCK_SIZE);
            var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
            box.material = getMaterial(object.material, object.opacity);
            box.isPickable = true;
            box.checkCollisions = true;
            box.position = position;
            box.scaling.x = object.size.x;
            box.scaling.y = object.size.z;
            box.scaling.z = object.size.y;
            sunShadowGenerator.getShadowMap().renderList.push(box);
            meshes.push(box);
        }
        else if (object.type == 'light') {
            //r('creating light');
            var light = new BABYLON.PointLight("light", position, scene);
            light.diffuse = BABYLON.Color3.FromHexString(object.color);
            light.specular = light.diffuse;
            light.intensity = object.intensity / 4;
            light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;
            lights.push(light);
            meshes.push(light);
        }
        else if (object.type == 'image') {
            if (typeof object.rotation === 'number') {
                var rotation_rad = (object.rotation / 180) * Math.PI;
                var image = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
                image.material = getImageMaterial(object.src, object.isEmitting, object.hasAlpha, object.backFace);
                if (object.onGround) {
                    image.position = position;
                    image.position.y = (level + BLOCKS_1NP_LEVEL + 0.5) * BLOCK_SIZE + 0.1;
                    image.rotation.x = Math.PI / 2;
                    image.rotation.y = Math.PI + rotation_rad;
                }
                else {
                    position.x += Math.sin(rotation_rad) * BLOCK_SIZE / 100;
                    position.z += Math.cos(rotation_rad) * BLOCK_SIZE / 100;
                    image.position = position;
                    image.rotation.y = Math.PI + rotation_rad;
                    image.position.y += EYE_VERTICAL * BLOCK_SIZE;
                }
                image.scaling.x = object.width;
                image.scaling.y = object.height;
                image.scaling.z = 0.1;
                image.checkCollisions = object.checkCollisions;
                meshes.push(image);
            }
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
            var tree_mesh = createTreeMesh("tree", tree_data.size, tree_data.length, tree_data.psi, tree_data.bow, tree_data.kink, tree_data.detail, tree_data.sections, tree_data.branches, tree_data.spirals, tree_data.scale, tree_data.start, scene);
            tree_mesh.position = position;
            tree_mesh.material = bark;
            sunShadowGenerator.getShadowMap().renderList.push(tree_mesh);
            meshes.push(tree_mesh);
        }
        else if (object.type == 'stairs') {
            var stairs_mesh = createStairsMesh(/*object.id*/ 'stairs', 30, object.isFull, scene);
            //stairs_mesh.position = position;
            //r(position);
            stairs_mesh.scaling.x = object.width * BLOCK_SIZE;
            stairs_mesh.scaling.z = object.height * BLOCK_SIZE;
            stairs_mesh.scaling.y = (BLOCKS_2D_3D_SHAPES.room.length) * BLOCK_SIZE;
            r(stairs_mesh.scaling);
            stairs_mesh.position = position;
            //stairs_mesh.position.y = -BLOCK_SIZE;
            stairs_mesh.rotation.y = (object.rotation) / 180 * Math.PI;
            stairs_mesh.material = getMaterial(object.material, object.opacity);
            /**/
            stairs_mesh.checkCollisions = true;
            sunShadowGenerator.getShadowMap().renderList.push(stairs_mesh);
            meshes.push(stairs_mesh);
        }
        else if (object.type == 'link') {
            var link = new BABYLON.Mesh.CreateSphere(object.id, 16, object.radius * BLOCK_SIZE, scene);
            link.position = position;
            link.position.y += EYE_VERTICAL * BLOCK_SIZE;
            link.material = new BABYLON.StandardMaterial("texture2", scene);
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
            meshes.push(link);
        }
        else if (object.type == 'board') {
            var board = new BABYLON.Mesh.CreateSphere(object.id, 2, 2 * BLOCK_SIZE, scene);
            board.position = position;
            board.position.y += EYE_VERTICAL * BLOCK_SIZE;
            board.material = new BABYLON.StandardMaterial("texture2", scene);
            board.material.diffuseColor = BABYLON.Color3.FromHexString('#000000');
            board.material.alpha = 0;
            board.checkCollisions = false;
            var element = document.createElement('div');
            element.style.position = 'fixed';
            element.classList.add('zone');
            //element.style.zIndex = '100000';
            element.innerHTML = object.html;
            document.getElementById('zones').appendChild(element);
            boards.push({
                mesh: board,
                element: element
            });
            meshes.push(board);
        }
        else if (object.type == 'gate') {
            var rotation_rad = (object.rotation / 180) * Math.PI;
            //var gate = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
            var gate = BABYLON.Mesh.CreateBox(object.id, BLOCK_SIZE, scene);
            gate.material = new BABYLON.StandardMaterial("texture", scene);
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
            gates.push({
                object: object,
                mesh: gate
            });
            meshes.push(gate);
        }
        else {
            console.warn('Unknown object type "' + object.type + '", maybe version mismatch between editor and this viewer.');
        }
    });
    //unlockGatesAndActivateKeys();
}
function clearWorld() {
    meshes.forEach(function (mesh) {
        mesh.dispose();
    });
    meshes = [];
}
/// <reference path="reference.ts" />
var canvas = document.getElementById("scene");
var engine = new BABYLON.Engine(canvas, true);
var scene;
var createScene = function () {
    scene = new BABYLON.Scene(engine);
    // Lights
    //var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    //var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);
    // Need a free camera for collisions
    var camera = new BABYLON.VirtualJoysticksCamera("VJC", BABYLON.Vector3.Zero(), scene);
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, EYE_VERTICAL * BLOCK_SIZE, 30*BLOCK_SIZE), scene);
    scene.activeCamera = camera;
    camera.rotation.y = Math.PI;
    camera.attachControl(canvas, true);
    camera.angularSensibility = 1000;
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
    camera.keysLeft = [81]; //arrow <-
    camera.keysRight = [69]; //arrow ->
    camera.speed = SPEED;
    camera.inertia = SPEED_INERTIA;
    camera.fov = 1.3;
    camera.onCollide = onCollide;
    //Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    //scene.enablePhysics(scene.gravity, new BABYLON.OimoJSPlugin());
    // Enable Collisions
    scene.collisionsEnabled = true;
    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;
    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, EYE_VERTICAL * BLOCK_SIZE / 2, 1);
    //finally, say which mesh will be collisionable
    /*camera._oldPositionForCollisions = camera.position;
    camera.moveWithCollisions = function(velocity: Vector3): void {

        r(this);

        var globalPosition = this.position;//getAbsolutePosition();

        globalPosition.subtractFromFloatsToRef(0, this.ellipsoid.y, 0, this._oldPositionForCollisions);
        //this._oldPositionForCollisions.addInPlace(this.ellipsoidOffset);
        this._collider.radius = this.ellipsoid;

        this.getScene().collisionCoordinator.getNewPosition(this._oldPositionForCollisions, velocity, this._collider, 3, this, this._onCollisionPositionChange, this.uniqueId);
    };*/
    var zones_last = [];
    scene.registerBeforeRender(function () {
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
        //----------------------------------------------------------Zones
        var zones_ids = [];
        zones.forEach(function (zone) {
            if (zone.mesh.intersectsPoint(camera.position)) {
                zones_ids.push(zone.mesh.name);
            }
        });
        var zones_plus = [];
        var zones_minus = [];
        for (var i = 0, l = zones_ids.length; i < l; i++) {
            if (zones_last.indexOf(zones_ids[i]) == -1) {
                zones_plus.push(zones_ids[i]);
            }
        }
        for (var i = 0, l = zones_last.length; i < l; i++) {
            if (zones_ids.indexOf(zones_last[i]) == -1) {
                zones_minus.push(zones_last[i]);
            }
        }
        zones_last = zones_ids; //.slice();
        //r(zones_plus,zones_minus);
        zones_plus.forEach(function (zone_id) {
            //$('#zone-'+zone_id).show();
            r('In of zone ' + zone_id);
            //let zone = objects.getObjectById(zone_id);
            var $zone_sections = $('#zone-' + zone_id);
            $zone_sections.stop().slideDown();
            r($zone_sections);
        });
        zones_minus.forEach(function (zone_id) {
            //$('#zone-'+zone_id).hide();
            r('Out zone ' + zone_id);
            //let zone = objects.getObjectById(zone_id);
            var $zone_sections = $('#zone-' + zone_id);
            $zone_sections.stop().slideUp();
            r($zone_sections);
        });
        //----------------------------------------------------------Boards
        boards.forEach(function (board) {
            /*r(mesh.position);

            var p = BABYLON.Vector3.Project(

                mesh.position,
                BABYLON.Matrix.Identity(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(engine)


            );*/
            var position = BABYLON.Vector3.Project(board.mesh.position, BABYLON.Matrix.Identity(), scene.getTransformMatrix(), camera.viewport.toGlobal(canvas.clientWidth, canvas.clientHeight));
            if (position.z > 1) {
                board.element.style.display = 'none';
                return;
            }
            var pickInfo = scene.pick(position.x, position.y);
            if (pickInfo.pickedMesh !== board.mesh) {
                board.element.style.display = 'none';
                return;
            }
            //r(pickInfo.pickedMesh.name);
            var distance = BABYLON.Vector3.Distance(camera.position, board.mesh.position);
            var zoom = 1 / distance;
            zoom = 1;
            board.element.style.zIndex = 1000000000 - distance; //todo better
            board.element.style.zoom = zoom;
            //r(board.element.clientWidth);
            board.element.style.left = (position.x / zoom) - (board.element.clientWidth / 2) + 'px';
            board.element.style.top = (position.y / zoom) + 'px';
            board.element.style.display = 'block';
        });
        //----------------------------------------------------------
    });
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
    var sun = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(-0.7, -1, -0.5), scene);
    var sun2 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0.7, -1, 0.5), scene);
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
    //When pointer down event is raised
    scene.onPointerDown = onPointerDown;
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
        scene: scene,
        camera: camera,
        sun: sun,
    });
};
var scene_ = createScene();
var scene = scene_.scene;
var camera = scene_.camera;
var movement = scene_.movement;
var sun = scene_.sun;
engine.runRenderLoop(function () {
    scene.render();
});
// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
/// <reference path="reference.ts" />
function onCollide(collidedMesh) {
    //r(collidedMesh);
    //collidedMesh.checkCollisions = false;
    if (['ground', 'room', 'stairs'].indexOf(collidedMesh.id) !== -1) {
        //on_air = false;
        ion.sound.play("step-" + collidedMesh.id);
        return;
    }
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
                } /*else{

                    ion.sound.play("link-key-none");
                }*/
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
                Window.open(object.name, '<iframe src="' + object.href + '"></iframe>', function () { }, 'NORMAL');
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
        r('collide with ' + collidedMesh.name);
    }
}
;
/// <reference path="reference.ts" />
function onPointerDown(evt, pickResult) {
    canvas.requestPointerLock();
    /*
    // if the click hits the ground object, we change the impact position
    if (pickResult.hit) {

        //r(pickResult.pickedMesh.name);

        if(pickResult.pickedMesh.name=='ground') {


            var rad = Math.atan2(
                (pickResult.pickedPoint.x-camera.position.x),
                (pickResult.pickedPoint.z-camera.position.z)

            );


            r(rad/Math.PI*180);



            var babylon_rotation = new BABYLON.Vector3(
                0,
                rad,
                0
            );



            var babylon_position = new BABYLON.Vector3(
                pickResult.pickedPoint.x,
                camera.position.y,
                pickResult.pickedPoint.z
            );

            moveToBabylon(babylon_position,babylon_rotation,false);


        }else
        if(pickResult.pickedMesh.name=='room') {

            r('room picked');

        }else{

            var object = objects.getObjectById(pickResult.pickedMesh.name);

            r('pick',object);

            var src = object.src;
            var src_uri = URI(src)
                .removeSearch("width");
            var src_normal = src_uri.addSearch({ width: 1024 }).toString();


            setTimeout(
                function () {
                    Window.open(object.name, '<img src="'+src_normal+'">', function(){}, 'NORMAL');
                }, IMMEDIATELY_MS
            );




        }
        //r(object);

    }

    */
}
;
/// <reference path="reference.ts" />
var world_selected;
function moveTo(x, y, rotation, world, storey, immediately) {
    if (immediately === void 0) { immediately = true; }
    if (world_selected !== world) {
        r('Moving to new world "' + world + '" from world "' + world_selected + '"');
        document.getElementById("scene").focus();
        clearWorld();
        runWorld(objects.filterWorld(world), objects.filterWorld('textures') /*todo cache this*/);
        world_selected = world;
        immediately = true;
    }
    r('Moving to ', x, y, world, storey, rotation, immediately);
    /*camera.rotation.y = -Math.PI/2 - rotation/180*Math.PI;
    camera.rotation.x = 0;
    camera.rotation.z = 0;

    camera.position.x = x * -BLOCK_SIZE;
    camera.position.z = y * BLOCK_SIZE;*/
    var babylon_rotation = new BABYLON.Vector3(0, (180 + rotation) / 180 * Math.PI, 0);
    var level = BLOCKS_STOREYS_LEVELS[storey];
    var babylon_position = new BABYLON.Vector3(x * -BLOCK_SIZE, (level + EYE_VERTICAL) * BLOCK_SIZE, y * BLOCK_SIZE);
    moveToBabylon(babylon_position, babylon_rotation, immediately);
}
function moveToObject(object, immediately) {
    if (immediately === void 0) { immediately = true; }
    object.rotation = object.rotation || 0; //todo better
    moveTo(object.position.x, object.position.y, object.rotation / 1, object.world, object.storey, immediately);
}
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
function moveToBabylon(babylon_position, babylon_rotation, immediately) {
    if (immediately) {
        camera.position = babylon_position;
        camera.rotation = babylon_rotation;
        return;
    }
    var easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation("anim", camera, "position", 30, 60, camera.position, babylon_position, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, easingFunction);
    //r(camera.rotation.y,babylon_rotation.y);
    function parseRadians(rad) {
        if (rad < 0)
            rad += Math.PI * 2;
        if (rad > Math.PI * 2)
            rad -= Math.PI * 2;
        return rad;
    }
    camera.rotation.y = parseRadians(camera.rotation.y);
    babylon_rotation.y = parseRadians(babylon_rotation.y);
    var diff = camera.rotation.y - babylon_rotation.y;
    if (diff > Math.PI)
        camera.rotation.y -= Math.PI * 2;
    if (diff < -Math.PI)
        camera.rotation.y += Math.PI * 2;
    BABYLON.Animation.CreateAndStartAnimation("anim", camera, "rotation", 30, 60, camera.rotation, babylon_rotation, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, easingFunction);
}
/// <reference path="reference.ts" />
var Window = {};
var window_opened = false;
var IMMEDIATELY_MS = 50;
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
 * @param format NORMAL, SMALL
 */
Window.setFormat = function (format) {
    $('.popup-window').removeClass('popup-window-small');
    $('.popup-window').removeClass('popup-window-vertical');
    if (format == "SMALL") {
        $('.popup-window').addClass('popup-window-small');
    }
    else if (format == "VERTICAL") {
        $('.popup-window').addClass('popup-window-vertical');
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
        Window.close();
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
        //e.preventDefault();
        Window.close(false);
        canvas.requestPointerLock();
    });
    $('.js-popup-window-close').unbind('click').click(function (e) {
        //e.preventDefault();
        Window.close(false);
        canvas.requestPointerLock();
    });
    /*$('.popup-window .content').unbind('mousedown').mousedown(function () {

        $('body').enableSelection();
    });
    $('body').enableSelection();*/
    document.exitPointerLock();
    window_opened = true;
};
/**
 * Close popup window and run close callback
 * @param {boolean} dont_run_close_callback
 */
Window.close = function (dont_run_close_callback) {
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
            Window.closeCallback();
        }
        delete Window.closeCallback;
    }
    //-------------------------------------------
};
/// <reference path="reference.ts" />
// init bunch of sounds
ion.sound({
    sounds: [
        { name: "step-room", multiplay: false, volume: 0.2 },
        { name: "step-ground", multiplay: false, volume: 0.4 },
        { name: "step-stairs", multiplay: false, volume: 0.2 },
        { name: "link-teleport" },
        { name: "link-key" },
        //{name: "link-key-none"},
        { name: "gate-locked", multiplay: false },
        { name: "nuke", multiplay: false },
    ],
    // main config
    path: "../media/sound/",
    preload: true,
    multiplay: true,
    volume: 1
});
/// <reference path="reference.ts" />
var pointer_lock = document.getElementById("pointer-lock");
var $hints = $('.hints');
canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock;
//canvas.requestPointerLock();
pointer_lock.onclick = function (e) {
    e.preventDefault();
    //setTimeout(//todo is there a better solution?
    //    function () {
    canvas.requestPointerLock();
    //    }, IMMEDIATELY_MS
    //);
};
// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
function lockChangeAlert() {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", mouseMove, false);
        canvas.focus();
        //pointer_lock.innerHTML='<p>Esc</p>';
        $hints.hide();
    }
    else {
        console.log('The pointer lock status is now unlocked');
        document.removeEventListener("mousemove", mouseMove, false);
        //pointer_lock.innerHTML='<p><i class="fa fa-arrows" aria-hidden="true"></i></p>';
        $hints.show();
        camera.detachControl(canvas);
        setTimeout(function () {
            camera.attachControl(canvas);
        }, IMMEDIATELY_MS);
    }
}
function mouseMove(e) {
    //r('mousemove');
    var movementX = e.movementX ||
        e.mozMovementX ||
        0;
    var movementY = e.movementY ||
        e.mozMovementY ||
        0;
    camera.rotation.y += (movementX / 10) / 180 * Math.PI;
    camera.rotation.x += (movementY / 10) / 180 * Math.PI;
}
/// <reference path="../../shared/reference.ts" />
/// <reference path="lib/ion.sound.ts" />
/// <reference path="babylon-plugins/babylon-tree.ts" />
/// <reference path="babylon-plugins/babylon-stairs.ts" />
/// <reference path="run-viewer.ts" />
/// <reference path="run-world.ts" />
/// <reference path="keys.ts" />
/// <reference path="scene.ts" />
/// <reference path="scene-collide.ts" />
/// <reference path="scene-pick.ts" />
/// <reference path="move-to.ts" />
/// <reference path="reference.ts" />
/// <reference path="popup-window.ts" />
/// <reference path="gates.ts" />
/// <reference path="sounds.ts" />
/// <reference path="date-functions" />
/// <reference path="pointer-lock.ts" />
/// <reference path="reference.ts" />
var controls_keys = {
    'UP': [38, 87],
    'DOWN': [40, 83],
    'LEFT': [37, 65],
    'RIGHT': [39, 68],
    'JUMP': [32],
    //'REFRESH': [80],
    'PRINTSCR': [80]
};
//------------------------------------------------------------
window.addEventListener('keydown', function (e) {
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
    if (controls_down.LEFT) {
        camera.rotation.y -= SPEED_ROTATION * progress;
        if (camera.rotation.y < 0) {
            camera.rotation.y += Math.PI * 2;
        }
    }
    if (controls_down.RIGHT) {
        camera.rotation.y += SPEED_ROTATION * progress;
        if (camera.rotation.y > Math.PI * 2) {
            camera.rotation.y -= Math.PI * 2;
        }
    }
    if (controls_down.JUMP) {
    }
    /*if (controls_down.REFRESH) {

        runGallery(objects);

    }*/
    if (controls_down.PRINTSCR) {
        controls_down.PRINTSCR = false;
        r('print_scr');
        //r(scene,scene.engine, scene.camera);
        BABYLON.Tools.CreateScreenshot(engine, scene.activeCamera, { width: 3840, height: 2160 }, function (screenshot) {
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
            saveAs(dataURItoBlob(screenshot), filename);
        });
    }
    requestAnimationFrame(keys_tick);
};
requestAnimationFrame(keys_tick);
//var on_air = true;
