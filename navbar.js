// mainFrame 
let mainFrame = document.getElementById("main-frame");

//navBar
let navBar = document.getElementById("nav-bar");
navBar.className = "m-2 p-2 border border-gray-300 flex justify-center gap-2";

//navBar buttons
let homeBtn = document.createElement("button");
homeBtn.className = "m-1 p-2 border border-gray-300 bg-white hover:bg-gray-100";
homeBtn.innerText = "HOME";

let cartBtn = document.createElement("button");
cartBtn.className = "m-1 p-2 border border-gray-300 bg-white hover:bg-gray-100";
cartBtn.innerText = "CART";

navBar.appendChild(homeBtn);
navBar.appendChild(cartBtn);

mainFrame.appendChild(navBar);