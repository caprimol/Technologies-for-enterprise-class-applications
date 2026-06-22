import { useParams, Link } from "react-router-dom";

export default function ProductDetail({ products }) {
  const { id } = useParams();

  const filteredProducts = products.filter(
    (product) => product.id === parseInt(id),
  );

  if (filteredProducts.length === 0) {
    return null;
  }

  const product = filteredProducts[0];

  return (
    <div>
      {/* Nazwa jako h1 */}
      <h1>{product.title}</h1>

      {/* Cechy oddzielone znacznikiem br */}
      <div>
        Kategoria: {product.category}
        <br />
        Marka: {product.brand}
        <br />
        Opis: {product.description}
        <br />
        Cena: {product.price} USD
      </div>

      <br />
      {/* Obrazek */}
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ maxWidth: "300px" }}
      />

      <br />
      <br />
      {/* Link powrotny */}
      <Link to="/">Powrót do listy produktów</Link>
    </div>
  );
}
