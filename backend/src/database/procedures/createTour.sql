
-- use tourManagementSystem
-- select * from Tours
-- drop procedure createTour
-- delete from Tours
-- where  AssignedUserEmail = 'cylvonnen@gmail.com'

CREATE or ALTER PROCEDURE createTour
    @tourID VARCHAR(300),
    @tourName VARCHAR(250),
    @tourDescription VARCHAR(500),
    @startDate DATE,
    @endDate DATE,
    @tourHighlights VARCHAR(500),
    @tourPrice INT,
    @tourHost VARCHAR(250),
    @tourLocation VARCHAR(250),
    @tourDuration VARCHAR(250),
    @tourCategory VARCHAR(250),
    @tourImage VARCHAR(250),
    @tourContact VARCHAR(250),
    @pickupLocation VARCHAR(250),
    @pickupTime time,
    @dropoffLocation VARCHAR(250),
    @dropoffTime time

AS
BEGIN
    INSERT INTO Tours (
        tourID,
        tourName,
        tourDescription,
        startDate,
        endDate,
        tourHighlights,
        tourPrice,
        tourHost,
        tourLocation,
        tourDuration,
        tourCategory,
        tourImage,
        tourContact,
        pickupLocation,
        pickupTime,
        dropoffLocation,
        dropoffTime
    )
    VALUES (
        @tourID,
        @tourName,
        @tourDescription,
        @startDate,
        @endDate,
        @tourHighlights,
        @tourPrice,
        @tourHost,
        @tourLocation,
        @tourDuration,
        @tourCategory,
        @tourImage,
        @tourContact,
        @pickupLocation,
        @pickupTime,
        @dropoffLocation,
        @dropoffTime
    );
END





