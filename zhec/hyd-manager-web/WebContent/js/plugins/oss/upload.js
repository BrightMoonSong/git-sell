accessid = 'Y0V25tSW1gNTN54M';
accesskey = 'BDzemnl4Nhc0xjuMcZAVL0SeUqy3Xa';
host = 'https://zhydl.oss-cn-beijing.aliyuncs.com';
var Result;

function loadXMLDoc() {
  var xmlhttp;
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      Result = xmlhttp.responseText;
      Result = JSON.parse(Result);
    }
  }
  var configurl = constMapiLocation + "/oss/getsign";
  //configurl = yanzhengurl(configurl);
  xmlhttp.open("GET", configurl, true);
  xmlhttp.send();
}
loadXMLDoc();

function yanzhengurl(configurl) {
  if (configurl.indexOf('userToken') < 0) { //判断是否已经加上userToken
    if (configurl.indexOf('?') < 0) {
      configurl += "?userToken=" + localStorage.userToken;
    } else {
      configurl += "&userToken=" + localStorage.userToken;
    }
  }
  if (configurl.indexOf('funcId') < 0) { //判断是否已经加上 funcId
    if (configurl.indexOf('?') < 0) {
      configurl += "?funcId=" + localStorage.funcId;
    } else {
      configurl += "&funcId=" + localStorage.funcId;
    }
  }
  return configurl;
}
//签名  5分钟失效    4.5分钟请求一次       一分钟=60000毫秒  4.5*6=27
setInterval("loadXMLDoc()", 270000);

g_dirname = ''
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000;

var policyText = {
  "expiration": "2030-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
  "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
  ]
};

function check_object_radio() { //上传文件名字保持本地文件名字  true      上传文件名字是随机文件名
  var tt = document.getElementsByName('myradio');
  for (var i = 0; i < tt.length; i++) {
    if (tt[i].checked) {
      g_object_name_type = tt[i].value;
      break;
    }
  }
}

if (isContains(getLocationHref(), 'sysuserlist')) {
  var ueditorUploadDirName = localStorage.ueditorUploadDirName;
  if (ueditorUploadDirName) {
    document.getElementById("dirname").value = ueditorUploadDirName;
  }
}

function get_dirname() {
  //document.getElementById("dirname").value = "testMoon/yue/ui";//OSS上的文件夹名字

  dir = document.getElementById("dirname").value;
  //	localStorage.removeItem("userId");
  //	localStorage.setItem("ueditorUploadDirName", result.data.userToken);
  //dir = 'testMoon';//文件夹名字
  if (dir != '' && dir.indexOf('/') != dir.length - 1) {
    dir = dir + '/'
  }
  g_dirname = dir; //文件名字带有文件夹名字
  ////////////////////////////////////////////////////////
  var oDate = new Date(); //实例一个时间对象；
  oDate.getFullYear(); //获取系统的年；
  oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
  oDate.getDate(); //获取系统日，
  oDate.getHours(); //获取系统时，
  oDate.getMinutes(); //分
  oDate.getSeconds(); //秒
  var yearSec = '' + oDate.getFullYear() + (oDate.getMonth() + 1) + oDate.getDate() + oDate.getHours() + oDate.getMinutes() + oDate.getSeconds();
  var rand = "";
  for (var i = 0; i < 3; i++) {
    var r = Math.floor(Math.random() * 10);
    rand += r;
  }
  g_dirname += yearSec + rand;
}

