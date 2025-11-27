// Utility to get optimized image URLs
// Serves images from frontend for better performance

import productImageMap from './productImageMap';

/**
 * Get all product images from folder
 * Returns actual image files that exist
 * @param {string} productSlug - Product slug
 * @returns {string[]} Array of image URLs
 */
export const getProductImages = (productSlug) => {
  if (!productSlug) return ['/assets/products/phone-stand/phone-stand.jpg'];
  
  const slug = productSlug.trim();
  const productData = productImageMap[slug];
  
  if (productData && productData.images) {
    return productData.images.map(img => `${productData.path}/${img}`);
  }
  
  // Fallback if slug not in map
  return ['/assets/products/phone-stand/phone-stand.jpg'];
};

/**
 * Get primary product image (first available)
 * @param {string|object} backendUrl - URL from backend API or product object
 * @param {string} productName - Product name for mapping
 * @param {string} productSlug - Product slug (already formatted)
 * @returns {string} Primary image URL
 */
export const getImageUrl = (backendUrl, productName = '', productSlug = '') => {
  // If backendUrl is an object (full product), extract fields
  if (typeof backendUrl === 'object' && backendUrl !== null) {
    productSlug = backendUrl.slug || '';
    productName = backendUrl.name || '';
    backendUrl = backendUrl.image || '';
  }

  // Use slug-based folder structure with actual file mapping
  if (productSlug && productSlug.trim()) {
    const slug = productSlug.trim();
    const productData = productImageMap[slug];
    
    if (productData && productData.images && productData.images.length > 0) {
      return `${productData.path}/${productData.images[0]}`;
    }
  }

  // Convert product name to slug format and try again
  if (productName && productName.trim()) {
    const slug = productName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const productData = productImageMap[slug];
    
    if (productData && productData.images && productData.images.length > 0) {
      return `${productData.path}/${productData.images[0]}`;
    }
  }

  // Default fallback
  return '/assets/products/phone-stand/phone-stand.jpg';
};

/**
 * Preload critical images for better performance
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

export default getImageUrl;
