<!DOCTYPE html>
<html>
<head>
	<title>Redirecting...</title>
	<!-- jQuery 2.1.4 -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			var qParams = getQueryParams(),
				userInfo = getAccessToken();

			opener.document.cookie='access_token='+userInfo['access_token']+';merchant_id='+qParams['merchant_id']+';employee_id='+qParams['employee_id'];
			opener.parent.onLoginWindowClose(<?php echo "\"".$_GET['btn']."\""; ?>);
			window.close();
		});
		function getQueryParams() {
			var match,
	        pl     = /\+/g,  // Regex for replacing addition symbol with a space
	        search = /([^&=]+)=?([^&]*)/g,
	        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	        query  = window.location.search.substring(1);

	        urlParams = {};
	        while (match = search.exec(query))
	        	urlParams[decode(match[1])] = decode(match[2]);
	        return urlParams;
    	}
    	function getAccessToken() {
    		userInfo = {};
    		params = window.location.hash.substring(1).split('&');
    		var i = 0;
    		while (param = params[i++]) {
    			param = param.split("=");
    			userInfo[param[0]] = param[1];
    		}
    		return userInfo;
    	}
	</script>
</head>
<body>
	<h3>Redirecting...</h3>
</body>
</html>