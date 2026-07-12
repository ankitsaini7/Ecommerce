// array to store proucts in cart
let products;

let cartBox = document.getElementById("cart-box");
cartBox.className = "m-2 p-2 hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3";

homeBtn.addEventListener("click", () => {
  cartBox.classList.add("hidden");
  proceedDiv.classList.add("hidden");

  mainContainer.classList.remove("hidden");
  searchBar.classList.remove("hidden");
  footer.classList.remove("hidden");
  
});

cartBtn.addEventListener("click", () => { 
    
    mainContainer.classList.add("hidden");
    searchBar.classList.add("hidden");
    footer.classList.add("hidden");

    cartBox.classList.remove("hidden");
    proceedDiv.classList.remove("hidden");

    if(products.length === 0){
      cartBox.innerHTML = "<h2 id='empty-cart-msg' class='m-2 p-2'>No products in cart</h2>";
    }
});

function productToCart(product)
{
  let existing = products.find(p=> p.Id === product.id);
  if(existing)
  {
    if(existing.count>=product.stock)
    {
      alert("out of stock");
      return;
    }
    existing.count++;
    
    saveToLocalStorage(products);
    let countSpan = document.getElementById(`count-${product.id}`);
    countSpan.innerText = `Count: ${existing.count}`;
    return;
  }

  let cartProduct = {
    title: product.title,
    price: product.price,
    stock: product.stock,
    Id: product.id,
    count: 1
  }

  products.push(cartProduct);
  saveToLocalStorage(products);

  renderCartItem(cartProduct);  
}


mainFrame.appendChild(cartBox);

function renderCartItem(product)
{

  let emptyMsg = document.getElementById("empty-cart-msg");
  if(emptyMsg){
    emptyMsg.remove();
  }

  let productBox = document.createElement("div");
  productBox.className = "p-2 border border-gray-300 flex flex-col gap-1";

  let title = document.createElement("h1");
  title.innerText = product.title;
  title.className = "font-semibold text-base";

  let productStock = document.createElement("h3");
  productStock.innerText = `Stock: ${product.stock}`;
  productStock.className = "text-sm";

  let productPrice = document.createElement("h3");
  productPrice.innerText = `$ ${product.price}`;
  productPrice.className = "text-sm font-bold";

  let countSpan = document.createElement("h3");
  countSpan.innerText = `Count: ${product.count}`;
  countSpan.id = `count-${product.Id}`;
  countSpan.className = "text-sm";

  let removeFromCart = document.createElement("button")
  removeFromCart.innerText = "REMOVE";
  removeFromCart.className = "m-1 p-1 border border-gray-300 bg-red-100 hover:bg-red-200 text-sm";
  removeFromCart.addEventListener('click', () => {
  products = products.filter(p => p.Id !== product.Id);
  saveToLocalStorage(products);
  productBox.remove();

  if(products.length === 0){
    cartBox.innerHTML = "<h2 id='empty-cart-msg' class='m-2 p-2'>No products in cart</h2>";
  }
  });

  productBox.appendChild(title);
  productBox.appendChild(productStock);
  productBox.appendChild(productPrice);
  productBox.appendChild(countSpan);
  productBox.appendChild(removeFromCart);
  
  cartBox.appendChild(productBox);
}

function saveToLocalStorage(products){
localStorage.setItem("PRODUCTS", JSON.stringify(products));
}

function getFromLocalStorage(){
  let storedData = JSON.parse(localStorage.getItem("PRODUCTS"));
  return storedData;
}

products = getFromLocalStorage();
if(products == null)
{
  products = [];
}
else{
  cartProductFromLocalStorage(products);
}

function cartProductFromLocalStorage(products){
  products.forEach(product => {
  renderCartItem(product);

  });
}

let proceedDiv = document.createElement("div");
proceedDiv.className = "m-2 flex justify-center hidden";

let proceedBtn = document.createElement("button");
proceedBtn.innerText = "PROCEED PAYMENT";
proceedBtn.className = "m-2 p-2 border border-gray-300 bg-green-500 text-white hover:bg-green-600";
proceedBtn.addEventListener('click', () => {
  if(products.length === 0){
    alert("Cart is empty");
    return;
  }
  cartBox.innerHTML = "";
  window.location.href = "payment.html";
});

proceedDiv.appendChild(proceedBtn);
mainFrame.appendChild(proceedDiv);
