/**
 * Created by gongcheng on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../../models/users')
var checkLogin =require('../../middlewares/check').checkLogin


router.get('/', function(req, res) {
    res.render('members');
});


router.get('/usersquery',checkLogin, function(req,res,next) {
    UserModel.getUserByAllUsers()
        .then(function (userall) {
            res.render('usersquery',{
                userall:userall
            })
        })
        .catch(next)
});

router.post('/usersquery/userssearch',checkLogin,function (req,res,next) {
    var name =req.fields.getName;
    try {
        if (name.length <= 0) {
            throw new Error('名字不能为空');
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('/members/usersquery');
    }
    UserModel.getUserByName(name)
        .then(function (usersone) {
            if(!usersone){
                req.flash('error', '用户不存在');
                return res.redirect('back');
            }
            console.log(usersone)
            res.render('userssearch',{
                usersone:usersone
            })
        })
        .catch(next)
})
module.exports = router;