import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Header.module.scss'

const Header = (props) => {
    return (
        <div className={styles.header}>
            <h1>{props.title}</h1>
        </div>
    )
}

export default Header
