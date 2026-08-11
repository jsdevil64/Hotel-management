import { auth, signInWithEmailAndPassword } from './firebase-config.js';

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("லாகின் வெற்றி! 🚀");
      window.location.href = "student-dashboard.html";
    } catch (error) {
      alert("லாகின் பிழை: " + error.message);
    }
  });
}


