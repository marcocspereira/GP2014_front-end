/*da os valores ao tour (onde irá aparece ajuda)*/
function initTour(){
	var simpleGuide = {
			  id: 'simple',
			  'title': '',
			  steps: [
				{
				    target: '#search_button',
				    content: 'Search by artist, music name or values of Arousal and Valence',
				    direction: 'bottom',
				},
				{
				    target: '#feedback_button',
				    content: 'Here you can see what is happening with your videos inside our system',
				    direction: 'bottom'
				},
				
				{
				    target: '#importFile',
				    content: 'Upload your formated .txt file with all the video URL you want',
				    direction: 'top'
				},
				{
				    target: '#importLink',
				    content: 'Paste here your video URL',
				    direction: 'top'
				},
				{
				    target: '#library_button',
				    content: 'Check the validated videos on the system',
				    direction: 'top'
				},
				{
				    target: '#now_playing_div',
				    content: 'Video playing at the moment',
				    direction: 'bottom'
				},
				{
				    target: '#russel_div',
				    content: 'Your video Arousal and Valence values will be displayed here',
				    direction: 'bottom'
				  },
			    
			    {
			      target: '#lyrics_li',
			      content: 'The video lyrics appear in this section',
			      direction: 'bottom',
			     
			    },
			    
			    
			  ]
			};
	
	var optionsGuideOverrides = {
			  autoAdvanceInterval: 10,      // Rotate through the steps at 10 second intervals
			  step: {
			    shadow: false
			  }
			}
	
		  $.pageguide(simpleGuide,optionsGuideOverrides);
}


/*faz update a emotion e scum bar para redimensionarem com o redimensionamento da janela. tb é usada para as mudar de sitio com o colapse da library*/
function updateBarsPos(ver){
		var extraHeight = 0;
		var extraWidth = 0;
		
		/*caso seja clicada a library*/
		if(ver == 1){
			if ($('#collapseLibrary').hasClass('in')){//($('#library_button').hasClass('collapsed'))
				extraHeight= -230	;
				extraWidth = 4;
			}
			else{
				extraHeight= 230;
				extraWidth = -4;
			}
		}
		//console.log("update "+extraHeight);
		var scumtop = $('#progressBar').position().top-31+extraHeight;
		var scumw = $('#progressBar').width()+extraWidth;
		//console.log(scumtop);
		//console.log(scumw);
		/*altera a scumdiv*/
		$('#scumDiv').css({"background-color": '#FFFFFF', "width": scumw, "height": '27px', "position": 'absolute', "top": scumtop});
		//$('#scumDiv').show();
		/*altera barra de emocao*/
		$(".legacydiv").each(function( index ) {
			  var emotionbartop = $('#progressBar').position().top-40+extraHeight+8;
			  var emotionbarleft = $('#progressBar').position().left;
			  var progbarW = getprogbarw();
			  
			  if(index == 0 && checkVideoRep==0)
				$(this).css({"position": 'absolute' , "width" : progbarW, "top": emotionbartop});
			  else
			  	$(this).css({"position": 'absolute' , "width" : progbarW, "top": emotionbartop , "left": index*progbarW+emotionbarleft});
			  
			  //$(this).show();
		});
	}	

function closeSearch(){
	$('#textSearchInput').val('');
	$('#xdireito').css({"display":"none"});
	$('#xesquerdo').css({"display":"none"});
	
	$('#emotionChosen option:contains("All emotions")').prop('selected', true);
	$("#emotionChosen").removeClass();
	$('#emotionChosen').addClass("all");
	
	
	getAllMusicsL();
}