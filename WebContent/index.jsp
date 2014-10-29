<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>  
<head>   
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
	<script type="text/javascript" src="Javascript/YTBEmoBar.js"></script>
	<script type="text/javascript" src="Javascript/cookie.js"></script>
	
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:400">
	<link rel="stylesheet" type="text/css" href="CSS/base.css">
	<link rel="stylesheet" type="text/css" href="CSS/font-awesome-4.2.0/css/font-awesome.min.css">
	
	<title>YouTube Lyrics - GP2014</title>     
	<script type="text/javascript">
		$( document ).ready(function() {		
			
			//document.cookie = "tourVerify=; expires=Thu, 01 Jan 1970 00:00:00 UTC";//delete cookie
			checkCookie("tourVerify");
			
			$('#feedbackB').click(function(){
				$("#cover").fadeIn(500);
				$("#feedbackDiv").fadeIn(1000);
				//$("#feedbackB").css({'zIndex': '50'});
				
			});
			
			$('body').click(function(evt){
		        if(evt.target.id == "feedbackDiv" || $(evt.target).closest('#feedbackDiv').length) //div que vai abrir
		        	return;
		        else if(evt.target.id == "feedbackB" || $(evt.target).closest('#feedbackB').length) //div botao
			    	return;
		        
				$("#feedbackDiv").fadeOut(500);
				$("#cover").fadeOut(1000); 
			
			});
			
			$("#feedbackDiv").draggable();
			
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
		 	top: 30px;
			left: 100px;
			width: 300px;
			height: 100px;
			background: #FFFFFF;
			z-index : 50;
			display: none;
			-webkit-border-radius: 5px;
			border-radius: 7px;
			border-style: solid;
			border-width: 1px;
			overflow-y: scroll;
		}
		
		#feedbackB {
		 	position: absolute;
		 	background: #FFFFFF;
			z-index : 50;
			border-radius: 5px;
			padding: 2px 2px 2px 2px;
		}
		
		
		/* Let's get this party started */
		::-webkit-scrollbar {
		    width: 12px;
		}
		 
		/* Track */
		::-webkit-scrollbar-track {
		    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
		    -webkit-border-radius: 7px;
		    border-radius: 7px;
		}
		 
		/* Handle */
		::-webkit-scrollbar-thumb {
		    -webkit-border-radius: 7px;
		    border-radius: 7px;
		    background: rgba(132,129,129,0.8); 
		    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
		}
		::-webkit-scrollbar-thumb:window-inactive {
			background: rgba(132,129,129,0.4); 
		}	
			
	</style>
	
 
	
</head>
<body>

	<!-- caixa    de feedback ao utilizador -->
	<span id="feedbackB"><i class="fa fa-cog fa-spin"></i> Background activities... <i class="fa fa-cog"></i></span>
	<div id="feedbackDiv">
		<p style="margin-left: 20px; margin-right: 10px; text-align: justify" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
		Morbi placerat nibh vel ante euismod, at pellentesque lorem bibendum.</p>
		<!-- <button style="margin-left:20px" id="closeFeedb">Close</button> -->
	</div>
	<br><br>
	
	
	<!-- barra usada para cobrir os controls do youtube player -->
	<div id="scumDiv" style="display: none"></div>
	
	
	
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

