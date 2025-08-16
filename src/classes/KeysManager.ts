

export default class KeysManager {
   #keys: string[];

   #keysOrder: string[];

   constructor() {
      this.#keys = ['z', 'q', 's', 'd'];

      this.#keysOrder = [];
   }

   keydown(key: string): void {
      const keys = this.#keys;
      const keysOrder = this.#keysOrder;

      if (!keys.includes(key) || keysOrder.includes(key)) return;

      keysOrder.push(key);
   }

   keyup(key: string): void {
      const keys = this.#keys;

      if (!keys.includes(key)) return;

      this.#keysOrder = this.#keysOrder.filter(k => k !== key);
   }

   isLastPressed(key: string): boolean {
      return this.#keysOrder.length > 0 && this.#keysOrder[this.#keysOrder.length - 1] === key;
   }
}