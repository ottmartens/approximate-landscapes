import { sampleNRandomPoints } from '../utils/sampling';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../constants';
import {
	addRGBAColors,
	distanceBetweenColors,
	grayScaleToRGBA,
} from '../utils/color';

const PERCENT_OF_POINTS_TO_SAMPLE = 5;

const NUMBER_OF_POINTS_TO_SAMPLE = Math.round(
	(IMAGE_WIDTH * IMAGE_HEIGHT) / PERCENT_OF_POINTS_TO_SAMPLE
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
			const colorInMutation = evaluateBlendedPolynomialsAtPoint(mutant, {
				x,
				y,
			});

			const realColor = colorsInBaseImage[index];

			totalDistance += distanceBetweenColors(realColor, colorInMutation);
		});

		totalDistance /= sampledPoints.length;

		if (totalDistance < smallestDistance) {
			bestMutant = mutant;
			smallestDistance = totalDistance;
		}
	});

	return { bestMutant, approximationRatio: smallestDistance };
}

function evaluateBlendedPolynomialsAtPoint(polynomials, { x, y }) {
	let colorsToBlend = [];

	polynomials.forEach((polynomial) => {
		const value = polynomial.evaluateAtX(x);

		if (value >= y) {
			// We color the area under the polynomial curve
			const polynomialColor = grayScaleToRGBA(
				polynomial.color,
				polynomial.opacity
			);

			colorsToBlend.push(polynomialColor);
		}
	});

	return colorsToBlend.reduce(
		(resultColor, currentColor) => {
			return addRGBAColors(resultColor, currentColor);
		},
		[0, 0, 0, 0]
	);
}
