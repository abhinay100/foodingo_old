define('detect',[ "has" ], function(a) {
    function b(a, b) {
        var c, d = [ "", "-moz-", "-webkit-", "-ms-" ], e = "";
        for (c = d.length - 1; c >= 0; --c) e += a + ": " + d[c] + b + "; ";
        return e;
    }
    return {
        init: function(c) {
            a.add("touch", function(a, b) {
                return !!("ontouchstart" in window || a.navigator.maxTouchPoints > 0 || a.navigator.msMaxTouchPoints > 0 || a.DocumentTouch && b instanceof DocumentTouch);
            }), a.add("geolocation", function(a) {
                return "geolocation" in a.navigator;
            }), a.add("console", function(a) {
                return "console" in a && "function" == typeof a.console.log;
            }), a.add("input-event", function() {
                return "oninput" in document.documentElement;
            }), a.add("input-placeholder", function() {
                var a = document.createElement("input");
                return "placeholder" in a;
            }), a.add("input-placeholder-standard", function() {
                var a = document.createElement("input"), b = "placeholder" in a;
                return b && (-1 === a.maxLength || 524288 === a.maxLength) && "undefined" !== a.maxLength;
            }), a.add("csscalc", function() {
                var a = document.createElement("div");
                return a.style.cssText = b("width", "calc(10px)"), !!a.style.length;
            }), a.add("formdata", function(a) {
                return "FormData" in a && "function" == typeof a.FormData;
            }), a.add("localstorage", function(a) {
                return "localStorage" in a && "sessionStorage" in a;
            }), a.add("built", function() {
                return !0;
            }), a.add("last-child", function(a, b) {
                var c = b.head, d = b.createElement("style"), e = [ "#modernizr-last-child li { display:block; background:#f00; width:100px; height:100px; } ", "#modernizr-last-child li:last-child { background:#00f; width:200px; }" ];
                d.type = "text/css", d.styleSheet ? d.styleSheet.cssText = e.join("") : d.appendChild(b.createTextNode(e.join(""))), 
                c.appendChild(d);
                var f = b.createElement("ul");
                f.id = "modernizr-last-child", b.body.appendChild(f);
                var g = b.createElement("li");
                f.appendChild(g);
                var h = b.createElement("li");
                f.appendChild(h);
                var i = h.offsetWidth > g.offsetWidth;
                return d.parentNode.removeChild(d), f.parentNode.removeChild(f), i;
            }), c.addClass(a("touch") ? "has-touch" : "no-has-touch").addClass(a("input-placeholder-standard") ? "has-placeholders" : "no-has-placeholders");
        }
    };
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/da',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("da", {
        months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
        weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd D. MMMM, YYYY LT"
        },
        calendar: {
            sameDay: "[I dag kl.] LT",
            nextDay: "[I morgen kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[I går kl.] LT",
            lastWeek: "[sidste] dddd [kl] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s siden",
            s: "få sekunder",
            m: "et minut",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dage",
            M: "en måned",
            MM: "%d måneder",
            y: "et år",
            yy: "%d år"
        },
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/de',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    function b(a, b, c, d) {
        var e = {
            m: [ "eine Minute", "einer Minute" ],
            h: [ "eine Stunde", "einer Stunde" ],
            d: [ "ein Tag", "einem Tag" ],
            dd: [ a + " Tage", a + " Tagen" ],
            M: [ "ein Monat", "einem Monat" ],
            MM: [ a + " Monate", a + " Monaten" ],
            y: [ "ein Jahr", "einem Jahr" ],
            yy: [ a + " Jahre", a + " Jahren" ]
        };
        return b ? e[c][0] : e[c][1];
    }
    return a.lang("de", {
        months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "H:mm [Uhr]",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY LT",
            LLLL: "dddd, D. MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[Heute um] LT",
            sameElse: "L",
            nextDay: "[Morgen um] LT",
            nextWeek: "dddd [um] LT",
            lastDay: "[Gestern um] LT",
            lastWeek: "[letzten] dddd [um] LT"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            m: b,
            mm: "%d Minuten",
            h: b,
            hh: "%d Stunden",
            d: b,
            dd: b,
            M: b,
            MM: b,
            y: b,
            yy: b
        },
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/es',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("es", {
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
        longDateFormat: {
            LT: "H:mm",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY LT",
            LLLL: "dddd, D [de] MMMM [de] YYYY LT"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            nextDay: function() {
                return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        },
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/fi',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    function b(a, b, d, e) {
        var f = "";
        switch (d) {
          case "s":
            return e ? "muutaman sekunnin" : "muutama sekunti";

          case "m":
            return e ? "minuutin" : "minuutti";

          case "mm":
            f = e ? "minuutin" : "minuuttia";
            break;

          case "h":
            return e ? "tunnin" : "tunti";

          case "hh":
            f = e ? "tunnin" : "tuntia";
            break;

          case "d":
            return e ? "päivän" : "päivä";

          case "dd":
            f = e ? "päivän" : "päivää";
            break;

          case "M":
            return e ? "kuukauden" : "kuukausi";

          case "MM":
            f = e ? "kuukauden" : "kuukautta";
            break;

          case "y":
            return e ? "vuoden" : "vuosi";

          case "yy":
            f = e ? "vuoden" : "vuotta";
        }
        return f = c(a, e) + " " + f;
    }
    function c(a, b) {
        return 10 > a ? b ? e[a] : d[a] : a;
    }
    var d = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "), e = [ "nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", d[7], d[8], d[9] ];
    return a.lang("fi", {
        months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
        monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
        weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
        weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
        weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            L: "DD.MM.YYYY",
            LL: "Do MMMM[ta] YYYY",
            LLL: "Do MMMM[ta] YYYY, [klo] LT",
            LLLL: "dddd, Do MMMM[ta] YYYY, [klo] LT",
            l: "D.M.YYYY",
            ll: "Do MMM YYYY",
            lll: "Do MMM YYYY, [klo] LT",
            llll: "ddd, Do MMM YYYY, [klo] LT"
        },
        calendar: {
            sameDay: "[tänään] [klo] LT",
            nextDay: "[huomenna] [klo] LT",
            nextWeek: "dddd [klo] LT",
            lastDay: "[eilen] [klo] LT",
            lastWeek: "[viime] dddd[na] [klo] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s päästä",
            past: "%s sitten",
            s: b,
            m: b,
            mm: b,
            h: b,
            hh: b,
            d: b,
            dd: b,
            M: b,
            MM: b,
            y: b,
            yy: b
        },
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/fr',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("fr", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd D MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinal: function(a) {
            return a + (1 === a ? "er" : "");
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/it',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("it", {
        months: "Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
        monthsShort: "Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
        weekdays: "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
        weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
        weekdaysMin: "D_L_Ma_Me_G_V_S".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd, D MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[Oggi alle] LT",
            nextDay: "[Domani alle] LT",
            nextWeek: "dddd [alle] LT",
            lastDay: "[Ieri alle] LT",
            lastWeek: "[lo scorso] dddd [alle] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: function(a) {
                return (/^[0-9].+$/.test(a) ? "tra" : "in") + " " + a;
            },
            past: "%s fa",
            s: "alcuni secondi",
            m: "un minuto",
            mm: "%d minuti",
            h: "un'ora",
            hh: "%d ore",
            d: "un giorno",
            dd: "%d giorni",
            M: "un mese",
            MM: "%d mesi",
            y: "un anno",
            yy: "%d anni"
        },
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/ja',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("ja", {
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
        weekdaysShort: "日_月_火_水_木_金_土".split("_"),
        weekdaysMin: "日_月_火_水_木_金_土".split("_"),
        longDateFormat: {
            LT: "Ah時m分",
            L: "YYYY/MM/DD",
            LL: "YYYY年M月D日",
            LLL: "YYYY年M月D日LT",
            LLLL: "YYYY年M月D日LT dddd"
        },
        meridiem: function(a, b, c) {
            return 12 > a ? "午前" : "午後";
        },
        calendar: {
            sameDay: "[今日] LT",
            nextDay: "[明日] LT",
            nextWeek: "[来週]dddd LT",
            lastDay: "[昨日] LT",
            lastWeek: "[前週]dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s後",
            past: "%s前",
            s: "数秒",
            m: "1分",
            mm: "%d分",
            h: "1時間",
            hh: "%d時間",
            d: "1日",
            dd: "%d日",
            M: "1ヶ月",
            MM: "%dヶ月",
            y: "1年",
            yy: "%d年"
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/ko',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("ko", {
        months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
        weekdaysShort: "일_월_화_수_목_금_토".split("_"),
        weekdaysMin: "일_월_화_수_목_금_토".split("_"),
        longDateFormat: {
            LT: "A h시 mm분",
            L: "YYYY.MM.DD",
            LL: "YYYY년 MMMM D일",
            LLL: "YYYY년 MMMM D일 LT",
            LLLL: "YYYY년 MMMM D일 dddd LT"
        },
        meridiem: function(a, b, c) {
            return 12 > a ? "오전" : "오후";
        },
        calendar: {
            sameDay: "오늘 LT",
            nextDay: "내일 LT",
            nextWeek: "dddd LT",
            lastDay: "어제 LT",
            lastWeek: "지난주 dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s 후",
            past: "%s 전",
            s: "몇초",
            ss: "%d초",
            m: "일분",
            mm: "%d분",
            h: "한시간",
            hh: "%d시간",
            d: "하루",
            dd: "%d일",
            M: "한달",
            MM: "%d달",
            y: "일년",
            yy: "%d년"
        },
        ordinal: "%d일",
        meridiemParse: /(오전|오후)/,
        isPM: function(a) {
            return "오후" === a;
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/nb',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("nb", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
        weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "H.mm",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] LT",
            LLLL: "dddd D. MMMM YYYY [kl.] LT"
        },
        calendar: {
            sameDay: "[i dag kl.] LT",
            nextDay: "[i morgen kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[i går kl.] LT",
            lastWeek: "[forrige] dddd [kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "for %s siden",
            s: "noen sekunder",
            m: "ett minutt",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dager",
            M: "en måned",
            MM: "%d måneder",
            y: "ett år",
            yy: "%d år"
        },
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/nl',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    var b = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), c = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
    return a.lang("nl", {
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: function(a, d) {
            return /-MMM-/.test(d) ? c[a.month()] : b[a.month()];
        },
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd D MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            m: "één minuut",
            mm: "%d minuten",
            h: "één uur",
            hh: "%d uur",
            d: "één dag",
            dd: "%d dagen",
            M: "één maand",
            MM: "%d maanden",
            y: "één jaar",
            yy: "%d jaar"
        },
        ordinal: function(a) {
            return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de");
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/pl',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    function b(a) {
        return 5 > a % 10 && a % 10 > 1 && ~~(a / 10) % 10 !== 1;
    }
    function c(a, c, d) {
        var e = a + " ";
        switch (d) {
          case "m":
            return c ? "minuta" : "minutę";

          case "mm":
            return e + (b(a) ? "minuty" : "minut");

          case "h":
            return c ? "godzina" : "godzinę";

          case "hh":
            return e + (b(a) ? "godziny" : "godzin");

          case "MM":
            return e + (b(a) ? "miesiące" : "miesięcy");

          case "yy":
            return e + (b(a) ? "lata" : "lat");
        }
    }
    var d = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), e = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
    return a.lang("pl", {
        months: function(a, b) {
            return /D MMMM/.test(b) ? e[a.month()] : d[a.month()];
        },
        monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
        weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
        weekdaysShort: "nie_pon_wt_śr_czw_pt_sb".split("_"),
        weekdaysMin: "N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd, D MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[Dziś o] LT",
            nextDay: "[Jutro o] LT",
            nextWeek: "[W] dddd [o] LT",
            lastDay: "[Wczoraj o] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[W zeszłą niedzielę o] LT";

                  case 3:
                    return "[W zeszłą środę o] LT";

                  case 6:
                    return "[W zeszłą sobotę o] LT";

                  default:
                    return "[W zeszły] dddd [o] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "%s temu",
            s: "kilka sekund",
            m: c,
            mm: c,
            h: c,
            hh: c,
            d: "1 dzień",
            dd: "%d dni",
            M: "miesiąc",
            MM: c,
            y: "rok",
            yy: c
        },
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/pt',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("pt", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY LT",
            LLLL: "dddd, D [de] MMMM [de] YYYY LT"
        },
        calendar: {
            sameDay: "[Hoje às] LT",
            nextDay: "[Amanhã às] LT",
            nextWeek: "dddd [às] LT",
            lastDay: "[Ontem às] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "%s atrás",
            s: "segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mês",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/ru',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    function b(a, b) {
        var c = a.split("_");
        return b % 10 === 1 && b % 100 !== 11 ? c[0] : b % 10 >= 2 && 4 >= b % 10 && (10 > b % 100 || b % 100 >= 20) ? c[1] : c[2];
    }
    function c(a, c, d) {
        var e = {
            mm: "минута_минуты_минут",
            hh: "час_часа_часов",
            dd: "день_дня_дней",
            MM: "месяц_месяца_месяцев",
            yy: "год_года_лет"
        };
        return "m" === d ? c ? "минута" : "минуту" : a + " " + b(e[d], +a);
    }
    function d(a, b) {
        var c = {
            nominative: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            accusative: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
        }, d = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b) ? "accusative" : "nominative";
        return c[d][a.month()];
    }
    function e(a, b) {
        var c = {
            nominative: "янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
            accusative: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
        }, d = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b) ? "accusative" : "nominative";
        return c[d][a.month()];
    }
    function f(a, b) {
        var c = {
            nominative: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            accusative: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
        }, d = /\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/.test(b) ? "accusative" : "nominative";
        return c[d][a.day()];
    }
    return a.lang("ru", {
        months: d,
        monthsShort: e,
        weekdays: f,
        weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        monthsParse: [ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ],
        longDateFormat: {
            LT: "HH:mm",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY г.",
            LLL: "D MMMM YYYY г., LT",
            LLLL: "dddd, D MMMM YYYY г., LT"
        },
        calendar: {
            sameDay: "[Сегодня в] LT",
            nextDay: "[Завтра в] LT",
            lastDay: "[Вчера в] LT",
            nextWeek: function() {
                return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
            },
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[В прошлое] dddd [в] LT";

                  case 1:
                  case 2:
                  case 4:
                    return "[В прошлый] dddd [в] LT";

                  case 3:
                  case 5:
                  case 6:
                    return "[В прошлую] dddd [в] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "через %s",
            past: "%s назад",
            s: "несколько секунд",
            m: c,
            mm: c,
            h: "час",
            hh: c,
            d: "день",
            dd: c,
            M: "месяц",
            MM: c,
            y: "год",
            yy: c
        },
        meridiem: function(a, b, c) {
            return 4 > a ? "ночи" : 12 > a ? "утра" : 17 > a ? "дня" : "вечера";
        },
        ordinal: function(a, b) {
            switch (b) {
              case "M":
              case "d":
              case "DDD":
                return a + "-й";

              case "D":
                return a + "-го";

              case "w":
              case "W":
                return a + "-я";

              default:
                return a;
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/sv',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("sv", {
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
        weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
        weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd D MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[Idag] LT",
            nextDay: "[Imorgon] LT",
            lastDay: "[Igår] LT",
            nextWeek: "dddd LT",
            lastWeek: "[Förra] dddd[en] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "för %s sedan",
            s: "några sekunder",
            m: "en minut",
            mm: "%d minuter",
            h: "en timme",
            hh: "%d timmar",
            d: "en dag",
            dd: "%d dagar",
            M: "en månad",
            MM: "%d månader",
            y: "ett år",
            yy: "%d år"
        },
        ordinal: function(a) {
            var b = a % 10, c = 1 === ~~(a % 100 / 10) ? "e" : 1 === b ? "a" : 2 === b ? "a" : "e";
            return a + c;
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/tr',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    var b = {
        1: "'inci",
        5: "'inci",
        8: "'inci",
        70: "'inci",
        80: "'inci",
        2: "'nci",
        7: "'nci",
        20: "'nci",
        50: "'nci",
        3: "'üncü",
        4: "'üncü",
        100: "'üncü",
        6: "'ncı",
        9: "'uncu",
        10: "'uncu",
        30: "'uncu",
        60: "'ıncı",
        90: "'ıncı"
    };
    return a.lang("tr", {
        months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
        monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
        weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
        weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY LT",
            LLLL: "dddd, D MMMM YYYY LT"
        },
        calendar: {
            sameDay: "[bugün saat] LT",
            nextDay: "[yarın saat] LT",
            nextWeek: "[haftaya] dddd [saat] LT",
            lastDay: "[dün] LT",
            lastWeek: "[geçen hafta] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s önce",
            s: "birkaç saniye",
            m: "bir dakika",
            mm: "%d dakika",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gün",
            dd: "%d gün",
            M: "bir ay",
            MM: "%d ay",
            y: "bir yıl",
            yy: "%d yıl"
        },
        ordinal: function(a) {
            if (0 === a) return a + "'ıncı";
            var c = a % 10, d = a % 100 - c, e = a >= 100 ? 100 : null;
            return a + (b[c] || b[d] || b[e]);
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
});
!function(a) {
    "function" == typeof define && define.amd ? define('vendor/misc/langs/zh',[ "moment" ], a) : "object" == typeof exports ? module.exports = a(require("../moment")) : a(window.moment);
}(function(a) {
    return a.lang("zh-cn", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "Ah点mm",
            L: "YYYY-MM-DD",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日LT",
            LLLL: "YYYY年MMMD日ddddLT",
            l: "YYYY-MM-DD",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日LT",
            llll: "YYYY年MMMD日ddddLT"
        },
        meridiem: function(a, b, c) {
            var d = 100 * a + b;
            return 600 > d ? "凌晨" : 900 > d ? "早上" : 1130 > d ? "上午" : 1230 > d ? "中午" : 1800 > d ? "下午" : "晚上";
        },
        calendar: {
            sameDay: function() {
                return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT";
            },
            nextDay: function() {
                return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT";
            },
            lastDay: function() {
                return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT";
            },
            nextWeek: function() {
                var b, c;
                return b = a().startOf("week"), c = this.unix() - b.unix() >= 604800 ? "[下]" : "[本]", 
                0 === this.minutes() ? c + "dddAh点整" : c + "dddAh点mm";
            },
            lastWeek: function() {
                var b, c;
                return b = a().startOf("week"), c = this.unix() < b.unix() ? "[上]" : "[本]", 0 === this.minutes() ? c + "dddAh点整" : c + "dddAh点mm";
            },
            sameElse: "LL"
        },
        ordinal: function(a, b) {
            switch (b) {
              case "d":
              case "D":
              case "DDD":
                return a + "日";

              case "M":
                return a + "月";

              case "w":
              case "W":
                return a + "周";

              default:
                return a;
            }
        },
        relativeTime: {
            future: "%s内",
            past: "%s前",
            s: "几秒",
            m: "1分钟",
            mm: "%d分钟",
            h: "1小时",
            hh: "%d小时",
            d: "1天",
            dd: "%d天",
            M: "1个月",
            MM: "%d个月",
            y: "1年",
            yy: "%d年"
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
});
define('be/langs',[ "moment", "vendor/misc/langs/da", "vendor/misc/langs/de", "vendor/misc/langs/es", "vendor/misc/langs/fi", "vendor/misc/langs/fr", "vendor/misc/langs/it", "vendor/misc/langs/ja", "vendor/misc/langs/ko", "vendor/misc/langs/nb", "vendor/misc/langs/nl", "vendor/misc/langs/pl", "vendor/misc/langs/pt", "vendor/misc/langs/ru", "vendor/misc/langs/sv", "vendor/misc/langs/tr", "vendor/misc/langs/zh" ], function(a) {
    "use strict";
    return function(b) {
        a.lang(b);
    };
});
define('be/remoteLogger',[ "be/window", "beff/util/xhr" ], function(a, b) {
    "use strict";
    function c(a) {
        return Object.keys(a).forEach(function(b) {
            "object" == typeof a[b] ? a[b] = c(a[b]) : a[b] = a[b].toString().substr(0, 200);
        }), a;
    }
    function d(a, b, c, d) {
        if (d = "object" == typeof d ? d : {}, a = a || "ERROR", c = c || "[No message]", 
        b = b || "client_log", -1 === j.indexOf(a)) throw new Error("Unacceptable Level: " + a);
        h.push({
            level: a,
            channel: b,
            messages: [ {
                message: c
            } ],
            context: d
        });
    }
    function e() {
        g = setInterval(function() {
            h.length && i.send();
        }, 1e3);
    }
    function f() {
        g && (clearInterval(g), g = null);
    }
    var g, h = [], i = {}, j = [ "INFO", "ERROR" ];
    return i = {
        log: function(a, b, c, e) {
            return d(a.toUpperCase(), b, c, e), this;
        },
        info: function(a, b, c) {
            return d("INFO", a, b, c), this;
        },
        error: function(a, b, c) {
            return d("ERROR", a, b, c), this;
        },
        send: function() {
            var a, c, d = [];
            for (f(); h.length; ) a = h.pop(), d.push(JSON.stringify(a));
            return c = b({
                url: "/log",
                type: "POST",
                data: {
                    logs: d
                }
            }), c.then(e, e), c;
        },
        getQueue: function() {
            return h;
        },
        getSafeSearch: function() {
            var b = a.getSearchObject();
            return b = c(b);
        },
        init: function() {
            e();
        },
        destroy: function() {
            f(), h = [];
        }
    };
});
define('be/errorLogger',[ "has", "be/remoteLogger" ], function(a, b) {
    "use strict";
    function c(a) {
        try {
            g.error(a.originalError || a, a.requireType, a.requireModules);
        } catch (b) {}
    }
    function d(a, b, c, d, e) {
        a = e || a;
        var f;
        b && "undefined" !== b && c && (f = b + ":" + c, d && (f += ":" + d), g.error(a, f));
    }
    function e(b, c) {
        var d, j, k = {
            context: c.name
        };
        if (a("console")) {
            switch (c.name && Array.prototype.splice.call(b, 0, 0, "[" + c.name + "]"), c.level) {
              case g.WARN:
                d = console.warn;
                break;

              case g.ERROR:
                d = console.error;
                break;

              case g.INFO:
                d = console.info;
            }
            (d || console.log).apply(console, b);
        }
        b = Array.prototype.map.call(b, function(a) {
            return a instanceof Error ? {
                message: a.message,
                stack: a.stack,
                type: "error"
            } : a instanceof Event ? {
                message: a.target && a.target.src,
                type: "event"
            } : "object" == typeof a && "stack" in a && "message" in a ? {
                message: a.message,
                stack: a.stack,
                name: a.name || "",
                type: "object"
            } : {
                message: a,
                type: "string"
            };
        }), k.level = c.level.name, k.messages = b, j = JSON.stringify(k), h[j] || (i.push(k), 
        h[j] = !0), e.dirty || (setTimeout(function() {
            f(i), e.dirty = !1;
        }, 0), e.dirty = !0);
    }
    function f(a) {
        a && a.length && (a.map(function(a) {
            b.log(a.level, "js_errors", "Uncaught error", {
                messages: a.messages
            });
        }), b.send(), i = []);
    }
    var g, h = {}, i = [];
    return {
        _configureLogger: function() {
            a("built") ? (g.setLevel(g.ERROR), g.setHandler(e)) : (g.setLevel(g.DEBUG), g.useDefaults());
        },
        init: function(a, b, e) {
            g = e, a.onError = c, b.onerror = d, this._configureLogger();
        }
    };
});
define('beff/Component',[ "nbd/Class", "nbd/util/construct", "nbd/trait/log", "nbd/trait/pubsub" ], function(a, b, c, d) {
    "use strict";
    return a.extend({
        bind: function() {
            return this;
        },
        unbind: function() {
            return this;
        },
        destroy: function() {
            this.off().stopListening().unbind();
        }
    }, {
        displayName: "Component",
        init: function() {
            var a = b.apply(this, arguments);
            return a.bind(), a;
        }
    }).mixin(c).mixin(d);
});
define('be/mobilebanner',[ "jquery", "be/cookie", "be/window", "beff/Component" ], function(a, b, c, d) {
    "use strict";
    return d.extend({
        init: function(a, b) {
            this.$context = a, this.config = b, this.isIOS = this.constructor.isIOS(), this.isAndroid = this.constructor.isAndroid();
        },
        _getButtons: function() {
            var a = [], b = this.config.MOBILE_APP_BANNER;
            return a.push({
                label: "Install",
                classes: [ "form-button", "button-install" ],
                containerClasses: [ "banner-button" ],
                href: this.isIOS ? b.APPLE_DOWNLOAD : b.ANDROID_DOWNLOAD
            }), this.isIOS && a.push({
                label: "Open app",
                classes: [ "form-button", "button-open", "js-button-open" ],
                containerClasses: [ "banner-button" ]
            }), a;
        },
        bind: function() {
            var d = this, e = this.config, f = this.$context;
            return !this.isIOS && !this.isAndroid || b("mobile_app_banner") ? void this.trigger("norender") : void require(this.constructor.SUB_DEPENDENCIES, function(g) {
                var h, i, j = 300, k = f.find(".js-nav-basement"), l = e.MOBILE_APP_BANNER;
                h = a(g({
                    buttons: d._getButtons(),
                    platform: d.isIOS ? "iOS" : "Android"
                })), f.prepend(h), i = h.outerHeight(), h.animate({
                    marginTop: 0
                }, j), k.animate({
                    marginTop: i
                }, j), h.find(".js-close").click(function(a) {
                    a.preventDefault(), h.remove(), k.animate({
                        marginTop: 0
                    }, j), b("mobile_app_banner", "1", {
                        path: "/",
                        expires: 7,
                        secure: !1
                    });
                }), h.find(".js-button-open").click(function(a) {
                    a.preventDefault(), setTimeout(function() {
                        c.setLocation(l.APPLE_DOWNLOAD);
                    }, d.constructor.OPEN_TIMEOUT), d._redirect(l.APPLE_OPEN);
                }), d.trigger("postrender");
            }, function() {});
        },
        _redirect: function(a) {
            var b = document.createElement("iframe");
            b.setAttribute("src", a), document.documentElement.appendChild(b), b.parentNode.removeChild(b), 
            b = null;
        }
    }, {
        SUB_DEPENDENCIES: [ "hgn!templates/mobilebanner", "css!styles/mobilebanner.css" ],
        OPEN_TIMEOUT: 25,
        isIOS: function() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        isAndroid: function() {
            return /Android/i.test(navigator.userAgent);
        }
    });
});
define('lib/scrollpoint',[ "jquery" ], function(a) {
    "use strict";
    function b(a) {
        return j.test(a) || a > 0 && 1 > a;
    }
    function c(b) {
        if (a.isNumeric(b)) return parseFloat(b);
        var c = j.exec(b);
        return c ? c[1] / 100 : parseInt(b, 10);
    }
    function d(a) {
        return a.is(k) ? l.height() - (window.innerHeight || k.height()) : a.prop("scrollHeight");
    }
    function e(a, c, e) {
        return c > (b(a) ? a * d(e) : parseInt(a, 10));
    }
    function f(b) {
        var c = "window" === b ? k : a(b);
        return function() {
            var a, d, f, g = c.scrollTop();
            for (a in m[b]) d = m[b][a], f = e(a, g, c), d.cache = d.cache || !1, d.cache !== f && (d.fire(f), 
            d.cache = f);
        };
    }
    function g(b, d, e) {
        b = c(b);
        var f = m[e][b];
        f || (f = m[e][b] = new a.Callbacks()), f.add(d);
    }
    function h(a, b, c) {
        c = c || "window";
        var d;
        if (b) {
            if (a) return void m[c][a].remove(b);
            for (d in m[c]) m[c][d].remove(b);
        } else "string" == typeof a && (m[c][a].empty(), delete m[c][a]), c && delete m[c];
    }
    function i(b, c, d) {
        d = d || "window";
        var e, h = "window" === d ? k : a(d);
        m.hasOwnProperty(d) || (m[d] = {}, h.on("scroll", f(d)));
        {
            if ("object" != typeof b) return g(b, c, d);
            for (e in b) g(e, b[e], d);
        }
    }
    var j = /(\d+)%/, k = a(window), l = a(document), m = {};
    return i.on = i, i.off = h, i;
});
define('beff/dom/transitionEnd',[ "nbd/Promise", "nbd/util/diff" ], function(a, b) {
    "use strict";
    function c(a) {
        var b = a.css("transition-duration"), c = a.css("transition-property");
        return "none" !== c && b.split(",").map(parseFloat).some(Boolean);
    }
    function d(a) {
        var b = window.getComputedStyle(a[0]), c = a.css("transition-property");
        return ("all" === c ? h : c.split(",")).reduce(function(a, c) {
            return c = c.trim(), a[c] = b.getPropertyValue(c), a;
        }, {});
    }
    var e = function() {
        var a, b = document.createElement("aside"), c = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (a in c) if (void 0 !== b.style[a]) return c[a];
    }(), f = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, g = function(b) {
        var c = new a();
        return this.one(e, function(a) {
            a.originalEvent.propertyName === b && c.resolve(a);
        }), c;
    }, h = [ "transform", "transform-origin", "perspective", "perspective-origin", "color", "opacity", "column-width", "column-count", "column-gap", "column-rule-color", "column-rule-width", "letter-spacing", "text-indent", "word-spacing", "text-decoration-color", "text-shadow", "flex-basis", "flex-grow", "flex-shrink", "order", "background-color", "background-position", "background-size", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "box-shadow", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right", "padding-bottom", "padding-left", "max-height", "min-height", "height", "max-width", "min-width", "width", "visibility", "vertical-align", "bottom", "left", "right", "top", "z-index", "font-weight", "font-stretch", "font-size", "font-size-adjust", "line-height", "outline-color", "outline-width", "outline-offset", "clip", "shape-outside", "shape-margin", "shape-image-threshold" ];
    return function(h, i) {
        function j() {
            f(function() {
                var c = b(k, d(h)), e = Object.keys(c);
                e.length ? l.resolve(a.all(e.map(g, h))) : m ? l.resolve(!1) : j();
            });
        }
        var k, l = new a(), m = !1;
        return i = i || 300, e && c(h) ? (k = d(h), j(), setTimeout(function() {
            m = !0;
        }, i)) : l.resolve(!1), l;
    };
});
define('be/View/Basement',[ "jquery", "nbd/View/Element", "beff/dom/transitionEnd" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function(a) {
            this._super(a), a && (this.$view = a), this.limit = this.limit.bind(this);
        },
        destroy: function() {
            a(document.body).off(this.scroll), this.$view = null;
        },
        template: a,
        rendered: function() {
            var b = this;
            this.$view.on("click", ".js-nav-basement-submenu", function() {
                window.scrollTo(0, a(this).toggleClass("open").position().top), b.limit(!0);
            }), /iPhone|iPad|iPod/i.test(navigator.userAgent) && a(document.body).addClass("is-ios"), 
            /Android/i.test(navigator.userAgent) && a(document.body).addClass("is-android");
        },
        limit: function(b) {
            if (this.$view) {
                var d = a(document.body).add("#nav-basement");
                b ? d.css("height", Math.max(this.$view.find(".nav-items").outerHeight(), window.innerHeight)) : c(a(document.body)).then(function() {
                    d.css("height", "");
                });
            }
        },
        open: function() {
            a(document.body).addClass("basement-open"), this.limit(!0), a(window).on("orientationchange", this.limit);
        },
        close: function() {
            a(document.body).removeClass("basement-open"), this.limit(!1), a(window).off("orientationchange", this.limit);
        },
        toggle: function() {
            a(document.body).toggleClass("basement-open");
            var b = a(document.body).hasClass("basement-open");
            this.limit(b), a(window)[b ? "on" : "off"]("orientationchange", this.limit);
        }
    });
    return d;
});

define("vendor/require/hgn!templates/discover/search", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"search-popup\">");t.b("\n" + i);t.b("  <form action=\"/search\" class=\"search-option-confirm\">");t.b("\n" + i);t.b("    <input type=\"search\" class=\"form-text form-text-normal form-search\" placeholder=\"Search Behance\" name=\"search\" /><!--");t.b("\n" + i);t.b("    --><a class=\"form-button form-button-light-and-grey close\">Cancel</a>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"search-popup\">\n  <form action=\"/search\" class=\"search-option-confirm\">\n    <input type=\"search\" class=\"form-text form-text-normal form-search\" placeholder=\"Search Behance\" name=\"search\" /><!--\n    --><a class=\"form-button form-button-light-and-grey close\">Cancel</a>\n  </form>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Dialog/Layover/Search',[ "jquery", "be/View/Dialog/Layover", "hgn!templates/discover/search" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        mustache: c,
        template: function(b) {
            return this._super(a.extend({
                classes: [ "search" ],
                hide_toolbar: !0
            }, b));
        },
        rendered: function() {
            this.$view.addClass("mobile-popup-transparent mobile-popup-full-bleed").on("click", ".search-option-confirm", !1).on("click", ".mobile-popup-content, .close", this.hide.bind(this)).on("touchmove", !1);
        },
        show: function() {
            return window.scrollTo(0, 1), this.$view && this.$view.show().find("input").focus();
        },
        hide: function() {
            return this.$view && this.$view.hide();
        },
        toggle: function() {
            return this.$view ? void this._super() : (window.scrollTo(0, 1), this.render(a(document.body)), 
            void this.$view.find("input").focus());
        }
    });
    return d;
});
define('be/navigation',[ "jquery", "nbd/Promise", "nbd/util/media", "lib/scrollpoint", "be/View/Basement", "be/View/Dialog/Layover/Search" ], function(a, b, c, d, e, f) {
    "use strict";
    function g(a) {
        var b = a.find("#nav-basement");
        k = new f(), j = new e(b), j.rendered(), a.on("click", ".js-header-action-search", function(a) {
            a.preventDefault(), k.toggle();
        }).on("click", "#hamburger-button", function(a) {
            a.preventDefault(), j.toggle();
        }).on("click", "#top-panel-blocking", function(a) {
            a.preventDefault(), j.close();
        });
    }
    function h(a) {
        a = a[0];
        var b;
        a.hasClass("logged-in") || (b = l.find("#site-content").offset().top + l.find("#sorts-container").outerHeight() + 60, 
        d(b, function(a) {
            l.find(".js-nav-primary").toggleClass("scrolled", a);
        }));
    }
    var i, j, k, l, m = {
        dom: new b(),
        phone: new b(),
        tablet: new b(),
        desktop: new b()
    };
    return c.on("phone:enter", m.phone.resolve).on("tablet:enter", m.tablet.resolve).on("desktop:enter", m.desktop.resolve), 
    c.getState().forEach(function(a) {
        m[a].resolve();
    }), b.all([ m.dom, m.phone ]).then(function(a) {
        return m.tablet.reject(), a[0];
    }).then(g), b.all([ m.dom, m.tablet ]).then(function(a) {
        return m.phone.reject(), a[0];
    }).then(g), b.all([ m.dom, m.desktop ]).then(h), i = {
        init: function(b) {
            l = b || a(document.body), m.dom.resolve(l);
        }
    };
});
define('be/footer',[ "jquery", "beff/Component", "be/cookie", "be/window", "be/remoteLogger" ], function(a, b, c, d, e) {
    "use strict";
    return b.extend({
        init: function(b, f) {
            b.find(".js-language-option").on("click", function() {
                var b = a(this).data("language-locale");
                c(f.BEHANCE.COOKIE_USER_LANGUAGE, b, {
                    path: "/"
                }), e.info("localization", "Language changed by user", {
                    language: b
                }), d.reloadLocation();
            });
        }
    });
});
define('be/lazyLoad',[],function() {
    "use strict";
    return {
        load: function(a, b, c) {
            return c = c || function() {}, require(a, b, c);
        }
    };
});
define('be/zenDesk',[ "jquery", "beff/Component", "be/lazyLoad" ], function(a, b, c) {
    "use strict";
    return b.extend({
        init: function(a) {
            this._config = a, this._export(), this._initEmbed();
        },
        bind: function() {
            a(".js-zendesk").bind("click.be-zendesk", function() {
                return c.load([ "//assets.zendesk.com/embeddable_framework/main.js" ], function() {
                    window.zEmbed.activate({
                        hideOnClose: !0
                    });
                }), !1;
            });
        },
        unbind: function() {
            a(".js-zendesk").off("click.be-zendesk"), window.zEmbed = null, window.zE = null, 
            document.zendeskHost = null, document.zEQueue = null;
        },
        _export: function() {
            var a = [];
            window.zEmbed = function() {
                a.push(arguments);
            }, window.zE = window.zE || window.zEmbed, document.zendeskHost = this._config.subdomain, 
            document.zEQueue = a;
        },
        _initEmbed: function() {
            window.zEmbed(function() {
                window.zEmbed.identify(this._config.identify), window.zEmbed.activate({
                    hideOnClose: !0
                });
            }.bind(this));
        }
    });
});
define('be/secureLink',[ "beff/Component" ], function(a) {
    "use strict";
    return a.extend({
        init: function(a) {
            this.$context = a;
        },
        bind: function() {
            this.$context.on("click", "a[target]", this._guard);
        },
        destroy: function() {
            this.$context.off("click", "a[target]", this._guard), this._super();
        },
        _guard: function(a) {
            if (!a.isDefaultPrevented()) {
                a.preventDefault();
                var b = this.target || "_blank", c = window.open(this.href, b);
                c && (c.opener = null);
            }
        }
    });
});
define('be/localization',[ "page_config" ], function(a) {
    "use strict";
    var b = a.LOCALIZATION && a.LOCALIZATION.TRANSLATIONS, c = a.LOCALIZATION && a.LOCALIZATION.IS_ENABLED, d = a.LOCALIZATION && a.LOCALIZATION.IS_DEFAULT_LANGUAGE;
    return {
        translate: function(a, e) {
            return c && !d && b[a] || e;
        }
    };
});
define('be/hoganHelpers',[ "be/localization" ], function(a) {
    "use strict";
    return {
        translate: function() {
            return function(b) {
                b = b.split("|");
                var c, d;
                return b.length > 1 ? (c = b[0], d = b[1], a.translate(c, d)) : b;
            };
        }
    };
});
define('deprecated/globalAjax',[ "jquery", "be/login", "be/postmessage" ], function(a, b, c) {
    "use strict";
    function d(a) {
        try {
            return JSON.parse(a.responseText);
        } catch (b) {
            return {};
        }
    }
    function e(a) {
        window.top !== window && a.openBrowser ? c({
            type: "openBrowser",
            url: a.destination
        }) : window.location.assign(a.destination);
    }
    return {
        RESPONSES: {
            403: function() {
                return a(document.body).hasClass("activity-page") ? void 0 : a(document.body).hasClass("iframe-view") && a(document.body).hasClass("logged-out") ? void window.open("/signup") : void b.signIn();
            },
            417: function() {
                require([ "be/unverifiedPopup" ], function(a) {
                    a();
                });
            }
        },
        init: function() {
            var b = this;
            a(document).on({
                ajaxSuccess: function(a, b) {
                    var c = d(b);
                    return c.destination ? e(c) : void 0;
                },
                ajaxError: function(c, e) {
                    var f = b.RESPONSES[e.status];
                    return a.isFunction(f) ? f(d(e)) : void 0;
                }
            });
        }
    };
});
define('be/Controller/Dialog/Roulette',[ "jquery", "nbd/Controller/Responsive", "nbd/Promise" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        $context: null,
        setContext: function(a) {
            this.$context && this.$context.off("click"), this.$context = a.on("click", function(a) {
                a.isDefaultPrevented() || a.originalEvent.data === this._view || this.toggle(a.delegateTarget);
            }.bind(this));
        },
        render: function(b) {
            var c = a(b).closest(this._view.attachment), d = this._view.render(c.length ? c : document.body);
            return this._view.position(b), d;
        },
        switchView: function() {
            this._view && (this._view.destroy(), this._view = null), this._super.apply(this, arguments);
        },
        toggle: function(a) {
            this._view.$view && this._view.$view.length ? (this._view.toggle(), this._view.position(a)) : c.from(this.render(a || this.$context)).then(this._view.show.bind(this._view));
        }
    });
    return d;
});
define('beff/dom/truncate',[],function() {
    "use strict";
    function a(a) {
        if (a.length && document.createRange) {
            var b, c = document.createRange();
            if (c.getBoundingClientRect && (b = /[^\s]/.exec(a.textContent))) return c.setStartBefore(a), 
            c.setEnd(a, b.index + 1), c;
        }
    }
    function b(a, b) {
        return a.setEndAfter(b), c(a);
    }
    function c(a) {
        return a.getBoundingClientRect().height;
    }
    return function(d, e) {
        var f = a(d);
        if (f) {
            var g, h = c(f), i = h * (e + .5), j = d.length, k = j, l = -1;
            if (b(f, d) < i) return void f.detach();
            for (;k; ) k = ~~(k / 2), j += l * k, f.setEnd(d, j), l * (c(f) - i) > 0 && (l = -l);
            g = d.textContent.substr(0, j).replace(/\s+$/, "");
            do d.textContent = g + "…", h = b(f, d), g = g.substr(0, --j); while (h > i);
            f.detach();
        }
    };
});
define('lib/picturefill',[ "jquery" ], function(a) {
    "use strict";
    var b = window.matchMedia || window.msMatchMedia, c = function() {
        var c = a(this), d = c.find("div[data-src]");
        return d.length ? (b && (d = d.first().add(d.filter(function() {
            var c = a(this).data("media");
            return c && b(c).matches;
        })).last()), c.attr("data-rendered", "rendered"), void a("<img>", {
            alt: c.data("alt"),
            src: d.data("src"),
            "class": d.data("class"),
            title: d.data("title"),
            "data-pin-nopin": "pin"
        }).appendTo(c)) : void c.find("img").remove();
    };
    return a.fn.picturefill = function() {
        return this.find("div[data-picture]:not([data-rendered])").each(c), this;
    };
});

