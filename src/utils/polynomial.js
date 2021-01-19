const BASE_COEFFICIENTS = [100, 0.01, 0.0002, 0.000001];

export function Polynomial(coefficients) {
	this.coefficients = coefficients || BASE_COEFFICIENTS;
	this.xLimits = [-200, 200];
	this.color = [200,200,200];
	this.appliedMutations = [];
}

Polynomial.prototype.evaluateAtX = function (x) {
	let result = 0;

	x >= this.xLimits[0] && x <= this.xLimits[1] && 
		this.coefficients.forEach((coefficient, index) => {
			result += Math.pow(x, index) * coefficient;
		});

	return result;
};
