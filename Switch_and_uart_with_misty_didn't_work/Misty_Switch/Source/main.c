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
// lots of help from prof. Harris, thank you!
// (textbook stuff on UART): http://pages.hmc.edu/harris/ddca/ddcarv/DDCArv_Ch9_Harris.pdf 


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
#define MAX_STR_LEN 80 // max string length to transmit over UART

// prototypes
void initialize();
void uartInit(uint32_t baud);
void putCharSerial(uint8_t c);
void putStrSerial(char *str);
uint8_t getCharSerial(void);

/////////////////////////////////////  MAIN ////////////////////////////////////

int main(void) {  // DEBUG: flashes light on pin 5

  // Declare vars
  int lightOut = 0;
  int switchIn = 0;
  int switchInPrev = 0;
  uint64_t timeOn, timeOff, totalTime;
  char str[MAX_STR_LEN];
  char serialReturn;

  initialize();
  uartInit(9600);
  printf("loop starting \n");

  do{
  
    // read and display the user input
    switchIn = digitalRead(SWITCH);
    digitalWrite(RED_LIGHT,switchIn);

    putCharSerial('O');
    //putStrSerial("O");
    //serialReturn = getCharSerial(); // waits until it sees something on the serial port, then returns
    //printf("serial returned: %c \n",serialReturn);

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
  pinMode(SWITCH, INPUT);
  pinMode(RED_LIGHT, OUTPUT);

  return;
}

///////////////////////////////////////////////////////////////////////////////
// UART functions
///////////////////////////////////////////////////////////////////////////////

// from the textbook http://pages.hmc.edu/harris/ddca/ddcarv/DDCArv_Ch9_Harris.pdf
void uartInit(uint32_t baud){
  uint32_t divisor = (19300000/baud) - 1;   // 16MHz tileclock, I found it worked better assuming 20MHz
  printf("divisor: %u \n", divisor);
  pinMode(UART_RX, GPIO_IOF0); 
  pinMode(UART_TX, GPIO_IOF0);

  UART0 -> div.div = divisor;    // set clock divisor
  UART0 -> txctrl.txen = 1;      // enable transmitter
  UART0 -> txctrl.nstop = 1;     // set one stop bit
  UART0 -> rxctrl.rxen = 1;      // enable reciever
}

// also from the textbook example
void putCharSerial(uint8_t c){
  while(UART0 -> txdata.full);
  UART0 -> txdata.tx_data = c;
}

// also from textbook example
void putStrSerial(char *str){  // the string is null terminated
  int i = 0;
  while (str[i] != 0){  // iterate over string
    putCharSerial(str[i++]); // Send each character
  }
}


uint8_t getCharSerial(void) {
  rxdata_bits_uart rxdata; // Create temporary variable to store register
  while(1) {
    rxdata = UART0->rxdata; // Read register exactly once
    if(!rxdata.empty) {
      return (uint8_t)rxdata.rx_data; // Check to see if the data is valid
    }
  }
}
/*************************** End of file *******************************************/
