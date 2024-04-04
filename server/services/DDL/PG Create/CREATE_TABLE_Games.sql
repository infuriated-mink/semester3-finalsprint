CREATE TABLE public."Games" (
    gameID SERIAL PRIMARY KEY,
    gameTitle VARCHAR(255) NOT NULL,
    description TEXT,
    releaseDate DATE,
    price DECIMAL(10, 2),
    difficultyID INT,
    instoreLocation TEXT,
    FOREIGN KEY (difficultyID) REFERENCES public."Difficulty"(difficultyID)
);