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

const apiURL = "http://localhost:3000";

async function checkAuth(){

  try {
       let response = await fetch(`${apiURL}/inside`, { credentials: "include" , method : "GET" , headers : {authorization : `Bearer ${token}`}});

        if(response.status == 401){
          window.location.replace("/Pages/Login.html");
          return;
        }
      const data = await response.json();
      if(response.ok){
          if(message) message.innerText = data.message;
          return data;
      }

      throw new error(data.message || 'Something Went Wrong');

    }
     catch(error){
      console.log("Network Error",error);
    }
}


checkAuth();
async function HandleLogout(){
  try{
  let response =  await fetch(`${apiURL}/Logout`, { 
                  method : 'POST',
                  credentials: "include" });

       if(response.ok){
        window.location.replace('/Pages/Login.html');
       }
       else{
        console.log("Logout Failed On Server");
       }
     }
      catch(error){
         console.log("Network Error",error);
  }
}

logout.addEventListener('click',HandleLogout);
add_btn.addEventListener('click' , ()=> {
  document.querySelector(".popup-window").style.display = "flex"
})

async function addProduct() {
  if (!product_name.value.trim() || !product_price.value || !product_img.value) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(`${apiURL}/Addproduct`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: product_name.value,
        description: product_details.value,
        price: parseFloat(product_price.value), // Convert to number
        image: product_img.value
      })
    });

    if (response.ok) {
      const result = await response.json();
      alert("Product added successfully!");
      
      product_name.value = "";
      product_details.value = "";
      product_price.value = "";
      product_img.value = "";
    } else {
      const errorData = await response.json();
      console.error("Server Error:", errorData.message);
    }

  } catch (error) {
    console.error("Network error:", error);
    alert("Could not connect to the server.");
  }
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