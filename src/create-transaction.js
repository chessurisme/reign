/**
 * Creates an IndexedDB transaction.
 *
 * @param {IDBDatabase} db - The IndexedDB database
 * @param {String} storeName - The name of the store
 * @param {String} mode - The mode of the transaction, either 'readonly' or 'readwrite'
 * @returns {Promise.<IDBObjectStore>} - A Promise which resolves to the object store
 * @throws {Error} - If the database is not initialized, the store name is not provided, or the mode is not provided
 * @throws {Error} - If an error occurs while creating the transaction
 * @throws {Error} - If the transaction is aborted
 */
function createTransaction(db, storeName, mode) {
	if (!db) {
		throw new Error('Database is not initialized. Call init() first.');
	}

	if (!storeName) {
		throw new Error('Store name cannot be undefined or null.');
	}

	if (!mode) {
		throw new Error('Mode cannot be undefined or null.');
	}

	return new Promise((resolve, reject) => {
		try {
			const transaction = db.transaction(storeName, mode);

			transaction.onerror = (event) => {
				reject(new Error(`Transaction failed: ${event.target.error.message}`));
			};

			transaction.onabort = () => {
				reject(new Error('Transaction aborted'));
			};

			const store = transaction.objectStore(storeName);
			resolve(store);
		} catch (error) {
			reject(new Error(`Failed to create a transaction: ${error.message}`));
		}
	});
}

export { createTransaction };
