const DEFAULT_STORE_OPTIONS = { keyPath: 'id', autoIncrement: true };

const hasOwn = (object, property) => Object.prototype.hasOwnProperty.call(object, property);

const isPlainObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const STORE_DEFINITION_ERROR =
        'Store names must be provided as an array of strings or configuration objects, or as a plain object map of configurations';

const toStoreDefinitionArray = (storeNames) => {
        if (Array.isArray(storeNames)) {
                return storeNames;
        }

        if (isPlainObject(storeNames)) {
                return Object.entries(storeNames).map(([storeName, config]) => {
                        if (config === undefined) {
                                return { storeName };
                        }

                        if (config === null || typeof config !== 'object' || Array.isArray(config)) {
                                throw new Error('Store configuration map entries must be plain objects when provided');
                        }

                        return Object.assign({ storeName }, config);
                });
        }

        throw new Error(STORE_DEFINITION_ERROR);
};

const normalizeStoreConfigurations = (storeNames) => {
        const storeDefinitions = toStoreDefinitionArray(storeNames);

        return storeDefinitions.map((store) => {
                if (typeof store === 'string') {
                        return {
                                name: store,
                                options: { ...DEFAULT_STORE_OPTIONS },
                        };
                }

                const { name, storeName, keyPath, autoIncrement, options = {} } = store;
                const normalizedName = name ?? storeName;
                const normalizedOptions = { ...options };

                if (autoIncrement !== undefined) {
                        normalizedOptions.autoIncrement = autoIncrement;
                } else if (!hasOwn(normalizedOptions, 'autoIncrement')) {
                        normalizedOptions.autoIncrement = DEFAULT_STORE_OPTIONS.autoIncrement;
                }

                if (keyPath !== undefined) {
                        normalizedOptions.keyPath = keyPath;
                } else if (!hasOwn(normalizedOptions, 'keyPath')) {
                        normalizedOptions.keyPath = DEFAULT_STORE_OPTIONS.keyPath;
                }

                return { name: normalizedName, options: normalizedOptions };
        });
};

export { STORE_DEFINITION_ERROR, toStoreDefinitionArray, normalizeStoreConfigurations };
