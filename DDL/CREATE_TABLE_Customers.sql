CREATE TABLE public."Customers" (
    customerID SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    addressID INT REFERENCES public."Address"(addressID),
    email VARCHAR(255),
    phone VARCHAR(20)
);