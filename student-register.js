
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Auth State Check & Fetch Student Profile
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Logged in User UID:", user.uid);

    try {
      // நீங்கள் Register செய்த Data-வை Firestore 'students' collection-ல் இருந்து எடுக்கிறது
      const docRef = doc(db, "students", user.uid);
      const studentSnap = await getDoc(docRef);

      if (studentSnap.exists()) {
        const data = studentSnap.data();

        // 🎯 நீங்கள் Register செய்த பெயர், கல்லூரி, துறை தானாக மாறும்
        const name = data.name || data.studentName || data.fullName || "Student";
        const dept = data.department || data.dept || "Hotel Management";
        const college = data.collegeName || data.college || "";

        document.getElementById('studentName').innerText = `Hello, ${name} 👋`;
        document.getElementById('studentRole').innerText = `${dept} ${college ? '• ' + college : ''}`;

        // Profile Photo இருந்தால் மாறும்
        if (data.profilePhoto || data.photoUrl) {
          const photoImg = document.getElementById('studentPhoto');
          photoImg.src = data.profilePhoto || data.photoUrl;
          photoImg.classList.remove('hidden');
          document.getElementById('defaultAvatar')?.classList.add('hidden');
        }
      } else {
        console.log("No student record found for UID:", user.uid);
        document.getElementById('studentName').innerText = "Hello, Student 👋";
      }
    } catch (err) {
      console.error("Firestore Fetch Error:", err);
      document.getElementById('studentName').innerText = "Hello, Student 👋";
    }

    // 2. Load Jobs
    loadJobs();

  } else {
    // Logged in செய்யவில்லை என்றால் Login Page-க்கு Redirect ஆகும்
    window.location.href = "student-login.html";
  }
});

// Fetch Posted Jobs
async function loadJobs() {
  const container = document.getElementById('jobsContainer');
  if (!container) return;

  try {
    const jobsSnap = await getDocs(collection(db, "jobs"));

    if (jobsSnap.empty) {
      container.innerHTML = `
        <div class="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
          <p class="text-xs text-slate-500">No job openings posted yet.</p>
        </div>`;
      return;
    }

    container.innerHTML = "";
    jobsSnap.forEach((docSnap) => {
      const job = docSnap.data();
      const card = `
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-3">
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg">
                🏨
              </div>
              <div>
                <h4 class="font-bold text-slate-800 text-sm">${job.title || job.jobTitle || 'Hotel Staff'}</h4>
                <p class="text-xs text-slate-500">${job.hotelName || 'Hotel'} • ${job.location || 'Location'}</p>
              </div>
            </div>
            <span class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              ${job.jobType || 'Part-Time'}
            </span>
          </div>

          <div class="flex justify-between items-center pt-2 border-t border-slate-100">
            <div>
              <span class="text-[10px] text-slate-400 font-medium block">Salary</span>
              <span class="text-xs font-bold text-indigo-900">${job.salary || 'Negotiable'}</span>
            </div>
            <button onclick="alert('உங்கள் விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! 🎉')" 
              class="bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition">
              Apply Now
            </button>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (err) {
    console.error("Error loading jobs:", err);
    container.innerHTML = `<p class="text-xs text-red-500 text-center py-4">Error loading jobs.</p>`;
  }
}

// Logout Button Action
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "student-login.html";
  });
});
      
