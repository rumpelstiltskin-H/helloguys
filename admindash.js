document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.dashboard-content');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items and content sections
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Booking management functionality
    const approveButtons = document.querySelectorAll('.btn-approve');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    const rejectButtons = document.querySelectorAll('.btn-reject');

    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingItem = this.closest('.booking-item, .request-item');
            alert('Booking approved!');
            bookingItem.style.opacity = '0.5';
            this.disabled = true;
        });
    });

    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingItem = this.closest('.booking-item');
            if (confirm('Are you sure you want to cancel this booking?')) {
                bookingItem.remove();
            }
        });
    });

    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestItem = this.closest('.request-item');
            if (confirm('Are you sure you want to reject this request?')) {
                requestItem.remove();
            }
        });
    });

    // Feedback management functionality
    const respondButtons = document.querySelectorAll('.btn-respond');
    const archiveButtons = document.querySelectorAll('.btn-archive');

    respondButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackItem = this.closest('.feedback-item');
            const response = prompt('Enter your response:');
            if (response) {
                alert('Response sent!');
                button.disabled = true;
                button.textContent = 'Responded';
            }
        });
    });

    archiveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackItem = this.closest('.feedback-item');
            if (confirm('Archive this feedback?')) {
                feedbackItem.remove();
            }
        });
    });
});