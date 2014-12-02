


function textualSearch()
{
	var textSearchIn = $("#textSearchInput").val();
	
	if(textSearchIn != ""){
	var dataString = {"FLAG":"textsearch", "text":textSearchIn};
	var resultFromSearch;
	
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "InputServlet",	// TODO alterar para SearchServlet
	    success: function(data)
	    {
	    	if (data != null)
	    	{
	    		console.log("encontramos essa musica, vamos listar isso na library");
	    		resultFromSearch = JSON.parse(data);
	    		alert(resultFromSearch);
	    		
	    		$.each(resultFromSearch, function(i, m) {
	    			var emocolor;
	    			/*determine emocolor from m.pemo*/
	    			var code = 	'<div class="music_div" style="background-color: '+emocolor+';">' +
									'<img alt="" src="'+m.thumb+'" class="thumbnail_img" />' +
									'<div class="track_info_div">' +
										m.artist+' <br /> ' +m.title+	
									'</div>' +
									'<div class="fa fa-play fa-3x play_div" onclick="getMusic(\''+m.artist+'\',\''+m.title+'\')"></div>' +
								'</div>';
	    			
	    			$('#library_musics_div').empty();
	    			
	    			$('#library_musics_div').append(code);
	    		});
	    		
	    	}	    	
	    	else
	    	{
	    		console.log(data + ": desculpe, nao encontramos nada com isso");
	    	}
	 	}
	});
	}
}


function searchByAV()
{
	var dataString = {"FLAG":"avsearch",
					"minArousal":minArousal, "maxArousal":maxArousal,
					"minValence":minValence, "maxValence":maxValence};

	var resultFromSearch;
	
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "InputServlet",		// TODO alterar para SearchServlet
	    success: function(data)
	    {
	    	if (data != null)
	    	{
	    		alert("chefe-delas!")
	    		console.log("encontramos essa musica de acordo com AV! Vamos listar isso na library");
	    		resultFromSearch = JSON.parse(data);
	    		//alert(resultFromSearch);
	    		
	    		
	    		
	    		$.each(resultFromSearch, function(i, m) {
	    			var emocolor;
	    			/*determine emocolor from m.pemo*/
	    			var code = 	'<div class="music_div" style="background-color: '+emocolor+';">' +
									'<img alt="" src="'+m.thumb+'" class="thumbnail_img" />' +
									'<div class="track_info_div">' +
										m.artist+' <br /> ' +m.title+	
									'</div>' +
									'<div class="fa fa-play fa-3x play_div" onclick="getMusic(\''+m.artist+'\',\''+m.title+'\')"></div>' +
								'</div>';
	    			
	    			$('#library_musics_div').empty();
	    			
	    			$('#library_musics_div').append(code);
	    		});
	    		
	    		// TODO esconder modal
	    		
	    	}	    	
	    	else
	    	{
	    		console.log(data + ": desculpe, nao encontramos nada com isso");
	    	}
	 	}
	});
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
		    		$("#ModalInputLink").modal('hide');
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

//vai buscar todas as musicas para apresentar na library
function getAllMusicsL(){
		
	var dataString = {"FLAG":"getall"};
	
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data == "fail")	{console.log("fail on gettting all musics for library");}
	    	
	    	else
	    	{
	    		console.log(data+" get all musics for library");
	    		
	    		var musics = JSON.parse(data);
	    		
	    		$.each(musics, function(i, m) {
	    			var emocolor= "blue";
	    			/*determine emocolor from m.pemo*/
	    			var code = 	'<div class="music_div" style="background-color: '+emocolor+';">' +
									'<img alt="" src="'+m.thumb+'" class="thumbnail_img" />' +
									'<div class="track_info_div">' +
										m.artist+' <br /> ' +m.title+	
									'</div>' +												/*MUDAR PARA ID DA BD*/
									'<div class="fa fa-play fa-3x play_div" onclick="getMusic(\''+m.artist+'\',\''+m.title+'\')"></div>' +
								'</div>';
	    			
	    			$('#library_musics_div').empty();
	    			
	    			$('#library_musics_div').append(code);
	    		});
	    		

	    	}
	 	}
	});
	
}

//vai buscar uma musica referenciada pelo artista e titulo
function getMusic(artist, title){
	
	var dataString = {"FLAG":"getmusic", "artist":artist, "title":title};
	
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data == "fail")	{console.log("fail on getting music to play");}
	    	
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
	    		//sleep(1000);
	    		setInterval(function(){updateBarsPos(0);}, 500);
	    		
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
