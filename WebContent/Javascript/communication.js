/******************************************************************************************
 ******************************************************************************************
 									INSERIR VIDEOS 
 ******************************************************************************************
 *******************************************************************************************
 */

/****************************
 * INSERIR POR LINK
 ****************************/
function importLinksByUrl(){
	var import_link = $('#url_input_id').val();
	
	var matches = import_link.match( /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
	//celso: https?:\/\/)?(www\.)?(youtu\.be\/|youtube\.com\/)?((.+\/)?(watch(\?v=|.+&v=))?(v=)?)([\w_-]{11})(&.+)?(\?list=([\w_-]{13}))?(\?t=[0-9]*s)?(\\?.+)?(be\/|v=|\/v\/|\/embed\/|\/watch\/)([\w_-]{11}
	
	var link;
	var feedback;
		
	if (matches)
	{
	    var dataString = {"FLAG":"importlink", "text":import_link};
		
		$.ajax({
			type: "GET",
		    data: dataString,
		    url: "InputServlet",
		    success: function(data)
		    {
		    	
		    	if (data != null)
		    	{
		    		
		    		link = JSON.parse(data);
		    		alert(link.status);
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
		    		// escrever resposta
		    		$("#importLinkTextFeedback").append(feedback);
		    		// esconder a modal de input
		    		$("#ModalInputLink").modal('hide');
		    		// mostrar feedback dos videos submetidos
		    		$("#myModalInputFeedback").modal('show');
		    		direito
		    	}
		    	else
		    	{
		    		console.log(data + ": desculpe, nao encontramos nada com isso");
		    	}
		 	}
		});
	}
	else{
		alert("foste fodido");
	}

}


/****************************
 * INSERIR POR FICHEIRO
 ****************************/
function importFile(){
	
	var file = document.getElementById('file-input').files[0];
	if (!file) {
		//nao tem ficheiro
		return;
	}

	var reader = new FileReader();
	reader.onload = function(e) {
		var contents = e.target.result;
		var urls = contents.split("\n");
		var urlconf = new Array();		// urls bons
		var urlnaoconf = new Array();	// urls maus
		
		var infoMusics;
		var htmlCodeToInsert = "";
		
		// primeira verificacao dos links antes de enviar para a servlet
		$.each(urls, function(index, value) {
			var matches = value.match( /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
			if (matches){
				urlconf.push(value);
			}
			else{
				urlnaoconf.push(value);
				// apresentar os urls que nao sao youtube
				$.each(urlnaoconf, function(i, l) {
					htmlCodeToInsert += '<div class="alert alert-danger" role="alert">' +
					'<strong>Not from YouTube:</strong> ' + l +
					'</div>';
				});				 
				
			}
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
		    		
		    		// urls que seguem para a servlet
		    		$.each(infoMusics, function(i, m) {
		    			if(m.status=="OK"){
		    				htmlCodeToInsert += '<div class="alert alert-success" role="alert">' +
			    					'<strong>'+m.status+':</strong> ' + m.url +
			    			'</div>'; 
		    			}
		    			else{
		    				htmlCodeToInsert += '<div class="alert alert-danger" role="alert">' +
	    							'<strong>'+link.status+':</strong> ' + link.url +
	    					'</div>'; 
		    			}
		    		});
		    		
		    		// escrever resposta
		    		$("#importLinkTextFeedback").append(htmlCodeToInsert);
		    		// esconder a modal de input
		    		$("#ModalInputLinkFile").modal('hide');
		    		// mostrar feedback dos videos submetidos
		    		$("#myModalInputFeedback").modal('show');
		    	}
		    	else
		    	{
		    		console.log("falha a submeter urls de ficheiro");
		    	}
		 	}
		});

	};
	reader.readAsText(file);
	  
}


/******************************************************************************************
 ******************************************************************************************
 									PESQUISAS 
 ******************************************************************************************
 *******************************************************************************************
 */

/****************************
 * PESQUISA TEXTUAL
 ****************************/
function textualSearch()
{
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
					resultFromSearch = JSON.parse(data);
					console.log(resultFromSearch); // TODO remover esta merda
					// apagar conteudo da library para conter o resultado da pesquisa
					$('#library_musics_div').empty();
					// para cada musica encontrada e devolvida pela servlet
					$.each(resultFromSearch, function(i, m) {
						// determinar a cor (vermelho, amarelo, verde ou azul) mediante a emocao predominante
						var emocolor = setMainColor(m.dominantEmotion);
						// Codigo a gerar para cada uma das musicas que foi encontrada
						htmlCodeToInput += 	createMusicDiv(m, emocolor);	    					
					});
					// imprimir o codigo gerado para cada uma das musicas
					$('#library_musics_div').append(htmlCodeToInput);
				}
				else if(data == "null")
				{
					htmlCodeToInput='<h3 align = "center">There\'s no musics or artists with the key:<br><span style="color: blue">'+textSearchIn+'</span></h3>';
					$('#library_musics_div').empty();
					$('#library_musics_div').append(htmlCodeToInput);
					console.log(textSearchIn + ": desculpe, nao encontramos nada com isso");
				}
			}
		});
	}
}


/****************************
 * PESQUISA POR A&V
 ****************************/
