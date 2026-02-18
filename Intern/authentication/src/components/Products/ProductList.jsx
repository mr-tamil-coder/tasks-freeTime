import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getLimitedProducts } from '../../services/productsService';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import './Products.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const skip = (currentPage - 1) * productsPerPage;
      const data = await getLimitedProducts(productsPerPage, skip);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / productsPerPage);

  if (loading) return <Loading message="Loading products..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Products</h1>
        <p className="products-count">Showing {products.length} of {total} products</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img 
                src={product.thumbnail} 
                alt={product.title}
                className="product-image"
              />
              {product.discountPercentage > 0 && (
                <span className="discount-badge">-{product.discountPercentage}%</span>
              )}
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-brand">{product.brand}</p>
              <div className="product-rating">
                <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
                <span className="rating-value">({product.rating})</span>
              </div>
              <div className="product-price">
                <span className="current-price">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="original-price">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              <span className="product-stock">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <input type="text" className='bg-red-500' value={currentPage} onChange={e => setCurrentPage(Number(e.target.value))} />
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
