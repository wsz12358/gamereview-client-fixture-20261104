import { EventBus } from './kernel/EventBus.ts';
import { GameClient } from './adapters/GameClient.ts';
import { BattleScene } from './scenes/BattleScene.ts';
import { Hud } from './ui/Hud.ts';
import './style.css';

const bus = new EventBus();
const client = new GameClient(bus);
const hud = new Hud(client, bus);
const canvas = document.querySelector<HTMLCanvasElement>('#game')!;
const context = canvas.getContext('2d')!;
const score = document.querySelector('#score')!;
const status = document.querySelector('#status')!;
let scene: BattleScene;
let transitions = 0;

function enter(): void {
  scene?.shutdown();
  transitions += 1;
  scene = new BattleScene(window, client, async () => {
    await new Promise(resolve => setTimeout(resolve, 350));
    // A disposable resource stands in for a texture/audio handle.
    return { dispose() {} };
  });
  void scene.create().catch(() => { status.textContent = 'Resource error'; });
}

document.querySelector('#switch')!.addEventListener('click', () => { enter(); (document.activeElement as HTMLElement)?.blur(); });
function draw(): void {
  context.fillStyle = '#142b24'; context.fillRect(0, 0, 720, 360);
  context.strokeStyle = '#294639';
  for (let x = 0; x < 720; x += 40) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, 360); context.stroke(); }
  context.fillStyle = '#b9db9d'; context.fillRect(320 + Math.sin(client.score) * 80, 120, 70, 70);
  context.fillStyle = '#e6efe2'; context.font = '18px sans-serif'; context.fillText(`Battle scene ${transitions}`, 24, 40);
  context.fillStyle = '#8fa78e'; context.font = '14px sans-serif'; context.fillText('SPACE → ATTACK', 24, 320);
  score.textContent = `Score ${hud.score}`;
  status.textContent = hud.status;
  requestAnimationFrame(draw);
}
enter(); draw();
window.addEventListener('pagehide', () => { scene.shutdown(); hud.dispose(); }, { once: true });
