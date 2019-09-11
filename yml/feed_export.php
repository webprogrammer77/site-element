<?php
include 'config.php';

$name  = $_SERVER['HTTP_HOST'];
$domen = url();
$phone = '+7 (499) 348-24-30';
$platform = 'opencart';
$company = 'ООО Белоторг';
$pr= 'stor';
$pr_table = 'str'; 

$hostname = DB_HOSTNAME;
$username = DB_USERNAME;
$password = DB_PASSWORD;
$dbName   = DB_DATABASE;
mysql_connect($hostname,$username,$password) OR DIE("Не могу создать соединение ");
mysql_select_db($dbName) or die(mysql_error());
mysql_query('set names utf8');

ini_set("memory_limit", "3024M");
ini_set("post_max_size", "256M");
ini_set("upload_max_filesize", "256M");
ini_set("max_execution_time", "300000");
ini_set("max_input_time", "6000");
ini_set('auto_detect_line_endings', '1');

ini_set('display_errors', 'on');
error_reporting(E_ALL);
libxml_use_internal_errors(true);

/* не публиковать товары из таблицы missing_products*/	
$start = microtime(true);	 		 
$queryNoPublish = "UPDATE etshop_product as p SET  p.status=0 WHERE p.product_id IN (SELECT product_id FROM missing_products WHERE prefix = '".$pr_table."')"; 		 
mysql_query($queryNoPublish) or die("queryNoPublish failed : " . mysql_error());
echo "queryNoPublish: ".round(microtime(true) - $start, 4)." сек.<br>";

/*------------Изменение для воскресенья-----------------*/

$update_bs = "UPDATE contractor_schedule SET delivery_days=0, order_time=16 where contr_id in(9,900024,45,62)";
mysql_query($update_bs) or die("update_bs failed : " . mysql_error());

$replace_bs = "REPLACE INTO contractor_schedule  (id,contr_id, order_day, order_time, delivery_days) VALUES(1111,900024,7,16,0),(1112,45,7,16,0)";
mysql_query($replace_bs) or die("replace_bs failed : " . mysql_error());

$update_bs1 = "UPDATE `etshop_product` SET `vendor` = '900024' WHERE (`stock_status_id` = '7') and  `vendor` = '9'";
mysql_query($update_bs1) or die("update_bs1 failed : " . mysql_error());

$update_vm_product1 = "UPDATE etshop_product SET `delivery_day` = 3, `delivery_time` = 23";
mysql_query($update_vm_product1) or die("update_vm_product1 failed : " . mysql_error());


$update_vm_product = "UPDATE `etshop_product`, contractor_schedule SET etshop_product.`delivery_day` = contractor_schedule.delivery_days, etshop_product.`delivery_time` = contractor_schedule.order_time WHERE contractor_schedule.contr_id=etshop_product.vendor and contractor_schedule.order_day=WEEKDAY(NOW())+1";
mysql_query($update_vm_product) or die("update_vm_product failed : " . mysql_error());

/*-------------//Изменеие для воскресенья----------------*/
	
/*---------------первый этап проверки и загрузка файла с сервера  ------------------------------ */
$check_update = file_get_contents('http://me-tall.ru/sport/check_update.php?check='.$pr.'chek');
	echo "<br>check_update: $check_update<br>";
	
	$check_update_self = check_settings();
	echo "<br>check_update_self: $check_update_self<br>";

	if($check_update == 1 && $check_update_self > 2) update_settings(3);

	if($check_update != 1 && $check_update_self != 3)	exit;	
	
	update_settings1("time_update", "now");
	echo "<br>check_settings1: " . check_settings1("time_update","type","Download_over_sport");

	update_settings(4);
	
	//if(file_exists('image_cat.php')) require_once('image_cat.php');
	
$file = file_get_contents('http://me-tall.ru/sport/metall_to_izraya.xml');
$fg = fopen("allxml_from_metall.xml","w");
fwrite($fg, $file);
fclose($fg); 
/*---------------//первый этап проверки и загрузка файла с сервера  ------------------------------ */
/*---------------второй этап изменение тегов url и  picture  ------------------------------ */
echo "<p>второй этап</p>";

