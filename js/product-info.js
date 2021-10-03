//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {});
let related = [];
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
let checked = "<small class='fa fa-star checked'></small>";
let notChecked = "<small class='fa fa-star'></small>";
getJSONData(PRODUCT_INFO_URL)
  .then(function (result) {
    let product = result.data;
    related = product.relatedProducts;
    productName.innerHTML = product.name;
    productDescription.innerHTML = product.description;
    productSoldCount.innerHTML = product.soldCount;
    productCost.innerHTML = product.cost;
    productCategory.innerHTML = product.category;

    //carrousel de imagenes que marca activo a la primera imágen
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
    agregarRelacionado();
  })
  .catch((error) => console.log(error));

//se cargan los comentarios a la pagina
getJSONData(PRODUCT_INFO_COMMENTS_URL)
  .then((comments) => {
    let comentarios = comments.data;

    let e = '';
    for (let i = 0; i < comentarios.length; i++) {
      let puntaje = comentarios[i].score;
      let puntajeChecked = checked.repeat(puntaje);
      let puntajeNotChecked = notChecked.repeat(5 - puntaje);
      e +=
        `<div id='starsContainer'>` +
        puntajeChecked +
        puntajeNotChecked +
        `</div><span id='commentUser'>` +
        comentarios[i].user +
        `</span><p id='commentDescription' class='m-0'>` +
        comentarios[i].description +
        `</p><span id='commentDate'>` +
        comentarios[i].dateTime +
        `</span><br><br>`;
    }
    productComments.innerHTML = e;
  })
  .catch((error) => console.log(error));

//evento al presionar el boton comentar
document.getElementById('btnComentar').addEventListener('click', (event) => {
  agregarComentario();
});

function agregarComentario() {
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
  let puntajeChecked = checked.repeat(puntaje);
  let puntajeNotChecked = notChecked.repeat(5 - puntaje);
  let usuarioComenta = sessionStorage.getItem('username')
    ? sessionStorage.getItem('username')
    : sessionStorage.getItem('email');

  if (comentario) {
    div.innerHTML =
      puntajeChecked +
      puntajeNotChecked +
      `</div><br><span id='commentUser'>` +
      usuarioComenta +
      `</span><p id='commentDescription' class='m-0'>` +
      comentario +
      `</p><span id='commentDate'>` +
      fechaCompleta +
      `</span><br><br>`;
  } else {
    comment.style.border = '1px solid red';
  }
  comment.addEventListener('keypress', () => {
    comment.style.border = '1px solid lightgrey';
  });
  productComments.appendChild(div);
  comment.value = '';
}

//agrega los productos relacionados con el indice establecido
function agregarRelacionado() {
  let div = document.querySelector('#productosRelacionados');
  let array;
  getJSONData(PRODUCTS_URL)
    .then(function (response) {
      response.status === 'ok'
        ? (array = response.data)
        : console.log(response.error);

      for (let z = 0; z < related.length; z++) {
        for (let i = 0; i < array.length; i++) {
          if (i == related[z]) {
            div.innerHTML +=
              `<div
          class="card mr-3"
          style="width: 18rem"
        ><img class="card-img-top" src="` +
              array[i].imgSrc +
              `" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">` +
              array[i].name +
              `</h5>
            <p class="card-text">
              ` +
              array[i].description +
              `
            </p>
            <a href="#" class="card-link">ver</a>
          </div></div>`;
          }
        }
      }
      // div.innerHTML =
      //   `<div
      //     class="card mr-3"
      //     style="width: 18rem"
      //   ><img class="card-img-top" src="` +
      //   array[1].imgSrc +
      //   `" alt="Card image cap" />
      //     <div class="card-body">
      //       <h5 class="card-title">` +
      //   array[1].name +
      //   `</h5>
      //       <p class="card-text">
      //         ` +
      //   array[1].description +
      //   `
      //       </p>
      //       <a href="#" class="card-link">ver</a>
      //     </div></div>
      //     <div
      //     class="card"
      //     style="width: 18rem"
      //   >
      //   <img class="card-img-top" src="` +
      //   array[3].imgSrc +
      //   `" alt="Card image cap" />
      //     <div class="card-body">
      //       <h5 class="card-title">` +
      //   array[3].name +
      //   `</h5>
      //       <p class="card-text">
      //         ` +
      //   array[3].description +
      //   `
      //       </p>
      //       <a href="#" class="card-link">ver</a>
      //     </div></div>`;
    })
    .catch((error) => console.log(error));
}
