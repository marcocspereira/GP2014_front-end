
/******************************************************************************************
 ******************************************************************************************
 									INSERT VIDEOS 
 ******************************************************************************************
 *******************************************************************************************
 */

/****************************
 * INSERT BY LINK
 ****************************/
function importLinksByUrl(){
	console.log("importar links por url");
	var import_link = $('#url_input_id').val();
	
	var matches = import_link.match( /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
	
	var link;
	var feedback;
		
	if (matches)
	{
	    var dataString = {"FLAG":"importlink", "text":import_link, "pages":nr};
		
		$.ajax({
			type: "GET",
		    data: dataString,
		    url: "InputServlet",
		    success: function(data)
		    {
		    	
		    	if (data != "null")
		    	{
		    		
		    		link = JSON.parse(data);
		    		//alert(link.status);
		    		if(link.status == "OK"){
		    			feedback = '<div class="alert alert-success" role="alert">' +
		    					'<strong>'+link.status+':</strong> ' + link.url +
		    			'</div>'; 
		    		}
		    		// else NOK
		    		else{
		    			feedback = '<div class="alert alert-danger" role="alert">' +
		    					'<strong>'+link.status+':</strong> ' + link.url +
		    			'</div>'; 
		    		}
		    		// write answer
		    		$("#importLinkTextFeedback").empty();
		    		$("#importLinkTextFeedback").append(feedback);
		    		// hide input modal
		    		$("#ModalInputLink").modal('hide');
		    		// show feedback modal of submitted videos
		    		$("#myModalInputFeedback").modal('show');
		    		//direito
		    	}
		    	else
		    	{
		    		console.log(data + ": sorry, we didn't found nothing");
		    	}
		 	}
		});
	}else{
		$('#url_input_id').css({"background-color":"#f2dede"})
	}
}


/****************************
 * INSERT BY FILE
 ****************************/
function importFile(){
	console.log("importar links por ficheiro");
	var file = document.getElementById('file-input').files[0];
	if (!file) {
		// does not have file
		return;
	}

	var reader = new FileReader();
	reader.onload = function(e) {
		var contents = e.target.result;
		var urls = contents.split("\n");
		urls.pop(); // remove ultima linha criada pelo split
		var urlconf = new Array();		// good URLs 
		var urlnaoconf = new Array();	// bad URLs
		
		var infoMusics;
		var htmlCodeToInsert = "";
		
		// 1st link verification, before to send to the InputServlet
		$.each(urls, function(index, value) {
			var matches = value.match( /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
			if (matches){
				urlconf.push(value);
			}
			else{
				urlnaoconf.push(value);

			}
		});

		// show URLs that don't match with youtube
		$.each(urlnaoconf, function(i, l) {
			htmlCodeToInsert += '<div class="alert alert-danger" role="alert">' +
			'<strong>INVALID:</strong> ' + l +
			'</div>';
		});
		
		var dataString = {"FLAG":"importfile", "text":JSON.stringify(urlconf)};
		
		$.ajax({
			type: "GET",
		    data:dataString,
		    url: "InputServlet",
		    success: function(data)
		    {
		    	if (data != null)
		    	{
		    		infoMusics = JSON.parse(data);
		    		
		    		// URLs that go to the InputServlet
		    		$.each(infoMusics, function(i, m) {
		    			if(m.status=="OK"){
		    				htmlCodeToInsert += '<div class="alert alert-success" role="alert">' +
			    					'<strong>'+m.status+':</strong> ' + m.url +
			    			'</div>'; 
		    			}
		    			else{
		    				htmlCodeToInsert += '<div class="alert alert-danger" role="alert">' +
	    							'<strong>'+m.status+':</strong> ' + m.url +
	    					'</div>'; 
		    			}
		    		});
		    		
		    		// write the answer
		    		$("#importLinkTextFeedback").empty();
		    		$("#importLinkTextFeedback").append(htmlCodeToInsert);
		    		// hide input modal
		    		$("#ModalInputLinkFile").modal('hide');
		    		// show feedback modal of submitted videos
		    		$("#myModalInputFeedback").modal('show');
		    	}
		    	else
		    	{
		    		console.log("Fail on URLs submit!");
		    	}
		 	}
		});

	};
	reader.readAsText(file);
	  
}


/******************************************************************************************
 ******************************************************************************************
 										FEEDBACK 
 ******************************************************************************************
 *******************************************************************************************
 */

/****************************
 * ASK FOR FEEDBACK THAT ARE IN ANALYSIS IN THE SYSTEM
 ****************************/
function feedbackSongs()
{
	console.log("mostrar feedback");
	var dataString = {"FLAG":"getfeedback"};
	var htmlCodeToInput = "";
	
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data != "null")
	    	{
	    		//fa-spin
	    		//feedbackIcon
	    		feedbackMusics = JSON.parse(data);
	    		
    			$('#feedbackIcon').addClass("fa-spin");
	    		
	    			
	    		$('#accordion').empty();
	    		
	    		// URLs that should go to the SearchServlet
	    		$.each(feedbackMusics, function(i, m) {
	    			htmlCodeToInput += '<div class="panel panel-default">' +
	    									'<div class="panel-heading" role="tab" id="heading'+ m.songId +'">' +
	    										'<h4 style="width:100%" class="panel-title">' +
	    											'<a  data-toggle="collapse" data-parent="#accordion" href="#collapse'+ m.songId +'" aria-expanded="true" aria-controls="collapse'+ m.songId +'">' +
	    												m.title + " - " + m.artist +
	    											'</a>' +
	    										'</h4>' +
	    									'</div>' +
	    									'<div id="collapse'+ m.songId +'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+ m.songId +'">' +
	    										'<div class="panel-body">' +
	    											'<ul class="list-group">' +
	    												feedbackType(m.youtubeStatus, "YoutubeCrawlerStatus")	+
	    												feedbackType(m.lyricsStatus, "LyricsCrawlerStatus")	+
	    												feedbackType(m.ocrStatus, "OCRStatus")	+
	    												feedbackType(m.jmerlibStatus, "JMERLibStatus")	+
	    												/*
	    												'<li class="list-group-item feedback_ok_li"><i class="fa fa-check"></i><strong>Validating Link YouTube</strong></li>' +
	    												'<li class="list-group-item feedback_ok_li"><i class="fa fa-check"></i> Segmentation</li>' +
	    												'<li class="list-group-item feedback_processing_li"><i class="fa fa-cog fa-spin"></i> OCR</li>' +
	    												'<li class="list-group-item feedback_problem_li"><i class="fa fa-remove"></i> etc.</li>' +
	    												*/
	    											'</ul>' +
	    										'</div>' +
	    									'</div>' +
	    								'</div>';
	    		});	    		
				
				$('#accordion').append(htmlCodeToInput);
	    	}
	    	else
	    	{
	    		$('#feedbackIcon').removeClass("fa-spin");
	    		console.log("nada a receber [feedback]");
	    	}
	 	}
	});
}

