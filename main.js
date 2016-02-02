$(document).ready(function(){
	$("#main-tabs li:first > a").trigger("click");
	$("#login-btn").click(function(){
		var win = window.open('https://clover.com/oauth/authorize?response_type=token&client_id=EFQM9E0WY52SM&redirect_uri=https%3A%2F%2Frest-analytics-clover.herokuapp.com%2Fredirect.php%3Fbtn%3Dget-uvisitors','', 'width=1000');
	});
	$("#get-uvisitors").click(function(){
		var cookies = str_obj(document.cookie);
		if(cookies.access_token == null) return;
		$.ajax({
			url: '/get.php?type=customers&token='+cookies.access_token,
			type:'GET',
			beforeSend: function(request){
				$("#mask").show();
			},
			success: function(data)
			{
				$('#customers .panel-body').text(data.elements.length);
				$("#mask").fadeOut('slow',function(){
					$("#mask").remove();
				});
				//fetchAllOrders();
			}
		});
	});
});


window.onLoginWindowClose = function(btn) {
	console.log("Window closed");
	var cookies = str_obj(document.cookie);
	if(cookies.access_token != null){
		$.ajax({
			url: '/get.php?type=employees/JD3K5WKC4GKCJ&token='+cookies.access_token,
			type: 'GET',
			success: function(data) {
				$("#login-btn").text(data.name);
			}
		});
	}
};
window.onbeforeunload = function() {
	document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function str_obj(str) {
	str = str.split(';');
	var result = {};
	for (var i = 0; i < str.length; i++) {
		var cur = str[i].trim().split('=');
		result[cur[0]] = cur[1];
	}
	return result;
}