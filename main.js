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
		fetchAllOrders(fetchPopularLunch); 
	});
	$("#get-orders2").click(function(){ 
		fetchAllOrders(fetchPopularCombo); 
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


var itemCount = new Object(); // map between items and count
var maxItem = "";	// most popular lunch item
var maxCount = 0;
var bestCombo = ""; //most popular combo
var popularComboMap = new Object(); // map between item pairs and count
// variables to enforce synchronous calls
var ctr; 
var maxCtr;


function fetchAllOrders(func){
	var cookies = str_obj(document.cookie);
	$.ajax({
		url: '/get.php?type=orders&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#mask").show();
		},
		success: function(orders){
			if("elements" in orders) {
				for(var i=0; i<orders.elements.length;i++){
					var orderid = orders.elements[i].id;
					// fetch line items for every order
					func(orderid, i, orders.elements.length - 1);
				}
			}

		}
	});
}

function displayMaxLunch(){
	console.log("MaxItem: " + maxItem);
	console.log("MaxItemCount: " + maxCount);
	$('#orders1 .panel-body').text(maxItem + ":" + maxCount);
	$("#mask").fadeOut('slow',function(){
		$("#mask").remove();
	});
}

function displayCombo(){
	console.log("MaxCombo: " + bestCombo);
	console.log("MaxComboCount: " + maxCount);
	$('#orders2 .panel-body').text(bestCombo + ":" + maxCount);
	$("#mask").fadeOut('slow',function(){
		$("#mask").remove();
	});
}

function fetchPopularLunch(orderId, i , len){
	var cookies = str_obj(document.cookie);
	// update line count 
	ctr = i;
	maxCtr = len;
	console.log("in Ajax ctr: " + ctr);
	$.ajax({
		url: '/get.php?type=orders/'+ orderId +'/line_items&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#login-btn").hide();
			$("#loader").show();
		},
		success: function(lineItems){
			console.log("in Success ctr: " + ctr);
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
			}
			if( ctr == maxCtr){
				displayMaxLunch();
				itemCount = new Object();
			}
		}
	});
}

function fetchPopularCombo(orderId, i , len) {
	var cookies = str_obj(document.cookie);
	// update line count 
	ctr = i;
	maxCtr = len;

	$.ajax({
		url: '/get.php?type=orders/'+ orderId +'/line_items&token='+cookies.access_token,
		type:'GET',
		beforeSend: function(request){
			$("#login-btn").hide();
			$("#loader").show();
		},
		success: function(items){
			var listItems = [];
			if("elements" in items) {
				for(var key in items["elements"]){
				    listItems.push(items.elements[key].name);
				}
				listItems.sort();
				for(var i = 0; i < listItems.length; i++){
				    for(var j = i+1; j < listItems.length; j++){
				        var tuple = listItems[i] + "," + listItems[j];
				        if(popularComboMap.hasOwnProperty(tuple)){
				            popularComboMap[tuple] = popularComboMap[tuple] + 1;
				        }
				        else{
				            popularComboMap[tuple] = 1;
				        }
				        if(popularComboMap[tuple] > maxCount){
				            maxCount = popularComboMap[tuple];
				            bestCombo = tuple;
				        }
				    }
				}
			}
			if( ctr == maxCtr){
				displayCombo();
				popularComboMap = new Object();
			}
		}
	});
}

// function getPeakHour() {
//     var date = new Date(1382086394000).toString();
//     var dateSplit = date.split(" ");
//     var time = parseInt(dateSplit[4]);
//     document.getElementById("demo").innerHTML = time;
// }

function str_obj(str) {
	str = str.split(';');
	var result = {};
	for (var i = 0; i < str.length; i++) {
		var cur = str[i].trim().split('=');
		result[cur[0]] = cur[1];
	}
	return result;
}