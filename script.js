const correctPassword = "TUIFlights07";  // Set your password here
const passwordContainer = document.getElementById("password-container");
const appContainer = document.getElementById("app-container");

const rows = 10;
const cols = 6;

// Grab the seat map container
const seatMap = document.getElementById("seat-map");

// Event listener for login button
document.getElementById("login-btn").addEventListener("click", function() {
  const enteredPassword = document.getElementById("password").value;

  if (enteredPassword === correctPassword) {
    passwordContainer.style.display = "none";
    appContainer.style.display = "block";  // Show the seat map and controls
    generateSeatMap();  // Generate the seat map after successful login
  } else {
    alert("Incorrect password! Please try again.");
  }
});

// Generate the seat map
function generateSeatMap() {
  seatMap.innerHTML = ""; // Clear any existing seats
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      seat.dataset.seatId = `${row}${String.fromCharCode(64 + col)}`; // e.g., 1A, 1B
      seat.innerText = seat.dataset.seatId;

      // Add a div for the seat name that will appear on hover
      const seatName = document.createElement("div");
      seatName.classList.add("seat-name");
      seat.appendChild(seatName);

      // Add click event for cycling colors
      seat.addEventListener("click", () => {
        if (!seat.classList.contains("occupied")) {
          cycleSeatColor(seat);
        }
      });

      // Add right-click event for assigning a name
      seat.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        assignNameToSeat(seat);
      });

      seatMap.appendChild(seat);

      // Add a gap between columns ABC and DEF
      if (col === 3) {
        const gap = document.createElement("div");
        gap.style.width = "20px";
        seatMap.appendChild(gap);
      }
    }
  }
}

/**
 * Cycle through seat colors.
 */
function cycleSeatColor(seat) {
  if (seat.classList.contains("red")) {
    seat.classList.remove("red");
    seat.classList.add("purple");
  } else if (seat.classList.contains("purple")) {
    seat.classList.remove("purple");
    seat.classList.add("green");
  } else if (seat.classList.contains("green")) {
    seat.classList.remove("green");
  } else {
    seat.classList.add("red");
  }
}

/**
 * Assign a name to a seat.
 */
function assignNameToSeat(seat) {
  const name = prompt("Enter the name for this seat:");
  const seatName = seat.querySelector(".seat-name");

  if (name) {
    seat.dataset.name = name;
    seatName.innerText = name;  // Update name in the seat
  } else {
    delete seat.dataset.name;
    seatName.innerText = "";  // Clear name in the seat
  }
}

/**
 * Save the layout to localStorage.
 */
function saveLayout() {
  const seats = Array.from(document.querySelectorAll(".seat")).map((seat) => ({
    id: seat.dataset.seatId,
    color: seat.classList.contains("red")
      ? "red"
      : seat.classList.contains("purple")
      ? "purple"
      : seat.classList.contains("green")
      ? "green"
      : "",
    name: seat.dataset.name || "",
  }));
  localStorage.setItem("seatLayout", JSON.stringify(seats));
  alert("Layout saved!");
}

/**
 * Load the layout from localStorage.
 */
function loadLayout() {
  const seats = JSON.parse(localStorage.getItem("seatLayout") || "[]");
  if (seats.length === 0) {
    alert("No saved layout found.");
    return;
  }

  // Reset the map
  generateSeatMap();

  seats.forEach((seatData) => {
    const seat = document.querySelector(`.seat[data-seat-id="${seatData.id}"]`);
    if (seat) {
      if (seatData.color) {
        seat.classList.add(seatData.color);
      }
      if (seatData.name) {
        seat.dataset.name = seatData.name;
        seat.query

