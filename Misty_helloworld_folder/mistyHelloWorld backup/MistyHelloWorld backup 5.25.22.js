// 5/16/22 MistyHelloWorld.js  Ruth Mueller
// using the misty hello world tutorial: https://docs.mistyrobotics.com/misty-ii/get-started/hello-world/

/*File summary:
    MistyHelloWorld.js  :  the code file, (logic+commands)
    JSON meta file, initial settings and parameters
    index.html file for printouts and debugging

    API reference link https://docs.mistyrobotics.com/misty-ii/javascript-sdk/api-reference/#misty-registertimerevent 

    To download a skill on misty, go to the skill runner web page on 
    misty robotics, use the IP address to connect, and choose the javascript
    file to download
    the name of the skill should appear under the manage section of the skill 
    runner page, click it to start execution
    skill runner: http://sdk.mistyrobotics.com/skill-runner/index.html 
        I'm having trouble getting the skill runner to connect at all

    I connected the misty using the misty app,
    Misty IP address:  172.28.123.134
    * any spaced in typing in the IP address will cause it to fail
    Claremont-ETC

    to run: Cntrl+shift+P, make sure to stop skills befre uploading and running;
           validate directory allows you to make the json file if needed
*/


misty.Debug("  ________________DEBUG_MESSAGE: The MistyHelloWorld.js skill is starting!");

// Returns a random int between min and max, copied from tutorial
function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min)+1)+min;
}

//causes an event to happen 
misty.RegisterTimerEvent("_look_around", getRandomInt(5, 10) * 10000, true);
//misty.RegisterTimerEvent("_playHello", getRandomInt(5, 10) * 10000, true);
                        // event name,  duration before trigger, keepAlive
                        // well ... it seems to need this line of code
//

/*
// Callback function to get log file data (not super helpful but whatever)
function _GetLogFile(data) {
    misty.Debug("_______LOG FILE:  " + JSON.stringify(data.Result));
};

misty.GetLogFile();
misty.Debug("got log file");  // see what this outputs!!!
*/

playHello();
misty.Debug("  ________________DEBUG_MESSAGE: AAAAAAAAA");
waveRightArm();
misty.Debug("  ________________DEBUG_MESSAGE: BBBBBBBBB");
// Makes the text layer called "MyTextLayer" invisible
//avStream();
misty.SaveAudio("Filename.wav", "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", false, true);
misty.GetAudioFile("Filename.wav", true);
function _GetAudioFile(data){
    var base64 = data.Result.base64;
    misty.Debug("  ________________DEBUG_MESSAGE: data "+base64);
}
misty.PlayAudio("Filename.wav",50);

//_registerFaceRec();  // lets misty see and respond to someone
//look_around();

// function getData(audioFile, callback) {
//     var reader = new FileReader();
//     reader.onload = function(event) {
//         var data = event.target.result.split(',')
//          , decodedImageData = btoa(data[1]);                    // the actual conversion of data from binary to base64 format
//         callback(decodedImageData);        
//     };
//     reader.readAsDataURL(audioFile);
// }
misty.Debug("  ________________DEBUG_MESSAGE: CCCCCCCCC");

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      HEAD MOVEMENT STUFFS
////////////////////////////////////////////////////////////////////////////////////////////////////

