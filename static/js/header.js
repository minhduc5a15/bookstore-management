const userButton = document.getElementById('userButton');
const userDropdown = document.getElementById('userDropdown');
const signOutButton = document.getElementById('signOutButton');

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

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
        window.location.reload(true);
    });
});

axiosInstance
    .get('/api/auth/me')
    .then(({ data }) => {
        const { currentUser: user } = data;
        userButton.innerHTML = `
        <div class="user-avatar">${user.username[0]}</div>
        <span>${user.username}</span>
    `;
        const userInfo = userDropdown.querySelector('.user-info');
        userInfo.innerHTML = `
        <h3>${user.username}</h3>
        <p>${user.email}</p>
    `;
    })
    .catch(() => {
        userButton.innerHTML = `
        <div class="user-avatar">
        <i class="fa-solid fa-user"></i></div>
        <span>Guest</span>
    `;
        console.log(userDropdown.firstChild);
        const dropDownContent = userDropdown.querySelector('.dropdown-content');
        dropDownContent.innerHTML = `
        <div class="dropdown-buttons">
            <button onclick="window.location.href='/sign-in?redirect=${encodeURIComponent(window.location.href)}'"><i class="fa-solid fa-right-to-bracket"></i> Sign In</button>
        </div>
    `;
    });

const searchBox = document.getElementById('search-box');
const resultsContainer = document.getElementById('search-result');

getBooks().then((books) => {
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const results = query ? books.filter((book) => book.title.toLowerCase().includes(query)) : [];
        resultsContainer.style.display = results.length > 0 ? 'flex' : 'none';
        resultsContainer.innerHTML = '';
        results.forEach((result, index) => {
            if (index >= 4) return;
            const resultItem = document.createElement('a');
            const highlightedTitle = result.title.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>');
            resultItem.href = `/book/detail?id=${result.id}`;
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="result-img">
                    <img src="${apiUrl}/api/image/${result.thumbnailId}" alt="${result.title}">
                </div>
                <div class="result-info">
                    <h3>${highlightedTitle}</h3>
                    <p>${result.authors}</p>
                </div>
            `;
            resultsContainer.appendChild(resultItem);
        });
    };

    searchBox.addEventListener('input', debounce(handleSearch, 300));
});