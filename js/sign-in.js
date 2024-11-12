document.addEventListener('DOMContentLoaded', () => {
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
                const response = await axiosInstance.post('/api/auth/sign-in', { email, password });
                console.log(response);
                if (response.status === 200) {
                    signInStatus.textContent = 'Sign in successful! Redirecting...';
                    const redirectTo = new URLSearchParams(window.location.search).get('redirect');
                    signInStatus.style.color = 'green';
                    const { user } = response.data;
                    setKey('user', JSON.stringify(user));
                    setKey('token', response.data.token);
                    setTimeout(() => {
                        window.location.href = redirectTo || '/';
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
});
