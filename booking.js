// Venue data
const venues = [
    {
        id: 1,
        name: "St. Joseph's Auditorium",
        type: "Auditorium",
        capacity: 800,
        image:"auditoriumf.jpg"
    },
    {
        id: 2,
        name: "AV Room",
        type: "AV Room",
        capacity: 200,
        image:"avf.jpg"
    },
    {
        id: 3,
        name: "Gnanamma Hall",
        type: "Seminar Hall",
        capacity: 200,
        image: "47f.jpg"
    }
];

// Function to display venues
function displayVenues(venuesList) {
    const venuesGrid = document.getElementById('venuesGrid');
    venuesGrid.innerHTML = '';

    venuesList.forEach(venue => {
        const venueCard = document.createElement('div');
        venueCard.className = 'venue-card';
        venueCard.innerHTML = `
            <img src="${venue.image}" alt="${venue.name}">
            <div class="venue-info">
                <h3>${venue.name}</h3>
                <div class="venue-details">
                    <p>Type: ${venue.type}</p>
                    <p>Capacity: ${venue.capacity} people</p>
                </div>
                <button class="book-button" onclick="bookVenue(${venue.id})">Book Now</button>
            </div>
        `;
        venuesGrid.appendChild(venueCard);
    });
}


// Function to search venues
function searchVenues() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredVenues = venues.filter(venue => 
        venue.name.toLowerCase().includes(searchInput) || 
        venue.type.toLowerCase().includes(searchInput)
    );
    displayVenues(filteredVenues);
}
// Function to book venue
function bookVenue(venueId) {
    // Map venue IDs to their respective calendar URLs
    const calendarUrls = {
        1: 'calanderaud.html', // Main Auditorium
        2: 'calanderav.html',        // AV Room
        3: 'calander47.html'   // Gnanamma Hall
    };

    // Get the URL for the selected venue
    const calendarUrl = calendarUrls[venueId];
    if (calendarUrl) {
        // Redirect to the corresponding calendar page
        window.location.href = calendarUrl;
    } else {
        alert('Calendar page not found for the selected venue.');
    }
}

// Initial display of venues
displayVenues(venues);