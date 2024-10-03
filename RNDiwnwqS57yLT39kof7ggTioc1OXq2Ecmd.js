function sendMessage() {
    const input = document.getElementById("inputMessage");
    const messageText = input.value.trim();
    if (messageText) {
        // Save user message
        const userMessage = { text: messageText, sender: "user" };
        saveMessage(userMessage);
        displayMessage(messageText, "user");
        input.value = "";

        // Show typing indicator
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "typing-indicator";
        typingIndicator.textContent = "AI is typing...";
        document.getElementById("messages").appendChild(typingIndicator);
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;

        // Simulate agent response after 2 seconds
        setTimeout(() => {
            const agentResponse = getAgentResponse(messageText);
            const agentMessage = { text: agentResponse, sender: "agent" };
            // Remove typing indicator
            typingIndicator.remove();
            displayMessage(agentResponse, "agent");
            saveMessage(agentMessage);
        }, 2000);
    }
}

function getAgentResponse(messageText) {
    const lowerText = messageText.toLowerCase();
    if (
        lowerText.includes("hello") ||
        lowerText.includes("hi") ||
        lowerText.includes("hey") ||
        lowerText.includes("namaste")
    ) {
        return "Hello there! How can I help you today?";
    } else if (
        lowerText.includes("price") ||
        lowerText.includes("cost") ||
        lowerText.includes("fees")
    ) {
        return "Our pricing varies depending on the project scope and complexity. Please tell me more about your needs, and I can provide you with a customized quote.";
    } else if (
        lowerText.includes("services") ||
        lowerText.includes("what do you do") ||
        lowerText.includes("offer")
    ) {
        return "We offer a wide range of software services, including application development, website design & development, e-commerce solutions, and more. What are you interested in?";
    } else if (
        lowerText.includes("app development") ||
        lowerText.includes("mobile app")
    ) {
        return "We excel at building high-quality mobile and web applications. Do you have a specific platform in mind (iOS, Android, or web)?";
    } else if (
        lowerText.includes("website") ||
        lowerText.includes("web design")
    ) {
        return "We can create stunning and functional websites tailored to your business needs. Do you have a particular design style in mind?";
    } else if (
        lowerText.includes("e-commerce") ||
        lowerText.includes("online store")
    ) {
        return "We can help you set up a robust and user-friendly e-commerce store. Are you looking to integrate with any specific platforms?";
    } else if (lowerText.includes("naman khobragade")) {
        return "Naman is our founder and CEO. He's a visionary leader with a passion for technology and innovation!";
    } else if (
        lowerText.includes("support") ||
        lowerText.includes("help")
    ) {
        return "We're here to help! Please provide more details about the support you need.";
    } else if (
        lowerText.includes("contact") ||
        lowerText.includes("reach")
    ) {
        return "You can reach us at contact@example.com or through our website's contact form.";
    } else if (lowerText.includes("hours") || lowerText.includes("open")) {
        return "Our office hours are Monday to Friday, 9 AM to 5 PM. How can I assist you further?";
    } else if (
        lowerText.includes("location") ||
        lowerText.includes("address")
    ) {
        return "We are located at 123 Main Street, Hometown, USA. Feel free to visit us!";
    } else if (
        lowerText.includes("feedback") ||
        lowerText.includes("review")
    ) {
        return "We value your feedback! Please let us know what you think about our services.";
    } else if (
        lowerText.includes("careers") ||
        lowerText.includes("jobs")
    ) {
        return "We're always looking for talented individuals! Check our careers page for current openings.";
    } else if (
        lowerText.includes("portfolio") ||
        lowerText.includes("projects")
    ) {
        return "You can view our portfolio on our website. It showcases our recent projects and achievements.";
    } else if (
        lowerText.includes("testimonials") ||
        lowerText.includes("reviews")
    ) {
        return "Our clients often share their experiences on our testimonials page. Would you like to know more?";
    } else if (
        lowerText.includes("refund") ||
        lowerText.includes("policy")
    ) {
        return "Our refund policy varies by project type. Please check our website or provide more details for specific information.";
    } else if (
        lowerText.includes("security") ||
        lowerText.includes("data protection")
    ) {
        return "We take security seriously. Our services comply with the latest data protection regulations to keep your information safe.";
    } else if (
        lowerText.includes("integration") ||
        lowerText.includes("third-party")
    ) {
        return "We offer various integration services with popular third-party platforms. Which platform are you interested in?";
    } else if (
        lowerText.includes("customization") ||
        lowerText.includes("custom")
    ) {
        return "We can tailor our solutions to meet your specific requirements. What features are you looking for?";
    } else if (
        lowerText.includes("training") ||
        lowerText.includes("support")
    ) {
        return "We provide training and support to ensure you get the most out of our services. Would you like to know more?";
    } else if (
        lowerText.includes("partnership") ||
        lowerText.includes("collaboration")
    ) {
        return "We love partnering with other businesses! Please share your ideas, and we can discuss potential collaboration.";
    } else if (
        lowerText.includes("updates") ||
        lowerText.includes("news")
    ) {
        return "Stay tuned for our latest updates! You can also subscribe to our newsletter on our website.";
    } else if (
        lowerText.includes("events") ||
        lowerText.includes("webinars")
    ) {
        return "We host various events and webinars. Check our events page for upcoming schedules!";
    } else if (
        lowerText.includes("terms") ||
        lowerText.includes("conditions")
    ) {
        return "You can find our terms and conditions on our website. Would you like me to summarize them?";
    } else if (
        lowerText.includes("privacy") ||
        lowerText.includes("policy")
    ) {
        return "We have a comprehensive privacy policy detailing how we handle your data. You can find it on our website.";
    } else if (
        lowerText.includes("payment") ||
        lowerText.includes("methods")
    ) {
        return "We accept various payment methods, including credit cards and bank transfers. Please check our payment page for details.";
    } else if (lowerText.includes("demo") || lowerText.includes("trial")) {
        return "We offer demos and trial periods for many of our services. Would you like to schedule one?";
    } else if (
        lowerText.includes("technical support") ||
        lowerText.includes("issues")
    ) {
        return "If you're experiencing technical issues, please provide details so we can assist you better.";
    } else if (
        lowerText.includes("updates") ||
        lowerText.includes("new features")
    ) {
        return "We regularly update our services. You can check our blog for the latest features and enhancements.";
    } else if (
        lowerText.includes("community") ||
        lowerText.includes("forum")
    ) {
        return "Join our community forum to connect with other users and share experiences!";
    } else if (
        lowerText.includes("newsletter") ||
        lowerText.includes("subscribe")
    ) {
        return "You can subscribe to our newsletter on our website for updates and news!";
    } else if (
        lowerText.includes("usage") ||
        lowerText.includes("guidelines")
    ) {
        return "We provide usage guidelines for our services. You can find detailed documentation on our website.";
    } else if (
        lowerText.includes("api") ||
        lowerText.includes("integration")
    ) {
        return "We offer API access for integration with your systems. Would you like more information?";
    } else if (
        lowerText.includes("cloud services") ||
        lowerText.includes("hosting")
    ) {
        return "We provide secure cloud hosting services. Would you like to learn more about our hosting plans?";
    } else if (
        lowerText.includes("mobile compatibility") ||
        lowerText.includes("responsive")
    ) {
        return "All our services are designed to be mobile-friendly and responsive. Do you have a specific requirement in mind?";
    } else if (
        lowerText.includes("analytics") ||
        lowerText.includes("tracking")
    ) {
        return "We provide analytics tools to help you track your performance. Would you like to know more about our analytics services?";
    } else if (
        lowerText.includes("advertising") ||
        lowerText.includes("marketing")
    ) {
        return "We offer various marketing and advertising solutions. What kind of services are you interested in?";
    } else if (
        lowerText.includes("scheduling") ||
        lowerText.includes("appointment")
    ) {
        return "You can schedule an appointment through our website or directly here. When would you like to meet?";
    } else if (
        lowerText.includes("faq") ||
        lowerText.includes("questions")
    ) {
        return "You can find answers to common questions on our FAQ page. Is there something specific you'd like to know?";
    } else if (
        lowerText.includes("international") ||
        lowerText.includes("global")
    ) {
        return "We provide services internationally. Please share your location, and we can discuss availability.";
    } else if (
        lowerText.includes("community") ||
        lowerText.includes("users")
    ) {
        return "Join our user community for tips, tricks, and support from other users!";
    } else if (
        lowerText.includes("sunil") ||
        lowerText.includes("khobragade") ||
        lowerText.includes("naman") ||
        lowerText.includes("naman khobragade") ||
        lowerText.includes("developer") ||
        lowerText.includes("creator") ||
        lowerText.includes("founder")
    ) {
        return "Sunil Khobragade is the brilliant mind behind my development! He’s dedicated to creating a seamless experience for you.";
    } else if (
        lowerText.includes("video tutorials") ||
        lowerText.includes("learning")
    ) {
        return "We have a series of video tutorials available on our website. Would you like to see a specific topic?";
    } else {
        return "Thanks for your message! I'm still under development, but I'm learning more every day. Feel free to ask me anything about our services.";
    }
}


function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push(message);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}
