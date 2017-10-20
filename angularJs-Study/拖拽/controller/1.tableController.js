app.controller('myctr', myctr)
	.controller('UserEchartsFormModalController', UserEchartsFormModalController);

function myctr($scope, ngDialog,$filter) {
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		//		var defer = $q.defer();
		//		var userName = $scope.userNameSearch;
		//		SysUserService.find(userName, currentPaseSize, currentPageNo).then(
		//			function(result) {
		//$scope.userList = result.data;

		$scope.userList = [{
			"email": "89@qq.com",
			"ip": "1.1.1.1",
			"lastLogin": "2012-1-1",
			"loginId": "1234",
			"password": "4321",
			"remark": "备注",
			"roleIds": "2",
			"scope": "3",
			"status": "正常",
			"userId": "userId1",
			"userName": "userName"
		}, {
			"email": "89@qq.com",
			"ip": "1.1.1.1",
			"lastLogin": "2012-1-1",
			"loginId": "1234",
			"password": "4321",
			"remark": "备注",
			"roleIds": "2",
			"scope": "3",
			"status": "正常",
			"userId": "userId2",
			"userName": "userName"
		}, {
			"email": "89@qq.com",
			"ip": "1.1.1.1",
			"lastLogin": "2012-1-1",
			"loginId": "1234",
			"password": "4321",
			"remark": "备注",
			"roleIds": "2",
			"scope": "3",
			"status": "正常",
			"userId": "userId3",
			"userName": "userName"
		}];

		//拖拽方法
		logicalProcesses($scope, $filter, SysUserDragData($scope.userList), 'userListToPdf');

		//				defer.resolve(result);
		//			},
		//			function(result) {
		//				defer.reject(result);
		//			})
		//		return defer.promise;
	}
$scope.find();
	$scope.ToExcel = function() {
		var obj = clone($scope.userList);

		JSONToExcelConvertor($scope.userList, localStorage.userName + '-资金结算'); //第二个是Excel文件名字
	}
	$scope.ToPdf = function() {
		htmlToPdf('userListToPdf', constPageSize);
	}
	//echarts 
	$scope.ToEcharts = function() {
		$scope.dialog = ngDialog.open({
			template: '拖拽/views/echerts.html',
			className: 'ngdialog-theme-default',
			controller: 'UserEchartsFormModalController',
			scope: $scope,
			width: 850
		})
	}
}

function UserEchartsFormModalController($scope, SysUserService, $timeout, $rootScope) {
	//柱形图
	$scope.sliderEcharts = function() {
		$timeout(function() {
			var titleText = 'ECharts 示例';
			var legendData = ['销量', '笑量'];
			var xAxisData = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"];
			var seriesData = [];
			seriesData.push([5, 20, 36, 10, 10, 20]);
			seriesData.push([3, 23, 33, 13, 13, 40]);
			sliderEcharts(titleText, legendData, xAxisData, seriesData);
		}, 200);
	};
	//折线图
	$scope.lineEcharts = function() {
		$timeout(function() {
			var titleText = '对数轴示例';
			var legendData = ['1/2的指数', '2的指数', '3的指数'];
			var xAxisData = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
			var seriesData = [];
			seriesData.push([1, 3, 9, 27, 81, 847, 741, 2223, 6669]);
			seriesData.push([1, 2, 4, 8, 16, 32, 64, 128, 256]);
			seriesData.push([1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64, 1 / 128, 1 / 256, 1 / 512]);
			lineEcharts(titleText, legendData, xAxisData, seriesData);
		}, 200);
	};
	//饼图
	$scope.pieEcharts = function() {
		$timeout(function() {
			var titleText = '某站点用户访问来源';
			var titleSubText = '纯属虚构'; ////副标题
			var legendData = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
			var seriesData = [335, 310, 234, 135, 1548];
			pieEcharts(titleText, titleSubText, legendData, seriesData);
		}, 200);
	};

	//初始化
	$scope.sliderEcharts(); //-->柱形图
}

/**
 * SysUser 处理需要拖动的table数据
 * @param {Object} attr 数组
 */
function SysUserDragData(attr) {
	var obj = {
		'headList': [],
		'tableData': [],
		'sorData': []
	};
	obj.headList = [{
			"code": "email",
			"value": "邮箱",
			"width": "200",
			"ngif": true
		},
		{
			"code": "ip",
			"value": "IP",
			"width": "200",
			"ngif": true
		},
		{
			"code": "lastLogin",
			"value": "最后登录时间",
			"width": "200",
			"ngif": true
		},
		{
			"code": "loginId",
			"value": "loginId",
			"width": "200",
			"ngif": true
		},
		{
			"code": "password",
			"value": "密码",
			"width": "200",
			"ngif": false
		},
		{
			"code": "remark",
			"value": "备注",
			"width": "200",
			"ngif": true
		},
		{
			"code": "roleIds",
			"value": "角色ID",
			"width": "200",
			"ngif": true
		},
		{
			"code": "scope",
			"value": "scope",
			"width": "200",
			"ngif": true
		},
		{
			"code": "status",
			"value": "状态",
			"width": "200",
			"ngif": true
		},
		{
			"code": "userId",
			"value": "userId",
			"width": "200",
			"ngif": true
		},
		{
			"code": "userName",
			"value": "用户名",
			"width": "200",
			"ngif": true
		}
	];
	obj.tableData = attr;
	obj.sorData = {
		"email": "+",
		"ip": "+",
		"lastLogin": "+",
		"loginId": "+",
		"password": "+",
		"remark": "+",
		"roleIds": "+",
		"scope": "+",
		"status": "+",
		"userId": "+",
		"userName": "+"
	};
	return obj;
}