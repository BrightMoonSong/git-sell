function AddressController($rootScope, $scope, $http, AddressService, ngDialog) {
	$scope.dataEntity = {}; //用来存储修改或者添加的数据
	$scope.member = getCookie('loginManager');
	if ($scope.member !== '') {
		$scope.member = JSON.parse($scope.member);
		$scope.memberId = $scope.member.id;
	}
	//左侧菜单的样式
	$scope.$parent.sideIndex = 5;
	$rootScope.memberTitle = "地址管理-鹿医生";

	//提示框
	$scope.showAlert = function(message) {
		ngDialog.open({
			template: '../../../views/common/promptBox.html',
			className: 'ngdialog-theme-default',
			height: 174,
			controller: ['$scope', function($scope) {
				$scope.promptMessage = message;
			}],
		});
	};

	//获取所有地址数据
	$scope.find = function(memberId) {
		if (memberId !== null && memberId !== undefined) {
			AddressService
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

	// 打开弹出框
	$scope.openModal = function(addressId) {
		$scope.addressId = addressId;
		if ($scope.addressId == -1 && $scope.totalSize >= 20) {
			$scope.showAlert(zhecDisplayMessage.ReceivingAddress);
		} else {
			$scope.dialog = ngDialog.open({
				template: 'views/member/addressModal.html',
				className: 'ngdialog-theme-default',
				controller: 'AddressModalController',
				scope: $scope,
				width: 460,
				height: 446
			});

		}
	};


	//删除一个地址
	$scope.deleteAddress = function(addressId) {

		$scope.deleteAddressDialog = jDialog.confirm('确认删除该地址？', {
			handler: function(button, dialog) {
				AddressService
					.deleteAddress(addressId)
					.then(
						function(result) {
							$scope.showAlert(zhecDisplayMessage.addressDeleteSuccess);
							$scope.deleteAddressDialog.close();
							$scope.find($scope.memberId);
						},
						function(result) {
							$scope.showAlert(zhecDisplayMessage.addressDeleteDefeated);
						}
					);
			}
		}, {
			handler: function(button, dialog) {
				$scope.deleteAddressDialog.close();
			}
		});

	};

	//设置默认地址
	$scope.setDefaultAddress = function(addressId, memberId) {
		if (addressId !== null && addressId !== undefined && memberId !== null && memberId !== undefined) {
			AddressService
				.defaultAddress(addressId, memberId)
				.then(
					function(result) {
						$scope.showAlert(zhecDisplayMessage.addressSetDefaultSuccess);
						$scope.find($scope.memberId);
					},
					function(result) {
						$scope.showAlert(zhecDisplayMessage.addressSetDefaultDefeated);
					}
				);
		}
	};

	// 初始化数据
	$scope.find($scope.memberId);
	//点击相同的侧边栏 重新刷新数据
	$scope.$on('sideIndex', function(e, data) { //data我们接受到的数据
		if ($scope.$parent.sideIndex == data) {
			$scope.find($scope.memberId);
		}
	});
}

//弹出框所使用的controller
function AddressModalController($scope, AddressService) {
	$scope.consigneeProvinceAttr = [];
	$scope.consigneeCityAttr = [];
	$scope.consigneeAreaAttr = [];
	$scope.provname = '';
	$scope.cityname = '';
	$scope.areaname = '';
	$scope.dataEntity = {};
	$scope.saveMessage = {};
	$scope.isCommit = false;
	//新增一个地址
	$scope.saveAddAddress = function() {
		//这里是将写入输入框的内容存起来
		$scope.saveMessage.memberId = $scope.memberId;
		$scope.saveMessage.consigneeName = $scope.dataEntity.consigneeName;
		$scope.saveMessage.consigneePca = $scope.provname + ' ' + $scope.cityname + ' ' + $scope.areaname;
		$scope.saveMessage.consigneeProvince = $scope.dataEntity.consigneeProvince;
		$scope.saveMessage.consigneeCity = $scope.dataEntity.consigneeCity;
		$scope.saveMessage.consigneeArea = $scope.dataEntity.consigneeArea;
		$scope.saveMessage.consigneeAddress = $scope.dataEntity.consigneeAddress;
		$scope.saveMessage.consigneeMobile = $scope.dataEntity.consigneeMobile;
		$scope.saveMessage.consigneeEmail = $scope.dataEntity.consigneeEmail;
		$scope.saveMessage.consigneePost = $scope.dataEntity.consigneePost;
		$scope.saveMessage.isDefault = $scope.dataEntity.isDefault;
		AddressService
			.postAddress($scope.saveMessage)
			.then(
				function(result) {
					//提示成功
					$scope.isCommit = false;
					$scope.dialog.close();
					$scope.showAlert(zhecDisplayMessage.addressSaveSuccess);
					$scope.find($scope.memberId);
				},
				function(result) {
					$scope.isCommit = false;
					$scope.showAlert(zhecDisplayMessage.addressSaveDefeated);
				}
			);
	};

	//根据id查找单个地址详细信息
	$scope.findId = function(addressId) { // 接收点击id
		if (addressId !== null && addressId !== undefined) {
			AddressService
				.findId(addressId)
				.then(
					function(result) {
						$scope.dataEntity = result.data; //获取地址详细信息
						$scope.findtoplevelareas(1);
					},
					function(result) {

					}
				);
		}
	};

	//取消按钮点击事件
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};

	//保存按钮点击事件
	$scope.okModal = function() {
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
	};

	//点击进行修改后的保存
	$scope.saveEditAddress = function() {

		//这里是将写入输入框的内容存起来
		$scope.saveMessage.id = $scope.dataEntity.id;
		$scope.saveMessage.memberId = $scope.memberId;
		$scope.saveMessage.consigneeName = $scope.dataEntity.consigneeName;
		$scope.saveMessage.consigneePca = $scope.provname + ' ' + $scope.cityname + ' ' + $scope.areaname;
		$scope.saveMessage.consigneeProvince = $scope.dataEntity.consigneeProvince;
		$scope.saveMessage.consigneeCity = $scope.dataEntity.consigneeCity;
		$scope.saveMessage.consigneeArea = $scope.dataEntity.consigneeArea;
		$scope.saveMessage.consigneeAddress = $scope.dataEntity.consigneeAddress;
		$scope.saveMessage.consigneeMobile = $scope.dataEntity.consigneeMobile;
		$scope.saveMessage.consigneeEmail = $scope.dataEntity.consigneeEmail;
		$scope.saveMessage.consigneePost = $scope.dataEntity.consigneePost;
		$scope.saveMessage.isDefault = $scope.dataEntity.isDefault;
		// $scope.dataEntity.state = $scope.state;

		AddressService
			.editAddress($scope.saveMessage)
			.then(
				function(result) {
					//提示成功
					$scope.isCommit = false;
					$scope.dialog.close();
					$scope.showAlert(zhecDisplayMessage.addressSaveSuccess);
					$scope.find($scope.memberId);
				},
				function(result) {
					$scope.isCommit = false;
					$scope.showAlert(zhecDisplayMessage.addressSaveDefeated);
					//alert("搜索用户失败！");
				}
			);
	};

	//下拉框选择事件，flag为1的时候是初始化数据
	$scope.change = function(id, n, flag) {
		if (n == 1) {
			if (flag !== 1) {
				//对市、区级下拉框以及选取数据进行清空
				$scope.dataEntity.consigneeCity = "";
				$scope.dataEntity.consigneeArea = "";
				$scope.consigneeCityAttr = [];
				$scope.consigneeAreaAttr = [];
				$scope.cityname = "";
				$scope.areaname = "";
			}
			for (var a = 0; a < $scope.consigneeProvinceAttr.length; a++) {
				if ($scope.consigneeProvinceAttr[a].id == id) {
					$scope.provname = $scope.consigneeProvinceAttr[a].name;
				}
			}
		}
		if (n == 2) {
			//对区级下拉框以及选取数据进行清空
			if (flag !== 1) {
				$scope.dataEntity.consigneeArea = "";
				$scope.consigneeAreaAttr = [];
				$scope.areaname = "";
			}
			for (var b = 0; b < $scope.consigneeCityAttr.length; b++) {
				if ($scope.consigneeCityAttr[b].id == id) {
					$scope.cityname = $scope.consigneeCityAttr[b].name;
					break;
				}
			}
		}
		if (n == 3) {
			for (var c = 0; c < $scope.consigneeAreaAttr.length; c++) {
				if ($scope.consigneeAreaAttr[c].id == id) {
					$scope.areaname = $scope.consigneeAreaAttr[c].name;
					$scope.dataEntity.consigneePost = $scope.consigneeAreaAttr[c].zipCode;
				}
			}
		}
		AddressService
			.findareasbypid(id, flag)
			.then(
				function(result) {
					if (n === 1) {
						$scope.consigneeCityAttr = result.data;
						if (flag === 1) {
							$scope.change($scope.dataEntity.consigneeCity, 2, 1);
						}
					} else if (n === 2) {
						$scope.consigneeAreaAttr = result.data;
						if (flag === 1) {
							$scope.change($scope.dataEntity.consigneeArea, 3, 1);
						}
					}
				});
	};
	//对单选框进行选择
	$scope.isDefaultClick = function(n) {
		$scope.dataEntity.isDefault = n;
	};

	//获取省级下拉栏数据
	$scope.findtoplevelareas = function(flag) {
		AddressService
			.findtoplevelareas()
			.then(
				function(result) {
					$scope.consigneeProvinceAttr = result.data;
					if (flag === 1) {
						$scope.change($scope.dataEntity.consigneeProvince, 1, 1);
					}
				},
				function(result) {

				}
			);
	};

	//初始化弹出框
	if ($scope.addressId <= 0) {
		//新增
		$scope.findtoplevelareas();
		$scope.dataEntity.isDefault = 0;
	} else {
		$scope.findId($scope.addressId);
	}

}

angular
	.module('memberApp')
	.controller('AddressController', AddressController)
	.controller('AddressModalController', AddressModalController);
