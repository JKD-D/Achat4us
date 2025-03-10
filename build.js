require('dotenv').config({ path: './.env' }); // Load environment variables from .env
const fs = require('fs');
const path = require('path');


// Define paths for the template and the output file
const templatePath = path.join(__dirname, 'js', 'firebase-config.template.js');
const targetPath = path.join(__dirname, 'js', 'firebase-config.js');

// Read the template file
fs.readFile(templatePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading template file:', err);
    process.exit(1);
  }

  // Replace placeholders with actual values from .env
  let result = data.replace(/%%API_KEY%%/g, process.env.apiKey)
                   .replace(/%%AUTH_DOMAIN%%/g, process.env.authDomain)
                   .replace(/%%DATABASE_URL%%/g, process.env.databaseURL)
                   .replace(/%%PROJECT_ID%%/g, process.env.projectId)
                   .replace(/%%STORAGE_BUCKET%%/g, process.env.storageBucket)
                   .replace(/%%MESSAGING_SENDER_ID%%/g, process.env.messagingSenderId)
                   .replace(/%%APP_ID%%/g, process.env.appId);

  // Write the final configuration file
  fs.writeFile(targetPath, result, 'utf8', err => {
    if (err) {
      console.error('Error writing firebase-config.js:', err);
      process.exit(1);
    }
    console.log('Firebase configuration file has been created successfully!');
  });
});
