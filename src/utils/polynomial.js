const BASE_COEFFICIENTS = [10, 0.01, 0.0002, 0.000001];

export function Polynomial(coefficients) {
	this.coefficients = coefficients || BASE_COEFFICIENTS;
	this.color = 200;
	this.appliedMutations = [];
}

Polynomial.prototype.evaluateAtX = function (x) {
	let result = 0;

	this.coefficients.forEach((coefficient, index) => {
		result += Math.pow(x, index) * coefficient;
	});

	return result;
};
