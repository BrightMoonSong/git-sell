/**
 * Created by shy on 2016/12/15.
 */
/**
 * 设置cookie值的函数
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function setCookieTime(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
/**
 * 获取 cookie 值的函数
 * @param cname
 * @returns {*}
 */
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
/**
 * 删除对应cookie
 * @param cname
 */
function delCookie(cname){
  document.cookie = cname+"="+cname+"; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
/**
 * 检测 cookie 值的函数   测试的方法
 */
function checkCookie()
{
  var username=getCookie("username");
  if (username!="")
  {
    alert("Welcome again " + username);
  }
  else
  {
    username = prompt("Please enter your name:","");
    if (username!="" && username!=null)
    {
      setCookie("username",username,1);
    }
  }
}
//checkCookie();
//delCookie("username","username");
