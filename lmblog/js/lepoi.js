/* lepoi */
// down hide
$(function() {
var clicktag = 0;
$("#startbtn").click(function() {
    if (clicktag == 1) {
        alert('\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\uff0c\u7a0d\u540e\u518d\u8bd5\u0021');
        return false;
    } else {
        clicktag = 1;
        var lm = $("#startbtn").attr("name");
        $.ajax({
            type: 'POST',
            data: 'LM=' + lm,
            url: '../ame?Version=1.0&ServiceType=lmjl',
            dataType: 'json',
            cache: false,
            error: function() {
                alert('出错了！');
                return false;
            },
            success: function(json) {
                $("#startbtn").unbind('click').css("cursor", "default");
                var a = json.angle;
                var p = json.prize;
                var N = json.Num;
                var id = json.id;
                var s = json.le;
				var ret = json.ret;
				var msg = json.msg;
				if (ret == "1005") {
                    alert(msg);
                  return false;
            }
                $("#startbtn").rotate({
                    duration: 3000,
                    angle: 0,
                    animateTo: 1800 + a,
                    easing: $.easing.easeOutSine,
                    callback: function(con) {
                        $.post("../ame?Version=1.0&ServiceType=lm", {
                            N: N,
                            id: id,
                            s: s
                        }, function(m) {
                            var ret = m.ret;
                            var msg = m.msg;
                            var lm = m.lm;
                            if (ret == "1005") {
                                alert(msg);
                                return false;
                            } else {
                                $("#layer p").html("奖品是:" + p + "<br></br>乐码:" + lm + "<br></br>使用次数:" + N + "次");
                                $("#layer").show();
                            }
                        }, "json");
                        return false;
                    }
                });
            }
        });
    }
});
    $(".lepoi_download input[type=submit]").click(function() {
        var _parent = $(this).parents(".lepoi_download");
        var dl = _parent.find("#dl");
        var d = _parent.find("#download");
        var Captchabtn = _parent.find("#Captchabtn");
        var captchahide = _parent.find("#captchahide");
        var ServiceName = _parent.find("[name=ServiceName]").val();
        var ServiceKey = _parent.find("[name=ServiceKey]").val();
        var Number = _parent.find("[name=Number]").val();
        var Captcha = _parent.find("[name=Captcha]").val();
        var Auth = _parent.find("[name=Auth]").val();
		var _Auth = Captchabtn.attr("name");
        Captchabtn.click(function() {
            $(this).attr("src", "../ame/captcha/?Auth=" + _Auth + "&" + Math.random());
        });
        if (ServiceKey == "") {
            dl.fadeIn("slow").html("<font color='red'>需要乐码才能下载！</font>").delay(3000).fadeOut("slow");
            return false;
        } else {
            d.attr("disabled", "disabled").val("稍等...").css("cursor", "default");
            $.post("../ame?Version=1.0&ServiceType=download", {
                ServiceName: ServiceName,
                ServiceKey: ServiceKey,
                Number: Number,
                Captcha: Captcha,
                Auth: Auth
            }, function(m) {
                var ret = m.ret;
                var msg = m.msg;
                var captcha = m.Captcha;
                if (captcha == "1101" && Captcha == "") {
                    dl.fadeIn("slow").html("<font color='red'>请输入验证码！</font>");
                    captchahide.fadeIn("slow");
                    d.removeAttr("disabled").val("下载").css("cursor", "pointer");
                    Captchabtn.trigger("click");
                    return false;
                } else if (ret == "1006") {
                    _parent.find("#form").submit();
                    dl.fadeIn("slow").html("<font color='green'>" + msg + "</font>");
                    captchahide.fadeOut("slow");
                    d.removeAttr("false").val("ok!").css("cursor", "pointer");
                } else if (ret == "1005") {
                    dl.fadeIn("slow").html("<font color='red'>" + msg + "</font>");
                    d.removeAttr("disabled").val("再试").css("cursor", "pointer");
                    if (Captcha !== "") Captchabtn.trigger("click");
                    return false;
                }
            }, "json");
            return false;
        }
    });
    $(".lepoi_hide input[type=submit]").click(function() {
        var _parent = $(this).parents(".lepoi_hide");
        var ServiceKey = _parent.find("[name=ServiceKey]").val();
        var Number = _parent.find("[name=Number]").val();
        var Captcha = _parent.find("[name=Captcha]").val();
        var Auth = _parent.find("[name=Auth]").val();
        var dl = _parent.find("#dl");
        var d = _parent.find("#hide");
        var Captchabtn = _parent.find("#Captchabtn");
        var captchahide = _parent.find("#captchahide");
		var _Auth = Captchabtn.attr("name");
        Captchabtn.click(function() {
            $(this).attr("src", "../ame/captcha/?Auth=" + _Auth + "&" + Math.random());
        });
        if (ServiceKey == "") {
            dl.html("<font color=red>需要乐码才能查看，请输入！</font>");
            return false;
        } else {
            d.attr("disabled", "disabled").val("稍等...").css("cursor", "default");
            $.post("../ame?Version=1.0&ServiceType=hide", {
                ServiceKey: ServiceKey,
                Number: Number,
                Captcha: Captcha,
                Auth: Auth
            }, function(m) {
                var ret = m.ret;
                var msg = m.msg;
                var captcha = m.Captcha;
                if (captcha == "1101" && Captcha == "") {
                    dl.fadeIn("slow").html("<font color=red>请输入验证码！</font>");
                    captchahide.fadeIn("slow");
                    d.removeAttr("disabled").val("再试").css("cursor", "pointer");
                    Captchabtn.trigger("click");
                    return false;
                } else if (ret == "1006") {
                    _parent.find("#form").submit();
                    dl.fadeIn("slow").html("<font color=green>" + msg + "</font>");
                    d.removeAttr("false").val("ok!").css("cursor", "pointer");
                    captchahide.fadeOut("slow");
                } else if (ret == "1005") {
                    dl.fadeIn("slow").html("<font color=red>" + msg + "</font>");
                    d.removeAttr("disabled").val("查 看").css("cursor", "pointer");
                    if (Captcha !== "") Captchabtn.trigger("click");
                    return false;
                }
            }, "json");
            return false;
        }
    });
    $(".lepoi_freedownload input[type=submit]").click(function() {
        var _parent = $(this).parents(".lepoi_freedownload");
        var ServiceName = _parent.find("[name=ServiceName]").val();
        var ServiceKey = _parent.find("[name=ServiceKey]").val();
        var Auth = _parent.find("[name=Auth]").val();
        var dl = _parent.find("#dl");
        var d = _parent.find("#download");
        d.attr("disabled", "disabled").val("骚等...").css("cursor", "default");
        $.post("../ame?Version=1.0&ServiceType=freedownload", {
            ServiceName: ServiceName,
            ServiceKey: ServiceKey,
            Auth: Auth
        }, function(m) {
            var ret = m.ret;
            var msg = m.msg;
            if (ret == "1005") {
                dl.html("<font color='red'>" + msg + "</font>");
                d.removeAttr("false").val("(｡・`ω´･)").css("cursor", "pointer");
                return false;
            } else if (ret == "1006") {
                _parent.find("#form").submit();
                dl.html("<font color='green'>" + msg + "</font>");
                d.removeAttr("false").val("ok!").css("cursor", "pointer");
            }
        }, "json");
        return false;
    });
});
