/*!
 * daisyjs - https://github.com/WarenGonzaga/daisy.js#readme
 * Version: 1.0.0
 * Demo: https://daisyjs.warengonzaga.com/
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 * Copyright (c) 2020 Waren Gonzaga
 * 
 * Facebook: @WarenGonzagaOfficialPage
 * Twitter: @Waren_Gonzaga
 * Github: @WarenGonzaga
 * Website: warengonzaga.com
 * 
 * Maintained and LTS Version of Particleground by jnicol
 * https://github.com/jnicol/particleground
 * 
 * Donote or Support!
 * https://buymeacoff.ee/warengonzaga
 */
!function (t, e) { "use strict"; var i = "daisyjs", a = t.jQuery; function s(s, n) { var o, r, p, l, d, h, f = !!e.createElement("canvas").getContext, c = [], x = 0, m = 0, u = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), y = !!t.DeviceOrientationEvent, g = 0, w = 0, v = !1; function S() { o.width = s.offsetWidth, o.height = s.offsetHeight, r.fillStyle = n.dotColor, r.strokeStyle = n.lineColor, r.lineWidth = n.lineWidth } function X() { if (f) { p = t.innerWidth, l = t.innerHeight, r.clearRect(0, 0, o.width, o.height); for (var e = 0; e < c.length; e++)c[e].updatePosition(); for (e = 0; e < c.length; e++)c[e].draw(); v || requestAnimationFrame(X) } } function Y() { switch (this.stackPos = this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = { x: Math.ceil(Math.random() * o.width), y: Math.ceil(Math.random() * o.height) }, this.speed = {}, n.directionX) { case "left": this.speed.x = +(-n.maxSpeedX + Math.random() * n.maxSpeedX - n.minSpeedX).toFixed(2); break; case "right": this.speed.x = +(Math.random() * n.maxSpeedX + n.minSpeedX).toFixed(2); break; default: this.speed.x = +(-n.maxSpeedX / 2 + Math.random() * n.maxSpeedX).toFixed(2), this.speed.x += 0 < this.speed.x ? n.minSpeedX : -n.minSpeedX }switch (n.directionY) { case "up": this.speed.y = +(-n.maxSpeedY + Math.random() * n.maxSpeedY - n.minSpeedY).toFixed(2); break; case "down": this.speed.y = +(Math.random() * n.maxSpeedY + n.minSpeedY).toFixed(2); break; default: this.speed.y = +(-n.maxSpeedY / 2 + Math.random() * n.maxSpeedY).toFixed(2), this.speed.x += 0 < this.speed.y ? n.minSpeedY : -n.minSpeedY } } function M(t) { void 0 !== n[t] && n[t].call(s) } return n = function (t) { t = t || {}; for (var e = 1; e < arguments.length; e++) { var i = arguments[e]; if (i) for (var a in i) i.hasOwnProperty(a) && ("object" == typeof i[a] ? deepExtend(t[a], i[a]) : t[a] = i[a]) } return t }({}, t[i].defaults, n), Y.prototype.draw = function () { r.beginPath(), r.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, n.particleRadius / 2, 0, 2 * Math.PI, !0), r.closePath(), r.fill(), r.beginPath(); for (var t = c.length - 1; t > this.stackPos; t--) { var e = c[t], i = this.position.x - e.position.x, a = this.position.y - e.position.y; Math.sqrt(i * i + a * a).toFixed(2) < n.proximity && (r.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), n.curvedLines ? r.quadraticCurveTo(Math.max(e.position.x, e.position.x), Math.min(e.position.y, e.position.y), e.position.x + e.parallaxOffsetX, e.position.y + e.parallaxOffsetY) : r.lineTo(e.position.x + e.parallaxOffsetX, e.position.y + e.parallaxOffsetY)) } r.stroke(), r.closePath() }, Y.prototype.updatePosition = function () { n.parallax && (y && !u ? (d = p / 60 * (g - -30) + 0, h = l / 60 * (w - -30) + 0) : (d = x, h = m), this.parallaxTargX = (d - p / 2) / (n.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (h - l / 2) / (n.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10); var t = s.offsetWidth, e = s.offsetHeight; switch (n.directionX) { case "left": this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = t - this.parallaxOffsetX); break; case "right": this.position.x + this.speed.x + this.parallaxOffsetX > t && (this.position.x = 0 - this.parallaxOffsetX); break; default: (this.position.x + this.speed.x + this.parallaxOffsetX > t || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x) }switch (n.directionY) { case "up": this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = e - this.parallaxOffsetY); break; case "down": this.position.y + this.speed.y + this.parallaxOffsetY > e && (this.position.y = 0 - this.parallaxOffsetY); break; default: (this.position.y + this.speed.y + this.parallaxOffsetY > e || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y) }this.position.x += this.speed.x, this.position.y += this.speed.y }, Y.prototype.setStackPos = function (t) { this.stackPos = t }, function () { if (f) { (o = e.createElement("canvas")).className = "pg-canvas", o.style.display = "block", s.insertBefore(o, s.firstChild), r = o.getContext("2d"), S(); for (var i = Math.round(o.width * o.height / n.density), a = 0; a < i; a++) { var p = new Y; p.setStackPos(a), c.push(p) } t.addEventListener("resize", function () { !function () { S(); for (var t = s.offsetWidth, e = s.offsetHeight, i = c.length - 1; 0 <= i; i--)(c[i].position.x > t || c[i].position.y > e) && c.splice(i, 1); var a = Math.round(o.width * o.height / n.density); if (a > c.length) for (; a > c.length;) { var r = new Y; c.push(r) } else a < c.length && c.splice(a); for (i = c.length - 1; 0 <= i; i--)c[i].setStackPos(i) }() }, !1), e.addEventListener("mousemove", function (t) { x = t.pageX, m = t.pageY }, !1), y && !u && t.addEventListener("deviceorientation", function () { w = Math.min(Math.max(-event.beta, -30), 30), g = Math.min(Math.max(-event.gamma, -30), 30) }, !0), X(), M("onInit") } }(), { option: function (t, e) { if (!e) return n[t]; n[t] = e }, destroy: function () { console.log("destroy"), o.parentNode.removeChild(o), M("onDestroy"), a && a(s).removeData("plugin_" + i) }, start: function () { v = !1, X() }, pause: function () { v = !0 } } } t[i] = function (t, e) { return new s(t, e) }, t[i].defaults = { minSpeedX: .1, maxSpeedX: .7, minSpeedY: .1, maxSpeedY: .7, directionX: "center", directionY: "center", density: 1e4, dotColor: "#666666", lineColor: "#666666", particleRadius: 7, lineWidth: 1, curvedLines: !1, proximity: 100, parallax: !0, parallaxMultiplier: 5, onInit: function () { }, onDestroy: function () { } }, a && (a.fn[i] = function (t) { if ("string" == typeof t) { var e, n = t, o = Array.prototype.slice.call(arguments, 1); return this.each(function () { a.data(this, "plugin_" + i) && "function" == typeof a.data(this, "plugin_" + i)[n] && (e = a.data(this, "plugin_" + i)[n].apply(this, o)) }), void 0 !== e ? e : this } if ("object" == typeof t || !t) return this.each(function () { a.data(this, "plugin_" + i) || a.data(this, "plugin_" + i, new s(this, t)) }) }) }(window, document), function () { for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i)window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"]; window.requestAnimationFrame || (window.requestAnimationFrame = function (e, i) { var a = (new Date).getTime(), s = Math.max(0, 16 - (a - t)), n = window.setTimeout(function () { e(a + s) }, s); return t = a + s, n }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) { clearTimeout(t) }) }(); var pf = daisyjs(document.getElementById("particles-foreground"), { dotColor: "rgba(255, 255, 255, 1)", lineColor: "rgba(255, 255, 255, 0.05)", minSpeedX: .3, maxSpeedX: .6, minSpeedY: .3, maxSpeedY: .6, density: 5e4, curvedLines: !1, proximity: 250, parallaxMultiplier: 10, particleRadius: 4 }), pb = daisyjs(document.getElementById("particles-background"), { dotColor: "rgba(255, 255, 255, 0.5)", lineColor: "rgba(255, 255, 255, 0.05)", minSpeedX: .075, maxSpeedX: .15, minSpeedY: .075, maxSpeedY: .15, density: 3e4, curvedLines: !1, proximity: 20, parallaxMultiplier: 20, particleRadius: 2 });