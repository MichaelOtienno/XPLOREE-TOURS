
-- use tourManagementSystem


CREATE OR ALTER PROCEDURE sendReview
    @email VARCHAR(300),
    @review VARCHAR(250)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET review = @review
    WHERE email = @email;

    PRINT 'Review updated successfully.';
END;
