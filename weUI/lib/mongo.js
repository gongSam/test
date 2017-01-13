/**
 * Created by gongcheng on 2016/12/30.
 */

var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: {type: "string"},
    avatar: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
})
exports.User.index({name: 1, _id: 1}, {unique: true}).exec();

exports.Post = mongolass.model('Post', {
    title: {type:'string'},
    avatar:{type:'string'},
    content: {type: 'string'},
    contenttitle:{type:'string'}
    //postId: { type: Mongolass.Types.ObjectId }
})
exports.User.index({ _id: 1}).exec();