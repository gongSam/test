/**
 * Created by gongcheng on 2017/1/9.
 */
var Post= require ('../lib/mongo').Post


module.exports={
    create: function create(post) {
        return Post.create(post).exec();
    },

    getUserByAllPost: function getUserByAllPost() {
        return Post
            .find()
            .exec();
    },
}