
var controShow = '<div class="control_div">' +
	'<div class="control_line">' +
	'<button onclick="startPlay()" id="btn-start-play">开始播放</button>' +
	'<button onclick="pausePlay()" id="btn-pause-play">暂停播放</button>' +
	'<button onclick="continuePlay()" id="btn-continue-play">继续播放</button>' +
	'</div>' +
	'<div class="control_line">' +
	'<span class="longitude line-2">经度：</span>' +
	'<span id="longitude" class="longitude line-3"></span>' +
	'<span class="latitude line-2">纬度：</span>' +
	'<span id="latitude" class="latitude line-3"></span>' +
	'</div>' +
	'<div class="control_line">' +
	'<span class="address line-2">地址：</span>' +
	'<span id="address" class="address line-8"></span>' +
	'</div>' +
//	'<div class="control_line">' +
//	'<div class="optionpanel">' +
//	'<label>选择主题</label>' +
//	'<select id="stylelist" onchange="changeMapStyle(this.value)"></select>' +
//	'</div>' +
	'</div>'
'</div>';

//创建和初始化地图函数：
function initMap() {
	createMap(); //创建地图
	setMapEvent(); //设置地图事件
	addMapControl(); //向地图添加控件
	addMarker(); //向地图中添加marker
	addPolyline(); //向地图中添加线
	//addRemark(); //向地图中添加文字标注
	console.log(map.getContainer())

	//setTimeout(console.dir(document.getElementsByClassName('BMap_cpyCtrl')[0]), 2000);
	//$(".BMap_cpyCtrl").attr("style","display:none;");
}

//创建地图函数：
function createMap() {
	var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
	//	'107.035644|30.009586'
	var point = new BMap.Point(107.035644, 30.009586); //定义一个中心点坐标
	map.centerAndZoom(point, 7); //设定地图的中心点和坐标并将地图显示在地图容器中
	window.map = map; //将map变量存储在全局
	console.dir(map)
}

//地图事件设置函数：
function setMapEvent() {
	map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
	map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
	map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
	map.enableKeyboard(); //启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
	//向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({
		anchor: BMAP_ANCHOR_TOP_LEFT,
		type: BMAP_NAVIGATION_CONTROL_LARGE
	});
	map.addControl(ctrl_nav);
	//向地图中添加缩略图控件--详情见--》http://developer.baidu.com/map/reference/index.php?title=Class:%E6%8E%A7%E4%BB%B6%E7%B1%BB/OverviewMapControlOptions
	var ctrl_ove = new BMap.OverviewMapControl({
		anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
		isOpen: true
	});

	//ctrl_ove.setSize(N(130,100));
	console.log(ctrl_ove.getSize());

	//	ctrl_ove.changeView()//切换缩略地图控件的开合状态。--》见--》http://developer.baidu.com/map/reference/index.php?title=Class:%E6%8E%A7%E4%BB%B6%E7%B1%BB/OverviewMapControl
	map.addControl(ctrl_ove);
	//向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_BOTTOM_LEFT
	});
	map.addControl(ctrl_sca);

	//设置版权控件
	var cr = new BMap.CopyrightControl({
		anchor: BMAP_ANCHOR_TOP_RIGHT
	}); //设置版权控件位置
	map.addControl(cr); //添加版权控件

	var bs = map.getBounds(); //返回地图可视区域
	cr.addCopyright({
		id: 1,
		content: controShow, //控件HTML
		bounds: bs
	});
	//Copyright(id,content,bounds)类作为CopyrightControl.addCopyright()方法的参数
}

