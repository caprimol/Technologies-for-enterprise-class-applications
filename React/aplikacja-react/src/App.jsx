import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail"; // Ten komponent zaraz stworzymy!

function App() {
  // Przeniesiony stan i hook pobierający dane z API [cite: 61, 62]
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  // Nowoczesna konfiguracja routera
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList products={products} />, // Przekazujemy tablicę przez props [cite: 64, 70]
    },
    {
      path: "details/:id",
      element: <ProductDetail products={products} />, // Przekazujemy tablicę przez props [cite: 73]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
