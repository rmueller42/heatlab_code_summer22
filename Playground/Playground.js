/* GLOBAL VARIABLES*/
const ip = "172.28.92.36";

let text = {
    "Text": ""
}

function displayText(data=text) {
    axios.post("http://" + ip + "/api/text/display", data)
    .then(function (response) {
        console.log(`displayText was a ${response.data.status}`);
    })
    .catch(function (error) {
        console.log(`There was an error with the request ${error}`);
    })
}


