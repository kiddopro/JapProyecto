//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {});

userLogin = () => {
  let user = document.getElementById('name').value;
  let pass = document.getElementById('pass').value;

  if (user.trim() === '') {
    alert('You need at least an username');
  } else if (pass.trim() === '') {
    localStorage.setItem('username', user);
    localStorage.setItem('typeUser', 'guest');
    location.href = 'index.html';
  } else {
    localStorage.setItem('username', user);
    localStorage.setItem('password', pass);
    localStorage.setItem('typeUser', 'member');
    location.href = 'index.html';
  }

  console.log(
    'User: ' +
      localStorage.getItem('username') +
      ' Password: ' +
      localStorage.getItem('password') +
      ' TypeUser: ' +
      localStorage.getItem('typeUser')
  );
};
