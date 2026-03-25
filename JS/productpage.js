const params = new URLSearchParams(window.location.search);
let CartButton = document.getElementById("cart-button");
const id = params.get("id");


async function getProduct(){
if (id) {
     let response = await fetch('http://localhost:3000/product',{
                method: "POST",
                credentials:"include",
                headers: {
                   "Content-Type": "application/json"
              },
            body: JSON.stringify({
                ID : id
   })
               

          });
          const data = await response.json();
          console.log(data);
          if(data){
            document.getElementById("name").textContent = data[0].productname;
            document.getElementById("pic").src = data[0].image_url;
            document.getElementById("description").textContent = data[0].description
            document.getElementById("price").textContent ="$"+ data[0].price;
          }
        
}
}




const AddtoCart = async () => {
 const response = await fetch('http://localhost:3000/cart', {
    method : "Post",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      product_id : id
    })
  })
}

getProduct();
CartButton.addEventListener('click',AddtoCart);