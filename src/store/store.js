import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { customerSetupReducer } from './customer-setup-slice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const rootPersistConfig = {
    key: 'readicharge-root',
    storage: AsyncStorage,
};

const customerSetupPersistConfig = {
    key: 'readicharge-customer-setup',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    customerSetup: persistReducer(customerSetupPersistConfig, customerSetupReducer),
});

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
export const persistor = persistStore(store);