const container = document.querySelector(".Cart-products");

async function getCart() {
  try {
    const response = await fetch("http://localhost:3000/getCart");
    
    if (!response.ok) {
      console.error('Fetch failed');
      return;
    }

    const data = await response.json(); 
    
    container.innerHTML = ""; 

    const fragment = document.createDocumentFragment();

    data.forEach((element) => {
      const product_div = document.createElement("div");
      product_div.classList.add("product");
      
      product_div.innerHTML = `
        <img src="${element.image_url}" alt="${element.productname}">
        <p>${element.productname}</p>
        <p>$${element.price}</p>
        <button class="remove-btn" data-id="${element.productid}">Remove</button>
      `;

      const removeBtn = product_div.querySelector(".remove-btn");
      removeBtn.addEventListener('click', () => {
        removeFromCart(element.productid);
      });

      fragment.append(product_div);
    });

    container.append(fragment);

  } catch (error) {
    console.error('Network Error:', error);
  }
}


getCart();


async function removeFromCart(id) {
  if (!id) return;

  try {
    const response = await fetch("http://localhost:3000/Remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productID: id })
    });

    if (response.ok) {
      await getCart(); 

      
      console.log("Item removed successfully");
    } else {
      alert("Failed to remove item from cart.");
    }
  } catch (error) {
    console.error('Network Error:', error);
    alert("Check your internet connection.");
  }
}