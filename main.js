$(document).ready(function(){
	$("#main-tabs li:first > a").trigger("click");
	$("#get-uvisitors").click(function(){
		$.ajax({
			url: '/get.php?type=customers',
			type:'GET',
			beforeSend: function(request){
				$("#mask").show();
			},
			success: function(data)
			{
				$('#customers > .panel-body').text(data.elements.length);
				$("#mask").fadeOut('slow',function(){
					$("#mask").remove();
				});
				fetchAllOrders();
			}
		});
	});
});