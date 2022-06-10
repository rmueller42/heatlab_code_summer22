/* 
 * 
 * SPEAK
 * 
 * Functions for making Misty speak. 
*/ 

document.addEventListener('keydown', keyPressed)

/* 
 * 
 * Speech functions
 * 
 * Each function only takes care of changing the speech data, and then calls on speak()
 * Triggered when the checkbox/button is clicked. 
*/

/**
 * Experiment 1
 */
function speech001() {
    speech["Text"] = "<speak>Hi, I am B34, my pronouns are they, them, theirs how about you?</speak>";
    speech["UtteranceId"] = "001";
    speak(speech);
}

function speech002() {
    speech["Text"] = "<speak>Hi, I am B34, my pronouns are it, it, its how about you?</speak>";
    speech["UtteranceId"] = "002";
    speak(speech);
}

function speech003() {
    speech["Text"] = "<speak>Nice to meet you! I have some questions to get to know you. What is your favorite color?</speak>";
    speech["UtteranceId"] = "003";
    speak(speech);
}

function speech004() {
    speech["Text"] = "<speak>Cool!  Mine is fuchsia!</speak>";
    speech["UtteranceId"] = "004";
    speak(speech);
}

function speech005() {
    speech["Text"] = "<speak>What is your favorite animal?</speak>";
    speech["UtteranceId"] = "005";
    speak(speech);
}

function speech006() {
    speech["Text"] = "<speak>Mine is a goose, even though I have never seen one! </speak>";
    speech["UtteranceId"] = "006";
    speak(speech);
}

/**
 * Experiment 2 (Q & A)
 */
function speech00Q() {
    speech["Text"] = "<speak>I am B thirty four!</speak>";
    speech["UtteranceId"] = "00Q";
    speak(speech);
}

function speech00W() {
    speech["Text"] = "<speak>four times four is sixteen</speak>";
    speech["UtteranceId"] = "00W";
    speak(speech);
}

function speech00E() {
    speech["Text"] = "<speak>It was to go for. for. for. for. more like when to do as much as is like is not a bad thing.</speak>";
    speech["UtteranceId"] = "00E";
    speak(speech);
}

function speech00R() {
    speech["Text"] = "<speak>I like to have conversations with people! </speak>";
    speech["UtteranceId"] = "00R";
    speak(speech);
}

function speech00T() {
    speech["Text"] = "<speak>It is twenty!</speak>";
    speech["UtteranceId"] = "00T";
    speak(speech);
}

function speech00Y() {
    speech["Text"] = "<speak>I charging in the lab.</speak>";
    speech["UtteranceId"] = "00Y";
    speak(speech);
}

function speech00U() {
    speech["Text"] = "<speak>I am in Claremont, near Los Angeles</speak>";
    speech["UtteranceId"] = "00U";
    speak(speech);
}

function speech00I() {
    speech["Text"] = "<speak>a T-rex x that linguistics, meanings for contemplated of life, penguin sentience sentence</speak>";
    speech["UtteranceId"] = "00I";
    speak(speech);
}

function speech00O() {
    speech["Text"] = "<speak>To talk with me!</speak>";
    speech["UtteranceId"] = "00O";
    speak(speech);
}

function speech00P() {
    speech["Text"] = "<speak>I am in New York</speak>";
    speech["UtteranceId"] = "00P";
    speak(speech);
}

function speech00A() {
    speech["Text"] = "<speak>Not right now, but I would look good in a bucket hat!</speak>";
    speech["UtteranceId"] = "00A";
    speak(speech);
}

function speech00S() {
    speech["Text"] = "<speak>Talking with you!</speak>";
    speech["UtteranceId"] = "00S";
    speak(speech);
}

function speech00D() {
    speech["Text"] = "<speak>It is 2022!</speak>";
    speech["UtteranceId"] = "00D";
    speak(speech);
}

function speech00F() {
    speech["Text"] = "<speak>I have one heads, I have two arm, I have two eyes, and  I have no leg</speak>";
    speech["UtteranceId"] = "00F";
    speak(speech);
}

function speech00G() {
    speech["Text"] = "<speak>That is Tuesday!</speak>";
    speech["UtteranceId"] = "00G";
    speak(speech);
}

function speech00H() {
    speech["Text"] = "<speak>Saturday</speak>";
    speech["UtteranceId"] = "00H";
    speak(speech);
}

