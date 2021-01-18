import draw from '../utils/draw';
import { Polynomial } from '../utils/polynomial';
import { getAllMutants } from '../mutation';
import { evaluateMutants } from './evaluation';
import { cloneDeep } from 'lodash';

/*
polynomial = {
    coefficients: [Number],
    color: 0-255, (for now)
    appliedMutations: [String]
}
*/

const MAX_ROUNDS = 1000;

let NUM_ROUNDS;

export async function startApproximation(baseImage, canvas) {
	NUM_ROUNDS = 0;
	let polynomials = [new Polynomial()];
	let fixedPolynomials = [];

	let currentDistance = Infinity;
	const button = document.getElementById("startButton")
	while (NUM_ROUNDS < MAX_ROUNDS) {
		if (button.textContent === "start") break;
		const mutants = getAllMutants(polynomials, fixedPolynomials);

		mutants.push(polynomials); // Add the current mutation as well

		const { bestMutant, approximationRatio } = evaluateMutants(
			mutants,
			baseImage
		);

		if (NUM_ROUNDS % 50 === 0) {
		//if (approximationRatio >= currentDistance) {
			if (fixedPolynomials.length>=10) {
				console.log('Current state is most optimal, stopping');
				break;
			}

			fixedPolynomials = cloneDeep(bestMutant);
			console.log("Adding a new polynomial");
			console.log("Current amount is " + fixedPolynomials.length);
			console.log("The final polynome:")
			console.log(bestMutant[bestMutant.length-1])
			bestMutant.push(new Polynomial());
		}

		currentDistance = approximationRatio;

		draw(canvas, bestMutant);	
		
		polynomials = [bestMutant[bestMutant.length-1]];

		NUM_ROUNDS++;

		await new Promise((resolve) => setTimeout(resolve, 100));
	}
}
