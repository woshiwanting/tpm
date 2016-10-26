/**
 * @description 左侧列表栏
 * @time 2016.10.26 15:14
 */

var listHolderTpl = require('../tpl/list_holder.tpl');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');

var listHolderView = Backbone.View.extend({
  el: '#list_holder',
  events: {},
  template: listHolderTpl,
  initialize: function() {},
  render: function() {
    var self = this;
    var tpl = _.template(this.template)();
    this.$el.html(tpl);
  }
});

module.exports = listHolderView;