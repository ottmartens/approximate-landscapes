import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import './style.css';

import { fetchImageFromUrl } from './utils/image';
import { startApproximation } from './approximation';

const DEFAULT_BASE_IMAGE_URL =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Neckertal_20150527-6384.jpg/2560px-Neckertal_20150527-6384.jpg';

function Image({ src }) {
	return <img src={src} alt='' />;
}

function FileInput() {
	return <input type='file' onChange={() => console.log('handle me!')} />;
}

function App() {
	const [baseImage, setBaseImage] = useState(null);
	const [approximationImage, setApproximationImage] = useState(null);
	/* 
    image type = {
        src: object,                       The image file to pass into the <img> element
        log: () => void,                   Helper method to log the image
        getPixel: (x, y) => { r, g, b, a}  Returns {r, g, b, a} of the pixel at specified coordinates (x, y)
    }
    */

	useEffect(() => {
		async function fetchBaseImage() {
			setBaseImage(await fetchImageFromUrl(DEFAULT_BASE_IMAGE_URL));
		}

		fetchBaseImage();
	}, []);

	useEffect(() => {
		if (baseImage) {
			startApproximation(baseImage, setApproximationImage);
		}
	}, [baseImage]);

	return (
		<>
			<FileInput />
			<Image src={baseImage && baseImage.src} />
			<Image src={approximationImage && approximationImage.src} />
		</>
	);
}

ReactDom.render(<App />, document.getElementById('root'));
