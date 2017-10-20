/**
 * 柱形图
 * @param {String} titleText  图形的名字
 * @param {Array} legendData 图例的名字
 * @param {Array} xAxisData  X轴数据名字
 * @param {Array} seriesData 数据
 */
function sliderEcharts(titleText, legendData, xAxisData, seriesData) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));
	myChart.showLoading(); //简单的加载动画
	myChart.hideLoading();
	// 指定图表的配置项和数据--->柱形图
	var option = {
		backgroundColor: '#f9f9f9', //背景色是全局的，所以直接在 option 下设置 backgroundColor
		textStyle: { //文本的样式可以设置全局的 textStyle。
			color: 'rgba(25, 25, 25, 0.6)' //柱子下面名字的颜色
		},
		label: { //也可以每个系列分别设置，每个系列的文本设置在 label.normal.textStyle。
			normal: {
				textStyle: {
					color: 'rgba(255, 255, 255, 0.3)'
				}
			}
		},
		labelLine: { //饼图的话还要将标签的视觉引导线的颜色设为浅色。
			normal: {
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.3)'
				}
			}
		},
		title: {
			text: titleText
		},
		tooltip: {},
		legend: {
			right: 10, // legend 放置在右侧   默认中间。
			//top: '15%',
			//orient: 'vertical', // 纵向布局。
			data: legendData
		},
		dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
				type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
				xAxisIndex: 0, //x轴
				start: 0, // 左边在 0% 的位置。
				end: 100 // 右边在 100% 的位置。
			},
			{ // 这个dataZoom组件，也控制x轴。
				type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件     内置于图形上的  可拖动变化
				xAxisIndex: 0, //x轴
				start: 10, // 左边在 10% 的位置。
				end: 60 // 右边在 60% 的位置。
			},
			{
				type: 'slider',
				yAxisIndex: 0, //Y轴
				start: 0,
				end: 100
			},
			{
				type: 'inside',
				yAxisIndex: 0, //Y轴
				start: 0,
				end: 100
			}
		],
		itemStyle: { //itemStyle都会有normal和emphasis两个选项，normal选项是正常展示下的样式，emphasis是鼠标 hover 时候的高亮样式。
			normal: {
				// 阴影的大小
				shadowBlur: 200,
				// 阴影水平方向上的偏移
				shadowOffsetX: 0,
				// 阴影垂直方向上的偏移
				shadowOffsetY: 0,
				// 阴影颜色
				shadowColor: 'rgba(0, 0, 0, 0.3)'
			},
			emphasis: {
				shadowBlur: 200,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		},
		xAxis: {
			data: xAxisData
		},
		yAxis: {},
		series: []
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	var attrData = [];
	seriesData.forEach(function(element, index, array) {
		attrData.push({
			name: legendData[index],
			type: 'bar',
			data: element
		});
	});
	myChart.setOption({
		series: attrData
	});

	myChart.on('click', function(params) {
		// 控制台打印数据的名称
		console.log(params.name);
	});
}
/**
 * 折线图
 * @param {String} titleText  图形的名字
 * @param {Array} legendData 图例的名字
 * @param {Array} xAxisData  X轴数据名字
 * @param {Array} seriesData 数据
 */
function lineEcharts(titleText, legendData, xAxisData, seriesData) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

	option = {
		title: {
			text: titleText,
			left: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c}'
		},
		legend: {
			left: 'left',
			data: legendData
		},
		xAxis: {
			type: 'category',
			name: 'x',
			splitLine: {
				show: false
			},
			data: xAxisData
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		yAxis: {
			type: 'log',
			name: 'y'
		},
		series: []
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

	var attrData = [];
	seriesData.forEach(function(element, index, array) {
		attrData.push({
			name: legendData[index],
			type: 'line',
			data: element
		});
	});
	myChart.setOption({
		series: attrData
	});

	myChart.on('click', function(params) {
		// 控制台打印数据的名称
		console.log(params);
		console.log(params.name);
	});
}
/**
 * 饼图
 * @param {String} titleText  图形的名字
 * @param {String} titleSubText  图形的名字
 * @param {Array} legendData 图例的名字
 * @param {Array} seriesData 数据
 */
function pieEcharts(titleText,titleSubText, legendData, seriesData) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

	option = {
		title: {
			text: titleText,
			subtext: titleSubText,//副标题
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: legendData
		},
		series: []
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	
	var attrData = [];
	seriesData.forEach(function(element, index, array) {
		attrData.push({
			value: element,
			name: legendData[index]
		});
	});
	myChart.setOption({
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: attrData,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	});

	myChart.on('click', function(params) {
		// 控制台打印数据的名称
		console.log(params.name);
	});
}

//让IE兼容forEach方法
//Array.forEach implementation for IE support..  
//https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach  
if(!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {
		var T, k;
		if(this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
		if({}.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if(thisArg) {
			T = thisArg;
		}
		k = 0;
		while(k < len) {
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}