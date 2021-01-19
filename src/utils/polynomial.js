const BASE_COEFFICIENTS = [100, 0.01, 0.0002, 0.000001];
const DEFAULT_COLOR = [200, 200, 200];
export function Polynomial(color = DEFAULT_COLOR) {
	this.coefficients = BASE_COEFFICIENTS;
	// this.xLimits = [-200, 200];
	this.color = color;
	this.appliedMutations = [];
}

Polynomial.prototype.evaluateAtX = function (x) {
	let result = 0;

	// x >= this.xLimits[0] &&
	// 	x <= this.xLimits[1] &&
	this.coefficients.forEach((coefficient, index) => {
		result += Math.pow(x, index) * coefficient;
	});

	return result;
};
