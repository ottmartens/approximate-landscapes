import { cloneDeep } from 'lodash';

const COLOR_STEP_SIZE = 10;

export function generateColorMutants(polynomial) {
	let mutantPolynomials = [];

	colorMutations.forEach((mutation) => {
		if (mutation.isValid(polynomial.color)) {
			const { newValue, appliedMutatation } = mutation.execute(
				polynomial.color
			);

			const mutant = cloneDeep(polynomial);

			mutant.color = newValue;
			mutant.appliedMutations.push(appliedMutatation);

			mutantPolynomials.push(mutant);
		}
	});

	return mutantPolynomials;
}

const colorMutations = [
	/*
    {
		name: string,
		isValid: () => boolean,
		execute: () => {
				        newValue,
				        appliedMutation: string
		            },
    },
    
    */

	{
		name: 'darken',
		isValid: (color) => {
			return color - COLOR_STEP_SIZE >= 0;
		},
		execute: (color) => {
			return {
				newValue: color - COLOR_STEP_SIZE,
				appliedMutatation: `decreased color by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'lighten',
		isValid: (color) => {
			return color + COLOR_STEP_SIZE <= 255;
		},
		execute: (color) => {
			return {
				newValue: color + COLOR_STEP_SIZE,
				appliedMutatation: `decreased color by ${COLOR_STEP_SIZE}`,
			};
		},
	},
];
