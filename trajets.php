<?php 

session_start();
if (!isset($_SESSION['rides_info'])){
        header('Location: https://theo.delemazure.fr/velib/index.php');
		  exit();
	
	
}
$page = $_SESSION['rides_info'];

if (isset($_GET['offset'])){
	$offset = $_GET['offset'];
}else{
	$offset = 0;
}


if (isset($_GET['limit'])){
	$limit = $_GET['limit'];
}else{
	$limit = 12;
}
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
			<li><a href="classement.php" >Classement</a></li>
			<li class='current'><a href="trajets.php">Trajets</a></li>
			<li id="logout"><a href="logout.php">Se Déconnecter</a></li>
			</ul>
		</nav>

	</header>
	<body>
	<div id='trajet_list' >

	</div>
	<div id='boutons'>
	<nav id='firstT' class='clicBouton'>1</nav><nav id='dotDebT'>...</nav><nav id='previousT'  class='clicBouton' ></nav><nav id='thisOneT'> </nav><nav id='nextT' class='clicBouton'></nav><nav id='dotEndT'>...</nav><nav id='lastT'  class='clicBouton'></nav><nav id="allT" class='clicBouton'>Tout afficher</nav>
	</div>
	</body>
	<script>
	var json_page = <?php echo $page; ?>;
	var rides  = getRides(json_page);
	var offset = <?php echo $offset;?>;
	var limit = <?php echo $limit;?>;
	var listRides = outputRides(rides,offset,limit);
	var trajetList = document.getElementById("trajet_list");
	trajetList.innerHTML = listRides[0];
	
	var current = Math.floor(offset/12);
	var maxP = Math.floor(rides.length/12);
	var firstT = document.getElementById("firstT");
	if ((limit == -1) ||(offset < 24)){
		firstT.style.display = "none";
		
	}else{
		firstT.addEventListener("click", (e) => {
window.location.replace("trajets.php");
		});
	
	}
	var dotDebT = document.getElementById("dotDebT");
	if ((limit == -1) || (offset < 36)){
		dotDebT.style.display = "none";
		
	}
	
	
	var previousT = document.getElementById("previousT");
	if ((limit == -1) || (offset < 12)){
		previousT.style.display = "none";
		
	}else{
		previousT.innerHTML = current;
		previousT.addEventListener("click", (e) => {
window.location.replace("trajets.php?offset="+(offset-12));
		});
	}
	
	var thisOneT = document.getElementById("thisOneT");
		var previousT = document.getElementById("previousT");
	if (limit == -1){
		thisOneT.style.display = "none";
		
	}else{
	thisOneT.innerHTML = (current+1);
	}
	
		var nextT = document.getElementById("nextT");
	if ((limit == -1) || (current >= maxP)){
		nextT.style.display = "none";
		
	}else{
		nextT.innerHTML =  current+2;
		nextT.addEventListener("click", (e) => {
window.location.replace("trajets.php?offset="+(offset+12));
		});
	}
	
	var lastT = document.getElementById("lastT");
	if ((limit == -1) || (current >= maxP-1)){
		lastT.style.display = "none";
		
	}else{
		lastT.innerHTML =maxP+1;
		lastT.addEventListener("click", (e) => {
window.location.replace("trajets.php?offset="+(maxP*12));
		});
	}
	var dotEndT = document.getElementById("dotEndT");
	if ((limit == -1) || (current >= maxP-2)){
		dotEndT.style.display = "none";
		
	}
	var allT = document.getElementById("allT");
	if (limit == -1){
		allT.style.display = "none";
	}else{
		
		allT.addEventListener("click", (e) => {
window.location.replace("trajets.php?limit=-1");
		});
	}
	</script>
	</html>