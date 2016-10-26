'use strict';

var browserify = require('browserify');
var path = require('path');
var fs = require('fs');

function browserifyStream(opts) {
  var b = browserify(opts);
  b.transform(require('stringify')(['.tpl']));
  return b;
};

module.exports = function() {
  return function *(next) {
    var jsPrefix = '/client/src';
    var url = this.originalUrl;

    if (!url.match(/\.js($|\?)/i)) {
      return yield next;
    }

    var filePath = path.join(__dirname, '../..', jsPrefix, url);
    this.type = 'text/javascript';

    try {
      var b = browserifyStream(filePath);
      b.on('error', function (e) {
        console.log(e.stack);
      });
      return this.body = b.bundle();
    } catch (e) {
      console.log(e.stack);
      this.status= 500;
      var errMsg = e.toString();
      this.body = '/*\n' + errMsg + '\n*\/';
    }
  };
};