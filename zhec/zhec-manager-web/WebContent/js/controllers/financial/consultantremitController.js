/**
 * 系统用户controller定义
 */
function consultantremitController($scope,$http,$q,constPageSize,consultantremitService,ngDialog){

    $scope.find = function(currentPageNo){
        var defer = $q.defer();
        $scope.userNameSearch="";
        consultantremitService
            .find(constPageSize,currentPageNo,$scope.userNameSearch)
            .then(
            function(result) {
                $scope.consultantMembersList = result.data;
                for(var i=0;i<$scope.consultantMembersList.length;i++){
                    $scope.consultantMembersList[i].update_time=new Date(parseInt($scope.consultantMembersList[i].update_time)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                }
                defer.resolve(result);
            }, function(result) {
                defer.reject(result);
            })
        return defer.promise;
    }
    $scope.remark = ""
    $scope.comfirmRemit = function(remark){
        var defer = $q.defer();
        $scope.remitObj.remark=remark;
        consultantremitService
            .put($scope.remitObj)
            .then(
            function(result) {
                $scope.closeModal();
                $scope.loadData(false);
                defer.resolve(result);
            }, function(result) {
                defer.reject(result);
            })
        return defer.promise;
    }

    /**
     * 弹出修改数据模态框
     */
    $scope.openModal = function(id,consultantId,money,status) {
        $scope.remitObj={};
        $scope.remitObj.id=id;
        $scope.remitObj.consultantId=consultantId;
        $scope.remitObj.money=money;
        $scope.remitObj.status=7;
        $scope.remitObj.optId=localStorage.getItem('userId');
        $scope.remitObj.optName=localStorage.getItem('userName');
        $scope.dialog = ngDialog.open({
            template: 'secDialogId',
            className: 'ngdialog-theme-default',
            scope: $scope,
            width: 900
        })
    };

    $scope.closeModal = function(){
        $scope.dialog.close();
    }

}


angular
    .module('managerApp')
    .controller('consultantremitController', consultantremitController);
