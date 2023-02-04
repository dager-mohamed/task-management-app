"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const utils_1 = require("./utils");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield (0, utils_1.createApp)();
        app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
        app.get("*", (_, res) => {
            res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"), (err) => {
                res.status(500).send(err);
            });
        });
        app.listen(process.env.PORT, () => console.log(`[EXPRESS] listening on ${process.env.PORT} port`));
    });
}
main();
