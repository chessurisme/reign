import 'fake-indexeddb/auto';
import { createTransaction } from '../create-transaction';

describe('createTransaction', () => {
	let db;

	beforeAll(async () => {
		db = await new Promise((resolve, reject) => {
			const request = indexedDB.open('TestDB', 1);

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				db.createObjectStore('TestStore', { keyPath: 'id' });
			};

			request.onsuccess = (event) => resolve(event.target.result);
			request.onerror = (event) => reject(event.target.error);
		});
	});

	afterAll(() => {
		db.close();
		indexedDB.deleteDatabase('TestDB');
	});

	test('should create a transaction successfully', async () => {
		const store = await createTransaction(db, 'TestStore', 'readonly');
		expect(store).toBeInstanceOf(IDBObjectStore);
		expect(store.name).toBe('TestStore');
	});

	test('should throw an error if the database is not provided', () => {
		expect(() => createTransaction(null, 'TestStore', 'readonly')).toThrow('Database is not initialized. Call init() first.');
	});

	test('should throw an error if the store name is not provided', () => {
		expect(() => createTransaction(db, null, 'readonly')).toThrow('Store name cannot be undefined or null.');
	});

	test('should throw an error if the mode is not provided', () => {
		expect(() => createTransaction(db, 'TestStore', null)).toThrow('Mode cannot be undefined or null.');
	});

	test('should throw an error if the store does not exist', async () => {
		await expect(createTransaction(db, 'NonExistentStore', 'readonly')).rejects.toThrow(
			'Failed to create a transaction: No objectStore named NonExistentStore in this database'
		);
	});

	test('should handle transaction errors gracefully', async () => {
		db.close();

		await expect(createTransaction(db, 'TestStore', 'readonly')).rejects.toThrow(/Failed to create a transaction: .*/);

		db = await new Promise((resolve, reject) => {
			const request = indexedDB.open('TestDB', 1);
			request.onsuccess = (event) => resolve(event.target.result);
			request.onerror = (event) => reject(event.target.error);
		});
	});
});
