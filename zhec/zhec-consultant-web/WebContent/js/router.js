/**
 * 路径配置
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/consultant/index");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider
        .state('consultant', {
            abstract: true,
            url: "/consultant",
            templateUrl: "views/common/content.html",
        })
        .state('consultant.index', {
            url: "/index",
            templateUrl: "views/main.html",
            data: {
                pageTitle: '管理首页'
            }
        })
        .state('consultant.personalCenter', {
            url: "/personalCenter",
            template: "<div ui-view></div>",
        })
        //个人信息修改
        .state('consultant.personalCenter.consultantMessage', {
            url: "/consultantMessage",
            templateUrl: "views/consultants/consultantsMessageEdit.html",
            data: {
                pageTitle: '信息修改'
            },
            controller: 'consultantsController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'managerApp',
                        insertbefore: "#ng_load_plugins_before",
                        files: [
                            'js/services/consultants/consultantsService.js',
                            'js/controllers/consultants/consultantsController.js'
                        ]
                    }])
                }]
            }
        })
        //资料提交
        .state('consultant.personalCenter.submitMessage', {
            url: "/submitMessage",
            templateUrl: "views/consultants/submitMessage.html",
            data: {
                pageTitle: '资料提交'
            },
            controller: 'submitMessageController',	
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'managerApp',
                        insertbefore: "#ng_load_plugins_before",
                        files: [
                            'js/services/consultants/submitMessageService.js',
                            'js/controllers/consultants/submitMessageController.js'
                        ]
                    }])
                }]
            }
        })
        
        //推荐
        .state('consultant.recommend', {
            url: "/recommend",
            template: "<div ui-view></div>",
        })

        //订单推荐
        .state('consultant.recommend.memberorders', {
            url: "/memberorders",
             templateUrl: "views/promotion/PromotionCodeGoods.html",
            data: {
                pageTitle: '推荐商品'
            },
             controller: 'PromotionCodeGoodsController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'managerApp',
                        insertbefore: "#ng_load_plugins_before",
                        files: [
                             'js/services/promotion/PromotionCodeGoodsService.js',
                             'js/controllers/promotion/PromotionCodeGoodsController.js'
                        ]
                    }])
                }]
            }
        })
//        //推荐总计
//        .state('consultant.promotion', {
//            url: "/promotion",
//            template: "<div ui-view></div>",
//        })
//        
//        //订单推荐总计
//        .state('consultant.promotion.promotionorders', {
//            url: "/promotionorders",
//            templateUrl: "views/promotionTotal/PromotionOrders.html",
//            data: {
//                pageTitle: '已完成订单推荐总计'
//            },
//            controller: 'PromotionOrdersController',
//            resolve: {
//                deps: ['$ocLazyLoad', function($ocLazyLoad) {
//                    return $ocLazyLoad.load([{
//                        name: 'managerApp',
//                        insertbefore: "#ng_load_plugins_before",
//                        files: [
//                            'js/services/promotionTotal/PromotionOrdersService.js',
//                            'js/controllers/promotionTotal/PromotionOrdersController.js',
//                            
//                        ]
//                    }])
//                }]
//            }
//        })
//      //订单推荐未完成总计
//      .state('consultant.promotion.promotionunfinishedorders', {
//          url: "/promotionunfinishedorders",
//          templateUrl: "views/promotionTotal/promotionunfinishedorders.html",
//          data: {
//              pageTitle: '未完成订单推荐总计'
//          },
//          controller: 'promotionunfinishedordersController',
//          resolve: {
//              deps: ['$ocLazyLoad', function($ocLazyLoad) {
//                  return $ocLazyLoad.load([{
//                      name: 'managerApp',
//                      insertbefore: "#ng_load_plugins_before",
//                      files: [
//                          'js/services/promotionTotal/promotionunfinishedordersService.js',
//                          'js/controllers/promotionTotal/promotionunfinishedordersController.js',
//                          
//                      ]
//                  }])
//              }]
//          }
//      })
        //推荐总计
        .state('consultant.financial', {
            url: "/financial",
            template: "<div ui-view></div>",
        })
        //资金管理
        .state('consultant.financial.mybalance', {
            url: "/mybalance",
            templateUrl: "views/financial/financial.html",
            data: {
                pageTitle: '余额管理'
            },
            controller: 'financialController',	
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'managerApp',
                        insertbefore: "#ng_load_plugins_before",
                        files: [
                            'js/services/financial/financialService.js',
                            'js/controllers/financial/financialController.js',
                        ]
                    }])
                }]
            }
        })
        //余额明细
        .state('consultant.financial.bill', {
            url: "/bill",
            templateUrl: "views/financial/bill.html",
            data: {
                pageTitle: '余额明细'
            },
            controller: 'billController',	
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'managerApp',
                        insertbefore: "#ng_load_plugins_before",
                        files: [
                            'js/services/financial/billService.js',
                            'js/controllers/financial/billController.js',
                        ]
                    }])
                }]
            }
        })
}


angular
    .module('managerApp')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
