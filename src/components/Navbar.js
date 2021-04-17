import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.scss';
import { useHistory } from 'react-router';

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
    }, {
        icon: 'cog',
        path: 'settings',
        text: 'Settings'
    }
]

const Navbar = () => {
    const history = useHistory();
    const [selected, setSelected] = useState(history.location.pathname.substring(1));

    useEffect(() => {
        setSelected(history.location.pathname.substring(1));
    }, [history.location.pathname]);

    const handleClick = path => {
        setSelected(path);
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
                <div>{text}</div>
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
