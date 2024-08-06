document.addEventListener('DOMContentLoaded', function() {
    logEvent('PageLoad', { pageName: 'congratulations' });

    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const howDeepSound = document.getElementById('howDeepSound');
    const laughSound = document.getElementById('laughSound');
    const respectSound = document.getElementById('respectSound');
    const congratsContent = document.getElementById('congratsContent');


    const attempts = localStorage.getItem('attempts');
    console.log(attempts);
    const totalTime = Math.floor((Date.now() - parseInt(localStorage.getItem('startTime'))) / 1000);

    const congratulationsMessage = document.getElementById('congratsMessage');
    if (congratulationsMessage) {
        congratulationsMessage.textContent = `Congratulations ${firstName} ${lastName}, you have completed the online steps of sign up in ${attempts} attempts over ${totalTime} seconds. Please show this screen to a member of staff to get the next form.`;
    }

    // Add event listener to the Instagram button
    const followInstagramButton = document.getElementById('followInstagramButton');
    if (followInstagramButton) {
        followInstagramButton.addEventListener('click', function() {
            logEvent('ButtonClicked', { pageName: 'congratulations', button: 'insta' });
            window.open('https://www.instagram.com/the_inconvenience_store_uk/');
        });
    }

    const bucketButton = document.getElementById('bucketButton');
    if (bucketButton) {
        bucketButton.addEventListener('click', function() {
            logEvent('ButtonClicked', { pageName: 'congratulations', button: 'depop' });
            window.open('https://www.depop.com/theinconveniencestore/');
        });
    }

    // Event listener to hide the overlay
    const overlay1 = document.getElementById('overlay1');
    const overlay2 = document.getElementById('overlay2');
    const overlay3 = document.getElementById('overlay3');

    overlay1.addEventListener('click', function() {
        overlay1.style.display = 'none';
        overlay2.style.display = 'flex';
        laughSound.play()
    });

    overlay2.addEventListener('click', function() {
        overlay2.style.display = 'none';
        overlay3.style.display = 'flex';
        laughSound.pause();
        respectSound.play();
    });

    overlay3.addEventListener('click', function() {
        overlay3.style.display = 'none';
        respectSound.pause();
        howDeepSound.play();
    });


    // Confetti animation
    const confettiContainer = document.querySelector('.confetti');
    if (confettiContainer) {
        for (let i = 0; i < 100; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.classList.add('confetti-piece');
            confettiPiece.style.left = `${Math.random() * 100}%`;
            confettiPiece.style.animationDelay = `${Math.random() * 5}s`;
            confettiPiece.style.animationDuration = `${Math.random() * 2 + 3}s`;
            confettiContainer.appendChild(confettiPiece);
        }
    }
});
