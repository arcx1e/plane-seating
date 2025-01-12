const rows = 10;
const cols = 6;

// Grab the seat map container
const seatMap = document.getElementById("seat-map");

// Generate the seat map
generateSeatMap();

// Add event listeners for buttons
document.getElementById("save-layout").addEventListener("click", saveLayout);
document.getElementById("load-layout").addEventListener("click", loadLayout);
document.getElementById("export-layout").addEventListener("click", exportLayout);
document.getElementById("import-layout").addEventListener("change", importLayout);

// Functions

function generateSeatMap() {
  seatMap.innerHTML = ""; // Clear any existing seats
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      seat.dataset.seatId = `${row}${String.fromCharCode(64 + col)}`; // e.g., 1A, 1B
      seat.innerText = seat.dataset.seatId;

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
  if (name) {
    seat.dataset.name = name;
  } else {
    delete seat.dataset.name;
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
      }
    }
  });

  alert("Layout loaded!");
}

/**
 * Export the layout to a JSON file.
 */
function exportLayout() {
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

  const blob = new Blob([JSON.stringify(seats, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "seat-layout.json";
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import the layout from a JSON file.
 */
function importLayout(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const seats = JSON.parse(e.target.result);

    // Reset the map
    generateSeatMap();

    seats.forEach((seatData) => {
      const seat = document.querySelector(`.seat[data
        -seat-id="${seatData.id}"]`); if (seat) { if (seatData.color) { seat.classList.add(seatData.color); } if (seatData.name) { seat.dataset.name = seatData.name; } } });
        alert("Layout imported successfully!");
    };

    reader.readAsText(file); }
