/**
 * 系统用户controller定义
 */
function GoodsOnSaleController($scope, $http, $q, constPageSize, GoodsOnSaleService, GoodsInfoService, ngDialog) {
  /**
   * 数据初始化
   */
  $scope.find = function(currentPageNo, currentPaseSize) {
    var defer = $q.defer();
    var thirdCateObj = $scope.thirdCateObj;
    var cateId = '';
    if (thirdCateObj) {
      cateId = thirdCateObj.cateId;
    } else {
      cateId = '';
    }
    $scope.drugstoreIdSearch = localStorage.drugstoreId; //	分店ID取登录时获得的
    var drugstoreIdSearch = $scope.drugstoreIdSearch;
    if (!drugstoreIdSearch) {
      drugstoreIdSearch = '';
    }
    GoodsOnSaleService.find(currentPageNo, currentPaseSize, $scope.infoNameSearch, cateId, drugstoreIdSearch).then(
      function(result) {
        $scope.goodsList = result.data;
        defer.resolve(result);
      },
      function(result) {
        defer.reject(result);
      });
    return defer.promise;
  };
  /**
   * 获取树形分类列表，返回全部分类数据
   */
  $scope.findallCate = function() {
    GoodsOnSaleService
      .findall()
      .then(
        function(result) {
          $scope.allCateList = result.data;
        },
        function(result) {

        });
  }
  $scope.findallCate();

  /**
   * 根据PID获取子分类列表
   */
  $scope.findinfosbypid = function(id, n) {
    if (!id) {
      switch (n) {
        case 1: //一级选中的
          $scope.secCateList = [];
          $scope.thirdCateList = [];
          return false;
          break;
        case 2: //二级选中的
          $scope.thirdCateList = [];
          return false;
          break;
      }
    }
    GoodsOnSaleService
      .findinfosbypid(id)
      .then(
        function(result) {
          switch (n) {
            case 1: //一级选中的
              $scope.secCateList = result.data;
              $scope.thirdCateList = [];
              break;
            case 2: //二级选中的
              $scope.thirdCateList = result.data;
              break;
          }
        },
        function(result) {});

  }

  //更改状态，状态（0禁用 1待售 2已删除 3在售 ）
  $scope.updatestatus = function(id, status) {
    var goodsReminder = {
      'goodsOnSaleDisable': "确定禁用该商品吗？",
      'goodsOnSaleEnable': "确定下架该商品吗？",
      'goodsOnSaleDelete': "确定删除该商品吗？"
    };

    var reminder;
    switch (status) {
      case 0:
        reminder = goodsReminder.goodsOnSaleDisable;
        break;
      case 1:
        reminder = goodsReminder.goodsOnSaleEnable;
        break;
      case 2:
        reminder = goodsReminder.goodsOnSaleDelete;
        break;
    }

    ngDialog.openConfirm({
      template: '<p>' + reminder + '</p>' +
        '<div class="ngdialog-buttons">' +
        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
        '</button></div>',
      plain: true,
      closeByDocument: false,
      closeByEscape: false,
      className: 'ngdialog-theme-default'
    }).then(function(value) {
      GoodsOnSaleService
        .updatestatus(id, status)
        .then(
          function(result) {
            //更改状态成功刷新页面
            $scope.loadData(false);
          },
          function(result) {});
    }, function(reason) {

    });
  };

  /**
   * 修改库存弹窗
   */
  $scope.openModel = function(id) {
    $scope.dataId = id;
    $scope.dialog = ngDialog.open({
      template: 'views/goods/GoodsOnSaleStockModel.html',
      className: 'ngdialog-theme-default',
      controller: 'goodsStockController',
      scope: $scope,
      width: 1150
    });
  };

  /**
   * 弹出详情数据模态框
   */
  $scope.openModalDetail = function(dataId) {
    if ($scope.openModalDisable) {
      return false;
    }
    $scope.openModalDisable = true;

    //获取品牌 name id 列表
    GoodsInfoService
      .namelist()
      .then(
        function(result) {
          $scope.brandNameList = result.data;
          //弹窗
          $scope.dataId = dataId;
          $scope.dialog = ngDialog.open({
            template: 'views/goods/GoodsInfoModalOnSale.html',
            className: 'ngdialog-theme-default',
            controller: 'goodsInfoFormModalControllerOn',
            scope: $scope,
            width: 1150
          });
          $scope.openModalDisable = false;
        },
        function(result) {
          $scope.openModalDisable = false;
        });

  };
  //关闭弹窗
  $scope.cancelModal = function() {
    $scope.dialog.close();
  };
}
/**
 * 修改库存弹窗 --Controller
 */
