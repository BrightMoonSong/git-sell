//使用原生js获取浏览器ScrollTop，ScrollLeft的方法
function scroll() {
	if(window.pageYOffset != null) {
		//            支持IE9 +
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else if(document.compatMode == 'CSS1Compat') {
		//            声明了DTD
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}

	return {
		left: document.body.scrollLeft,
		top: document.body.scrollTop
	}
}