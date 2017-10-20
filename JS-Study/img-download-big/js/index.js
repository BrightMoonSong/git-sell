var app = angular.module('myApp', []);
app.controller('myctr', myctr)
	.directive('bigImg', bigImg)
	.directive('downloadImgForSrc', downloadImgForSrc);

function myctr($scope) {
//	$scope.$watch('firstVal', function(newVal, oldVal) {
//		console.log(newVal, oldVal);
//	}, true);
	
}

//根据图片路径下载图片
function downloadImgForSrc() {
	return {
		link: function(scope, element, attr) {
			var eleBut = '<a id="downloadImgBut" style="text-decoration:none;padding:3px;color: white;background:rgba(14, 114, 249, 0.78);border:0px solid #1772ec;border-radius: 3px;">下载</a>';
			element.after(eleBut);
			var img_src = attr.src;
			if(browserIsIe()) { //假如是ie浏览器  
				$("#downloadImgBut").on('click', function() {
					img_src = element.src;
					DownLoadReportIMG(img_src);
				});
			} else {
				$("#downloadImgBut").attr('download', img_src);
				$("#downloadImgBut").attr('href', img_src);
			}
		}
	};
}
//假如是ie浏览器  的图片下载
function DownLoadReportIMG(imgPathURL) {
	//如果隐藏IFRAME不存在，则添加  
	if(!document.getElementById("IframeReportImg"))
		$('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="DoSaveAsIMG();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
	if(document.all.IframeReportImg.src != imgPathURL) {
		//加载图片  
		document.all.IframeReportImg.src = imgPathURL;
	} else {
		//图片直接另存为  
		DoSaveAsIMG();
	}
}

function DoSaveAsIMG() {
	if(document.all.IframeReportImg.src != "about:blank")
		window.frames["IframeReportImg"].document.execCommand("SaveAs");
}
//判断是否为ie浏览器  
function browserIsIe() {
	if(!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}


//图片放大指令
function bigImg() {
	return {
		scope: {}, // 创建指令自己的独立作用域，与父级毫无关系
		// controller: function($scope, $element, $attrs, $transclude) {},
		//restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		//链接函数
		//element-->jQ的对象;attr-->元素上属性的集合
		link: function(scope, element, attr) {
			element.on('click', function() {
				var elesrc = '<div id="myImgBigBackElementFirst"><div class="black-top-img" id="myImgBigElement"><img src="' +
					attr.src +
					'" style="width:700px;max-width: 700px;max-height: 600px;" onmousewheel="return bbimg(this)" alt="..." /></div><div id="myImgBigBackElement" class="black-background"></div></div>'
				$("#bigimgbody").after(elesrc);
				$("#myImgBigElement").on('click', function() {
					$("#myImgBigBackElementFirst").remove();
				});
				//样式
				//alert($(window).height()); //浏览器时下窗口可视区域高度
				//alert($(window).width()); //浏览器时下窗口可视区域宽度
				$("#myImgBigBackElement").css({"position":"fixed","background-color":"rgba(6,6,6,1)","height":$(window).height()+'px',"width":$(window).width()+'px'});
				$("#myImgBigBackElement").css({"top":"0px","left":"0px","overflow": "hidden","z-index": 9});
				$("#myImgBigElement").css({"position":"fixed","top":'5%',"left":'10%',"overflow": "hidden","z-index": 10,"width": '80%',"height": '90%',"text-align": "center"});
			});
		}
	};
}

/**
 * 非Firefox的主流浏览器    滚轮 图片放大缩小
 * @param {Object} o
 */
function bbimg(o) {
	var zoom = parseInt(o.style.zoom, 10) || 100;
	zoom += event.wheelDelta / 12;
	if(zoom < 30) { //图片缩小倍数最小30%
		zoom = 30;
	}
	if(zoom > 200) { //图片最大倍数最大300%
		zoom = 200;
	}
	if(zoom > 0) o.style.zoom = zoom + '%';
	return false;
}