//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const IVA = 0.22;
let cantidad = 0;
let costo = 0;
let subtotal = 0;
let total = 0;
let iva = 0;
const addProduct = (id) => {
  let elementoCantidad = document.getElementById('cart_count');
  let elementoSubTotal = document.getElementById('cart_subtotal');
  let elementoTotal = document.getElementById('cart_total');
  let elementoIva = document.getElementById('cart_iva');
  elementoCantidad.innerHTML = cantidad += 1;
  subtotal = costo * cantidad;
  iva = subtotal * IVA;
  total = subtotal * IVA + subtotal;
  elementoSubTotal.innerHTML = subtotal;
  elementoIva.innerHTML = iva;
  elementoTotal.innerHTML = total;
};

const deleteProduct = (id) => {
  let elementoCantidad = document.getElementById('cart_count');
  let elementoSubTotal = document.getElementById('cart_subtotal');
  let elementoTotal = document.getElementById('cart_total');
  let elementoIva = document.getElementById('cart_iva');
  elementoCantidad.innerHTML = cantidad > 1 ? (cantidad -= 1) : cantidad;
  subtotal = costo * cantidad;
  iva = subtotal * IVA;
  total = subtotal * IVA + subtotal;
  elementoSubTotal.innerHTML = subtotal;
  elementoIva.innerHTML = iva;
  elementoTotal.innerHTML = total;
};

document.addEventListener('DOMContentLoaded', function (e) {
  let contenedor = document.getElementById('contenedor-tarjeta');
  let contenedor2 = document.getElementById('contenedor-total');
  let htmlText = '';
  let htmlTotal = '';
  fetch(CART_INFO_URL)
    .then((res) => res.json())
    .then((data) => {
      data.articles.map((item, index) => {
        cantidad = item.count;
        costo = item.unitCost;
        subtotal = costo * cantidad;
        total = subtotal * IVA + subtotal;
        iva = subtotal * IVA;
        htmlText +=
          `<div id="` +
          index +
          `"class="cart container-fluid d-flex border p-3">
        <div
          class="
            border-secondary
            border-right
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
        <div class="right-side w-75 ml-5">
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
              corrupti? Tenetur perferendis est omnis. 
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
      `;
      });
      contenedor.innerHTML = htmlText;
      htmlTotal =
        `<hr />
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
      <div class="">
        <i class="fas fa-dollar-sign">Subtotal:</i>
        <span id="cart_subtotal" class="ml-1">` +
        subtotal +
        `</span><br/>
        <i class="fas fa-dollar-sign">IVA:</i>
        <span id="cart_iva" class="ml-1">` +
        iva +
        `</span><br/>
        <i class="fas fa-dollar-sign">Total:</i>
        <span id="cart_total" class="ml-1">` +
        total +
        `</span>
        </div>
        <div>
        <button class="ml-5 rounded p-2 bg-success text-white" data-toggle="modal" data-target="#exampleModal">✔Terminar</button>
        <button class="ml-1 rounded p-2 bg-danger text-white">❌Cancelar</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Purchase</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Está apunto de comprar el producto con un costo de $ ` +
        total +
        `
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Comprar</button>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>`;
      contenedor2.innerHTML = htmlTotal;
    })
    .catch((err) => err);
});
