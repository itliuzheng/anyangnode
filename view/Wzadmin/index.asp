﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- #include file="../inc/access.asp" -->
<!-- #include file="inc/functions.asp" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/common.css" type="text/css" />
<title><%=gdb("select web_name from web_settings ")%> - 中英企业网站管理系统</title>
</head>
<frameset rows="50,*" frameborder="no" border="0" framespacing="0">
  <frameset cols="*" frameborder="no" border="0" framespacing="0">
  <frame src="topframe.asp" name="topFrame" frameborder="no" scrolling="No" noresize="noresize" id="topFrame" title="topFrame" />
  </frameset>
	<frameset cols="*" frameborder="no" border="0" framespacing="0">
  <frameset name="myFrame" cols="199,7,*" frameborder="no" border="0" framespacing="0">
    <frame src="leftframe.asp" name="leftFrame" frameborder="no" scrolling="No" noresize="noresize" id="leftFrame" title="leftFrame" />
	<frame src="switchframe.asp" name="midFrame" frameborder="no" scrolling="No" noresize="noresize" id="midFrame" title="midFrame" />
    <frameset rows="59,*" frameborder="no" border="0" framespacing="0">
         <frameset cols="*" frameborder="no" border="0" framespacing="0">
         <frame src="mainframe.asp" name="mainFrame" frameborder="no" scrolling="No"  noresize="noresize" id="mainFrame" title="mainFrame" />
         </frameset>
  		<frameset cols="*" frameborder="no" border="0" framespacing="0">
         <frame src="version.asp" name="manFrame" frameborder="no" id="manFrame" title="manFrame" />
     	</frameset>
     </frameset>
  </frameset>
	</frameset>
</frameset>
<noframes><body>
</body>
</noframes>
</html>