$xml = simplexml_load_file("allxml_from_metall.xml");
/*----------изменение реквизитов----------------------*/
$xml->shop->name = $name;
$xml->shop->url = $domen;
$xml->shop->phone = $phone;
$xml->shop->platform = $platform;
$xml->shop->company = $company;
/*------------------------------------------------------*/
/*---------тренажеры и подкатегории выше 20000руб.--------------*/
/*
$query_category_trenajer = " SELECT category_id FROM etshop_category WHERE category_id=4 OR parent_id=4";

$row_category = d2a($query_category_trenajer);
$category_trenajer = array();
foreach($row_category as $category){	
	array_push($category_trenajer, $category['category_id']);
}
*/
/*---------//тренажеры и подкатегории выше 20000руб.--------------*/	
$offer_ids =array();
$ind = 0;
foreach($xml->shop->offers->offer as $offer) {
	
	$offer_id = (string)$offer['id'];
	array_push($offer_ids, $offer_id);
	$old_picture = $offer->picture;
	$exludes = array('http://me-tall.ru/sport/components/com_virtuemart/shop_image/product/','_big');
	$clear_old_picture = str_replace($exludes, "", $old_picture);
	$offer->picture = $domen . "/image/data/products/" . $clear_old_picture;
	$offer->url = "$domen/index.php?route=product/product&product_id=$offer_id&utm_source=yamarket&utm_term=$offer_id";	
	$price = get_price($offer_id);
	$offer->price = $price ;
	$category = $offer->categoryId;
	/*//для тренажеров
	if (in_array((string)$category,$category_trenajer) && ($price >=20000)){
		  
		$offer->sales_notes = "Бесплатная доставка, подъем и сборка";
	
	}else{
		$offer->sales_notes = "Опт, б/н расчёт";
		
	}
	*/
	$offer->sales_notes = "Опт, б/н расчёт";
	
}

/*---------------третий этап удаление ------------------------------ */
echo "<p>третий этап</p>";

$query_select ="SELECT DISTINCT product_id
FROM etshop_product 
WHERE status=1 
AND quantity>0 
AND product_id NOT IN(SELECT product_id FROM lowmargin_products)
AND product_id NOT IN(SELECT distinct product_id FROM etshop_product_to_category WHERE category_id IN(SELECT category_id FROM etshop_category WHERE parent_id=297 and category_id<>301))";
$row_select = d2a($query_select);

$site_product_ids = array();

for( $y = 0; $y < count($row_select); $y++)
{
	array_push($site_product_ids, (string)$row_select[$y]['product_id']);
}

echo "<br>count site_product_ids". count($site_product_ids);
echo "<br>до удаления было: ".$xml->shop->offers->offer->count()."<br>";

$max = $xml->shop->offers->offer->count()-1;
$end_offer_ids = array();

for($i = $max; $i>=0; $i--)
{
	$offer = $xml->shop->offers->offer[$i]['id'];
	if(!in_array((string)$offer, $site_product_ids))
	{
		unset($xml->shop->offers->offer[$i]);
	}else{
		array_push($end_offer_ids, (string)$offer);
	}
}

echo "<br>к пубикации осталось: ".$xml->shop->offers->offer->count()."<br>";

/*--------------------delete category книги------------------------*/
$query_select_category = "SELECT category_id FROM etshop_category WHERE parent_id=297 and category_id<>301";
$row_category = d2a($query_select_category);

$categories_book = array();

foreach($row_category as $category){	
	array_push($categories_book, (string)$category['category_id']);	
}

$max = $xml->shop->categories->category->count()-1;

for($i = $max; $i>=0; $i--){
	$category = $xml->shop->categories->category[$i]['id'];
	if(in_array((string)$category, $categories_book)){
		unset($xml->shop->categories->category[$i]);
	}
}

/*--------------------//delete category книги------------------------*/

/*-----------------------OPTIONS---------------------------*/

