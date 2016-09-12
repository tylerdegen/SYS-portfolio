# SYS-portfolio
An overview of the work I've committed to See Your Speech.

f_template.php was used as a template for the feedback pages generated for the students after they completed their recording tasks. Though the PHP processing in the beginning may seem daunting, it's easy to adjust as per each course's needs.

fancybox_wrappers.js is code I wrote to facilitate our usage of [fancy box](http://fancyapps.com/fancybox/). If an image has the "fancy" class, the script will wrap it in the appropriate <a> tag to make it work with fancybox. Additionally, if the image has the class "audio", the associated audio tags with the "fancy" class will be pushed as the caption of the fancybox.

header.php and footer.php are the header and footer used for SeeYourSpeech. Similarly, style_red.css is the primary stylesheet for SeeYourSpeech.

The SYSRecorder is the recording tool we use to capture data from the students enrolled in the courses. It works with the [navigator.mediaDevices object](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) and also has fallback compatibility to the flash-based [WAMI recorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices). 
