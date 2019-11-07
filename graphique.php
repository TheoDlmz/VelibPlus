<?php 

session_start();
if (!isset($_SESSION['rides_info'])){
        header('Location: https://theo.delemazure.fr/velib/index.php');
		  exit();
	
	
}
$page = $_SESSION['rides_info'];

?>	
<html lang="fr-FR">

<head>

	<meta charset="utf-8">
	<title>Velib+</title>
	<link rel="icon" href="../img/iconindex.png"/>
	<link rel="stylesheet" href="./css/style.css" type="text/css"/>
	<script src='velib_functions.js'></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
</head>
<header>
		<h1>Velib + </h1>
		<nav>
			<ul>
			<li><a href="profil.php">Profil</a></li>
			<li class='current'><a href="graphique.php" >Graphiques</a></li>
			<li><a href="badges .php">Badges</a></li>
			<li><a href="classement.php" >Classement</a></li>
			<li><a href="trajets.php">Trajets</a></li>
			<li id="logout"><a href="logout.php">Se Déconnecter</a></li>
			</ul>
		</nav>

	</header>
   <body>
   <div id ="chart_container">
   <div id ="chart_list">
   <ul>
   <li id="DistCumul" class="list_chart">Distance Cumulée</li>
   <li id="DistMonth" class="list_chart">Distance par mois</li>
   <li id="Broken" class="list_chart">Velib cassés</li>
   <li id="DistRide" class="list_chart">Distance par trajet</li>
   <li id="DistTrip" class="list_chart">Distance par voyage</li>
   <li id="DistHour" class="list_chart">Distance par heure du jour</li>
   <li id="DistDay" class="list_chart">Distance par jour de la semaine</li>
   <li id="Speed" class="list_chart">Vitesse</li>
   <li id="TripDay" class="list_chart">Voyages par jour</li>
   <li id="BikeIdDay" class="list_chart">Réutilisation de velibs</li>
   <li id="DistTime" class="list_chart">Relation temps-distance</li>
   <li id="TimeRide" class="list_chart">Temps de trajet</li>
   <li id="DistOneDay" class="list_chart">Distance en une journée</li>
   </ul>
   </div>
   <div id="chart_div">
   <canvas id="chart" class="chart"></canvas>
   </div>
   </div>
   </body>
	<script src='updateChart.js'></script>
	<script>
	var json_page = <?php echo $page; ?>;
	var rides  = getRides(json_page);
	
	var chart_ctx = document.getElementById('chart');
	var chart_line = updateChart(chart_ctx,rides,"DistCumul");

	var chart_list = document.getElementsByClassName("list_chart");

	for(var i = 0;i<chart_list.length;i++){
		e = chart_list[i];
		e.addEventListener("click", (e) => {
			chart_line.destroy();
			chart_line = updateChart(chart_ctx,rides,e.target.id);
		});

	}


	</script>
	</html>