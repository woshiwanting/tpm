/**
 *@description 任务列表模块
 *@author shijianguo
 *@time 2016.11.17 14:05 
 */

'use strict';

var Task = require('../proxy/').Task;

//新增任务
exports.add = function *(next) {
  var result = yield Task.newAndSave();
  yield this.api(result);
};

//更新
exports.update = function *(next) {
  var id = this.params.taskId;
  yield this.api(id);
};

//删除
exports.del = function *(next) {

};

//显示所有任务
exports.showAllList = function *(next) {

};

//根据taskid查找任务
exports.showItemById = function *() {

};