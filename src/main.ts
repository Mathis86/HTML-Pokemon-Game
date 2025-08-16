import KeysManager from "./KeysManager";
import Map from "./Map";

// Init canvas and context
const canvas = document.getElementById("canvas");
if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw new Error("Canvas doesn't exist.");

const c = canvas.getContext('2d');
if (!c) throw new Error("Can't get 2D context from canvas.")

// Resizing canvas to fit user screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Disable smoothing for perfect pixels
c.imageSmoothingEnabled = false;


// Display "town" map
const townMap = new Map({
  name: "town",
  pos: { x: -canvas.width / 2, y: -canvas.height / 2 },
  ctx: c
});

const KM = new KeysManager();

function animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
  // Loop (~60 FPS)
  requestAnimationFrame(() => animate(ctx, canvas));

  // Move map
  if (KM.isLastPressed("z")) townMap.move({ x: 0, y: 2});
  else if (KM.isLastPressed("q")) townMap.move({ x: 2, y: 0});
  else if (KM.isLastPressed("s")) townMap.move({ x: 0, y: -2});
  else if (KM.isLastPressed("d")) townMap.move({ x: -2, y: 0});

  // Update map (redraw map's sprite)
  townMap.update();
}

animate(c, canvas)

window.addEventListener('keydown', (e) => {
  KM.keydown(e.key);
});

window.addEventListener('keyup', (e) => {
  KM.keyup(e.key);
})