var minArousal = -1;	//	Y min
var maxArousal = 1;		//  Y max
var minValence = -1;	//	X min
var maxValence = 1;		//	X max

function setValuesAV(){
	var emo = document.getElementById("emotionChosen");
	
	var emotionChosen = emo.options[emo.selectedIndex].value;
	
	var buttonBackgroundColor = document.getElementById("search_button").style.backgroundColor;
	
	if(emotionChosen == "hap"){
		minArousal = 0;
		maxArousal = 1;
		minValence = 0;
		maxValence = 1;
	}
	else if(emotionChosen == "anx"){
		minArousal = 0;
		maxArousal = 1;
		minValence = -1;
		maxValence = 0;
	}
	else if(emotionChosen == "mel"){
		minArousal = -1;
		maxArousal = 0;
		minValence = -1;
		maxValence = 0;
	}
	else if(emotionChosen == "con"){
		minArousal = -1;
		maxArousal = 0;
		minValence = 0;
		maxValence = 1;
	}
	else{
		minArousal = -1;
		maxArousal = 1;
		minValence = -1;
		maxValence = 1;
	}
	setArousal();
	setValence();	
}

// AROUSAL
function setArousal() {
	$("#slider-range-arousal").slider({
		range : true,
		min : -1,
		max : 1.1,
		step : 0.1,
		values : [ minArousal, maxArousal ],
		slide : function(event, ui) {
			$("#amount_arousal").val(">=" + ui.values[0] + " | <=" + ui.values[1]);
			minArousal = ui.values[0];
			maxArousal = ui.values[1];
		}
	});
	$("#amount_arousal").val(
			">=" + $("#slider-range-arousal").slider("values", 0) + " | <="
					+ $("#slider-range-arousal").slider("values", 1));
	
}


// VALENCE
function setValence() {
	$("#slider-range-valence").slider({
		range : true,
		min : -1,
		max : 1.1,
		step : 0.1,
		values : [ minValence, maxValence ],
		slide : function(event, ui) {
			$("#amount_valence").val(">=" + ui.values[0] + " | <=" + ui.values[1]);
			minValence = ui.values[0];
			maxValence = ui.values[1];
		}
	});
	$("#amount_valence").val(
			">=" + $("#slider-range-valence").slider("values", 0) + " | <="
					+ $("#slider-range-valence").slider("values", 1));
	
}

