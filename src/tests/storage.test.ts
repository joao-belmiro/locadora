import { beforeEach, describe, expect, test } from 'vitest'
import LocalStorage from '../services/storageService'
function storageMock() {
    let storage = {};

    return {
        setItem: function (key: string, value) {
            storage[key] = value || '';
        },
        getItem: function (key: string) {
            return key in storage ? storage[key] : null;
        },
        removeItem: function (key: string) {
            delete storage[key];
        },
        length() {
            return Object.keys(storage).length;
        },
        key: function (i) {
            const keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

describe('Testando Operações de crud na storage', () => {
    test('verificando se a storage é criada', () => {

        global.localStorage = storageMock()
        const store = new LocalStorage<any>('store');

        expect(store.getSize()).eq(0)
    })

    test('adicionado um elemento na store', () => {

        global.localStorage = storageMock()
        const store = new LocalStorage<any>('store');
        store.create({id: 1})
        expect(store.getSize()).eq(1)
    })

    test('adicionando 3 elementos e removendo 1', () => {

        global.localStorage = storageMock()
        const store = new LocalStorage<any>('store');
        store.create({id: 1, nome: 'joão 1'})
        store.create({id: 2, nome: 'joão 2'})
        store.create({id: 3, nome: 'joão 3'})
        store.delete(2)
        expect(store.getSize()).eq(2)
    })
    test('adicionando 3 elementos e editando 1 elemento', () => {

        global.localStorage = storageMock()
        const store = new LocalStorage<any>('store');
        const elToEdit = {id: 2, nome: 'joão 2'}
        const index = 2
        store.create({id: 1, nome: 'joão 1'})
        store.create(elToEdit)
        store.create({id: 3, nome: 'joão 3'})
        
        const getEl = store.read(2)
        getEl.nome = 'joão editado'
        store.update(getEl.id, getEl)
        expect(store.read(index).id).eq(2)
        expect(store.read(index).nome).eq('joão editado')
    })
})