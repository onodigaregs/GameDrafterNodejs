"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET users listing.
 */
const express = require("express");
const characterFactory_1 = require("../factories/characterFactory");
const router = express.Router();
router.get('/', (req, res) => {
    res.send("Please specify a game name.");
});
router.get('/:gameName', (req, res) => {
    let name = req.params["gameName"];
    let characterFactory = new characterFactory_1.CharacterFactory();
    let characters = characterFactory.getCharacters(name);
    res.send(characters);
});
exports.default = router;
//# sourceMappingURL=characters.js.map