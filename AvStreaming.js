/**
 * AV Streaming
 */

// Streaming URL: rtsp://172.28.92.36:1936

// Stops code execution for a set amount of time.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start streaming by enabling the av streaming service and then posting API call.
async function startStreaming() {
    enableAvStreamingService();
    await sleep(2000);
    startAvStreaming();

}

// Stop streaming by first calling the API and then disabling the streaming service.
async function stopStreaming() {
    stopAvStreaming();
    await sleep(2000);
    disableAvStreamingService();
}
