// This file contains the main logic for the face detection application.
// It initializes the camera, detects faces, and analyzes user focus based on head position and eye state.

let video;
let faceapi;
let detections = [];
let countdownTimer;
let learningTime = 30; // Set learning time in seconds

function setup() {
    createCanvas(640, 480);
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
    console.log('FaceAPI model loaded!');
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
    drawDetections();
    checkUserFocus();
}

function drawDetections() {
    if (detections.length > 0) {
        for (let i = 0; i < detections.length; i++) {
            const { alignedRect } = detections[i];
            noFill();
            stroke(0, 255, 0);
            rect(alignedRect.x, alignedRect.y, alignedRect.width, alignedRect.height);
        }
    }
}

function checkUserFocus() {
    if (detections.length > 0) {
        const { landmarks } = detections[0];
        const leftEye = landmarks[36];
        const rightEye = landmarks[45];
        const eyeDistance = dist(leftEye[0], leftEye[1], rightEye[0], rightEye[1]);

        if (eyeDistance < 30) {
            console.log('User is likely to be drowsy.');
            startCountdown();
        } else {
            resetCountdown();
        }
    }
}

function startCountdown() {
    if (!countdownTimer) {
        countdownTimer = setInterval(() => {
            learningTime--;
            console.log(`Learning time remaining: ${learningTime} seconds`);
            if (learningTime <= 0) {
                clearInterval(countdownTimer);
                countdownTimer = null;
                alert('Learning time is over!');
                learningTime = 30; // Reset learning time
            }
        }, 1000);
    }
}

function resetCountdown() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        learningTime = 30; // Reset learning time
    }
}