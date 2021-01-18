import { cloneDeep } from 'lodash';

import { generateColorMutants } from './color';
import { generateCoefficientsMutants } from './coefficients';

export function getAllMutants(polynomials, fixedPolynomials) {
	let mutants = [];

	polynomials.forEach((polynomial, index) => {
		const colorMutants = generateColorMutants(polynomial);
		const coefficientsMutants = generateCoefficientsMutants(polynomial);

		[...colorMutants, ...coefficientsMutants].forEach((mutantPolynomial) => {
			// Clone the polynomials and replace one with a mutant
			//const mutant = cloneDeep(polynomials);

			//mutant[index] = mutantPolynomial;
			mutants.push((fixedPolynomials.concat(mutantPolynomial))); 
		});
	});

	// add a polynomial ? remove one? smth else?

	return mutants;
}
