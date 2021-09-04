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
getJSONData(PRODUCT_INFO_URL)
  .then(function (result) {
    let product = result.data;
    console.log(result.data);
    productName.innerHTML = product.name;
    productDescription.innerHTML = product.description;
    productSoldCount.innerHTML = product.soldCount;
    productCost.innerHTML = product.cost;
    productCategory.innerHTML = product.category;
    let elementoQueContieneTodasLasImagenes = '';
    let carousel = '';
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
