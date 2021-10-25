//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let usuario = {
  nombreCompleto: '',
  edad: null,
  email: '',
  telefono: '',
};

// verificamos que exista algo en localStorage
let tiene = JSON.parse(localStorage.getItem('datosUsuario'));
tiene == null
  ? localStorage.setItem('datosUsuario', JSON.stringify(usuario))
  : null;

document.addEventListener('DOMContentLoaded', function (e) {
  let usuarioProfile = JSON.parse(localStorage.getItem('datosUsuario'));

  document.getElementById(
    'user_profile'
  ).innerHTML = `<div class="card" style="width: 30vw;">
  <div class="">
  <img src="https://picsum.photos/536/354" class="card-img-top  w-100 img-card" alt="...">
  </div>
  <div class="card-body">
  <div class="propiedad"><small>Fullname</small></div>
  <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input1" class="card-title border-0 m-0" readonly onfocusout="focusout(1)" value="${
      usuarioProfile.nombreCompleto == null ? '' : usuarioProfile.nombreCompleto
    }"/><i class="fas fa-edit" onclick="edit(1)"></i></div>
    
    <div class="propiedad"><small>Edad</small></div>
    <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input2" type="number" class="card-text border-0 m-0" value="${
      usuarioProfile.edad
    }" onfocusout="focusout(2)" readonly/><i class="fas fa-edit cursor" onclick="edit(2)"></i>
    </div>
    <div class="propiedad"><small>Email</small></div>
    <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input3" class="card-text border-0 m-0" value="${
      usuarioProfile.email == null ? '' : usuarioProfile.email
    }" onfocusout="focusout(3)" readonly/><i class="fas fa-edit cursor" onclick="edit(3)"></i>
    </div>
    <div class="propiedad"><small>Telefono</small></div>
    <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input4" class="card-text border-0 m-0" value="${
      usuarioProfile.telefono == null ? '' : usuarioProfile.telefono
    }" onfocusout="focusout(4)" readonly/><i class="fas fa-edit cursor" onclick="edit(4)"></i>
    </div>
    <div class="text-center mt-3">
    <button type="button" class="btn btn-outline-info" onclick="guardar()">Guardar</button>
    </div>
  </div>
</div>`;
});

function edit(id) {
  console.log(id);
  let elemento = document.getElementById(`input${id}`);
  elemento.focus();
  elemento.removeAttribute('readonly');
  elemento.style.outline = '1px solid #000';
}

function focusout(id) {
  let elemento = document.getElementById(`input${id}`);
  elemento.setAttribute('readonly', '');
  elemento.style.outline = '0px';
}

function guardar() {
  // let nombreCompleto = document.getElementById('input1').value;
  // let edad = document.getElementById('input2').value;
  // let email = document.getElementById('input3').value;
  // let telefono = document.getElementById('input4').value;

  usuario.nombreCompleto = nombreCompleto =
    document.getElementById('input1').value;
  usuario.edad = document.getElementById('input2').value;
  usuario.email = document.getElementById('input3').value;
  usuario.telefono = document.getElementById('input4').value;

  localStorage.setItem('datosUsuario', JSON.stringify(usuario));

  alert('Profile modified!');
}
