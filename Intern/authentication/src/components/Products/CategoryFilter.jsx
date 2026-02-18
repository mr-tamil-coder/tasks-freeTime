import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../services/productsService';
import './Products.css';

const CategoryFilter = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="categories-loading">Loading categories...</div>;

  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-list">
        <button
          className={`category-button ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`category-button ${selectedCategory === category.slug ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
