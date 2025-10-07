/**
 * Verifies the parameters passed to the Reign constructor.
 *
 * @param {String} databaseName - The name of the database
 * @param {Array<String|Object>|Object} storeNames - The name of the stores or configuration objects
 * @param {Number} version - The version of the store
 * @throws {Error} If any of the parameters is invalid
 */
import { STORE_DEFINITION_ERROR, toStoreDefinitionArray } from './store-configurations';

function verifyParameters(databaseName, storeNames, version) {
        if (!databaseName || typeof databaseName !== 'string') {
                throw new Error('Database name is required and must be a string');
        }

        let storeDefinitions;

        try {
                storeDefinitions = toStoreDefinitionArray(storeNames);
        } catch (error) {
                if (error.message === 'Store configuration map entries must be plain objects when provided') {
                        throw error;
                }

                throw new Error(STORE_DEFINITION_ERROR);
        }

        if (!Array.isArray(storeDefinitions) || storeDefinitions.length === 0) {
                throw new Error(STORE_DEFINITION_ERROR);
        }

        storeDefinitions.forEach((store) => {
                if (typeof store === 'string') {
                        return;
                }

                if (!store || typeof store !== 'object' || Array.isArray(store)) {
                        throw new Error(STORE_DEFINITION_ERROR);
                }

                const storeName = store.name ?? store.storeName;

                if (!storeName || typeof storeName !== 'string') {
                        throw new Error('Store configuration objects must include a name or storeName property of type string');
                }

                if (
                        store.keyPath !== undefined &&
                        store.keyPath !== null &&
                        typeof store.keyPath !== 'string' &&
                        !Array.isArray(store.keyPath)
                ) {
                        throw new Error('Store keyPath must be a string, an array, or null when provided');
                }

                if (store.autoIncrement !== undefined && typeof store.autoIncrement !== 'boolean') {
                        throw new Error('Store autoIncrement must be a boolean when provided');
                }

                if (
                        store.options !== undefined &&
                        (typeof store.options !== 'object' || store.options === null || Array.isArray(store.options))
                ) {
                        throw new Error('Store options must be a plain object when provided');
                }
        });

        if (typeof version !== 'number' || !Number.isInteger(version) || version <= 0) {
                throw new Error('Version is required and must be a positive integer');
        }
}

export { verifyParameters };
