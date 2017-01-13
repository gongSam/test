/**
 * Created by gongcheng on 2016/12/27.
 */
var marked = require('marked');
var User = require('../lib/mongo').User

// 将 post 的 content 从 markdown 转换成 html
User.plugin('contentToHtml', {
    afterFind: function (users) {
        return users.map(function (user) {
            user.avatar = marked(user.avatar);
            return user;
        });
    },
    afterFindOne: function (user) {
        if (user) {
            user.avatar = marked(user.avatar);
        }
        return user;
    }
});

module.exports = {
    create: function create(user) {
        return User.create(user).exec();
    },
    // 通过用户名获取用户信息
    getUserByName: function getUserByName(name) {
        return User
            .findOne({name: name})
            .exec();
    },

    getUserById: function getUserById(userId) {
        return User
            .findOne({_id: userId})
            .exec();
    },
    getAllUserById:function getAllUserById(userId) {
        return User
            .fine({_id:userId})
            .exec();
    },

    getUserByAllUsers: function getUserByAllName() {
        return User
            .find()
            .exec();
    },

    getSpeicalUsers: function getSpecialUsers(name) {
        var query = {};
        if (name) {
            query.name = name;
        }
        return User
            .find(query)
            .populate({path: 'name', model: 'User'})
            .exec();
    },

    delUserById: function delUserById(userId) {
        return User
            .remove({_id: userId})
            .exec();
    },

    updateUserById: function updateUserById(userId, data) {
        return User.update({_id: userId}, {$set: data}).exec();
    }
}