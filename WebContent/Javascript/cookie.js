function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(cookieName) {
	console.log("verificar cookie");
    var user = getCookie(cookieName);
    if (user != "") {
        ;//console.log("you were here before");
    } else {
        user = "primeira vez";
        $('#collapseLibrary').addClass('in');
        $('#seccaodas3janelas').css({'display':'none'});
        //console.log(user);
        if (user != "" && user != null) {
            setCookie(cookieName, user, 365); //expires in 365 days
        }
    }
}