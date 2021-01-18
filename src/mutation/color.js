import { cloneDeep } from 'lodash';

const COLOR_STEP_SIZE = 10;

export function generateColorMutants(polynomial) {
	let mutantPolynomials = [];

	colorMutations.forEach((mutation) => {
		const [r, g, b] = polynomial.color;
		const color = { r, g, b };
		if (mutation.isValid(color)) {
			const { newValue, appliedMutatation } = mutation.execute(color);

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
	{
		name: 'darken',
		isValid: (color) => {
			const { r, g, b } = color;

			return [r, g, b].every((channel) => channel - COLOR_STEP_SIZE >= 0);
		},
		execute: (color) => {
			return {
				newValue: [
					color.r - COLOR_STEP_SIZE,
					color.g - COLOR_STEP_SIZE,
					color.b - COLOR_STEP_SIZE,
				],
				appliedMutatation: `decreased all color channels by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'lighten',
		isValid: (color) => {
			const { r, g, b } = color;

			return [r, g, b].every((channel) => channel + COLOR_STEP_SIZE <= 255);
		},
		execute: (color) => {
			return {
				newValue: [
					color.r + COLOR_STEP_SIZE,
					color.g + COLOR_STEP_SIZE,
					color.b + COLOR_STEP_SIZE,
				],
				appliedMutatation: `increased all color channels by ${COLOR_STEP_SIZE}`,
			};
		},
	},
	{
		name: 'invert color',
		isValid: () => {
			return true;
		},
		execute: (color) => {
			return {
				newValue: [255 - color.r, 255 - color.g, 255 - color.b],
				appliedMutatation: `inverted all color channels`,
			};
		},
	},
	{
		name: 'invert red channel',
		isValid: () => {
			return true;
		},
		execute: (color) => {
			return {
				newValue: [255 - color.r, color.g, color.b],
				appliedMutatation: `inverted red channel`,
			};
		},
	},
	{
		name: 'invert green channel',
		isValid: () => {
			return true;
		},
		execute: (color) => {
			return {
				newValue: [color.r, 255 - color.g, color.b],
				appliedMutatation: `inverted green channel`,
			};
		},
	},
	{
		name: 'invert blue channel',
		isValid: () => {
			return true;
		},
		execute: (color) => {
			return {
				newValue: [color.r, color.g, 255 - color.b],
				appliedMutatation: `inverted blue channel`,
			};
		},
	},
];
