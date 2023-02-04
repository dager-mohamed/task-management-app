"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const index_1 = __importDefault(require("./tasks/index"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/task', index_1.default);
router.get('/', (req, res) => {
    res.status(200).send("it works!");
});
exports.default = router;
