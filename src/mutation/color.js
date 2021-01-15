import { cloneDeep } from 'lodash';

const COLOR_STEP_SIZE = 10;

export function generateColorMutants(polynomial) {
	let mutantPolynomials = [];

	colorMutations.forEach((mutation) => {
		const [r,g,b] = polynomial.color;
		const color = {r, g, b}
		if (mutation.isValid(color)) {
			const { newValue, appliedMutatation } = mutation.execute(
				color	
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
		name: 'decreaseRed',
		isValid: (color) => {
			return color.r - COLOR_STEP_SIZE >= 0;
		},
		execute: (color) => {
			return {
				newValue: [color.r - COLOR_STEP_SIZE, color.g, color.b],
				appliedMutatation: `decreased red by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'increaseRed',
		isValid: (color) => {
			return color.r + COLOR_STEP_SIZE <= 255;
		},
		execute: (color) => {
			return {
				newValue: [color.r + COLOR_STEP_SIZE, color.g, color.b],
				appliedMutatation: `increased red by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'decreaseGreen',
		isValid: (color) => {
			return color.g - COLOR_STEP_SIZE >= 0;
		},
		execute: (color) => {
			return {
				newValue: [color.r, color.g - COLOR_STEP_SIZE, color.b],
				appliedMutatation: `decreased green by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'increaseGreen',
		isValid: (color) => {
			return color.g + COLOR_STEP_SIZE <= 255;
		},
		execute: (color) => {
			return {
				newValue: [color.r, color.g + COLOR_STEP_SIZE, color.b],
				appliedMutatation: `increased green by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'decreaseBlue',
		isValid: (color) => {
			return color.b - COLOR_STEP_SIZE >= 0;
		},
		execute: (color) => {
			return {
				newValue: [color.r, color.g, color.b - COLOR_STEP_SIZE],
				appliedMutatation: `decreased blue by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'increaseBlue',
		isValid: (color) => {
			return color.b + COLOR_STEP_SIZE <= 255;
		},
		execute: (color) => {
			return {
				newValue: [color.r, color.g, color.b + COLOR_STEP_SIZE],
				appliedMutatation: `increased blue by ${COLOR_STEP_SIZE}`,
			};
		},
	},
];
