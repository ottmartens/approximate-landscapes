import Jimp from 'jimp';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../constants';

export async function fetchImageFromUrl(url) {
	const image = await Jimp.read(url);

	const resizedImage = image.resize(IMAGE_WIDTH, IMAGE_HEIGHT);

	return {
		src: await resizedImage.getBase64Async(Jimp.MIME_PNG),
		log: () => console.log(image),
		getPixel: (x, y) => {
			const hexColor = image.getPixelColor(x, y);

			return Jimp.intToRGBA(hexColor);
		},
	};
}
