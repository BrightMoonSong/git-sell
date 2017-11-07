function AdvertiseController($rootScope, $scope, $http, $q, constPageSize, AdvertiseService, ngDialog) {


    /**
     * 页面开始加载所有广告位信息 pageSize, pageNo,applyType,advertName

     */
        //选择类型，applyType 默认为1 利用option 去选择类型

    $scope.sites = [
        {site : "web", num : 1},
        {site : "wap", num : 2},
        {site : "IOS", num :3}
    ];
    $scope.selectedSite={site : "web",num : 1};

    $scope.adName="";
    $scope.find = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        AdvertiseService.find(currentPaseSize, currentPageNo,$scope.adName,$scope.selectedSite.num).then(
            function (result) {
                $scope.adverData = result.data;
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };

    /**
     * 弹出模态框  展示单个广告位的信息
     */
    $scope.openModalOne = function (id, name) {
        $scope.dataId = id;
        $scope.dataName = name;
        //$scope.getData(id);
        $scope.dialog = ngDialog.open({
            template: 'views/web/AdvertiseOneDetailsModal.html',
            className: 'ngdialog-theme-default',
            controller: 'AdvertiseOneDetailsController',
            scope: $scope,
            width: 1000
        })
    };
}
/**
 * 单个广告位
 */
function AdvertiseOneDetailsController($scope, AdvertiseService, ngDialog) {
    $scope.dataEntity = {};
    $scope.WdatePicker = {};
    $scope.initEntity = function () {
        if ($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {  //如果参数dataId不为空，说明是修改数据

            AdvertiseService
                .get($scope.dataId)
                .then(
                function (result) {
                    $scope.dataEntity = result.data;
                }
            );
        }
        else {

        }
    };
    $scope.openModalOneAdd = function () {
        $scope.dialog1 = ngDialog.open({
            template: 'views/web/AdverOneDetailsAddModal.html',
            className: 'ngdialog-theme-default',
            controller: 'AdvertiseOneDetailsAdd',
            scope: $scope,
            width: 1000
        })
    };
    //打开修改的弹窗，传入的参数是为了在新增图片时，加载初始数据
    $scope.openModalOneModify = function (id, url, adverid, name) {
        $scope.id = id;
        $scope.imageUrl = url;
        $scope.advertId = adverid;
        $scope.advertName = name;

        $scope.dialog2 = ngDialog.open({
            template: 'views/web/AdverModifyModal.html',
            className: 'ngdialog-theme-default',
            controller: 'AdvertiseOneDetailsModify',
            scope: $scope,
            width: 1000
        })
    };
    $scope.cancelModal = function () {
        $scope.dialog.close();
    };
    //在新增图片时，将新增的图片信息渲染到页面上（此处是angular的交互）
    /*$scope.retData = function (data) {
        $scope.dataEntity = data;
    };*/
    $scope.initEntity();
}
//添加图片控制器
function AdvertiseOneDetailsAdd($scope, AdvertiseService, $q) {

    if ($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {

        $scope.previewHide = false;
        $scope.postData = {};
        $scope.webidData = imgPathWeb+'/'+$scope.dataId + '/advert';
    }
    else {
        
    }
    //根据拿到图片的链接建立数组
    $scope.arrData = [];
    $scope.addData1 = function () {
        for (var i = 0; i < imgPath.length; i++) {
            $scope.adImg = {};
            $scope.adImg.advertId = $scope.dataId;
            $scope.adImg.advertName = $scope.dataName;
            $scope.adImg.imageUrl = imgPath[i];
            //web类型跟初始化的类型保持一致
            $scope.adImg.applyType = $scope.selectedSite.num;
            $scope.adImg.status = 0;
            $scope.arrData.push( $scope.adImg);
        };

    };
    $scope.addData = function(){
        $scope.addData1();
        var defer = $q.defer();
        AdvertiseService.add($scope.arrData).then(
            function (result) {
                $scope.cancelModal1();
                $scope.initEntity()
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
    };
    $scope.cancelModal1 = function () {
        $scope.dialog1.close();
    };
}

var imgPath = [];
function setImgAdverPath(res) {
    imgPath.push(res);
    if(listattr.length==imgPath.length){
        document.getElementById("ifSucessShow").disabled=false;
    }else{
        document.getElementById("ifSucessShow").disabled=true;
    }
}

//修改控制器
function AdvertiseOneDetailsModify($scope, AdvertiseService, $q) {
    //初始化图片的信息
    //如果图片有ID则访问后台，没有id则为新增数据；
    if ($scope.id != null && $scope.id != undefined && $scope.id != "") {
        AdvertiseService
            .search($scope.id)
            .then(
            function (result) {
                $scope.dataImg = result.data[0];
            }
        );
    } else {
        //修改弹窗视是dataImg渲染页面，这里重新定义dataImg,实现新增的渲染
        $scope.dataImg = {
            imageUrl: $scope.imageUrl,
            advertId: $scope.advertId,
            advertName: $scope.advertName,
            status: 0
        };
    }

    //保存修改后的信息
    $scope.modify = function (imgDate, start, end) {

        if ($scope.id != null && $scope.id != undefined && $scope.id != "") {
            AdvertiseService
                .edit(imgDate)
                .then(
                function (result) {
                    $scope.cancelModal2();
                    $scope.initEntity()
                }
            );
        } else {
            //新增图片信息
            var defer = $q.defer();
        }
    };


    $scope.cancelModal2 = function () {
        $scope.dialog2.close();
    };
}

angular
    .module('managerApp')
    .controller('AdvertiseController', AdvertiseController)
    .controller('AdvertiseOneDetailsController', AdvertiseOneDetailsController)
    .controller('AdvertiseOneDetailsAdd', AdvertiseOneDetailsAdd)
    .controller('AdvertiseOneDetailsModify', AdvertiseOneDetailsModify);
