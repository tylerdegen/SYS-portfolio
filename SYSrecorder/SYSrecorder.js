var leftchannel = [];
var rightchannel = [];
var enabled = false; //added TD 10/20
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = null;
var audioContext = null;
var context = null;
var outputString;

//for assigning functions
var gUM;
var filename = '';
var recordMethod = '';

var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
var day = d.getDate() + 1;
var hour = d.getHours();
var min = d.getMinutes();
var sec = d.getSeconds();
var dateString = year + "-" + month + "-" + day + "--" + hour + "-" + min + "-" + sec;

/*function declarations*/
var startRecord = function () {
    alert("startRecord not defined");
};
var stopRecord = function () {
    alert("stopRecord not defined");
};
var uploadRecording = function () {
    alert("uploadRecording not defined");
};
var playRecording = function () {
    alert("playRecording not defined");
};
var pausePlayRecording = function () {
    alert("pausePlayRecording not defined");
};

var wamiRecBuild = function () {
    alert('getUserMedia not supported in this browser. Attempt to continue with WAMI.');


    recordMethod = 'WAMI';
    // initialize Wami
    Wami.setup({
        id: 'flash' // where to put the flash object
    });

    var suffix = '';
    /*Add conditional for undefined filenames*/
    //filename = dateString + "-" + recordMethod + ".wav";
    var playBackUrl = '';

    // define functions
    startRecord = function startRecordingWAMI(filename) {
        console.log("WAMI start recording!");
        //var suffix = 'wamifallback.wav';
        //recordingUrl = 'http://localhost/temp/wami/test/save_file.php?filename=' + recording;
        //var uploadLink = 'http://research.ling.ohio-state.edu/seeyourspeech/files/wami_save_file.php?filename=' + filename;
        var uploadLink = 'https://research.ling.ohio-state.edu/seeyourspeech/files/wami_save_file.php?filename=' + filename;
        Wami.startRecording(uploadLink);
        // update button attributes
        /*
        record.html('Stop')
            .unbind()
            .click(function () {
            stopRecording();
            });*/
    };

    stopRecord = function stopRecordingWAMI() {
        Wami.stopRecording();
        // get the recording for playback
        //var playBackUrl = 'http://research.ling.ohio-state.edu/seeyourspeech/wami/test/' + suffix;
        var playBackUrl = 'https://research.ling.ohio-state.edu/seeyourspeech/wami/test/' + suffix;

        /*button hack*/
        setTimeout(function(){
            $("#continue").prop("disabled",false);
            $("#slider").text("Continue when ready");
        },4000); // enable button
    };

    playRecording = function startPlayingWAMI() {
        Wami.startPlaying(playBackUrl);
    };

    pausePlayRecording = function stopPlayingWAMI() {
        Wami.stopPlaying();
    };
};

/*
if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

}
*/

/*
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
*/