/****************************
 * funcao aux para saber a cor e texto para cada step de feedback por musica
 * 
 ****************************/
function feedbackType(state,stateText)
{
	var code = '<li class="list-group-item ';
	if(state=='UNSTARTED'){
		code += 'feedback_notstarted_li"><i class="fa fa-plug"></i><strong>' + stateText + '</strong>' + state + '</li>';
	}
	else if(state=='QUEUED' || state=='SEGMENTING' || state=='OCR_WORKING' || state=='PRE_PROCESSING' || state=='ANALYSING'){
		code += 'feedback_processing_li"><i class="fa fa-cog fa-spin"></i><strong>' + stateText + '</strong>' + state + '</li>';
	}
	else if(state=='DONE'){
		code += 'feedback_ok_li"><i class="fa fa-check"></i><strong>' + stateText + '</strong>' + state + '</li>';
	}
	else if(state=='ERROR'){
		code += 'feedback_problem_li"><i class="fa fa-remove"></i><strong>' + stateText + '</strong>' + state + '</li>';
	}
	
	return code;
}

/******************************************************************************************
 ******************************************************************************************
 										SEARCHS 
 ******************************************************************************************
 *******************************************************************************************
 */

/****************************
 * TEXTUAL SEARCH
 ****************************/
function textualSearch()
{
	console.log("pesquisa por texto");
	var textSearchIn = $("#textSearchInput").val();
	
	if(textSearchIn != ""){
		var dataString = {"FLAG":"textsearch", "text":textSearchIn};
		var resultFromSearch;
		var htmlCodeToInput = "";
		
		$('#xesquerdo').css({"display":"inline"});

		$.ajax({
			type: "GET",
			data:dataString,
			url: "SearchServlet",
			success: function(data)
			{
				if (data != "null")
				{	    		
		    		//paginacao(data);

					resultFromSearch = JSON.parse(data);
					// delete library content to contain the search result
					$('#library_musics_div').empty();
					// for each finded music, returned by the SearchServlet
					$.each(resultFromSearch, function(i, m) {
						// determine the color (red, yellow, green, blue) by predominant emotion
						var emocolor = setMainColor(m.dominantEmotion);
						// code to generate for each founded music
						htmlCodeToInput += 	createMusicDiv(m, emocolor);
						
					});
					// update pages information
					pageNumber = data.page;
					totalPages = data.numberOfPages;
					// print the buttons for next and prev pages
					htmlCodeToInput += createPageButtons();
					// print generated code for each music
					$('#library_musics_div').append(htmlCodeToInput);
				}
				else if(data == "null")
				{
					htmlCodeToInput='<h3 align = "center">There\'s no musics or artists with the key:<br><span style="color: blue">'+textSearchIn+'</span></h3>';
					$('#library_musics_div').empty();
					$('#library_musics_div').append(htmlCodeToInput);
					console.log(textSearchIn + ": sorry, we didn't found anything");
				}
			}
		});
	}
}



