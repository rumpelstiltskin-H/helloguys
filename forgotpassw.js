document.getElementById('resetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Here you would typically handle the password reset logic
    console.log('Password reset requested for:', email);
    
    // Show success message (you can customize this)
    alert('If an account exists for ' + email + ', you will receive password reset instructions.');
});

document.querySelector('.try-another').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Try another way clicked');
    // Add alternative reset method logic here
});