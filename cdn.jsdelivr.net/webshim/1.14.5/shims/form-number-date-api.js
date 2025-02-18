webshims.register("form-number-date-api", function(a, b) {
    "use strict";
    b.addInputType || b.error("you can not call forms-ext feature after calling forms feature. call both at once instead: $.webshims.polyfill('forms forms-ext')"), b.getStep || (b.getStep = function(b, c) {
        var e = a.attr(b, "step");
        return "any" === e ? e : (c = c || g(b), d[c] && d[c].step ? (e = o.number.asNumber(e), (!isNaN(e) && e > 0 ? e : d[c].step) * (d[c].stepScaleFactor || 1)) : e)
    }), b.addMinMaxNumberToCache || (b.addMinMaxNumberToCache = function(a, b, c) {
        a + "AsNumber" in c || (c[a + "AsNumber"] = d[c.type].asNumber(b.attr(a)), isNaN(c[a + "AsNumber"]) && a + "Default" in d[c.type] && (c[a + "AsNumber"] = d[c.type][a + "Default"]))
    });
    var c = parseInt("NaN", 10),
        d = b.inputTypes,
        e = function(a) {
            return "number" == typeof a || a && a == 1 * a
        },
        f = function(b) {
            return a('<input type="' + b + '" />').prop("type") === b
        },
        g = function(a) {
            return (a.getAttribute("type") || "").toLowerCase()
        },
        h = function(a) {
            return a && !isNaN(1 * a)
        },
        i = b.addMinMaxNumberToCache,
        j = function(a, b) {
            a = "" + a, b -= a.length;
            for (var c = 0; b > c; c++) a = "0" + a;
            return a
        },
        k = 1e-7,
        l = b.bugs.bustedValidity;
    b.addValidityRule("stepMismatch", function(a, c, e, f) {
        if ("" === c) return !1;
        if ("type" in e || (e.type = g(a[0])), "week" == e.type) return !1;
        var h, j, l = (f || {}).stepMismatch || !1;
        if (d[e.type] && d[e.type].step) {
            if ("step" in e || (e.step = b.getStep(a[0], e.type)), "any" == e.step) return !1;
            if ("valueAsNumber" in e || (e.valueAsNumber = d[e.type].asNumber(c)), isNaN(e.valueAsNumber)) return !1;
            i("min", a, e), h = e.minAsNumber, isNaN(h) && (j = a.prop("defaultValue")) && (h = d[e.type].asNumber(j)), isNaN(h) && (h = d[e.type].stepBase || 0), l = Math.abs((e.valueAsNumber - h) % e.step), l = !(k >= l || Math.abs(l - e.step) <= k)
        }
        return l
    }), [{
        name: "rangeOverflow",
        attr: "max",
        factor: 1
    }, {
        name: "rangeUnderflow",
        attr: "min",
        factor: -1
    }].forEach(function(a) {
        b.addValidityRule(a.name, function(b, c, e, f) {
            var h = (f || {})[a.name] || !1;
            if ("" === c) return h;
            if ("type" in e || (e.type = g(b[0])), d[e.type] && d[e.type].asNumber) {
                if ("valueAsNumber" in e || (e.valueAsNumber = d[e.type].asNumber(c)), isNaN(e.valueAsNumber)) return !1;
                if (i(a.attr, b, e), isNaN(e[a.attr + "AsNumber"])) return h;
                h = e[a.attr + "AsNumber"] * a.factor < e.valueAsNumber * a.factor - k
            }
            return h
        })
    }), b.reflectProperties(["input"], ["max", "min", "step"]);
    var m = b.defineNodeNameProperty("input", "valueAsNumber", {
            prop: {
                get: function() {
                    var b = this,
                        e = g(b),
                        f = d[e] && d[e].asNumber ? d[e].asNumber(a.prop(b, "value")) : m.prop._supget && m.prop._supget.apply(b, arguments);
                    return null == f && (f = c), f
                },
                set: function(c) {
                    var e = this,
                        f = g(e);
                    if (d[f] && d[f].numberToString) {
                        if (isNaN(c)) return void a.prop(e, "value", "");
                        var h = d[f].numberToString(c);
                        h !== !1 ? a.prop(e, "value", h) : b.error("INVALID_STATE_ERR: DOM Exception 11")
                    } else m.prop._supset && m.prop._supset.apply(e, arguments)
                }
            }
        }),
        n = b.defineNodeNameProperty("input", "valueAsDate", {
            prop: {
                get: function() {
                    var b = this,
                        c = g(b);
                    return d[c] && d[c].asDate && !d[c].noAsDate ? d[c].asDate(a.prop(b, "value")) : n.prop._supget && n.prop._supget.call(b) || null
                },
                set: function(c) {
                    var e = this,
                        f = g(e);
                    if (!d[f] || !d[f].dateToString || d[f].noAsDate) return n.prop._supset && n.prop._supset.apply(e, arguments) || null;
                    if (null === c) return a.prop(e, "value", ""), "";
                    var h = d[f].dateToString(c);
                    return h !== !1 ? (a.prop(e, "value", h), h) : void b.error("INVALID_STATE_ERR: DOM Exception 11")
                }
            }
        });
    a.each({
        stepUp: 1,
        stepDown: -1
    }, function(c, e) {
        var f = b.defineNodeNameProperty("input", c, {
            prop: {
                value: function(c) {
                    var h, i, j, l, m, n, o, p = g(this);
                    if (!d[p] || !d[p].asNumber) {
                        if (f.prop && f.prop._supvalue) return f.prop._supvalue.apply(this, arguments);
                        throw b.info("no step method for type: " + p), "invalid state error"
                    }
                    if (m = {
                            type: p
                        }, c || (c = 1, b.warn("you should always use a factor for stepUp/stepDown")), c *= e, h = b.getStep(this, p), "any" == h) throw b.info("step is 'any' can't apply stepUp/stepDown"), "invalid state error";
                    return b.addMinMaxNumberToCache("min", a(this), m), b.addMinMaxNumberToCache("max", a(this), m), i = a.prop(this, "valueAsNumber"), c > 0 && !isNaN(m.minAsNumber) && (isNaN(i) || m.minAsNumber > i) ? void a.prop(this, "valueAsNumber", m.minAsNumber) : 0 > c && !isNaN(m.maxAsNumber) && (isNaN(i) || m.maxAsNumber < i) ? void a.prop(this, "valueAsNumber", m.maxAsNumber) : (isNaN(i) && (i = 0), n = m.minAsNumber, isNaN(n) && (o = a.prop(this, "defaultValue")) && (n = d[p].asNumber(o)), n || (n = 0), h *= c, i = 1 * (i + h).toFixed(5), j = (i - n) % h, j && Math.abs(j) > k && (l = i - j, l += j > 0 ? h : -h, i = 1 * l.toFixed(5)), !isNaN(m.maxAsNumber) && i > m.maxAsNumber || !isNaN(m.minAsNumber) && i < m.minAsNumber ? void b.info("max/min overflow can't apply stepUp/stepDown") : void a.prop(this, "valueAsNumber", i))
                }
            }
        })
    });
    var o = {
        number: {
            bad: function(a) {
                return !e(a)
            },
            step: 1,
            stepScaleFactor: 1,
            asNumber: function(a) {
                return e(a) ? 1 * a : c
            },
            numberToString: function(a) {
                return e(a) ? a : !1
            }
        },
        range: {
            minDefault: 0,
            maxDefault: 100
        },
        color: {
            bad: function() {
                var a = /^\u0023[a-f0-9]{6}$/;
                return function(b) {
                    return !b || 7 != b.length || !a.test(b)
                }
            }()
        },
        date: {
            bad: function(a) {
                if (!a || !a.split || !/\d$/.test(a)) return !0;
                var b, c = a.split(/\u002D/);
                if (3 !== c.length) return !0;
                var d = !1;
                if (c[0].length < 4 || 2 != c[1].length || c[1] > 12 || 2 != c[2].length || c[2] > 33) d = !0;
                else
                    for (b = 0; 3 > b; b++)
                        if (!h(c[b])) {
                            d = !0;
                            break
                        } return d || a !== this.dateToString(this.asDate(a, !0))
            },
            step: 1,
            stepScaleFactor: 864e5,
            asDate: function(a, b) {
                return !b && this.bad(a) ? null : new Date(this.asNumber(a, !0))
            },
            asNumber: function(a, b) {
                var d = c;
                return (b || !this.bad(a)) && (a = a.split(/\u002D/), d = Date.UTC(a[0], a[1] - 1, a[2])), d
            },
            numberToString: function(a) {
                return e(a) ? this.dateToString(new Date(1 * a)) : !1
            },
            dateToString: function(a) {
                return a && a.getFullYear ? j(a.getUTCFullYear(), 4) + "-" + j(a.getUTCMonth() + 1, 2) + "-" + j(a.getUTCDate(), 2) : !1
            }
        },
        time: {
            bad: function(b, c) {
                if (!b || !b.split || !/\d$/.test(b)) return !0;
                if (b = b.split(/\u003A/), b.length < 2 || b.length > 3) return !0;
                var d, e = !1;
                return b[2] && (b[2] = b[2].split(/\u002E/), d = parseInt(b[2][1], 10), b[2] = b[2][0]), a.each(b, function(a, b) {
                    return h(b) && 2 === b.length ? void 0 : (e = !0, !1)
                }), e ? !0 : b[0] > 23 || b[0] < 0 || b[1] > 59 || b[1] < 0 ? !0 : b[2] && (b[2] > 59 || b[2] < 0) ? !0 : d && isNaN(d) ? !0 : (d && (100 > d ? d *= 100 : 10 > d && (d *= 10)), c === !0 ? [b, d] : !1)
            },
            step: 60,
            stepBase: 0,
            stepScaleFactor: 1e3,
            asDate: function(a) {
                return a = new Date(this.asNumber(a)), isNaN(a) ? null : a
            },
            asNumber: function(a) {
                var b = c;
                return a = this.bad(a, !0), a !== !0 && (b = Date.UTC("1970", 0, 1, a[0][0], a[0][1], a[0][2] || 0), a[1] && (b += a[1])), b
            },
            dateToString: function(a) {
                if (a && a.getUTCHours) {
                    var b = j(a.getUTCHours(), 2) + ":" + j(a.getUTCMinutes(), 2),
                        c = a.getSeconds();
                    return "0" != c && (b += ":" + j(c, 2)), c = a.getUTCMilliseconds(), "0" != c && (b += "." + j(c, 3)), b
                }
                return !1
            }
        },
        month: {
            bad: function(a) {
                return o.date.bad(a + "-01")
            },
            step: 1,
            stepScaleFactor: !1,
            asDate: function(a) {
                return new Date(o.date.asNumber(a + "-01"))
            },
            asNumber: function(a) {
                var b = c;
                return a && !this.bad(a) && (a = a.split(/\u002D/), a[0] = 1 * a[0] - 1970, a[1] = 1 * a[1] - 1, b = 12 * a[0] + a[1]), b
            },
            numberToString: function(a) {
                var b, c = !1;
                return e(a) && (b = a % 12, a = (a - b) / 12 + 1970, b += 1, 1 > b && (a -= 1, b += 12), c = j(a, 4) + "-" + j(b, 2)), c
            },
            dateToString: function(a) {
                if (a && a.getUTCHours) {
                    var b = o.date.dateToString(a);
                    return b.split && (b = b.split(/\u002D/)) ? b[0] + "-" + b[1] : !1
                }
                return !1
            }
        },
        "datetime-local": {
            bad: function(a, b) {
                return a && a.split && 2 === (a + "special").split(/\u0054/).length ? (a = a.split(/\u0054/), o.date.bad(a[0]) || o.time.bad(a[1], b)) : !0
            },
            noAsDate: !0,
            asDate: function(a) {
                return a = new Date(this.asNumber(a)), isNaN(a) ? null : a
            },
            asNumber: function(a) {
                var b = c,
                    d = this.bad(a, !0);
                return d !== !0 && (a = a.split(/\u0054/)[0].split(/\u002D/), b = Date.UTC(a[0], a[1] - 1, a[2], d[0][0], d[0][1], d[0][2] || 0), d[1] && (b += d[1])), b
            },
            dateToString: function(a, b) {
                return o.date.dateToString(a) + "T" + o.time.dateToString(a, b)
            }
        }
    };
    !l && f("range") && f("time") && f("month") && f("datetime-local") || (o.range = a.extend({}, o.number, o.range), o.time = a.extend({}, o.date, o.time), o.month = a.extend({}, o.date, o.month), o["datetime-local"] = a.extend({}, o.date, o.time, o["datetime-local"])), ["number", "month", "range", "date", "time", "color", "datetime-local"].forEach(function(a) {
        (l || !f(a)) && b.addInputType(a, o[a])
    }), null == a("<input />").prop("labels") && b.defineNodeNamesProperty("button, input, keygen, meter, output, progress, select, textarea", "labels", {
        prop: {
            get: function() {
                if ("hidden" == this.type) return null;
                var b = this.id,
                    c = a(this).closest("label").filter(function() {
                        var a = this.attributes["for"] || {};
                        return !a.specified || a.value == b
                    });
                return b && (c = c.add('label[for="' + b + '"]')), c.get()
            },
            writeable: !1
        }
    })
});