<!doctype html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>1</title>
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
				<link href="css/styles.css" rel="stylesheet">
				
    </head>
    <body>
        <form class="app">
            Имя<br>
            <input type="text" name="name">
            <span class="error"></span>
            <br>
            Телефон<br>
            <input type="text" name="phone">
            <span class="error"></span>
            <br>
            Почта<br>
            <input type="text" name="email">
            <span class="error"></span>
            <br>
            <input type="button" value="Отправить" class="send" >
						<i class="fas fa-spinner"></i>
        </form>
        <div class="result"></div>
        <script src="js/jquery-3.2.0.min.js"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