function random_string(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
var lastnames;

function get_suffix(filename) {
  pos = filename.lastIndexOf('.');
  var arr = filename.split('.');
  lastnames = arr[arr.length - 1];
  suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix;
}

function calculate_object_name(filename) { //因为写死了 radio隐藏了所以这个方法没用（上传文件名字保持本地文件名字）
  if (g_object_name_type == 'local_name') { //上传文件名字保持本地文件名字
    //g_object_name += "${filename}"
  } else if (g_object_name_type == 'random_name') { //上传文件名字是随机文件名
    suffix = get_suffix(filename)
    g_object_name = g_dirname + random_string(3) // + suffix
  }
  return ''
}

function get_uploaded_object_name(filename) { //得到上传的文件的名字
  if (g_object_name_type == 'local_name') { //上传文件名字保持本地文件名字
    tmp_name = g_object_name
    //tmp_name = tmp_name.replace("${filename}", filename);
    var arrlastname = filename.split('.');
    var lastname = arrlastname[arrlastname.length - 1];
    tmp_name = g_dirname + '.' + lastnames;
    return tmp_name
  } else if (g_object_name_type == 'random_name') { //上传文件名字是随机文件名
    return g_object_name
  }
}

function set_upload_param(up, filename, ret) { //设置上传的参数
  //g_object_name = g_dirname + '.jpg';
  if (filename != '') {
    suffix = get_suffix(filename)
    calculate_object_name(filename)
  }

  var arrlastname = g_object_name.split('.');
  var lastname = arrlastname[arrlastname.length - 1];
  g_object_name = g_dirname + '.' + lastnames;

  new_multipart_params = { //多个参数
    'key': g_object_name,
    'policy': Result.data.policy,
    'OSSAccessKeyId': Result.data.accessid,
    'success_action_status': '200', //让服务端返回200,不然，默认会返回204
    'signature': Result.data.signature
  };

  up.setOption({ //设置选项
    'url': host,
    'multipart_params': new_multipart_params
  });

  up.start();
}

//-------------------------------------------------
function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
  if (!file || !/image\//.test(file.type)) return; //确保文件是图片
  if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
    var fr = new mOxie.FileReader();
    fr.onload = function() {
      callback(fr.result);
      fr.destroy();
      fr = null;
    }
    fr.readAsDataURL(file.getSource());
  } else {
    var preloader = new mOxie.Image();
    preloader.onload = function() {
      //preloader.downsize(550, 400);//先压缩一下要预览的图片,宽300，高300
      var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
      callback && callback(imgsrc); //callback传入的参数为预览图片的url
      preloader.destroy();
      preloader = null;
    };
    preloader.load(file.getSource());
  }
}
//----------------------

if (typeof(imgPath) != "undefined") {
  imgPath = []; //图片路径集合
}
var listattr = [],
  self = 0,
  pic_list_length;
