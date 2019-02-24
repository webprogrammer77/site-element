<?php

$name  	 = $_POST['name'];
$age   = $_POST['age'];
$phone = $_POST['phone'];
$email = $_POST['email'];	
$message  = $_POST['message'];	
$adres   = $_POST['adres'];


$email   = clean($email);
$name    = clean($name);
$age   = clean($age);	
$message = clean($message);
$phone = preg_replace('/[^0-9]/', '', $phone);	
$adres  = clean($adres);

		$mail_message = "
			ФИО $name<br>
			Email $email<br>			
			Адрес $adres<br>
			Телефон $phone<br>
			Сообщение $message<br>
			Возраст $age<br>
			";
			
		$headers = "From: Заказ со скидкой: ". $url ."\r\n".
		"MIME-Version: 1.0" . "\r\n" .
		"Content-type: text/html; charset=UTF-8" . "\r\n";
		
		$emailTo = 'work.for.igor@yandex.ru';
			
		$mail = mail($emailTo, "Запись на курс калиграфии ". $name ."  с сайта: ". $url , $mail_message, $headers);	

		$data = [];	
		
		if($mail){

		$data['status'] = "OK";
		$data['mes'] 	= "";
			
		}else{			
			$data['status'] = "NO";
			$data['mes'] 	= "";
		}

echo json_encode($data);


//функции очистки json данных

function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
		return $value;		
}

