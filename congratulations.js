logEvent('PageLoad', { pageName: 'congratulations' });

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');

    const attempts = localStorage.getItem('attempts');
    console.log(attempts);
    const totalTime = Math.floor((Date.now() - parseInt(localStorage.getItem('startTime'))) / 1000);

    const congratulationsMessage = document.getElementById('congratsMessage');
    congratulationsMessage.textContent = `Congratulations ${firstName} ${lastName}, you have completed the online steps of sign up in ${attempts} attempts over ${totalTime} seconds. Please show this screen to a member of staff to get the next form.`;

});
