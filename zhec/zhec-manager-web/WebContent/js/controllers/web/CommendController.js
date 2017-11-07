function CommendController($rootScope, $scope, $http, $q, constPageSize, CommendService, ngDialog) {


    /**
     * 页面开始加载所有推荐位信息
     */
    //选择类型，applyType 默认为1 利用option 去选择类型

    $scope.sites = [
        {site : "web", num : 1},
        {site : "wap", num : 2},
        {site : "IOS", num :3}
    ];
    $scope.selectedSite={site : "web",num : 1};

       $scope.comName = "";
    $scope.find = function (currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        CommendService.find(currentPaseSize, currentPageNo,$scope.comName, $scope.selectedSite.num).then(
            function (result) {
                $scope.commendData = result.data;
                defer.resolve(result);
            }, function (result) {
                defer.reject(result);
            });
        return defer.promise;
    };

    /**
     * 弹出模态框  展示单个推荐位的商品信息
     */
    $scope.openModalOne = function (id, goodsCategory, name) {
        $scope.dataId = id;
        $scope.goodsCategory = goodsCategory;
        $scope.commendName = name;
        //$scope.getData(id);
        $scope.dialog = ngDialog.open({
            template: 'views/web/CommendOneDetailsModal.html',
            className: 'ngdialog-theme-default',
            controller: 'CommendOneDetailsController',
            scope: $scope,
            width: 1000
        })
    };
}
/**
 * 单个推荐
 */
function CommendOneDetailsController($scope, CommendService, ngDialog) {
    $scope.dataEntity = {};
    $scope.initEntity = function () {
        //如果参数dataId不为空，说明是修改数据，dataId 为推荐位的id
        if ($scope.dataId != null && $scope.dataId != undefined && $scope.dataId != "") {

            CommendService
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

    //定义推荐位的id,
    $scope.commendId = $scope.dataEntity.commendId;
    //打开增加的弹窗
    $scope.openModalOneAdd = function () {

        $scope.dialog1 = ngDialog.open({
            template: 'views/web/commendAddModal.html',
            className: 'ngdialog-theme-default',
            controller: 'commendAdd',
            scope: $scope,
            width: 1200
        })
    };
    //打开修改的弹窗
    $scope.openModalOneModify = function (id) {
        $scope.id = id;

        $scope.dialog2 = ngDialog.open({
            template: 'views/web/CommendModifyModal.html',
            className: 'ngdialog-theme-default',
            controller: 'CommendModifyController',
            scope: $scope,
            width: 1000
        })
    };
    $scope.cancelModal = function () {
        $scope.dialog.close();
    };
    $scope.initEntity();
}
//添加商品
function commendAdd($scope, CommendService, $q,constPageSize) {//

    //queryGood 为传入的商品名字，在搜索时传给后台，默认为空
    $scope.queryGood="";
    /*
    * goodsCategory:商品的分类id
    * queryGood    :商品的名字（模糊查询）
    * */
    $scope.search = function(currentPageNo, currentPaseSize) {
        var defer = $q.defer();
        var infoName = $scope.infoName;
        var cateId = $scope.cateId;
        var cateId1 = $scope.cateId1;
        var cateId2 = $scope.cateId2;
        stockService
            .find(currentPaseSize, currentPageNo, cateId, cateId1, cateId2, infoName)
            .then(
            function(result) {
                $scope.stockAllList = result.data;
                defer.resolve(result);
            },
            function(result) {
                defer.reject(result);
            })
        return defer.promise;
    }
    $scope.search = function(currentPageNo, currentPaseSize){
        var defer = $q.defer();
        var infoName = $scope.queryGood;
        var cateId = $scope.cateId;
        var cateId1 = $scope.cateId1;
        var cateId2 = $scope.cateId2;
        CommendService.search(currentPaseSize, currentPageNo, cateId, cateId1, cateId2, infoName).then(
            function (result) {
                $scope.goodList = result.data;
                    defer.resolve(result);
                }, function (result) {
                    defer.reject(result);
            })
        return defer.promise;
    };


    //初始化搜索控件，一级分类
    $scope.Type1Init = function() {
        CommendService.seach(0).then(
            function(result) {
                $scope.TypeList1 = result.data;
                // $scope.loadData();
            },
            function(result) {})
    }
    $scope.Type1Init();

    //一级分类下拉控件的change事件方法，用于实现级连i
    $scope.TypeChange1 = function(id) {
        $scope.cateId = id;
        CommendService.seach(id).then(
            function(result) {
                $scope.TypeList2 = result.data;
                // $scope.loadData();
            },
            function(result) {})
    }
    $scope.TypeChange2 = function(id) {
        $scope.cateId1 = id;
        CommendService.seach(id).then(
            function(result) {
                $scope.TypeList3 = result.data;
                // $scope.loadData();

            },
            function(result) {})

    }
    $scope.TypeChange3 = function(id) {
        $scope.cateId2 = id;
        // $scope.loadData();

    }

    //拿到选择的商品
    $scope.addGood = function (good) {
        $scope.newGood = good;
    };
    //新建向后台增加的数据（加上commendId，commendName，goodsCategory），新增数据时数据可以为空（涛哥）
    $scope.foundGood = function () {
        $scope.freshGood = {};
        $scope.freshGood.commendId = $scope.dataId;
        $scope.freshGood.commendName = $scope.commendName;
        $scope.freshGood.goodsCategory = $scope.goodsCategory;
        $scope.freshGood.goodsId = $scope.newGood.id;
        $scope.freshGood.name1 = $scope.newGood.name1;
        $scope.freshGood.timeStart = '';
        $scope.freshGood.timeEnd = '';
        $scope.freshGood.sort = '';
        $scope.freshGood.status = 0;
        $scope.freshGood.applyType =$scope.selectedSite.num;
    //将修改好的数据传参后台
        CommendService.add($scope.freshGood)
            .then(function (result) {
                $scope.initEntity()
            }, function (result) {
            })
    };


    $scope.cancelModal1 = function () {
        $scope.dialog1.close();
    };
}

//修改控制器
function CommendModifyController($scope, CommendService, $q) {

    if ($scope.id != null && $scope.id != undefined && $scope.id != "") {
        //进入修改页面的时候，传入id 得到对应的商品信息  good
        $scope.good = $scope.dataEntity.filter(function (item) {
            return item.id == $scope.id;
        });
        $scope.good = $scope.good[0];
        $scope.good.applyType = $scope.good.apply_type;
        delete $scope.good.apply_type;
    } else {
    }

    //保存修改后的信息
    $scope.modify = function (goodDate, start, end) {
        delete goodDate.brandName;//删除对象参数中没用的属性
        delete goodDate.cateName;
        delete goodDate.STATUS;


        //根据商品id去修改数据
        if ($scope.id != null && $scope.id != undefined && $scope.id != "") {
            CommendService
                .edit(goodDate)
                .then(
                function (result) {
                    $scope.cancelModal2();
                    $scope.initEntity()
                },function(result){
                }
            );
        } else {
        }
    };


    $scope.cancelModal2 = function () {
        $scope.dialog2.close();
    };
}

angular
    .module('managerApp')
    .controller('CommendController', CommendController)
    .controller('CommendOneDetailsController', CommendOneDetailsController)
    .controller('CommendModifyController', CommendModifyController)
    .controller('commendAdd', commendAdd);
