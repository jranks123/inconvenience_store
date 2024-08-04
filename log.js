function getVisitorId() {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = 'visitor-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
}

// Function to log events
function logEvent(eventName, payload) {
    const visitorId = getVisitorId();
    const data = {
        visitorId: visitorId,
        eventName: eventName,
        payload: payload
    };

    fetch('https://script.google.com/macros/s/AKfycbyxQE4TCE6FzHMn--Tp8f-fqDnrSfG-c7pajYx0AYyGIuooDDQBnE71Hd21RQHmWGzQ/exec', {
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
