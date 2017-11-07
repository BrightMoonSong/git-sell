/**
 * 购物车controller定义
 */
function messageBoardController($scope,$rootScope, $q,$timeout,$stateParams, messageBoardService,ngDialog) {
	$scope.member = getCookie("loginManager"); //获取登录信息
	$scope.showDetail = false;
	

	$("#selectfiles").show()
	if($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
		$scope.loginId = $scope.member.loginId;
		$scope.prescriptionUrl = imgPathPrescription;
	}
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			height:174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}
	var _url=window.location.href;
	var _identify = $stateParams.id;
	$scope.source = $stateParams.source;
	$scope.messageImg = [];
	
	//申请信息
	$scope.getGoodsMessage = function() {
		var defer = $q.defer();
		messageBoardService
			.findMember($scope.memberId)
			.then(function(result) {
				console.log(result)
				if(result.data.image_path == "" || result.data.image_path == null || result.data.image_path == undefined){
					$scope.memberImg = "../../../images/mrtx.png"
				}else{
					$scope.memberImg = result.data.image_path;
				}
				
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});	
	};
	$scope.find = function(){
		var defer = $q.defer();
		messageBoardService
			.getMessage(_identify)
			.then(function(result) {
				console.log(result)
				if(result.code == 0 || result.code == 1){
					$(".showHide").show()				
					$scope.recipeApply = result.data.recipeApply;
					$scope.messageList = result.data.memberMessage;
					$scope.recipeGoods = result.data.recipeGoodsImgAndMessage;
					$scope.recipeGoodsList = $scope.recipeGoods[0].imgUrl.split(",");
					
					for(var i =0; i < $scope.messageList.length; i++){
						$scope.messageList[i].message1 = limitLength(String($scope.messageList[i].message),100)
						if($scope.messageList[i].imgUrl != null && $scope.messageList[i].imgUrl !=""){
							$scope.messageList[i].messageImgList = $scope.messageList[i].imgUrl.split(",");
						}
					}
				}
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			});	
		return defer.promise;
	}
	
	if(checkLogin() && $scope.source == 1){	//处方详情留言板
		$scope.find()
		$scope.getGoodsMessage()
	}
	//点击查看详情
	$scope.clickShowDetail = function(){
		$scope.showDetail = !$scope.showDetail;
	}
	//选择图片
	$scope.choosePrePic = function(){
		$("#showOssFile").hide()
	}
	$scope.addMessage = function(){
		$scope.submitMessage = {};
		$scope.submitMessage.id = _identify;
		$scope.submitMessage.imgUrl = ""
		for(var i = 0; i < imgPath.length; i++){
			$scope.submitMessage.imgUrl += imgPath[i];
			if(i < imgPath.length-1){
				$scope.submitMessage.imgUrl += ","
			}
		}
	
		$scope.submitMessage.memberId = $scope.memberId
		
		$scope.submitMessage.message = $scope.messageMemInput;
		if($scope.submitMessage.message == null || $scope.submitMessage.message == undefined){
			$scope.submitMessage.message = ""
		}
		if($scope.messageMemInput !="" && imgPath != []){
			var defer = $q.defer();
			messageBoardService
				.submitMessage($scope.submitMessage)
				.then(function(result) {
					$scope.find();
					$("#showOssFile").hide()
					imgPath = ""
					$scope.messageMemInput = "";
					$("#ossfile").html("");
					$("#container").show()
					$("#selectfiles").show()
					$("#postfiles").hide()
					defer.resolve(result);
				}, function(result) {
					defer.reject(result);
				});	
			return defer.promise;
		}else{
			$rootScope.showAlert(zhecDisplayMessage.messageBoardNoMessage)
		}
		
	}

	//点击显示大图
	$scope.showBigImg = function(imgSrc){
		$scope.dialog1 = ngDialog.open({
			template: '../../../views/common/bigImg.html',
            className: 'ngdialog-theme-default',
            scope:$scope,
            width:800,
            controller: ['$scope', function($scope) {
				$scope.currentImg = imgSrc;
				$scope.closeModal = function(){
					$scope.dialog1.close()
				}
			}]
           
       })
	}
	
}

var imgPath = [];
function prescriptionSetImgPath(res) {
    imgPath.push(res);
}

app
	.controller('messageBoardController', messageBoardController)
	
	