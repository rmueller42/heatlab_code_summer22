# HRI Summer Research 2022
This is a repository for all the works done in HRI research by research assistant 
Ruth Mueller, Aoi Yasuda, and primary investigator Blake Jackson. 

## Folders
### AudioFiles
### Image_Files
### javascript_HelloWorld
### Misty_helloworld_folder
### node_modules
### Playground
- Folder that contains `playground.html` and `Playground.js` (and `LightSocket.js`). 
I use this to play around with misty and test out functions before actually implementing 
to `index.html`, which is our experiment platform. 
### Switch_and_uart_with_misty_didn't_work
### tools
- Folder that contains tools that are used in the main code. 
    1. `APIcalls.js` is where all of the API calls made to misty are stored. If you want to
    make an API call, either 1) use the function that corresponds to the API that you want 
    to use, or create a new function that with the API call that you want to make.
    2. `Data.js` is where all of the data that you need when making API POST (sending data 
    to misty) are initialized. DO NOT change the name of each data, but you can change the 
    values that are within.
    3. `LightSocket.js` is a file that has been donwloaded from Misty Robotics. It enables 
    easy opening/closing to misty's Websocket. You will need to use it if you want to get 
    live data from misty (bump sensor, touch sensor, etc.)

## Main Files
1. `index.html`
    - This file determines the structure of the experiment platform page. If you want to add
    a button, or text, and anything else on the display. HTML file doesn't define functions 
    (that is done in the javascript files) but calls on them.
2. `style.css`
    - This file determines how the experiment platform page looks. HTML file by itself makes the
    page look very ugly but by using css, you can style it nicely. For now, I don't have much in 
    there so we can work on improving it later on.
2. `Speak.js`
    - This file is where all of the functions related to speak command is defined. 
3.  `AvStreaming.js`
    - This file is where functions related to AV streaming are defined.
4.  `ReactionButtonPress.js`
    - This file is where misty's reactions to button press is defined. 
5.  `Actions.js` (working)
    - This file is where misty's actions in relation to its speech (e.g. moving left arm up
    when sayinng hello) are defined. It is still a working file.

