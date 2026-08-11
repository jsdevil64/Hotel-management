import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from './firebase-config.js';

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const hotelName = document.getElementById('hotelName')?.value || "Hotel";
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const location = document.getElementById('location')?.value || "";

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "hotels", user.uid), {
        uid: user.uid,
        hotelName: hotelName,
        email: email,
        location: location,
        role: "hotel",
        createdAt: new Date()
      });

      alert("ஹோட்டல் கணக்கு வெற்றிகரமாக தொடங்கப்பட்டது! 🏨");
      window.location.href = "hotel-dashboard.html";
    } catch (error) {
      alert("பிழை: " + error.message);
    }
  });
}


