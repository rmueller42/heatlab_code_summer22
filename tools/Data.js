let speech = {
    "Text": "",
    "Flush": true,
    "UtteranceId": ""
};

let stream = {
    "URL": "rtspd:1936",
    "Width": 1920,
    "Height": 1080
}

let image = {
    "FileName": "e_eye3.jpg", 
    "Alpha": 1
}

let sound = {
    "FileName": "",
    "Volume": 20
}

let blink = {
    "BlinkImages": "",
    "OpenEyeMinMs" : 1000,
    "OpenEyeMaxMs" : 7000,
    "ClosedEyeMinMs" : 100,
    "ClosedEyeMaxMs" : 200,
    "RevertToDefault": false
}

let newblinkPair = "e_eye3.jpg=e_SystemBlinkStandard.jpg"

let arm = {
    "Arm": "",
    "Position": 0,
    "Velocity": 0,
}

let arms = {
    "LeftArmPosition": 90,
    "RightArmPosition": 90,
    "LeftArmVelocity": 50,
    "RightArmVelocity": 50
}

let head = {
    "Pitch": 0,
    "Roll": 0,
    "Yaw": 0,
    "Velocity": 50
}