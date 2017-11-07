/**
 * 系统用户controller定义
 */
function OrdersPrescriptionOrdersController($scope, $q, $rootScope, constPageSize, OrdersPrescriptionOrdersService, ngDialog) {
	$scope.dataId = ""; //当前操作的数据id
	$scope.submitStatus = ""; //搜索关键词 按提交方式检索
	$scope.status = ""; //搜索关键词 按订单状态检索
	$scope.showBigPic = false; //是否显示大图
	$scope.okModalDisabled = false; //保存按钮的disabled
	$scope.memberId="";

	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var submitStatus = $scope.submitStatus;
		var status = $scope.status;
		OrdersPrescriptionOrdersService.find(currentPaseSize, currentPageNo, submitStatus, status).then(
			function(result) {
				$scope.ordersAllList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	/**
	 * 弹出模态框
	 */
	$scope.openModal = function(dataId,memberId) {
		$scope.dataId = dataId;
		$scope.dataIdoss = imgPathPrescription + '/' + memberId;
		$scope.dialog = ngDialog.open({
			template: 'views/orders/OrdersPrescriptionOrdersFormModal.html',
			className: 'ngdialog-theme-default',
			controller: 'OrdersPrescriptionOrdersFormModalController',
			scope: $scope,
			width: 1060
		});
	}

	//点击显示大图
	$scope.showBigImg = function(imgsrc) {
		$scope.showPic = imgsrc;
		$scope.dialog = ngDialog.open({
			template: 'firstDialogId',
			className: 'ngdialog-theme-default',
			scope: $scope,
			width: 800,
			controller: showBigImgController
		})

	}
}

function showBigImgController($scope, $http, $q, $compile, OrdersPrescriptionOrdersService) {
	$scope.currentImg = $scope.showPic;
	$scope.closeModal = function() {
		$scope.dialog.close()
	}
}

/**
 * 弹出页面的controller定义
 */
function OrdersPrescriptionOrdersFormModalController($scope, OrdersPrescriptionOrdersService,$rootScope) {
	$scope.showOss = true; //OSS隐藏
	$scope.data = {};
	$scope.initEntity = function(mes) {
		$scope.currentTab = mes;
		OrdersPrescriptionOrdersService
			.get($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
					//数组倒序排列
					$scope.dataEntity.recipeOrderMessage = $scope.dataEntity.recipeOrderMessage.reverse();
					$scope.dataEntity.recipeOrderMessageRemarks = $scope.dataEntity.recipeOrderMessageRemarks.reverse();
				}
			);

	}


	//发送留言
	$scope.okModal = function() {
		var userId = localStorage.userId;
		if (imgUrl == '' && ($scope.data.message == '' || $scope.data.message == undefined)) {
			 $rootScope.showAlert("发送信息不得为空！");
			return 0;
		}
		OrdersPrescriptionOrdersService
			.reply($scope.dataId, userId, $scope.data.message, imgUrl)
			.then(
				function(result) {
					$scope.loadData();
					$scope.initEntity('leaveMessage.html')
					$scope.data.message = "";
					$scope.initEntity('leaveMessage.html')
					picDelete();
					imgUrl = "";
				}

			)

	};

	//审核  通过
	$scope.okAuditing = function(status) {
		if($scope.okModalDisabled == true) {
			return 0;
		}
		$scope.okModalDisabled = true;
		var userId = localStorage.userId;
		OrdersPrescriptionOrdersService
			.auditing($scope.dataId, status, userId)
			.then(
				function(result) {
					$scope.loadData();
					$scope.okModalDisabled = false;
					$scope.initEntity('leaveMessage.html')
					var imgUrl = "";
					$scope.data.message = "";
					$scope.cancelModal();
					picDelete();

				}
			);
	}

	//备注
	$scope.sendMessage = function() {
		var userId = localStorage.userId;
		var res = {
			'recipeId': $scope.dataId,
			'messageId': userId,
			'messageRemarks': $scope.data.remarks
		};
		OrdersPrescriptionOrdersService
			.addmessage(res)
			.then(
				function(result) {
					$scope.loadData();
					$scope.initEntity('remarks.html');
					$scope.data.remarks = "";


				}
			);
	}

	/**
	 * 标签页click事件
	 */
	$scope.onClickTab = function(url) {
		$scope.currentTab = url;
		if (url == "leaveMessage.html") {
			$scope.showOss = false;
		} else {
			$scope.showOss = true;
		}
	}
	$scope.initEntity('ordersDetails.html');
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}



}

angular
	.module('managerApp')
	.controller('OrdersPrescriptionOrdersController', OrdersPrescriptionOrdersController)
	.controller('OrdersPrescriptionOrdersFormModalController', OrdersPrescriptionOrdersFormModalController);

var imgUrl = ""; //留言板图片路径
function setImgOrderPath(src) {
	if (imgUrl == "" || imgUrl == undefined || imgUrl == null) {
		imgUrl = src;
	} else {
		imgUrl = imgUrl + "," + src;
	}
}

//调用删除图片
function picDelete() {
	var elem = document.getElementsByClassName("pic_list");
	for (var i = 0; i < elem.length; i++) {
		removeElement(elem[i]);
	}
	document.getElementById("ossfile").innerHTML = "";
}
//删除元素
function removeElement(_element) {
	var _parentElement = _element.parentNode;
	if (_parentElement) {
		_parentElement.removeChild(_element);
	}
}
