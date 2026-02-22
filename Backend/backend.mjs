import express from 'express'
import cors from 'cors'
import session from 'express-session'
import DataRoute from "./Routes/Data.mjs"
import AuthRoute from "./Routes/Auth.mjs"
import ProtectedRoute from "./Routes/Protection.mjs"
import LogoutRoute from "./Routes/Logout.mjs"
import ProductRoute from "./Routes/Product.mjs"
import CartRoute from "./Routes/Cart.mjs"
import GetCartRoute from "./Routes/GetCart.mjs"
import RemoveFromCart from "./Routes/Remove.mjs"
import Addproduct from "./Routes/AddProduct.mjs"
import SearchRoute from "./Routes/Search.mjs"
import RemoveProduct from "./Routes/RemoveProduct.mjs"
import FilterRoute from "./Routes/Filter.mjs"

const app = express();
app.use(session({
  secret: "mysecret"
}))
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5500", 
  credentials: true
}))


app.use("/data", DataRoute);
app.use("/check",AuthRoute);
app.use("/Logout",LogoutRoute)
app.use("/inside",ProtectedRoute)
app.use("/product",ProductRoute);
app.use("/cart",CartRoute);
app.use("/getCart",GetCartRoute);
app.use("/Remove",RemoveFromCart);
app.use("/Addproduct",Addproduct);
app.use("/Search",SearchRoute);
app.use("/RemoveProduct",RemoveProduct)
app.use("/filter",FilterRoute)




app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
});

