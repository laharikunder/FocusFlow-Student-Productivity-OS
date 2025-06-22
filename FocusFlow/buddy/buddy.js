const buddyImages = {
  normal: "src/assets/characters/senpai-happy.png",
  strict: "src/assets/characters/senpai-strict.png"
};

function showStudyBuddyMessage(message, mood = "normal") {
  const buddyImg = document.getElementById("study-buddy-img");
  const bubble = document.getElementById("buddy-bubble");

  if (!buddyImg || !bubble) return;

  bubble.innerText = message;
  bubble.style.display = "block";

  if (mood === "strict") {
    buddyImg.src = buddyImages.strict;
    buddyImg.classList.remove("float");
    buddyImg.classList.add("bounce");
  } else {
    buddyImg.src = buddyImages.normal;
    buddyImg.classList.remove("bounce");
    buddyImg.classList.add("float");
  }

  // Voice synthesis
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1;
  utterance.pitch = 1.2;
  utterance.lang = 'en-US';
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);

  // Hide bubble after 6 seconds
  setTimeout(() => {
    bubble.style.display = "none";
  }, 6000);
}

function onBuddyClick() {
  const messages = [
    "You're doing great today! 🌟",
    "Keep it up! Let's finish one more task 💼",
    "I'm proud of your effort. 💖"
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];
  showStudyBuddyMessage(message, "normal");
}

window.onBuddyClick = onBuddyClick;

// Track user visibility and inactivity
let lastActiveTime = Date.now();

// Inactivity checker
function checkIdleStrictReminder() {
  const now = Date.now();
  const idleDuration = now - lastActiveTime;

  if (idleDuration > 10000) { // 5 minutes
    showStudyBuddyMessage("Enough idle time! Refocus now.", "strict");
  }
}

// Reset activity time on any user action
function resetInactivityTimer() {
  const buddyImg = document.getElementById("study-buddy-img");
  const wasStrict = buddyImg && buddyImg.src.includes("senpai-strict.png");

  lastActiveTime = Date.now();

  if (wasStrict) {
    showStudyBuddyMessage("Welcome back! Let’s stay focused!", "normal");
  }
}

// Events that count as activity
["click", "mousemove", "keydown", "scroll"].forEach(event =>
  window.addEventListener(event, resetInactivityTimer)
);

// Check idle every minute
setInterval(checkIdleStrictReminder, 60000);

// Also check when tab becomes visible again
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    checkIdleStrictReminder();
    resetInactivityTimer();
  }
});

// Initial greeting logic
function initStudyBuddy() {
  const path = window.location.pathname;

  setTimeout(() => {
    if (path.includes("index") || path === "/" || path === "/index.html") {
      showStudyBuddyMessage("Welcome to FocusFlow! Ready to crush your goals today? Rock it!", "normal");
    } else {
      const messages = [
        "You're doing great today! 🌟",
        "Keep it up! Let’s finish one more task.",
        "I’m proud of your effort. 💖"
      ];
      const message = messages[Math.floor(Math.random() * messages.length)];
      showStudyBuddyMessage(message, "normal");
    }
  }, 500);
}

window.initStudyBuddy = initStudyBuddy;

document.getElementById("buddy-placeholder").innerHTML = `
  <div id="study-buddy" class="study-buddy">
    <div id="buddy-bubble" class="buddy-bubble"></div>
    <img
      id="study-buddy-img"
      src="src/assets/characters/senpai-happy.png"
      alt="Study Buddy"
      class="float"
      onclick="onBuddyClick()"
    />
  </div>
`;

