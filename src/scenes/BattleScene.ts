import type { GameClient } from '../adapters/GameClient.ts';

export interface Asset { dispose(): void; }
export interface KeyInput {
  addEventListener(type: 'keydown', listener: () => void): void;
  removeEventListener(type: 'keydown', listener: () => void): void;
}

export class BattleScene {
  private input: KeyInput;
  private client: GameClient;
  private load: () => Promise<Asset>;
  private disposed = false;
  private asset?: Asset;
  private onKey = () => this.client.attack();

  constructor(input: KeyInput, client: GameClient, load: () => Promise<Asset>) {
    this.input = input;
    this.client = client;
    this.load = load;
  }

  create(): Promise<void> {
    this.input.addEventListener('keydown', this.onKey);
    return this.initialize();
  }

  private async initialize(): Promise<void> {
    const resolved = await this.load();
    if (this.disposed) {
      resolved.dispose();
      return;
    }
    this.asset = resolved;
    this.client.ready();
  }

  shutdown(): void {
    this.disposed = true;
    this.input.removeEventListener('keydown', this.onKey);
    this.asset?.dispose();
    this.asset = undefined;
  }
}
