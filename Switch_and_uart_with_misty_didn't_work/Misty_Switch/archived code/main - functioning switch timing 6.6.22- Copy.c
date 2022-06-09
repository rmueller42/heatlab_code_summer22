/*********************************************************************
*                    SEGGER Microcontroller GmbH                     *
*                        The Embedded Experts                        *
**********************************************************************
*                                                                    *
*            (c) 2014 - 2022 SEGGER Microcontroller GmbH             *
*                                                                    *
*       www.segger.com     Support: support@segger.com               *
*                                                                    *
**********************************************************************
*                                                                    *
* All rights reserved.                                               *
*                                                                    *
* Redistribution and use in source and binary forms, with or         *
* without modification, are permitted provided that the following    *
* condition is met:                                                  *
*                                                                    *
* - Redistributions of source code must retain the above copyright   *
*   notice, this condition and the following disclaimer.             *
*                                                                    *
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND             *
* CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,        *
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF           *
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE           *
* DISCLAIMED. IN NO EVENT SHALL SEGGER Microcontroller BE LIABLE FOR *
* ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR           *
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT  *
* OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;    *
* OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF      *
* LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT          *
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE  *
* USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH   *
* DAMAGE.                                                            *
*                                                                    *
*********************************************************************/

// Ruth Mueller 6/2/2022
// rmueller@hmc.edu
// Adapted from lab 6 Simon says game using two lights


/*
TODO: 
  time how long the switch is on 
  UART with misty
  Talk with Aoi to figure out how to package that info!
*/


#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <time.h>
#include "EasyREDVIO.h"
#include "REDV_UART.h"

#define UART_RX 16
#define UART_TX 17
#define SWITCH 19
#define RED_LIGHT 18

// prototypes
void initialize();

/////////////////////////////////////  MAIN ////////////////////////////////////

int main(void) {  // DEBUG: flashes light on pin 5

  // Declare vars
  int lightOut = 0;
  int switchIn = 0;
  int switchInPrev = 0;
  uint64_t timeOn, timeOff, totalTime;

  initialize();
  printf("loop starting \n");

  do{
  
    // read and display the user input
    switchIn = digitalRead(SWITCH);
    digitalWrite(RED_LIGHT,switchIn);

    /////////////// turns on
    if ((switchIn == 1) && (switchInPrev == 0)){
      // send uart (ON)  
      timeOn = *mtime;  // start timer
      printf("turned on! \n");
      
      // wait a second for any weird stuffs
      uint64_t doneTime = *mtime + 100;
      while (*mtime < doneTime); // wait until time is reached
    }

    /////////////// turns off
    if ((switchIn == 0) && (switchInPrev == 1)){
      // send uart (OFF)
      // end timer
      timeOff = *mtime;
      totalTime = timeOff - timeOn;
      
      // allowing for an unclear switch for a larger totalTime
      printf("totalTime: %u \n", totalTime);
      // send uart totalTime 
      // on misty, divide by 32768 Hz to convert from clock cycles to seconds
    } 
    
    switchInPrev = switchIn;
  } while(1);   

}


/////////////////////////////////////  INITIALIZE ////////////////////////////////////
/* Initializes IO pins
*/
void initialize(){
 
   // Initialize pins
  pinMode(UART_RX, GPIO_IOF0);
  pinMode(UART_TX, GPIO_IOF0);
  pinMode(SWITCH, INPUT);
  pinMode(RED_LIGHT, OUTPUT);

  return;
}


/*************************** End of file *******************************************/