function _look_around(repeat = true) {
    misty.Debug("  ________________DEBUG_MESSAGE: The look_around is starting!");

    // Moves Misty's head to a random position. Adjust the min/max
    // values passed into getRandomInt() to change Misty's range of
    // motion when she calls this method.
    misty.MoveHeadDegrees(
        getRandomInt(-40,20), // Random pitch position between -40 and 20
        getRandomInt(-40,20), // Random roll position between -30 and 30
        getRandomInt(-40,20), // Random yaw position between -40 and 40
        null, // Velocity. Nullable, percentage of max velocity. (We use duration here, instead.)
        getRandomInt(0.5,10)); // Head movement duration, in seconds.
    
    if (repeat){
        misty.RegisterTimerEvent("look_around", getRandomInt(5,10)*1000, true);
    }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      HEAD MOVEMENT STUFFS
////////////////////////////////////////////////////////////////////////////////////////////////////
 

// Waves Misty's right arm!
function waveRightArm() {
    misty.Debug("  ________________DEBUG_MESSAGE: WaveRightArm Called");
    misty.MoveArmDegrees("right", -80, 30); // Right arm up to wave
    misty.Pause(2000); // Pause with arm up for 3 seconds
    misty.MoveArmDegrees("both", 80, 30); // Both arms down
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       Get sound+video lists
////////////////////////////////////////////////////////////////////////////////////////////////////
//  // Plays an audio file at max volume.
// misty.PlayAudio("s_Amazement.wav", volume);
// // Pauses for 3000 milliseconds before executing the next command.
// misty.Pause(3000);

//----------------------------  finding audio on misty ------------------
// Issue command to fetch list of audio clips
//misty.GetAudioList();

// Callback to handle data returned by GetAudioList()
function _GetAudioList(data) {
    misty.Debug("  ________________DEBUG_MESSAGE: GetAudioList called");
    // Check if data was received
    if (data) {
        // Capture the array of files
        let audioArr = data.Result;
        //misty.Debug("  ________________DEBUG_MESSAGE: there's data!");

        for(let i = 0; i<audioArr.length; i++){
            //misty.Debug("  ________________DEBUG_MESSAGE: playing next audio clip: ");
            let soundName = audioArr[i].Name;
            misty.PlayAudio(soundName, 25);  // 25% volume (I think)
            misty.Pause(3000); 
        }
    }
}

// ------------------------------- finding video on misty --------------------------------

//_GetImageList(misty.GetImageList());

function _GetImageList(data) {
    misty.Debug("  ________________DEBUG_MESSAGE: GetImageList called");
     // Check if data was received
     let imageArr = data.Result;
     if (data) {
         // Capture the array of files
         misty.Debug("  ________________DEBUG_MESSAGE: there's data!");
 
         for(let i = 0; i<imageArr.length; i++){
            misty.Debug("  ________________DEBUG_MESSAGE: entered for loop!");
            misty.Debug("length: " + imageArr.length);
             let imageName = imageArr[i].Name;
             misty.DisplayImage(imageName);  // 25% volume (I think)
             misty.Debug("  ________________DEBUG_MESSAGE: image name: " + imageName + "  i: " + i);
             misty.Pause(3000); 
         }
     }
 }


////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       QUICK HELLO
////////////////////////////////////////////////////////////////////////////////////////////////////

function playHello() {  // waves right arm, says hello, and prints hello nerds at the same time
    
    misty.Debug("  ________________DEBUG_MESSAGE: playHello called");

    misty.MoveHeadDegrees(-20, 0, 0, null, 0.5); // set misty to look up slightly
    misty.Pause(2000);

    // misty.SetDefaultVolume(100);
    // misty.StopSpeaking();
    // misty.Speak("misty should say this",false,"utterance_ID", 3000,3000);  // it gets hung up here, goes no further
    // pause(3000);

    misty.MoveArmDegrees("right", -80, 100); // Right arm up to wave
    //misty.PlayAudio("s_PhraseHello.wav", 25);  // SAY HELLO (commented out to avoid bugging people in lab)
    misty.DisplayText("Hello Nerds!", "text_layer");
    misty.Pause(2000);
    misty.MoveArmDegrees("both", 80, 90); // Both arms down
    misty.SetTextDisplaySettings("text_layer", false, true,false);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       AUDIO VISUAL STREAMING
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Valid resolutions (as width x height) for AV streaming are: 1920 x 1280, 1280 x 960, 640 x 480, and 320 x 240.
    transmits to external media server on the same network as the robot (Claremont-ETC)
    You must create and host the media server yourself and configure the server to publish a stream you can view with a streaming client (like VLC).

    API reference on av streaming: https://docs.mistyrobotics.com/misty-ii/javascript-sdk/api-reference/#misty-startavstreaming 

    Misty can't use av streaming and face detection at the same time!!!
        (if we want misty to track where the participants are, then we'll need some other camera + mic in the room)

    There's some kind of streaming on windows media?
    using RTMP

    http://fpdownload.adobe.com/strobe/FlashMediaPlayback_101.swf?src=rtsp://172.28.123.134:1936

        */


// Sets Misty up to act as her own media server. Connect to this stream
// from a client on the same network as Misty. The URL for this stream
// would be: rtsp://<robot-ip-address>:1936,
    // which is rtsp://172.28.123.134:1936

function avStream(){
    misty.Debug("_______________DEBUG_MESSAGE: avstream called")
    misty.EnableAvStreamingService();
    misty.StartAvStreaming("rtspd:1936", 640, 480);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//              FACIAL RECOGNITION (can't be done at the same time as av)
////////////////////////////////////////////////////////////////////////////////////////////////////

// Invoke this function to start Misty recognizing faces.
// this function handles checking to see if Misty sees a face, and calls FaceRec if so
function _registerFaceRec() {
    misty.Debug("  ________________DEBUG_MESSAGE: registerFaceRec Called");
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();
    // If a FaceRecognition event includes a "Label" property,
    // then Misty invokes the _FaceRec callback function.
    misty.AddPropertyTest("FaceRec", "Label", "exists", "", "string");
    // Registers for FaceRecognition events. Sets eventName to FaceRec,
    // debounceMs to 1000, and keepAlive to false.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, true);
}

// FaceRec events invoke this callback function (what Misty does when she sees a face)
function _FaceRec(data) {
    misty.Debug("  ________________DEBUG_MESSAGE: FaceRec Called");
    // Stores the value of the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    // Logs a debug message with the label of the detected face
    misty.Debug("  ________________DEBUG_MESSAGE: Misty sees " + faceDetected);

    // have misty wave and be happy when she sees someone
    misty.DisplayImage("e_Joy.jpg");
    misty.PlayAudio("s_Joy3.wav",20);
    waveRightArm();
    misty.DisplayImage("e_DefaultContent.jpg");
}
