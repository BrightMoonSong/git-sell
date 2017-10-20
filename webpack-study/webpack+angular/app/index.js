var angular = require('angular'); //引入 angular
var oclazyload = require('./js/plugins/oclazyload/oclazyload.min.js'); //引入 oclazyload
var uiRouter = require('./js/plugins/ui-router/angular-ui-router.min.js'); //引入 angular-ui-router

var ngModule = angular.module('app', [oclazyload,uiRouter]); //定义一个angular模块
require('./directives/hello-world/hello-world.js')(ngModule); //引入指令(directive)文件

//引入样式文件
require('./font-awesome/css/font-awesome.css');
require('./css/bootstrap.min.css');
require('./css/animate.css');
require('./css/style.css');
require('./css/main.css');
require('./css/ngVerify.css');
require('./css/plugins/ngDialog/ngDialog.min.css');
require('./css/plugins/ngDialog/ngDialog-theme-default.min.css');
require('./css/plugins/jDialog/jDialog.css');

//js
require('./js/router.js'); //引入 router
