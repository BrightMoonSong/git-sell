$(function() {
	$(document).ready(function(e) {
		var unslider04 = $('#b04').unslider({
				dots: true
			}),
			data04 = unslider04.data('unslider');
		$('.unslider-arrow04').click(function() {
			var fn = this.className.split(' ')[1];
			data04[fn]();
		});
	});
	//louti
	var mark = 1;
	$("#LoutiNav ul .showStairs").not(".last").click(function() {
		mark = 2;
		$("#LoutiNav ul .showStairs").find("a").removeClass("active");
		$(this).find("a").addClass("active");
		var $index = $(this).index();
		var $top = $("#mainNav .content_one").eq($index).offset().top;
		$("body,html").animate({
			scrollTop: $top
		}, 500, function() {
			mark = 1;
		});
	});
	$(window).scroll(function() {
		if(mark == 1) {
			var $t = $(this).scrollTop();
			var firetTop = $($(".content_one")[0]).offset().top - 300;
			if($t >= firetTop) {
				$("#LoutiNav").fadeIn();
			} else {
				$("#LoutiNav").fadeOut();
			}
			var $obj = $("#mainNav .content_one");
			$obj.each(function() {
				var $index = $(this).index();
				var $height = $obj.eq($index).offset().top + $(this).height() / 2;
				if($t < $height) {
					$("#LoutiNav ul .showStairs").find("a").removeClass("active")
					$("#LoutiNav ul .showStairs").eq($index).find("a").addClass("active");
					return false;
				}
			});
		}
	});
	$("#LoutiNav ul li.last").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 500, function() {
			mark = 1;
		});
	});
});
//客服
$("#easemob").click(function() {
	window.open("http://kefu.easemob.com/webim/im.html?tenantId=27794&amp;hide=false&amp;resources=&amp;ticket=true", "_blank")
		//alert("那就点击右下角的联系客服按钮，跟客服妹妹聊聊(●'◡'●)");

		//$("#iframeid").src="http://kefu.easemob.com/webim/im.html?tenantId=27794&amp;hide=false&amp;resources=&amp;ticket=true";
		//document.getElementById("aaa").src='http://www.baidu.com'; 
});