// On page load, set the default theme (light) and background image
window.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme and background image in localStorage (if any)
    const savedTheme = localStorage.getItem('theme');
    const savedBackground = localStorage.getItem('backgroundImage');
    
    // Apply saved theme and background image if available
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        document.body.classList.add('theme-light');  // Default to light theme
    }

    if (savedBackground) {
        document.body.style.backgroundImage = `url('${savedBackground}')`;
    } else {
        // Set the default light theme background image if no saved background
        document.body.style.backgroundImage = "url('./images/3792b2270d60c5bd157641953dca322b.jpg')";
    }
});

// Theme toggle button event
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    // Toggle between dark and light themes
    if (document.body.classList.contains('theme-dark')) {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        document.body.style.backgroundImage = "url('./images/3792b2270d60c5bd157641953dca322b.jpg')"; // Light image
        localStorage.setItem('theme', 'theme-light'); // Save preference to localStorage
        localStorage.setItem('backgroundImage', './images/3792b2270d60c5bd157641953dca322b.jpg'); // Save background image
    } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        document.body.style.backgroundImage = "url('./images/d07ff5c9979c428f63e22352826aef4a.jpg')"; // Dark image
        localStorage.setItem('theme', 'theme-dark'); // Save preference to localStorage
        localStorage.setItem('backgroundImage', './images/d07ff5c9979c428f63e22352826aef4a.jpg'); // Save background image
    }
});

// Theme Selection (for setting a solid color background)
const themeButtons = {
    'themePink': '#FFB6C1', // Pink
    'themeBlue': '#c2d6f6', // Blue
    'themeGrey': '#cccccc'  // Grey
};

Object.keys(themeButtons).forEach(id => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        // Remove background image when selecting color themes
        document.body.style.backgroundImage = ''; // Clear background image
        document.body.style.backgroundColor = themeButtons[id]; // Set the background color
        document.body.style.color = '#333333'; // Set the text color
        localStorage.removeItem('backgroundImage'); // Remove background image from localStorage
    });
});

// Show the appropriate section based on navigation clicks
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        target.classList.remove('hidden');
    });
});

// Add Todo Item
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoInput.value) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${todoInput.value} <button class="btn btn-sm btn-danger float-end delete-task">Delete</button>`;
        todoList.appendChild(li);
        todoInput.value = '';
        updateTodoCount();
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        e.target.parentElement.remove();
        updateTodoCount();
    }
});

function updateTodoCount() {
    todoCount.textContent = `${todoList.children.length} pending tasks`;
}

// Flashcards: Add Flashcard
const flashcardForm = document.getElementById('flashcardForm');
const flashcardQuestion = document.getElementById('flashcardQuestion');
const flashcardAnswer = document.getElementById('flashcardAnswer');
const flashcardContainer = document.getElementById('flashcardContainer');

flashcardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (flashcardQuestion.value && flashcardAnswer.value) {
        const flashcardDiv = document.createElement('div');
        flashcardDiv.classList.add('col-md-3', 'mb-3');
        flashcardDiv.innerHTML = `
            <div class="card flashcard">
                <div class="card-body">
                    <h5 class="card-title">${flashcardQuestion.value}</h5>
                    <p class="card-text">${flashcardAnswer.value}</p>
                </div>
            </div>
        `;
        flashcardContainer.appendChild(flashcardDiv);
        flashcardQuestion.value = '';
        flashcardAnswer.value = '';
    }
});

// Event: Add Calendar Event
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

// Lessons: Add Lesson
const lessonForm = document.getElementById('lessonForm');
const lessonTitle = document.getElementById('lessonTitle');
const lessonDate = document.getElementById('lessonDate');
const lessonMastery = document.getElementById('lessonMastery');
const lessonsContainer = document.getElementById('lessonsContainer');

// Load lessons from local storage
function loadLessons() {
    const lessons = JSON.parse(localStorage.getItem('lessons')) || [];
    lessons.forEach(lesson => {
        addLessonToDOM(lesson.title, lesson.date, lesson.mastery);
    });
}

// Save lessons to local storage
function saveLessons() {
    const lessons = [];
    lessonsContainer.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('.card-title').textContent;
        const date = card.querySelector('.card-text').textContent;
        const mastery = card.classList.contains('mastery-green') ? 'mastered' :
                        card.classList.contains('mastery-yellow') ? 'medium' : 'not-mastered';
        lessons.push({ title, date, mastery });
    });
    localStorage.setItem('lessons', JSON.stringify(lessons));
}

// Add lesson to DOM
function addLessonToDOM(title, date, mastery) {
    const lessonDiv = document.createElement('div');
    lessonDiv.classList.add('col-md-4', 'mb-3');
    let masteryClass = '';
    switch (mastery) {
        case 'mastered':
            masteryClass = 'mastery-green';
            break;
        case 'medium':
            masteryClass = 'mastery-yellow';
            break;
        case 'not-mastered':
            masteryClass = 'mastery-red';
            break;
    }

    lessonDiv.innerHTML = `
        <div class="card ${masteryClass}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${date}</p>
                <button class="btn btn-sm btn-danger float-end delete-lesson">Delete</button>
            </div>
        </div>
    `;
    lessonsContainer.appendChild(lessonDiv);
}

// Event listener for adding lessons
lessonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (lessonTitle.value && lessonDate.value) {
        addLessonToDOM(lessonTitle.value, lessonDate.value, lessonMastery.value);
        saveLessons();
        lessonTitle.value = '';
        lessonDate.value = '';
        lessonMastery.value = 'mastered';
    }
});

// Event listener for deleting lessons
lessonsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-lesson')) {
        e.target.closest('.col-md-4').remove();
        saveLessons();
    }
});

// Load lessons on page load
window.addEventListener('DOMContentLoaded', loadLessons);
