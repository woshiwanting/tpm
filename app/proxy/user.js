/**
 *@description 用户信息模块
 *@author shijianguo
 *@time 2016.12.11 11:13
 */

'use strict';

var mongoose = require('mongoose');

var models = require('../models');
var User = models.User;

//创建用户
exports.newAndSave = function(props) {
  var user = new User(props);
  return user.save();
};

//获取用户信息
exports.find = function(user) {
  return User.find({email: user.email});
};