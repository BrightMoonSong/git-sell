/**
 * 系统用户controller定义
 */
function MemberController($scope,$http,$q,constPageSize,MemberService,ngDialog){
	$scope.dataId = "";           //当前操作的数据id
	$scope.userNameSearch = "";   //搜索关键词
	$scope.WdatePicker = {};
	$scope.statusChangeBtn = "";     //开关内容
	/**
	 * 搜索数据
	 */
	$scope.find = function(currentPageNo, constPageSize){
		var defer = $q.defer();
		var parmValue = $scope.userNameSearch;
		var minTime = "";
		var maxTime = "";
		MemberService
		.find(parmValue,minTime,maxTime,constPageSize, currentPageNo)
			.then(
				function(result) {
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
			template: 'views/member/MemberFormModal.html',
            className: 'ngdialog-theme-default',
            controller: 'MemberModalController',
            scope: $scope,
            width: 650
        })
	};
	$scope.changeStatus = function(n,memberId){
		MemberService
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
	//重置密码
	$scope.resetPassword = function(currentId){
		var dialog2 = ngDialog.open({
			template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            width: 350,
            controller: ['$scope', function($scope) {
            	$scope.currentStatus = "重置"
				$scope.confirmClick = function(){
					MemberService
					.reset(currentId)
					.then(
						function(result){
							dialog2.close()
						}
					);
				}
				$scope.cancleClick = function(){
					dialog2.close()
				}
			}],
            
        })
		
	}
}

/**
 * 系统用户修改弹出页面controller定义
 */
function MemberModalController($scope,MemberService){
	$scope.initEntity = function () {
		if($scope.dataId!=null && $scope.dataId!=undefined && $scope.dataId!=""){  //如果参数dataId不为空，说明是修改数据
			MemberService
				.get($scope.dataId)
				.then(
					function(result){
						$scope.memberList=result.data;
					}
				);
		}
		
		
	}
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
	//会员启用
	$scope.enablemember = function(currentId){
		MemberService
			.enablemember(currentId)
			.then(
				function(result){
					$scope.loadData();
					$scope.dialog1.close()
				}
			);
	}
	//会员禁用
	$scope.disablemember = function(currentId){
		MemberService
			.disablemember(currentId)
			.then(
				function(result){
					$scope.dialog1.close()
					$scope.loadData();
				}
			);
	}
}
angular
    .module('managerApp')
    .controller('MemberController', MemberController)
    .controller('MemberModalController', MemberModalController)
    .controller('confirmController', confirmController)
	