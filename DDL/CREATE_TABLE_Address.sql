CREATE TABLE public."Address" (
    addressID SERIAL PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(50),
    postalCode VARCHAR(10)
);