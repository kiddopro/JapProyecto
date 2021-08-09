//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {
  getJSONData(PRODUCTS_URL).then((response) => {
    let elemento = '';

    for (let i = 0; i < response.data.length; i++) {
      let dato = response.data[i];
      elemento +=
        `<a href="#" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` +
        dato.imgSrc +
        `" alt="` +
        dato.description +
        `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` +
        dato.name +
        `</h4>
                            <small class="text-muted">` +
        dato.soldCount +
        ` artículos</small>
                        </div>
                        <p class="mb-1">` +
        dato.description +
        `</p>
        <small class="text-muted">` +
        dato.cost +
        ` ` +
        dato.currency +
        `</small>
                    </div>
                </div>
            </a>`;

      document.getElementById('product-list-container').innerHTML = elemento;
    }
  });
});
