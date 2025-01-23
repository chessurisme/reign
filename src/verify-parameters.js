/**
 * Verifies the parameters passed to the Reign constructor.
 *
 * @param {String} databaseName - The name of the database
 * @param {Array} storeName - The name of the store
 * @param {Number} version - The version of the store
 * @throws {Error} If any of the parameters is invalid
 */
function verifyParameters(databaseName, storeName, version) {
	if (!databaseName || typeof databaseName !== 'string') {
		throw new Error('Database name is required and must be a string');
	}

	if (!Array.isArray(storeName) || storeName.length === 0 || !storeName.every((name) => typeof name === 'string')) {
		throw new Error('Store name is required and must be an array of strings');
	}

	if (typeof version !== 'number') {
		throw new Error('Version is required and must be a number');
	}
}

export { verifyParameters };