var uploader = new plupload.Uploader({
  runtimes: 'html5,flash,silverlight,html4',
  browse_button: 'selectfiles',
  //multi_selection: false,
  //设置上传文件过滤条件
  //设置上传只能上传图片，上传文件的大小，不能有重复上传等。这时可以利用filters参数。
  filters: {
    mime_types: [ //只允许上传图片和zip文件
      {
        title: "Image files",
        extensions: "jpg,gif,png,bmp"
      }
      /*, {
      				title: "Zip files",
      				extensions: "zip"
      			}*/
    ],
    max_file_size: '800kb', //最大只能上传800kb的文件
    prevent_duplicates: true //不允许选取重复文件
  },
  container: document.getElementById('container'),
  flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
  silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
  url: 'https://oss.aliyuncs.com',

  init: {
    PostInit: function() {
      document.getElementById('ossfile').innerHTML = '';
      document.getElementById('postfiles').onclick = function() {
        set_upload_param(uploader, '', false);
        return false;
      };
    },

    FilesAdded: function(up, files) {
      plupload.each(files, function(file) {
        var arrlastnames = file.name.split('.');
        lastnames = arrlastnames[arrlastnames.length - 1];
        file.name = 1 + '.' + lastnames;

        self++;
        listattr.push(self);

        //previewImg(file,"imgPreview");
        previewImage(file, function(imgsrc) { //进度条
          document.getElementById('ossfile').innerHTML +=
            /*$('#ossfile').html($('#ossfile').html() +*/
            '<div style="float:left;width: 160px;padding-top: 10px;padding-bottom: 10px;border: 1px solid #d8c7c7;text-align: center;margin: 10px;" class="pic_list" id="' + file.id + '">' /*+ file.name*/ +
            ' (' + plupload.formatSize(file.size) + ')<b></b>' +
            '<a class="pic_delete" data-val=' + file.id +
            ' style="position: absolute;z-index: 9999;">删除</a><br/>' +
            '<img class="listview" style="width: 100px;height:100px" src="' + imgsrc + '" name="' + file.name + '" />' +
            '<div class="progress" style="height: 15px;float:left;width: 160px;position: absolute;margin-top: -40px;margin-top: -119px;opacity: 0.6;-webkit-opacity: 0.5;-moz-opacity: 0.5;-khtml-opacity: 0.5;filter:alpha(opacity=50);"><div class="progress-bar" style="width: 0%"></div>' +
            '</div></div>';
          var filename = document.getElementById("dirname").value;
          if (filename.split("/")[1] == 'brand' || filename.split("/")[1] == 'topic' || filename.split("/")[1] == 'cate' || filename.split("/")[1] == 'symptoms' || filename.split("/")[1] == 'HomeBanner' || filename.split("/")[1] == 'carmodel') { //shy
            var pListLength = $(".pic_list").length;
            $("#ossbrandimg").attr("disabled", "disabled");
            if (pListLength > 1) {
              promptBox("图片只能上传一张！");
              //files = [];
              /*listattr = [];
              self = 0;
              //uploader.files=[];
              uploader.removeFile(file);*/
              var tset = setTimeout(funRemove, 200);
              $(".pic_list").remove();
              $("#selectfiles").show();
              $("#ossfile").html('');
              $("#container>span").css("display", "block");
              $(".moxie-shim").css("display", "block");
              $("#postfiles").hide();
            } else if (pListLength == 1) {
              $("#selectfiles").hide();
              $("#container>span").css("display", "none");
              $(".moxie-shim").css("display", "none");
              $("#postfiles").show();
            }
						// 选择完图片直接上传
						// setTimeout('set_upload_param(uploader, "", false)', 100);
          }
          if (filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'spec') { //shy
            var pListLength = $(".pic_list").length;
            $("#ossbrandimg").attr("disabled", "disabled");
            if (pListLength > 1) {
              promptBox("图片只能上传一张！");
              var tsetspec = setTimeout(funRemove, 200);
              $(".pic_list").remove();
              $("#selectfiles").show();
              $("#ossfile").html('');
              $("#container>span").css("display", "block");
              $(".moxie-shim").css("display", "block");
              $("#postfiles").hide();
            } else if (pListLength == 1) {
              $("#selectfiles").hide();
              $("#container>span").css("display", "none");
              $(".moxie-shim").css("display", "none");
              $("#postfiles").show();
            }
          }
          if (filename.split("/")[2] == 'rank') { //shy
            var pListLength = $(".pic_list").length;
            $("#ossbrandimg").attr("disabled", "disabled");
            if (pListLength > 1) {
              promptBox("只能上传一张图片！");
              var tsetspec = setTimeout(funRemove, 200);
              $(".pic_list").remove();
              $("#selectfiles").show();
              $("#ossfile").html('');
              $("#container>span").css("display", "block");
              $(".moxie-shim").css("display", "block");
              $("#postfiles").hide();
            } else if (pListLength == 1) {
              $("#selectfiles").hide();
              $("#container>span").css("display", "none");
              $(".moxie-shim").css("display", "none");
              $("#postfiles").show();
            }
          }
          if (filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'rotation') { //shy
            for (var i = 0; i < $('.pic_list').length; i++) {
              if (!(isContains($('.pic_list')[i].innerHTML, '上传成功'))) {
                document.getElementById("ifSucessShow").disabled = true;
              }
            }
          }

        })

      });
      $(document).on('click', '.pic_list a.pic_delete', function() {
        //$(this).parent().remove();
        var toremove = '';

        var id = $(this).attr("data-val");
        for (var i in uploader.files) {
          if (uploader.files[i].id === id) {
            toremove = i;
            uploader.files.splice(toremove, 1);
            $(this).parent().remove();
          }
        }
        pic_list_length = $(".pic_list").length;

        var filename = document.getElementById("dirname").value;
        if (filename.split("/")[1] == 'brand' || filename.split("/")[1] == 'topic' || filename.split("/")[1] == 'cate' || filename.split("/")[1] == 'symptoms' || filename.split("/")[1] == 'HomeBanner' || filename.split("/")[1] == 'carmodel') {
          $("#selectfiles").show();
          $("#container>span").css("display", "block");
          $(".moxie-shim").css("display", "block");
          $("#postfiles").hide();
        }
        if (filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'spec') {
          $("#selectfiles").show();
          $("#container>span").css("display", "block");
          $(".moxie-shim").css("display", "block");
          $("#postfiles").hide();
        }
        if (filename.split("/")[2] == 'rank') {
          $("#selectfiles").show();
          $("#container>span").css("display", "block");
          $(".moxie-shim").css("display", "block");
          $("#postfiles").hide();
        }

        if (g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'rotation') { //shy

          disabled();
        }
      });
    },
    /*
    		FilesAdded: function(up, files) {//进度条
    			plupload.each(files, function(file) {
    				document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
    				+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
    				+'</div>';
    			});
    		},*/

    BeforeUpload: function(up, file) {
      check_object_radio();
      get_dirname();
      set_upload_param(up, file.name, true);
    },

    UploadProgress: function(up, file) {
      var d = document.getElementById(file.id);
      var filename = document.getElementById("dirname").value;
      if (filename.split("/")[1] == 'brand' || filename.split("/")[1] == 'topic' || filename.split("/")[1] == 'cate' || filename.split("/")[1] == 'symptoms' || filename.split("/")[1] == 'HomeBanner' || filename.split("/")[1] == 'carmodel') {
        $("#postfiles").hide(); //隐藏开始上传按钮
        var pListLength = $(".pic_list").length;
        d = document.getElementsByClassName("pic_list")[0];
      }
      if (filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'spec') { //shy
        var pListLength = $(".pic_list").length;
        d = document.getElementsByClassName("pic_list")[0];
      }
      d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
      var prog = d.getElementsByTagName('div')[0];
      var progBar = prog.getElementsByTagName('div')[0];
      progBar.style.width = 2 * file.percent + 'px';
      progBar.setAttribute('aria-valuenow', file.percent);
    },

    FileUploaded: function(up, file, info) {
      try {
        if (info.status == 200) {
          var aa = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + get_uploaded_object_name(file.name);
          var arrlastname = aa.split('.');
          var lastname = arrlastname[arrlastname.length - 1];
          //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '</br>上传成功 </br>路径:' + aa;
          document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '</br>上传成功 </br>';
          var imgaa = '<img src="';
          imgaa += aa;
          imgaa += '" _src = "';
          imgaa += aa;
          imgaa += '">';
          if (g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'rotation') { //shy

            $('.pic_delete').css("display", 'none');
            setImgInfoPath(aa);
          }
          if (g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'detail') { //shy

            $('.pic_delete').css("display", 'none');
            setContent(true, imgaa); //文章管理   富文本
          }
          if (g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'instructions') { //shy

            $('.pic_delete').css("display", 'none');
            setContent(true, imgaa); //文章管理   富文本
          }
          if (g_dirname.split("/")[1] == 'refund' && g_dirname.split("/")[3] == 'messageBoard') { //shy

            $('.pic_delete').css("display", 'none');
            setImgRefundPath(aa);
          }
          if (g_dirname.split("/")[1] == 'member' && g_dirname.split("/")[2] == 'prescription') { //shy

            $('.pic_delete').css("display", 'none');
            setImgOrderPath(aa);
          }
          if (g_dirname.split("/")[1] == 'brand') { //shy
            localStorage.setItem("ueDialogUploadImgSrc", aa);
          }
          if (g_dirname.split("/")[1] == 'brand' || g_dirname.split("/")[1] == 'cate' || g_dirname.split("/")[1] == 'symptoms') { //shy
            $('.pic_delete').css("display", 'none');
            setImgBrandPath(aa);
          }
          if (g_dirname.split("/")[1] == 'carmodel') { //shy
            $('.pic_delete').css("display", 'none');
						singleImgUploadFun(aa);
            setImgCarModelPath(aa, 1);
          }
          if (g_dirname.split("/")[1] == 'HomeBannerType') { //shy
            $('.pic_delete').css("display", 'none');
            setContent(true, imgaa); //首页管理   (首页轮播图管理--富文本)
          }
          if (g_dirname.split("/")[1] == 'HomeBanner') { //shy
            $('.pic_delete').css("display", 'none');
            setImgHomeBannerPath(aa); //首页管理   (首页轮播图管理)
          }
          if (g_dirname.split("/")[1] == 'topic') { //shy
            $('.pic_delete').css("display", 'none');
            setImgTopicPath(aa);
          }
          if (g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'spec') { //shy
            $('.pic_delete').css("display", 'none');
            setImgGoodsSpecPath(aa);
          }
          if (g_dirname.split("/")[1] == 'articles' && g_dirname.split("/")[3] == 'detail') { //shy

            $('.pic_delete').css("display", 'none');
            setContent(true, imgaa); //文章管理   富文本
          }
          if (g_dirname.split("/")[1] == 'web' && g_dirname.split("/")[3] == 'advert') { //shy
            $('.pic_delete').css("display", 'none');
            setImgAdverPath(aa); //
          }
          if (g_dirname.split("/")[2] == 'rank') { //shy
            $('.pic_delete').css("display", 'none');
            setImgRankPath(aa); //
          }
        } else {
          document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
        }
      } catch (e) {
        //TODO handle the exception
      }
    },

    Error: function(up, err) {
      document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
    }
  }
});

uploader.init();

/**
 * 公共弹出框
 */
function promptBox(promptMessage) {
  var dialog = jDialog.dialog({
    title: '提示',
    content: promptMessage,
    buttons: [{
      type: 'highlight',
      text: '确认',
      handler: function(button, dialog) {
        dialog.close();
      }
    }]
  })
}

function funRemove() {
  $(".pic_list").remove();
  $("#selectfiles").show();
  $("#ossfile").html('');
  $("#container>span").css("display", "block");
  $(".moxie-shim").css("display", "block");
  $("#postfiles").hide();
}

function getLocationHref() {
  var url = document.location.href;
  var s = url.split('#');
  return s[1];
}
