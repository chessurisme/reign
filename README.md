<img src="./assets/Reign.png" alt="Reign logo" height="150">

# Reign

The `Reign` class is a lightweight library for managing IndexedDB operations in modern web applications. It simplifies database interactions like creating, updating, retrieving, and deleting records using a clean and intuitive API.

## Features

- Easy setup and initialization of IndexedDB databases.
- Support for object store creation during database upgrades.
- CRUD operations (`create`, `read`, `update`, and `delete`) with asynchronous promises.
- Designed for flexibility and reusability in modern JavaScript applications.

## Installation

You can include the `Reign` class in your project by importing it directly:

```javascript
import { Reign } from '..';
```

Ensure you also import the utility modules (`verifyParameters` and `createTransaction`) if needed.

## Usage

### Creating a Reign Instance

Instantiate a `Reign` object by providing the `databaseName`, `storeName`, and `version` parameters.

```javascript
const db = new Reign({
	databaseName: 'MyDatabase',
	storeName: 'MyStore',
	version: 1
});
```

### Initializing the Database

Initialize the database connection before performing any operations:

```javascript
await db.init();
```

### Adding or Updating a Record

Use the `update` method to add a new record or update an existing one:

```javascript
const recordId = await db.update({ id: 1, name: 'Reign', age: 8 });
console.log(`Record saved with ID: ${recordId}`);
```

### Retrieving All Records

Retrieve all records in the object store:

```javascript
const records = await db.read();
console.log(records);
```

### Retrieving a Record by ID

Fetch a specific record by its ID:

```javascript
const record = await db.get(1);
console.log(record);
```

### Deleting a Record by ID

Delete a record by its ID:

```javascript
await db.delete(1);
console.log('Record deleted');
```

## API Reference

### Constructor

```javascript
new Reign({ databaseName, storeName, version });
```

- **`databaseName`** (`String`): Name of the IndexedDB database.
- **`storeName`** (`String`): Name of the object store.
- **`version`** (`Number`): Version number for the database.

### Methods

#### `init()`

Initializes the database connection. Creates the object store if it doesn't already exist.

**Returns**: `Promise<IDBDatabase>`

---

#### `update(data)`

Adds or updates a record in the object store.

- **`data`** (`Object`): The record to add or update.

**Returns**: `Promise<number>` – The ID of the added or updated record.

---

#### `read()`

Retrieves all records from the object store.

**Returns**: `Promise<Array<Object>>`

---

#### `get(id)`

Retrieves a specific record by its ID.

- **`id`** (`Number`): The ID of the record to retrieve.

**Returns**: `Promise<Object>`

---

#### `delete(id)`

Deletes a specific record by its ID.

- **`id`** (`Number`): The ID of the record to delete.

**Returns**: `Promise<undefined>`

## Error Handling

All methods reject with an appropriate error if an operation fails. Use `try-catch` blocks or `.catch` handlers to manage errors gracefully.

```javascript
try {
	const data = await db.get(1);
} catch (error) {
	console.error('Error fetching record:', error);
}
```

## License

This project is open-source and available under the [MIT License](LICENSE).
