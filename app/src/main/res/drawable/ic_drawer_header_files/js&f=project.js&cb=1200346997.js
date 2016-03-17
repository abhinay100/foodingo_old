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
define('lib/gaq',{
    page: function(a) {
        try {
            void 0 !== _gaq && _gaq.push([ "_trackPageview", a || location.href ]);
        } catch (b) {}
    },
    event: function(a, b, c, d, e) {
        try {
            if ("undefined" != typeof _gaq) {
                var f = Array.prototype.slice.call(arguments);
                f.unshift("_trackEvent"), _gaq.push(f);
            }
        } catch (g) {}
    },
    customVar: function(a, b, c, d) {
        if (a && b && void 0 !== c) try {
            if ("undefined" != typeof _gaq) {
                var e = Array.prototype.slice.call(arguments);
                e.unshift("_setCustomVar"), _gaq.push(e);
            }
        } catch (f) {}
    }
});
define('be/modal/simple',[ "be/Modal" ], function(a) {
    "use strict";
    return a.simple;
});
define('be/View/Follow',[ "jquery", "nbd/View", "be/modal/simple" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function(a, b) {
            this.$view = a, this._model = b, this.rendered();
        },
        destroy: function() {
            this._model.off(null, null, this);
        },
        rendered: function() {
            var b = this;
            this._model.on("following", function(b) {
                this.$view.toggleClass("following", b), this.$view.data("following", b), b && this.$view.addClass("following-hold").one("mouseleave", function() {
                    a(this).removeClass("following-hold");
                });
            }, this), this.$view.on("click", function() {
                var c = a(this).data(), d = {
                    backfill: c.backfill
                };
                b._controller.follow(d);
            });
        }
    }, {
        rateLimitPopup: function(a) {
            var b = a ? a + "<br /><br />" : "";
            c({
                title: "Following Limit",
                html: b + 'Please read about our <a href="https://help.behance.net/entries/48445480-Following-limits-on-Behance">following limits</a>.',
                buttons: []
            });
        }
    });
    return d;
});
define('be/Controller/Follow',[ "jquery", "nbd/Controller", "nbd/Model", "nbd/trait/pubsub", "be/View/Follow", "lib/gaq", "be/xhr" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = b.extend({
        init: function(a, b, d) {
            this.views = [], this.type = d || "user", this._model = new c(a, {
                blocking: !1,
                following: b || !1
            }), this.listenTo(this._model, "all", this.trigger);
        },
        _initView: function(a) {
            var b = new e(a, this._model);
            return b._controller = this, b;
        },
        add: function(a) {
            if (a.data("befollow")) return this;
            var b = this._initView(a);
            return a.data("befollow", b), this.views.push(b), this;
        },
        setFollowing: function(a) {
            this._model.set("following", a);
        },
        follow: function(a) {
            function b() {
                d.set("blocking", !1);
            }
            if (!this._model.get("blocking")) {
                var c, d = this._model, h = this._model.get("following"), i = this.constructor.url(this.type, this.id), j = h ? "DELETE" : "POST";
                return this._model.set("blocking", !0), c = g({
                    url: i,
                    type: j,
                    data: a
                }).then(function(a) {
                    return d.set("following", !h), f.event("follow", window.location.pathname, window.location.search), 
                    a.following = !h, a;
                }, function(a) {
                    var b;
                    429 === a.status && (a.responseJSON && a.responseJSON.messages && (b = a.responseJSON.messages.pop().message), 
                    e.rateLimitPopup(b));
                }), this.trigger("request", c), c.then(b, b), c;
            }
        },
        destroy: function() {
            this.views.forEach(function(a) {
                a.destroy();
            }), this.views = [], this._model.destroy(), this._model = null;
        }
    }, {
        RELATIONS_URL: "/relations",
        url: function(a, b) {
            return this.RELATIONS_URL + "/" + a + "/" + b + window.location.search;
        }
    }).mixin(d);
    return h;
});
define('be/follow',[ "jquery", "nbd/util/extend", "nbd/trait/pubsub", "be/Controller/Follow" ], function(a, b, c, d) {
    "use strict";
    var e = {
        user: {},
        collection: {},
        site: {},
        team: {},
        project: {}
    }, f = function(a, b) {
        var c = "followee", d = a.data(c) || +a.attr(c), f = a.data("following");
        d && (null == f && (f = a.hasClass("following")), e[b][d] = (e[b][d] || g._create.call(g, b, d, f)).add(a));
    }, g = {
        init: function(a) {
            this._users(a), this._collections(a), this._sites(a), this._teams(a), this._projects(a);
        },
        _create: function(a, b, c) {
            var e = new d(b, c, a);
            return this.listenTo(e, "following", function(c) {
                this.trigger("following", b, c, a);
            }).listenTo(e, "request", function(c) {
                this.trigger("request", b, c, a);
            }), "project" === a && this.listenTo(e, "request", this._updateUsersOnProjectFollow), 
            e;
        },
        _updateUsersOnProjectFollow: function(a) {
            a.then(function(a) {
                a.owner_ids.forEach(function(b) {
                    e.user[b] && e.user[b].setFollowing(a.following);
                });
            });
        },
        _users: function(b) {
            a(".js-action-follow-user", b).each(function() {
                f(a(this), "user");
            });
        },
        _collections: function(b) {
            a(".js-action-follow-collection", b).each(function() {
                f(a(this), "collection");
            });
        },
        _sites: function(b) {
            a(".js-action-follow-site", b).each(function() {
                f(a(this), "site");
            });
        },
        _teams: function(b) {
            a(".js-action-follow-team", b).each(function() {
                f(a(this), "team");
            });
        },
        _projects: function(b) {
            a(".js-action-follow-project", b).each(function() {
                f(a(this), "project");
            });
        }
    };
    return b(g, c), g;
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

define("vendor/require/hgn!templates/lib/_follow/_button", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div ");if(t.s(t.f("instant_backfill",c,p,1),c,p,0,90,113,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("data-backfill=\"instant\"");});c.pop();}t.b(" class=\"");t.sub("classes",c,p,i);t.b(" js-action-follow-");t.sub("type",c,p,i);t.b(" follow-button-container");if(t.s(t.f("is_following",c,p,1),c,p,0,243,253,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" following");});c.pop();}t.b("\" data-followee=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" ");if(t.s(t.f("is_following",c,p,1),c,p,0,312,333,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("data-following=\"true\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("  <a class=\"form-button js-form-button-follow form-button-follow ");t.sub("size",c,p,i);t.b(" form-button-default form-button-left-icon form-button-icon-follow\">");t.sub("follow",c,p,i);t.b("</a>");t.b("\n" + i);t.b("  <a class=\"form-button form-button-following ");t.sub("size",c,p,i);t.b(" form-button-light-and-grey form-button-left-icon form-button-icon-following\">");t.sub("following",c,p,i);t.b("</a>");t.b("\n" + i);t.b("  <a class=\"form-button js-form-button-unfollow form-button-unfollow ");t.sub("size",c,p,i);t.b(" form-button-red form-button-left-icon form-button-icon-unfollow\">");t.sub("unfollow",c,p,i);t.b("</a>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: { "classes": function(c,p,t,i) {},"type": function(c,p,t,i) {},"size": function(c,p,t,i) {},"follow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,528,548,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_follow|Follow");});c.pop();}t.b(t.v(t.f("follow_label_postfix",c,p,0)));},"following": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,772,798,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_following|Following");});c.pop();}t.b(t.v(t.f("follow_label_postfix",c,p,0)));},"unfollow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,1035,1059,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_unfollow|Unfollow");});c.pop();}t.b("&nbsp;");t.b(t.v(t.f("follow_label_postfix",c,p,0)));} }}, "{{! TODO: investigate removal of form-button-(un)follow(ing) }}\n<div {{#instant_backfill}}data-backfill=\"instant\"{{/instant_backfill}} class=\"{{$classes}}{{/classes}} js-action-follow-{{$type}}{{/type}} follow-button-container{{#is_following}} following{{/is_following}}\" data-followee=\"{{id}}\" {{#is_following}}data-following=\"true\"{{/is_following}}>\n  <a class=\"form-button js-form-button-follow form-button-follow {{$size}}{{/size}} form-button-default form-button-left-icon form-button-icon-follow\">{{$follow}}{{#translate}}button_follow|Follow{{/translate}}{{follow_label_postfix}}{{/follow}}</a>\n  <a class=\"form-button form-button-following {{$size}}{{/size}} form-button-light-and-grey form-button-left-icon form-button-icon-following\">{{$following}}{{#translate}}button_following|Following{{/translate}}{{follow_label_postfix}}{{/following}}</a>\n  <a class=\"form-button js-form-button-unfollow form-button-unfollow {{$size}}{{/size}} form-button-red form-button-left-icon form-button-icon-unfollow\">{{$unfollow}}{{#translate}}button_unfollow|Unfollow{{/translate}}&nbsp;{{follow_label_postfix}}{{/unfollow}}</a>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_buttonUserSmall", ["hogan", "vendor/require/hgn!templates/lib/_follow/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(!t.s(t.f("is_profile_owner",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<lib/_follow/_button0",c,p,""));};return t.fl(); },partials: {"<lib/_follow/_button0":{name:"lib/_follow/_button", partials: {}, subs: { "classes": function(c,p,t,i) {t.b("user-follow");},"type": function(c,p,t,i) {t.b("user");},"size": function(c,p,t,i) {t.b("form-button-small");} }}}, subs: {  }}, "{{^is_profile_owner}}\n  {{<lib/_follow/_button}}\n    {{$classes}}user-follow{{/classes}}\n    {{$type}}user{{/type}}\n    {{$size}}form-button-small{{/size}}\n  {{/lib/_follow/_button}}\n{{/is_profile_owner}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/miniProfile", ["hogan", "vendor/require/hgn!templates/lib/_follow/_buttonUserSmall"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("user",c,p,1),c,p,0,9,1796,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"mini-profile-wrap hide-phone hide-tablet cfix\">");t.b("\n");t.b("\n" + i);t.b("  <div class=\"user-info-container cfix\">");t.b("\n" + i);t.b("    <a target=\"_blank\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"user-image-wrap user-image-link\">");t.b("\n" + i);t.b("      <img src=\"");t.b(t.v(t.d("images.115",c,p,0)));t.b("\" class=\"user-image\">");t.b("\n" + i);t.b("    </a>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"user-info\">");t.b("\n" + i);t.b("      <a target=\"_blank\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"user-name\">");t.b(t.v(t.f("display_name",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("      <a target=\"_blank\" href=\"");t.b(t.v(t.f("location_link",c,p,0)));t.b("\" class=\"location-link beicons-pre beicons-pre-location\">");t.b(t.v(t.f("city",c,p,0)));if(t.s(t.f("state",c,p,1),c,p,0,483,494,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(", ");t.b(t.v(t.f("state",c,p,0)));});c.pop();}if(t.s(t.f("country",c,p,1),c,p,0,516,529,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(", ");t.b(t.v(t.f("country",c,p,0)));});c.pop();}t.b("</a>");t.b("\n" + i);t.b("    </div> <!-- .user-info -->");t.b("\n" + i);t.b("  </div> <!-- .user-info-container -->");t.b("\n");t.b("\n" + i);t.b(t.rp("<lib/_follow/_buttonUserSmall0",c,p,"  "));t.b("\n" + i);if(t.s(t.f("has_latest_projects",c,p,1),c,p,0,680,1309,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a target=\"_blank\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"cfix user-view-link gallery-projects-wrap\">");t.b("\n" + i);t.b("      <ul class=\"project-cover-container\">");t.b("\n" + i);if(t.s(t.f("latest_projects",c,p,1),c,p,0,837,985,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li class=\"project-cover-wrap\">");t.b("\n" + i);t.b("          ");if(t.s(t.d("covers.115",c,p,1),c,p,0,903,951,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<img src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"project-cover\">");});c.pop();}t.b("\n" + i);t.b("        </li>");t.b("\n" + i);});c.pop();}t.b("      </ul> <!-- .project-cover-container -->");t.b("\n" + i);t.b("      <span class=\"gallery-cover-overlay\">");t.b("\n" + i);t.b("        <div class=\"gallery-cover-overlay-text\">");if(t.s(t.f("translate",c,p,1),c,p,0,1157,1193,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("user_cover_view_profile|View Profile");});c.pop();}t.b("&nbsp;<span class=\"rarr\">&rarr;</span></div>");t.b("\n" + i);t.b("      </span>");t.b("\n" + i);t.b("    </a> <!-- .gallery-projects-wrap -->");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.f("stats",c,p,1),c,p,0,1347,1750,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"stats-wrap\">");t.b("\n");t.b("\n" + i);t.b("    <span class=\"cover-stat beicons-pre beicons-pre-eye cover-stat-views\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("views",c,p,0)));t.b("\n" + i);t.b("    </span>");t.b("\n");t.b("\n" + i);t.b("    <span class=\"cover-stat beicons-pre beicons-pre-thumb cover-stat-appreciations\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("appreciations",c,p,0)));t.b("\n" + i);t.b("    </span>");t.b("\n");t.b("\n" + i);t.b("    <span class=\"cover-stat beicons-pre beicons-pre-followers user-stats-followed\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("followers",c,p,0)));t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("  </div> <!-- .stats-wrap -->");t.b("\n" + i);});c.pop();}t.b("</div> <!-- .mini-profile-wrap -->");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {"<lib/_follow/_buttonUserSmall0":{name:"lib/_follow/_buttonUserSmall", partials: {}, subs: {  }}}, subs: {  }}, "{{#user}}\n<div class=\"mini-profile-wrap hide-phone hide-tablet cfix\">\n\n  <div class=\"user-info-container cfix\">\n    <a target=\"_blank\" href=\"{{url}}\" class=\"user-image-wrap user-image-link\">\n      <img src=\"{{images.115}}\" class=\"user-image\">\n    </a>\n\n    <div class=\"user-info\">\n      <a target=\"_blank\" href=\"{{url}}\" class=\"user-name\">{{display_name}}</a>\n      <a target=\"_blank\" href=\"{{location_link}}\" class=\"location-link beicons-pre beicons-pre-location\">{{city}}{{#state}}, {{state}}{{/state}}{{#country}}, {{country}}{{/country}}</a>\n    </div> <!-- .user-info -->\n  </div> <!-- .user-info-container -->\n\n  {{>lib/_follow/_buttonUserSmall}}\n\n  {{#has_latest_projects}}\n    <a target=\"_blank\" href=\"{{url}}\" class=\"cfix user-view-link gallery-projects-wrap\">\n      <ul class=\"project-cover-container\">\n    {{#latest_projects}}\n        <li class=\"project-cover-wrap\">\n          {{#covers.115}}<img src=\"{{covers.115}}\" class=\"project-cover\">{{/covers.115}}\n        </li>\n    {{/latest_projects}}\n      </ul> <!-- .project-cover-container -->\n      <span class=\"gallery-cover-overlay\">\n        <div class=\"gallery-cover-overlay-text\">{{#translate}}user_cover_view_profile|View Profile{{/translate}}&nbsp;<span class=\"rarr\">&rarr;</span></div>\n      </span>\n    </a> <!-- .gallery-projects-wrap -->\n  {{/has_latest_projects}}\n\n  {{#stats}}\n  <div class=\"stats-wrap\">\n\n    <span class=\"cover-stat beicons-pre beicons-pre-eye cover-stat-views\">\n      {{views}}\n    </span>\n\n    <span class=\"cover-stat beicons-pre beicons-pre-thumb cover-stat-appreciations\">\n      {{appreciations}}\n    </span>\n\n    <span class=\"cover-stat beicons-pre beicons-pre-followers user-stats-followed\">\n      {{followers}}\n    </span>\n  </div> <!-- .stats-wrap -->\n  {{/stats}}\n</div> <!-- .mini-profile-wrap -->\n{{/user}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_buttonUserSmall": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/MiniProfile',[ "jquery", "beff/dom/transitionEnd", "lib/gaq", "be/follow", "be/View/Dialog/Menu", "hgn!templates/miniProfile" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = e.extend({
        mustache: f,
        template: function(b) {
            return this._super(a.extend({
                classes: [ "mini-profile", "hide-tablet", "hide-phone" ]
            }, b));
        },
        position: function() {
            var a, b, c, d = this._controller.$context.width() / 2, e = this.constructor.NUB_OFFSET - d, f = 0 > e ? "+" : "-";
            this._super(this._controller.$context, {
                my: "left top",
                at: "left" + f + Math.abs(e) + " bottom+" + this.constructor.NUB_HEIGHT,
                collision: "flipfit",
                within: this._model.get("within")
            }), a = this._controller.$context.offset(), b = this.$view.offset(), this._model.get("bottom") && b.top + this.$view.height() > this._model.get("bottom").offset().top ? (this._super(this._controller.$context, {
                my: "left" + f + Math.abs(e) + " bottom-" + this.constructor.NUB_HEIGHT,
                at: "left top",
                collision: "flipfit none",
                within: this._model.get("within")
            }), c = "bottom") : c = a.top > b.top ? "bottom" : "top", c += Math.floor(a.left) > b.left + Math.abs(e) ? "-right" : "-left", 
            this.$view.removeClass("top-right top-left bottom-right bottom-left").addClass(c);
        },
        rendered: function() {
            this._super(), d.init(this.$view), a(document.body).hasClass("logged-out") || (this.$view.on("click", ".js-form-button-follow", function() {
                c.event("mini_profile", "follow_button", "followed_user");
            }), this.$view.on("click", ".js-form-button-unfollow", function() {
                c.event("mini_profile", "follow_button", "unfollowed_user");
            }));
        },
        show: function() {
            this.$view && (this.$view.removeClass("hide"), this.position()), this._super(), 
            c.event("mini_profile", "mini_profile_shown", window.location.pathname), this._controller.$context.closest(":focusable").focus();
        },
        hide: function() {
            this._super(), this.destroy();
        },
        _bind: a.noop,
        _unbind: a.noop
    }, {
        NUB_OFFSET: 55,
        NUB_HEIGHT: 12
    });
    return g;
});
define('be/Controller/MiniProfile',[ "jquery", "be/Controller/Dialog/Roulette", "be/View/MiniProfile" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function() {
            this._super.apply(this, arguments), this.listenTo(this._view, {
                postrender: function(a) {
                    this._bindHide(a);
                },
                hide: function() {
                    this._unbindHide();
                }
            }), this._keepAlive = this._keepAlive.bind(this), this._setDeath = this._setDeath.bind(this);
        },
        _unbindHide: function() {
            this.$context.off(".miniprofile");
        },
        _bindHide: function(a) {
            a.on({
                "mouseenter.miniprofile": this._keepAlive,
                "mouseleave.miniprofile": this._setDeath,
                "click.miniprofile": this._setDeath
            });
        },
        setContext: function(a) {
            this.$context = a, this._unbindHide(), this._bindHide(this.$context);
        },
        _keepAlive: function() {
            clearTimeout(this._hideTimeout);
        },
        _setDeath: function() {
            this._hideTimeout = setTimeout(function() {
                this._view.hide();
            }.bind(this), this.constructor.HIDE_TIMEOUT);
        }
    }, {
        VIEW_CLASS: c,
        HIDE_TIMEOUT: 500
    });
    return d;
});

