/**
 *@description 任务列表模块
 *@author shijianguo
 *@time 2016.11.17 14:05 
 */

'use strict';

var Task = require('../proxy/').Task;
var _ = require('lodash');

//新增任务
exports.add = function *(next) {
  var task = this.request.body;
  var result = yield Task.newAndSave(task);
  yield this.api(result);
};

//更新
exports.update = function *(next) {
  var id = this.params.taskId;
  var body = this.request.body;
  var level = body.level;

  var result = yield Task.update({task_id: id}, {level: level});
  yield this.api(result);
};

//删除
exports.del = function *(next) {

};

//显示所有任务
exports.showAllList = function *(next) {
  var result = yield Task.findAll();
  var processer = [];
  var processerCopy = [];
  var rest = [];

  //存储所有的根节点
  // processer = _.filter(result, function(o) {
  //   return o.level == 1;
  // });

  result.forEach(function(o, i) {
    if (o.level == 1) {
      //存储所有的根节点
      processer.push(o);
      processerCopy.push(o);
    } else {
      //存储所有的除根节点以外的节点
      rest.push(o);
    }
  });

  processerCopy.forEach(function(v, i) {
    var children = _.filter(rest, function(o) {
      return o.ancestors.indexOf(v.task_id) != -1;
    });

    [].unshift.apply(children, [i + 1, 0]);
    [].splice.apply(processer, children);
  });

  yield this.api(processer);
};

//根据taskid查找任务
exports.showItemById = function *() {

};