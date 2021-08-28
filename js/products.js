const ORDER_ASC_BY_NAME = 'AZ';
const ORDER_DESC_BY_NAME = 'ZA';
const ORDER_BY_PROD_COUNT = 'Cant.';
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var search = undefined;

const filtrar = (criterio) => {
  return currentCategoriesArray.filter((element) => {
    element.name.toLowerCase().indexOf(criterio.toLowerCase()) > -1;
  });
};

function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

function showCategoriesList() {
  let htmlContentToAppend = '';
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let category = currentCategoriesArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(category.soldCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.soldCount) <= maxCount))
    ) {
      htmlContentToAppend +=
        `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` +
        category.imgSrc +
        `" alt="` +
        category.description +
        `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` +
        category.name +
        `</h4>
                            <small class="text-muted">` +
        category.soldCount +
        ` artículos</small>
                        </div>
                        <p class="mb-1">` +
        category.description +
        `</p>
        <p class="mb-1">` +
        category.cost +
        category.currency +
        ` 
                    </div>
                </div>
            </a>
            `;
    }

    document.getElementById('product-list-container').innerHTML =
      htmlContentToAppend;
  }
}

function showCategoriesList2(result) {
  let htmlContentToAppend = '';

  for (let i = 0; i < result.length; i++) {
    let category = result[i];

    if (
      category.name != undefined &&
      category.name //Estoy en la rama filtro
    ) {
      htmlContentToAppend +=
        `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` +
        category.imgSrc +
        `" alt="` +
        category.description +
        `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` +
        category.name +
        `</h4>
                            <small class="text-muted">` +
        category.soldCount +
        ` artículos</small>
                        </div>
                        <p class="mb-1">` +
        category.description +
        `</p>
        <p class="mb-1">` +
        category.cost +
        category.currency +
        ` 
                    </div>
                </div>
            </a>
            `;
    }

    document.getElementById('product-list-container').innerHTML =
      htmlContentToAppend;
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
  // getJSONData(PRODUCTS_URL).then((response) => {
  //   let elemento = '';
  //   for (let i = 0; i < response.data.length; i++) {
  //     let dato = response.data[i];
  //     elemento +=
  //       `<a href="#" class="list-group-item list-group-item-action">
  //               <div class="row">
  //                   <div class="col-3">
  //                       <img src="` +
  //       dato.imgSrc +
  //       `" alt="` +
  //       dato.description +
  //       `" class="img-thumbnail">
  //                   </div>
  //                   <div class="col">
  //                       <div class="d-flex w-100 justify-content-between">
  //                           <h4 class="mb-1">` +
  //       dato.name +
  //       `</h4>
  //                           <small class="text-muted">` +
  //       dato.soldCount +
  //       ` artículos</small>
  //                       </div>
  //                       <p class="mb-1">` +
  //       dato.description +
  //       `</p>
  //       <small class="text-muted">` +
  //       dato.cost +
  //       ` ` +
  //       dato.currency +
  //       `</small>
  //                   </div>
  //               </div>
  //           </a>`;
  //     document.getElementById('product-list-container').innerHTML = elemento;
  //   }
  // });

  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });

  document
    .getElementById('searchInput')
    .addEventListener('keypress', function (event) {
      // if (event.key === 'Enter') {
      //   search = document.getElementById('searchInput').value;
      //   if (search != '') {
      //     showCategoriesList2();
      //   } else {
      //     showCategoriesList();
      //   }
      // }

      console.log(event);
      // showCategoriesList2(filtrar(event));
    });

  document.getElementById('sortAsc').addEventListener('click', function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById('sortDesc').addEventListener('click', function () {
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById('sortByCount').addEventListener('click', function () {
    sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document
    .getElementById('clearRangeFilter')
    .addEventListener('click', function () {
      document.getElementById('rangeFilterCountMin').value = '';
      document.getElementById('rangeFilterCountMax').value = '';

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
    });

  document
    .getElementById('rangeFilterCount')
    .addEventListener('click', function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById('rangeFilterCountMin').value;
      maxCount = document.getElementById('rangeFilterCountMax').value;

      if (minCount != undefined && minCount != '' && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != '' && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showCategoriesList();
    });
});
