/**
 *@description 注册
 *@author shijianguo
 *@time 2016.12.11 10:45
 */

var moment = require('moment');
var crypto = require('crypto');
var User = require('../proxy/').User;

module.exports = {
  show: function*() {
    var self = this;
    
    if (self.userInfo) {
      return this.redirect('/');
    }

    yield self.render('register', {
      userInfo: self.userInfo || null,
      noWrap: true,
      pageName: 'login_signup'
    });
  },
  //创建用户
  create: function *() {
    var body = this.request.body;
    var name = body.name;
    var email = body.email;
    var password = body.password;

    //生成密码的 md5 值
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    //用户信息
    var user = {
      name: name,
      email: email,
      password: password,
      c_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    };

    var findResult = yield User.find(user);

    //检测是否注册过
    if (findResult.length) {
      yield this.api({
        success: false,
        err: '您已注册过'
      });
    } else {
      var person = yield User.newAndSave(user);
      person = person[0];
      this.cookies.set('tiancainame', person.name , { signed: true });
      this.session[person.name] = person;
      person.success = true;
      yield this.api(person);
    }

  }
};