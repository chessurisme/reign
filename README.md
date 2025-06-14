<img src="./assets/Reign.png" alt="Reign logo" height="150">

# Reign (or Reign IDB)

`Reign` is a lightweight library for managing IndexedDB operations in modern web applications. It simplifies database interactions like creating, updating, retrieving, and deleting records using a clean and intuitive API.

## Features 🌟

- Easy setup and initialization of IndexedDB databases
- Support for multiple object store creation during database upgrades
- CRUD operations (`create`, `read`, `update`, and `delete`) with asynchronous promises
- Designed for flexibility and reusability in modern JavaScript applications

## Installation 📦

You can install Reign IDB using npm:

```bash
npm install reign-idb
```

## Import 🔌

Import the Reign class in your JavaScript project:

```javascript
import Reign from 'reign-idb';
```

## Usage 🚀

### Creating a Reign Instance

Instantiate a `Reign` object by providing the `databaseName`, `storeNames` (as an array), and `version` parameters:

```javascript
const db = new Reign({
	databaseName: 'MyDatabase',
	storeNames: ['Users', 'Products'], // Multiple stores supported
	version: 1
});
```

### Initializing the Database

Initialize the database connection before performing any operations:

```javascript
await db.init();
```

### Adding or Updating a Record

Use the `update` method to add a new record or update an existing one in a specific store:

```javascript
const recordId = await db.update('Users', { name: 'John Doe', age: 30 });
console.log(`Record saved with ID: ${recordId}`);
```

### Retrieving All Records

Retrieve all records from a specific object store:

```javascript
const users = await db.read('Users');
console.log(users);
```

### Retrieving a Record by ID

Fetch a specific record by its ID from a specific store:

```javascript
const user = await db.get('Users', 1);
console.log(user);
```

### Deleting a Record by ID

Delete a record by its ID from a specific store:

```javascript
await db.delete('Users', 1);
console.log('Record deleted');
```

### Cleaning Up

When you're done with database operations, it's good practice to close the connection:

```javascript
db.close();
```

## API Reference 📘

### Constructor

```javascript
new Reign({ databaseName, storeNames, version });
```

- **`databaseName`** (`String`): Name of the IndexedDB database
- **`storeNames`** (`String[]`): Array of object store names to create
- **`version`** (`Number`): Version number for the database

### Methods

#### `init()`

Initializes the database connection. Creates the specified object stores if they don't already exist.

**Returns**: `Promise<IDBDatabase>`

---

#### `update(storeName, data)`

Adds or updates a record in the specified object store.

- **`storeName`** (`String`): Name of the object store
- **`data`** (`Object`): The record to add or update

**Returns**: `Promise<number>` – The ID of the added or updated record

---

#### `read(storeName)`

Retrieves all records from the specified object store.

- **`storeName`** (`String`): Name of the object store

**Returns**: `Promise<Array<Object>>`

---

#### `get(storeName, id)`

Retrieves a specific record by its ID from the specified object store.

- **`storeName`** (`String`): Name of the object store
- **`id`** (`Number`): The ID of the record to retrieve

**Returns**: `Promise<Object>`

---

#### `delete(storeName, id)`

Deletes a specific record by its ID from the specified object store.

- **`storeName`** (`String`): Name of the object store
- **`id`** (`Number`): The ID of the record to delete

**Returns**: `Promise<void>`

---

#### `clear(storeName)`

Clears all records from the specified object store.

- **`storeName`** (`String`): Name of the object store

**Returns**: `Promise<void>`

---

#### `close()`

Closes the active database connection. This is useful for cleanup when the database connection is no longer needed.

**Returns**: `void`

## Error Handling ⚠️

All methods reject with an appropriate error if an operation fails. Use `try-catch` blocks or `.catch` handlers to manage errors gracefully:

```javascript
try {
	const user = await db.get('Users', 1);
} catch (error) {
	console.error('Error fetching record:', error);
}
```

## Browser Compatibility 🌐

Reign IDB requires modern browsers with IndexedDB support. Most contemporary browsers (Chrome, Firefox, Safari, Edge) are fully compatible.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open-source and available under the [MIT License](LICENSE.md).