define('vendor/require/css!styles/profile/mini',[],function(){});
define('be/miniprofile',[ "jquery", "nbd/trait/promise", "be/xhr", "be/Controller/MiniProfile", "css!styles/profile/mini" ], function(a, b, c, d) {
    "use strict";
    function e(b, c, d) {
        b = b || a(document.body), j = c || a(window), i = d;
        var e, f, l;
        b.on("mouseenter", ".js-mini-profile", function() {
            var b = a(this);
            e = b.data("id"), clearTimeout(f), f = setTimeout(function() {
                b.addClass("wait"), l = g(e), l.then(function(a) {
                    b.removeClass("wait"), h(b, a);
                }, function() {
                    b.removeClass("wait");
                });
            }, k);
        }).on("mouseleave", ".js-mini-profile", function() {
            clearTimeout(f), l && (l.reject(), l = null);
        });
    }
    function f(b) {
        b = b || a(document.body), b.off("mouseenter mouseleave", ".js-mini-profile"), a.each(l, function(a, b) {
            b.destroy();
        });
    }
    function g(a) {
        g._cache = g._cache || {};
        var d, e;
        return (e = g._cache[a]) ? (d = new b(), d.resolve(e), d) : c({
            url: "/user/mini/" + a
        }).then(function(b) {
            return g._cache[a] = b, b;
        });
    }
    function h(b, c) {
        var e = new d(c);
        b.parents(".popup").length ? (c.within = a(window), c.bottom = null) : (c.within = j, 
        c.bottom = i), e.setContext(b), e.render(b), e._view.show();
    }
    var i, j, k = 500, l = {};
    return {
        init: e,
        destroy: f
    };
});
window.matchMedia || (window.matchMedia = function() {
    "use strict";
    var a = window.styleMedia || window.media;
    if (!a) {
        var b = document.createElement("style"), c = document.getElementsByTagName("script")[0], d = null;
        b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), 
        d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, 
        a = {
            matchMedium: function(a) {
                var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
                return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, "1px" === d.width;
            }
        };
    }
    return function(b) {
        return {
            matches: a.matchMedium(b || "all"),
            media: b || "all"
        };
    };
}()), function(a, b, c) {
    "use strict";
    function d(b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = b : "function" == typeof define && define.amd && define("picturefill", [],function() {
            return b;
        }), "object" == typeof a && (a.picturefill = b);
    }
    function e(a) {
        var b, c, d, e, f, i = a || {};
        b = i.elements || g.getAllElements();
        for (var j = 0, k = b.length; k > j; j++) if (c = b[j], d = c.parentNode, e = void 0, 
        f = void 0, "IMG" === c.nodeName.toUpperCase() && (c[g.ns] || (c[g.ns] = {}), i.reevaluate || !c[g.ns].evaluated)) {
            if (d && "PICTURE" === d.nodeName.toUpperCase()) {
                if (g.removeVideoShim(d), e = g.getMatch(c, d), e === !1) continue;
            } else e = void 0;
            (d && "PICTURE" === d.nodeName.toUpperCase() || !g.sizesSupported && c.srcset && h.test(c.srcset)) && g.dodgeSrcset(c), 
            e ? (f = g.processSourceSet(e), g.applyBestCandidate(f, c)) : (f = g.processSourceSet(c), 
            (void 0 === c.srcset || c[g.ns].srcset) && g.applyBestCandidate(f, c)), c[g.ns].evaluated = !0;
        }
    }
    function f() {
        function c() {
            clearTimeout(d), d = setTimeout(h, 60);
        }
        g.initTypeDetects(), e();
        var d, f = setInterval(function() {
            return e(), /^loaded|^i|^c/.test(b.readyState) ? void clearInterval(f) : void 0;
        }, 250), h = function() {
            e({
                reevaluate: !0
            });
        };
        a.addEventListener ? a.addEventListener("resize", c, !1) : a.attachEvent && a.attachEvent("onresize", c);
    }
    if (a.HTMLPictureElement) return void d(function() {});
    b.createElement("picture");
    var g = a.picturefill || {}, h = /\s+\+?\d+(e\d+)?w/;
    g.ns = "picturefill", function() {
        g.srcsetSupported = "srcset" in c, g.sizesSupported = "sizes" in c, g.curSrcSupported = "currentSrc" in c;
    }(), g.trim = function(a) {
        return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
    }, g.makeUrl = function() {
        var a = b.createElement("a");
        return function(b) {
            return a.href = b, a.href;
        };
    }(), g.restrictsMixedContent = function() {
        return "https:" === a.location.protocol;
    }, g.matchesMedia = function(b) {
        return a.matchMedia && a.matchMedia(b).matches;
    }, g.getDpr = function() {
        return a.devicePixelRatio || 1;
    }, g.getWidthFromLength = function(a) {
        var c;
        if (!a || a.indexOf("%") > -1 != !1 || !(parseFloat(a) > 0 || a.indexOf("calc(") > -1)) return !1;
        a = a.replace("vw", "%"), g.lengthEl || (g.lengthEl = b.createElement("div"), g.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", 
        g.lengthEl.className = "helper-from-picturefill-js"), g.lengthEl.style.width = "0px";
        try {
            g.lengthEl.style.width = a;
        } catch (d) {}
        return b.body.appendChild(g.lengthEl), c = g.lengthEl.offsetWidth, 0 >= c && (c = !1), 
        b.body.removeChild(g.lengthEl), c;
    }, g.detectTypeSupport = function(b, c) {
        var d = new a.Image();
        return d.onerror = function() {
            g.types[b] = !1, e();
        }, d.onload = function() {
            g.types[b] = 1 === d.width, e();
        }, d.src = c, "pending";
    }, g.types = g.types || {}, g.initTypeDetects = function() {
        g.types["image/jpeg"] = !0, g.types["image/gif"] = !0, g.types["image/png"] = !0, 
        g.types["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), 
        g.types["image/webp"] = g.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=");
    }, g.verifyTypeSupport = function(a) {
        var b = a.getAttribute("type");
        if (null === b || "" === b) return !0;
        var c = g.types[b];
        return "string" == typeof c && "pending" !== c ? (g.types[b] = g.detectTypeSupport(b, c), 
        "pending") : "function" == typeof c ? (c(), "pending") : c;
    }, g.parseSize = function(a) {
        var b = /(\([^)]+\))?\s*(.+)/g.exec(a);
        return {
            media: b && b[1],
            length: b && b[2]
        };
    }, g.findWidthFromSourceSize = function(c) {
        for (var d, e = g.trim(c).split(/\s*,\s*/), f = 0, h = e.length; h > f; f++) {
            var i = e[f], j = g.parseSize(i), k = j.length, l = j.media;
            if (k && (!l || g.matchesMedia(l)) && (d = g.getWidthFromLength(k))) break;
        }
        return d || Math.max(a.innerWidth || 0, b.documentElement.clientWidth);
    }, g.parseSrcset = function(a) {
        for (var b = []; "" !== a; ) {
            a = a.replace(/^\s+/g, "");
            var c, d = a.search(/\s/g), e = null;
            if (-1 !== d) {
                c = a.slice(0, d);
                var f = c.slice(-1);
                if (("," === f || "" === c) && (c = c.replace(/,+$/, ""), e = ""), a = a.slice(d + 1), 
                null === e) {
                    var g = a.indexOf(",");
                    -1 !== g ? (e = a.slice(0, g), a = a.slice(g + 1)) : (e = a, a = "");
                }
            } else c = a, a = "";
            (c || e) && b.push({
                url: c,
                descriptor: e
            });
        }
        return b;
    }, g.parseDescriptor = function(a, b) {
        var c, d = b || "100vw", e = a && a.replace(/(^\s+|\s+$)/g, ""), f = g.findWidthFromSourceSize(d);
        if (e) for (var h = e.split(" "), i = h.length - 1; i >= 0; i--) {
            var j = h[i], k = j && j.slice(j.length - 1);
            if ("h" !== k && "w" !== k || g.sizesSupported) {
                if ("x" === k) {
                    var l = j && parseFloat(j, 10);
                    c = l && !isNaN(l) ? l : 1;
                }
            } else c = parseFloat(parseInt(j, 10) / f);
        }
        return c || 1;
    }, g.getCandidatesFromSourceSet = function(a, b) {
        for (var c = g.parseSrcset(a), d = [], e = 0, f = c.length; f > e; e++) {
            var h = c[e];
            d.push({
                url: h.url,
                resolution: g.parseDescriptor(h.descriptor, b)
            });
        }
        return d;
    }, g.dodgeSrcset = function(a) {
        a.srcset && (a[g.ns].srcset = a.srcset, a.srcset = "", a.setAttribute("data-pfsrcset", a[g.ns].srcset));
    }, g.processSourceSet = function(a) {
        var b = a.getAttribute("srcset"), c = a.getAttribute("sizes"), d = [];
        return "IMG" === a.nodeName.toUpperCase() && a[g.ns] && a[g.ns].srcset && (b = a[g.ns].srcset), 
        b && (d = g.getCandidatesFromSourceSet(b, c)), d;
    }, g.backfaceVisibilityFix = function(a) {
        var b = a.style || {}, c = "webkitBackfaceVisibility" in b, d = b.zoom;
        c && (b.zoom = ".999", c = a.offsetWidth, b.zoom = d);
    }, g.setIntrinsicSize = function() {
        var c = {}, d = function(a, b, c) {
            b && a.setAttribute("width", parseInt(b / c, 10));
        };
        return function(e, f) {
            var h;
            e[g.ns] && !a.pfStopIntrinsicSize && (void 0 === e[g.ns].dims && (e[g.ns].dims = e.getAttribute("width") || e.getAttribute("height")), 
            e[g.ns].dims || (f.url in c ? d(e, c[f.url], f.resolution) : (h = b.createElement("img"), 
            h.onload = function() {
                if (c[f.url] = h.width, !c[f.url]) try {
                    b.body.appendChild(h), c[f.url] = h.width || h.offsetWidth, b.body.removeChild(h);
                } catch (a) {}
                e.src === f.url && d(e, c[f.url], f.resolution), e = null, h.onload = null, h = null;
            }, h.src = f.url)));
        };
    }(), g.applyBestCandidate = function(a, b) {
        var c, d, e;
        a.sort(g.ascendingSort), d = a.length, e = a[d - 1];
        for (var f = 0; d > f; f++) if (c = a[f], c.resolution >= g.getDpr()) {
            e = c;
            break;
        }
        e && (e.url = g.makeUrl(e.url), b.src !== e.url && (g.restrictsMixedContent() && "http:" === e.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + e.url) : (b.src = e.url, 
        g.curSrcSupported || (b.currentSrc = b.src), g.backfaceVisibilityFix(b))), g.setIntrinsicSize(b, e));
    }, g.ascendingSort = function(a, b) {
        return a.resolution - b.resolution;
    }, g.removeVideoShim = function(a) {
        var b = a.getElementsByTagName("video");
        if (b.length) {
            for (var c = b[0], d = c.getElementsByTagName("source"); d.length; ) a.insertBefore(d[0], c);
            c.parentNode.removeChild(c);
        }
    }, g.getAllElements = function() {
        for (var a = [], c = b.getElementsByTagName("img"), d = 0, e = c.length; e > d; d++) {
            var f = c[d];
            ("PICTURE" === f.parentNode.nodeName.toUpperCase() || null !== f.getAttribute("srcset") || f[g.ns] && null !== f[g.ns].srcset) && a.push(f);
        }
        return a;
    }, g.getMatch = function(a, b) {
        for (var c, d = b.childNodes, e = 0, f = d.length; f > e; e++) {
            var h = d[e];
            if (1 === h.nodeType) {
                if (h === a) return c;
                if ("SOURCE" === h.nodeName.toUpperCase()) {
                    null !== h.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                    var i = h.getAttribute("media");
                    if (h.getAttribute("srcset") && (!i || g.matchesMedia(i))) {
                        var j = g.verifyTypeSupport(h);
                        if (j === !0) {
                            c = h;
                            break;
                        }
                        if ("pending" === j) return !1;
                    }
                }
            }
        }
        return c;
    }, f(), e._ = g, d(e);
}(window, window.document, new window.Image());
!function(a) {
    a.fn.lazyload = function(b) {
        var c = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            enabled: !0
        };
        b && a.extend(c, b);
        var d = this;
        return "scroll" == c.event && a(c.container).bind("scroll", function(b) {
            var e = 0;
            d.each(function() {
                if (a.abovethetop(this, c) || a.leftofbegin(this, c)) ; else if (a.belowthefold(this, c) || a.rightoffold(this, c)) {
                    if (e++ > c.failurelimit) return !1;
                } else a(this).trigger("appear");
            });
            var f = a.grep(d, function(a) {
                return !a.loaded;
            });
            d = a(f);
        }), this.each(function() {
            var b = this;
            return void 0 == a(b).attr("original") && a(b).attr("original", a(b).attr("src")), 
            "scroll" != c.event || void 0 == a(b).attr("src") || c.placeholder == a(b).attr("src") || a.abovethetop(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.rightoffold(b, c) ? (c.placeholder ? a(b).attr("src", c.placeholder) : a(b).removeAttr("src"), 
            b.loaded = !1) : b.loaded = !0, "IMG" == b.tagName && a(b).one("appear", function() {
                this.loaded || a("<img />").bind("load", function() {
                    a(b).hide().attr("src", a(b).attr("original"))[c.effect](c.effectspeed), b.loaded = !0;
                }).attr("src", a(b).attr("original"));
            }), "scroll" != c.event && a(b).bind(c.event, function(c) {
                b.loaded || a(b).trigger("appear");
            }), c.enabled ? void 0 : void a(this).trigger("appear");
        }), a(c.container).trigger(c.event), this;
    }, a.belowthefold = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).height() + a(window).scrollTop(); else var d = a(c.container).offset().top + a(c.container).height();
        return d <= a(b).offset().top - c.threshold;
    }, a.rightoffold = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).width() + a(window).scrollLeft(); else var d = a(c.container).offset().left + a(c.container).width();
        return d <= a(b).offset().left - c.threshold;
    }, a.abovethetop = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).scrollTop(); else var d = a(c.container).offset().top;
        return d >= a(b).offset().top + c.threshold + a(b).height();
    }, a.leftofbegin = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).scrollLeft(); else var d = a(c.container).offset().left;
        return d >= a(b).offset().left + c.threshold + a(b).width();
    }, a.extend(a.expr[":"], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    });
}(jQuery);
define("jquery-plugins/plugins/jquery.lazyload", function(){});

define('be/LazyLoadPicture',[ "jquery", "beff/Component", "picturefill", "jquery-plugins/plugins/jquery.lazyload" ], function(a, b, c) {
    "use strict";
    return b.extend({
        init: function(a, b) {
            this._$elem = a, this._options = b;
        },
        bind: function() {
            this._$elem.on("appear", function() {
                var b = a(this), d = b.html(), e = a("<picture>" + d + "</picture>"), f = e.find("img");
                b.after(e), b.remove(), f.one("load", function() {
                    f.removeAttr("height").removeAttr("width").removeAttr("style");
                }), f.attr("src", f.data("src")).removeAttr("data-src"), c();
            }), this._$elem.lazyload(this._options), a(window).one("resize.be-lazypicture", function() {
                this._$elem.trigger("appear");
            }.bind(this));
        },
        unbind: function() {
            a(window).off("resize.be-lazypicture"), this._$elem.off("appear");
        }
    });
});
define('be/trait/fatclick',[],function() {
    "use strict";
    function a(a) {
        var c = a.data.touch, d = a.originalEvent.changedTouches[0];
        if (!(Math.sqrt(Math.pow(c.pageX - d.pageX, 2) + Math.pow(c.pageY - d.pageY, 2)) > b)) {
            var e = this.$view.find("a:visible").first().get(0);
            e.click ? e.click() : window.location = e.href;
        }
    }
    var b = 30, c = 300;
    return {
        fatclick: function(b) {
            if (b = b || this.$view) {
                var d = a.bind(this);
                b.on("touchstart", function(a) {
                    function e() {
                        b.off({
                            touchend: d,
                            touchcancel: e
                        });
                    }
                    b.one("touchend", {
                        touch: a.originalEvent.changedTouches[0]
                    }, d).on("touchmove", e).on("touchcancel", e), setTimeout(e, c);
                });
            }
        }
    };
});
define('be/View/Cover',[ "jquery", "nbd/View", "be/trait/fatclick" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function(b) {
            this.$view = b instanceof a ? b : a(".project-cover[data-id=" + b + "]");
        },
        rendered: function() {
            this.fatclick(), this.$view.on("mouseenter mouseleave", ".cover-name-link, .cover-img, .controls-overlay, .edit-icon", this.toggleHover);
        },
        toggleHover: function(b) {
            a(this).closest(".project-cover").toggleClass("hover", "mouseenter" === b.type);
        },
        destroy: function() {
            this.$view.off("mouseenter mouseleave", ".cover-name-link, .cover-img, .controls-overlay, .edit-icon", this.toggleHover), 
            this._super();
        }
    }).mixin(c);
    return d;
});
define('beff/trait/eventMappable',[],function() {
    "use strict";
    var a = /^:(.+)/, b = function d(b) {
        var c, e = this;
        return "string" == typeof b ? {
            method: function() {
                if (e[b]) e[b].apply(e, arguments); else {
                    if (!(c = a.exec(b))) throw new Error('Method "' + b + '" not found');
                    Array.prototype.unshift.call(arguments, c[1]), e.trigger.apply(e, arguments);
                }
            }
        } : "function" == typeof b ? {
            method: b
        } : Object.keys(b).map(function(a) {
            return {
                selector: a,
                method: d.call(this, b[a]).method
            };
        }, this);
    }, c = function(a) {
        return a = Array.isArray(a) ? a : [ a ], Array.prototype.concat.apply([], a.map(b, this));
    };
    return {
        _mapEvents: function() {
            null != this.events && this.$view && (this._undelegateEvents(), Object.keys(this.events).forEach(function(a) {
                var b = c.call(this, this.events[a]);
                a += ".delegated", b.forEach(function(b) {
                    b.selector ? this.on(a, b.selector, b.method) : this.on(a, b.method);
                }, this.$view);
            }, this));
        },
        _undelegateEvents: function() {
            this.$view && this.$view.off(".delegated");
        }
    };
});
define('beff/View',[ "jquery", "nbd/View", "nbd/trait/log", "./trait/eventMappable" ], function(a, b, c, d) {
    "use strict";
    return b.extend({
        init: function() {
            this._super.apply(this, arguments), this.on("postrender", this._mapEvents);
        },
        template: function(a) {
            return this.mustache && this.mustache(a, this.partials);
        },
        destroy: function() {
            this._undelegateEvents(), this._super();
        }
    }, {
        domify: a
    }).mixin(c).mixin(d);
});
define('beff/Controller',[ "jquery", "nbd/util/extend", "nbd/trait/log", "nbd/trait/responsive", "nbd/Controller", "./View" ], function(a, b, c, d, e, f) {
    "use strict";
    function g(a, b) {
        return "undefined" == typeof b || "object" == typeof a;
    }
    return e.extend({
        init: function(c, d) {
            var e, f;
            g(c, d) && (d = c, c = void 0), "string" == typeof d && (f = a(d), e = f[0]), d instanceof a && (f = d, 
            e = f[0]), d instanceof window.Element && (e = d, f = a(e)), f && (d = b({}, e.dataset || f.data())), 
            this._super(c, d), this._view.$view = f, f && this._view.trigger("postrender", f);
        }
    }, {
        VIEW_CLASS: f
    }).mixin(c).mixin(d);
});
define('be/stats',[ "jquery", "be/xhr" ], function(a, b) {
    "use strict";
    function c(c, d) {
        var e = a.isFunction(d.back) ? d.back : a.noop, f = d.a;
        if (delete d.a, delete d.back, "s" === f && !d.ids) throw new Error("be/stats called without ids");
        return b({
            url: c + "/" + f,
            data: d
        }).then(e);
    }
    function d(a) {
        var b, c = {};
        document.referrer && (a.referrer = document.referrer);
        for (b in a) a.hasOwnProperty(b) && i.hasOwnProperty(b) && (c[i[b]] = a[b]);
        return c;
    }
    var e, f, g, h = "/c", i = {
        action: "a",
        callback: "back",
        entity: "e",
        ids: "ids",
        id: "id",
        type: "t",
        time: "ti",
        contest: "c",
        source: "s",
        referrer: "r"
    };
    return e = function(a) {
        return c(h, d(a));
    }, f = function(a, b, c, d) {
        return e({
            action: a,
            entity: b,
            id: c,
            callback: d
        }), this;
    }, g = {
        get: e,
        view: f.bind(g, "v"),
        appreciate: f.bind(g, "a")
    };
});
define('project/View/Appreciate',[ "jquery", "moment", "beff/View" ], function(a, b, c) {
    "use strict";
    return c.extend({
        init: function() {
            this._super.apply(this, arguments), this.listenTo(this._model, "thanks", this._renderThanks);
        },
        render: function() {
            var a = this._model.get("appreciatedOn");
            a > 0 ? (this.$view.addClass("appreciated"), this.$view.find(".js-appreciation-date").text(b.unix(a).format("MMMM Do, YYYY"))) : this.$view.one("click", function() {
                this._controller.appreciate();
            }.bind(this));
        },
        _renderThanks: function() {
            this.$view.addClass("thanks").off("click");
        }
    });
});
define('project/Controller/Appreciate',[ "jquery", "nbd/Model", "nbd/Promise", "beff/Controller", "be/stats", "project/View/Appreciate" ], function(a, b, c, d, e, f) {
    "use strict";
    return d.extend({
        init: function(c, d) {
            this.views = [], this._model = new b(c, {
                appreciatedOn: 0,
                thanks: !1
            }), d.each(function(b, c) {
                this.views.push(this._initView(a(c)));
            }.bind(this));
        },
        _initView: function(a) {
            var b = new f(this._model);
            return b.$view = a, b._controller = this, b;
        },
        render: function() {
            var a = new c();
            return e.view("project", this.id, function(b) {
                var c = b.t || 0;
                this._model.set("appreciatedOn", c), this.views.forEach(function(a) {
                    a.render();
                }), a.resolve();
            }.bind(this)), a;
        },
        appreciate: function() {
            e.appreciate("project", this._model.id()), this._model.set("thanks", !0), this.trigger("appreciate");
        },
        destroy: function() {
            this.views.forEach(function(a) {
                a.destroy();
            }), this.views = [], this._model.destroy(), this._model = null;
        }
    });
});
define('be/spam',[ "jquery", "be/xhr", "be/modal/simple" ], function(a, b, c) {
    "use strict";
    function d(a, d, g) {
        return c({
            title: "Mark as Spam",
            html: "Are you sure you want to mark this " + f[a] + " as spam?"
        }).then(function() {
            return b({
                type: "POST",
                url: e + a + "/" + d
            }).then(function(a) {
                return g && g.text("Marked as Spam").on("click", !1), {
                    response: a,
                    $context: g
                };
            });
        });
    }
    var e = "/v2/report/spam/", f = {
        user: "person",
        project: "project",
        wip: "work in progress",
        projectcomment: "comment",
        wip_revisioncomment: "comment",
        message: "message",
        team: "team"
    };
    return {
        report: d,
        delegate: function(b, c) {
            c = c || a.noop, b.on("click.be-spam", ".js-action-spam", function(b) {
                var e = a(b.target), f = e.data("type"), g = e.data("id");
                d(f, g, e).then(c), b.preventDefault();
            });
        },
        undelegate: function(a) {
            a.off("click.be-spam");
        }
    };
});

