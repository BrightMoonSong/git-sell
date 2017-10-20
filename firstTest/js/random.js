//转盘对象
var Rondom = function() {}
	//返回随机的度数
Rondom.prototype.getDeg = function(arr) {
		var arr = arr;
		var len1 = arr.length; //一共有几种奖项
		var len2 = 0; //每种奖项有几种可能
		var rom2; //抽取奖项的其中一个色块
		var deg; //指针只指向的位置
		var type; //抽取到的奖品类型
		//获取随机数
		var rom1 = Math.random();

		for(var i = 0; i < len1; i++) {
			if(arr[i].pro >= rom1) {
				len2 = arr[i].deg.length;
				rom2 = Math.round(Math.random() * (len2 - 1));
				deg = arr[i].deg[rom2];
				type = arr[i].type;
				break;
			}

		}
		return {
			'type': type, //返回奖品类型
			'deg': deg //返回指针停下来的位置
		};
	}
	//转盘旋转
Rondom.prototype.turn = function(objc, objc2, objc3, objc4) {
		//获取transform的当前旋转位置数组
		var arr = ($attrCommon.getStyle(objc, "transform")).split(',');
		var arrCos = parseFloat(arr[3]);
		var arrSin = parseFloat(arr[1]);
		var sinDeg = Math.round(Math.asin(arrSin) * (180 / Math.PI)); //求当前转盘可能的角度
		var cosDeg = Math.round(Math.acos(arrCos) * (180 / Math.PI)); //求当前转盘可能的角度
		var deg = 0; //实际角度
		if(arrCos * arrSin > 0) {
			arrSin > 0 ? deg = cosDeg : deg = 180 - sinDeg;
		} else if(arrCos * arrSin < 0) {
			arrCos > 0 ? deg = sinDeg + 360 : deg = cosDeg;
		} else {
			arrSin >= 0 ? deg = cosDeg : deg = sinDeg + 360;
		}
		if(objc4) {
			//$attrCommon.setRotate(objc,objc3,deg);
			return deg;
		} else {
			$attrCommon.setRotate(objc, objc3, deg);
		}
	}
	//向TouchEvent对象订阅start触摸事件
Rondom.prototype.listenerStart = (function() {
	window.timeId1; //定义计时器
	var n = 0; //计时
	var flag = true; //是否点击了转盘
	var deg;
	var deg2 = 0; //获取上次旋转停留的位置
	var m = 0; //旋转次数,可以为小数
	var posObj; //获取抽取到的奖项对象
	return function(objc, n, objc2, objc3, objc4) {
		var $this = this; //保存对this的引用
		timeId1 = setInterval(function() {
			if(flag) {
				posObj = $this.getDeg(objc4);
				deg2 = $this.turn(objc, objc4, posObj.deg, true); //获取上次旋转停下来的位置
				objc.style.transform = 'rotate(' + 0 + 'deg' + ')'; //将转盘转回最初的位置
				deg = posObj.deg + 720; //转盘每次点击，一共旋转多少度
				flag = false;
			}
			deg2 = $this.turn(objc, objc4, posObj.deg);
			n = n + 0.2;
			m = m + ((720 + posObj.deg) / posObj.deg); //转盘目前旋转了多少度
			clearInterval(timeId1);
			if(m <= (720 + posObj.deg)) {
				if((m <= 720)) {
					$this.listenerStart(objc, n, objc2, objc3, objc4);

				} else if(m = (720 + posObj.deg)) {
					deg2 = $this.turn(objc, objc4, posObj.deg, true); //转盘在最后一次旋转前的位置
					objc.style.transform = 'rotate(' + 0 + 'deg' + ')'; //将转盘转回初始位置
					$this.listenerStart(objc, n, objc2, objc3, objc4); //转盘旋转到指定的角度上
				}
			} else {
				flag = true;
				n = 0;
				m = 0;
				deg2 = 0;
				deg = 0;
				$this.listenerEnd(objc3, objc2, posObj.type); //结束旋转
				posObj = null;
			}
		}, n);
	}
})();

//向TouchEvent对象订阅close事件

Rondom.prototype.listenerEnd = function(obj1, obj2, text) {
	var timeId2 = setTimeout(function() {
		obj1.style.display = 'block';
		obj2.textContent = 'start';
		obj1.textContent = text;
	}, 500);
}
var random = new Rondom();