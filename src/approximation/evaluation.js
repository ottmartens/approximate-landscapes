import { sampleNRandomPoints } from '../utils/sampling';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../constants';
import {
	distanceBetweenRGB,
	grayScaleToRGB,
} from '../utils/color';

const PERCENT_OF_POINTS_TO_SAMPLE = 0.1;

const NUMBER_OF_POINTS_TO_SAMPLE = Math.round(
	(IMAGE_WIDTH * IMAGE_HEIGHT) * (PERCENT_OF_POINTS_TO_SAMPLE/100)
);

export function evaluateMutants(mutants, baseImage) {
	const sampledPoints = sampleNRandomPoints(NUMBER_OF_POINTS_TO_SAMPLE, {
		xMax: IMAGE_WIDTH,
		yMax: IMAGE_HEIGHT,
	});

	const colorsInBaseImage = sampledPoints.map(([x, y]) =>
		baseImage.getPixel(x, y)
	);

	let bestMutant;
	let smallestDistance = Infinity;

	mutants.forEach((mutant) => {
		let totalDistance = 0;

		sampledPoints.forEach(([x, y], index) => {
			const colorInMutation = evaluateOverlaidPolynomialsAtPoint(mutant, {
				x,
				y,
			});

			const realColor = colorsInBaseImage[index];

			totalDistance += distanceBetweenRGB(realColor, colorInMutation);
		});

		totalDistance /= sampledPoints.length;

		if (totalDistance < smallestDistance) {
			bestMutant = mutant;
			smallestDistance = totalDistance;
		}
	});

	return { bestMutant, approximationRatio: smallestDistance };
}

function evaluateOverlaidPolynomialsAtPoint(polynomials, { x, y }) {
	let currentColor = [255, 255, 255];

	polynomials.forEach((polynomial) => {
		const value = polynomial.evaluateAtX(x);

		if (value >= y) {
			// We color the area under the polynomial curve
			//Which polynomials' color should we be returning? 
			currentColor = polynomial.color;
		}
	});

	return currentColor;
}
