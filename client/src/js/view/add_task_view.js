/**
 * @description 添加任务
 * @time 2016.10.26 11:34
 */

var addTaskTpl = require('../tpl/add-task.tpl');
var taskItemTpl = require('../tpl/task_item.tpl');

var dpContainerView = require('./dp_container_view.js');
var drapAndDropView = require('./drap_and_drop_view.js');

var addTaskView = Backbone.View.extend({
  el: '#editor',
  state: {
    being: false
  },
  events: {
    'click .cancel': 'destroy',
    'click .submit_btn': 'addTask',
    'click #J-addTask': 'addTask',
    'click .input_due_date': 'showDpView',
    'mouseover .manager:not(.drop_item)': 'showDrapView'
  },
  template: addTaskTpl,
  initialize: function() {
    //任务编辑器选择器
    this.editorSelector = '.manager';
    //日期选择
    this.dpContainerView = new dpContainerView;
    //拖拽组件
    this.drapAndDropView = new drapAndDropView;
  },
  //日期选择面板
  showDpView: function(e) {
    var $target = $(e.target);
    var offset = $target.offset();
    this.dpContainerView.render({
      dp_container_style: 'top: {top}px; left: {left}px; z-index: 5000'.replace(/{top}/g, offset.top + 36).replace(/{left}/g, 1000),
      arrow_top_style: 'left: {left}; z-index: 5100'.replace(/{left}/g, '50%'),
    });
  },
  //显示拖拽组件
  showDrapView: function() {
    this.drapAndDropView.render(this.editorSelector);
  },
  //添加单项任务
  addTask: function() {
    var title = $('#J-richtext_editor').text();

    if (!$.trim(title).length) {
      return;
    }

    //uuid
    this.$id = 'item_' + Date.now();
    this.indent = this.getIndent();
    var taskItemHtml = _.template(taskItemTpl)({title: title, indent: this.indent, id: this.$id});
    
    this.$container.find(this.editorSelector).before(taskItemHtml);
    this.replace();
  },
  //销毁添加任务编辑器
  destroy: function(e) {
    var $ele = $(e.target);
    $ele.parents(this.editorSelector).remove();
    this.drapAndDropView.destroy();
    this.state.being = false;
  },
  //添加任务编辑器
  render: function(selector, data) {
    var tpl = _.template(this.template)(data);
    this.$container = $(selector);
    
    if (this.state.being) {
      return this;
    }

    this.$container.append(tpl);
    this.state.being = true;
    return this;
  },
  //更新任务编辑器
  replace: function() {
    var tpl = _.template(this.template)();
    this.$el.find(this.editorSelector).remove();
    this.drapAndDropView.destroy();

    var $newTaskItem = this.$el.find('#' + this.$id);
    var $placeholder = $(tpl);
    
    $placeholder.removeClass(function() {
      return this.className.match(/(indent_\d+)/g)[0];
    }).addClass(this.indent);

    $newTaskItem.after($placeholder);

    this.$id = null;
    this.indent = null;
  },
  //获取缩进
  getIndent: function() {
    return $(this.editorSelector)[0].className.match(/(indent_\d+)/)[1];
  }
});

module.exports = addTaskView;