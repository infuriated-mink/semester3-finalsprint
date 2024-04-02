CREATE TABLE public."Inventory" (
	inventoryID SERIAL PRIMARY KEY,
	gameconsoleID INT,
	quantity INT,
	purchasePrice DECIMAL(10, 2),
	salePrice DECIMAL(10, 2),
	dateAdded DATE,
	storeID INT,
	FOREIGN KEY (gameconsoleID) REFERENCES public."GamesConsoles"(gameconsoleID),
	FOREIGN KEY (storeID) REFERENCES public."Stores"(storeID)
);