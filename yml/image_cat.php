<?php
if(empty($hostname)){
include 'config.php';

$hostname = DB_HOSTNAME;
$username = DB_USERNAME;
$password = DB_PASSWORD;
$dbName   = DB_DATABASE;
mysql_connect($hostname,$username,$password) OR DIE("Не могу создать соединение ");
mysql_select_db($dbName) or die(mysql_error());
mysql_query('set names utf8');
ini_set('display_errors', 'on');
error_reporting(E_ALL);
}
$files = scandir('image/data/cats',1);
for($i=count($files) - 3; $i>=0; $i--)
{
	$image = 'data/cats/'.$files[$i];
	preg_match_all('!\d+!', $files[$i], $matches);
	if($matches[0][0] && (int)$matches[0][0] > 0 && (int)$matches[0][0] < 1000) $cat_id = $matches[0][0];	
	//if((int)$matches[0][1] >= 0 && (int)$matches[0][1] < 1000) $parent_cat_id = $matches[0][1];
	$query_update="UPDATE etshop_category SET image='".$image."' WHERE category_id = $cat_id";
	mysql_query($query_update) or die(mysql_error());
	echo "$query_update<br>";
	//echo "cat_id: $cat_id<br>";
}
array_map('unlink', glob('system/cache/*')); 
array_map('unlink', glob('vqmod/vqcache/*')); 

/*
$files = scandir('image/data/products',1);
for($i=count($files) - 3; $i>=0; $i--)
{
	$image = 'data/products/'.$files[$i];
	preg_match_all('!\d+!', $files[$i], $matches);
	$p_id = $matches[0][0];
	$query_update="UPDATE etshop_product SET image='".$image."' WHERE product_id = $p_id";
	mysql_query($query_update) or die(mysql_error());
	echo "$query_update<br>";
}
*/
?>