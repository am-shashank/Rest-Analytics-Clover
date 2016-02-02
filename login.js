var config = {
	clientId: '9S7YRPWDD1P1A',
	domain: 'https://clover.com/'
};
$(document).ready(function(){
	var cks = str_obj(document.cookie);
	if(cks.access_token != null){
		$("#mask-login").fadeOut('slow',function(){
			$("#mask-login").remove();
		});
	}
	$("#login-btn").click(function(){
		$(this).text("Processing...");
		var win = window.open('https://clover.com/oauth/authorize?response_type=token&client_id=9S7YRPWDD1P1A&redirect_uri=http%3A%2F%2Frestanalytics_clover.netau.net%2Fredirect.php%3Fbtn%3Dget-uvisitors','', 'width=1000');
	});
});

var itemCount = {}; // maintain the counts of items ordered to get most popular item
function getNumberOfCustomers() {
	var cookies = str_obj(document.cookie);
	$.ajax({
		url: '/get.php?type=customers&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#login-btn").hide();
			$("#loader").show();
		},
		success: function(data)
		{
			$('.col-xs-6 > .bg-red > .inner > h3').text(data.elements.length);
			$("#mask-login").fadeOut('slow',function(){
				$("#mask-login").remove();
			});
			fetchAllOrders();
		}
	});

}

function fetchAllOrders(){
	var cookies = str_obj(document.cookie);
	$.ajax({
		url: '/get.php?type=orders&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#login-btn").hide();
			$("#loader").show();
		},
		success: function(orders){
			for(var order in orders["elements"]){
				var orderid = order["id"];
				// fetch line items for every order
				fetchLineItems(orderid);
			}
		},
		complete: function (data) {
      		// fetch the most frequent lineitem - callback
			var maxCount = 0;
			var maxItem = "";
			for(var item in itemCount){
				if(item.count  > maxCount) {
					maxCount = item.count;
					maxItem = item.name;
				}
			}
			$("#mostPopularItem").text(maxItem + ":" + maxCount);
     	}
	});
	
}

function fetchLineItems(orderId){
	var cookies = str_obj(document.cookie);
	// update line count 
	$.ajax({
		url: '/get.php?type=orders/'+ orderId +'/line_items&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#login-btn").hide();
			$("#loader").show();
		},
		success: function(lineItems){
			for(var lineItem in lineItems["elements"]){
				var itemId = lineItem["id"];
				var itemName = lineItem["name"];
				if (itemId in lineItem) {
				    itemCount[itemId].count ++;
				} else {
				    itemCount[itemId] = {count: 1, name: itemName};
				}
			}
		}
	});

}

window.onLoginWindowClose = function() {
	console.log("Window closed");
	var cookies = str_obj(document.cookie);
	if(cookies.access_token == null){
		$("#login-btn").text("Login");
		return;
	}
	getNumberOfCustomers();
	
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