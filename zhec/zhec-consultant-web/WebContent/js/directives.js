/**
 * 指令定义
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = '鹿医生 | 顾问管理';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = '鹿医生 | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}


/**
 * datalistpager 分页指令
*/
function datalistpager() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "views/directive/dataPager.html",
        scope: {},
        controller: function ($scope, $element,constPageSize) {
            $scope.currentPageNo = 1;                // 当前页码
            $scope.currentPaseSize = constPageSize;  // 每页显示条数
            $scope.isShowPage1 = false;              // 是否显示页码前面"..."
            $scope.isShowPage2 = false;              // 是否显示页码后面"..."
            $scope.allDataCount = 0;                 // 所有记录数量
            $scope.ifHasPage = false;
            //为父scope（controller）定义加载数据方法，参数ifRefresh：是否返回第一页
            $scope.$parent.loadData = function(ifRefresh) {
                if(ifRefresh)
                    $scope.currentPageNo = 1; 
                $scope.$parent.find($scope.currentPageNo,$scope.currentPaseSize)
                .then(
                    function(result){
                        $scope.allDataCount=result.totalSize;                            //获取所有记录数量
                        if($scope.allDataCount>0){
                        	$scope.ifHasPage = true;
                        }else{
                        	$scope.ifHasPage = false;
                        }
                        $scope.allPage = Math.ceil(result.totalSize / $scope.currentPaseSize)   //获取所有页数并向上取整
                        $scope.arr = [];
                        //定义一个数组存放页码
                        if($scope.allPage <= 5){              //如果当前页数小于5并且总页数小于5
                            angular.element(".btnLeft").removeClass("active");
                            $scope.isShowPage1 = false; 
                            $scope.isShowPage2 = false; 
                            if($scope.currentPageNo == 1){                               //为第一页时向左不可点击
                                angular.element(".btnLeft").addClass("active");
                                if($scope.allPage == 1){
                                    angular.element(".btnRight").addClass("active");
                                }
                            }else if($scope.currentPageNo == $scope.allPage){                //为最后一页时向右不可点击
                                angular.element(".btnRight").addClass("active");
                            }else{                                                       //否则向右向左都可点击
                                angular.element(".btnLeft").removeClass("active");
                                angular.element(".btnRight").removeClass("active");
                            }
                            for(var i = 0; i < $scope.allPage; i++){
                                $scope.arr.push(i+1);
                            }
                        }else{
                            if($scope.currentPageNo <= 3){                //如果 当前页数小于3，但是总页数大于5
                                $scope.isShowPage1 = false; 
                                $scope.isShowPage2 = true;
                                angular.element(".btnRight").removeClass("active");
                                if($scope.currentPageNo != 1){                              //不为第一页时向前按钮可以点击
                                    angular.element(".btnLeft").removeClass("active");
                                }else{                                                      //否则 不可以进行点击
                                    angular.element(".btnLeft").addClass("active");
                                }
                                for(var n = 0; n < 5; n++){
                                    $scope.arr.push(n+1);
                                } 
                                $scope.behindPage = "...";
                            }
                            else if($scope.currentPageNo > 3){          //如果当前页码大于3，并且总页数大于5
                                if($scope.currentPageNo >= $scope.allPage-2){                //判断当前页码在3以内时，隐藏右侧...
                                    $scope.isShowPage2 = false;
                                }else{
                                    $scope.isShowPage2 = true; 
                                }
                                $scope.isShowPage1 = true; 
                                $scope.providerPage = "...";
                                if($scope.currentPageNo < $scope.allPage - 1){            //当前页数小于最后两页的页码，以当前页为中心加载5条数据
                                    angular.element(".btnRight").removeClass("active");
                                    $scope.arr = [];
                                    for(var i = Number($scope.currentPageNo)-2; i <= Number($scope.currentPageNo)+2 && i <= $scope.allPage; i++){
                                        $scope.arr.push(i);
                                    }
                                    $scope.behindPage = "...";
                                }else if($scope.currentPageNo >= $scope.allPage - 1){                                                   //当前页数为最后两页
                                    if($scope.currentPageNo == $scope.allPage - 1){         //倒数第二页时显示最后五页，以当前页数-3为中心加载
                                        angular.element(".btnRight").removeClass("active");
                                        for(var i = $scope.currentPageNo - 3; i<=    $scope.allPage; i++){
                                            $scope.arr.push(i);
                                        }
                                    }
                                    else if($scope.currentPageNo == $scope.allPage){      //最后一页时显示最后五页，以当前页数-4为中心加载
                                        angular.element(".btnRight").addClass("active");           //最后一页时向右不可点击
                                        angular.element(".btnLeft").removeClass("active");
                                        for(var i = $scope.currentPageNo - 4; i<= $scope.allPage; i++){
                                            $scope.arr.push(i);
                                        }
                                    }
                                }
                            }               
                        }
                    }
                )
            }
            //点击页码跳转到指定页
            $scope.choosePageNum = function(index){
                $scope.currentPageNo = Number($scope.arr[index]);     //获取数组中对应下标的数值复制给$scope.currentPageNo
                $scope.$parent.loadData(false);
            }
            //跳转到首页
            $scope.jumpFirst = function(){
                if($scope.currentPageNo != 1){
                    $scope.currentPageNo = 1;
                    $scope.$parent.loadData(false);
                }
            }
            //跳转到尾页
            $scope.jumpLast = function(){
                if($scope.currentPageNo != $scope.allPage){
                    $scope.currentPageNo = $scope.allPage;
                    $scope.$parent.loadData(false);
                }
            }
            //显示上一页
            $scope.upPage = function(){
                if($scope.currentPageNo>1){
                    $scope.currentPageNo--;
                    $scope.$parent.loadData(false);
                }
            }
            //显示下一页
            $scope.downPage = function(){   
                if($scope.currentPageNo < $scope.allPage){                //小于总页数时才向服务器提交请求
                    $scope.currentPageNo++;
                    $scope.$parent.loadData(false);
                }
            }
            //手动修改显示条数
            $scope.changePage = function(index){
                $scope.currentPaseSize = index;
                $scope.currentPageNo = 1;
                $scope.$parent.loadData(false);
            }
            //初始化数据
            $scope.$parent.loadData(true);
        }
    };
}

