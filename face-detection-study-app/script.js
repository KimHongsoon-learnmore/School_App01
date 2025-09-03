// This file contains the JavaScript code for the face detection study app, implementing the functionality as specified.

let video;
let faceapi;
let detections = [];
let studying = false;
let studyTime = 0;
let countdown;
let timerDisplay;

function setup() {
    video = createCapture(VIDEO);
    video.size(800, 800);
    video.hide();

    faceapi = ml5.faceApi(video, { withLandmarks: true, withDescriptors: false }, modelReady);
    faceapi.detect(gotResults);

    timerDisplay = document.getElementById('timerDisplay');
}

function modelReady() {
    console.log('FaceAPI Model Loaded');
}

function gotResults(err, result) {
    if (err) {
        console.error(err);
        return;
    }
    detections = result;
    faceapi.detect(gotResults);
}

function toggleCamera() {
    if (studying) {
        alert("Please stop studying before turning off the camera.");
        return;
    }
    if (video.elt.style.display === "none") {
        video.elt.style.display = "block";
    } else {
        video.elt.style.display = "none";
    }
}

function startStudySession() {
    if (studyTime <= 0) {
        alert("Please select a study time.");
        return;
    }
    studying = true;
    countdown = studyTime * 60; // Convert minutes to seconds
    timerDisplay.innerText = formatTime(countdown);
    const interval = setInterval(() => {
        countdown--;
        timerDisplay.innerText = formatTime(countdown);
        if (countdown <= 0) {
            clearInterval(interval);
            studying = false;
            analyzeStudySession();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function analyzeStudySession() {
    // Placeholder for analysis logic
    alert("Study session complete! Analyzing your performance...");
    // Here you can add logic to analyze the time spent distracted or dozing off
}

document.getElementById('toggleCameraButton').addEventListener('click', toggleCamera);
document.getElementById('startStudyButton').addEventListener('click', startStudySession);
document.getElementById('studyTimeSelect').addEventListener('change', (event) => {
    studyTime = parseInt(event.target.value);
});