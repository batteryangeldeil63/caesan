/*!
 * jQuery UI Position 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(window.webshims && window.webshims.$ || jQuery)
}(function(a) {
    return function() {
        function b(a, b, c) {
            return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
        }

        function c(b, c) {
            return parseInt(a.css(b, c), 10) || 0
        }

        function d(b) {
            var c = b[0];
            return 9 === c.nodeType ? {
                width: b.width(),
                height: b.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : a.isWindow(c) ? {
                width: b.width(),
                height: b.height(),
                offset: {
                    top: b.scrollTop(),
                    left: b.scrollLeft()
                }
            } : c.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: c.pageY,
                    left: c.pageX
                }
            } : {
                width: b.outerWidth(),
                height: b.outerHeight(),
                offset: b.offset()
            }
        }
        a.ui = a.ui || {};
        var e, f, g = Math.max,
            h = Math.abs,
            i = Math.round,
            j = /left|center|right/,
            k = /top|center|bottom/,
            l = /[\+\-]\d+(\.[\d]+)?%?/,
            m = /^\w+/,
            n = /%$/,
            o = a.fn.position;
        a.position = {
                scrollbarWidth: function() {
                    if (void 0 !== e) return e;
                    var b, c, d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        f = d.children()[0];
                    return a("body").append(d), b = f.offsetWidth, d.css("overflow", "scroll"), c = f.offsetWidth, b === c && (c = d[0].clientWidth), d.remove(), e = b - c
                },
                getScrollInfo: function(b) {
                    var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
                        d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
                        e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                        f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
                    return {
                        width: f ? a.position.scrollbarWidth() : 0,
                        height: e ? a.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(b) {
                    var c = a(b || window),
                        d = a.isWindow(c[0]),
                        e = !!c[0] && 9 === c[0].nodeType;
                    return {
                        element: c,
                        isWindow: d,
                        isDocument: e,
                        offset: c.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: c.scrollLeft(),
                        scrollTop: c.scrollTop(),
                        width: d ? c.width() : c.outerWidth(),
                        height: d ? c.height() : c.outerHeight()
                    }
                }
            }, a.fn.position = function(e) {
                if (!e || !e.of) return o.apply(this, arguments);
                e = a.extend({}, e);
                var n, p, q, r, s, t, u = a(e.of),
                    v = a.position.getWithinInfo(e.within),
                    w = a.position.getScrollInfo(v),
                    x = (e.collision || "flip").split(" "),
                    y = {};
                return t = d(u), u[0].preventDefault && (e.at = "left top"), p = t.width, q = t.height, r = t.offset, s = a.extend({}, r), a.each(["my", "at"], function() {
                    var a, b, c = (e[this] || "").split(" ");
                    1 === c.length && (c = j.test(c[0]) ? c.concat(["center"]) : k.test(c[0]) ? ["center"].concat(c) : ["center", "center"]), c[0] = j.test(c[0]) ? c[0] : "center", c[1] = k.test(c[1]) ? c[1] : "center", a = l.exec(c[0]), b = l.exec(c[1]), y[this] = [a ? a[0] : 0, b ? b[0] : 0], e[this] = [m.exec(c[0])[0], m.exec(c[1])[0]]
                }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? s.left += p : "center" === e.at[0] && (s.left += p / 2), "bottom" === e.at[1] ? s.top += q : "center" === e.at[1] && (s.top += q / 2), n = b(y.at, p, q), s.left += n[0], s.top += n[1], this.each(function() {
                    var d, j, k = a(this),
                        l = k.outerWidth(),
                        m = k.outerHeight(),
                        o = c(this, "marginLeft"),
                        t = c(this, "marginTop"),
                        z = l + o + c(this, "marginRight") + w.width,
                        A = m + t + c(this, "marginBottom") + w.height,
                        B = a.extend({}, s),
                        C = b(y.my, k.outerWidth(), k.outerHeight());
                    "right" === e.my[0] ? B.left -= l : "center" === e.my[0] && (B.left -= l / 2), "bottom" === e.my[1] ? B.top -= m : "center" === e.my[1] && (B.top -= m / 2), B.left += C[0], B.top += C[1], f || (B.left = i(B.left), B.top = i(B.top)), d = {
                        marginLeft: o,
                        marginTop: t
                    }, a.each(["left", "top"], function(b, c) {
                        a.ui.position[x[b]] && a.ui.position[x[b]][c](B, {
                            targetWidth: p,
                            targetHeight: q,
                            elemWidth: l,
                            elemHeight: m,
                            collisionPosition: d,
                            collisionWidth: z,
                            collisionHeight: A,
                            offset: [n[0] + C[0], n[1] + C[1]],
                            my: e.my,
                            at: e.at,
                            within: v,
                            elem: k
                        })
                    }), e.using && (j = function(a) {
                        var b = r.left - B.left,
                            c = b + p - l,
                            d = r.top - B.top,
                            f = d + q - m,
                            i = {
                                target: {
                                    element: u,
                                    left: r.left,
                                    top: r.top,
                                    width: p,
                                    height: q
                                },
                                element: {
                                    element: k,
                                    left: B.left,
                                    top: B.top,
                                    width: l,
                                    height: m
                                },
                                horizontal: 0 > c ? "left" : b > 0 ? "right" : "center",
                                vertical: 0 > f ? "top" : d > 0 ? "bottom" : "middle"
                            };
                        l > p && h(b + c) < p && (i.horizontal = "center"), m > q && h(d + f) < q && (i.vertical = "middle"), i.important = g(h(b), h(c)) > g(h(d), h(f)) ? "horizontal" : "vertical", e.using.call(this, a, i)
                    }), k.offset(a.extend(B, {
                        using: j
                    }))
                })
            }, a.ui.position = {
                fit: {
                    left: function(a, b) {
                        var c, d = b.within,
                            e = d.isWindow ? d.scrollLeft : d.offset.left,
                            f = d.width,
                            h = a.left - b.collisionPosition.marginLeft,
                            i = e - h,
                            j = h + b.collisionWidth - f - e;
                        b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
                    },
                    top: function(a, b) {
                        var c, d = b.within,
                            e = d.isWindow ? d.scrollTop : d.offset.top,
                            f = b.within.height,
                            h = a.top - b.collisionPosition.marginTop,
                            i = e - h,
                            j = h + b.collisionHeight - f - e;
                        b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
                    }
                },
                flip: {
                    left: function(a, b) {
                        var c, d, e = b.within,
                            f = e.offset.left + e.scrollLeft,
                            g = e.width,
                            i = e.isWindow ? e.scrollLeft : e.offset.left,
                            j = a.left - b.collisionPosition.marginLeft,
                            k = j - i,
                            l = j + b.collisionWidth - g - i,
                            m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                            n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                            o = -2 * b.offset[0];
                        0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o))
                    },
                    top: function(a, b) {
                        var c, d, e = b.within,
                            f = e.offset.top + e.scrollTop,
                            g = e.height,
                            i = e.isWindow ? e.scrollTop : e.offset.top,
                            j = a.top - b.collisionPosition.marginTop,
                            k = j - i,
                            l = j + b.collisionHeight - g - i,
                            m = "top" === b.my[1],
                            n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                            o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                            p = -2 * b.offset[1];
                        0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || h(c) < l) && (a.top += n + o + p))
                    }
                },
                flipfit: {
                    left: function() {
                        a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var b, c, d, e, g, h = document.getElementsByTagName("body")[0],
                    i = document.createElement("div");
                b = document.createElement(h ? "div" : "body"), d = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, h && a.extend(d, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (g in d) b.style[g] = d[g];
                b.appendChild(i), c = h || document.documentElement, c.insertBefore(b, c.firstChild), i.style.cssText = "position: absolute; left: 10.7432222px;", e = a(i).offset().left, f = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
            }()
    }(), a.ui.position
});