import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../services/productsService';
import { Link } from 'react-router-dom';
import './Products.css';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSearched(false);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async () => {
    if (query.trim() === '') return;

    try {
      setLoading(true);
      const data = await searchProducts(query);
      setResults(data.products);
      setSearched(true);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {loading && <p className="search-status">Searching...</p>}

      {searched && !loading && (
        <div className="search-results">
          <p className="results-count">
            Found {results.length} product{results.length !== 1 ? 's' : ''}
          </p>
          
          {results.length > 0 ? (
            <div className="products-grid">
              {results.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title}
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <div className="product-price">
                      <span className="current-price">${product.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="no-results">No products found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
