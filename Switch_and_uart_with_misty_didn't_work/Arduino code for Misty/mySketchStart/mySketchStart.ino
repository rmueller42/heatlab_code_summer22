/*
  Button

  Turns on and off a light emitting diode(LED) connected to digital pin 13,
  when pressing a pushbutton attached to pin 2.

  The circuit:
  - LED attached from pin 13 to ground
  - pushbutton attached to pin 2 from +5V
  - 10K resistor attached to pin 2 from ground

  - Note: on most Arduinos there is already an LED on the board
    attached to pin 13.

  created 2005
  by DojoDave <http://www.0j0.org>
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/Button
*/

// constants won't change. They're used here to set pin numbers:
const int buttonPin = 2;         // the number of the pushbutton pin
const int ledPin = LED_BUILTIN;  // the number of the LED pin
  // LED_BUILTIN is set to the correct LED pin independent of which board is used

// variables will change:
int prevButtonState = 0;
int buttonState = 0;         // variable for reading the pushbutton status
long int onTime, offTime;

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  pinMode(1,OUTPUT);
  pinMode(0,INPUT);

  // begin serial communication for computer serial port
  Serial.begin(9600);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if ((buttonState == HIGH) && (prevButtonState == LOW)) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
    Serial.print("Button on! \n");
    onTime = millis();
    delay(2); 
    // I'm including this delay to minimize the effect of metastability on switches,
    // low time marks ar ealso likely instances when the output is having metastability issues
  } else if ((buttonState == LOW) && (prevButtonState == HIGH)) {
    // turn LED off:
    digitalWrite(ledPin, LOW);
    Serial.print("Button off! \n");
    offTime = millis();
    Serial.print(" Time:  "); Serial.print(offTime-onTime); Serial.print("\n \n");
    delay(2);
  }

  prevButtonState = buttonState;
}
