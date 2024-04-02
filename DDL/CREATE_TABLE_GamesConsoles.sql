CREATE TABLE public."GamesConsoles" (
    gamesconsoleID SERIAL PRIMARY KEY,
    gameID INT,
    FOREIGN KEY (gameID) REFERENCES public."Games"(gameID),
    consoleID INT,
    FOREIGN KEY (consoleID) REFERENCES public."Consoles"(consoleID)
);