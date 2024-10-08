"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "./.env" });
const app_1 = __importDefault(require("./app"));
app_1.default.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000, () => {
    console.log(`server is running`);
});
