# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.1](https://github.com/chessurisme/reign/compare/v1.0.0...v1.0.1) (2025-01-23)

## 1.0.0 (2025-01-23)

### Features

- add initial implementation of the IndexedDB wrapper class ([d609372](https://github.com/chessurisme/reign/commit/d6093721dfd918c4b07b62c6215ecbabca681823))
- add verifyParameters function to validate constructor parameters ([0d5a15e](https://github.com/chessurisme/reign/commit/0d5a15e5bc69840c74035134b4aafb9dfc94d717))
- implement createTransaction function for IndexedDB operations ([a6cec26](https://github.com/chessurisme/reign/commit/a6cec2642cfef493d5c6c335f76acb26303a20ae))
- implement Reign class for IndexedDB operations with CRUD methods ([a865dc8](https://github.com/chessurisme/reign/commit/a865dc8346a2b08de965e34dc648a468083900f7))
- support multiple store initialization [#2](https://github.com/chessurisme/reign/issues/2) ([8539949](https://github.com/chessurisme/reign/commit/853994996224b0260195223e10636fb4ba5aee84))
- update Reign class to support multiple store names ([9b60136](https://github.com/chessurisme/reign/commit/9b601363c5a3cfdac076dbe8b555b081c375d162))

### Bug Fixes

- update parameter verification to accept an array of store names ([3392fd7](https://github.com/chessurisme/reign/commit/3392fd72cb35b2b5d6ffcc607b5030f1087c4f3c))
- update store names ([40ea500](https://github.com/chessurisme/reign/commit/40ea500546e988fd47552a2e3bf309d5d8ff35c5))

## 1.1.0 (2025-01-23)

### Features

- add initial implementation of the IndexedDB wrapper class ([d609372](https://github.com/chessurisme/reign/commit/d6093721dfd918c4b07b62c6215ecbabca681823))
- add verifyParameters function to validate constructor parameters ([0d5a15e](https://github.com/chessurisme/reign/commit/0d5a15e5bc69840c74035134b4aafb9dfc94d717))
- implement createTransaction function for IndexedDB operations ([a6cec26](https://github.com/chessurisme/reign/commit/a6cec2642cfef493d5c6c335f76acb26303a20ae))
- implement Reign class for IndexedDB operations with CRUD methods ([a865dc8](https://github.com/chessurisme/reign/commit/a865dc8346a2b08de965e34dc648a468083900f7))
- support multiple store initialization [#2](https://github.com/chessurisme/reign/issues/2) ([8539949](https://github.com/chessurisme/reign/commit/853994996224b0260195223e10636fb4ba5aee84))
- update Reign class to support multiple store names ([9b60136](https://github.com/chessurisme/reign/commit/9b601363c5a3cfdac076dbe8b555b081c375d162))

### Bug Fixes

- update parameter verification to accept an array of store names ([3392fd7](https://github.com/chessurisme/reign/commit/3392fd72cb35b2b5d6ffcc607b5030f1087c4f3c))
- update store names ([40ea500](https://github.com/chessurisme/reign/commit/40ea500546e988fd47552a2e3bf309d5d8ff35c5))

> > > > > > > 794ac12 (docs: update CHANGELOG to reflect recent feature additions and bug fixes)

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
