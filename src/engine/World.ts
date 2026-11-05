import { ATTACK_SCORE } from './constants/combat.ts';

export class World {
  score = 0;

  attack(): void {
    this.score += ATTACK_SCORE;
  }
}
