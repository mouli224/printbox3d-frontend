const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../public/assets/products');
const QUALITY = 85; // High quality JPEG compression

async function compressImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return;
    }

    const outputPath = filePath.replace(/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/, '.webp');
    
    // Skip if WebP already exists and is newer
    if (fs.existsSync(outputPath)) {
      const originalStat = fs.statSync(filePath);
      const webpStat = fs.statSync(outputPath);
      if (webpStat.mtime > originalStat.mtime) {
        console.log(`⏭️  Skipped (already optimized): ${path.basename(filePath)}`);
        return;
      }
    }

    // Compress to WebP format (better compression than JPEG)
    await sharp(filePath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const originalSize = fs.statSync(filePath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.basename(filePath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
  } catch (error) {
    console.error(`✗ Error compressing ${filePath}:`, error.message);
  }
}

async function compressAllImages(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await compressAllImages(filePath);
    } else if (/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(file)) {
      await compressImage(filePath);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image compression...\n');
  console.log(`Directory: ${PRODUCTS_DIR}\n`);
  console.log('='.repeat(60));
  
  await compressAllImages(PRODUCTS_DIR);
  
  console.log('='.repeat(60));
  console.log('\n✅ Image compression completed!');
  console.log('WebP images created alongside originals for optimal performance.\n');
}

main().catch(console.error);
