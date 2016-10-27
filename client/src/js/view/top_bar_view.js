/**
 * @description 顶部工具栏
 * @time 2016.10.26 15:15
 */

var topBarTpl = require('../tpl/top_bar.tpl');
// var Backbone = require('backbone');
// var _ = require('backbone/node_modules/underscore');

var topBarView = Backbone.View.extend({
  el: '#top_bar',
  events: {},
  template: topBarTpl,
  initialize: function() {},
  render: function() {
    var self = this;
    var tpl = _.template(this.template)();
    this.$el.html(tpl);
  }
});

module.exports = topBarView;