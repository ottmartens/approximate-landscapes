export function sampleNRandomPoints(n, { xMax, yMax }) {
	return Array.from(Array(100).keys()).map((i) => [i * 4, i * 2]);
}
