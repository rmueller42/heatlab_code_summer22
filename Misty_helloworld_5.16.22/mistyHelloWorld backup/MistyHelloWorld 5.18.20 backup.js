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
avStream();
misty.Debug("  ________________DEBUG_MESSAGE: CCCCCCCCC");

//_registerFaceRec();  // lets misty see and respond to someone
//look_around();


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
