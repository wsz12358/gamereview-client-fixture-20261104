import test from 'node:test';
import assert from 'node:assert/strict';
import { EventBus } from '../src/kernel/EventBus.ts';
import { GameClient } from '../src/adapters/GameClient.ts';
import { BattleScene } from '../src/scenes/BattleScene.ts';
import type { Asset, KeyInput } from '../src/scenes/BattleScene.ts';
import { Hud } from '../src/ui/Hud.ts';

class FakeInput implements KeyInput {
  handlers = new Set<() => void>();
  addEventListener(_type: 'keydown', listener: () => void): void { this.handlers.add(listener); }
  removeEventListener(_type: 'keydown', listener: () => void): void { this.handlers.delete(listener); }
  press(): void { this.handlers.forEach(h => h()); }
}

test('one keypress attacks once after a scene transition', async () => {
  const input = new FakeInput(); const client = new GameClient(new EventBus());
  const load = async () => ({ dispose() {} });
  const old = new BattleScene(input, client, load); await old.create(); old.shutdown();
  const current = new BattleScene(input, client, load); await current.create();
  input.press(); assert.equal(client.score, 1); current.shutdown();
});

test('late-loaded asset is disposed without publishing readiness after shutdown', async () => {
  const bus = new EventBus(); const client = new GameClient(bus); const hud = new Hud(client, bus);
  let resolve!: (value: Asset) => void; let disposed = 0;
  const loading = new Promise<Asset>(done => { resolve = done; });
  const scene = new BattleScene(new FakeInput(), client, () => loading);
  const entered = scene.create(); scene.shutdown(); resolve({ dispose() { disposed++; } }); await entered;
  assert.equal(disposed, 1); assert.equal(hud.status, 'loading'); hud.dispose();
});

test('published ready event reaches the HUD consumer', () => {
  const bus = new EventBus(); const client = new GameClient(bus); const hud = new Hud(client, bus);
  client.ready(); assert.equal(hud.status, 'ready'); hud.dispose();
});

test('HUD reads the same game world through the adapter', () => {
  const bus = new EventBus(); const client = new GameClient(bus); const hud = new Hud(client, bus);
  client.attack(); assert.equal(hud.score, 1); hud.dispose();
});
