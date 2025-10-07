<img src="./assets/Reign.png" alt="Reign logo" height="150">

# Reign (or Reign IDB)

`Reign` is a lightweight library for managing IndexedDB operations in modern web applications. It simplifies database interactions like creating, updating, retrieving, and deleting records using a clean and intuitive API.

## Features 🌟

- Easy setup and initialization of IndexedDB databases
- Support for multiple object store creation during database upgrades
- CRUD operations (`create`, `read`, `update`, and `delete`) with asynchronous promises
- Lightweight helpers for checking whether specific records exist before performing updates or deletes
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
  storeNames: [
    'Users',
    { name: 'Products', keyPath: 'sku' },
    { storeName: 'Logs', keyPath: null, autoIncrement: true },
  ],
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

### Checking if a Record Exists

Quickly check whether a record with a particular ID is present in the store:

```javascript
const exists = await db.isExist('Users', 1);
console.log(`Record exists: ${exists}`);
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

### Troubleshooting Parameter Validation

Reign validates the arguments that are passed into the constructor. If the library throws `Store names must be provided as an array of strings or configuration objects, or as a plain object map of configurations`, it means the `storeNames` option was either omitted, not one of the supported collection shapes, or contains entries that are missing a `name`/`storeName` string. Valid configuration objects can supply custom `keyPath`, `autoIncrement`, or additional `options` values:

```javascript
const db = new Reign({
  databaseName: 'MyDatabase',
  storeNames: [
    { storeName: 'Example', keyPath: 'level' },
    { name: 'AnotherStore', keyPath: null, autoIncrement: true },
  ],
  version: 1,
});
```

You can pass `storeNames` as either an array or a plain object map. When using a map, each key becomes the store name and the corresponding value is the configuration object. Double-check that the collection you pass to `storeNames` is constructed correctly (for example, ensure any variables you spread into it are defined) and that each entry includes the required identifier. Once those conditions are met, the constructor will accept the configuration and proceed with database initialization.

## API Reference 📘

### Constructor

```javascript
new Reign({ databaseName, storeNames, version });
```

- **`databaseName`** (`String`): Name of the IndexedDB database
- **`storeNames`** (`Array<String|Object>` | `Object`): Array of store names or configuration objects, or a plain object
  map whose keys are store names. Configuration objects may define `name` or `storeName`, `keyPath`, `autoIncrement`, or
  a complete `options` object. When omitted, the key path defaults to `id` with `autoIncrement` enabled.
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

**Returns**: `Promise<Object|undefined>`

---

#### `isExist(storeName, id)`

Checks whether a record with the provided ID is present in the specified store.

- **`storeName`** (`String`): Name of the object store
- **`id`** (`Number`): The ID of the record to check

**Returns**: `Promise<boolean>`

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
