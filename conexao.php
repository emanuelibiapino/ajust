<?php
error_reporting (E_ALL & ~ E_NOTICE & ~ E_DEPRECATED);
$conexao = mysql_connect('localhost','root','vertrigo','ajust');
if(!$conexao){
    die('Não foi possível conectar ao banco.Erro detectado:'.mysql_error());
}
mysql_set_charset('utf8',$conexao);

