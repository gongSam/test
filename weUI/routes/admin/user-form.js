/**
 * Created by gongcheng on 2017/1/4.
 */
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../../models/users')

router.get("/", function (req, res, next) {
    UserModel.getUserByAllUsers()
        .then(function (users) {
            res.render('user-form', {
                users: users
            })
        })
        .catch(next);
})


router.post('/', function (req, res, next) {
        var name = req.fields.name;
        var gender = req.fields.gender;
        var bio = req.fields.bio;
        var avatar = req.files.avatar.path.split(path.sep).pop();
        var password = req.fields.password;
        var repassword = req.fields.repassword;

        try {
            if (!(name.length >= 1 && name.length <= 10)) {
                throw new Error('名字请限制在 1-10 个字符');
            }
            if (['m', 'f', 'x'].indexOf(gender) === -1) {
                throw new Error('性别只能是 m、f 或 x');
            }
            if (!(bio.length >= 1 && bio.length <= 30)) {
                throw new Error('个人简介请限制在 1-30 个字符');
            }
            if (!req.files.avatar.name) {
                throw new Error('缺少头像');
            }
            if (password.length < 6) {
                throw new Error('密码至少 6 个字符');
            }
            if (password !== repassword) {
                throw new Error('两次输入密码不一致');
            }

        } catch (e) {
            req.flash('error', e.message);
            return res.redirect('/user-form');
        }

        password = sha1(password)

        var user = {
            name: name,
            password: password,
            gender: gender,
            bio: bio,
            avatar: avatar
        }

        UserModel.create(user)
            .then(function (result) {
                user = result.ops[0];
                delete user.password;
                req.session.user = user;
                req.flash('success', '注册成功');
                res.redirect('/user-form');
            })
            .catch(function (e) {
                //fs.unlink(req.files.avatar.path);
                if (e.message.match('E11000 duplicate key')) {
                    req.flash('error', '用户名已被占用');
                    return res.redirect('/user-form');
                }
                next(e);
            })
    }
);


router.get('/search', function (req, res, next) {
    res.render('search')
})

router.post('/search', function (req, res, next) {
        var name = req.fields.sByName;

        try {
            if (name.length <= 0) {
                throw new Error('名字不能为空');
            }
        } catch (e) {
            req.flash('error', e.message)
            return res.redirect('back');
        }

        UserModel.getUserByName(name)
            .then(function (userone) {
                if (!userone) {
                    req.flash('error', '用户不存在');
                    return res.redirect('back');
                }
                console.log(userone)
                res.render('search', {
                    userone: userone
                })
            })
            .catch(next)
    }
)


router.get('/:userId/remove', function (req, res, next) {
    var userId = req.params.userId;
    var name = req.session.name
    UserModel.delUserById(userId)
        .then(function () {
            res.redirect('/user-form')
        })
        .catch(next);
})

router.get('/:userId/user-update', function (req, res, next) {
    var userId = req.params.userId;
    var name = req.session.name;
    Promise.all([
        UserModel.getUserByAllUsers(),
        UserModel.getUserById(userId, name)
    ])
        .then(function (result) {
            var users = result[0]
            var auser = result[1]
            res.render('user-update', {
                auser: auser,
                users: users
            })
        })
        .catch(next)
})

router.post('/:userId/edit', function (req, res, next) {
    var userId = req.params.userId;
    var name = req.fields.name;
    var password = req.fields.password;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var gender = req.fields.gender;

    // 校验参数
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/user-form');
    }

    UserModel.updateUserById(userId, {name: name, avatar: avatar, bio: bio, gender: gender, password: password})
        .then(function () {
            res.redirect('/user-form')
        })
        .catch(next);
})


module.exports = router;
