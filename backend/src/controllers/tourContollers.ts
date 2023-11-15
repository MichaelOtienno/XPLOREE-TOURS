import express from 'express'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import mssql from 'mssql';
import { sqlConfig } from '../config/sqlConfig';
import { tourUpdateValidationSchema, tourValidationSchema } from '../validators/tourValidators';

//create tour
export const createTour = async (req: Request, res: Response) => {
    try {
        let { tourName, tourDescription, startDate, endDate, tourHighlights, tourPrice, tourHost, tourLocation,
            tourDuration, tourCategory, tourImage, tourContact, pickupLocation, pickupTime,
            dropoffLocation, dropoffTime } = req.body;

        const { error } = tourValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        //Date validation
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (endDateObj < startDateObj) {
            return res.status(400).json({ error: 'End date cannot be before start date' });
        }

        let tourID = v4();

        const pool = await mssql.connect(sqlConfig);
        const tourDetails = await pool.request()
            .input("tourID", mssql.VarChar, tourID)
            .input("tourName", mssql.VarChar, tourName)
            .input("tourDescription", mssql.VarChar, tourDescription)
            .input("startDate", mssql.Date, startDate)
            .input("endDate", mssql.Date, endDate)
            .input("tourHighlights", mssql.VarChar, tourHighlights)
            .input("tourPrice", mssql.Int, tourPrice)
            .input("tourHost", mssql.VarChar, tourHost)
            .input("tourLocation", mssql.VarChar, tourLocation)
            .input("tourDuration", mssql.VarChar, tourDuration)
            .input("tourCategory", mssql.VarChar, tourCategory)
            .input("tourImage", mssql.VarChar, tourImage)
            .input("tourContact", mssql.VarChar, tourContact)
            .input("pickupLocation", mssql.VarChar, pickupLocation)
            .input("pickupTime", mssql.VarChar, pickupTime)
            .input("dropoffLocation", mssql.VarChar, dropoffLocation)
            .input("dropoffTime", mssql.VarChar, dropoffTime)
            .execute("createTour");


        return res.status(200).json({
            message: 'Tour assigned successfully',
            tourID,
        });

    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

//fetch all tours
export const getAllTours = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().execute("fetchAllTours");

        if (result.recordset && result.recordset.length > 0) {
            const tours = result.recordset;
            return res.status(200).json(tours);
        } else {
            return res.status(200).json([]);
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

//update tour
export const updateProject = async (req: Request, res: Response) => {
    try {
        let { tourID,tourName, tourDescription, startDate, endDate, tourHighlights, tourPrice, tourHost, tourLocation,
            tourDuration, tourCategory, tourImage, tourContact, pickupLocation, pickupTime,
            dropoffLocation, dropoffTime } = req.body;
       
        const { error } = tourUpdateValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const pool = await mssql.connect(sqlConfig);
        const tourDetails = await pool.request()
            .input("tourID", mssql.VarChar, tourID)
            .input("tourName", mssql.VarChar, tourName)
            .input("tourDescription", mssql.VarChar, tourDescription)
            .input("startDate", mssql.Date, startDate)
            .input("endDate", mssql.Date, endDate)
            .input("tourHighlights", mssql.VarChar, tourHighlights)
            .input("tourPrice", mssql.Int, tourPrice)
            .input("tourHost", mssql.VarChar, tourHost)
            .input("tourLocation", mssql.VarChar, tourLocation)
            .input("tourDuration", mssql.VarChar, tourDuration)
            .input("tourCategory", mssql.VarChar, tourCategory)
            .input("tourImage", mssql.VarChar, tourImage)
            .input("tourContact", mssql.VarChar, tourContact)
            .input("pickupLocation", mssql.VarChar, pickupLocation)
            .input("pickupTime", mssql.VarChar, pickupTime)
            .input("dropoffLocation", mssql.VarChar, dropoffLocation)
            .input("dropoffTime", mssql.VarChar, dropoffTime)
            .execute("updateTour");

        const assignmentResult = tourDetails.recordset[0].updateResult;

        if (assignmentResult === -1) {
            return res.status(400).json({ error: 'Tour cannot be updated' });
        } else if(assignmentResult === -2) {
            return res.status(400).json({ error: 'Tour does not exist' });
        }else {
            const updatedTourID = tourDetails.recordset[0].UpdatedTourID;
            return res.status(200).json({
                message: 'Project updated successfully',
                updatedTourID,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
