accessid = 'Y0V25tSW1gNTN54M';
accesskey = 'BDzemnl4Nhc0xjuMcZAVL0SeUqy3Xa';
host = 'https://lys613.oss-cn-beijing.aliyuncs.com';
var Result;
loadXMLDoc();
console.log("11111111111")

function loadXMLDoc() {
	var xmlhttp;
	if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			Result = xmlhttp.responseText;
			Result = JSON.parse(Result);
		}
	}
	xmlhttp.open("GET", constWapLapiLocation + "/oss/getsign", true);
	xmlhttp.send();
}

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

function check_object_radio() {
	var tt = document.getElementsByName('myradio');
	for(var i = 0; i < tt.length; i++) {
		if(tt[i].checked) {
			g_object_name_type = tt[i].value;
			break;
		}
	}
}

function get_dirname() {
	//document.getElementById("dirname").value = "testMoon/yue/ui";//OSS上的文件夹名字
	dir = document.getElementById("dirname").value;
	//dir = 'testMoon';//文件夹名字
	if(dir != '' && dir.indexOf('/') != dir.length - 1) {
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
	for(var i = 0; i < 3; i++) {
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
	for(i = 0; i < len; i++) {
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
	if(pos != -1) {
		suffix = filename.substring(pos)
	}
	return suffix;
}

function calculate_object_name(filename) {
	if(g_object_name_type == 'local_name') {
		//g_object_name += "${filename}"
	} else if(g_object_name_type == 'random_name') {
		suffix = get_suffix(filename)
		g_object_name = g_dirname + random_string(3) // + suffix
	}
	return ''
}

function get_uploaded_object_name(filename) {
	if(g_object_name_type == 'local_name') {
		tmp_name = g_object_name
		var arrlastname = filename.split('.');
		var lastname = arrlastname[arrlastname.length - 1];
		tmp_name = g_dirname + '.' + lastnames;
		return tmp_name
	} else if(g_object_name_type == 'random_name') {
		return g_object_name
	}
}

function set_upload_param(up, filename, ret) {
	if(filename != '') {
		suffix = get_suffix(filename)
		calculate_object_name(filename)
	}
	var arrlastname = g_object_name.split('.');
	var lastname = arrlastname[arrlastname.length - 1];
	g_object_name = g_dirname + '.' + lastnames;

	new_multipart_params = {
		'key': g_object_name,
		'policy': Result.data.policy,
		'OSSAccessKeyId': Result.data.accessid,
		'success_action_status': '200', //让服务端返回200,不然，默认会返回204
		'signature': Result.data.signature
	};

	up.setOption({
		'url': host,
		'multipart_params': new_multipart_params
	});

	up.start();
}

//-------------------------------------------------
function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
	if(!file || !/image\//.test(file.type)) return; //确保文件是图片
	if(file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
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

if(typeof(imgPath) != "undefined") {
	imgPath = [];
}
var listattr = [],
	self = 0,
	pic_list_length;
var uploader = new plupload.Uploader({
	runtimes: 'html5,flash,silverlight,html4',
	browse_button: 'selectfiles',
	//multi_selection: false,
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
		max_file_size: '400kb', //最大只能上传400kb的文件
		prevent_duplicates: true //不允许选取重复文件
	},
	container: document.getElementById('container'),
	flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
	url: 'https://oss.aliyuncs.com',

	init: {
		PostInit: function() {
			loadXMLDoc(); //////
			//alert(document.getElementById("selectfiles"));
			document.getElementById('ossfile').innerHTML = '';
			document.getElementById('postfiles').onclick = function() {

				set_upload_param(uploader, '', false);
				return false;
			};
			/*document.getElementById('postfiles').ontouchstart = function() {

				set_upload_param(uploader, '', false);
				return false;
			};*/

		},

		FilesAdded: function(up, files) {
			console.log(files)
			var filename = document.getElementById("dirname").value;
			if(filename.split("/")[2] == 'submitBill' || filename.split("/")[2] == 'prescription' || filename.split("/")[2] == 'return') {
				var pListLength = files.length;
				//uploader.files.push(file);
				if(pListLength > 5) {
					promptBox("最多上传5张!请重新选择");
					var fileslength = uploader.files.length;
					for(var i = 0; i < fileslength; i++) {
						uploader.files.splice(0, 1);
					}
					return 0;
				}
			}

			plupload.each(files, function(file) {
				var arrlastnames = file.name.split('.');
				lastnames = arrlastnames[arrlastnames.length - 1];
				file.name = 1 + '.' + lastnames;

				self++;
				listattr.push(self);

				//previewImg(file,"imgPreview");
				previewImage(file, function(imgsrc) {
					document.getElementById('ossfile').innerHTML +=
						'<div style="float:left;" class="pic_list pop_a clearfix" id="' + file.id + '">' +
						'<b></b>' +
						// '<img src="../../../img/icon1_03.png" class="pic_delete" data-val=' + file.id +
						// ' style="position: absolute;z-index: 9999;"><br/>' +
						'<a ><img onclick="showBigImg(this)" class="listview" style="width: 100px;height:86px" src="' + imgsrc + '" name="' + file.name + '" /></a>' +
						//						'<div class="progress" style="height: 15px;float:left;width: 160px;position: absolute;margin-top: -40px;margin-top: -119px;opacity: 0.6;-webkit-opacity: 0.5;-moz-opacity: 0.5;-khtml-opacity: 0.5;filter:alpha(opacity=50);"><div class="progress-bar" style="width: 0%"></div>' +
						'</div></div>';
					var filename = document.getElementById("dirname").value;
					positionChange();
					if(filename.split("/")[2] == 'prescription') {

						var pListLength = $(".pic_list").length;
						var fileslength = uploader.files.length;
						uploader.files.push(file);
						if(pListLength > 5) {
							$("#container img").show();
							promptBox("最多上传5张!请重新选择");
							positionChange();
							var fileslength = uploader.files.length;
							for(var i = 0; i < fileslength; i++) {
								uploader.files.splice(0, 1);
							}
							$(".pic_list").remove();
							$("#selectfiles").show();
							$("#container>span").css("display", "block");
							$(".moxie-shim").css("display", "block");
							$("#postfiles").hide();
							uploader.files = [];
						} else {
							var len = $(".listview").length;
							//
							$("#selectfiles").hide();
							$(".moxie-shim").css("display", "none");
							$("#container>span").css("display", "none");
							$("#postfiles").show();
							if(len < 5) {
								$("#selectfiles").show();
								$("#showOssFile").show()
							} else if(len == 5) {
								$("#selectfiles").hide();
							}
							// document.getElementById('selectfiles').style.display = "none";
						}
					}
					if(filename.split("/")[2] == 'submitBill') {
						var pListLength = $(".pic_list").length;
						uploader.files.push(file);
						if(pListLength > 5) {
							promptBox("最多上传5张!请重新选择");
							positionChange();
							var fileslength = uploader.files.length;
							for(var i = 0; i < fileslength; i++) {
								uploader.files.splice(0, 1);
							}
							$(".pic_list").remove()
							$("#selectfiles").show()
							$(".moxie-shim").css("display", "");
							$("#postfiles").hide()
						} else {
							var len = $(".listview").length;
							//$("#selectfiles").css("display", "none");
							//$(".moxie-shim").css("display", "none");
							$("#postfiles").css("display", "");
							if(len < 5) {
								//$("#selectfiles").css("display", "");
								$("#postfiles").css("display", "");
								//$(".moxie-shim").css("display", "");
							}
						}
					}
					if(filename.split("/")[2] == 'return') {
						var pListLength = $(".pic_list").length;
						uploader.files.push(file);
						if(pListLength > 5) {
							promptBox("最多上传5张!请重新选择");
							positionChange();
							var fileslength = uploader.files.length;
							for(var i = 0; i < fileslength; i++) {
								uploader.files.splice(0, 1);
							}
							$(".pic_list").remove()
							$("#selectfiles").show()
							$(".moxie-shim").css("display", "block");
							$("#postfiles").hide();

						} else {
							var len = $(".listview").length;
							$("#selectfiles").hide();
							$(".moxie-shim").css("display", "none");
							$("#postfiles").show()
							if(len < 5) {
								$("#selectfiles").show()
								$("#postfiles").show()
							}
						}
					}
				})

			});
			$(document).on('click', '.pic_list .pic_delete', function() {
				//$(this).parent().remove();
				var toremove = '';
				var id = $(this).attr("data-val");
				for(var i in files) {
					if(files[i].id === id) {
						toremove = i;
						uploader.files.splice(toremove, 1);
						$(this).parent().remove();
					}
				}
				positionChange();
				var len = $(".listview").length;

				//files.splice(toremove, 1);
				//uploader.splice(toremove, 1);
				pic_list_length = $(".pic_list").length;
				if(pic_list_length < 5) {
					$("#selectfiles").show()
					$("#postfiles").show()
				}
				if(files == "[]" || files == "") {
					$("#postfiles").hide()
					$("#selectfiles").show()
				}
				var filename = document.getElementById("dirname").value;
				if(len < 5 && filename.split("/")[2] == 'prescription') {
					$("#postfiles").show()
					if(len == 0) {
						$("#postfiles").hide();
					}
					$("#selectfiles").show();
				}
			});
		},

		BeforeUpload: function(up, file) {
			console.log(file)
			loadXMLDoc();
			check_object_radio();
			get_dirname();
			set_upload_param(up, file.name, true);
		},
		UploadProgress: function(up, file) {
			var d = document.getElementById(file.id);
			var filename = document.getElementById("dirname").value;
			if(filename.split("/")[2] == 'prescription') {
				var pListLength = $(".pic_list").length;
				d = document.getElementsByClassName("pic_list")[0];
			}
			//			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			//			var progBar = prog.getElementsByTagName('div')[0];
			//			console.dir(progBar)
			//			progBar.style.width = 2 * file.percent + 'px';
			//			console.dir(2 * file.percent + 'px')
			//			progBar.setAttribute('aria-valuenow', file.percent);
		},
		FileUploaded: function(up, file, info) {
			var filename = document.getElementById("dirname").value;
			console.log(file)
			if(info.status == 200) {
				var aa = 'https://lys613.oss-cn-beijing.aliyuncs.com/' + get_uploaded_object_name(file.name);

				var arrlastname = aa.split('.');
				var lastname = arrlastname[arrlastname.length - 1];

				//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '</br>上传到OSS成功 </br>路径:' + aa;
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<img src="../../../img/duigou.png">';
				var imgaa = '<img src="';
				imgaa += aa;
				imgaa += '" _src = "';
				imgaa += aa;
				imgaa += '">';
				if(g_dirname.split("/")[2] == 'prescription') {
					var len = $(".listview").length;
					if(len <= 5) {
						$("#selectfiles").show();
						$("#container>span").css("display", "block");
						$(".moxie-shim").css("display", "block");
						$("#postfiles").show();
						$("#container").show();
					} else {
						$("#container").hide();
						$("#selectfiles").hide();
						$(".moxie-shim").css("display", "none");
						$("#container>span").css("display", "none");
						$("#postfiles").hide();
					}
					$(".pic_delete").hide()
					$(".pic_list b").addClass("submitImg")
					prescriptionSetImgPath(aa);
				}
				if(g_dirname.split("/")[2] == 'return') {
					//$("#container").hide()
					$(".pic_delete").hide()
					$(".pic_list b").addClass("submitImg")
					setReturnImgPath(aa);
					$("#selectfiles").show();
					$(".moxie-shim").css("display", "block");
					$("#postfiles").show();
					$("#container").show();
					$(".pic_delete").hide();
					var len = $(".listview").length;
					if(len == 5) {
						$("#postfiles").hide();
					}
					$(".pic_list b").addClass("submitImg")
				}
				if(g_dirname.split("/")[2] == 'submitBill') {
					document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<img src="../../../img/duigou.png"> ';
					//$("#container").hide()
					$(".pic_delete").hide()
					$(".pic_list b").addClass("submitImg")
					setImgPathAfterSales(aa);
					$("#selectfiles").show();
					$(".moxie-shim").css("display", "block");
					$("#postfiles").show();
					$("#container").show();
					$(".pic_delete").hide();
					var len = $(".listview").length;
					if(len == 5) {
						$("#postfiles").hide();
					}
					$(".pic_list b").addClass("submitImg")

				}
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error: function(up, err) {
			document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});

uploader.init();　

function getElementLeft(element) {
	if(element == '' || element == undefined || element == null) {
		element = document.getElementById('selectfiles');
	}

	var actualLeft = element.offsetLeft;　　　　
	var current = element.offsetParent;

	while(current !== null) {　　　　　　
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	//console.log('actualLeft:' + actualLeft);
	return actualLeft;　　
}

　　
function getElementTop(element) {
	if(element == '' || element == undefined || element == null) {
		element = document.getElementById('selectfiles');
	}　　　　
	var actualTop = element.offsetTop;　　　　
	var current = element.offsetParent;

	while(current !== null) {　　　　　　
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	//console.log('actualTop:' + actualTop);
	return actualTop;
}

function positionChange() {
	var selectfilesLeft = document.getElementById('selectfiles').offsetLeft;
	$('.moxie-shim').css('left', selectfilesLeft + 'px');
	$('.moxie-shim').css('top', (getElementTop() - getElementTop(document.getElementById('container'))) + 'px');
}

function returnBigImgList() {
	var imgSrcList = [];
	var ossfile = document.getElementById("ossfile");
	for(var i = 0; i < ossfile.children.length; i++) {
		imgSrcList.push(ossfile.children[i].children[1].firstChild.src)
	}
	return imgSrcList;
}