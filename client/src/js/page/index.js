/**
 * @description 入口文件
 * @time 2016.10.26 10:56
 */
// var Backbone = require('backbone');
// var _ = require('backbone/node_modules/underscore');

window.Backbone = require('backbone');
window._ = require('backbone/node_modules/underscore');
window.$ = require('jquery');

var topBarView = require('../view/top_bar_view.js');
var listHolderView = require('../view/list_holder_view.js');

var Router = require('../route/index.js');

var AppView = Backbone.View.extend({
  el: '',
  events: {
    // 'click #filter_inbox': 'showProjectInstance',
    // 'click #filter_today': 'showTodayInstance',
    // 'click #filter_later': 'showLaterInstance'
  },
  initialize: function() {
    this.topBarView = new topBarView();
    this.listHolderView = new listHolderView();

    this.render();

    var router = new Router();
    Backbone.history.start();

    router.navigate('project/today', {trigger: true});
  },
  render: function() {
    this.topBarView.render();
    this.listHolderView.render();
  }
});

var App = new AppView;