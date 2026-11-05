import type { GameClient } from '../adapters/GameClient.ts';
import type { EventBus } from '../kernel/EventBus.ts';
import { UI_WORLD_READY } from './constants/events.ts';

export class Hud {
  status = 'loading';
  private client: GameClient;
  private unsubscribe: () => void;

  constructor(client: GameClient, bus: EventBus) {
    this.client = client;
    this.unsubscribe = bus.on(UI_WORLD_READY, () => { this.status = 'ready'; });
  }

  get score(): number { return this.client.score; }
  dispose(): void { this.unsubscribe(); }
}
