import { Character } from "./character.model";
export class DraftItem {
  character: Character
  isBanned: boolean;
  isPicked: boolean;
  isDisabled: boolean;
}
