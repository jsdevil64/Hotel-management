import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hotelRegisterForm');
  const submitBtn = document.getElementById('submitBtn');
  const logoInput = document.getElementById('hotelLogo');
  const logoPreview = document.getElementById('logoPreview');
  const defaultBuilding = document.getElementById('defaultBuilding');

  let logoBase64 = ""; // Stores Logo Image Data

  // Logo Preview Logic
  if (logoInput) {
    logoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          logoBase64 = evt.target.result;
          logoPreview.src = logoBase64;
          logoPreview.classList.remove('hidden');
          defaultBuilding.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Form Submit Logic
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const hotelName = document.getElementById('hotelName').value;
      const ownerName = document.getElementById('ownerName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const location = document.getElementById('location').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Password Check
      if (password !== confirmPassword) {
        alert("கடவுச்சொற்கள் பொருந்தவில்லை! (Passwords do not match)");
        return;
      }

      if (submitBtn) {
        submitBtn.innerText = "Creating Hotel Account...";
        submitBtn.disabled = true;
      }

      try {
        // 1. Firebase Auth Registration
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Save Data in Firestore 'hotels' collection
        await setDoc(doc(db, "hotels", user.uid), {
          uid: user.uid,
          hotelName: hotelName,
          ownerName: ownerName,
          email: email,
          phone: phone,
          location: location,
          hotelLogo: logoBase64 || "", // Saves uploaded logo
          role: "hotel",
          createdAt: new Date()
        });

        alert("ஹோட்டல் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! 🎉");
        window.location.href = "hotel-dashboard.html";

      } catch (error) {
        alert("பிழை: " + error.message);
        if (submitBtn) {
          submitBtn.innerText = "Create Account";
          submitBtn.disabled = false;
        }
      }
    });
  }
});



