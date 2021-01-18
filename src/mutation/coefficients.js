import { cloneDeep } from 'lodash';

const COEFFICIENT_MUTATION_STEPS_BY_DEGREE = {
	// How much to increase/decrease a coefficient of a specified degree in one step
	0: 10,
	1: 0.1,
	2: 0.0002,
	3: 0.000001,
};

const COEFFICIENT_LOWER_BOUNDS_BY_DEGREE = {
	0: 0,
	1: -10,
	2: -1,
	3: -0.005,
};

const COEFFICIENT_UPPER_BOUNDS_BY_DEGREE = {
	0: 400,
	1: 10,
	2: 1,
	3: 0.005,
};

export function generateCoefficientsMutants(polynomial) {
	const { coefficients } = polynomial;

	let mutantPolynomials = [];

	coefficients.forEach((coefficient, index) => {
		const degree = index;

		coefficientMutations.forEach((mutation) => {
			if (mutation.isValid(coefficient, degree)) {
				const { newValue, appliedMutation } = mutation.execute(
					coefficient,
					degree
				);

				const mutatedPolynomial = cloneDeep(polynomial);

				mutatedPolynomial.coefficients[degree] = newValue;
				mutatedPolynomial.appliedMutations.push(appliedMutation);

				mutantPolynomials.push(mutatedPolynomial);
			}
		});
	});

	return mutantPolynomials;
}

const coefficientMutations = [
	{
		name: 'increase coefficient',
		isValid: (coefficient, degree) => {
			const UPPER_BOUND = COEFFICIENT_UPPER_BOUNDS_BY_DEGREE[degree];

			const STEP_SIZE = COEFFICIENT_MUTATION_STEPS_BY_DEGREE[degree];

			return coefficient + STEP_SIZE <= UPPER_BOUND;
		},
		execute: (coefficient, degree) => {
			const newValue =
				coefficient + COEFFICIENT_MUTATION_STEPS_BY_DEGREE[degree];

			return {
				newValue,
				appliedMutation: `increased coefficient of x ** ${degree} to ${newValue}`,
			};
		},
	},
	{
		name: 'decrease coefficient',
		isValid: (coefficient, degree) => {
			const LOWER_BOUND = COEFFICIENT_LOWER_BOUNDS_BY_DEGREE[degree];

			const STEP_SIZE = COEFFICIENT_MUTATION_STEPS_BY_DEGREE[degree];

			return coefficient - STEP_SIZE >= LOWER_BOUND;
		},
		execute: (coefficient, degree) => {
			const newValue =
				coefficient - COEFFICIENT_MUTATION_STEPS_BY_DEGREE[degree];

			return {
				newValue,
				appliedMutation: `decreased coefficient of x ** ${degree} to ${newValue}`,
			};
		},
	},
/* 	{
		name: 'flip coefficient',
		isValid: (coefficient, degree) => {
			return true;
		},
		execute: (coefficient, degree) => {
			const newValue = -coefficient;

			return {
				newValue,
				appliedMutation: `flipped coefficient of x ** ${degree} to ${newValue}`,
			};
		},
	}, */

	// flip sign of coefficient?
];
