"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
class CharacterFactory {
    constructor() {
    }
    getCharacters(gameName) {
        var content = fs.readFileSync('./gamedata/' + gameName + '.json');
        let chars = this.jsonParse(content);
        return chars;
    }
    jsonParse(data) {
        let characters = JSON.parse(data);
        return characters;
    }
}
exports.CharacterFactory = CharacterFactory;
//# sourceMappingURL=characterFactory.js.map