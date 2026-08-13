import { auth, db, signInWithEmailAndPassword, doc, getDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (submitBtn) {
        submitBtn.innerText = "Logging in...";
        submitBtn.disabled = true;
      }

      try {
        // 1. Firebase Auth Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Check if user is a Hotel Owner
        const hotelDoc = await getDoc(doc(db, "hotels", user.uid));

        if (hotelDoc.exists()) {
          alert("Hotel Login Successful! 🎉");
          window.location.href = "hotel-dashboard.html"; // Redirects to Hotel Dashboard
        } else {
          alert("இது ஹோட்டல் கணக்கு அல்ல! (This is not a Hotel account)");
          if (submitBtn) {
            submitBtn.innerText = "Sign In";
            submitBtn.disabled = false;
          }
        }

      } catch (error) {
        alert("பிழை: " + error.message);
        if (submitBtn) {
          submitBtn.innerText = "Sign In";
          submitBtn.disabled = false;
        }
      }
    });
  }
});