const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInBtn = document.getElementById('sign-in-button');
const signInStatus = document.querySelector('.status');

emailInput.addEventListener('input', (event) => {
    signInStatus.innerHTML = '';
});
passwordInput.addEventListener('input', (event) => {
    signInStatus.innerHTML = '';
});

signInBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    let isPending = false;

    const signIn = async () => {
        try {
            isPending = true;
            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                signInStatus.textContent = 'Sign in successful! Redirecting...';
                signInStatus.style.color = 'green';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                signInStatus.textContent = 'Sign in failed. Please try again.';
                signInStatus.style.color = 'red';
            }
        } catch (error) {
            isPending = false;
            alert('An error occurred while signing in. Please try again.');
        }
    };
    signInBtn.disabled = isPending;

    signIn();
});
