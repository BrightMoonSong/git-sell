function OrdersDeliveryController($scope, OrdersDeliveryService, $rootScope, $q, ngDialog) {
	$scope.statusSearch = false;
	$scope.userId = localStorage.userId;
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var orderNo, storeId, status;
		$scope.drugstoreIdSearch = localStorage.drugstoreId; //	分店ID取登录时获得的
		if($scope.drugstoreIdSearch) { //	分店ID
			storeId = $scope.drugstoreIdSearch;
		} else {
			storeId = '';
		}
		if($scope.statusSearch) { //是否显示已删除订单 1：显示 0：不显示
			status = 1;
		} else {
			status = 0;
		}
		if($scope.orderNoSearch) { //查询订单号
			orderNo = $scope.orderNoSearch;
		} else {
			orderNo = '';
		}
		OrdersDeliveryService
			.find(orderNo, $scope.deliveryNameSearch, storeId, status, $scope.orderStatusSearch, currentPaseSize, currentPageNo)
			.then(
				function(result) {
					$scope.ordersList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};
	$scope.watchStatusSearch = 1;
	$scope.$watch('statusSearch', function(newVal, oldVal) {
		if($scope.watchStatusSearch == 2) {
			$scope.loadData(true);
		} else {
			$scope.watchStatusSearch = 2;
		}
	});
	//订单状态
	$scope.ordersStatusListSearch = [{
		"id": 0,
		"name": "已取消"
	}, {
		"id": 1,
		"name": "待商家确认"
	}, {
		"id": 2,
		"name": "等待接单"
	}, {
		"id": 3,
		"name": "配送员已接单"
	}, {
		"id": 4,
		"name": "配送员已取货"
	}, {
		"id": 5,
		"name": "已送达"
	}, {
		"id": 6,
		"name": "订单完成"
	}];
	$scope.ordersStatusList = function(status) {
		//订单状态：0 已取消   1:待商家确认   2:已确认(等待接单)   3:配送员已接单  4:配送员已取货 (配送中)  5:已送达(待评价)   6:已评价，订单完成
		switch(status) {
			case 0:
				return "已取消";
				break;
			case 1:
				return "待商家确认";
				break;
			case 2:
				return "等待接单";
				break;
			case 3:
				return "配送员已接单";
				break;
			case 4:
				return "配送员已取货";
				break;
			case 5:
				return "已送达";
				break;
			case 6:
				return "订单完成";
				break;
			default:
				return "其他";
				break;
		}
	}

	/**
	 * 弹出 详情 数据模态框
	 */
	$scope.openModal = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/orders/OrdersInfoModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersInfoModalController',
			scope: $scope,
			width: 1150
		});
	};

	/**
	 * 弹窗  除了  详情  的其他按钮的弹窗
	 */
	$scope.openModalConfirm = function(dataId, n) {
		$scope.dataId = dataId;
		$scope.openModalType = n;
		$scope.dialog = ngDialog.open({
			template: 'views/orders/OrdersModalConfirm.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersModalConfirmController',
			scope: $scope,
			width: 950
		});
	};

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}
//详情
function OrdersInfoModalController($scope, OrdersDeliveryService, $rootScope, ngDialog) {
	//初始化
	$scope.initEntity = function() {
		OrdersDeliveryService
			.getinfo($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
				},
				function(result) {

				});
	};
	//用户范围--列表用它回显
	$scope.userScopeReturn = function(id) {
		switch(id) {
			case 1:
				return '商家';
				break;
			case 2:
				return '用户';
				break;
			case 3:
				return '配送员';
				break;
			default:
				return '无';
				break;
		}
	}
	//订单状态：0 已取消   1:待商家确认   2:已确认(等待接单)   3:配送员已接单  4:配送员已取货 (配送中)  5:已送达(待评价)   6:已评价，订单完成
	$scope.returnOrderStatus = function(status) {
		switch(status) {
			case 0:
				return "已取消";
				break;
			case 1:
				return "待商家确认";
				break;
			case 2:
				return "等待接单";
				break;
			case 3:
				return "配送员已接单";
				break;
			case 4:
				return "配送员已取货";
				break;
			case 5:
				return "已送达";
				break;
			case 6:
				return "订单完成";
				break;
			default:
				return "其他";
				break;
		}
	}

	/**
	 * 弹窗   订单商品评价
	 */
	$scope.openModalGoodsAppraisal = function(dataId) {
		$scope.dataAppraisalId = dataId;
		$scope.dialogAppraisal = ngDialog.open({
			template: 'views/orders/OrdersAppraisalModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersAppraisalModalController',
			scope: $scope,
			width: 1150
		});
	};
	//关闭弹窗
	$scope.cancelModalAppraisal = function() {
		$scope.dialogAppraisal.close();
	};

	//标签页
	$scope.onClickTab = function(url) {
		if($scope.currentTab == url) {
			return true;
		}
		$scope.currentTab = url;
		switch(url) {
			case 'findoperatelist.html':
				OrdersDeliveryService
					.findoperatelist($scope.dataId)
					.then(
						function(result) {
							$scope.findoperatelistData = result.data;
						},
						function(result) {

						});
				break;
			default:
				break;
		}
	}

	//初始化方法
	$scope.onClickTab('basicInformation.html');
	$scope.initEntity();
}

