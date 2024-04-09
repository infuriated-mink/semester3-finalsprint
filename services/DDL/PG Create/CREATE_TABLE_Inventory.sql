CREATE TABLE public."Inventory" (
	inventoryID SERIAL PRIMARY KEY,
	gamesconsoleID INT,
	quantity INT,
	purchasePrice DECIMAL(10, 2),
	salePrice DECIMAL(10, 2),
	dateAdded DATE,
	storeID INT,
	FOREIGN KEY (gamesconsoleID) REFERENCES public."GamesConsoles"(gamesconsoleID),
	FOREIGN KEY (storeID) REFERENCES public."Stores"(storeID)
);