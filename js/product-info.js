//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {});

let productName = document.querySelector('#productName');
let productDescription = document.querySelector('#productDescription');
let productSoldCount = document.querySelector('#productSoldCount');
let productCost = document.querySelector('#productCost');
let productCategory = document.querySelector('#productCategory');
getJSONData(PRODUCT_INFO_URL)
  .then(function (result) {
    let product = result.data;
    console.log(result.data);
    productName.innerHTML = product.name;
    productDescription.innerHTML = product.description;
    productSoldCount.innerHTML = product.soldCount;
    productCost.innerHTML = product.cost;
    productCategory.innerHTML = product.category;
  })
  .catch((error) => console.log(error));
