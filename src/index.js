import { verifyParameters } from './verify-parameters';
import { createTransaction } from './create-transaction';

/**
 * Represents a Reign class for managing IndexedDB operations.
 */
class Reign {
	/**
	 * Creates a new instance of Reign.
	 *
	 * @param {Object} options - The options for the Reign instance.
	 * @param {String} options.databaseName - The name of the IndexedDB database.
	 * @param {String[]} options.storeNames - An array of store names to be created in the database.
	 * @param {Number} options.version - The version of the IndexedDB database.
	 */
	constructor({ databaseName, storeNames, version } = {}) {
		verifyParameters(databaseName, storeNames, version);

		this.databaseName = databaseName;
		this.storeNames = storeNames;
		this.version = version;
		this.db = null;
	}

	/**
	 * Initializes the IndexedDB database connection.
	 *
	 * @returns {Promise<IDBDatabase>} A promise that resolves to the opened IDBDatabase instance.
	 * @throws {Error} If an error occurs while opening the database.
	 */
	async init() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.databaseName, this.version);

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				this.storeNames.forEach((storeName) => {
					if (!db.objectStoreNames.contains(storeName)) {
						db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
					}
				});
			};

			request.onsuccess = (event) => {
				this.db = event.target.result;
				resolve(this.db);
			};

			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Adds or updates a record in the specified object store.
	 *
	 * @param {String} storeName - The name of the object store.
	 * @param {Object} data - The data to be added or updated.
	 * @returns {Promise<number>} A promise that resolves to the ID of the added or updated record.
	 * @throws {Error} If an error occurs while adding or updating the record.
	 */
	async update(storeName, data) {
		const store = await createTransaction(this.db, storeName, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.put(data);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Retrieves all records from the specified object store.
	 *
	 * @param {String} storeName - The name of the object store.
	 * @returns {Promise<Object[]>} A promise that resolves to an array of records in the store.
	 * @throws {Error} If an error occurs while retrieving the records.
	 */
	async read(storeName) {
		const store = await createTransaction(this.db, storeName, 'readonly');
		return new Promise((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Retrieves a record by its ID from the specified object store.
	 *
	 * @param {String} storeName - The name of the object store.
	 * @param {number} id - The ID of the record to be retrieved.
	 * @returns {Promise<Object>} A promise that resolves to the record, or undefined if not found.
	 * @throws {Error} If an error occurs while retrieving the record.
	 */
	async get(storeName, id) {
		const store = await createTransaction(this.db, storeName, 'readonly');
		return new Promise((resolve, reject) => {
			const request = store.get(id);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Checks if a record with the specified ID exists in the object store.
	 *
	 * @param {String} storeName - The name of the object store.
	 * @param {number} id - The ID of the record to check.
	 * @returns {Promise<boolean>} A promise that resolves to true if the record exists, otherwise false.
	 * @throws {Error} If an error occurs while checking for the record.
	 */
	async isExist(storeName, id) {
		const store = await createTransaction(this.db, storeName, 'readonly');
		return new Promise((resolve, reject) => {
			const request = store.get(id);
			request.onsuccess = () => resolve(request.result !== undefined);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Deletes a record by its ID from the specified object store.
	 *
	 * @param {String} storeName - The name of the object store.
	 * @param {number} id - The ID of the record to be deleted.
	 * @returns {Promise<void>} A promise that resolves when the record is deleted.
	 * @throws {Error} If an error occurs while deleting the record.
	 */
	async delete(storeName, id) {
		const store = await createTransaction(this.db, storeName, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.delete(id);
			request.onsuccess = () => resolve();
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Clears all records from the specified object store.
	 *
	 * @param {String} storeName - The name of the object store.
	 * @returns {Promise<void>} A promise that resolves when the store is cleared.
	 * @throws {Error} If an error occurs while clearing the store.
	 */
	async clear(storeName) {
		const store = await createTransaction(this.db, storeName, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.clear();
			request.onsuccess = () => resolve();
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Closes the active IndexedDB connection.
	 *
	 * @throws {Error} If there is no active database connection to close.
	 */
	close() {
		if (!this.db) {
			throw new Error('No active database connection to close');
		}

		this.db.close();
		this.db = null;
	}
}

export default Reign;
