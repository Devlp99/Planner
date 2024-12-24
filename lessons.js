document.addEventListener('DOMContentLoaded', () => {
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
            saveLessons(); // Save to local storage
            lessonTitle.value = '';
            lessonDate.value = '';
            lessonMastery.value = 'mastered'; // Reset to default
        }
    });

    // Event listener for deleting lessons
    lessonsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-lesson')) {
            e.target.closest('.col-md-4').remove();
            saveLessons(); // Update local storage
        }
    });

    // Load lessons on page load
    window.addEventListener('DOMContentLoaded', loadLessons);
});
