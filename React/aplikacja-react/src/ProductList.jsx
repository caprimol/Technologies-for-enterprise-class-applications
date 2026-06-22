import { useState } from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";

// Odbieramy products jako props
export default function ProductList({ products }) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>List of products</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Filter by product title:
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <ul className="product-list">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(filter.toLowerCase()),
          )
          .map((product) => (
            <ProductItem
              key={product.id}
              id={product.id} /* Dodajemy przekazanie id */
              title={product.title}
              brand={product.brand}
            />
          ))}
      </ul>
    </div>
  );
}
