
<?php
/*
UserCake Version: 2.0.2
http://usercake.com
*/

require_once(__DIR__."/models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once(__DIR__."/scripts/simple_html_dom.php");
require_once(__DIR__."/scripts/ohiospeaks_funcs.php");
require_once(__DIR__."/scripts/header.php");
// provides files_webroot, wlist_dir, wavpath, sample_rate, bytes_per_sample, etc.
require_once(__DIR__."/scripts/ohiospeaks_config.php");

//////////////////////////////////////////////////////
// processing code starts here
// main processing (bigfile) variables
$error = "";

$user_id = $loggedInUser->user_id;
$ci_id = (isset($_GET['ci_id'])) ? $_GET['ci_id'] : 25;

// Guise list as of 01/06/2016
// 1 plain
// 2 masculine
// 3 feminine
// 4 appeal_to_men
// 5 appeal_to_women
// 6 repeated
// 7 spanish_plain
$english_guise = new Guise($ci_id, $user_id, 1);
$english_first_wav = $english_guise->getFirstWav();
$english_big_filename = $english_guise->getBigFilename();

// page-specific (subfile) variables
$obstruent_sound = "S";
$sonorant_sound = "EY";

$model_word = "HASTE";
$as_uttered_wav = $english_big_filename .  ".w". $model_word . ".wav";
$as_uttered_eps = $english_big_filename .  ".w". $model_word . ".eps";
$as_uttered_eps_fullpath = $wavpath . $as_uttered_eps;
$as_uttered_png = $english_big_filename .  ".w". $model_word . ".png";
$as_uttered_png_fullpath = $wavpath . $as_uttered_png;

$sample_word1 = "COT";
$sample_word1_wav = $english_big_filename .  ".w". $sample_word1 . ".wav";
$sample_word1_eps = $english_big_filename .  ".w". $sample_word1 . ".eps";
$sample_word1_eps_fullpath = $wavpath . $sample_word1_eps;
$sample_word1_png = $english_big_filename .  ".w". $sample_word1 . ".png";
$sample_word1_png_fullpath = $wavpath . $sample_word1_png;

$sample_word2 = "CAUGHT";
$sample_word2_wav = $english_big_filename .  ".w". $sample_word2 . ".wav";
$sample_word2_eps = $english_big_filename .  ".w". $sample_word2 . ".eps";
$sample_word2_eps_fullpath = $wavpath . $sample_word2_eps;
$sample_word2_png = $english_big_filename .  ".w". $sample_word2 . ".png";
$sample_word2_png_fullpath = $wavpath . $sample_word2_png;

$sample_word3 = "PEACE";
$sample_word3_wav = $english_big_filename .  ".w". $sample_word3 . ".wav";
$sample_word3_eps = $english_big_filename .  ".w". $sample_word3 . ".eps";
$sample_word3_eps_fullpath = $wavpath . $sample_word3_eps;
$sample_word3_png = $english_big_filename .  ".w". $sample_word3 . ".png";
$sample_word3_png_fullpath = $wavpath . $sample_word3_png;

$sample_word4 = "SCHOOL";
$sample_word4_wav = $english_big_filename .  ".w". $sample_word4 . ".wav";
$sample_word4_eps = $english_big_filename .  ".w". $sample_word4 . ".eps";
$sample_word4_eps_fullpath = $wavpath . $sample_word4_eps;
$sample_word4_png = $english_big_filename .  ".w". $sample_word4 . ".png";
$sample_word4_png_fullpath = $wavpath . $sample_word4_png;

// files to check if we've executed the main script -- probably won't change
$check_wav = $wavpath . $english_big_filename . ".wav";
$check_grid = $wavpath . $english_big_filename . ".TextGrid";

// file to check to see if we've executed the subfiles scripts -- page-specific
$check_subfile = $as_uttered_png_fullpath;

// "main function"
// CW TODO seems like there's a better way to structure this, but sick brain isn't coming up with it
if (getRegenStatusByCI($ci_id,$user_id)) { // regenerate?
        if(!processRecordedData($ci_id, $user_id, $english_guise)) { // build main files
                $error .= "Main File Processing Failed<br />\r\n";
        }
        if (!process_ci_25()) { // build subfiles
                $error .= "Subfiles Processing Failed<br />\r\n";
        }
        if (!setRegenStatus($ci_id,$user_id,0)) { // reset regen flag
                $error .= "Regen status not set to zero.<br />\r\n";
        }
}
else {
        if (!(file_exists($check_wav) && file_exists($check_grid))) { // if we don't have both the big wav and the big grid
                if(!processRecordedData($ci_id, $user_id, $english_guise)) { // build main files
                        $error .= "Main File Processing Failed<br />\r\n";
                }
        }
        if (!file_exists($check_subfile)) { // if we don't have the subfile specified
                if (!process_ci_25()) { // build subfiles
                        $error .= "Subfiles Processing Failed<br />\r\n";
                }
        }
}

if ($error != "") {echo "<br />\r\n" . $error;} // echo errors, if there are any

// page-specific (subfile) processing function
function process_ci_25() {
        global $ci_id, $user_id;
        global $english_big_filename;
        global $model_word, $sample_word1, $sample_word2, $sample_word3, $sample_word4;

        makeWordBox($model_word, $english_big_filename); // this is weird though, we kind of want to assign it to some particular variable outside so we can use it.  hacking this wish the globals at the moment.  TODO

        makeWordBox($sample_word1, $english_big_filename);

        makeWordBox($sample_word2, $english_big_filename);

        makeWordBox($sample_word3, $english_big_filename);

        makeWordBox($sample_word4, $english_big_filename);

        return true;
}
// processing code ends here
/////////////////////////////////
?>

  <div id="content">

    <section>

      <article>
        <h1>Item One</h1>
        <p>Some content!</p>
      </article>

    </section>

  </div>
<!--end content-->

<?php require_once(__DIR__."/scripts/footer.php"); ?>
