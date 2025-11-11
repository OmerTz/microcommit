const storage: { [key: string]: string } = {};

const AsyncStorageMock = {
  setItem: jest.fn((key: string, value: string) => {
    return new Promise((resolve) => {
      storage[key] = value;
      resolve(null);
    });
  }),
  getItem: jest.fn((key: string) => {
    return new Promise((resolve) => {
      resolve(storage[key] || null);
    });
  }),
  removeItem: jest.fn((key: string) => {
    return new Promise((resolve) => {
      delete storage[key];
      resolve(null);
    });
  }),
  mergeItem: jest.fn((key: string, value: string) => {
    return new Promise((resolve) => {
      const existing = storage[key];
      if (existing) {
        const existingObj = JSON.parse(existing);
        const newObj = JSON.parse(value);
        storage[key] = JSON.stringify({ ...existingObj, ...newObj });
      } else {
        storage[key] = value;
      }
      resolve(null);
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve) => {
      Object.keys(storage).forEach(key => delete storage[key]);
      resolve(null);
    });
  }),
  getAllKeys: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(Object.keys(storage));
    });
  }),
  multiGet: jest.fn((keys: string[]) => {
    return new Promise((resolve) => {
      const result = keys.map(key => [key, storage[key] || null]);
      resolve(result);
    });
  }),
  multiSet: jest.fn((keyValuePairs: Array<[string, string]>) => {
    return new Promise((resolve) => {
      keyValuePairs.forEach(([key, value]) => {
        storage[key] = value;
      });
      resolve(null);
    });
  }),
  multiRemove: jest.fn((keys: string[]) => {
    return new Promise((resolve) => {
      keys.forEach(key => delete storage[key]);
      resolve(null);
    });
  }),
  multiMerge: jest.fn((keyValuePairs: Array<[string, string]>) => {
    return new Promise((resolve) => {
      keyValuePairs.forEach(([key, value]) => {
        const existing = storage[key];
        if (existing) {
          const existingObj = JSON.parse(existing);
          const newObj = JSON.parse(value);
          storage[key] = JSON.stringify({ ...existingObj, ...newObj });
        } else {
          storage[key] = value;
        }
      });
      resolve(null);
    });
  }),
};

export default AsyncStorageMock;
module.exports = AsyncStorageMock;