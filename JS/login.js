let form =document.getElementById("Form");
let submit_btn = document.getElementById("login");
let name = document.getElementById("user");
let pass = document.getElementById("pass");
const msg = document.createElement("p");
let show = document.querySelector(".bi-eye-fill");
msg.id = "error";
let api = `http://localhost:3000`;


const ToggleShowPassword = ()=>{
  console.log("clicked")
   if(pass.type === "password"){
    pass.type =  "text"
  }
  else{
    pass.type = "password"
  }

}

const HandleRedirect = (data) => {
if(data.success){
    window.location.replace("/Pages/Admin.html")
  }
  else{
    msg.textContent = data.message;
    form.append(msg)
  }
}


const HandleInput =() => {
    let username = name.value;
    let password = pass.value;
    if(!username && !password){
      
          msg.innerText = "Username and Password are Empty."
          form.appendChild(msg)   
          return;
    }
   else if(!password){
      
         msg.innerText = "Password Is Empty."
         form.appendChild(msg)
         return;
    }
   else if(!username){
    msg.innerText ="Username is Empty.";
    form.appendChild(msg)
   }
   else{
    return {username, password};
   }
}


const HandleLogin = async()=>{

  let check = HandleInput();
  if(!check){
    return;
  }
    else{
   try{
    let response = await fetch(`${api}/check`,{
    method: "POST",
    credentials:"include",
    headers: {
    "Content-Type": "application/json"
  },

   body: JSON.stringify({
    user : check.username,
    pass : check.password
   })

});


const data = await response.json();
HandleRedirect(data);
   }catch(error){
    console.log('Network Error',error)
   }

}



}



show.addEventListener('click',ToggleShowPassword);
submit_btn.addEventListener('click', HandleLogin);

