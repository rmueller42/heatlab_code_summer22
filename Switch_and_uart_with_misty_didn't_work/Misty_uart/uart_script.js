// 6/4/22 uart_script.js  Ruth Mueller
// using the misty hello world tutorial: https://docs.mistyrobotics.com/misty-ii/get-started/hello-world/

/*File summary:
    MistyHelloWorld.js  :  the code file, (logic+commands)
    JSON meta file, initial settings and parameters
    API reference link https://docs.mistyrobotics.com/misty-ii/javascript-sdk/api-reference/#misty-registertimerevent 

    To connect to misty and use the onboard ide, put http:/172.28.123.134  into the web browser when connected
    via the same internet (misty's ide is hosted on misty, via the ip address)

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

//---------------------hello calls for robot life
playHello();
misty.Debug("  ________________DEBUG_MESSAGE: AAAAAAAAA");

// Register for SerialMessage events and add SerialMessage as a return property
misty.AddReturnProperty("SerialMessage", "SerialMessage");
misty.RegisterEvent("SerialMessage", "SerialMessage", 0, true);

function _SerialMessage(data) {
    misty.Debug("Serial message called!!");
    if(data !== undefined && data !== null) {
        // Parse SerialMessage data and assign it to a variable
        var obj = JSON.parse(data.AdditionalResults[0].Message);
        var temp = obj.temperature;
        var pressure = obj.pressure;
        misty.Debug("temp: "+temp+" pressure: "+pressure);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       UART RETURN FUNC
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       QUICK HELLO
////////////////////////////////////////////////////////////////////////////////////////////////////

// Waves Misty's right arm!
function waveRightArm() {
    misty.Debug("  ________________DEBUG_MESSAGE: WaveRightArm Called");
    misty.MoveArmDegrees("right", -80, 30); // Right arm up to wave
    misty.Pause(2000); // Pause with arm up for 3 seconds
    misty.MoveArmDegrees("both", 80, 30); // Both arms down
}

function playHello() {  // waves right arm, says hello, and prints hello nerds at the same time

    misty.DisplayImage("e_eye3.jpg");
    misty.Debug("  ________________DEBUG_MESSAGE: playHello called");

    misty.waveRightArm();
    misty.MoveHeadDegrees(-20, 0, 0, null, 0.5); // set misty to look up slightly
    misty.Pause(2000);
    misty.PlayAudio("s_PhraseHello.wav", 50);  // SAY HELLO (commented out to avoid bugging people in lab)
    //misty.DisplayText("Hello Nerds!", "text_layer");
    misty.Pause(2000);
    misty.SetTextDisplaySettings("text_layer", false, true,false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       MISC. FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////

// Returns a random int between min and max, copied from tutorial
function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min)+1)+min;
}