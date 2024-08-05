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
    // Add event listener to the Instagram button
    document.getElementById('followInstagramButton').addEventListener('click', function() {
        logEvent('ButtonClicked', { pageName: 'congratulations', button: 'insta' });
        window.open('https://www.instagram.com/the_inconvenience_store_uk/');
    });

    document.getElementById('bucketButton').addEventListener('click', function() {
        logEvent('ButtonClicked', { pageName: 'congratulations', button: 'depop' });
        window.open('https://www.depop.com/theinconveniencestore/');
    });

});
