"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const tokenVerify_1 = require("../middleware/tokenVerify");
const user_router = (0, express_1.default)();
// user_router.get('/',verifyToken,getAllUsers)
user_router.post('/register', userControllers_1.registerUser);
user_router.post('/login', userControllers_1.loginUser);
user_router.get('/check_user_details', tokenVerify_1.verifyToken, userControllers_1.checkUserDetails);
exports.default = user_router;
