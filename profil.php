<?php 

session_start();
if (!isset($_SESSION['rides_info'])){
        header('Location: https://theo.delemazure.fr/velib/index.php');
		  exit();
	
	
}
$page = $_SESSION['rides_info'];
$money = $_SESSION['payments_info'];
$user = $_SESSION['user_info'];

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
			<li class='current'><a href="profil.php" >Profil</a></li>
			<li><a href="graphique.php">Graphiques</a></li>
			<li><a href="badges .php">Badges</a></li>
			<li><a href="classement.php" >Classement</a></li>
			<li><a href="trajets.php">Trajets</a></li>
			<li id="logout"><a href="logout.php">Se Déconnecter</a></li>
			</ul>
		</nav>

	</header>
	<body>
	<div id="profil_container">
	<div id="profil_subcontainer">
	<div id="profil_userInfo">
		<h2 id="userName"></h2>
		<h3 id="userAbo"></h3>
	</div>
	<div id="profil_lastRides">
		<h2>Derniers trajets</h2>
		<div id="profil_lastRidesT">
	
	</div>
	</div>
	</div>
	<div id="profil_statistics">
		<h2>Statistiques</h2>
	<table>
	<tr><td>Distance totale :</td><td id="statTotalDist"></td></tr>
	<tr><td>Distance totale (electrique) :</td><td  id="statTotalDistElec"></td></tr>
	<tr><td>Distance totale (mécanique) :</td><td  id="statTotalDistMeca"></td></tr>
	<tr><td>Distance ce mois-ci :</td><td  id="statTotalDistMonth"></td></tr>
	<tr><td>CO2 economisé :</td><td  id="statTotalCO2"></td></tr>
	<tr><td>Temps de velib total :</td><td  id="statTotalTime"></td></tr>
	<tr><td>Voyage le plus long :</td><td  id="statLongestTrip"></td></tr>
	<tr><td>Dépenses totale :</td><td  id="statTotalDepenses"></td></tr>
	<tr><td>Dépenses par km :</td><td id="statPrixKm"></td></tr>
	</table>
	
	</div>
	</div>
		</body>
	<script>
var json_page = <?php echo $page; ?>;
var json_money = <?php echo $money; ?>;
var json_user = <?php echo $user; ?>;
	var rides  = getRides(json_page);
	var money = getPayments(json_money);
	var stats = getStats(rides);
	var userInfo = getInfos(json_user);
	var userName = document.getElementById("userName");
	userName.innerHTML = userInfo[0];
	var userAbo = document.getElementById("userAbo");
	
	userAbo.innerHTML = "Abonnement : "+userInfo[1] + " (termine le "+userInfo[3].getDate()+"/"+(userInfo[3].getMonth()+1)+"/"+userInfo[3].getFullYear()+")";
	var rowTotalDist = document.getElementById("statTotalDist");
	rowTotalDist.innerHTML = Math.round(1000*stats[0])/1000 + " km";
	var rowTotalDistElec = document.getElementById("statTotalDistElec");
	rowTotalDistElec.innerHTML = Math.round(1000*stats[1])/1000 + " km";
	var rowTotalDistMeca = document.getElementById("statTotalDistMeca");
	rowTotalDistMeca.innerHTML = Math.round(1000*stats[2])/1000 + " km";
	var rowTotalDistMonth = document.getElementById("statTotalDistMonth");
	rowTotalDistMonth.innerHTML = Math.round(1000*stats[3])/1000 + " km";
	var rowTotalCO2 = document.getElementById("statTotalCO2");
	rowTotalCO2.innerHTML = Math.round(stats[0]*111)/1000 + " kg";
	var rowTotalTime = document.getElementById("statTotalTime");
	rowTotalTime.innerHTML = Math.floor(stats[4]/3600) + " h " + Math.floor((stats[4]%3600)/60) + " m ";
	var rowLongestTrip = document.getElementById("statLongestTrip");
	rowLongestTrip.innerHTML = Math.round(1000*stats[5])/1000 + " km";
	var rowTotalDepenses = document.getElementById("statTotalDepenses");
	rowTotalDepenses.innerHTML = Math.round(100*money)/100 + " €";
	var rowPrixKm = document.getElementById("statPrixKm");
	rowPrixKm.innerHTML = Math.round(100*money/stats[0])/100 + " €/km";
	
	
	var listRides = outputRides(rides,0,2);
	var trajetList = document.getElementById("profil_lastRidesT");
	trajetList.innerHTML += listRides[0];
	</script>
	</html>