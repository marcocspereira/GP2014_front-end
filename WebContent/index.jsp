<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>  
<head>   
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="Javascript/script.js"></script>
	<script type="text/javascript" src="Javascript/cookie.js"></script>
	
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:400">
	<link rel="stylesheet" type="text/css" href="CSS/base.css">
	<link rel="stylesheet" type="text/css" href="font-awesome-4.2.0/css/font-awesome.min.css">
	
	<title>YouTube Lyrics - GP2014</title>     
	<script type="text/javascript">
		$( document ).ready(function() {		
			//document.cookie = "tourVerify=; expires=Thu, 01 Jan 1970 00:00:00 UTC";//delete cookie
			checkCookie("tourVerify");
			
			$('#feedbackB').click(function(){
				//alert("hello");
				$("#cover").fadeIn(500);
				$("#feedbackDiv").fadeIn(1000);
				
			});
			
			$('#closeFeedb').click(function(){
				$("#feedbackDiv").fadeOut(500); //after done.
				$("#cover").fadeOut(1000); //after done.
				
				
			});
			
		});
	</script>
	
	<style type="text/css">
	
		body {
        	font-family: 'Open Sans', sans-erif;
        }
	
		#cover {
		   position: absolute;
		   top: 0;
		   left: 0;
		   right: 0;
		   bottom: 0;
		   opacity: 0.80;
		   background: #aaa;
		   z-index: 10;
		   display: none;
		}
		
		#feedbackDiv {
		 	position: absolute;
		 	top: 20px;
			left: 100px;
			width: 300px;
			height: 100px;
			background: #FFFFFF;
			z-index : 50;
			display: none;
		}		
	</style>
	
 
	
</head>
<body>

	<!-- caixa de feedback ao utilizador -->
	<span id="feedbackB"><i class="fa fa-cog fa-spin"></i> Background activities... <i class="fa fa-cog"></i></span>
	<!-- <button id="feedbackB">Disable</button> -->
	<div id="feedbackDiv">
		<button id="closeFeedb">Close</button>
	</div>
	
	
	
	<!-- barra usada para cobrir os controls do youtube player -->
	<div id="scumDiv"></div>
	
	
	
	<!-- player youtube e barra de emocoes -->
	<div class="now_playing">
		<div class="n_p_video_container" >
	       
	    	<div class="n_p_video_play"></div>
	   
	    	<div id="ytplayer"></div>
	       
		</div>
	 
		<div class="n_p_video_progressbar">
			<div id="progressBar"><div id="newBar"></div></div>
		</div>
	</div>
	
	
	
	<!-- onde será implementado o bloqueio da página ao abrir a caixa de feedback -->
	<div id="cover"> </div>
</body>
</html>