/****************************
 * EMOTION SEARCH
 ****************************/
function searchByEmotion(){
	var emo = document.getElementById("emotionChosen");
	var emoToSearch;
	
	if(emotionChosen == "hap"){
		emoToSearch = "";
	}
	else if(emotionChosen == "anx"){
		emoToSearch = "";
	}
	else if(emotionChosen == "mel"){
		emoToSearch = "";
	}
	else if(emotionChosen == "con"){
		emoToSearch = "";
	}
	else{	// all emotions
		emoToSearch = "";
	}
}

/****************************
 * A&V SEARCH
 ****************************/
function searchByAV()
{
	console.log("pesquisa por emocao");
	var dataString = {"FLAG":"avsearch",
					"minArousal":minArousal, "maxArousal":maxArousal,
					"minValence":minValence, "maxValence":maxValence};

	var resultFromSearch;
	var htmlCodeToInput = "";
	$('#xdireito').css({"display":"inline"});
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	$('#myModal').modal('hide');
	    	if (data != "null")
	    	{
	    		//paginacao(data);
	    		console.log("encontramos essa musica de acordo com AV! Vamos listar isso na library");
	    		resultFromSearch = JSON.parse(data);
	    		
	    		// delete library content to contain the search result
				$('#library_musics_div').empty();
				// for each finded music, returned by the SearchServlet
				$.each(resultFromSearch, function(i, m) {
					// determine the color (red, yellow, green, blue) by predominant emotion
					var emocolor = setMainColor(m.dominantEmotion);
					// code to generate for each founded musics
					htmlCodeToInput += 	createMusicDiv(m, emocolor);	    					
				});
				// print the buttons for next and prev pages
				htmlCodeToInput += createPageButtons();
				// print generated code for each music
				$('#library_musics_div').append(htmlCodeToInput);
	    		
	    	}	    	
	    	else if(data == "null")
	    	{				
	    		htmlCodeToInput='<h3 align = "center">There\'s no musics or artists with the emotion:<br><span style="color: blue"> '
	    			+minArousal+' &lt; Arousal &lt; '+maxArousal+'<br>'
	    			+minValence+' &lt; Valence &lt; '+maxValence
	    			+' </span></h3>';
	    		$('#library_musics_div').empty();
	    		$('#library_musics_div').append(htmlCodeToInput);
	    		console.log("sorry, we didn't found anything");
	    	}
	 	}
	});
}

/****************************
 * aux function to determine color
 * receives emotion
 ****************************/
