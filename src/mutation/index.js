import { generateColorMutants } from './color';
import { generateCoefficientsMutants } from './coefficients';
import { cloneDeep } from 'lodash';

export function getAllMutants(currentPolynomial, fixedPolynomials, currentPolynomialIndex) {
	let mutants = [];

	const colorMutants = generateColorMutants(currentPolynomial);
	const coefficientsMutants = generateCoefficientsMutants(currentPolynomial);

	[...colorMutants, ...coefficientsMutants].forEach((mutantPolynomial) => {
		// Add the mutated polynomial to existing polynomials
		const mutatedPolynomials = cloneDeep(fixedPolynomials);
		mutatedPolynomials.splice(currentPolynomialIndex, 0, mutantPolynomial)
		mutants.push(mutatedPolynomials);
	});

	// mutants.push(fixedPolynomials.concat(currentPolynomial)); // Add the current state as well

	return mutants;
}
