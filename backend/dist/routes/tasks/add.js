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
const task_1 = __importDefault(require("../../models/task"));
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const user = (0, utils_1.decodeJWT)(token);
    if (!token)
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send({ msg: "The user token is wrong", status: "error" });
    const name = req.body.name;
    const priority = req.body.priority;
    const id = req.body.id;
    // 'normal' | 'urgent' | 'important' | 'completed'
    const priorities = ["normal", "urgent", "important", "completed"];
    if (!priorities.includes(priority)) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send({ msg: "The priority is not valid" });
    }
    if (!name || !id)
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send({ msg: "There are missing fields", status: "error" });
    const check_data = yield task_1.default.findOne({ Email: user.email });
    const filter_tasks = check_data === null || check_data === void 0 ? void 0 : check_data.Tasks.filter((task) => task.TaskId == id)[0];
    if (filter_tasks)
        return res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .send({ msg: "The task id already exists" });
    if (check_data) {
        yield task_1.default.findOneAndUpdate({
            Email: user.email,
        }, {
            "$push": { Tasks: {
                    Name: name,
                    Priority: priority,
                    TaskId: id,
                } }
        }, { upsert: true });
    }
    else {
        yield task_1.default.findOneAndUpdate({
            Email: user.email,
        }, {
            Email: user.email,
            Tasks: [
                {
                    Name: name,
                    Priority: priority,
                    TaskId: id,
                },
            ],
        }, { upsert: true });
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .send({ msg: "The task has been created", status: "ok" });
}));
exports.default = router;
