"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
const usersRouter = express_1.default.Router();
usersRouter.post('/signup', auth_controller_1.signup);
usersRouter.post('/login', auth_controller_1.login);
usersRouter.route('/:id').get(user_controller_1.getUser).patch(user_controller_1.editUser).delete(user_controller_1.deleteUser);
exports.default = usersRouter;
