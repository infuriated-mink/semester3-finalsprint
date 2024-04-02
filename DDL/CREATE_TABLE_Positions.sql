CREATE TABLE public."Positions" (
    positionID SERIAL PRIMARY KEY,
    positionName VARCHAR(255),
    storeID INT REFERENCES public."Stores"(storeID)
);