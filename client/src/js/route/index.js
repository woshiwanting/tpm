/**
 * @description 前端route
 * @time 2016.10.26 16:54
 */
var Backbone = require('backbone');

var dayHolderView = require('../view/day_holder_view.js');
var projectInstanceView = require('../view/project_instance_view.js');

var router = Backbone.Router.extend({
  routes: {
    'project/today': 'showProjectInstance',
    'agenda/today': 'showTodayInstance',
    'agenda/days': 'showLaterInstance'
  },
  initialize: function() {
    this.dayHolderView = new dayHolderView();
    this.projectInstanceView = new projectInstanceView();
  },
  showProjectInstance: function() {
    this.projectInstanceView.render();
  },
  showTodayInstance: function() {
    this.dayHolderView.render();
  },
  showLaterInstance: function() {
    this.dayHolderView.render();
  }
});

module.exports = router;