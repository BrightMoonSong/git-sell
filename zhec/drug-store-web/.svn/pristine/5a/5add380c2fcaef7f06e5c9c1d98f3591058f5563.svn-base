function HomeTopicController($scope, $q, $http, $rootScope, HomeTopicService, constPageSize, ngDialog, goodsReminder) {
	$scope.homeTopicId = "" //操作当前ID
	//荐分页列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer()
		HomeTopicService
			.find(currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.topicList = result.data
				defer.resolve(result)
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//专题弹窗
	$scope.openModal2 = function() {
		$scope.dialog = ngDialog.open({
			template: 'views/homemanagement/topicFormModel2.html',
			className: 'ngdialog-theme-default',
			controller: 'topicFormModel2Controller',
			scope: $scope,
			width: 1150
		})
	};
	//弹窗
	$scope.openModal = function(topicId, homeTopicId, boller) {
		$scope.topicId = topicId;
		$scope.homeTopicId = homeTopicId;
		$scope.datared = boller;
		$scope.dialog2 = ngDialog.open({
			template: 'views/homemanagement/homeTopicFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'homeTopicFormModelController',
			scope: $scope,
			width: 850
		})
	};

	//删除操作
	$scope.deleteById = function(id) {
		var chainstouses;
		chainstouses = goodsReminder.goodsbranddelete;
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			HomeTopicService
				.delete(id)
				.then(function(result) {
					$scope.loadData(true)
				}),
				function(reason) {}
		})
	}
	//启禁用操作
	$scope.enableById = function(id, status) {
		var chainstouses;
		if(status == 1) {
			//0禁1启
			chainstouses = goodsReminder.goodsState.enable;
		} else {
			chainstouses = goodsReminder.goodsState.forbidden;
		}
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			HomeTopicService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData(true)
				}),
				function(reason) {}
		})
	}
	//弹窗关闭
	$scope.cancelModal2 = function() {
		$scope.dialog2.close();
	}
	//弹窗关闭
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}

}

function topicFormModel2Controller($scope, $q, $http, HomeTopicService, ngDialog) {

	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		
		if(!$scope.names){
			var names='';
		}else{
			var names=$scope.names
		}
		HomeTopicService
			.search(names, $scope.addTimeSearch, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.topics = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

}

//弹窗controller操作
function homeTopicFormModelController($scope, HomeTopicService, $rootScope) {
	imgPathHomeTop=[];
	//上传图片路径
	if(!$scope.homeTopicId) {
		//添加路径
		$scope.idData = imgPathHomeTopic + "/add";
	} else {
		//修改路径
		$scope.idData = imgPathHomeTopic + "/" + $scope.homeTopicId;
	}
	if($scope.homeTopicId) { //判断Id是否为空，如果为空则为修改，反之为增加
		HomeTopicService
			.detail($scope.homeTopicId)
			.then(function(result) {
				$scope.topicEntity = result.data
			}, function(reson) {

			})
	} else {
		$scope.topicEntity = {
			"status": 1,
			"topicId": $scope.topicId,
			"mainImg": ''
			
		}
	}
	//保存弹窗
	$scope.okModal = function() {
		if($scope.homeTopicId) { //判断Id是否为空，如果为空则为修改，反之为增加
			if(imgPathHomeTop.length != 0) {
				$scope.topicEntity.mainImg = imgPathHomeTop[0];
			}
			HomeTopicService
				.edit($scope.topicEntity)
				.then(function(result) {
					$scope.cancelModal2();
					$scope.loadData()
				}, function(reson) {
				})

		} else {
			if(imgPathHomeTop.length != 0) {
				$scope.topicEntity.mainImg = imgPathHomeTop[0];
			} else {
				$rootScope.showAlert("请上传图片！")
				return 0;
			}
			HomeTopicService
				.add($scope.topicEntity)
				.then(function(result) {
					$scope.cancelModal2();
					$scope.cancelModal();
					$scope.loadData(true)
				}, function(reson) {

				})
		}
	}
}
var imgPathHomeTop = [];

//oss上传图片
function setImgHomeTopicPath(res) {
	imgPathHomeTop.push(res);
	$("#osstopicimg").removeAttr("disabled");
	if(listattr.length != 1) {
		var img = document.getElementsByClassName('pic_list');
		for(var i = 0; i < img.length; i++) {
			if(i != 0) {
				img[i].style.display = 'none';
			}
		}
	}
}

angular
	.module("managerApp")
	.controller("HomeTopicController", HomeTopicController)
	.controller("topicFormModel2Controller", topicFormModel2Controller)
	.controller("homeTopicFormModelController", homeTopicFormModelController)