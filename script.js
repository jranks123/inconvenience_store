window.onload = function() {
    var popups = ['popup1', 'popup2', 'popup3'];
    var closeButtonPositions = [
        'close-top-right', 'close-bottom-left', 'close-center',
        'close-top-left', 'close-bottom-right', 'close-bottom-center',
        'close-top-center', 'close-left-center', 'close-right-center'
    ];
    const popsound = document.getElementById('popsound');

    if (!localStorage.getItem('startTime')) {
        localStorage.setItem('startTime', Date.now());
    }
    if (!localStorage.getItem('attempts')) {
        localStorage.setItem('attempts', 1);
    } else {
        let attempts = parseInt(localStorage.getItem('attempts'));
        localStorage.setItem('attempts', parseInt(attempts) + 1);
    }

    var firstPopupIndex = 0; // Start with the first popup
    var imageBasePath = 'img/'; // Base path for images
    var firstAdClicked = false;
    const token = generateToken();
    sessionStorage.setItem('termsToken', token);
    sessionStorage.setItem('signupToken', token);
    let displayedBratImages = [];
    let displayedNonBratImages = [];
    let clickCounts = new Array(popups.length).fill(0); // Track clicks on close buttons

    // Parameters for number of brat and non-brat images
    const numberOfBratImages = 8; // Total number of brat images available
    const numberOfNonBratImages = 9; // Total number of non-brat images available
    const initialBratImages = 3; // Number of brat images to show initially
    const initialNonBratImages = 9 - initialBratImages; // Number of non-brat images to show initially

    function moveCloseButton(closeButton) {
        var randomPosition = closeButtonPositions[Math.floor(Math.random() * closeButtonPositions.length)];
        closeButton.className = 'close-btn ' + randomPosition; // Apply random position
    }

    // Initialize and display the popups when the page loads
    function initializePopups() {
        showPopup(firstPopupIndex); // Show the first popup

        // Attach close event to each popup
        popups.forEach((popupId, index) => {
            var closeButton = document.getElementById('close-btn' + (index + 1));
            var popup = document.getElementById(popupId);
            var link = popup.querySelector('a');
            console.log(link)
            clickCounts[index] = 0; // Initialize click count

            closeButton.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default close action
                clickCounts[index]++;
                if (clickCounts[index] === 1 && popupId != 'popup1') {
                  //  window.open(link.href, '_blank'); // Open link in a new tab on first click
                }
                handleCloseButtonClick(index);
            });
        });
    }

    function showPopup(index) {
      setTimeout(() => {
        try {
          popsound.play();
        }
        catch(err) {
          console.log('user had not interacted with screen yet');
        }
        var popup = document.getElementById(popups[index]);
        var closeButton = popup.querySelector('.close-btn');
        moveCloseButton(closeButton); // Initial random position for close button
        popup.style.display = 'block'; // Show the popup
      }, 3000);

    }

    function handleCloseButtonClick(index) {
        if (index === 0 && clickCounts[index] === 1 && !firstAdClicked) {
            firstAdClicked = true; // Set the flag that the first ad has been clicked
            window.location.href = "mailto:boss@example.com?subject=Not%20feeling%20great&body=Dear%20[your bosses name],%0AI'm%20just%20emailing%20you%20to%20let%20you%20know%20that%20I've%20got%20a%20bit%20of%20a%20head%20cold%20and%20it's%20looking%20like%20I%20might%20not%20be%20able%20to%20make%20it%20in%20on%20Monday.%20It%20really%20seems%20to%20be%20going%20round%20at%20the%20moment!%20I'm%20going%20to%20rest%20up%20-%20hopefully%20see%20you%20Tuesday.%0ABest,%0A[your name]";
            return; // Exit the function to prevent further actions
        }

        if (clickCounts[index] < 2) {
            // Move the close button to a new random position
            var closeButton = document.getElementById('close-btn' + (index + 1));
            moveCloseButton(closeButton);
        } else {
            closePopup(index);
        }
    }

    function closePopup(index) {
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

        // Create an array with 9 slots and shuffle it to randomize positions
        let indices = Array.from(Array(9).keys());
        indices = shuffleArray(indices);

        // Assign initial slots for brat and non-brat images
        for (let i = 0; i < 9; i++) {
            let img = document.createElement('img');
            if (indices[i] < initialBratImages) { // Assign brat images
                img.src = `${imageBasePath}isbrat${indices[i] + 1}.png`; // Brat images
                img.dataset.isBrat = 'true';
                displayedBratImages.push(indices[i] + 1);
            } else { // Assign non-brat images
                img.src = `${imageBasePath}notbrat${indices[i] - initialBratImages + 1}.png`; // Non-brat images
                img.dataset.isBrat = 'false';
                displayedNonBratImages.push(indices[i] - initialBratImages + 1);
            }
            img.addEventListener('click', handleImageClick);
            imageGrid.appendChild(img);
        }

        document.getElementById('verifyButton').style.display = 'block'; // Always show the verify button
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function assignImage(img) {
        let bratDecision = Math.random() < 0.33;
        let imagePath, isBrat;

        if (bratDecision && displayedBratImages.length < numberOfBratImages) { // Assign brat images
            do {
                isBrat = Math.floor(Math.random() * numberOfBratImages) + 1; // Select a brat image index
            } while (displayedBratImages.includes(isBrat) && displayedBratImages.length < numberOfBratImages);
            imagePath = `${imageBasePath}isbrat${isBrat}.png`;
            displayedBratImages.push(isBrat);
            img.dataset.isBrat = 'true';
        } else if (displayedNonBratImages.length < numberOfNonBratImages) { // Assign non-brat images
            do {
                isBrat = Math.floor(Math.random() * numberOfNonBratImages) + 1; // Select a non-brat image index
            } while (displayedNonBratImages.includes(isBrat) && displayedNonBratImages.length < numberOfNonBratImages);
            imagePath = `${imageBasePath}notbrat${isBrat}.png`;
            displayedNonBratImages.push(isBrat);
            img.dataset.isBrat = 'false';
        } else { // Fallback if all images have been displayed
            imagePath = `${imageBasePath}notbrat1.png`;
            img.dataset.isBrat = 'false';
        }

        img.src = imagePath;
        img.removeEventListener('click', handleImageClick); // Remove previous event listener
        img.addEventListener('click', handleImageClick);

        return img;
    }

    function handleImageClick(event) {
        const img = event.target;
        if (img.dataset.isBrat === 'false') {
            document.getElementById('errorModal').style.display = 'block'; // Show error modal if non-brat is clicked
        } else {
            loadNewImage(img);
        }
    }

    function loadNewImage(img) {
        // Check if all brat images have been displayed
        if (displayedBratImages.length === numberOfBratImages) {
            img.src = `${imageBasePath}notbrat1.png`; // Default to notbrat1.png
            img.dataset.isBrat = 'false'; // Mark it as non-brat to avoid confusion
        } else {
            assignImage(img); // Assign a new image
        }
    }

    function checkCompletion() {
        const images = document.querySelectorAll('#imageGrid img');
        const anyBratsLeft = Array.from(images).some(img => img.dataset.isBrat === 'true');
        if (!anyBratsLeft) {
            const token = generateToken();
            sessionStorage.setItem('termsToken', token); // Store the token in session storage
            console.log(`terms.html?token=${token}`);
            window.location.href = `terms.html?token=${token}`; // Redirect to terms and conditions page
        } else {
            document.getElementById('errorModal').style.display = 'block'; // Error if any brat is left
        }
    }

    function generateToken() {
        return Math.random().toString(36).substr(2); // Generate a simple random token
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

    window.addEventListener( "pageshow", function ( event ) {
      var historyTraversal = event.persisted ||
                             ( typeof window.performance != "undefined" &&
                                  window.performance.navigation.type === 2 );

      if ( historyTraversal ) {
        // Handle page restore.
        window.location.reload();
      }
    });

    setTimeout(() => {
        initializePopups(); // Initialize and display the initial popups
    }, 1000);
};
