export default class LocalStorage<T> {
    private storageKey: string;
    
    constructor(storageKey: string) {
        this.storageKey = storageKey;
    }

    create(item: T): void {
        const items = this.getAll();
        items.push(item);
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    read(id: number): T | null {
        const items = this.getAll();
        const index: number = items.findIndex(item => item.id === id)
        if (id >= -1) {
            return items[index];
        }
        return null;
    }

    update(id: number, newItem: T): void {
        const items = this.getAll();
        const index: number = items.findIndex(item => item.id === id)
        if (index >= -1) {
            items[index] = newItem;
            localStorage.setItem(this.storageKey, JSON.stringify(items));
        }
    }

    delete(id: number): void {
        const items = this.getAll().filter(item => item.id !== id);
        if (id !== 0) {
            localStorage.setItem(this.storageKey, JSON.stringify(items));
        }
    }

    getAll(): T[] {
        const itemsJSON = localStorage.getItem(this.storageKey);
        if (itemsJSON) {
            return JSON.parse(itemsJSON) as T[];
        }
        return [];
    }

    getSize(): number {
        const items = this.getAll();
        return items.length;
    }
}
