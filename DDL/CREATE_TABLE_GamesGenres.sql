CREATE TABLE public."GamesGenres" (
    gameID INT,
    FOREIGN KEY (gameID) REFERENCES public."Games"(gameID),
    genreID INT,
    FOREIGN KEY (genreID) REFERENCES public."Genres"(genreID)
);