CREATE TABLE public."Stores" (
    storeID SERIAL PRIMARY KEY,
    storeName VARCHAR(255),
    addressID INT REFERENCES public."Address"(addressID),
    phone VARCHAR(20),
    email VARCHAR(255)
);