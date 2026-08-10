const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const input = 'public/icons/firebase.png';
  const output = 'public/icons/firebase.png'; // Overwrite
  const temp = 'public/icons/firebase_temp.png';

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Check if pixel is white or light grey (shadow)
    // The flame colors are yellow, orange, red. 
    // Yellow has low blue (e.g., < 50). Orange has low blue and lower green. Red has low blue and low green.
    // If all three RGB values are high, it's white/grey background.
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // Fully transparent
    } else if (r > 220 && g > 220 && b > 220) {
      // For anti-aliased edges and light shadow, make it partially transparent
      // Map 220-240 to 255-0 alpha
      const avg = (r + g + b) / 3;
      const alpha = Math.max(0, Math.min(255, 255 - ((avg - 220) * (255 / 20))));
      if (data[i+3] > alpha) {
          data[i + 3] = alpha;
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .toFile(temp);

  // Overwrite the original
  fs.copyFileSync(temp, output);
  fs.unlinkSync(temp);
}

processImage().then(() => console.log('Done')).catch(console.error);
