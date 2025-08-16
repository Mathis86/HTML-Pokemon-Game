import Sprite from "./Sprite";
import type { Vec2 } from "./utils/Types";

const mapsDatas = import.meta.glob('./data/*.json', { eager: true }) as Record<string, MapData>;
const mapsImages = import.meta.glob('./assets/maps/*.png', { eager: true });

type MapOptions = {
   name: string,
   pos: Vec2,
   ctx: CanvasRenderingContext2D
}

type MapData = {
   height: number,
   width: number,
   layers: { data: number[], name: string }[]
}

export default class Map {
   #sprite: Sprite;
   #collisions: boolean[][];
   #name: string;

   constructor({ name, pos, ctx }: MapOptions) {
      // Check if PNG map exists
      if (!mapsImages[`./assets/maps/${name}.png`]) throw new Error("PNG image for map '" + name + "' doesn't exist.");

      const image = new Image();
      image.src = `./src/assets/maps/${name}.png`;

      this.#name = name;
      this.#sprite = new Sprite({ pos, image, ctx });
      this.#collisions = this.#getCollisions2D();      
   }

   move(direction: Vec2): void {
      this.#sprite.pos.x += direction.x;
      this.#sprite.pos.y += direction.y;
   }

   update(): void {
      this.#sprite.draw();
   }

   #getCollisions2D(): boolean[][] {
      const mapData = mapsDatas[`./data/${this.#name}.json`];

      // Check if JSON map exists
      if (!mapData) throw new Error("JSON data for map '" + this.#name + "' doesn't exist.");

      // Get collisions layer
      const collisions = mapData.layers.find(l => l.name.toLowerCase() === "collisions");

      // If no collisions on this map
      if (!collisions) return [[]];

      // Collisions 2D array creation
      const collisions2D = [];
      for (let i = 0; i < mapData.height; i++) {
         const subArray = []
         for (let j = 0; j < mapData.width; j++) {
            subArray.push(collisions.data[i * mapData.width + j] !== 0)
         }
         collisions2D.push(subArray)
      }

      return collisions2D;
   }

   get sprite(): Sprite {
      return this.#sprite;
   }
}