import { verifyParameters } from '../verify-parameters';

describe('verifyParameters', () => {
	describe('databaseName', () => {
		it('should throw an error if databaseName is not a string', () => {
			expect(() => verifyParameters(1, ['store'], 1)).toThrow('Database name is required and must be a string');
		});

		it('should throw an error if databaseName is not provided', () => {
			expect(() => verifyParameters(undefined, ['store'], 1)).toThrow('Database name is required and must be a string');
		});
	});

	describe('storeName', () => {
		it('should throw an error if storeName is not an array of string', () => {
			expect(() => verifyParameters('db', [1], 1)).toThrow('Store name is required and must be an array of strings');
		});

		it('should throw an error if storeName has an element of an array that is not a string', () => {
			expect(() => verifyParameters('db', ['apple', 'create', 2], 1)).toThrow('Store name is required and must be an array of strings');
		});

		it('should throw an error if storeName is not provided', () => {
			expect(() => verifyParameters('db', undefined, 1)).toThrow('Store name is required and must be an array of strings');
		});
	});

	describe('version', () => {
		it('should throw an error if version is not a number', () => {
			expect(() => verifyParameters('db', ['store'], '1')).toThrow('Version is required and must be a number');
		});

		it('should throw an error if version is not provided', () => {
			expect(() => verifyParameters('db', ['store'], undefined)).toThrow('Version is required and must be a number');
		});
	});
});
