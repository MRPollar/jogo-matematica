const firebaseConfig = {
   apiKey: "AIzaSyCIl_KD_w2JFT76c4C371Cztbkm8A8llaE",
   authDomain: "matematic-game.firebaseapp.com",
   projectId: "matematic-game",
   storageBucket: "matematic-game.appspot.com",
   messagingSenderId: "366231716987",
   appId: "1:366231716987:web:ce8b111d3465121b458ede",
   measurementId: "G-JQG92MVTJ9"
};

firebase.initializeApp(firebaseConfig)

var usuario = null;

const initialPage = document.querySelector('.login')
const gamePage = document.querySelector('.game')
const formLogin = document.getElementById('login')
const formNew = document.getElementById('register')

const loading = document.querySelector('.loading');

formLogin.addEventListener('submit', e => {//Verificação de existencia de usuários
   e.preventDefault();
   const inEmail = document.querySelector('#inEmail');
   const inPassword = document.querySelector('#inPassword');


   let email = inEmail.value;
   let password = inPassword.value;

   loading.style.transition = '.4s'
   loading.classList.add('activeDisplay');
   setTimeout(() => {

      loading.classList.add('opacity');
      respMessage.innerHTML = 'Iniciando';

      setTimeout(() => {
         firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {//Usuário existente
               // Signed in
               usuario = userCredential.user;
               initGame()
               // ...
            })
            .catch((error) => {//Usuário inexistente
               var errorCode = error.code;
               var errorMessage = error.message;


               if (errorCode === 'auth/too-many-requests') {
                  errorGame('Conta bloqueada temporariamente')
               }
               if (errorMessage === 'The password is invalid or the user does not have a password.') {
                  errorGame('Senha Incorreta')
               }
               if (errorCode === 'auth/user-not-found') {
                  errorGame('Usuário não registrado')
               }
            });
      }, 500)

   })

})

const respMessage = document.querySelector('.loading-container h2')
function initGame() {//Mensagem de boas vindas de login

   respMessage.innerHTML = 'Bem vindo!!'
   initialPage.style.transition = '.4s';
   gamePage.style.transition = '.4s';
   setTimeout(() => {
      initialPage.classList.remove('opacity');

      setTimeout(() => {
         initialPage.classList.remove('activeDisplay');
         gamePage.classList.add('activeDisplay')
         setTimeout(() => {
            gamePage.classList.add('opacity')
            setTimeout(() => {
               loading.classList.remove('opacity');
               setTimeout(() => {
                  loading.classList.remove('activeDisplay');

               }, 200)
            }, 200)
         }, 500)
      }, 500)
      setTimeout(() => {
         respMessage.innerHTML = '';
      }, 1500)
   }, 1000)
   formLogin.reset()

   db.collection('usuarios').where("user", "==", usuario.uid).onSnapshot((data) => {
      const outNome = document.querySelector("#outNome");
      let user = data.docs
      user.map((val) => {
         outNome.innerHTML = val.data().name
      })
   })

}

function errorGame(text) {//Menssagem de usuário não encontrado
   respMessage.classList.add('error')
   respMessage.innerHTML = text


   setTimeout(() => {
      loading.classList.remove('opacity');
      setTimeout(() => {
         loading.classList.remove('activeDisplay');

      }, 500)
      setTimeout(() => {
         respMessage.classList.remove('error')
         respMessage.innerHTML = ''
      }, 700)
   }, 1000)
   formLogin.reset()
   inEmail.focus()
}

const db = firebase.firestore();


firebase.auth().onAuthStateChanged((val) => {//Observador de login
   if (val) {
      usuario = val;
      initGame()
   } else {
      const outNome = document.querySelector("#outNome");
      outNome.innerHTML = '';
      // User is signed out
      // ...
   }
});



//Saindo do jogo
const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {

   loading.style.transition = '.4s'
   loading.classList.add('activeDisplay');
   setTimeout(() => {
      loading.classList.add('opacity');
      setTimeout(() => {
         firebase.auth().signOut().then(() => {
            finallySection()
         }).catch(() => {

         })
      }, 500)
   })



})

function finallySection() {
   respMessage.innerHTML = 'Saindo!!'
   gamePage.style.transition = '.4s';
   initialPage.style.transition = '.4s';
   setTimeout(() => {
      gamePage.classList.remove('opacity');

      setTimeout(() => {
         gamePage.classList.remove('activeDisplay');
         initialPage.classList.add('activeDisplay')
         setTimeout(() => {
            initialPage.classList.add('opacity')
            setTimeout(() => {
               loading.classList.remove('opacity');
               setTimeout(() => {
                  loading.classList.remove('activeDisplay');

               }, 200)
            }, 200)
         }, 500)
      }, 500)
      setTimeout(() => {
         respMessage.innerHTML = '';
      }, 1500)
   }, 1000)
}

{//Criação de novo usuario
   formNew.addEventListener('submit', (e) => {
      e.preventDefault();

      const newUserName = document.querySelector('#reNome');
      const newUserEmail = document.querySelector('#reEmail');
      const newUserPassworld = document.querySelector('#rePassword');

      let name = newUserName.value;
      let email = newUserEmail.value;
      let passworld = newUserPassworld.value;


      // console.log(userName,"\n",userEmail,"\n",userPassworld);
      firebase.auth().createUserWithEmailAndPassword(email, passworld)
         .then((userCredential) => {

            alert();
            usuario = userCredential.user;
            usuario.displayName = name;
            initGame();
            db.collection('usuarios').add({
               name: name,
               user: usuario.uid
            })
            formNew.reset();

         }).catch((error) => {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage === 'Password should be at least 6 characters') {
               respMessage.innerHTML = 'A senha deve ter ao menos 6 caracteres!'
               loading.style.display = "flex";
               loading.style.opacity = "1";

               setTimeout(() => {
                  loading.style.display = "none";
                  loading.style.opacity = "0";
               }, 3000);
            }
         })
   })

}