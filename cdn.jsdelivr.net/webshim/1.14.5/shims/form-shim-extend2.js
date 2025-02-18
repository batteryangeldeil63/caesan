webshims.register("form-shim-extend2", function(a, b, c, d, e, f) {
    "use strict";
    var g = function(a) {
            return "number" == typeof a || a && a == 1 * a
        },
        h = b.support,
        i = !("getSetAttribute" in a.support && !a.support.getSetAttribute),
        j = !("submitBubbles" in a.support) || a.support.submitBubbles,
        k = function(b) {
            j || !b || "object" != typeof b || b._submit_attached || (a.event.add(b, "submit._submit", function(a) {
                a._submit_bubble = !0
            }), b._submit_attached = !0)
        };
    if (!j && a.event.special.submit && (a.event.special.submit.setup = function() {
            return a.nodeName(this, "form") ? !1 : void a.event.add(this, "click._submit keypress._submit", function(b) {
                var c = b.target,
                    d = a.nodeName(c, "input") || a.nodeName(c, "button") ? a.prop(c, "form") : e;
                k(d)
            })
        }), b.reflectProperties(["input"], ["pattern"]), !("maxLength" in d.createElement("textarea"))) {
        var l = function() {
            var b, c = 0,
                d = a([]),
                e = 1e9,
                f = function() {
                    var a = d.prop("value"),
                        b = a.length;
                    b > c && b > e && (b = Math.max(c, e), d.prop("value", a.substr(0, b))), c = b
                },
                g = function() {
                    clearTimeout(b), d.off(".maxlengthconstraint")
                };
            return function(h, i) {
                g(), i > -1 && (e = i, c = a.prop(h, "value").length, d = a(h), d.on({
                    "keydown.maxlengthconstraint keypress.maxlengthconstraint paste.maxlengthconstraint cut.maxlengthconstraint": function() {
                        setTimeout(f, 0)
                    },
                    "keyup.maxlengthconstraint": f,
                    "blur.maxlengthconstraint": g
                }), b = setInterval(f, 200))
            }
        }();
        l.update = function(b, c) {
            a(b).is(":focus") && (c || (c = a.prop(b, "maxlength")), l(b, c))
        }, a(d).on("focusin", function(b) {
            var c;
            "TEXTAREA" == b.target.nodeName && (c = a.prop(b.target, "maxlength")) > -1 && l(b.target, c)
        }), b.defineNodeNameProperty("textarea", "maxlength", {
            attr: {
                set: function(a) {
                    this.setAttribute("maxlength", "" + a), l.update(this)
                },
                get: function() {
                    var a = this.getAttribute("maxlength");
                    return null == a ? e : a
                }
            },
            prop: {
                set: function(a) {
                    if (g(a)) {
                        if (0 > a) throw "INDEX_SIZE_ERR";
                        return a = parseInt(a, 10), this.setAttribute("maxlength", a), void l.update(this, a)
                    }
                    this.setAttribute("maxlength", "0"), l.update(this, 0)
                },
                get: function() {
                    var a = this.getAttribute("maxlength");
                    return g(a) && a >= 0 ? parseInt(a, 10) : -1
                }
            }
        }), b.defineNodeNameProperty("textarea", "maxLength", {
            prop: {
                set: function(b) {
                    a.prop(this, "maxlength", b)
                },
                get: function() {
                    return a.prop(this, "maxlength")
                }
            }
        })
    }
    i || null != a("<form novalidate></form>").attr("novalidate") || b.defineNodeNameProperty("form", "novalidate", {
            attr: {
                set: function(a) {
                    this.setAttribute("novalidate", "" + a)
                },
                get: function() {
                    var a = this.getAttribute("novalidate");
                    return null == a ? e : a
                }
            }
        }), h.fieldsetdisabled && h.fieldsetelements || ! function() {
            if (!h.fieldsetdisabled) {
                var f = "isDisabled" in d.createElement("div"),
                    g = {
                        fieldset: 1,
                        FIELDSET: 1
                    },
                    i = "input, textarea, select, button",
                    j = function(b) {
                        return f && !b.isDisabled ? !1 : a.find.matchesSelector(b, "fieldset[disabled] *")
                    },
                    l = f ? function() {
                        return this.isDisabled && a.find.matchesSelector(this, "fieldset[disabled] *")
                    } : "fieldset[disabled] *",
                    m = f ? function() {
                        return !this.isDisabled && !a.find.matchesSelector(this, "fieldset[disabled] *")
                    } : ":not(fieldset[disabled] *)";
                a.extend(a.expr[":"], {
                    enabled: function(a) {
                        return g[a.nodeName] ? null == b.contentAttr(a, "disabled") && !j(a) : a.disabled === !1
                    },
                    disabled: function(a) {
                        return g[a.nodeName] ? null != b.contentAttr(a, "disabled") || j(a) : a.disabled === !0
                    }
                });
                var n = {
                    disable: function() {
                        this.disabled || (b.data(this, "groupedisabled", !0), this.disabled = !0)
                    },
                    enable: function() {
                        this.disabled && b.data(this, "groupedisabled") && (b.data(this, "groupedisabled", !1), this.disabled = !1)
                    }
                };
                a(c).on("unload", function() {
                    a(i).each(n.enable)
                }), b.defineNodeNamesBooleanProperty(["fieldset"], "disabled", {
                    set: function(b) {
                        if (b = !!b) a(this.querySelectorAll(i)).each(n.disable);
                        else if (!j(this)) {
                            var c = a(this.querySelectorAll(i));
                            this.querySelector("fieldset[disabled]") && (c = c.filter(m)), c.each(n.enable)
                        }
                    },
                    initAttr: !0,
                    useContentAttribute: !0
                }), ["input", "textarea", "select", "button"].forEach(function(a) {
                    var c = b.defineNodeNameProperty(a, "disabled", {
                        prop: {
                            set: function(a) {
                                a ? (b.data(this, "groupedisabled", !1), c.prop._supset.call(this, a)) : j(this) ? (b.data(this, "groupedisabled", !0), c.prop._supset.call(this, !0)) : (b.data(this, "groupedisabled", !1), c.prop._supset.call(this, a))
                            },
                            get: function() {
                                var a = c.prop._supget.call(this);
                                return a ? !b.data(this, "groupedisabled") : a
                            }
                        },
                        removeAttr: {
                            value: function() {
                                c.prop.set.call(this, !1)
                            }
                        }
                    })
                }), b.addReady(function(b) {
                    a(b).filter(l).find(i).each(n.disable)
                })
            }! function(b, c) {
                var e = {
                    form: 1,
                    FORM: 1
                };
                a.prop = function(f, g, h) {
                    var i;
                    return f && 1 == f.nodeType && h === c && e[f.nodeName] && f.id && (i = d.getElementsByName(g), i && i.length || (i = d.getElementById(g)), i && (i = a(i).filter(function() {
                        return a.prop(this, "form") == f
                    }).get(), i.length)) ? 1 == i.length ? i[0] : i : b.apply(this, arguments)
                }
            }(a.prop, e);
            var o = function(b) {
                    var c = a.data(b, "webshimsAddedElements");
                    c && (c.remove(), a.removeData(b, "webshimsAddedElements"))
                },
                p = function() {
                    var c = b.contentAttr(this, "form");
                    return c && (c = d.getElementById(c), c && !a.nodeName(c, "form") && (c = null)), c || this.form
                };
            if (b.defineNodeNamesProperty(["input", "textarea", "select", "button", "fieldset"], "form", {
                    prop: {
                        get: p,
                        writeable: !1
                    }
                }), b.defineNodeNamesProperty(["form"], "elements", {
                    prop: {
                        get: function() {
                            var b, c, e, f, g, h, i = this.id,
                                j = [];
                            if (i && (e = a.data(this, "webshimsAddedElements"), e && e.detach()), f = this.elements, this.querySelector("input[form], select[form], textarea[form]"))
                                for (g = 0, h = f.length; h > g; g++) p.call(f[g]) == this && j.push(f[g]);
                            else j = a.makeArray(f);
                            return i && (b = 'input[form="' + i + '"], select[form="' + i + '"], textarea[form="' + i + '"], button[form="' + i + '"], fieldset[form="' + i + '"]', c = d.querySelectorAll(b) || [], c.length && (j = a(j).add(c).get()), e && e.appendTo(this)), j
                        },
                        writeable: !1
                    }
                }), a(function() {
                    var c = function(a) {
                            a.stopPropagation()
                        },
                        e = {
                            image: 1,
                            submit: 1
                        };
                    a(d).on("submit", function(b) {
                        if (!b.isDefaultPrevented()) {
                            var c, e = b.target,
                                f = e.id;
                            f && (o(e), c = d.querySelectorAll('input[form="' + f + '"], select[form="' + f + '"], textarea[form="' + f + '"]'), c = a(c).filter(function() {
                                return !this.disabled && this.name && this.form != e
                            }).clone(), c.length && (a.data(e, "webshimsAddedElements", a('<div class="webshims-visual-hide" />').append(c).appendTo(e)), setTimeout(function() {
                                o(e)
                            }, 9)), c = null)
                        }
                    }), a(d).on("click", function(d) {
                        if (e[d.target.type] && !d.isDefaultPrevented() && b.contentAttr(d.target, "form")) {
                            var f, g = a.prop(d.target, "form"),
                                h = d.target.form;
                            g && g != h && (f = a(d.target).clone().removeAttr("form").addClass("webshims-visual-hide").on("click", c).appendTo(g), h && d.preventDefault(), k(g), f.trigger("click"), setTimeout(function() {
                                f.remove(), f = null
                            }, 9))
                        }
                    })
                }), !a.fn.finish && parseFloat(a.fn.jquery, 10) < 1.9) {
                var q = /\r?\n/g,
                    r = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
                    s = /^(?:select|textarea)/i;
                a.fn.serializeArray = function() {
                    return this.map(function() {
                        var b = a.prop(this, "elements");
                        return b ? a.makeArray(b) : this
                    }).filter(function() {
                        return this.name && !a(this).is(":disabled") && (this.checked || s.test(this.nodeName) || r.test(this.type))
                    }).map(function(b, c) {
                        var d = a(this).val();
                        return null == d ? null : a.isArray(d) ? a.map(d, function(a) {
                            return {
                                name: c.name,
                                value: a.replace(q, "\r\n")
                            }
                        }) : {
                            name: c.name,
                            value: d.replace(q, "\r\n")
                        }
                    }).get()
                }
            }
            h.fieldsetelements || b.defineNodeNamesProperty(["fieldset"], "elements", {
                prop: {
                    get: function() {
                        return this.querySelectorAll("input, select, textarea, button, fieldset") || []
                    },
                    writeable: !1
                }
            })
        }(), null == a("<input />").prop("labels") && b.defineNodeNamesProperty("button, input, keygen, meter, output, progress, select, textarea", "labels", {
            prop: {
                get: function() {
                    if ("hidden" == this.type) return null;
                    var b = this.id,
                        c = a(this).closest("label").filter(function() {
                            var a = this.attributes["for"] || {};
                            return !a.specified || a.value == b
                        });
                    return b && (c = c.add(d.querySelectorAll('label[for="' + b + '"]'))), c.get()
                },
                writeable: !1
            }
        }), "value" in d.createElement("progress") || ! function() {
            var c = parseInt("NaN", 10),
                d = function(b) {
                    var c = a.prop(b, "position");
                    a.attr(b, "data-position", c), a("> span", b).css({
                        width: (0 > c ? 100 : 100 * c) + "%"
                    })
                },
                e = {
                    position: {
                        prop: {
                            get: function() {
                                var b, e = this.getAttribute("value"),
                                    f = -1;
                                return e = e ? 1 * e : c, isNaN(e) ? d.isInChange && a(this).removeAttr("aria-valuenow").addClass("ws-indeterminate") : (b = a.prop(this, "max"), f = Math.max(Math.min(e / b, 1), 0), d.isInChange && (a.attr(this, "aria-valuenow", 100 * f), "max" == d.isInChange && a.attr(this, "aria-valuemax", b)), a(this).removeClass("ws-indeterminate")), f
                            },
                            writeable: !1
                        }
                    }
                };
            a.each({
                value: 0,
                max: 1
            }, function(c, f) {
                var g = "value" == c && !a.fn.finish;
                e[c] = {
                    attr: {
                        set: function(a) {
                            var b = e[c].attr._supset.call(this, a);
                            return d.isInChange = c, d(this), d.isInChange = !1, b
                        }
                    },
                    removeAttr: {
                        value: function() {
                            if (this.removeAttribute(c), g) try {
                                delete this.value
                            } catch (a) {}
                            d.isInChange = c, d(this), d.isInChange = !1
                        }
                    },
                    prop: {
                        get: function() {
                            var b = 1 * e[c].attr.get.call(this);
                            return 0 > b || isNaN(b) ? b = f : "value" == c ? b = Math.min(b, a.prop(this, "max")) : 0 === b && (b = f), b
                        },
                        set: function(a) {
                            return a = 1 * a, isNaN(a) && b.error("Floating-point value is not finite."), e[c].attr.set.call(this, a)
                        }
                    }
                }
            }), b.createElement("progress", function() {
                var c = a(this).attr({
                    role: "progressbar",
                    "aria-valuemin": "0"
                }).html('<span class="progress-value" />').jProp("labels").map(function() {
                    return b.getID(this)
                }).get();
                c.length ? a.attr(this, "aria-labelledby", c.join(" ")) : b.info("you should use label elements for your prgogress elements"), a(this).addClass("ws-style"), "rtl" == a(this).css("direction") && a(this).addClass("ws-is-rtl"), d.isInChange = "max", d(this), d.isInChange = !1
            }, e)
        }(), "setSelectionRange" in d.createElement("input") || ! function() {
            var c = function(b, c) {
                var e, f, g, h, i, j, k = 0,
                    l = 0;
                return d.selection && (e = d.selection.createRange()) && e.parentElement() == b && (f = a.prop(b, "value"), i = f.length, g = f.replace(/\r\n/g, "\n"), h = b.createTextRange(), h.moveToBookmark(e.getBookmark()), j = b.createTextRange(), j.collapse(!1), h.compareEndPoints("StartToEnd", j) > -1 ? k = l = i : c ? (k = -h.moveStart("character", -i), k += g.slice(0, k).split("\n").length - 1) : h.compareEndPoints("EndToEnd", j) > -1 ? l = i : (l = -h.moveEnd("character", -i), l += g.slice(0, l).split("\n").length - 1)), {
                    start: k,
                    end: l
                }
            };
            ["input", "textarea"].forEach(function(d) {
                var e = "textarea" == d,
                    f = {
                        text: 1,
                        search: 1,
                        url: 1,
                        tel: 1,
                        password: 1,
                        email: 1
                    },
                    g = "InvalidStateError: An attempt was made to use an object that is not, or is no longer, usable. selection not allowed on this type";
                b.defineNodeNameProperties(d, {
                    selectionStart: {
                        get: function() {
                            return e || f[a.prop(this, "type")] ? c(this, !0).start : void b.error(g)
                        },
                        set: function(c) {
                            if (this.createTextRange && (e || f[a.prop(this, "type")])) {
                                var d = this.createTextRange();
                                d.collapse(!0), d.moveStart("character", c), d.moveEnd("character", a.prop(this, "selectionEnd")), a(this).is(":focus") && d.select()
                            } else b.error(g)
                        }
                    },
                    selectionEnd: {
                        get: function() {
                            return e || f[a.prop(this, "type")] ? c(this).end : void b.error(g)
                        },
                        set: function(d) {
                            if (this.createTextRange && (e || f[a.prop(this, "type")])) {
                                var h, i = this.createTextRange();
                                i.collapse(!0), h = c(this, !0).start, i.moveStart("character", h), i.moveEnd("character", d - h), a(this).is(":focus") && i.select()
                            } else b.error(g)
                        }
                    },
                    setSelectionRange: {
                        value: function(c, d) {
                            if (this.createTextRange && (e || f[a.prop(this, "type")])) {
                                var h = this.createTextRange();
                                h.collapse(!0), h.moveStart("character", c), h.moveEnd("character", d - c), a(this).is(":focus") && h.select()
                            } else b.error(g)
                        }
                    }
                }, "prop")
            })
        }(),
        function() {
            if (!f.noPlaceholderPolyfill) {
                var d;
                if (h.textareaPlaceholder = !!("placeholder" in a("<textarea />")[0]), h.placeholder = !!("placeholder" in a("<input />")[0]), h.placeholder && f.overridePlaceholder && (d = !0), h.placeholder && h.textareaPlaceholder && !d) return void
                function() {
                    var b = navigator.userAgent; - 1 != b.indexOf("Mobile") && -1 != b.indexOf("Safari") && a(c).on("orientationchange", function() {
                        var b, c = function(a, b) {
                                return b
                            },
                            d = function() {
                                a("input[placeholder], textarea[placeholder]").attr("placeholder", c)
                            };
                        return function() {
                            clearTimeout(b), b = setTimeout(d, 9)
                        }
                    }())
                }();
                var e = "over" == b.cfg.forms.placeholderType,
                    g = b.cfg.forms.responsivePlaceholder,
                    i = ["textarea"];
                (!h.placeholder || d) && i.push("input");
                var j = function(b) {
                        try {
                            return a(b).setSelectionRange(0, 0), !0
                        } catch (c) {}
                    },
                    k = function(b, c, d, f) {
                        if (d === !1 && (d = a.prop(b, "value")), e || "password" == b.type) {
                            if (!d && f) return void a(b).off(".placeholderremove").on({
                                "keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove": function(d) {
                                    (!d || 17 != d.keyCode && 16 != d.keyCode) && (c.box.removeClass("placeholder-visible"), a(b).off(".placeholderremove"))
                                },
                                "blur.placeholderremove": function() {
                                    a(b).off(".placeholderremove")
                                }
                            })
                        } else {
                            if (!d && f && j(b)) {
                                var g = setTimeout(function() {
                                    j(b)
                                }, 9);
                                return void a(b).off(".placeholderremove").on({
                                    "keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove": function(d) {
                                        (!d || 17 != d.keyCode && 16 != d.keyCode) && (b.value = a.prop(b, "value"), c.box.removeClass("placeholder-visible"), clearTimeout(g), a(b).off(".placeholderremove"))
                                    },
                                    "mousedown.placeholderremove drag.placeholderremove select.placeholderremove": function() {
                                        j(b), clearTimeout(g), g = setTimeout(function() {
                                            j(b)
                                        }, 9)
                                    },
                                    "blur.placeholderremove": function() {
                                        clearTimeout(g), a(b).off(".placeholderremove")
                                    }
                                })
                            }
                            f || d || !b.value || (b.value = d)
                        }
                        c.box.removeClass("placeholder-visible")
                    },
                    l = function(b, c, d) {
                        d === !1 && (d = a.prop(b, "placeholder")), e || "password" == b.type || (b.value = d), c.box.addClass("placeholder-visible")
                    },
                    m = function(b, c, d, f, g) {
                        if (f || (f = a.data(b, "placeHolder"))) {
                            var h = a(b).hasClass("placeholder-visible");
                            return d === !1 && (d = a.attr(b, "placeholder") || ""), a(b).off(".placeholderremove"), c === !1 && (c = a.prop(b, "value")), c || "focus" != g && (g || !a(b).is(":focus")) ? c ? void k(b, f, c) : void(d && !c ? l(b, f, d) : k(b, f, c)) : void(("password" == b.type || e || h) && k(b, f, "", !0))
                        }
                    },
                    n = function() {
                        return a('<span class="placeholder-text"></span>')
                    },
                    o = function() {
                        var d = {
                            text: 1,
                            search: 1,
                            url: 1,
                            email: 1,
                            password: 1,
                            tel: 1,
                            number: 1
                        };
                        return b.modules["form-number-date-ui"].loaded && delete d.number, {
                            create: function(b) {
                                var d, f = a.data(b, "placeHolder");
                                if (f) return f;
                                if (f = a.data(b, "placeHolder", {}), a(b).on("focus.placeholder blur.placeholder", function(a) {
                                        m(this, !1, !1, f, a.type), f.box["focus" == a.type ? "addClass" : "removeClass"]("placeholder-focused")
                                    }), (d = a.prop(b, "form")) && a(b).onWSOff("reset.placeholder", function(a) {
                                        setTimeout(function() {
                                            m(b, !1, !1, f, a.type)
                                        }, 0)
                                    }, !1, d), "password" == b.type || e) f.text = n(b), g || a(b).hasClass("responsive-width") || -1 != (b.currentStyle || {
                                    width: ""
                                }).width.indexOf("%") ? f.box = f.text : (f.box = a('<span class="placeholder-box placeholder-box-' + (b.nodeName || "").toLowerCase() + " placeholder-box-" + a.css(b, "float") + '" />').insertAfter(b), f.box.append(b)), f.text.insertAfter(b).on("mousedown.placeholder", function() {
                                    m(this, !1, !1, f, "focus");
                                    try {
                                        setTimeout(function() {
                                            b.focus()
                                        }, 0)
                                    } catch (a) {}
                                    return !1
                                }), a.each(["lineHeight", "fontSize", "fontFamily", "fontWeight"], function(c, d) {
                                    var e = a.css(b, d);
                                    f.text.css(d) != e && f.text.css(d, e)
                                }), a.each(["Left", "Top"], function(c, d) {
                                    var e = (parseInt(a.css(b, "padding" + d), 10) || 0) + Math.max(parseInt(a.css(b, "margin" + d), 10) || 0, 0) + (parseInt(a.css(b, "border" + d + "Width"), 10) || 0);
                                    f.text.css("padding" + d, e)
                                }), a(b).onWSOff("updateshadowdom", function() {
                                    var c, d, e, g = a(b),
                                        h = {};
                                    return function() {
                                        var a, i;
                                        (a = b.offsetWidth) && (i = function() {
                                            var b = g.position();
                                            a !== c && (c = a, f.text[0].style.width = a + "px"), (b.top !== h.top || b.left !== h.left) && (h = b, f.text[0].style.top = b.top + "px", f.text[0].style.left = b.left + "px")
                                        }, d ? (clearTimeout(e), e = setTimeout(i, 99)) : (i(), d = !0))
                                    }
                                }(), !0);
                                else {
                                    var h = function(c) {
                                        a(b).hasClass("placeholder-visible") && (k(b, f, ""), setTimeout(function() {
                                            (!c || "submit" != c.type || c.isDefaultPrevented()) && m(b, !1, !1, f)
                                        }, 9))
                                    };
                                    a(b).onWSOff("beforeunload", h, !1, c), f.box = a(b), d && a(b).onWSOff("submit", h, !1, d)
                                }
                                return f
                            },
                            update: function(c, e) {
                                var f = (a.attr(c, "type") || a.prop(c, "type") || "").toLowerCase();
                                if (!d[f] && !a.nodeName(c, "textarea")) return void b.warn('placeholder not allowed on input[type="' + f + '"], but it is a good fallback :-)');
                                var g = o.create(c);
                                g.text && g.text.text(e), m(c, !1, e, g)
                            }
                        }
                    }();
                a.webshims.publicMethods = {
                    pHolder: o
                }, i.forEach(function(a) {
                    b.defineNodeNameProperty(a, "placeholder", {
                        attr: {
                            set: function(a) {
                                var c = this;
                                d ? (b.data(c, "bustedPlaceholder", a), c.placeholder = "") : b.contentAttr(c, "placeholder", a), o.update(c, a)
                            },
                            get: function() {
                                var a;
                                return d && (a = b.data(this, "bustedPlaceholder")), a || b.contentAttr(this, "placeholder")
                            }
                        },
                        reflect: !0,
                        initAttr: !0
                    })
                }), i.forEach(function(c) {
                    var e, f = {};
                    ["attr", "prop"].forEach(function(c) {
                        f[c] = {
                            set: function(f) {
                                var g, h = this;
                                d && (g = b.data(h, "bustedPlaceholder")), g || (g = b.contentAttr(h, "placeholder")), a.removeData(h, "cachedValidity");
                                var i = e[c]._supset.call(h, f);
                                return g && "value" in h && m(h, f, g), i
                            },
                            get: function() {
                                var d, f, g = this;
                                return a(g).hasClass("placeholder-visible") ? b.cfg.debug && (f = e[c]._supget.call(g)) && (d = a.attr(g, "placeholder")) && d != f ? (b.error("value input[placeholder] was changed by input.value instead using $.val or $.prop."), m(g, f, d)) : f = "" : f = e[c]._supget.call(g), f
                            }
                        }
                    }), e = b.defineNodeNameProperty(c, "value", f)
                })
            }
        }(),
        function() {
            var c = d;
            if (!("value" in d.createElement("output"))) {
                b.defineNodeNameProperty("output", "value", {
                    prop: {
                        set: function(b) {
                            var c = a.data(this, "outputShim");
                            c || (c = e(this)), c(b)
                        },
                        get: function() {
                            return b.contentAttr(this, "value") || a(this).text() || ""
                        }
                    }
                }), b.onNodeNamesPropertyModify("input", "value", function(b, c, d) {
                    if ("removeAttr" != d) {
                        var e = a.data(this, "outputShim");
                        e && e(b)
                    }
                });
                var e = function(c) {
                    if (!a.data(c, "outputShim")) {
                        c = a(c);
                        var e = (c.text() || "").trim(),
                            f = c.prop("id"),
                            g = c.attr("for"),
                            h = a('<input class="output-shim" type="text" disabled name="' + (c.attr("name") || "") + '" value="' + e + '" style="display: none !important;" />').insertAfter(c),
                            i = function(a) {
                                h[0].value = a, a = h[0].value, c.text(a), b.contentAttr(c[0], "value", a)
                            };
                        return c[0].defaultValue = e, b.contentAttr(c[0], "value", e), c.attr({
                            "aria-live": "polite"
                        }), f && (h.attr("id", f), c.attr("aria-labelledby", c.jProp("labels").map(function() {
                            return b.getID(this)
                        }).get().join(" "))), g && (f = b.getID(c), g.split(" ").forEach(function(a) {
                            a = d.getElementById(a), a && a.setAttribute("aria-controls", f)
                        })), c.data("outputShim", i), h.data("outputShim", i), i
                    }
                };
                b.addReady(function(b, c) {
                        a(b.getElementsByTagName("output")).add(c.filter("output")).each(function() {
                            e(this)
                        })
                    }),
                    function() {
                        var d, e, f, g, h = {
                                updateInput: 1,
                                input: 1
                            },
                            i = {
                                radio: 1,
                                checkbox: 1,
                                submit: 1,
                                button: 1,
                                image: 1,
                                reset: 1,
                                file: 1,
                                color: 1
                            },
                            j = {
                                input: 1,
                                INPUT: 1,
                                textarea: 1,
                                TEXTAREA: 1
                            },
                            k = function(a) {
                                if (f) {
                                    var c = f.prop("value");
                                    c !== e && (e = c, a && h[a.type] || b.triggerInlineForm && b.triggerInlineForm(f[0], "input"))
                                }
                            },
                            l = function() {
                                clearTimeout(g), g = setTimeout(k, 9)
                            },
                            m = function() {
                                clearTimeout(g), clearInterval(d), f && f.off("focusout", m).off("keyup keypress keydown paste cut", l).off("input change updateInput triggerinput", k)
                            },
                            n = function(a) {
                                m(), f = a, e = f.prop("value"), clearInterval(d), d = setInterval(k, 200), l(), f.on({
                                    "keyup keypress keydown paste cut": l,
                                    "focusout wswidgetfocusout": m,
                                    "input updateInput change triggerinput": k
                                })
                            };
                        a(c).on("focusin wswidgetfocusin", function(c) {
                            !c.target || c.target.readOnly || c.target.disabled || !j[c.target.nodeName] || i[c.target.type] || (b.data(c.target, "implemented") || {}).inputwidgets || n(a(c.target))
                        })
                    }()
            }
        }()
});