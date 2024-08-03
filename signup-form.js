document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const errorContinueButton = document.getElementById('errorContinueButton');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;

        if (firstName !== firstName.toLowerCase()) {
            showError('First name must be all lower case.');
            return;
        }

        if (lastName !== lastName.toUpperCase()) {
            showError('Last name must be all upper case.');
            return;
        }

        // Redirect to the congratulations page with the name as a query parameter
        window.location.href = `congratulations.html?firstName=${firstName}&lastName=${lastName}`;
    });

    errorContinueButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Reload to the main site
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    }
});
