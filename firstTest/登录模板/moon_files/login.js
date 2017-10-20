$(function() {
	$(".content .con_right .left").click(function(e) {
		$(this).css({
			"color": "#333333",
			"border-bottom": "2px solid #2e558e"
		});
		$(".content .con_right .right").css({
			"color": "#999999",
			"border-bottom": "2px solid #dedede"
		});
		$(".content .con_right ul .con_r_left").css("display", "block");
		$(".content .con_right ul .con_r_right").css("display", "none");
		if(fluCodeInterval == null || fluCheckCodeInterval == null) {
			show();
			flushQRCode();
			checkQRCodeStatus();
		}
	});
	$(".content .con_right .right").click(function(e) {
		$(this).css({
			"color": "#333333",
			"border-bottom": "2px solid #2e558e"
		});
		$(".content .con_right .left").css({
			"color": "#999999",
			"border-bottom": "2px solid #dedede"
		});
		$(".content .con_right ul .con_r_right").css("display", "block");
		$(".content .con_right ul .con_r_left").css("display", "none");
	});

	$('#btn_Login').click(function() {
		if($.trim($('#userid').val()) == '') {
			alert('请输入您的用户名');
			return false;
		} else if($.trim($('#pwd').val()) == '') {
			alert('请输入密码');
			return false;
		} else {
			return true;
		}
	});

	$("#imgHoverTreeCode").click(function() {
		changehovertreecheckcode();
	});

	function changehovertreecheckcode() {
		var imgNode = document.getElementById("imgHoverTreeCode");
		imgNode.src = "/siteresource/hovertreecheckcode.ashx?t=" + (new Date()).valueOf(); // 这里加个时间的参数是为了防止浏览器缓存的问题 hovertree.com
	}
})