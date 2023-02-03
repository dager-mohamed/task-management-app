"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("./login"));
const signup_1 = __importDefault(require("./signup"));
const router = (0, express_1.Router)();
router.use('/login', login_1.default);
router.use('/signup', signup_1.default);
exports.default = router;
