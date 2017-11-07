/**
 * 系统用户controller定义
 */
function MessageController($scope, $http, $q, MessageService, ngDialog, $rootScope, $stateParams) {
	$rootScope.rootIsActiveId = 5;//在线留言
	$scope.isActiveId = true;
	$scope.dataEntiy = {};
	//左导航
	$scope.classificationId = function(n) {
			switch(n) {
				case 1:
				$scope.newdata="联系我们";
					$scope.isActiveId = true;
					break;
				default:
				$scope.newdata="在线留言";
					$scope.isActiveId = false;
					break;
			}

		}
	$scope.classificationId(1)
		//保存
	$scope.okModel = function() {
			if(!$scope.dataEntiy.title) { //主题
				$rootScope.showAlert("主题不能为空！");
				return false;
			}
			if(!$scope.dataEntiy.name) { //姓名
				$rootScope.showAlert("姓名不能为空！");
				return false;
			}
			if(!$scope.dataEntiy.phone) { //联系电话
				$rootScope.showAlert("联系电话不能为空！");
				return false;
			} else {
				if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test($scope.dataEntiy.phone))) {
					$rootScope.showAlert("手机号格式不正确！");
					return;
				}
			}
			if(!$scope.dataEntiy.content) { //留言内容
				$rootScope.showAlert("留言内容不能为空！");
				return false;
			}
			MessageService
				.addfeedback($scope.dataEntiy)
				.then(
					function(result) {
						if(result.code == 1) {
							$rootScope.showAlert("提交成功！");
							$scope.reset();
						} else {
							$rootScope.showAlert("服务器忙请稍后重试！如有疑问请拨打010-84786624");
						}
					},
					function(result) {
						$rootScope.showAlert("服务器忙请稍后重试！如有疑问请拨打010-84786624");
					})
		}
		//重置
	$scope.reset = function() {
		$scope.dataEntiy = {};
	}

	switch($stateParams.messageTypeId) {
		case '2':
			$scope.classificationId(2);
			break;
	}
}

app.controller('MessageController', MessageController);