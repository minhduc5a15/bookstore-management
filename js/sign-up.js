const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const retypePasswordInput = document.getElementById('retype-password');
const signUpBtn = document.getElementById('sign-up-button');
const signUpStatus = document.querySelector('.status');

const signUp = async (username, email, password) => {
    try {
        const response = await axiosInstance.post('/api/auth/sign-up', { username, email, password });
        if (response.ok) {
            signUpStatus.innerHTML = 'Sign up successful! Redirecting...';
            signUpStatus.style.color = 'green';
            setTimeout(() => {
                window.location.href = '/sign-in';
            }, 1000);
        } else {
            signUpStatus.innerHTML = 'Sign up failed. Please try again.';
            signUpStatus.style.color = 'red';
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while signing up. Please try again.');
    }
};

signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const retypePassword = retypePasswordInput.value;

    if (password === retypePassword) {
        signUp(username, email, password);
    } else {
        signUpStatus.innerHTML = 'Passwords do not match. Please try again.';
        signUpStatus.style.color = 'red';
    }
});
