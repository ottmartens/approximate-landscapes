function setup() {
	createCanvas(200, 200);
	translate(0, 200);
	scale(1, -1);
}

function draw(polynomes = []) {
	for (const polynome of polynomes) {
		drawPolynome(polynome);
	}

	noLoop();
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
	stroke(polynome.stroke);

	for (let x = 0; x < 200; x++) {
		y = evaluatePolynomeAtX(polynome, x);

		line(x, 0, x, y);
	}
}

async function l00p() {
	translate(0, 200);
	scale(1, -1);

	for (let i = 0; i < 100; i++) {
		await new Promise((resolve) => setTimeout(() => resolve(), 100));

		p1.coefficients[0] += 1;
        p2.coefficients[0] += 1;
        
        p1.coefficients[2] += 0.0001
        p2.coefficients[2] += 0.0001

		draw([p1, p2]);
	}
}

setTimeout(() => l00p(), 100);
