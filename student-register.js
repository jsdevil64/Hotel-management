import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentRegisterForm');
  const submitBtn = document.getElementById('submitBtn');
  const photoInput = document.getElementById('profilePhoto');
  const photoPreview = document.getElementById('photoPreview');
  const defaultAvatar = document.getElementById('defaultAvatar');

  let profileBase64 = ""; // Photo Data

  // Image Preview Logic
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          profileBase64 = evt.target.result;
          photoPreview.src = profileBase64;
          photoPreview.classList.remove('hidden');
          defaultAvatar.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Form Submit Logic
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const collegeName = document.getElementById('collegeName').value;
      const department = document.getElementById('department').value;
      const yearOfStudy = document.getElementById('yearOfStudy').value;

      if (password !== confirmPassword) {
        alert("கடவுச்சொற்கள் பொருந்தவில்லை! (Passwords do not match)");
        return;
      }

      submitBtn.innerText = "Creating Account...";
      submitBtn.disabled = true;

      try {
        // 1. Create Auth User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Save Data + Photo in Firestore Database
        await setDoc(doc(db, "students", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          phone: phone,
          collegeName: collegeName,
          department: department,
          yearOfStudy: yearOfStudy,
          profilePhoto: profileBase64 || "", // Stores Profile Picture
          role: "student",
          createdAt: new Date()
        });

        alert("மாணவர் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! 🎉");
        window.location.href = "student-dashboard.html";

      } catch (error) {
        alert("பிழை: " + error.message);
        submitBtn.innerText = "Create Account";
        submitBtn.disabled = false;
      }
    });
  }
});

