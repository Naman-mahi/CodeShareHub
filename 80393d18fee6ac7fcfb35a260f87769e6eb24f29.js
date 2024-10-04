document.addEventListener("DOMContentLoaded", function () {
  // Create chat widget elements
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "chatWidget";
  widgetContainer.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

            #chatWidget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px; /* Reduced width */
                max-height: 500px;
                border-radius: 10px; 
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                display: none;
                background-color: #fff;
                z-index: 9999; 
                font-family: 'Poppins', sans-serif;
            }
            .chat-header {
                background-color: #FCEEF3; /* Green header */
                color: white;
                padding: 12px 15px; /* Adjusted padding */
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
            .chat-header span {
                font-weight: bold;
            }
            .chat-body {
                height: 350px;
                overflow-y: auto;
                padding: 10px 15px;
                background: #f8f8f8; /* Subtle background */
            }
            .chat-body::-webkit-scrollbar {
                width: 3px; 
            }
            .chat-body::-webkit-scrollbar-thumb {
                background-color: #28a745;  /* Green scrollbar */
                border-radius: 4px;
            }
            .message {
                display: flex;
                align-items: flex-end;
                margin-bottom: 10px;
                font-size: small;
            }
            .message-text {
                background-color: #fff; /* White message bubbles */
                color: #333;
                padding: 8px 12px;
                border-radius: 18px;
                max-width: 75%;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            .user-message {
                justify-content: flex-end;
            }
            .user-message .message-text {
                background-color: #f2edec; /* User message */
                color: black;
            }
            .agent-message {
                justify-content: flex-start;
            }
            .agent-message .message-text {
                background-color: #E7EEEE; /* Light gray agent message */
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
                background-color: #28a745; /* Green button */
                color: white;
                border: none;
                border-radius: 50%; 
                padding: 15px;
                cursor: pointer;
                z-index: 9999; 
                width: 60px; 
                height: 60px; 
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Softer shadow */
            }
            .chat-button i {
                font-size: 20px;
            }
            .developer {
                font-size: small;
            }
        </style>
        <div class="d-flex align-items-center justify-content-between chat-header">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hn5KYtSp4HnteAMMJU0AfLiTn6IKsRXrrg&s" alt="Agent" class="me-2">
            <span class="text-dark">Chat with Us</span>
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
            <small>Namanmahi❣️</small>
        </div>
    `;
  document.body.appendChild(widgetContainer);

  const chatButton = document.createElement("button");
  chatButton.className = "chat-button";
  chatButton.innerHTML = '<i class="fas fa-comment"></i>';
  chatButton.onclick = toggleChat;
  document.body.appendChild(chatButton);

  if (sessionStorage.getItem("chatVisible") === "true") {
    widgetContainer.style.display = "block";
    chatButton.style.display = "none";
  }

  loadMessages();

  function toggleChat() {
    const chatWidget = document.getElementById("chatWidget");
    const isVisible = chatWidget.style.display === "block";
    chatWidget.style.display = isVisible ? "none" : "block";
    chatButton.style.display = isVisible ? "block" : "none";
    sessionStorage.setItem("chatVisible", !isVisible);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function sendMessage() {
    const input = document.getElementById("inputMessage");
    const messageText = input.value.trim();
    if (messageText) {
      displayMessage(messageText, "user");
      input.value = "";

      setTimeout(() => {
        let agentResponse = "";

        const lowerText = messageText.toLowerCase();

        if (
          lowerText.includes("hello") ||
          lowerText.includes("hi") ||
          lowerText.includes("hey")
        ) {
          agentResponse = "Hello there! Welcome to Digital Dynamo! How can I assist you today?";
        } else if (
          lowerText.includes("price") ||
          lowerText.includes("cost") ||
          lowerText.includes("fees")
        ) {
          agentResponse =
            "At Digital Dynamo, our pricing varies based on project scope and complexity. Please share more about your needs, and I can provide a customized quote.";
        } else if (
          lowerText.includes("services") ||
          lowerText.includes("what do you do") ||
          lowerText.includes("offer") ||
          lowerText.includes("types of services")
        ) {
          agentResponse =
            "Digital Dynamo offers a wide range of services, including:\n1. **Web Development**\n2. **Graphic Design**\n3. **E-commerce Solutions**\n4. **Mobile App Development**\n5. **AI Solutions**\n6. **Cloud Services**\n7. **Digital Marketing**. What specific service are you interested in?";
        } else if (
          lowerText.includes("app development") ||
          lowerText.includes("mobile app")
        ) {
          agentResponse =
            "We specialize in high-quality mobile and web applications at Digital Dynamo. Do you have a specific platform in mind (iOS, Android, or web)?";
        } else if (
          lowerText.includes("website") ||
          lowerText.includes("web design")
        ) {
          agentResponse =
            "Digital Dynamo creates visually stunning and highly functional websites tailored to your business needs. Do you have a design style in mind?";
        } else if (
          lowerText.includes("e-commerce") ||
          lowerText.includes("online store")
        ) {
          agentResponse =
            "We can help you establish a user-friendly e-commerce store at Digital Dynamo. Are there any specific platforms you’re looking to integrate with?";
        } else if (
          lowerText.includes("ai") ||
          lowerText.includes("artificial intelligence")
        ) {
          agentResponse =
            "Digital Dynamo offers various AI solutions, including:\n1. **Machine Learning Models**\n2. **Natural Language Processing**\n3. **AI Chatbots**\n4. **Predictive Analytics**. Which area are you interested in exploring?";
        } else if (
          lowerText.includes("data analysis") ||
          lowerText.includes("data science")
        ) {
          agentResponse =
            "We provide comprehensive data analysis and visualization services at Digital Dynamo. Are you looking for insights into specific data sets?";
        } else if (
          lowerText.includes("seo") ||
          lowerText.includes("search engine optimization")
        ) {
          agentResponse =
            "Our SEO services at Digital Dynamo aim to enhance your website's visibility on search engines. Would you like a detailed strategy?";
        } else if (
          lowerText.includes("social media") ||
          lowerText.includes("marketing")
        ) {
          agentResponse =
            "We offer social media marketing services to boost your online presence. Which platforms are you interested in?";
        } else if (lowerText.includes("naman khobragade")) {
          agentResponse =
            "Naman Khobragade is our founder and CEO at Digital Dynamo, a visionary leader passionate about technology and innovation!";
        } else if (
          lowerText.includes("support") ||
          lowerText.includes("help")
        ) {
          agentResponse =
            "We're here to assist you at Digital Dynamo! Please provide more details about the support you need.";
        } else if (
          lowerText.includes("contact") ||
          lowerText.includes("reach")
        ) {
          agentResponse =
            "You can reach us at +917498950562 or skhobragade@gmail.com. You can also contact us through our website's contact form.";
        } else if (lowerText.includes("hours") || lowerText.includes("open")) {
          agentResponse =
            "Digital Dynamo's office hours are Monday to Friday, 9 AM to 5 PM. How else can I assist you?";
        } else if (
          lowerText.includes("location") ||
          lowerText.includes("address")
        ) {
          agentResponse =
            "We are located at 44, Hyderabad, India. Feel free to visit us at Digital Dynamo!";
        } else if (
          lowerText.includes("feedback") ||
          lowerText.includes("review")
        ) {
          agentResponse =
            "We value your feedback at Digital Dynamo! Please share your thoughts on our services.";
        } else if (
          lowerText.includes("careers") ||
          lowerText.includes("jobs")
        ) {
          agentResponse =
            "We're always looking for talented individuals! Check our careers page at Digital Dynamo for current openings.";
        } else if (
          lowerText.includes("portfolio") ||
          lowerText.includes("projects")
        ) {
          agentResponse =
            "You can view our portfolio on the Digital Dynamo website, showcasing our recent projects and achievements.";
        } else if (
          lowerText.includes("testimonials") ||
          lowerText.includes("reviews")
        ) {
          agentResponse =
            "Our clients often share their experiences on our testimonials page. Would you like to see some from Digital Dynamo?";
        } else if (
          lowerText.includes("refund") ||
          lowerText.includes("policy")
        ) {
          agentResponse =
            "Our refund policy at Digital Dynamo varies by project type. Please check our website or provide more details for specific information.";
        } else if (
          lowerText.includes("security") ||
          lowerText.includes("data protection")
        ) {
          agentResponse =
            "We prioritize security at Digital Dynamo and comply with the latest data protection regulations to keep your information safe.";
        } else if (
          lowerText.includes("integration") ||
          lowerText.includes("third-party")
        ) {
          agentResponse =
            "We offer integration services with various third-party platforms at Digital Dynamo. Which platform are you interested in?";
        } else if (
          lowerText.includes("customization") ||
          lowerText.includes("custom")
        ) {
          agentResponse =
            "We can tailor our solutions at Digital Dynamo to meet your specific requirements. What features are you looking for?";
        } else if (
          lowerText.includes("training") ||
          lowerText.includes("support")
        ) {
          agentResponse =
            "We provide training and support at Digital Dynamo to help you maximize our services. Would you like more information?";
        } else if (
          lowerText.includes("partnership") ||
          lowerText.includes("collaboration")
        ) {
          agentResponse =
            "We love collaborating with other businesses at Digital Dynamo! Please share your ideas, and we can explore potential partnerships.";
        } else if (
          lowerText.includes("updates") ||
          lowerText.includes("news")
        ) {
          agentResponse =
            "Stay tuned for our latest updates from Digital Dynamo! You can also subscribe to our newsletter for news.";
        } else if (
          lowerText.includes("events") ||
          lowerText.includes("webinars")
        ) {
          agentResponse =
            "We host various events and webinars at Digital Dynamo. Check our events page for upcoming schedules!";
        } else if (
          lowerText.includes("terms") ||
          lowerText.includes("conditions")
        ) {
          agentResponse =
            "You can find our terms and conditions on the Digital Dynamo website. Would you like me to summarize them?";
        } else if (
          lowerText.includes("privacy") ||
          lowerText.includes("policy")
        ) {
          agentResponse =
            "We have a comprehensive privacy policy at Digital Dynamo detailing how we handle your data. You can find it on our website.";
        } else if (
          lowerText.includes("payment") ||
          lowerText.includes("methods")
        ) {
          agentResponse =
            "We accept various payment methods at Digital Dynamo, including credit cards and bank transfers. Please check our payment page for details.";
        } else if (lowerText.includes("demo") || lowerText.includes("trial")) {
          agentResponse =
            "We offer demos and trial periods for many of our services at Digital Dynamo. Would you like to schedule one?";
        } else if (
          lowerText.includes("technical support") ||
          lowerText.includes("issues")
        ) {
          agentResponse =
            "If you're experiencing technical issues, please provide details so we at Digital Dynamo can assist you better.";
        } else if (
          lowerText.includes("community") ||
          lowerText.includes("forum")
        ) {
          agentResponse =
            "Join our community forum at Digital Dynamo to connect with other users and share experiences!";
        } else if (
          lowerText.includes("newsletter") ||
          lowerText.includes("subscribe")
        ) {
          agentResponse =
            "You can subscribe to our newsletter on the Digital Dynamo website for updates and news!";
        } else if (
          lowerText.includes("usage") ||
          lowerText.includes("guidelines")
        ) {
          agentResponse =
            "We provide usage guidelines for our services at Digital Dynamo. You can find detailed documentation on our website.";
        } else if (
          lowerText.includes("api") ||
          lowerText.includes("integration")
        ) {
          agentResponse =
            "We offer API access for integration with your systems at Digital Dynamo. Would you like more information?";
        } else if (
          lowerText.includes("cloud services") ||
          lowerText.includes("hosting")
        ) {
          agentResponse =
            "We provide secure cloud hosting services at Digital Dynamo. Would you like to learn more about our hosting plans?";
        } else if (
          lowerText.includes("mobile compatibility") ||
          lowerText.includes("responsive")
        ) {
          agentResponse =
            "All our services at Digital Dynamo are designed to be mobile-friendly and responsive. Do you have specific requirements in mind?";
        } else if (
          lowerText.includes("analytics") ||
          lowerText.includes("tracking")
        ) {
          agentResponse =
            "We provide analytics tools to help you track your performance at Digital Dynamo. Would you like to know more about our analytics services?";
        } else if (
          lowerText.includes("advertising") ||
          lowerText.includes("marketing")
        ) {
          agentResponse =
            "We offer various marketing and advertising solutions at Digital Dynamo. What kind of services are you interested in?";
        } else if (
          lowerText.includes("scheduling") ||
          lowerText.includes("appointment")
        ) {
          agentResponse =
            "You can schedule an appointment through our website or directly here. When would you like to meet?";
        } else if (
          lowerText.includes("faq") ||
          lowerText.includes("questions")
        ) {
          agentResponse =
            "You can find answers to common questions on our FAQ page. Is there something specific you'd like to know?";
        } else if (
          lowerText.includes("international") ||
          lowerText.includes("global")
        ) {
          agentResponse =
            "We provide services internationally at Digital Dynamo. Please share your location, and we can discuss availability.";
        } else if (
          lowerText.includes("community") ||
          lowerText.includes("users")
        ) {
          agentResponse =
            "Join our user community for tips, tricks, and support from other users!";
        } else if (
          lowerText.includes("sunil") ||
          lowerText.includes("khobragade") ||
          lowerText.includes("naman") ||
          lowerText.includes("naman khobragade") ||
          lowerText.includes("developer") ||
          lowerText.includes("creator") ||
          lowerText.includes("founder")
        ) {
          agentResponse =
            "Sunil Khobragade is the brilliant mind behind my development at Digital Dynamo! He’s dedicated to creating a seamless experience for you.";
        } else if (
          lowerText.includes("video tutorials") ||
          lowerText.includes("learning")
        ) {
          agentResponse =
            "We have a series of video tutorials available on our website. Would you like to see a specific topic?";
        } else {
          agentResponse =
            "Thanks for your message! I'm still learning, but I'm here to assist you with anything related to Digital Dynamo's services.";
        }
        

        displayMessage(agentResponse, "agent");
      }, 1000);
      saveMessages();
    }
  }

  function displayMessage(text, sender) {
    const messagesContainer = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<div class="message-text">${text}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function saveMessages() {
    const messagesContainer = document.getElementById("messages");
    sessionStorage.setItem("chatMessages", messagesContainer.innerHTML);
  }

  function loadMessages() {
    const messagesContainer = document.getElementById("messages");
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) {
      messagesContainer.innerHTML = savedMessages;
    }
  }

  window.toggleChat = toggleChat;
  window.sendMessage = sendMessage;
  window.handleKeyPress = handleKeyPress;
});
