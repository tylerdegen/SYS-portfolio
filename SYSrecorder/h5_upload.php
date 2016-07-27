<?php

/* for same directory
touch("test.wav");
// pull the raw binary data from the POST array
$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
// decode it
$decodedData = base64_decode($data);
// print out the raw data,
echo ($decodedData);
$filename = "test.wav";
// write the data out to the file
$fp = fopen($filename, 'wb');
fwrite($fp, $decodedData);
fclose($fp);


//for testing pushing to testwavs (it worked!)
$folderfile = "testwavs/test.txt";
touch($folderfile);
$fop = fopen($folderfile, 'a');
fwrite($fop, date("Y-m-d h:m:s") . "\n");
fclose($fop);
*/

//$filename = "testwavs/test" . date("Y-m-d-h.m.s") . ".wav";
//$filename = (isset($_POST['fname'])) ? "testwavs/" . $_POST['fname'] : "testwavs/test" . date("Y-m-d-h.m.s") . ".wav";
//$filename = "/var/www/seeyourspeech/files/" . date("Y-m-d-h.m.s") . ".wav";
$filename = (isset($_POST['fname'])) ? "/var/www/sysdev/seeyourspeech/files/" . $_POST['fname'] : "/var/www/sysdev/seeyourspeech/files/" . date("Y-m-d-h.m.s") . ".h5.wav";

touch($filename);
// pull the raw binary data from the POST array
$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
// decode it
$decodedData = base64_decode($data);
// print out the raw data,
echo ($decodedData);
// write the data out to the file
$fp = fopen($filename, 'wb');
fwrite($fp, $decodedData);
fclose($fp);


?>
