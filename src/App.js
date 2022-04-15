import "./App.css";
import React, { useState, useEffect } from "react";
import AddProduct from "./components/add-product/AddProduct.js";
import ProductsList from "./components/products-list/ProductsList.jsx";

function App() {
  const [productId, setProductId] = useState("");

  const getProductIdHandler = (id) => {
    //console.log("The ID of document to be edited: ", id);
    setProductId(id);
  };

  useEffect((id) => {
    getProductIdHandler(id);
  }, []);

  return (
    <>
      <header>
        <h1>Admin-Dashboard</h1>
        <h2>CRUD Products to your E-Shop</h2>
      </header>
      <div className="App">
        <AddProduct id={productId} setProductId={setProductId} />
      </div>
      <ProductsList getProductId={getProductIdHandler} />
    </>
  );
}

export default App;
