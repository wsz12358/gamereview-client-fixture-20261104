import { World } from '../engine/World.ts';
import { WORLD_READY } from '../contracts/constants/events.ts';
import type { EventBus } from '../kernel/EventBus.ts';

export class GameClient {
  private world = new World();
  private bus: EventBus;

  constructor(bus: EventBus) {
    this.bus = bus;
  }

  get score(): number { return this.world.score; }
  attack(): void { this.world.attack(); }
  ready(): void { this.bus.emit(WORLD_READY); }
}
