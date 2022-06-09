Ruth Mueller  6/9/22
rmueller@hmc.edu

I tried a few ways to get a microcontroller to write to the misty robot

First, I used the RED-V thing plus micrcontroller (files for this are under 
Misty_Switch, and I used the SEGGER imbedded studio for RISC-V 6.12a ide to write+download
the code), but while the uart was running nicely as viewed on an oscilliscope, I couldn't 
get misty to pick it up
	This code reads the switch pin, writes to another, and times how long the switch is 
	on/off, and writes when and for how long it's switched to the computer.

Then, I used the Hummingbird Duo arduino board that was in the lab, which I programmed 
in the Arduino IDE (I had to download a hummingbird specific file+driver, online documentation
was pretty solid), to do the same things because the misty documentation (after the update) 
mainly just had a section of arduino code and code to put on misty to get the uart working, 
however the hummingbird (despite communicating with the computer nicely) wasn't even sending
anything to the tx and rx pins of the board, so naturally misty wasn't picking anything up 
even if the uart was functioning correctly.  