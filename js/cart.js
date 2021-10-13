//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let cantidad = 0;
let costo = 0;
const addProduct = () => {
  let elementoCantidad = document.getElementById('cart_count');
  let elementoTotal = document.getElementById('cart_total');
  elementoCantidad.innerHTML = cantidad += 1;
  elementoTotal.innerHTML = costo * cantidad;
  console.log(cantidad);
};

const deleteProduct = () => {
  let elementoCantidad = document.getElementById('cart_count');
  let elementoTotal = document.getElementById('cart_total');
  elementoCantidad.innerHTML = cantidad > 1 ? (cantidad -= 1) : cantidad;
  elementoTotal.innerHTML = costo * cantidad;
};

document.addEventListener('DOMContentLoaded', function (e) {
  let contenedor = document.getElementById('contenedor-tarjeta');
  let htmlText = '';
  fetch(CART_INFO_URL)
    .then((res) => res.json())
    .then((data) => {
      data.articles.map((item, index) => {
        cantidad = item.count;
        costo = item.unitCost;
        htmlText +=
          `<div id="` +
          index +
          `"class="cart container-fluid d-flex border p-3">
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
          `" alt="" srcset="" style="width:100%; height:150px; object-fit: contain"/>
        </div>
        <div class="right-side w-75">
          <div class="cart-header d-flex justify-content-between mb-3">
            <span class="font-weight-bold">` +
          item.name +
          `</span>
            <div class="product-count">
              <i class="fas fa-shopping-cart mr-1"></i
              ><span id="cart_count">` +
          item.count +
          `</span>
            </div>
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
              <span>` +
          item.currency +
          ' ' +
          item.unitCost +
          `</span>
            </div>

            <div class="buttons">
              <button onclick="addProduct()">
                <i class="fas fa-plus"></i>
              </button>
              <button onclick="deleteProduct()"><i class="fas fa-minus"></i></button>
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
          p-0
          buy-part
        "
      >
        <i class="fas fa-dollar-sign"> Total:</i>

        <span id="cart_total" class="ml-1">` +
          costo * cantidad +
          `</span>
        <button class="ml-5 rounded p-2">Buy</button>
      </div>`;
      });
      contenedor.innerHTML = htmlText;
    })
    .catch((err) => err);
});
