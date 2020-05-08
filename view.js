var page = request("page");
var pagecount = photosr.length - 1;
if (page == "" || page == null) {
    page = 1;
} else {
    page = parseInt(page);
}
var htmlsrc = "";
function setsookie(cookieName, cookieValue) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000 * 356 * 24);
    document.cookie = cookieName + '=' + escape(cookieValue) + "; path=/;";
}
function getserver() {
    var imgserver = readcookies("imgserver");
    if (imgserver == "") {
        var j = Math.floor(Math.random() * WebimgServer.length);
        imgserver = j;
        setsookie("imgserver", j);
    } else {
        imgserver = parseInt(imgserver);
        if (imgserver > WebimgServer.length) {
            var j = Math.floor(Math.random() * WebimgServer.length);
            imgserver = j;
            setsookie("imgserver", j);
        }
    }
    return imgserver;
}
var oHead = document.getElementsByTagName('head').item(0);
var oScript = document.createElement("script");
function selectserver(j) {
    setsookie("imgserver", j);
    location.href = +viewid + ".html?page=" + page;
}
oScript.type = "text/javascript";
htmlsrc = "http://" + htmlsrc;
function getserverlist() {
    var list = "";
    var server = getserver();
    for (i = 0; i < WebimgServer.length; i++) {
        if (server == i) {
            list += "<a href=\"javascript:selectserver(" + i + ")\" class=\"img selectstrue\">√" + WebimgServer[i] + "<a>";
        } else {
            list += "<a href=\"javascript:selectserver(" + i + ")\" class=\"img selectsfalse\">" + WebimgServer[i] + "<a>";
        }
    }
    return list;
}
function gofs() { }
oScript.src = htmlsrc;
oHead.appendChild(oScript);
function getselectpage() {
    var list = "<select onchange=\"gopage(this)\">";
    for (i = 1; i < photosr.length; i++) {
        if (page == i) {
            list += "<option value=\"" + i + "\" selected=\"selected\">第" + i + "页</option>";
        } else {
            list += "<option value=\"" + i + "\">第" + i + "页</option>";
        }
    }
    list += "</select>";
    return list;
}
function gopage(obj) {
    var p = obj.value;
    location.href = +viewid + ".html?page=" + p;
}
function goprev() {
    if (page <= 1) {
        alert("当前为第一页.");
        return;
    }
    location.href = +viewid + ".html?page=" + (page - 1);
}

jQuery.noConflict();
//重载 默认JQuery  或者简洁一点用 var $j = jQuery.noConflict();   那就是使用$j
var $j = jQuery.noConflict();

function closex() {
    $j('#box').remove();
}

function gonext() {
    if (page >= pagecount) {
        $j.post('/e/extend/ret_page/index.php', {
            id: viewid
        }, function (data) {
            if (data.status == 1) {
                alert('这是最后一页了，点击“确定”进入下一话！');
                window.location = data.url;
            } else {

                $j.post('/e/extend/ret_page/html.php', {
                    dd: '123'
                }, function (data) {
                    $j('#box').remove();
                    $j('body').append(data);
                }, 'html');

            }
        }, "json");
        return;
    }
    //{location.href="/e/lastpage/?vid="+viewid+;return;}
    location.href = +viewid + ".html?page=" + (page + 1);
}

function fs() {
    var target = location.href;
    nwin = window.open("", "", "scrollbars");
    if (document.all) {
        nwin.moveTo(0, 0);
        nwin.resizeTo(screen.width, screen.height);
    }
    ; nwin.location = target;
}

function loadview() {
    var imgserver = 'http://res.img.fffimage.com/';
    $("viewpagename").innerHTML = "第" + page + "页";
    $("serverlist").innerHTML = getserverlist();
    $("viewnotice").innerHTML = "<span class='viewnotext'>&nbsp;<font color=drakred></font> <b>提示:鼠标单击图片或按左右方向键←→翻页!</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a href='/help/' class='red help' title='图片无法打开，点我查看帮助' target='_blank'>帮助</a>  <a href='/feedback/' class='red report' title='提交错误报告和举报低俗、不良漫画' target='_blank'>报错举报</a>";
    var selectpage = getselectpage();
    $("selectpage1").innerHTML = selectpage;
    $("selectpage2").innerHTML = selectpage;
    if (viewtype == "2") {
        $("viewtext").style.display = "";
        $("viewimages").style.display = "none";
        return;
    }
    var server = getserver();
    var serverurl = WebimgServerURL[server];
    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay();
    var copyRight = true;
    if (day == 0 || day == 6) {
        copyRight = false;
    } else {
        if (8 <= hour && hour <= 18) {
            copyRight = true;
        } else {
            copyRight = false;
        }
    }
    copyRight = false;
    //应广大网友要求一次性全开
    if (copyRight) {
        $("viewimages").innerHTML = '<div class="fb_pb_text">因版权商要求，该章节已经下架！</div>';
    } else {
        $("viewimages").innerHTML = "<div id=\"loading\" style=\"padding:10px;\"> <img src=\"/skin/2014mh/pic_loading.gif\" align=\"absmiddle\"> 图片载入中,请稍后...如载入时间过慢请尝试切换右上角的服务器</div><img src=\"" + imgserver + "" + photosr[page] + "\" onerror=\"setimgerror()\" onload=\"loadnextimg(this)\" onClick=\"gonext()\" alt=\"单击进入下一页\" id=\"viewimg\" style=\"cursor:hand;cursor:pointer;\"><br><img src=\"\" id=\"nextimg\" style=\"display:none;\">";
    }
    // var pageStr=$("viewpagename").innerHTML;
    // var page_num=parseInt(pageStr.substring(1));
    // if(page_num>=6){
    // 		$("viewimages").innerHTML = '<div class="fb_pb_text">继续阅读本章节，请下载扑飞APP，最新最全都免费，实时更新不用等。</div><img src="http://www.pufei8.com/skin/dh/android.png"><img src="http://www.pufei8.com/skin/dh/ios.png"><div class="fb_pb_text">浏览器(请不要使用微信)扫描二维码下载APP看扑飞漫画</div>';
    // }

}

