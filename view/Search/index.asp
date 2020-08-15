<%@ LANGUAGE=VBScript CodePage=65001%>
<% response.charset="utf-8" %>
<% session.codepage=65001 %><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=7">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- #include file="../inc/AntiAttack.asp" -->
<!-- #include file="../inc/conn.asp" -->
<!-- #include file="../inc/web_config.asp" -->
<!-- #include file="../inc/html_clear.asp" -->
<%
search_q=request.querystring("q")
%>
<title>搜索：<%=search_q%>_FFF单机游戏下载站</title>
<meta name="keywords" content="$Class_Keywords$" />
<meta name="description" content="$Class_Description$" />
<link href="/css/MyCMSLoad/inner.css" rel="stylesheet" type="text/css" />
<link href="/css/MyCMSLoad/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/js/functions.js"></script>
<script type="text/javascript" src="/images/iepng/iepngfix_tilebg.js"></script>
<script type="text/javascript">
window.onerror=function(){return true;}
</script>
</head>

<body>
<%
keywords=split(search_q," ")
c=ubound(keywords)
for i=0 to c
if i=0 then
search_sql1=search_sql1&"where  ( [title] like '%"&keywords(i)&"%'"
keywords_all=keywords(i)
else
search_sql1=search_sql1&" or   [title] like '%"&keywords(i)&"%'"
keywords_all=keywords_all&"+"&keywords(i)
end if
next

s_sql="select [title],[content],[file_path],[time],ArticleType from [article] "&search_sql1&" )  and view_yes=1 order by [time] desc"
%>
<!--head start-->
<div id="head">
<div class='section'>
			<div class="MyInner tem_top">
				<h2><p><script language="javaScript"> 
now = new Date(),hour = now.getHours() 
if(hour < 6){document.write("夜深了，请早点休息哦，祝您晚安！")} 
else if (hour < 9){document.write("早上好！欢迎来到FFF单机游戏下载站")} 
else if (hour < 12){document.write("上午好！欢迎来到FFF单机游戏下载站")} 
else if (hour < 14){document.write("中午好！欢迎来到FFF单机游戏下载站")} 
else if (hour < 17){document.write("下午好！欢迎来到FFF单机游戏下载站")} 
else if (hour < 19){document.write("傍晚好！欢迎来到FFF单机游戏下载站")} 
else if (hour < 22){document.write("晚上好！欢迎来到FFF单机游戏下载站")} 
else {document.write("夜里好！欢迎来到FFF单机游戏下载站")} 
</script></p></h2>
				<div class="tem_top_nav">
                <a href="/Sitemap/">网站地图</a> | <a href="/old">返回旧版</a>
				</div>
			</div>
<div class="clearfix"></div>
		</div>
<!--top start -->
<div class="top">

<div class="TopLogo">
<div class="logo"><a href="/"><img src="/images/up_images/logo.png" alt="FFF单机游戏下载站"></a></div>


<div class='SearchTop'>
<div class="SearchBar">
<form method="get" action="/Search/index.asp">
				<input type="text" name="q" id="search-text" size="15" onBlur="if(this.value=='') this.value='输入关键词';" 
onfocus="if(this.value=='输入关键词') this.value='';" value="输入关键词" /><input type="submit" id="search-submit" value=" " />
			</form>
</div>
<p><strong>热门搜索:</strong><a href='/Search/index.asp?q=生化危机' target='_blank' >生化危机</a><a href='/Search/index.asp?q=使命召唤战区' target='_blank' >使命召唤战区</a><a href='/Search/index.asp?q=GTA5' target='_blank' >GTA5</a><a href='/Search/index.asp?q=骑马与砍杀2' target='_blank' >骑马与砍杀2</a></p>
</div>






<div class="clearfix"></div>

</div>

