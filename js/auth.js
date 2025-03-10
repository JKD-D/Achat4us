// Hardcoded user credentials
const users = {
    'user1': 'password1',
    'user2': 'password2',
    'user3': 'password3',
    // Add more user-password pairs as needed
  };
  
  // Listen for the form submission
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Retrieve the entered username and password
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
  
    // Check if the username exists and the password matches
    if (users[username] && users[username] === password) {
      // Successful login: Store session info (optional) and redirect to chat page
      sessionStorage.setItem('username', username); // Simple session storage
      window.location.href = 'chat.html'; // Redirect to the chat interface
    } else {
      // Display error message for invalid credentials
      alert('Invalid username or password. Please try again.');
    }
  });
  