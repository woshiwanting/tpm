/**
 * @description 收件箱中按日期展示的任务列表
 * @time 2016.10.26 16:02
 */

var projectInstanceTpl = require('../tpl/project_instance.tpl');
var taskItemTpl = require('../tpl/task_item.tpl');

var TaskModel = require('../model/task_model.js');

var addTaskView = require('./add_task_view.js');

var projectInstanceView = Backbone.View.extend({
  el: '#editor',
  events: {
    'click #J-addTask': 'showAddTaskPanel'
  },
  template: projectInstanceTpl,
  initialize: function() {
    this.addTaskView = new addTaskView();
    this.model = new TaskModel;
  },
  showAddTaskPanel: function() {
    // var innerHtml = this.addTaskView.render('#J-taskItem');
  },
  render: function() {
    this.model.fetch()
    .then(function(result) {
      var taskListFragment = _.template(taskItemTpl)({taskList: result});
      var tpl = _.template(this.template)({taskListFragment: taskListFragment});
      this.$el.html(tpl);
    }.bind(this), function(err) {

    });
  }
});

module.exports = projectInstanceView;