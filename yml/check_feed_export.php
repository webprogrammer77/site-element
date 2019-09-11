<?php
$email_admin = 'work.for.igor@yandex.ru';
$email_boss = '7431082@gmail.com';
$host = $_SERVER['HTTP_HOST'];
include 'config.php';

$hostname = DB_HOSTNAME;
$username = DB_USERNAME;
$password = DB_PASSWORD;
$dbName   = DB_DATABASE;
mysql_connect($hostname,$username,$password) OR DIE("Не могу создать соединение ");
mysql_select_db($dbName) or die(mysql_error());

// Исправьте, если у вас другая кодировка в БД
mysql_query('set names utf8');

ini_set("memory_limit", "3024M");
ini_set("post_max_size", "256M");
ini_set("upload_max_filesize", "256M");
ini_set("max_execution_time", "300000");
ini_set("max_input_time", "6000");
ini_set('auto_detect_line_endings', '1');
ini_set('display_errors', 'on');

error_reporting(E_ALL);

$check_settings_start = check_settings1('time_update','type','Download_over_sport');
echo "<br>check_settings_start: $check_settings_start";


sleep(20);
$check_settings_finish = check_settings1('time_update','type','Download_over_sport');
echo "<br>check_settings_finish: $check_settings_finish";
if($check_settings_start!==$check_settings_finish){
	echo 'ALLert!!';
}
if($check_settings_finish !==  '0000-00-00 00:00:00'){
	echo 'ALLert!!';
	$message = 'прайс-лист не сформирован';
	sendMessage($message, $email_admin);
	sendMessage($message, $email_boss);
}
/*--------------------check category------------------------*/
$url   = "allxml_to_market.xml";
$xml = simplexml_load_file($url);
//for($i = $xml->shop->categories->category->count()-1;$i >=0; $i--){	unset($xml->shop->categories->category[$i]);}
$count_cat=$xml->shop->categories->category->count();
echo "<br>count_cat: $count_cat<br>";
if(empty($count_cat))	sendMessage("В прайс-листе $url  категорий: $count_cat", $email_admin);

/*-----------------------------------------------------*/



/*--------функция проверки belotorg_settings GET ----------*/
function check_settings()	{
	$query_select_settings = "SELECT value FROM belotorg_settings WHERE type='Download_over_sport'";
	$resbs = mysql_query($query_select_settings) or die(mysql_error());
	$par_name=mysql_fetch_array($resbs);
	$need_create_yml =(int)$par_name['value'];
	return 	$need_create_yml;
	}
function check_settings1($col_select,$col,$val)
{
	$query_select_settings = "SELECT ".$col_select. " FROM belotorg_settings WHERE ".$col."='".$val."'";
	echo "<br>query_select_settings: $query_select_settings<br>";
	$resbs = mysql_query($query_select_settings) or die(mysql_error());
	$par_name=mysql_fetch_array($resbs);
	$param = $par_name[$col_select];
	return 	$param;
	}

	/*--------функция обновления belotorg_settings SET ----------*/
	function update_settings($val)
	{

		$query_update_settings = "UPDATE  belotorg_settings SET `value` = '" . $val . "' WHERE `type` = 'Download_over_sport'";
		mysql_query($query_update_settings) or die(mysql_error());
	}

	function update_settings1($col, $val)
	{
		if($val == 'now'){
			$query_update_settings = "UPDATE  belotorg_settings SET time_update=NOW() WHERE `type` = 'Download_over_sport'";
		}else{
			$query_update_settings = "UPDATE  belotorg_settings SET " .$col." = '" . $val . "' WHERE `type` = 'Download_over_sport'";
		}

		mysql_query($query_update_settings) or die(mysql_error());
		//echo "query_update_settings: $query_update_settings";
	}

	/*--------функция random в диапазоне min-max ----------*/
	function randomDate($start_date, $end_date)
	{
		// Convert to timetamps
		$min = strtotime($start_date);
		$max = strtotime($end_date);

		// Generate random number using above bounds
		$val = rand($min, $max);

		// Convert back to desired date format
		return date('Y-m-d H:i:s', $val);
	}

	/*--------функция отправки сообщения----------*/

	function sendMessage($res_message, $email) {
	$url = url();


			$headers = "From: прайслист"."\r\n".
			"MIME-Version: 1.0" . "\r\n" .
			"Content-type: text/html; charset=UTF-8" . "\r\n";
			$emailTo = $email;

			//if() {
				$mail = mail($emailTo, $res_message . "  на сайте: ". $url , $res_message, $headers);
			//}
			//echo "сообщение отправлено с текстом " . $res_message;
	}

	/*----оперделение url сайта---------------*/


	function url(){
		if(isset($_SERVER['HTTPS'])){
			$protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
		}
		else{
			$protocol = 'http';
		}
		return $protocol . "://" . $_SERVER['HTTP_HOST'];
	}




?>
