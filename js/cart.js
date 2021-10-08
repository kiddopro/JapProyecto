//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener('DOMContentLoaded', function (e) {
  let contenedor = document.getElementById('contenedor-tarjeta');
  let htmlText = '';
  fetch(CART_INFO_URL)
    .then((res) => res.json())
    .then((data) => {
      data.articles.map((item) => {
        let cantidad = item.count;
        let costo = item.unitCost;
        htmlText +=
          `<div class="cart container-fluid d-flex border p-3">
        <div
          class="
            left-side
            w-25
            d-flex
            align-items-center
            justify-content-md-center
          "
        >
          <img src="` +
          item.src +
          `" alt="" srcset="" />
        </div>
        <div class="right-side w-75">
          <div class="cart-header d-flex justify-content-between mb-3">
            <span>` +
          item.name +
          `</span><span>` +
          item.count +
          ` to buy</span>
          </div>
          <div
            class="cart-body mb-3"
            style="overflow-y: scroll; overflow-x: hidden; max-height: 80px"
          >
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea,
              nobis officia omnis voluptatum aspernatur illum nihil iste
              officiis maxime, debitis sequi praesentium aliquid dolorum aut
              corrupti? Tenetur perferendis est omnis. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Iure nesciunt debitis ullam
              quis cumque asperiores fuga temporibus, odit porro architecto
              voluptates exercitationem dicta quaerat velit odio voluptate
              fugiat ad ipsum!
            </p>
          </div>
          <div
            class="
              cart-footer
              d-flex
              justify-content-between
              mt-3
              align-items-center
            "
          >
            <div class="product-cost">
              <i class="fas fa-dollar-sign"></i>
              <span>` +
          item.unitCost +
          `</span>
            </div>

            <div class="buttons">
              <button>
                <i class="fas fa-plus"></i>
              </button>
              <button><i class="fas fa-minus"></i></button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div
        class="
          container-fluid
          d-flex
          align-items-center
          justify-content-end
          border
          p-0
          buy-part
        "
      >
        <i class="fas fa-shopping-cart mr-1"></i>
        <span>` +
          costo * cantidad +
          `</span>
        <button class="ml-5">Buy</button>
      </div>`;
      });
      contenedor.innerHTML = htmlText;
    })
    .catch((err) => err);
});
