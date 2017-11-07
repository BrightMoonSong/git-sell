function goodsPreviewController($scope, $q, $timeout, goodsPreviewService, ngDialog) {
	$scope.member = getCookie("loginManager"); //获取登录信息
	if ($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
		$scope.memberLoginId = $scope.member.loginId;
		$scope.prescriptionUrl = imgPathPrescription; //oss路径
	}
	
	$scope.collectPic = "images/sc1.png"	//收藏按钮的图片
	var _url = window.location.href; //获取当前路径
	$scope.consultantId = 0;	//默认顾问id为0
	
	if (/id=\d+/g.test(_url)) { //获取商品id
		$scope.goodsId = parseInt(_url.match(/id=\d+/g)[0].replace("id=", ""));
	}
	$scope.hasGoods = true; //判断是否有商品

	//提示框
	$scope.showAlert = function(message) {
		ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			width: 400,
			height: 174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});
	}
	//笛卡儿积组合  
	function descartes(list) {
		//parent上一级索引;count指针计数  
		var point = {};
		var result = [];
		var pIndex = null;
		var tempCount = 0;
		var temp = "";
		$scope.proLength = 0;
		//根据参数列生成指针对象  
		for(var index in list) {
			if(typeof list[index] == 'object') {
				point[index] = {
					'parent': pIndex,
					'count': 0
				}
				pIndex = index;
			}
		}
		//单维度数据结构直接返回  
		if(pIndex == null) {
			return list;
		}
		//动态生成笛卡尔积  
		while(true) {
			for(var index in list) {
				tempCount = point[index]['count'];
				temp +=list[index][tempCount].split(":")[0]+"&";
			}
			$scope.temp1 = temp.split("&")
			//压入结果数组  
			result.push(temp);
			
			temp = "";
			//检查指针最大值问题  
			while(true) {
				if(point[index]['count'] + 1 >= list[index].length) {
					point[index]['count'] = 0;
					pIndex = point[index]['parent'];
					if(pIndex == null) {
						return result;
					}
					//赋值parent进行再次检查  
					index = pIndex;
				} else {
					point[index]['count']++;
					break;
				}
			}
		}
		
	}
	//限制输入数量
	$scope.limitStock = function(num) {
		if ($scope.initStock < num) {
			$scope.showAlert(zhecDisplayMessage.cartUnderStock)
			$scope.goodsNum = num - 1;
			return;
		} 
	}
	//判断数组是否包含指定元素的方法
	Array.prototype.contains = function(needle) {
		for(i in this) {
			if(this[i] == needle) return true;
		}
		return false;
	};
	$scope.find = function() {
		goodsPreviewService
			.goodsDetail($scope.goodsId)
			.then(function(result) {
				
				console.log(result.data.goodsDetail)
				$scope.goodsStatus = result.data.goodsStatus;	//当前商品状态
				$scope.goodsDetail = result.data.goodsDetail;	//商品详情
				$scope.spcInfo = result.data.specInfo; //规格信息
				$scope.propsInfo = result.data.propsInfo; //属性信息
//				console.log($scope.spcInfo)
				$scope.productidsArr = [];

				console.log(descartes($scope.spcInfo))
				$scope.productids = descartes($scope.spcInfo);
				$scope.productids2 = [];
				for(var i = 0; i < $scope.productids.length; i++){
					$scope.idsArr = $scope.productids[i].split("&");
					$scope.productids1 = ""
					for(var n = 0; n < $scope.idsArr.length; n++){
						if($scope.idsArr[n] != ""){
							$scope.productids1 += $scope.idsArr[n];
							if(n < $scope.idsArr.length - 2){
								$scope.productids1 += "&"
							}
						}
					}
					if($scope.productids1 != ""){
						$scope.productids1 = $scope.productids1.split("&");
						$scope.productids4 = "";
						for(var j = 0; j < $scope.productids1.length; j++){
							$scope.productids3 = "";
							for (var inner = j + 1; inner < $scope.productids1.length; inner++) {//这里是a.length，不是a.lenght-1，因为后者会导致右数第2项没法参与排序。
					          if ($scope.productids1[inner] < $scope.productids1[j]) {
					            $scope.productids3 = $scope.productids1[inner];
						          $scope.productids1[inner] = $scope.productids1[j]
						          $scope.productids1[j] = $scope.productids3;
					          }
					          //将最小的项移动到左侧
					        }
						}
						for(var n = 0; n < $scope.productids1.length; n++){
							$scope.productids4+=$scope.productids1[n];
							if(n < $scope.productids1.length -1){
								$scope.productids4+="&"
							}
						}
						$scope.productids2.push($scope.productids4)
					}
					
				}
				if($scope.goodsDetail.productList.length != 0){
						
					$scope.spcName = $scope.goodsDetail.productList[0].specName;	//规格名称
					$scope.zhPrice = $scope.goodsDetail.productList[0].salesWebPrice;
					$scope.productId = $scope.goodsDetail.productList[0].id;
				}
				for(var a =0; a < $scope.goodsDetail.productList.length; a++){
					console.log($scope.goodsDetail.productList)
//					if($scope.goodsDetail.productList[a].isSelected == 1) { //默认显示的货品内容
					
						if($scope.goodsDetail.productList[a].specAttrIds!=null&&$scope.goodsDetail.productList[a].specAttrIds!=""&&$scope.goodsDetail.productList[a].specAttrIds!=undefined){
							$scope.specAttrIds = $scope.goodsDetail.productList[a].specAttrIds.split(","); //默认货品id组合
							console.log($scope.specAttrIds)
							if($scope.goodsDetail.productList[a].specAttrIds == $scope.specAttrIds){
								$scope.masterImg = $scope.goodsDetail.productList[a].masterImg;
								$scope.firstImg = $scope.masterImg;
							}
						}
//					}
				}
				if($scope.goodsDetail.imagesList.length != 0){
					$scope.firstImg = $scope.goodsDetail.imagesList[0].imagePath;
				}
				
				$scope.isSelect = false;
				for(var i = 0; i < $scope.goodsDetail.productList.length; i++){
					$scope.goodsDetail.productList[i].isSelected = 0;
					if($scope.isSelect == false && $scope.goodsDetail.productList[i].stock > 0){
						$scope.isSelect = true;
						$scope.goodsDetail.productList[i].isSelected = 1;
					}
				}
				if($scope.isSelect == false && $scope.goodsDetail.productList.length != 0 ){
					$scope.goodsDetail.productList[0].isSelected = 1;
				}
				$scope.goodsNum = 1;
				$(".showHide").show()
				$("#fixedArea>ul").width($scope.goodsDetail.imagesList.length * 72)
				//富文本内容渲染
				angular.element(".description").html($scope.goodsDetail.description);
				angular.element(".instruction").html($scope.goodsDetail.instruction)

			}, function(result) {
				
			});

	}
	if ($scope.goodsId == "" || $scope.goodsId == null || $scope.goodsId == undefined) {
		window.open(constMallLocation + "/notfindgoods.html", "_self")
	} else {
		$scope.find()
	}
	//改变规格
	$scope.changeType = function(n, productId,  event,key) {
		//获取改变的货品id组合
		for(var i = 0; i < $scope.spcInfo[key].length; i++){
			for(var n = 0; n < $scope.specAttrIds.length; n++){
				if($scope.specAttrIds[n] == $scope.spcInfo[key][i].split(':')[0]){
					$scope.specAttrIds[n] = productId
				}
			}
		}
		//查询货品信息
		for(var j = 0; j < $scope.goodsDetail.productList.length; j++) {
			if($scope.goodsDetail.productList[j].specAttrIds == $scope.specAttrIds){
				console.log($scope.goodsDetail.productList[j])
				$scope.initStock = $scope.goodsDetail.productList[j].stock;
				$scope.masterImg = $scope.goodsDetail.productList[j].masterImg;
				$scope.firstImg = $scope.masterImg;
				$scope.specInfoName = $scope.goodsDetail.productList[j].specInfo;
				$scope.currentProductId = $scope.goodsDetail.productList[j].id;
				
			}
		}
		//查询价格
		for(var j = 0; j < $scope.goodsDetail.productList.length; j++) {
			if($scope.goodsDetail.productList[j].productId == $scope.currentProductId) {
				$scope.zhPrice = $scope.goodsDetail.productList[j].salesWebPrice;
			}
		}		
		//显示是否有货
		if($scope.initStock >= 1) {
			$scope.flag1 = false;
			$scope.goodsNum = 1; //改变规格数量就回归为0
			$scope.currentProStock = $scope.initStock;
			$scope.productId = $scope.currentProductId;
			if(n == 1) { //主购物车
				$scope.productId = $scope.specAttrIds;
				$scope.initStock = $scope.initStock;
			}
			$scope.selectSpc = $scope.specInfoName;
			$scope.applyProductId = $scope.specAttrIds;
		} else {
			$scope.flag1 = true;
			$scope.showAlert(zhecDisplayMessage.cartUnderStock)
		}
	}
	//选项卡
	$scope.currentShowMessage = 0;
	$scope.changeMessage = function(n, event) {
		$scope.currentShowMessage = n;
		$(".clickShow>ul").hide()
		$($(".clickShow>ul")[n]).show()
		if ($(".conter_right_ul_ulde").offset().top > $(".fixNavTop").offset().top) {
			$("body,html").animate({
				scrollTop: $(".fixNavTop").offset().top
			}, 0);
		}
	}
	
	//控制划过效果，判断是否有货从而显示不同的点击状态
	$scope.hoverSpc = function(n, stock, event) {
		if (n == 1) {
			angular.element(".slectSpe").removeClass("notProduct");
			angular.element(".slectSpe").removeClass("allowClick");
		} else {
			angular.element(".slectSpe1").removeClass("notProduct");
			angular.element(".slectSpe1").removeClass("allowClick");
		}
		if (stock < 1) {
			angular.element(event.target).addClass("notProduct");
		} else {
			angular.element(event.target).addClass("allowClick");
		}
	}
	//图片轮播向右
	$scope.showMore = function() {
			$scope.currentLeft = parseInt($("#fixedArea>ul").css("left").replace("px", ""));
			//		console.log(Math.abs($scope.currentLeft),($scope.goodsDetail.imagesList.length - 5)*69)
			if($("#fixedArea > ul").width() > 358 && Math.abs($scope.currentLeft) < ($scope.goodsDetail.imagesList.length - 5) * 66) {
//				$timeout(function() {
					$("#fixedArea>ul").css("left", $scope.currentLeft - 69)
//				}, 600);
			}

		}
		//图片轮播向左
	$scope.showBefore = function() {
			$scope.currentLeft = parseInt($("#fixedArea>ul").css("left").replace("px", ""));
			console.log(Math.abs($scope.currentLeft), ($scope.goodsDetail.imagesList.length - 5) * 69)
			if($("#fixedArea > ul").width() > 358 && $scope.currentLeft < 0) {
//				$timeout(function() {
					$("#fixedArea>ul").css("left", $scope.currentLeft + 69)
//				}, 600);

			}
		}
	//放大镜
	$scope.changePath = function(path, event) {
		$("#bigImg").attr("src", path + "?x-oss-process=style/l_b");
		$("#midimg").attr("src", path + "?x-oss-process=style/l_m");
		angular.element("#imageMenu li").removeClass("onlickImg");
		angular.element(event.target).parent().addClass("onlickImg");
	}
	$(document).ready(function() {
		//吸顶
		var detailsTop = $(".conter_right_ul_ulde").offset().top;
		var goosdetailMessageLeft = $(".goosdetailMessage").offset().left;
		var allMessagesHeight = $(".clickShow").offset().top;
		var goodsHeight = $(".goosdetailMessage").height();
		var footerTop = $(".foot").offset().top;
		$(window).scroll(function() {
			if ($(window).scrollTop() >= detailsTop) {
				$(".conter_right_ul_ulde").addClass("fixedNavTop")
				$(".goosdetailMessage").addClass("fixedNavTop")
				$(".goosdetailMessage").css({
					"left": goosdetailMessageLeft
				})
				if ($(window).scrollTop() >= detailsTop + $(".conter_left_ula").height() - 320 && $($(".getGoodsMessageHei")[$scope.currentShowMessage]).height() < $(".conter_left_ula").height()) {
					$(".conter_right_ul_ulde").removeClass("fixedNavTop")
					$(".goosdetailMessage").removeClass("fixedNavTop");
				} else if ($(window).scrollTop() >= detailsTop + $($(".getGoodsMessageHei")[$scope.currentShowMessage]).height() && $($(".getGoodsMessageHei")[$scope.currentShowMessage]).height() > $(".conter_left_ula").height()) {
					$(".goosdetailMessage").removeClass("fixedNavTop");
					$(".conter_right_ul_ulde").removeClass("fixedNavTop")
				}
			} else {
				$(".conter_right_ul_ulde").removeClass("fixedNavTop");
				$(".goosdetailMessage").removeClass("fixedNavTop");
			}
		})
	})
	var bigViewHeight = $("#vertical").offset().top;
	var bigViewLeft = $("#vertical").offset().left + $("#vertical").width();
	$(".bigBox").css({
		"left": bigViewLeft,
		"top": bigViewHeight
	})
	var smallBox = document.getElementById("vertical"); //小盒子
	var tool = document.getElementById("tool"); //放大镜
	var bigBox = document.getElementById("bigView"); //大盒子
	var bigImg = document.getElementById("bigImg"); //大图片

	smallBox.onmouseover = function() {
		tool.style.display = "block"; //显示出放大镜（tool）
		bigBox.style.display = "block"; //显示出右边的大盒子。
	}
	smallBox.onmouseout = function() {
		tool.style.display = "none"; //隐藏出放大镜（tool）
		bigBox.style.display = "none"; //隐藏出右边的大盒子。
	}
	smallBox.onmousemove = function(e) {
		var _event = window.event || e; //事件对象
		var left = _event.clientX - smallBox.offsetLeft - tool.offsetWidth / 2;
		var top = _event.clientY - smallBox.offsetTop - tool.offsetHeight / 2 + $(document).scrollTop();
		if (left < 0) {
			left = 0;
		}
		if (top < 0) {
			top = 0;
		}
		if (left > smallBox.offsetWidth - tool.offsetWidth) {
			left = smallBox.offsetWidth - tool.offsetWidth;
		}
		if (top > smallBox.offsetHeight - tool.offsetHeight) {
			top = smallBox.offsetHeight - tool.offsetHeight;
		}
		tool.style.left = left + "px";
		tool.style.top = top + "px";
		var x = tool.offsetLeft * bigBox.offsetWidth / tool.offsetWidth;
		var y = tool.offsetTop * bigBox.offsetHeight / tool.offsetHeight;
		bigImg.style.left = -x + "px";
		bigImg.style.top = -y + "px";
	}
}

var imgPath = [];

function prescriptionSetImgPath(res) {
	imgPath.push(res);
}
angular
	.module('goodsPreviewApp')
	.controller('goodsPreviewController', goodsPreviewController)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('search', search)
	.directive('navigationBar', navigationBar)

