import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { getAllProducts, searchProducts } from '../../services/productsService';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import useDebounce from '../../hooks/useDebounce';
import './Home.css';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery.trim() === '') {
      fetchProducts();
      return;
    }

    handleSearch();
  }, [debouncedSearchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsSearching(false);
      const data = await getAllProducts(30, 0);
      setProducts(data.products);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);
      const data = await searchProducts(searchQuery);
      setProducts(data.products);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return <Loading message="Loading products..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProducts} />;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Shopify</h1>
        <p className="hero-subtitle">
          Hello, {user?.firstName || user?.username}!
        </p>
        <p className="hero-description">
          Discover amazing products at great prices
        </p>
      </div>
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        {isSearching && (
          <p className="search-status">
            Found {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="products-header">
          <h2>Our Products</h2>
          <p className="products-count">
            Showing {products.length} products
          </p>
        </div>

        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="product-card"
              >
                <div className="product-image-wrapper">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  {product.discountPercentage > 0 && (
                    <span className="discount-badge">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-brand">{product.brand}</p>
                  <div className="product-rating">
                    <span className="stars">
                      {'⭐'.repeat(Math.round(product.rating))}
                    </span>
                    <span className="rating-value">({product.rating})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="original-price">
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="product-stock">
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : 'Out of stock'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found{isSearching ? ` for "${searchQuery}"` : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
