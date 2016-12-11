/**
 * @file index.js
 * @desc router配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
var router = require('koa-router')();
var ctrs = [];
function getC(app) {
    return new Promise(function (resovel, reject) {
        try {
            ctrs = require('../libs/ctrs.js').getCtrs();
            resovel(ctrs);
        }
        catch (e) {
            reject(e);
        }
    });
}

function set(app) {
    app.use(router.routes());
    getC(app).then(function (ctrs) {
        setMap(ctrs);
    }).catch(function (e) {
        console.log(e);
    });
}

function setMap(ctrs) {
    router.get('/', ctrs.index.show);
    router.get('/login', ctrs.login.show);
    router.post('/login', ctrs.login.validate);
    router.get('/register', ctrs.register.show);

    router.post('/v1/api/login', ctrs.login.validate);
    router.post('/v1/api/users', ctrs.register.create);
    
    router.post('/v1/api/tasks', ctrs.task.add);
    router.put('/v1/api/tasks/:taskId', ctrs.task.update);
    router.del('/v1/api/tasks/:taskId', ctrs.task.del);
    router.get('/v1/api/tasks/:taskId', ctrs.task.showItemById);
    router.get('/v1/api/tasks', ctrs.task.showAllList);
}
module.exports = set;
