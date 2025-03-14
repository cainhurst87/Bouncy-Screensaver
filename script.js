const emoji = document.getElementById('emoji');
const container = document.getElementById('container-all');

let x = Math.random() * (container.clientWidth - emoji.clientWidth);
let y = Math.random() * (container.clientHeight - emoji.clientHeight);
let vx = 4; 
let vy = 4;

let currentIcon = -1;
let currentColor = -1;

let iconList = [
    'bi bi-emoji-sunglasses-fill',
    'bi bi-emoji-laughing-fill',
    'bi bi-emoji-heart-eyes-fill',
    'bi bi-emoji-dizzy-fill',
    'bi bi-emoji-kiss-fill',
    'bi bi-emoji-wink-fill'
];

let colorList = [
    'red',
    'blue',
    'green',
    'orange',
    'purple',
    'pink',
    'yellow'
];

// Wake Lock API to stop the screen from turning off
let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
        });
        console.log('Wake Lock is active');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

requestWakeLock();

/* Control Icon Movement and call Style Change on Wall Impact*/
function movement() {
    x += vx;
    y += vy;

    if (x <= 0 || x + emoji.clientWidth >= container.clientWidth){
        vx *= -1;
        changeStyle();
    }

    if (y <= 0 || y + emoji.clientHeight >= container.clientHeight){
        vy *= -1;
        changeStyle();
    }

    emoji.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(movement);
}

requestAnimationFrame(movement);

/* Style Change on Wall Impact */
function changeStyle(){

    const emoji = document.getElementById('emoji');
    let indexIcon;
    let indexColor;


    do {
        indexIcon = Math.floor(Math.random() * iconList.length);
    } while(
        currentIcon === indexIcon);

    currentIcon = indexIcon;


    do {
        indexColor = Math.floor(Math.random() * colorList.length); 
    } while(
        currentColor === indexColor);

    currentColor = indexColor;
    

    emoji.style.color = colorList[indexColor];
    emoji.className = iconList[indexIcon];
}



