$ = jQuery = require('jquery');
function register() {
    // id="username" id="password" id="confirmPassword"
    var username = $("#username").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if (username == "" || password == "" || confirmPassword == "") {
        alert("请填写完整信息！");
        return;
    }

    if (password != confirmPassword) {
        alert("两次密码不一致！");
        return;
    }

    $.ajax({
        url: "/api/register",
        type: "POST",
        data: {
            username: username,
            password: password
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                alert("注册成功！");
                window.location.href = "/login";
            } else {
                alert(data.message);
            }
        },
    });
}
