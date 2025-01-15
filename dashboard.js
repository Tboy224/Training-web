import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhW2QWpr6m1Qizo9n2mPV62bGeUmo9Ay0",
    authDomain: "training-web-e7a70.firebaseapp.com",
    projectId: "training-web-e7a70",
    storageBucket: "training-web-e7a70.firebasestorage.app",
    messagingSenderId: "1035844592055",
    appId: "1:1035844592055:web:89c97da20a480d466b4832"
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserName').innerText = userData.name;
            }
            else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document: ", error);
        });
    }
    else {
        console.log("No user logged in");
    }
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.removeItem('loggedInUserId');
        window.location.href='index.html';
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});

// Get time the user logged in
const loggedInTime = localStorage.getItem('loggedInTime');
document.getElementById('loggedInTime').innerText = loggedInTime;

// Print lucky message
const luckyMessage = "Lucky You...";

// A logic where balAmount is deducted if user comes in specific times
const balAmount = 5;
const loggedInTimeArr = loggedInTime.split(':');
const hour = parseInt(loggedInTimeArr[0]);
const minute = parseInt(loggedInTimeArr[1]);
const second = parseInt(loggedInTimeArr[2]);


if (hour === 10 && minute === 1) {
    document.getElementById('balAmount').innerText = balAmount - 1;
} else if (hour === 10 && minute === 2) {
    document.getElementById('balAmount').innerText = balAmount - 2;
} else if (hour === 10 && minute === 3) {
    document.getElementById('balAmount').innerText = balAmount - 3;
} else if (hour === 10 && minute === 4) {
    document.getElementById('balAmount').innerText = balAmount - 4;
} else if (hour === 10 && minute === 5) {
    document.getElementById('balAmount').innerText = balAmount - 5;
    // Delete user account from database
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const docRef = doc(db, "users", loggedInUserId);
    deleteDoc(docRef)
    .then(() => {
        console.log("You have been successfully removed from the training!");
    })
    .catch((error) => {
        console.error("Error removing user: ", error);
    });
    localStorage.removeItem('loggedInUserId');
    window.location.href='index.html';
} else {
    document.getElementById('balAmount').innerText = balAmount;
    document.getElementById('luckyMessage').innerText = luckyMessage;
}