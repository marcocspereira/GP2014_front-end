var minArousal;
var maxArousal;
var minValence;
var maxValence;

function setValuesAV(){
	var emo = document.getElementById("emotionChosen");
	
	emotionChosen
}

// AROUSAL
$(function() {
	$("#slider-range-arousal").slider({
		range : true,
		min : -1,
		max : 1.1,
		step : 0.1,
		values : [ minArousal, maxArousal ],
		slide : function(event, ui) {
			$("#amount_arousal").val(">=" + ui.values[0] + " | <=" + ui.values[1]);
		}
	});
	$("#amount_arousal").val(
			">=" + $("#slider-range-arousal").slider("values", 0) + " | <="
					+ $("#slider-range-arousal").slider("values", 1));
	
});


// VALENCE
$(function() {
	$("#slider-range-valence").slider({
		range : true,
		min : -1,
		max : 1.1,
		step : 0.1,
		values : [ minValence, maxValence ],
		slide : function(event, ui) {
			$("#amount_valence").val(">=" + ui.values[0] + " | <=" + ui.values[1]);
		}
	});
	$("#amount_valence").val(
			">=" + $("#slider-range-valence").slider("values", 0) + " | <="
					+ $("#slider-range-valence").slider("values", 1));
	
});