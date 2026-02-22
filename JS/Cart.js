const container = document.querySelector(".Cart-products");

fetch("http://localhost:3000/getCart").then(res => res.json()).then(data =>{
    const Data = Object.values(data);
    Data.forEach((element,index) => {
         const product_div = document.createElement("div");
         product_div.classList.add("product");
         product_div.innerHTML = `<img src="${element.img}">
                                 <p>${element.name}</p>
                                 <p>$${element.price}</p>
                                 <button class="remove-btn">Remove</button>`;
                                 container.append(product_div) 

                  product_div.addEventListener('click',(e)=>{
                    if(e.target.classList.contains("remove-btn")){
                        RemoveFromCart(index);
                    }
                  })               
    })
    
})

function RemoveFromCart(id){
    fetch("http://localhost:3000/Remove",{
        method :"Post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            productID : id
        })
    })
}