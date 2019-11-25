<?php

$email = $_POST['email'];
$formcontent="Заявка на участие в Вебинаре\n\nEmail: $email";


// $recipient = "Killerfatfood@yandex.ru";
$recipient = "san4es-ag@yandex.ru";
// $recipient = "";
$subject = "Заявка на участие в Вебинаре";

if(isset($email)) {
    mail($recipient, $subject, $formcontent);
}

?>
