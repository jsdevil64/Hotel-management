import { auth, signInWithEmailAndPassword } from './firebase-config.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (submitBtn) {
        submitBtn.innerText = "Logging in...";
        submitBtn.disabled = true;
      }

      try {
        // Firebase Authentication Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        alert("லாகின் வெற்றி! 🚀");
        window.location.href = "student-dashboard.html"; // Dashboard-க்கு அழைத்துச் செல்லும்

      } catch (error) {
        alert("லாகின் பிழை: " + error.message);
        
        if (submitBtn) {
          submitBtn.innerText = "Sign In";
          submitBtn.disabled = false;
        }
      }
    });
  }
});


