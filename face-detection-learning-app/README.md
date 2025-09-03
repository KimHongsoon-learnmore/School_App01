# Face Detection Learning App

This project is an interactive application that utilizes HTML, CSS, and JavaScript to monitor user focus during learning sessions using the ml5.js face detection model. The app activates the camera to analyze the user's concentration levels and provides feedback based on detected facial expressions.

## Features

- Real-time face detection using the ml5.js library.
- User interface for starting/stopping the camera.
- Selection of learning time with a countdown timer.
- Analysis of focus versus distraction during the session.

## Project Structure

```
face-detection-learning-app
├── src
│   ├── index.html          # Main HTML document
│   ├── css
│   │   └── style.css      # Styles for the app
│   ├── js
│   │   ├── app.js         # Main JavaScript file
│   │   ├── faceDetection.js # Face detection implementation
│   │   └── focusTracker.js # Focus tracking logic
│   └── assets
│       └── icons          # Icon assets for the app
├── package.json            # npm configuration file
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd face-detection-learning-app
   ```
3. Install the required dependencies:
   ```
   npm install
   ```

## Usage

1. Open `src/index.html` in your web browser.
2. Allow camera access when prompted.
3. Select your desired learning time and start the session.
4. Monitor the analysis of your focus throughout the learning period.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.