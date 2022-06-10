let created;
let pushed;
let pushedInt;
let released;
let releasedInt;
let timeDiff;
let socket;
let numTimePressed;

const regex = /[0-9]{2}\.[0-9]*/;

function startBumpSensor() {
    numTimePressed = 0;
    socket = new LightSocket(ip, openCallback);
    socket.Connect();
}

function stopBumpSensor() {

    socket.Unsubscribe("BumpSensor");
    socket.Disconnect();
}

function openCallback() {
    console.log("socket opened");
    
    socket.Subscribe("LeftBumpSensor", "BumpSensor", null, 
        "sensorName", "==", "Bump_FrontLeft", null, _leftBumpSensor);

}

function _leftBumpSensor(data) {
    try {
        console.log(data);
        created = data.message.created;
        isContacted = data.message.isContacted;

        if (created !== null && isContacted) {
            numTimePressed++;
            console.log(numTimePressed);
            playSound();
            image["FileName"] = "e_EcstacyHilarious.jpg";
            displayImage(image);
            pushed = created.match(regex);
            pushedInt = parseFloat(pushed);
            
            console.log("Pushed: " + pushed);
        }
        if (created !== null && !isContacted) {
            stopAudio();
            image["FileName"] = "e_eye3.jpg";
            displayImage(image);
            released = created.match(regex);
            releasedInt = parseFloat(released);

            timeDiff = releasedInt - pushedInt;

            console.log("Released: " + released);
            console.log("Duration: " + timeDiff);

        }

    }
    catch(e) {
        console.log("Error: " + e)
    }
}


function playSound() {
    if (numTimePressed === 1) {
        sound["FileName"] = "ringtone.mp3";
    }
    else if (numTimePressed === 2) {
        sound["FileName"] = "starWars.mp3";
    }
    else if (numTimePressed === 3) {
        sound["FileName"] = "oneVoice.mp3";
    }
    else if (numTimePressed === 4) {
        sound["FileName"] = "aThousandMiles.mp3";
    }
    else {
        sound["FileName"] = "piratesOfCaribbean.mp3";
    }
    playAudio(sound);
}
