const focusTracker = {
    focusedTime: 0,
    distractedTime: 0,
    isFocused: true,
    focusInterval: null,

    startTracking: function() {
        this.focusInterval = setInterval(() => {
            if (this.isFocused) {
                this.focusedTime++;
            } else {
                this.distractedTime++;
            }
        }, 1000); // Track every second
    },

    stopTracking: function() {
        clearInterval(this.focusInterval);
        this.reportFocusAnalysis();
    },

    setFocus: function(focused) {
        this.isFocused = focused;
    },

    reportFocusAnalysis: function() {
        console.log(`Focused Time: ${this.focusedTime} seconds`);
        console.log(`Distracted Time: ${this.distractedTime} seconds`);
        // Additional analysis logic can be added here
    }
};

export default focusTracker;