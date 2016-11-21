/**
 *@description 任务列表模块
 *@author shijianguo
 *@time 2016.11.17 17:58 
 */

'use strict';

var mongoose = require('mongoose');

var models = require('../models');
var Task = models.Task;

//创建并保存一个任务
exports.newAndSave = function(props) {
  var task = new Task(props);
  // task.task_id = new mongoose.Types.ObjectId;
  return task.save();
};

//查找所有任务
exports.findAll = function() {
  return Task.find({});
};

//更新
exports.update = function(condition, doc, options) {
  return Task.update(condition, doc, options);
};