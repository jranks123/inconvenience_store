window.onload = function() {
    var popups = ['popup1', 'popup2', 'popup3', 'popup4', 'popup5'];
    var firstCloseClicked = false; // Flag to track if first close has been clicked

    function showPopup(index) {
        var popup = document.getElementById(popups[index]);
        if (popup) {
            popup.style.display = 'block';
        }
    }

    function closePopup(index) {
      console.log(index);
      console.log(firstCloseClicked);
        if (index === 0 && !firstCloseClicked) {
            // First time the close button on the first popup is clicked
            firstCloseClicked = true; // Set the flag to true
            window.location.href = "mailto:boss@example.com?subject=Not%20feeling%20great&body=Dear%20Alice,%0AI'm%20just%20emailing%20you%20to%20let%20you%20know%20that%20I've%20got%20a%20bit%20of%20a%20head%20cold%20and%20it's%20looking%20like%20I%20might%20not%20be%20able%20to%20make%20it%20in%20on%20Monday.%20It%20really%20seems%20to%20be%20going%20round%20at%20the%20moment!%20I'm%20going%20to%20rest%20up%20-%20hopefully%20see%20you%20Tuesday.%0ABest,%0ABob";
        } else {
            var popup = document.getElementById(popups[index]);
            if (popup) {
                popup.style.display = 'none';
            }
            if (index + 1 < popups.length) {
                showPopup(index + 1);
            }
        }
    }

    // Initialize popups and buttons
    showPopup(0);
    document.getElementById('close-btn1').addEventListener('click', function() { closePopup(0); });
    document.getElementById('close-btn2').addEventListener('click', function() { closePopup(1); });
    document.getElementById('close-btn3').addEventListener('click', function() { closePopup(2); });
    document.getElementById('close-btn4').addEventListener('click', function() { closePopup(3); });
    document.getElementById('close-btn5').addEventListener('click', function() { closePopup(4); });
};
