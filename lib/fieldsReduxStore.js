let store = undefined;

export default {
    setStore( providedStore ){
        store = providedStore;
    },
    getStore(){
        return store;
    }
};
