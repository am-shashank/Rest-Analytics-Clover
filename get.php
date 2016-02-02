<?php
$apiToken = "8165606b-46d1-2651-1be3-ef3ce301c484";

header("Content-type: application/json");
$ch = curl_init("https://api.clover.com/v3/merchants/SK5ZGG60CD168/".$_GET["type"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER,
	array(
		"Authorization: Bearer ".$apiToken],
		"User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36"
	)
);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$result = curl_exec($ch);
echo $result;
?>