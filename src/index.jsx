import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';

import './style.css';

import { fetchImageFromUrl } from './utils/image';
import { translateCanvasContext } from './utils/draw';
import { startApproximation } from './approximation';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from './constants';

const DEFAULT_BASE_IMAGE_URL =
	//'https://djburrill.github.io/assets/images/normal_pt_2.png'
	//'https://thumbs.dreamstime.com/b/trees-horizont-black-white-photo-39533594.jpg';
	'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Neckertal_20150527-6384.jpg/2560px-Neckertal_20150527-6384.jpg';


function FileInput() {
	return (
		<>
			<input type='file' onChange={() => console.log('handle me!')} />
			<span>or use default image:</span>
		</>
	);
}

function Image({ src }) {
	return <img src={src} alt='' />;
}

function StartButton({ started, setStarted }) {
	return (
		<button id={"startButton"} onClick={() => setStarted(!started)}>
			{started ? 'stop' : 'start'}
		</button>
	);
}

function Canvas({ canvasRef }) {
	return <canvas ref={canvasRef} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />;
}

function App() {
	const [started, setStarted] = useState(false);

	const [baseImage, setBaseImage] = useState(null);
	/* 
    image type = {
        src: object,                       The image file to pass into the <img> element
        log: () => void,                   Helper method to log the image
        getPixel: (x, y) => { r, g, b, a}  Returns {r, g, b, a} of the pixel at specified coordinates (x, y)
    }
    */

	const canvasRef = useRef(null);
	const canvas = canvasRef.current;

	useEffect(() => {
		async function fetchBaseImage() {
			setBaseImage(await fetchImageFromUrl(DEFAULT_BASE_IMAGE_URL)); // Load the default image
		}

		fetchBaseImage();
	}, []);

	useEffect(() => {
		if (canvasRef.current) {
			translateCanvasContext(canvasRef.current);
		}
	}, [canvasRef]);

	useEffect(() => {
		baseImage && baseImage.log();

		if (started && baseImage) {
			startApproximation(baseImage, canvas); // start the approximation if start button clicked (or new image selected)
		}
		// eslint-disable-next-line
	}, [started, baseImage]);

	return (
		<>
			<FileInput />
			<Image src={baseImage?.src} />

			{baseImage && <StartButton started={started} setStarted={setStarted} />}

			<Canvas canvasRef={canvasRef} />
		</>
	);
}

ReactDom.render(<App />, document.getElementById('root'));
