/**
 * Actions
 */

// Set misty to neutral state (arms down, head straight)
function neutral() {
    moveArms(90, 90, 100, 100);
    moveHead(0, 0, 0, 100);
}


function hello001() {
    moveArms(-29, 90, 100, 100);
    speech001();
}

function hello002() {
    moveArms(-29, 90, 100, 100);
    speech002();
}

