import React, { useState } from 'react';
import styles from '../styles/CreateEvent.module.scss'
import Header from './Header';
import ErrorMsg from './ErrorMsg';
import PageWrapper from './PageWrapper';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CreateEvent = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { t } = useTranslation();

    const validate = () => {
        if (name.length < 1) {
            setErrorMsg(t('FormErrors.EmptyName'));
            return false;
        }

        if (description.length < 20) {
            setErrorMsg(t('FormErrors.EmptyDescription'));
            return false;
        }

        if (!type) {
            setErrorMsg(t('FormErrors.EmptyType'));
            return false;
        }

        if (!date) {
            setErrorMsg(t('FormErrors.EmptyDate'));
            return false;
        }

        const currentDate = new Date();
        if (date <= currentDate) {
            setErrorMsg(t('FormErrors.PastDate'));
            return false;
        }

        setErrorMsg('');
        return true;
    }

    const addEvent = e => {
        e.preventDefault();
        validate();
    }

    return (
        <motion.div 
            className={styles.createEvent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Header title={t("CreateEvent.Title")} />
            <div className={styles.container}>
                <form>
                    <label>
                        <span>{t("CreateEvent.EventName")}</span>
                        <input 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>{t("CreateEvent.EventDescription")}</span>
                        <textarea 
                            type="text" 
                            rows={10} 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>{t("CreateEvent.Type")}</span>
                        <div> 
                            <input 
                                type="radio" 
                                name="type" 
                                value="official" 
                                checked={type === 'official'}
                                onChange={e => setType(e.target.value)}
                            /> Official
                        </div>
                        <div> 
                            <input 
                                type="radio" 
                                name="type" 
                                value="unofficial" 
                                checked={type === 'unofficial'}
                                onChange={e => setType(e.target.value)}
                            /> Unofficial
                        </div>
                    </label>

                    <label>
                        <span>{t("CreateEvent.Date")}</span>
                        <input 
                            type="datetime-local"
                            onChange={e => setDate(new Date(e.target.value))}
                        />
                    </label>

                    {errorMsg && <ErrorMsg msg={errorMsg} />}

                    <button onClick={addEvent}>{t("CreateEvent.AddEvent")}</button>
                </form>
            </div>
        </motion.div>
    )
}

const CreateEventWrapper = () => (
    <PageWrapper index={2}>
        <CreateEvent />
    </PageWrapper>
)

export default CreateEventWrapper
