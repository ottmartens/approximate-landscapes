let baseImage;

let imageGraphics;
let approximationGraphics;

const canvasWidth = 400;
const canvasHeight = 300;

// global Processing functions

//     setup
//     draw
//     noLoop
//     loadImage
//     get          returns the color value in [r,g,b,a] of a pixel in specified coordinate
//     pixelDensity
//

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	imageGraphics = createGraphics(canvasWidth, canvasHeight / 2);
	approximationGraphics = createGraphics(canvasWidth, canvasHeight / 2);

	imageGraphics.background(baseImage);
	imageGraphics.filter(GRAY);

	image(imageGraphics, 0, 0);

	startApproximation();
}

function preload() {
	baseImage = loadImage(
		'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Neckertal_20150527-6384.jpg/2560px-Neckertal_20150527-6384.jpg'
	);
}

function draw(polynomes = []) {
	for (const polynome of polynomes) {
		drawPolynome(polynome);
	}

	image(approximationGraphics, 0, height / 2);

	comparePictures();
	noLoop();
}

function comparePictures() {
	const pxDensity = pixelDensity();

	const treshold = 100;
	let matchAmount = 0;

	for (let x = 0; x < width; x += 100) {
		for (let y = 0; y < height / 2; y += 100) {
			const i = 4 * pxDensity * (y * pxDensity * width + x);

			imageGraphics.loadPixels();
			const imageGraphicsPixel = {
				r: imageGraphics.pixels[i],
				g: imageGraphics.pixels[i + 1],
				b: imageGraphics.pixels[i + 2],
			};

			approximationGraphics.loadPixels();
			const approximationGraphicsPixel = {
				r: approximationGraphics.pixels[i],
				g: approximationGraphics.pixels[i + 1],
				b: approximationGraphics.pixels[i + 2],
			};

			if (
				imageGraphicsPixel.r >= approximationGraphicsPixel.r - treshold &&
				imageGraphicsPixel.r <= approximationGraphicsPixel.r + treshold &&
				imageGraphicsPixel.g >= approximationGraphicsPixel.g - treshold &&
				imageGraphicsPixel.g <= approximationGraphicsPixel.g + treshold &&
				imageGraphicsPixel.b >= approximationGraphicsPixel.b - treshold &&
				imageGraphicsPixel.b <= approximationGraphicsPixel.b + treshold
			) {
				matchAmount++;
			}
		}
	}

	console.log(
		`The match rate is ${
			matchAmount / (imageGraphics.pixels.length / (100 * 100))
		}`
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
	approximationGraphics.stroke(polynome.stroke);

	for (let x = 0; x < width; x++) {
		y = evaluatePolynomeAtX(polynome, x);

		/* y >= 0 &&  */ approximationGraphics.line(x, 0, x, y);
	}
}

async function startApproximation() {
	// for (let i = 0; i < 10; i++) {
	await sleep(100);

	p1.coefficients[0] += 1;
	p2.coefficients[0] += 1;

	p1.coefficients[2] += 0.0001;
	p2.coefficients[2] += 0.0001;

	draw([p1, p2]);
	// }
}

async function sleep(milliseconds) {
	return new Promise((resolve) => setTimeout(() => resolve(), milliseconds));
}
