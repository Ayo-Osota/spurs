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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
const handleResponse_1 = require("../utils/handleResponse");
const users_models_1 = require("../models/users.models");
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const todo = yield users_models_1.User.findById(id);
            if (!todo) {
                (0, handleResponse_1.sendErrorResponse)(res, {
                    statusCode: 404,
                    message: 'User not found',
                });
            }
            else {
                (0, handleResponse_1.sendSuccessResponse)(res, { data: todo });
            }
        }
        catch (error) {
            console.error(error);
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
function editUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updates = req.body;
            const user = yield users_models_1.User.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true,
            });
            if (!user) {
                (0, handleResponse_1.sendErrorResponse)(res, {
                    statusCode: 404,
                    message: 'user not found',
                });
            }
            else {
                (0, handleResponse_1.sendSuccessResponse)(res, { data: user });
            }
        }
        catch (error) {
            console.error('Error fetching users:', error);
            (0, handleResponse_1.sendErrorResponse)(res, { message: 'Failed to fetch users' });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield users_models_1.User.findByIdAndDelete(id);
            if (!user) {
                (0, handleResponse_1.sendErrorResponse)(res, {
                    statusCode: 404,
                    message: 'user not found',
                });
            }
            else {
                (0, handleResponse_1.sendSuccessResponse)(res, { message: 'user deleted', data: null });
            }
        }
        catch (error) {
            console.error(error);
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
