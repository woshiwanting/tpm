/**
 * @description task client model
 * @author shijianguo
 * @time 2016.11.21 13:43
 */

'use strict';

var TaskModel = Backbone.Model.extend({
  defaults: function() {
    return {
      //任务创建时间
      create_time: Date.now(),
      //任务更新时间
      update_time: Date.now(),
      //任务完成时间
      end_time: Date.now(),
      //任务具体内容
      content: '',
      //分配到任务的人
      assignee: '',
      //分配任务的人
      assigner: '',
      //任务级别
      level: 1,
      //优先级
      priority: 1,
      //父级节点
      parent: null,
      //祖先节点
      ancestors: [],
      //任务是否完成
      accomplished: false,
      //任务是否过期
      overdue: false,
      //该节点的排序，渲染的实惠
      sort:1
    }
  }
});
var TaskCollection = Backbone.Collection.extend({
  model:TaskModel,
  url: '/v1/api/tasksUpdate',
  // 将集合中所有模型提交到服务器接口
  createAll: function(options) {
    return Backbone.sync.call(this, 'create', this, options);
  },
  // 修改集合中的所有模型数据
  updateAll: function(options) {
    return Backbone.sync.call(this, 'update', this, options);
  }
});

module.exports = TaskCollection;