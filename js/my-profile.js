//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById(
    'user_profile'
  ).innerHTML = `<div class="card" style="width: 18rem;">
  <img src="${sessionStorage.getItem(
    'img_profile'
  )}" class="card-img-top" alt="...">
  <div class="card-body d-flex">
    <h5 class="card-title">${sessionStorage.getItem(
      'name'
    )}</h5><i class="fas fa-edit"></i>
    <p class="card-text">lorem ipsum</p><i class="fas fa-edit"></i>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
});
