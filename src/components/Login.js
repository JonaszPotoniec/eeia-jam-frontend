import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import styles from '../styles/Login.module.scss'

import { useStore } from '../store';
import { loginUser } from '../actions';
import ErrorMsg from './ErrorMsg';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { t } = useTranslation();
    const [, dispatch] = useStore();
    const history = useHistory();

    const login = e => {
        e.preventDefault();
        if (!validate()) return;
        
        //zapytanie do api o logowanie
        fetch(`http://localhost:5000/login`, {
            method: 'POST', 
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: loginValue,
                password: passwordValue
            })
        })
        .then(res => res.json())
        .then(({ user }) => {
            dispatch(loginUser(user));
            history.push('/events');
        })
        .catch(err => console.log('Login error:', err));
    }

    const validate = () => {
        if (loginValue.length < 1) {
            setErrorMsg(t('FormErrors.EmptyLogin'));
            return false;
        }
        
        if (passwordValue.length < 1) { 
            setErrorMsg(t('FormErrors.EmptyPassword'));
            return false;
        }

        setErrorMsg('');
        return true;
    };

    return (
        <div className={styles.login}>
            <div className={styles.loginPageContainer}>
                <h1 className={styles.appName}>
                    NearMe
                </h1>
                
                <div className={styles.loginWindowContainer}>
                    <form>
                        <h2>{t("Login.Title")}</h2>
                        
                        <label>
                            <span>Login</span>
                            <input 
                                type="text" 
                                value={loginValue} 
                                onChange={e => setLoginValue(e.target.value)}
                                placeholder={t("Login.Login")}
                            />
                        </label>
                        
                        <label>
                            <span>{t("Login.Password")}</span>
                            <input 
                                type="password" 
                                value={passwordValue} 
                                onChange={e => setPasswordValue(e.target.value)}
                                placeholder={t("Login.Password")}
                            />
                        </label>

                        {errorMsg && <ErrorMsg msg={errorMsg} />}

                        <button onClick={e => login(e)}>Login</button>
                    </form>
                </div>
                <div 
                    className={styles.createAccount}
                    onClick={() => history.push('/register')}
                >{t("Login.CreateAccount")}</div>
            </div>
        </div>
    )
}

export default Login
