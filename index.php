	<?php 

session_start();
if (isset($_SESSION['rides_info'])){
        header('Location: https://theo.delemazure.fr/velib/velib.php');
		  exit();
	

}

?>				
<html lang="fr-FR">

<head>

	<meta charset="utf-8">
	<title>Velib+</title>
	<link rel="icon" href="../img/iconindex.png"/>
	<link rel="stylesheet" href="css/style.css" type="text/css"/>
	 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">

</head>
<body>
<div id="outer_login_div">
<div id="login_div">
<h2> Se connecter </h2>

	<form action="login.php" method="post" id="form_login" enctype="multipart/form-data">
<?php if ($_GET['code'] == '0'){ echo "<p style='color:red'> Mauvais identifiants</p>";} ?>
	<table>
<tr><td style="text-align:right;">Email : </td><td><input  type="text" name="username" id="username" ></td></tr>
<tr><td style="text-align:right;">	Password :</td><td> <input  type="password" name="password" id="password" ></td></tr>
</table>
				<p class="disclaimer"> Le site Velib+ ne conserve pas vos identifiants de connexion, ni aucune autre donnée personnelle</p>
          		<button class="button" type="submit" > Login</button></br>

</div>
</div>
</body>
</html>