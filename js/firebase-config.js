// firebase-config.template.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

var firebaseConfig = {
    apiKey: "AIzaSyBedbnqy1YQaxxi5V_8KxWHTm_2RFwlNfU",
    authDomain: "yourproject.firebaseapp.com",
    databaseURL: "https://chat4us-3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat4us-3",
    storageBucket: "chat4us-3.firebasestorage.app",
    messagingSenderId: "720218363164",
    appId: "1:720218363164:web:094f96f2d49c87da2ed6d9"
  };
  
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var analytics = getAnalytics(app);
