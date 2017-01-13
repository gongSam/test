/**
 * Created by gongcheng on 2016/12/30.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('home');
});

module.exports = router;