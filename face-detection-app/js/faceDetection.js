// faceDetection.js

let video;
let faceapi;
let detections = [];

function setup() {
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    const options = {
        withLandmarks: true,
        withDescriptors: false
    };

    faceapi = ml5.faceApi(video, options, modelReady);
}

function modelReady() {
    console.log('FaceAPI model loaded');
    faceapi.detect(gotResults);
}

function gotResults(err, result) {
    if (err) {
        console.error(err);
        return;
    }
    detections = result;
    faceapi.detect(gotResults);
}

function draw() {
    image(video, 0, 0);
    drawFaceLandmarks();
}

function drawFaceLandmarks() {
    if (detections.length > 0) {
        for (let i = 0; i < detections.length; i++) {
            const { alignedRect, landmarks } = detections[i];
            noFill();
            stroke(0, 255, 0);
            strokeWeight(2);
            rect(alignedRect.x, alignedRect.y, alignedRect.width, alignedRect.height);

            for (let j = 0; j < landmarks.length; j++) {
                const { x, y } = landmarks[j];
                fill(255, 0, 0);
                ellipse(x, y, 5, 5);
            }
        }
    }
}