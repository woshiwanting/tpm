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
      overdue: false
    }
  },
  url: '/v1/api/tasks'
});

module.exports = TaskModel;