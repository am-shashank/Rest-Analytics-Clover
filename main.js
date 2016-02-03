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
				
			}
		});
	});
	$("#get-orders1").click(function(){ 
		fetchAllOrders(); 
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


var itemCount = new Object();
var maxItem = "";
var maxCount = 0;
function fetchAllOrders(){
	var cookies = str_obj(document.cookie);
	$.ajax({
		url: '/get.php?type=orders&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#mask").show();
		},
		success: function(orders){
			for(var i=0; i<orders.elements.length;i++){
				var orderid = orders.elements[i].id;
				// fetch line items for every order
				fetchLineItems(orderid, i, orders.elements.length - 1);
			}

		}
	});
}

function displayMax(){
	console.log("MaxItem: " + maxItem);
	console.log("MaxItemCount: " + maxCount);
	$('#orders1 .panel-body').text(maxItem + ":" + maxCount);
	$("#mask").fadeOut('slow',function(){
		$("#mask").remove();
	});
}

function fetchLineItems(orderId, i , len){
	var cookies = str_obj(document.cookie);
	// update line count 
	var tempi = i;
	var templen = len;
	console.log("Before Ajax:" + tempi);
	$.ajax({
		url: '/get.php?type=orders/'+ orderId +'/line_items&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#login-btn").hide();
			$("#loader").show();
		},
		success: function(lineItems){
			console.log("in Success i: " + i);
			if("elements" in lineItems) {
				for(var i=0;i<lineItems.elements.length;i++)
		        {
				    // var itemId = lineItems.elements[i].id;
				    var itemName = lineItems.elements[i].name;
				    if (itemName in itemCount) {		
				    	itemCount[itemName] = itemCount[itemName] + 1;
				    } else {
			            itemCount[itemName] = 1;
				    }
				    if(itemCount[itemName] > maxCount) {
				    	maxCount = itemCount[itemName];
				    	maxItem = itemName;
				    }
				}
				// console.log("MaxItem:" + maxItem); 
			}
			if( tempi == templen){
				displayMax();
			}
		}
	});
}


function str_obj(str) {
	str = str.split(';');
	var result = {};
	for (var i = 0; i < str.length; i++) {
		var cur = str[i].trim().split('=');
		result[cur[0]] = cur[1];
	}
	return result;
}