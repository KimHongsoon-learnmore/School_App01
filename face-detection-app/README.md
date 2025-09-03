# Face Detection Web Application

This project is a face detection web application that utilizes ml5.js to monitor user focus and analyze interactions. The application detects facial landmarks and assesses user attention based on head position and eye status.

## Project Structure

```
face-detection-app
├── css
│   └── styles.css
├── js
│   ├── app.js
│   └── faceDetection.js
├── index.html
└── README.md
```

## Files Overview

- **index.html**: The main HTML file for the web application. It sets up the structure for face detection using ml5.js and includes UI elements for user interaction and learning time settings.

- **css/styles.css**: This file defines the styles for the web application, enhancing user experience through layout, colors, fonts, and other visual elements.

- **js/app.js**: Contains the main logic of the application. It handles face detection through the camera, analyzes head position and eye status to determine drowsiness, and implements learning time settings and countdown functionality.

- **js/faceDetection.js**: Utilizes ml5.js's face mesh feature to detect facial landmarks. It tracks key coordinates and manages scenarios where the face may leave the screen.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd face-detection-app
   ```

3. Open `index.html` in a web browser to run the application.

## Usage

- Upon opening the application, allow camera access to enable face detection.
- Adjust the learning time settings as needed.
- The application will analyze user interactions and provide feedback based on detected facial landmarks.

## Features

- Real-time face detection using ml5.js.
- User focus monitoring with analysis of head position and eye status.
- Customizable learning time settings with countdown functionality.