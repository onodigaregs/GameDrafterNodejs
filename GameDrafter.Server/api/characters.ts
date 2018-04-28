/*
 * GET users listing.
 */
import express = require('express');
import { CharacterFactory } from '../factories/characterFactory';
import { Character } from '../models/Character';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("Please specify a game name.");
});

router.get('/:gameName', (req: express.Request, res: express.Response) => {
    let name = req.params["gameName"];
    let characterFactory = new CharacterFactory();
    let characters: Character[] = characterFactory.getCharacters(name);
    res.send(characters);
});

export default router;