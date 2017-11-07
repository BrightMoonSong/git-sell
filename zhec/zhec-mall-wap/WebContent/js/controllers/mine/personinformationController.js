/**
 * controller定义
 */
function personinformationController($rootScope, $scope, $q, $timeout, personinformationService, ngDialog) {
	$scope.member = getCookie("loginManager"); //获取登录信息
	if ($scope.member != "") {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
	$scope.bindShow = true;
	$rootScope.showAlert = function(message) {
		var dialog = ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});

		$timeout(function() {
			dialog.close();
		}, 1500);
	}

	$scope.myFvpSwiper = new Swiper('.swiper-container-fvp', {

		// noSwiping: true,
	});

	$scope.myFvpSwiper.detachEvents() //阻止swiper滑动

	$scope.slideTo = function(num) {

		$scope.myFvpSwiper.slideTo(num, 0);
	}
	$scope.changeInvoiceTitle = function(n) {
		$(".all_bill1").show()
		$(".all_billTitle").slideDown(500)
	}
	$scope.chooseConfirm = function() {
		$(".all_billTitle").slideUp(500);
		$timeout(function() {
			$(".all_bill1").hide();
		}, 500);
		$scope.saveMemmberMessage();



	}

	//改变性别
	$scope.titleType = 1;
	$scope.chooseTitle = function(n) {
			$scope.titleType = n;
			if (n == 1) {
				$scope.middleTitle = "男";
				$scope.status = "1"
			} else {
				$scope.middleTitle = $scope.inputTitle;
				$scope.status = "0"
			}
		}
		/**
		 * 获取信息
		 */

	$scope.getMessage = function() {
		personinformationService
			.find($scope.memberId)
			.then(
				function(result) {
					$scope.memberMessage = result.data;
					$scope.memberMobile = $scope.memberMessage.mobile;
					if ($scope.memberMobile == "") {
						$scope.bindShow = false;
					}
					$scope.status = $scope.memberMessage.sex;
					$scope.curSex = $scope.memberMessage.sex
					$scope.chooseTitle($scope.status);
					if ($scope.memberMessage.birthday != null || $scope.memberMessage.birthday != "" || $scope.memberMessage.birthday != undefined) {
						$scope.memberBirth = $scope.memberMessage.birthday;
					} else {
						$scope.memberBirth = "请选择";
					}

					$scope.curBirth = $scope.memberMessage.birthday;
					$scope.memberName = $scope.memberMessage.name;
					$scope.curName = $scope.memberMessage.name;
					$scope.curImg = angular.element("#changeViewImg").attr("src")

					$scope.member = getCookie("loginManager"); //获取登录信息
					$scope.member = JSON.parse($scope.member);
					var loginManager = {
						'loginId': $scope.member.loginId,
						'id': $scope.member.id,
						'userToken': $scope.member.userToken,
						'name': $scope.memberName
					};
					loginManager = JSON.stringify(loginManager)
					setCookie("loginManager", "" + loginManager, "1")
					if ($scope.memberMessage.image_path != "" && $scope.memberMessage.image_path != null) {
						angular.element(document.querySelector('#changeViewImg')).attr("src", $scope.memberMessage.image_path)
						$scope.curImg = angular.element("#changeViewImg").attr("src")
					}

				})
	}
	if (checkLogin()) {
		$scope.getMessage()
	}


	//点击相同的侧边栏 重新刷新数据
	// $scope.$on('sideIndex', function(e, data) { //data我们接受到的数据
	// 	if ($scope.$parent.sideIndex == data) {
	// 		$scope.getMessage();
	// 	}
	// });
	/**
	 * 改变图片路径
	 */
	$scope.changeHeadImg = function($event) {
			angular.element(document.querySelector('#changeViewImg')).attr("src", angular.element($event.target).attr("src"))
			$scope.saveMemmberMessage();
			$scope.slideTo(0);
		}
		//修改日期
	$scope.birthday = function() {
		if ($("#demo1").val() != '') {
			$scope.memberBirth = $("#demo1").val();
			$scope.saveMemmberMessage();
		} else {
			$scope.saveMemmberMessage();


		}

	}
	$scope.goBack = function() {
		$timeout(function() {
			$(".all_bill1").hide();
		}, 500);

	}


	/**
	 * 修改信息
	 */
	$scope.saveMemmberMessage = function() {

		$scope.saveMessage = {};
		$scope.saveMessage.id = $scope.memberId;
		$scope.saveMessage.sex = $scope.status
		$scope.saveMessage.birthday = $scope.memberBirth
		$scope.saveMessage.name = $scope.memberName
		$scope.saveMessage.imagePath = angular.element(document.querySelector('#changeViewImg')).attr("src")
		console.log($scope.saveMessage);
		if ($scope.memberBirth == null && $scope.memberName == "") {
			// $rootScope.showAlert("请填写要修改的信息！");
			return;
		}
		if ($scope.curSex == $scope.status && $scope.curBirth == $scope.memberBirth && $scope.curName == $scope.memberName && $scope.curImg == $scope.saveMessage.imagePath) {
			$rootScope.showAlert("未做任何修改！");
			return;
		}
		personinformationService
			.put($scope.saveMessage)
			.then(
				function(result) {
					//				promptBox("保存成功");
					$rootScope.showAlert(zhecDisplayMessage.saveSuccess);
					$scope.getMessage()
					$timeout(function() {
						ngDialog.close();
						location.reload()
					}, 1500);
					//				$time()

					//刷新会员中心表头公共头像
					// $scope.findmemberproinfo($scope.memberID);
				})
	}


}
app
	.controller('personinformationController', personinformationController)
