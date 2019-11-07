<?php 
session_start (); 
    require_once('WebClient.php');
    $url = 'https://www.velib-metropole.fr/login?redirectAfterLogin=account#/my-runs'; // This a Joomla admin

    $wc = new WebClient();
    $page = $wc->Navigate($url);
    if ($page === FALSE) {
         die('Failed to load login page.');
    }
;

    $post = $wc->getInputs();
    $post['_username'] =  $_POST['username'];
    $post['_password'] = $_POST['password'];

    $page = $wc->Navigate($url, $post);
    if ($page === FALSE) {
        die('Failed to post credentials.');
    }
	

    $page = $wc->Navigate('https://www.velib-metropole.fr/webapi/private/getCourseList');
    if ($page === FALSE) {
        header('Location: https://theo.delemazure.fr/velib/index.php?code=0');
		  exit();
    }
		
$_SESSION['rides_info'] = $page;

    $page = $wc->Navigate('https://www.velib-metropole.fr/webapi/private/getPayments');
    if ($page === FALSE) {
        header('Location: https://theo.delemazure.fr/velib/index.php?code=0');
		  exit();
    }
		
$_SESSION['payments_info'] = $page;


    $page = $wc->Navigate('https://www.velib-metropole.fr/webapi/private/getAllInfosUser');
    if ($page === FALSE) {
        header('Location: https://theo.delemazure.fr/velib/index.php?code=0');
		  exit();
    }
		
$_SESSION['user_info'] = $page;



header('Location: https://theo.delemazure.fr/velib/profil.php');
		  exit();

	

?>	
<html lang="fr-FR">

<head>

	<meta charset="utf-8">
	<title>Velib+</title>
	<link rel="icon" href="../img/iconindex.png"/>
	<link rel="stylesheet" href="../css/style.css" type="text/css"/>

</head>
