import { sampleNRandomPoints } from '../utils/sampling';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../constants';
import { distanceBetweenRGB } from '../utils/color';

const PERCENT_OF_POINTS_TO_SAMPLE = 4;

const NUMBER_OF_POINTS_TO_SAMPLE = Math.round(
	IMAGE_WIDTH * IMAGE_HEIGHT * (PERCENT_OF_POINTS_TO_SAMPLE / 100)
);

export function evaluateMutants(mutants, baseImage) {
	let sampledPoints = sampleNRandomPoints(NUMBER_OF_POINTS_TO_SAMPLE, {
		xMax: IMAGE_WIDTH,
		yMax: IMAGE_HEIGHT,
	});

	const colorsInBaseImage = sampledPoints.map(([x, y]) =>
		baseImage.getPixel(x, IMAGE_HEIGHT - y)
	);

	let bestMutant;
	let smallestDistance = Infinity;

	sampledPoints = sampledPoints.map(([x, y]) => [x - 200, y]);

	mutants.forEach((mutant) => {
		let totalDistance = 0;

		sampledPoints.forEach(([x, y], index) => {
			const colorInMutation = evaluateOverlaidPolynomialsAtPoint(mutant, {
				x,
				y,
			});

			const realColor = colorsInBaseImage[index];

			totalDistance += /* y ** 10 * */ distanceBetweenRGB(realColor, colorInMutation);
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
	for (const polynomial of polynomials.reverse()) {
		const value = polynomial.evaluateAtX(x);
		if (value >= y) {
			// We have found the foremost polynomiual that colors this point
			return polynomial.color;
		}
	}

	return [255, 255, 255];
}
