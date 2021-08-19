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
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('password', pass);
    sessionStorage.setItem('typeUser', 'member');
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
