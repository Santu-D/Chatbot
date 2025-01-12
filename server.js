const chatToggleButton = document.getElementById("chat-toggle-button");
const chatContainer = document.getElementById("chat-container");
const closeChatButton = document.getElementById("close-chat-button");
const messagesContainer = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");

// Function to toggle chat container visibility
chatToggleButton.addEventListener("click", () => {
  chatContainer.classList.toggle("hidden");
});

// Function to close chat container
closeChatButton.addEventListener("click", () => {
  chatContainer.classList.add("hidden");
});

// Function to send a message
function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;

  // Display the user's message
  displayMessage(userMessage, "user-message");

  // Clear input field
  userInput.value = "";

  // Fetch response from OpenAI API
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `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`, // Replace with your API key
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 100,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const botMessage = data.choices[0].message.content.trim();
      displayMessage(botMessage, "bot-message");
    })
    .catch(error => {
      console.error("Error:", error);
      displayMessage("Sorry, something went wrong. Please try again.", "bot-message");
    });
}

// Function to display a message
function displayMessage(message, className) {
  const messageElement = document.createElement("p");
  messageElement.className = className;
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message on Enter key press
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
