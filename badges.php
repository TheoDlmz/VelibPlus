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
			<li class='current'><a href="badges .php" >Badges</a></li>
			<li><a href="classement.php" >Classement</a></li>
			<li><a href="trajets.php">Trajets</a></li>
			<li id="logout"><a href="logout.php">Se Déconnecter</a></li>
			</ul>
		</nav>

	</header>
	<body>
	<div id="voyage_container" class="badges_container">
	<h2>Carnet de Voyages</h2>
	<div id="voyages">
	</div>
	</div>
	<div id="badges_container" class="badges_container">
	<h2>Badges</h2>
	<div id="badges">
	</div>
	<div id="badges_container" class="badges_container">
	<h2>Evenemments</h2>
	<div id="badges">
	</div>
	</body>
	<script>
	var json_page = <?php echo $page; ?>;
	var rides  = getRides(json_page);
	var elemVoyages = carnetDeVoyage(rides);
	var voyages = document.getElementById("voyages");
	voyages.innerHTML += elemVoyages;
	var elemBadges = badges(rides);
	var badges = document.getElementById("badges");
	badges.innerHTML += elemBadges;
	</script>
	</html>