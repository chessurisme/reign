import 'fake-indexeddb/auto';
import Reign from '..';

describe('Reign', () => {
	const databaseName = 'TestDB';
	const storeNames = ['TestStore1', 'TestStore2'];
	const version = 1;
	let reign;

	beforeEach(async () => {
		reign = new Reign({ databaseName, storeNames, version });
		await reign.init();
	});

	afterEach(() => {
		reign.db.close();
		indexedDB.deleteDatabase(databaseName);
	});

	describe('Initialization', () => {
		test('should initialize the database correctly with multiple stores', async () => {
			expect(reign.db).toBeInstanceOf(IDBDatabase);
			expect(reign.db.name).toBe(databaseName);
			expect(reign.db.version).toBe(version);
			storeNames.forEach((storeName) => {
				expect(reign.db.objectStoreNames.contains(storeName)).toBe(true);
			});
		});

		test('should throw an error if required parameters are missing', () => {
			expect(() => new Reign({ databaseName: null, storeNames, version })).toThrow();
			expect(() => new Reign({ databaseName, storeNames: null, version })).toThrow();
			expect(() => new Reign({ databaseName, storeNames, version: null })).toThrow();
		});
	});

	describe('update method', () => {
		test('should add a record to the specified store and return the ID', async () => {
			const data = { name: 'Test Item', value: 42 };
			const id = await reign.update('TestStore1', data);
			expect(typeof id).toBe('number');
		});

		test('should update an existing record in the specified store', async () => {
			const data = { name: 'Test Item', value: 42 };
			const id = await reign.update('TestStore1', data);

			const updatedData = { id, name: 'Updated Item', value: 84 };
			await reign.update('TestStore1', updatedData);

			const record = await reign.get('TestStore1', id);
			expect(record).toEqual(expect.objectContaining(updatedData));
		});
	});

	describe('read method', () => {
		test('should return an empty array if the store is empty', async () => {
			const records = await reign.read('TestStore1');
			expect(records).toEqual([]);
		});

		test('should read all records from the specified store', async () => {
			const data1 = { name: 'Item 1', value: 1 };
			const data2 = { name: 'Item 2', value: 2 };

			await reign.update('TestStore1', data1);
			await reign.update('TestStore1', data2);

			const records = await reign.read('TestStore1');
			expect(records).toEqual(expect.arrayContaining([expect.objectContaining(data1), expect.objectContaining(data2)]));
		});
	});

	describe('get method', () => {
		test('should return a record by ID from the specified store', async () => {
			const data = { name: 'Specific Item', value: 100 };
			const id = await reign.update('TestStore1', data);

			const record = await reign.get('TestStore1', id);
			expect(record).toEqual(expect.objectContaining(data));
		});

		test('should return undefined for a non-existent ID in the specified store', async () => {
			const record = await reign.get('TestStore1', 999);
			expect(record).toBeUndefined();
		});
	});

	describe('delete method', () => {
		test('should delete a record by ID from the specified store', async () => {
			const data = { name: 'Deletable Item', value: 200 };
			const id = await reign.update('TestStore1', data);

			await reign.delete('TestStore1', id);

			const record = await reign.get('TestStore1', id);
			expect(record).toBeUndefined();
		});

		test('should not throw an error when deleting a non-existent ID', async () => {
			await expect(reign.delete('TestStore1', 999)).resolves.not.toThrow();
		});
	});

	describe('Error handling', () => {
		test('should throw an error when calling update without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeNames, version });
			await expect(uninitializedReign.update('TestStore1', { name: 'Item' })).rejects.toThrow(
				'Database is not initialized. Call init() first.'
			);
		});

		test('should throw an error when calling read without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeNames, version });
			await expect(uninitializedReign.read('TestStore1')).rejects.toThrow('Database is not initialized. Call init() first.');
		});

		test('should throw an error when calling get without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeNames, version });
			await expect(uninitializedReign.get('TestStore1', 1)).rejects.toThrow('Database is not initialized. Call init() first.');
		});

		test('should throw an error when calling delete without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeNames, version });
			await expect(uninitializedReign.delete('TestStore1', 1)).rejects.toThrow('Database is not initialized. Call init() first.');
		});
	});
});
