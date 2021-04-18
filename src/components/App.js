import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useStore } from '../store';

import Router from './Router';

const App = () => {
    const [store] = useStore();

    useEffect(() => {
        const debug = e => {
            if (e.code === 'KeyQ') console.log('store:', store);
        }

        document.addEventListener('keypress', debug);
        return () => document.removeEventListener('keypress', debug);
    }, [store]);


    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}

export default App
