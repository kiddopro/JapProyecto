//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//esta funcion es para el index también

document.addEventListener('DOMContentLoaded', function (e) {
  let profile = document.getElementById('profile');
  let usuario = sessionStorage.getItem('username');
  let email = sessionStorage.getItem('email');
  usuario ? (profile.innerHTML = usuario) : (profile.innerHTML = email);
  carrito();
});

function carrito() {
  fetch(CART_WITH_TWO_PRODUCTS)
    .then((res) => res.json())
    .then((data) => {
      let respuesta = [];
      respuesta = data.articles;
      let cartCounter = (document.getElementById('cartCounter').innerHTML =
        respuesta.length);
    })
    .catch((err) => err);
}

userLogin = () => {
  let alert = document.getElementById('alert-messsage');
  alert.innerHTML = 'You need to put an user and password';
  alert.style.color = '#E50000';
  let user = document.getElementById('name').value;
  let pass = document.getElementById('pass').value;

  if (user.trim() === '' || pass.trim() === '') {
    alert.style.display = 'inline';
  } else {
    alert.style.display = 'none';
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('name', 'Martin Suarez');
    sessionStorage.setItem('img_profile', '../img/perfil4.png');
    sessionStorage.setItem('typeUser', 'member');
    location.href = 'index.html';
  }
};
//var profile;
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
  sessionStorage.setItem('full_name', profile.getName());
  sessionStorage.setItem('profile_img', profile.getImageUrl());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  sessionStorage.setItem('email', profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log('ID Token: ' + id_token);
  location.href = 'index.html';
}

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//     localStorage.clear();
//     location.href = 'login.html';
//   });

function signOut() {
  if (sessionStorage.getItem('username')) {
    sessionStorage.clear();
    location.href = 'login.html';
  } else {
    //https://mail.google.com/mail/u/0/?logout&hl=en
    sessionStorage.clear();
    location.href =
      'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://kiddopro.github.io/JapProyecto/login.html';
    // location.href =
    //   'https://appengine.google.com/_ah/logout?continue=https://kiddopro.github.io/JapProyecto/login.html';

    // location.href =
    //   'https://accounts.google.com/o/oauth2/revoke?token=611107579766-hmn44ckmgio57ramqu1sfrbgptlckq0r.apps.googleusercontent.com';
  }
}
