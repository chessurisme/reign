import { verifyParameters } from './verify-parameters';
import { createTransaction } from './create-transaction';

class Reign {
	constructor({ databaseName, storeName, version } = {}) {
		verifyParameters(databaseName, storeName, version);

		this.databaseName = databaseName;
		this.storeName = storeName;
		this.version = version;
		this.db = null;
	}

	async init() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.databaseName, this.version);

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
				}
			};

			request.onsuccess = (event) => {
				this.db = event.target.result;
				resolve(this.db);
			};

			request.onerror = (event) => reject(event.target.error);
		});
	}

	async update(data) {
		const store = await createTransaction(this.db, this.storeName, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.put(data);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	async read() {
		const store = await createTransaction(this.db, this.storeName, 'readonly');
		return new Promise((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	async get(id) {
		const store = await createTransaction(this.db, this.storeName, 'readonly');
		return new Promise((resolve, reject) => {
			const request = store.get(id);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}

	async delete(id) {
		const store = await createTransaction(this.db, this.storeName, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.delete(id);
			request.onsuccess = () => resolve(request.result);
			request.onerror = (event) => reject(event.target.error);
		});
	}
}

export { Reign };
