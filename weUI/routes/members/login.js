/**
 * Created by gongcheng on 2016/12/30.
 */
var path = require('path')
var express = require('express');
var router = express.Router();
var sha1 = require('sha1')

var UserModel = require('../../models/users');
var checkNotLogin = require('../../middlewares/check').checkNotLogin

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function(req, res,next) {
    var name = req.fields.name;
    var password =req.fields.password;

    UserModel.getUserByName(name)
        .then(function (user) {
            if(!user) {
                req.flash('error', '用户不存在')
                return res.redirect('back')
            }
            if(password!==user.password){
                req.flash('error', '您输入的密码错误')
                return res.redirect('back')
            }

            req.flash('success','登入成功')
            delete user.password;
            req.session.user=user;
            res.redirect('/homelogin')
        })
        .catch(next)
});

module.exports = router;