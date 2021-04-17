import React from 'react'
import styles from '../styles/ErrorMsg.module.scss'

const ErrorMsg = ({ msg }) => {
    return (
        <div className={styles.errorMsg}>
            {msg}
        </div>
    )
}

export default ErrorMsg
