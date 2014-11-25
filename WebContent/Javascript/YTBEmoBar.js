var mytimer;
var player;
var barcounter=0;
var videoid;
var emotsize;
var emot;
var serverdata = new Array();

// 3. This function creates an <iframe> (and YouTube player)  after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
      //height: '420',
      //width: '390',
      videoId: videoid, //'1lefGrqcC1A',//'pQxh4aoq_U4',
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

function setVideoId(vid){
	videoid=vid;
}

function setEmotionList(emotions){
	emotsize=emotions.length;
	emot = emotions;
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
	
		mytimer = setInterval(function() {
			var playerCurrentTime = player.getCurrentTime();
			
			var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
			
			chartPoints(playerTimeDifference);
		}, 500);	// redesenha o plot em x ms       
	} 
    
    else if (event.data == YT.PlayerState.ENDED) {
    	
    	/*barcounter=0;
    	checkstate=1;    	*/
    	
    }
    else {
      
      //clearTimeout(mytimer);
    }
	
	//display scumdiv
	/*if(barcounter==0){
		var scumtop = $('#progressBar').position().top-31;
		var scumw = $('#progressBar').width();
		//console.log("scum "+scumw);
		$('#scumDiv').show();
		$('#scumDiv').css({"background-color": '#FFFFFF', "width": scumw, "height": '27px', "position": 'absolute', "top": scumtop});
		$('#scumDiv').slideDown("slow") ;
	}*/
		
	
}

/*retorna tamanho de cada pedaco da emotion bar*/
function getprogbarw(){
	return $('#progressBar').width() / emotsize;
}

function chartPoints(playerTimeDifference){
	//console.log(playerTimeDifference);
	
	//console.log(serverdata);
	
	var googlevalues =  [[ '', 	'',	{'type': 'string', 'role': 'style'}]];
	var i;
	
	for(i=0;i<emot.length;i++){
		if(playerTimeDifference>emot[i].init && playerTimeDifference<emot[i].fin)
			serverdata.push(emot[i]);
			
	}
	
	
	//console.log(serverdata);
	for(i=0;i<serverdata.length-1;i++){
		googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: grey}']);
	}
	
	if(serverdata[serverdata.length-1].arousal>0 && serverdata[serverdata.length-1].valence>0)
		googlevalues.push([serverdata[serverdata.length-1].arousal,serverdata[serverdata.length-1].valence,'point { fill-color: red}']);
	else if(serverdata[serverdata.length-1].arousal>0 && serverdata[serverdata.length-1].valence<0)
		googlevalues.push([serverdata[serverdata.length-1].arousal,serverdata[serverdata.length-1].valence,'point { fill-color: blue}']);
	else if(serverdata[serverdata.length-1].arousal<0 && serverdata[serverdata.length-1].valence>0)
		googlevalues.push([serverdata[serverdata.length-1].arousal,serverdata[serverdata.length-1].valence,'point { fill-color: yellow}']);
	else if(serverdata[serverdata.length-1].arousal<0 && serverdata[serverdata.length-1].valence<0)
		googlevalues.push([serverdata[serverdata.length-1].arousal,serverdata[serverdata.length-1].valence,'point { fill-color: green}']);
	
	
	drawChart(googlevalues);
	
	
}


function progress(emotions) {
	
	//clearBar();
	$('div[id|="legacydiv"]').remove();
	
	
	//var scumtop = $('#progressBar').position().top-31;
	var scumtop = $('.n_p_video_progressbar').position().top;
	var scumw = $('.n_p_video_progressbar').width();
	//	var scumw = 30;
	console.log("scum "+scumtop);
	$('#scumDiv').show();
	$('#scumDiv').css({"background-color": '#FFFFFF', "width": scumw, "height": '27px', "position": 'absolute', "top": scumtop, "visibility":"visible"});
	
	$('#scumDiv').slideDown("slow") ;
	
	
	$.each(emotions, function(i, emo) {
		//define o tamanho na nova barra
		var progressBarWidth =  $('#progressBar').width() / emotions.length;//player.getDuration();
		// $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
		$('#progressBar').find('#newBar').animate({ width: progressBarWidth });		  	
	   
	   	//cores random, vai ser substituido pelas cores atribuidas aos calores V e A
	  	/*var list = ['red', 'blue','yellow','green'];
	   	Array.prototype.chooseRandom = function() {
		   return this[Math.floor(Math.random() * this.length)];
		 };
		 */
		var co ;//= list.chooseRandom(); // => 2
		
		if(emo.arousal>0 && emo.valence>0)
			co='red';
		else if(emo.arousal>0 && emo.valence<0)
			co='blue';
		else if(emo.arousal<0 && emo.valence>0)
			co='yellow';
		else if(emo.arousal<0 && emo.valence<0)
			co='green';
		
		
		//renomeia a div newbar, cria nova newbar
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
