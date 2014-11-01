

$(function() {
	$('#sortable1, #sortable2').sortable();
	$('#sortable3').sortable({
		items: ':not(.disabled)'
	});
	$('#sortable-with-handles').sortable({
		handle: '.handle'
	});
	$('#sortable4, #sortable5').sortable({
		connectWith: '.connected'
	});
});