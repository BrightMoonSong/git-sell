/**
 * Created by shy on 2016/12/1.
 */
 var userToken = localStorage.dataLogin;
 if (userToken == null || userToken == "" || undefined == userToken) {
     window.open("login.html", "_self");
 }
 function exitLogin(){
    localStorage.removeItem("dataLogin");
    window.open("login.html", "_self");
}