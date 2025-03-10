// js/chat.js

document.addEventListener("DOMContentLoaded", function() {
    const username = sessionStorage.getItem("username");
    if (!username) {
      window.location.href = "index.html"; // Redirect if not logged in
      return;
    }
    
    // Set logout button functionality
    document.getElementById("logout-button").addEventListener("click", function() {
      // Optionally, update status to offline immediately
      const statusRef = database.ref("/status/" + username);
      statusRef.set({
        online: false,
        lastChanged: firebase.database.ServerValue.TIMESTAMP
      });
      sessionStorage.removeItem("username");
      window.location.href = "index.html";
    });
    
    // For now, use a default chat partner. In production, you would select from the sidebar.
    let chatPartner = "user2";
    if (username === "user2") chatPartner = "user1"; // Swap if current user is user2
    
    // Set chat header with partner name
    document.getElementById("chat-partner-name").textContent = chatPartner;
    
    // Update user's online status in Firebase
    const statusRef = database.ref("/status/" + username);
    statusRef.set({
      online: true,
      lastChanged: firebase.database.ServerValue.TIMESTAMP
    });
    statusRef.onDisconnect().set({
      online: false,
      lastChanged: firebase.database.ServerValue.TIMESTAMP
    });
    
    // Listen for chat partner's status updates
    const partnerStatusRef = database.ref("/status/" + chatPartner);
    partnerStatusRef.on("value", function(snapshot) {
      const data = snapshot.val();
      const statusIndicator = document.getElementById("status-indicator");
      if (data && data.online) {
        statusIndicator.textContent = "Online";
        statusIndicator.classList.remove("offline");
        statusIndicator.classList.add("online");
      } else {
        statusIndicator.textContent = "Offline";
        statusIndicator.classList.remove("online");
        statusIndicator.classList.add("offline");
      }
    });
    
    // Generate a unique chat room ID by sorting the usernames alphabetically
    const chatRoomId = [username, chatPartner].sort().join("_");
    const messagesRef = database.ref("chats/" + chatRoomId + "/messages");
    
    // Function to display a message in the chat area
    function displayMessage(messageData) {
      const msgContainer = document.createElement("div");
      msgContainer.classList.add("message");
      msgContainer.classList.add(messageData.sender === username ? "sent" : "received");
      msgContainer.innerHTML = `<p>${messageData.text}</p>
                                <span class="timestamp">${new Date(messageData.timestamp).toLocaleTimeString()}</span>`;
      document.getElementById("chat-messages").appendChild(msgContainer);
      // Scroll to the bottom of the messages area
      const messagesArea = document.getElementById("chat-messages");
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }
    
    // Listen for new messages
    messagesRef.on("child_added", function(snapshot) {
      const messageData = snapshot.val();
      displayMessage(messageData);
    });
    
    // Send message on button click or Enter key press
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("message-input").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
    
    function sendMessage() {
      const messageInput = document.getElementById("message-input");
      const text = messageInput.value.trim();
      if (text === "") return;
      
      const newMessage = {
        sender: username,
        text: text,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      messagesRef.push(newMessage);
      messageInput.value = "";
    }
    
    // 4-day message retention (in milliseconds)
    const retentionPeriod = 4 * 24 * 60 * 60 * 1000;
    
    function removeOldMessages() {
      messagesRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          const msg = childSnapshot.val();
          if (Date.now() - msg.timestamp > retentionPeriod) {
            childSnapshot.ref.remove();
          }
        });
      });
    }
    
    // Run retention check on load and every hour
    removeOldMessages();
    setInterval(removeOldMessages, 60 * 60 * 1000);
  });
  