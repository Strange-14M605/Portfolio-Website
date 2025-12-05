// canvas + context created when called from component, not here
export function initSketch(canvas) {
  const context = canvas.getContext("2d");

  const p = {
    // same mini p5 object but using this context, not global
    PI: Math.PI,
    HALF_PI: Math.PI / 2,
    random: (a, b) => {
      if (a !== undefined && b !== undefined) {
        return Math.floor(Math.random() * (b - a)) + a;
      } else {
        return a[Math.floor(Math.random() * a.length)];
      }
    },
    fill: (c) => (context.fillStyle = c),
    stroke: (c) => (context.strokeStyle = c),
    noFill: () => (context.fillStyle = "transparent"),
    noStroke: () => (context.strokeStyle = "transparent"),
    push: () => context.save(),
    pop: () => context.restore(),
    translate: (x, y) => context.translate(x, y),
    scale: (x, y) => context.scale(x, y),
    circle: (x, y, d) => {
      context.beginPath();
      context.arc(x, y, d / 2, 0, Math.PI * 2);
      context.fill();
    },
  };

  function drawPetalTile(r, cream, sky) {
    p.noStroke();
    p.fill(sky);

    const petals = 8;
    for (let i = 0; i < petals; i++) {
      context.rotate((2 * Math.PI) / petals);
      p.circle(r * 0.6, 0, r * 0.9);
    }

    p.fill(cream);
    p.circle(0, 0, r * 0.6);
  }
  function drawDiamondTile(r, cream, sky) {
    p.noStroke();

    // Outer star
    p.fill(cream);
    for (let i = 0; i < 4; i++) {
      context.rotate(Math.PI / 2);
      context.beginPath();
      context.moveTo(0, -r);
      context.lineTo(r * 0.45, 0);
      context.lineTo(0, r);
      context.lineTo(-r * 0.45, 0);
      context.closePath();
      context.fill();
    }

    // Inner diamond
    p.fill(sky);
    context.beginPath();
    context.moveTo(0, -r * 0.5);
    context.lineTo(r * 0.5, 0);
    context.lineTo(0, r * 0.5);
    context.lineTo(-r * 0.5, 0);
    context.closePath();
    context.fill();
  }
  function drawArcTile(r, cream, sky) {
    p.noStroke();

    p.fill(sky);
    for (let i = 0; i < 4; i++) {
      context.beginPath();
      context.arc(0, 0, r * 0.9, 0, Math.PI / 2);
      context.fill();
      context.rotate(Math.PI / 2);
    }

    p.fill(cream);
    p.circle(0, 0, r * 0.5);
  }

  function resizeCanvas() {
    const parent = document.getElementById("canvas-wrapper");
    const width = parent.clientWidth;
    const height = 300;

    canvas.width = width;
    canvas.height = height;
  }

  function setup() {
    resizeCanvas();
    draw();
  }

  function draw() {
    // Colors inspired by Indian tile palettes
    const cream = "#f9f4e7";
    // const cream = "#0a1d4a";
    const sky = "#4aa3d9";

    // fill background
    // context.fillStyle = cream;
    // context.fillRect(0, 0, canvas.width, canvas.height);

    const tileSize = 120;
    const cols = Math.ceil(canvas.width / tileSize);
    const rows = Math.ceil(canvas.height / tileSize);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        p.push();
        p.translate(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);

        // pick a tile type
        const tileType = p.random([1, 2, 3]);

        if (tileType === 1) drawPetalTile(tileSize / 2, cream, sky);
        if (tileType === 2) drawDiamondTile(tileSize / 2, cream, sky);
        if (tileType === 3) drawArcTile(tileSize / 2, cream, sky);

        p.pop();
      }
    }
  }

  setup();
}
