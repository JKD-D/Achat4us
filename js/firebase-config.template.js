// firebase-config.template.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

var firebaseConfig = {
    apiKey: "%%API_KEY%%",
    authDomain: "%%AUTH_DOMAIN%%",
    databaseURL: "%%DATABASE_URL%%",
    projectId: "%%PROJECT_ID%%",
    storageBucket: "%%STORAGE_BUCKET%%",
    messagingSenderId: "%%MESSAGING_SENDER_ID%%",
    appId: "%%APP_ID%%"
  };
  
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var analytics = getAnalytics(app);
