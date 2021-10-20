//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById(
    'user_profile'
  ).innerHTML = `<div class="card" style="width: 18rem;">
  <div class="">
  <img src="https://picsum.photos/536/354" class="card-img-top  w-100 img-card" alt="...">
  </div>
  <div class="card-body">
  <div class="nombre d-flex justify-content-between align-items-center m-1">
    <input id="input1" class="card-title border-0 m-0" readonly onfocusout="focusout(1)" value="${sessionStorage.getItem(
      'name'
    )}"/><i class="fas fa-edit" onclick="edit(1)"></i></div>
    <div class="descripcion d-flex justify-content-between align-items-center m-1">
    <input id="input2" class="card-text border-0 m-0" value="lorem ipsum" onfocusout="focusout(2)" readonly /><i class="fas fa-edit cursor" onclick="edit(2)" ></i>
    </div>
    <a href="#" class="btn btn-primary">Go somewhere</a>
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
