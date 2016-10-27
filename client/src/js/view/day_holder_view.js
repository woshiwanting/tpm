/**
 * @description 今天及接下来7天按日期展示的任务列表
 * @time 2016.10.26 15:12
 */

var dayHolderTpl = require('../tpl/day_holder.tpl');
// var Backbone = require('backbone');
// var _ = require('backbone/node_modules/underscore');

var dayHolderView = Backbone.View.extend({
  el: '#editor',
  events: {},
  template: dayHolderTpl,
  initialize: function() {},
  render: function() {
    var self = this;
    var tpl = _.template(this.template)();
    this.$el.html(tpl);
  }
});

module.exports = dayHolderView;