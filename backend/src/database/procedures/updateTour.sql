-- use tourManagementSystem
-- select * from Tours
-- drop procedure updateTour

CREATE OR ALTER PROCEDURE updateTour
    @tourID VARCHAR(300),
    @tourName VARCHAR(250),
    @tourDescription VARCHAR(500),
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
    @pickupTime TIME,
    @dropoffLocation VARCHAR(250),
    @dropoffTime TIME
AS
BEGIN
    -- tourID check
    IF EXISTS (
        SELECT 1
        FROM Tours
        WHERE tourID = @tourID
    )
    BEGIN
        -- endDate check 
        IF @endDate >= GETDATE()
        BEGIN
            
            UPDATE Tours
            SET
                tourName = @tourName,
                tourDescription = @tourDescription,
                endDate = @endDate,
                tourHighlights = @tourHighlights,
                tourPrice = @tourPrice,
                tourHost = @tourHost,
                tourLocation = @tourLocation,
                tourDuration = @tourDuration,
                tourCategory = @tourCategory,
                tourImage = @tourImage,
                tourContact = @tourContact,
                pickupLocation = @pickupLocation,
                pickupTime = @pickupTime,
                dropoffLocation = @dropoffLocation,
                dropoffTime = @dropoffTime
            WHERE tourID = @tourID;

            SELECT @tourID AS UpdatedTourID;
        END
        ELSE
        BEGIN
            SELECT -1 AS updateResult; -- Invalid endDate 
        END
    END
    ELSE
    BEGIN
        SELECT -2 AS updateResult; -- Tour doesn't exist
    END
END
