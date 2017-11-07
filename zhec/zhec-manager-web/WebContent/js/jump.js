/**
 * Created by shy on 2016/12/1.
 */
//localStorage.clear();//����cookie
var userToken = localStorage.userToken;
if (userToken == null || userToken == "" || undefined == userToken) {
    window.open("login.html", "_self");
}
