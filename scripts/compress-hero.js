const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const heroImagePath = path.join(__dirname, '../public/assets/hero/hero-background.jpg');
const outputWebP = path.join(__dirname, '../public/assets/hero/hero-background.webp');
const outputJPG = path.join(__dirname, '../public/assets/hero/hero-background-optimized.jpg');

async function compressHeroImage() {
  console.log('🖼️  Compressing hero image...\n');
  
  const originalSize = fs.statSync(heroImagePath).size;
  console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  
  // Create WebP version (best compression)
  await sharp(heroImagePath)
    .webp({ quality: 85, effort: 6 })
    .toFile(outputWebP);
  
  const webpSize = fs.statSync(outputWebP).size;
  console.log(`WebP size: ${(webpSize / 1024 / 1024).toFixed(2)} MB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% smaller)`);
  
  // Create optimized JPEG fallback
  await sharp(heroImagePath)
    .jpeg({ quality: 85, progressive: true })
    .toFile(outputJPG);
  
  const jpgSize = fs.statSync(outputJPG).size;
  console.log(`Optimized JPG size: ${(jpgSize / 1024 / 1024).toFixed(2)} MB (${((1 - jpgSize/originalSize) * 100).toFixed(1)}% smaller)`);
  
  console.log('\n✅ Hero image compressed successfully!');
  console.log('Update Hero.js to use: hero-background.webp');
}

compressHeroImage().catch(console.error);
