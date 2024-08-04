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
    const timestamp = new Date().toISOString(); // Add a timestamp

    const data = {
        visitorId: visitorId,
        eventName: eventName,
        payload: payload,
        attempts: attempts,
        timestamp: timestamp    
    };

    fetch('https://script.google.com/macros/s/AKfycbzcuUi_s1r_F5YcPQK6TXoIRoKYS67OHr1J38aX-PlL0wAx3CiDsuA8JhS4w2jtJanu/exec', {
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
