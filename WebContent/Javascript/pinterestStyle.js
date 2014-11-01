
$(window).resize(handler);

function handler(){
	setupBlocks(0);
	setupBlocks(1);
	setupBlocks(2);
	setupBlocks(4);
}

function setupBlocks(id) {
	var colCount = 0;
	var colWidth = 0;
	var margin = 30;
	var windowWidth = 0;
	var blocks = [];
	
	$( '.pint' +id).draggable();
    windowWidth = $(window).width();
    colWidth = $('.pint'+id).outerWidth();
    console.log(colWidth);
    colCount = Math.floor(windowWidth/(colWidth+margin));
    for(var i=0;i<colCount;i++) {
        blocks.push(margin);
    }
    
    positionBlocks(colWidth,margin,blocks,id);
    
}
function positionBlocks(colWidth,margin,blocks,id) {
    $('.pint'+id).each(function(){
        var min = Array.min(blocks);
        var index = $.inArray(min, blocks);
        var leftPos = margin+(index*(colWidth+margin));
        $(this).css('left',leftPos+50+'px');
        $(this).css('top',min+50+'px');
        
        blocks[index] = min+$(this).outerHeight()+margin;
    });
}



// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array);
};
