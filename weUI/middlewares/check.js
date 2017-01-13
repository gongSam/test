/**
 * Created by gongcheng on 2016/12/27.
 */
module.exports={
    checkLogin:function checkLogin(req,res,next) {
        if(!req.session.user){
            req.flash('error','您还没有登入');
            return res.redirect('/loginhome')
        }
        next()
    },

    checkNotLogin: function checkNotLogin(req,res,next) {
        if(req.session.user){
            req.flash('error','已登入');
            return res.redirect('/')
        }
        next();
    }
}

;
