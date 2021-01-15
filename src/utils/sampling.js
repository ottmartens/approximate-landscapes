export function sampleNRandomPoints(n, { xMax, yMax }) {
  return Array.from({ length: n }).map(() => [
    Math.floor(Math.random() * xMax),
    Math.floor(Math.random() * yMax),
  ]);
}
