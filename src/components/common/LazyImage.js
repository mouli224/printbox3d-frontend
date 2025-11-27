import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './LazyImage.css';

/**
 * Optimized lazy loading image component
 * - Lazy loads images as they enter viewport
 * - Opacity transition while loading
 * - Fallback to placeholder on error
 * - WebP support with JPEG/PNG fallback
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  effect = 'opacity',
  placeholderSrc
}) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      effect={effect}
      threshold={100} // Start loading 100px before entering viewport
      onError={(e) => {
        // If WebP fails, try fallback formats
        if (e.target.src.includes('.webp')) {
          e.target.src = e.target.src.replace('.webp', '.jpg').replace('.WEBP', '.JPG');
        } else if (placeholderSrc && e.target.src !== placeholderSrc) {
          e.target.src = placeholderSrc;
        }
      }}
    />
  );
};

export default LazyImage;
