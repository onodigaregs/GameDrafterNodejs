import { ICharacterFactory } from "../interfaces/ICharacterFactory";
import { Character } from '../models/Character';
var fs = require('fs');


export class CharacterFactory implements ICharacterFactory {
    GameName: string;
    constructor() {
     
    }

    getCharacters(gameName: string): Character[] {
        var content = fs.readFileSync('./gamedata/' + gameName + '.json');      

        return JSON.parse(content);
    }
}