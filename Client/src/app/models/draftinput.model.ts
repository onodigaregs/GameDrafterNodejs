import { Character } from './character.model';
import { DraftAction } from './DraftActionList.model';

export class DraftInput {
  characters: Character[];
  action: string;
  playerName: string;
}
