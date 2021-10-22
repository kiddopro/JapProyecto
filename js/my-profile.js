//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById(
    'user_profile'
  ).innerHTML = `<div class="card" style="width: 30vw;">
  <div class="">
  <img src="https://picsum.photos/536/354" class="card-img-top  w-100 img-card" alt="...">
  </div>
  <div class="card-body">
  <div class="propiedad"><small>Fullname</small></div>
  <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input1" class="card-title border-0 m-0" readonly onfocusout="focusout(1)" value="${sessionStorage.getItem(
      'name'
    )}"/><i class="fas fa-edit" onclick="edit(1)"></i></div>
    
    <div class="propiedad"><small>Edad</small></div>
    <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input2" class="card-text border-0 m-0" value="lorem ipsum" onfocusout="focusout(2)" readonly/><i class="fas fa-edit cursor" onclick="edit(2)"></i>
    </div>
    <div class="propiedad"><small>Email</small></div>
    <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input3" class="card-text border-0 m-0" value="lorem ipsum" onfocusout="focusout(3)" readonly/><i class="fas fa-edit cursor" onclick="edit(3)"></i>
    </div>
    <div class="propiedad"><small>Telefono</small></div>
    <div class="nombre_items d-flex justify-content-between align-items-center m-0 w-100 flex-wrap">
    <input id="input4" class="card-text border-0 m-0" value="+598 12 333 456" onfocusout="focusout(4)" readonly/><i class="fas fa-edit cursor" onclick="edit(4)"></i>
    </div>
    <div class="text-center mt-3">
    <a href="#" class="btn btn-outline-success">Guardar</a>
    </div>
  </div>
</div>`;
});

function edit(id) {
  console.log(id);
  let elemento = document.getElementById(`input${id}`);
  elemento.focus();
  elemento.removeAttribute('readonly');
  console.log(elemento);
  // elemento.addEventListener('change', (e) => {
  //   elemento.setAttribute('readonly', '');
  // });
}

function focusout(id) {
  document.getElementById(`input${id}`).setAttribute('readonly', '');
}
