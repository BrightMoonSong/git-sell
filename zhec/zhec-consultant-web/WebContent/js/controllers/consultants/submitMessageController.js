/**
 * 系统用户controller定义
 */
function submitMessageController($scope,$q,$timeout,constPageSize,submitMessageService,ngDialog){
	$scope.dataEntity= [];					//定义查找到的数据
	
	$scope.files = [];						//存放上传的数据中的文件名及文件路径
	$scope.WdatePicker = {}					//时间控件
	$scope.showBigPic = false;
	$scope.picPath = imgPathConsultantsDetail
	//获取所有上传的文件
	$scope.find = function(){
		submitMessageService
		.find()
		.then(
			function(result) {
				$scope.consultantList = result.data.ConsultantAudit;
				if(result.data.ConsultantAudit.length > 0){
					$scope.auditId = result.data.ConsultantAudit[0].id;
				}
				$scope.ifFIstAudit = result.data.auditButton1;
			})
		
	}
	$scope.find1 = function(){
		submitMessageService
		.get()
		.then(
			function(result) {
				$scope.consultantStatus = result.data.status;
				if(result.data.name == "" || result.data.name == undefined || result.data.name == null){
					$scope.promptMessage = "请先完善个人信息！"
					ngDialog.open({
						template: 'modalDialogId',
			            className: 'ngdialog-theme-default',
			            width: 500,
			            scope:$scope
			        })
					$timeout(function() {
						localStorage.removeItem("funcIdCapi");
						localStorage.setItem("funcIdCapi", "2101");
			            ngDialog.close();
			            window.open(constConsultantLocation+"/index.html#/consultant/personalCenter/consultantMessage","_self")
			        }, 1500);
				}else{
					//初始化数据
    				$scope.find()
				}
			})
	}
	$scope.find1()
	//查看提交的资质信息弹窗
	$scope.openDetail = function(n,id){
		$scope.ifFirtAudit = n;
		$scope.detailId = id;
		$scope.dialog2 = ngDialog.open({
			template: 'ThirDialogId',
            className: 'ngdialog-theme-default',
            width: 700,
            scope:$scope,
            controller:openDetailController
        })
	}
	//展示大图弹窗
	$scope.showBigImg = function(){
		$scope.dialog1 = ngDialog.open({
			template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            width: 800,
            scope:$scope,
            controller:showBigPicController
        })
	}
    
	//新增、修改资质弹窗
	$scope.openModal = function() {
		$scope.auditShowStatus = 1;
		$scope.dialog = ngDialog.open({
			template: 'secDialogId',
            className: 'ngdialog-theme-default',
            controller: 'submitMoreController',
            scope: $scope,
            width: 700,
            closeByDocument:false
        })
	};
	$scope.hideMoreBtn = true;
	$scope.editModal = function(n,id){
		if(n == 2){
			$scope.hideMoreBtn = false;
		}else{
			$scope.hideMoreBtn = true;
		}
		
		$scope.source = n; //2为审核未通过修改;	3、续审
		$scope.currentdataId = id;
		submitMessageService
		.auditMessage($scope.auditId)
		.then(
			function(result) {
				$scope.newDetailList = result.data;
				$scope.getAuditMessage()
			})
	}
	//新增、修改资质弹窗
	$scope.getAuditMessage = function() {
		$scope.newAuditList = $scope.newDetailList;
		$scope.auditShowStatus = $scope.source;	//1为新增;2为审核未通过修改;	3、续审
		$scope.dialog4 = ngDialog.open({
			template: 'secDialogId',
            className: 'ngdialog-theme-default',
            controller: 'submitMoreController',
            scope: $scope,
            width: 700,
            closeByDocument:false
        })
	};
}

