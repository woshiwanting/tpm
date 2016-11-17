/**
 * @description Task Schema
 * @author shijianguo
 * @time 2016.11.17 15:21
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  //任务唯一id
  task_id: { type: Schema.ObjectId },
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
  //任务是否完成
  accomplished: {type: Boolean, default: false},
  //任务是否过期
  overdue: {type: Boolean, default: false}
});

TaskSchema.pre('save', function(next){
  var now = new Date();
  this.update_at = now;
  next();
});

mongoose.model('Task', TaskSchema);