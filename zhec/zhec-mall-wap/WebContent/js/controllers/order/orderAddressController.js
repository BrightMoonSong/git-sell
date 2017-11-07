function orderAddressController($scope, orderAddressService, ngDialog, $timeout, $rootScope) {
	$scope.dataEntity = {}; //用来存储修改或者添加的数据
	$scope.saveMessage = {};
	$scope.province = {};
	$scope.city = {};
	$scope.area = {};
	$scope.areaFlag = 1; //标记省市区头部是否显示信息，1为省，2为市，3为区，大于等于该值就显示
	$scope.currntListFlag = 1; //标记当前列表显示的数据，1为省，2为市，3为区，4为邮编
	$scope.isCommit = false; //防止重复提交
	var tipDialog;

	$scope.member = getCookie('loginManager');
	if ($scope.member !== '') {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}

	$scope.myFvpSwiper = new Swiper('.swiper-container-fvp', {
		// noSwiping: true,
		// autoHeight: true, //enable auto height
	});

	$scope.myFvpSwiper.detachEvents() //阻止swiper滑动



	$scope.slideTo = function(num) {
		//		alert(num)

		if (num == 1 || num == 0) {
			$scope.myFvpSwiper.slideTo(num);
			// alert("1")
			$(".swiper-container-fvp").css({
				"height": $("#needs_head").height() + $(".edita_conter").height() + $(".edita_button").height() * 2
			})
			$(".swiper-container-fvp>.swiper-wrapper").css({
				"height": $("#needs_head").height() + $(".edita_conter").height() + $(".edita_button").height() * 2
			});
		} else {

			$scope.initAddressSwiper = function(n) {

				$timeout(function() {
					$(".swiper-container-fvp").css({
						"height": $("#needs_head").height() + $(".addresscate_head").height() + $(".addresscate_conter").height()
					})
					$(".swiper-container-fvp .swiper-slide").css({
						"height": $("#needs_head").height() + $(".addresscate_head").height() + $(".addresscate_conter").height()
					});
					$scope.myFvpSwiper.slideTo(num);
				}, 200);

			}
		}

		$("body,html").animate({
			scrollTop: 0
		}, 0);
	};
	//	$scope.slideToAddress = function(num){
	//
	//	}

	// //提示框
	// $rootScope.showAlert = function(message) {
	// 	tipDialog = ngDialog.open({
	// 		template: '../../../views/common/promptBox.html',
	// 		className: 'ngdialog-theme-default',
	// 		controller: ['$scope', function($scope) {
	// 			$scope.promptMessage = message;
	// 		}],
	// 	});
	// };

	//获取所有地址数据
	$scope.find = function(memberId) {
		if (memberId !== null && memberId !== undefined) {
			orderAddressService
				.find(memberId)
				.then(
					function(result) {
						$scope.totalSize = result.totalSize;
						$scope.addressList = result.data; //将获取到的数据进行赋值，与DOM进行数据绑定
					},
					function(result) {

					}
				);
		}
	};

	//根据id查找单个地址详细信息
	$scope.findId = function(addressId) { // 接收点击id
		if (addressId !== null && addressId !== undefined) {
			orderAddressService
				.findId(addressId)
				.then(
					function(result) {
						$scope.dataEntity = result.data; //获取地址详细信息
						$scope.slideTo(1);
						$("body,html").animate({
							scrollTop: 0
						}, 0);
						// $scope.findtoplevelareas(1);
					},
					function(result) {

					}
				);
		}
	};


	//编辑地址或者新增地址跳转
	$scope.detail = function(addressId) {
		$scope.addressId = addressId;
		if (addressId <= 0) { //新增
			$scope.dataEntity = {};
			$scope.slideTo(1);
			$("body,html").animate({
				scrollTop: 0
			}, 0);
		} else { //修改
			$scope.findId(addressId);
		}
	}

	//设置默认地址
	$scope.setDefaultAddress = function(addressId, memberId) {
		if (addressId !== null && addressId !== undefined && memberId !== null && memberId !== undefined) {
			orderAddressService
				.defaultAddress(addressId, memberId)
				.then(
					function(result) {
						$rootScope.showAlert(zhecDisplayMessage.addressSetDefaultSuccess);
						$scope.find($scope.memberId);
					},
					function(result) {
						$rootScope.showAlert(zhecDisplayMessage.addressSetDefaultDefeated);
					}
				);
		}
	};

	// //返回上一页
	// $scope.goBack = function() {
	// 	window.open(constWapLocation + "/index.html#/main/mine", "_self");
	// };

	////////////////////////////地址编辑页


	//删除一个地址
	$scope.deleteAddress = function(addressId) {

		$scope.deleteAddressDialog = jDialog.confirm('确认删除该地址？', {
			handler: function(button, dialog) {
				orderAddressService
					.deleteAddress(addressId)
					.then(
						function(result) {
							$rootScope.showAlert(zhecDisplayMessage.addressDeleteSuccess);
							$scope.deleteAddressDialog.close();
							$scope.find($scope.memberId);
							$scope.slideTo(0);
							$("body,html").animate({
								scrollTop: 0
							}, 0);
						},
						function(result) {
							$rootScope.showAlert(zhecDisplayMessage.addressDeleteDefeated);
						}
					);
			}
		}, {
			handler: function(button, dialog) {
				$scope.deleteAddressDialog.close();
			}
		});

	};

	//新增一个地址
	$scope.saveAddAddress = function() {
		//这里是将写入输入框的内容存起来
		$scope.saveMessage.memberId = $scope.memberId;
		$scope.saveMessage.consigneeName = $scope.dataEntity.consigneeName;
		$scope.saveMessage.consigneePca = $scope.dataEntity.consigneePca;
		$scope.saveMessage.consigneeProvince = $scope.dataEntity.consigneeProvince;
		$scope.saveMessage.consigneeCity = $scope.dataEntity.consigneeCity;
		$scope.saveMessage.consigneeArea = $scope.dataEntity.consigneeArea;
		$scope.saveMessage.consigneeAddress = $scope.dataEntity.consigneeAddress;
		$scope.saveMessage.consigneeMobile = $scope.dataEntity.consigneeMobile;
		$scope.saveMessage.consigneeEmail = $scope.dataEntity.consigneeEmail;
		$scope.saveMessage.consigneePost = $scope.dataEntity.consigneePost;
		$scope.saveMessage.isDefault = 0;
		orderAddressService
			.postAddress($scope.saveMessage)
			.then(
				function(result) {
					//提示成功
					$scope.isCommit = false;
					// $scope.dialog.close();
					$rootScope.showAlert(zhecDisplayMessage.addressSaveSuccess);
					$timeout(function() {
						$scope.slideTo(0);
						$("body,html").animate({
							scrollTop: 0
						}, 0);
					}, 1600);
					$scope.find($scope.memberId);
				},
				function(result) {
					$scope.isCommit = false;
					$rootScope.showAlert(zhecDisplayMessage.addressSaveDefeated);

				}
			);
	};

	//修改后的保存
	$scope.saveEditAddress = function() {

		//这里是将写入输入框的内容存起来
		$scope.saveMessage.id = $scope.dataEntity.id;
		$scope.saveMessage.memberId = $scope.memberId;
		$scope.saveMessage.consigneeName = $scope.dataEntity.consigneeName;
		$scope.saveMessage.consigneePca = $scope.dataEntity.consigneePca;
		$scope.saveMessage.consigneeProvince = $scope.dataEntity.consigneeProvince;
		$scope.saveMessage.consigneeCity = $scope.dataEntity.consigneeCity;
		$scope.saveMessage.consigneeArea = $scope.dataEntity.consigneeArea;
		$scope.saveMessage.consigneeAddress = $scope.dataEntity.consigneeAddress;
		$scope.saveMessage.consigneeMobile = $scope.dataEntity.consigneeMobile;
		$scope.saveMessage.consigneeEmail = $scope.dataEntity.consigneeEmail;
		$scope.saveMessage.consigneePost = $scope.dataEntity.consigneePost;
		$scope.saveMessage.isDefault = $scope.dataEntity.isDefault;
		// $scope.dataEntity.state = $scope.state;

		orderAddressService
			.editAddress($scope.saveMessage)
			.then(
				function(result) {
					//提示成功
					$scope.isCommit = false;
					// $scope.dialog.close();
					$rootScope.showAlert(zhecDisplayMessage.addressSaveSuccess);
					$timeout(function() {
						$scope.slideTo(0);
						$("body,html").animate({
							scrollTop: 0
						}, 0);
					}, 1600);

					$scope.find($scope.memberId);
				},
				function(result) {
					$scope.isCommit = false;
					$rootScope.showAlert(zhecDisplayMessage.addressSaveDefeated);
				}
			);
	};


	//提交单条地址信息点击事件
	$scope.commit = function() {
		if ($scope.verify()) {
			if (!$scope.isCommit) {
				$scope.isCommit = !$scope.isCommit;
				if ($scope.addressId < 0) {
					//新增的方法
					$scope.saveAddAddress();
				} else {
					//修改的方法
					$scope.saveEditAddress();
				}
			}
		}
	};

	//验证提交信息
	$scope.verify = function() {
		if ($scope.dataEntity.consigneeName == undefined || $scope.dataEntity.consigneeName == null || $scope.dataEntity.consigneeName == '') {
			$rootScope.showAlert('请输入收件人姓名');
			$scope.find($scope.memberId);
			return false;
		} else if ($scope.dataEntity.consigneeName.length < 2 || $scope.dataEntity.consigneeName.length > 8) {
			$rootScope.showAlert('收件人姓名长度为2~8个字');
			$scope.find($scope.memberId);
			return false;
		} else if ($scope.dataEntity.consigneeMobile == undefined || $scope.dataEntity.consigneeMobile == null || $scope.dataEntity.consigneeMobile == '') {
			$rootScope.showAlert('请输入联系电话');
			$scope.find($scope.memberId);
			return false;
		} else if ($scope.checkPhoneNum($scope.dataEntity.consigneeMobile)) {
			$rootScope.showAlert('请输入正确的电话号码');
			$scope.find($scope.memberId);
			return false;
		} else if ($scope.dataEntity.consigneePca == undefined || $scope.dataEntity.consigneePca == null || $scope.dataEntity.consigneePca == '') {
			$rootScope.showAlert('请输入所在地区');
			$scope.find($scope.memberId);
			return false;
		} else if ($scope.dataEntity.consigneeAddress == undefined || $scope.dataEntity.consigneeAddress == null || $scope.dataEntity.consigneeAddress == '') {
			$rootScope.showAlert('请输入详细地址');
			$scope.find($scope.memberId);
			return false;
		} else if ($scope.dataEntity.consigneeAddress.length > 30) {
			$rootScope.showAlert('详细地址长度最多为30个字');
			$scope.find($scope.memberId);
			return false;
		} else {
			return true;
		}
	}

	//验证手机号格式
	$scope.checkPhoneNum = function(str) {
		reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
		// if (!reg.test(str)) {
		// 	// alert("对不起，您输入的整数类型格式不正确!");//请将“整数类型”要换成你要验证的那个属性名称！
		// }
		return !reg.test(str);
	};



	//选择省市区
	$scope.chooseArea = function() {
		$scope.setAreaValue($scope.dataEntity.consigneePca, $scope.dataEntity.consigneeProvince, $scope.dataEntity.consigneeCity, $scope.dataEntity.consigneeArea);
		$scope.slideTo(2);
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	}

	// ////////////////////////////////三级地区选择
	// 回调赋值
	$scope.getAreaValue = function(pacEntity) {
		// //赋值给dataEntity
		$scope.dataEntity.consigneePost = pacEntity.zipCode;
		$scope.dataEntity.consigneeProvince = pacEntity.province.id;
		$scope.dataEntity.consigneeCity = pacEntity.city.id;
		$scope.dataEntity.consigneeArea = pacEntity.area.id;
		$scope.dataEntity.consigneePca = pacEntity.province.name + ' ' + pacEntity.city.name + ' ' + pacEntity.area.name;

		$scope.slideTo(1);
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	};

	$scope.areaChooseCancel = function() {
		$scope.slideTo(1);
		$("body,html").animate({
			scrollTop: 0
		}, 0);
	}
	$scope.addressThisUse = function(obj) {
		$rootScope.addressForThisUse = obj;
		window.location.replace("/index.html#/info/submitorder-" + $rootScope.stateParamsTypeOrder + '-' + $rootScope.stateParamsProductIdOrder + '-' + $rootScope.stateParamsProductCountOrder + '-' + $rootScope.stateParamsConsultantIdOrder);
	}
	$scope.goback = function(obj) {
		window.location.replace("/index.html#/info/submitorder-" + $rootScope.stateParamsTypeOrder + '-' + $rootScope.stateParamsProductIdOrder + '-' + $rootScope.stateParamsProductCountOrder + '-' + $rootScope.stateParamsConsultantIdOrder);
	}


	// 初始化数据
	$scope.find($scope.memberId);
}

app.controller('orderAddressController', orderAddressController)
