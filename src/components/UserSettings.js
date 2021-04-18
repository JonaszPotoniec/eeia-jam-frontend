import React, { useEffect } from 'react';
import Header from './Header';
import PageWrapper from './PageWrapper';
import styles from '../styles/UserSettings.module.scss';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';

const UserSettings = () => {
    const { t } = useTranslation();
    const [userData] = useStore();

    const fetchData = () => {
        fetch(`http://localhost:5000/users/byid`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log('Registration error:', err));
    }

    useEffect(() => {
        console.log(userData)
    }, [])

    return (
        <div className={styles.userSettings}>
            <Header title={t("Settings.Title")}/>
            <div className={styles.container}>
                User settings
            </div>
        </div>
    )
}

const CreateSettingsWrapper = () => (
    <PageWrapper index={3}>
        <UserSettings />
    </PageWrapper>
)

export default CreateSettingsWrapper;