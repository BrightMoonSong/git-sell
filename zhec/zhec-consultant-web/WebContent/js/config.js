var app = angular
	.module('managerApp')
	.constant('constMapiLocation', constMapiLocation)		// 后台接口配置
	.constant('constCapiLocation', constCapiLocation)		//	顾问接口配置
    .constant('constLapiLocation', constLapiLocation)		//	商城接口配置  
    .constant('constConsultantLocation', constConsultantLocation)	// 顾问网站访问主机地址
    .constant('constMallLocation', constMallLocation)		// web网站访问主机地址
    .constant('constManagerLocation', constManagerLocation)		// 后台网站访问主机地址
	.constant('constPageSize', 10)                           //默认每页显示的条数 
	//定义系统提示编码
	//type:1 正常但不alert信息  2 正常并alert信息,  3 confirm信息  , 4 提示错误信息
	.constant('constMessageCode', {
		"-702":{"type":4,"message":"提现金额大于0元。"},
		"-701":{"type":4,"message":"提现金额不能小于最低提现额。"},
		"-700":{"type":2,"message":"验证码发送异常，请重新发送。"},
//		"-505":{"type":2,"message":"您的余额不足"},
		"-504":{"type":2,"message":"您的余额不足！"},
//		"-503":{"type":2,"message":"亲，您有未确认收款的记录！"},
//		"-502":{"type":2,"message":"亲，每个月只可以提现一次!"},
		"-501":{"type":2,"message":"亲，还没到提现时间呢!"},
		"-401":{"type":4,"message":"验证码错误"},
		"-402":{"type":4,"message":"验证码超时"},
		"-404":{"type":4,"message":"用户名已存在"},
		"-405":{"type":4,"message":"手机号已存在"},
		"-301":{"type":4,"message":"该角色已存在"},
		"-200":{"type":4,"message":"订单状态错误"},
		"-105":{"type":1,"message":""},
		"-104":{"type":4,"message":"该分类已存在"},
		"-103":{"type":4,"message":"该商品已存在"},
		"-102":{"type":4,"message":"该品牌已存在"},
		"-101":{"type":4,"message":"用户登录名已被使用"},
		"-2":{"type":4,"message":"参数格式错误"},
		"-1":{"type":4,"message":"系统错误"},
		"0":{"type":1,"message":""},
		"1":{"type":2,"message":"保存成功"},
		"2":{"type":4,"message":"保存失败"},
		"3":{"type":2,"message":"修改成功"},
		"4":{"type":2,"message":"提交成功，等待审核！"},
		"5":{"type":2,"message":"操作成功"},
		"102":{"type":4,"message":"密码不正确"},
		"-1003":{"type":4,"message":"验证码不正确"},
		"-1002":{"type":4,"message":"没发送验证码或验证码已过期"},
		"-1001":{"type":4,"message":"手机号格式不正确"},
		"403":{"type":4,"message":"权限不足"},
		"401":{"type":5,"message":"请重新登录"},
		"406":{"type":4,"message":"请稍后重试"},
	})
	//定义系统提示编码
	//type:1 正常但不alert信息  2 正常并alert信息,  3 confirm信息  , 4 提示错误信息 5 登录错误，需要重新登录
	.constant('constHttpCode', {
		"403":{"type":4,"message":"权限不足"},
		"401":{"type":5,"message":"请重新登录"},
	});
	

/**
 * ngDialog默认属性值
 *
 */

app.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false,
        preCloseCallback: function () {
        }
    });
}]);