define("vendor/require/hgn!templates/comment", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"comment-container cfix ");if(t.s(t.d("user.owner",c,p,1),c,p,0,49,62,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("owner-comment");});c.pop();}if(!t.s(t.d("user.owner",c,p,1),c,p,1,0,0,"")){t.b("user-comment");};t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <a class=\"comment-user-image-link left\" href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <img class=\"comment-user-image js-mini-profile\" data-id=\"");t.b(t.v(t.d("user.id",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("user.image",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("  <div class=\"comment-text-container left relative\">");t.b("\n" + i);t.b("    <div class=\"comment-user-date-wrap ui-corner cfix\">");t.b("\n" + i);t.b("      <a class=\"user-name-link bold js-mini-profile\" data-id=\"");t.b(t.v(t.d("user.id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.name",c,p,0)));t.b("</a>");t.b("\n" + i);if(t.s(t.f("replied_to",c,p,1),c,p,0,548,686,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <span class=\"bold\">");if(t.s(t.f("translate",c,p,1),c,p,0,588,658,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("comment_replied_to|replied to <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.name",c,p,0)));t.b("</a>");});c.pop();}t.b("</span>");t.b("\n" + i);});c.pop();}t.b("      <span class=\"comment-date\">");t.b(t.v(t.f("posted_on",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"comment-text-wrap\"><div class=\"comment-text\">");t.b(t.t(t.f("comment",c,p,0)));t.b("</div></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"comment-actions\">");t.b("\n" + i);if(t.s(t.d("permissions.flag",c,p,1),c,p,0,920,1033,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a class=\"comment-action comment-spam js-action-spam\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-type=\"");t.b(t.v(t.f("type",c,p,0)));t.b("comment\"></a>");t.b("\n" + i);});c.pop();}if(t.s(t.d("permissions.close",c,p,1),c,p,0,1081,1145,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a class=\"comment-action comment-close js-delete\"></a>");t.b("\n" + i);});c.pop();}t.b("  </div>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<li class=\"comment-container cfix {{#user.owner}}owner-comment{{/user.owner}}{{^user.owner}}user-comment{{/user.owner}}\" data-id=\"{{id}}\">\n  <a class=\"comment-user-image-link left\" href=\"{{user.url}}\">\n    <img class=\"comment-user-image js-mini-profile\" data-id=\"{{user.id}}\" src=\"{{user.image}}\">\n  </a>\n  <div class=\"comment-text-container left relative\">\n    <div class=\"comment-user-date-wrap ui-corner cfix\">\n      <a class=\"user-name-link bold js-mini-profile\" data-id=\"{{user.id}}\" href=\"{{user.url}}\">{{user.name}}</a>\n      {{#replied_to}}\n      <span class=\"bold\">{{#translate}}comment_replied_to|replied to <a href=\"{{user.url}}\">{{user.name}}</a>{{/translate}}</span>\n      {{/replied_to}}\n      <span class=\"comment-date\">{{posted_on}}</span>\n    </div>\n    <div class=\"comment-text-wrap\"><div class=\"comment-text\">{{& comment}}</div></div>\n  </div>\n  <div class=\"comment-actions\">\n    {{#permissions.flag}}\n    <a class=\"comment-action comment-spam js-action-spam\" data-id=\"{{id}}\" data-type=\"{{type}}comment\"></a>\n    {{/permissions.flag}}\n    {{#permissions.close}}\n    <a class=\"comment-action comment-close js-delete\"></a>\n    {{/permissions.close}}\n  </div>\n</li>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Comment',[ "jquery", "nbd/View/Entity", "nbd/util/pipe", "be/modal/simple", "hgn!templates/comment" ], function(a, b, c, d, e) {
    "use strict";
    var f = {
        3e3: "close",
        5e3: "flag"
    }, g = b.extend({
        template: c(e, a),
        templateData: function() {
            var a = this._super();
            return a.permissions = a.permissions.reduce(function(a, b) {
                return a[f[b]] = !0, a;
            }, {}), a;
        },
        rendered: function() {
            this.$view.hide().fadeIn().on("click", ".js-delete", function() {
                this.$view.fadeOut(this.trigger.bind(this, "remove"));
            }.bind(this));
        }
    });
    return g;
});
define('be/Controller/Comment',[ "nbd/Controller/Entity", "nbd/Model", "be/View/Comment", "nbd/trait/pubsub" ], function(a, b, c, d) {
    "use strict";
    var e = a.extend({
        _initView: function() {
            this._super.apply(this, arguments), this.listenTo(this._view, "all", this.trigger);
        },
        destroy: function() {
            this.stopListening(), this._super();
        }
    }, {
        MODEL_CLASS: b,
        VIEW_CLASS: c
    }).mixin(d);
    return e;
});
define('be/comments',[ "jquery", "nbd/util/extend", "beff/Component", "be/spam", "be/xhr", "be/Controller/Comment" ], function(a, b, c, d, e, f) {
    "use strict";
    return c.extend({
        _posts: [],
        loading: !1,
        moreSelector: ".see-more-button-container",
        init: function(a, b, c) {
            var e = a.find(".js-comments-list");
            this.data = b || {}, this.callback = c, this.loading = !1, this.$content = e, this.$more = a.find(this.moreSelector), 
            this.get = this.more.bind(this, void 0), this.$more.on("click", this.get), d.delegate(this.$content, function(a) {
                a.$context.remove(), this.trigger("spam");
            }.bind(this));
        },
        set: function(a) {
            return b(this.data, a), this;
        },
        more: function(a) {
            var b;
            return this.loading = !0, b = this.load(a), b.then(this.render.bind(this))["finally"](this.after.bind(this)), 
            b["finally"](this.callback), b;
        },
        destroy: function() {
            this.stopListening(), this.clear(), this.$more.off("click", this.get);
        },
        load: function(a) {
            return e({
                url: "/comments/" + this.data.type,
                data: b({
                    sort_order: "desc"
                }, this.data, a)
            });
        },
        render: function(a) {
            var b;
            return a && a.comments && (b = a.comments.map(this._makePost, this), this._posts = this._posts.concat(b)), 
            this._posts["asc" === this.data.order ? "reduceRight" : "reduce"](function(a, b) {
                return b.render(a.$content), a;
            }, this), a;
        },
        after: function() {
            this.data.offset = this._posts.length ? this._posts[this._posts.length - 1].id : void 0;
        },
        _makePost: function(a) {
            a.type = this.data.type;
            var b = new f(a.id, a);
            return this.listenTo(b, "remove", this.remove.bind(this, b)), b;
        },
        add: function(a) {
            var b = a instanceof f ? a : this._makePost(a);
            this._posts.unshift(b), this.render();
        },
        remove: function(a) {
            var b;
            ~(b = this._posts.indexOf(a)) && (e({
                type: "DELETE",
                url: "/comments/" + this.data.type + "?comment_id=" + a.id
            }), this._posts.splice(b, 1), a.destroy());
        },
        clear: function() {
            return this._posts.forEach(function(a) {
                a.destroy();
            }), this._posts = [], this;
        }
    });
});

define("vendor/require/hgn!templates/error", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"error-bar\">");t.b(t.t(t.f("message",c,p,0)));t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"error-bar\">{{{message}}}</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/error',[ "jquery", "nbd/View/Element", "nbd/util/pipe", "hgn!templates/error" ], function(a, b, c, d) {
    "use strict";
    function e(a) {
        return ~a.indexOf("&lt;") ? g.html(a).text() : a;
    }
    var f, g = a("<div>"), h = b.extend({
        template: c(d, a),
        templateData: function() {
            return {
                message: "Oops, an error occurred. | <a class='js-reload'>Please Refesh.</a>"
            };
        },
        render: function(a) {
            return a = a ? {
                message: e(a)
            } : null, this._super(a);
        },
        rendered: function() {
            this.$view.on("click", ".js-reload", function() {
                window.location.reload();
            }).show();
        },
        hide: function() {
            return this.$view && this.$view.hide();
        }
    }), i = {
        init: function(a) {
            return f = new h(a);
        },
        show: function(a) {
            f && f.render(a);
        },
        hide: function() {
            f && f.hide();
        },
        Errorline: h
    };
    return i;
});
define('be/mentionSource',[ "log", "nbd/trait/promise", "be/xhr" ], function(a, b, c) {
    "use strict";
    function d(a) {
        for (var b = {}, c = 0; c < a.length; ++c) b[a[c].id] = a[c];
        return b;
    }
    function e(a) {
        var b = {};
        return a.filter(function(a) {
            return a.id in b ? !1 : (b[a.id] = a, !0);
        });
    }
    function f(a) {
        return j = d(a);
    }
    function g() {
        var a;
        return j ? (a = new b(), a.resolve(j)) : a = c(k.local).then(f), a;
    }
    function h(a) {
        return g().then(r.bind(a));
    }
    function i(a, d) {
        i._cache = i._cache || {}, i._cache[a] = i._cache[a] || {};
        var e, f;
        return d.length < l && (f = []), i._cache[a][d] && (f = i._cache[a][d]), f ? (e = new b(), 
        e.resolve(f), e) : c({
            url: a,
            data: {
                q: d
            }
        }).then(function(b) {
            return f = p.call(b, d), i._cache[a][d] = f, f;
        });
    }
    var j, k = {
        global: "/mentions/search",
        following: "/mentions/search/following",
        local: ""
    }, l = 2, m = 5, n = function(a) {
        return this[a];
    }, o = function(a) {
        var b = this.toLocaleLowerCase();
        return 0 === a.first_name.toLocaleLowerCase().indexOf(b) || 0 === a.last_name.toLocaleLowerCase().indexOf(b) || 0 === a.username.toLocaleLowerCase().indexOf(b);
    }, p = function(a) {
        return this.filter(o, a);
    }, q = function(a) {
        return Object.keys(this).map(n, this).filter(o, a);
    }, r = function(a) {
        return q.call(a, this);
    };
    a = a.get("be/mentionSource");
    var s = i.bind(null, k.following), t = i.bind(null, k.global);
    return {
        init: function(a) {
            return a.maxResults && (m = a.maxResults), a.minLength && (l = a.minLength), a.local && (k.local = a.local), 
            j = null, this;
        },
        getLocal: g,
        source: function(b, c) {
            function d() {
                c(e(g).slice(0, m));
            }
            var f = [ h, s, t ].map(function(a) {
                return a(b.term);
            }), g = [];
            f.reduce(function(b, c) {
                return (b ? b.then(function() {
                    return c;
                }) : c).then(function(a) {
                    a.forEach(function(a) {
                        a.value = a.username;
                    }), g = g.concat(a), d();
                }, function(b) {
                    a.error(b);
                });
            }, null).then(null, d);
        }
    };
});

