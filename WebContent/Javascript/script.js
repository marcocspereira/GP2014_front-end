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
      height: '540',
      width: '960',
      videoId: '1lefGrqcC1A',//'pQxh4aoq_U4',
        playerVars: {
        'controls' : 1,
        'modestbranding' : 0,
        'rel' : 0,
        'showinfo' : 0,
        'autohide' : 0,
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
    	/*console.log("parou");
    	
    	$('div[id|="legacydiv"]').fadeOut("slow");
    	sleep(2000);
    	$('div[id|="legacydiv"]').remove();
    	 */
    	barcounter=0;
    	checkstate=1;    	
    	
    }
    else {
      
      clearTimeout(mytimer);
      //$('#progressBar').hide();
    }
	
	if(barcounter==0){
		var scumtop = $('#progressBar').position().top-27;
		console.log("scum "+scumtop);
		$('#scumDiv').css({"background-color": '#FFFFFF', "width": '960px', "height": '30px', "position": 'absolute', "top": scumtop});
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

	if(barcounter==0)
		$('#newBar').css({"position": 'absolute' , "top": '512px'});
	else
		$('#newBar').css({"position": 'absolute' , "top": '512px' , "left": barcounter*progressBarWidth+8});
	barcounter++;
	
	$('#newBar').attr("id","legacydiv");
	$('#progressBar').append("<div id='newBar'></div>");
	$('#newBar').css('background-color',co);
	
	
}

//apaga a barra de emo�oes apenas quando existe uma nova reproducao do video
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