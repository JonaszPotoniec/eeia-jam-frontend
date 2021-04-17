import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Login from './Login';

const App = () => {
    
    return (
        <BrowserRouter>
            <Route exact path="/" render={() => <div>landing screen?</div>} />
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/home" render={() => <div>home</div>} />
        </BrowserRouter>
    )
}

export default App
