import draw from '../utils/draw';
import { Polynomial } from '../utils/polynomial';
import { getAllMutants } from '../mutation';
import { evaluateMutants } from './evaluation';
import { cloneDeep } from 'lodash';

const ROUNDS_WITHOUT_PROGRESS_THRESHOLD = 20;

const MAX_POLYNOMES = 15;

export async function startApproximation(
	baseImage,
	canvas,
	isStopped,
	setCurrrentPolynomials
) {
	let fixedPolynomials = [];

	let currentPolynomial = new Polynomial();

	let bestRatioAchieved = Infinity;
	let roundsWithoutProgress = 0;
	let bestAchievedState = null;

	while (!isStopped.current) {
		const mutants = getAllMutants(currentPolynomial, fixedPolynomials);

		const { bestMutant, approximationRatio } = evaluateMutants(
			mutants,
			baseImage
		);

		currentPolynomial = bestMutant[bestMutant.length - 1];

		if (approximationRatio < bestRatioAchieved) {
			bestRatioAchieved = approximationRatio;
			roundsWithoutProgress = 0;
			bestAchievedState = cloneDeep(bestMutant);
		} else {
			roundsWithoutProgress++;

			if (roundsWithoutProgress === ROUNDS_WITHOUT_PROGRESS_THRESHOLD) {
				console.log('The final polynome:', currentPolynomial);

				if (fixedPolynomials.length >= MAX_POLYNOMES) {
					break;
				}

				// Persist current polynomial, start mutating new one
				fixedPolynomials = cloneDeep(bestAchievedState);
				console.log('Current polynomial count: ', fixedPolynomials.length);

				console.log('Adding a new polynomial');
				currentPolynomial = new Polynomial();

				// Reset count
				roundsWithoutProgress = 0;
				bestRatioAchieved = Infinity;
			}
		}

		setCurrrentPolynomials(cloneDeep(bestMutant));

		draw(canvas, bestMutant);

		await new Promise((resolve) => setTimeout(resolve, 20));
	}
}
