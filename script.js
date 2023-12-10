const cursor = document.querySelector("#cursor");
const container = document.querySelector("#container");
let hue = 0;
const mouse = {
	x: undefined,
	move: false,
};

const currentPosition = {
	x: 0,
};

addEventListener("resize", function (e) {
	if (innerWidth <= 1250) {
		container.style.translate = 0;
	}
});

addEventListener("mousemove", function (e) {
	if (innerWidth > 1250) {
		handleCursor(e);
		slide(e);
	}
});

addEventListener("mousedown", function (e) {
	mouse.x = e.clientX;
	mouse.move = true;
});

addEventListener("mouseup", function (e) {
	mouse.move = false;
});

function handleCursor(e) {
	cursor.style.top = `${e.clientY}px`;
	cursor.style.left = `${e.clientX}px`;
	cursor.style.background = `hsl(${hue++}deg, 100%, 50%)`;
}

function slide(e) {
	if (!mouse.move) return;
	const images = document.querySelectorAll(".image img");
	const deltaX = e.clientX - mouse.x;
	let xPercent = (deltaX / (innerWidth / 2)) * -100;
	console.log(xPercent);
	currentPosition.x += xPercent;
	currentPosition.x = Math.min(0, currentPosition.x);
	currentPosition.x = Math.max(-100, currentPosition.x);

	container.animate(
		{
			translate: `${currentPosition.x}%`,
		},
		{
			fill: "forwards",
			duration: 500,
		}
	);

	images.forEach((image) => {
		image.animate(
			{
				objectPosition: `${-currentPosition.x}%`,
			},
			{
				fill: "forwards",
				duration: 100,
			}
		);
	});

	mouse.x = e.clientX;
}

function generateEmoticons(num = 100){
    const emots = ['😂', '🤗', '🌟', '❤️', '😊', '😍', '🥳', '😁', '😎', '😏', '🫠', '😳', '😌', '🥰', '🦖', '🦕', '🐼', '💕', '😑', '🤤'];
    for(let i = 0; i < num; i++){
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.innerHTML = emots[~~(Math.random() * emots.length)];
        bubble.style.animationDelay = Math.random() * 10;
        bubble.style.animationDuration = (Math.random() * 5) + 5 + 's';
        bubble.style.left = Math.random() * innerWidth + 'px';
        document.body.append(bubble);
    }
}

generateEmoticons();

const musicIcons = document.querySelectorAll(".music-icon");
const audio = new Audio("audio/music.mp3");
musicIcons.forEach((icon) => {
	icon.addEventListener("click", function () {
		document.querySelector(".music-icon.none").classList.remove("none");

		if (icon.classList.contains("fa-volume-xmark")) {
			audio.play();
			icon.classList.add("none");
		} else {
			audio.pause();
			icon.classList.add("none");
		}
	});
});
