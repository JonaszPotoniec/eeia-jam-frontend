import React, { createContext, useReducer, useContext, useMemo } from 'react';
import { rootReducer } from './reducers';

const initialState = {
    user: null
};

const StoreContext = createContext(initialState);

const { Provider } = StoreContext;

export const StoreProvider = ({ children }) => {
    const [globalState, dispatch] = useReducer(rootReducer, initialState);
    const store = useMemo(() => [globalState, dispatch], [globalState]);

    return (
        <StoreContext.Provider value={[store, dispatch]}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);