function setMainColor(emotion){

	var happiness_color = "#FF3333";		// red
	var anxiety_color = "#FFD633";			// yellow
	var melancholy_color = "#46A13E";		// green
	var contentment_color = "#5C7EFB";		// blue
	var gray = "#BDBDBD";

	if(emotion == "Happiness"){
		return happiness_color;
	}
	else if (emotion == "Anxiety"){
		return anxiety_color;
	}
	else if (emotion == "Melancholy"){
		return melancholy_color;
	}
	else if (emotion == "Contentment"){
		return contentment_color;
	}
	else{
		return gray;
	}
}

/****************************
 * aux function to make htmlCode to the container of each music
 * receives the music
 ****************************/
function createMusicDiv(m, emocolor)
{
	//Math.round(num * 100) / 100
	var musicCode="";
	musicCode +=  '<div class="music_div" style="background-color: '+emocolor+';">' +
				'<img alt="" src="' + m.thumbnailPath + '" class="thumbnail_img" />' +
				'<div class="track_info_div">' +
					'<strong>' + m.artist + ' <br /> ' + m.title + '</strong>' +	
				'</div>' +
				'<div class="av_info_div">' +
					'Arousal: '+ Math.round(m.arousal*1000)/1000 +'<br /> Valence: ' + Math.round(m.valence*1000)/1000 + 
				'</div>' +
				'<div class="av_info_div">' +
					'<span class="label label-default">' + m.dominantEmotion + 
					'</span> <br /> OCR Error: ' + m.ocrError;
	if(m.ocrError>=0.6)	// this value should be confirmed by OCR module!
		musicCode+= "<i class='fa fa-exclamation-triangle'></i>";
	musicCode+=		'</div>' +
				'<div class="fa fa-play fa-3x play_div" onclick="getMusic(' + m.songId + ')"></div>' +
			'</div>';
	return musicCode;
}

/****************************
 * function that output buttons to previous and next buttons
 ****************************/
function createPageButtons(){
	var olderPage = pageNumber + 1;
	var newerPage = pageNumber - 1;
	
	return '<nav>' +
			+ '<ul class="pager">'
  				+ '<li class="previous" onclick="nextPageFunction('+newerPage+',"'+pageSubject+'")" id="prevButton">'
  					+ '<span aria-hidden="true">&larr;</span> Newer'
    			+ '</li>'
    			+ '<li class="next" onclick="nextPageFunction('+olderPage+',"'+pageSubject+'")" id="nextButton">'
    				+ 'Older <span aria-hidden="true">&rarr;</span>'
    			+ '</li>'
  			+ '</ul>'
		+ '</nav>';
}

/****************************
 * function that should to next or previous page
 ****************************/

/****************************
 * function that returns all the available musics
 * get all the musics in order to present in the library
 ****************************/
function getAllMusicsL(){
	console.log("load de todas as musicas na BD para library");
	var dataString = {"FLAG":"getall"};
	var htmlCodeToInput="";
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",	// TODO ver se fica nesta servlet ou se cria outra so para devolver musica(s)
	    success: function(data)
	    {
	    	if (data == "fail")	{console.log("fail on gettting all musics for library");}
	    	
	    	else
	    	{
	    		//paginacao(data);

	    		var musics = JSON.parse(data);
	    		
	    		// delete library content to contain the search result
				$('#library_musics_div').empty();
				// for each finded music, returned by the SearchServlet
				$.each(musics, function(i, m) {
					// determine the color (red, yellow, green, blue) by predominant emotion
					var emocolor = setMainColor(m.dominantEmotion);
					// code to generate for each founded musics
					htmlCodeToInput += 	createMusicDiv(m, emocolor);	    					
				});
				// print the buttons for next and prev pages
				htmlCodeToInput += createPageButtons();
				// print generated code for each music
				$('#library_musics_div').append(htmlCodeToInput);
	    	}
	 	}
	});
	
}

var globalID;

/****************************
 * function that returns a music identified by id
 ****************************/
