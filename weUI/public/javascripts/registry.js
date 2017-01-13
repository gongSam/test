/**
 * Created by gongcheng on 2017/1/11.
 */
/**
 * Created by gongcheng on 2017/1/11.
 */

$(function (){
    $('#defaultform')
        .bootstrapValidator({
            message: '这是一个非法的值',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    message: '用户名不合法',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空',
                        },
                        stringLength: {
                            min: 6,
                            max: 10,
                            message: '用户名长度必须在6到10之间',
                        },

                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '姓名必须包括大写字母，数字，逗号和下划线'
                        },
                        different: {
                            field: 'password',
                            message: '用户名和密码不能相同'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能不能为空',
                        },

                        identical: {
                            field: 'repassword',
                            message: '两次密码输入的不一致'
                        },
                        different: {
                            field: 'name',
                            message: '用户名和密码不能相同'
                        }
                    }
                },
                repassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能不能为空',
                        },

                        identical: {
                            field: 'password',
                            message: '两次密码输入的不一致'
                        },
                        different: {
                            field: 'name',
                            message: '用户名和密码不能相同'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {
                            message: '性别不能为空'
                        }
                    }
                },
                avatar: {
                    validators: {
                        notEmpty: {
                            message: '头像不能为空'
                        }
                    }
                },
                bio: {
                    validators: {
                        notEmpty: {
                            message: '自我简介不能为空'
                        },
                        stringLength: {
                            min: 0,
                            max: 100,
                            message: '自我简介的长度必须小于100个字',
                        },
                    }
                },
            }
        });
})
