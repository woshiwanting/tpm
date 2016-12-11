/**
 * @description user client model
 * @author shijianguo
 * @time 2016.12.11 11:37
 */

'use strict';

var UserModel = Backbone.Model.extend({
  defaults: function() {
    return {
      //用户名
      name: '',
      //密码
      password: '',
      //邮箱
      email: '',
      //手机号
      mobile: ''
    }
  },
  url: '/v1/api/users'
});

module.exports = UserModel;