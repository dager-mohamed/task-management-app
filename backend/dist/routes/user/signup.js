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
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const user_1 = __importDefault(require("../../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const firstName = body.FirstName;
    const lastName = body.LastName;
    const email = body.Email;
    const password = body.Password;
    if (!firstName || !lastName || !email || !password)
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send({ status: "error", msg: "request body is wrong" });
    const data = yield user_1.default.findOne({ Email: email });
    if (data)
        return res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .send({ status: "error", msg: "User already exists" });
    new user_1.default({
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        Password: password,
    })
        .save()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({
            email,
            lastName,
            firstName,
        }, process.env.JWT_SECRET);
        return res
            .status(http_status_codes_1.StatusCodes.ACCEPTED)
            .send({ status: "OK", msg: "user has been created", token });
    }))
        .catch((err) => {
        console.log(err);
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ status: "error", msg: "Error occured in the server" });
    });
}));
exports.default = router;