let categoryArray;
let currentSearch = null;
let currentCategory = null;
let categoriesBuilt = false;

//searchBar
let searchBar = document.getElementById("search-bar");
searchBar.className = "m-2 p-2 border border-gray-300";

//searchBtnDiv & searchInput
let searchBtnDiv = document.createElement("div");
searchBtnDiv.className = "flex justify-center gap-1";

let searchInput = document.createElement("input");
searchInput.className = "border border-gray-300 p-1";
searchInput.placeholder = "search the product";

let searchBtn = document.createElement("button");
searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>`
searchBtn.className = "border border-gray-300 p-2 bg-blue-200 hover:bg-blue-300";
searchBtn.addEventListener('click', ()=>{
    let query = searchInput.value.trim();
    if (query === "") return; 

    currentSearch = query;
    currentCategory = null;  
    pageCount = 1;
    mainContainer.innerHTML = "";
    getData(0);
})

searchBtnDiv.appendChild(searchInput);
searchBtnDiv.appendChild(searchBtn);

// categoriesBtnDiv & categories buttons
let categoriesBtnDiv = document.createElement("div");
categoriesBtnDiv.className = "flex flex-wrap justify-center gap-1 mt-2";

let allBtn = document.createElement("button");
allBtn.className = "m-1 p-1 border border-gray-300 bg-yellow-300 hover:bg-yellow-400";
allBtn.innerText = "ALL";
allBtn.addEventListener('click', ()=>{
    currentCategory = null;
    currentSearch = null;
    pageCount = 1;
    mainContainer.innerHTML = "";
    getData(0);
})

categoriesBtnDiv.appendChild(allBtn);


searchBar.appendChild(searchBtnDiv);
searchBar.appendChild(categoriesBtnDiv);


mainFrame.appendChild(searchBar);
