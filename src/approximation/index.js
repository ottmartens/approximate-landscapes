import draw from './draw';

import { Polynomial } from '../utils/polynomial';

/*
polynomial = {
    coefficients: [Number],
    color: 0-255
}
*/

export function startApproximation(baseImage, setApproximationImage) {
	setApproximationImage({
		src: baseImage.src,
	});

	const polynomials = [new Polynomial()];

	console.log(polynomials);
}
