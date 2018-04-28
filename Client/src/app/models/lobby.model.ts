import { Game } from './game.model';

export class Lobby {
  id: number;
  name: string;
  players: string[];
  isLocal: boolean;
  game: Game
  constructor() {
    //this.game = new Game();
  }
}
