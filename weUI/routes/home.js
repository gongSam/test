/**
 * Created by gongcheng on 2016/12/30.
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users')

router.get('/', function (req, res, next) {
    res.render('home')
});

module.exports = router;