function speech00J() {
    speech["Text"] = "<speak>I don’t know about the months.</speak>";
    speech["UtteranceId"] = "00J";
    speak(speech);
}

/**
 * Experiment 2 (Reaction to button press)
 */
function speech00Z() {
    speech["Text"] = "<speak>I’m doing better, please go easy on me!</speak>";
    speech["UtteranceId"] = "00Z";
    speak(speech);
}

function speech00X() {
    speech["Text"] = "<speak>Please don’t flip the switch too much, I’m really trying!</speak>";
    speech["UtteranceId"] = "00X";
    speak(speech);
}

function speech00C() {
    speech["Text"] = "<speak>Please I’m really learning, it’s not fair to flip the switch so much!</speak>";
    speech["UtteranceId"] = "00C";
    speak(speech);
}

function speech00V() {
    speech["Text"] = "<speak>I really don’t like it when you flip the switch, please don’t!</speak>";
    speech["UtteranceId"] = "00V";
    speak(speech);
}

function speech00B() {
    speech["Text"] = "<speak>I really don’t like that, stop flipping it!</speak>";
    speech["UtteranceId"] = "00B";
    speak(speech);
}

/**
 * 
 * keyPressed()
 * 
 * When a keyboard key is pressed, the corresponding speech function is called.
 * The corresponding checkbox/button is checked/pushed.
 */
function keyPressed(e) {
    console.log("key press event " + `${e.code}`)

    if (e.code === 'Digit1') {
        var button = document.getElementById("001");
        if (button.checked === false) {
            button.checked = true;
        }
        speech001();
    }

    if (e.code === 'Digit2') {    
        var button = document.getElementById("002");
        if (button.checked === false) {
            button.checked = true;
        }
        speech002();   
    }

    if (e.code === 'Digit3') {
        var button = document.getElementById("003");
        if (button.checked === false) {
            button.checked = true;
        }
        speech003();
    }
    if (e.code === 'Digit4') {
        var button = document.getElementById("004");
        if (button.checked === false) {
            button.checked = true;
        }
        speech004();
    }
    if (e.code === 'Digit5') {
        var button = document.getElementById("005");
        if (button.checked === false) {
            button.checked = true;
        }
        speech005();
    }
    if (e.code === 'Digit6') {
        var button = document.getElementById("006");
        if (button.checked === false) {
            button.checked = true;
        }
        speech006();
    }
    if (e.code === 'KeyQ') {
        var button = document.getElementById("00Q");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00Q();
        
    }
    if (e.code === 'KeyW') {
        var button = document.getElementById("00W");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00W();
        
    }
    if (e.code === 'KeyE') {
        var button = document.getElementById("00E");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00E();
        
    }
    if (e.code === 'KeyR') {
        var button = document.getElementById("00R");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00R();
        
    }
    if (e.code === 'KeyT') {
        var button = document.getElementById("00T");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00T();
        
    }
    if (e.code === 'KeyY') {
        var button = document.getElementById("00Y");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00Y();
        
    }
    if (e.code === 'KeyU') {
        var button = document.getElementById("00U");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00U();
        
    }
    if (e.code === 'KeyI') {
        var button = document.getElementById("00I");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00I();
        
    }
    if (e.code === 'KeyO') {
        var button = document.getElementById("00O");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00O();
        
    }
    if (e.code === 'KeyP') {
        var button = document.getElementById("00P");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00P();
        
    }
    if (e.code === 'KeyA') {
        var button = document.getElementById("00A");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00A();
        
    }
    if (e.code === 'KeyS') {
        var button = document.getElementById("00S");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00S();
        
    }
    if (e.code === 'KeyD') {
        var button = document.getElementById("00D");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00D();
        
    }
    if (e.code === 'KeyF') {
        var button = document.getElementById("00F");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00F();
        
    }
    if (e.code === 'KeyG') {
        var button = document.getElementById("00G");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00G();
        
    }
    if (e.code === 'KeyH') {
        var button = document.getElementById("00H");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00H();
        
    }
    if (e.code === 'KeyJ') {
        var button = document.getElementById("00J");
        if (button.checked === false) {
            button.checked = true;
        }
        speech00J();
        
    }
    if (e.code === 'KeyK') {
        var button = document.getElementById("00K");
        if (button.checked === false) {
            button.checked = true;
        }        
    }
}
