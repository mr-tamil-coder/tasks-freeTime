import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getSortedProducts,
  getProductsByCategory,
  searchProducts,
  deleteProduct,
} from "../../services/productsService";
import CategoryFilter from "./CategoryFilter";
import ProductSearch from "./ProductSearch";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import "./Products.css";

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Pass all values as parameters so this function NEVER reads stale state
  const fetchProducts = async (page, category, sort, order, query) => {
    try {
      setLoading(true);
      setError(null);
      const skip = (page - 1) * PRODUCTS_PER_PAGE;

      let data;
      if (query) {
        data = await searchProducts(query);
        const all = data.products || [];
        setTotal(all.length);
        setProducts(all.slice(skip, skip + PRODUCTS_PER_PAGE));
      } else if (category) {
        data = await getProductsByCategory(category);
        const all = data.products || [];
        setTotal(all.length);
        setProducts(all.slice(skip, skip + PRODUCTS_PER_PAGE));
      } else {
        data = await getSortedProducts(sort, order, PRODUCTS_PER_PAGE, skip);
        setProducts(data.products || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Always pass current values explicitly — no stale closure possible
  useEffect(() => {
    fetchProducts(currentPage, selectedCategory, sortBy, sortOrder, searchQuery);
  }, [currentPage, selectedCategory, sortBy, sortOrder, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        fetchProducts(currentPage, selectedCategory, sortBy, sortOrder, searchQuery);
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  // Returns array of page numbers and "..." strings for ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  if (error) return <ErrorMessage message={error} onRetry={() => fetchProducts(currentPage, selectedCategory, sortBy, sortOrder, searchQuery)} />;

  return (
    <div className="products-page">
      <div className="products-sidebar">
        <CategoryFilter
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="products-main">
        <div className="products-header">
          <h1>Our Products</h1>
          <Link to="/products/add" className="add-product-button">
            + Add New Product
          </Link>
        </div>

        <div className="products-controls">
          <ProductSearch onSearch={handleSearch} />

          <div className="sort-controls">
            <label>
              Sort by:
              <select value={sortBy} onChange={handleSortChange}>
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="stock">Stock</option>
              </select>
            </label>

            <label>
              Order:
              <select value={sortOrder} onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </div>

        <p className="products-count">
          Showing {products.length} of {total} products
          {selectedCategory && ` in "${selectedCategory}"`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {loading ? (
          <div className="products-loading-center">
            <Loading />
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>No products found.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
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
                        {"⭐".repeat(Math.round(product.rating))}
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
                        : "Out of stock"}
                    </span>
                  </div>
                </Link>

                <div className="product-actions">
                  <button
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.title)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination — Tailwind CSS */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mt-10 pb-8 flex-wrap">

            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 h-9 rounded-lg bg-gray-900 text-white text-sm font-semibold
                         transition-colors hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer mx-1"
            >
              ← Prev
            </button>

            {/* Page numbers with ellipsis */}
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors cursor-pointer
                    ${currentPage === page
                      ? "bg-gray-900 text-white border-gray-900 font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900"
                    }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 h-9 rounded-lg bg-gray-900 text-white text-sm font-semibold
                         transition-colors hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer mx-1"
            >
              Next →
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
