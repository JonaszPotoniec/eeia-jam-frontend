import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Events from './Events';
import Map from './Map';
import CreateEvent from './CreateEvent';
import Navbar from './Navbar';
import Error404 from './Error404';
import Settings from './UserSettings';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';

const subpages = ["Events", "Map", "CreateEvent", "Navbar", "Error404"];
const paths = ['/events', '/map', '/create-event', '/settings'];

const Router = () => {
    const location = useLocation();
    const [animationDirection, setAnimationDirection] = useState(paths.indexOf(location.pathname));

    return (
        <LocationContext.Provider value={{ animationDirection, setAnimationDirection }}>
            <div style={{ height: '100%', background: 'linear-gradient(244deg, #21D4FD 0%, #B721FF 100%)' }}>
                <AnimatePresence exitBeforeEnter initial={false}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/">
                            <Login />
                        </Route>
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
                        <Route exact path="/settings">
                            <Settings />
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
                </AnimatePresence>
            </div>
        </LocationContext.Provider>
    )
}

export default Router
