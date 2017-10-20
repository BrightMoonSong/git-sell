//给rem赋予新的值,实现自适应布局
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
window.$attrCommon = function() {}; //暴露对外接口
(function() {
	//读出obj对象的attr属性值
	this.getStyle = function(obj, attr) {
			if(obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return document.defaultView.getComputedStyle(obj, false)[attr];
			}
		},
		//给obj对象的transform属性赋值
		this.setRotate = function(obj, obj2, obj3) {
			var n = obj3 + obj2; //转幅
			var cosVal = Math.cos(n * Math.PI / 180); //求出旋转角度对应的cos值
			var sinVal = Math.sin(n * Math.PI / 180); //求出旋转角度对应的sin值
			obj.style.transform = 'matrix(' + cosVal + ',' + sinVal + ',' +
				(-sinVal) + ',' + cosVal + ',' + 0 + ',' + 0 + ')'; //obj对象旋转
		}
}).apply($attrCommon); //对象冒充，降低方法与对象耦合度
(function() {
	this.init = function(e, objc1, objc2, objc3, objc4) {
		try {
			var val = touchEvent.touchend(e, objc2);
			if(val == 'start') {
				random.listenerStart(objc1, 1, objc3, objc2, objc4);
			}
		} catch(err) {
			alert('发生错误!');
		}
	}
}).apply($attrCommon);

(function() {
	this.setTop = function(objc1, objc2) {
		var docEl = document.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var height1 = parseFloat(($attrCommon.getStyle(objc1, 'height')).split('p')[0]);
				var height2 = parseFloat(($attrCommon.getStyle(objc2, 'height')).split('p')[0]);
				var width1 = parseFloat(($attrCommon.getStyle(objc1, 'width')).split('p')[0]);
				var width2 = parseFloat(($attrCommon.getStyle(objc2, 'width')).split('p')[0]);
				var clientHeight = docEl.clientHeight;
				var clientWidth = docEl.clientWidth;
				if(!clientHeight || !clientWidth) return;
				objc1.style.top = (clientHeight / 2 - height1 / 2) + 'px';
				objc2.style.top = (clientHeight / 2 - height2 / 2) + 'px';
				objc1.style.left = (clientWidth / 2 - width1 / 2) + 'px';
				objc2.style.left = (clientWidth / 2 + width2 / 4) + 'px';
			};
		if(!document.addEventListener) return;
		window.addEventListener(resizeEvt, recalc, false);
		document.addEventListener('DOMContentLoaded', recalc, false);
	}
}).apply($attrCommon);
