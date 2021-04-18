import React from 'react'
import styles from '../styles/Header.module.scss'

const Header = (props) => {
    return (
        <div className={styles.header}>
            <h1>{props.title}</h1>
        </div>
    )
}

export default Header
