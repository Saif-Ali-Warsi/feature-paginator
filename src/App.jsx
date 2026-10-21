import { useEffect, useState } from "react";

function App() {
  const API_URL = "https://dummyjson.com";

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getProducts = async () => {
    const respnse = await fetch(`${API_URL}/products?limit=200`);

    const data = await respnse.json();

    return setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const page_size = 10;

  const totalProduct = products.length;

  const numOfPage = Math.ceil(totalProduct / page_size);

  const start = currentPage * page_size;
  const end = start + page_size;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="paginator">
        <button onClick={() => goToPreviousPage()}>Prev</button>
        {[...Array(numOfPage).keys()].map((n) => (
          <span
            className={"page-number " + (n === currentPage ? "active" : "")}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </span>
        ))}
        <button onClick={() => goToNextPage()}>Next</button>
      </div>

      <h3>Paginated Products</h3>
      <div className="product-list">
        {products.slice(start, end).map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />

            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
