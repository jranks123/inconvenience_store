document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const errorContinueButton = document.getElementById('errorContinueButton');
    const timerBar = document.getElementById('timerBar');
    let totalTime = 3 * 60; // Total time in seconds (5 minutes)
    let elapsed = 0;
    const surveyModal = document.getElementById('surveyModal');
    const feedbackSlider = document.getElementById('feedbackSlider');
    const feedbackValue = document.getElementById('feedbackValue');
    const submitFeedbackButton = document.getElementById('submitFeedbackButton');
    const additionalFeedbackModal = document.getElementById('additionalFeedbackModal');
    const additionalFeedback = document.getElementById('additionalFeedback');
    const submitAdditionalFeedbackButton = document.getElementById('submitAdditionalFeedbackButton');


    function updateTimer() {
        elapsed += 0.25; // Increment elapsed time by 0.25 seconds (quarter of a second)
        let remainingTime = totalTime - Math.floor(elapsed * 4); // Countdown at 4x speed
        if (remainingTime <= 0) {
            timerBar.textContent = "Time's up!";
            showError('You ran out of time');
            // Optionally, you can handle form timeout here
        } else {
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            timerBar.textContent = `You have ${minutes}:${seconds < 10 ? '0' : ''}${seconds} minutes to fill out this form.`;
        }
    }

    setInterval(updateTimer, 250);

    setTimeout(() => {
      surveyModal.style.display = 'block';
    }, 5000);

    feedbackSlider.addEventListener('input', () => {
        feedbackValue.textContent = `${feedbackSlider.value}*`;
    });

    submitFeedbackButton.addEventListener('click', () => {
        if (feedbackSlider.value !== '5') {
            surveyModal.style.display = 'none';
            additionalFeedbackModal.style.display = 'block';
        } else {
            surveyModal.style.display = 'none';
        }
    });

    submitAdditionalFeedbackButton.addEventListener('click', () => {
      if (additionalFeedback.value.trim() === '') {
          additionalFeedbackModal.style.display = 'none';
          showError('We are so sorry that you didn\'t think giving us written feedback was worth your precious time. You must be really important. Maybe try again when you\'ve got capacity to take this seriously.');
      } else {
          additionalFeedbackModal.style.display = 'none';
      }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const optOut = document.getElementById('optOut').checked;

        if (firstName !== firstName.toLowerCase()) {
            showError('First name must be all lower case.');
            return;
        }

        if (lastName !== lastName.toUpperCase()) {
            showError('Last name must be all upper case.');
            return;
        }

        let attempts = parseInt(localStorage.getItem('attempts')) || 0;

        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            optOut: optOut,
            attempts: attempts,
            totalTime: Math.floor((Date.now() - parseInt(localStorage.getItem('startTime'))) / 1000) // Calculate total time in seconds
        };

        fetch('https://script.google.com/macros/s/AKfycbzrR-k6NN2Tev-OptRMBcIHPG6rvlAEVN4STW5nAI_0lsrl1tUPd6bjlQGPIwTy_2k--A/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body: JSON.stringify(formData)
        })
        .then(() => {
            // Since we can't check the response, assume success
            window.location.href = `congratulations.html?firstName=${firstName}&lastName=${lastName}`;
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Failed to submit form. Please try again.');
        });
    });

    errorContinueButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Reload to the main site
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    }
});
