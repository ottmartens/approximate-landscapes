import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { getGrayscaleColorString } from './color';

export default function draw(canvas, polynomials) {
	const context = canvas.getContext('2d');
	clearCanvas(context);

	polynomials.forEach((polynomial) => {
		drawPolynomial(context, polynomial);
	});
}

function drawPolynomial(context, polynomial) {
	const color = getGrayscaleColorString(polynomial.color, polynomial.opacity);

	context.fillStyle = color;

	context.moveTo(0, 0);

	for (let x = -(IMAGE_WIDTH / 2); x <= IMAGE_WIDTH / 2; x++) {
		const y = polynomial.evaluateAtX(x);

		drawPolynomialAtCoordinate(context, { x, y });
	}

	context.lineTo(IMAGE_WIDTH, 0);
	context.lineTo(0, 0);

	context.fill();

	// const pixels = context.getImageData(0, 0, 400, 200).data;
	// console.log(pixels);
}

function drawPolynomialAtCoordinate(context, { x, y }) {
	x += IMAGE_WIDTH / 2; // Translate to canvas coordinates

	context.lineTo(x, y);
}

function clearCanvas(context) {
	context.clearRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
}

export function translateCanvasContext(canvas) {
	const context = canvas.getContext('2d');

	context.translate(0, IMAGE_HEIGHT);
	context.scale(1, -1);
}
