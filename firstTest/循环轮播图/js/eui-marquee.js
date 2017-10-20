'use strict';

(function(window, undefined) {
	/* eui 命名空间  */
	var _eui = window.eui;
	var eui = window.eui = {};

	eui.noConflict = function() {
		window.eui = _eui;
	};

	eui.convertToArray = function(nodes) {
		var r = [];
		try {
			r = Array.prototype.slice.call(nodes, 0);
		} catch(e) {
			for(var i = 0, len = nodes.length; i < len; i++) {
				r.push(nodes[i]);
			}
		}

		return r;
	};

	eui.getStyle = function(element) {
		var style;

		if(document.defaultView && document.defaultView.getComputedStyle) {
			style = document.defaultView.getComputedStyle(element, null);
		} else {
			style = element.currentStyle;
		}

		return style;
	};

	eui.on = function(elem, type, listener) {
		if(elem.addEventListener) {
			elem.addEventListener(type, listener, false);
		} else if(elem.attachEvent) {
			elem.attachEvent('on' + type, listener);
		} else {
			elem['on' + type] = listener;
		}
	};

	// 原型式继承
	if(!Object.create) {
		Object.create = function(object) {
			var F = function() {};
			F.prototype = object;
			return new F;
		};
	}
})(window);

(function() {
	/*
	    class MarqueeIndex 单例

	    用于管理索引插排
	*/
	var MarqueeIndex = {};

	MarqueeIndex.increaseState = function(marquee) {
		marquee.currentIndex++;

		if(marquee.currentIndex > (marquee.size - 1)) {
			marquee.currentIndex = 0;
		}
	};

	MarqueeIndex.decreaseState = function(marquee) {
		marquee.currentIndex--;

		if(marquee.currentIndex < 0) {
			marquee.currentIndex = marquee.size - 1;
		}
	};

	/*
	    class Marquee 

	    用于移动滑动屏
	*/
	var Marquee = {};
	Marquee.unit = {};
	Marquee.view = {};
	Marquee.unit.SIDE_LEN = 710;
	Marquee.unit.SKEWING_LEN = -1325;

	Marquee.initialize = function(content, items, lb, rb, listener) {
		this.view.content = content;
		this.view.items = eui.convertToArray(items);
		this.view.lb = lb;
		this.view.rb = rb;
		this.currentIndex = 0;
		this.size = this.view.items.length - 4;

		this.init();

		if(listener) {
			listener(this);
			return this;
		}

		this.auto();
		this.onListener();
		return this;
	};

	// 初始化设定预置容器
	Marquee.init = function() {
		var content = this.view.content;
		content.style.width = this.unit.SIDE_LEN * (this.size + 4) + 'px';
		content.style.left = this.unit.SKEWING_LEN + 'px';
	};

	// 向左滑动屏幕
	Marquee.slideLeft = function() {
		MarqueeIndex.decreaseState(this);

		var left = -(this.currentIndex + 1) * this.unit.SIDE_LEN,
			skewlength = this.unit.SKEWING_LEN,
			len = this.unit.SIDE_LEN;

		this.move(this.view.content, left, skewlength, len);
	};

	// 向右滑动屏幕
	Marquee.slideRight = function() {
		MarqueeIndex.increaseState(this);

		var left = -(this.currentIndex - 1) * this.unit.SIDE_LEN,
			skewlength = this.unit.SKEWING_LEN,
			len = -this.unit.SIDE_LEN;

		this.move(this.view.content, left, skewlength, len);
	};

	// 动画移动函数
	Marquee.move = function(content, left, skewlength, len) {
		var n = 10,
			count = 0,
			l = len / n;

		loop();

		function loop() {
			content.style.left = skewlength + left + l * count + 'px';
			count++;

			if(count <= n) {
				setTimeout(loop, 33);
			}
		}
	};

	// 自动运行
	Marquee.auto = function() {
		var self = this;

		self.autoId = setTimeout(loop, 2000);

		function loop() {
			self.slideRight();
			self.autoId = setTimeout(loop, 2000);
		}
	};

	// 停止自动运行
	Marquee.stopAuto = function() {
		if(this.autoId || this.listenId) {
			clearTimeout(this.autoId);
			clearTimeout(this.listenId);
			this.autoId = null;
			this.listenId = null;
		}
	};

	// 侦听无事件触发时，自动运行
	Marquee.listening = function() {
		var self = this;

		this.listenId = setTimeout(function() {
			self.auto();
		}, 2000);
	};

	// 事件处理
	Marquee.onListener = function() {
		var self = this,
			lb = this.view.lb,
			rb = this.view.rb;

		eui.on(lb, 'click', function() {
			self.stopAuto();
			self.slideLeft();
			self.listening();
		});

		eui.on(rb, 'click', function() {
			self.stopAuto();
			self.slideRight();
			self.listening();
		});
	};

	// 提供容器， 内部滑动项， 左按钮，  有按钮
	eui.createMarquee = function(content, items, lb, rb) {
		return Object.create(Marquee).initialize(content, items, lb, rb);
	};
})();

(function() {
	eui.on(window, 'load', function() {
		eui.createMarquee(document.querySelector('#glmarquee .mq-p'), document.querySelectorAll('#glmarquee .mq-i'),
			document.querySelector('#glmarquee .mq-btn.left'), document.querySelector('#glmarquee .mq-btn.right'));
	});
})();