define("vendor/require/hgn!templates/notifications/appreciation", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg extra-padding\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,48,196,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_appreciated|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> appreciated your project");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<a href=\"");t.b(t.v(t.d("project.url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"activity-block project-appreciated\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("project.covers.115",c,p,0)));t.b("\" data-class=\"project_image\" data-title=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("project.covers.202",c,p,0)));t.b("\" data-class=\"project_image project_image-2x\" data-title=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("      (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("project.covers.115",c,p,0)));t.b("\" class=\"project_image\" /></noscript>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg extra-padding\">\n  {{#translate}}notifications_appreciated|<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> appreciated your project{{/translate}}\n</div>\n<a href=\"{{project.url}}\" class=\"graphic\">\n  <div class=\"activity-block project-appreciated\">\n    <div data-picture=\"\" data-alt=\"{{project.name}}\">\n    <div alt=\"{{project.name}}\" data-src=\"{{project.covers.115}}\" data-class=\"project_image\" data-title=\"{{project.name}}\"></div>\n    <div alt=\"{{project.name}}\" data-src=\"{{project.covers.202}}\" data-class=\"project_image project_image-2x\" data-title=\"{{project.name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n      (min--moz-device-pixel-ratio: 1.3),\n      (-o-min-device-pixel-ratio: 4/3),\n      (min-device-pixel-ratio: 1.3),\n      (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{project.name}}\" title=\"{{project.name}}\" src=\"{{project.covers.115}}\" class=\"project_image\" /></noscript>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/collection", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,231,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_followed_collection|<span class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</span> followed your collection \"<a href=\"");t.b(t.v(t.d("collection.url",c,p,0)));t.b("\">");t.b(t.v(t.d("collection.title",c,p,0)));t.b("</a>\"");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_followed_collection|<span class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</span> followed your collection \"<a href=\"{{collection.url}}\">{{collection.title}}</a>\"{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/comment", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("#comments\" class=\"graphic\">");t.b("\n" + i);t.b("  <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("        (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"comment\">");t.b("\n" + i);t.b("    <strong class=\"actor js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(":</strong> <span class=\"comment-text\">");t.b(t.v(t.d("comment.comment",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{url}}#comments\" class=\"graphic\">\n  <div data-picture=\"\" data-alt=\"{{name}}\">\n    <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"comment-image\" data-title=\"{{name}}\"></div>\n    <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n        (min--moz-device-pixel-ratio: 1.3),\n        (-o-min-device-pixel-ratio: 4/3),\n        (min-device-pixel-ratio: 1.3),\n        (min-resolution: 1.3dppx)\"></div>\n  </div>\n  <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"comment-image\" /></noscript>\n\n  <div class=\"comment\">\n    <strong class=\"actor js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}:</strong> <span class=\"comment-text\">{{comment.comment}}</span>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/wip_comment", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("  <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("revision.images.thumbnail_sm.url",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("revision.images.thumbnail.url",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("        (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <noscript><img alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("revision.images.thumbnail_sm.url",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"comment wip-notification-comment\">");t.b("\n" + i);t.b("    <strong class=\"actor js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(": </strong><span class=\"comment-text\">");t.b(t.v(t.d("comment.comment",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{url}}\" class=\"graphic\">\n  <div data-picture=\"\" data-alt=\"{{wip.title}}\">\n    <div alt=\"{{wip.title}}\" data-src=\"{{revision.images.thumbnail_sm.url}}\" data-class=\"comment-image\" data-title=\"{{wip.title}}\"></div>\n    <div alt=\"{{wip.title}}\" data-src=\"{{revision.images.thumbnail.url}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{wip.title}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n        (min--moz-device-pixel-ratio: 1.3),\n        (-o-min-device-pixel-ratio: 4/3),\n        (min-device-pixel-ratio: 1.3),\n        (min-resolution: 1.3dppx)\"></div>\n  </div>\n  <noscript><img alt=\"{{wip.title}}\" title=\"{{wip.title}}\" src=\"{{revision.images.thumbnail_sm.url}}\" class=\"comment-image\" /></noscript>\n\n  <div class=\"comment wip-notification-comment\">\n    <strong class=\"actor js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}: </strong><span class=\"comment-text\">{{comment.comment}}</span>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/comment_stub", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"project-comment-wrap\">");t.b("\n" + i);t.b("    <div class=\"activity-block project-comment\">");t.b("\n" + i);if(t.s(t.f("project",c,p,1),c,p,0,126,138,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<comment0",c,p,""));});c.pop();}if(t.s(t.f("revision",c,p,1),c,p,0,170,186,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<wip_comment1",c,p,""));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {"<comment0":{name:"comment", partials: {}, subs: {  }},"<wip_comment1":{name:"wip_comment", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"graphic\">\n  <div class=\"project-comment-wrap\">\n    <div class=\"activity-block project-comment\">\n      {{#project}}{{>comment}}{{/project}}\n      {{#revision}}{{>wip_comment}}{{/revision}}\n    </div>\n  </div>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/followed", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,178,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_followed_work|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> followed your work");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_followed_work|<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> followed your work{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/mention", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg extra-padding\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,48,149,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_mentioned|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> mentioned you in a comment");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"mention-wrap\">");t.b("\n" + i);t.b("    <div class=\"activity-block mention\">");t.b("\n" + i);if(t.s(t.f("project",c,p,1),c,p,0,281,293,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<comment0",c,p,""));});c.pop();}if(t.s(t.f("revision",c,p,1),c,p,0,325,341,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<wip_comment1",c,p,""));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {"<comment0":{name:"comment", partials: {}, subs: {  }},"<wip_comment1":{name:"wip_comment", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg extra-padding\">\n  {{#translate}}notifications_mentioned|<a href=\"{{actor.url}}\">{{actor.display_name}}</a> mentioned you in a comment{{/translate}}\n</div>\n<div class=\"graphic\">\n  <div class=\"mention-wrap\">\n    <div class=\"activity-block mention\">\n      {{#project}}{{>comment}}{{/project}}\n      {{#revision}}{{>wip_comment}}{{/revision}}\n    </div>\n  </div>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/saved", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg extra-padding\">");t.b("\n" + i);if(t.s(t.f("translate",c,p,1),c,p,0,46,218,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_saved|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> saved \"<a href=\"");t.b(t.v(t.d("project.url",c,p,0)));t.b("\">");t.b(t.v(t.d("project.name",c,p,0)));t.b("</a>\"");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<a href=\"");t.b(t.v(t.d("collection.url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"activity-block project-collection\">");t.b("\n");t.b("\n" + i);if(t.s(t.d("collection.latest_projects",c,p,1),c,p,0,372,1068,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"");t.b(t.v(t.d("collection.title",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"collection-project-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("      (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"collection-project-image\" /></noscript>");t.b("\n" + i);});c.pop();}t.b("    <div class=\"collection-title\">");t.b("\n" + i);t.b("      <span class=\"collection-title-text beicons-pre beicons-pre-collection\">");t.b(t.v(t.d("collection.title",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg extra-padding\">\n{{#translate}}notifications_saved|<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> saved \"<a href=\"{{project.url}}\">{{project.name}}</a>\"{{/translate}}\n</div>\n<a href=\"{{collection.url}}\" class=\"graphic\">\n  <div class=\"activity-block project-collection\">\n\n    {{#collection.latest_projects}}\n    <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"{{collection.title}}\">\n    <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"collection-project-image\" data-title=\"{{name}}\"></div>\n    <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n      (min--moz-device-pixel-ratio: 1.3),\n      (-o-min-device-pixel-ratio: 4/3),\n      (min-device-pixel-ratio: 1.3),\n      (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"collection-project-image\" /></noscript>\n    {{/collection.latest_projects}}\n    <div class=\"collection-title\">\n      <span class=\"collection-title-text beicons-pre beicons-pre-collection\">{{collection.title}}</span>\n    </div>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/social", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,190,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_social|<div class=\"msg\">Your ");t.b(t.v(t.f("app",c,p,0)));t.b(" friend <a class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> joined Behance</div>");});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_social|<div class=\"msg\">Your {{app}} friend <a class=\"js-mini-profile\" data-id=\"{{actor.id}}\" href=\"{{actor.url}}\">{{actor.display_name}}</a> joined Behance</div>{{/translate}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/_userProjects", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("<div class=\"activity-block project-collection user-projects\">");t.b("\n" + i);if(t.s(t.f("latest_projects",c,p,1),c,p,0,119,791,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"");t.b(t.v(t.f("display_name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"collection-project-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("  <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("    (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("    (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("    (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("    (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"collection-project-image\" /></noscript>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n" + i);t.b("</a>");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{url}}\" class=\"graphic\">\n<div class=\"activity-block project-collection user-projects\">\n  {{#latest_projects}}\n  <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"{{display_name}}\">\n  <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"collection-project-image\" data-title=\"{{name}}\"></div>\n  <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n    (min--moz-device-pixel-ratio: 1.3),\n    (-o-min-device-pixel-ratio: 4/3),\n    (min-device-pixel-ratio: 1.3),\n    (min-resolution: 1.3dppx)\"></div>\n  </div>\n  <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"collection-project-image\" /></noscript>\n  {{/latest_projects}}\n</div>\n</a>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/shortlist", ["hogan", "vendor/require/hgn!templates/notifications/_userProjects"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,224,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_short_list|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" added <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.display_name",c,p,0)));t.b("</a> to your &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; shortlist");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);if(t.s(t.d("user.latest_projects.0",c,p,1),c,p,0,273,328,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("user",c,p,1),c,p,0,283,318,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<notifications/_userProjects0",c,p,""));});c.pop();}});c.pop();}return t.fl(); },partials: {"<notifications/_userProjects0":{name:"notifications/_userProjects", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_short_list|{{actor.display_name}} added <a href=\"{{user.url}}\">{{user.display_name}}</a> to your &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo; shortlist{{/translate}}\n</div>\n{{#user.latest_projects.0}}\n{{#user}}\n{{> notifications/_userProjects}}\n{{/user}}\n{{/user.latest_projects.0}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "notifications/_userProjects": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/discovered", ["hogan", "vendor/require/hgn!templates/notifications/_userProjects"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);if(t.s(t.f("translate",c,p,1),c,p,0,32,221,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_added_search|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" added <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.display_name",c,p,0)));t.b("</a> to your &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; search");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);if(t.s(t.d("user.latest_projects.0",c,p,1),c,p,0,270,325,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("user",c,p,1),c,p,0,280,315,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<notifications/_userProjects0",c,p,""));});c.pop();}});c.pop();}return t.fl(); },partials: {"<notifications/_userProjects0":{name:"notifications/_userProjects", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg\">\n{{#translate}}notifications_added_search|{{actor.display_name}} added <a href=\"{{user.url}}\">{{user.display_name}}</a> to your &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo; search{{/translate}}\n</div>\n{{#user.latest_projects.0}}\n{{#user}}\n{{> notifications/_userProjects}}\n{{/user}}\n{{/user.latest_projects.0}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "notifications/_userProjects": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobshared", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,187,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_invite|You were invited to join <a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("'s </a> job &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo;");});c.pop();}t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_invite|You were invited to join <a href=\"{{actor.url}}\">{{actor.display_name}}'s </a> job &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo;{{/translate}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobapplication", ["hogan", "vendor/require/hgn!templates/notifications/_userProjects"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,172,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_applied_job|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" applied to your job &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo;");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);if(t.s(t.d("actor.latest_projects.0",c,p,1),c,p,0,222,279,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("actor",c,p,1),c,p,0,233,268,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<notifications/_userProjects0",c,p,""));});c.pop();}});c.pop();}return t.fl(); },partials: {"<notifications/_userProjects0":{name:"notifications/_userProjects", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_applied_job|{{actor.display_name}} applied to your job &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo;{{/translate}}\n</div>\n{{#actor.latest_projects.0}}\n{{#actor}}\n{{> notifications/_userProjects}}\n{{/actor}}\n{{/actor.latest_projects.0}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "notifications/_userProjects": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobrecommendation", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,209,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_recommendation|You have ");t.b(t.v(t.f("count",c,p,0)));t.b(" new recommendation");if(!t.s(t.f("single_count",c,p,1),c,p,1,0,0,"")){t.b("s");};t.b(" for &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo;");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_recommendation|You have {{count}} new recommendation{{^single_count}}s{{/single_count}} for &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo;{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/note", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,198,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_note|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" left a note on <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.display_name",c,p,0)));t.b("</a> in your &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\">");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; job");});c.pop();}t.b("\n" + i);t.b("<a class=\"note-wrap\" href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div class=\"activity-block note\">");t.b("\n" + i);t.b("    <div class=\"comment\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.d("note.note_text",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_note|{{actor.display_name}} left a note on <a href=\"{{user.url}}\">{{user.display_name}}</a> in your &ldquo;<a href=\"{{job._links.recruiter}}\">{{job.title}}</a>&rdquo; job{{/translate}}\n<a class=\"note-wrap\" href=\"{{job._links.recruiter}}\">\n  <div class=\"activity-block note\">\n    <div class=\"comment\">\n      {{note.note_text}}\n    </div>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobarchived", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,206,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_archived_job|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" </a> has archived the job  &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\">");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; that was shared with you");});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_archived_job|<a href=\"{{actor.url}}\">{{actor.display_name}} </a> has archived the job  &ldquo;<a href=\"{{job._links.recruiter}}\">{{job.title}}</a>&rdquo; that was shared with you{{/translate}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/notificationPartial',[ "hgn!templates/notifications/appreciation", "hgn!templates/notifications/collection", "hgn!templates/notifications/comment", "hgn!templates/notifications/wip_comment", "hgn!templates/notifications/comment_stub", "hgn!templates/notifications/followed", "hgn!templates/notifications/mention", "hgn!templates/notifications/saved", "hgn!templates/notifications/social", "hgn!templates/notifications/shortlist", "hgn!templates/notifications/discovered", "hgn!templates/notifications/jobshared", "hgn!templates/notifications/jobapplication", "hgn!templates/notifications/jobrecommendation", "hgn!templates/notifications/note", "hgn!templates/notifications/jobarchived" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    "use strict";
    var q = {
        appreciate: a.template,
        followcollection: b.template,
        projectcomment: e.template,
        wipcomment: e.template,
        followuser: f.template,
        projectaddedtocollection: h.template,
        socialfriendjoined: i.template,
        usermentionprojectcomment: g.template,
        usermentionwiprevisioncomment: g.template,
        addtoshortlist: j.template,
        addtodiscovered: k.template,
        jobshared: l.template,
        jobapplicationcreated: m.template,
        jobrecommendationsreceived: n.template,
        notecreated: o.template,
        jobarchived: p.template
    };
    return {
        generatePartials: function(a) {
            return {
                innard: q[a.action_key],
                comment: c.template,
                wip_comment: d.template
            };
        }
    };
});

define("vendor/require/hgn!templates/notification", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"notification-group");if(!t.s(t.f("read_on",c,p,1),c,p,1,0,0,"")){t.b(" unread");};t.b("\">");t.b("\n" + i);t.b("  <div class=\"notification-container\">");t.b("\n" + i);if(t.s(t.f("data",c,p,1),c,p,0,114,1202,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("actor",c,p,1),c,p,0,129,963,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"avatar js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" data-class=\"avatar-image\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.115",c,p,0)));t.b("\" data-class=\"avatar-image avatar-image-2x\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <noscript><img alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" class=\"avatar-image\" /></noscript>");t.b("\n" + i);t.b("    </a>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("actor",c,p,1),c,p,1,0,0,"")){t.b("      <img class=\"avatar\" src=\"");t.b(t.v(t.f("assetsurl",c,p,0)));t.b("/img/notifications/behance-icon.png\" />");t.b("\n" + i);};t.b("    <div class=\"detail beside-avatar\">");t.b("\n" + i);t.b(t.rp("<innard0",c,p,"      "));t.b("      <div class=\"time\">");t.b(t.v(t.f("time_ago",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<innard0":{name:"innard", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"notification-group{{^read_on}} unread{{/read_on}}\">\n  <div class=\"notification-container\">\n  {{#data}}\n    {{#actor}}\n    <a href=\"{{actor.url}}\" class=\"avatar js-mini-profile\" data-id=\"{{actor.id}}\">\n      <div data-picture=\"\" data-alt=\"{{actor.display_name}}\">\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.50}}\" data-class=\"avatar-image\" data-title=\"{{actor.display_name}}\"></div>\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.115}}\" data-class=\"avatar-image avatar-image-2x\" data-title=\"{{actor.display_name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n      </div>\n      <noscript><img alt=\"{{actor.display_name}}\" title=\"{{actor.display_name}}\" src=\"{{actor.images.50}}\" class=\"avatar-image\" /></noscript>\n    </a>\n    {{/actor}}\n    {{^actor}}\n      <img class=\"avatar\" src=\"{{assetsurl}}/img/notifications/behance-icon.png\" />\n    {{/actor}}\n    <div class=\"detail beside-avatar\">\n      {{> innard}}\n      <div class=\"time\">{{time_ago}}</div>\n    </div>\n  {{/data}}\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Notification',[ "page_config", "jquery", "moment", "nbd/View/Entity", "beff/dom/truncate", "lib/picturefill", "be/trait/notificationPartial", "hgn!templates/notification" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = d.extend({
        template: function(a) {
            return b(h(a, this.generatePartials(a)));
        },
        templateData: function() {
            var b = this._super();
            return b.time_ago = function() {
                return c.unix(b.created_on).fromNow();
            }, b.assetsurl = a.ASSETSURL, b;
        },
        rendered: function() {
            this.$view.picturefill().find(".comment-text").contents().toArray().forEach(function(a) {
                e(a, 4);
            });
        },
        update: function() {
            if (this.$view) {
                var a = this.templateData().time_ago();
                this.$view.removeClass("unread").find(".time").text(a);
            }
        }
    }).mixin(g);
    return i;
});
define('be/Controller/Notification',[ "nbd/Controller/Entity", "be/View/Notification" ], function(a, b) {
    "use strict";
    var c = a.extend({
        update: function() {
            this._view.update();
        },
        wasRead: function() {
            return !!this._model.get("read_on");
        }
    }, {
        VIEW_CLASS: b
    });
    return c;
});

