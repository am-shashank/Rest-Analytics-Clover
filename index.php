<!DOCTYPE html>
<html>
<head>
	<title>Clover - Rest Analytics</title>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="/main.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://bootswatch.com/cosmo/bootstrap.min.css"/>	
	<link rel="stylesheet" href="/main.css"/>	
</head>
<body>
	<nav class="navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Clover - Rest Analytics</a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="https://www.facebook.com/am.seshank?_rdr=p">Shashank A M</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<ul class="nav nav-tabs" id="main-tabs">
		<li class=""><a href="#customers" data-toggle="tab" aria-expanded="false">Customers</a></li>
		<li class=""><a href="#orders1" data-toggle="tab" aria-expanded="false">Orders (Best lunch Order)</a></li>
		<li class=""><a href="#orders2" data-toggle="tab" aria-expanded="false">Orders (Time)</a></li>
	</ul>
	<div id="myTabContent" class="tab-content">
		<div id="mask">
			<img src="https://d13yacurqjgara.cloudfront.net/users/1275/screenshots/1198509/plus.gif" id="loader">
		</div>
		<div class="tab-pane fade active in" id="customers">
			<div class="panel panel-default">
				<div class="panel-heading">No. of Customers</div>
				<div class="panel-body">
					N/A
				</div>
			</div>
			<button class="btn btn-default" id="get-uvisitors">Get the number of customers</button>
		</div>
		<div class="tab-pane fade" id="orders1">
			<div class="panel panel-default">
				<div class="panel-heading">Orders</div>
				<div class="panel-body">
					N/A
				</div>
			</div>
			<button class="btn btn-default" id="get-orders1">Get data</button>
		</div>
		<div class="tab-pane fade" id="orders2">
			<div class="panel panel-default">
				<div class="panel-heading">Orders</div>
				<div class="panel-body">
					N/A
				</div>
			</div>
			<button class="btn btn-default" id="get-orders2">Get data</button>
		</div>
	</div>
</body>
</html>