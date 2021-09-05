//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {});

let productName = document.querySelector('#productName');
let productDescription = document.querySelector('#productDescription');
let productSoldCount = document.querySelector('#productSoldCount');
let productCost = document.querySelector('#productCost');
let productCategory = document.querySelector('#productCategory');
let productImages = document.querySelector('#productImagesGallery');
let productCarusel = document.querySelector('.carousel-inner');
let productComments = document.querySelector('#productComments');
let comment = document.querySelector('#inputComment');
let calificacion = document.querySelector('#calification');
getJSONData(PRODUCT_INFO_URL)
  .then(function (result) {
    let product = result.data;
    productName.innerHTML = product.name;
    productDescription.innerHTML = product.description;
    productSoldCount.innerHTML = product.soldCount;
    productCost.innerHTML = product.cost;
    productCategory.innerHTML = product.category;
    // let elementoQueContieneTodasLasImagenes = '';
    // for (let i = 0; i < product.images.length; i++) {
    //   let img = product.images[i];
    //   elementoQueContieneTodasLasImagenes +=
    //     `
    //     <div class="col-lg-3 col-md-4 col-6">
    //         <div class="d-block mb-4 h-100">
    //             <img class="img-fluid img-thumbnail" src="` +
    //     img +
    //     `" alt="">
    //         </div>
    //     </div>
    //     `;
    // }
    // productImages.innerHTML = elementoQueContieneTodasLasImagenes;
    let carousel = '';
    for (let i = 0; i < product.images.length; i++) {
      let img = product.images[i];
      if (i === 0) {
        carousel +=
          `<div class="carousel-item active">
              <img src="` +
          img +
          `" class="d-block w-100" alt="..." />
            </div>`;
      } else {
        carousel +=
          `<div class="carousel-item">
              <img src="` +
          img +
          `" class="d-block w-100" alt="..." />
            </div>`;
      }
    }
    productCarusel.innerHTML = carousel;
  })
  .catch((error) => console.log(error));

getJSONData(PRODUCT_INFO_COMMENTS_URL)
  .then((comments) => {
    let comentarios = comments.data;
    let e = '';
    for (let i = 0; i < comentarios.length; i++) {
      if (comentarios[i].score === 1) {
        e +=
          `<div id='starsContainer'>` +
          `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>` +
          `</div><span id='commentUser'>` +
          comentarios[i].user +
          `</span><p id='commentDescription' class='m-0'>` +
          comentarios[i].description +
          `</p><span id='commentDate'>` +
          comentarios[i].dateTime +
          `</span><br><br>`;
      } else if (comentarios[i].score === 2) {
        e +=
          `<div id='starsContainer'>` +
          `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>` +
          `</div><span id='commentUser'>` +
          comentarios[i].user +
          `</span><p id='commentDescription' class='m-0'>` +
          comentarios[i].description +
          `</p><span id='commentDate'>` +
          comentarios[i].dateTime +
          `</span><br><br>`;
      } else if (comentarios[i].score === 3) {
        e +=
          `<div id='starsContainer'>` +
          `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>` +
          `</div><span id='commentUser'>` +
          comentarios[i].user +
          `</span><p id='commentDescription' class='m-0'>` +
          comentarios[i].description +
          `</p><span id='commentDate'>` +
          comentarios[i].dateTime +
          `</span><br><br>`;
      } else if (comentarios[i].score === 4) {
        e +=
          `<div id='starsContainer'>` +
          `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>` +
          `</div><span id='commentUser'>` +
          comentarios[i].user +
          `</span><p id='commentDescription' class='m-0'>` +
          comentarios[i].description +
          `</p><span id='commentDate'>` +
          comentarios[i].dateTime +
          `</span><br><br>`;
      } else {
        e +=
          `<div id='starsContainer'>` +
          `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>` +
          `</div><span id='commentUser'>` +
          comentarios[i].user +
          `</span><p id='commentDescription' class='m-0'>` +
          comentarios[i].description +
          `</p><span id='commentDate'>` +
          comentarios[i].dateTime +
          `</span><br><br>`;
      }
      //   e +=
      //     `<div id='starsContainer'>` +
      //     `
      //         <span class="fa fa-star checked"></span>
      //         <span class="fa fa-star"></span>
      //         <span class="fa fa-star"></span>
      //         <span class="fa fa-star"></span>
      //         <span class="fa fa-star"></span>` +
      //     `</div><span id='commentUser'>` +
      //     comentarios[i].user +
      //     `</span><p id='commentDescription' class='m-0'>` +
      //     comentarios[i].description +
      //     `</p><span id='commentDate'>` +
      //     comentarios[i].dateTime +
      //     `</span><br><br>`;
    }
    productComments.innerHTML = e;
  })
  .catch((error) => console.log(error));

//evento al presionar el boton comentar
document.getElementById('btnComentar').addEventListener('click', (event) => {
  //obtenemos la fecha
  let date = new Date();
  let fecha =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let hora =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  //se la seteamos como queremos (primero la fecha, luego la hora) a otra variable
  let fechaCompleta = fecha + ' ' + hora;
  let div = document.createElement('div');
  div.id = 'starsContainer';
  let comentario = comment.value;
  let puntaje = calificacion.value;
  let usuarioComenta = sessionStorage.getItem('username')
    ? sessionStorage.getItem('username')
    : sessionStorage.getItem('email');

  if (puntaje === '1') {
    div.innerHTML =
      `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>` +
      `</div><br><span id='commentUser'>` +
      usuarioComenta +
      `</span><p id='commentDescription' class='m-0'>` +
      comentario +
      `</p><span id='commentDate'>` +
      fechaCompleta +
      `</span><br><br>`;
  } else if (puntaje === '2') {
    div.innerHTML =
      `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>` +
      `</div><br><span id='commentUser'>` +
      usuarioComenta +
      `</span><p id='commentDescription' class='m-0'>` +
      comentario +
      `</p><span id='commentDate'>` +
      fechaCompleta +
      `</span><br><br>`;
  } else if (puntaje === '3') {
    div.innerHTML =
      `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>` +
      `</div><br><span id='commentUser'>` +
      usuarioComenta +
      `</span><p id='commentDescription' class='m-0'>` +
      comentario +
      `</p><span id='commentDate'>` +
      fechaCompleta +
      `</span><br><br>`;
  } else if (puntaje === '4') {
    div.innerHTML =
      `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>` +
      `</div><br><span id='commentUser'>` +
      usuarioComenta +
      `</span><p id='commentDescription' class='m-0'>` +
      comentario +
      `</p><span id='commentDate'>` +
      fechaCompleta +
      `</span><br><br>`;
  } else {
    div.innerHTML =
      `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>` +
      `</div><br><span id='commentUser'>` +
      usuarioComenta +
      `</span><p id='commentDescription' class='m-0'>` +
      comentario +
      `</p><span id='commentDate'>` +
      fechaCompleta +
      `</span><br><br>`;
  }
  productComments.appendChild(div);
});

//para mas adelante
function cargarComentarios(score) {}
