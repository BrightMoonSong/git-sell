//后台管理配置
angular
	.module('managerApp')
	//公共配置文件
	.constant('hydConfig', {
		constManagerLocation: "http://localhost:8088", // 后台网站访问主机地址
		constMapiLocation: "http://localhost:8088/mapi", // 后台接口配置
		constMessageCode: {
			/*
			 * 1~200配置公共字符串信息
			 */
			"1": "保存成功",
			"-104": {
				"type": 4,
				"message": "该分类已存在!"
			}
			/*
			 * 201~300配置登录注册字符串信息
			 */

			/*
			 * 301~1301配置顾问个人中心字符串信息
			 */
			//301~400配置顾问个人中心基本信息修改字符串信息
			//前50作为提示信息

			//后50作为校验信息

			//401~500配置顾问个人中心资料审核字符串信息
			//前50作为提示信息

			//后50作为校验信息

		},
		constHttpCode: {
			"403": {
				"type": 4,
				"message": "权限不足!"
			},
			"401": {
				"type": 5,
				"message": "请重新登录!"
			}
		},
		/**
		 * OSS图片上传路径配置
		 */
		//dev:开发环境 、test:测试环境 、pro:生产环境 、pre:预生产环境
		currentEnvironment: 'dev',
		//引入静态文件      true代表oss，false代表本地
		publicFlag: false,
		localUrl: ".",
		localOssUrl: "https://lys613.oss-cn-beijing.aliyuncs.com/public",
		publicUrl: this.publicFlag ? this.localOssUrl : this.localUrl,
		publicUrlMall: this.publicUrl + "/mall/",
		publicUrlManager: this.publicUrl + "/manager/",
		publicUrlConsultant: this.publicUrl + "/consultant/",
		//业务 路径
		//manager
		imgPathBrands: this.currentEnvironment + '/brand', //品牌图片 路径 专有文件夹 brand
		imgPathGoods: this.currentEnvironment + '/goods', //商品管理
		imgPathRefund: this.currentEnvironment + '/refund', //退单管理
		imgPathOrder: this.currentEnvironment + '/order'//订单管理
	});