function submitMoreController($scope,$rootScope,$q,submitMessageService,ngDialog){

	$scope.openModal = function(n) {
		$scope.dataId = localStorage.id;
		$scope.auditShowStatus = n;
//		
		$scope.showSort = n;
		if(n == 1){
			$scope.stringName = "身份证正面"
		}else if(n == 2){
			$scope.stringName = "身份证反面"
		}else if(n == 3){
			$scope.stringName = "手持身份证照片"
		}else if(n == 4){
			$scope.stringName = "医师资格证"
		}else{
			$scope.stringName = "上传更多"
		}
		
		$scope.dialog = ngDialog.open({
			template: 'views/consultants/submitMessageModal.html',
            className: 'ngdialog-theme-default',
            controller: 'submitMessageModalController',
            scope: $scope,
            width: 500,
            closeByDocument:false
        })
	};
	
	$scope.submitNum = 4;
	//用来接收弹出框中的数据
	$scope.imgFir = "";
	$scope.imgSec = "";
	$scope.imgThi = "";
	$scope.imgFou = "";
	$scope.moreFiles = [];
	if($scope.auditShowStatus == 1){		//1:新增
		
	}else{						//2：修改（展示上一次提交的信息）

		$scope.imgFir = {"fileType":$scope.newAuditList[0].fileType,"filePath":$scope.newAuditList[0].filePath} ;
		$scope.imgSec = {"fileType":$scope.newAuditList[1].fileType,"filePath":$scope.newAuditList[1].filePath} ;
		$scope.imgThi = {"fileType":$scope.newAuditList[2].fileType,"filePath":$scope.newAuditList[2].filePath} ;
		$scope.imgFou = {"fileType":$scope.newAuditList[3].fileType,"filePath":$scope.newAuditList[3].filePath} ;
		$scope.moreFiles = [];
		for(var i = 3; i < $scope.newAuditList.length; i++){
			$scope.moreFiles.push({"id":$scope.newAuditList[i].id,"fileType":$scope.newAuditList[i].fileType,"filePath":$scope.newAuditList[i].filePath})
		}
	}
	
	$scope.retData = function (n,data) {	//接受弹窗传来的提交文件
		if(n == 1)
			$scope.imgFir = data[0];
		else if(n ==2)
			$scope.imgSec = data[0];
		else if(n == 3)
			$scope.imgThi = data[0];
		else if(n==4)
			$scope.imgFou = data[0];
		else if(n==5){
			for(var i = 0; i < data.length; i++){
				$scope.moreFiles.push(data[i])
			}
		}
    };
    $scope.submitMessage = function(){
    	$scope.submitWillMessage();
    	if($scope.imgFir == "" || $scope.imgSec == "" || $scope.imgThi == "" || $scope.imgFou == ""){
    		$rootScope.showAlert("请上传所有资料！")
    		return;
    	}
		$scope.consultantSubmitMessage = $scope.saveMessage;
		$scope.putsource = $scope.auditShowStatus;
		$scope.postEditMeessage = $scope.editMessage;
		$scope.dialog5 = ngDialog.open({
			template: 'ConfirmDialogId',
            className: 'ngdialog-theme-default',
            controller: 'submitMessageConfirmModalController',
            scope: $scope,
            width: 600,
            closeByDocument:false
        })
    }
    //提交数据
    $scope.submitWillMessage = function(){			//上传资质信息
    	$scope.editMessage = [];				//存放修改资质的信息
    	
    	$scope.saveMessage = {};				//存放上传的数据
		$scope.files = [];
    	
    	if($scope.newAuditList != "" && $scope.newAuditList != null && $scope.newAuditList != undefined){
    		$scope.editMessage.push({"id":$scope.newAuditList[0].id,"consultantId":localStorage.id,"auditId":$scope.currentdataId,"filePath":$scope.imgFir.filePath})
			$scope.editMessage.push({"id":$scope.newAuditList[1].id,"consultantId":localStorage.id,"auditId":$scope.currentdataId,"filePath":$scope.imgSec.filePath})
			$scope.editMessage.push({"id":$scope.newAuditList[2].id,"consultantId":localStorage.id,"auditId":$scope.currentdataId,"filePath":$scope.imgThi.filePath})
			$scope.editMessage.push({"id":$scope.newAuditList[3].id,"consultantId":localStorage.id,"auditId":$scope.currentdataId,"filePath":$scope.imgFou.filePath})
    	
    	}
		
//  	$scope.saveMessage.isFirst = "0";
    	$scope.saveMessage.userToken = localStorage.dataLogin;
    	$scope.files.push({"fileType":$scope.imgFir.fileType,"filePath":$scope.imgFir.filePath});
    	$scope.files.push({"fileType":$scope.imgSec.fileType,"filePath":$scope.imgSec.filePath});
    	$scope.files.push({"fileType":$scope.imgThi.fileType,"filePath":$scope.imgThi.filePath});
    	$scope.files.push({"fileType":$scope.imgFou.fileType,"filePath":$scope.imgFou.filePath});
		for(var i = 0; i < $scope.moreFiles.length; i++){
			$scope.files.push({"fileType":"5","filePath":$scope.moreFiles[i].filePath});
		}
		$scope.saveMessage.files = $scope.files;
		
    }	
    $scope.showBigImg = function(img){
		$scope.currentImg = img;
		$scope.dialog1 = ngDialog.open({
			template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            width: 800,
            scope:$scope,
            controller:showBigPicController
        })
	}
    $scope.cancleModal = function(){
    	ngDialog.close()
    }
}
function submitMessageConfirmModalController($scope,$q,submitMessageService,ngDialog){
	//确定
	$scope.confirmClick = function(n){		
		if(n == 1 || n == 3){		//初审确定	
			if($scope.okModalDisabled == true) {
				return 0;
			}
			$scope.okModalDisabled = true;
		    var defer = $q.defer();
	    	submitMessageService
			.post($scope.consultantSubmitMessage)
			.then(
				function(result) {
					defer.resolve(result);
					ngDialog.close()
					$scope.okModalDisabled = false;
					$scope.find();
				},function(result){
					$scope.okModalDisabled = false;
				})
			return defer.promise;
		}else if(n==2){		//修改确定
			if($scope.okModalDisabled == true) {
				return 0;
			}
			$scope.okModalDisabled = true;
//			if($scope.putsource == 2){
				var defer = $q.defer();
				var defer = $q.defer();
				submitMessageService
				.edit($scope.postEditMeessage)
				.then(
					function(result) {
						defer.resolve(result);
						$scope.okModalDisabled = false;
						ngDialog.close()
						$scope.find();
					},function(result){
						$scope.okModalDisabled = false;
					})
				return defer.promise;
//			}
		}
	}
}
function openDetailController($scope,$q,submitMessageService,ngDialog){

	$scope.showBigImg = function(img){
		$scope.currentImg = img;
		$scope.dialog1 = ngDialog.open({
			template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            width: 800,
            scope:$scope,
            controller:showBigPicController
        })
	}
	$scope.getAuditMessage = function(){
		submitMessageService
		.auditMessage($scope.detailId)
		.then(
			function(result) {
				$scope.applyList = result.data;
			})
	}
	$scope.getAuditMessage()
	$scope.cancelModal = function(){
		$scope.dialog2.close();
	}
	//修改资质提交
	$scope.submitEditMessage = function(){
		
	}
}
/**
 * 系统用户修改弹出页面controller定义
 */
