import { useEffect, useState } from "react";

function App() {
  const API_URL = "https://dummyjson.com";

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const respnse = await fetch(`${API_URL}/products?limit=200`);

    const data = await respnse.json();

    return setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h3>Products</h3>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.thumbnail} alt={product.title} />

          <p>{product.title}</p>
        </div>
      ))}
    </>
  );
}

export default App;
