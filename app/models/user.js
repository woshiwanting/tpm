/**
 * @description User Schema
 * @author shijianguo
 * @time 2016.12.11 11:08
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  //用户id
  user_id: { type: Schema.Types.ObjectId, index: true },
  //用户名
  name: String,
  //密码
  password: String,
  //邮箱
  email: String,
  //手机号
  mobile: Number,
  //注册时间
  c_time: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (!this.user_id) {
    this.user_id = new mongoose.Types.ObjectId;
  }
  next();
});

mongoose.model('User', UserSchema);