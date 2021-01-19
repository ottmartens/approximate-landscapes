import draw from '../utils/draw';
import { Polynomial } from '../utils/polynomial';
import { getAllMutants } from '../mutation';
import { evaluateMutants } from './evaluation';
import { cloneDeep } from 'lodash';

const ROUNDS_WITHOUT_PROGRESS_THRESHOLD = 20;

const MAX_POLYNOMES = 100;

export async function startApproximation(baseImage, canvas, isStopped) {
	let fixedPolynomials = [];

	let currentPolynomial = new Polynomial();
	let currentPolynomialIndex = 0;

	let bestRatioAchieved = Infinity;
	let roundsWithoutProgress = 0;

	while (!isStopped.current) {
		const mutants = getAllMutants(currentPolynomial, fixedPolynomials);

		const { bestMutant, approximationRatio } = evaluateMutants(
			mutants,
			baseImage
		);

		currentPolynomial = bestMutant[currentPolynomialIndex];

		if (approximationRatio < bestRatioAchieved) {
			bestRatioAchieved = approximationRatio;
			roundsWithoutProgress = 0;
		} else {
			roundsWithoutProgress++;

			if (roundsWithoutProgress === ROUNDS_WITHOUT_PROGRESS_THRESHOLD) {
				console.log('The final polynome:', currentPolynomial);

				if (fixedPolynomials.length >= MAX_POLYNOMES) {
					break;
				}

				// Persist current polynomial, start mutating new one
				fixedPolynomials = cloneDeep(bestMutant);
				console.log('Current polynomial count: ', fixedPolynomials.length);

				console.log('Adding a new polynomial');
				currentPolynomial = new Polynomial();

				currentPolynomialIndex = Math.floor(Math.random()*fixedPolynomials.length)

				// Reset count
				roundsWithoutProgress = 0;
				bestRatioAchieved = Infinity;
			}
		}

		draw(canvas, bestMutant);

		await new Promise((resolve) => setTimeout(resolve, 20));
	}
}