function goodsStockController($scope, $q, constPageSize, GoodsOnSaleService, $rootScope) {
  $scope.WdatePicker = {};
  //具体操作   1,提交订单减少  2,用户订单取消增加   3,管理员后台增加  4,管理员后台减少  5,药店拒接订单增加   6:配送员撤销订单增加
  $scope.changeTypeName = function(n) {
    switch (n) {
      case 1:
        return '提交订单减少';
        break;
      case 2:
        return '用户订单取消增加';
        break;
      case 3:
        return '管理员后台增加';
        break;
      case 4:
        return '管理员后台减少';
        break;
      case 5:
        return '药店拒接订单增加';
        break;
      case 6:
        return '配送员撤销订单增加';
        break;
    }
  };
  //改变 库存 增加-->减少    减少-->增加
  $scope.activeStockClick = function(n) {
    $scope.activeStock = n;
  }

  //修改库存  初始化
  $scope.initEntity = function() {
    $scope.activeStock = true; //默认选中增加库存
    GoodsOnSaleService
      .getinfo($scope.dataId)
      .then(
        function(result) {
          if (result.code == 0) {
            $scope.dataEntity = result.data;
          }
        },
        function(reason) {

        });
  }

  //弹窗 分页  获取库存更改记录
  $scope.search = function(currentPageNo, currentPaseSize) {
    var startTime = '';
    var endTime = '';
    if ($scope.WdatePicker.startTimes) {
      startTime = $scope.WdatePicker.startTimes;
    }
    if ($scope.WdatePicker.endTimes) {
      endTime = $scope.WdatePicker.endTimes;
    }
    var defer = $q.defer();
    GoodsOnSaleService
      .findstockbills($scope.dataId, currentPaseSize, currentPageNo, startTime, endTime)
      .then(
        function(result) {
          $scope.StockList = result.data;
          defer.resolve(result);
        },
        function(result) {
          defer.reject(result);
        });
    return defer.promise;
  };

  //修改库存保存
  $scope.okModalStock = function() {
    if ($scope.okModalStockDisable) {
      return false;
    }
    $scope.okModalStockDisable = true;
    if (!$scope.dataEntity.remark && !$scope.activeStock) {
      $rootScope.showAlert('增加库存时备注可不填，减少库存时备注必填');
      $scope.okModalStockDisable = false;
      return false;
    }
    if (!$scope.dataEntity.stockChange) {
      $rootScope.showAlert('请填写库存改变数量!');
      $scope.okModalStockDisable = false;
      return false;
    }
    if ($scope.dataEntity.stock < $scope.dataEntity.stockChange && !$scope.activeStock) {
      $rootScope.showAlert('库存减少数量不能大于原库存数量!');
      $scope.okModalStockDisable = false;
      return false;
    }
    var obj = {
      'changeType': $scope.activeStock ? 3 : 4, //变更类型 1,提交订单减少 2,订单取消增加 3,管理员后台增加 4,管理员后台减少
      'goodsId': $scope.dataId, //商品ID
      'remark': $scope.dataEntity.remark, //备注
      'stockChange': $scope.dataEntity.stockChange //增加或者减少的数量

    };
    GoodsOnSaleService
      .updatestock(obj)
      .then(
        function(result) {
          if (result.code == 1) {
            $scope.loadData();
            $scope.initEntity(); //初始化
          }
          $scope.okModalStockDisable = false;
        },
        function(reason) {
          $scope.okModalStockDisable = false;
        });
  }
  //标签页
  $scope.onClickTab = function(url) {
    $scope.currentTab = url;
    switch (url) {
      case 'basicInformation.html': //修改库存
        $scope.initEntity(); //初始化
        break;
      case 'updateprice.html':
        $scope.loadDataDialog(); //初始化更改价格记录列表
        break;
    }
  }

  $scope.onClickTab('basicInformation.html');
}

/**
 * 用户详情弹出页面controller定义
 */