define("vendor/require/hgn!templates/lib/_menu/_user", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"ui-menu-item\">");t.b("\n" + i);t.b("  <a class=\"mention-user-wrap\">");t.b("\n" + i);t.b("    <img class=\"mention-user-image\" src=\"");t.b(t.v(t.d("images.50",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("    <div class=\"mention-displayname\">");t.b(t.v(t.f("display_name",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    <div class=\"mention-minor\">@");t.b(t.v(t.f("username",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<li class=\"ui-menu-item\">\n  <a class=\"mention-user-wrap\">\n    <img class=\"mention-user-image\" src=\"{{images.50}}\" />\n    <div class=\"mention-displayname\">{{display_name}}</div>\n    <div class=\"mention-minor\">@{{username}}</div>\n  </a>\n</li>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
!function(a) {
    "use strict";
    return "function" == typeof define && define.amd ? void define('jquery-plugins/be/automention',[ "jquery", "./autosuggest" ], function() {
        var b = a.apply(this, arguments);
        return b;
    }) : jQuery && a.call(this, jQuery);
}(function(a) {
    "use strict";
    var b = /(?:^|[^\w])@(\w+)/;
    return a.widget("be.automention", a.be.autosuggest, {
        _create: function() {
            this._super(), this._on(this.element, {
                mouseup: this.check,
                input: this.check,
                keyup: this.check,
                blur: this._clear
            }), this.menu.element.addClass("mention-menu");
        },
        _mention: {
            value: "",
            start: 0,
            end: 0
        },
        _last: null,
        _value: function(a) {
            if (!a) return this._mention.value;
            var b = this._super(), c = b.indexOf("@", this._mention.start) + 1;
            a = b.substring(0, c) + a, " " !== b.charAt(this._mention.end) && (a += " "), a += b.substring(this._mention.end), 
            this._super(a), this.element.trigger("input");
        },
        _clear: function() {
            this._last = null;
        },
        check: function(a) {
            if (this.element.is(document.activeElement)) {
                var c, d, e, f = document.activeElement.value, g = document.activeElement.selectionStart;
                g && f && (d = f.lastIndexOf(" ", g - 1), e = f.indexOf(" ", g), e = ~e ? e : 1 / 0, 
                c = f.substring(d, e), c = b.exec(c), c = c && c[1], this._last !== c && (this._mention.value = c || "", 
                this._mention.start = d, this._mention.end = e, this.search(null, a), this._trigger("value", a, c)), 
                this._last = c);
            }
        }
    }), a.extend(a.be.automention, {
        usernameMatch: b
    }), a.be.automention;
});
define('be/automention',[ "jquery", "be/error", "be/mentionSource", "hgn!templates/lib/_menu/_user", "jquery-plugins/be/automention" ], function(a, b, c, d, e) {
    "use strict";
    var f = new RegExp(e.usernameMatch.source, "g");
    return function(e, g) {
        g = a.extend({
            maxMentions: 5
        }, g), c.init(g), e.length && e.parent().addClass("ui-front").end().one("focus", c.getLocal).automention({
            delay: 50,
            itemTemplate: d,
            source: c.source,
            appendTo: g.appendTo
        }).on("automentionopen", function() {
            var c, d, e = this.value, h = {}, i = a(this);
            e.replace(f, function(a, b) {
                h[a] = b;
            }), Object.keys(h).length > g.maxMentions && (c = i.data("beAutomention"), d = i.data("errorbar") || new b.Errorline(c.menu.element), 
            d.render("<strong>You may only mention " + g.maxMentions + " users</strong>"), d.$view.prependTo(c.menu.element), 
            i.data("errorbar", d));
        });
    };
});
define('beff/util/error',[ "nbd/Promise" ], function(a) {
    "use strict";
    var b = [], c = function(c) {
        var d = new a();
        return d.reject(c), (this || b).reduce(function(a, b) {
            return a["catch"](b);
        }, d);
    };
    return Object.defineProperty(c, "handlers", {
        value: b
    }), c;
});
define('beff/Component/Form',[ "nbd/Promise", "nbd/util/extend", "nbd/util/pipe", "../Component", "../util/xhr", "../util/error" ], function(a, b, c, d, e, f) {
    "use strict";
    function g(a) {
        return a.reduce(function(a, b) {
            var c = a[b.name];
            return a[b.name] = c ? [].concat(c, b.value) : b.value, a;
        }, {});
    }
    var h = function(a) {
        switch (a.which) {
          case 1:
          case 13:
          case 32:
            this.$form.submit();
        }
    }, i = function(b) {
        var c = new a(), d = c.thenable(), e = "function" == typeof this.commit ? this.commit.call(d, b) : this.commit;
        return c.resolve(e === d ? this.xhr(b) : e), this.trigger("commit"), c;
    }, j = d.extend({
        xhr: e,
        init: function(a) {
            if (!a) throw new Error("The context of the form cannot be empty");
            if (this.$form = a.is("form") ? a : a.find("form"), !this.$form.length) throw new Error("Unable to find form within context");
            this._normalizeSubmitter = h.bind(this), this.submit = this.submit.bind(this), Object.defineProperty(this, "handlers", {
                value: [ this._handleFormError.bind(this) ]
            });
        },
        destroy: function() {
            if (!this.$form) throw new Error("Cannot destroy null form");
            this._super(), this.$form = null;
        },
        reset: function() {
            return this.$form[0].reset(), this;
        },
        validator: function(a) {
            return !0;
        },
        commit: function(a) {
            return this;
        },
        _handleFormError: function(a) {
            if (!(a instanceof j.Error)) throw a;
            Object.keys(a).forEach(function(b) {
                var c = this.$form.find("[name=" + b + "], #" + b).first(), d = this;
                c.length && (c.one("input change", function e() {
                    c.off("input change", e), d.trigger("error:hide", c);
                }), this.trigger("error:show", c, a[b]));
            }, this);
        },
        _handleError: function(a) {
            return this.trigger("error", a), f.call(this.handlers, a)["catch"](f)["finally"](function() {
                delete this._cacheMeta;
            }.bind(this));
        },
        _findFormError: function(a) {
            if (!(a instanceof Object)) throw a;
            var b, c = this._cacheMeta || this.toJSON(), d = {};
            for (b in c.data) a.hasOwnProperty(b) && (d[b] = a[b]);
            if (Object.keys(d).length) throw new this.constructor.Error(d);
            throw a;
        },
        submit: function(a) {
            if (!this.$form) throw new Error("The form cannot be null");
            this.trigger("before", a);
            var b = this._submit(a);
            return b["catch"](this._findFormError.bind(this)).then(this.trigger.bind(this, "success"), this._handleError.bind(this))["finally"](this.trigger.bind(this, "after")), 
            b;
        },
        _submit: function(b) {
            var d, e, f, g = Array.isArray(this.validator) ? c.apply(null, this.validator.map(function(a) {
                return a.bind(this);
            }, this)) : this.validator.bind(this), h = new a();
            this._cacheMeta = d = this.toJSON();
            try {
                e = g(d.data);
            } catch (j) {
                e = !1, f = j;
            }
            return e = e !== !1, !b || e && "function" != typeof this.commit || b.preventDefault(), 
            e ? h.resolve(d) : h.reject(f), h.then(i.bind(this));
        },
        toJSON: function() {
            return {
                url: this.$form.attr("action"),
                type: this.$form.attr("method") || "POST",
                data: this.constructor.decompose(this.$form.serializeArray())
            };
        },
        _submitSelector: ".js-submit:not([type=submit])",
        bind: function() {
            return this.$form.on("click keydown", this._submitSelector, this._normalizeSubmitter).on("submit", this.submit), 
            this;
        },
        unbind: function() {
            return this.$form.off("click keydown", this._submitSelector, this._normalizeSubmitter).off("submit", this.submit), 
            this;
        }
    }, {
        decompose: g,
        Error: function(a) {
            b(this, a);
        }
    });
    return j;
});
define('beff/util/validate',[],function() {
    "use strict";
    function a(a) {
        var b, c, d = !1, e = 0, f = [];
        for (b = 0; b < a.length; ++b) "[" !== a[b] ? "]" !== a[b] ? "," !== a[b] || d || (c = a.substring(e, b), 
        c && f.push(c), e = b + 1) : d = !1 : d = !0;
        return c = a.substring(e), c && f.push(c), f;
    }
    function b(d, e) {
        return delete b.message, e = e ? a(e) : [], null == d && (d = ""), -1 === e.indexOf("required") && "" === d ? !0 : e.every(c, d);
    }
    var c, d = RegExp.prototype.test, e = {
        Generic: {
            test: d.bind(/^[^<>]+$/),
            message: "This field may not contain less than signs (&lt) or greater than signs (&gt;)"
        },
        AlphaNumeric: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F]+$/),
            message: "This field must contain only alphanumeric characters"
        },
        Alpha: {
            test: d.bind(/^[A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F]+$/),
            message: "This field must contain only alpha characters"
        },
        AlphaDash: {
            test: d.bind(/^[A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\-]+$/),
            message: "This field must contain only alpha characters or dashes"
        },
        ANDash: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\-]+$/),
            message: "This field must contain only alphanumeric characters or dashes"
        },
        ANUnder: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F_]+$/),
            message: "This field must contain only alphanumeric characters with or without underscores"
        },
        ANUSpace: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F_ ]+$/),
            message: "This field must contain only alphanumeric characters with or without underscores and spaces"
        },
        ANEmail: {
            test: d.bind(/^([_\dA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\-]+|[\w\.\+\-]+@(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))$/),
            message: "This field must contain a valid username or email"
        },
        Integer: {
            test: d.bind(/^\-?\d+$/),
            message: "This field must only contain numbers, without any spaces"
        },
        CreditCardNumber: {
            test: d.bind(/^\d{13,16}$/),
            message: "This field must only contain numbers, without any spaces or dashes"
        },
        Decimal: {
            test: d.bind(/^\-?\d+(\.\d+)?$/),
            message: "This field must be a valid decimal number"
        },
        Date: {
            test: d.bind(/^\d{1,2}\-\d{1,2}-\d{4}( \d{2}:\d{2}:\d{2})?$/),
            message: "This field must be a valid date"
        },
        SqlDate: {
            test: d.bind(/^\d{4}\-\d{2}\-\d{2}$/),
            message: "This field must be a valid date"
        },
        SqlDateTime: {
            test: d.bind(/^\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}$/),
            message: "This field must be a valid datetime"
        },
        SlashDate: {
            test: d.bind(/^\d{1,2}\/\d{1,2}\/\d{4}$/),
            message: "This field must be a valid date"
        },
        Email: {
            test: d.bind(/^[\w\.\+\-]+@(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/),
            message: "This field must be a valid email address"
        },
        Name: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\'. \-]{2,50}$/),
            message: "This field must be a valid name"
        },
        Username: {
            test: d.bind(/^[A-Za-z0-9_\-]+$/),
            message: "This field contains invalid characters. Please use only letters, numbers, dash or underscore characters."
        },
        Password: {
            test: d.bind(/^\S{6,32}$/),
            message: "This field must be between 6 and 32 characters"
        },
        Address: {
            test: d.bind(/^[\w0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F# \' \.\,\&\-]+$/),
            message: "This field must be a valid address"
        },
        City: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F \' \. \/ \-]+$/),
            message: "This field must be a valid city"
        },
        Province: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F ]+$/),
            message: "This field must be a valid province"
        },
        IntZip: {
            test: d.bind(/^[A-Za-z0-9#\. \-]+$/),
            message: "This field must be a valid zipcode"
        },
        UsZip: {
            test: d.bind(/^\d{5}(\-\d{4})?$/),
            message: "This field must be a valid US zipcode"
        },
        Country: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\'. \-]{2,50}$/),
            message: "This field must be a valid country"
        },
        IntPhone: {
            test: d.bind(/^[0-9\+ \(\)\#\-]+$/),
            message: "This field must be a valid phone"
        },
        UsPhone: {
            test: d.bind(/^\d{3}\-\d{3}\-\d{4}$/),
            message: "This field must be a valid US phone"
        },
        PicExt: {
            test: d.bind(/^((jpg)|(jpeg)|(png)|(gif)){1}$/),
            message: "This field must be a valid image extension"
        },
        VideoExt: {
            test: d.bind(/^((mpg)|(mpeg)|(mov)|(avi)|(dv)|(qt)|(asf)|(flv)){1}$/),
            message: "This field must be a valid video extension"
        },
        Url: {
            test: d.bind(/^(http(?:s)?:\/\/|www.)[^<>]*$/),
            message: "This field must be a URL starting with http:// or www."
        },
        UrlExt: {
            test: d.bind(/^((?:https?):\/\/)?(?:(?:(?:[\w\.\-\+!$&\'\(\)*\+,;=_]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&\'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:[A-Za-z0-9_\-]+\.)(?:[A-Za-z0-9\-\._])+(?::\d+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@$\'~*,;_\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/),
            message: "This field must be a valid URL"
        },
        Html: {
            test: function() {
                return !d.apply(/<((?!\/?span|\/?h1|\/?h2|\/?h3|\/?h4|\/?h5|\/?h6|\/?a|\/?b|\/?ol|\/?ul|\/?li|\/?i|\/?u|\/?strong|\/?em(?!bed)|\/?p|\/?div|\/?br|\/?unb|\/?uni|\/?\s|\/?\>)[^\>]*\>)/i, arguments);
            },
            message: "This field must be properly formed HTML"
        },
        Twitter: {
            test: d.bind(/^[A-Za-z0-9_\-]{1,15}$/),
            message: "This field must be a valid twitter username (without the @ character)"
        },
        required: {
            test: d.bind(/.+/),
            message: "This field is required"
        },
        length: {
            test: function(a, b) {
                var c = /\[(,?\d+(?:,\d+)?)\]/.exec(b);
                return a = String(a).replace(/[\s]+/g, " "), c ? new RegExp("^.{" + c[1] + "}$").test(a) : !1;
            },
            message: function(a, b) {
                var c;
                return (c = /\[(\d+),(\d+)\]/.exec(b)) ? "Must be between " + c[1] + " and " + c[2] + " characters." : (c = /\[,(\d+)\]/.exec(b)) ? "Must be at most " + c[1] + " characters." : (c = /\[(\d+),\]/.exec(b)) ? "Must be at least " + c[1] + " characters." : (c = /\[(\d+)\]/.exec(b), 
                c ? "Must be exactly " + c[1] + " characters." : void 0);
            }
        }
    }, f = /(\w+)(.*)/;
    return c = function(a) {
        var c, d = f.exec(a);
        return d && (a = d[1], c = d[2]), e[a] && e[a].test ? (d = e[a].test(this, c), d || (b.message = "function" == typeof e[a].message ? e[a].message(this, c) : e[a].message), 
        d) : !0;
    }, b;
});
define('be/form/validator',[ "jquery", "beff/util/validate" ], function(a, b) {
    "use strict";
    return function(c, d) {
        return c.reduce(function(c, e) {
            var f = a(e), g = f.data("validate"), h = f.attr("name") || f.attr("id");
            return b(d[h], g) || (c[h] = b.message), c;
        }, {});
    };
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
define('be/form',[ "jquery", "lib/showMessages", "beff/Component/Form", "be/form/errors", "be/form/validator", "be/handleResponse", "be/localization", "be/xhr", "be/buttons", "jquery-plugins/plugins/jquery.changeinput" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    function j(a) {
        return Object.keys(a).forEach(function(b) {
            var c, d = a[b];
            "string" == typeof d && (c = d.trim(), a[b] = 0 === c.length ? c : d);
        }), a;
    }
    var k = function(a) {
        var b = this.$form.find("[data-validate]:not(:disabled)").toArray(), c = e(b, a);
        if (Object.keys(c).length) throw c;
        return a;
    };
    return c.extend({
        xhr: h,
        hideButtonText: g.translate("form_template_saving", "Saving..."),
        validator: [ j, k ],
        _submitSelector: ".form-submit:not([type=submit]):not([disabled]), .js-submit:not([type=submit]):not([disabled])",
        _displayError: function(a, b) {
            var c = {
                errors: {}
            };
            return c.errors[a.attr("name")] = b, d.displayAll(this.$form)(c);
        },
        init: function(a) {
            this._super(a), this.$context = a, this.on({
                "error:show": this._displayError.bind(this),
                "error:hide": d.removeErrors,
                error: function() {
                    this.showButtons();
                },
                before: function() {
                    this.hideButtons();
                }
            }), this.handlers.push(this.showMessages.bind(this)), this.bind();
        },
        reset: function() {
            return this._super(), this.$form.find("select").each(function() {
                var b = this.value;
                a(this).changeInput("value", "").changeInput("value", b);
            }), this;
        },
        _getMessageContainer: function() {
            return this.$form;
        },
        showMessages: function(a) {
            if (a = f.error(a), !a.messages) throw a;
            b(this._getMessageContainer(), a.messages);
        },
        submit: function(a) {
            return this.wasSubmittedFromButton = !!a, d.removeAll(this.$form), this._super.apply(this, arguments);
        },
        commit: function(a) {
            return h(a);
        },
        showButtons: function() {
            i.show(this._getButtonContainer());
        },
        hideButtons: function() {
            var a = this.hideButtonText;
            "function" == typeof a && (a = a()), i.hide(this._getButtonContainer(), a);
        },
        _getButtonContainer: function() {
            var a = this.$context.find(this._submitSelector).closest(".form-item").parent();
            if (!a.length && this.wasSubmittedFromButton) throw new Error("Unable to find button container:" + this.$context.html());
            return a;
        },
        _findFormError: function(a) {
            var b = f.error(a);
            if (!b.errors && "object" == typeof a.responseJSON) throw a;
            return this._super(b.errors || b);
        },
        bind: function() {
            return this.alreadyBound ? this : (this.alreadyBound = !0, this.$context.on("click keydown", this._submitSelector, this._normalizeSubmitter), 
            this.$form.on("submit", this.submit), this);
        },
        unbind: function() {
            return this.$context.off("click keydown", this._submitSelector, this._normalizeSubmitter), 
            this.$form.off("submit", this.submit), this;
        }
    });
});
define('be/form/Reset',[ "be/form" ], function(a) {
    "use strict";
    var b = a.extend({
        _submit: function(a) {
            return this._super(a).then(function() {
                this.$form.find(":input").val("").removeAttr("checked selected");
            }.bind(this));
        }
    });
    return b;
});
define('project/lib/CommentSection',[ "jquery", "beff/Component", "be/comments", "be/automention", "be/form/Reset" ], function(a, b, c, d, e) {
    "use strict";
    return b.extend({
        _total: 0,
        init: function(a) {
            this._$context = a, this._id = a.data("id"), this._$view = a.find(".js-post-comment-block"), 
            this._$commentText = a.find(".js-comment-textarea"), this._commentContainer = this._initCommentContainer();
        },
        bind: function() {
            d(this._$commentText, {
                local: "/mentions/project/" + this._id
            }), this._bindForm(), this._commentContainer.get();
        },
        unbind: function() {
            this._form && this._form.destroy(), this._commentContainer.destroy(), this._$view && this._$view.remove();
        },
        _setTotal: function(a) {
            this._total = a;
            var b = this._$context.find(".js-comments-total");
            b.text(a ? "(" + a + ")" : "");
        },
        _initCommentContainer: function() {
            var a, b = this._id, d = this, e = ".js-see-more", f = this._$context.find(e);
            return a = c.extend({
                moreSelector: e
            }).init(this._$context, {
                type: "project",
                entity_id: b
            }, function(a) {
                f.toggleClass("hide", !a.more), d._setTotal(+a.total);
            }), this.listenTo(a, "remove", function() {
                this._setTotal(this._total - 1);
            }), a;
        },
        _bindForm: function() {
            function a(a) {
                if (!a.id || !a.user) throw a;
                b._commentContainer.add({
                    id: a.id,
                    user: a.user,
                    comment: a.comment,
                    posted_on: "Just now",
                    permissions: [ 3e3 ]
                }), b._setTotal(b._total + 1);
            }
            var b = this, c = this._id, d = this._$view.find(".js-submit");
            d.length && (this._form = e.extend({
                hideButtonText: "Posting..."
            }).init(this._$view).on("success", function() {
                this.showButtons();
            }), this._form.commit = function(b) {
                return b.data.entity_id = c, this.then(a), this;
            });
        }
    });
});
define('project/lib/DimensionClasses',[ "jquery", "beff/Component" ], function(a, b) {
    "use strict";
    return b.extend({
        init: function(a, b, c, d) {
            this._$target = a, this._$sizer = b, this._classMap = d, this._measure = this._$sizer[c].bind(this._$sizer), 
            this._resizeCallback = this._applyBreakpointClasses.bind(this);
        },
        bind: function() {
            this._applyBreakpointClasses(), a(window).on("resize", this._resizeCallback);
        },
        _applyBreakpointClasses: function() {
            var a = this._measure();
            Object.keys(this._classMap).forEach(function(b) {
                this._$target.toggleClass(b, a < this._classMap[b]);
            }, this);
        },
        destroy: function() {
            a(window).off("resize", this._resizeCallback);
        }
    });
});

define('vendor/require/css!styles/jquery/plugins/jquery.fancybox',[],function(){});
!function(a, b, c) {
    var d = c(a), e = c(b), f = c.fancybox = function() {
        f.open.apply(this, arguments);
    }, g = !1, h = navigator.userAgent.match(/msie/i), i = null;
    c.extend(f, {
        version: "2.0.4",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 200,
            minHeight: 200,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            fixed: !1 in b.documentElement || b,
            scrolling: "auto",
            wrapCSS: "fancybox-default",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            modal: !1,
            loop: !0,
            ajax: {},
            keys: {
                next: [ 13, 32, 34, 39, 40 ],
                prev: [ 8, 33, 37, 38 ],
                close: [ 27 ]
            },
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0" ' + (h ? 'allowtransparency="true""' : "") + ' scrolling="{scrolling}" src="{href}"></iframe>',
                swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<div title="Close" class="fancybox-item fancybox-close"></div>',
                next: '<a title="Next" class="fancybox-item fancybox-next"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-item fancybox-prev"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 300,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 300,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: {
                    speedIn: 0,
                    speedOut: 300,
                    opacity: .8,
                    css: {
                        cursor: "pointer"
                    },
                    closeClick: !0
                },
                title: {
                    type: "float"
                }
            },
            onCancel: c.noop,
            beforeLoad: c.noop,
            afterLoad: c.noop,
            beforeShow: c.noop,
            afterShow: c.noop,
            beforeClose: c.noop,
            afterClose: c.noop
        },
        group: {},
        opts: {},
        coming: null,
        current: null,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(a, b) {
            c.isArray(a) || (a = [ a ]), a.length && (f.close(!0), f.opts = c.extend(!0, {}, f.defaults, b), 
            f.group = a, f._start(f.opts.index || 0));
        },
        cancel: function() {
            f.coming && !1 === f.trigger("onCancel") || (f.coming = null, f.hideLoading(), f.ajaxLoad && f.ajaxLoad.abort(), 
            f.ajaxLoad = null, f.imgPreload && (f.imgPreload.onload = f.imgPreload.onabort = f.imgPreload.onerror = null));
        },
        close: function(a) {
            f.cancel(), f.current && !1 !== f.trigger("beforeClose") && (f.unbindEvents(), !f.isOpen || a && a[0] === !0 ? (c(".fancybox-wrap").stop().trigger("onReset").remove(), 
            f._afterZoomOut()) : (f.isOpen = f.isOpened = !1, c(".fancybox-item").remove(), 
            f.wrap.stop(!0).removeClass("fancybox-opened"), f.inner.css("overflow", "hidden"), 
            f.transitions[f.current.closeMethod]()));
        },
        play: function(a) {
            var b = function() {
                clearTimeout(f.player.timer);
            }, d = function() {
                b(), f.current && f.player.isActive && (f.player.timer = setTimeout(f.next, f.current.playSpeed));
            }, e = function() {
                b(), c("body").unbind(".player"), f.player.isActive = !1, f.trigger("onPlayEnd");
            }, g = function() {
                f.current && (f.current.loop || f.current.index < f.group.length - 1) && (f.player.isActive = !0, 
                c("body").bind({
                    "afterShow.player onUpdate.player": d,
                    "onCancel.player beforeClose.player": e,
                    "beforeLoad.player": b
                }), d(), f.trigger("onPlayStart"));
            };
            f.player.isActive || a && a[0] === !1 ? e() : g();
        },
        next: function() {
            f.current && f.jumpto(f.current.index + 1);
        },
        prev: function() {
            f.current && f.jumpto(f.current.index - 1);
        },
        jumpto: function(a) {
            f.current && (a = parseInt(a, 10), f.group.length > 1 && f.current.loop && (a >= f.group.length ? a = 0 : 0 > a && (a = f.group.length - 1)), 
            "undefined" != typeof f.group[a] && (f.cancel(), f._start(a)));
        },
        reposition: function(a) {
            f.isOpen && f.wrap.css(f._getPosition(a));
        },
        update: function() {
            f.isOpen && (g || (i = setInterval(function() {
                g && (g = !1, clearTimeout(i), f.current && (f.current.autoSize && (f.inner.height("auto"), 
                f.current.height = f.inner.height()), f._setDimension(), f.current.canGrow && f.inner.height("auto"), 
                f.reposition(), f.trigger("onUpdate")));
            }, 100)), g = !0);
        },
        toggle: function() {
            f.isOpen && (f.current.fitToView = !f.current.fitToView, f.update());
        },
        hideLoading: function() {
            c("#fancybox-loading").remove();
        },
        showLoading: function() {
            f.hideLoading(), c('<div id="fancybox-loading"></div>').click(f.cancel).appendTo("body");
        },
        getViewport: function() {
            return {
                x: d.scrollLeft(),
                y: d.scrollTop(),
                w: d.width(),
                h: d.height()
            };
        },
        unbindEvents: function() {
            f.wrap && f.wrap.unbind(".fb"), e.unbind(".fb"), d.unbind(".fb");
        },
        bindEvents: function() {
            var a = f.current, b = a.keys;
            a && (d.bind("resize.fb, orientationchange.fb", f.update), b && e.bind("keydown.fb", function(a) {
                var d;
                a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || !(c.inArray(a.target.tagName.toLowerCase(), [ "input", "textarea", "select", "button" ]) < 0) || (d = a.keyCode, 
                c.inArray(d, b.close) > -1 ? (f.close(), a.preventDefault()) : c.inArray(d, b.next) > -1 ? (f.next(), 
                a.preventDefault()) : c.inArray(d, b.prev) > -1 && (f.prev(), a.preventDefault()));
            }), c.fn.mousewheel && a.mouseWheel && f.group.length > 1 && f.wrap.bind("mousewheel.fb", function(a, b) {
                var d = c(a.target).get(0);
                (0 === d.clientHeight || d.scrollHeight === d.clientHeight) && (a.preventDefault(), 
                f[b > 0 ? "prev" : "next"]());
            }));
        },
        trigger: function(a) {
            var b, d = f[c.inArray(a, [ "onCancel", "beforeLoad", "afterLoad" ]) > -1 ? "coming" : "current"];
            if (d) {
                if (c.isFunction(d[a]) && (b = d[a].apply(d, Array.prototype.slice.call(arguments, 1))), 
                b === !1) return !1;
                d.helpers && c.each(d.helpers, function(b, e) {
                    e && "undefined" != typeof f.helpers[b] && c.isFunction(f.helpers[b][a]) && f.helpers[b][a](e, d);
                }), c.event.trigger(a + ".fb");
            }
        },
        isImage: function(a) {
            return a && a.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i);
        },
        isSWF: function(a) {
            return a && a.match(/\.(swf)(.*)?$/i);
        },
        _start: function(a) {
            var b, d, e, g, h = {}, i = f.group[a] || null;
            return "object" == typeof i && (i.nodeType || i instanceof c) && (b = !0, c.metadata && (h = c(i).metadata())), 
            h = c.extend(!0, {}, f.opts, {
                index: a,
                element: i
            }, c.isPlainObject(i) ? i : h), c.each([ "href", "title", "content", "type" ], function(a, d) {
                h[d] = f.opts[d] || b && c(i).attr(d) || h[d] || null;
            }), "number" == typeof h.margin && (h.margin = [ h.margin, h.margin, h.margin, h.margin ]), 
            h.modal && c.extend(!0, h, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        css: {
                            cursor: "auto"
                        },
                        closeClick: !1
                    }
                }
            }), f.coming = h, !1 === f.trigger("beforeLoad") ? void (f.coming = null) : (e = h.type, 
            d = h.href, e || (b && (g = c(i).data("fancybox-type"), !g && i.className && (g = i.className.match(/fancybox\.(\w+)/), 
            e = g ? g[1] : null)), !e && d && (f.isImage(d) ? e = "image" : f.isSWF(d) ? e = "swf" : d.match(/^#/) && (e = "inline")), 
            e || (e = b ? "inline" : "html"), h.type = e), "inline" === e || "html" === e ? (h.content = h.content || ("inline" === e && d ? c(d) : i), 
            h.content.length || (e = null)) : (h.href = d || i, h.href || (e = null)), h.group = f.group, 
            void ("image" === e ? f._loadImage() : "ajax" === e ? f._loadAjax() : e ? f._afterLoad() : f._error("type")));
        },
        _error: function(a) {
            c.extend(f.coming, {
                type: "html",
                autoSize: !0,
                minHeight: "0",
                hasError: a,
                content: f.coming.tpl.error
            }), f._afterLoad();
        },
        _loadImage: function() {
            f.imgPreload = new Image(), f.imgPreload.onload = function() {
                this.onload = this.onerror = null, f.coming.width = this.width, f.coming.height = this.height, 
                f._afterLoad();
            }, f.imgPreload.onerror = function() {
                this.onload = this.onerror = null, f._error("image");
            }, f.imgPreload.src = f.coming.href, f.imgPreload.complete || f.showLoading();
        },
        _loadAjax: function() {
            f.showLoading(), f.ajaxLoad = c.ajax(c.extend({}, f.coming.ajax, {
                url: f.coming.href,
                error: function(a, b) {
                    "abort" !== b ? f._error("ajax", a) : f.hideLoading();
                },
                success: function(a, b) {
                    "success" === b && (f.coming.content = a, f._afterLoad());
                }
            }));
        },
        _preload: function() {
            var a = f.group, b = f.current.index, d = function(a) {
                a && f.isImage(a) && (new Image().src = a);
            };
            a.length > 1 && (d(c(a[b + 1] || a[0]).attr("href")), d(c(a[b - 1] || a[a.length - 1]).attr("href")));
        },
        _afterLoad: function() {
            return f.hideLoading(), f.coming && !1 !== f.trigger("afterLoad", f.current) ? (f.isOpened ? (c(".fancybox-item").remove(), 
            f.wrap.stop(!0).removeClass("fancybox-opened"), f.inner.css("overflow", "hidden"), 
            f.transitions[f.current.prevMethod]()) : (c(".fancybox-wrap").stop().trigger("onReset").remove(), 
            f.trigger("afterClose")), f.unbindEvents(), f.isOpen = !1, f.current = f.coming, 
            f.coming = !1, f.wrap = c(f.current.tpl.wrap).addClass("fancybox-tmp " + f.current.wrapCSS).appendTo("body"), 
            f.outer = c(".fancybox-outer", f.wrap).css("padding", f.current.padding + "px"), 
            f.inner = c(".fancybox-inner", f.wrap), f._setContent(), f.trigger("beforeShow"), 
            f._setDimension(), f.wrap.hide().removeClass("fancybox-tmp"), f.bindEvents(), f._preload(), 
            void f.transitions[f.isOpened ? f.current.nextMethod : f.current.openMethod]()) : void (f.coming = !1);
        },
        _setContent: function() {
            var a, b, d = f.current, e = d.type;
            switch (e) {
              case "inline":
              case "ajax":
              case "html":
                a = d.content, "inline" === e && a instanceof c && (a = a.show().detach(), a.parent().hasClass("fancybox-inner") && a.parents(".fancybox-wrap").trigger("onReset").remove(), 
                c(f.wrap).bind("onReset", function() {
                    a.appendTo("body").hide();
                })), d.autoSize && (b = c('<div class="fancybox-tmp"></div>').appendTo(c("body")).append(a), 
                d.width = b.outerWidth(), d.height = b.outerHeight(!0), a = b.contents().detach(), 
                b.remove());
                break;

              case "image":
                a = d.tpl.image.replace("{href}", d.href), d.aspectRatio = !0;
                break;

              case "swf":
                a = d.tpl.swf.replace(/\{width\}/g, d.width).replace(/\{height\}/g, d.height).replace(/\{href\}/g, d.href);
                break;

              case "iframe":
                a = d.tpl.iframe.replace("{href}", d.href).replace("{scrolling}", d.scrolling).replace("{rnd}", new Date().getTime());
            }
            c.inArray(e, [ "image", "swf", "iframe" ]) > -1 && (d.autoSize = !1, d.scrolling = !1), 
            f.inner.append(a);
        },
        _setDimension: function() {
            var a, b, d = f.wrap, e = f.outer, g = f.inner, h = f.current, i = f.getViewport(), j = h.margin, k = 2 * h.padding, l = h.width + k, m = h.height + k, n = h.width / h.height, o = h.maxWidth, p = h.maxHeight, q = h.minWidth, r = h.minHeight;
            if (i.w -= j[1] + j[3], i.h -= j[0] + j[2], l.toString().indexOf("%") > -1 && (l = i.w * parseFloat(l) / 100), 
            m.toString().indexOf("%") > -1 && (m = i.h * parseFloat(m) / 100), h.fitToView && (o = Math.min(i.w, o), 
            p = Math.min(i.h, p)), q = Math.min(l, q), r = Math.min(l, r), o = Math.max(q, o), 
            p = Math.max(r, p), h.aspectRatio ? (l > o && (l = o, m = (l - k) / n + k), m > p && (m = p, 
            l = (m - k) * n + k), q > l && (l = q, m = (l - k) / n + k), r > m && (m = r, l = (m - k) * n + k)) : (l = Math.max(q, Math.min(l, o)), 
            m = Math.max(r, Math.min(m, p))), l = Math.round(l), m = Math.round(m), c(d.add(e).add(g)).width("auto").height("auto"), 
            g.width(l - k).height(m - k), d.width(l), a = d.height(), l > o || a > p) for (;(l > o || a > p) && l > q && a > r; ) m -= 10, 
            h.aspectRatio ? (l = Math.round((m - k) * n + k), q > l && (l = q, m = (l - k) / n + k)) : l -= 10, 
            g.width(l - k).height(m - k), d.width(l), a = d.height();
            h.dim = {
                width: l,
                height: a
            }, h.canGrow = h.autoSize && m > r && p > m, h.canShrink = !1, h.canExpand = !1, 
            l - k < h.width || m - k < h.height ? h.canExpand = !0 : (l > i.w || a > i.h) && l > q && m > r && (h.canShrink = !0), 
            b = a - k, f.innerSpace = b - g.height(), f.outerSpace = b - e.height();
        },
        _getPosition: function(a) {
            var b = f.current, c = f.getViewport(), d = b.margin, e = f.wrap.width() + d[1] + d[3], g = f.wrap.height() + d[0] + d[2], h = {
                position: "absolute",
                top: d[0] + c.y,
                left: d[3] + c.x
            };
            return b.fixed && (!a || a[0] === !1) && g <= c.h && e <= c.w && (h = {
                position: "fixed",
                top: d[0],
                left: d[3]
            }), h.top = Math.ceil(Math.max(h.top, h.top + (c.h - g) * b.topRatio)) + "px", h.left = Math.ceil(Math.max(h.left, h.left + .5 * (c.w - e))) + "px", 
            h;
        },
        _afterZoomIn: function() {
            var a = f.current;
            f.isOpen = f.isOpened = !0, f.wrap.addClass("fancybox-opened").css("overflow", "visible"), 
            f.update(), f.inner.css("overflow", "auto" === a.scrolling ? "auto" : "yes" === a.scrolling ? "scroll" : "hidden"), 
            (a.closeClick || a.nextClick) && f.inner.css("cursor", "pointer").bind("click.fb", a.nextClick ? f.next : f.close), 
            a.closeBtn && c(a.tpl.closeBtn).appendTo(f.wrap).bind("click.fb", f.close), a.arrows && f.group.length > 1 && ((a.loop || a.index > 0) && c(a.tpl.prev).appendTo(f.wrap).bind("click.fb", f.prev), 
            (a.loop || a.index < f.group.length - 1) && c(a.tpl.next).appendTo(f.wrap).bind("click.fb", f.next)), 
            f.trigger("afterShow"), f.opts.autoPlay && !f.player.isActive && (f.opts.autoPlay = !1, 
            f.play());
        },
        _afterZoomOut: function() {
            f.trigger("afterClose"), f.wrap.trigger("onReset").remove(), c.extend(f, {
                group: {},
                opts: {},
                current: null,
                isOpened: !1,
                isOpen: !1,
                wrap: null,
                outer: null,
                inner: null
            });
        }
    }), f.transitions = {
        getOrigPosition: function() {
            var a, b, d = f.current.element, e = {}, g = 50, h = 50;
            return d && d.nodeName && c(d).is(":visible") ? (a = c(d).find("img:first"), a.length ? (e = a.offset(), 
            g = a.outerWidth(), h = a.outerHeight()) : e = c(d).offset()) : (b = f.getViewport(), 
            e.top = b.y + .5 * (b.h - h), e.left = b.x + .5 * (b.w - g)), e = {
                top: Math.ceil(e.top) + "px",
                left: Math.ceil(e.left) + "px",
                width: Math.ceil(g) + "px",
                height: Math.ceil(h) + "px"
            };
        },
        step: function(a, b) {
            var c, d, e;
            ("width" === b.prop || "height" === b.prop) && (d = e = Math.ceil(a - 2 * f.current.padding), 
            "height" === b.prop && (c = (a - b.start) / (b.end - b.start), b.start > b.end && (c = 1 - c), 
            d -= f.innerSpace * c, e -= f.outerSpace * c), f.inner[b.prop](d), f.outer[b.prop](e));
        },
        zoomIn: function() {
            var a, b, d = f.wrap, e = f.current, g = e.dim;
            "elastic" === e.openEffect ? (b = c.extend({}, g, f._getPosition(!0)), delete b.position, 
            a = this.getOrigPosition(), e.openOpacity && (a.opacity = 0, b.opacity = 1), d.css(a).show().animate(b, {
                duration: e.openSpeed,
                easing: e.openEasing,
                step: this.step,
                complete: f._afterZoomIn
            })) : (d.css(c.extend({}, g, f._getPosition())), "fade" === e.openEffect ? d.fadeIn(e.openSpeed, f._afterZoomIn) : (d.show(), 
            f._afterZoomIn()));
        },
        zoomOut: function() {
            var a, b = f.wrap, c = f.current;
            "elastic" === c.closeEffect ? ("fixed" === b.css("position") && b.css(f._getPosition(!0)), 
            a = this.getOrigPosition(), c.closeOpacity && (a.opacity = 0), b.animate(a, {
                duration: c.closeSpeed,
                easing: c.closeEasing,
                step: this.step,
                complete: f._afterZoomOut
            })) : b.fadeOut("fade" === c.closeEffect ? c.closeSpeed : 0, f._afterZoomOut);
        },
        changeIn: function() {
            var a, b = f.wrap, c = f.current;
            "elastic" === c.nextEffect ? (a = f._getPosition(!0), a.opacity = 0, a.top = parseInt(a.top, 10) - 200 + "px", 
            b.css(a).show().animate({
                opacity: 1,
                top: "+=200px"
            }, {
                duration: c.nextSpeed,
                complete: f._afterZoomIn
            })) : (b.css(f._getPosition()), "fade" === c.nextEffect ? b.hide().fadeIn(c.nextSpeed, f._afterZoomIn) : (b.show(), 
            f._afterZoomIn()));
        },
        changeOut: function() {
            var a = f.wrap, b = f.current, d = function() {
                c(this).trigger("onReset").remove();
            };
            a.removeClass("fancybox-opened"), "elastic" === b.prevEffect ? a.animate({
                opacity: 0,
                top: "+=200px"
            }, {
                duration: b.prevSpeed,
                complete: d
            }) : a.fadeOut("fade" === b.prevEffect ? b.prevSpeed : 0, d);
        }
    }, f.helpers.overlay = {
        overlay: null,
        update: function() {
            var a, c, f;
            this.overlay.width(0).height(0), h ? (c = Math.max(b.documentElement.scrollWidth, b.body.scrollWidth), 
            f = Math.max(b.documentElement.offsetWidth, b.body.offsetWidth), a = f > c ? d.width() : c) : a = e.width(), 
            this.overlay.width(a).height(e.height());
        },
        beforeShow: function(a) {
            this.overlay || (this.overlay = c('<div id="fancybox-overlay"></div>').css(a.css || {
                background: "black"
            }).appendTo("body"), this.update(), a.closeClick && this.overlay.bind("click.fb", f.close), 
            d.bind("resize.fb", c.proxy(this.update, this)), this.overlay.fadeTo(a.speedIn || "fast", a.opacity || 1));
        },
        onUpdate: function() {
            this.update();
        },
        afterClose: function(a) {
            this.overlay && this.overlay.fadeOut(a.speedOut || "fast", function() {
                c(this).remove();
            }), this.overlay = null;
        }
    }, f.helpers.title = {
        beforeShow: function(a) {
            var b, d = f.current.title;
            d && (b = c('<div class="fancybox-title fancybox-title-' + a.type + '-wrap">' + d + "</div>").appendTo("body"), 
            "float" === a.type && (b.width(b.width()), b.wrapInner('<span class="child"></span>'), 
            f.current.margin[2] += Math.abs(parseInt(b.css("margin-bottom"), 10))), b.appendTo("over" === a.type ? f.inner : "outside" === a.type ? f.wrap : f.outer));
        }
    }, c.fn.fancybox = function(a) {
        function b(a) {
            var b, e, h = [], i = this.rel;
            a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault(), e = c(this).data("fancybox-group"), 
            "undefined" != typeof e ? b = e ? "data-fancybox-group" : !1 : i && "" !== i && "nofollow" !== i && (e = i, 
            b = "rel"), b && (h = g.length ? c(g).filter("[" + b + '="' + e + '"]') : c("[" + b + '="' + e + '"]')), 
            h.length ? (d.index = h.index(this), f.open(h.get(), d)) : f.open(this, d));
        }
        var d = a || {}, g = this.selector || "";
        return g ? e.undelegate(g, "click.fb-start").delegate(g, "click.fb-start", b) : c(this).unbind("click.fb-start").bind("click.fb-start", b), 
        this;
    };
}(window, document, jQuery);
define("jquery-plugins/plugins/jquery.fancybox", ["css!styles/jquery/plugins/jquery.fancybox"], function(){});

define('project/lib/HighDefLightbox',[ "jquery", "nbd/util/extend", "beff/Component", "jquery-plugins/plugins/jquery.fancybox" ], function(a, b, c) {
    "use strict";
    return c.extend({
        fancyBoxOptions: {
            padding: 0,
            loop: !0,
            nextEffect: "fade",
            prevEffect: "fade",
            title: "",
            helpers: {
                title: {
                    type: "outside"
                }
            }
        },
        init: function(a) {
            this._$context = a;
        },
        bind: function() {
            this._bindFancyBox(), this._setCursorCss();
        },
        _bindFancyBox: function() {
            var c = b({}, {
                afterShow: this.trigger.bind(this, "show"),
                afterClose: this.trigger.bind(this, "hide")
            }, this.fancyBoxOptions);
            this._$context.each(function() {
                var b = a(this);
                b.attr("data-fancybox-group", "gallery").attr("href", b.data("hd-src")).fancybox(c);
            });
        },
        _setCursorCss: function() {
            [ "-moz-zoom-in", "zoom-in", 'url("/assets/img/site/-ie-zoom-in.cur"), pointer, hand' ].forEach(function(a) {
                this._$context.css("cursor", a);
            }, this);
        }
    });
});
define('project/trait/mature',[ "nbd/util/extend", "hgn!templates/html" ], function(a, b) {
    "use strict";
    var c = {
        "restricted-safe": [ {
            label: "Turn off Safe Browsing",
            classes: [ "form-button-default", "form-submit" ]
        }, {
            label: "Cancel",
            classes: [ "form-button-cancel" ]
        } ]
    };
    return {
        mustache: b,
        templateData: function() {
            var b = a({
                classes: [ "mature-blocker", "safe" ]
            }, this._model.data());
            return b.buttons = c[b.access], b;
        },
        rendered: function() {
            this.$view.on("click", ".form-submit", function() {
                this._controller.disableSafeBrowsing().then(this.hide.bind(this)).then(this.destroy.bind(this));
            }.bind(this)).filter(".blocking-div").on("click", function(a) {
                a.stopImmediatePropagation();
            }), this._super();
        }
    };
});
define('project/Controller/MatureContent',[ "be/xhr", "be/Controller/Dialog", "be/View/Dialog/Layover", "be/View/Dialog/Popup", "project/trait/mature" ], function(a, b, c, d, e) {
    "use strict";
    var f = d.extend(e), g = c.extend(e), h = b.extend({
        render: function() {
            this._view && (this._view.render(document.body), this._view.position());
        },
        disableSafeBrowsing: function() {
            return a({
                type: "PATCH",
                url: "/account/safe_browsing_setting",
                data: {
                    safe_browsing_setting: 0
                }
            }).then(function() {
                window.location.reload();
            }, console.error);
        }
    }, {
        VIEW_CLASS: {
            phone: g,
            tablet: f,
            desktop: f
        }
    });
    return h;
});

define("vendor/require/hgn!templates/project/matureLogin", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"mature-message login-modal\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,57,184,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_sign_in_mature|You must log in or sign up for Behance<br class=\"hide-phone\"> to view projects containing adult content.");});c.pop();}t.b("\n" + i);if(t.s(t.f("login",c,p,1),c,p,0,211,222,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<button0",c,p,""));});c.pop();}t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"popup-buttons login-button\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,298,406,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_no_account_signup|Don't Have an Account? <a class=\"js-adobeid-signup signup\">Sign up for Behance</a>");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<button0":{name:"button", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"mature-message login-modal\">\n  {{#translate}}project_sign_in_mature|You must log in or sign up for Behance<br class=\"hide-phone\"> to view projects containing adult content.{{/translate}}\n  {{#login}}{{>button}}{{/login}}\n</div>\n\n<div class=\"popup-buttons login-button\">\n  {{#translate}}project_no_account_signup|Don't Have an Account? <a class=\"js-adobeid-signup signup\">Sign up for Behance</a>{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/Controller/MatureLogin',[ "be/Controller/Dialog", "be/View/Dialog/Layover", "be/View/Dialog/Popup", "vendor/misc/history", "hgn!templates/project/matureLogin" ], function(a, b, c, d, e) {
    "use strict";
    var f = {
        mustache: e,
        hide: function() {
            d.back();
        }
    }, g = c.extend(f), h = b.extend(f), i = a.extend({
        render: function() {
            this._view && (this._view.render(document.body), this._view.position());
        }
    }, {
        VIEW_CLASS: {
            phone: h,
            tablet: g,
            desktop: g
        }
    });
    return i;
});
define('project/lib/mature',[ "be/localization", "project/Controller/MatureContent", "project/Controller/MatureLogin" ], function(a, b, c) {
    "use strict";
    var d = {
        init: function(d, e, f) {
            if (f.mature_content) {
                var g, h, i = {
                    "restricted-geo": a.translate("mature_content_restricted_geo", '<div class="mature-message">Because you live in a country where adult content is illegal you can\'t view this content on Behance.</div>'),
                    "restricted-age": a.translate("mature_content_restricted_age", '<div class="mature-message">Because you are under 18 years old, you can\'t access adult content on Behance.</div>'),
                    "restricted-safe": a.translate("mature_content_restricted_safe", '<div class="mature-message">You currently have Safe Browsing turned on. Would you like to turn off Safe Browsing to view content on Behance that contain adult content?</div>')
                };
                if ("logged-out" === f.mature_access) g = new c({
                    classes: [ "mature-blocker", "log-in" ],
                    title: a.translate("mature_content_log_in", "Log In"),
                    login: {
                        classes: [ "form-button-default", "form-button-large", "js-adobeid-signin" ],
                        label: a.translate("mature_content_log_in", "Log In")
                    }
                }); else {
                    if (h = i[f.mature_access], !h) return;
                    g = new b(d, {
                        title: a.translate("mature_content_restricted_project_title", "This project contains adult content"),
                        html: h,
                        access: f.mature_access
                    });
                }
                g.render(), this.popup = g;
            }
        },
        destroy: function() {
            this.popup && (this.popup.destroy(), this.popup = null);
        }
    };
    return d;
});

