class Flower {
  constructor(x, y, size, color, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.type = type;
    this.rotation = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 1;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.002 + Math.random() * 0.002;
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.swayOffset + Date.now() * this.swaySpeed) * 0.5;
    this.rotation += 0.01;
    
    // Reset position when flower goes off screen
    if (this.y > canvas.height + this.size) {
      this.y = -this.size;
      this.x = Math.random() * canvas.width;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.type === 'rose') {
      this.drawRose(ctx, 0, 0);
    } else if (this.type === 'daisy') {
      this.drawDaisy(ctx, 0, 0);
    } else if (this.type === 'tulip') {
      this.drawTulip(ctx, 0, 0);
    } else {
      this.drawRegularFlower(ctx, 0, 0);
    }
    ctx.restore();
  }

  drawRegularFlower(ctx, x, y) {
    const petalCount = 12;
    const petalSize = this.size * 0.5;
    
    // Draw petals
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const px = x + Math.cos(angle) * petalSize;
      const py = y + Math.sin(angle) * petalSize;
      
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.ellipse(px, py, petalSize * 0.4, petalSize * 0.2, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw center
    ctx.beginPath();
    ctx.fillStyle = this.darkenColor(this.color, 30);
    ctx.arc(x, y, petalSize * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawRose(ctx, x, y) {
    const petalCount = 12;
    const petalSize = this.size * 0.5;
    
    // Draw petals
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const px = x + Math.cos(angle) * petalSize;
      const py = y + Math.sin(angle) * petalSize;
      
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.ellipse(px, py, petalSize * 0.4, petalSize * 0.2, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw center
    ctx.beginPath();
    ctx.fillStyle = this.darkenColor(this.color, 40);
    ctx.arc(x, y, petalSize * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTulip(ctx, x, y) {
    const petalCount = 12;
    const petalSize = this.size * 0.5;
    
    // Draw petals
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const px = x + Math.cos(angle) * petalSize;
      const py = y + Math.sin(angle) * petalSize;
      
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.ellipse(px, py, petalSize * 0.4, petalSize * 0.2, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw center
    ctx.beginPath();
    ctx.fillStyle = this.darkenColor(this.color, 35);
    ctx.arc(x, y, petalSize * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawDaisy(ctx, x, y) {
    const petalCount = 12;
    const petalSize = this.size * 0.5;
    
    // Draw white petals
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const px = x + Math.cos(angle) * petalSize;
      const py = y + Math.sin(angle) * petalSize;
      
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.ellipse(px, py, petalSize * 0.4, petalSize * 0.2, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw yellow center
    ctx.beginPath();
    ctx.fillStyle = '#ffeb3b';
    ctx.arc(x, y, petalSize * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Utility function to darken a color
  darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
  }
}

const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flowerColors = {
  regular: ['#ff69b4', '#ffc0cb', '#da70d6'], // pinks and orchid
  rose: ['#ff0000', '#ff3333', '#ff4d4d'], // reds
  tulip: ['#ff1493', '#ff69b4', '#db7093'], // deep pinks
  daisy: ['#ffffff'] // white for daisies
};

// Create initial flowers
const flowers = [];
const flowerCount = 40;

for (let i = 0; i < flowerCount; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height - canvas.height;
  const size = Math.random() * 30 + 25;
  const types = ['regular', 'rose', 'daisy', 'tulip'];
  const type = types[Math.floor(Math.random() * types.length)];
  const typeColors = flowerColors[type];
  const color = typeColors[Math.floor(Math.random() * typeColors.length)];
  flowers.push(new Flower(x, y, size, color, type));
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flowers.forEach(flower => {
    flower.update();
    flower.draw(ctx);
  });
  requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();