/**
 * dataPicker 普通日期指令
 */
function dataPicker(){
    return{
        restrict:"A",
        scope:false,
        link:function(scope,element,attr){
            element.bind('click',function(){
                window.WdatePicker({
                    onpicked: function () {
                        scope.$apply(function(){
                            scope.WdatePicker.dataTime=element.val();
                        })
                    },
                    oncleared:function(){
                        scope.$apply(function(){
                            scope.WdatePicker.dataTime=element.val();
                            
                        })
                    },
                    dateFmt:'yyyy-MM-dd HH:mm:ss'
                })
            })
        }
    };
}
/**
 * startPicker 开始日期指令
 */
function startPicker(){
    return{
        restrict:"A",
        scope:false,
        link:function(scope,element,attr){
            element.bind('click',function(){
                window.WdatePicker({
                    onpicked: function () {
                        scope.$apply(function(){
                            scope.WdatePicker.startTime=element.val();
                        })
                    },
                    oncleared:function(){
                        scope.$apply(function(){
                            scope.WdatePicker.startTime=element.val();
                        })
                    },
                    dateFmt:'yyyy-MM-dd HH:mm:ss',
                    maxDate:scope.WdatePicker.endTime
                })
            })
        }
    };
}
/**
 * endPicker 结束日期指令
 */
function endPicker(){
    return{
        restrict:"A",
        scope:false,
        link:function(scope,element,attr){
            element.bind('click',function(){
                window.WdatePicker({
                    onpicked: function () {
                        scope.$apply(function(){
                            scope.WdatePicker.endTime=element.val();
                        })
                    },
                    oncleared:function(){
                        scope.$apply(function(){
                            scope.WdatePicker.endTime=element.val();
                        })
                    },
                    dateFmt:'yyyy-MM-dd HH:mm:ss',
                    minDate:scope.WdatePicker.startTime
                })
            })
        }
    };
}
/**
 * minDate:newDate() 设置今天为最小日期  指令
 */
function minpicker(){
    return{
        restrict:"A",
        scope:false,
        link:function(scope,element,attr){
            element.bind('click',function(){
                window.WdatePicker({
                    onpicked: function () {
                        scope.$apply(function(){
                            scope.WdatePicker.minDateTime=element.val();
                        })
                    },
                    oncleared:function(){
                        scope.$apply(function(){
                            scope.WdatePicker.minDateTime=element.val();
                        })
                    },
                    dateFmt:'yyyy-MM-dd HH:mm:ss',
                    minDate:newDate()
                })
            })
        }
    };
}
function newDate(){
    var myDate = new Date();
    myDate.getYear();        //获取当前年份(2位)
    myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    myDate.getDate();        //获取当前日(1-31)
    myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
    myDate.getHours();       //获取当前小时数(0-23)
    myDate.getMinutes();     //获取当前分钟数(0-59)
    myDate.getSeconds();     //获取当前秒数(0-59)
    myDate.getMilliseconds();    //获取当前毫秒数(0-999)
    myDate.toLocaleDateString();     //获取当前日期
    var mytime=myDate.toLocaleTimeString();     //获取当前时间
    myDate.toLocaleString();        //获取日期与时间
    return myDate.toLocaleString();
}
//实现和angular的交互  将直接选中的时间赋值给ngModal
function newPicker(){
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            minDate: '@'
        },
        link: function (scope, element, attr, ngModel) {

            element.val(ngModel.$viewValue);

            function onpicking(dp) {
                var date = dp.cal.getNewDateStr();
                scope.$apply(function () {
                    ngModel.$setViewValue(date);
                });
            }

            element.bind('click', function () {
                WdatePicker({
                    onpicking: onpicking,
                    dateFmt: 'yyyy-MM-dd HH:mm:ss',
                    minDate: (scope.minDate || '%y-%M-%d'),
                })
            });
        }
    };
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('managerApp')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('datalistpager', datalistpager)
    .directive('startPicker', startPicker)
    .directive('dataPicker', dataPicker)
    .directive('minpicker', minpicker)
    .directive('endPicker', endPicker)
    .directive('newPicker', newPicker);
    
