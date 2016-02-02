$(document).ready(function(){
	$("#main-tabs li:first > a").trigger("click");
	$("#login-btn").click(function(){
		$.ajax({
			url: '/get.php?'
		});
	});
});