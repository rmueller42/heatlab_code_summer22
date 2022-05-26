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

*/

//console.log('Hello Misty!');
misty.Debug("  ________________DEBUG_MESSAGE: The MistyHelloWorld.js skill is starting!");

// Returns a random int between min and max, copied from tutorial
function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min)+1)+min;
}


//causes an event to happen 
misty.RegisterTimerEvent("_look_around", getRandomInt(5, 10) * 10000, true);
misty.RegisterTimerEvent("_playHello", getRandomInt(5, 10) * 10000, true);
                        // event name,  duration before trigger, keepAlive
                        // well ... it seems to need this line of code

playHello();
waveRightArm();
// Makes the text layer called "MyTextLayer" invisible


////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      HEAD MOVEMENT STUFFS
////////////////////////////////////////////////////////////////////////////////////////////////////

function _look_around(repeat = false) {
    
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
        misty.RegisterTimerEvent("look_around", getRandomInt(5,10)*1000, false);
    }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      HEAD MOVEMENT STUFFS
////////////////////////////////////////////////////////////////////////////////////////////////////
 

// Waves Misty's right arm!
function waveRightArm() {
    misty.MoveArmDegrees("right", -80, 30); // Right arm up to wave
    misty.Pause(2000); // Pause with arm up for 3 seconds
    misty.MoveArmDegrees("both", 80, 30); // Both arms down
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       SOUND STUFFS
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
   // misty.Debug("  ________________DEBUG_MESSAGE: GetAudioList called");
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

function playHello() {  // waves right arm, says hello, and prints hello nerds at the same time
    misty.MoveArmDegrees("right", -80, 100); // Right arm up to wave
    misty.PlayAudio("s_PhraseHello.wav", 25);
    misty.DisplayText("Hello Nerds!", "text_layer");
    misty.Pause(1000);
    misty.MoveArmDegrees("both", 80, 90); // Both arms down
    misty.SetTextDisplaySettings("text_layer", false, true,false);
}

