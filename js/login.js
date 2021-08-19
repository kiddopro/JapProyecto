//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {});

userLogin = () => {
  let alert = document.getElementById('alert-messsage');
  alert.innerHTML = 'You need to put an user and password';
  alert.style.color = '#E50000';
  let user = document.getElementById('name').value;
  let pass = document.getElementById('pass').value;

  if (user.trim() === '' && pass.trim() === '') {
    alert.style.display = 'inline';
  } else {
    alert.style.display = 'none';
    localStorage.setItem('username', user);
    localStorage.setItem('password', pass);
    localStorage.setItem('typeUser', 'member');
    location.href = 'index.html';
  }
};
//var profile;
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  localStorage.setItem('email', profile.getEmail());

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
  if (localStorage.getItem('username')) {
    localStorage.clear();
    location.href = 'login.html';
  } else {
    //location.href = 'https://mail.google.com/mail/u/0/?logout&hl=en';
    location.href =
      'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue="' +
      'https://kiddopro.github.io/JapProyecto/login.html"';
  }
}
