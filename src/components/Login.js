import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Login.module.scss'

const Login = () => {
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { t, i18n } = useTranslation();
    const history = useHistory();

    const login = e => {
        e.preventDefault();
        
        if (!validate()) return;
        
        //zapytanie do api o logowanie

        //jesli złe passy no to nic sie nie dzieje

        //jesli dobre
        //history.push(/home);
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

                        { errorMsg &&
                        <div className={styles.errorMsg}>{errorMsg}</div>
                        }

                        <button onClick={e => login(e)}>Login</button>
                    </form>
                </div>
                <div className={styles.CreateAccount}>{t("Login.CreateAccount")}</div>
            </div>
        </div>
    )
}

export default Login
