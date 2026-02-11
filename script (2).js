let timeLeft = 10; // change seconds if needed

const secondsDisplay = document.getElementById("seconds");
const countdownSection = document.getElementById("countdownSection");
const birthdaySection = document.getElementById("birthdaySection");
const midnightFlash = document.getElementById("midnightFlash");
const music = document.getElementById("birthdayMusic");

const countdown = setInterval(() => {

  secondsDisplay.innerHTML = timeLeft;
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(countdown);

    // Flash
    midnightFlash.classList.remove("hidden");

    // Play music (requires interaction in some browsers)
    document.body.addEventListener("click", () => {
      music.play();
    }, { once: true });

    setTimeout(() => {
      midnightFlash.classList.add("hidden");
      countdownSection.classList.add("hidden");
      birthdaySection.classList.remove("hidden");
    }, 2000);
  }

}, 1000);


// GIFT CLICK
document.getElementById("giftCard").addEventListener("click", () => {
  document.getElementById("birthdayMessage").classList.remove("hidden");
  startConfetti();
});


// CONFETTI
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6
    });
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random()*360},100%,50%)`;
    ctx.fill();
    c.y += 3;
    if (c.y > canvas.height) confetti[i].y = 0;
  });

  requestAnimationFrame(animate);
}