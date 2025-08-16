const canvas = document.getElementById("canvas");
if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw new Error("Canvas doesn't exist.");

const c = canvas.getContext('2d');
if (!c) throw new Error("Can't get 2D context from canvas.")

// Resizing canvas to fit user screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

// Display game "town" map
const image = new Image();
image.src = './assets/maps/town.png';

image.onload = () => {
  c.imageSmoothingEnabled = false;
}

let x = -canvas.width / 2;
let y = -canvas.height / 2

function animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, x, y, image.width * 4, image.height * 4);
  requestAnimationFrame(() => animate(ctx, canvas));
}

animate(c, canvas)

window.addEventListener('keypress', (e) => {
  switch (e.key) {
    case "z":
      y += 10;
      break;

    case "q":
      x += 10;
      break;

    case "s":
      y -= 10;
      break;

    case "d":
      x -= 10;
      break;

    default:
      break;
  }
})