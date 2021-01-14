import draw from '../utils/draw';

import { Polynomial } from '../utils/polynomial';

/*
polynomial = {
    coefficients: [Number],
    color: 0-255
}
*/

export function startApproximation(baseImage, canvas) {
	const polynomials = [ new Polynomial()];

	draw(canvas, polynomials);
}
