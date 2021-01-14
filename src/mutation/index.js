import { cloneDeep } from 'lodash';

import { generateColorMutants } from './color';
import { generateCoefficientsMutants } from './coefficients';

export function getAllMutants(polynomials) {
	let mutants = [];

	polynomials.forEach((polynomial, index) => {
		console.log(polynomial);
		const colorMutants = generateColorMutants(polynomial);
		const coefficientsMutants = generateCoefficientsMutants(polynomial);

		[...colorMutants, ...coefficientsMutants].forEach((mutantPolynomial) => {
			const mutant = cloneDeep(polynomials);

			mutant[index] = mutantPolynomial;

			mutants.push(mutant);
		});
	});

	// add a polynomial ? remove one? smth else?

	return mutants;
}
