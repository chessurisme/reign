# Changelog

## [1.0.0] - 2024-01-23

### Added

- Initial release of the Reign IndexedDB management library
- Core `Reign` class for simplified IndexedDB operations
- Comprehensive method support for database interactions:
  - `init()`: Initialize database connection
  - `update()`: Add or update records in object stores
  - `read()`: Retrieve all records from an object store
  - `get()`: Fetch a specific record by ID
  - `delete()`: Remove a record by ID

### Features

- Flexible database and object store configuration
- Support for multiple object stores in a single database
- Automatic object store creation during database initialization
- Promise-based asynchronous operations
- Built-in parameter verification
- Error handling for database interactions

### Dependencies

- Utility modules:
  - `verifyParameters`: Validate constructor input
  - `createTransaction`: Manage database transactions

### Design Principles

- Simplified IndexedDB API
- Clean and intuitive method signatures
- Consistent error handling
- Modular and reusable design

### Limitations

- Requires modern browser support for IndexedDB
- Primarily designed for client-side web applications
- Basic CRUD operations (more advanced querying not included)
