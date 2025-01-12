const seats = {}; // Store seat data (color, name, etc.)
let locked = false; // Lock status

// DOM elements
const seatMap = document.getElementById('seat-map');
const openPanelBtn = document.getElementById('open-panel-btn');
const adminPanel = document.getElementById('admin-panel');
const lockSeatsBtn = document.getElementById('lock-seats-btn');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
const exportBtn = document.getElementById('export-btn');
const closePanelBtn = document.getElementById('close-panel-btn');
const seatSearch = document.getElementById('seat-search');
const searchBtn = document.getElementById('search-btn');
const seatDetails = document.getElementById('seat-details');
const loginBtn = document.getElementById('login-btn');
const passwordField = document.getElementById('password');
const appContainer = document.getElementById('app-container');
const clearAllBtn = document.getElementById('clear-all-btn'); // Clear All Button

// Initially hide the Clear All button (for the password menu)
clearAllBtn.style.display = 'none';

// Generate seats on the seat map
function renderSeatMap() {
  seatMap.innerHTML = ''; // Clear existing seats
  for (let row = 1; row <= 32; row++) {
    for (let col = 0; col < 6; col++) {
      const seat = document.createElement('div');
      const seatId = `${row}${String.fromCharCode(65 + col)}`; // Generate seat ID like "1A", "1B"
      seat.classList.add('seat');
      seat.setAttribute('id', seatId);
      seat.style.backgroundColor = seats[seatId]?.color || '#e3e3e3'; // Default color

      // Set seat data if not already set
      seats[seatId] = seats[seatId] || { color: '#e3e3e3', name: '' };

      // Seat number
      const seatNumber = document.createElement('span');
      seatNumber.classList.add('seat-number');
      seatNumber.textContent = seatId;
      seat.appendChild(seatNumber);

      // Click event to change seat color and name
      seat.addEventListener('click', () => {
        if (!locked) {
          const color = prompt("Enter a color for this seat (e.g., 'red', 'blue', 'green'):", seats[seatId].color);
          
          // Validate if color is valid
          if (color && isValidColor(color)) {
            seats[seatId].color = color;
            seat.style.backgroundColor = color; // Apply the color directly to the seat
          } else {
            alert('Invalid color name. Please enter a valid color name.');
          }

          // Change the seat name (right-click still works)
          const name = prompt('Enter a name for this seat:', seats[seatId].name);
          if (name !== null) {
            seats[seatId].name = name;
          }
        }
      });

      // Add event listener for right-click to assign name
      seat.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (!locked) {
          const name = prompt('Enter a name for this seat:');
          if (name) {
            seats[seatId].name = name;
            renderSeatMap(); // Re-render to update seat name
          }
        }
      });

      // Add hover effect to show seat name
      seat.addEventListener('mouseover', () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('seat-name-tooltip');
        tooltip.textContent = seats[seatId].name || 'No Name';
        seat.appendChild(tooltip);
      });

      seat.addEventListener('mouseout', () => {
        const tooltip = seat.querySelector('.seat-name-tooltip');
        if (tooltip) tooltip.remove();
      });

      seatMap.appendChild(seat);
    }
  }
}

// Check if the color name is valid
function isValidColor(color) {
  const testElement = document.createElement('div');
  testElement.style.color = color;
  return testElement.style.color !== '';
}

// Lock/unlock all seats
lockSeatsBtn.addEventListener('click', () => {
  locked = !locked;
  lockSeatsBtn.textContent = locked ? 'Unlock All Seats' : 'Lock All Seats';
  renderSeatMap();
});

// Save seat data to localStorage
saveBtn.addEventListener('click', () => {
  localStorage.setItem('seats', JSON.stringify(seats));
  alert('Seats saved!');
});

// Load seat data from localStorage
loadBtn.addEventListener('click', () => {
  const savedSeats = JSON.parse(localStorage.getItem('seats'));
  if (savedSeats) {
    Object.assign(seats, savedSeats);
    renderSeatMap();
    alert('Seats loaded!');
  } else {
    alert('No saved seat data found!');
  }
});

// Export seat data
exportBtn.addEventListener('click', () => {
  const seatData = JSON.stringify(seats, null, 2);
  const blob = new Blob([seatData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'seats.json';
  a.click();
  alert('Seats exported!');
});

// Open admin panel
openPanelBtn.addEventListener('click', () => {
  adminPanel.style.display = 'block';
});

// Close admin panel
closePanelBtn.addEventListener('click', () => {
  adminPanel.style.display = 'none';
});

// Handle password login
loginBtn.addEventListener('click', () => {
  const password = passwordField.value;
  if (password === 'admin123') {
    // Hide the password login container and show the app container
    document.getElementById('password-container').style.display = 'none';
    appContainer.style.display = 'block';

    // Show the Clear All button after successful login
    clearAllBtn.style.display = 'block';  // Show the Clear All button

    renderSeatMap(); // Render seats after login
  } else {
    alert('Incorrect password');
  }
});

// Render seat search
searchBtn.addEventListener('click', () => {
  const searchTerm = seatSearch.value.toUpperCase();
  const seat = document.getElementById(searchTerm);
  if (seat) {
    seat.style.border = '2px solid #007bff'; // Highlight the searched seat
    seat.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert('Seat not found');
  }
});

// Clear all seats (reset to default color and name)
clearAllBtn.addEventListener('click', () => {
  for (let seatId in seats) {
    seats[seatId] = { color: '#e3e3e3', name: '' }; // Reset seat data
  }
  renderSeatMap(); // Re-render the seat map to reflect changes
});

renderSeatMap(); // Initially render the seat map
