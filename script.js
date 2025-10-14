// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Update Slide
function updateSlide() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Next Slide
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

// Previous Slide
prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

// Reservation Form
document.getElementById('reserveForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("🎉 Table Reserved Successfully!");
  e.target.reset();
});
const chatButton = document.getElementById("chatbot-button");
const chatContainer = document.getElementById("chatbot-container");
const chatClose = document.getElementById("chatbot-close");
const chatMessages = document.getElementById("chatbot-messages");
chatButton.addEventListener("click", () => {
  chatContainer.style.display = "flex";
});

chatClose.addEventListener("click", () => {
  chatContainer.style.display = "none";
});

async function sendMessageToAI(message) {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();
    return data.reply || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error(error);
    return "Error connecting to server.";
  }
}

document.getElementById("chatbot-send").addEventListener("click", async () => {
  const input = document.getElementById("chatbot-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);

  addMessage("Bot", "Thinking...");

  const reply = await sendMessageToAI(message);
  // Replace last "Thinking..." message with actual reply
  const messagesDiv = document.getElementById("chatbot-messages");
  messagesDiv.lastChild.innerHTML = `<strong>Bot:</strong> ${reply}`;

  input.value = "";
});

function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chatbot-message", sender === "Bot" ? "bot" : "user");

  // If bot message contains <br>, render as HTML
  if (sender === "Bot" && text.includes("<br>")) {
    msgDiv.innerHTML = `<strong>${sender}:</strong><div class="bot-cards">${text}</div>`;
  } else {
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  }

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