define("vendor/require/hgn!templates/notificationGroup", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"notification-group");if(t.s(t.f("any_unread",c,p,1),c,p,0,45,52,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" unread");});c.pop();}t.b("\">");t.b("\n" + i);t.b("  <div class=\"js-context\"></div>");t.b("\n" + i);t.b("  <div class=\"js-more notification-group-more\">+ <span class=\"count\">0</span> More Updates</div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"notification-group{{#any_unread}} unread{{/any_unread}}\">\n  <div class=\"js-context\"></div>\n  <div class=\"js-more notification-group-more\">+ <span class=\"count\">0</span> More Updates</div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/NotificationGroup',[ "jquery", "nbd/View/Entity", "nbd/util/async", "nbd/util/pipe", "hgn!templates/notificationGroup" ], function(a, b, c, d, e) {
    "use strict";
    var f = b.extend({
        template: d(e, a),
        templateData: function() {
            var a = this._super();
            return a.any_unread = this._model.get("entries").some(function(a) {
                return !a.wasRead();
            }), a;
        },
        draw: function(a) {
            var b, d = this._model.get("entries");
            d && d.length && (this._iterator = this._iterator || 0, d = d.slice(this._iterator, +a ? this._iterator += a : void 0), 
            b = this.$view.find(".js-context"), d.forEach(function(a) {
                a.render(b);
            }), this._iterator || c(function() {
                this._iterator = 0;
            }.bind(this)));
        },
        markAsRead: function() {
            this.$view.removeClass("unread");
        },
        rendered: function() {
            this.draw(3);
            var b = this._model.get("entries").length - (this._iterator || 0);
            b ? this.$view.on("click", ".js-more", function() {
                a(this).hide();
            }).one("click", ".js-more", this.draw.bind(this)).find(".count").text(b) : this.$view.find(".js-more").hide();
        }
    });
    return f;
});
define('be/Controller/NotificationGroup',[ "nbd/Controller/Entity", "be/View/NotificationGroup" ], function(a, b) {
    "use strict";
    var c = a.extend({
        add: function(a) {
            var b = this._model.get("entries") || [];
            b.push(a), this._model.set("entries", b);
        },
        update: function() {
            this._view.markAsRead(), this._forEachEntry(function(a) {
                a.update();
            });
        },
        _forEachEntry: function(a) {
            var b = this._model.get("entries") || [];
            b.forEach(function(b) {
                a(b);
            });
        },
        destroy: function() {
            this._forEachEntry(function(a) {
                a.destroy();
            }), this._super();
        }
    }, {
        VIEW_CLASS: b
    });
    return c;
});
define('be/View/Dialog/Menu',[ "jquery", "be/View/Dialog", "nbd/util/async", "jqueryui/position" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function() {
            this._super.apply(this, arguments), this.dismiss = function(a) {
                a.originalEvent.data !== this && (this.hide(), a.preventDefault());
            }.bind(this);
        },
        destroy: function() {
            this._unbind(), this._super.apply(this, arguments);
        },
        template: function(b) {
            return this._super(a.extend({
                dialogType: "menu",
                blocking: !1,
                hide_toolbar: !0
            }, b));
        },
        rendered: function() {
            this._super();
            var a = this;
            this.$view.on("click touchend", function(b) {
                b.originalEvent = b.originalEvent || {}, b.originalEvent.data = a;
            });
        },
        _bind: function() {
            a("html").on("click touchend", this.dismiss);
        },
        _unbind: function() {
            a("html").off("click touchend", this.dismiss);
        },
        position: function(b, c) {
            if (this.$view) {
                b && (this._lastContext = b);
                var d = {
                    my: "left top",
                    at: "left bottom+10",
                    of: this._lastContext,
                    collision: "flipfit"
                };
                this.$view.position(a.extend(d, c));
            }
        },
        show: function() {
            return this.$view ? (c(this._bind.bind(this)), this.$view.addClass("shown"), this._super()) : void 0;
        },
        hide: function() {
            return this.$view ? (this._unbind(), this.$view.removeClass("shown"), this._super()) : void 0;
        },
        toggle: function() {
            return this[this.$view.hasClass("shown") ? "hide" : "show"]();
        }
    });
    return d;
});
define('be/modal/simple',[ "be/Modal" ], function(a) {
    "use strict";
    return a.simple;
});
define('wip/createloader',[ "nbd/Promise", "be/modal/simple" ], function(a, b) {
    "use strict";
    return function() {
        var c = new a(function(a, b) {
            require([ "wip/create" ], a, b);
        });
        return c["catch"](function() {
            b({
                title: "There was a problem with your request",
                html: "Please refresh the page to try again.",
                buttons: [ {
                    label: "Close",
                    classes: [ "form-button-default", "js-close" ]
                } ]
            });
        }), c;
    };
});

