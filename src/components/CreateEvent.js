import React, { useState } from 'react';
import styles from '../styles/CreateEvent.module.scss'
import Navbar from './Navbar';
import Header from './Header';
import ErrorMsg from './ErrorMsg';
import { useTranslation } from 'react-i18next';

const CreateEvent = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { t, i18n } = useTranslation();

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
        <div className={styles.createEvent}>
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
        </div>
    )
}

export default CreateEvent
