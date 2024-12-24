document.addEventListener('DOMContentLoaded', () => {
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
});