</div>
<!--top end-->
<div class="clearfix"></div>
<!--nav start-->
<div id="NavLink">
<div id="NavBG">
<!--Head Menu Start-->
<ul id='sddm'><li  class=''><a href='/'>网站首页</a></li> <li class=''><a href='/Support/' onmouseover=mopen('m2') onmouseout='mclosetime()'>PC单机游戏</a> <div id='m2' onmouseover='mcancelclosetime()' onmouseout='mclosetime()'><a href='/PC/dongzuo'>动作游戏ACT</a> <a href='/PC/sheji'>射击游戏STG</a> <a href='/PC/kongbu/'>恐怖冒险AVG</a> <a href='/PC/juese/'>角色扮演RPG</a> <a href='/PC/celue/'>策略战棋SLG</a> <a href='/PC/moni/'>模拟经营SIM</a> <a href='/PC/gedou/'>格斗游戏FTG</a> <a href='/PC/feixing/'>飞行射击FLY</a> <a href='/PC/tiyu/'>体育竞技SPG</a> <a href='/PC/saiche/'>赛车竞速RAC</a> <a href='/PC/jishi/'>即时战略RTS</a> <a href='/PC/xiuxian/'>休闲益智PUZ</a> <a href='/PC/qita/'>其他游戏ETC</a> </div></li> <li  class=''><a href='/VIP/'>高速下载通道</a></li> <li  class=''><a href='/Case/'>游戏工具</a></li> <li class=''><a href='/Course/' onmouseover=mopen('m5') onmouseout='mclosetime()'>教程资讯</a> <div id='m5' onmouseover='mcancelclosetime()' onmouseout='mclosetime()'><a href='/Course/jiaocheng'>游戏教程</a> <a href='/Course/zixun/'>游戏资讯</a> </div></li> <li  class=''><a href='/FFF/'>网站公告</a></li> </ul>
<!--Head Menu End-->
</div>
<div class="clearfix"></div>
</div>
<!--nav end-->

<div class='clearfix'></div>
</div>
<!--head end-->
<!--body start-->
<div id="body">
<!--focus start-->
<div id="FocusBG">

<div class="fullSlide">
  <div class="bd">
    <ul>
<li _src="url(/images/up_images/bg1.jpg)" style='background:#FFF center 0 no-repeat;'><a href='https://w.url.cn/s/AngkrG0' target='_blank'></a></li><li _src="url(/images/up_images/bg2.jpg)" style='background:#FFF center 0 no-repeat;'><a href='/PC/dongzuo/GTA/' target='_blank'></a></li><li _src="url(/images/up_images/bg3.jpg)" style='background:#FFF center 0 no-repeat;'><a href='https://pr.kuaifaka.com/item/Zvkqs2' target='_blank'></a></li><li _src="url(/images/up_images/bg4.jpg)" style='background:#FFF center 0 no-repeat;'><a href='/PC/dongzuo/GTA/' target='_blank'></a></li><li _src="url(/images/up_images/02.jpg)" style='background:#FFF center 0 no-repeat;'><a href='/' target='_blank'></a></li><li _src="url(/images/up_images/bg1.jpg)" style='background:#FFF center 0 no-repeat;'><a href='/' target='_blank'></a></li><li _src="url(/images/up_images/banner.jpg)" style='background:#FFF center 0 no-repeat;'><a href='/' target='_blank'></a></li>    
</ul>
  </div>
  <div class="hd">
    <ul>
    </ul>
  </div>
  <span class="prev"></span> <span class="next"></span> </div>
<script type="text/javascript">
jQuery(".fullSlide").hover(function() {
    jQuery(this).find(".prev,.next").stop(true, true).fadeTo("show", 0.5)
},
function() {
    jQuery(this).find(".prev,.next").fadeOut()
});
jQuery(".fullSlide").slide({
    titCell: ".hd ul",
    mainCell: ".bd ul",
    effect: "fold",
    autoPlay: true,
    autoPage: true,
    trigger: "click",
    startFun: function(i) {
        var curLi = jQuery(".fullSlide .bd li").eq(i);
        if ( !! curLi.attr("_src")) {
            curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
        }
    }
});
</script>


</div>
<!--focus end-->
<div class="HeightTab clearfix"></div>
<!--inner start -->
<div class="inner">
<!--left start-->
<div class="left">
<div class="Sbox">
<div class="topic2">搜索</div>
<div class="ClassNav">
<div class="NavTree">
</div>
</div>
</div>

<div class="HeightTab clearfix"></div>
<div class="Sbox">
<div class="topic">FFF单机游戏下载站</div>
<a href="/"><div class="txt ColorLink">
</div></a>
</div>

<div class="HeightTab clearfix"></div>
 
</div><!--left end-->
<!--right start-->
<div class="right">
<div class="Position"><span>你的位置：<a href="/">首页</a> > 搜索</span></div>
<div class="HeightTab clearfix"></div>
<!--main start-->
<div class="main">

<!--search content start-->
<div id="search_content" class="clearfix">

