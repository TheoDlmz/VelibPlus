<?php 

session_start();
if (!isset($_SESSION['rides_info'])){
        header('Location: https://theo.delemazure.fr/velib/index.php');
		  exit();
	
	
}
$page = $_SESSION['rides_info'];
$money = $_SESSION['payments_info'];

?>	
<html lang="fr-FR">

<head>

	<meta charset="utf-8">
	<title>Velib+</title>
	<link rel="icon" href="../img/iconindex.png"/>
	<link rel="stylesheet" href="./css/style.css" type="text/css"/>
	<script src='velib_functions.js'></script>
</head>
<header>
		<h1>Velib + </h1>
		<nav>
			<ul>
			<li><a href="profil.php">Profil</a></li>
			<li><a href="graphique.php">Graphiques</a></li>
			<li><a href="badges .php">Badges</a></li>
			<li class='current'><a href="classement.php">Classement</a></li>
			<li><a href="trajets.php">Trajets</a></li>
			<li id="logout"><a href="logout.php">Se Déconnecter</a></li>
			</ul>
		</nav>

	</header>
	<body>
	</body>
	</html>