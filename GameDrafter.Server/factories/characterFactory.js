"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
class CharacterFactory {
    constructor() {
    }
    getCharacters(gameName) {
        var content = fs.readFileSync('./gamedata/' + gameName + '.json');
        return JSON.parse(content);
    }
}
exports.CharacterFactory = CharacterFactory;
//# sourceMappingURL=characterFactory.js.map