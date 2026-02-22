const params = new URLSearchParams(window.location.search);
let CartButton = document.getElementById("cart-button");
const id = params.get("id");

if (id) {
     fetch('http://localhost:3000/product',{
                method: "POST",
                credentials:"include",
                headers: {
                   "Content-Type": "application/json"
              },
            body: JSON.stringify({
                ID1 : id-1
   })
               

          }).then(res => res.json()).then(data => {
            document.getElementById("name").textContent = data.name
            document.getElementById("pic").src = data.img;
            document.getElementById("description").textContent = data.description
            document.getElementById("price").textContent ="$"+ data.price;
          })
}


const AddtoCart = () => {
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

CartButton.addEventListener('click',AddtoCart);