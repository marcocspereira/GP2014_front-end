// IDEALMENTE, DEVE SER OPTIMIZADO PARA 1 FUNCAO TRATAR DAS DUAS BARRAS

// AROUSAL
$(function() {
	$("#slider-range-arousal").slider({
		range : true,
		min : -1,
		max : 1.1,
		step : 0.1,
		values : [ -1, 1 ],
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
		values : [ -1, 1 ],
		slide : function(event, ui) {
			$("#amount_valence").val(">=" + ui.values[0] + " | <=" + ui.values[1]);
		}
	});
	$("#amount_valence").val(
			">=" + $("#slider-range-valence").slider("values", 0) + " | <="
					+ $("#slider-range-valence").slider("values", 1));
	
});