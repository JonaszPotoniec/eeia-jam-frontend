import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Login';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" render={() => <div>landing screen?</div>} />
            <Route path="/login" render={Login} />
            <Route path="/home" render={() => <div>home</div>} />
        </BrowserRouter>
    )
}

export default App
