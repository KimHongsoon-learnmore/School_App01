# Face Detection Study App

This project is an interactive web application that utilizes the ml5.js face detection model to help users manage their study sessions. The app features a camera interface, allowing users to monitor their focus and distractions during study time.

## Project Structure

The project consists of the following files:

- **index.html**: This file defines the main HTML structure of the app. It includes a button to turn the camera on and off, a UI element for selecting study time, and a video element to display the camera feed at a size of 800px x 800px. Both JavaScript and CSS are integrated within this file.

- **style.css**: This file contains the styles for the app. The design is set in grayscale, and it includes styles for buttons, the video element, and other UI components to ensure a clean and focused user experience.

- **script.js**: This file implements the functionality of the app using JavaScript. It sets up face detection with the ml5 library, manages the camera toggle feature, handles study time selection and countdown timers, and analyzes the study duration along with the time spent distracted or dozing off.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd face-detection-study-app
   ```

3. Open the `index.html` file in your web browser.

## Usage

1. Click the button at the top of the app to turn on the camera.
2. Select your desired study time from the dropdown menu.
3. Start the study session, and a countdown timer will begin.
4. Once the countdown is complete, the app will analyze your study duration and provide insights on the time spent distracted or dozing off.

## Acknowledgments

This project utilizes the ml5.js library for face detection, which simplifies the process of integrating machine learning into web applications. For more information on ml5.js, visit [ml5js.org](https://ml5js.org).