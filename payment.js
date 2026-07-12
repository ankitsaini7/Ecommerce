let orderSummary = document.getElementById("order-summary");
let payBtn = document.getElementById("payBtn");

function getFromLocalStorage(){
  let storedData = JSON.parse(localStorage.getItem("PRODUCTS"));
  return storedData;
}

let products = getFromLocalStorage();
if (products == null) {
  products = [];
}

let total = 0;
products.forEach(product => {
  let item = document.createElement("h3");
  item.innerText = `${product.title} x${product.count} = $${product.price * product.count}`;
  item.className = "text-sm";
  orderSummary.appendChild(item);
  total += product.price * product.count;
});

let totalBox = document.createElement("h2");
totalBox.className = "mt-2 font-bold";
totalBox.innerText = `TOTAL: $${total}`;
orderSummary.appendChild(totalBox);

payBtn.addEventListener('click', () => {
  let name = document.getElementById("cardName").value.trim();
  let number = document.getElementById("cardNumber").value.trim();
  let expiry = document.getElementById("cardExpiry").value.trim();
  let cvv = document.getElementById("cardCvv").value.trim();

  if(name === "" || number === "" || expiry === "" || cvv === ""){
    alert("Please fill all fields");
    return;
  }

  localStorage.removeItem("PRODUCTS");
  alert("Payment successful");
  window.location.href = "ecomm.html";
});

let cancelBtn = document.createElement("button");
cancelBtn.innerText = "CANCEL";
cancelBtn.className = "m-1 p-2 border border-black bg-red-100 hover:bg-red-200";
cancelBtn.addEventListener('click', () => {
  window.location.href = "ecomm.html";
});

document.getElementById("payment-form").appendChild(cancelBtn);