function searchByAV()
{
	var dataString = {"FLAG":"avsearch",
					"minArousal":minArousal, "maxArousal":maxArousal,
					"minValence":minValence, "maxValence":maxValence};

	var resultFromSearch;
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
	    		console.log("encontramos essa musica de acordo com AV! Vamos listar isso na library");
	    		resultFromSearch = JSON.parse(data);
	    		
	    		// apagar conteudo da library para conter o resultado da pesquisa
				$('#library_musics_div').empty();
				// para cada musica encontrada e devolvida pela servlet
				$.each(resultFromSearch, function(i, m) {
					// determinar a cor (vermelho, amarelo, verde ou azul) mediante a emocao predominante
					var emocolor = setMainColor(m.dominantEmotion);
					// Codigo a gerar para cada uma das musicas que foi encontrada
					htmlCodeToInput += 	createMusicDiv(m, emocolor);	    					
				});
    		
				// imprimir o codigo gerado para cada uma das musicas
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
	    		console.log(" desculpe, nao encontramos nada com isso");
	    	}
	 	}
	});
}

/****************************
 * funcao aux para determinar cor
 * recebe a emocao
 ****************************/
function setMainColor(emotion){

	var happiness_color = "#FF3333";		// red
	var anxiety_color = "#FFD633";			// yellow
	var melancholy_color = "#46A13E";		// green
	var contentment_color = "#5C7EFB";		// blue
	var gray = "#BDBDBD";

	if(emotion == "Hapiness"){
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
 * funcao aux para fazer o htmlcode para contentor de cada musica
 * recebe musica
 ****************************/
function createMusicDiv(m, emocolor)
{
	return '<div class="music_div" style="background-color: '+emocolor+';">' +
				'<img alt="" src="' + m.thumbnailPath + '" class="thumbnail_img" />' +
				'<div class="track_info_div">' +
					'<strong>' + m.artist + ' <br /> ' + m.title + '</strong>' +	
				'</div>' +
				'<div class="av_info_div">' +
					'Arousal: '+ m.arousal +'<br /> Valence: ' + m.valence + 
				'</div>' +
				'<div class="av_info_div">' +
					'<span class="label label-default">' + m.dominantEmotion + 
					'</span> <br /> OCR Error: ' + m.ocrError +
				'</div>' +
				'<div class="fa fa-play fa-3x play_div" onclick="getMusic(' + m.songId + ')"></div>' +
			'</div>';
}


function getChartData()
{
	var dataString = {"FLAG":"chartdata"};
	var chartData;
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data != null)
	    	{
	    		//console.log(data);
	    		//console.log(JSON.parse(data));
	    		chartData = JSON.parse(data);
	    	}
	    },
	    async:false
	});

	return chartData;
}


function drawChart(googlevalues) {
	
	
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



// vai buscar todas as musicas para apresentar na library
function getAllMusicsL(){
		
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
	    		console.log(data+" get all musics for library");
	    		
	    		var musics = JSON.parse(data);
	    		
	    		// apagar conteudo da library para conter o resultado da pesquisa
				$('#library_musics_div').empty();
				// para cada musica encontrada e devolvida pela servlet
				$.each(musics, function(i, m) {
					// determinar a cor (vermelho, amarelo, verde ou azul) mediante a emocao predominante
					var emocolor = setMainColor(m.dominantEmotion);
					// Codigo a gerar para cada uma das musicas que foi encontrada
					htmlCodeToInput += 	createMusicDiv(m, emocolor);	    					
				});
    		
				// imprimir o codigo gerado para cada uma das musicas
				$('#library_musics_div').append(htmlCodeToInput);
	    		
	    	}
	 	}
	});
	
}

//vai buscar uma musica referenciada pelo id
// TODO rever
function getMusic(songId){
	
	//var dataString = {"FLAG":"getmusic", "artist":artist, "title":title};
	var dataString = {"FLAG":"getmusic", "songId":songId};	// TODO rever no lado da servlet
	
	$('#seccaodas3janelas').css({'display':'block'});
	
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
	    		
	    		//fill lyric div	    		
	    		$('#liryc_div').empty();
	    		var lyric = '<p>'+music.lyric+'</p>';
	    		$('#liryc_div').append(lyric);
	    		
	    		//play video '9dgng_ekbV0'
	    		//fill emotion bar
	    		//start chart points
	    		setVideoId(music.youtubeId);
	    		setEmotionList(music.emotions)
	    		var tag = document.createElement('script');
	    		tag.src = "https://www.youtube.com/iframe_api";
	    		var firstScriptTag = document.getElementsByTagName('script')[0];
	    		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    		
	    		$('#collapseLibrary').removeClass('in');
	    		
	    		updatetimer=setInterval(function(){
	    			//console.log("mais uma vez");
	    			updateBarsPos(0);
	    			if($("#progressBar").position().top>0){
	    				clearTimeout(updatetimer);
	    				//console.log("acabou");
	    			}
	    		}, 500);
	    		
	    		/*SONG CLASS ATRIBUTTES:
	    		   	int songId;
				   	String title;
					String youtubeId;
				    String fileName;
				    String lyric;
				    Artist artist;
	    		*/
	    		
	    		/*EMOTION CLASS ATRIBUTTES:
    		   		TimeStamp init;
			   		TimeStamp fin;
					Double arousal;
			    	Double valence;
	    		*/
	    		
	    	}
	    }
	});
	
}
