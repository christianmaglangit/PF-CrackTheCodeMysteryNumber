// Lower the volume of the happygame audio to 2
document.getElementById("happygame").volume = 0.2;

document.getElementById("startButton").addEventListener("click", function () {
  const clickSound = document.getElementById("click");
  clickSound.play();
  // Show the loading screen
  document.getElementById("loading-screen").style.display = "block";
  // Hide the game screen
  document.querySelector(".container").style.display = "none";
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Adjust range as needed
  localStorage.setItem("secretNumber", randomNumber);
  // Start a timer to redirect to index.html after 5 seconds
  setTimeout(function () {
    // Redirect to index.html
    window.location.href = "gamedash.html";
  }, 5000); // 5 seconds
});

// Add event listener for the info button
document.getElementById("infoButton").addEventListener("click", function () {
  // Show the modal
  $("#infoModal").modal("show");
  const clickSound = document.getElementById("click");
  clickSound.play();
});
