import React from 'react';
import styles from '../styles/Error404.module.scss';
const levenshtein = require('js-levenshtein');

const Error404 = (props) => {

    const getClosestString = () => {
        let subpages = [...props.subpages];
        return subpages.sort((a,b) => (levenshtein(a+"", getLastParameter()+"")-levenshtein(b+"", getLastParameter()+"")))[0]
    } 

    const didYouMean = () => {
        let closest = getClosestString();

    } 

    const getLastParameter = () => {
        const url = window.location.href.split("/");
        return url[url.length-1];
    }

    return (
        <div className={styles.Error404}>
            <div className={styles.fancy3d}>😢</div>
            <div className={styles.content}>
                <h2>Strona "{getLastParameter()}" nie istnieje</h2>
                <h3>Czy chodziło Ci o {getClosestString()}?</h3>
            </div>
        </div>
    )
}

export default Error404;
