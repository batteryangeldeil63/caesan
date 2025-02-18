webshims.register("form-validation", function(a, b, c, d, e, f) {
    "use strict";

    function g(a) {
        return a.name
    }

    function h() {
        if (!a.data(this, "wsCustomFile")) {
            var b = Array.prototype.map,
                c = a(this),
                d = a('input[type="file"]', c),
                e = a(".ws-file-value", c),
                f = a.trim(e.html()) || "&#160;",
                h = function() {
                    var a = d.prop("files") || [],
                        c = b.call(a, g).join(", ") || d.val();
                    c ? e.text(c) : e.html(f)
                };
            a.data(this, "wsCustomFile", {
                showSelected: h
            }), a("button", c).attr("tabindex", "-1"), d.on("change.webshim", h).each(h).jProp("form").on("reset", function() {
                setTimeout(h)
            }), n && a('<div class="ws-coverfile" />').insertAfter(d).on("click.webshim", function(a) {
                a.stopImmediatePropagation(), d.trigger("click")
            })
        }
    }
    var i = "webkitURL" in c,
        j = b.support,
        k = j.formvalidation && !b.bugs.bustedValidity,
        l = i && k,
        m = navigator.userAgent,
        n = -1 != m.indexOf("MSIE"),
        o = l && parseFloat((m.match(/Safari\/([\d\.]+)/) || ["", "999999"])[1], 10),
        p = f.iVal,
        q = p.errorClass || (p.errorClass = "user-error"),
        r = p.successClass || (p.successClass = "user-success"),
        s = "." + r + ", ." + q,
        t = p.errorWrapperClass || (p.errorWrapperClass = "ws-invalid"),
        u = p.successWrapperClass || (p.successWrapperClass = "ws-success"),
        v = p.errorBoxClass || (p.errorBoxClass = "ws-errorbox"),
        w = p.errorMessageClass || (p.errorMessageClass = "ws-errormessage"),
        x = p.errorBoxWrapper || (p.errorBoxWrapper = "div"),
        y = p.errorMessageWrapper || (p.errorMessageWrapper = "p"),
        z = {
            checkbox: 1,
            radio: 1
        },
        A = b.loader,
        B = A.addModule,
        C = a([]),
        D = function() {
            return !a.prop(this, "form")
        },
        E = b.modules["form-core"].getGroupElements || function(b) {
            b = a(b);
            var c, e, f = C;
            return "radio" == b[0].type && (e = b.prop("form"), c = b[0].name, f = c ? e ? a(e).jProp(c) : a(d.getElementsByName(c)).filter(D) : b, f = f.filter('[type="radio"]')), f
        },
        F = function(b, c) {
            var d;
            return a.each(b, function(b, e) {
                return e ? (d = b + a.prop(c, "validationMessage"), !1) : void 0
            }), d
        },
        G = function(a) {
            var b;
            try {
                b = d.activeElement.name === a
            } catch (c) {}
            return b
        },
        H = {
            radio: 1,
            checkbox: 1,
            "select-one": 1,
            "select-multiple": 1,
            file: 1,
            date: 1,
            month: 1,
            week: 1,
            text: 1
        },
        I = {
            time: 1,
            date: 1,
            month: 1,
            datetime: 1,
            week: 1,
            "datetime-local": 1
        },
        J = {
            refreshvalidityui: 1,
            updatevalidation: 1
        },
        K = "." + p.errorClass + ", ." + p.successClass,
        L = function(c) {
            if (p.sel) {
                var d, e, f, g;
                if (c.target && (d = a(c.target).getNativeElement()[0], f = a(d).getShadowElement(), "submit" != d.type && a.prop(d, "willValidate") && ("change" != c.type || !(g = f.prop("type")) || H[g]))) {
                    e = a.data(d, "webshimsswitchvalidityclass");
                    var h = function() {
                        if (g || (g = f.prop("type")), !(l && ("change" == c.type || 537.36 > o) && I[g] && a.find.matchesSelector(c.target, ":focus") || "focusout" == c.type && "radio" == d.type && G(d.name))) {
                            if (b.refreshCustomValidityRules && "async" == b.refreshCustomValidityRules(d)) return void a(d).one("updatevalidation.webshims", L);
                            var e, h, i, j, k, m = a.prop(d, "validity");
                            m.valid ? f.hasClass(r) || (e = r, h = q, j = "changedvaliditystate", i = "changedvalid", z[d.type] && d.checked && E(d).not(d).removeClass(h).addClass(e).removeAttr("aria-invalid"), f.removeAttr("aria-invalid"), a.removeData(d, "webshimsinvalidcause")) : (k = F(m, d), a.data(d, "webshimsinvalidcause") != k && (a.data(d, "webshimsinvalidcause", k), j = "changedvaliditystate"), f.hasClass(q) || (e = q, h = r, z[d.type] && !d.checked && E(d).not(d).removeClass(h).addClass(e).attr("aria-invalid", "true"), f.attr("aria-invalid", "true"), i = "changedinvalid")), e && (f.addClass(e).removeClass(h), setTimeout(function() {
                                a(d).trigger(i)
                            })), j && setTimeout(function() {
                                a(d).trigger(j)
                            }), a.removeData(d, "webshimsswitchvalidityclass")
                        }
                    };
                    f.triggerHandler("wsallowinstantvalidation", [c]) !== !1 && (e && clearTimeout(e), J[c.type] ? ("refreshvalidityui" == c.type && b.error("refreshvalidityui was renamed to updatevalidation"), h()) : a.data(d, "webshimsswitchvalidityclass", setTimeout(h)))
                }
            }
        },
        M = function() {
            b.errorbox.reset(this)
        };
    "validityUIEvents" in f && (b.error("validityUIEvents was renamed to iVal.events"), p.events = f.validityUIEvents), p.events = "events" in p ? p.events || "" : "focusout change", p.events && (p.events += " "), p.fieldWrapper || (p.fieldWrapper = ":not(span):not(label):not(em):not(strong):not(p):not(.ws-custom-file)"), b.modules["form-core"].getGroupElements || (b.modules["form-core"].getGroupElements = E), a(d.body || "html").on(p.events + "refreshvalidityui updatevalidation.webshims invalid", L).on("refreshvalidationui.webshims", function(b) {
        a(b.target).getShadowElement().is(s) && L({
            type: "updatevalidation",
            target: b.target
        })
    }).on("reset resetvalidation.webshims resetvalui", function(c) {
        var d, e = a(c.target);
        "resetvalui" == c.type && b.error("resetvalui was renamed to resetvalidation"), e.is("form, fieldset") && ("form" == e[0].nodeName.toLowerCase() && (d = !e.is(p.sel)), e = e.jProp("elements")), e = e.filter(K).removeAttr("aria-invalid").removeClass(p.errorClass + " " + p.successClass).getNativeElement().each(function() {
            a.removeData(this, "webshimsinvalidcause")
        }), d || (d === !1 ? e.each(M) : e.trigger("resetvalidityui.webshims"))
    });
    var N = function() {
            b.scrollRoot = a(i || "BackCompat" == d.compatMode ? d.body : d.documentElement)
        },
        O = "transitionDelay" in d.documentElement.style,
        P = {
            display: "inline-block",
            left: 0,
            top: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
        },
        Q = {
            slide: {
                show: "slideDown",
                hide: "slideUp"
            },
            fade: {
                show: "fadeIn",
                hide: "fadeOut"
            },
            no: {
                show: "show",
                hide: "hide"
            }
        };
    N(), b.ready("DOM", N);
    var R = /right|left/g,
        S = function(a) {
            return "left" == a ? "right" : "left"
        };
    b.getRelOffset = function(b, c, d) {
        var e, f;
        return b = a(b), a.swap(b[0], P, function() {
            var g;
            a.position && d && a.position.getScrollInfo ? (d.of || (d.of = c), g = "rtl" == a(d.of).css("direction"), d.isRtl || (d.isRtl = !1), d.isRtl != g && (d.my = (d.my || "center").replace(R, S), d.at = (d.at || "center").replace(R, S), d.isRtl = g), b[d.isRtl ? "addClass" : "removeClass"]("ws-is-rtl"), d.using = function(a, c) {
                b.attr({
                    "data-horizontal": c.horizontal,
                    "data-vertical": c.vertical
                }), e = a
            }, b.attr({
                "data-horizontal": "",
                "data-vertical": "",
                "data-my": d.my,
                "data-at": d.at
            }), b.position(d)) : (e = a(c).offset(), f = b.offset(), e.top -= f.top, e.left -= f.left, e.top += c.outerHeight())
        }), e
    }, a.extend(b.wsPopover, {
        isInElement: function(b, c) {
            a.isArray(b) || (b = [b]);
            var d, e, f, g = !1;
            for (d = 0, e = b.length; e > d; d++)
                if (f = b[d], f && f.jquery && (f = f[0]), f && (f == c || a.contains(f, c))) {
                    g = !0;
                    break
                }
            return g
        },
        show: function(e) {
            var f;
            if (!this.isVisible) {
                var g = a.Event("wspopoverbeforeshow");
                if (this.element.trigger(g), !g.isDefaultPrevented()) {
                    this.isVisible = !0, !this._shadowAdded && b.shadowClass && (this.element.addClass(b.shadowClass), this._shadowAdded = !0), e = a(e || this.options.prepareFor).getNativeElement();
                    var h = this,
                        i = function(a) {
                            !h.options.hideOnBlur || h.stopBlur || h.isInElement([h.lastElement[0], e[0], h.element[0]], a.target) || h.hide()
                        },
                        j = a(e).getShadowElement(),
                        k = function(a) {
                            clearTimeout(h.timers.repos), h.timers.repos = setTimeout(function() {
                                h.position(j)
                            }, a && "pospopover" == a.type ? 4 : 200)
                        };
                    this.clear(), this.element.css("display", "none"), this.prepareFor(e, j), this.position(j), this.options.inline ? (f = (Q[this.options.inline] || Q.slide).show, h.element[f]().trigger("wspopovershow")) : (this.element.removeClass("ws-po-visible"), h.timers.show = setTimeout(function() {
                        h.element.css("display", ""), h.timers.show = setTimeout(function() {
                            h.element.addClass("ws-po-visible").trigger("wspopovershow")
                        }, 14)
                    }, 4)), a(d.body).on("focusin" + this.eventns + " mousedown" + this.eventns, i).children(":not(script), :not(iframe), :not(noscript)").on("mousedown" + this.eventns, i), this.element.off("pospopover").on("pospopover", k), a(c).on("resize" + this.eventns + " pospopover" + this.eventns, k)
                }
            }
        },
        _getAutoAppendElement: function() {
            var b = /^(?:span|i|label|b|p|tr|thead|tbody|table|strong|em|ul|ol|dl|html)$/i;
            return function(c) {
                for (var e, f = c[0], g = d.body;
                    (f = f[e ? "offsetParent" : "parentNode"]) && 1 == f.nodeType && f != g;) e || b.test(f.nodeName) || (e = f), e && "hidden" == a.css(f, "overflow") && "static" != a.css(f, "position") && (e = !1);
                return a(e || g)
            }
        }(),
        prepareFor: function(b, c) {
            var d, e, f = this,
                g = {},
                h = a.extend(!0, {}, this.options, b.jProp("form").data("wspopover") || {}, b.data("wspopover"));
            this.lastOpts = h, this.lastElement = a(b).getShadowFocusElement(), this.prepared && this.options.prepareFor || (e = "element" == h.appendTo || h.inline && "auto" == h.appendTo ? c.parent() : "auto" == h.appendTo ? this._getAutoAppendElement(c) : a(h.appendTo), this.prepared && e[0] == this.element[0].parentNode || this.element.appendTo(e)), this.element.attr({
                "data-class": b.prop("className"),
                "data-id": b.prop("id")
            }), h.constrainWidth ? (this.element.addClass("ws-popover-constrained-width"), g.minWidth = c.outerWidth()) : (this.element.removeClass("ws-popover-constrained-width"), g.minWidth = ""), h.inline ? this.element.addClass("ws-popinline ws-po-visible") : this.element.removeClass("ws-popinline"), this.element.css(g), h.hideOnBlur && (d = function(a) {
                f.stopBlur ? a.stopImmediatePropagation() : f.hide()
            }, f.timers.bindBlur = setTimeout(function() {
                f.lastElement.off(f.eventns).on("focusout" + f.eventns + " blur" + f.eventns, d), f.lastElement.getNativeElement().off(f.eventns)
            }, 10)), this.prepared = !0
        },
        clear: function() {
            a(c).off(this.eventns), a(d).off(this.eventns), a(d.body).off(this.eventns).children(":not(script), :not(iframe), :not(noscript)").off(this.eventns), this.element.off("transitionend" + this.eventns), this.stopBlur = !1, this.lastOpts = !1, a.each(this.timers, function(a, b) {
                clearTimeout(b)
            })
        },
        hide: function() {
            var b, d = a.Event("wspopoverbeforehide");
            if (this.element.trigger(d), !d.isDefaultPrevented() && this.isVisible) {
                this.isVisible = !1;
                var e = this,
                    f = function(b) {
                        b && "transitionend" == b.type && (b = b.originalEvent) && b.target == e.element[0] && "hidden" == e.element.css("visibility") || (e.element.off("transitionend" + e.eventns).css("display", "none").attr({
                            "data-id": "",
                            "data-class": "",
                            hidden: "hidden"
                        }), clearTimeout(e.timers.forcehide), a(c).off("resize" + e.eventns))
                    };
                this.clear(), this.options.inline ? (b = (Q[this.options.inline] || Q.slide).hide, this.element[b]()) : (this.element.removeClass("ws-po-visible"), a(c).on("resize" + this.eventns, f), O && this.element.off("transitionend" + this.eventns).on("transitionend" + this.eventns, f), e.timers.forcehide = setTimeout(f, O ? 600 : 40)), this.element.trigger("wspopoverhide")
            }
        },
        position: function(a) {
            var c, d = this.lastOpts || this.options;
            d.inline || (c = b.getRelOffset(this.element.removeAttr("hidden"), a, (this.lastOpts || this.options).position), this.element.css(c))
        }
    }), b.validityAlert = function() {
        f.messagePopover.position = a.extend({}, {
            at: "left bottom",
            my: "left top",
            collision: "none"
        }, f.messagePopover.position || {});
        var c = b.objectCreate(b.wsPopover, e, f.messagePopover),
            d = c.hide.bind(c);
        return c.element.addClass("validity-alert").attr({
            role: "alert"
        }), a.extend(c, {
            hideDelay: 5e3,
            showFor: function(b, c, e, f) {
                b = a(b).getNativeElement(), this.clear(), this.hide(), f || (this.getMessage(b, c), this.show(b), this.hideDelay && (this.timers.delayedHide = setTimeout(d, this.hideDelay))), e || this.setFocus(b)
            },
            setFocus: function(d) {
                var e = a(d).getShadowFocusElement(),
                    g = b.scrollRoot.scrollTop() + (f.viewportOffset || 0),
                    h = e.offset().top - (f.scrollOffset || 30),
                    i = function() {
                        try {
                            e[0].focus()
                        } catch (a) {}
                        e[0].offsetWidth || e[0].offsetHeight || b.warn("invalid element seems to be hidden. Make element either visible or use disabled/readonly to bar elements from validation. With fieldset[disabled] a group of elements can be ignored! In case of select replacement see shims/form-combat.js to fix issue."), c.element.triggerHandler("pospopover")
                    };
                g > h ? b.scrollRoot.animate({
                    scrollTop: h - 5 - (f.viewportOffset || 0)
                }, {
                    queue: !1,
                    duration: Math.max(Math.min(600, 1.5 * (g - h)), 80),
                    complete: i
                }) : i()
            },
            getMessage: function(a, b) {
                b || (b = a.getErrorMessage()), b ? c.contentElement.html(b) : this.hide()
            }
        }), c
    }(), p.fx && Q[p.fx] || (p.fx = "slide"), a.fn[Q[p.fx].show] || (p.fx = "no");
    var T = 0;
    b.errorbox = {
            create: function(b, c) {
                c || (c = this.getFieldWrapper(b));
                var d = a("." + v, c);
                return d.length || (d = a("<" + x + ' class="' + v + '" hidden="hidden" style="display: none;">'), c.append(d)), d.prop("id") || (T++, d.prop("id", "errorbox-" + T)), c.data("errorbox", d), d
            },
            getFieldWrapper: function(c) {
                var d;
                return d = "function" == typeof p.fieldWrapper ? p.fieldWrapper.apply(this, arguments) : a(c).parent().closest(p.fieldWrapper), d.length || b.error("could not find fieldwrapper: " + p.fieldWrapper), d
            },
            _createContentMessage: function() {
                var c = function() {
                    return !c.types[this.type]
                };
                c.types = {
                    hidden: 1,
                    image: 1,
                    button: 1,
                    reset: 1,
                    submit: 1
                };
                var d = {},
                    e = function(a) {
                        return "-" + a.toLowerCase()
                    },
                    f = function(b) {
                        var c = a(b).data("errortype");
                        return c || a.each(d, function(d, e) {
                            return a.find.matchesSelector(b, e) ? (c = d, !1) : void 0
                        }), c || "defaultMessage"
                    };
                return a.each(["customError", "badInput", "typeMismatch", "rangeUnderflow", "rangeOverflow", "stepMismatch", "tooLong", "tooShort", "patternMismatch", "valueMissing"], function(a, b) {
                        var c = b.replace(/[A-Z]/, e);
                        d[b] = "." + c + ", ." + b + ", ." + b.toLowerCase() + ', [data-errortype="' + b + '"]'
                    }),
                    function(d, e, g) {
                        var h = !1,
                            i = {};
                        a(e).children().each(function() {
                            var b = f(this);
                            i[b] = a(this).html()
                        }), a("input, select, textarea", g).filter(c).each(function(c, d) {
                            var e = a(d).data("errormessage") || {};
                            "string" == typeof e && (e = {
                                defaultMessage: e
                            }), a.each(i, function(a, b) {
                                e[a] || (h = !0, e[a] = b)
                            }), h && a(d).data("errormessage", e), b.getOptions && b.getOptions(d, "errormessage", !1, !0)
                        })
                    }
            }(),
            initIvalContentMessage: function(b) {
                var c;
                p.sel && (c = a.prop(b, "form")) && a.find.matchesSelector(c, p.sel) && this.get(b)
            },
            get: function(b, c) {
                c || (c = this.getFieldWrapper(b));
                var d, e = c.data("errorbox");
                return "object" != (d = typeof e) && (e ? "string" == d && (e = a("#" + e), c.data("errorbox", e, c)) : e = this.create(b, c), this._createContentMessage(b, e, c)), e
            },
            addSuccess: function(b, c) {
                var d = a.prop(b, "type"),
                    e = function() {
                        var e = z[d] ? a.prop(b, "checked") : a(b).val();
                        c[e ? "addClass" : "removeClass"](u)
                    },
                    f = H[d] ? "change" : "blur";
                a(b).off(".recheckvalid").on(f + ".recheckinvalid", e), e()
            },
            hideError: function(b, c) {
                var d, e, f, g = this.getFieldWrapper(b);
                return g.hasClass(t) && (a(b).filter("input").off(".recheckinvalid"), !c && (d = a("input:invalid, select:invalid, textarea:invalid", g)[0]) ? a(d).trigger("updatevalidation.webshims") : (e = this.get(b, g), g.removeClass(t), e.message = "", f = function() {
                    this.id == b.getAttribute("aria-describedby") && b.removeAttribute("aria-describedby"), a(this).attr({
                        hidden: "hidden"
                    })
                }, "no" != p.fx ? e[Q[p.fx].hide](f) : e[Q[p.fx].hide]().each(f))), c || d || this.addSuccess(b, g), g
            },
            recheckInvalidInput: function(b) {
                if (p.recheckDelay && p.recheckDelay > 90) {
                    var c, d = function() {
                        L({
                            type: "input",
                            target: b
                        })
                    };
                    a(b).filter('input:not([type="checkbox"]):not([type="radio"]), textarea').off(".recheckinvalid").on("input.recheckinvalid", function() {
                        clearTimeout(c), c = setTimeout(d, p.recheckDelay)
                    }).on("focusout.recheckinvalid", function() {
                        clearTimeout(c)
                    })
                }
            },
            showError: function(b) {
                var c = this.getFieldWrapper(b),
                    d = this.get(b, c),
                    e = a(b).getErrorMessage();
                return d.message != e && (d.stop && d.stop(!0, !0), d.html("<" + y + ' class="' + w + '">' + e + "</" + y + ">"), d.message = e, c.addClass(t).removeClass(u), this.recheckInvalidInput(b), (d.is("[hidden]") || "none" == d.css("display")) && (b.getAttribute("aria-describedby") || b.setAttribute("aria-describedby", d.prop("id")), d.css({
                    display: "none"
                }).removeAttr("hidden")[Q[p.fx].show]())), c.removeClass(u), a(b).off(".recheckvalid"), c
            },
            reset: function(a) {
                this.hideError(a, !0).removeClass(u)
            },
            toggle: function(b) {
                a.find.matchesSelector(b, ":invalid") ? this.showError(b) : this.hideError(b)
            }
        }, a(d.body).on({
            changedvaliditystate: function(c) {
                var d;
                p.sel && (d = a.prop(c.target, "form")) && a.find.matchesSelector(d, p.sel) && b.errorbox.toggle(c.target)
            },
            "resetvalidityui.webshims": function(c) {
                var d;
                p.sel && (d = a.prop(c.target, "form")) && a.find.matchesSelector(d, p.sel) && b.errorbox.reset(c.target)
            },
            firstinvalid: function(c) {
                var d;
                p.sel && p.handleBubble && p.sel && (d = a.prop(c.target, "form")) && a.find.matchesSelector(d, p.sel) && (c.preventDefault(), "none" != p.handleBubble && b.validityAlert.showFor(c.target, !1, !1, "hide" == p.handleBubble))
            },
            submit: function(b) {
                return p.sel && p.submitCheck && a.find.matchesSelector(b.target, p.sel) && a.prop(b.target, "noValidate") && !a(b.target).checkValidity() ? (b.stopImmediatePropagation(), !1) : void 0
            }
        }), /[\s\:\>\~\+]/.test(p.sel || "") && b.error("please use a simple selector for iVal.sel: for example .validate"), f.replaceValidationUI && a(d).on("firstinvalid", function(a) {
            a.isDefaultPrevented() || (a.preventDefault(), setTimeout(function() {
                b.validityAlert.showFor(a.target)
            }, 4))
        }),
        function() {
            var b, c, e, f = [];
            a(d).on("invalid", function(d) {
                if (!d.wrongWebkitInvalid && !e) {
                    var g = a(d.target);
                    b || (b = a.Event("firstinvalid"), g.addClass("first-invalid").trigger(b)), b && b.isDefaultPrevented() && d.preventDefault(), f.push(d.target), d.extraData = "fix", clearTimeout(c), c = setTimeout(function() {
                        var c = {
                            type: "lastinvalid",
                            cancelable: !1,
                            invalidlist: a(f)
                        };
                        f = [], e = !0, a(d.target).trigger(c, [c]), a(b.target).removeClass("first-invalid"), b = !1, e = !1
                    }, 9), g = null
                }
            })
        }(), b.addReady(function(b, c) {
            a(b.querySelectorAll(".ws-custom-file")).add(a(c).filter(".ws-custom-file")).each(h)
        }), B("form-fixrangechange", {
            test: !(!a.event.special.change && !a.event.special.input && j.inputtypes.range && f.fixRangeChange)
        }), B("form-inputmode", {
            test: !(!f.noInputmodeFix && d.addEventListener && j.inputtypes.number && -1 != m.indexOf("Mobile") && (!("inputMode" in d.createElement("input")) || "inputmode" in d.createElement("input")))
        }), B("form-combat", {
            d: ["dom-support"],
            test: !(a.mobile && (a.mobile.selectmenu || a.mobile.checkboxradio) || a.ui && a.ui.selectmenu || a.fn.select2 || a.fn.chosen || a.fn.selectpicker || a.fn.selectBoxIt)
        }), B("position", {
            src: "plugins/jquery.ui.position.js",
            test: !(!a.position || !a.position.getScrollInfo)
        }), A.loadList(["form-combat", "position", "form-fixrangechange", "form-inputmode"])
});