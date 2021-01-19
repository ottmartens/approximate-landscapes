import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';

import './style.css';

import { fetchImageFromUrl } from './utils/image';
import { translateCanvasContext } from './utils/draw';
import { startApproximation } from './approximation';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from './constants';

const BASE_IMAGE_URLS = [
	'https://media-cdn.tripadvisor.com/media/photo-s/14/3e/a6/7b/beach.jpg',
	'https://i.imgur.com/8tDpnVL.png',
	'https://i.imgur.com/K82aewd.png',
	'https://ichef.bbci.co.uk/news/976/cpsprodpb/40F0/production/_104642661_3112ae2e-7f5b-4c8d-9fd0-a4bebcb372af.jpg',
	'https://i.imgur.com/0xJ3awl.png',
	'https://i.imgur.com/jZSOn8N.png',
];

function ImageSelection({ setBaseImageUrl }) {
	return (
		<div>
			{BASE_IMAGE_URLS.map((url) => (
				<img
					onClick={() => setBaseImageUrl(url)}
					className={'selectionImage'}
					alt=''
					src={url}
					key={url}
				/>
			))}
		</div>
	);
}

function Image({ src }) {
	return <img className={'baseimage'} src={src} alt='' />;
}

function StartButton({ started, setStarted }) {
	return (
		<button id={'startButton'} onClick={() => setStarted(!started)}>
			{started ? 'stop' : 'start'}
		</button>
	);
}

function Canvas({ canvasRef }) {
	return <canvas ref={canvasRef} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />;
}

function CurrentPolynomials({ currentPolynomials }) {
	return (
		<div className={'polynomialTexts'}>
			{currentPolynomials.reverse().map((polynomial, index) => {
				const [c0, c1, c2, c3] = polynomial.coefficients.map(
					(c) => Math.round(c * 1000000) / 1000000
				);
				const string = `${c0} + ${c1}x ${c2 > 0 ? '+ ' + c2 + 'x²' : ''}  ${
					c3 > 0 ? '+ ' + c2 + 'x³' : ''
				}`;

				return <div key={string + index}>{string}</div>;
			})}
		</div>
	);
}

function App() {
	const [started, setStarted] = useState(false);

	const [baseImage, setBaseImage] = useState(null);

	const [baseImageUrl, setBaseImageUrl] = useState(null);

	const [currentPolynomials, setCurrrentPolynomials] = useState(null);
	/* 
    image type = {
        src: object,                       The image file to pass into the <img> element
        log: () => void,                   Helper method to log the image
        getPixel: (x, y) => { r, g, b, a}  Returns {r, g, b, a} of the pixel at specified coordinates (x, y)
    }
    */

	const canvasRef = useRef(null);
	const canvas = canvasRef.current;

	const isStopped = useRef(true);

	useEffect(() => {
		async function fetchBaseImage() {
			setBaseImage(await fetchImageFromUrl(baseImageUrl)); // Load the default image
		}
		if (baseImageUrl) {
			isStopped.current = true;
			setStarted(false);
			fetchBaseImage(baseImageUrl);
		}
	}, [baseImageUrl]);

	useEffect(() => {
		if (canvasRef.current) {
			translateCanvasContext(canvasRef.current);
		}
	}, [canvasRef]);

	useEffect(() => {
		isStopped.current = !started;

		if (started && baseImage) {
			startApproximation(baseImage, canvas, isStopped, setCurrrentPolynomials); // start the approximation if start button clicked (or new image selected)
		}
		// eslint-disable-next-line
	}, [started, baseImage]);

	return (
		<>
			<span className={'helptext'}>Pick an image to approximate</span>
			<ImageSelection setBaseImageUrl={setBaseImageUrl} />
			<Image src={baseImage?.src} />
			{baseImage && <StartButton started={started} setStarted={setStarted} />}
			<Canvas canvasRef={canvasRef} />
			{currentPolynomials && (
				<CurrentPolynomials currentPolynomials={currentPolynomials} />
			)}
		</>
	);
}

ReactDom.render(<App />, document.getElementById('root'));
