const cursor = document.querySelector('#cursor');
let hue = 0;
const mouse = {
    x: undefined,
    move: false
}

const currentPosition = {
    x: 0
}

addEventListener('mousemove', function(e){
    handleCursor(e);
    slide(e);
});

addEventListener('mousedown', function(e){
    mouse.x = e.clientX;
    mouse.move = true;
});

addEventListener('mouseup', function(e){
    mouse.move = false;
});

function handleCursor(e){
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.background = `hsl(${hue++}deg, 100%, 50%)`;
}

function slide(e){
    if(!mouse.move) return;
    const container = document.querySelector('#container');
    const images = document.querySelectorAll('.image img');
    const deltaX = e.clientX - mouse.x;
    let xPercent = (deltaX / (innerWidth / 2) * -100);
    console.log(xPercent);
    currentPosition.x += xPercent;
    currentPosition.x = Math.min(0, currentPosition.x);
    currentPosition.x = Math.max(-100, currentPosition.x);

    container.animate({
        translate: `${currentPosition.x}%`
    }, {
        fill: 'forwards',
        duration: 500
    });

    images.forEach(image => {
        image.animate({
            objectPosition: `${-currentPosition.x}%`
        }, {
            fill: 'forwards',
            duration: 100
        });
    });

    mouse.x = e.clientX;
}



const { promises: fs } = require('fs');
const dir = '/';

const getNumFiles = async (dir) => {
  const files = await fs.readdir(dir)
  console.log(files.length)
}
getNumFiles(dir)