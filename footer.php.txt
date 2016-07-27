</div> <!-- closes wrapper -->

<!-- begin footer -->

  <footer>
    <img src="/seeyourspeech/images/SYS_footer.png" alt="See Your Speech" width=                                             "119" height="71">
    <p>
    Explore the science hidden in your voice</p>
    <div id="contactUs">
      <p><strong>Contact us</strong><br>
      <a href="mailto:seeyourspeech@osu.edu">seeyourspeech@osu.edu</a>
    </div>
  </footer>

<?php
// CW 8/29
//$dirlength = strlen(__DIR__)+1;
$dirlength = strlen(__DIR__)-7;
$perf = substr(substr($_SERVER["SCRIPT_FILENAME"], $dirlength),0,16);
if ($perf == "perform_task.php") {
    require_once("perform_footer.php");
}
?>

</body>
</html>
