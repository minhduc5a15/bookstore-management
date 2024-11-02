const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInBtn = document.getElementById('sign-in-button');

signInBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    console.log({ email, password });

    const signIn = async () => {
        try {
            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                alert('Sign in failed. Please try again.');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('An error occurred while signing in. Please try again.');
        }
    };

    signIn();
});
