import { auth, db, doc, getDoc } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Authentication Check & Profile Loading
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      // Get Student Profile from Firestore
      const docRef = doc(db, "students", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Update UI Elements
        document.getElementById('welcomeText').innerText = `Hello, ${data.name || 'Student'}`;
        document.getElementById('studentName').innerText = data.name || "Student Name";
        document.getElementById('studentCollege').innerText = `🎓 ${data.collegeName || 'College Not Specified'}`;
        document.getElementById('studentDept').innerText = data.department || "General";
        document.getElementById('studentYear').innerText = data.yearOfStudy || "N/A";

        // Profile Photo Logic
        if (data.profilePhoto) {
          const imgTag = document.getElementById('studentProfileImg');
          imgTag.src = data.profilePhoto;
          imgTag.classList.remove('hidden');
          document.getElementById('defaultAvatar').classList.add('hidden');
        }
      } else {
        console.log("No student document found!");
      }

    } catch (error) {
      console.error("Error fetching student profile:", error);
    }

    // 2. Load Jobs Posted by Hotels
    loadAllJobs();

  } else {
    // If user is not logged in, redirect to login page
    window.location.href = "student-login.html";
  }
});

// Function to fetch posted jobs from Firestore
async function loadAllJobs() {
  const container = document.getElementById('jobsListContainer');

  try {
    const querySnapshot = await getDocs(collection(db, "jobs"));

    if (querySnapshot.empty) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-2xl text-center border border-slate-200">
          <p class="text-sm text-slate-500">No job openings available right now. Check back soon!</p>
        </div>`;
      return;
    }

    container.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
      const job = docSnap.data();
      const card = `
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition">
          <div>
            <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">NEW</span>
            <h4 class="font-bold text-slate-800 text-base mt-1">${job.title || 'Hotel Staff Needed'}</h4>
            <p class="text-xs text-slate-500 font-medium mt-1">
              🏢 ${job.hotelName || 'Hotel'} • 📍 ${job.location || 'City'}
            </p>
            <p class="text-xs text-indigo-900 font-bold mt-2">💰 ${job.salary || 'Negotiable'}</p>
          </div>
          <button onclick="alert('உங்கள் விண்ணப்பம் சமர்ப்பிக்கப்பட்டது! (Applied Successfully)')" 
            class="bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm self-start md:self-center">
            Apply Now
          </button>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    container.innerHTML = `<p class="text-xs text-red-500 text-center py-4">Failed to load jobs.</p>`;
  }
}

// Logout Logic
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = "student-login.html";
    });
  });
}