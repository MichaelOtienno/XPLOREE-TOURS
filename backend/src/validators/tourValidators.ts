import joi from 'joi';

//project Assing
export const tourValidationSchema = joi.object({
    tourName:joi.string().required().min(2).max(30),
    startDate: joi.date().required().min(new Date()),
    endDate: joi.date().required().min(new Date()),
    tourDescription:joi.string(),
    tourHighlights:joi.string().required().min(2).max(3000),
    tourPrice:joi.number().required().min(1).max(3000000000),
    tourHost:joi.string().required().min(2).max(30),
    tourLocation:joi.string().required().min(2).max(30),
    tourDuration:joi.string().required().min(2).max(30),
    tourCategory:joi.string().required().min(2).max(30),
    tourImage:joi.string(),
    tourContact:joi.string().required().min(2).max(30),
    pickupLocation:joi.string().required().min(2).max(30),
    pickupTime:joi.string().required().min(2).max(30),
    dropoffLocation:joi.string().required().min(2).max(30),
    dropoffTime:joi.string().required().min(2).max(30),
});


//tour update
export const tourUpdateValidationSchema = joi.object({
    tourID:joi.required(),
    tourName:joi.string().required().min(2).max(30),
    startDate: joi.date().required().min(new Date()),
    endDate: joi.date().required().min(new Date()),
    tourDescription:joi.string(),
    tourHighlights:joi.string().required().min(2).max(3000),
    tourPrice:joi.number().required().min(1).max(3000000000),
    tourHost:joi.string().required().min(2).max(30),
    tourLocation:joi.string().required().min(2).max(30),
    tourDuration:joi.string().required().min(2).max(30),
    tourCategory:joi.string().required().min(2).max(30),
    tourImage:joi.string(),
    tourContact:joi.string().required().min(2).max(30),
    pickupLocation:joi.string().required().min(2).max(30),
    pickupTime:joi.string().required().min(2).max(30),
    dropoffLocation:joi.string().required().min(2).max(30),
    dropoffTime:joi.string().required().min(2).max(30),
});
