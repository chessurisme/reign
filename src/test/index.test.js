import 'fake-indexeddb/auto';
import { Reign } from '..';

describe('Reign', () => {
	const databaseName = 'TestDB';
	const storeName = 'TestStore';
	const version = 1;
	let reign;

	beforeEach(async () => {
		reign = new Reign({ databaseName, storeName, version });
		await reign.init();
	});

	afterEach(() => {
		reign.db.close();
		indexedDB.deleteDatabase(databaseName);
	});

	describe('Initialization', () => {
		test('should initialize the database correctly', async () => {
			expect(reign.db).toBeInstanceOf(IDBDatabase);
			expect(reign.db.name).toBe(databaseName);
			expect(reign.db.version).toBe(version);
			expect(reign.db.objectStoreNames.contains(storeName)).toBe(true);
		});

		test('should throw an error if required parameters are missing', () => {
			expect(() => new Reign({ databaseName: null, storeName, version })).toThrow();
			expect(() => new Reign({ databaseName, storeName: null, version })).toThrow();
			expect(() => new Reign({ databaseName, storeName, version: null })).toThrow();
		});
	});

	describe('update method', () => {
		test('should add a record to the store and return the ID', async () => {
			const data = { name: 'Test Item', value: 42 };
			const id = await reign.update(data);
			expect(typeof id).toBe('number');
		});

		test('should update an existing record', async () => {
			const data = { name: 'Test Item', value: 42 };
			const id = await reign.update(data);

			const updatedData = { id, name: 'Updated Item', value: 84 };
			await reign.update(updatedData);

			const record = await reign.get(id);
			expect(record).toEqual(expect.objectContaining(updatedData));
		});
	});

	describe('read method', () => {
		test('should return an empty array if the store is empty', async () => {
			const records = await reign.read();
			expect(records).toEqual([]);
		});

		test('should read all records from the store', async () => {
			const data1 = { name: 'Item 1', value: 1 };
			const data2 = { name: 'Item 2', value: 2 };

			await reign.update(data1);
			await reign.update(data2);

			const records = await reign.read();
			expect(records).toEqual(expect.arrayContaining([expect.objectContaining(data1), expect.objectContaining(data2)]));
		});
	});

	describe('get method', () => {
		test('should return a record by ID', async () => {
			const data = { name: 'Specific Item', value: 100 };
			const id = await reign.update(data);

			const record = await reign.get(id);
			expect(record).toEqual(expect.objectContaining(data));
		});

		test('should return undefined for a non-existent ID', async () => {
			const record = await reign.get(999);
			expect(record).toBeUndefined();
		});
	});

	describe('delete method', () => {
		test('should delete a record by ID', async () => {
			const data = { name: 'Deletable Item', value: 200 };
			const id = await reign.update(data);

			await reign.delete(id);

			const record = await reign.get(id);
			expect(record).toBeUndefined();
		});

		test('should not throw an error when deleting a non-existent ID', async () => {
			await expect(reign.delete(999)).resolves.not.toThrow();
		});
	});

	describe('Error handling', () => {
		test('should throw an error when calling update without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeName, version });
			await expect(uninitializedReign.update({ name: 'Item' })).rejects.toThrow('Database is not initialized. Call init() first.');
		});

		test('should throw an error when calling read without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeName, version });
			await expect(uninitializedReign.read()).rejects.toThrow('Database is not initialized. Call init() first.');
		});

		test('should throw an error when calling get without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeName, version });
			await expect(uninitializedReign.get(1)).rejects.toThrow('Database is not initialized. Call init() first.');
		});

		test('should throw an error when calling delete without initializing', async () => {
			const uninitializedReign = new Reign({ databaseName, storeName, version });
			await expect(uninitializedReign.delete(1)).rejects.toThrow('Database is not initialized. Call init() first.');
		});
	});
});
