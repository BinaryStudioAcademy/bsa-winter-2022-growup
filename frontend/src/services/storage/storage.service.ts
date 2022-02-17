interface IStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

interface IStorageProps {
  storage: IStorage;
}

class Storage {
  private _storage: IStorage;

  constructor({ storage }: IStorageProps) {
    this._storage = storage;
  }

  getItem(key: string): string {
    return this._storage.getItem(key) || '';
  }

  setItem(key: string, value: string): void {
    return this._storage.setItem(key, value);
  }

  removeItem(key: string): void {
    return this._storage.removeItem(key);
  }

  clear(): void {
    return this._storage.clear();
  }
}

export { Storage };