function getMusic(songId){
	console.log("play numa musica");
	globalID=songId;
	var dataString = {"FLAG":"getmusic", "songId":songId};	// TODO rever no lado da servlet
	var i;
	$('#seccaodas3janelas').css({'display':'block'});
	//location.reload(true);
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",	// TODO ver se fica nesta servlet ou se cria outra so para devolver musica(s)
	    success: function(data)
	    {
	    	if (data == "fail")	{
	    		console.log("fail on getting music to play");
	    	}
	    	else{
	    		
	    		var music = JSON.parse(data);
	    		
	    		$('#iframYT').remove();
	    		//$('#chart_div').empty();
	    		$('#liryc_div').empty();
	    		
	    		//fill lyric div	    		
	    		var lyric = '<p>'+music.lyric+'</p>';
	    		$('#liryc_div').append(lyric);
	    		
	    		//console.log(music.ocrError);
	    		if(music.ocrError > 0.5){
	    			//console.log("pencil lyrics SHOW");
	    			$('#pencillyric').css({'display':'inline'});
	    		}
	    		else{
	    			//console.log("pencil lyrics HIDE");
	    			$('#pencillyric').css({'display':'none'});
	    		}
	    		//play video '9dgng_ekbV0'
	    		//fill emotion bar
	    		//start chart points
	    		//$('#newBar').empty();
	    		//$('.legacyDiv').empty();
	    		setVideoId(music.youtubeId);
	    		
	    		for(i=0;i<music.avMoodTrack.length;i++){
	    			music.avMoodTrack[i].arousal=Math.round(music.avMoodTrack[i].arousal*1000)/1000;
	    			music.avMoodTrack[i].valence=Math.round(music.avMoodTrack[i].valence*1000)/1000;
	    		}
	    		
	    		
	    		setEmotionList(music.avMoodTrack)
	    		var tag = document.createElement('script');
	    		tag.src = "https://www.youtube.com/iframe_api";
	    		tag.setAttribute("id", "iframYT");
	    		var firstScriptTag = document.getElementsByTagName('script')[0];
	    		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    		
	    		//close library
	    		$('#collapseLibrary').removeClass('in');
	    		
	    		updatetimer=setInterval(function(){
	    			//console.log("mais uma vez");
	    			updateBarsPos(0);
	    			if($("#progressBar").position().top>0){
	    				clearTimeout(updatetimer);
	    				//console.log("acabou");
	    			}
	    		}, 500);
	    		
	    		updatettimer=setInterval(function(){
	    			updateBarsPos(0);
	    			clearTimeout(updatettimer);
	    		}, 1000);
	    			    		
	    	}
	    }
	});
	
}


function editLyric(){
	console.log("editar lyrics, de momento nada implementado em BACKEND");
	$('#myModalInputLyricEdit').modal('show');
	
	$('textarea#textareaEdit').val($('#liryc_div').text());
	
}

function submitLyric(){
	console.log("para já nada será feito, backend nao preparado para receber ediçao de lyric");
	var dataString = {"FLAG":"editLyric", "songId":globalID,"text":$('textarea#textareaEdit').val()};	// TODO rever no lado da servlet

	
	/*$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",	// TODO ver se fica nesta servlet ou se cria outra so para devolver musica(s)
	    success: function(data)
	    {
	    	if (data == "fail")	{
	    		console.log("fail on getting music to play");
	    	}
	    	else{
	    		
	    	}
	    }
	});*/
	
	
}


/******************************************************************************************
 ******************************************************************************************
 								 			PLOT
 ******************************************************************************************
 ******************************************************************************************
 */


function drawChart(googlevalues)
{	
	//console.log("desenho do grafico");
	
  /*var data = google.visualization.arrayToDataTable([
    [ 'Valence', 	'Arousal',	{'type': 'string', 'role': 'style'}],
    [ 0.5,     		0.5, 		'point { fill-color: red}'],
    [ 0.2,     		0.5, 		'point { fill-color: blue}'],
    [ 0.7,     		-1, 		'point { fill-color: green}'],
    [ -0.8,    		-0.4,		'point { fill-color: black}'],
    [ 0.1,     		1,			'point { fill-color: pink}'],
	[ -0.6,    		-0.6,		'point { fill-color: brown}']
  ]);*/
  
  var data = google.visualization.arrayToDataTable(googlevalues);

  var options = {
    /*title: 'Age vs. Weight comparison',*/
    hAxis: {title: 'Valence', minValue: -1, maxValue: 1},
    vAxis: {title: 'Arousal', minValue: -1, maxValue: 1},
    legend: 'none',
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);

}