//$xml->addAttribute('test', 'addElrment');
$gifts = $xml->shop->addChild('gifts');
$gift1 = $gifts->addChild('gift');
$gift1->addAttribute('id', 'gift1');
$gift1->addChild('name','Консультация фитнес-тренера');
$gift1->addChild('picture',$domen.'/image/data/options/fitness.png');
$gift2 = $gifts->addChild('gift');
$gift2->addAttribute('id', 'gift2');
$gift2->addChild('name','Нагрудный кардиодатчик');
$gift2->addChild('picture',$domen.'/image/data/options/kardio.jpg');
$gift3 = $gifts->addChild('gift');
$gift3->addAttribute('id', 'gift3');
$gift3->addChild('name','Коврик под кардиотренажер');
$gift3->addChild('picture',$domen.'/image/data/options/kovrik.jpg');

$gift4 = $gifts->addChild('gift');
$gift4->addAttribute('id', 'gift4');
$gift4->addChild('name','Лестница для батута');
$gift4->addChild('picture',$domen.'/image/data/options/lestnisca.jpg');

$gift5 = $gifts->addChild('gift');
$gift5->addAttribute('id', 'gift5');
$gift5->addChild('name','Чехол для батута');
$gift5->addChild('picture',$domen.'/image/data/options/chehol.jpg');

$promos = $xml->shop->addChild('promos');

/*------------------body-builder------------------------*/
$promo = $promos->addChild('promo');
$promo->addAttribute('id', 'bodyBuilder');
$promo->addAttribute('type', 'gift with purchase');
$promo->addChild('description','Подарок при покупке');
$promo->addChild('url',$domen.'/podarok-pri-pokupke');
//<start-date>начало акции</start-date>
//<end-date>завершение акции</end-date>
$purchase  = $promo->addChild('purchase');
//<required-quantity>количество товаров за полную стоимость</required-quantity>
$query_select_id_action3="SELECT product_id, option_id, option_value_id FROM etshop_product_option_value  WHERE option_value_id=9";
$row_action3 = d2a($query_select_id_action3);
for( $bb = 0; $bb < count($row_action3); $bb++)
{
	$product_id = (string)$row_action3[$bb]['product_id'];
	$option_id = (string)$row_action3[$bb]['option_id'];
	//echo "<br>option_id: ". var_dump($option_id). " product_id: ". var_dump($product_id). " <br>";
	if(in_array($product_id, $end_offer_ids)){ // && $option_id == "4"
		$product  = $purchase->addChild('product');
		$product->addAttribute('offer-id', $product_id);
	}
}
echo "<br>bb body-builder: ". $bb ."<br>";
$promo_gifts = $promo->addChild('promo-gifts');
$promo_gift1 = $promo_gifts->addChild('promo-gift');
$promo_gift1->addAttribute('gift-id', 'gift1'); 
$promo_gift2 = $promo_gifts->addChild('promo-gift');
$promo_gift2->addAttribute('gift-id', 'gift2'); 
$promo_gift3 = $promo_gifts->addChild('promo-gift');
$promo_gift3->addAttribute('gift-id', 'gift3'); 

/*------------------ball------------------------*/
$promo = $promos->addChild('promo');
$promo->addAttribute('id', 'PromoGift1');
$promo->addAttribute('type', 'gift with purchase');
$promo->addChild('description','Выберите подарок');
$promo->addChild('url',$domen.'/vam-podarok1');
//<start-date>начало акции</start-date>
//<end-date>завершение акции</end-date>
$purchase  = $promo->addChild('purchase');
//<required-quantity>количество товаров за полную стоимость</required-quantity>
$query_select_id_action="SELECT product_id, option_id, option_value_id FROM etshop_product_option_value  WHERE option_value_id=6";
$row_select_id_action = d2a($query_select_id_action);
for( $p = 0; $p < count($row_select_id_action); $p++)
{
	$product_id = (string)$row_select_id_action[$p]['product_id'];
	$option_id = (string)$row_select_id_action[$p]['option_id'];
	//echo "<br>option_id: ". var_dump($option_id). " product_id: ". var_dump($product_id). " <br>";
	if(in_array($product_id, $end_offer_ids)){ // && $option_id == "4"
		$product  = $purchase->addChild('product');
		$product->addAttribute('offer-id', $product_id);
	}
}
echo "<br>p promo-ball: ".$p."<br>";
$promo_gifts = $promo->addChild('promo-gifts');
$promo_gift = $promo_gifts->addChild('promo-gift');
$promo_gift->addAttribute('offer-id', '22248'); 

