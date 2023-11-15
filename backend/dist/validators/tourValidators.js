"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourUpdateValidationSchema = exports.tourValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
//project Assing
exports.tourValidationSchema = joi_1.default.object({
    tourName: joi_1.default.string().required().min(2).max(30),
    startDate: joi_1.default.date().required().min(new Date()),
    endDate: joi_1.default.date().required().min(new Date()),
    tourDescription: joi_1.default.string(),
    tourHighlights: joi_1.default.string().required().min(2).max(3000),
    tourPrice: joi_1.default.number().required().min(1).max(3000000000),
    tourHost: joi_1.default.string().required().min(2).max(30),
    tourLocation: joi_1.default.string().required().min(2).max(30),
    tourDuration: joi_1.default.string().required().min(2).max(30),
    tourCategory: joi_1.default.string().required().min(2).max(30),
    tourImage: joi_1.default.string(),
    tourContact: joi_1.default.string().required().min(2).max(30),
    pickupLocation: joi_1.default.string().required().min(2).max(30),
    pickupTime: joi_1.default.string().required().min(2).max(30),
    dropoffLocation: joi_1.default.string().required().min(2).max(30),
    dropoffTime: joi_1.default.string().required().min(2).max(30),
});
//tour update
exports.tourUpdateValidationSchema = joi_1.default.object({
    tourID: joi_1.default.required(),
    tourName: joi_1.default.string().required().min(2).max(30),
    startDate: joi_1.default.date().required().min(new Date()),
    endDate: joi_1.default.date().required().min(new Date()),
    tourDescription: joi_1.default.string(),
    tourHighlights: joi_1.default.string().required().min(2).max(3000),
    tourPrice: joi_1.default.number().required().min(1).max(3000000000),
    tourHost: joi_1.default.string().required().min(2).max(30),
    tourLocation: joi_1.default.string().required().min(2).max(30),
    tourDuration: joi_1.default.string().required().min(2).max(30),
    tourCategory: joi_1.default.string().required().min(2).max(30),
    tourImage: joi_1.default.string(),
    tourContact: joi_1.default.string().required().min(2).max(30),
    pickupLocation: joi_1.default.string().required().min(2).max(30),
    pickupTime: joi_1.default.string().required().min(2).max(30),
    dropoffLocation: joi_1.default.string().required().min(2).max(30),
    dropoffTime: joi_1.default.string().required().min(2).max(30),
});
