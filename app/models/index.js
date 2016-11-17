/**
 * @description Model入口
 * @author shijianguo
 * @time 2016.11.17 17:59
 */

'use strict';

var mongoose = require('mongoose');

var tclog = require('../libs/tclog.js');
var genLogid = require('../libs/logid').genLogid;
var config = require('../../conf/');

mongoose.Promise = global.Promise;

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    var logid = genLogid();
    tclog.error({logid: logid, err: err});
    process.exit(1);
  }
});

// models
require('./task');

exports.Task = mongoose.model('Task');