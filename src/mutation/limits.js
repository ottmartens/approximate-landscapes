import { cloneDeep } from 'lodash';

const LIMIT_STEP_SIZE = 20;

const LIMIT_LOWER_BOUND = -200 ;
const LIMIT_UPPER_BOUND = 200 ;

export function generateLimitsMutants(polynomial) {
	const { coefficients } = polynomial;
	const {xLimits} = polynomial;
	let mutantPolynomials = [];
	limitMutations.forEach((mutation) => {
		if (mutation.isValid(xLimits)) {
			const { newValue, appliedMutation } = mutation.execute(
				xLimits
			);

			const mutatedPolynomial = cloneDeep(polynomial);

			mutatedPolynomial.xLimits = newValue;
			mutatedPolynomial.appliedMutations.push(appliedMutation);

			mutantPolynomials.push(mutatedPolynomial);
		}
	});


	return mutantPolynomials;
}

const limitMutations = [
	{
		name: 'increase right limit',
		isValid: (xLimits) => {
			return xLimits[1] < LIMIT_UPPER_BOUND - LIMIT_STEP_SIZE
		},
		execute: (xLimits) => {
			const newValue =
				[xLimits[0], xLimits[1] + LIMIT_STEP_SIZE]

			return {
				newValue,
				appliedMutation: `increased right limit to ${newValue}`,
			};
		},
	},
	{
		name: 'decrease right limit',
		isValid: (xLimits) => {
			return xLimits[0] < xLimits[1] - LIMIT_STEP_SIZE
		},
		execute: (xLimits) => {
			const newValue =
				[xLimits[0], xLimits[1] - LIMIT_STEP_SIZE]

			return {
				newValue,
				appliedMutation: `decreased right limit to ${newValue}`,
			};
		},
	},
	{
		name: 'increase left limit',
		isValid: (xLimits) => {
			return xLimits[1] > xLimits[0] + LIMIT_STEP_SIZE
		},
		execute: (xLimits) => {
			const newValue =
				[xLimits[0] + LIMIT_STEP_SIZE, xLimits[1]]

			return {
				newValue,
				appliedMutation: `increased left limit to ${newValue}`,
			};
		},
	},
	{
		name: 'decrease left limit',
		isValid: (xLimits) => {
			return xLimits[0] > LIMIT_LOWER_BOUND + LIMIT_STEP_SIZE
		},
		execute: (xLimits) => {
			const newValue =
				[xLimits[0] - LIMIT_STEP_SIZE, xLimits[1]]

			return {
				newValue,
				appliedMutation: `decreased left limit to ${newValue}`,
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