var promisifiedOldGUM = function(constraints) {

  // First get ahold of getUserMedia, if present
    var getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia);

  // Some browsers just don't implement it - return a rejected promise with an error
  // to keep a consistent interface
    if(!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

  // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
    });

}

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if(navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if(navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
}


var h5RecBuild = function (e) {
    recordMethod = 'JS';

    //is global
//    var success = function success(e) {
        // creates the audio context
        audioContext = window.AudioContext || window.webkitAudioContext;
        context = new audioContext();

        // we query the context sample rate (varies depending on platforms)
        sampleRate = context.sampleRate;
/*  hardcoding sampleRate
    sampleRate = 22500;
*/
        console.log("sample rate is " + sampleRate);

        console.log('succcess');
        enabled = true;
        // creates a gain node
        volume = context.createGain();

        // creates an audio node from the microphone incoming stream
        audioInput = context.createMediaStreamSource(e);

        // connect the stream to the gain node
        audioInput.connect(volume);

        /* From the spec: This value controls how frequently the audioprocess event is
    dispatched and how many sample-frames need to be processed each call.
    Lower values for buffer size will result in a lower (better) latency.
    Higher values will be necessary to avoid audio breakup and glitches */
        var bufferSize = 2048;
        recorder = context.createScriptProcessor(bufferSize, 2, 2);

        recorder.onaudioprocess = function (e) {
            if (!recording) return;
            var left = e.inputBuffer.getChannelData(0);
            var right = e.inputBuffer.getChannelData(1);
            // we clone the samples
            leftchannel.push(new Float32Array(left));
            rightchannel.push(new Float32Array(right));
            recordingLength += bufferSize;
            console.log('recording');
        };

        // we connect the recorder
        volume.connect(recorder);
        recorder.connect(context.destination);
//    };

//    success();

    /*here is where the error handling happens*/


//    navigator.getUserMedia({
//        audio: true
//    }, success, function (e) {
//        alert('Error accessing mic -- now attempting with WAMI');
//        wamiRecBuild();
//        /*functions in JS implicitly return, so will this just not do anything? or will it return from h5 build?*/
//        return;
//    });


//    navigator.getUserMedia({audio: true}, h5RecBuild, wamiRecBuild);

    startRecord = function beginRecord() {
        console.log("beginRecord() invoked");
        recording = true;
        // reset the buffers for the new recording
        leftchannel.length = rightchannel.length = 0;
        recordingLength = 0;
        console.log("beginRecord() ended");
    };


    //IS global
    uploadRecording = function upload(blob, filename) {
//note: this is NOT a standalone function, but rather one taken by endRecord
        console.log("upload invoked with file name = " + filename);
        var reader = new FileReader();
        reader.onload = function (event) {
            var fd = {};
            fd["fname"] = filename;
            fd["data"] = event.target.result;
            $.ajax({
                type: 'POST',
                //url: 'upload.php',
                url: 'h5_upload.php',
                //CW made this relative path hack to account for the fact that the current file lives in scripts/source, and h5_upload lives in scripts
                data: fd,
            }).done(function (data) {
                console.log(data);
                console.log(filename + " saved!");
            });
        };
        reader.readAsDataURL(blob);
        console.log("upload() finished");
    };

    //not global
    var isEnabled = function isEnabled() {
        //for debugging
        document.getElementById("enabled").innerHTML = enabled;
        return enabled;
    };

    //IS global
    stopRecord = function endRecord(filename) {
        console.log("endRecord(" + filename + ") invoked");
        // we stop recording
        recording = false;


        // we flat the left and right channels down
        var leftBuffer = mergeBuffers(leftchannel, recordingLength);
        var rightBuffer = mergeBuffers(rightchannel, recordingLength);
        // we interleave both channels together
        var interleaved = interleave(leftBuffer, rightBuffer);

        // we create our wav file
        var buffer = new ArrayBuffer(44 + interleaved.length * 2);
        var view = new DataView(buffer);

        // RIFF chunk descriptor
        writeUTFBytes(view, 0, 'RIFF');
        //file length, (modify when modifying how many channels??)
        view.setUint32(4, 44 + interleaved.length, true);
        //RIFF type
        writeUTFBytes(view, 8, 'WAVE');
        // FMT sub-chunk
        //format identifier
        writeUTFBytes(view, 12, 'fmt ');
        //format length
        view.setUint32(16, 16, true);
        //sample format (raw)
        view.setUint16(20, 1, true);
        // mono (1 channel)
        view.setUint16(22, 1, true);
        //samplerate
        view.setUint32(24, sampleRate, true);
        //byte rate
        view.setUint32(28, sampleRate * 4, true);
        //block align
        view.setUint16(32, 4, true);
        view.setUint16(34, 16, true);
        // data sub-chunk (mod for channels?)
        writeUTFBytes(view, 36, 'data');
        view.setUint32(40, interleaved.length, true);

        // write the PCM samples (mod for channels?)
        var lng = interleaved.length / 2;
        var index = 44;
        var volume = 1;
        for (var i = 0; i < lng; i++) {
            view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
            index += 2;
        }

        // our final binary blob
        var blob = new Blob([view], {
            type: 'audio/wav'
        });
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        //var link = window.document.getElementById('download');
        //link.href = url;
        console.log(blob.size);
        if (blob.size < 100) { //exact number seems to be 44 for unactivated mics, but for safety's sake
            alert("Your file size was pretty small! Is your mic activated?");
        } else {
            //link.innerHTML = "Click here to download!";
            //upload(blob);
                //var filename = "SYSrecording";
            /*might want a failsafe for if a filename isn't passed*/
                //filename = dateString + "-" + recordMethod + ".wav";
            uploadRecording(blob, filename);
        }
        console.log("endRecord() ended");

    };

    //not global
    var interleave = function interleave(leftChannel, rightChannel) {
        var length = leftChannel.length + rightChannel.length;
        var result = new Float32Array(length);

        var inputIndex = 0;

        for (var i=0; i < leftChannel.length; i++){
            result[i] = 0.5 * (leftChannel[i] + rightChannel[i]);
        }

        return result;
    };

    //not global
    var mergeBuffers = function mergeBuffers(channelBuffer, recordingLength) {
        var result = new Float32Array(recordingLength);
        var offset = 0;
        var lng = channelBuffer.length;
        for (var i = 0; i < lng; i++) {
            var buffer = channelBuffer[i];
            result.set(buffer, offset);
            offset += buffer.length;
        }
        return result;
    };

    //not global
    var writeUTFBytes = function writeUTFBytes(view, offset, string) {
        var lng = string.length;
        for (var i = 0; i < lng; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
};


/*

if (navigator.getUserMedia) {

//    h5RecBuild();
//    navigator.getUserMedia({audio: true}, h5RecBuild, wamiRecBuild);

    navigator.mediaDevices.getUserMedia({audio: true}).then(h5RecBuild).catch(wamiRecBuild);

} else {

    wamiRecBuild();

}

*/


var constraints = {audio: true};
navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){
        h5RecBuild(stream);
    })
    .catch(function(err){
        console.log(err.name + ": " + err.message);
        wamiRecBuild();
    });

console.log("recordMethod is " + recordMethod);
