let img;
let img2;
let pg1;
let pg2;

function setup() {
  createCanvas(400, 400);
  //translate(0, 200);
  //scale(1, -1);

  pg1 = createGraphics(width, height / 2);
  pg2 = createGraphics(width, height / 2);

  //img.resize(width,0);
  pg1.background(img);
  //pg2.background(img2);

  pg1.filter(GRAY);
  console.log(get(50, 50));

  draw([p1, p2]);
}

function preload() {
  img = loadImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Neckertal_20150527-6384.jpg/2560px-Neckertal_20150527-6384.jpg"
  );
  img2 = loadImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Neckertal_20150527-6384.jpg/2560px-Neckertal_20150527-6384.jpg"
  );
}

function draw(polynomes = []) {
  for (const polynome of polynomes) {
    drawPolynome(polynome);
  }

  image(pg1, 0, 0);
  image(pg2, 0, height / 2);
  comparePictures();
  noLoop();
}

function comparePictures() {
  const d = pixelDensity();
  console.log(d);

  const treshold = 100;
  let matchAmount = 0;

  for (let x = 0; x < width; x += 100) {
    for (let y = 0; y < height / 2; y += 100) {
      const i = 4 * d * (y * d * width + x);
      pg1.loadPixels();
      const pg1Pixel = {
        r: pg1.pixels[i],
        g: pg1.pixels[i + 1],
        b: pg1.pixels[i + 2],
      };

      pg2.loadPixels();
      const pg2Pixel = {
        r: pg2.pixels[i],
        g: pg2.pixels[i + 1],
        b: pg2.pixels[i + 2],
      };

      if (
        pg1Pixel.r >= pg2Pixel.r - treshold &&
        pg1Pixel.r <= pg2Pixel.r + treshold &&
        pg1Pixel.g >= pg2Pixel.g - treshold &&
        pg1Pixel.g <= pg2Pixel.g + treshold &&
        pg1Pixel.b >= pg2Pixel.b - treshold &&
        pg1Pixel.b <= pg2Pixel.b + treshold
      ) {
        matchAmount++;
      }
      /* 			const i = 4 * d * (y * d * width + x);
			const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]; // get colors
			//console.log([r,g,b])
			if (r <= 80 && b <= 80 && g <= 80) {
				// if r g b all less than 80 then color will appear black
				noStroke();
				fill(255, 0, 0);
				ellipse(x, y, 1);
			} */
    }
  }

  console.log(
    `The match rate is ${matchAmount / (pg1.pixels.length / (100 * 100))}`
  );
}

p1 = {
  coefficients: [0, 0.5, 0],
  stroke: 100,
};

p2 = {
  coefficients: [50, -0.3, 0],
  stroke: 120,
};

function evaluatePolynomeAtX(polynome, x) {
  let result = 0;

  polynome.coefficients.forEach((coeff, index) => {
    const degree = index;

    const degreeValue = coeff * Math.pow(x, degree);

    result += degreeValue;
  });

  return result;
}

function drawPolynome(polynome) {
  pg2.stroke(polynome.stroke);

  for (let x = 0; x < width; x++) {
    y = evaluatePolynomeAtX(polynome, x);

    /* y >= 0 &&  */ pg2.line(x, 0, x, y);
  }
}

async function l00p() {
  //translate(0, 200);
  //scale(1, -1);

  for (let i = 0; i < 100; i++) {
    await new Promise((resolve) => setTimeout(() => resolve(), 100));

    p1.coefficients[0] += 1;
    p2.coefficients[0] += 1;

    p1.coefficients[2] += 0.0001;
    p2.coefficients[2] += 0.0001;

    draw([p1, p2]);
  }
}

//setTimeout(() => l00p(), 100);
