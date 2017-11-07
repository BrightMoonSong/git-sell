function syscodeController($rootScope, $scope, $http, $q, constPageSize, syscodeService, ngDialog) {


    //����codeidΪ��
    $scope.codeId="";
    $scope.codeType="";
    $scope.find = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        syscodeService
            .find(currentPaseSize, currentPageNo)
            .then(
            function (result) {
                $scope.codeList = result.data;
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };

    $scope.getTypes = function(){
        var defer = $q.defer();
        syscodeService
            .getTypes()
            .then(
            function (result) {
                $scope.types = result.data;
                $scope.alltypes = [];
                for(var i=0;i<$scope.types.length;i++){
                    $scope.alltypes.push($scope.types[i].codeType);
                }

                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    }
    $scope.getTypes();
    $scope.searchCode = function(type,codeId){
        var defer = $q.defer();
        syscodeService
            .search(type,codeId)
            .then(
            function (result) {
                $scope.codeList = result.data;
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    }
    $scope.deleteId = function(id){
        var defer = $q.defer();
        syscodeService
            .delete(id)
            .then(
            function (result) {
                $scope.loadData();
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };
    /**
     * ����ģ̬��  չʾ�������λ����Ϣ
     */
    $scope.openModals = function (code) {
        $scope.codeObj = code;
        $scope.dialog = ngDialog.open({
            template: 'views/research/syscodeModal.html',
            className: 'ngdialog-theme-default',
            controller: 'syscodeModalController',
            scope: $scope,
            width: 1000
        })
    };
    $scope.closeModal = function(){
        $scope.dialog.close()
    }

}
function syscodeModalController($rootScope, $scope, $http, $q, constPageSize, syscodeService, ngDialog){
    $scope.modify = function(codeObj){
        if(codeObj.id){
            $scope.update = function(codeObj){
                var defer = $q.defer();
                syscodeService
                    .update(codeObj)
                    .then(
                    function (result) {
                        $scope.closeModal();
                        $scope.loadData();
                        defer.resolve(result);
                    }, function (result) {
                        defer.reject(result);
                    });
                return defer.promise;
            }
            $scope.update(codeObj)
        }else{
            $scope.add = function(codeObj){
                var defer = $q.defer();
                syscodeService
                    .add(codeObj)
                    .then(
                    function (result) {
                        $scope.closeModal();
                        $scope.loadData();
                        $scope.getTypes();
                        defer.resolve(result);
                    }, function (result) {
                        defer.reject(result);
                    });
                return defer.promise;
            }
            $scope.add(codeObj)
        }
    }

    /*$scope.search = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        syscodeService
            .search(currentPaseSize,currentPageNo,$scope.productId)
            .then(
            function (result) {
                $scope.products = result.data;

                for(var i=0;i<$scope.products.length;i++){
                    switch ($scope.products[i].changeType){
                        case 1:
                            $scope.products[i].changetype="�ύ��������";
                            break;
                        case 2:
                            $scope.products[i].changetype="����ȡ������";
                            break;
                        case 3:
                            $scope.products[i].changetype="�˻�����";
                            break;
                        case 4:
                            $scope.products[i].changetype="����Ա��̨�ֶ��޸�";
                            break;
                    }
                }

                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };*/
}

angular
    .module('managerApp')
    .controller('syscodeController', syscodeController)
    .controller('syscodeModalController', syscodeModalController)

