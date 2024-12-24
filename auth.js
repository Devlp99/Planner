document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const userInfo = document.getElementById('userInfo');
    const authButtons = document.getElementById('authButtons');
    const logoutBtn = document.getElementById('logoutBtn');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        if (username && password) {
            loginModal.classList.remove('show');
            usernameDisplay.textContent = username;
            userInfo.classList.remove('hidden');
            authButtons.classList.add('hidden');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        if (username && password) {
            signupModal.classList.remove('show');
            usernameDisplay.textContent = username;
            userInfo.classList.remove('hidden');
            authButtons.classList.add('hidden');
        }
    });

    logoutBtn.addEventListener('click', () => {
        usernameDisplay.textContent = '';
        userInfo.classList.add('hidden');
        authButtons.classList.remove('hidden');
    });
});
