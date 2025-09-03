const video = document.getElementById('video');
const faceapi = ml5.faceApi(video, modelReady);
let detections = [];

function modelReady() {
    console.log('FaceAPI model loaded');
    faceapi.detect(gotResults);
}

function gotResults(err, results) {
    if (err) {
        console.error(err);
        return;
    }
    detections = results;
    faceapi.detect(gotResults);
}

function setupCamera() {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        video.srcObject = stream;
        video.play();
    }).catch(err => {
        console.error("Error accessing the camera: ", err);
    });
}

function checkFocus() {
    if (detections.length > 0) {
        // Logic to determine if the user is focused or distracted
        const face = detections[0].alignedRect._box;
        // Example condition: if face is not centered in the frame
        if (face.x < video.width / 4 || face.x > (video.width * 3) / 4) {
            console.log('User is distracted');
        } else {
            console.log('User is focused');
        }
    }
}

setupCamera();
setInterval(checkFocus, 1000); // Check focus every second