//标注点数组
var markerArr = [{
	title: "起点",
	content: "出发地",
	point: "116.437901|39.958751",
	isOpen: 0,
	icon: {
		w: 21,
		h: 21,
		l: 0,
		t: 0,
		x: 6,
		lb: 5
	}
}, {
	title: "终点",
	content: "到站了",
	point: "116.331398|39.897445",
	isOpen: 0,
	icon: {
		w: 21,
		h: 21,
		l: 0,
		t: 0,
		x: 6,
		lb: 5
	}
}, {
	title: "终点",
	content: "到站了",
	point: "116.355653|39.764888",
	isOpen: 0,
	icon: {
		w: 21,
		h: 21,
		l: 0,
		t: 0,
		x: 6,
		lb: 5
	}
}, {
	title: "终点",
	content: "到站了",
	point: "116.253653|39.861888",
	isOpen: 0,
	icon: {
		w: 21,
		h: 21,
		l: 0,
		t: 0,
		x: 6,
		lb: 5
	}
}];
//创建marker
function addMarker() {
	for(var i = 0; i < markerArr.length; i++) {
		var json = markerArr[i];
		var p0 = json.point.split("|")[0];
		var p1 = json.point.split("|")[1];
		var point = new BMap.Point(p0, p1);
		var iconImg = createIcon(json.icon);
		var marker = new BMap.Marker(point, {
			icon: iconImg
		});
		var iw = createInfoWindow(i);
		var label = new BMap.Label(json.title, {
			"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
		});
		marker.setLabel(label);
		map.addOverlay(marker);
		label.setStyle({
			borderColor: "#808080",
			color: "#333",
			cursor: "pointer"
		});

		(function() {
			var index = i;
			var _iw = createInfoWindow(i);
			var _marker = marker;
			_marker.addEventListener("click", function() {
				this.openInfoWindow(_iw);
			});
			_iw.addEventListener("open", function() {
				_marker.getLabel().hide();
			})
			_iw.addEventListener("close", function() {
				_marker.getLabel().show();
			})
			label.addEventListener("click", function() {
				_marker.openInfoWindow(_iw);
			})
			if(!!json.isOpen) {
				label.hide();
				_marker.openInfoWindow(_iw);
			}
		})()
	}
}
//创建InfoWindow
function createInfoWindow(i) {
	var json = markerArr[i];
	var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
	return iw;
}
//创建一个Icon
function createIcon(json) {
	var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
		imageOffset: new BMap.Size(-json.l, -json.t),
		infoWindowOffset: new BMap.Size(json.lb + 5, 1),
		offset: new BMap.Size(json.x, json.h)
	})
	return icon;
}
//标注线数组
var attrline = ['106.48315|29.519495'
];
var attrlineAll = ['106.48315|29.519495',
	'106.993675|29.890422',
	'107.035644|30.009586',
	'106.999424|28.189325',
	'107.12763|27.078698'
];
var plPoints = [{
	style: "solid",
	weight: 5,
	color: "#72e58b",
	opacity: 1,
	points: attrline
}];
//向地图中添加线函数
function addPolyline() {
	for(var i = 0; i < plPoints.length; i++) {
		var json = plPoints[i];
		var points = [];
		for(var j = 0; j < json.points.length; j++) {
			var p1 = json.points[j].split("|")[0];
			var p2 = json.points[j].split("|")[1];
			points.push(new BMap.Point(p1, p2));
		}
		var line = new BMap.Polyline(points, {
			strokeStyle: json.style,
			strokeWeight: json.weight,
			strokeColor: json.color,
			strokeOpacity: json.opacity
		});
		map.addOverlay(line);
	}
}
//文字标注数组
var lbPoints = [{
	point: "116.238981|39.883051",
	content: "火车站附近"
}];
//向地图中添加文字标注函数
function addRemark() {
	for(var i = 0; i < lbPoints.length; i++) {
		var json = lbPoints[i];
		var p1 = json.point.split("|")[0];
		var p2 = json.point.split("|")[1];
		var label = new BMap.Label("<div style='padding:2px;'>" + json.content + "</div>", {
			point: new BMap.Point(p1, p2),
			offset: new BMap.Size(3, -6)
		});
		map.addOverlay(label);
		label.setStyle({
			borderColor: "#999"
		});
	}
}

initMap(); //创建和初始化地图

//window.clearTimeout(idsetTimeout);
function hello() {
	//	attrlineAll
	//	attrline = ['106.48315|29.519495',
	//		'106.993675|29.890422',
	//		'107.035644|30.009586',
	//		'106.999424|28.189325',
	//		'107.12763|27.078698'
	//	];
	if(attrlineAll.length == attrline.length) {
		window.clearTimeout(idsetTimeout);
		return;
	}
	var leng = attrline.length;
	var aa = attrlineAll[leng];
	attrline.push(aa);
	var zuobiao = aa.split('|')
	var point = new BMap.Point(zuobiao[0], zuobiao[1]); //定义一个中心点坐标
	map.centerAndZoom(point, 9); //设定地图的中心点和坐标并将地图显示在地图容器中
	addPolyline();
	idsetTimeout = window.setTimeout(hello, 1000);
}
//开始播放
function startPlay() {
	//轨迹
	var idsetTimeout = window.setTimeout(hello, 1000);
	window.idsetTimeout = idsetTimeout;
}
//暂停播放
function pausePlay() {
	window.clearTimeout(idsetTimeout);
}
//继续播放
function continuePlay() {
	var idsetTimeout = window.setTimeout(hello, 1000);
	window.idsetTimeout = idsetTimeout;
}