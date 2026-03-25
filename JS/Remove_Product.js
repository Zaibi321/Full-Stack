const container = document.querySelector(".Cart-products");


async function ShowProducts(){

let response = await fetch("http://localhost:3000/data");
let data = await response.json();
    const DataInObject = Object.values(data);
    DataInObject.forEach((element,index) => {
         const product_div = document.createElement("div");
         product_div.classList.add("product");
         product_div.innerHTML = `<img src="${element.image_url}">
                                 <p>${element.productname}</p>
                                 <p>$${element.price}</p>
                                 <button class="remove-btn">Remove</button>`;
                                 container.append(product_div) 

                  product_div.addEventListener('click',(e)=>{
                    if(e.target.classList.contains("remove-btn")){
                          RemoveProduct(element.productid);
                    }
                  })               
    
})

}


ShowProducts()
async function RemoveProduct(id){
    const repsonse = await fetch("http://localhost:3000/RemoveProduct",{
        method :"Post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            productID : id
        })
    })
}