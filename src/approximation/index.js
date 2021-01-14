import draw from '../utils/draw';
import { Polynomial } from '../utils/polynomial';
import { getAllMutants } from '../mutation';
import { evaluateMutants } from './evaluation';

/*
polynomial = {
    coefficients: [Number],
    color: 0-255, (for now)
    appliedMutations: [String]
}
*/

const MAX_ROUNDS = 100;

let NUM_ROUNDS;

export async function startApproximation(baseImage, canvas) {
	NUM_ROUNDS = 0;
	let polynomials = [new Polynomial([0, -1, 0])];

	let currentDistance = Infinity;

	while (NUM_ROUNDS < MAX_ROUNDS) {
		const mutants = getAllMutants(polynomials);

		mutants.push(polynomials); // Add the current mutation as well

		const { bestMutant, approximationRatio } = evaluateMutants(
			mutants,
			baseImage
		);

		console.log(approximationRatio);

		if (approximationRatio >= currentDistance) {
			console.log('Current state is most optimal, stopping');
			console.log(polynomials);

			break;
		}

		currentDistance = approximationRatio;

		polynomials = bestMutant;

		draw(canvas, polynomials);

		NUM_ROUNDS++;

		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	console.log(polynomials);
}
