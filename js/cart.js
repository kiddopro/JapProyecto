//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const IVA = 0.22;
let cantidad = [];
let costo = [];
let subtotalTodo = [];
let subtotal = 0;
let total = 0;
let iva = 0;

const udsToUru = (currency, cost) => {
  result = currency.toUpperCase() == 'USD' ? cost * 43.91 : cost;
  return result;
};
const addProduct = (id) => {
  let elementoCantidad = document.getElementById(`cart_count${id}`);
  let elementoSubTotal = document.getElementById('cart_subtotal');
  let elementoTotal = document.getElementById('cart_total');
  let elementoIva = document.getElementById('cart_iva');
  let elementoModal = document.getElementById('cart_modal');
  elementoCantidad.innerHTML = cantidad[id] += 1;
  subtotalTodo[id] = costo[id] * cantidad[id];
  // limpiamos el valor de subtotal para ingresar el nuevo valor
  subtotal = 0;
  // sumamos los valores para cada elemento
  subtotalTodo.forEach((element) => {
    subtotal += element;
  });
  iva = subtotal * IVA;
  total = subtotal * IVA + subtotal;

  elementoSubTotal.innerHTML = subtotal;
  elementoIva.innerHTML = iva;
  elementoTotal.innerHTML = total;
  elementoModal.innerHTML = total;
};

const deleteProduct = (id) => {
  let elementoCantidad = document.getElementById(`cart_count${id}`);
  let elementoSubTotal = document.getElementById('cart_subtotal');
  let elementoTotal = document.getElementById('cart_total');
  let elementoIva = document.getElementById('cart_iva');
  let elementoModal = document.getElementById('cart_modal');
  elementoCantidad.innerHTML =
    cantidad[id] > 1 ? (cantidad[id] -= 1) : cantidad[id];
  subtotalTodo[id] = costo[id] * cantidad[id];
  // limpiamos el valor de subtotal para ingresar el nuevo valor
  subtotal = 0;
  // sumamos los valores de cada elemento
  subtotalTodo.forEach((element) => {
    subtotal += element;
  });

  iva = subtotal * IVA;
  total = subtotal * IVA + subtotal;

  elementoSubTotal.innerHTML = subtotal;
  elementoIva.innerHTML = iva;
  elementoTotal.innerHTML = total;
  elementoModal.innerHTML = total;
};

document.addEventListener('DOMContentLoaded', function (e) {
  let contenedor = document.getElementById('contenedor-tarjeta');
  let contenedor2 = document.getElementById('contenedor-total');
  let htmlText = '';
  let htmlTotal = '';
  fetch(CART_WITH_TWO_PRODUCTS)
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem('carritoDatos', JSON.stringify(data.articles));
      console.log(sessionStorage.getItem('carritoDatos'));
      data.articles.map((item, index) => {
        cantidad[index] = item.count;
        costo[index] = udsToUru(item.currency, item.unitCost);
        console.log(
          'Costo en: ' +
            item.currency +
            ' ' +
            item.unitCost +
            ' = ' +
            costo[index]
        );
        subtotalTodo[index] = costo[index] * cantidad[index];
        subtotal += subtotalTodo[index];
        total = subtotal * IVA + subtotal;
        iva = subtotal * IVA;

        htmlText +=
          `<div id="` +
          index +
          `"class="cart container-fluid d-flex border p-3 mb-4">
        <div
          class="
            border-secondary
            border-right
            p-3
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
              ><span id="cart_count${index}">` +
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
              <button onclick="addProduct(${index})">
                <i class="fas fa-plus"></i>
              </button>
              <button onclick="deleteProduct(${index})"><i class="fas fa-minus"></i></button>
            </div>
          </div>
        </div>
      </div>
      `;
      });
      contenedor.innerHTML = htmlText;
      htmlTotal = `<hr />
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
      <!-- parte de los precios -->
      <div class="" id= "precios">
        <i class="fas fa-dollar-sign">Subtotal:</i>
        <span id="cart_subtotal" class="ml-1"> ${subtotal}
        </span><br/>
        <i class="fas fa-dollar-sign">IVA:</i>
        <span id="cart_iva" class="ml-1">${iva}</span><br/>
        <i class="fas fa-dollar-sign">Total:</i>
        <span id="cart_total" class="ml-1">${total}</span>
        </div>
        <div>
        <button class="ml-5 rounded p-2 bg-success text-white" data-toggle="modal" data-target="#exampleModal">Terminar</button>
        <button class="ml-1 rounded p-2 bg-danger text-white">Cancelar</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Forma de pago</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-data-user">
        <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="titularModal">Nombre titular / empresa</label>
                <input type="text" class="form-control" id="titularModal" name="formCompra" placeholder="">
              </div>
              <div class="form-group col-md-6">
                <label for="emailModal">Email</label>
                <input type="email" class="form-control" id="emailModal" name="formCompra" placeholder="">
              </div>
            </div>
            
          </form>
        </div>
        <hr />
        <h5 class="modal-title mb-3" id="exampleModalLabel">Tarjeta</h5>
        <div class="form-card-user">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="nombreModal">Nombre</label>
                <input type="text" class="form-control" name="formCompra" id="nombreModal" placeholder="">
              </div>
              <div class="form-group col-md-6">
                <label for="apellidoModal">Apellido</label>
                <input type="text" class="form-control" name="formCompra" id="apellidoModal" placeholder="">
              </div>
            </div>
            <div class="form-group">
              <label for="direccionModal">Dirección</label>
              <input type="text" class="form-control" id="direccionModal"name="formCompra" placeholder="Ansina 110, Mercedes, 75000, Uruguay">
            </div>
             <div class="form-row">
              <div class="form-group col-md-6">
                <label for="nroTarjetaModal">Nro. Tarjeta</label>
                <input type="text" class="form-control" id="nroTarjetaModal" name="formCompra" placeholder="XXXX-XXXX-XXXX-XXXX">
              </div>
              <div class="form-group col-md-6">
                <label for="codSeguridadModal">Cod. Seguridad</label>
                <input type="text" class="form-control" id="codSeguridadModal" name="formCompra" placeholder="XXXX">
              </div>
            </div>
          </form>
        </div>
        <hr />
        <h5 class="modal-title mb-3" id="exampleModalLabel">Método de envío</h5>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="tipoEnvio" id="tipoEnvio1" value="1.15" >
          <label class="form-check-label" for="tipoEnvio1">Premium (+15%)</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="tipoEnvio" id="tipoEnvio2" value="1.10">
          <label class="form-check-label" for="tipoEnvio2">Express (+10%)</label>
        </div>
         <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="tipoEnvio" id="tipoEnvio3" value="1.5" checked>
          <label class="form-check-label" for="tipoEnvio3">Standard (+5%)</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick="verificarCampos()">Comprar</button>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>`;
      contenedor2.innerHTML = htmlTotal;
      // le pasamos al modal el total de los productos
      let modal = document.getElementById('cart_modal');
      modal.innerHTML = total;
    })
    .catch((err) => err);
});

function verificarCampos() {
  let isEmpty = false;
  let elementos = document.getElementsByName('formCompra');
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].value == '' ? (isEmpty = true) : null;
  }
  isEmpty ? alert('Complete todos los campos') : alert('Todo OK');
}
