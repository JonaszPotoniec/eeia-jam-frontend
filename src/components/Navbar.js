import React, { useState, useEffect, useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';
import styles from '../styles/Navbar.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const paths = ['/events', '/map', '/create-event', '/settings'];

const icons = [
    {
        icon: 'home',
        path: 'events',
        text: 'Home'
    }, {
        icon: 'map-marker-alt',
        path: 'map',
        text: 'Map'
    }, {
        icon: 'plus',
        path: 'create-event',
        text: 'New'
    }, 
    // {
    //     icon: 'cog',
    //     path: 'settings',
    //     text: 'Settings'
    // }
]

const Navbar = () => {
    const { t } = useTranslation();
    const { setAnimationDirection } = useContext(LocationContext);
    const history = useHistory();
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname.substring(1));

    useEffect(() => {
        setSelected(location.pathname.substring(1));
    }, [location.pathname]);

    const handleClick = path => {
        setSelected(path);
        
        const currentIndex = paths.indexOf(location.pathname);
        const newIndex = paths.indexOf('/' + path);

        setAnimationDirection(currentIndex - newIndex);
        history.push('/' + path);
    }

    const renderIcons = () => {
        return icons.map(({ icon, path, text }, idx) => (
            <div
                key={idx}
                className={`${styles.iconContainer} ${selected === path ? styles.selected : ''}`}
                onClick={() => handleClick(path)}
            >
                <i className={`fas fa-${icon}`}/>
                <div>{t("Navbar."+text)}</div>
            </div>
        )
    )}

    return (
        <div className={styles.navbar}>
            <div className={styles.icons}>
                {renderIcons()}
            </div>
        </div>
    )
}

export default Navbar;
