// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}


const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('rName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            name: name,
            email: email,
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(() => {
            window.location.href='index.html';
        })
        .catch((error) => {
            showMessage('Error creating account', 'signUpMessage');
            console.error("Error writing document: ", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode === 'auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('Unable to create User', 'signUpMessage');
        }
    })
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('Login is successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        // Get the time the user logged in
        const loggedInTime = new Date().toLocaleTimeString();
        localStorage.setItem('loggedInTime', loggedInTime);
        window.location.href='dashboard.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode ==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
})