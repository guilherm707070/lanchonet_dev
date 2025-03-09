const menu = document.getElementById("menu");
const cartBtn = document.getElementById("card-btn");
const cartModal = document.getElementById("cart-modal");
const cartItensConteiner = document.getElementById("card-items");
const cartTotal = document.getElementById("card-total");
const checkoutBtn = document.getElementById("checkout-btn");
const clouseModalBtn = document.getElementById("close-modal-btn");
const cardCalt = document.getElementById("cart-caunt");
const aderessInput = document.getElementById("address-input");
const addressWarn = document.getElementById("address-warn");

let cart = [];

/* abri modal */


cartBtn.addEventListener("click", function () {
  updateCartModal()
  cartModal.style.display = "flex";

});
/* FECHA MODAL */

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

clouseModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});
menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-card-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const pricie = parseFloat(parentButton.getAttribute("data-pricie"));

    addtocart(name, pricie);
  }
});

function addtocart(name, pricie) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    return;
  }
  cart.push({
    name,
    pricie,
    quantity: 1,
  });
  updateCartModal();
}

function updateCartModal() {
  cartItensConteiner.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cardItemElement = document.createElement("div");
    cardItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
    cardItemElement.innerHTML =
      `<div class="flex items-center justify-between"> 
         <div>
            <pclass="font-bold">${item.name}</pclass=> 
            <p>Qtd:${item.quantity}</p>
            <p clas="font-midium mt-2">R$:${item.pricie.toFixed(2)}</p>
         </div>
        <div>

         <button class="remove-from-btn  bg-red-400 rounded-md px-4 py-1" data-name =${item.name}>Remover</button>

        </div>
    </div>`

    total += item.pricie * item.quantity

    cartItensConteiner.appendChild(cardItemElement)


  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  cardCalt.innerText = cart.length
};
cartItensConteiner.addEventListener("click", function (event) {


  if (event.target.classList.contains("remove-from-btn")) {

    const name = event.target.getAttribute("data-name")
    removeItemCart(name)


  }

});

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name)
  if (index !== -1) {
    const item = cart[index]
    if (item.quantity > 1) {
      item.quantity -= 1
      updateCartModal()
      return;
    }
    cart.splice(index, 1);
    updateCartModal()
  }
}

aderessInput.addEventListener("input", function (event) {
  let inputvalue = event.target.value;
  if (inputvalue !== "") {
    aderessInput.classList.remove("border-red-800")
    addressWarn.classList.add("hidden")

  }

})



checkoutBtn.addEventListener("click", function () {




  const isOpem = checkRestalrantOpem()
  if (!isOpem) {
    Toastify({
      text: "ops! estamos fechado no momento",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: { background: "#ef4444" }
    }).showToast();
    return;
  }
  if (cart.length === 0) {
    Toastify({
      text:"adicione um item no carrinho",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: { background: "#a5544" }
    }).showToast();

    return;
  }

 

  if (aderessInput.value === "") {


    addressWarn.classList.remove("hidden")

    aderessInput.classList.add("border-red-800")

  } else {

    const cartItem = cart.map((item) => {
      
      return (
        `*${item.name}* Quantidade: (${item.quantity})preço R$: (${item.pricie.toFixed(2)}) |   ` 
      )
      

    }).join("")
    const mensage = encodeURIComponent(cartItem)
    const phone = "77070707070"
    window.open(`https://wa.me/${phone}?text=${mensage}*Emdereço: ${aderessInput.value}*`,"_blank")
    cart = []
    updateCartModal()

  }
})
function checkRestalrantOpem() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;

}

const spanItem = document.getElementById("date-span")
const isOpem = checkRestalrantOpem();
if (isOpem) {
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")

} else {
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")

}