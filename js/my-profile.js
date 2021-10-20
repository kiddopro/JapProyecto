//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById(
    'user_profile'
  ).innerHTML = `<div class="card" style="width: 18rem;">
  <div class="">
  <img src="https://picsum.photos/536/354" class="card-img-top" alt="...">
  </div>
  <div class="card-body">
  <div class="nombre d-flex justify-content-between align-items-center m-1">
    <input class="card-title border-0 m-0" readonly value="${sessionStorage.getItem(
      'name'
    )}"/><i class="fas fa-edit"></i></div>
    <div class="descripcion d-flex justify-content-between align-items-center m-1">
    <input class="card-text border-0 m-0" value="lorem ipsum" readonly /><i class="fas fa-edit cursor"></i>
    </div>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
});
