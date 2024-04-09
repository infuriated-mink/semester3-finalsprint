# Virtual Vault

---

Virtual Vault is a comprehensive search and authentication system designed to provide secure and efficient access to a variety of resources. This project integrates full-text search capabilities for games and customer data, user authentication, and logging functionalities. Below is an overview of the project's structure and components.

# Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Search Functionality](#search-functionality)
  - [Logging](#logging)
  - [Testing](#testing)
  - [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Features

    - Full-text search for games and customer data using PostgreSQL and MongoDB.
    - User authentication with passport.js strategies, including JWT and local strategies.
    - Secure password handling with bcrypt hashing.
    - Session management with express-session.
    - Environment variable management with dotenv for development purposes.
    - Logging of search queries with timestamps.
    - Unit testing with Jest.

## Project Structure

Virtual Vault/
│
├── models/
│ └── users.json # User data in JSON format
│
├── routes/
│ ├── search.js # Express routes for search features
│ ├── logging.js # Function to log search queries
│ └── searchLog.txt # Document to store search log entries
|
├── services/
│ ├── mdb.js # MongoDB client instance
│ ├── pg.fulltext.dal.js # PostgreSQL data access layer for full-text search
│ └── m.fulltext.dal.js # MongoDB data access layer for full-text search
│  
| └── DDL/
| └── Mongo/
| └── CustomerJSON.json # JSON file for MongoDB customer data.
| └── PG Create/ Various SQL files for creating the PostgreSQL database schema, including tables for games, genres, inventory, etc.

| ├── CREATE_DB_postgres.sql  
| ├── CREATE_TABLE_Difficulty.sql
| ├── CREATE_TABLE_Games.sql
| ├── CREATE_TABLE_GamesConsoles.sql
| ├── CREATE_TABLE_GamesGenres.sql
| ├── CREATE_TABLE_Genres.sql
| ├── CREATE_TABLE_Inventory.sql
| └── CREATE_TABLE_Stores.sql
| └── PG Insert/ # SQL files for inserting data into the PostgreSQL database tables.
| ├── INSERT_Consoles.sql
| ├── INSERT_Difficulty.sql
| ├── INSERT_Games.sql
| ├── INSERT_GamesConsoles.sql
| ├── INSERT_GamesGenres.sql
| ├── INSERT_Genres
| ├── INSERT_Inventory.sql
| └── INSERT_Stores.sql
| └── tests/
│ ├── index.test.js # Test file for the main application.
│ ├── logging.test.js # Test file for the logging functionality.
├── views/ # EJS templates for rendering the application's views.
│ └── partials/
| ├── foot.ejs  
| ├── head.ejs  
| └── nav.ejs  
│ ├── 404.ejs
│ ├── 503.ejs
│ ├── custResults.ejs
│ ├── custSearch.ejs
│ ├── index.ejs
│ ├── login.ejs
│ ├── norecord.ejs
│ ├── register.ejs
│ ├── results.ejs
│ └── search.ejs
├── passport-config.js # Passport local strategy configuration  
├── passport.js # Passport JWT strategy configuration  
├── index.js # Main application file with Express setup
└── .env # Environment variables (not tracked)

## Installation

To set up Virtual Vault, follow these steps:

1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/infuriated-mink/semester3-finalsprint/
   ```
2. Move into necessary folder

   ```bash
   cd server
   ```

3. Install the required dependencies by:

   ```bash
   npm install
   ```

4. Set up the environment variables in a .env file at the root of the project.

5. Ensure that MongoDB and PostgreSQL services are running and accessible.
6. Start the application:
   ```bash
   node index
   ```

## Usage

After installation, the application will be accessible on the specified port (default: 3000). The following endpoints are available: - /search: Protected route for search functionalities. - /login: Route for user login. - /register: Route for user registration. - /logout: Route for user logout.

### Authentication

Virtual Vault uses passport.js for authentication. The passport-config.js and passport.js files contain the configuration for local and JWT strategies, respectively. User credentials are stored in models/users.json and are managed securely.

### Search Functionality

The search feature is implemented in search.js and utilizes two separate data access layers for PostgreSQL (pg.fulltext.dal.js) and MongoDB (m.fulltext.dal.js). These DALs are responsible for querying the respective databases and returning search results.

### Logging

Search queries are logged with user information and timestamps. The logging.js module provides the logging functionality, appending each log entry to a searchLog.txt file.

### Testing

Unit tests are written using Jest and are located alongside the modules they test. To run the tests:
`bash
    npm test
   `

### Security Considerations

Passwords are hashed using bcrypt before storage.
Sessions are managed securely with express-session.
Environment variables are used to store sensitive information, which should not be committed to version control.
SSL configuration for PostgreSQL is set to rejectUnauthorized: false for the project's scope but should be reviewed for production environments.

## Contributing

Contributions to Virtual Vault are welcome. Please follow the standard fork and pull request workflow.

## Contributors

- [Vanessa Rice](https://github.com/infuriated-mink)
- [Evan Harte](https://github.com/evanharte)
- [Dillon Regular](https://github.com/vapidsoup)
- [Ethan Miller](https://github.com/ethanmiller758)

## License

This project is licensed under the MIT License.
