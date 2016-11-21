/**
 * @description 添加任务
 * @time 2016.10.26 11:34
 */

var addTaskTpl = require('../tpl/add-task.tpl');
var taskItemTpl = require('../tpl/task_item.tpl');

var dpContainerView = require('./dp_container_view.js');
var drapAndDropView = require('./drap_and_drop_view.js');

var TaskModel = require('../model/task_model.js');

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
    'mouseover .manager': 'showDrapView',
    'mouseover .task_item': 'showDrapView',
    // 'mouseout .task_item': 'hideDrapView'
  },
  template: addTaskTpl,
  initialize: function() {
    //任务编辑器选择器
    this.editorSelector = '.manager';
    //存放编辑器的容器
    this.targetContainer = '#J-taskItem';
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
  showDrapView: function(e) {
    var $target = $(e.currentTarget);
    this.drapAndDropView.render($target);
  },
  hideDrapView: function(e) {
    var $currentTarget = $(e.currentTarget);
    var $target = $(e.target);
    
    clearTimeout(this.dragTimer);
    this.dragTimer = setTimeout(function() {
      if ($target.parents('.task_item').length) {
        this.drapAndDropView.destroy($currentTarget);
        this.dragTimer = null;
      }
    }.bind(this), 200);
  },
  //添加单项任务
  addTask: function(e) {
    var $editorInput = $('#J-richtext_editor');
    var title = $editorInput.text();
    var $target = $(e.currentTarget);
    //是否是编辑器的添加任务按钮
    var isEditorSubmit = $target.hasClass('submit_btn');

    //还未创建编辑器
    if (!$editorInput.length) {
      return this.render(this.targetContainer, true);
    }

    //还没输入任务内容
    if (!$.trim(title).length) {

      //点击编辑器的添加任务
      if (isEditorSubmit) {
        return;
      }

      //点击列表中的添加任务，重新创建
      return this.render(this.targetContainer, true);
    }

    //uuid
    this.$id = Date.now();
    this.indent = this.getIndent();
    this.title = title;
    var taskItemHtml = _.template(taskItemTpl)({title: title, indent: this.indent, id: this.$id});
    
    this.$container.find(this.editorSelector).before(taskItemHtml);

    this.save();

    isEditorSubmit ? this.replace() : this.render(this.targetContainer, true);
  },
  //创建任务
  save: function() {
    var task = new TaskModel({
      level: /\d+/.exec(this.indent)[0],
      task_id: this.$id,
      content: this.title
    });
    task.save();
  },
  //销毁添加任务编辑器
  destroy: function(e) {
    var $ele = $(e.target);
    this.drapAndDropView.destroy($(this.editorSelector));
    $ele.parents(this.editorSelector).remove();
    this.state.being = false;
  },
  //添加任务编辑器
  render: function(selector, isForcedRender) {
    var editorTpl = _.template(this.template)();

    this.$container = selector ? $(selector) : this.$container;
    this.$el.find(this.editorSelector).remove();
    this.drapAndDropView.setState({being: false});
    this.$container.append(editorTpl);

    return this;
  },
  //更新任务编辑器
  replace: function() {
    var tpl = _.template(this.template)();
    this.drapAndDropView.destroy($(this.editorSelector));
    this.$el.find(this.editorSelector).remove();

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