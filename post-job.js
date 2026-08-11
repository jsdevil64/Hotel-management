import { auth, db, collection, addDoc, onAuthStateChanged } from './firebase-config.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("வேலை பதிவிட முதலில் Login செய்யவும்!");
    window.location.href = "hotel-login.html";
  }
});

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const title = document.getElementById('jobTitle').value;
    const salary = document.getElementById('salary').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description')?.value || "";

    try {
      await addDoc(collection(db, "jobs"), {
        hotelId: user.uid,
        title: title,
        salary: salary,
        location: location,
        description: description,
        status: "Active",
        postedAt: new Date()
      });

      alert("வேலை வாய்ப்பு பதிவேற்றப்பட்டது! 💼");
      window.location.href = "hotel-dashboard.html";
    } catch (error) {
      alert("பிழை: " + error.message);
    }
  });
}


