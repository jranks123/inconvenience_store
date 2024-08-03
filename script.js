window.onload = function() {
    var popups = ['popup1', 'popup2', 'popup3', 'popup4', 'popup5'];
    var closeButtonPositions = ['close-top-right', 'close-bottom-left', 'close-center', 'close-top-left', 'close-bottom-right'];
    var firstPopupIndex = 0; // Start with the first popup
    var imageBasePath = 'img/'; // Base path for images
    var firstAdClicked = false;

    let displayedBratImages = [];
    let displayedNonBratImages = [];

    // Initialize and display the popups when the page loads
    function initializePopups() {
        showPopup(firstPopupIndex); // Show the first popup

        // Attach close event to each popup
        popups.forEach((popupId, index) => {
            var closeButton = document.getElementById('close-btn' + (index + 1));
            closeButton.addEventListener('click', function() { closePopup(index); });
        });
    }

    function showPopup(index) {
        var popup = document.getElementById(popups[index]);
        var closeButton = popup.querySelector('.close-btn');
        var randomPosition = closeButtonPositions[Math.floor(Math.random() * closeButtonPositions.length)];
        closeButton.className = 'close-btn ' + randomPosition; // Apply random position

        popup.style.display = 'block'; // Show the popup
    }

    function closePopup(index) {
        if (index === 0 && !firstAdClicked) {
            firstAdClicked = true; // Set the flag that the first ad has been clicked
            window.location.href = "mailto:boss@example.com?subject=Not%20feeling%20great&body=Dear%20Alice,%0AI'm%20just%20emailing%20you%20to%20let%20you%20know%20that%20I've%20got%20a%20bit%20of%20a%20head%20cold%20and%20it's%20looking%20like%20I%20might%20not%20be%20able%20to%20make%20it%20in%20on%20Monday.%20It%20really%20seems%20to%20be%20going%20round%20at%20the%20moment!%20I'm%20going%20to%20rest%20up%20-%20hopefully%20see%20you%20Tuesday.%0ABest,%0ABob";
            return; // Exit the function to prevent further actions
        }
        var popup = document.getElementById(popups[index]);
        popup.style.display = 'none'; // Hide the popup

        // Show next popup if exists
        var nextIndex = index + 1;
        if (nextIndex < popups.length) {
            showPopup(nextIndex);
        }
    }

    function loadImages() {
        const imageGrid = document.getElementById('imageGrid');
        imageGrid.innerHTML = ''; // Clear previous images
        displayedBratImages = [];
        displayedNonBratImages = [];

        // First load 3 brat images
        for (let i = 0; i < 3; i++) {
            let img = document.createElement('img');
            img.src = `${imageBasePath}isbrat${i + 1}.png`; // Brat images
            img.dataset.isBrat = 'true';
            displayedBratImages.push(i + 1);
            img.addEventListener('click', function() {
                loadNewImage(this);
            });
            imageGrid.appendChild(img);
        }

        // Then load 6 non-brat images
        for (let i = 0; i < 6; i++) {
            let img = document.createElement('img');
            img.src = `${imageBasePath}notbrat${i + 1}.png`; // Non-brat images
            img.dataset.isBrat = 'false';
            displayedNonBratImages.push(i + 1);
            img.addEventListener('click', function() {
                loadNewImage(this);
            });
            imageGrid.appendChild(img);
        }

        document.getElementById('verifyButton').style.display = 'block'; // Always show the verify button
    }

    function assignImage(img) {
        let bratDecision = Math.random() < 0.33;
        let imagePath, isBrat;

        if (bratDecision && displayedBratImages.length < 6) { // Assuming there are 6 brat images
            do {
                isBrat = Math.floor(Math.random() * 6) + 1; // Select a brat image index
            } while (displayedBratImages.includes(isBrat) && displayedBratImages.length < 6);
            imagePath = `${imageBasePath}isbrat${isBrat}.png`;
            displayedBratImages.push(isBrat);
            img.dataset.isBrat = 'true';
        } else if (displayedNonBratImages.length < 6) { // Ensure we haven't exhausted non-brat images
            do {
                isBrat = Math.floor(Math.random() * 6) + 1; // Select a non-brat image index
            } while (displayedNonBratImages.includes(isBrat) && displayedNonBratImages.length < 6);
            imagePath = `${imageBasePath}notbrat${isBrat}.png`;
            displayedNonBratImages.push(isBrat);
            img.dataset.isBrat = 'false';
        } else { // Fallback if all images have been displayed
            imagePath = `${imageBasePath}notbrat1.png`;
            img.dataset.isBrat = 'false';
        }

        img.src = imagePath;
        img.addEventListener('click', function() {
            loadNewImage(this);
        });

        return img;
    }

    function loadNewImage(img) {
        // Check if all images have been displayed and reset as needed
        if (displayedBratImages.length === 6 && displayedNonBratImages.length === 6) {
            img.src = `${imageBasePath}notbrat1.png`; // Default to notbrat1.png
            img.dataset.isBrat = 'false'; // Mark it as non-brat to avoid confusion
        } else {
            img = assignImage(img); // Assign a new image
        }
    }

    function checkCompletion() {
        const images = document.querySelectorAll('#imageGrid img');
        const anyBratsLeft = Array.from(images).some(img => img.dataset.isBrat === 'true');
        if (!anyBratsLeft) {
            document.getElementById('captchaModal').style.display = 'none'; // All brats correctly identified
        } else {
            document.getElementById('errorModal').style.display = 'block'; // Error if any brat is left
        }
    }

    document.getElementById('verifyButton').addEventListener('click', function() {
        checkCompletion();
    });

    document.getElementById('continueButton').addEventListener('click', function() {
        window.location.reload(); // Reload the entire page
    });

    document.getElementById('signupButton').addEventListener('click', function() {
        document.getElementById('captchaModal').style.display = 'block';
        loadImages();
    });

    //initializePopups(); // Initialize and display the initial popups
};
