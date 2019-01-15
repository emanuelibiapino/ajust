  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBf_kTSK1nF9gf6QjA7DUSlEfiGA-kmew0",
    authDomain: "ajust-login.firebaseapp.com",
    databaseURL: "https://ajust-login.firebaseio.com",
    projectId: "ajust-login",
    storageBucket: "ajust-login.appspot.com",
    messagingSenderId: "302794633992"
  };
  firebase.initializeApp(config);

var messageRef = firebase.database().ref('problemas');
  
var probList = document.getElementById('probList');

firebase.database().ref('problemas').on('value', function (snapshot) {
    probList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().cep + ': ' + item.val().nomeRua + ': ' + item.val().tipo + ': ' + item.val().descricao));
        probList.appendChild(li);
    });
});

document.getElementById('formulario').addEventListener('submit', submitForm);

//submit form
function submitForm(e){
	e.preventDefault();
	
	//Get values
	//var cidade = getInputVal('cidade');
	var cep = getInputVal('cep');
	var nomeRua = getInputVal('nomeRua');
	var tipo = getInputVal('tipo');
	var descricao = getInputVal('descricao');
	
	//Salvar no firebase
	saveProblema(cep, nomeRua, tipo, descricao);
}

//função para receber valores do formulario
function getInputVal(id){
	return document.getElementById(id).value;
}

// salvar no firebase
function saveProblema(cep, nomeRua, tipo, descricao){
	var newMessageRef = messageRef.push();
	newMessageRef.set({
		cep: cep,
		nomeRua: nomeRua,
		tipo: tipo,
		descricao: descricao
	});
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	
	document.getElementById("user_div").style.display = "block";
	document.getElementById("login_div").style.display = "none";
	
	//document.getElementById("pass1").style.display = 'none';
	//document.getElementById('problemas-t').style.display = 'block';
	//document.getElementById("titulo_cont").innerHTML = "<h1>Problemas Relatados</h1>";
	
	var user = firebase.auth().currentUser;
	
	if(user != null){
		var email_id = user.email;
		document.getElementById("usuario_p").innerHTML = "Bem vindo: " + email_id;
	}
	
  } else {
    // No user is signed in.
	
	document.getElementById("user_div").style.display = "none";
	document.getElementById("login_div").style.display = "block";
  }
});

function login(){
	
	var userEmail = document.getElementById("email_field").value;
	var userSenha = document.getElementById("senha_field").value;
	
	firebase.auth().signInWithEmailAndPassword(userEmail, userSenha).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  
	  window.alert("Error : " + errorMessage);
	  // ...
	});
	
	
	
}

function logout(){
	firebase.auth().signOut();
}
