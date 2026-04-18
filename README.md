# Internship Task 5: Database Integration

## Overview
An upgrade to previous REST API fundamentals, this project incorporates genuine persistent data storage using an implementation of SQLite3. Utilizing Node.js and Express, the application securely writes to and reads data directly from an `app.db` relational database file rather than an ephemeral data array. 

## Core Features
- **Database Persistence**: Directly uses SQLite's `db.run` and `db.get` functions rather than losing data upon restart.
- **Secure Parameter Binding**: Prevents generic SQL injections when updating records.
- **Comprehensive Error Handling**: Responds gracefully to nonexistent entity queries, incorrect IDs, or duplicate database constraint issues.

## API Endpoints
- **`GET /users`** - Retrieve all persisted database users.
- **`GET /users/:id`** - Retrieve a solitary user object.
- **`POST /users`** - Create a new user (with `name`, `email`, `age`). 
- **`PUT /users/:id`** - Modify existing fields of a user entity.
- **`DELETE /users/:id`** - Permanently drop a user.

## Technologies Used
- Node.js
- Express.js
- node-sqlite3 (SQL wrapper)

## Execution Instructions
1. Verify [Node.js](https://nodejs.org/) exists.
2. Intall the necessary SQLite dependency packages:
   ```bash
   npm install
   ```
3. Initialize the server. The `app.db` SQLite storage layer will automatically be connected:
   ```bash
   node server.js
   ```
4. Consume the API on `http://localhost:3000/users` using any popular REST Client to verify DB storage.
