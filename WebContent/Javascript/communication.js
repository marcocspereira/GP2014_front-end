function searchByName()
{
	var dataString = {"searchname":input_search_field.value, "FLAG":"search_name"};
	
	input_search_field.value="";
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data == "name not found")
	    	{
	    		console.log("cenascenas");
	    	}
	    	
	    	else
	    	{
	    		console.log(data);
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
		
	if (matches)
	{
	    alert('valid');
	}
	else{
		alert('vai levar na peida');
	}

}



