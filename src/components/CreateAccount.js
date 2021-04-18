import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/CreateAccount.module.scss'
import ErrorMsg from './ErrorMsg';
import { useHistory } from 'react-router-dom';

const CreateAccount = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { t } = useTranslation();
    const history = useHistory();

    const create = e => {
        e.preventDefault();
        if (!validate()) return;

        const user = {
            name: firstName,
            last_name: lastName,
            email,
            password,
            password2: confirm
        }

        console.log('New user data:', user);

        //zapytanie api o utworzenie nowego użytkownika
        fetch(`http://localhost:5000/register`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log('Registration error:', err));
    }

    const validate = () => {
        if (firstName.length < 1) {
            setErrorMsg(t('FormErrors.EmptyFirstName'));
            return false;
        }

        if (lastName.length < 1) {
            setErrorMsg(t('FormErrors.EmptyLastName'));
            return false;
        }

        if (email.length < 1) {
            setErrorMsg(t('FormErrors.EmptyLogin'));
            return false;
        }

        if (password.length < 1) {
            setErrorMsg(t('FormErrors.EmptyPassword'));
            return false;
        }

        if (confirm.length < 1) {
            setErrorMsg(t('FormErrors.EmptyPasswordConfirm'));
            return false;
        }

        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        
        if (!emailRegex.test(email)) {
            setErrorMsg(t('FormErrors.WrongEmail'));
            return false;
        }

        if (password !== confirm) {
            setErrorMsg(t('FormErrors.PasswordDoesntMatch'));
            return false;
        }

        setErrorMsg('');
        return true;
    };

    return (
        <div className={styles.createAccount}>
            <div className={styles.createAccountPageContainer}>
                <h1 className={styles.appName}>
                    NearMe
                </h1>
                
                <div className={styles.createAccountWindowContainer}>
                    <form>
                        <h2>{t("CreateAccount.Title")}</h2>
                        
                        <label>
                            <span>{t("CreateAccount.FirstName")}</span>
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={e => setFirstName(e.target.value)}
                                placeholder={t("CreateAccount.FirstName")}
                            />
                        </label>

                        <label>
                            <span>{t("CreateAccount.LastName")}</span>
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={e => setLastName(e.target.value)}
                                placeholder={t("CreateAccount.LastName")}
                            />
                        </label>

                        <label>
                            <span>Email</span>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </label>
                        
                        <label>
                            <span>{t("CreateAccount.Password")}</span>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                placeholder={t("CreateAccount.Password")}
                            />
                        </label>
                        
                        <label>
                            <span>{t("CreateAccount.Confirm")}</span>
                            <input 
                                type="password" 
                                value={confirm} 
                                onChange={e => setConfirm(e.target.value)}
                                placeholder={t("CreateAccount.Password")}
                            />
                        </label>

                        {errorMsg && <ErrorMsg msg={errorMsg} />}

                        <button onClick={e => create(e)}>{t("CreateAccount.Create")}</button>
                    </form>
                </div>
                <div 
                    className={styles.login}
                    onClick={() => history.push('/login')}
                >{t("CreateAccount.Login")}</div>
            </div>
        </div>
    )
}

export default CreateAccount
