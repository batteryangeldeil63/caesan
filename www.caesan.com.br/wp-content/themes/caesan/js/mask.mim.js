/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.8.7 - 2016-07-26T15:59:07.992Z
 * License: MIT
 */
! function() {
    "use strict";
    angular.module("ui.mask", []).value("uiMaskConfig", {
        maskDefinitions: {
            9: /\d/,
            A: /[a-zA-Z]/,
            "*": /[a-zA-Z0-9]/
        },
        clearOnBlur: !0,
        clearOnBlurPlaceholder: !1,
        escChar: "\\",
        eventsToHandle: ["input", "keyup", "click", "focus"],
        addDefaultPlaceholder: !0,
        allowInvalidValue: !1
    }).provider("uiMask.Config", function() {
        var e = {};
        this.maskDefinitions = function(n) {
            return e.maskDefinitions = n
        }, this.clearOnBlur = function(n) {
            return e.clearOnBlur = n
        }, this.clearOnBlurPlaceholder = function(n) {
            return e.clearOnBlurPlaceholder = n
        }, this.eventsToHandle = function(n) {
            return e.eventsToHandle = n
        }, this.addDefaultPlaceholder = function(n) {
            return e.addDefaultPlaceholder = n
        }, this.allowInvalidValue = function(n) {
            return e.allowInvalidValue = n
        }, this.$get = ["uiMaskConfig", function(n) {
            var t = n;
            for (var a in e) angular.isObject(e[a]) && !angular.isArray(e[a]) ? angular.extend(t[a], e[a]) : t[a] = e[a];
            return t
        }]
    }).directive("uiMask", ["uiMask.Config", function(e) {
        function n(e) {
            return e === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }
        return {
            priority: 100,
            require: "ngModel",
            restrict: "A",
            compile: function() {
                var t = angular.copy(e);
                return function(e, a, i, r) {
                    function l(e) {
                        return angular.isDefined(e) ? (w(e), K ? (h(), d(), !0) : f()) : f()
                    }

                    function u(e) {
                        e && (T = e, !K || 0 === a.val().length && angular.isDefined(i.placeholder) || a.val(m(p(a.val()))))
                    }

                    function o() {
                        return l(i.uiMask)
                    }

                    function c(e) {
                        return K ? (j = p(e || ""), R = g(j), r.$setValidity("mask", R), j.length && (R || Q.allowInvalidValue) ? m(j) : void 0) : e
                    }

                    function s(e) {
                        return K ? (j = p(e || ""), R = g(j), r.$viewValue = j.length ? m(j) : "", r.$setValidity("mask", R), R || Q.allowInvalidValue ? J ? r.$viewValue : j : void 0) : e
                    }

                    function f() {
                        return K = !1, v(), angular.isDefined(q) ? a.attr("placeholder", q) : a.removeAttr("placeholder"), angular.isDefined(W) ? a.attr("maxlength", W) : a.removeAttr("maxlength"), a.val(r.$modelValue), r.$viewValue = r.$modelValue, !1
                    }

                    function h() {
                        j = F = p(r.$modelValue || ""), H = _ = m(j), R = g(j), i.maxlength && a.attr("maxlength", 2 * S[S.length - 1]), !q && Q.addDefaultPlaceholder && a.attr("placeholder", T);
                        for (var e = r.$modelValue, n = r.$formatters.length; n--;) e = r.$formatters[n](e);
                        r.$viewValue = e || "", r.$render()
                    }

                    function d() {
                        Z || (a.bind("blur", y), a.bind("mousedown mouseup", V), a.bind("keydown", M), a.bind(Q.eventsToHandle.join(" "), O), Z = !0)
                    }

                    function v() {
                        Z && (a.unbind("blur", y), a.unbind("mousedown", V), a.unbind("mouseup", V), a.unbind("keydown", M), a.unbind("input", O), a.unbind("keyup", O), a.unbind("click", O), a.unbind("focus", O), Z = !1)
                    }

                    function g(e) {
                        return e.length ? e.length >= I : !0
                    }

                    function p(e) {
                        var n, t, i = "",
                            r = a[0],
                            l = A.slice(),
                            u = L,
                            o = u + C(r),
                            c = "";
                        return e = e.toString(), n = 0, t = e.length - T.length, angular.forEach(B, function(a) {
                            var i = a.position;
                            i >= u && o > i || (i >= u && (i += t), e.substring(i, i + a.value.length) === a.value && (c += e.slice(n, i), n = i + a.value.length))
                        }), e = c + e.slice(n), angular.forEach(e.split(""), function(e) {
                            l.length && l[0].test(e) && (i += e, l.shift())
                        }), i
                    }

                    function m(e) {
                        var n = "",
                            t = S.slice();
                        return angular.forEach(T.split(""), function(a, i) {
                            e.length && i === t[0] ? (n += e.charAt(0) || "_", e = e.substr(1), t.shift()) : n += a
                        }), n
                    }

                    function b(e) {
                        var n, t = angular.isDefined(i.uiMaskPlaceholder) ? i.uiMaskPlaceholder : i.placeholder;
                        return angular.isDefined(t) && t[e] ? t[e] : (n = angular.isDefined(i.uiMaskPlaceholderChar) && i.uiMaskPlaceholderChar ? i.uiMaskPlaceholderChar : "_", "space" === n.toLowerCase() ? " " : n[0])
                    }

                    function k() {
                        var e, n, t = T.split("");
                        S && !isNaN(S[0]) && angular.forEach(S, function(e) {
                            t[e] = "_"
                        }), e = t.join(""), n = e.replace(/[_]+/g, "_").split("_"), n = n.filter(function(e) {
                            return "" !== e
                        });
                        var a = 0;
                        return n.map(function(n) {
                            var t = e.indexOf(n, a);
                            return a = t + 1, {
                                value: n,
                                position: t
                            }
                        })
                    }

                    function w(e) {
                        var n = 0;
                        if (S = [], A = [], T = "", angular.isString(e)) {
                            I = 0;
                            var t = !1,
                                a = 0,
                                i = e.split(""),
                                r = !1;
                            angular.forEach(i, function(e, i) {
                                r ? (r = !1, T += e, n++) : Q.escChar === e ? r = !0 : Q.maskDefinitions[e] ? (S.push(n), T += b(i - a), A.push(Q.maskDefinitions[e]), n++, t || I++, t = !1) : "?" === e ? (t = !0, a++) : (T += e, n++)
                            })
                        }
                        S.push(S.slice().pop() + 1), B = k(), K = S.length > 1 ? !0 : !1
                    }

                    function y() {
                        if ((Q.clearOnBlur || Q.clearOnBlurPlaceholder && 0 === j.length && i.placeholder) && (L = 0, N = 0, R && 0 !== j.length || (H = "", a.val(""), e.$apply(function() {
                                r.$pristine || r.$setViewValue("")
                            }))), j !== U) {
                            var n = a.val(),
                                t = "" === j && n && angular.isDefined(i.uiMaskPlaceholderChar) && "space" === i.uiMaskPlaceholderChar;
                            t && a.val(""), $(a[0]), t && a.val(n)
                        }
                        U = j
                    }

                    function $(e) {
                        var n;
                        if (angular.isFunction(window.Event) && !e.fireEvent) try {
                            n = new Event("change", {
                                view: window,
                                bubbles: !0,
                                cancelable: !1
                            })
                        } catch (t) {
                            n = document.createEvent("HTMLEvents"), n.initEvent("change", !1, !0)
                        } finally {
                            e.dispatchEvent(n)
                        } else "createEvent" in document ? (n = document.createEvent("HTMLEvents"), n.initEvent("change", !1, !0), e.dispatchEvent(n)) : e.fireEvent && e.fireEvent("onchange")
                    }

                    function V(e) {
                        "mousedown" === e.type ? a.bind("mouseout", E) : a.unbind("mouseout", E)
                    }

                    function E() {
                        N = C(this), a.unbind("mouseout", E)
                    }

                    function M(e) {
                        var n = 8 === e.which,
                            t = P(this) - 1 || 0,
                            i = 90 === e.which && e.ctrlKey;
                        if (n) {
                            for (; t >= 0;) {
                                if (D(t)) {
                                    x(this, t + 1);
                                    break
                                }
                                t--
                            }
                            z = -1 === t
                        }
                        i && (a.val(""), e.preventDefault())
                    }

                    function O(n) {
                        n = n || {};
                        var t = n.which,
                            i = n.type;
                        if (16 !== t && 91 !== t) {
                            var l, u = a.val(),
                                o = _,
                                c = !1,
                                s = p(u),
                                f = F,
                                h = P(this) || 0,
                                d = L || 0,
                                v = h - d,
                                g = S[0],
                                b = S[s.length] || S.slice().shift(),
                                k = N || 0,
                                w = C(this) > 0,
                                y = k > 0,
                                $ = u.length > o.length || k && u.length > o.length - k,
                                V = u.length < o.length || k && u.length === o.length - k,
                                E = t >= 37 && 40 >= t && n.shiftKey,
                                M = 37 === t,
                                O = 8 === t || "keyup" !== i && V && -1 === v,
                                A = 46 === t || "keyup" !== i && V && 0 === v && !y,
                                B = (M || O || "click" === i) && h > g;
                            if (N = C(this), !E && (!w || "click" !== i && "keyup" !== i && "focus" !== i)) {
                                if (O && z) return a.val(T), e.$apply(function() {
                                    r.$setViewValue("")
                                }), void x(this, d);
                                if ("input" === i && V && !y && s === f) {
                                    for (; O && h > g && !D(h);) h--;
                                    for (; A && b > h && -1 === S.indexOf(h);) h++;
                                    var I = S.indexOf(h);
                                    s = s.substring(0, I) + s.substring(I + 1), s !== f && (c = !0)
                                }
                                for (l = m(s), _ = l, F = s, !c && u.length > l.length && (c = !0), a.val(l), c && e.$apply(function() {
                                        r.$setViewValue(l)
                                    }), $ && g >= h && (h = g + 1), B && h--, h = h > b ? b : g > h ? g : h; !D(h) && h > g && b > h;) h += B ? -1 : 1;
                                (B && b > h || $ && !D(d)) && h++, L = h, x(this, h)
                            }
                        }
                    }

                    function D(e) {
                        return S.indexOf(e) > -1
                    }

                    function P(e) {
                        if (!e) return 0;
                        if (void 0 !== e.selectionStart) return e.selectionStart;
                        if (document.selection && n(a[0])) {
                            e.focus();
                            var t = document.selection.createRange();
                            return t.moveStart("character", e.value ? -e.value.length : 0), t.text.length
                        }
                        return 0
                    }

                    function x(e, t) {
                        if (!e) return 0;
                        if (0 !== e.offsetWidth && 0 !== e.offsetHeight)
                            if (e.setSelectionRange) n(a[0]) && (e.focus(), e.setSelectionRange(t, t));
                            else if (e.createTextRange) {
                            var i = e.createTextRange();
                            i.collapse(!0), i.moveEnd("character", t), i.moveStart("character", t), i.select()
                        }
                    }

                    function C(e) {
                        return e ? void 0 !== e.selectionStart ? e.selectionEnd - e.selectionStart : window.getSelection ? window.getSelection().toString().length : document.selection ? document.selection.createRange().text.length : 0 : 0
                    }
                    var S, A, T, B, I, j, H, R, _, F, L, N, z, K = !1,
                        Z = !1,
                        q = i.placeholder,
                        W = i.maxlength,
                        G = r.$isEmpty;
                    r.$isEmpty = function(e) {
                        return G(K ? p(e || "") : e)
                    };
                    var J = !1;
                    i.$observe("modelViewValue", function(e) {
                        "true" === e && (J = !0)
                    }), i.$observe("allowInvalidValue", function(e) {
                        Q.allowInvalidValue = "" === e ? !0 : !!e, c(r.$modelValue)
                    });
                    var Q = {};
                    i.uiOptions ? (Q = e.$eval("[" + i.uiOptions + "]"), Q = angular.isObject(Q[0]) ? function(e, n) {
                        for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (void 0 === n[t] ? n[t] = angular.copy(e[t]) : angular.isObject(n[t]) && !angular.isArray(n[t]) && (n[t] = angular.extend({}, e[t], n[t])));
                        return n
                    }(t, Q[0]) : t) : Q = t, i.$observe("uiMask", l), angular.isDefined(i.uiMaskPlaceholder) ? i.$observe("uiMaskPlaceholder", u) : i.$observe("placeholder", u), angular.isDefined(i.uiMaskPlaceholderChar) && i.$observe("uiMaskPlaceholderChar", o), r.$formatters.unshift(c), r.$parsers.unshift(s);
                    var U = a.val();
                    a.bind("mousedown mouseup", V), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
                        if (null === this) throw new TypeError;
                        var n = Object(this),
                            t = n.length >>> 0;
                        if (0 === t) return -1;
                        var a = 0;
                        if (arguments.length > 1 && (a = Number(arguments[1]), a !== a ? a = 0 : 0 !== a && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a)))), a >= t) return -1;
                        for (var i = a >= 0 ? a : Math.max(t - Math.abs(a), 0); t > i; i++)
                            if (i in n && n[i] === e) return i;
                        return -1
                    })
                }
            }
        }
    }])
}();