/*------------------book------------------------*/
/*
$promo = $promos->addChild('promo');
$promo->addAttribute('id', 'PromoGift');
$promo->addAttribute('type', 'gift with purchase');
$promo->addChild('description','Выберите подарок');
$promo->addChild('url',$domen.'/vam-podarok');
//<start-date>начало акции</start-date>
//<end-date>завершение акции</end-date>
$purchase  = $promo->addChild('purchase');
//<required-quantity>количество товаров за полную стоимость</required-quantity>
$query_select_id_action="SELECT product_id, option_id, option_value_id FROM etshop_product_option_value  WHERE option_value_id=8";
$row_select_id_action = d2a($query_select_id_action);

for( $p1 = 0; $p1 < count($row_select_id_action); $p1++)
{
	$product_id = (string)$row_select_id_action[$p1]['product_id'];
	//$option_id = (string)$row_select_id_action[$p1]['option_id'];
	//echo "<br>option_id: ". var_dump($option_id). " product_id: ". var_dump($product_id). " <br>";
	if(in_array($product_id, $end_offer_ids)){ // && $option_id == "5"
		$product  = $purchase->addChild('product');
		$product->addAttribute('offer-id', $product_id);
	}
}
echo "<br>p1 promo-book: ".count($p1)."<br>";
$promo_gifts = $promo->addChild('promo-gifts');
$promo_gift = $promo_gifts->addChild('promo-gift');
$promo_gift->addAttribute('offer-id', '20285'); 
*/
/*------------------girya------------------------*/
$promo = $promos->addChild('promo');
$promo->addAttribute('id', 'girya');
$promo->addAttribute('type', 'gift with purchase');
$promo->addChild('description','Подарок при покупке');
$promo->addChild('url',$domen.'/podarok-pri-pokupke1');
//<start-date>начало акции</start-date>
//<end-date>завершение акции</end-date>
$purchase  = $promo->addChild('purchase');
//<required-quantity>количество товаров за полную стоимость</required-quantity>
$query_select_id_action="SELECT product_id, option_id, option_value_id FROM etshop_product_option_value  WHERE option_value_id=12";
$row_select_id_action = d2a($query_select_id_action);

for( $p1 = 0; $p1 < count($row_select_id_action); $p1++)
{
	$product_id = (string)$row_select_id_action[$p1]['product_id'];
	//$option_id = (string)$row_select_id_action[$p1]['option_id'];
	//echo "<br>option_id: ". var_dump($option_id). " product_id: ". var_dump($product_id). " <br>";
	if(in_array($product_id, $end_offer_ids)){ // && $option_id == "5"
		$product  = $purchase->addChild('product');
		$product->addAttribute('offer-id', $product_id);
	}
}
echo "<br>p1 promo-girya: ".$p1."<br>";
$promo_gifts = $promo->addChild('promo-gifts');
$promo_gift = $promo_gifts->addChild('promo-gift');
$promo_gift->addAttribute('offer-id', '10331'); 

/*-----------------bio-toilet----------------------*/

$promo = $promos->addChild('promo');
$promo->addAttribute('id', 'bioToilet');
$promo->addAttribute('type', 'gift with purchase');
$promo->addChild('description','Подарок при покупке');
$promo->addChild('url',$domen.'/podarok-pri-pokupke-bio-tualet');
//<start-date>начало акции</start-date>
//<end-date>завершение акции</end-date>
$purchase  = $promo->addChild('purchase');
//<required-quantity>количество товаров за полную стоимость</required-quantity>
$query_select_id_action="SELECT product_id, option_id, option_value_id FROM etshop_product_option_value  WHERE option_value_id=13";
$row_select_id_action = d2a($query_select_id_action);

