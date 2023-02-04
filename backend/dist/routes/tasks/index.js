"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const add_1 = __importDefault(require("./add"));
const delete_1 = __importDefault(require("./delete"));
const edit_1 = __importDefault(require("./edit"));
const info_1 = __importDefault(require("./info"));
const router = (0, express_1.Router)();
router.use("/edit", edit_1.default);
router.use("/add", add_1.default);
router.use("/delete", delete_1.default);
router.use("/info", info_1.default);
exports.default = router;
