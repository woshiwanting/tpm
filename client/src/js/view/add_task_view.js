/**
 * @description 添加任务
 * @time 2016.10.26 11:34
 */

var addTaskTpl = require('../tpl/add-task.tpl');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');

var addTaskView = Backbone.View.extend({
  el: '',
  events: {
    'click .cancel': 'destroy'
  },
  template: addTaskTpl,
  initialize: function() {

  },
  render: function(data) {
    var tpl = _.template(this.template)(data);
    this.delegateEvents();
    return this.$el.append(tpl).html();
  }
});

module.exports = addTaskView;