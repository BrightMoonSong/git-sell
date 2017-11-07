angular
    .module('managerApp')
    .controller('ArticlesCateController', ArticlesCateController);

function ArticlesCateController($rootScope, $scope, $http, $q, constPageSize, ArticlesCateService, ngDialog) {

    $scope.isShowEdit = false; //当点击修改及添加时显示信息框
    $scope.isShowBtn = true; //默认显示编辑按钮
    $scope.isShowBtn1 = false;
    $scope.saveMessage = {}; //用来存储修改或者添加的数据
    $scope.MessageInfo = ""; //存储提示信息，如选择分类
    $scope.status = 1; //单选框信息初始化，默认为选中1

    //获取所有列表
    $scope.find = function() {
        ArticlesCateService
            .find(2)
            .then(
                function(result) {
                    //树形结构图进行配置
                    $scope.treeConfig = {
                        'plugins': ['types', 'dnd'],
                        'types': {
                            'default': {
                                'icon': 'glyphicon glyphicon-file'
                            }
                        },
                        version: 1
                    };
                    $scope.treeData = result.data; //将获取到的数据进行赋值，与DOM进行数据绑定
                },
                function(result) {

                }
            );
    };
    //刷新树形数据
    $scope.loadTree = function() {
        this.treeConfig.version++;
        $scope.isShowEdit = false; //刷新的同时隐藏掉右边的编辑部分
        $scope.ableShow = false; //新增子类按钮恢复为可用状态
        $scope.cateId = undefined; //将树的点击数据清空，这样在不点击树节点的情况下，点击添加按钮不会显示编辑框
    };
    //弹出框
    $scope.promptDialog = function() {
        $scope.dialog = ngDialog.open({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default',
            scope: $scope,
            width: 240
        });
    };

    //根据id查找单个分类详细信息
    $scope.findId = function(index) { // 接收点击id
        ArticlesCateService
            .findId(index)
            .then(
                function(result) {
                    $scope.currentNode = result.data; //获取当前点击节点
                    if ($scope.currentNode[0].pid == 0) {
                        $scope.ableShow = false;
                    } else {
                        $scope.ableShow = true;
                    }
                    //并且赋值，调用修改的方法
                    $scope.editArticlesType();
                },
                function(result) {
                    //alert("搜索用户失败！");
                }
            );
    };


    //输入修改内容
    $scope.editArticlesType = function() {
        if ($scope.currentNode[0].pid == 0) {
            $scope.parentName = "";
        } else {
            for (var i = 0; i < $scope.treeData.length; i++) { //点击的id查询数据库，取到父节点名字
                if ($scope.currentNode[0].pid == $scope.treeData[i].id) {
                    $scope.parentName = $scope.treeData[i].text;
                }
            }
        }
        //先显示当前分类所有信息
        $scope.currentNodeName = $scope.currentNode[0].name;
        $scope.id = $scope.currentNode[0].id;
        $scope.pid = $scope.currentNode[0].pid;
        $scope.sort = $scope.currentNode[0].sort;
        $scope.status = $scope.currentNode[0].status;

        $scope.isShowBtn = true;
        $scope.isShowEdit = true;
        $scope.isShowBtn1 = false;
        $scope.isShowBtn2 = false;
        // }
    };

    //点击进行修改后的保存
    $scope.saveEditNode = function() {

        //这里是将写入输入框的内容存起来
        $scope.saveMessage.id = $scope.id;
        $scope.saveMessage.name = $scope.currentNodeName;
        $scope.saveMessage.pid = $scope.pid;
        $scope.saveMessage.sort = $scope.sort;
        $scope.saveMessage.status = $scope.status;
        $scope.judge = true;

        ArticlesCateService
            .editType($scope.saveMessage)
            .then(
                function(result) {
                    $scope.find();
                    $scope.loadTree();
                },
                function(result) {
                    //alert("搜索用户失败！");
                }
            );
    };
    //添加同级节点
    $scope.addFriendArticlesType = function() {
        //添加之前判断是否选择了分类
        if ($scope.cateId == undefined) {
            //			$scope.confirm = "fadeInTop";
            $scope.MessageInfo = "请先选择分类";
            $scope.promptDialog();
        } else {
            if ($scope.currentNode[0].pid == 0) { //判断是否为根节点
                $scope.parentName = "";
            } else {
                for (var i = 0; i < $scope.treeData.length; i++) { //点击的id查询数据库，取到父节点名字
                    if ($scope.currentNode[0].pid == $scope.treeData[i].id) {
                        $scope.parentName = $scope.treeData[i].text;
                    }
                }
            }
            //添加时先将所有输入框中的内容清除
            $scope.currentNodeName = "";
            $scope.id = "";
            $scope.pid = $scope.currentNode[0].pid;
            $scope.sort = "";
            $scope.status = 1;
            $scope.isShowBtn = false; //显示添加按钮，隐藏修改按钮
            $scope.isShowEdit = true;
            $scope.isShowBtn1 = true;
            $scope.isShowBtn2 = false;
        }
    };

    //添加子级节点
    $scope.addSonArticlesType = function() {
        if ($scope.cateId == undefined) { //添加之前判断是否选择了分类
            $scope.MessageInfo = "请先选择分类";
            //			$scope.confirm = "fadeInTop";
            $scope.promptDialog();
        } else {
            //添加时先将所有输入框中的内容清除
            $scope.currentNodeName = "";
            $scope.id = "";
            $scope.pid = "";
            $scope.sort = "";
            $scope.status = 1;
            $scope.parentName = $scope.currentNode[0].name; //添加子级点时，父节点为点击分类名
            $scope.pid = $scope.currentNode[0].pid; //只保留父节点

            $scope.isShowBtn = false; //显示添加按钮，隐藏修改按钮
            $scope.isShowEdit = true;
            $scope.isShowBtn1 = false;
            $scope.isShowBtn2 = true;
        }
    };

    //保存添加同级节点
    $scope.saveAddFriendNode = function() {
        //这里是将写入输入框的内容存起来
        $scope.saveMessage.id = $scope.id;
        $scope.saveMessage.name = $scope.currentNodeName;
        $scope.saveMessage.pid = $scope.pid;

        if ($scope.pid == null || $scope.pid == "") { //新建时判断是不是一级分类，一级分类的父节点为0
            $scope.pid = "0";
        }

        $scope.saveMessage.sort = $scope.sort;
        $scope.saveMessage.status = $scope.status;

        ArticlesCateService
            .postType($scope.saveMessage)
            .then(
                function(result) {
                    $scope.find();
                    $scope.loadTree();
                    //添加成功后清空信息
                    $scope.currentNodeName = "";
                    $scope.id = "";
                    $scope.pid = "";
                    $scope.sort = "";
                    $scope.status = "";
                },
                function(result) {

                }
            );
    };
    //保存添加子级节点
    $scope.saveAddSonNode = function() {
        //先获取输入内容
        $scope.saveMessage.name = $scope.currentNodeName;
        $scope.saveMessage.id = $scope.id;
        $scope.saveMessage.pid = $scope.currentNode[0].id;
        $scope.saveMessage.sort = $scope.sort;
        $scope.saveMessage.status = $scope.status;

        ArticlesCateService
            .postType($scope.saveMessage)
            .then(
                function(result) {
                    $scope.find();
                    $scope.loadTree();
                    //添加成功后清空信息
                    $scope.id = "";
                    $scope.pid = "";
                    $scope.sort = "";
                    $scope.status = "";
                },
                function(result) {
                    //alert("搜索用户失败！");
                }
            );
    };
    //取消保存
    $scope.cancleSave = function() {
        $scope.isShowEdit = false; //隐藏展示信息区域
    };

    //初始化菜单
    $scope.find();
    $scope.nodeclickCB = function(e) {
        $scope.checkArray = $scope.treeInstance.jstree(true).get_selected(); //获取点击菜单的id，为数组形式
        $scope.cateId = $scope.checkArray[0];
        if ($scope.cateId !== undefined) { //判断取到的id是否为undifined，不为undifined则再进行操作
            //从网络获取单个类型的详细信息,由于树需要数据结构的特殊性，构成树的数据是总数据的一部分，需要重新获取详细数据
            $scope.findId($scope.cateId);
        }
    };
}
