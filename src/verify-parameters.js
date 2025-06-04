/**
 * Verifies the parameters passed to the Reign constructor.
 *
 * @param {String} databaseName - The name of the database
 * @param {String[]} storeNames - The names of the stores
 * @param {Number} version - The version of the database
 * @throws {Error} If any of the parameters is invalid
 */
function verifyParameters(databaseName, storeNames, version) {
	if (!databaseName || typeof databaseName !== 'string') {
		throw new Error('Database name is required and must be a string');
	}

       if (
               !Array.isArray(storeNames) ||
               storeNames.length === 0 ||
               !storeNames.every((name) => typeof name === 'string' && name.length > 0)
       ) {
               throw new Error('Store name is required and must be an array of non-empty strings');
       }

        if (!Number.isInteger(version) || version <= 0) {
                throw new Error('Version is required and must be a positive integer');
        }
}

export { verifyParameters };
