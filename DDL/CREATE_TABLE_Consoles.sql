CREATE TABLE public."Consoles" (
    consoleID SERIAL PRIMARY KEY,
    consoleName VARCHAR(255) NOT NULL,
    manufacturer VARCHAR(255),
    releaseDate DATE
);