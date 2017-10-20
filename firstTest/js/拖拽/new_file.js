/******************************************
*作者:hjwen
*电邮:hjwen88@126.com
*版本：1.0
*版权许可：中国通用开源许可协议V1.0
*说明：可拖动组件定义 
******************************************/
(function ($) {
    /******渲染目标*******/
    /********拖拽： mousedown -- > mousemove --->mouseup ************/
    function renderHtml(target) {
        var settings = target.data('settings');
        target.css("position", "absolute");
        settings.dragArea.css("position", "relative");
        var offset;
        if (settings.isWindows) {//如果拖动范围是window，则需要将对象放置在body下
            offset = target.offset();
            target.css({ top: offset.top, left: offset.left });
            target.appendTo(settings.dragArea);            
        }        
        var areawith = settings.dragArea.innerWidth();
        var areaheight = settings.dragArea.innerHeight();
        var targetwidth = target.innerWidth();
        var targeheight = target.innerHeight();
        var proxy = null;
        /*****************低版本ie鼠标捕获特性处理**********************/
        var isCapture=false;
        if (typeof settings.mousedownObj[0].setCapture != 'undefined') {
            isCapture = true;
        }
        settings.mousedownObj.css("cursor", "move");
        settings.mousedownObj.bind("mousedown", function (e) {
            if (isCapture) {
                settings.mousedownObj[0].setCapture();
            }
            //计算拖动范围
            var offset = target.position();        
            var finalleft =target.css('left');
            var finaltop = target.css('top');            
            if (settings.proxy) {//创建空代理                
                proxy = $("<div style=\"cursor:move;position: absolute; background:#C9C4F5; height: " + targeheight + "px; width:" + targetwidth + "px; opacity: 0.85;top:" + finaltop + ";left:" + finalleft + ";filter:alpha(opacity=85) \"></div>").insertAfter(target);
            }
            e.preventDefault();
            var diffX = e.clientX - offset.left;
            var diffY = e.clientY - offset.top;
            if (typeof settings.onStart === 'function') {
                settings.onStart({ top: offset.top, left: offset.left });
            }
            settings.dragArea.bind("mousemove", function (e) { 
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
                if (left < 0) {
                    left = 0;
                } else {
                    var w =areawith - targetwidth;
                    if (left > w)
                        left = w;
                }
                if (top < 0) {
                    top = 0;
                } else {
                    var h = areaheight - targeheight;
                    if (top > h)
                        top = h;
                }
                if (settings.proxy) {
                    finalleft = left;
                    finaltop = top;
                    proxy.css({ left: left + "px", top: top + "px" });
                } else {                    
                    target.css({ left: left + "px", top: top + "px" });
                }
                if (typeof settings.onDraging === 'function') {
                    settings.onDraging({ top: top, left: left });
                }
            });
            settings.dragArea.bind("mouseup", function (e) {
                settings.dragArea.unbind("mousemove");
                settings.dragArea.unbind("mouseup");               
                if (settings.proxy) {
                    proxy.remove();
                    proxy = null;
                    target.css({ left: finalleft + "px", top: finaltop + "px" });
                }
                if (isCapture) {
                    settings.mousedownObj[0].releaseCapture();
                }
                if (typeof settings.onStop === 'function') {
                    settings.onStop({ top: finaltop, left: finalleft });
                }
            });
        });
    };
    /************私有方法********************/
    /**********私有方法结束*******************/
    var methods = {        
        init: function (options) {
            if (typeof options == 'undefined')
                options = {};
            return this.each(function () {
                var $this = $(this);                
                if (typeof options.dragArea != 'undefined') {
                    options.isWindows = false;
                    if (typeof options.dragArea == 'string') {
                        options.dragArea = $("#" + options.dragArea);
                    }
                } else {
                    options.isWindows = true;
                }               
                if (typeof options.mousedownObj == 'string') {
                    options.mousedownObj = $("#" + options.mousedownObj);
                }
                $.fn.draggable.defaults.mousedownObj = $this;
                $.fn.draggable.defaults.dragArea = $(window.top.document.body);
                var settings = $this.data('settings');
                if (typeof settings == 'undefined') {
                    settings = $.extend({}, $.fn.draggable.defaults, options);
                    $this.data('settings', settings);
                } else {
                    settings = $.extend({}, settings, options);
                }
                //创建ui布局
                renderHtml($this);
                if ($.myui.isDebug) {
                    $.myui.log("jQuery.draggable init finish......");
                }
            });
        },
        destroy: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                $this.removeData('settings');
            });
        }
    };
    /*****
    *options= { mousedownObj: null,//鼠标按下对象/id，默认是拖动对象本身
        proxy:true,//创建一个代理拖动对象，性能较好
        dragArea: null, //默认拖动范围对象/Id，不设置则为最顶层window（考虑到有iframe的情况）
        onStart:function(params){},//开始拖动 params={top:x,left:y}
        onDraging: function (params) { },//拖动中params={top:x,left:y}
        onStop: function (params) { }//结束拖动params={top:x,left:y}
        }
    *****/
    $.fn.draggable = function (dragArea) {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            if ($.myui.isDebug) {
                $.myui.log("jQuery.draggable init.....");
            }
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.draggable');
            return this;
        }
        return method.apply(this, arguments);
    };
    //默认值
    $.fn.draggable.defaults = {
        mousedownObj: null,//鼠标按下对象/id，默认是拖动对象本身
        proxy:true,//创建一个代理拖动对象，性能较好
        dragArea: null, //默认拖动范围对象/Id，不设置则为最顶层window（考虑到有iframe的情况）
        onStart:null,//开始拖动
        onDraging:null,//拖动中
        onStop: null//结束拖动
    };
})(jQuery);