document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const errorContinueButton = document.getElementById('errorContinueButton');
    const timerBar = document.getElementById('timerBar');
    let totalTime = 3 * 60; // Total time in seconds (5 minutes)
    let elapsed = 0;

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

        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            optOut: optOut,
        };

        fetch('https://script.google.com/macros/s/AKfycbx0Mt588DFscOPEETFsMgWMXe8Nu5fhp2SdKCOyfW_8PTOaLS9KrZf5Ggh5mo4Zcfmx6w/exec', {
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
