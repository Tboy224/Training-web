// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            name: name,
            email: email,
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href='index.html';
        })
        .catch((error) => {
            showMessage('Error creating account', 'signUpMessage');
            console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode === 'auth/email-already-in-use') {
            showMessage('Email already in use', 'signUpMessage');
        }
        else {
            showMessage('Error creating account', 'signUpMessage');
        }
    });
});