define("vendor/require/hgn!templates/addWork", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul>");t.b("\n" + i);t.b("  <li>");t.b("\n" + i);t.b("    <a id=\"activity-new-work-project\" class=\"new-work-link-wrap\" href=\"");t.b(t.v(t.f("projectUrl",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <span class=\"new-work-link-icon\"></span>");t.b("\n" + i);t.b("      <span class=\"new-work-link\">");if(t.s(t.f("translate",c,p,1),c,p,0,195,230,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("nav_primary_add_project|Add Project");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("    </a>");t.b("\n" + i);t.b("  </li>");t.b("\n" + i);t.b("  <li>");t.b("\n" + i);t.b("    <span id=\"activity-new-work-wip\" class=\"new-work-link-wrap wip-action wip-action-create fake-link js-wip-create\">");t.b("\n" + i);t.b("      <span class=\"new-work-link-icon\"></span>");t.b("\n" + i);t.b("      <span class=\"new-work-link\">");if(t.s(t.f("translate",c,p,1),c,p,0,489,542,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("nav_primary_add_work_in_progress|Add Work in Progress");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("  </li>");t.b("\n" + i);t.b("</ul>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<ul>\n  <li>\n    <a id=\"activity-new-work-project\" class=\"new-work-link-wrap\" href=\"{{projectUrl}}\">\n      <span class=\"new-work-link-icon\"></span>\n      <span class=\"new-work-link\">{{#translate}}nav_primary_add_project|Add Project{{/translate}}</span>\n    </a>\n  </li>\n  <li>\n    <span id=\"activity-new-work-wip\" class=\"new-work-link-wrap wip-action wip-action-create fake-link js-wip-create\">\n      <span class=\"new-work-link-icon\"></span>\n      <span class=\"new-work-link\">{{#translate}}nav_primary_add_work_in_progress|Add Work in Progress{{/translate}}</span>\n    </span>\n  </li>\n</ul>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Menu/AddWork',[ "jquery", "be/View/Dialog/Menu", "wip/createloader", "hgn!templates/addWork" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        mustache: d,
        attachment: ".js-nav-primary",
        templateData: function() {
            return {
                classes: [ "new-work-menu" ],
                projectUrl: "/portfolio/editor"
            };
        },
        position: function(a) {
            return this._super(a, {
                my: "left top+7",
                at: "left bottom",
                collision: "none"
            });
        },
        rendered: function() {
            this._super(), this.bindEvents();
        },
        bindEvents: function() {
            this.$view.on("click", ".js-wip-create", function() {
                this.hide(), c().then(function(a) {
                    a.render();
                });
            }.bind(this));
        }
    });
    return e;
});
define('be/Controller/Dialog/AddWork',[ "be/Controller/Dialog/Roulette", "be/View/Menu/AddWork" ], function(a, b) {
    "use strict";
    var c = a.extend({}, {
        VIEW_CLASS: {
            desktop: b
        }
    });
    return c;
});

define("vendor/require/hgn!templates/bell/section", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"activity-container js-");t.b(t.v(t.f("type",c,p,0)));t.b("-activity\">");t.b("\n" + i);t.b("  <h2 class=\"bell-title ");t.b(t.v(t.f("type",c,p,0)));t.b("-title hide-phone js-bell-title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("  <h2 class=\"bell-title bell-title-dummy hide-phone js-bell-title-dummy\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("  <div class=\"js-error-container messages hide\">");t.b("\n" + i);t.b("    <div class=\"error\">");t.b("\n" + i);t.b("      <div class=\"icon\"></div>");t.b("\n" + i);t.b("      <span class=\"js-error-text\"></span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"js-spin loading-spinner cfix\"></div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"activity-container js-{{type}}-activity\">\n  <h2 class=\"bell-title {{type}}-title hide-phone js-bell-title\">{{title}}</h2>\n  <h2 class=\"bell-title bell-title-dummy hide-phone js-bell-title-dummy\">{{title}}</h2>\n  <div class=\"js-error-container messages hide\">\n    <div class=\"error\">\n      <div class=\"icon\"></div>\n      <span class=\"js-error-text\"></span>\n    </div>\n  </div>\n  <div class=\"js-spin loading-spinner cfix\"></div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_button", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-item form-item-a ");t.sub("containerClasses",c,p,i);t.b("\">");t.b("\n" + i);t.b("  <a class=\"form-button ");t.sub("classes",c,p,i);t.b("\"");t.b("\n" + i);t.sub("attrs",c,p,i);t.b("    unselectable=\"on\"");t.b("\n" + i);t.b("    tabindex=\"");t.sub("tabindex",c,p,i);t.b("\"><span class=\"");t.sub("icon",c,p,i);t.b("\"></span>");t.sub("label",c,p,i);t.b("</a>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: { "containerClasses": function(c,p,t,i) {},"classes": function(c,p,t,i) {t.b("form-button-default");},"attrs": function(c,p,t,i) {},"tabindex": function(c,p,t,i) {t.b("0");},"icon": function(c,p,t,i) {},"label": function(c,p,t,i) {} }}, "<div class=\"form-item form-item-a {{$containerClasses}}{{/containerClasses}}\">\n  <a class=\"form-button {{$classes}}form-button-default{{/classes}}\"\n    {{$attrs}}{{/attrs}}\n    unselectable=\"on\"\n    tabindex=\"{{$tabindex}}0{{/tabindex}}\"><span class=\"{{$icon}}{{/icon}}\"></span>{{$label}}{{/label}}</a>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_addWorkButton", ["hogan", "vendor/require/hgn!templates/lib/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_button0",c,p,""));return t.fl(); },partials: {"<lib/_button0":{name:"lib/_button", partials: {}, subs: { "attrs": function(c,p,t,i) {t.b("unselectable=\"on\" tabindex=\"0\"");},"classes": function(c,p,t,i) {t.b("hide-phone hide-tablet form-button new-work-button js-new-work-button form-button-small form-button-default form-button-down-arrow");},"icon": function(c,p,t,i) {t.b("beicons-pre beicons-pre-upload");},"label": function(c,p,t,i) {t.b(" Add Work");} }}}, subs: {  }}, "{{<lib/_button}}\n  {{$attrs}}unselectable=\"on\" tabindex=\"0\"{{/attrs}}\n  {{$classes}}hide-phone hide-tablet form-button new-work-button js-new-work-button form-button-small form-button-default form-button-down-arrow{{/classes}}\n  {{$icon}}beicons-pre beicons-pre-upload{{/icon}}\n  {{$label}} Add Work{{/label}}\n{{/lib/_button}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notificationEmpty", ["hogan", "vendor/require/hgn!templates/lib/_addWorkButton"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"notifications-empty\">");t.b("\n" + i);t.b("<div class=\"notifications-empty-title\">You don’t have any notifications right now.</div>");t.b("\n" + i);t.b("We’ll notify you when you get appreciations, comments, or new followers. To get started, upload new work.");t.b("\n" + i);t.b(t.rp("<lib/_addWorkButton0",c,p,""));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_addWorkButton0":{name:"lib/_addWorkButton", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"notifications-empty\">\n<div class=\"notifications-empty-title\">You don’t have any notifications right now.</div>\nWe’ll notify you when you get appreciations, comments, or new followers. To get started, upload new work.\n{{>lib/_addWorkButton}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_addWorkButton": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Notifications',[ "jquery", "page_constants", "nbd/View/Entity", "nbd/util/pipe", "be/Controller/Dialog/AddWork", "be/spinner", "hgn!templates/bell/section", "hgn!templates/notificationEmpty" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = c.extend({
        template: d(g, a),
        templateData: function() {
            return {
                title: b.GLOBALNAV.NOTIFICATION_TITLE,
                type: "notification"
            };
        },
        rendered: function() {
            this.$loading = f.init(this.$view), this.$loading.hide(), this.listenTo(this._model, "entries", this.draw), 
            this.draw(this._model.get("entries"));
        },
        draw: function(a) {
            a && (a.forEach(function(a) {
                a.render(this.$view);
            }.bind(this)), this.empty(!a.length));
        },
        empty: function(b) {
            var c, d = !b;
            this.$empty = this.$empty || a(h()), d ? this.$empty.remove() : (this.$view.append(this.$empty), 
            c = this.$view.find(".js-new-work-button"), new e().setContext(c));
        }
    });
    return i;
});
define('be/Controller/Notifications',[ "nbd/trait/pubsub", "nbd/Controller/Entity", "nbd/util/async", "be/xhr", "be/Controller/Notification", "be/Controller/NotificationGroup", "be/View/Notifications" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i = "/v2/notifications?action_set=bell-note-v1";
    return h = b.extend({
        refresh: function() {
            return this._model.get("entries") ? void (this.block || this.get()) : this.more();
        },
        get: function j() {
            var a = j.bind(this), b = this._model, d = this.read({
                onset_ts: b.get("onset")
            }).then(function(d) {
                if (!d.notifications) throw d;
                return b.set("onset", d.latest_ts), d.has_more && c(a), d.notifications;
            }).then(this.constructor.makeEntries);
            return d.then(function(a) {
                var c = b.get("entries") || [];
                b.set("entries", a.concat(c));
            }).then(this.trigger.bind(this, "sync")), d;
        },
        more: function k() {
            if (!k.block) {
                k.block = !0;
                var a = this._model, b = this.read({
                    offset_ts: a.get("offset")
                }).then(function(b) {
                    if (!b.notifications) throw b;
                    k.block = !b.has_more;
                    var c = a.data();
                    return c.onset = c.onset || b.latest_ts, c.offset = b.earliest_ts, b.notifications;
                }).then(this.constructor.makeEntries);
                return b.then(function(b) {
                    var c = a.get("entries") || [];
                    a.set("entries", c.concat(b));
                }).then(this.trigger.bind(this, "sync")), b;
            }
        },
        read: function(a) {
            try {
                this._view.$loading.show();
            } catch (b) {}
            var c = function() {
                this._view.$loading.hide();
            }.bind(this), e = d({
                url: i,
                type: "get",
                data: a
            });
            return e.then(c, c), e;
        },
        update: function() {
            var a = this._model.get("entries");
            a && a.length && a.forEach(function(a) {
                a.update();
            });
        },
        clear: function() {
            d({
                url: i,
                type: "delete"
            });
        }
    }, {
        VIEW_CLASS: g,
        makeEntries: function(a) {
            var b, c, d, g = [], h = 0, i = 2;
            for (c = 0; c < a.length; ++c) if (a[c + 1] && a[c + 1].action_key === a[c].action_key) h++; else {
                if (h >= i) {
                    for (b = new f(), d = c - h; c >= d; ++d) b.add(new e(a[d]));
                    g.push(b);
                } else for (d = c - h; c >= d; ++d) g.push(new e(a[d]));
                h = 0;
            }
            return g;
        }
    }).mixin(a);
});
define('be/trait/eventMappable',[],function() {
    "use strict";
    function a(a, b, c) {
        var d = [], e = a[b], f = function(a) {
            var b = [];
            return "string" == typeof a ? b.push({
                method: c[a].bind(c)
            }) : "function" == typeof a ? b.push({
                method: a
            }) : Object.keys(a).forEach(function(c) {
                var d = f(a[c]);
                b.push({
                    selector: c,
                    method: d[0].method
                });
            }), b;
        };
        return Array.isArray(e) ? e.forEach(function(a) {
            d.push.apply(d, f(a));
        }) : d.push.apply(d, f(e)), d;
    }
    var b = {
        _mapEvents: function() {
            var b = this;
            this._undelegateEvents(), Object.keys(this.events).forEach(function(c) {
                var d = a(b.events, c, b);
                c += ".delegated", d.forEach(function(a) {
                    a.selector ? b.$view.on(c, a.selector, a.method) : b.$view.on(c, a.method);
                });
            });
        },
        _undelegateEvents: function() {
            this.$view.off(".delegated");
        }
    };
    return b;
});

