/**
 * @description 收件箱中按日期展示的任务列表
 * @time 2016.10.26 16:02
 */

var projectInstanceTpl = require('../tpl/project_instance.tpl');
// var Backbone = require('backbone');
// var _ = require('backbone/node_modules/underscore');
// var $ = require('jquery');

var addTaskView = require('./add_task_view.js');

var projectInstanceView = Backbone.View.extend({
  el: '#editor',
  events: {
    'click #J-addTask': 'showAddTaskPanel'
  },
  template: projectInstanceTpl,
  initialize: function() {
    this.addTaskView = new addTaskView();
  },
  showAddTaskPanel: function() {
    var innerHtml = this.addTaskView.render('#J-taskItem', {open: true});
  },
  render: function() {
    var self = this;
    var tpl = _.template(this.template)();
    this.$el.html(tpl);
  }
});

module.exports = projectInstanceView;