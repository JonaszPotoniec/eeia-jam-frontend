import React, { useEffect } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';

import { useStore } from '../store';

import Router from './Router';

const App = () => {
    const [store] = useStore();
    const history = useHistory();

    // useEffect(() => {
    //     fetch(`http://localhost:5000/users/byid`, {
    //         method: 'GET'
    //     })
    //     .then(res => res.json())
    //     .then(data => )
    //     .catch(err => console.log('Registration error:', err));
    // }, []);

    useEffect(() => {
        const debug = e => {
            if (e.code === 'KeyQ') console.log('store:', store);
        }

        document.addEventListener('keypress', debug);
        return () => document.removeEventListener('keypress', debug);
    }, [store]);


    return (
        <BrowserRouter history={history}>
            <Router />
        </BrowserRouter>
    )
}

export default App
