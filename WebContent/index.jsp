<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>  
<head>   
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="Javascript/YTBEmoBar.js"></script>
	<script type="text/javascript" src="Javascript/cookie.js"></script>
	<script type="text/javascript" src="Javascript/pinterestStyle.js"></script>
	
	<script type="text/javascript">
		$( document ).ready(function() {
			
			//setupBlocks(1);
			
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
			
			/*$('.pint1').mouseup(function(){
				setupBlocks(1);
			});*/
			
			
		});
		
		
	
	</script>
	
	<style type="text/css">
	
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
		
		
		/*.pint1
    		{
			    position: absolute;
			    background: #eee;
			    padding: 20px;
			    width: 300px;
			    border: 1px solid #ddd;
			    
			    -webkit-transition: all 1s ease-in-out;
			    -moz-transition: all 1s ease-in-out;
			    -o-transition: all 1s ease-in-out;
			    -ms-transition: all 1s ease-in-out;
			    transition: all 1s ease-in-out;
			}*/
			
	</style>
	<link rel="stylesheet" type="text/css" href="CSS/base.css">

	<title>YouTube Lyrics - GP2014</title>
</head>
<body >

	<button id="feedbackB">Disable</button>
	
	<div id="feedbackDiv">
		<button id="closeFeedb">Close</button>
	</div>
	
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
	
	<!-- <div class="pint1" style="width: 200px; height: 200px; background: red;"></div>
	<div class="pint1" style="width: 200px; height: 200px; background: pink;"></div>
	<div class="pint1" style="width: 200px; height: 200px; background: blue;"></div>
	<div class="pint1" style="width: 200px; height: 200px; background: green;"></div> -->
	
	
	
	<!-- onde será implementado o bloqueio da página ao abrir a caixa de feedback -->
	<div id="cover"> </div>
</body>
</html>