for( $p1 = 0; $p1 < count($row_select_id_action); $p1++)
{
	$product_id = (string)$row_select_id_action[$p1]['product_id'];
	//$option_id = (string)$row_select_id_action[$p1]['option_id'];
	//echo "<br>option_id: ". var_dump($option_id). " product_id: ". var_dump($product_id). " <br>";
	if(in_array($product_id, $end_offer_ids)){ // && $option_id == "5"
		$product  = $purchase->addChild('product');
		$product->addAttribute('offer-id', $product_id);
	}
}
echo "<br>p1 promo-bio: ".$p1."<br>";
$promo_gifts = $promo->addChild('promo-gifts');
$promo_gift = $promo_gifts->addChild('promo-gift');
$promo_gift->addAttribute('offer-id', '21178'); 

/*--------------------------батуты > 5000---------------------------------------*/

$promo = $promos->addChild('promo');
$promo->addAttribute('id', 'batut');
$promo->addAttribute('type', 'gift with purchase');
$promo->addChild('description','Подарок при покупке');
$promo->addChild('url',$domen.'/podarok-pri-pokupke-batuta');
//<start-date>начало акции</start-date>
//<end-date>завершение акции</end-date>
$purchase  = $promo->addChild('purchase');
//<required-quantity>количество товаров за полную стоимость</required-quantity>
$query_select_id_action4="SELECT product_id, option_id, option_value_id FROM etshop_product_option_value  WHERE option_value_id=15   AND product_id NOT IN(SELECT product_id FROM etshop_product_option_value WHERE option_value_id=14)";
$row_action4 = d2a($query_select_id_action4);
for( $bb = 0; $bb < count($row_action4); $bb++)
{
	$product_id = (string)$row_action4[$bb]['product_id'];
	$option_id = (string)$row_action4[$bb]['option_id'];

	if(in_array($product_id, $end_offer_ids)){ 
		$product  = $purchase->addChild('product');
		$product->addAttribute('offer-id', $product_id);
	}
}
echo "<br>bb batut: ". $bb ."<br>";
$promo_gifts = $promo->addChild('promo-gifts');
$promo_gift4 = $promo_gifts->addChild('promo-gift');
$promo_gift4->addAttribute('gift-id', 'gift4'); 
 
/*------------------------------батуты без сетки--------------------------------------------------*/

$promo = $promos->addChild('promo');
$promo->addAttribute('id', 'batut1');
$promo->addAttribute('type', 'gift with purchase');
$promo->addChild('description','Подарок при покупке');
$promo->addChild('url',$domen.'/podarok-pri-pokupke-batuta');
//<start-date>начало акции</start-date>
//<end-date>завершение акции</end-date>
$purchase  = $promo->addChild('purchase');
//<required-quantity>количество товаров за полную стоимость</required-quantity>
$query_select_id_action5="SELECT product_id, option_id, option_value_id FROM etshop_product_option_value  WHERE option_value_id=14";
$row_action5 = d2a($query_select_id_action5);
for( $bb1 = 0; $bb1 < count($row_action5); $bb1++)
{
	$product_id = (string)$row_action5[$bb1]['product_id'];
	$option_id = (string)$row_action5[$bb1]['option_id'];
	//echo "<br>option_id: ". var_dump($option_id). " product_id: ". var_dump($product_id). " <br>";
	if(in_array($product_id, $end_offer_ids)){ // && $option_id == "4"
		$product  = $purchase->addChild('product');
		$product->addAttribute('offer-id', $product_id);
	}
}
echo "<br>bb1 batut1: ". $bb1 ."<br>";
$promo_gifts = $promo->addChild('promo-gifts');
$promo_gift4 = $promo_gifts->addChild('promo-gift');
$promo_gift4->addAttribute('gift-id', 'gift4'); 
$promo_gift5 = $promo_gifts->addChild('promo-gift');
$promo_gift5->addAttribute('gift-id', 'gift5'); 

