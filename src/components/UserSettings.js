import React from 'react';
import Header from './Header';
import PageWrapper from './PageWrapper';
import styles from '../styles/UserSettings.module.scss';

const UserSettings = () => {
    return (
        <div className={styles.userSettings}>
            <Header title={"Settings"}/>
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