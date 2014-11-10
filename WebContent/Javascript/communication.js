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
	    		//console.log(data);
		    	//$('#searchResponse').append('<div class="iDiv">'+data+'</div>');
	    	}
	    	
	    	else
	    	{
	    		console.log(data);
	    		//$('#searchResponse').append('Idea "'+searchname.value+'" not found');
	    		//$("#searchResponse").show().delay(7000).fadeOut();
	    		//$('#searchname').val('');
	    	}
	 	}
	});
}
