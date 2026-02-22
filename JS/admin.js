let logout= document.getElementById("logout-btn");
let message = document.getElementById("welcome");
let add_btn = document.getElementById("add-btn");
let product_name = document.getElementById("product-name")
let product_id = document.getElementById("product-id")
let product_details = document.getElementById("product-description")
let product_price = document.getElementById("product-price");
let product_img = document.getElementById("product-image");
let submit = document.getElementById("add-button");
let form = document.getElementById("form");
let removeBtn = document.getElementById("remove-btn");
let close = document.getElementById('close')

const token = localStorage.getItem("token");


let api = fetch("http://localhost:3000/inside", { credentials: "include" , method : "GET" , headers : {authorization : `Bearer ${token}`}})
      .then(res =>{
             if(res.status == 401){
          window.location.replace("/Pages/Login.html")
        }
        else{
          return res.json();
        }
      }).then(data => {
        message.innerText = data.message;
      });


function HandleLogout(){
   fetch('http://localhost:3000/Logout', { credentials: "include" }).then(res =>{
        window.location.replace("/Pages/Login.html")
  })
}

logout.addEventListener('click',HandleLogout);
add_btn.addEventListener('click' , ()=> {
  document.querySelector(".popup-window").style.display = "flex"
})

function AddProduct(){
  if(!product_details.value ||!product_img.value || !product_name.value || !product_price.value){
    return;
  }
  fetch('http://localhost:3000/Addproduct', {
    method :"Post",
    headers : {
      "Content-type" : "application/json"
    },
    body : JSON.stringify({
      name :  product_name.value,
      description : product_details.value,
      price : product_price.value,
      image : product_img.value
    })
  })
}

submit.addEventListener('click',(e)=> {
  e.preventDefault()
  AddProduct();
})



removeBtn.addEventListener('click' , () => {
  window.location.href = "/Pages/Admin_Remove.html"
})

close.addEventListener('click',()=>{
    document.querySelector(".popup-window").style.display = "none"
})