/*---------------------//OPTIONS--------------------------------*/

$domxml = new \DOMDocument('1.0');
$domxml->preserveWhiteSpace = false;
$domxml->formatOutput = true;
$domxml->loadXML($xml->asXML());
$domxml->save('allxml_to_market.xml');

$check_update = file_get_contents("http://me-tall.ru/sport/check_update.php?check=".$pr."finish");
echo "<br>$check_update: ".$check_update;

update_settings(5);
update_settings1("time_update", "0");
echo "<br>check_settings1: " . check_settings1("time_update","type","Download_over_sport");

die('ok!');
/*--------------ф-я проверки прайс листа--------------------------*/
if ($xml === false) {
    $errors = libxml_get_errors();

    foreach ($errors as $error) {
        echo display_xml_error($error, $xml);
    }

    libxml_clear_errors();
}
/*--------функция запрос в массив ----------*/
function d2a($query){
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {$res[] = $line;}
    mysql_free_result($result);
    return $res;
}

/*--------функция вывода ошибок xml----------*/
function display_xml_error($error, $xml)
{
    $return  = $xml[$error->line - 1] . "\n";
    $return .= str_repeat('-', $error->column) . "^\n";

    switch ($error->level) {
        case LIBXML_ERR_WARNING:
            $return .= "Warning $error->code: ";
            break;
         case LIBXML_ERR_ERROR:
            $return .= "Error $error->code: ";
            break;
        case LIBXML_ERR_FATAL:
            $return .= "Fatal Error $error->code: ";
            break;
    }

    $return .= trim($error->message) .
               "\n  Line: $error->line" .
               "\n  Column: $error->column";

    if ($error->file) {
        $return .= "\n  File: $error->file";
    }

    return "$return\n\n--------------------------------------------\n\n";
}

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
	$resbs = mysql_query($query_select_settings) or die(mysql_error());
	$par_name=mysql_fetch_array($resbs);
	$param = $par_name[$col_select];
	return 	$param;
	}
/*--------функция получения цены товара----------*/
function get_price($id)	{
	$query_select_price = "SELECT p.product_id, IFNULL(ps.price, p.price) as price FROM etshop_product p
	LEFT JOIN  etshop_product_special ps ON (p.product_id = ps.product_id)
	AND ps.customer_group_id = '1' AND ps.date_start < NOW() AND (ps.date_end = '0000-00-00' OR ps.date_end > NOW())
	WHERE p.product_id=".$id;
	$resP = mysql_query($query_select_price) or die(mysql_error());
	$price_data=mysql_fetch_array($resP);
	$price =(int)$price_data['price'];
	return 	$price;
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


			$headers = "From: Хакстербот"."\r\n".
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

	/*----------------FTP--------------------------*/
	/*
	// установка соединения
	$ftp_server='me-tall.ru/sport';
	$ftp_server='176.';
$conn_id = ftp_connect($ftp_server);

// вход с именем пользователя и паролем
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);
	$content_get = file_get_contents('ftp://login:password@server/directory/file.txt');
	$content_put = file_put_contents('ftp://root:pFwMHAd7Ks!R@server/directory/file.txt',2);



	copy('local_file.txt', 'ftp://login:password@server/directory/new_file.txt');
	*/
		
	/*
$query_product ="SELECT p.product_id, p.image, IFNULL(ps.price, p.price) as price
FROM etshop_product p
LEFT JOIN  etshop_product_description pd ON (p.product_id = pd.product_id)
LEFT JOIN  etshop_product_to_store p2s ON (p.product_id = p2s.product_id)
LEFT JOIN  etshop_product_special ps ON (p.product_id = ps.product_id)
AND ps.customer_group_id = '1' AND ps.date_start < NOW() AND (ps.date_end = '0000-00-00' OR ps.date_end > NOW())
WHERE p2s.store_id = '0'
AND pd.language_id = '1'
AND p.date_available <= NOW()
AND p.status = '1' AND p.quantity > '0'
";
*/	

?>
