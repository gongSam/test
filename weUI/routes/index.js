/**
 * Created by gongcheng on 2016/12/30.
 */
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    app.use('/home', require('./home'));
    app.use('/intro', require('./intro'));
    app.use('/notice', require('./notice'));
    app.use('/news', require('./news'));
    app.use('/login', require('./members/login'));
    app.use('/registry', require('./members/registry'));
    app.use('/members', require('./members/members'));
    app.use('/policy', require('./policy'));
    app.use('/tranning', require('./trainning'));
    app.use('/state', require('./state'));
    app.use('/insuranceknowledge', require('./insuranceknow'));
    app.use('/admin', require('./admin/admin'))
    app.use('/user-form', require('./admin/user-form'))
    app.use('/homelogin', require('./homelogin'))
};