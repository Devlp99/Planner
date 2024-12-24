adocument.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    const eventType = document.getElementById('eventType');
    const eventCount = document.getElementById('examCount');
    
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (eventTitle.value && eventDate.value) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('card', 'mb-3');
            eventDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${eventTitle.value}</h5>
                    <p class="card-text">${eventDate.value}</p>
                    <small class="text-muted">${eventType.value}</small>
                </div>
            `;
            document.getElementById('calendarContainer').appendChild(eventDiv);
            eventTitle.value = '';
            eventDate.value = '';
            updateEventCount();
        }
    });
    
    function updateEventCount() {
        eventCount.textContent = `${document.getElementById('calendarContainer').children.length} events`;
    }
});
