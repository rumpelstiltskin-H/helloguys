// Calendar state
let currentDate = new Date();
let selectedDate = null;
const bookings = {};

// DOM elements
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const bookingModal = document.getElementById('bookingModal');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const cancelBooking = document.getElementById('cancelBooking');
const bookingForm = document.getElementById('bookingForm');
const slotButtons = document.querySelectorAll('.slot-button');
const requestToAdminButton = document.getElementById('requestToAdmin');

// Calendar functions
function getMonthData(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  return { year, month, firstDay, lastDay, startingDay, totalDays };
}

function formatDate(date) {
  return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
}

function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function isSunday(date) {
  return date.getDay() === 0;
}

function getBookingStatus(dateString) {
  return bookings[dateString] || { morning: false, afternoon: false };
}

function createDayElement(date, bookingStatus) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
  
  if (isSunday(date)) {
    dayElement.classList.add('sunday');
    return dayElement;
  }

  const dayNumber = document.createElement('div');
  dayNumber.className = 'calendar-day-number';
  dayNumber.textContent = date.getDate();

  const dayContent = document.createElement('div');
  dayContent.className = 'calendar-day-content';

  // Create morning and afternoon sections
  const morningHalf = document.createElement('div');
  morningHalf.className = 'calendar-day-half';
  if (bookingStatus.morning) morningHalf.classList.add('morning');

  const afternoonHalf = document.createElement('div');
  afternoonHalf.className = 'calendar-day-half';
  if (bookingStatus.afternoon) afternoonHalf.classList.add('afternoon');

  // If it's a full day booking, add the full-day class to the main element
  if (bookingStatus.fullDay) {
    dayElement.classList.add('full-day');
  } else {
    dayContent.appendChild(morningHalf);
    dayContent.appendChild(afternoonHalf);
  }

  dayElement.appendChild(dayNumber);
  dayElement.appendChild(dayContent);

  if (isToday(date)) {
    dayElement.classList.add('today');
  }

  dayElement.addEventListener('click', () => openBookingModal(date));
  return dayElement;
}

function renderCalendar() {
  const { year, month, startingDay, totalDays } = getMonthData(currentDate);
  currentMonthElement.textContent = formatDate(currentDate);

  // Clear grid and add weekday headers
  calendarGrid.innerHTML = `
    <div class="calendar-weekday">Sun</div>
    <div class="calendar-weekday">Mon</div>
    <div class="calendar-weekday">Tue</div>
    <div class="calendar-weekday">Wed</div>
    <div class="calendar-weekday">Thu</div>
    <div class="calendar-weekday">Fri</div>
    <div class="calendar-weekday">Sat</div>
  `;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day';
    calendarGrid.appendChild(emptyDay);
  }

  // Add days of the month
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    const bookingStatus = getBookingStatus(dateString);
    const dayElement = createDayElement(date, bookingStatus);
    calendarGrid.appendChild(dayElement);
  }
}

// Modal functions
function openBookingModal(date) {
  selectedDate = date;
  modalTitle.textContent = `Book for ${date.toLocaleDateString('default', { 
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })}`;
  bookingModal.classList.add('active');
}

function closeBookingModal() {
  bookingModal.classList.remove('active');
  selectedDate = null;
  bookingForm.reset();
  slotButtons.forEach(button => button.classList.remove('selected'));
}

// Event listeners
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

closeModal.addEventListener('click', closeBookingModal);
cancelBooking.addEventListener('click', closeBookingModal);

slotButtons.forEach(button => {
  button.addEventListener('click', () => {
    slotButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!selectedDate) return;

  const dateString = selectedDate.toISOString().split('T')[0];
  const selectedSlot = document.querySelector('.slot-button.selected');
  const eventName = document.getElementById('eventName').value;
  const eventDescription = document.getElementById('eventDescription').value;
  const department = document.getElementById('department').value;
  
  if (selectedSlot) {
    const slot = selectedSlot.dataset.slot;
    if (!bookings[dateString]) {
      bookings[dateString] = { morning: false, afternoon: false };
    }
    
    if (slot === 'full-day') {
      bookings[dateString] = { fullDay: true };
    } else {
      bookings[dateString][slot] = true;
    }

    renderCalendar();
    closeBookingModal();
  }
});

requestToAdminButton.addEventListener('click', () => {
  // Add your admin request logic here
  alert('Request sent to admin!');
});

// Initialize calendar
renderCalendar();