var baseCartUrl = ConstBaseLocation + '/cart';

/**
 * 添加之前查库存
 */
var cartManager = []; //存放购物车商品
function addGoodsToCart(goodsId, goodsNum, consultantId) {
	$.ajax({
		type: "get",
		url: baseCartUrl + "/validatestock" + "?productId=" + goodsId + "&count=" + goodsNum,
		success: function(data) {
			if (data) {
				joinToCart(goodsId, goodsNum, consultantId);
			} else {
				promptBox("库存不足！");
			}
		}
	})
}
/**
 * 单个加入购物车
 */
function joinToCart(goodsId, goodsNum, consultantId) {
	var goodsMessage = {}; //存放购物车cookie数据
	var getCookieMessage = ""; //获取cookie信息
	var getCookieLoginMessage = getCookie("formToken");
	var judge = true; //用来判断该商品是否已加入过cookie中
	var joinGoodsMessage = {}; //登陆成功后加入购物车的数据
	if (getCookieLoginMessage == ""||getCookieLoginMessage == null||getCookieLoginMessage == undefined) { //判断是否已登录，没有登陆
		getCookieMessage = getCookie("cartManager");
		if (getCookieMessage == "") {
			goodsMessage.id = goodsId;
			goodsMessage.num = goodsNum;
			goodsMessage.consultantId = consultantId;
			cartManager.push(goodsMessage);
		} else {
			cartManager = JSON.parse(getCookieMessage);
		}
		for (var i = 0; i < cartManager.length; i++) {
			if (cartManager[i].id == Number(goodsId)) {
				var index = i;
				judge = false;
			}
		}
		if (judge == true) { //未加入过cookie,增加新数据
			if (cartManager.length < 20) { //未登录时最多加入20个数据
				goodsMessage.id = goodsId;
				goodsMessage.consultantId = consultantId;
				if (goodsNum >= 200) {
					goodsMessage.num = 200;
				} else {
					goodsMessage.num = goodsNum;
				}
				cartManager.push(goodsMessage);
				window.open("cartinfo.html?type=1&pid=" + goodsMessage.id + "&pcount=" + goodsMessage.num, "_self")
			} else {
				var dialog1 = jDialog.dialog({
					title: '提示',
					content: '登录后才可添加更多！请先登录',
					buttons: [{
						type: 'highlight',
						text: '取消',
						handler: function(button, dialog) {
							dialog1.close();
						}
					}, {
						type: 'highlight',
						text: '去登录',
						handler: function(button, dialog) {
							window.location.href = "login.html";
						}
					}]
				})
			}
		} else { //加入过cookie,移除原来的数据，添加新的
			cartManager.splice(index, 1);
			goodsMessage.id = goodsId;
			goodsMessage.consultantId = consultantId;
			if (goodsNum >= 200) { //如果数量大于200就保存200
				goodsMessage.num = 200;
			} else {
				goodsMessage.num = goodsNum;
			}
			cartManager.push(goodsMessage);
			window.location.href = "cartinfo.html?type=1&pid=" + goodsMessage.id + "&pcount=" + goodsMessage.num;
		}
		cartManager = JSON.stringify(cartManager);
		if (cartManager != "[]") { //只有有数据时才会加入cookie
			setCookie("cartManager", '' + cartManager, '1');
		}
	} else {
		memberData = getCookie("loginManager");
		memberData = JSON.parse(memberData);
		joinGoodsMessage.memberId = memberData.id
		joinGoodsMessage.loginId = memberData.loginId
		joinGoodsMessage.productId = goodsId;
		joinGoodsMessage.count = goodsNum;
		joinGoodsMessage.consultantId = consultantId;
		var userToken = memberData.userToken;
		if(getCookie("formToken")=='' || getCookie("formToken")==undefined){
			formtokenCookie = '';
		}else{
			formtokenCookie = JSON.parse(getCookie("formToken"));
		}
		console.log(joinGoodsMessage)
		$.ajax({
			type: "post",
			url: baseCartUrl + "/shoppingcarts" + "?userToken=" + userToken+"&formToken="+formtokenCookie,
			data: joinGoodsMessage,
			dataType: "json",
			complete: function( xhr,data ){
				var wpoInfo = {
		            // 服务器端时间
		            "formToken" : xhr.getResponseHeader('formToken')
		        }
		        setCookieTime("formToken", "" + JSON.stringify(wpoInfo.formToken), "30")
		   },
			success: function(data) {
				console.log(data)
				if(data.code == 1){
					window.open("cartinfo.html?type=1&pid=" + joinGoodsMessage.productId + "&pcount=" + joinGoodsMessage.count, "_self")
				}else if(data.code == "-2"){
					promptBox("系统错误！");
				}else if(data.code == "-3"){
					promptBox("商品已不存在！");
				}else if(data.code == "-4"){
					promptBox("库存不足！");
				}
			},
			error: function(data) {
				delCookie("loginManager");
				delCookie("formToken");
			}
		})
	}
}
/**
 * 如果登陆且cookie有数据，则直接将cookie中的数据加入购物车
 */
