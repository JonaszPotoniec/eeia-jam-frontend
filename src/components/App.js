import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useStore } from '../store';

import Login from './Login';
import CreateAccount from './CreateAccount';
import Events from './Events';
import Map from './Map';
import CreateEvent from './CreateEvent';
import Navbar from './Navbar';
import Error404 from './Error404';

const App = () => {
    const [store] = useStore();
    const subpages = ["Events", "Map", "CreateEvent", "Navbar", "Error404"];

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
                    <Navbar />
                </Route>
                <Route exact path="/map">
                    <Map />
                    <Navbar />
                </Route>
                <Route exact path="/create-event">
                    <CreateEvent />
                    <Navbar />
                </Route>
                <Route exact path="/home" render={() => <div>home</div>} />
                <Route> 
                    <Error404 
                        subpages = {subpages}
                    />
                    <Navbar />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