define("vendor/require/hgn!templates/lib/_savingSpinner", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"js-spin label-spin\"></div>");t.b("\n" + i);t.b("<span class=\"js-spin-label-saving label-spin-status label-spin-status-saving hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,136,166,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("form_template_saving|Saving...");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("<span class=\"js-spin-label-saved label-spin-status label-spin-status-saved beicons-pre beicons-pre-check-circle hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,320,345,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("form_template_saved|Saved");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("<span class=\"js-spin-label-error label-spin-status label-spin-status-error beicons-pre beicons-pre-x-circle hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,495,558,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("form_template_error_saving|Error saving: please try again later");});c.pop();}t.b("</span>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"js-spin label-spin\"></div>\n<span class=\"js-spin-label-saving label-spin-status label-spin-status-saving hide\">{{#translate}}form_template_saving|Saving...{{/translate}}</span>\n<span class=\"js-spin-label-saved label-spin-status label-spin-status-saved beicons-pre beicons-pre-check-circle hide\">{{#translate}}form_template_saved|Saved{{/translate}}</span>\n<span class=\"js-spin-label-error label-spin-status label-spin-status-error beicons-pre beicons-pre-x-circle hide\">{{#translate}}form_template_error_saving|Error saving: please try again later{{/translate}}</span>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/form/textarea", ["hogan", "vendor/require/hgn!templates/lib/_savingSpinner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-item form-item-textarea");if(t.s(t.f("containerClasses",c,p,1),c,p,0,61,67,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("label",c,p,1),c,p,0,103,204,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<label for=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.t(t.f("label",c,p,0)));if(t.s(t.f("saving_spinner",c,p,1),c,p,0,153,177,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_savingSpinner0",c,p,""));});c.pop();}t.b("</label>");});c.pop();}t.b("\n" + i);t.b("  <textarea id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" name=\"");t.b(t.v(t.f("name",c,p,0)));if(!t.s(t.f("name",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("id",c,p,0)));};t.b("\" class=\"form-textarea");if(t.s(t.f("classes",c,p,1),c,p,0,311,317,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.f("maxlength",c,p,1),c,p,0,349,375,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" maxlength=\"");t.b(t.v(t.f("maxlength",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.f("placeholder",c,p,1),c,p,0,410,440,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" placeholder=\"");t.b(t.v(t.f("placeholder",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.f("autocomplete",c,p,1),c,p,0,478,510,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocomplete=\"");t.b(t.v(t.f("autocomplete",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("    data-validate=\"");t.b(t.v(t.f("validate",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</textarea>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_savingSpinner0":{name:"lib/_savingSpinner", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"form-item form-item-textarea{{#containerClasses}} {{.}}{{/containerClasses}}\">\n  {{#label}}<label for=\"{{id}}\">{{{label}}}{{#saving_spinner}}{{> lib/_savingSpinner}}{{/saving_spinner}}</label>{{/label}}\n  <textarea id=\"{{id}}\" name=\"{{name}}{{^name}}{{id}}{{/name}}\" class=\"form-textarea{{#classes}} {{.}}{{/classes}}\"\n    {{#maxlength}} maxlength=\"{{maxlength}}\"{{/maxlength}}\n    {{#placeholder}} placeholder=\"{{placeholder}}\"{{/placeholder}}\n    {{#autocomplete}} autocomplete=\"{{autocomplete}}\"{{/autocomplete}}\n    data-validate=\"{{validate}}\">{{value}}</textarea>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_savingSpinner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/form/_checkbox", ["hogan", "vendor/require/hgn!templates/lib/_savingSpinner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-item form-item-checkbox");if(t.s(t.f("containerClasses",c,p,1),c,p,0,61,67,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("-container\">");t.b("\n" + i);t.b("  <label for=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"form-label checkbox\">");t.b("\n" + i);t.b("    <input type=\"checkbox\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" name=\"");t.b(t.v(t.f("name",c,p,0)));if(!t.s(t.f("name",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("id",c,p,0)));};t.b("\" class=\"form-checkbox");if(t.s(t.f("classes",c,p,1),c,p,0,275,281,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}if(t.s(t.f("validate",c,p,1),c,p,0,306,329,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" validate[");t.b(t.v(t.f("validate",c,p,0)));t.b("]");});c.pop();}t.b("\" value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\" ");if(t.s(t.f("checked",c,p,1),c,p,0,374,381,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("checked");});c.pop();}if(t.s(t.f("validate",c,p,1),c,p,0,406,435,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" data-validate=\"");t.b(t.v(t.f("validate",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("    <div class=\"checkbox-checkmark\"></div>");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("label",c,p,0)));if(t.s(t.f("saving_spinner",c,p,1),c,p,0,527,551,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_savingSpinner0",c,p,""));});c.pop();}t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_savingSpinner0":{name:"lib/_savingSpinner", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"form-item form-item-checkbox{{#containerClasses}} {{.}}{{/containerClasses}}\" id=\"{{id}}-container\">\n  <label for=\"{{id}}\" class=\"form-label checkbox\">\n    <input type=\"checkbox\" id=\"{{id}}\" name=\"{{name}}{{^name}}{{id}}{{/name}}\" class=\"form-checkbox{{#classes}} {{.}}{{/classes}}{{#validate}} validate[{{validate}}]{{/validate}}\" value=\"{{value}}\" {{#checked}}checked{{/checked}}{{#validate}} data-validate=\"{{validate}}\"{{/validate}}>\n    <div class=\"checkbox-checkmark\"></div>\n    {{{label}}}{{#saving_spinner}}{{> lib/_savingSpinner}}{{/saving_spinner}}\n  </label>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_savingSpinner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/message", ["hogan", "vendor/require/hgn!templates/form/textarea", "vendor/require/hgn!templates/form/_checkbox"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form class=\"send-message js-send-message\">");t.b("\n" + i);if(t.s(t.f("recipient",c,p,1),c,p,0,60,413,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"message-label\">Recipient</div>");t.b("\n" + i);t.b("  <div class=\"recipient\">");t.b("\n" + i);t.b("    <img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\" class=\"recipient-image\">");t.b("\n" + i);t.b("    <div class=\"recipient-info\">");t.b("\n" + i);t.b("      <div class=\"recipient-name\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("      <div class=\"recipient-meta beicons-pre beicons-pre-");t.b(t.v(t.f("icon",c,p,0)));t.b("\">");t.b(t.v(t.f("status",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"message-label\">Message</div>");t.b("\n" + i);});c.pop();}if(t.s(t.f("body",c,p,1),c,p,0,439,458,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/textarea0",c,p,""));});c.pop();}if(t.s(t.f("has_talent_search",c,p,1),c,p,0,492,566,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("job_checkbox",c,p,1),c,p,0,514,546,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/_checkbox1",c,p,"      "));});c.pop();}});c.pop();}t.b("</form>");t.b("\n");return t.fl(); },partials: {"<form/textarea0":{name:"form/textarea", partials: {}, subs: {  }},"<form/_checkbox1":{name:"form/_checkbox", partials: {}, subs: {  }}}, subs: {  }}, "<form class=\"send-message js-send-message\">\n  {{#recipient}}\n  <div class=\"message-label\">Recipient</div>\n  <div class=\"recipient\">\n    <img src=\"{{image}}\" class=\"recipient-image\">\n    <div class=\"recipient-info\">\n      <div class=\"recipient-name\">{{name}}</div>\n      <div class=\"recipient-meta beicons-pre beicons-pre-{{icon}}\">{{status}}</div>\n    </div>\n  </div>\n  <div class=\"message-label\">Message</div>\n  {{/recipient}}\n  {{#body}}{{> form/textarea}}{{/body}}\n  {{#has_talent_search}}\n    {{#job_checkbox}}\n      {{> form/_checkbox}}\n    {{/job_checkbox}}\n  {{/has_talent_search}}\n</form>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "form/textarea": arguments[1].template,"form/_checkbox": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/message',[ "page_config", "nbd/util/extend", "be/form", "be/localization", "lib/showMessages", "hgn!templates/message" ], function(a, b, c, d, e, f) {
    "use strict";
    return {
        mustache: f,
        templateData: function() {
            var c = this._super();
            return b({
                classes: [ "message" ],
                title: d.translate("message_dialog_header_default", "Message"),
                has_talent_search: a.has_talent_search,
                buttons: [ {
                    label: d.translate("message_dialog_button_send", "Send Message"),
                    classes: [ "form-button-default", "form-submit" ]
                } ],
                job_checkbox: {
                    label: d.translate("message_dialog_label_job_opportunity", 'Mark as "Job Opportunity" to recipient'),
                    id: "is_job",
                    name: "is_job",
                    value: 1,
                    containerClasses: [ "cfix" ]
                },
                body: {
                    id: "message",
                    name: "message",
                    placeholder: d.translate("message_dialog_label_placeholder_named", "Your message to ") + c.name,
                    containerClasses: [ "message-body" ],
                    validate: "required,Generic",
                    classes: [ "form-text-normal", "js-body" ]
                }
            }, c);
        },
        show: function() {
            this._super.apply(this, arguments), this._$body && this._$body.focus();
        },
        hide: function() {
            this._super.apply(this, arguments), this._$body && this._$body.val("");
        },
        rendered: function() {
            var a = this;
            this._form = new c(this.$view), this._$body = this.$view.find(".js-body"), this._form.commit = function(b) {
                return a._controller.create(b.data.message, b.data.is_job);
            }, this._form.on("success", function() {
                e(a.$view.find(".js-send-message"), [ {
                    message: d.translate("message_dialog_message_success", "Message Sent"),
                    type: "success"
                } ]), setTimeout(function() {
                    this.showButtons(), a.hide();
                }.bind(this), a._controller.constructor.HIDE_DELAY);
            }), this._super.apply(this, arguments);
        }
    };
});
define('be/Controller/Dialog/Message',[ "jquery", "be/xhr", "be/localization", "be/Controller/Dialog/Roulette", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "be/trait/message" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i, j = "/v2/inbox/threads";
    return i = d.extend({
        create: function(a, c) {
            var d;
            return d = b({
                url: j,
                type: "POST",
                data: {
                    recipients: this._model.get("id"),
                    message: a,
                    is_job: c
                }
            }), d.then(function() {
                this.trigger("sent");
            }.bind(this)), d;
        },
        render: function(b) {
            a(document.body).hasClass("logged-in") && (this.$source = a(b), this._model.set({
                id: this.$source.data("contact_id"),
                name: this.$source.data("contact_name")
            }), this._super(b));
        }
    }, {
        HIDE_DELAY: 1500,
        init: function(a, b) {
            var c = new this(b);
            return c.setContext(a.find(".js-action-message-user")), c;
        },
        VIEW_CLASS: {
            phone: e.extend(h),
            tablet: f.extend(h),
            desktop: g.extend(h).extend({
                templateData: function() {
                    var a = this._super();
                    return a.title = c.translate("message_dialog_header_named", "Send Message to ") + a.name, 
                    a;
                }
            })
        }
    });
});
define('be/moreToggle',[ "jquery" ], function(a) {
    "use strict";
    function b(b, c) {
        c = c || {}, b.each(function() {
            function b() {
                return e.css("height", "auto").removeClass("hide"), {
                    extended: e.height(),
                    "short": d.height()
                };
            }
            var d = a(this), e = d.next(), f = d.find(".variable-text-link, .js-more-toggle-link"), g = e.find(".variable-text-link, .js-more-toggle-link"), h = "speed" in c ? c.speed : 250;
            e.css({
                overflow: "hidden"
            }), f.on("click.be-moretoggle", function() {
                var a = b();
                d.addClass("hide"), e.css("height", a["short"] + "px").animate({
                    height: a.extended + "px"
                }, h);
            }), g.on("click.be-moretoggle", function() {
                e.animate({
                    height: b()["short"] + "px"
                }, h, function() {
                    d.removeClass("hide"), e.addClass("hide");
                });
            });
        });
    }
    return b.off = function(b) {
        b.each(function() {
            var b = a(this), c = b.next(), d = b.find(".variable-text-link, .js-more-toggle-link"), e = c.find(".variable-text-link, .js-more-toggle-link");
            d.off("click.be-moretoggle"), e.off("click.be-moretoggle");
        });
    }, b.init = function(a) {
        b(a.find(".js-more-toggle"));
    }, b.destroy = function(a) {
        b.off(a.find(".js-more-toggle"));
    }, b;
});
define('be/timestampFormatter',[ "jquery", "moment", "beff/Component" ], function(a, b, c) {
    "use strict";
    return c.extend({
        formatter: function(a, b, c) {
            return b.format(c);
        },
        init: function(c, d) {
            var e = this.formatter;
            d = d || "MMMM D, YYYY", c.find(".js-format-timestamp").each(function(c, f) {
                var g = a(f), h = g.data("timestamp"), i = b.unix(h).utc(), j = b().diff(i, "seconds"), k = e(j, i, d);
                k && g.text(k);
            });
        }
    });
});
define('be/dateFormatter',[ "jquery", "moment", "beff/Component" ], function(a, b, c) {
    "use strict";
    return c.extend({
        init: function(c, d) {
            d = d || "l", c.find(".js-format-date").each(function(c, e) {
                var f = a(e), g = b(f.data("date")), h = g.format(d);
                h && f.text(h);
            });
        }
    });
});

define("vendor/require/hgn!templates/project/collection", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form>");t.b("\n" + i);t.b("  <div class=\"form-item form-item-text form-item-conjoined left\">");t.b("\n" + i);t.b("    <input type=\"text\" placeholder=\"");if(t.s(t.f("translate",c,p,1),c,p,0,123,188,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_create_new_collection_placeholder|Create a New Collection");});c.pop();}t.b("\" name=\"collection\" class=\"form-text\">");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"form-item form-item-a form-item-conjoined left\">");t.b("\n" + i);t.b("    <a class=\"form-button form-submit form-button-light-and-grey\">");if(t.s(t.f("translate",c,p,1),c,p,0,393,419,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_add_collection|Add");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <ul id=\"collection_ids\" class=\"divided-list");if(!t.s(t.f("collections",c,p,1),c,p,1,0,0,"")){t.b(" empty");};t.b("\">");t.b("\n" + i);if(t.s(t.f("collections",c,p,1),c,p,0,554,632,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"divided-item collection\" data-key=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("</form>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<form>\n  <div class=\"form-item form-item-text form-item-conjoined left\">\n    <input type=\"text\" placeholder=\"{{#translate}}project_create_new_collection_placeholder|Create a New Collection{{/translate}}\" name=\"collection\" class=\"form-text\">\n  </div>\n  <div class=\"form-item form-item-a form-item-conjoined left\">\n    <a class=\"form-button form-submit form-button-light-and-grey\">{{#translate}}project_add_collection|Add{{/translate}}</a>\n  </div>\n\n  <ul id=\"collection_ids\" class=\"divided-list{{^collections}} empty{{/collections}}\">\n    {{#collections}}\n    <li class=\"divided-item collection\" data-key=\"{{id}}\">{{title}}</li>\n    {{/collections}}\n  </ul>\n</form>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/trait/collection',[ "jquery", "be/localization", "hgn!templates/project/collection", "jquery-plugins/plugins/jquery.changeinput" ], function(a, b, c) {
    "use strict";
    return {
        mustache: c,
        title: "Collections",
        templateData: function() {
            return a.extend({
                classes: [ "list-popup" ],
                title: this.title,
                buttons: [ {
                    label: b.translate("collection_dialog_button_save", "Save"),
                    classes: [ "form-button-default", "collections-save" ]
                } ]
            }, this._model.data());
        },
        rendered: function() {
            this._$saveButton = this.$view.find(".collections-save"), this._super(), this.bindSelections(), 
            this.newCollection(), this.saveCollections();
        },
        saveCollections: function() {
            this.$view.on("click", ".collections-save:not([disabled])", function() {
                this._controller.update(), this.hide(), this._$saveButton.changeInput("disable");
            }.bind(this));
        },
        newCollection: function() {
            var a = this.$view.find("form");
            a.on("submit", function() {
                var b = a.serializeArray(), c = b[0].value;
                return this._controller.create(c).then(function() {
                    this.render(), this.show(), this.position(), this._$saveButton.changeInput("enable");
                }.bind(this)), !1;
            }.bind(this)).on("click", ".form-submit", function() {
                a.submit();
            });
        },
        bindSelections: function() {
            var b = this;
            this._$saveButton.changeInput("disable"), this.select(this._model.get("project_collection_ids")), 
            this.listenTo(this._model, "project_collection_ids", this.select), this.$view.on("click", ".collection", function() {
                var c, d = a(this).data("key"), e = b._model.get("project_collection_ids");
                ~(c = e.indexOf(d)) ? e.splice(c, 1) : e.push(d), b._model.trigger("project_collection_ids", e), 
                b._$saveButton.changeInput("enable");
            });
        },
        select: function(a) {
            return this.$view.find(".collection").removeClass("active"), a && a.forEach(function(a) {
                this.$view.find(".collection[data-key=" + a + "]").addClass("active");
            }, this);
        }
    };
});
define('project/Controller/Collection',[ "moment", "be/xhr", "be/localization", "be/Controller/Dialog/Roulette", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "project/trait/collection" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    return d.extend({
        create: function(c) {
            return b({
                url: "/collection/create",
                type: "POST",
                data: {
                    collection_name: c
                }
            }).then(function(b) {
                var d = b.id, e = +a().format("X");
                if (!d) throw b;
                return {
                    id: d,
                    title: c,
                    owners: [],
                    url: "/collection/" + encodeURIComponent(c) + "/" + d,
                    created_on: e,
                    modified_on: e
                };
            }).then(function(a) {
                return this._model.get("collections").unshift(a), this._model.get("project_collection_ids").unshift(a.id), 
                this.update(), a;
            }.bind(this));
        },
        read: function() {
            var a = b({
                url: "/gallery/collections/" + this._model.id()
            }).then(function(a) {
                if (!a.project_collection_ids) throw a;
                return a.collections.sort(function(b, c) {
                    return a.project_collection_ids.indexOf(+c.id) - a.project_collection_ids.indexOf(+b.id);
                }), a;
            });
            return a.then(this._model.set.bind(this._model)), a;
        },
        update: function() {
            return b({
                url: "/collection/project/" + this._model.id(),
                type: "POST",
                data: {
                    collection_ids: this._model.get("project_collection_ids").join("|")
                }
            });
        },
        render: function() {
            var a = this, b = this._super, c = arguments;
            this.read().then(function() {
                b.apply(a, c);
            }).then(this._view.show.bind(this._view));
        }
    }, {
        init: function(a) {
            var b = a.find(".js-action-collection"), c = b.data("id"), d = new this(c);
            return d.setContext(b), d;
        },
        VIEW_CLASS: {
            phone: e.extend(h),
            tablet: f.extend(h),
            desktop: g.extend(h).mixin({
                title: c.translate("collection_dialog_header", "Add to Collections")
            })
        }
    });
});
define('project/lib/Section',[ "jquery", "beff/Component", "be/Controller/Dialog/Message", "be/follow", "be/moreToggle", "be/timestampFormatter", "be/dateFormatter", "project/Controller/Collection" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    return b.extend({
        init: function(a) {
            this.$context = a;
        },
        bind: function() {
            this._message = c.init(this.$context), this._collection = h.init(this.$context), 
            d.init(this.$context), e.init(this.$context), f.init(this.$context), g.init(this.$context);
        },
        unbind: function() {
            this._message.destroy(), this._collection.destroy(), e.destroy(this.$context);
        }
    });
});
define('be/trait/form/list',[ "jquery" ], function(a) {
    "use strict";
    function b(b, c) {
        var d = a("<select>", {
            name: b[0].id,
            multiple: c || !1
        }).hide();
        return c || a("<option>", {
            selected: !0,
            disabled: !0
        }).appendTo(d), b.children("li").each(function() {
            a("<option>", {
                value: a(this).data("value")
            }).appendTo(d);
        }), d.insertAfter(b), d;
    }
    function c(c, d) {
        return c.each(function() {
            var e = b(a(this).on("click", ">li", function() {
                var b = a(this), f = b.data("value"), g = e.find('[value="' + f + '"]'), h = !g.prop("selected");
                g.prop("selected", h), h = g.prop("selected"), (d ? c.find('[data-value="' + f + '"]') : b.siblings().removeClass("active").end()).toggleClass("active", h);
            }), d);
        }), c;
    }
    return {
        selectList: function(a) {
            return c(a || this.$view.find("ul,ol"), !1);
        },
        multiList: function(a) {
            return c(a || this.$view.find("ul,ol"), !0);
        }
    };
});
define('be/trait/form/toggle',[ "jquery" ], function(a) {
    "use strict";
    function b(b) {
        var c = a("<input>", {
            type: "checkbox",
            name: b[0].id,
            value: "1",
            checked: b.hasClass("active")
        }).hide();
        return c.insertAfter(b), c;
    }
    return {
        toggleElement: function(c) {
            c.each(function(c) {
                var d = b(c = a(this).on("click", function() {
                    var a = !d.prop("checked");
                    d.prop("checked", a).change(), c.toggleClass("active", a);
                }));
            });
        }
    };
});
define('be/trait/form/submit',[ "be/xhr", "jquery", "nbd/trait/promise", "nbd/util/media", "beff/util/validate", "lib/tooltip", "lib/showMessages" ], function(a, b, c, d, e, f, g) {
    "use strict";
    function h(a, b) {
        var c = a[b.name];
        return a[b.name] = c ? [].concat(c, b.value) : b.value, a;
    }
    var i = function(a) {
        var b = {};
        if (Object.keys(a).forEach(function(c) {
            var d = this.find('[name="' + c + '"]').data("validate");
            e(a[c], d) || (b[c] = e.message);
        }, this), Object.keys(b).length) throw b;
        return a;
    };
    return {
        onSubmit: function(b, e, j) {
            e = e || this.$view;
            var k = e.is("form") ? e : e.find("form");
            e.on("click keydown", ".form-submit:not([type=submit])", function(a) {
                switch (a.which) {
                  case 1:
                  case 13:
                  case 32:
                    k.submit();
                }
            }), k.on("submit", function(e) {
                var l = new c(), m = k.serializeArray().reduce(h, {}), n = {
                    url: k.attr("action"),
                    type: k.attr("method") || "POST"
                };
                return e.originalEvent = e.originalEvent || {}, k.find(".form-error").remove(), 
                k.find(".form-item-error").removeClass("form-item-error"), e.originalEvent.promise = (e.isDefaultPrevented() && !k.attr("onsubmit") ? l : l.then(i.bind(k))).then(function(d) {
                    if (n.data = d, "function" != typeof b) return a(n);
                    var e = new c(), f = e.thenable(), g = b.call(f, d);
                    return e.resolve(g === f ? a(n) : g), e;
                }).then(function() {
                    j || k.find(":input").val("").removeAttr("checked selected");
                }, function(a) {
                    var b, c;
                    if (a instanceof Error) return void console.error(a);
                    throw a.responseJSON && (a = a.responseJSON), a.messages && g(k, a.messages), console.warn(a), 
                    b = a.errors || a, c = d.is("desktop") ? [ "form-error" ] : [ "form-error", "form-error-right" ], 
                    Object.keys(b).forEach(function(a) {
                        f(k.find("[name=" + a + "]"), b[a], c);
                    }), a;
                }), l.resolve(m), !1;
            });
        },
        onCancel: function(a) {
            this.$view.on("click", ".form-button-cancel", function() {
                this.$view.find(".form-text, .form-textarea").val(""), "function" == typeof a && a();
            }.bind(this));
        }
    };
});
define('be/trait/form',[ "nbd/util/extend", "be/trait/form/list", "be/trait/form/toggle", "be/trait/form/submit" ], function(a, b, c, d) {
    "use strict";
    return a({}, d, b, c);
});

define("vendor/require/hgn!templates/form/_textInner", ["hogan", "vendor/require/hgn!templates/lib/_savingSpinner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("  ");if(t.s(t.f("label",c,p,1),c,p,0,12,113,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<label for=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.t(t.f("label",c,p,0)));if(t.s(t.f("saving_spinner",c,p,1),c,p,0,62,86,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_savingSpinner0",c,p,""));});c.pop();}t.b("</label>");});c.pop();}t.b("\n" + i);t.b("  <input name=\"");t.b(t.v(t.f("name",c,p,0)));if(!t.s(t.f("name",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("id",c,p,0)));};t.b("\" type=\"");if(t.s(t.f("type",c,p,1),c,p,0,188,196,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("type",c,p,0)));});c.pop();}if(!t.s(t.f("type",c,p,1),c,p,1,0,0,"")){t.b("text");};t.b("\" class=\"");if(!t.s(t.f("unstyled",c,p,1),c,p,1,0,0,"")){t.b("form-text");};if(t.s(t.f("classes",c,p,1),c,p,0,283,289,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b(" validate[");t.b(t.v(t.f("validate",c,p,0)));t.b("]\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");t.b("\n" + i);t.b("  ");if(t.s(t.f("disabled",c,p,1),c,p,0,353,373,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" disabled=\"disabled\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("placeholder",c,p,1),c,p,0,405,437,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" placeholder=\"");t.b(t.t(t.f("placeholder",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("autocomplete",c,p,1),c,p,0,473,505,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocomplete=\"");t.b(t.v(t.f("autocomplete",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("autocapitalize",c,p,1),c,p,0,544,580,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocapitalize=\"");t.b(t.v(t.f("autocapitalize",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("autocorrect",c,p,1),c,p,0,618,648,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocorrect=\"");t.b(t.v(t.f("autocorrect",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("value",c,p,1),c,p,0,677,695,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("maxlength",c,p,1),c,p,0,722,748,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" maxlength=\"");t.b(t.v(t.f("maxlength",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  data-validate=\"");t.b(t.v(t.f("validate",c,p,0)));t.b("\">");t.b("\n");return t.fl(); },partials: {"<lib/_savingSpinner0":{name:"lib/_savingSpinner", partials: {}, subs: {  }}}, subs: {  }}, "  {{#label}}<label for=\"{{id}}\">{{{label}}}{{#saving_spinner}}{{> lib/_savingSpinner}}{{/saving_spinner}}</label>{{/label}}\n  <input name=\"{{name}}{{^name}}{{id}}{{/name}}\" type=\"{{#type}}{{type}}{{/type}}{{^type}}text{{/type}}\" class=\"{{^unstyled}}form-text{{/unstyled}}{{#classes}} {{.}}{{/classes}} validate[{{validate}}]\" id=\"{{id}}\"\n  {{#disabled}} disabled=\"disabled\"{{/disabled}}\n  {{#placeholder}} placeholder=\"{{{placeholder}}}\"{{/placeholder}}\n  {{#autocomplete}} autocomplete=\"{{autocomplete}}\"{{/autocomplete}}\n  {{#autocapitalize}} autocapitalize=\"{{autocapitalize}}\"{{/autocapitalize}}\n  {{#autocorrect}} autocorrect=\"{{autocorrect}}\"{{/autocorrect}}\n  {{#value}} value=\"{{value}}\"{{/value}}\n  {{#maxlength}} maxlength=\"{{maxlength}}\"{{/maxlength}}\n  data-validate=\"{{validate}}\">\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_savingSpinner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/form/text", ["hogan", "vendor/require/hgn!templates/form/_textInner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");if(!t.s(t.f("unstyled",c,p,1),c,p,1,0,0,"")){t.b("form-item form-item-text");};t.b(" be-placeholder");if(t.s(t.f("containerClasses",c,p,1),c,p,0,98,104,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("-container\">");t.b("\n" + i);t.b(t.rp("<form/_textInner0",c,p,"  "));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<form/_textInner0":{name:"form/_textInner", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"{{^unstyled}}form-item form-item-text{{/unstyled}} be-placeholder{{#containerClasses}} {{.}}{{/containerClasses}}\" id=\"{{id}}-container\">\n  {{>form/_textInner}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "form/_textInner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_report", ["hogan", "vendor/require/hgn!templates/form/textarea", "vendor/require/hgn!templates/form/text"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"entity-report\">");t.b("\n" + i);t.b("  <div class=\"header-text\">Report</div>");t.b("\n" + i);t.b("  <form>");t.b("\n" + i);if(t.s(t.f("disclaimer",c,p,1),c,p,0,96,159,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <span class=\"disclaimer-wrap\">");t.b(t.t(t.f("disclaimer",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("options.0",c,p,1),c,p,0,194,376,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <ul id=\"reason\" class=\"divided-list menu-section\">");t.b("\n" + i);if(t.s(t.f("options",c,p,1),c,p,0,268,349,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"divided-item reason\" data-value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("reason",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("    <div class=\"menu-section\">");t.b("\n" + i);if(t.s(t.f("comments",c,p,1),c,p,0,442,461,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/textarea0",c,p,""));});c.pop();}t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"menu-section\">");t.b("\n" + i);if(t.s(t.f("email",c,p,1),c,p,0,534,549,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/text1",c,p,""));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<form/textarea0":{name:"form/textarea", partials: {}, subs: {  }},"<form/text1":{name:"form/text", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"entity-report\">\n  <div class=\"header-text\">Report</div>\n  <form>\n    {{#disclaimer}}\n    <span class=\"disclaimer-wrap\">{{{disclaimer}}}</span>\n    {{/disclaimer}}\n\n    {{#options.0}}\n    <ul id=\"reason\" class=\"divided-list menu-section\">\n      {{#options}}\n      <li class=\"divided-item reason\" data-value=\"{{id}}\">{{reason}}</li>\n      {{/options}}\n    </ul>\n    {{/options.0}}\n\n    <div class=\"menu-section\">\n      {{#comments}}{{> form/textarea}}{{/comments}}\n    </div>\n\n    <div class=\"menu-section\">\n      {{#email}}{{> form/text}}{{/email}}\n    </div>\n  </form>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "form/textarea": arguments[1].template,"form/text": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/report',[ "jquery", "nbd/util/extend", "hgn!templates/lib/_report" ], function(a, b, c) {
    "use strict";
    return {
        mustache: c,
        templateData: function() {
            return b({
                title: "Report",
                classes: [ "report" ],
                buttons: [ {
                    label: "Send",
                    classes: [ "left", "form-button-default", "form-submit" ]
                }, {
                    label: "Cancel",
                    classes: [ "left", "form-button-cancel" ]
                } ],
                comments: {
                    id: "message",
                    placeholder: "Comments",
                    classes: [ "form-text-normal" ]
                }
            }, this._model.data(), a(document.body).hasClass("logged-out") ? {
                email: {
                    id: "email",
                    placeholder: "Email Address",
                    classes: [ "form-text-normal" ]
                }
            } : {});
        },
        rendered: function() {
            this.selectList(), this.onSubmit(function(a) {
                this._controller.create(a).then(this.hide.bind(this));
            }.bind(this)), this.onCancel(), this._super();
        },
        hide: function() {
            this._super.apply(this, arguments), this.$view = null;
        }
    };
});
define('be/Controller/Report',[ "be/xhr", "be/Controller/Dialog/Roulette", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "be/trait/form", "be/trait/report" ], function(a, b, c, d, e, f, g) {
    "use strict";
    return b.extend({
        init: function() {
            this._super.apply(this, arguments), this.path = this._model.get("CONSTANTS").REPORT_URL + this.id;
        },
        create: function(b) {
            return a({
                url: this.path,
                type: "POST",
                data: b
            });
        },
        read: function() {
            var b = a({
                url: this.path
            });
            return b.then(this._model.set.bind(this._model)), b;
        },
        render: function() {
            var a = this, b = this._super, c = arguments;
            this.read().then(function() {
                b.apply(a, c);
            }).then(this._view.show.bind(this._view));
        }
    }, {
        VIEW_CLASS: {
            phone: c.extend(g).mixin(f),
            tablet: d.extend(g).mixin(f),
            desktop: e.extend(g).mixin(f)
        },
        init: function(a) {
            var b = a.find(".js-action-report"), c = b.data("id"), d = b.data("type"), e = "/report/" + d + "/", f = {
                CONSTANTS: {
                    REPORT_URL: e
                }
            }, g = new this(c, f);
            return g.setContext(b), g;
        }
    });
});
define('project/lib/Spam',[ "beff/Component", "be/Controller/Report", "be/spam" ], function(a, b, c) {
    "use strict";
    return a.extend({
        init: function(a) {
            this.$context = a;
        },
        bind: function() {
            this._report = b.init(this.$context), c.delegate(this.$context);
        },
        unbind: function() {
            this._report.destroy(), c.undelegate(this.$context);
        }
    });
});

define("vendor/require/hgn!templates/be/share", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"promote-dialog\">");t.b("\n" + i);t.b("  <div class=\"promote-buttons\">");t.b("\n" + i);t.b("    <h2>Promote Your Work:</h2>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-fb\" data-service=\"facebook\">facebook</div>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-twitter\" data-service=\"twitter\">twitter</div>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-linkedin\" data-service=\"linkedin\">linkedin</div>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-pinterest\" data-service=\"pinterest\">pinterest</div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"promote-url\">");t.b("\n" + i);t.b("    <div class=\"beicons-pre beicons-pre-link js-share-url-icon\"></div>");t.b("\n" + i);t.b("    <input type=\"text\" class=\"form-text form-text-normal js-share-url\" value=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" readonly=\"readonly\" />");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"promote-dialog\">\n  {{!\n  <div class=\"beicons-pre beicons-pre-check-circle\"></div>\n  <h1>Your project was successfully uploaded</h1>\n  }}\n  <div class=\"promote-buttons\">\n    <h2>Promote Your Work:</h2>\n    <div class=\"js-viral-share-buttons ss-social promote-fb\" data-service=\"facebook\">facebook</div>\n    <div class=\"js-viral-share-buttons ss-social promote-twitter\" data-service=\"twitter\">twitter</div>\n    <div class=\"js-viral-share-buttons ss-social promote-linkedin\" data-service=\"linkedin\">linkedin</div>\n    <div class=\"js-viral-share-buttons ss-social promote-pinterest\" data-service=\"pinterest\">pinterest</div>\n  </div>\n  <div class=\"promote-url\">\n    <div class=\"beicons-pre beicons-pre-link js-share-url-icon\"></div>\n    <input type=\"text\" class=\"form-text form-text-normal js-share-url\" value=\"{{url}}\" readonly=\"readonly\" />\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/Controller/Share',[ "jquery", "nbd/util/extend", "be/Controller/Dialog/Roulette", "be/View/Dialog/Popup", "be/window", "vendor/misc/history", "hgn!templates/be/share" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = d.extend({
        mustache: g,
        shareUrl: e.getLocation().href.replace(/\?share=1$/, "").replace(/share=1&?/, ""),
        hide: function() {
            this._super(), f.replaceState(f.getState().data, document.title, e.getLocation("search").replace(/share=1&?/, ""));
        },
        templateData: function() {
            return {
                url: this.shareUrl,
                classes: [ "promote-dialog" ],
                fullBleed: !0
            };
        },
        rendered: function() {
            this._super();
            var b = this.shareUrl, c = encodeURIComponent(this._model.get("text")), d = encodeURIComponent(this._model.get("image")), f = this.$view.find(".js-share-url");
            this.$view.find(".js-viral-share-buttons").each(function() {
                a(this).on("click.beff-util-social", function() {
                    var f = a(this).data("service");
                    switch (f) {
                      case "facebook":
                        e.open("http://www.facebook.com/sharer/sharer.php?u=" + b + "&t=" + c, "", "toolbar=0, status=0, width=900, height=500");
                        break;

                      case "twitter":
                        e.open("https://twitter.com/intent/tweet?text=" + c, "", "toolbar=0, status=0, width=650, height=360");
                        break;

                      case "linkedin":
                        e.open("https://www.linkedin.com/cws/share?url=" + b + "&token=&isFramed=true", "", "toolbar=no,width=550,height=550");
                        break;

                      case "pinterest":
                        e.open("http://pinterest.com/pin/create/button/?url=" + b + "&media=" + d + "&description=" + c, "", "toolbar=no,width=700,height=300");
                    }
                    return !1;
                });
            }), this.$view.find(".js-share-url-icon").on("click", function() {
                f.focus().select();
            }), f.on("click", function() {
                a(this).select();
            });
        }
    });
    return c.extend({}, {
        VIEW_CLASS: {
            desktop: h
        }
    });
});

define("vendor/require/hgn!templates/galleries/unverified", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"unverified-modal-content\">");t.b("\n" + i);t.b("  <div class=\"unverified-message\">");t.b("\n" + i);t.b("    Your project is currently not visible publicly because your account");t.b("\n" + i);t.b("    <br />");t.b("\n" + i);t.b("    is unverified.");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"verify-warning notice-box\">");t.b("\n" + i);t.b("    <p class=\"verify-warning-body\">");t.b("\n" + i);t.b("      Please check your inbox ");if(t.s(t.f("email",c,p,1),c,p,0,304,315,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("(");t.b(t.v(t.f("email",c,p,0)));t.b(")");});c.pop();}t.b(" and verify your email address.");t.b("\n" + i);t.b("      Haven't received a verification email yet?");t.b("\n" + i);t.b("      <br />");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.f("verification_url",c,p,0)));t.b("\">Click here</a>.");t.b("\n" + i);t.b("    </p>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"unverified-modal-content\">\n  <div class=\"unverified-message\">\n    Your project is currently not visible publicly because your account\n    <br />\n    is unverified.\n  </div>\n\n  <div class=\"verify-warning notice-box\">\n    <p class=\"verify-warning-body\">\n      Please check your inbox {{#email}}({{email}}){{/email}} and verify your email address.\n      Haven't received a verification email yet?\n      <br />\n      <a href=\"{{verification_url}}\">Click here</a>.\n    </p>\n  </div>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/lib/startup',[ "jquery", "log", "nbd/util/media", "be/modal/simple", "be/Controller/Share", "hgn!templates/galleries/unverified", "vendor/misc/history" ], function(a, b, c, d, e, f, g) {
    "use strict";
    return b = b.get("project/lib/startup"), {
        _share: function(a) {
            var b = new e({
                text: a.promote.share_text,
                image: a.promote.image
            });
            b.render();
        },
        _fixBackButton: function() {
            var b = window.location.href;
            a(window).on("popstate.project-lib-startup", function(a) {
                if (a.originalEvent) {
                    var c = g.getState();
                    b !== c.url && window.location.replace(c.url);
                }
            });
        },
        destroy: function() {
            a(window).off("popstate.project-lib-startup");
        },
        init: function(a) {
            this._fixBackButton(), a.unverified ? d({
                title: "Your project is private",
                classes: [ "unverified-modal" ],
                html: f({
                    verification_url: a.ADOBE_VERIFY,
                    email: a.email
                })
            }) : a.promote && c.is("desktop") && this._share(a);
        }
    };
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
define('project/lib/StickySidebar',[ "jquery", "nbd/util/extend", "nbd/util/media", "beff/Component", "nav" ], function(a, b, c, d, e) {
    "use strict";
    return d.extend({
        _isStuck: !1,
        init: function(a, b, c, d) {
            this._topPadding = 15, this._$scrollContext = a, this._$sidebar = b, this._$sidebarSpacer = c, 
            this._topSpacing = this._topPadding + (d ? 0 : e.getHeight());
        },
        bind: function() {
            this.on({
                stick: this._stickToggle
            }), a(window).on("resize.project-lib-stickysidebar", function() {
                this._$sidebar.css(this._isStuck ? this._getStuckCss() : this._getUnstuckCss());
            }.bind(this)), this.listenTo(c, {
                "desktop:enter": function() {
                    this._isStuck && this._stickToggle(!0);
                },
                "desktop:exit": function() {
                    this._stickToggle(!1);
                }
            }), this._$scrollContext.on("scroll.project-lib-stickysidebar", this._setState.bind(this)), 
            this._setState();
        },
        _getStuckScrollTop: function() {
            return this._topSpacing + this._$sidebarSpacer.outerHeight();
        },
        _setState: function() {
            var a = this._$scrollContext.scrollTop(), b = a > this._getStuckScrollTop(), d = c.is("desktop");
            b !== this._isStuck && d && this.trigger("stick", b), this._isStuck = b;
        },
        _getStuckCss: function() {
            return {
                position: "fixed",
                top: this._topSpacing,
                left: this._$sidebarSpacer.offset().left,
                width: this._$sidebarSpacer.css("width"),
                display: ""
            };
        },
        _getUnstuckCss: function() {
            return {
                position: "",
                top: "",
                left: "",
                width: "",
                display: ""
            };
        },
        _stickToggle: function(a) {
            a ? this._stick() : this._unstick();
        },
        _stick: function() {
            this._$sidebar.css(this._getStuckCss()).addClass("is-sticky").hide().fadeIn(function() {
                a(this).css("display", "");
            });
        },
        _unstick: function() {
            var b = this._getUnstuckCss();
            this._$sidebar.fadeOut(function() {
                a(this).css(b).removeClass("is-sticky");
            });
        },
        unbind: function() {
            a(window).off("resize.project-lib-stickysidebar"), this._$scrollContext.off("scroll.project-lib-stickysidebar");
        }
    });
});

define("vendor/require/hgn!templates/addToTalentSearch", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form action=\"");t.b(t.v(t.f("action",c,p,0)));t.b("\" method=\"");t.b(t.v(t.f("method",c,p,0)));t.b("\">");t.b("\n" + i);if(t.s(t.d("options.0",c,p,1),c,p,0,63,307,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <ul id=\"searches\" class=\"divided-list menu-section\">");t.b("\n" + i);if(t.s(t.f("options",c,p,1),c,p,0,139,212,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"divided-item\" data-value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("    <div>");t.b("\n" + i);t.b("      or <a href=\"/talent/create\">Post a Job</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("options",c,p,1),c,p,1,0,0,"")){t.b("    <div class=\"no-searches\">");t.b("\n" + i);t.b("      <p>You Don't Have Any Active Jobs</p>");t.b("\n" + i);t.b("      <p><a href=\"/talent/create\">Post a Job &rarr;</a></p>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);};t.b("</form>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<form action=\"{{action}}\" method=\"{{method}}\">\n  {{#options.0}}\n    <ul id=\"searches\" class=\"divided-list menu-section\">\n      {{#options}}\n      <li class=\"divided-item\" data-value=\"{{id}}\">{{title}}</li>\n      {{/options}}\n    </ul>\n    <div>\n      or <a href=\"/talent/create\">Post a Job</a>\n    </div>\n  {{/options.0}}\n  {{^options}}\n    <div class=\"no-searches\">\n      <p>You Don't Have Any Active Jobs</p>\n      <p><a href=\"/talent/create\">Post a Job &rarr;</a></p>\n    </div>\n  {{/options}}\n</form>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Dialog/AddToTalentSearch',[ "nbd/util/extend", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "be/trait/form/list", "be/form", "hgn!templates/addToTalentSearch", "jquery-plugins/plugins/jquery.changeinput" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {
        mustache: g,
        templateData: function() {
            var b = a({
                title: "Save as Candidate",
                classes: [ "list-popup", "add-to-ts-popup" ],
                buttons: [ {
                    label: "Save",
                    classes: [ "form-button-default", "js-submit" ]
                } ]
            }, this._super());
            return b.options.length || (b.buttons = [ {
                label: "Okay",
                classes: [ "form-button-default", "js-close" ]
            } ]), b;
        },
        rendered: function() {
            var a = new f(this.$view), b = this.$view.find(".js-submit");
            this.form = a, a.on("success", function() {
                this.showButtons();
            }), a.commit = function(a) {
                var b, c, d = this._model.preselected(), e = Array.isArray(a.data.searches) ? a.data.searches : [ a.data.searches ];
                return e = e.filter(Boolean).map(Number), b = e.filter(function(a) {
                    return !~d.indexOf(+a);
                }), c = d.filter(function(a) {
                    return !~e.indexOf(a);
                }), this._controller.update({
                    add: b,
                    remove: c
                }).then(function(a) {
                    this._model.data().options.forEach(function(b) {
                        ~a.added.indexOf(b.id) ? b.is_discovered = !0 : ~a.removed.indexOf(b.id) && (b.is_discovered = b.is_shortlisted = b.is_recommended = !1);
                    });
                }.bind(this)).then(this.hide.bind(this)).then(function() {
                    var a = this._model.data(), b = a.options, c = [];
                    b.forEach(function(a) {
                        a.is_discovered && c.push(a.title);
                    }), this._controller.trigger("update", c);
                }.bind(this));
            }.bind(this), this._super(), this.multiList().on("click", function() {
                b.changeInput("enable");
            }), this._model.preselected().forEach(function(a) {
                this.$view.find("li[data-value=" + a + "]").click();
            }, this), b.changeInput("disable");
        }
    };
    return {
        desktop: d.extend(h).mixin(e),
        tablet: c.extend(h).mixin(e),
        phone: b.extend(h).mixin(e)
    };
});
define('be/Controller/Dialog/AddToTalentSearch',[ "be/xhr", "nbd/Model", "be/Controller/Dialog/Roulette", "be/View/Dialog/AddToTalentSearch" ], function(a, b, c, d) {
    "use strict";
    var e = c.extend({
        endpoint: function() {
            return "/v2/jobs/discovered/" + this.id;
        },
        read: function() {
            return a(this.endpoint()).then(function(a) {
                this._model.set("options", a.jobs.sort(function(a, b) {
                    return b.is_discovered + b.is_shortlisted + b.is_recommended - (a.is_discovered + a.is_shortlisted + a.is_recommended);
                }));
            }.bind(this));
        },
        update: function(b) {
            return a({
                url: this.endpoint(),
                type: "PATCH",
                data: b
            });
        },
        render: function(a) {
            var b = this._super.bind(this);
            return this.read().then(function() {
                return a;
            }).then(b);
        }
    }, {
        VIEW_CLASS: d,
        MODEL_CLASS: b.extend({
            preselected: function() {
                return this.get("options").map(function(a) {
                    return a.is_discovered || a.is_shortlisted || a.is_recommended ? a.id : void 0;
                }).filter(Boolean);
            }
        })
    });
    return e;
});

define("vendor/require/hgn!templates/talent/_addedTalentSearchList", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("searches_added_to",c,p,1),c,p,0,22,116,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"ts-added\">");t.b("\n" + i);t.b("      <strong>ADDED TO:</strong> ");t.b(t.v(t.f("searches_added_to",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#searches_added_to}}\n    <div class=\"ts-added\">\n      <strong>ADDED TO:</strong> {{searches_added_to}}\n    </div>\n{{/searches_added_to}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/lib/updateTalent',[ "jquery", "be/Controller/Dialog/AddToTalentSearch", "hgn!templates/talent/_addedTalentSearchList" ], function(a, b, c) {
    "use strict";
    return {
        updateTalent: function(a) {
            var d = a.find(".js-add-talent");
            d.length && (this.talent = new b(d.data("id")), this.talent.setContext(d), this.talent.on("update", function(b) {
                a.find(".js-added-talent-searches").html(c({
                    searches_added_to: b.join(", ")
                }));
            }.bind(this)));
        }
    };
});
define('project/lib/bindings',[ "jquery", "beff/Component", "be/miniprofile", "be/LazyLoadPicture", "be/View/Cover", "project/Controller/Appreciate", "project/lib/CommentSection", "project/lib/DimensionClasses", "project/lib/HighDefLightbox", "project/lib/mature", "project/lib/Section", "project/lib/Spam", "project/lib/startup", "project/lib/StickySidebar", "project/lib/updateTalent", "picturefill" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    "use strict";
    return b.extend({
        init: function(a, b, c, d) {
            this._$context = a, this._$scrollContext = b, this._$project = this._$context.find(".js-project"), 
            this._$projectSidebar = this._$context.find(".js-project-sidebar"), this._isPopup = c, 
            this._config = d || {}, this._data = this._$project.data(), this._projectCoverViews = [];
        },
        bind: function() {
            var a = this._$context.find(".js-project-sidebar-wrap"), b = this._$context.find(".js-project-spam"), e = this._$context.find(".js-picture-lazy"), f = this._$context.find(".js-project-module-image-hd");
            this.updateTalent(this._$projectSidebar), this._bindAppreciate(), this._bindOtherProjectsHover(), 
            this._bindBackToTop(), j.init(this._data.id, "project", this._data), this._lazyPicture = d.init(e, {
                threshold: 600,
                container: this._$scrollContext[0]
            }), this._sectionSidebar = k.init(this._$projectSidebar), this._sectionMain = k.init(this._$project), 
            this._lightbox = i.init(f), this._comments = g.init(this._$project), this._spam = l.init(b), 
            this._stickySidebar = n.init(this._$scrollContext, this._$projectSidebar, a, this._isPopup), 
            this._dimensionClasses = h.init(this._$project, this._$project, "width", {
                "breakpoint-comments": 1259,
                "breakpoint-complete-profile": 634
            }), this._isPopup || (m.init(this._config), c.init(this._$context)), p();
        },
        _bindOtherProjectsHover: function() {
            var b = this;
            this._$context.find(".js-project-cover").each(function() {
                var c = new e(a(this));
                c.rendered(), b._projectCoverViews.push(c);
            });
        },
        _bindBackToTop: function() {
            var b = this._$scrollContext[0] === window ? a("body, html") : this._$scrollContext;
            this._$projectSidebar.find(".js-back-to-top").on("click", function() {
                b.animate({
                    scrollTop: 0
                }, 250).promise().then(function() {
                    this._$scrollContext.trigger("scroll");
                }.bind(this));
            }.bind(this));
        },
        _bindAppreciate: function() {
            var a = this._$context.find(".js-appreciate"), b = this._$context.find(".js-stats-appreciations");
            this._appreciate = new f(this._data.id, a), this._appreciate.render(), this.listenTo(this._appreciate, "appreciate", function() {
                b.text(+b.text() + 1);
            });
        },
        unbind: function() {
            this.talent && this.talent.destroy(), j.destroy(), this._isPopup || (m.destroy(), 
            c.destroy(this._$context)), this._projectCoverViews.forEach(function(a) {
                a.destroy();
            }), this._projectCoverViews = [], this._lightbox.destroy(), this._lazyPicture.destroy(), 
            this._appreciate.destroy(), this._sectionSidebar.destroy(), this._sectionMain.destroy(), 
            this._comments.destroy(), this._spam.destroy(), this._stickySidebar.destroy(), this._dimensionClasses.destroy();
        }
    }).extend(o);
});
require([ "page_config", "jquery", "project/lib/bindings" ], function(a, b, c) {
    "use strict";
    c.init(b(".js-project-wrap"), b(window), !1, a);
});
define("project", function(){});


(function(g) { 
  g._cssWritten = g._cssWritten || []; 
  if (g._cssWritten.indexOf('project') != -1) return; 
  g._cssWritten.push('project');  for (var c in requirejs.s.contexts) { requirejs.s.contexts[c].nextTick = function(f){f()} } 
  require(['css', 'vendor/require/normalize', 'require'], function(css, normalize, req) { 
    var pathname = window.location.pathname.split('/'); 
    pathname.pop(); 
    pathname = pathname.join('/') + '/'; 
    var baseParts = req.toUrl('base_url').split('/'); 
    baseParts.pop(); 
    var baseUrl = baseParts.join('/') + '/'; 
    baseUrl = normalize.convertURIBase(baseUrl, pathname, '/'); 
    if (baseUrl.substr(0, 1) != '/') 
      baseUrl = '/' + baseUrl; 
    css.inject(normalize('.popup.mini-profile:before{width:20px;height:20px;background:#fff;box-shadow:-2px -2px 4px -2px rgba(0,0,0,0.4);content:\'\';position:absolute;z-index:-1;}.popup.mini-profile.top-right:before,.popup.mini-profile.top-left:before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);top:-8px;}.popup.mini-profile.bottom-right:before,.popup.mini-profile.bottom-left:before{-webkit-transform:rotate(-134deg);-moz-transform:rotate(-134deg);-ms-transform:rotate(-134deg);-o-transform:rotate(-134deg);transform:rotate(-134deg);bottom:-8px;}.popup.mini-profile.top-right:before,.popup.mini-profile.bottom-right:before{right:45px;}.popup.mini-profile.top-left:before,.popup.mini-profile.bottom-left:before{left:45px;}.mini-profile-wrap{width:331px;}.mini-profile-wrap .gallery-projects-wrap{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:#fff;border:1px solid #d9d9d9;border-radius:4px;padding:4px 3px 4px 1px;position:relative;text-decoration:none;width:361px;}.mini-profile-wrap .gallery-projects-wrap .gallery-cover-overlay{background:#0088f5;background:-webkit-gradient(linear,0% 0%,0% 100%,from(rgba(0,156,252,0.75)),to(rgba(0,116,238,0.75)));background:-webkit-linear-gradient(0% 0%,0% 100%,from(rgba(0,156,252,0.75)),to(rgba(0,116,238,0.75)));background:-moz-linear-gradient(center top,rgba(0,156,252,0.75),rgba(0,116,238,0.75));background:linear-gradient(rgba(0,156,252,0.75),rgba(0,116,238,0.75));-moz-transition:opacity 0.15s ease-in;-webkit-transition:opacity 0.15s ease-in;transition:opacity 0.15s ease-in;border:1px solid #356bca;border-radius:4px;bottom:0;color:#fff;font-size:16px;left:0;opacity:0;position:absolute;right:0;text-align:center;text-decoration:none !important;text-shadow:1px 2px 0 #0a4fb9;text-transform:uppercase;top:0;}.ie .mini-profile-wrap .gallery-projects-wrap .gallery-cover-overlay{display:none;font-weight:bold;}.mini-profile-wrap .gallery-projects-wrap:hover .gallery-cover-overlay{opacity:1;}.ie .mini-profile-wrap .gallery-projects-wrap:hover .gallery-cover-overlay{background:rgba(0,156,252,0.75);display:block;}.mini-profile-wrap .gallery-projects-wrap .gallery-cover-overlay-text{-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-webkit-transform:translateY(-50%);transform:translateY(-50%);position:absolute;top:50%;width:100%;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:#f3f3f3;border-left:3px solid #fff;float:left;height:90px;overflow:hidden;width:33.3%;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap .project-cover{border-radius:0;box-shadow:none;margin:0;vertical-align:top;visibility:visible;width:100%;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap.empty .project-cover{display:none;}.mini-profile-wrap .gallery-projects-wrap-4{width:479px;}.mini-profile-wrap .gallery-projects-wrap-4 .project-cover-wrap{width:25%;}.mini-profile-wrap .gallery-projects-wrap-4 .project-cover-wrap:nth-child(n+5){display:none;}.mini-profile-wrap .gallery-projects-wrap-2{width:242px;}.mini-profile-wrap .gallery-projects-wrap-2 .project-cover-wrap{width:50%;}.mini-profile-wrap .gallery-projects-wrap-2 .project-cover-wrap:nth-child(n+3){display:none;}.mini-profile-wrap .user-image-wrap,.mini-profile-wrap .user-image{width:35px;height:35px;}.mini-profile-wrap .user-image-wrap{background:#f3f3f3;display:block;float:left;margin:0 10px 0 0;padding:0;}.mini-profile-wrap .user-info{display:inline-block;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.mini-profile-wrap .user-name{color:#3c3c3c;display:block;font-size:14px;padding-bottom:3px;}.mini-profile-wrap .location-link{color:#6f6f6f;font-size:13px;}.mini-profile-wrap .location-link:before{margin-right:3px;}.mini-profile-wrap .follow-button-container{float:right;width:auto !important;}.mini-profile-wrap .gallery-projects-wrap{float:left;margin:0 0 10px;width:331px;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap{display:block !important;height:82px;width:108px;}.mini-profile-wrap .user-stats-followed{float:inherit;}.mini-profile-wrap .user-info-container{display:inline-block;}.mini-profile-wrap .stats-wrap{color:#adadad;font-size:13px;font-weight:bold;margin-bottom:-2px;}.mini-profile-wrap .cover-stat{margin-right:10px;}.mini-profile-wrap .cover-stat:before{margin-right:2px;}.fancybox-tmp iframe,.fancybox-tmp object{vertical-align:top;padding:0;margin:0;}.fancybox-wrap{position:absolute;top:0;left:0;z-index:1002;}.fancybox-outer{padding:0;margin:0;background:#f9f9f9;color:#444;text-shadow:none;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}.fancybox-opened{z-index:1003;}.fancybox-opened .fancybox-outer{-webkit-box-shadow:0 10px 25px rgba(0,0,0,0.5);-moz-box-shadow:0 10px 25px rgba(0,0,0,0.5);box-shadow:0 10px 25px rgba(0,0,0,0.5);}.fancybox-inner{width:100%;height:100%;padding:0;margin:0;position:relative;outline:none;overflow:hidden;}.fancybox-error{color:#444;font:14px/20px \"Helvetica Neue\",Helvetica,Arial,sans-serif;margin:0;padding:10px;}.fancybox-image,.fancybox-iframe{display:block;width:100%;height:100%;border:0;padding:0;margin:0;vertical-align:top;}.fancybox-image{max-width:100%;max-height:100%;}#fancybox-loading{position:fixed;top:50%;left:50%;margin-top:-21px;margin-left:-21px;width:42px;height:42px;background:url(\'//a3.behance.net/img/jquery/plugins/fancybox/loading.gif?cb=1200346997\');opacity:0.8;cursor:pointer;z-index:1010;}.fancybox-close,.fancybox-prev span,.fancybox-next span{background-image:url(\'//a3.behance.net/img/jquery/plugins/fancybox/sprite.png?cb=1200346997\');}.fancybox-close{position:absolute;top:-18px;right:-18px;width:36px;height:36px;cursor:pointer;z-index:1004;}.fancybox-prev,.fancybox-next{position:absolute;top:0;width:40%;height:100%;cursor:pointer;background:transparent url(\'//a3.behance.net/img/jquery/blank.gif?cb=1200346997\');z-index:1003;}.fancybox-prev{left:0;}.fancybox-next{right:0;}.fancybox-prev span,.fancybox-next span{position:absolute;top:50%;left:-9999px;width:36px;height:36px;margin-top:-18px;cursor:pointer;z-index:1003;}.fancybox-prev span{background-position:0 -36px;}.fancybox-next span{background-position:0 -72px;}.fancybox-prev:hover,.fancybox-next:hover{visibility:visible;}.fancybox-prev:hover span{left:20px;}.fancybox-next:hover span{left:auto;right:20px;}.fancybox-tmp{position:absolute;top:-9999px;left:-9999px;padding:0;overflow:visible;visibility:hidden;}#fancybox-overlay{position:absolute;top:0;left:0;overflow:hidden;display:none;z-index:1001;background:#000;}.fancybox-title{visibility:hidden;font:normal 13px/20px \"Helvetica Neue\",Helvetica,Arial,sans-serif;position:relative;text-shadow:none;z-index:1005;}.fancybox-opened .fancybox-title{visibility:visible;}.fancybox-title-float-wrap{position:absolute;bottom:0;right:50%;margin-bottom:-35px;z-index:1003;text-align:center;}.fancybox-title-float-wrap .child{display:inline-block;margin-right:-100%;padding:2px 20px;background:transparent;background:rgba(0,0,0,0.8);-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px;text-shadow:0 1px 2px #222;color:#FFF;font-weight:bold;line-height:24px;white-space:nowrap;}.fancybox-title-outside-wrap{position:relative;margin-top:10px;color:#fff;}.fancybox-title-inside-wrap{margin-top:10px;}.fancybox-title-over-wrap{position:absolute;bottom:0;left:0;color:#fff;padding:10px;background:#000;background:rgba(0,0,0,.8);}', baseUrl, pathname)); 
  }); 
  for (var c in requirejs.s.contexts) { requirejs.s.contexts[c].nextTick = requirejs.nextTick; } 
})(this);