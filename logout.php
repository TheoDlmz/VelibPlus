<?php

session_start();

// Unset all of the session variables.
$_SESSION = array();

session_destroy();
header('Location: https://theo.delemazure.fr/velib/');


?>