var imgload = document.getElementById("viewimg")
function setimgerror() {
    var errortxt = comicname + " " + viewname + " 第" + page + "页\r\n\r\n十分抱歉，这张图片遗失丢了，如果按下面方法无效，请您报知管理员。\r\n\r\n您可以尝试点击上方灰色线路按钮（如电信1、电信2……等等）切换浏览。";
    $("viewimg").alt = errortxt;
}
function loadnextimg(img) {
    if (img.offsetWidth > 950) {
        $("viewimages").className = "viewimages";
        $("viewimages").style.width = img.offsetWidth + "px";
    }

    $("loading").style.display = "none";
    if (page < pagecount) {
        var imgserver = 'http://res.img.fffimage.com/';
        var server = getserver();
        var serverurl = WebimgServerURL[server];
        $("nextimg").src = imgserver + photosr[page + 1];
    }
}
loadview();

function drag(evt) {
    evt = evt || window.event;

    if (document.all && evt.button != 1) {
        return false;
    }

    oX = 2 * document.documentElement.scrollLeft;
    cX = document.documentElement.scrollLeft - evt.screenX;
    oY = 2 * document.documentElement.scrollTop;
    cY = document.documentElement.scrollTop - evt.screenY;

    if (comicPic.addEventListener) {
        comicPic.addEventListener("mousemove", moveHandler, true);
        comicPic.addEventListener("mouseup", upHandler, true);
    } else if (comicPic.attachEvent) {
        comicPic.setCapture();
        comicPic.attachEvent("onmousemove", moveHandler);
        comicPic.attachEvent("onmouseup", upHandler);
        comicPic.attachEvent("onlosecapture", upHandler);
    } else {
        var oldmovehandler = comicPic.onmousemove;
        var olduphandler = comicPic.onmouseup;
        comicPic.onmousemove = moveHandler;
        comicPic.onmouseup = upHandler;
    }

    if (evt.stopPropagation)
        evt.stopPropagation();
    else
        evt.cancelBubble = true;

    if (evt.preventDefault)
        evt.preventDefault();
    else
        evt.returnValue = false;

    if (evt.stopPropagation)
        evt.stopPropagation();
    else
        evt.cancelBubble = true;

    comicPic.style.cursor = "move";

    function moveHandler(evt) {
        mX = evt.screenX + cX;
        mY = evt.screenY + cY;
        window.scrollTo(oX - mX, oY - mY);

        if (evt.stopPropagation)
            evt.stopPropagation();
        else
            evt.cancelBubble = true;
    }

    function upHandler(evt) {
        comicPic.style.cursor = "auto";

        if (comicPic.removeEventListener) {
            comicPic.removeEventListener("mouseup", upHandler, true);
            comicPic.removeEventListener("mousemove", moveHandler, true);
        } else if (comicPic.detachEvent) {
            comicPic.detachEvent("onlosecapture", upHandler);
            comicPic.detachEvent("onmouseup", upHandler);
            comicPic.detachEvent("onmousemove", moveHandler);
            comicPic.releaseCapture();
        } else {
            comicPic.onmouseup = olduphandler;
            comicPic.onmousemove = oldmovehandler;
        }
        if (evt.stopPropagation)
            evt.stopPropagation();
        else
            evt.cancelBubble = true;
    }
}
var comicPic = document.getElementById('viewimages');
comicPic.onmousedown = function (event) {
    drag(event)
}
    ;

function dragIt() {
    if (status == 1) {
        mX = window.event.screenX + cX;
        mY = window.event.screenY + cY;
        window.scrollTo(oX - mX, oY - mY);
    }
    return false;
}
function engage() {
    chgCursor(2);
    status = 1;
    oX = 2 * document.documentElement.scrollLeft;
    cX = document.documentElement.scrollLeft - window.event.screenX;
    oY = 2 * document.documentElement.scrollTop;
    cY = document.documentElement.scrollTop - window.event.screenY;
    return false;
}
function release() {
    chgCursor(1);
    status = 0;
    return false;
}
function chgCursor(url) {
    switch (url) {
        case 1:
            {
                $("viewimg").style.cursor = handICON;
                break;
            }
        case 2:
            {
                $("viewimg").style.cursor = movICON;
                break;
            }
        default:
            {
                $("viewimg").style.cursor = handICON;
                break;
            }
    }
}
initImg();
