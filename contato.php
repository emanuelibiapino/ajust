<?php
	$email = $_POST['email'];
	$nome = $_POST['Nome'];
	$assunto = $_POST['Assunto'];
	$texto = $_POST['textoContato'];
	$email = "Email: $email<br>Nome: $nome<br>Texto: <br>$texto<br>";
	mail("willian.torres131@gmail.com", $assunto, $email,"From: $email"); 
	echo "Seu e-mail foi enviado com sucesso. Obrigado";
?>