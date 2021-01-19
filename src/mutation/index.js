import { generateColorMutants } from './color';
import { generateCoefficientsMutants } from './coefficients';
import { generateLimitsMutants } from './limits';

export function getAllMutants(currentPolynomial, fixedPolynomials) {
	let mutants = [];

	const colorMutants = generateColorMutants(currentPolynomial);
	const coefficientsMutants = generateCoefficientsMutants(currentPolynomial);
	// const limitsMutants = generateLimitsMutants(currentPolynomial);

	[...colorMutants, ...coefficientsMutants /* , ...limitsMutants */].forEach(
		(mutantPolynomial) => {
			// Add the mutated polynomial to existing polynomials
			mutants.push(fixedPolynomials.concat(mutantPolynomial));
		}
	);

	// mutants.push(fixedPolynomials.concat(currentPolynomial)); // Add the current state as well

	return mutants;
}
