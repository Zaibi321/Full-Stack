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
const apiURl = "http://localhost:3000";



const getdata = async () =>
   {
     let data = await fetch(`${apiURl}/data`).then(response => response.json());
     handleIncoming(data);
  }
        getdata();

    login.addEventListener('click', ()=>{
    window.location.href = "/Pages/Login.html";
 })

 
const handleIncoming = (data) => {
    let products = Object.values(data);
    container.innerHTML = "";

    
    products.forEach((product,index) => {
        let product_div = document.createElement("div");
        product_div.classList.add("card");

     product_div.innerHTML = `
            <img src="${product.image_url}" class="pic">
            <p class="product-name">${product.productname}</p>
            <p class="product-price">$${product.price}</p>
            <button class="cart-button">Add to Cart</button>
        `;
        
        product_div.addEventListener("click", (e) => {
             if (e.target.classList.contains("cart-button")) {
                e.preventDefault();
                   AddtoCart(product.productid);
                   return;
          }
          
            window.location.href = `/Pages/first.html?id=${product.productid}`;
        });

        container.appendChild(product_div)

    })


}


 const AddtoCart = async (id) => {
    try{

        let response = await fetch(`${apiURl}/cart`,{
            method : "Post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                product_id : id
            })

        });      
    
   } catch(error)
      {
    console.log("error adding to cart",error);
   }
}


 const HandleSearch = async (search_value) => {

    try{
       let response = await fetch(`${apiURl}/Search?q=${search_value}`, {
        method : "Post",
        headers : {
            "Content-Type" :"application/json"
        }
   });

    let data = await response.json();
    console.log(data);
    if(data.length > 0){
        handleIncoming(data);
    }
    else{
        container.innerHTML =`<p id="no-result">No Search Result</p>`

    }
         
    } catch(error) 
    {
        console.log(error);
    }

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
const  SendFilterRequest = async(min,max) => { 

    try{
    let response = await fetch("http://localhost:3000/filter", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            min : min,
            max : max
        })

    });

    let data = await response.json();
    handleIncoming(data);
   }   catch(error)
{
    console.log(error);
}
}
minPrice.addEventListener("keydown",HandleFilterInput);
maxPrice.addEventListener("keydown",HandleFilterInput);
