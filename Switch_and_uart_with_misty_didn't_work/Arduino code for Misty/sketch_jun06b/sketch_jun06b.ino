/*
  MyCode
  
  Turns on an LED on for one second, then off for one second, repeatedly.
 */

// constant Vars:
// Pin 13 has an LED connected
int ledPin = 13;
// Pin 2 has the switch connected
int switchPin = 2;

// changing vars:
int buttonState = 0;         // variable for reading the pushbutton status


// the setup routine runs once when you press reset:
void setup() {
  // initialize the digital pin as an output.
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(switchPin, INPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(switchPin);
  
    // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
    
  } else {
    // turn LED off:
    
    digitalWrite(ledPin, LOW);
  }
}
