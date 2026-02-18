import axiosInstance from '../api/axiosConfig';

// 1. Get all products
export const getAllProducts = async (limit = 10, skip = 0) => {
  try {
    const response = await axiosInstance.get('/products', {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 3. Search products
export const searchProducts = async (query) => {
  try {
    const response = await axiosInstance.get('/products/search', {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 4. Limit and skip products (pagination)
export const getLimitedProducts = async (limit = 10, skip = 0) => {
  try {
    const response = await axiosInstance.get('/products', {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 5. Sort products
export const getSortedProducts = async (sortBy = 'title', order = 'asc') => {
  try {
    const response = await axiosInstance.get('/products', {
      params: { sortBy, order }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 6. Get all products categories
export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/products/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 7. Get products category list (same as getAllCategories)
export const getCategoryList = async () => {
  try {
    const response = await axiosInstance.get('/products/category-list');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 8. Get products by a category
export const getProductsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 9. Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products/add', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 10. Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 11. Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
