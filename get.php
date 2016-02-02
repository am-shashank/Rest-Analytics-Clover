<?php
$type = $_GET["type"];
$token = $_GET["token"];
$query = $_GET["query"];
$url ="";
if($query)
{
	$url = "https://api.clover.com/v3/merchants/SK5ZGG60CD168/".$type."&".urldecode($query);
}
else
{
	$url = "https://api.clover.com/v3/merchants/SK5ZGG60CD168/".$type;
}

header("Content-type: application/json");
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER,
	array(
		"Authorization: Bearer ".$token,
		"User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36"
	)
);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$result = curl_exec($ch);
echo $result;
?>