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
	snapshot.forEach(function (childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
					//console.log(key);
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val();
                    //console.log(childSnapshot.val().cep);
					
				var p = document.createElement('p');
		var q = document.createElement('p');
		var r = document.createElement('p');
		var a = document.createElement('p');
		var y = document.createElement('p');
		var dat = document.createElement('p');
		var ta = document.createElement('p');
		var d = document.createElement('div');
		var but1 = document.createElement('button');
		var but2 = document.createElement('button');
		var but3 = document.createElement('button');
		d.classList.add("caixa");
		but1.id = key;
		but2.id = key;
		but3.id = key;
		but1.setAttribute('onclick',"tambem(this)");
		but2.setAttribute('onclick','alterar(this)');
		but3.setAttribute('onclick','excluir(this)');
		but1.appendChild(document.createTextNode("tenho este problema"));
		but2.appendChild(document.createTextNode("alterar"));
		but3.appendChild(document.createTextNode("Excluir"));
		p.appendChild(document.createTextNode('Localizado na:'));
		a.appendChild(document.createTextNode('Rua: '+childData.nomeRua));
		q.appendChild(document.createTextNode('CEP: '+childData.cep ));
		y.appendChild(document.createTextNode('Tipo: '+childData.tipo));
		r.appendChild(document.createTextNode('Descrição: '+childData.descricao ));
		dat.appendChild(document.createTextNode('Data: '+childData.data));
		ta.appendChild(document.createTextNode('Votos: '+childData.tambem));
		d.appendChild(p);
		d.appendChild(a);
		d.appendChild(q);
		d.appendChild(y);
		d.appendChild(r);
		d.appendChild(dat);
		d.appendChild(ta);
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
	var tam = 0;
	var data = new Date();
	//window.alert(data);
	//Salvar no firebase
	saveProblema(cep, nomeRua, tipo, descricao,email,data,stat,tam);
	
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
function saveProblema(cep, nomeRua, tipo, descricao,email,data,stat,tam){
	var newMessageRef = messageRef.push();
	newMessageRef.set({
		cep: cep,
		nomeRua: nomeRua,
		tipo: tipo,
		descricao: descricao,
		usuario: email,
		data: data,
		stat: stat,
		tambem: tam
		
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
		document.getElementById("cadastro_div").style.display = "none";
		
	}
	
  } else {
    // No user is signed in.
	document.getElementById("cadastro_div").style.display = "none";
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

function mostraCadastro(){
	document.getElementById("login_div").style.display = "none";
	document.getElementById("titulo_cont").style.display = "none";
	document.getElementById("cadastro_div").style.display = "block";
}

function cadastro(){
	
	var userEmail = document.getElementById("email_fieldC").value;
	var userSenha = document.getElementById("senha_fieldC").value;
	firebase.auth().createUserWithEmailAndPassword(userEmail, userSenha).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : " + errorMessage);
  // ...
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

function tambem(key){
	
    var personRef = firebase.database().ref("problemas").child(key.id);
    personRef.once('value', function (snapshot) {
    if (snapshot.val() === null) {
        // does not exist 
        alert('does not exist');
    } else {
		var postData = {
        tambem: snapshot.val().tambem+1,
		};
        personRef.update(postData);
		alert('voto realizado com sucesso!');
        }
        });
	
}

function excluir(key) {
    var personRef = firebase.database().ref("problemas").child(key.id);
    personRef.once('value', function (snapshot) {

    if (snapshot.val() === null) {
        /* does not exist */
        alert('does not exist');
    } else {
		var usua = firebase.auth().currentUser;
		if(snapshot.val().usuario === usua.email){
			personRef.remove();
			alert('Removido com sucesso!');
		}else{
			window.alert('A operação de alterar e excluir é permitida apenas ao usuário que relatou este problema!');
		}
        
    }

    });
}



function alterar(key){
	
    var personRef = firebase.database().ref("problemas").child(key.id);
    personRef.once('value', function (snapshot) {
    if (snapshot.val() === null) {
        // does not exist 
        alert('does not exist');
    } else {
		var usua = firebase.auth().currentUser;
		if(snapshot.val().usuario === usua.email){
			//window.alert('pode alterar e excluir');
			carregaDados(snapshot.val(),key.id);
		}else{
			window.alert('A operação de alterar e excluir é permitida apenas ao usuário que relatou este problema!');
		}
        }
        });
	
}

function carregaDados(dados,key){
	document.getElementById('formulario').style.display = "block";
	document.getElementById('cai').style.display = "none";
	document.getElementById('relatados').style.display = "none";
	document.getElementById('submit').style.display = "none";
	document.getElementById('info').innerHTML = "Atualizar Problema!";
	var valo = document.getElementById('at');
	document.getElementById('at').innerHTML = '';
	var buta = document.createElement('button');
		buta.id = "atua";
		buta.value = key;
		buta.type = "button";
	buta.appendChild(document.createTextNode("Atualizar"));
	valo.appendChild(buta);
		
	document.getElementById('cep').value = dados.cep;
	document.getElementById('nomeRua').value = dados.nomeRua;
	document.getElementById('tipo').value = dados.tipo;
	document.getElementById('descricao').value = dados.descricao;
	//document.getElementById('cep').value = dados.cep;
	document.getElementById('atua').addEventListener("click", continuaAtualizacao);
}


function continuaAtualizacao(e){
	e.preventDefault();
	
	//Get values
	//var cidade = getInputVal('cidade');
	var key = document.getElementById('atua').value;
	var cep = getInputVal('cep');
	var nomeRua = getInputVal('nomeRua');
	var tipo = getInputVal('tipo');
	var descricao = getInputVal('descricao');
	var data = new Date();
	//window.alert(data);
	//atualizar no firebase
	var postData = {
        cep: cep,
		nomeRua: nomeRua,
		tipo: tipo,
		descricao: descricao
		};
	
	var personRef = firebase.database().ref("problemas").child(key);
	personRef.update(postData);
	alert('atualizado com sucesso!');
	location.reload();
}



