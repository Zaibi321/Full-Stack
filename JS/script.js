let container =  document.querySelector(".card-container")
let login = document.getElementById("admin-login");
let params = new URLSearchParams(window.location.search);
let cartcount = document.getElementById("count");
let id = params.get("id");
let card = document.querySelectorAll(".card");
let count =0;
let cart = document.getElementById("cart");
let searchField = document.querySelector(".search-button");
let ok = document.querySelector(".ok");
let filter = document.getElementById("filter-button");
let minPrice = document.getElementById("min-price-filter");
let maxPrice = document.getElementById("max-price-filter");



fetch("http://localhost:3000/data").then(response => response.json()).then(data =>{
      
handleIncoming(data);

    
}) 


login.addEventListener('click', ()=>{
    window.location.href = "/Pages/Login.html"
})

 
const handleIncoming = (data) => {
    let products = Object.values(data);
    container.innerHTML = "";

    
    products.forEach((product,index) => {
        let product_div = document.createElement("div");
        product_div.classList.add("card");

     product_div.innerHTML = `
            <img src="${product.img}" class="pic">
            <p class="product-name">${product.name}</p>
            <p class="product-price">$${product.price}</p>
            <button class="cart-button">Add to Cart</button>
        `;
        
        product_div.addEventListener("click", (e) => {
             if (e.target.classList.contains("cart-button")) {
                e.preventDefault();
                   AddtoCart(product.id);
                   return;
  }
            window.location.href = `/Pages/first.html?id=${product.id}`;
        });

        container.appendChild(product_div)

    })


}


 const AddtoCart = (id) => {
    console.log(id);
    fetch('http://localhost:3000/cart', {
        method : "Post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            product_id : id
        })
    })
 }


 const HandleSearch = (search_value) => {
    fetch(`http://localhost:3000/Search?q=${search_value}`, {
        method : "Post",
        headers : {
            "Content-Type" :"application/json"
        },
    }).then( res => res.json()).then(data => {
    
        if(!data.success){
            container.innerHTML =`<p id="no-result">No Search Result</p>`
        }
        else{
            handleIncoming(data.products);
        }
        
    })
 }



 cart.addEventListener("click", ()=> {window.location.href = "/Pages/Cart.html"})

let timeout;
searchField.addEventListener("input", (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    HandleSearch(e.target.value)
  }, 300);
});

filter.addEventListener("click", () => {

     let filterContainer = document.querySelector(".filter-container");
    //  filterContainer.style.display = "flex";  
     filterContainer.classList.toggle("hidden");
     if(filterContainer.classList.contains("hidden")){
        filter.textContent = "Filter";
}    else{
    filter.textContent = "X"}
})

function HandleFilterInput(event){

    if(event.key === "Enter"){
         let min = minPrice.value;
         let max = maxPrice.value;
        SendFilterRequest(min,max);
    }
   
}
function SendFilterRequest(min,max){
    fetch("http://localhost:3000/filter", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            min : min,
            max : max
        })
    }).then(res => res.json()).then(data => {
        handleIncoming(data);
    });
}
minPrice.addEventListener("keydown",HandleFilterInput);
maxPrice.addEventListener("keydown",HandleFilterInput);
