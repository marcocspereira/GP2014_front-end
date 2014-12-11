var mytimer;
var player;
var barcounter=0;
var videoid;
var emotsize;
var serverdata;
var idrep;

// 3. This function creates an <iframe> (and YouTube player)  after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
      //height: '420',
      //width: '390',
      videoId: videoid, // for instance, '1lefGrqcC1A'
        playerVars: {
        'autoplay' : 1,
        'controls' : 1,
        'modestbranding' : 0,
        'color': 'white',
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

function setVideoId(vid){
	videoid=vid;
}

function setEmotionList(emotions){
	emotsize=emotions.length;
	serverdata = emotions;
	progress(emotions);
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
		
		chartPoints(player.getCurrentTime());
		mytimer = setInterval(function() {
			var playerCurrentTime = player.getCurrentTime();
			
			//var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100*2;
			
			chartPoints(playerCurrentTime);
		}, 1000/2);	// redesenha o plot em x ms       
	} 
    
    else if (event.data == YT.PlayerState.ENDED) {
    	
    	/*
    	barcounter=0;
    	checkstate=1;
    	*/
    }
    else {
      
    	clearTimeout(mytimer);
    }
		
	
}

/* it returns the size of each piece of emotion bar */
function getprogbarw(){
	return $('#progressBar').width() / emotsize;
}

function chartPoints(playerTimeDifference){
	
	var googlevalues =  [[ '', 	'',	{'type': 'string', 'role': 'style'}]];
	var i;
	
	/* point distribution in the plot */
	for(i=0;i<serverdata.length-1;i++){
		var check=true;
		if(playerTimeDifference>=serverdata[i].endTime){
			if( contains(i))
				googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: #C0C0C0}']);
			else
				check = false;
		}
		else if(check){
			
			if(serverdata[i].arousal>0 && serverdata[i].valence>0)
				googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: red}']);
			else if(serverdata[i].arousal>0 && serverdata[i].valence<0)
				googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: blue}']);
			else if(serverdata[i].arousal<0 && serverdata[i].valence>0)
				googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: yellow}']);
			else if(serverdata[i].arousal<0 && serverdata[i].valence<0)
				googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: green}']);
			
			drawChart(googlevalues);
			break;
		}
	}
}

function contains(index) {
    var i;

    for (i = index-1; i >= 0; i--) {
    	
    	if(serverdata[index].arousal>0 &&  serverdata[i].arousal>0 && serverdata[index].valence>0 && serverdata[i].valence>0 ||
    			serverdata[index].arousal<0 &&  serverdata[i].arousal<0 && serverdata[index].valence<0 && serverdata[i].valence<0 ||
    			serverdata[index].arousal>0 &&  serverdata[i].arousal>0 && serverdata[index].valence<0 && serverdata[i].valence<0 ||
    			serverdata[index].arousal<0 &&  serverdata[i].arousal<0 && serverdata[index].valence>0 && serverdata[i].valence>0){
    	
    		var xs = serverdata[index].arousal - serverdata[i].arousal;
    	  	xs = xs * xs;
    	 
    	  	var ys = serverdata[index].valence - serverdata[i].valence;
    	  	ys = ys * ys;
    	  	
    	  	var distance = Math.sqrt( xs + ys );
    	  	
    	  	if(distance<0.05){
    	  		return false;
    	  	}
    	}
    }

    return true;
}


function progress(emotions) {
	console.log("construction of emotionbar and application of scumdiv");
	if(checkVideoRep!=0)
		player.loadVideoById(videoid);
	checkVideoRep++;
		
	$('#progressBar').empty();
	$('#progressBar').append('<div id="scumDiv" style="visibility:hidden"></div> <div id="newBar"></div>');
		
	var scumtop = $('.n_p_video_progressbar').position().top;
	var scumw = $('.n_p_video_progressbar').width();
	
	$('#scumDiv').show();
	$('#scumDiv').css({"background-color": '#FFFFFF', "width": scumw, "height": '27px', "position": 'absolute', "top": scumtop, "visibility":"visible"});
	
	$('#scumDiv').slideDown("slow") ;
	
	$.each(emotions, function(i, emo) {
		/* it defines the size of the new bar */
		var progressBarWidth =  $('#progressBar').width() / emotions.length; //player.getDuration();
		// $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
		$('#progressBar').find('#newBar').animate({ width: progressBarWidth });		  	
	   
		var co ;
		if(emo.arousal>0 && emo.valence>0)
			co='red';
		else if(emo.arousal>0 && emo.valence<0)
			co='blue';
		else if(emo.arousal<0 && emo.valence>0)
			co='yellow';
		else if(emo.arousal<0 && emo.valence<0)
			co='green';
		
		/* renames the newbar div, create new newbar */
		$('#newBar').height(10);
	
		var emotionbartop = $('#progressBar').position().top-40;
		var emotionbarleft = $('#progressBar').position().left;
	
		if(barcounter==0)
			$('#newBar').css({"position": 'absolute' , "top": emotionbartop});
		else
			$('#newBar').css({"position": 'absolute' , "top": emotionbartop , "left": barcounter*progressBarWidth+emotionbarleft});
		barcounter++;
		
		$('#newBar').addClass("legacydiv");
		$('#newBar').attr("id","legacydiv");
		$('#legacydiv').attr("class","legacydiv");
		$('#progressBar').append("<div id='newBar'></div>");
		$('#newBar').css('background-color',co);
		
	});
	//updateBarsPos(1);
	
}

/* erases the emotions bar just when exists a new video reprodution */
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


/* aux function that simulates sleep in java */
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}
