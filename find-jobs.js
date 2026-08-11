import { db, collection, getDocs } from './firebase-config.js';

async function loadJobs() {
  const container = document.getElementById('jobsContainer') || document.querySelector('.jobs-list');
  if (!container) return;

  try {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    container.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
      const job = docSnap.data();
      
      const card = document.createElement('div');
      card.className = "bg-white p-4 rounded-xl border shadow-sm mb-3";
      card.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-sm text-gray-800">${job.title}</h3>
            <p class="text-xs text-gray-500">📍 ${job.location}</p>
          </div>
          <span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">₹${job.salary}</span>
        </div>
        <p class="text-xs text-gray-600 mt-2 line-clamp-2">${job.description || ''}</p>
        <button onclick="applyJob('${docSnap.id}')" class="w-full mt-3 py-1.5 bg-indigo-900 text-white font-bold text-xs rounded-lg hover:bg-indigo-950">
          Apply Now
        </button>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Jobs load செய்வதில் பிழை:", error);
  }
}

window.addEventListener('DOMContentLoaded', loadJobs);


