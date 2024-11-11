const userButton = document.getElementById('userButton');
const userDropdown = document.getElementById('userDropdown');
const signOutButton = document.getElementById('signOutButton');

userButton.addEventListener('click', () => {
    userDropdown.classList.toggle('show');
    userButton.setAttribute('aria-expanded', userDropdown.classList.contains('show'));
});

document.addEventListener('click', (event) => {
    if (!userButton.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('show');
        userButton.setAttribute('aria-expanded', 'false');
    }
});

signOutButton.addEventListener('click', () => {
    userDropdown.classList.remove('show');
    userButton.setAttribute('aria-expanded', 'false');

    axiosInstance.post('/api/auth/sign-out').then(() => {
        localStorage.clear();
        window.location.reload();
    });
});

axiosInstance.get('/api/auth/me').then(({ data }) => {
    const { currentUser: user } = data;
    userButton.innerHTML = `
        <div class="user-avatar">${user.username[0]}</div>
        <span>${user.username}</span>
    `
    const userInfo = userDropdown.querySelector('.user-info');
    userInfo.innerHTML = `
        <h3>${user.username}</h3>
        <p>${user.email}</p>
    `
}).catch(() => {
    userButton.innerHTML = `
        <div class="user-avatar">
        <i class="fa-solid fa-user"></i></div>
        <span>Guest</span>
    `;
    console.log(userDropdown.firstChild)
    const dropDownContent = userDropdown.querySelector('.dropdown-content');
    dropDownContent.innerHTML = `
        <div class="dropdown-buttons">
            <button onclick="window.location.href='/sign-in?redirect=${encodeURIComponent(window.location.href)}'"><i class="fa-solid fa-right-to-bracket"></i> Sign In</button>
        </div>
    `;
});
