<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width" />
<title>SEE YOUR SPEECH | Home</title>

<link rel="stylesheet" href="/seeyourspeech/scripts/style_red.css" />

<link href="https://fonts.googleapis.com/css?family=Andika" rel="stylesheet" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

<!--stuff for fancy box-->

<!-- Add jQuery library -->
<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>

<!-- Add mousewheel plugin (this is optional) -->
<script type="text/javascript" src="/seeyourspeech/scripts/source/jquery.mousewheel-3.0.6.pack.js"></script>

<!-- Add fancyBox -->
<link rel="stylesheet" href="/seeyourspeech/scripts/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
<script type="text/javascript" src="/seeyourspeech/scripts/source/jquery.fancybox.pack.js?v=2.1.5"></script>

<!-- Optionally add helpers - button, thumbnail and/or media -->
<link rel="stylesheet" href="/seeyourspeech/scripts/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" type="text/css" media="screen" />
<script type="text/javascript" src="/seeyourspeech/scripts/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
<script type="text/javascript" src="/seeyourspeech/scripts/source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

<link rel="stylesheet" href="/seeyourspeech/scripts/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" type="text/css" media="screen" />
<script type="text/javascript" src="/seeyourspeech/scripts/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>


<script src="/seeyourspeech/models/funcs.js"></script>

<style>
  .hidden {display: none;}
  .fancybox-title a {color: #fff;}
  body {padding: 20px;}
</style>

<?php
// CW 8/29
$dirlength = strlen(__DIR__)-7;
$perf = substr(substr($_SERVER["SCRIPT_FILENAME"], $dirlength),0,16);
$perf3 = substr(substr($_SERVER["SCRIPT_FILENAME"], $dirlength),0,17);
$perft = substr(substr($_SERVER["SCRIPT_FILENAME"], $dirlength),0,16);
if ($perf == "perform_task.php") {
//  require_once("sys_perform_header.php");
  require_once("/var/www/sysdev/seeyourspeech/scripts/sys_perform_header.php");
} elseif ($perf3 == "perform_task3.php") {
//  require_once("sys_perform_header.php");
  require_once("/var/www/sysdev/seeyourspeech/scripts/sys_perform_header3.php");
} elseif ($perft == "task.php") {
//  require_once("sys_perform_header.php");
  require_once("/var/www/sysdev/seeyourspeech/scripts/sys_perform_header.php");
}

?>

<body>

<div class="wrapper">

  <header>
    <p>See Your Speech</p>
  </header>

<!-- nav -->
  <nav>
    <ul>
      <li><a href="account.php" class="active">Home</a></li>
<?php require_once("/var/www/sysdev/seeyourspeech/usernav.php"); ?>
    </ul>
  </nav>

<!-- end header -->
