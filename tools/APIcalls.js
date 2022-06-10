/**
 * All of the API Calls used.
 */

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

// Posts API call to enable AV Streaming service.
function enableAvStreamingService() {
    axios.post("http://" + ip + "/api/services/avstreaming/enable")
        .then(function (response) {
            // Print the results
            console.log(`EnableAvStreamingService was a ${response.data.status}`);
        })
        // Use .catch() to handle errors
        .catch(function (error) {
            // Print any errors
            console.log(`There was an error with the request ${error}`);
        });
}

// Posts API call to disable AV Streaming service.
function disableAvStreamingService() {
    axios.post("http://" + ip + "/api/services/avstreaming/disable")
        .then(function (response) {
            // Print the results
            console.log(`DisableAvStreamingService was a ${response.data.status}`);
        })
        // Use .catch() to handle errors
        .catch(function (error) {
            // Print any errors
            console.log(`There was an error with the request ${error}`);
        });
}

// Posts API call to start AV streaming.
function startAvStreaming(data=stream) {
    axios.post("http://" + ip + "/api/avstreaming/start", data)
        .then(function (response) {
            // Print the results
            console.log(`StartAvStreaming was a ${response.data.status}`);
        })
        // Use .catch() to handle errors
        .catch(function (error) {
            // Print any errors
            console.log(`There was an error with the request ${error}`);
        });
}

// Posts API call to stop AV streaming.
function stopAvStreaming() {
    axios.post("http://" + ip + "/api/avstreaming/stop")
        .then(function (response) {
            // Print the results
            console.log(`StopAvStreaming was a ${response.data.status}`);
        })
        // Use .catch() to handle errors
        .catch(function (error) {
            // Print any errors
            console.log(`There was an error with the request ${error}`);
        });
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
    // console.log(data)
    axios.post("http://" + ip + "/api/blink/settings", data)
    .then(function (response) {
                console.log(`SetBlinkSettings was a ${response.data.status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            })
        
}

