function get_dirname3() {
	dir = document.getElementById("dirname3").value;
	if(dir != '' && dir.indexOf('/') != dir.length - 1) {
		dir = dir + '/'
	}
	g_dirname = dir; //文件名字带有文件夹名字
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

var uploader3= new plupload.Uploader({
	runtimes: 'html5,flash,silverlight,html4',
	browse_button: 'selectfiles3',
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
	container: document.getElementById('container3'),
	flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
	url: 'https://oss.aliyuncs.com',
	init: {
		PostInit: function() {
			document.getElementById('ossfile3').innerHTML = '';
			document.getElementById('postfiles3').onclick = function() {
				set_upload_param(uploader3, '', false);
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
				previewImage(file, function(imgsrc) { //进度条
					document.getElementById('ossfile3').innerHTML +=
						'<div style="float:left;width: 160px;padding-top: 10px;padding-bottom: 10px;border: 1px solid #d8c7c7;text-align: center;margin: 10px;" class="pic_list3" id="' + file.id + '">' /*+ file.name*/ +
						' (' + plupload.formatSize(file.size) + ')<b></b>' +
						'<a class="pic_delete" data-val=' + file.id +
						' style="position: absolute;z-index: 9999;">删除</a><br/>' +
						'<img class="listview" style="width: 100px;height:100px" src="' + imgsrc + '" name="' + file.name + '" />' +
						'<div class="progress" style="height: 15px;float:left;width: 160px;position: absolute;margin-top: -40px;margin-top: -119px;opacity: 0.6;-webkit-opacity: 0.5;-moz-opacity: 0.5;-khtml-opacity: 0.5;filter:alpha(opacity=50);"><div class="progress-bar" style="width: 0%"></div>' +
						'</div></div>';
					var filename = document.getElementById("dirname3").value;
					if(filename.split("/")[1] == 'brand' || filename.split("/")[1] == 'topic' || filename.split("/")[1] == 'cate' || filename.split("/")[1] == 'symptoms' || filename.split("/")[1] == 'HomeBanner' || filename.split("/")[1] == 'carmodel') { //shy
						var pListLength = $(".pic_list3").length;
						$("#ossbrandimg").attr("disabled", "disabled");
						if(pListLength > 1) { 
							promptBox("图片只能上传一张！");
							var tset = setTimeout(funRemove3, 200);
							$(".pic_list3").remove();
							$("#container3").show();
							$("#ossfile3").html('');
							$("#container3>span").css("display", "block");
							$(".moxie-shim").css("display", "block");
							$("#postfiles3").hide();
						} else if(pListLength == 1) {
							$("#selectfiles3").hide();
							$("#container3>span").css("display", "none");
							$(".moxie-shim").css("display", "none");
							$("#postfiles3").show();
						}
					}
					if(filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'spec') { //shy
						var pListLength = $(".pic_list3").length;
						$("#ossbrandimg").attr("disabled", "disabled");
						if(pListLength > 1) {
							promptBox("图片只能上传一张！");
							var tsetspec = setTimeout(funRemove3, 200);
							$(".pic_list3").remove();
							$("#container3").show();
							$("#ossfile3").html('');
							$("#container3>span").css("display", "block");
							$(".moxie-shim").css("display", "block");
							$("#postfiles3").hide();
						} else if(pListLength == 1) {
							$("#container3").hide();
							$("#container3>span").css("display", "none");
							$(".moxie-shim").css("display", "none");
							$("#postfiles3").show();
						}
					}
					if(filename.split("/")[2] == 'rank') { //shy
						var pListLength = $(".pic_list3").length;
						$("#ossbrandimg").attr("disabled", "disabled");
						if(pListLength > 1) {
							promptBox("只能上传一张图片！");
							var tsetspec = setTimeout(funRemove3, 200);
							$(".pic_list3").remove();
							$("#container3").show();
							$("#ossfile3").html('');
							$("#container3>span").css("display", "block");
							$(".moxie-shim").css("display", "block");
							$("#postfiles3").hide();
						} else if(pListLength == 1) {
							$("#container3").hide();
							$("#container3>span").css("display", "none");
							$(".moxie-shim").css("display", "none");
							$("#postfiles3").show();
						}
					}
					if(filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'rotation') { //shy
						for(var i = 0; i < $('.pic_list3').length; i++) {
							if(!(isContains($('.pic_list3')[i].innerHTML, '上传成功'))) {
								document.getElementById("ifSucessShow").disabled = true;
							}
						}
					}

				})

			});
			$(document).on('click', '.pic_list3 a.pic_delete', function() {
				var toremove = '';

				var id = $(this).attr("data-val");
				for(var i in uploader3.files) {
					if(uploader3.files[i].id === id) {
						toremove = i;
						uploader3.files.splice(toremove, 1);
						$(this).parent().remove();
					}
				}
				pic_list_length = $(".pic_list3").length;

				var filename = document.getElementById("dirname3").value;
				if(filename.split("/")[1] == 'brand' || filename.split("/")[1] == 'topic' || filename.split("/")[1] == 'cate' || filename.split("/")[1] == 'symptoms' || filename.split("/")[1] == 'HomeBanner' || filename.split("/")[1] == 'carmodel') {
					$("#selectfiles3").show();
					$("#container3>span").css("display", "block");
					$(".moxie-shim").css("display", "block");
					$("#postfiles3").hide();
				}
				if(filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'spec') {
					$("#selectfiles3").show();
					$("#container3>span").css("display", "block");
					$(".moxie-shim").css("display", "block");
					$("#postfiles3").hide();
				}
				if(filename.split("/")[2] == 'rank') {
					$("#selectfiles3").show();
					$("#container3>span").css("display", "block");
					$(".moxie-shim").css("display", "block");
					$("#postfiles3").hide();
				}

				if(g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'rotation') { //shy

					disabled();
				}
			});
		},
		BeforeUpload: function(up, file) {
			check_object_radio();
			get_dirname3();
			set_upload_param(up, file.name, true);
		},

		UploadProgress: function(up, file) {
			var d = document.getElementById(file.id);
			var filename = document.getElementById("dirname3").value;
			if(filename.split("/")[1] == 'brand' || filename.split("/")[1] == 'topic' || filename.split("/")[1] == 'cate' || filename.split("/")[1] == 'symptoms' || filename.split("/")[1] == 'HomeBanner' || filename.split("/")[1] == 'carmodel') {
				$("#postfiles3").hide(); //隐藏开始上传按钮
				var pListLength = $(".pic_list3").length;
				d = document.getElementsByClassName("pic_list3")[0];
			}
			if(filename.split("/")[1] == 'goods' && filename.split("/")[3] == 'spec') { //shy
				var pListLength = $(".pic_list3").length;
				d = document.getElementsByClassName("pic_list3")[0];
			}
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0];
			progBar.style.width = 2 * file.percent + 'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded: function(up, file, info) {
			try {
				if(info.status == 200) {
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
					if(g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'rotation') { //shy

						$('.pic_delete').css("display", 'none');
						setImgInfoPath(aa);
					}
					if(g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'detail') { //shy

						$('.pic_delete').css("display", 'none');
						setContent(true, imgaa); //文章管理   富文本
					}
					if(g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'instructions') { //shy

						$('.pic_delete').css("display", 'none');
						setContent(true, imgaa); //文章管理   富文本
					}
					if(g_dirname.split("/")[1] == 'refund' && g_dirname.split("/")[3] == 'messageBoard') { //shy

						$('.pic_delete').css("display", 'none');
						setImgRefundPath(aa);
					}
					if(g_dirname.split("/")[1] == 'member' && g_dirname.split("/")[2] == 'prescription') { //shy

						$('.pic_delete').css("display", 'none');
						setImgOrderPath(aa);
					}
					if(g_dirname.split("/")[1] == 'brand') { //shy
						localStorage.setItem("ueDialogUploadImgSrc", aa);
					}
					if(g_dirname.split("/")[1] == 'brand' || g_dirname.split("/")[1] == 'cate' || g_dirname.split("/")[1] == 'symptoms') { //shy
						$('.pic_delete').css("display", 'none');
						setImgBrandPath(aa);
					}
					if(g_dirname.split("/")[1] == 'HomeBannerType') { //shy
						$('.pic_delete').css("display", 'none');
						setContent(true, imgaa); //首页管理   (首页轮播图管理--富文本)
					}
					if(g_dirname.split("/")[1] == 'HomeBanner') { //shy
						$('.pic_delete').css("display", 'none');
						setImgHomeBannerPath(aa); //首页管理   (首页轮播图管理)
					}
					if(g_dirname.split("/")[1] == 'topic') { //shy
						$('.pic_delete').css("display", 'none');
						setImgTopicPath(aa);
					}
					if(g_dirname.split("/")[1] == 'carmodel') { //shy
						$('.pic_delete').css("display", 'none');
						setImgCarModelPath(aa,3);
					}
					if(g_dirname.split("/")[1] == 'goods' && g_dirname.split("/")[3] == 'spec') { //shy
						$('.pic_delete').css("display", 'none');
						setImgGoodsSpecPath(aa);
					}
					if(g_dirname.split("/")[1] == 'articles' && g_dirname.split("/")[3] == 'detail') { //shy

						$('.pic_delete').css("display", 'none');
						setContent(true, imgaa); //文章管理   富文本
					}
					if(g_dirname.split("/")[1] == 'web' && g_dirname.split("/")[3] == 'advert') { //shy
						$('.pic_delete').css("display", 'none');
						setImgAdverPath(aa); //
					}
					if(g_dirname.split("/")[2] == 'rank') { //shy
						$('.pic_delete').css("display", 'none');
						setImgRankPath(aa); //
					}
				} else {
					document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				}
			} catch(e) {
				//TODO handle the exception
			}
		},

		Error: function(up, err) {
			document.getElementById('console3').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});

uploader3.init();

function funRemove3() {
	$(".pic_list3").remove();
	$("#container3").show();
	$("#ossfile3").html('');
	$("#container3>span").css("display", "block");
	$(".moxie-shim").css("display", "block");
	$("#postfiles3").hide();
}