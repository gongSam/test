/**
 * Created by gongcheng on 2017/1/9.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('homelogin');
});


module.exports = router;