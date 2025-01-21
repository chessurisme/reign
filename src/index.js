import { verifyParameters } from './verify-parameters';
import { createTransaction } from './create-transaction';

/**
 * Represents a Reign class for managing IndexedDB operations.
 */
class Reign {
	/**
	 * Creates a new instance of Reign.
	 *
	 * @param {Object} options - The options for the Reign instance
	 * @param {String} options.databaseName - The name of the IndexedDB database
	 * @param {String} options.storeName - The name of the IndexedDB store
	 * @param {Number} options.version - The version of the IndexedDB database
	 */
	constructor({ databaseName, storeName, version } = {}) {
		verifyParameters(databaseName, storeName, version);

		this.databaseName = databaseName;
		this.storeName = storeName;
		this.version = version;
		this.db = null;
	}

	/**
	 * Initializes the IndexedDB database connection.
	 *
	 * Opens a connection to the specified IndexedDB database with the given version.
	 * If the database is created or upgraded, the `onupgradeneeded` event is triggered
	 * to create the necessary object store if it does not exist.
	 *
	 * @returns {Promise<IDBDatabase>} A promise that resolves to the opened IDBDatabase instance.
	 * @throws {Error} If an error occurs while opening the database.
	 */
	async init() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.databaseName, this.version);

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
				}
			};

			request.onsuccess = (event) => {
				this.db = event.target.result;
				resolve(this.db);
			};

			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Adds or updates a record in the object store.
	 *
	 * @param {Object} data - The data to be added or updated.
	 * @returns {Promise<number>} A promise that resolves to the ID of the added or updated record.
	 * @throws {Error} If an error occurs while adding or updating the record.
	 */
	async update(data) {
		const store = await createTransaction(this.db, this.storeName, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.put(data);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Retrieves all records from the object store.
	 *
	 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects representing the records in the store.
	 * @throws {Error} If an error occurs while retrieving the records.
	 */
	async read() {
		const store = await createTransaction(this.db, this.storeName, 'readonly');
		return new Promise((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Retrieves a record from the object store by its ID.
	 *
	 * @param {number} id - The ID of the record to be retrieved.
	 * @returns {Promise<Object>} A promise that resolves to the record with the given ID, or undefined if the record does not exist.
	 * @throws {Error} If an error occurs while retrieving the record.
	 */
	async get(id) {
		const store = await createTransaction(this.db, this.storeName, 'readonly');
		return new Promise((resolve, reject) => {
			const request = store.get(id);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	/**
	 * Deletes a record from the object store by its ID.
	 *
	 * @param {number} id - The ID of the record to be deleted.
	 * @returns {Promise<undefined>} A promise that resolves when the record is deleted.
	 * @throws {Error} If an error occurs while deleting the record.
	 */
	async delete(id) {
		const store = await createTransaction(this.db, this.storeName, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.delete(id);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}
}

export default Reign;
