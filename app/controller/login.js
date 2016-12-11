/**
 *@description 登录
 *@author shijianguo
 *@time 2016.12.11 10:38
 */

var crypto = require('crypto');
var User = require('../proxy/').User;

module.exports = {
  show: function*() {
    var self = this;
    
    if (self.userInfo) {
      return this.redirect('/');
    }

    yield self.render('login', {
      userInfo: self.userInfo || null,
      noWrap: true,
      pageName: 'login_signup',
      error: this.session.error
    });
  },
  //登录验证
  validate: function *() {
    var body = this.request.body;
    var email = body.email;
    var password = body.password;

    //生成密码的 md5 值
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    var user = yield User.find({email: email});
    var person = user[0];

    if (!person) {
      this.session.error = '用户不存在!';
      return this.redirect('/login');
    }

    if (person.password != password) {
      this.session.error = '密码错误!';
      return this.redirect('/login');
    }

    this.cookies.set('tiancainame', person.name , { signed: true });
    this.session[person.name] = person;

    this.session.error = null;
    this.redirect('/');
  },
  //注销
  logout: function *() {
    this.cookies.set('tiancainame', null, { signed: true });
    this.session = null;
    this.response.redirect('/login');
  }
};