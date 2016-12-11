/**
 * @description 入口文件
 * @time 2016.10.26 10:56
 */

window.Backbone = require('backbone');
window._ = require('backbone/node_modules/underscore');
window.$ = require('jquery');

var UserModel = require('../model/user_model');

var AppView = Backbone.View.extend({
  el: '#login_form',
  events: {
    'click #submit_button': 'login'
  },
  initialize: function() {
    
  },
  //登录
  login: function() {
    this.$el.submit();
    // $.post('/v1/api/login', this.$el.serialize())
    // .then(function(result) {

    // }, function(err) {

    // });
  }
});

var App = new AppView;