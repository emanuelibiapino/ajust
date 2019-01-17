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
  
var probList = document.getElementById('cai');

firebase.database().ref('problemas').on('value', function (snapshot) {
    probList.innerHTML = '';
    snapshot.forEach(function (item) {
        var p = document.createElement('p');
		var q = document.createElement('p');
		var r = document.createElement('p');
		var dat = document.createElement('p');
		var d = document.createElement('div');
		var but1 = document.createElement('button');
		var but2 = document.createElement('button');
		var but3 = document.createElement('button');
		d.classList.add("caixa");
		but1.id = "tambem";
		but2.id = "alterar";
		but3.id = "excluir";
		but1.appendChild(document.createTextNode("também tenho este problema"));
		but2.appendChild(document.createTextNode("alterar"));
		but3.appendChild(document.createTextNode("Excluir"));
		p.appendChild(document.createTextNode('Localizado na:'));
		q.appendChild(document.createTextNode('Rua: '+item.val().nomeRua+'| CEP: '+item.val().cep ));
		r.appendChild(document.createTextNode('Tipo: '+item.val().tipo+'| Descrição: '+item.val().descricao ));
		dat.appendChild(document.createTextNode('Data: '+item.val().data));
		d.appendChild(p);
		d.appendChild(q);
		d.appendChild(r);
		d.appendChild(dat);
		d.appendChild(but1);
		d.appendChild(but2);
		d.appendChild(but3);
		probList.appendChild(d);
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
	var ema = firebase.auth().currentUser;
	var email = ema.email;
	var stat = 0;
	var data = new Date();
	//window.alert(data);
	//Salvar no firebase
	saveProblema(cep, nomeRua, tipo, descricao,email,data,stat);
	
	document.getElementById("formulario").style.display = "none";
	document.getElementById("titulo_cont").style.display = "none";
	document.getElementById("relatados").style.display = "block";
	document.getElementById("cai").style.display = "block";
}

//função para receber valores do formulario
function getInputVal(id){
	return document.getElementById(id).value;
}

// salvar no firebase
function saveProblema(cep, nomeRua, tipo, descricao,email,data,stat){
	var newMessageRef = messageRef.push();
	newMessageRef.set({
		cep: cep,
		nomeRua: nomeRua,
		tipo: tipo,
		descricao: descricao,
		usuario: email,
		data: data,
		stat: stat
		
	});
}



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	
	document.getElementById("user_div").style.display = "block";
	document.getElementById("login_div").style.display = "none";
	
	
	var user = firebase.auth().currentUser;
	
	if(user != null){
		var email_id = user.email;
		document.getElementById("usuario_p").innerHTML = "Usuário: " + email_id;
		document.getElementById("formulario").style.display = "none";
		document.getElementById("titulo_cont").style.display = "none";
		document.getElementById("relatados").style.display = "block";
		
	}
	
  } else {
    // No user is signed in.
	
	document.getElementById("user_div").style.display = "none";
	document.getElementById("login_div").style.display = "block";
	document.getElementById("relatados").style.display = "none";
	document.getElementById("formulario").style.display = "none";
	
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
	 document.getElementById("cai").style.display = "block";
	});
	
	
	
}

function logout(){
	firebase.auth().signOut();
	document.getElementById("cai").style.display = "none";
}

function formu(){
	document.getElementById("user_div").style.display = "block";
	//document.getElementById("login_div").style.display = "block";
	document.getElementById("relatados").style.display = "none";
	document.getElementById("formulario").style.display = "block";
	document.getElementById("cai").style.display = "none";
}

