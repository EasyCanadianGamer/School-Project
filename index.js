
 window.onload = function() {

	 // Your web app's Firebase configuration
	 var firebaseConfig = {
		apiKey: "AIzaSyCt6kc6PI_JvRBJShbNmH92UILDnx1EaxU",
		authDomain: "chat-7baef.firebaseapp.com",
		projectId: "chat-7baef",
		storageBucket: "chat-7baef.appspot.com",
		messagingSenderId: "91420429295",
		appId: "1:91420429295:web:0515cebc1e6f615788841a"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
 } 
 






$( document ).ready(function() {
	$("#welcome").hide();
  $(".upload-group").hide();
	document.getElementById("upload").addEventListener('change', handleFileSelect, false);
});


var user;

function signIn(){

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth()
.signInWithPopup(provider)
.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;

  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = credential.accessToken;
  // The signed-in user info.
  user= result.user;
  showWelcomeContainer();
  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

  console.log("signed in!")
}

function signOut(){
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
	  }).catch((error) => {
		// An error happened.
	  });
}
function test(){
  console.log("Fuck off Bitch!")
}

var user = firebase.auth().currentUser;
var names, email, photoUrl, uid, emailVerified;
if (user != null) {
	names = user.displayName;
	email = user.email;
	photoUrl = user.photoURL;
	emailVerified = user.emailVerified;
	uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
					 // this value to authenticate with your backend server, if
					 // you have one. Use User.getToken() instead.
  }

var database = firebase.database();

function writeUserData() {
	database.ref('users/' + userId).set({
	  username: names,
	  email: email,
	  profile_picture : photoUrl,
	  userID: uid
	});
  }
  


function showWelcomeContainer() {
	$("#sign-in").hide();
	$("#welcome").show();
};









function handleFileSelect(event) {
	$(".upload-group").show();
	selectedFile = event.target.files[0];
};

function confirmUpload() {
	var metadata = {
		contentType: 'image',
		customMetadata: {
			'dogType': 'Lab',
			'uploadedBy': user.uid,
			'title': $("#imgTitle").val(),
			'caption': $("#imgDesc").val()
		},
	};
	var uploadTask = firebase.storage().ref().child('schoolfiles/' + selectedFile.name).put(selectedFile, metadata);
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
  		// Observe state change events such as progress, pause, and resume
  		// See below for more detail
	}, function(error) {
  		// Handle unsuccessful uploads
	}, function() {
  		// Handle successful uploads on complete
  		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
  		$(".upload-group")[0].before("Success!");
  		$(".upload-group").hide();

	});

}
