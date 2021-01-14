export function getGrayscaleColorString(color, alpha = 1) {
	return `rgba(${color}, ${color}, ${color}, ${alpha})`;
}

export function grayScaleToRGBA(color, alpha = 1) {
	return [color, color, color, alpha];
}

export function addRGBAColors(color1, color2) {
	const [r1, g1, b1, a1] = color1;
	const [r2, g2, b2, a2] = color2;

	// Overlay color 1 with color 2
	// The order matters!!

	// Based on this
	// https://stackoverflow.com/questions/18900598/how-to-combine-two-colors-with-varying-alpha-values

	const a = (1 - a2) * a1 + a2;

	const r = ((1 - a2) * a1 * r1 + a2 * r2) / a;

	const g = ((1 - a2) * a1 * g1 + a2 * g2) / a;

	const b = ((1 - a2) * a1 * b1 + a2 * b2) / a;

	return [r, g, b, a];
}

export function distanceBetweenColors(color1, color2) {
	let [r1, g1, b1, a1] = color1;
	let [r2, g2, b2, a2] = color2;

	r1 /= 255;
	g1 /= 255;
	b1 /= 255;

	r2 /= 255;
	g2 /= 255;
	b2 /= 255;

	const squared = (x) => x * x;

	return (
		Math.max(squared(r1 - r2), squared(r1 - r2 - a1 + a2)) +
		Math.max(squared(g1 - g2), squared(g1 - g2 - a1 + a2)) +
		Math.max(squared(b1 - b2), squared(b1 - b2 - a1 + a2))
	);
}

export function distanceBetweenColors2(color1, color2) {
	// Based on
	// https://stackoverflow.com/a/47586402/12043472

	const [r1, g1, b1, a1] = color1;
	const [r2, g2, b2, a2] = color2;

	const deltaR = r1 - r2;
	const deltaG = g1 - g2;
	const deltaB = b1 - b2;

	const deltaAlpha = a1 - a2;

	const rgbDistanceSquared =
		(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB) / 3.0;

	return (
		(deltaAlpha * deltaAlpha) / 2.0 +
		(rgbDistanceSquared * a1 * a2) / (255 * 255)
	);
}
