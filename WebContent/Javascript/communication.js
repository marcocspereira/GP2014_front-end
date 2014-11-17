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

	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data != null)
	    	{
	    		console.log(data);
	    	}
	    }
	});
}
