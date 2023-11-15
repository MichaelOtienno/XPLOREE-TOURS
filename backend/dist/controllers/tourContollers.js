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
exports.updateProject = exports.getAllTours = exports.createTour = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../config/sqlConfig");
const tourValidators_1 = require("../validators/tourValidators");
//create tour
const createTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { tourName, tourDescription, startDate, endDate, tourHighlights, tourPrice, tourHost, tourLocation, tourDuration, tourCategory, tourImage, tourContact, pickupLocation, pickupTime, dropoffLocation, dropoffTime } = req.body;
        const { error } = tourValidators_1.tourValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        //Date validation
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if (endDateObj < startDateObj) {
            return res.status(400).json({ error: 'End date cannot be before start date' });
        }
        let tourID = (0, uuid_1.v4)();
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const tourDetails = yield pool.request()
            .input("tourID", mssql_1.default.VarChar, tourID)
            .input("tourName", mssql_1.default.VarChar, tourName)
            .input("tourDescription", mssql_1.default.VarChar, tourDescription)
            .input("startDate", mssql_1.default.Date, startDate)
            .input("endDate", mssql_1.default.Date, endDate)
            .input("tourHighlights", mssql_1.default.VarChar, tourHighlights)
            .input("tourPrice", mssql_1.default.Int, tourPrice)
            .input("tourHost", mssql_1.default.VarChar, tourHost)
            .input("tourLocation", mssql_1.default.VarChar, tourLocation)
            .input("tourDuration", mssql_1.default.VarChar, tourDuration)
            .input("tourCategory", mssql_1.default.VarChar, tourCategory)
            .input("tourImage", mssql_1.default.VarChar, tourImage)
            .input("tourContact", mssql_1.default.VarChar, tourContact)
            .input("pickupLocation", mssql_1.default.VarChar, pickupLocation)
            .input("pickupTime", mssql_1.default.VarChar, pickupTime)
            .input("dropoffLocation", mssql_1.default.VarChar, dropoffLocation)
            .input("dropoffTime", mssql_1.default.VarChar, dropoffTime)
            .execute("createTour");
        return res.status(200).json({
            message: 'Tour assigned successfully',
            tourID,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error
        });
    }
});
exports.createTour = createTour;
//fetch all tours
const getAllTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request().execute("fetchAllTours");
        if (result.recordset && result.recordset.length > 0) {
            const tours = result.recordset;
            return res.status(200).json(tours);
        }
        else {
            return res.status(200).json([]);
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error
        });
    }
});
exports.getAllTours = getAllTours;
//update tour
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { tourID, tourName, tourDescription, startDate, endDate, tourHighlights, tourPrice, tourHost, tourLocation, tourDuration, tourCategory, tourImage, tourContact, pickupLocation, pickupTime, dropoffLocation, dropoffTime } = req.body;
        const { error } = tourValidators_1.tourUpdateValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const tourDetails = yield pool.request()
            .input("tourID", mssql_1.default.VarChar, tourID)
            .input("tourName", mssql_1.default.VarChar, tourName)
            .input("tourDescription", mssql_1.default.VarChar, tourDescription)
            .input("startDate", mssql_1.default.Date, startDate)
            .input("endDate", mssql_1.default.Date, endDate)
            .input("tourHighlights", mssql_1.default.VarChar, tourHighlights)
            .input("tourPrice", mssql_1.default.Int, tourPrice)
            .input("tourHost", mssql_1.default.VarChar, tourHost)
            .input("tourLocation", mssql_1.default.VarChar, tourLocation)
            .input("tourDuration", mssql_1.default.VarChar, tourDuration)
            .input("tourCategory", mssql_1.default.VarChar, tourCategory)
            .input("tourImage", mssql_1.default.VarChar, tourImage)
            .input("tourContact", mssql_1.default.VarChar, tourContact)
            .input("pickupLocation", mssql_1.default.VarChar, pickupLocation)
            .input("pickupTime", mssql_1.default.VarChar, pickupTime)
            .input("dropoffLocation", mssql_1.default.VarChar, dropoffLocation)
            .input("dropoffTime", mssql_1.default.VarChar, dropoffTime)
            .execute("updateTour");
        const assignmentResult = tourDetails.recordset[0].updateResult;
        if (assignmentResult === -1) {
            return res.status(400).json({ error: 'Tour cannot be updated' });
        }
        else if (assignmentResult === -2) {
            return res.status(400).json({ error: 'Tour does not exist' });
        }
        else {
            const updatedTourID = tourDetails.recordset[0].UpdatedTourID;
            return res.status(200).json({
                message: 'Project updated successfully',
                updatedTourID,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error
        });
    }
});
exports.updateProject = updateProject;
