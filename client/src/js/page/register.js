/**
 * @description 入口文件
 * @time 2016.10.26 10:56
 */

window.Backbone = require('backbone');
window._ = require('backbone/node_modules/underscore');
window.$ = require('jquery');

var UserModel = require('../model/user_model');

var AppView = Backbone.View.extend({
  el: '#sign_up_form',
  events: {
    'click #submit_button': 'create'
  },
  initialize: function() {
    
  },
  //创建用户
  create: function() {
    var user = new UserModel({
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    });

    user.save()
    .then(function(result) {
      if (result.success) {
        location.href = '/';
      } else {
        location.href = '/login';
      }
    }, function(err) {
      location.href = '/register';
    })
  }
});

var App = new AppView;