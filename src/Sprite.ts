import type { Vec2 } from "./Types";


type SpriteOptions = {
   pos: Vec2,
   image: HTMLImageElement,
   ctx: CanvasRenderingContext2D
}

export default class Sprite {
   #pos: Vec2;
   #image: HTMLImageElement;
   #ctx: CanvasRenderingContext2D;
   
   constructor({ pos, image, ctx }: SpriteOptions) {
      this.#pos = pos;
      this.#image = image;
      this.#ctx = ctx;
   }

   draw(): void {
      const img = this.#image;
      const pos = this.#pos;
      const c = this.#ctx;

      c.drawImage(img, pos.x, pos.y, img.width * 4, img.height * 4);
   }

   set pos(pos: Vec2) {
      this.#pos = pos;
   }

   get pos(): Vec2 {
      return this.#pos;
   }
}