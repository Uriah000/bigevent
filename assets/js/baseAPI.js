// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)

    // 统一为有权限的接口设置根路径
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete函数
    options.complete = function(res) {
        console.log(res)
            //在complete回调函数中，通过res.responseJSON拿到服务器相应回的数据
        if (res.responseJSON.status === 1 & res.responseJSON.message === '身份认证失败！') {
            // 1，清空本地存储中的token
            localStorage.removeItem('token')
                // 2.跳转到登录页
            location.href = '/login.html'
        }
    }

})