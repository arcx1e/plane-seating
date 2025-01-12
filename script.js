const correctPassword = "123";  // Set your password here

// Access the DOM elements
const passwordContainer = document.getElementById("password-container");
const appContainer = document.getElementById("app-container");
const loginButton = document.getElementById("login-btn");
const passwordInput = document.getElementById("password");

// Event listener for login button
loginButton.addEventListener("click", function() {
  const enteredPassword = passwordInput.value;

  // If the entered password is correct
  if (enteredPassword === correctPassword) {
    // Hide password input and show the app content
    passwordContainer.style.display = "none";
    appContainer.style.display = "block";
    generateSeatMap();  // Generate the seat map after successful login
  } else {
    alert("Incorrect password! Please try again.");
  }
});

// Function to generate a simple seat map (for demonstration purposes)
function generateSeatMap() {
  const seatMap = document.getElementById("seat-map");
  seatMap.innerHTML = "<p>Seat Map Loaded!</p>";  // For now, just display a simple message
}
