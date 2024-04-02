CREATE TABLE public."Employees" (
	employeeID SERIAL PRIMARY KEY,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255) NOT NULL,
	positionID INT,
	addressID INT,
	email VARCHAR(255),
	phone VARCHAR(20),
	SIN VARCHAR(9),
	storeID INT,
	FOREIGN KEY (positionID) REFERENCES public."Positions"(positionID),
	FOREIGN KEY (addressID) REFERENCES public."Address"(addressID),
	FOREIGN KEY (storeID) REFERENCES public."Stores"(storeID)
);