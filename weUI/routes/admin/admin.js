/**
 * Created by gongcheng on 2017/1/4.
 */
var path = require('path');
var express = require('express');
var router = express.Router();

var checkLogin= require('../../middlewares/check').checkLogin
var PostModel = require('../../models/post')

router.get('/', function(req, res) {
    res.render('admin');
});

router.get('/adminintro' ,function(req,res){
    res.render('adminintro')
})

router.get('/admin-pagesetting' ,function(req,res){
    res.render('admin-pagesetting')
})

router.post('/admin-pagesetting',checkLogin, function(req,res,next){
    var title = req.fields.title;
    var content = req.fields.content;
    var contenttilte=req.fields.contenttitle
    var avatarWsetting= req.files.avatarWsetting.path.split(path.sep).pop();
    var post={
        title: title,
        content:content,
        contenttitle:contenttilte,
        avatarWsetting:avatarWsetting,

    }

    PostModel.create(post)
        .then(function (result) {
            post = result.ops[0];
            console.log(post)
            req.flash('success','页面设置成功')
            return res.redirect('/admin/admin-pagesetting')
        })
        .catch(next)
})
module.exports = router;