<%
if search_q<>"" then 

set rs=server.createobject("adodb.recordset")
rs.open(s_sql),cn,1,1
%>

<%'=============分页定义开始，要放在数据库打开之后
if err.number<>0 then '错误处理
response.write "数据库操作失败：" & err.description
err.clear
else
if not (rs.eof and rs.bof) then '检测记录集是否为空
r=cint(rs.RecordCount) '记录总数
rowcount = 10 '设置每一页的数据记录数，可根据实际自定义
rs.pagesize = rowcount '分页记录集每页显示记录数
maxpagecount=rs.pagecount '分页页数
page=request.querystring("page")
  if page="" then
  page=1
  end if
rs.absolutepage = page 
rcount1=0
pagestart=page-5
pageend=page+5
if pagestart<1 then
pagestart=1
end if
if pageend>maxpagecount then
pageend=maxpagecount
end if
rcount=rs.RecordCount
'=============分页定义结束%>

<!--position start-->
<div class="searchtip">您正在搜索“<span class="FontRed"><%=search_q%></span>”，找到相关信息 <span class="font_brown"><%=rcount%></span> 条</div>
<!--position end-->
<!--list start-->
<div class="result_list">
<div class="gray"></div>
<dl>

<%'===========循环体开始
do while not rs.eof and rowcount%>
<%
select case rs("ArticleType")
case 1
Content_FolderName=Article_FolderName
case 2
Content_FolderName=Product_FolderName
case 3
Content_FolderName=Case_FolderName
end select

title1=left(rs("title"),30)
for i=0 to c
title1=Replace(title1, keywords(i), "<span class='FontRed'>" & keywords(i)& "</span>")
next

content1=left(nohtml(rs("content")),110)
for i=0 to c
content1=Replace(content1,keywords(i), "<span class='FontRed'>" & keywords(i)& "</span>")
next
%>
<dt ><a href='<%="/"&Content_FolderName&"/"&rs("file_path")%>' target='_blank' title='<%=rs("title")%>'><%=title1%></a></dt>
<dd><%=content1%>...</dd>
<dd class="font12 arial font_green line"><a href='<%="/"&Content_FolderName&"/"&rs("file_path")%>' target='_blank'><span class="font_green"><%=web_url&"/"&Content_FolderName&"/"&rs("file_path")%></span></a><%=year(rs("time"))%>-<%=month(rs("time"))%>-<%=day(rs("time"))%></dd>
<%
rowcount=rowcount-1 
rs.movenext
loop
 '===========循环体结束%>

</dl>
</div>
<!--list end-->

<!--page start-->
<div class="result_page clearfix">
<!--#include file="../inc/page_list.asp"-->
</div>
<!--page end-->

<%
else
response.write "<div class='search_welcome'>很抱歉,没有找到与 <span class='FontRed'>"&search_q&"</span> 相关的信息！<p >提示：只搜索游戏名称部分内容，进行模糊搜索可获取更理想结果，如“使命”“正当防卫”“古墓丽影”。</p></div>"
end if
end if
end if%>
</div>
<!--search content end-->	

</div>
<!--main end-->
</div>
<!--right end-->
</div>
<!--inner end-->
</div>
<!--body end-->
<div class="HeightTab clearfix"></div>
<div class="footer ">
    <div class="container">
        
<div class="copyright">
           <p><a href=/>网站首页</a> | <a href=/FFF>网站公告</a> | <a href=/Sitemap>网站地图</a></p>
<p>Copyright © 2017-2020 FFF单机游戏下载站 版权所有 All Rights Reserved </p>
<p>本站资源均来自互联网，如果侵犯了您的权益请与我们联系，我们将在24小时内删除！谢谢！</p>
<script type=text/javascript src=/js/MyTop.js></script>
<script type="text/javascript">document.write(unescape("%3Cspan style='display:none;'id='cnzz_stat_icon_1278891602'%3E%3C/span%3E%3Cscript src='https://v1.cnzz.com/z_stat.php%3Fid%3D1278891602' type='text/javascript'%3E%3C/script%3E"));</script>
        </div>
        <div class="gzwm">
            <div class="attention">
            <p><img src="/images/QRCode.png" width='100' height='100'></p>
            </div>
        </div>        

        
    </div>
</div>

<script type="text/javascript" src="/js/ServiceCenter.js"></script>
</body>
</html>