function submitMessageModalController($scope,$q,submitMessageService,ngDialog){
	$scope.dataEntity = [];
	$scope.consultantsMessage = [];		//储存文件名及路径
	$scope.WdatePicker = {};		//选择时间
	if($scope.showSort != 5){
		$scope.idData = "requiredFiles/" + $scope.dataId;

	}else{
		$scope.idData = "moreFiles/" + $scope.dataId;
	}
    $scope.addData = function () {
    	if($scope.showSort != 5){	
    		for (var i = 0; i < imgPath.length; i++) {
	            $scope.consultantsMessage.push({"fileType":$scope.showSort,"filePath":imgPath[i]});
	        }
	        $scope.dataEntity = $scope.dataEntity.concat($scope.consultantsMessage);
	        $scope.retData($scope.showSort,$scope.dataEntity)
	        $scope.cancelModal();
    	}else{
    		for (var i = 0; i < imgPath.length; i++) {
	            $scope.consultantsMessage.push({"fileType":"","filePath":imgPath[i]});
	        }
	        $scope.dataEntity = $scope.dataEntity.concat($scope.consultantsMessage);
	        $scope.retData($scope.showSort,$scope.dataEntity)
	        $scope.cancelModal();
    	}
        
    };
	//关闭弹出框
    $scope.cancelModal = function () {
    	$scope.dialog.close();
    };
    
}

function showBigPicController($scope){
	$scope.showBigPic = $scope.currentImg;
	//关闭大图
	$scope.closeModal = function(){
		$scope.dialog1.close();
	}
}
//document.getElementById("ifSucessShow").disabled = true;
function disabled() {
	var piclist = document.getElementsByClassName("pic_list");
	var bool = true;

	if(isContains(piclist[0].children[0].innerHTML, '上传成功')) {
		
	} else {
			bool = false;
	}
	if(bool) {
		document.getElementById("ifSucessShow").disabled = false;
	} else {
		document.getElementById("ifSucessShow").disabled = true;
	}
}
var imgPath = [];
function setImgconsultantsPath(res) {
    imgPath.push(res);
    disabled()
}
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
angular
    .module('managerApp')
    .controller('submitMessageController', submitMessageController)
    .controller('submitMessageModalController', submitMessageModalController)
    .controller('showBigPicController', showBigPicController)
    .controller('openDetailController', openDetailController)
    .controller('submitMoreController', submitMoreController)
    .controller('submitMessageConfirmModalController', submitMessageConfirmModalController)
    
    
    
    
    