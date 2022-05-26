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

//-------------------  MAIN FUNCTION CALLS, INITIAL THINGS TO DO ---------------------------
// this is where I've been working on new stuff

misty.Debug("  ________________DEBUG_MESSAGE: The MistyHelloWorld.js skill is starting!");

// Returns a random int between min and max, copied from tutorial
function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min)+1)+min;
}

//causes an event to happen 
misty.RegisterTimerEvent("_look_around", getRandomInt(5, 10) * 10000, true);

//---------------------hello calls for robot life
playHello();
misty.Debug("  ________________DEBUG_MESSAGE: AAAAAAAAA");
waveRightArm();
misty.Debug("  ________________DEBUG_MESSAGE: BBBBBBBBB");

//---------------------I'm currently working on misty talking



////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      IMAGE STUFFS
////////////////////////////////////////////////////////////////////////////////////////////////////

// ------------------------------- finding images on misty --------------------------------

/* for SaveImage:
fileName (string) - The name of the image file to save.
data (string) - A Base64-encoded string of the image data.

currently the same deal with the images as the sounds, I don't have a great way to get to base 64
 converting png to base64 with this: https://onlinepngtools.com/convert-png-to-base64 
*/
misty.SaveImage("eye1.jpg", "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");
misty.Pause(3000); 
misty.DisplayImage("eye1.jpg");  

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
             misty.DisplayImage(imageName);  
             misty.Debug("  ________________DEBUG_MESSAGE: image name: " + imageName + "  i: " + i);
             misty.Pause(3000); 
         }
     }
 }

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      HEAD MOVEMENT STUFFS
////////////////////////////////////////////////////////////////////////////////////////////////////

////these commands call look_around, giving misty some basic movement (uncomment to use)
//_registerFaceRec();  // lets misty see and respond to someone
//look_around();

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
//                                      WAVE RIGHT ARM
////////////////////////////////////////////////////////////////////////////////////////////////////
 

// Waves Misty's right arm!
function waveRightArm() {
    misty.Debug("  ________________DEBUG_MESSAGE: WaveRightArm Called");
    misty.MoveArmDegrees("right", -80, 30); // Right arm up to wave
    misty.Pause(2000); // Pause with arm up for 3 seconds
    misty.MoveArmDegrees("both", 80, 30); // Both arms down
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       AUDIO MANAGEMENT
////////////////////////////////////////////////////////////////////////////////////////////////////
//  // Plays an audio file at max volume.
// misty.PlayAudio("s_Amazement.wav", volume);
// // Pauses for 3000 milliseconds before executing the next command.
// misty.Pause(3000);


// //----------------------------  storing audio on misty  ------------------
// // this section is for saving an audio file, only needed for downloading it to misty
// // I've been generating sound at https://ttsmp3.com/, and converting to plain text 64-bit audio
// // at https://base64.guru/converter/encode/audio/mp3 (which is what is put in quotes below)
// misty.SaveAudio("Kendra_-99_Testing.wav", "", false, true);   // this fully downloads the audio onto the misty(??)

// // playing the audio, if you do this immediately after calling save audio, it hasn't
// //      saved the audio yet so you need to stall for a min
// misty.PlayAudio("Kendra_-99_Testing.wav",30);


////Ideally I could use text to speech with misty, but taking an mp3 directly to the device
//// using code would also be an improvment 
//// (possible options?: https://stackoverflow.com/questions/31161897/converting-audio-file-to-base64-using-javascript) 

// asking people on voices: https://docs.google.com/spreadsheets/d/1g86RWDBnq6aDojY5u-BnFFHUBETvCoJhtHWqHpYHGIk/edit#gid=0 

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
            misty.PlayAudio(soundName, 50);  // 25% volume (I think)
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
    transmits to external media server on the same network as the robot (Claremont-ETC)
    I've been using VLC to stream
    API reference on av streaming: https://docs.mistyrobotics.com/misty-ii/javascript-sdk/api-reference/#misty-startavstreaming 

    Misty can't use av streaming and face detection at the same time!!!
        (if we want misty to track where the participants are, then we'll need some other camera + mic in the room)
    using RTMP

    http://fpdownload.adobe.com/strobe/FlashMediaPlayback_101.swf?src=rtsp://172.28.123.134:1936
        */
// Sets Misty up to act as her own media server. Connect to this stream
// from a client on the same network as Misty. The URL for this stream
// would be: rtsp://<robot-ip-address>:1936,
    // which is rtsp://172.28.123.134:1936


////Start av streaming
//avStream();


function avStream(){
    misty.Debug("_______________DEBUG_MESSAGE: avstream called")
    misty.EnableAvStreamingService();
    misty.StartAvStreaming("rtspd:1936", 640, 480);
}
// call misty.StopAvStreaming();  to turn off the cameral

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

////////////////////////////////////////////////////////////////////////////////////////////////////
//                            Background stuffs
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
// Callback function to get log file data (not super helpful but whatever)
function _GetLogFile(data) {
    misty.Debug("_______LOG FILE:  " + JSON.stringify(data.Result));
};
misty.GetLogFile();
misty.Debug("got log file");  // see what this outputs!!!
*/