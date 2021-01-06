let canvas = document.getElementById('canvas').getContext('2d');

p1 = {
	coefficients: [100, -5, 0.05],
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
	for (let x = 0; x < 200; x++) {
		y = evaluatePolynomeAtX(polynome, x);

		canvas.moveTo(x, 0);
		canvas.lineTo(x, y);

		canvas.stroke();
	}
}

canvas.translate(0, 200)
canvas.scale(1, -1);


drawPolynome(p1);
