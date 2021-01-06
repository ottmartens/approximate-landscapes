//tweak of Code from Nick Parsons

let img;

function preload() {
	img = loadImage(
		'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Neckertal_20150527-6384.jpg/2560px-Neckertal_20150527-6384.jpg'
	);
}

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	image(img, 0, 0, width, height);
	loadPixels();
	const d = pixelDensity();

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const i = 4 * d * (y * d * width + x);
			const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]; // get colors
			//console.log([r,g,b])
			if (r <= 80 && b <= 80 && g <= 80) {
				// if r g b all less than 80 then color will appear black
				noStroke();
				fill(255, 0, 0);
				ellipse(x, y, 1);
			}
		}
	}
	noLoop();
}
