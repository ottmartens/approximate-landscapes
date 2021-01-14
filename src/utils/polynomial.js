const BASE_COEFFICIENTS = [10, 0.01, 0.0002, 0.000001];

const DEFAULT_COEFFICIENTS = [BASE_COEFFICIENTS[0]];

export function Polynomial(coefficients) {
	this.coefficients = coefficients || DEFAULT_COEFFICIENTS;
    this.color = 125;
    this.opacity = 0.8;
	this.appliedMutations = [];
}

Polynomial.prototype.evaluateAtX = function (x) {
	let result = 0;

	this.coefficients.forEach((coefficient, index) => {
		result += Math.pow(x, index) * coefficient;
	});

	return result;
};

