// mainConatiner containig the products
let mainContainer = document.getElementById("main-container");
mainContainer.className = "m-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3";

// data from server
let pageCount = 1;
let totalPages;
let myPageLimit = 12;
let skipValue = ((pageCount-1) * myPageLimit);
let productArray;

let wishList = JSON.parse(localStorage.getItem("WISHLIST")) || [];

function saveWishListToLocalStorage(){
  localStorage.setItem("WISHLIST", JSON.stringify(wishList));
}


let footer = document.createElement("div");
footer.className = "m-2 flex justify-center items-center gap-2";

let prevBtn = document.createElement("button");
prevBtn.className = "m-1 p-2 border border-black bg-white hover:bg-gray-100";
prevBtn.innerText = "<";
prevBtn.addEventListener('click', ()=> {
      if(pageCount == 1)
    {
        return;
    }
    mainContainer.innerHTML = "";
    pageCount--;
    getData((pageCount-1) * myPageLimit);
})


let pageCountBox = document.createElement("span");
pageCountBox.className = "m-1 p-2 border border-black";


let nextBtn = document.createElement("button");
nextBtn.className = "m-1 p-2 border border-black bg-white hover:bg-gray-100";
nextBtn.innerText = ">";
nextBtn.addEventListener('click', ()=> {
     if (totalPages == pageCount)
    {
        return;
    }
    mainContainer.innerHTML = "";
    getData(pageCount * myPageLimit);
    pageCount++;

})

footer.appendChild(prevBtn);
footer.appendChild(pageCountBox);
footer.appendChild(nextBtn);



// calling getData function
getData(skipValue);


async function getData(skipValue) {

    let url;
    if(currentSearch)
    {
        url = `https://dummyjson.com/products/search?q=${currentSearch}&limit=${myPageLimit}&skip=${skipValue}`;
    }
    else if(currentCategory)
    {
        url = `https://dummyjson.com/products/category/${currentCategory}?limit=${myPageLimit}&skip=${skipValue}`;
    }
    else
    {
        url = `https://dummyjson.com/products?limit=${myPageLimit}&skip=${skipValue}`;
    }
    
    let response = await fetch(url);
    let result = await response.json();

    if (!categoriesBuilt) {
        let categoryData = await fetch('https://dummyjson.com/products/categories');
        categoryArray = await categoryData.json();
        makeCategoryButtons(categoryArray);
        categoriesBuilt = true;
    }


    productArray = result.products;
    totalPages = Math.ceil(result.total/myPageLimit);

    console.log(productArray);

    updateFooter(totalPages);

    
    makeProducts(productArray);

}


//function to update Footer pageCountBox
function updateFooter(totalPages)
{
    pageCountBox.innerText = `${pageCount}/${totalPages}`;
}


//function to create category buttons
function makeCategoryButtons(categoryArray)
{
    categoryArray.forEach(c => {
        let cBtn = document.createElement("button");
        cBtn.className = "m-1 p-1 border border-black bg-yellow-300 hover:bg-yellow-400 text-sm";
        cBtn.innerText = c.name;

        cBtn.addEventListener('click', () => {
            currentCategory = c.slug;   
            currentSearch = null;
            pageCount = 1;
            mainContainer.innerHTML = "";
            getData(0);
        });    

        categoriesBtnDiv.appendChild(cBtn);
    });
}


//function to make products in mainContainer
function makeProducts(productArray)
{
    productArray.forEach(product => {
        let productBox = document.createElement("div");
        productBox.className = "p-2 border border-black flex flex-col gap-1";

        let title = document.createElement("h1");
        title.innerText = product.title;
        title.className = "font-semibold text-base";

        let description = document.createElement("h3");
        description.innerText = product.description;
        description.className = "text-sm text-black";

        let productStock = document.createElement("h3");
        productStock.innerText = `Stock: ${product.stock}`;
        productStock.className = "text-sm";

        let productPrice = document.createElement("h3");
        productPrice.innerText = `$ ${product.price}`;
        productPrice.className = "text-sm font-bold";

        let productId = product.id;

       let wishListBtn = document.createElement("button");
        wishListBtn.className = "m-1 p-2 border border-black";
        wishListBtn.id = `wish-${product.id}`;
        wishListBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>'

        if(wishList.includes(product.id)){
            wishListBtn.classList.add("text-red-500");
        }

        wishListBtn.addEventListener('click', ()=>{
             productTowishList(product);
        });

        let addToCart = document.createElement("button");
        addToCart.className = "m-1 p-2 border border-black";
        addToCart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`;
        addToCart.addEventListener('click', ()=>{
            productToCart(product);
        });

        productBox.appendChild(title);
        productBox.appendChild(description);
        productBox.appendChild(productStock);
        productBox.appendChild(productPrice);
        productBox.appendChild(wishListBtn);
        productBox.appendChild(addToCart);
        

        mainContainer.appendChild(productBox);
    });
}

function productTowishList(product)
{
  let index = wishList.indexOf(product.id);
  let btn = document.getElementById(`wish-${product.id}`);

  if(index === -1){
    wishList.push(product.id);
    btn.classList.add("text-red-500");
  } else {
    wishList.splice(index, 1);
    btn.classList.remove("text-red-500");
  }

  saveWishListToLocalStorage();
}

mainFrame.appendChild(mainContainer);
mainFrame.appendChild(footer);
