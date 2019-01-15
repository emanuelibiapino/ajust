<?php
	$cidade = $_POST['cidade'];
	$cep = $_POST['cep'];
	$tipo = $_POST['tipo'];
	$nome_rua = $_POST['nome_rua'];
	$descricao = $_POST['descricao'];
	$pasta='imagensRecebidas';//nome da pasta destino
	$permitido=array('image/jpg','image/jpeg','image/pjpeg','image/png');
	$img=$_FILES['imagem'];
	$tmp=$img['tmp_name'];
	$name=$img['name'];
	$type=$img['type'];
		include("conexao.php");
		mysql_select_db("ajust");
		require('funcao.php');
		if(!empty($name) && in_array($type, $permitido)){
		    $nome='img-'.md5(uniqid(rand(),true)).'.jpg';
		    upload($tmp,$nome,500,$pasta);
		   //Por favor. Sempre que você for usar php com mysql tome cuidado com os apóstrofos
		$inserir = "INSERT INTO tb_problema VALUES (DEFAULT,'$cidade','$descricao','$nome','$cep','$tipo','$nome_rua')";
		      
		 $queryInserir = mysql_query("$inserir");
		      
		}else{
		    echo "Tipo de arquivo invalido envie jpeg";
		}
 mysql_close($conexao);
 header("Location:./index.php");
 ?>