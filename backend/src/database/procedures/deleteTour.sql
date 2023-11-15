-- use tourManagementSystem
-- drop procedure deleteTour
-- select * from Tours
CREATE PROCEDURE deleteTour
    @tourID VARCHAR(1000)  
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Tours
        WHERE tourID = @tourID AND tourStatus = 'completed'
    )
    BEGIN
        DELETE FROM Tours
        WHERE tourID = @tourID AND tourStatus = 'completed';

        SELECT 1 AS DeletionResult; 
    END
    ELSE
    BEGIN
        SELECT -2 AS DeletionResult; 
    END
END