function addMultipleGoodsToCart() {
	var cartManager = []; //存放购物车商品
	var getMember = getCookie("loginManager");
	//登陆成功将cookie中的数据加入到购物车
	if (getMember != "") {
		getMember = JSON.parse(getMember);
		var saveAllMessage = [];
		var getALLGoods = getCookie("cartManager");
		if(getALLGoods==""||getALLGoods==null||getALLGoods==undefined){
			return;
		}
		getALLGoods = JSON.parse(getALLGoods);
		for (var i = 0; i < getALLGoods.length; i++) {
			var savesingleMessage = {};
			savesingleMessage.memberId = getMember.id;
			savesingleMessage.loginId = getMember.loginId;
			savesingleMessage.productId = getALLGoods[i].id;
			savesingleMessage.count = getALLGoods[i].num;
			savesingleMessage.consultantId = getALLGoods[i].consultantId;
			saveAllMessage.push(savesingleMessage);
		}
		batchAddGoodsToCart(saveAllMessage, 1,getMember);
		delCookie("cartManager");
	}
}

function batchAddGoodsToCart(saveAllMessage, index,member) {
	saveAllMessage = JSON.stringify(saveAllMessage);
	var userToken = JSON.parse(getCookie("loginManager")).userToken;
	if(getCookie("formToken")==''||getCookie("formToken")==null){
		formtokenCookie = '';
	}else{
		formtokenCookie = JSON.parse(getCookie("formToken"));
	}
	$.ajax({
		type: "post",
		url: baseCartUrl + "/addbatchshoppingcarts" + "?userToken=" + userToken+"&formToken="+formtokenCookie,
		data: saveAllMessage,
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data,status, xhr) {
			var wpoInfo = {
	            // 服务器端时间
	            "formToken" : xhr.getResponseHeader('formToken')
	       }
	        setCookieTime("formToken", "" + JSON.stringify(wpoInfo.formToken), "30")
			if (index == 2) window.open("cart.html", "_self")
		}
	})

}
/**
 * 改变加入购物车商品数量
 */
function changeCartGoods(goodsId, goodsNum) {
	var cartManager = []; //存放购物车商品
	var getCookieMessage = ""; //获取cookie信息
	getCookieMessage = getCookie("cartManager");
	cartManager = JSON.parse(getCookieMessage);
	for (var i = 0; i < cartManager.length; i++) {
		if (cartManager[i].id == goodsId) {
			cartManager[i].num = goodsNum;
		}
	}
	cartManager = JSON.stringify(cartManager);
	setCookie("cartManager", '' + cartManager, '1');
}
/**
 * 删除购物车商品
 */
function deleteCartGoods(goodsId) {
	var getCookieMessage = ""; //获取cookie信息
	var cartManager = []; //存放购物车商品
	getCookieMessage = getCookie("cartManager");
	if(getCookieMessage!=""&&getCookieMessage!=null&&getCookieMessage!=undefined){
		cartManager = JSON.parse(getCookieMessage);
	}else{
		return;
	}

	for (var i = 0; i < cartManager.length; i++) {
		if (cartManager[i].id == goodsId) {
			cartManager.splice(i, 1);
			cartManager = JSON.stringify(cartManager);
			setCookie("cartManager", '' + cartManager, '1');
			getCookieMessage = getCookie("cartManager");
			if (getCookieMessage == "[]") {
				delCookie("cartManager");
			}
			return true;
		}
	}
}
/**
 * 批量删除
 */
function deleteMultipleGoods(arr) {
	var deleteMore = "";
	var judge = false;
	var cartManager = []; //存放购物车商品
	deleteMore = getCookie("cartManager");
	deleteMore = JSON.parse(deleteMore);
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < deleteMore.length; j++) {
			if (arr[i].productId == deleteMore[j].id) {
				deleteMore.splice(j, 1);
				judge = true;
			}
		}
	}
	if (judge == true) {
		deleteMore = JSON.stringify(deleteMore);
		setCookie("cartManager", '' + deleteMore, '1');
		return true;
	}
}
/**
 * 一键购、移入收藏等操作
 */
