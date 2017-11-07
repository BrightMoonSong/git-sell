
//富文本
//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
//var ue = UE.getEditor('editor');


//编辑器是否获得焦点
function isFocus(e) {
	alert(UE.getEditor('editor').isFocus());
	UE.dom.domUtils.preventDefault(e)
}
//编辑器失去焦点
function setblur(e) {
	UE.getEditor('editor').blur();
	UE.dom.domUtils.preventDefault(e)
}
//插入给定的内容
function insertHtml() {
	var value = prompt('插入html代码', '');
	UE.getEditor('editor').execCommand('insertHtml', value)
}
//创建编辑器
function createEditor() {
	enableBtn();
	UE.getEditor('editor');
}
//获得整个html的内容
function getAllHtml() {
	alert(UE.getEditor('editor').getAllHtml())
}
//获得内容--
//返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，
//然后把这些字符串连接起来，在两个元素之间插入 separator 字符串而生成的。
function getContent() {
	var arr = [];
	arr.push(UE.getEditor('editor').getContent());
	//return arr.join("\n");
	return UE.getEditor('editor').getContent();
}
//获得带格式的纯文本
function getPlainTxt() {
	var arr = [];
	arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
	arr.push("内容为：");
	arr.push(UE.getEditor('editor').getPlainTxt());
	alert(arr.join('\n'))
}
/**
 * isAppendTo=true时-追加内容，不传时-写入内容
 * @param {Object} isAppendTo
 * @param {Object} value --追加（写入）的内容
 */
function setContent(isAppendTo,value) {
	var arr = [];
	arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
	UE.getEditor('editor').setContent(value, isAppendTo);
	//alert(arr.join("\n"));
}
//不可编辑
function setDisabled() {
	UE.getEditor('editor').setDisabled('fullscreen');
	disableBtn("enable");
}
//可以编辑
function setEnabled() {
	UE.getEditor('editor').setEnabled();
	enableBtn();
}
//获得当前选中的文本
function getText() {
	//当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
	var range = UE.getEditor('editor').selection.getRange();
	range.select();
	var txt = UE.getEditor('editor').selection.getText();
	alert(txt)
}
//获的纯文本
function getContentTxt() {
	var arr = [];
	arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
	arr.push("编辑器的纯文本内容为：");
	arr.push(UE.getEditor('editor').getContentTxt());
	alert(arr.join("\n"));
}
//判断是否有内容
function hasContent() {
	var arr = [];
	arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
	arr.push("判断结果为：");
	arr.push(UE.getEditor('editor').hasContents());
	alert(arr.join("\n"));
}
//使编辑器获得焦点
function setFocus() {
	UE.getEditor('editor').focus();
}
//删除编辑器
function deleteEditor() {
	disableBtn();
	UE.getEditor('editor').destroy();
}
//
function disableBtn(str) {
	var div = document.getElementById('btns');
	var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
	for(var i = 0, btn; btn = btns[i++];) {
		if(btn.id == str) {
			UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
		} else {
			btn.setAttribute("disabled", "true");
		}
	}
}

function enableBtn() {
	var div = document.getElementById('btns');
	var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
	for(var i = 0, btn; btn = btns[i++];) {
		UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
	}
}
//获取草稿箱内容
function getLocalData() {
	alert(UE.getEditor('editor').execCommand("getlocaldata"));
}
//清空草稿箱
function clearLocalData() {
	UE.getEditor('editor').execCommand("clearlocaldata");
	alert("已清空草稿箱")
}
/*
 <!--
<div>
	<h1>完整demo</h1>
	<script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
</div>
<div id="btns">
	<div>
		<button onclick="getAllHtml()">获得整个html的内容</button>
		<button onclick="getContent()">获得内容</button>
		<button onclick="setContent()">写入内容</button>
		<button onclick="setContent(true)">追加内容</button>
		<button onclick="getContentTxt()">获得纯文本</button>
		<button onclick="getPlainTxt()">获得带格式的纯文本</button>
		<button onclick="hasContent()">判断是否有内容</button>
		<button onclick="setFocus()">使编辑器获得焦点</button>
		<button onmousedown="isFocus(event)">编辑器是否获得焦点</button>
		<button onmousedown="setblur(event)">编辑器失去焦点</button>

	</div>
	<div>
		<button onclick="getText()">获得当前选中的文本</button>
		<button onclick="insertHtml()">插入给定的内容</button>
		<button id="enable" onclick="setEnabled()">可以编辑</button>
		<button onclick="setDisabled()">不可编辑</button>
		<button onclick=" UE.getEditor('editor').setHide()">隐藏编辑器</button>
		<button onclick=" UE.getEditor('editor').setShow()">显示编辑器</button>
		<button onclick=" UE.getEditor('editor').setHeight(300)">设置高度为300默认关闭了自动长高</button>
	</div>

	<div>
		<button onclick="getLocalData()">获取草稿箱内容</button>
		<button onclick="clearLocalData()">清空草稿箱</button>
	</div>

</div>
<div>
	<button onclick="createEditor()">
    创建编辑器</button>
	<button onclick="deleteEditor()">
    删除编辑器</button>
</div>-->
 */