define("vendor/require/hgn!templates/notifications/proposition", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"proposition-group cfix\">");t.b("\n" + i);t.b("  <div class=\"js-invitation\">");t.b("\n");t.b("\n" + i);t.b("    <a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"avatar js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" data-class=\"avatar-image\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.115",c,p,0)));t.b("\" data-class=\"avatar-image avatar-image-2x\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <noscript><img alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" class=\"avatar-image\" /></noscript>");t.b("\n" + i);t.b("    </a>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"detail beside-avatar\">");t.b("\n" + i);t.b("      <div class=\"msg extra-padding\">");t.b("\n" + i);t.b(t.rp("<subject0",c,p,"        "));t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"graphic\">");t.b("\n" + i);t.b("        <div class=\"activity-block proposition-");t.b(t.v(t.f("proposition",c,p,0)));t.b(" cfix\">");t.b("\n" + i);t.b(t.rp("<innards1",c,p,"          "));t.b("\n" + i);t.b("          <button class=\"accept right js-accept form-button form-button-small form-button-default\">");if(t.s(t.f("translate",c,p,1),c,p,0,1247,1276,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_accepted|Accept");});c.pop();}t.b("</button>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"time\">");t.b("\n" + i);t.b("        <span class=\"proposition-time js-time\">");t.b(t.v(t.f("time_ago",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("        <span class=\"js-reject proposition-reject\">");if(t.s(t.f("translate",c,p,1),c,p,0,1486,1527,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_declined|Decline invitation");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<subject0":{name:"subject", partials: {}, subs: {  }},"<innards1":{name:"innards", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"proposition-group cfix\">\n  <div class=\"js-invitation\">\n\n    <a href=\"{{actor.url}}\" class=\"avatar js-mini-profile\" data-id=\"{{actor.id}}\">\n      <div data-picture=\"\" data-alt=\"{{actor.display_name}}\">\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.50}}\" data-class=\"avatar-image\" data-title=\"{{actor.display_name}}\"></div>\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.115}}\" data-class=\"avatar-image avatar-image-2x\" data-title=\"{{actor.display_name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n      </div>\n      <noscript><img alt=\"{{actor.display_name}}\" title=\"{{actor.display_name}}\" src=\"{{actor.images.50}}\" class=\"avatar-image\" /></noscript>\n    </a>\n\n    <div class=\"detail beside-avatar\">\n      <div class=\"msg extra-padding\">\n        {{> subject}}\n      </div>\n\n      <div class=\"graphic\">\n        <div class=\"activity-block proposition-{{proposition}} cfix\">\n          {{> innards}}\n\n          <button class=\"accept right js-accept form-button form-button-small form-button-default\">{{#translate}}notifications_accepted|Accept{{/translate}}</button>\n        </div>\n      </div>\n\n      <div class=\"time\">\n        <span class=\"proposition-time js-time\">{{time_ago}}</span>\n        <span class=\"js-reject proposition-reject\">{{#translate}}notifications_declined|Decline invitation{{/translate}}</span>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/collection", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("collection",c,p,1),c,p,0,15,773,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("latest_projects.0.covers.115",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("latest_projects.0.covers.202",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("latest_projects.0.covers.115",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("  <div class=\"proposition-subject\">");t.b(t.v(t.f("title",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#collection}}\n  <a href=\"{{url}}\">\n    <div data-picture=\"\" data-alt=\"{{title}}\">\n      <div alt=\"{{title}}\" data-src=\"{{latest_projects.0.covers.115}}\" data-class=\"comment-image\" data-title=\"{{title}}\"></div>\n      <div alt=\"{{title}}\" data-src=\"{{latest_projects.0.covers.202}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{title}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{title}}\" title=\"{{title}}\" src=\"{{latest_projects.0.covers.115}}\" class=\"comment-image\" /></noscript>\n  </a>\n  <div class=\"proposition-subject\">{{title}}</div>\n{{/collection}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/project", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("project",c,p,1),c,p,0,12,724,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"proposition-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"proposition-image proposition-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"proposition-image\" /></noscript>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("  <div class=\"proposition-subject\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#project}}\n  <a href=\"{{url}}\">\n    <div data-picture=\"\" data-alt=\"{{name}}\">\n      <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"proposition-image\" data-title=\"{{name}}\"></div>\n      <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"proposition-image proposition-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"proposition-image\" /></noscript>\n  </a>\n  <div class=\"proposition-subject\">{{name}}</div>\n{{/project}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/team", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("team",c,p,1),c,p,0,9,703,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("images.138",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("images.276",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("images.138",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("<div class=\"proposition-subject\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#team}}\n  <a href=\"{{url}}\">\n    <div data-picture=\"\" data-alt=\"{{name}}\">\n      <div alt=\"{{name}}\" data-src=\"{{images.138}}\" data-class=\"comment-image\" data-title=\"{{name}}\"></div>\n      <div alt=\"{{name}}\" data-src=\"{{images.276}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{images.138}}\" class=\"comment-image\" /></noscript>\n  </a>\n<div class=\"proposition-subject\">{{name}}</div>\n{{/team}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/subjects/text", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> ");t.b(t.v(t.f("action",c,p,0)));t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> {{action}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/subjects/team", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> ");t.b(t.v(t.f("action",c,p,0)));t.b(" ");if(t.s(t.f("team",c,p,1),c,p,0,118,148,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>");});c.pop();}t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> {{action}} {{#team}}<a href=\"{{url}}\">{{name}}</a>{{/team}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Proposition',[ "jquery", "moment", "nbd/View/Entity", "nbd/trait/promise", "nbd/util/extend", "lib/picturefill", "be/localization", "be/trait/eventMappable", "hgn!templates/notifications/proposition", "hgn!templates/notifications/propositions/collection", "hgn!templates/notifications/propositions/project", "hgn!templates/notifications/propositions/team", "hgn!templates/notifications/propositions/subjects/text", "hgn!templates/notifications/propositions/subjects/team" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    "use strict";
    var o, p = "Invitation declined", q = 250, r = 1e3, s = {
        project_owner: {
            innards: k.template,
            subject: m.template
        },
        collection_owner: {
            innards: j.template,
            subject: m.template
        },
        member_to_team: {
            innards: l.template,
            subject: n.template
        },
        team_to_member: {
            innards: l.template,
            subject: n.template
        },
        project_to_team: {
            innards: k.template,
            subject: n.template
        }
    }, t = {
        project_owner: g.translate("notifications_coown_project", "invited you to co-own a Project"),
        collection_owner: g.translate("notifications_coown_collection", "invited you to co-own a Collection"),
        member_to_team: g.translate("notifications_request_join", "requested to join"),
        team_to_member: g.translate("notifications_invite_join", "invited you to join"),
        project_to_team: g.translate("notifications_request_add", "requested to add a project to")
    };
    return o = c.extend({
        events: {
            click: {
                ".js-accept": "_acceptInvitation",
                ".js-reject": "_rejectInvitation"
            }
        },
        template: function(b) {
            return a(i(b, s[b.type]));
        },
        templateData: function() {
            var a = this._super();
            return e({
                action: t[a.type],
                actor: a.other_user,
                proposition: "project",
                time_ago: function() {
                    return b.unix(a.created_on).fromNow();
                }
            }, a);
        },
        rendered: function() {
            this.$rejectBtn = this.$view.find(".js-reject"), this.$time = this.$view.find(".js-time"), 
            this.$view.picturefill(), this._mapEvents();
        },
        update: function() {
            if (this.$view) {
                var a = this.templateData().time_ago;
                this.$time.text(a);
            }
        },
        acceptAndFade: function() {
            var a = new d();
            return this.$view.fadeOut(q, a.resolve), a;
        },
        declineAndFade: function() {
            var a = new d();
            return this.$rejectBtn.text(p), this.$view.delay(r).fadeOut(q, a.resolve), a;
        },
        _acceptInvitation: function() {
            this._controller.accept();
        },
        _rejectInvitation: function() {
            this._controller.reject();
        }
    }).mixin(h);
});
define('be/Controller/Proposition',[ "nbd/Controller/Entity", "nbd/trait/pubsub", "be/xhr", "be/View/Proposition" ], function(a, b, c, d) {
    "use strict";
    var e, f = "/v2/notifications/invitations/";
    return e = a.extend({
        update: function() {
            this._view.update();
        },
        accept: function() {
            c({
                url: f + this._model.get("id"),
                type: "put"
            }).then(this._view.acceptAndFade.bind(this._view)).then(this._remove.bind(this)).then(null, this.trigger.bind(this, "error"));
        },
        reject: function() {
            c({
                url: f + this._model.get("id"),
                type: "delete"
            }).then(this._view.declineAndFade.bind(this._view)).then(this._remove.bind(this));
        },
        _remove: function() {
            this.trigger("resolve", this._model.get("id")), this.destroy();
        }
    }, {
        VIEW_CLASS: d
    }).mixin(b);
});
define('be/View/Propositions',[ "jquery", "page_constants", "nbd/View/Entity", "nbd/util/pipe", "be/spinner", "hgn!templates/bell/section" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = c.extend({
        template: d(f, a),
        templateData: function() {
            return {
                title: b.GLOBALNAV.NOTIFICATION_PROPS_TITLE,
                type: "propositions"
            };
        },
        rendered: function() {
            this.$errorContainer = this.$view.find(".js-error-container"), this.$loading = e.init(this.$view), 
            this.$errorContainer.addClass("hide"), this.$loading.hide(), this.listenTo(this._model, "entries", this._draw), 
            this._draw(this._model.get("entries"));
        },
        update: function() {
            this.$errorContainer.addClass("hide");
        },
        showErrorMessages: function(a) {
            var b = a.messages.reduce(function(a, b) {
                return a + "\n" + b.message;
            }, "");
            this.$errorContainer.find(".js-error-text").text(b).end().removeClass("hide");
        },
        _draw: function(a) {
            var b = this._model.get("order");
            return a && Object.keys(a).length ? (this.$view.removeClass("hide"), void b.forEach(function(b) {
                var c = a[b];
                c && c.render(this.$view);
            }.bind(this))) : void this.$view.addClass("hide");
        }
    });
    return g;
});
define('be/Controller/Propositions',[ "nbd/trait/pubsub", "nbd/Controller/Entity", "be/xhr", "be/Controller/Proposition", "be/View/Propositions" ], function(a, b, c, d, e) {
    "use strict";
    var f, g = "/v2/notifications/invitations";
    return f = b.extend({
        more: function h() {
            if (!h.block) {
                h.block = !0;
                var a = this, b = this._model, c = this.read();
                return c.then(function(a) {
                    if (!a.invitations) throw a;
                    return a.invitations;
                }).then(function(b) {
                    var c = b.map(function(a) {
                        return new d(a);
                    });
                    return c.forEach(function(b) {
                        a.listenTo(b, "resolve", a._updateEntries).listenTo(b, "error", a._displayErrors);
                    }), c;
                }).then(function(a) {
                    var c = b.get("entries") || {}, d = b.get("order") || [], e = a.reduce(function(a, b) {
                        var c = b._model.get("id");
                        return a[c] = b, d.push(c), a;
                    }, c);
                    return b.set("order", d), b.set("entries", e), Object.keys(e).length;
                }).then(this.trigger.bind(this, "sync")), c;
            }
        },
        count: function() {
            var a = this._model.get("entries");
            return a ? Object.keys(a).length : 0;
        },
        read: function() {
            try {
                this._view.$loading.show();
            } catch (a) {}
            var b = function() {
                this._view.$loading.hide();
            }.bind(this), d = c({
                url: g
            });
            return d.then(b, b), d;
        },
        update: function() {
            var a = this._model.get("entries");
            this._view.update(), a && Object.keys(a).length && Object.keys(a).forEach(function(b) {
                var c = a[b];
                c && c.update();
            }.bind(this));
        },
        _updateEntries: function(a) {
            var b = this._model.get("entries") || {}, c = this._model.get("order") || [];
            b[a] && (delete b[a], c.splice(c.indexOf(a), 1)), this._model.set("entries", b), 
            this._model.set("order", c), this.trigger("removed");
        },
        _displayErrors: function(a) {
            a && a.responseJSON && (a = a.responseJSON), this._view.showErrorMessages(a);
        }
    }, {
        VIEW_CLASS: e
    }).mixin(a);
});
define('lib/infinitescroll',[ "jquery", "log" ], function(a, b) {
    "use strict";
    function c(a) {
        a();
    }
    function d(a) {
        var b, c;
        return a.is(g) ? (b = window.innerHeight || g.height(), c = h.height() - b - g.scrollTop()) : (b = a.prop("clientHeight"), 
        c = a.prop("scrollHeight") - b - a.scrollTop()), c / b;
    }
    function e(b) {
        var e = "window" === b ? g : a(b);
        return function() {
            var a, f = d(e);
            for (a in j[b]) f <= Number(a) && j[b][a].wrapped.forEach(c);
        };
    }
    function f(c, d, f) {
        function h() {
            if (!h.blocking) {
                h.blocking = !0;
                var a = d.apply(null, arguments);
                a && "function" == typeof a.then ? a.then(function() {
                    h.blocking = !1, i[f]();
                }, function(a) {
                    a instanceof Error && b.warn(a);
                }) : h.blocking = !1;
            }
        }
        "function" == typeof c && (f = d, d = c, c = 1), f = f || "window", c = Number(c).toString();
        var k, l = "window" === f ? g : a(f);
        j[f] || (j[f] = {}, i[f] = e(f), l.on("scroll", i[f])), k = j[f][c], k || (k = j[f][c] = {
            wrapped: [],
            original: []
        }), k.original.push(d), k.wrapped.push(h), i[f]();
    }
    var g = a(window), h = a(document), i = {}, j = {};
    return f.remove = function(b, c) {
        c = c || "window";
        var d, e, f, h = "window" === c ? g : a(c);
        for (d in j[c]) e = j[c][d], f = e.original.indexOf(b), ~f && (e.original.splice(f, 1), 
        e.wrapped.splice(f, 1), e.original.length || delete j[c][d]);
        Object.keys(j[c]).length || (h.off("scroll", i[c]), delete j[c]);
    }, f.check = function(a) {
        a = a || "window", i[a]();
    }, f;
});

define("vendor/require/hgn!templates/bell/dialog", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"activity-container-wrap\">");t.b("\n" + i);t.b("  <div class=\"bell-section propositions-section js-propositions\"></div>");t.b("\n" + i);t.b("  <div class=\"bell-section notifications-section js-notifications\"></div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"activity-container-wrap\">\n  <div class=\"bell-section propositions-section js-propositions\"></div>\n  <div class=\"bell-section notifications-section js-notifications\"></div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/bell',[ "jquery", "nbd/util/pipe", "lib/infinitescroll", "be/spinner", "hgn!templates/html", "hgn!templates/bell/dialog" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = 0;
    return {
        mustache: e,
        selector: ".js-notifications-nav-menu .popup-content .activity-container-wrap",
        templateData: function() {
            return {
                title: "Notifications",
                classes: [ "notifications", "timeline-container", "js-notifications-nav-menu" ],
                html: f
            };
        },
        rendered: function() {
            this._super(), this._bindScroll(), this._bindInfiniteScroll();
        },
        renderNotifications: function(a) {
            this.$notifications || (this.$notifications = this.$view.find(".js-notifications"), 
            a.render(this.$notifications));
        },
        renderPropositions: function(a) {
            this.$propositions || (this.$propositions = this.$view.find(".js-propositions"), 
            a.render(this.$propositions));
        },
        _bindInfiniteScroll: function() {
            c(.5, function() {
                this._controller.more();
            }.bind(this), this.selector);
        },
        _bindScroll: function() {
            this.$view.find(this.selector).on("scroll", function() {
                this.$headers = this.$headers || this.$view.find(".js-bell-title").toArray();
                var b = this.$headers.map(function(b) {
                    var c = a(b), d = c.position();
                    return c.is(".sticky") && (d = c.siblings(".js-bell-title-dummy").position()), {
                        $el: c,
                        offsetTop: d.top
                    };
                }.bind(this)).filter(function(a) {
                    return a.$el.is(":visible");
                }).reduce(function(a, b) {
                    var c;
                    return a ? c = b.offsetTop > g ? a : b.offsetTop > a.offsetTop ? b : a : b;
                });
                b.$el.is(".js-bell-title-dummy") || (this.$currentHeader && this.$currentHeader.length && this.$currentHeader.removeClass("sticky"), 
                b.$el.addClass("sticky"), this.$currentHeader = b.$el);
            }.bind(this));
        }
    };
});
define('be/View/Dialog/Layover/Bell',[ "be/View/Dialog/Layover", "be/trait/bell" ], function(a, b) {
    "use strict";
    return a.extend(b);
});
define('be/View/Dialog/Menu/BaseView',[ "be/View/Dialog/Menu" ], function(a) {
    "use strict";
    var b = "107", c = "10", d = "5";
    return a.extend({
        init: function() {
            this._super.apply(this, arguments), this.dismiss = function(a) {
                a.originalEvent.data !== this && this.hide();
            }.bind(this);
        },
        position: function(a) {
            return this._super(a, {
                my: "left-" + b + " top-" + c,
                at: "center bottom+" + d,
                collision: "none"
            });
        }
    });
});
define('be/View/Dialog/Menu/Bell',[ "be/View/Dialog/Menu/BaseView", "be/trait/bell" ], function(a, b) {
    "use strict";
    return a.extend(b).extend({
        attachment: ".js-nav-primary"
    });
});
define('be/Controller/Dialog/Bell',[ "nbd/trait/pubsub", "nbd/Promise", "be/Controller/Dialog/Roulette", "be/Controller/Notifications", "be/Controller/Propositions", "be/View/Dialog/Layover/Bell", "be/View/Dialog/Menu/Bell" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c.extend({
        init: function() {
            this._notifications = new d(), this.listenTo(this._notifications, "sync", this._syncCount), 
            this._super.apply(this, arguments);
        },
        _initView: function() {
            this._super.apply(this, arguments), this.listenTo(this._view, "show", this.renderSections).listenTo(this._view, "show", this.updateSections).listenTo(this._view, "hide", function() {
                this._notifications.clear();
            });
        },
        renderSections: function() {
            this._view.renderNotifications(this._notifications);
        },
        updateSections: function() {
            this._notifications.update();
        },
        _syncCount: function() {
            this.trigger("sync", this._count);
        },
        more: function() {
            return this._notifications.more();
        }
    }, {
        VIEW_CLASS: {
            phone: f,
            tablet: g,
            desktop: g
        }
    }).mixin(a), i = h.extend({
        _count: 0,
        init: function() {
            this._propositions = new e(), this.listenTo(this._propositions, "sync", function(a) {
                this._count += a, this._syncCount();
            }).listenTo(this._propositions, "removed", function() {
                this._count = Math.max(this._count - 1, 0), this._syncCount();
            }), this._super.apply(this, arguments);
        },
        renderSections: function() {
            this._super(), this._view.renderPropositions(this._propositions);
        },
        updateSections: function() {
            this._super(), this._propositions.update();
        },
        more: function() {
            return b.all([ this._super(), this._propositions.more() ]);
        }
    });
    return i;
});
define('be/bell',[ "jquery", "has", "be/xhr", "be/Controller/Dialog/Bell" ], function(a, b, c, d) {
    "use strict";
    var e, f = "/v2/notifications/count", g = "bell-count-v1";
    return e = {
        init: function(c) {
            var e = a(".js-bell-menu", c);
            e.length && (this.$bell = e, this._actionSet = g, this._dialog = new d(), this._dialog.setContext(e), 
            this._dialog.on("sync", function(a) {
                this.update(a || 0);
            }, this), b("localstorage") && this.update(window.sessionStorage.getItem("notifications") || 0), 
            this._sync());
        },
        destroy: function() {
            this._dialog && this._dialog.destroy(), clearInterval(this._interval);
        },
        update: function(a) {
            var b = 0 === +a;
            this.$bell.toggleClass("unread", !b).find(".notifications-count").text(a), this._dialog.block = b;
        },
        toggle: function() {
            this._dialog.toggle();
        },
        _sync: function() {
            return c({
                url: f,
                type: "get",
                data: {
                    action_set: this._actionSet
                }
            }).then(function(a) {
                return b("localstorage") && window.sessionStorage.setItem("notifications", a.count), 
                a.count;
            }).then(e.update.bind(e));
        }
    };
});

define("vendor/require/hgn!templates/unverified", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div>");t.b("\n" + i);t.b("  You need to have a verified email address to access this feature.</br>");t.b("\n" + i);t.b("  Haven't received a verification email yet? <a target=\"_blank\" href=\"");t.b(t.v(t.f("verify_url",c,p,0)));t.b("\">Click here.</a>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div>\n  You need to have a verified email address to access this feature.</br>\n  Haven't received a verification email yet? <a target=\"_blank\" href=\"{{verify_url}}\">Click here.</a>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/unverifiedPopup',[ "page_config", "be/modal/simple", "hgn!templates/unverified" ], function(a, b, c) {
    "use strict";
    return function() {
        return b({
            title: "Please verify your email address",
            html: c({
                verify_url: a.ADOBE_VERIFY
            }),
            buttons: [ {
                label: "Close",
                classes: [ "form-button-default", "js-confirm" ]
            } ]
        });
    };
});
define('inbox/lib/byLine',[],function() {
    "use strict";
    function a(a, b) {
        return a.length < 3 ? a.join(b) : a[0] + b + (a.length - 1) + " others";
    }
    return a;
});
define('inbox/Model/Message',[ "moment", "nbd/Model", "nbd/util/extend", "inbox/lib/byLine" ], function(a, b, c, d) {
    "use strict";
    function e(a) {
        var b = [];
        return a && (b = a.map(function(a) {
            return {
                image: a.images && a.images[g] || "",
                name: a.display_name,
                url: a.url,
                id: a.id
            };
        })), b;
    }
    var f, g = 115;
    return f = b.extend({
        init: function(a) {
            this._super(this.transform(a));
        },
        transform: function(b) {
            var f = e(b.recipients), g = +b.unread_count || 0, h = a.unix(b.last_message_on), i = a().diff(h, "hours");
            return c(b, {
                byLine: d(f.map(function(a) {
                    return a.name;
                }), " and "),
                message: b.last_message_part,
                recipients: f,
                unread: !!g,
                unreadCount: g,
                timestamp: i > 23 ? h.format("MMMM DD, YYYY") : h.fromNow()
            });
        }
    });
});

define("vendor/require/hgn!templates/inbox/dialog/main", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bell-section activity-container-wrap\">");t.b("\n" + i);t.b("  <h2 class=\"bell-title notifications-title hide-phone sticky\">");t.b("\n" + i);t.b("    ");if(t.s(t.f("translate",c,p,1),c,p,0,133,161,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_messages|Your Messages");});c.pop();}t.b("\n" + i);t.b("    <span class=\"js-inbox-chrome bell-inbox-controls\">");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.f("composeUrl",c,p,0)));t.b("\" class=\"bell-inbox-new-message\">");if(t.s(t.f("translate",c,p,1),c,p,0,307,328,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_compose|Compose");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.f("indexUrl",c,p,0)));t.b("\" class=\"bell-inbox-view-all\">");if(t.s(t.f("translate",c,p,1),c,p,0,418,437,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_view|View All");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("  </h2>");t.b("\n" + i);t.b("  <h2 class=\"bell-title notifications-title hide-phone bell-title-dummy\">");if(t.s(t.f("translate",c,p,1),c,p,0,563,591,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_messages|Your Messages");});c.pop();}t.b("</h2>");t.b("\n" + i);t.b("  <div class=\"activity-container js-inbox-container capped\">");t.b("\n" + i);t.b("    <ul class=\"js-inbox-list\"></ul>");t.b("\n" + i);t.b("    <a href=\"");t.b(t.v(t.f("indexUrl",c,p,0)));t.b("\" class=\"js-show-all list-load-more\">");if(t.s(t.f("translate",c,p,1),c,p,0,784,810,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_see|See all messages");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("    <div class=\"js-spin loading-spinner cfix\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bell-section activity-container-wrap\">\n  <h2 class=\"bell-title notifications-title hide-phone sticky\">\n    {{#translate}}inbox_messages|Your Messages{{/translate}}\n    <span class=\"js-inbox-chrome bell-inbox-controls\">\n      <a href=\"{{composeUrl}}\" class=\"bell-inbox-new-message\">{{#translate}}inbox_compose|Compose{{/translate}}</a>\n      <a href=\"{{indexUrl}}\" class=\"bell-inbox-view-all\">{{#translate}}inbox_view|View All{{/translate}}</a>\n    </span>\n  </h2>\n  <h2 class=\"bell-title notifications-title hide-phone bell-title-dummy\">{{#translate}}inbox_messages|Your Messages{{/translate}}</h2>\n  <div class=\"activity-container js-inbox-container capped\">\n    <ul class=\"js-inbox-list\"></ul>\n    <a href=\"{{indexUrl}}\" class=\"js-show-all list-load-more\">{{#translate}}inbox_see|See all messages{{/translate}}</a>\n    <div class=\"js-spin loading-spinner cfix\"></div>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/inbox/dialog/empty", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"inbox-empty\">");if(t.s(t.f("translate",c,p,1),c,p,0,39,77,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_empty|No messages in your inbox.");});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"inbox-empty\">{{#translate}}inbox_empty|No messages in your inbox.{{/translate}}</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/inbox/dialog/error", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"inbox-empty\">");if(t.s(t.f("translate",c,p,1),c,p,0,39,116,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_error|Inbox is currently down for maintenance. Please check back later.");});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"inbox-empty\">{{#translate}}inbox_error|Inbox is currently down for maintenance. Please check back later.{{/translate}}</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/inbox/list/message", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"inbox-list-item preview-item");if(t.s(t.f("unread",c,p,1),c,p,0,50,57,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" unread");});c.pop();}if(t.s(t.f("active",c,p,1),c,p,0,79,86,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" active");});c.pop();}t.b(" js-inbox-list-item\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div class=\"form-item form-item-checkbox indicator checkbox\">");t.b("\n" + i);t.b("    <label class=\"checkbox\" for=\"preview-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <input type=\"checkbox\" id=\"preview-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div class=\"checkbox-checkmark\"></div>");t.b("\n" + i);t.b("    </label>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"indicator unread-indicator\"></div>");t.b("\n" + i);t.b("  <div class=\"meta\">");t.b("\n" + i);t.b("    <div class=\"timestamp js-updating-timestamp\" data-timestamp=\"");t.b(t.v(t.f("last_message_on",c,p,0)));t.b("\">");t.b(t.v(t.f("timestamp",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    <div class=\"tags");if(!t.s(t.f("sent_as_job",c,p,1),c,p,1,0,0,"")){if(!t.s(t.f("is_job",c,p,1),c,p,1,0,0,"")){t.b(" hide");};};t.b("\">");t.b("\n" + i);t.b("      ");if(t.s(t.f("sent_as_job",c,p,1),c,p,0,647,730,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"job-tag sent-job-tag beicons-pre beicons-pre-check\">sent as job</span>");});c.pop();}t.b("\n" + i);t.b("      ");if(t.s(t.f("folder",c,p,1),c,p,0,764,884,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("is_job",c,p,1),c,p,0,775,873,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("archived_by",c,p,1),c,p,0,791,857,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"job-tag archived-job-tag beicons-pre\">ARCHIVED</span>");});c.pop();}});c.pop();}});c.pop();}t.b("\n" + i);t.b("      ");if(t.s(t.f("is_job",c,p,1),c,p,0,913,978,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"job-tag beicons-pre beicons-pre-suitcase\">job</span>");});c.pop();}t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"info\">");t.b("\n" + i);if(t.s(t.f("isGroup",c,p,1),c,p,0,1047,1359,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"inbox-image multiple-owners-grid\">");t.b("\n" + i);if(t.s(t.f("recipients",c,p,1),c,p,0,1124,1165,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"user text-ellipsis\">");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("byLine",c,p,0)));t.b("\n" + i);t.b("        <span class=\"js-unread-count");if(!t.s(t.f("unread",c,p,1),c,p,1,0,0,"")){t.b(" hide");};t.b("\">(");t.b(t.v(t.f("unreadCount",c,p,0)));t.b(")</span>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(!t.s(t.f("isGroup",c,p,1),c,p,1,0,0,"")){if(t.s(t.d("recipients.0",c,p,1),c,p,0,1413,1609,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\" class=\"inbox-image\">");t.b("\n" + i);t.b("        <div class=\"user text-ellipsis\">");t.b(t.v(t.f("byLine",c,p,0)));t.b(" <span class=\"js-unread-count");if(!t.s(t.f("unread",c,p,1),c,p,1,0,0,"")){t.b(" hide");};t.b("\">(");t.b(t.v(t.f("unreadCount",c,p,0)));t.b(")</span></div>");t.b("\n" + i);});c.pop();}};t.b("    <div class=\"message text-ellipsis\">");if(t.s(t.f("is_reply",c,p,1),c,p,0,1696,1728,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"reply-icon\"></span>");});c.pop();}t.b(t.v(t.f("message",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<li class=\"inbox-list-item preview-item{{#unread}} unread{{/unread}}{{#active}} active{{/active}} js-inbox-list-item\" data-id=\"{{id}}\">\n  <div class=\"form-item form-item-checkbox indicator checkbox\">\n    <label class=\"checkbox\" for=\"preview-{{id}}\">\n      <input type=\"checkbox\" id=\"preview-{{id}}\">\n      <div class=\"checkbox-checkmark\"></div>\n    </label>\n  </div>\n  <div class=\"indicator unread-indicator\"></div>\n  <div class=\"meta\">\n    <div class=\"timestamp js-updating-timestamp\" data-timestamp=\"{{last_message_on}}\">{{timestamp}}</div>\n    <div class=\"tags{{^sent_as_job}}{{^is_job}} hide{{/is_job}}{{/sent_as_job}}\">\n      {{#sent_as_job}}<span class=\"job-tag sent-job-tag beicons-pre beicons-pre-check\">sent as job</span>{{/sent_as_job}}\n      {{#folder}}{{#is_job}}{{#archived_by}}<span class=\"job-tag archived-job-tag beicons-pre\">ARCHIVED</span>{{/archived_by}}{{/is_job}}{{/folder}}\n      {{#is_job}}<span class=\"job-tag beicons-pre beicons-pre-suitcase\">job</span>{{/is_job}}\n    </div>\n  </div>\n  <div class=\"info\">\n    {{#isGroup}}\n      <div class=\"inbox-image multiple-owners-grid\">\n        {{#recipients}}\n          <img src=\"{{image}}\">\n        {{/recipients}}\n      </div>\n      <div class=\"user text-ellipsis\">\n        {{byLine}}\n        <span class=\"js-unread-count{{^unread}} hide{{/unread}}\">({{unreadCount}})</span>\n      </div>\n    {{/isGroup}}\n\n    {{^isGroup}}\n      {{#recipients.0}}\n        <img src=\"{{image}}\" class=\"inbox-image\">\n        <div class=\"user text-ellipsis\">{{byLine}} <span class=\"js-unread-count{{^unread}} hide{{/unread}}\">({{unreadCount}})</span></div>\n      {{/recipients.0}}\n    {{/isGroup}}\n    <div class=\"message text-ellipsis\">{{#is_reply}}<span class=\"reply-icon\"></span>{{/is_reply}}{{message}}</div>\n  </div>\n</li>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/inboxNav',[ "jquery", "moment", "nbd/util/extend", "be/modal/simple", "be/spinner", "be/unverifiedPopup", "inbox/Model/Message", "hgn!templates/html", "hgn!templates/inbox/dialog/main", "hgn!templates/inbox/dialog/empty", "hgn!templates/inbox/dialog/error", "hgn!templates/inbox/list/message" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = a(document.body).hasClass("user-unverified"), n = "/inbox", o = n + "/compose";
    return {
        mustache: h,
        templateData: function() {
            var a = i({
                indexUrl: n,
                composeUrl: o
            });
            return {
                title: "Inbox",
                classes: [ "notifications", "inbox", "timeline-container", "js-inbox-nav-menu" ],
                html: a
            };
        },
        rendered: function() {
            this._super(), this.$content = this.$view.find(".js-inbox-container"), this.$list = this.$view.find(".js-inbox-list"), 
            this.$showAll = this.$view.find(".js-show-all"), this.$controls = this.$view.find(".js-inbox-chrome"), 
            this.spinner = e.init(this.$view).hide(), this._bindEvents();
        },
        loading: function() {
            this.spinner && this.spinner.show();
        },
        loaded: function() {
            this.spinner && this.spinner.hide();
        },
        add: function(a) {
            a.forEach(function(a) {
                var b = new g(a);
                this.$list.append(this._renderMessage(b));
            }.bind(this));
        },
        reset: function() {
            this.$empty && (this.$empty.remove(), this.$empty = null), this.$error && (this.$error.remove(), 
            this.$error = null), this.$controls.show(), this.$list.empty();
        },
        empty: function() {
            this.$empty = this.$empty || a(j()), this.$showAll.before(this.$empty);
        },
        showError: function() {
            this.$error = this.$error || a(k()), this.$showAll.before(this.$error), this.$controls.hide();
        },
        _bindEvents: function() {
            var b = this;
            this.$list.on("click", "li", function() {
                var c = a(this).data("id");
                return m ? (b.hide(), void f()) : void (window.location.href = n + "/" + c);
            }), this.$view.on("click", "a", function(a) {
                m && (a.preventDefault(), b.hide(), f());
            });
        },
        _renderMessage: function(a) {
            var b = a.data();
            return l(c(b, {
                isGroup: b.recipients.length > 1
            }));
        }
    };
});
define('be/View/Dialog/Menu/InboxNav',[ "nbd/util/extend", "be/View/Dialog/Menu/BaseView", "be/trait/inboxNav" ], function(a, b, c) {
    "use strict";
    return b.extend(c);
});
define('be/View/Dialog/Layover/InboxNav',[ "be/View/Dialog/Layover", "be/trait/inboxNav" ], function(a, b) {
    "use strict";
    var c = a.extend(b);
    return c;
});
define('inbox/lib/loader',[ "be/xhr" ], function(a) {
    "use strict";
    function b(a) {
        return function(b) {
            var c = {};
            if (!b) throw new Error("Response is not valid");
            return c = b[a];
        };
    }
    function c(b, c) {
        return c = c || {}, a({
            url: b,
            type: "GET",
            data: {
                folder: c.folder,
                offset_key: c.offsetKey,
                q: c.query,
                tag: c.tag
            }
        });
    }
    var d = "/v2/inbox", e = d + "/threads", f = d + "/threads/search", g = "/messages", h = "/v2/report/spam/thread", i = "/utilities/block", j = {
        search: function(a) {
            return c(f, a);
        },
        threads: function(a) {
            return c(e, a);
        },
        pollThreads: function(b) {
            return b = b || {}, a({
                url: e,
                type: "GET",
                data: {
                    folder: b.folder,
                    polling_key: b.pollingKey,
                    q: b.query,
                    tag: b.tag
                }
            });
        },
        thread: function(c) {
            return a({
                url: e + "/" + c,
                type: "GET"
            }).then(b("thread"));
        },
        threadMessages: function(b, c) {
            return a({
                url: e + "/" + b + g,
                type: "GET",
                data: {
                    offset_key: c
                }
            });
        },
        pollMessages: function(b, c) {
            return a({
                url: e + "/" + b + g,
                type: "GET",
                data: {
                    polling_key: c
                }
            });
        },
        markRead: function(b) {
            return a({
                url: e + "/" + b,
                type: "PATCH",
                data: {
                    is_read: 1
                }
            });
        },
        moveTo: function(b, c) {
            return a({
                url: e + "/" + b,
                type: "PATCH",
                data: {
                    folder: c
                }
            });
        },
        markSpam: function(b) {
            return a({
                url: h + "/" + b,
                type: "POST"
            });
        },
        blockUser: function(b) {
            return a({
                url: i,
                type: "post",
                data: {
                    user_id: b
                }
            });
        },
        deleteThreadForever: function(b) {
            return a({
                url: e + "/" + b,
                type: "DELETE"
            });
        },
        replyToThread: function(c, d, f) {
            return a({
                url: e + "/" + c + g,
                type: "POST",
                data: {
                    message: d,
                    is_job: f
                }
            }).then(b("message"));
        },
        markMessageRead: function(b, c) {
            return a({
                url: e + "/" + b + g + "/" + c,
                type: "PATCH",
                data: {
                    is_read: 1
                }
            });
        },
        createNewThread: function(c) {
            return a({
                url: e,
                type: "POST",
                data: c
            }).then(b("thread"));
        }
    };
    return j;
});
define('be/Controller/Dialog/InboxNav',[ "nbd/trait/pubsub", "be/Controller/Dialog/Roulette", "be/View/Dialog/Menu/InboxNav", "be/View/Dialog/Layover/InboxNav", "inbox/lib/loader" ], function(a, b, c, d, e) {
    "use strict";
    var f = b.extend({
        _initView: function() {
            this._super.apply(this, arguments), this._view && this.listenTo(this._view, "show", this._refresh);
        },
        _refresh: function() {
            this._view.loading(), e.threads().then(function(a) {
                if (!a) throw new Error();
                a = a.threads || [], this._view.loaded(), this._view.reset(), a.length ? this._view.add(a) : this._view.empty();
            }.bind(this))["catch"](function() {
                this._view.loaded(), this._view.reset(), this._view.showError();
            }.bind(this));
        }
    }, {
        VIEW_CLASS: {
            phone: d,
            tablet: c,
            desktop: c
        }
    }).mixin(a);
    return f;
});
define('be/inboxNav',[ "jquery", "has", "nbd/util/deparam", "be/xhr", "be/Controller/Dialog/InboxNav" ], function(a, b, c, d, e) {
    "use strict";
    var f, g = "/v2/notifications/count", h = "inbox-v1";
    return f = {
        init: function(c) {
            var d = a(".js-email-menu", c);
            d.length && (this.$message = d, this._dialog = new e(), this._dialog.setContext(d), 
            b("localstorage") && this.update(window.sessionStorage.getItem("message-notifications") || 0), 
            this._sync());
        },
        update: function(a) {
            var b = 0 === +a;
            this.$message.toggleClass("unread", !b).find(".notifications-count").text(a), this._dialog.block = b;
        },
        _sync: function() {
            return d({
                url: g,
                type: "get",
                data: {
                    action_set: h
                }
            }).then(function(a) {
                return b("localstorage") && window.sessionStorage.setItem("message-notifications", a.count), 
                a.count;
            }).then(f.update.bind(f));
        }
    };
});
define('nav',[ "page_constants", "jquery", "has", "be/bell", "be/inboxNav", "be/Controller/Dialog/AddWork" ], function(a, b, c, d, e, f) {
    "use strict";
    function g(a) {
        if (a.length) {
            var b = a, c = b.find(".js-nav-search-form-input"), d = b.find(".js-nav-search");
            d.on("click", function() {
                c.trigger("focus");
            }), c.on("focus", function() {
                d.addClass("active"), j.addClass("search-active");
            }).on("blur", function() {
                d.toggleClass("active", !!this.value), j.toggleClass("search-active", !!this.value);
            });
        }
    }
    function h(a) {
        j.find(".js-profile-image-50").attr("src", a);
    }
    function i() {
        j = b(".js-nav-primary"), k = b(".js-new-work-button"), g(b(".js-nav-search-form")), 
        k.length && new f().setContext(k), e.init(), d.init(), a.GLOBALNAV.OPEN_NOTIFICATIONS && a.SSO.IS_LOGGED_IN_FULL_USER && d.toggle();
    }
    var j, k;
    return {
        init: i,
        getHeight: function() {
            return j ? j.outerHeight() : 0;
        },
        updateProfileImage: h
    };
});
define('sso/config',[ "page_constants", "page_config", "jquery", "nbd/util/media", "beff/Component", "be/login", "be/remoteLogger", "be/window", "be/xhr" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    return e.extend({
        LOG_CHANNEL: "imsjs",
        _shouldLogout: !1,
        _pingInterval: null,
        init: function(b) {
            this.$context = b;
            var c = this.LOG_CHANNEL;
            f.configure(a.SSO), window.adobeid = {
                uses_redirect_mode: !0,
                uses_modal_mode: !1,
                uses_single_log_out: a.SSO.USES_SINGLE_LOG_OUT,
                api_parameters: {
                    authorize: {
                        state: {
                            ac: a.SSO.OMNITURE_AC_STATE
                        }
                    }
                },
                scope: a.SSO.SCOPES.join(","),
                onProfile: function(b) {
                    b || !f.hasToken() || a.SSO.IGNORE_COOKIE_UPDATE || (this._shouldLogout = !0);
                }.bind(this),
                onAccessTokenHasExpired: function() {
                    g.info(c, "Token expired");
                },
                onAccessToken: function(a, b) {
                    f.setToken(a, b);
                },
                onError: function(a) {
                    g.error(c, "General error", {
                        error: a
                    });
                },
                onReady: function() {
                    return this._shouldLogout ? (g.info(c, "Logging out via empty profile"), void f.logout(!0)) : (f.removeTrackerFromUrl(), 
                    this._initGlobalNav(), void this._bindLinks());
                }.bind(this)
            };
        },
        _loadIMS: function() {
            require([ a.SSO.URLS.IMS ], function() {}, function() {});
        },
        bind: function() {
            return this._initPing(), a.SSO.LOGIN_DISABLED ? this._bindDisabledLinks() : void this._loadIMS();
        },
        destroy: function() {
            this.$context.off(".sso-config"), clearInterval(this._pingInterval), this._pingInterval = null;
        },
        _initPing: function() {
            function a() {
                if ("undefined" != typeof window.adobeIMS && "undefined" != typeof window.adobeid) {
                    var a, b = null, c = window.adobeIMS, e = {
                        client_id: c.getClientID()
                    };
                    a = c.getUrlForApiCall(c.IMSAPIs.check, b, e), c._ajaxGet(a, function(b) {
                        "object" == typeof b && b.access_token || g.info(d, "Logging user out via ping", {
                            data: b,
                            url: a
                        }).send().then(function() {
                            f.logout();
                        }, function() {
                            f.logout();
                        }), b.expires_in && !b.expiresAtMilliseconds && (b.expiresAtMilliseconds = Date.now() + b.expires_in), 
                        f.setToken(b.access_token, b);
                    }, "jsonp");
                }
            }
            function b() {
                i({
                    url: "/v1/ping",
                    type: "GET",
                    dataType: "html"
                });
                try {
                    a();
                } catch (b) {
                    g.error(d, "Unable to check access token", {
                        exception: b
                    });
                }
            }
            var d = this.LOG_CHANNEL;
            c(document.body).hasClass("logged-in") && (this._pingInterval = setInterval(b, this.constructor.PING_INTERVAL));
        },
        _initGlobalNav: function() {
            function c() {
                d.removeClass("wait"), e.openSection && e.openSection("profile");
            }
            var d = this.$context, e = {};
            require([ a.GLOBALNAV.URLS.JS, "css!" + a.GLOBALNAV.URLS.CSS ], function() {
                e = new window.AdobeGlobalNav({
                    adobeid: window.adobeid,
                    behanceProfile: void 0,
                    locale: b.LOCALIZATION.LOCALE,
                    sections: [ "profile" ]
                });
            }, function() {}), d.on("click.sso-config", ".js-globalnav-layover", function(b) {
                d.addClass("wait"), require([ a.TYPEKIT.URL + a.TYPEKIT.KIT_IDS.ADOBE + ".js" ], function() {
                    try {
                        window.Typekit.load();
                    } catch (a) {}
                    c();
                }, c), b.preventDefault();
            });
        },
        _bindDisabledLinks: function() {
            this.$context.on("click.sso-config", ".js-adobeid-signup, .js-adobeid-signin", function(b) {
                b.preventDefault(), h.setLocation(a.SSO.URLS.LOGIN);
            }).on("click.sso-config", ".js-adobeid-signout", function(a) {
                a.preventDefault(), f.logout();
            }.bind(this));
        },
        _bindLinks: function() {
            var b = this.LOG_CHANNEL;
            this.$context.on("click.sso-config", ".js-adobeid-signup", function(e) {
                if (!a.SSO.IS_LOGGED_IN_FULL_USER) {
                    if (e.preventDefault(), f.hasToken()) return void i({
                        url: a.SSO.URLS.AUTH_CHECK
                    }).then(h.reloadLocation);
                    var j = c(this).data("adobeid-signup-destination"), k = c(this).data("adobeid-signup-enable-login"), l = {
                        redirect_uri: a.SSO.URLS.LOGIN
                    };
                    j || (j = d.is("phone") ? a.SSO.URLS.ACTIVITY : a.SSO.URLS.ONBOARDING), l.redirect_uri += "?destination=" + j, 
                    k && (l.idp_flow = "create_account", l.el = 1), g.info(b, "Attempting signUp").send().then(function() {
                        f.signUp(l);
                    }, function() {
                        f.signUp(l);
                    });
                }
            }).on("click.sso-config", ".js-adobeid-signin", function(a) {
                a.preventDefault(), g.info(b, "Attempting signIn").send().then(function() {
                    f.signIn();
                }, function() {
                    f.signIn();
                });
            }).on("click.sso-config", ".js-adobeid-signout", function(a) {
                a.preventDefault(), f.logout();
            }.bind(this));
        }
    }, {
        PING_INTERVAL: 6e5
    });
});
!function(a) {
    function b() {
        function a() {
            c.forEach(function(a) {
                a();
            }), c.length = 0;
        }
        var b = 0, c = [];
        this.then = function(a) {
            return 0 === b ? void c.push(a) : void (b > 0 && a());
        }, this.resolve = function() {
            b = 1, a();
        }, this.reject = function() {
            b = -1, c.length = 0;
        };
    }
    !function() {
        var b = "";
        try {
            b = JSON.parse($("#global-config-json").text());
        } catch (c) {}
        b.CBSTR && b.ASSETSURL && (a.config({
            baseUrl: b.ASSETSURL + "js",
            urlArgs: b.CBSTR
        }), window.CKEDITOR_BASEPATH = b.ASSETSURL + "js/vendor/misc/ckeditor/");
    }();
    var c = new b();
    require([ "page_config", "jquery", "detect", "hogan", "log", "be/langs", "be/errorLogger", "be/mobilebanner", "be/navigation", "be/footer", "be/social", "be/responsive", "be/remoteLogger", "be/zenDesk", "be/secureLink", "be/hoganHelpers", "deprecated/globalAjax", "nav", "sso/config" ], function(b, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
        "use strict";
        var v = d(document.body);
        f.helpers = r, e.init(v), i.init(a, window, g), p.init(b.BEHANCE.ZENDESK), l.init(d(".js-footer"), b), 
        m.init(), n.init(), j.init(v, b), o.init(), h(b.LOCALIZATION.LANGUAGE), t.init(), 
        k.init(), u.init(v), s.init(), q.init(d(document)), c.resolve();
    }, c.reject), window.require = function(b, d, e) {
        return d ? a(b, function() {
            var a = arguments;
            c.then(function() {
                d.apply(null, a);
            });
        }, e) : a(b);
    };
}(require);
define("network", function(){});

