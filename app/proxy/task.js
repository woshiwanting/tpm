/**
 *@description 任务列表模块
 *@author shijianguo
 *@time 2016.11.17 17:58 
 */

'use strict';

var models = require('../models');
var Task = models.Task;

//创建并保存一个任务
exports.newAndSave = function() {
  var task = new Task();
  return task.save();
};