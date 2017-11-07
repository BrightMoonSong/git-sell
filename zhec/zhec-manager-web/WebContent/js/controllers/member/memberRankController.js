/**
 * 系统用户controller定义
 */
function memberRankController($scope,$http,$q,constPageSize,memberRankService,ngDialog){
	$scope.dataId = "";           //当前操作的数据id
	$scope.userNameSearch = "";   //搜索关键词
	$scope.WdatePicker = {};
	$scope.statusChangeBtn = "";     //开关内容
	$scope.imgPathRank = imgPathRank;
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, constPageSize){
		var defer = $q.defer();
		var parmValue = $scope.userNameSearch;
		var minTime = "";
		var maxTime = "";
		memberRankService
		.find(constPageSize, currentPageNo)
			.then(
				function(result) {
					console.log(result)
					$scope.memberList = result.data;
					defer.resolve(result);
				}, function(result) {
					defer.reject(result);
				})
			return defer.promise;
	}
	
	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId) {

		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'secDialogId',
            className: 'ngdialog-theme-default',
            controller: 'rankModalController',
            scope: $scope,
            width: 650
        })
	};
	
	$scope.changeStatus = function(n,memberId){
		memberRankService
			.get(memberId)
			.then(
				function(result){
					$scope.CurrentMember=result.data;
					$scope.memeberStatus = $scope.CurrentMember.status
					$scope.openConfirm(memberId,$scope.memeberStatus)
				}
			);
		
	}
	$scope.openConfirm = function(memberId,memeberStatus){
		$scope.memberId = memberId;
		$scope.memeberCurrentStatus = memeberStatus
		$scope.dialog1 = ngDialog.open({
			template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            controller: 'confirmController',
            scope: $scope,
            width: 350
        })
	}

}

/**
 * 系统用户修改弹出页面controller定义
 */
function rankModalController($scope, memberRankService,ngDialog) {
	$scope.initEntity = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //如果参数dataId不为空，说明是修改数据
			memberRankService
				.get($scope.dataId)
				.then(
					function(result) {
						$scope.dataEntity  = result.data;
					}
				);
		} else { //如果参数dataId为空，说明是新增数据，设置默认值
			$scope.dataEntity = {
				"status": 1
			};

		}
		//$scope.roleid = 4;
	}
	$scope.getImg = function(){
		$scope.dialog3 = ngDialog.open({
			template: '../../views/member/memberRankModal.html',
            className: 'ngdialog-theme-default',
            controller: ['$scope', function($scope) {
            	$scope.addData = function(){
            		$scope.dataEntity.rankUrl = imgPath[0];
            		$scope.dialog3.close()
            	}
				$scope.cancleModal = function(){
					$scope.dialog3.close()
				}
			}],
            scope: $scope,
            width: 400
        })
		
	}
	$scope.okModal = function() {
		if($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") { //修改数据
			$scope.dataEntity.optId = localStorage.userId;
			console.log($scope.dataEntity)
			memberRankService
				.edit($scope.dataEntity)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					},
					function(result) {

					}
				)
		} else { //新增数据
			$scope.dataEntity.optId = localStorage.userId;
			
			memberRankService
				.add($scope.dataEntity)
				.then(
					function(result) {
						$scope.loadData();
						$scope.dialog.close();
					},
					function(result) {}
				)
		}
	};

	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
	$scope.initEntity();
}
function confirmController($scope,MemberService){
	if($scope.memeberCurrentStatus == 0){
		$scope.currentStatus = "启用"
	}else{
		$scope.currentStatus = "禁用"
	}
	$scope.confirmClick = function(){
		if($scope.memeberCurrentStatus == 0){
			$scope.enablemember($scope.memberId)
		}else{
			$scope.disablemember($scope.memberId)
		}
	}
	$scope.cancleClick = function(){
		$scope.dialog1.close()
	}
	$scope.enablemember = function(currentId){
		memberRankService
			.enablemember(currentId)
			.then(
				function(result){
					$scope.loadData();
					$scope.dialog1.close()
				}
			);
	}
	$scope.disablemember = function(currentId){
		memberRankService
			.disablemember(currentId)
			.then(
				function(result){
					$scope.dialog1.close()
					$scope.loadData();
				}
			);
	}
}
function disabled() {
	var piclist = document.getElementsByClassName("pic_list");
	var bool = true;

	if(isContains(piclist[0].children[0].innerHTML, '上传成功')) {
		
	} else {
			bool = false;
	}
	if(bool) {
		document.getElementById("ifSucessShow").disabled = false;
	} else {
		document.getElementById("ifSucessShow").disabled = true;
	}
}
var imgPath = [];
function setImgRankPath(res) {
    imgPath.push(res);
    disabled()
}
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
angular
    .module('managerApp')
    .controller('memberRankController', memberRankController)
    .controller('rankModalController', rankModalController)
    .controller('confirmController', confirmController)
	