function goodsInfoFormModalControllerOn($scope, $q, $rootScope, $filter, GoodsInfoService, ngDialog, goodsReminder, ngVerify, $timeout) {
  $scope.dataEntity = {
    'goodsType': 3, // 商品类型     其他  3
  }
  $scope.WdatePicker = {};

  $scope.selectedClickResList = []; //关联症状选中的数据列表

  //基本信息
  $scope.initEntity = function() {
    if ($scope.dataId) {
      GoodsInfoService
        .getinfo($scope.dataId)
        .then(
          function(result) {
            if (result.code >= 0) {
              $scope.dataEntity = result.data;
              var endLoop = 0;
              $scope.allCateList.forEach(function(element, index, array) {
                try {
                  if (endLoop == 1) {
                    return false;
                  }
                  $scope.secCateList = element.childrenList;
                  $scope.brandList = element;
                  element.childrenList.forEach(function(element, index, array) {
                    if (endLoop == 1) {
                      return false;
                    }
                    $scope.thirdCateList = element.childrenList;
                    $scope.brandLtId = element;
                    element.childrenList.forEach(function(element, index, array) {
                      if (endLoop == 1) {
                        return false;
                      }
                      $scope.brandLtaId = element;
                      if (element.cateId == $scope.dataEntity.goodsCateId) {
                        // dataEntity.goodsCateName = element.cateName;
                        endLoop = 1;
                      }
                    })
                  })
                } catch (e) {
                  //TODO handle the exception
                }

              });
            }
          },
          function(reason) {

          });
    }
  }

  //价格更改记录
  $scope.initEntityPrice = function() {
    GoodsInfoService
      .getinfo($scope.dataId)
      .then(
        function(result) {
          if (result.code >= 0) {
            $scope.dataEntity = result.data;
          }
        },
        function(result) {});
  }
  //弹窗 分页
  $scope.search = function(currentPageNo, currentPaseSize) {
    var startTime = '';
    var endTime = '';
    if ($scope.WdatePicker.startTimes) {
      startTime = $scope.WdatePicker.startTimes;
    }
    if ($scope.WdatePicker.endTimes) {
      endTime = $scope.WdatePicker.endTimes;
    }
    var defer = $q.defer();
    GoodsInfoService
      .findpricebills($scope.dataId, currentPaseSize, currentPageNo, startTime, endTime)
      .then(
        function(result) {
          $scope.infoauditList = result.data;
          defer.resolve(result);
        },
        function(result) {
          defer.reject(result);
        });
    return defer.promise;
  };

  $scope.clickone = function(res) {
    $scope.secCateList = res;
    $scope.brandLtId = '';
    $scope.brandLtaId = '';
  }
  $scope.clicktwo = function(res) {
    $scope.thirdCateList = res;
    $scope.brandLtaId = '';
  }
  $scope.clickThird = function(res) {
    if (res) {
      $scope.dataEntity.goodsCateName = res.cateName;
      $scope.dataEntity.goodsCateId = res.cateId;
    } else {
      $scope.dataEntity.goodsCateName = '';
      $scope.dataEntity.goodsCateId = '';
    }
  }

  //radio 选项
  $scope.checkedRadio = function(m, n) {
    switch (n) {
      case 'goodsType': //商品类型
        $scope.dataEntity.goodsType = m;
        break;
    }
  }

  //症状关联  下拉改变时的数据
  $scope.changeSysm = function(obj) {
    $scope.secondSysmtomList = obj;
  }
  //选择症状时的点击事件
  $scope.selectedClickRes = function(obj) {
    if ($scope.symptomsSelectedId.contains(obj.symptomId)) {
      return false;
    }
    $scope.selectedClickResList.push(obj);
    $scope.symptomsSelectedId.push(obj.symptomId);
    $scope.dataEntity.symptomIds = $scope.symptomsSelectedId.join(","); //数组转字符串
  }
  //移除选择症状时的点击事件
  $scope.removeClickRes = function(symptomId) {
    $scope.symptomsSelectedId.remove(symptomId);
    $scope.selectedClickResList.forEach(function(element, index, array) {
      if (element.symptomId == symptomId) {
        $scope.selectedClickResList.splice(index, 1);
        return 0;
      }
    });
    $scope.dataEntity.symptomIds = $scope.symptomsSelectedId.join(","); //数组转字符串
  }

  //标签页
  $scope.onClickTab = function(url) {
    if ($scope.currentTab == url) {
      return true;
    }
    $scope.currentTab = url;
    switch (url) {
      case 'basicInformation.html': //基本信息
        //$scope.initEntity(); //初始化基本信息数据
        break;
      case 'instruction.html': // 说明书
        // $scope.loadDataDialog(); //
        break;
      case 'goodsinfoimages.html': // 轮播图
        $scope.goodsinfoimagesDetail(); //
        break;
    }
  }
  $scope.goodsinfoimagesDetail = function() {
    GoodsInfoService
      .findinfosImg($scope.dataId)
      .then(
        function(result) {
          if (result.code >= 0) {
            $scope.dataInfoImages = result.data;
          }
        },
        function(reason) {

        });
  }
  $scope.initEntity();
  $scope.onClickTab('basicInformation.html');
}

angular
  .module('managerApp')
  .controller('GoodsOnSaleController', GoodsOnSaleController)
  .controller('goodsInfoFormModalControllerOn', goodsInfoFormModalControllerOn)
  .controller('goodsStockController', goodsStockController);
