/**
 * @description Task Schema
 * @author shijianguo
 * @time 2016.11.17 15:21
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  //任务id
  task_id: { type: Schema.Types.ObjectId, index: true },
  //任务创建时间
  create_time: { type: Date, default: Date.now },
  //任务更新时间
  update_time: { type: Date, default: Date.now },
  //任务完成时间
  end_time: { type: Date, default: Date.now },
  //任务具体内容
  content: String,
  //分配到任务的人
  assignee: String,
  //分配任务的人
  assigner: String,
  //任务级别
  level: Number,
  //优先级
  priority: Number,
  //任务是否完成
  accomplished: {type: Boolean, default: false},
  //任务是否过期
  overdue: {type: Boolean, default: false}
});

TaskSchema.add({
  //添加parent属性，生成Tree结构
  parent: {
    type: Schema.Types.ObjectId,
    set: function(val) {
      //include val is equal to null
      if (val === null) {
        return null;
      }

      if (typeof(val) === 'object' && val._id) {
        return val._id;
      }

      return val;
    },
    index: true
  },
  //添加ancestors属性，生成Tree结构
  ancestors: {
    type: [Schema.Types.ObjectId],
    set: function(val) {
      if (val === null) {
        return '';
      }
      return val;
    }
  }
});

TaskSchema.pre('save', function(next) {
  if (!this.task_id) {
    this.task_id = new mongoose.Types.ObjectId;
  }
  next();
});

mongoose.model('Task', TaskSchema);