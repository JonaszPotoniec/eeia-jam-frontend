import React from 'react';
import styles from '../styles/CreateAccount.module.scss'

const CreateAccount = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const validate = () => {
        if (emailValue.length < 1) {
            setErrorMsg(t('FormErrors.EmptyLogin'));
            return false;
        }

        if (passwordValue.length < 1) {
            setErrorMsg(t('FormErrors.EmptyPassword'));
            return false;
        }

        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (ema)
    };

    return (
        <div className={styles.login}>
            <div className={styles.loginPageContainer}>
                <h1 className={styles.appName}>
                    NearMe
                </h1>
                
                <div className={styles.loginWindowContainer}>
                    <form>
                        <h2>{t("CreateAccount.Title")}</h2>
                        
                        <label>
                            <span>Email</span>
                            <input 
                                type="email" 
                                value={emailValue} 
                                onChange={e => setEmailValue(e.target.value)}
                                placeholder={t("CreateAccount.Login")}
                            />
                        </label>
                        
                        <label>
                            <span>{t("CreateAccount.Password")}</span>
                            <input 
                                type="password" 
                                value={passwordValue} 
                                onChange={e => setPasswordValue(e.target.value)}
                                placeholder={t("CreateAccount.Password")}
                            />
                        </label>
                        
                        <label>
                            <span>{t("CreateAccount.Confirm")}</span>
                            <input 
                                type="password" 
                                value={confirmValue} 
                                onChange={e => setConfirmValue(e.target.value)}
                                placeholder={t("CreateAccount.Password")}
                            />
                        </label>

                        {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}

                        <button onClick={e => login(e)}>{t("CreateAccount.Create")}</button>
                    </form>
                    <div>{t("CreateAccount.Login")}</div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount
