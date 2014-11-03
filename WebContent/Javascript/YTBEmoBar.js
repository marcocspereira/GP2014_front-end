var mytimer;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var barcounter=0;

// 3. This function creates an <iframe> (and YouTube player)  after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
      //height: '420',
      //width: '390',
      videoId: '9dgng_ekbV0', //'1lefGrqcC1A',//'pQxh4aoq_U4',
        playerVars: {
        'autoplay' : 1,
        'controls' : 1,
        'modestbranding' : 0,
        'rel' : 0,
        'showinfo' : 0,
        'autohide' : 0,
        'iv_load_policy': 3,
        'playsinline': 1,
        'wmode': 'transparent'
      },
        events: {
            'onReady': onPlayerReady,
             'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

var checkstate=0;//0-playing, 1-ended, 2-deleting divs mode
// 5. The API calls this function when the player's state changes.
function onPlayerStateChange(event) {

	if (event.data == YT.PlayerState.PLAYING) {
		$('#progressBar').show();
		var playerTotalTime = player.getDuration();
	  
	
		mytimer = setInterval(function() {
			var playerCurrentTime = player.getCurrentTime();
			
			var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
			
			progress(playerTimeDifference, $('#progressBar'));
		}, 1000);        
	} 
    
    else if (event.data == YT.PlayerState.ENDED) {
    	
    	barcounter=0;
    	checkstate=1;    	
    	
    }
    else {
      
      clearTimeout(mytimer);
    }
	
	if(barcounter==0){
		var scumtop = $('#progressBar').position().top-31;
		var scumw = $('#progressBar').width();
		console.log("scum "+scumw);
		$('#scumDiv').show();
		$('#scumDiv').css({"background-color": '#FFFFFF', "width": scumw, "height": '27px', "position": 'absolute', "top": scumtop});
		$('#scumDiv').slideDown("slow") ;
	}
		
	
}


function progress(percent, $element) {
	
	clearBar();
	
	//define o tamanho na nova barra
	var progressBarWidth =  $element.width() / player.getDuration();
	// $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
  	$element.find('#newBar').animate({ width: progressBarWidth });		  	
   
   	//cores random, vai ser substituido pelas cores atribuidas aos calores V e A
  	var list = ['red', 'blue','black','yellow','brown','green'];
   	Array.prototype.chooseRandom = function() {
	   return this[Math.floor(Math.random() * this.length)];
	 };
	var co = list.chooseRandom(); // => 2
	
	
	
	//renomeia a div newbar, cria nova newbar
	$('#newBar').height(10);

	var emotionbartop = $('#progressBar').position().top-40;

	if(barcounter==0)
		$('#newBar').css({"position": 'absolute' , "top": emotionbartop});
	else
		$('#newBar').css({"position": 'absolute' , "top": emotionbartop , "left": barcounter*progressBarWidth+25});
	barcounter++;
	
	$('#newBar').attr("id","legacydiv");
	$('#progressBar').append("<div id='newBar'></div>");
	$('#newBar').css('background-color',co);
	
	
}

//apaga a barra de emocoes apenas quando existe uma nova reproducao do video
function clearBar(){
	if(checkstate==1){
		checkstate=0;
		console.log("parou");
		//$('div[id|="legacydiv"]').fadeOut("slow");
		//sleep(2000);
		$('div[id|="legacydiv"]').remove();
	}
}

function stopVideo() {
    player.stopVideo();
}


//funcao auxiliar que simula um sleep em java
function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}
