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
                const storeCollectionError =
                        'Store names must be provided as an array of strings or configuration objects, or as a plain object map of configurations';

                it('should throw an error if storeName is not an array', () => {
                        expect(() => verifyParameters('db', [1], 1)).toThrow(storeCollectionError);
                });

                it('should throw an error if storeName has an element that is not a string or object', () => {
                        expect(() => verifyParameters('db', ['apple', 'create', 2], 1)).toThrow(storeCollectionError);
                });

                it('should throw an error if storeName is not provided', () => {
                        expect(() => verifyParameters('db', undefined, 1)).toThrow(storeCollectionError);
                });

                it('should throw when store definitions are provided as a plain object with invalid entries', () => {
                        expect(() =>
                                verifyParameters(
                                        'db',
                                        {
                                                valid: { keyPath: 'id' },
                                                invalid: 'store',
                                        },
                                        1
                                )
                        ).toThrow('Store configuration map entries must be plain objects when provided');
                });

                it('should throw an error if a store configuration object is missing a name', () => {
                        expect(() => verifyParameters('db', [{ keyPath: 'customId' }], 1)).toThrow(
                                'Store configuration objects must include a name or storeName property of type string'
                        );
                });

                it('should throw an error if a store configuration object has an invalid keyPath', () => {
                        expect(() => verifyParameters('db', [{ name: 'store', keyPath: 1 }], 1)).toThrow(
                                'Store keyPath must be a string, an array, or null when provided'
                        );
                });

                it('should throw an error if a store configuration object has an invalid autoIncrement option', () => {
                        expect(() => verifyParameters('db', [{ name: 'store', autoIncrement: 'yes' }], 1)).toThrow(
                                'Store autoIncrement must be a boolean when provided'
                        );
                });

                it('should throw an error if a store configuration object has invalid options', () => {
                        expect(() => verifyParameters('db', [{ name: 'store', options: 'invalid' }], 1)).toThrow(
                                'Store options must be a plain object when provided'
                        );
                });

                it('should allow store configuration objects with custom key paths', () => {
                        expect(() => verifyParameters('db', [{ name: 'store', keyPath: 'customId' }], 1)).not.toThrow();
                });

                it('should allow store configuration objects that use storeName as the property', () => {
                        expect(() => verifyParameters('db', [{ storeName: 'store', keyPath: 'customId' }], 1)).not.toThrow();
                });

                it('should allow store configuration maps keyed by store name', () => {
                        expect(() =>
                                verifyParameters(
                                        'db',
                                        {
                                                e: { keyPath: 'level' },
                                                cv: { keyPath: 'level' },
                                        },
                                        1
                                )
                        ).not.toThrow();
                });

                it('should allow null keyPath to explicitly disable inline keys', () => {
                        expect(() => verifyParameters('db', [{ name: 'store', keyPath: null }], 1)).not.toThrow();
                });
        });

	describe('version', () => {
		it('should throw an error if version is not a number', () => {
			expect(() => verifyParameters('db', ['store'], '1')).toThrow('Version is required and must be a positive integer');
		});

		it('should throw an error if version is not provided', () => {
			expect(() => verifyParameters('db', ['store'], undefined)).toThrow('Version is required and must be a positive integer');
		});

		it('should throw an error if version is NaN', () => {
			expect(() => verifyParameters('db', ['store'], NaN)).toThrow('Version is required and must be a positive integer');
		});

		it('should throw an error if version is negative', () => {
			expect(() => verifyParameters('db', ['store'], -1)).toThrow('Version is required and must be a positive integer');
		});

		it('should throw an error if version is not an integer', () => {
			expect(() => verifyParameters('db', ['store'], 1.5)).toThrow('Version is required and must be a positive integer');
		});
	});
});
