import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../../services/productsService";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import "./Products.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        navigate("/");
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  if (loading) return <Loading message="Loading product details..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="product-detail">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images?.[currentImageIndex] || product.thumbnail}
              alt={product.title}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={currentImageIndex === index ? "active" : ""}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-details-info">
          <div className="product-header">
            <h1>{product.title}</h1>
            <div className="product-actions">
              <button
                onClick={() => navigate(`/edit/${product.id}`)}
                className="edit-button"
              >
                ✏️ Edit
              </button>
              <button onClick={handleDelete} className="delete-button">
                🗑️ Delete
              </button>
            </div>
          </div>

          <p className="product-brand-detail">{product.brand}</p>

          <div className="product-rating-detail">
            <span className="stars">
              {"⭐".repeat(Math.round(product.rating))}
            </span>
            <span className="rating-value">({product.rating})</span>
          </div>

          <div className="product-price-detail">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="original-price">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
                <span className="discount-badge-detail">
                  -{product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Stock:</span>
              <span className="meta-value">{product.stock} units</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SKU:</span>
              <span className="meta-value">{product.sku}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Weight:</span>
              <span className="meta-value">{product.weight}g</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Dimensions:</span>
              <span className="meta-value">
                {product.dimensions?.width} × {product.dimensions?.height} ×
                {product.dimensions?.depth} cm
              </span>
            </div>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="product-tags">
              {product.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
