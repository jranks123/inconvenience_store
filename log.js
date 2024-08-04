function getVisitorId() {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = 'visitor-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
}

function getAttempts() {
  if (!localStorage.getItem('attempts')) {
      localStorage.setItem('attempts', 1);
      return 1;
  } else {
      let attempts = parseInt(localStorage.getItem('attempts'));
      return attempts;
  }
}


// Function to log events
function logEvent(eventName, payload) {
    const visitorId = getVisitorId();
    const attempts = getAttempts();
    const data = {
        visitorId: visitorId,
        eventName: eventName,
        payload: payload,
        attempts: attempts
    };

    fetch('https://script.google.com/macros/s/AKfycbxNQIwPJE24fPERbUeKc7LOLXVgRhjzNcHOHh-CxdAOIKg3usKzmmXuvjJVKf4F5Ts/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'no-cors'
    }).then().catch(error => {
        console.error('Logging error:', error);
    });
}

window.logEvent = logEvent;
