/**
 * All of the API Calls used.
 */

/*********************************************************************************
 *********************************************************************************
 * Speech & Audio
 *********************************************************************************
 *********************************************************************************/
// speak(data)
// Converts text to speech and make misty speak.
function speak(data=speech) {
    axios.post("http://" + ip + "/api/tts/speak", data)
        .then(function (response) {
        console.log(`speak was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        })
}

// playAudio(data)
// play audio from misty. Recommend to use audio that is already loaded to misty.
function playAudio(data=sound) {
    axios.post("http://" + ip + "/api/audio/play", data)
        .then(function (response) {
            console.log(`PlayAudio was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

// stopAudio()
// stops the audio that is currently playing.
function stopAudio() {
    axios.post("http://" + ip + "/api/audio/stop")
        .then(function (response) {
            console.log(`StopAudio was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

/*********************************************************************************
 *********************************************************************************
 * Expression
 *********************************************************************************
 *********************************************************************************/
// displayImage(data)
// Display an image (eyes) to misty's face. 
function displayImage(data=image) {
    axios.post("http://" + ip + "/api/images/display", data)
        .then(function (response) {
            console.log(`displayImage was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        })
}

// getBlinkSettings()
// Gets an array of eyes that currently blinks. 
function getBlinkSettings() {
    axios.get("http://" + ip + "/api/blink/settings").then(function (res) {
        blink["BlinkImages"] = res.data.result.blinkImages;
        console.log("Current blinking eyes: ", blink)
    })
}

// setBlinkSettings()
// Add new pair of eyes to the blinking set.
function setBlinkSettings(newPair=newblinkPair, data=blink) {
    data["BlinkImages"] = newPair
    axios.post("http://" + ip + "/api/blink/settings", data)
    .then(function (response) {
                console.log(`SetBlinkSettings was a ${response.data.status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            })
        
}

/*********************************************************************************
 *********************************************************************************
 * Locomotion
 *********************************************************************************
 *********************************************************************************/
function moveArm(oneArm, position, velocity, data=arm) {
    if (oneArm) {
        data["Arm"] = oneArm;
    }
    if (position) {
        data["Position"] = position;
    }
    if (velocity) {
        data["Velocity"] = velocity;
    }
    axios.post("http://" + ip + "/api/arms", data)
        .then(function (response) {
            console.log(`MoveArm was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

function moveArms(leftArm, rightArm, leftVelocity, rightVelocity, data=arms) {
    if (leftArm) {
        data["LeftArmPosition"] = leftArm;
    }
    if (rightArm) {
        data["RightArmPosition"] = rightArm;
    }
    if (leftVelocity) {
        data["LeftArmVelocity"] = leftVelocity;
    }
    if (rightVelocity) {
        data["RightArmVelocity"] = rightVelocity;
    }
    axios.post("http://" + ip + "/api/arms/set", data)
        .then(function (response) {
            console.log(`MoveArms was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

function moveHead(pitch, roll, yaw, velocity, data=head) {
    if (pitch) {
        data["Pitch"] = pitch
    }
    if (roll) {
        data["Roll"] = roll
    }
    if (yaw) {
        data["Yaw"] = yaw
    }
    if (velocity) {
        data["Velocity"] = velocity
    }
    axios.post("http://" + ip + "/api/head", data)
        .then(function (response) {
            console.log(`MoveHead was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

/*********************************************************************************
 *********************************************************************************
 * Streaming
 *********************************************************************************
 *********************************************************************************/
// Posts API call to enable AV Streaming service.
function enableAvStreamingService() {
    axios.post("http://" + ip + "/api/services/avstreaming/enable")
        .then(function (response) {
            console.log(`EnableAvStreamingService was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

// Posts API call to disable AV Streaming service.
function disableAvStreamingService() {
    axios.post("http://" + ip + "/api/services/avstreaming/disable")
        .then(function (response) {
            console.log(`DisableAvStreamingService was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

// Posts API call to start AV streaming.
function startAvStreaming(data=stream) {
    axios.post("http://" + ip + "/api/avstreaming/start", data)
        .then(function (response) {
            console.log(`StartAvStreaming was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}

// Posts API call to stop AV streaming.
function stopAvStreaming() {
    axios.post("http://" + ip + "/api/avstreaming/stop")
        .then(function (response) {
            console.log(`StopAvStreaming was a ${response.data.status}`);
        })
        .catch(function (error) {
            console.log(`There was an error with the request ${error}`);
        });
}