function checkLogin() {
	var getMember = getCookie("formToken");
	if (getMember == "" || getMember == null || getMember == undefined) {
		delCookie("prePage");
		setCookie("prePage", '' + window.location.href, '1');
		window.location.href = "login.html";
	} else {
		return true;
	}
}
/**
 * 公共弹出框
 */
var dialogPrompt = ""

function promptBox(promptMessage) {
	dialogPrompt = jDialog.dialog({
		title: '提示信息',
		content: promptMessage,
		buttons: [{
			type: 'highlight',
			text: '确认',
			handler: function(button, dialog) {
				dialogPrompt.close();
			}
		}],
    autoClose:1500
	})
}
/**
 * 订单信息
 */
function orderStatus(orderStatus) {
  if (orderStatus == 0) {
    return "未支付";
  } else if (orderStatus == 1) {
    return "等待发货";
  } else if (orderStatus == 2) {
    return "等待发货";
  } else if (orderStatus == 3) {
    return "已发货";
  } else if (orderStatus == 4) {
    return "已收货";
  } else if (orderStatus == 5) {
    return "已完成";/*待结算*/
  } else if (orderStatus == 6) {
    return "取消待审核";
  } else if (orderStatus == 7) {
    return "订单已取消";
  } else if (orderStatus == 8) {
    return "已完成";
  } else if (orderStatus == 9) {
    return "取消待退款";
  } else if (orderStatus == 10) {
    return "已收货";
  }
}

$(document).ready(function() {
	//悬浮梯
	$(window).scroll(function() {
		var $t = $(this).scrollTop();
		if ($t >= 200) {
			$(".notIndex").fadeIn();
		} else {
			$(".notIndex").fadeOut();
		}
	});
	$(".notIndex ul li.last").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 500);
	});

})
/**
 * 价格过滤器
 */
function priceFilter(price) {
	price = price.toString();
	var re = /\d+\.[0-9]/g; //判断数字是否为小数
	if (!re.test(price)) {
		price = price + ".00";
	} else {
		if (price.toString().split(".")[1].length == 1) {
			price = price + "0";
		} else if (price.toString().split(".")[1].length > 2) {
			price = Math.round(parseFloat(price) * 100) / 100;
		}
	}
	return price;
}
String.prototype.priceFilter = function() {
	price = this;
	price = price.toString();
	var re = /\d+\.[0-9]/g; //判断数字是否为小数
	if (!re.test(price)) {
		price = price + ".00";
	} else {
		if (price.toString().split(".")[1].length == 1) {
			price = price + "0";
		} else if (price.toString().split(".")[1].length > 2) {
			price = Math.round(parseFloat(price) * 100) / 100;
		}
	}
	return price;
};
/**
 * 价格过滤器
 */
function strToNumber(price) {
	price = Number(price);
	return price;
}
//路径回退
function returnPath(path) {
	if (checkLogin()) {
		window.open(path, "_self")
	}
}
//设置字数显示
function limitLength(string, n) {
	if (string.length > n) {
		string = string.substring(0, n);
		string += "..."
		return string;
	} else {
		return string;
	}
}
//提示信息code键值对
function promptMessage(code) {
	var message = JSON.stringify(zhecMessage);
	message = message.substring(1, message.length - 1);
	message = message.split(",");
	for (var i = 0; i < message.length; i++) {
		message[i] = message[i].split(":");
		message[i][0] = message[i][0].replace("\"", "").replace("\"", "");
		message[i][1] = message[i][1].replace("\"", "").replace("\"", "");
		if (String(code) == message[i][0]) {
			promptBox(message[i][1])
			//			setTimeout(dialogPrompt.close(),2000)
		}
	}
}
//promptMessage(1)
//商品列表属性筛选器，点击更多功能
function funct(obj) {
	var elem = obj.parentNode.previousElementSibling.childNodes[1].children;
	if (obj.innerHTML == "+更多") {
		for (var i = 0; i < elem.length; i++) {
			elem[i].className = "";
			elem[i].style.cssText = "display:''";
		}
		obj.innerHTML = "-收起"
	} else {
		for (var i = 6; i < elem.length; i++) {
			elem[i].style.cssText = "display:none";
		}
		obj.innerHTML = "+更多"
	}
}
