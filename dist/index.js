"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3000;
// Start Server
app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    (0, database_1.default)();
});
