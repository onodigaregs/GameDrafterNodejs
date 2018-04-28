"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.send("Welcome to the api, I'm up and running.");
});
exports.default = router;
//# sourceMappingURL=index.js.map