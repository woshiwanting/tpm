/**
 * @description 日期选择面板
 * @time 2016.10.27 14:43
 */

var dpContainerTpl = require('../tpl/dp_container.tpl');

var dpContainerView = Backbone.View.extend({
  el: 'body',
  events: {
    'click': 'destroy',
    'mouseover .dp__calDay': 'addHoverClass',
    'mouseout .dp__calDay': 'removeHoverClass',
    'click .cmp_10_arrow_left': 'showPreMonth',
    'click .cmp_9_arrow_right': 'showNextMonth'
  },
  template: dpContainerTpl,
  initialize: function() {
    var today = new Date();

    this.data = {
      today: today,
      dpHoverClass: 'dp_roll',
      now_year: today.getFullYear(),
      now_month: today.getMonth(),
      now_date: today.getDate(),
      being: false //日历选择器是否存在
    };
  },
  //增加hover效果
  addHoverClass: function(e) {
    var $target = $(e.target);
    $target.addClass(this.data.dpHoverClass);
  },
  //移除hover效果
  removeHoverClass: function(e) {
    var $target = $(e.target);
    $target.removeClass(this.data.dpHoverClass);
  },
  //销毁日期选择器
  destroy: function(e) {
    var $target = $(e.target);
    var condition = !$target.parents('.dp_container').length 
      && $target.get(0) !== $('.input_due_date').get(0)
      && $target.get(0) !== $('.dp_container').get(0);

    if (condition) {
      this.$el.find('.dp_container').remove();
      this.data.being = false;
    }
  },
  //显示上个月
  showPreMonth: function(e) {

    if (this.data.currentMonth == 0) {
      this.data.currentMonth = 11;
      this.data.currentYear -= 1;
    } else {
      this.data.currentMonth -= 1;
    }

    var preDate = new Date(this.data.currentYear, this.data.currentMonth, 1);
    this.data.being = false;

    var innerHtml = $(this.render(null, preDate, true)).find('table');
    this.$el.find('.dp_container table').replaceWith(innerHtml);

    e.stopPropagation();
  },
  //显示下个月
  showNextMonth: function(e) {

    if (this.data.currentMonth == 11) {
      this.data.currentMonth = 0;
      this.data.currentYear += 1;
    } else {
      this.data.currentMonth += 1;
    }

    var nextDate = new Date(this.data.currentYear, this.data.currentMonth, 1);
    this.data.being = false;

    var innerHtml = $(this.render(null, nextDate, true)).find('table');
    this.$el.find('.dp_container table').replaceWith(innerHtml);

    e.stopPropagation();
  },
  //style 样式
  //date 当前显示时间
  //isDisableRender 是否禁用渲染
  render: function(style, date, isDisableRender) {
    var tpl = _.template(this.template);
    date = date || new Date();

    if (this.data.being) {
      return;
    }

    var year = date.getFullYear();
    var month = date.getMonth();
    var tbody = this.getTbody(year, month);

    this.data = _.extend(this.data, {
      currentMonth: month,
      currentYear: year,
      tbody: tbody,
      today: this.data.today,
      being: true
    }, style);

    tpl = tpl(this.data);
    
    //后续切换月份更新日历使用
    if (isDisableRender) {
      return tpl;
    }

    return this.$el.append(tpl);
  },
  //返回当月第一天是星期几(1-7)
  getFirstDay: function(year, month) {
    var firstDay = new Date(year, month, 1).getDay();
    return firstDay == 0 ? 7 : firstDay;
  },
  //返回当月的总天数
  //https://github.com/lishengzxc/bblog/issues/5
  getTotalDays: function(year, month) {
    return new Date(year, month + 1, 0).getDate();
  },
  //返回日历主体
  getTbody: function(year, month) {
    var firstDay = this.getFirstDay(year, month);
    var days = this.getTotalDays(year, month);
    //上个月总天数
    var preDays = this.getTotalDays(year, month - 1);

    var theadView = ['<tr>'];
    var tdViews = ['<tr>'];
    var tdTpl = '<td class="dp__calDay {dp_old_day}" axis="{axis}">{date}</td>';

    //日历头部
    for (var m = 0; m < 7; m++) {
      var headTpl = '<th>{head}</th>';
      var head = ['一', '二', '三', '四', '五', '六', '日'];

      theadView.push(headTpl.replace(/{head}/g, head[m]));
    }
    //闭合theadview
    theadView.push('</tr>');

    //日期主体部分
    for (var i = 1; i <= 6 * 7; i++) {
      //本月日期
      var date = i - firstDay + 1;
      var dp_old_day = '';

      //上个月日期
      if (i < firstDay) {
        date = preDays - firstDay + i + 1;
        dp_old_day = 'dp_old_day';
      }

      //下个月日期
      if (i >= days + firstDay) {
        date = i - days - firstDay + 1;
        dp_old_day = 'dp_old_day';
      }

      //新周
      if (i % 7 == 1) {
        tdViews.push('</tr><tr>');
      }

      tdViews.push(tdTpl
      .replace(/{dp_old_day}/g, dp_old_day)
      .replace(/{axis}/g, [year, month + 1, i].join('|'))
      .replace(/{date}/g, date));
    }

    theadView.push(tdViews.join(''));

    return theadView.join('');
  }
});

module.exports = dpContainerView;