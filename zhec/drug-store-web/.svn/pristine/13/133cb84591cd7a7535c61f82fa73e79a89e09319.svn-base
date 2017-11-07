function FundSettlementController($scope, FundSettlementService, $q, $rootScope, goodsReminder, ngDialog) {
	$scope.WdatePicker = {}; //日期
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var parmValue = $scope.nameSearch;
		$scope.drugstoreIdSearch = localStorage.drugstoreId;//	分店ID取登录时获得的
		var storeId = $scope.drugstoreIdSearch;
		var startTime = $scope.WdatePicker.startTimes;
		var endTime = $scope.WdatePicker.endTimes;
		FundSettlementService
			.findinfos(currentPageNo, currentPaseSize, parmValue, storeId, startTime, endTime)
			.then(function(result) {
				$scope.capitalList = result.data.settlementList;
				$scope.totalProfit = result.data.totalProfit;
				$scope.totalOrderPay = result.data.totalOrderPay;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
		return defer.promise;
	};
	//生成Excel表格
	$scope.ToExcel = function() {
		var arrys = [];
		$scope.capitalList.forEach(function(ele, index, arry) {
			var str = {};
			for(var key in ele) {
				if(key == 'orderId') {
					str['订单ID'] = ele[key];
				}
				if(key == 'orderNo') {
					str['订单号'] = ele[key];
				}
				if(key == 'storeName') {
					str['分店名字'] = ele[key];
				}
				if(key == 'createTimeStr') {
					str['订单生成时间'] = ele[key];
				}
				if(key == 'completeTimeStr') {
					str['订单完成时间'] = ele[key];
				}
				if(key == 'orderPay') {
					str['订单支付'] = ele[key];
				}
				if(key == 'profit') {
					str['利润'] = ele[key];
				}
			}
			arrys.push(str);
		})
		JSONToExcelConvertor(arrys, localStorage.userName + '-资金结算'); //第二个参数是Excel文件名字
	}
	//获取所有连锁店列表--一级
//	$scope.drugfindall = function() {
//		FundSettlementService
//			.drugfindall()
//			.then(
//				function(result) {
//					$scope.drugAllNameListSearch = result.data;
//				},
//				function(result) {
//
//				});
//	}
//	$scope.drugfindall(); //获取所有连锁店列表--一级
//	//根据连锁店ID列出所有连锁店子药店列表--二级
//	$scope.drugstoreById = function(id) {
//		if(!id) {
//			return false;
//		}
//		FundSettlementService
//			.drugstoreById(id)
//			.then(
//				function(result) {
//					$scope.drugSecondNameListSearch = result.data;
//				},
//				function(result) {
//
//				});
//	}
}

angular
	.module('managerApp')
	.controller('FundSettlementController', FundSettlementController)