function getAverageRGB(imgEl) {
	let blockSize = 5; // only visit every 5 pixels
	let defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
	let canvas = document.createElement("canvas");
	let context = canvas.getContext && canvas.getContext("2d");
	let data;
	let width;
	let height;
	let i = -4;
	let length;
	let rgb = { r: 0, g: 0, b: 0 };
	let count = 0;

	if (!context) {
		return defaultRGB;
	}

	height = canvas.height =
		imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
	width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

	context.drawImage(imgEl, 0, 0);

	try {
		data = context.getImageData(0, 0, width, height);
	} catch (e) {
		/* security error, img on diff domain */
		return defaultRGB;
	}

	length = data.data.length;

	while ((i += blockSize * 4) < length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
	}

	// ~~ used to floor values
	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);

	return [rgb.r, rgb.g, rgb.b];
}

const getColor = () => {
	const root = document.querySelector(":root");
	const albumCover = document.getElementById("album-cover");
	const albumCoverColor = getAverageRGB(albumCover);
	root.style.setProperty(
		"--album-cover-color",
		`rgba(${albumCoverColor.join(",")})`,
	);
};

const albumCoverElement = document.getElementById("album-cover");

albumCoverElement.addEventListener("load", getColor());
albumCoverElement.removeEventListener("load", getColor());
albumCoverElement.addEventListener("load", getColor);

const observer = new MutationObserver((mutations) => {
	for (mutation of mutations) {
		if (mutation.target.id === "album-cover") {
			getColor();
		}
	}
});

const config = { attributes: true, attributeFilter: ["src"] };

observer.observe(albumCoverElement, config);

let avatar = true;
const changeImage = () => {
	console.log(avatar);
	if (avatar) {
		albumCoverElement.src = "../assets/placeholder.png";
		avatar = false;
	} else {
		albumCoverElement.src = "../assets/avatar.png";
		avatar = true;
	}
};
