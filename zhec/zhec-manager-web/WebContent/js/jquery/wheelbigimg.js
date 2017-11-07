/*非Firefox的主流浏览器*/
function bbimg(o) {
	var zoom = parseInt(o.style.zoom, 10) || 100;
	zoom += event.wheelDelta / 12;
	if(zoom < 30) { //图片缩小倍数最小30%
		zoom = 30;
	}
	if(zoom > 400) { //图片最大倍数最大500%
		zoom = 400;
	}
	if(zoom > 0) o.style.zoom = zoom + '%';
	return false;
}

//用JS显示输入的字符个数
function CountWords(obj, show_id) {
	var fullStr = obj.value;
	var charCount = fullStr.length;
	var rExp = /[^A-Za-z0-9]/gi;
	var spacesStr = fullStr.replace(rExp, ' ');
	var cleanedStr = spacesStr + ' ';
	do {
		var old_str = cleanedStr;
		cleanedStr = cleanedStr.replace('  ', ' ');
	} while (old_str != cleanedStr);
	var splitString = cleanedStr.split(' ');
	document.getElementById(show_id).innerHTML = ",已输入" + charCount + "个字";
}