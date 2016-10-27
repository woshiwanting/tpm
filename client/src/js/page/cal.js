var MiniCal = {
  offset_x: 0,
  offset_y: 0,
  with_arrow_top: !0,
  close_fn_eval: null ,
  init: function(e) {
    "en" == window.LANG ? this.dayChars = 1 : this.dayChars = 2,
    this.dayNames = [_("Sunday"), _("Monday"), _("Tuesday"), _("Wednesday"), _("Thursday"), _("Friday"), _("Saturday")],
    this.dayShort = [_("su"), _("mo"), _("tu"), _("we"), _("th"), _("fr"), _("sa")],
    this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    this.monthNames = [_("January"), _("February"), _("March"), _("April"), _("May"), _("June"), _("July"), _("August"), _("September"), _("October"), _("November"), _("December")],
    this.startDay = 1,
    this.yearOrder = "asc",
    this.id = "dp_",
    this.disableFutureDates = !1,
    this.initToday(!0),
    e && $update(this, e),
    this.container = null ,
    this.inner = null ,
    this.calendarTable = null ,
    this.interval = null ,
    this.active = !1,
    $AEV(window, "resize", $b(this.position, this)),
    $AEV(window, "scroll", $b(this.position, this)),
    $AEV(document, "click", function(e) {
      var t = $eventElm(e)
        , a = MiniCal.close_fn_eval;
      return !(!a || !a()) || (!(!$hasClass(t, "dp_icon") && !$hasClass(t, "minical_holder")) || (!(!$parent(t, "div", "dp_cal") && !$parent(t, "a", "dp_icon")) || void MiniCal.remove()))
    })
  },
  initToday: function(e) {
    this.yearStart = (new Date).getFullYear(),
    this.yearRange = this.yearStart - 2007,
    this.today = new Date,
    this.nowYear = this.today.getFullYear(),
    this.nowMonth = this.today.getMonth(),
    this.nowDay = this.today.getDate(),
    e && (this.then = this.today,
    this.oldYear = this.year = this.then.getFullYear(),
    this.oldMonth = this.month = this.then.getMonth(),
    this.oldDay = this.then.getDate())
  },
  attachListener: function(e) {
    $AEV(e, "click", function(t) {
      var a = $b(MiniCal.create, MiniCal);
      a(e)
    })
  },
  annotateInner: function(e) {},
  onSelect: function(e) {},
  beforeShown: function() {},
  noDate: function() {},
  onRemoved: function() {},
  create: function(e) {
    if (this.click_elm == e)
      return this.remove();
    this.container && ($remove(this.container),
    this.container = null ),
    this.initToday(!1),
    this.click_elm = e,
    this.container = DIV({
      c: "dp_container"
    }, this.inner = DIV({
      class: "dp_cal"
    })),
    this.with_arrow_top && $ATT(this.container, this.arrow_top = ArrowTop.generate("center", "white")),
    $add($body(), this.container),
    this.position(),
    this.calendarTable = this._renderCalendarTable(),
    $add(this.inner, this.calendarTable),
    this.annotateInner(this.inner),
    this.beforeShown(),
    this.active = !0,
    this.position();
    var t = 5e3
      , a = window.GB_getLast && window.GB_getLast();
    a && (t = GB_getLast().cur_zindex + 5e3),
    this.container.style.zIndex = t,
    this.with_arrow_top && (this.arrow_top.style.zIndex = t + 100)
  },
  _renderCalendarTable: function() {
    var e = new Date;
    this.month && this.year ? e.setFullYear(this.year, this.month, 1) : (this.month = e.getMonth(),
    this.year = e.getFullYear(),
    e.setDate(1)),
    this.month = parseInt(this.month),
    this.year = parseInt(this.year);
    var t, a, r, i, n = 1 - (7 + e.getDay() - this.startDay) % 7, o = this.monthNames[this.month], _ = TABLE(), d = THEAD(), E = TR(t = TD({
      c: "dp_nav_top"
    }), a = TH({
      colSpan: "5",
      c: "dp_nav_top"
    }), r = TD({
      c: "dp_nav_top"
    }));
    $add(t, i = A({
      href: "#",
      c: "dp_nav"
    }, imageSprite("cmp_10_arrow_left", 16, 18))),
    $AEV(i, "click", function(e) {
      MiniCal.selectPrevMonth(),
      e.stopPropagation()
    }),
    $add(a, SPAN({
      c: "month_year"
    }, o, " ", this.year)),
    $add(r, i = A({
      href: "#",
      c: "dp_nav"
    }, imageSprite("cmp_9_arrow_right", 16, 18))),
    $AEV(i, "click", function(e) {
      MiniCal.selectNextMonth(),
      e.stopPropagation()
    }),
    $add(d, E);
    for (var T = TBODY(), s = TR(), u = 0; u < this.dayShort.length; u++)
      calDayNameCell = TH(this.dayShort[(this.startDay + u) % 7].substr(0, this.dayChars)),
      $add(s, calDayNameCell);
    $add(T, s);
    var l = this.month + 1
      , c = this.year;
    l > 11 && (l = 0,
    c = this.year + 1);
    var R = this.month - 1
      , h = this.year;
    R < 0 && (R = 11,
    h = this.year - 1);
    for (var N = this, f = function(e, t, a) {
      var r = TD({
        class: N.id + "_calDay",
        axis: e + "|" + (parseInt(t) + 1) + "|" + a
      }, a);
      MiniCal.annotateDate && MiniCal.annotateDate(r, MiniCal.genDate(e, t, a));
      var i = new Date;
      if (N.disableFutureDates) {
        var n = el.axis.split("|")
          , o = new Date;
        if (o.setFullYear(n[0]),
        o.setDate(n[2]),
        o.setMonth(n[1] - 1),
        o > i && !$hasClass(el, "dp_today"))
          return void $addClass(el, "dp_disabled")
      }
      return $AEV(r, "mouseover", function() {
        $addClass(r, "dp_roll")
      }),
      $AEV(r, "mouseout", function() {
        $removeClass(r, "dp_roll")
      }),
      r.onclick = $b(function() {
        var e = r.axis.split("|");
        N.setCurrent(e[0], e[1], e[2])
      }, this),
      r
    }
    ; n <= this.getDaysInMonth(this.year, this.month); ) {
      var p, m, P, M, g = TR();
      for (u = 0; u < 7; u++) {
        var y = !1;
        n <= this.getDaysInMonth(this.year, this.month) && n > 0 ? (m = this.year,
        P = this.month,
        M = n) : n < this.nowDay ? (m = h,
        P = R,
        M = this.getDaysInMonth(h, R) + n,
        y = !0) : (m = c,
        P = l,
        M = n - this.getDaysInMonth(this.year, this.month),
        y = !0),
        $add(g, p = f(m, P, M)),
        M == this.oldDay && P == this.oldMonth && m == this.oldYear && $addClass(p, "dp_selected"),
        M == this.nowDay && P == this.nowMonth && m == this.nowYear && $addClass(p, "dp_today"),
        (y || M < this.nowDay && P <= this.nowMonth && m <= this.nowYear || P < this.nowMonth && m <= this.nowYear) && $addClass(p, "dp_old_day"),
        n++
      }
      $add(T, g)
    }
    return $add(_, d),
    $add(_, T),
    _
  },
  position: function() {
    if (this.container) {
      var e = $position(this.click_elm);
      $hasClass(this.click_elm, "fixed_pos") && (e.y += $scrollTop());
      var t = e.y + this.click_elm.offsetHeight + 9 + this.offset_y
        , a = e.x - this.container.offsetWidth / 2 + this.click_elm.offsetWidth / 2 + this.offset_x
        , r = document.documentElement.clientWidth;
      if (a + this.container.offsetWidth >= r && (a = r - this.container.offsetWidth - 5),
      $setTop(this.container, t),
      $setLeft(this.container, a),
      this.with_arrow_top) {
        var i = e.x - a + this.click_elm.offsetWidth / 2 + this.offset_x;
        $setLeft(this.arrow_top, i),
        this.arrow_left && $setLeft(this.arrow_top, 0)
      }
      FocusElm.focus(this.container, function() {
        MiniCal.click_elm.select && MiniCal.click_elm.select()
      }, null , !1)
    }
  },
  remove: function() {
    this.click_elm = null ,
    this.container && (this.active = !1,
    $remove(this.container),
    this.container = null ,
    this.onRemoved && this.onRemoved())
  },
  shown: function() {
    return this.active
  },
  setCurrent: function(e, t, a) {
    var r = MiniCal.genDate(e, parseInt(t) - 1, a);
    this.onSelect(r),
    this.setCurrentNoRender(r),
    this.remove()
  },
  setCurrentNoRender: function(e) {
    var t = e.getFullYear()
      , a = e.getMonth()
      , r = e.getDate();
    this.month = this.oldMonth = "" + a,
    this.year = this.oldYear = t,
    this.day = r,
    this.oldDay = r
  },
  reset: function() {
    this.month = null ,
    this.year = null ,
    this.day = null ,
    this.oldDay = null
  },
  _setDeltaDate: function(e) {
    var t = MiniCal.genDate(this.year, this.month, 1);
    if (0 == t.getMonth() && e == -1) {
      t.setDate(1),
      t.setMonth(11),
      t.setFullYear(t.getFullYear() - 1);
      var a = new Date;
      if (a = a.getFullYear(),
      t.getFullYear() < a)
        return
    } else
      11 == t.getMonth() && 1 == e ? (t.setDate(1),
      t.setMonth(0),
      t.setFullYear(t.getFullYear() + 1)) : (t.setDate(1),
      t.setMonth(t.getMonth() + e));
    this.year = t.getFullYear(),
    this.month = "" + t.getMonth(),
    this.day = t.getDate(),
    new_calendar_table = this._renderCalendarTable(),
    $replace(this.calendarTable, new_calendar_table)
  },
  selectPrevMonth: function() {
    return MiniCal._setDeltaDate(-1),
    !1
  },
  selectNextMonth: function() {
    return MiniCal._setDeltaDate(1),
    !1
  },
  genDate: function(e, t, a) {
    var r = new Date;
    return r.setYear(parseInt(e)),
    r.setDate(1),
    r.setMonth(parseInt(t)),
    r.setDate(parseInt(a)),
    r
  },
  getDaysInMonth: function(e, t) {
    return 1 == t ? e % 4 === 0 ? 29 : 28 : this.daysInMonth[t]
  }
};
MiniCal.create = $b(MiniCal.create, MiniCal);