create DATABASE tourManagementSystem
use tourManagementSystem
select * from Tours
CREATE TABLE Tours (
    tourID VARCHAR(300) PRIMARY KEY,
    tourName VARCHAR(250),
    tourHighlights VARCHAR(500),
    tourHost VARCHAR(250),
    tourDescription VARCHAR(500),
    tourPrice INT,
    tourLocation VARCHAR(250),
    tourDuration VARCHAR(250),
    tourImage VARCHAR(250),
    tourStatus VARCHAR(250) DEFAULT 'pending',
    createdDateTime DATETIME DEFAULT GETDATE(),
    startDate DATE,
    endDate DATE,
    isCompleted BIT DEFAULT 0,
    tourContact VARCHAR(250),
    tourCategory VARCHAR(250),
    pickupLocation VARCHAR(250),
    pickupTime TIME,
    dropoffLocation VARCHAR(250),
    dropoffTime TIME,

)
alter TABLE Tours 
add pickupTime TIME, dropoffTime TIME

--     AssignedUserEmail VARCHAR(250) UNIQUE,
--     AssignedUserName VARCHAR(250),
--     createdDateTime DATETIME DEFAULT GETDATE(),
--     
    --  projectStatus varchar(250) DEFAULT 'pending',

    
-- )

select * from Tours where projectStatus = 'pending'



SELECT * FROM Projects
ALTER TABLE Projects
ADD isAssigned BIT DEFAULT 0;


-- UPDATE Projects
-- SET projectStatus = 'pending'
-- WHERE projectStatus IS NULL;


alter table Projects
drop COLUMN projectStatus

ALTER TABLE Projects DROP CONSTRAINT [DF__Projects__projec__19AACF41];

delete from Projects where projectName = 'Water Management System'






-- drop table Projects
-- projectID
-- projectName
-- projectDescription
-- endDate
-- AssignedUserID
-- AssignedUser

-- drop table Projects