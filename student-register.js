import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from './firebase-config.js';

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName')?.value || "Student";
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone')?.value || "";

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "students", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        phone: phone,
        role: "student",
        createdAt: new Date()
      });

      alert("மாணவர் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! 🎉");
      window.location.href = "student-dashboard.html";
    } catch (error) {
      alert("பிழை: " + error.message);
    }
  });
}


