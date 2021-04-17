import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useStore } from '../store';

import Login from './Login';
import CreateAccount from './CreateAccount';
import Events from './Events';
import Map from './Map';
import CreateEvent from './CreateEvent';

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
            <Switch>
                <Route exact path="/" render={() => <div>landing screen?</div>} />
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <CreateAccount />
                </Route>
                <Route exact path="/events">
                    <Events />
                </Route>
                <Route exact path="/map">
                    <Map />
                </Route>
                <Route exact path="/create-event">
                    <CreateEvent />
                </Route>
                <Route exact path="/home" render={() => <div>home</div>} />
                <Route> 
                    404 - zly path mordko
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
