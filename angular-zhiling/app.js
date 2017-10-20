/**
 * app定义
 *
 */

(function () {
    angular.module('managerApp', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ngResource',                   // ngResource
        'ngVerify',
        'ngDialog',
        'ngDraggable'					//拖拽
    ])
})();

