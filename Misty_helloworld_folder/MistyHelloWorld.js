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

//causes an event to happen 
//misty.RegisterTimerEvent("_look_around", getRandomInt(5, 10) * 10000, true);
//misty.RegisterTimerEvent("MyBlink", getRandomInt(2, 10) * 1000, true);  // I want it to blink once I've figured out sound
misty.RegisterTimerEvent("Listening", 2000, true);
_Listening();
_MyBlink();

//---------------------hello calls for robot life
misty.SetBlinkSettings(true);
playHello();
misty.Debug("  ________________DEBUG_MESSAGE: AAAAAAAAA");

misty.Debug("  ________________DEBUG_MESSAGE: BBBBBBBBB"); 

// I'd like to have some kind of setting such that if there's a random blinking event triggered, it doesn't 
//   stop a listening event


////////////////////////////////////////////////////////////////////////////////////////////////////
//                                         AUDIO LOCALIZATION FROM API
////////////////////////////////////////////////////////////////////////////////////////////////////
 
// from https://docs.mistyrobotics.com/v1.12.7.10330/misty-ii/javascript-sdk/code-samples/ 
// Prepares Misty to start listening for audio.

/*
    audio: 
    Straight ahead - 90
*/

function _Listening(){
    misty.Debug("_________________DEBUG_MESSAGE: started Listening");
    registerAudioLocalization();
    misty.StartRecordingAudio("deleteThis.wav"); // Misty must be recording audio to stream audio localization data.
    misty.ChangeLED(0, 0, 255); // Changes LED to blue; "I'm listening!"
    misty.Pause(10000); // Stops recording after 10 seconds. Extend this duration to keep Misty
    misty.StopRecordingAudio();
    misty.ChangeLED(0, 255, 0); // Changes LED to green; "Done listening!"
    misty.Debug("_________________DEBUG_MESSAGE: stopped Listening");
}

// Sets up our SourceTrackDataMessage event listener.
function registerAudioLocalization() {
    misty.AddReturnProperty("soundIn", "DegreeOfArrivalSpeech");
    misty.RegisterEvent("soundIn", "SourceTrackDataMessage", 100, true);
}

// Defines how Misty should respond to soundIn events. Data from each
// soundIn event is passed into this callback function.

//// PROGRESS:  I think the code for where it's looking has a different system of degrees between the location and the head, I shoudl accomidate for that
function _soundIn(data) {
    // Prints the degree of arrival speech as a debug message.
    misty.Debug( "________________DEBUG_MESSAGE: "+ data.AdditionalResults[0].toString() + " <- degree of arrival for detected audio");
    misty.MoveHeadDegrees(-15, 0, 90 -data.AdditionalResults[0], 70);
}

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
// misty.SaveImage("e_eye3.jpg", "");
// misty.Pause(3000); 
// misty.DisplayImage("e_eye3.jpg");  

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
    misty.PlayAudio("s_PhraseHello.wav", 25);  // SAY HELLO (commented out to avoid bugging people in lab)
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
//              FACIAL RECOGNITION (can't be done at the same time as av streaming)
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


// ---------------------My blink function ---------------------------------------
// This is coupled with a callback event, causes the misty to blink every now and then
// the two ee images are hard coded!
function _MyBlink(){
    misty.DisplayImage("e_SystemBlinkStandard.jpg");
    misty.Pause(200); 
    misty.DisplayImage("e_eye3.jpg");
}

// Returns a random int between min and max, copied from tutorial
function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min)+1)+min;
}

