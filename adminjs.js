document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically handle the sign-in logic
    console.log('Sign in attempt:', { email, password });
});

// Social media button handlers
document.querySelector('.twitter').addEventListener('click', function() {
    console.log('Twitter sign in clicked');
});

document.querySelector('.facebook').addEventListener('click', function() {
    console.log('Facebook sign in clicked');
});