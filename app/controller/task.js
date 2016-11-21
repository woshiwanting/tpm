/**
 *@description 任务列表模块
 *@author shijianguo
 *@time 2016.11.17 14:05 
 */

'use strict';

var Task = require('../proxy/').Task;

//新增任务
exports.add = function *(next) {
  var  body = this.request.body;
  var task = {
    content:  body.content,
    assignee:  body.assignee,
    assigner:  body.assigner,
    level:  body.level
  };
  var result = yield Task.newAndSave(task);
  yield this.api(result);
};

//更新
exports.update = function *(next) {
  var id = this.params.taskId;
  var body = this.request.body;
  var level = body.level;

  var result = yield Task.update({_id: id}, {level: level});
  yield this.api(result);
};

//删除
exports.del = function *(next) {

};

//显示所有任务
exports.showAllList = function *(next) {
  var result = yield Task.findAll();
  yield this.api(result);
};

//根据taskid查找任务
exports.showItemById = function *() {

};