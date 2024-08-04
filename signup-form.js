document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const errorContinueButton = document.getElementById('errorContinueButton');

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
