<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="Javascript/script.js"></script>
	
	<script type="text/javascript">
	
		$( document ).ready(function() {
			$('#scumDiv').css({"background-color": '#FFFFFF', "width": '960px', "height": '30px', "position": 'absolute', "top": '522px'});
		});
	
	</script>
	
	<link rel="stylesheet" type="text/css" href="CSS/base.css">

	<title>YouTube Lyrics - GP2014</title>
</head>
<body>
	<div id="scumDiv">
	</div>
	
	<div class="now_playing">
		<div class="n_p_video_container" >
	       
	    	<div class="n_p_video_play"></div>
	   
	    	<div id="ytplayer"></div>
	       
		</div>
	 
		<div class="n_p_video_progressbar">
			<div id="progressBar"><div id="newBar"></div></div>
		</div>
	</div>

</body>
</html>

