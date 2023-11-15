"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationSchema = exports.userRegisterValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
//register validation
exports.userRegisterValidationSchema = joi_1.default.object({
    userName: joi_1.default.string().required().min(2).max(30),
    email: joi_1.default.string().email({
        minDomainSegments: 2, tlds: {
            allow: ['ke', 'com']
        }
    }),
    phone_no: joi_1.default.string().required().min(10).max(10),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#%$&*()]{0,30}$'))
});
//Login validation
exports.userLoginValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email({
        minDomainSegments: 2, tlds: {
            allow: ['ke', 'com']
        }
    }),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#%$&*()]{0,30}$'))
});
