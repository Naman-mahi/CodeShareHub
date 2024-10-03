function createChatWidget(agentImageUrl, agentName, websiteDeveloper,SupportIcon) {
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "chatWidget";
  widgetContainer.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

            #chatWidget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px; 
                max-height: 500px;
                border-radius: 10px; 
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                display: none;
                background-color: #fff;
                z-index: 9999; 
                font-family: 'Poppins', sans-serif;
            }
            .chat-header {
                background-color: #FCEEF3; 
                color: black;
                padding: 12px 15px; 
                border-radius: 10px 10px 0 0;
                display: flex;
                align-items: center;
            }
            .chat-header img { 
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 8px;
            }
            .chat-body {
                height: 350px;
                overflow-y: auto;
                padding: 10px 15px;
                background: #f8f8f8; 
            }
            .message {
                display: flex;
                align-items: flex-end;
                margin-bottom: 10px;
                font-size: small;
            }
            .message-text {
                background-color: #fff; 
                color: #333;
                padding: 8px 12px;
                border-radius: 18px;
                max-width: 75%;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                position: relative;
            }
            .user-message {
                justify-content: flex-end;
            }
            .user-message .message-text {
                background-color: #f2edec; 
                color: black;
            }
            .agent-message {
                justify-content: flex-start;
            }
            .agent-message .message-text {
                background-color: #E7EEEE; 
            }
            .typing-indicator {
                font-size: small;
                color: gray;
            }
            .chat-input {
                display: flex;
                padding: 5px;
                border-top: 1px solid #ddd;
                background-color: #f8f9fa;
                border-radius: 0 0 10px 10px;
            }
            #inputMessage {
                flex: 1;
                margin-right: 1px;
                border: none;
                padding: 10px 15px;
                border-radius: 20px;
                background-color: #eee; 
            }
            #inputMessage:focus {
                outline: none;
            }
            .chat-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                color: white;
                border: none;
                border-radius: 50%; 
                padding: 15px;
                cursor: pointer;
                z-index: 9999; 
                width: 45px; 
                height: 45px; 
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
        <div class="d-flex align-items-center justify-content-between chat-header">
            <img src="${agentImageUrl}" alt="Agent" class="me-2">
            <span class="text-dark">${agentName}</span>
            <a class="btn-close" onclick="toggleChat()" aria-label="Close"></a>
        </div>
        <div class="chat-body">
            <div id="messages" class="messages"></div>
        </div>
        <div class="chat-input">
            <input type="text" id="inputMessage" placeholder="Type your message..." onkeypress="handleKeyPress(event)" />
            <a class="no-decoration btn" onclick="sendMessage()">
                <i class="fas fa-paper-plane"></i> 
            </a>
        </div>
        <div class="text-center developer">
            <small>${websiteDeveloper}❣️</small>
        </div>
    `;
  document.body.appendChild(widgetContainer);

  const chatButton = document.createElement("button");
  chatButton.className = "chat-button";
  chatButton.innerHTML ='<i class="${SupportIcon}"></i>';
  chatButton.onclick = toggleChat;
  document.body.appendChild(chatButton);

  if (sessionStorage.getItem("chatVisible") === "true") {
    widgetContainer.style.display = "block";
    chatButton.style.display = "none";
  }

  loadMessages();
}

function toggleChat() {
  const chatWidget = document.getElementById("chatWidget");
  const isVisible = chatWidget.style.display === "block";
  chatWidget.style.display = isVisible ? "none" : "block";
  document.querySelector(".chat-button").style.display = isVisible
    ? "block"
    : "none";
  sessionStorage.setItem("chatVisible", !isVisible);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  messages.forEach((msg) => {
    displayMessage(msg.text, msg.sender);
  });
}

function displayMessage(text, sender) {
  const messagesContainer = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  messageDiv.innerHTML = `<div class="message-text">${text}</div>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
