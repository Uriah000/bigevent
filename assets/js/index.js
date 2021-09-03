$(function() {
    getUserInfo()

    var layer = layui.layer;

    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1，清空本地存储中的token
            localStorage.removeItem('token')
                // 2.跳转到登录页
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /*         headers: {
                    Authorization: localStorage.getItem('token') || ''
                }, */
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用渲染用户头像的方法renderAvatar
            renderAvatar(res.data)
        }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名
    var name = user.nickname || user.username

    // 2.渲染欢迎词
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.text-avatar').html(first).hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        // 渲染用户头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}