//订单评价的弹窗controller
function OrdersAppraisalModalController($scope, OrdersDeliveryService, $rootScope) {
	$scope.arrayAppraisalScore = [];
	$scope.arrayAppraisalScoreRev = [];
	$scope.initEntityAppraisal = function() {
		OrdersDeliveryService
			.findinfos($scope.dataId, $scope.dataAppraisalId)
			.then(
				function(result) {
					$scope.dataEntityAppraisal = result.data;
					try {
						for(var i = 0; i < $scope.dataEntityAppraisal.score; i++) {
							$scope.arrayAppraisalScore.push(i);
						}
						for(var i = 0; i < 5 - $scope.dataEntityAppraisal.score; i++) {
							$scope.arrayAppraisalScoreRev.push(i);
						}
					} catch(e) {
						//TODO handle the exception
					}
				},
				function(result) {

				});
	}
	//回复
	$scope.updateinfoAppraisal = function() {
		if($scope.updateinfoAppraisalDis) {
			return true;
		}
		$scope.updateinfoAppraisal = true;
		var obj = {
			'id': $scope.dataEntityAppraisal.id,
			'replyUserId': localStorage.userId,
			'storeReply': $scope.dataEntityAppraisal.storeReplyAppraisal
		};
		OrdersDeliveryService
			.updateinfo(obj)
			.then(
				function(result) {
					$scope.updateinfoAppraisal = false;
					if(result.code >= 0) {
						$scope.cancelModalAppraisal();
					}
				},
				function(result) {
					$scope.updateinfoAppraisal = false;
				});
	}

	//初始化--根据商品ID和订单ID获取评价详情
	$scope.initEntityAppraisal();
}

//详情以外的按钮的弹窗
function OrdersModalConfirmController($scope, OrdersDeliveryService, $rootScope) {
	$scope.remark = '';
	//保存
	$scope.okModal = function() {
		if($scope.okModalDis) {
			return false;
		}
		$scope.okModalDis = true;
		switch($scope.openModalType) {
			case 1: //确认订单
				OrdersDeliveryService
					.confirm($scope.dataId, $scope.userId, $scope.remark)
					.then(
						function(result) {
							$scope.cancelModal();
							$scope.loadData();
							$scope.okModalDis = false;
						},
						function(result) {
							$scope.okModalDis = false;
						});
				break;
			case 2: //拒绝接单			
				if(!$scope.remark) {
					$rootScope.showAlert("拒绝接单备注必须写!");
					$scope.okModalDis = false;
					return false;
				}
				OrdersDeliveryService
					.refuse($scope.dataId, $scope.userId, $scope.remark)
					.then(
						function(result) {
							$scope.cancelModal();
							$scope.loadData();
							$scope.okModalDis = false;
						},
						function(result) {
							$scope.okModalDis = false;
						});
				break;
				//			case 3: //分配配送员
				//				OrdersDeliveryService
				//					.dispatcher($scope.dataId, $scope.userId, $scope.storeUserId, $scope.remark)
				//					.then(
				//						function(result) {
				//							$scope.cancelModal();
				//							$scope.loadData();
				//							$scope.okModalDis = false;
				//						},
				//						function(result) {
				//							$scope.okModalDis = false;
				//						});
				//				break;
			case 4: //订单派送中
				OrdersDeliveryService
					.shipped($scope.dataId, $scope.userId, $scope.remark)
					.then(
						function(result) {
							$scope.cancelModal();
							$scope.loadData();
							$scope.okModalDis = false;
						},
						function(result) {
							$scope.okModalDis = false;
						});
				break;
			case 5: //订单已送达
				OrdersDeliveryService
					.complete($scope.dataId, $scope.userId, $scope.remark)
					.then(
						function(result) {
							$scope.cancelModal();
							$scope.loadData();
							$scope.okModalDis = false;
						},
						function(result) {
							$scope.okModalDis = false;
						});
				break;
		}
	}
}

angular
	.module('managerApp')
	.controller('OrdersDeliveryController', OrdersDeliveryController)
	.controller('OrdersInfoModalController', OrdersInfoModalController)
	.controller('OrdersModalConfirmController', OrdersModalConfirmController)
	.controller('OrdersAppraisalModalController', OrdersAppraisalModalController)