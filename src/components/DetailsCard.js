import React, { useState, useEffect } from 'react';
import styles from '../styles/DetailsCard.module.scss';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";

const DetailsCard = ({ event, close }, props) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [distance, setDistance] = useState();
    const [animateY, setAnimateY] = useState(-800);
    const [pointerEvents, setPointerEvents] = useState('none')
    const [endY, setEndY] = useState(null); 
    const y = useMotionValue(0);
    const opacity = useTransform(y, [-800, 0, 800], [0, .4, 0]);
    const { t } = useTranslation();

    const getDistanceFromLatLonInKm = (lat1, lon1) => {
        const deg2rad = (deg) => {
            return deg * (Math.PI/180)
        }
          
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat2  = position.coords.latitude;
            const lon2 = position.coords.longitude;
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1); 
            var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            setDistance(Math.round(d*10)/10 + "km stąd");
        }, (err)=>console.warn(err));
    }

    const getTimeScale = (n) => {
        if(Math.floor(n/1000/60/60/24) > 0)
            return ["Days", Math.floor(n/1000/60/60/24)];
        if(Math.floor(n/1000/60/60) > 0)
            return ["Hours", Math.floor(n/1000/60/60)];
        
        return ["Minutes", Math.floor(n/1000/60)];
    }

    const getPlural = (n) => {
        let [scale, x] = getTimeScale(n);

        if(x < 0) return t("Events.Event.Time.Started");

        if(x === 1)
            return t(`Events.Event.Time.${scale}.Singular`, {count: x});
        if(x%10>=2 && x%10<=4 && (x%100<10 || x%100>=20))
            return t(`Events.Event.Time.${scale}.Plural1`, {count: x});
        
        return t(`Events.Event.Time.${scale}.Plural2`, {count: x});
    }

    useEffect(() => {
        console.log(event);

        if (event) {
            setAnimateY(0);
            setPointerEvents('all');
            const time = dayjs(event.start_date.slice(0, 23)+event.start_date.slice(24), "YYYY-mm-dd HH:mm:ss.SSS Z");
            setRemainingTime(time.diff(dayjs()));
            getDistanceFromLatLonInKm(event.latitude, event.longitude);
        }
    }, [event]);

    const handleDragEnd = (e, info) => {
        if (info.offset.y > 250) {
            closeCard(800);
        }

        if (info.offset.y < -250) {
            closeCard(-800);
        }
    }

    const closeCard = y => {
        setAnimateY(y);
        setPointerEvents('none');
        setTimeout(() => {
            close();            
        }, 150);
    }

    const renderCardContent = () => (
        <>
            <img src={`http://${window.location.hostname}:5000${event.img_path}`}/>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                </div>
                <div className={styles.localizationContainer}>
                    <div className={styles.iconsContainer}>
                        <div className={styles.iconContainer}>
                            <i className="fas fa-clock" />
                            {getPlural(remainingTime)}
                        </div>
                        <div className={styles.iconContainer}>
                            <i className="fas fa-map-marker-alt" />
                            {distance ? distance : 'calculating...'}
                        </div>
                    </div>
                    <a href={`http://maps.google.com/maps?daddr=${event.latitude},${event.longitude}&amp;ll=`}>{t('DetailsCard.Navigate')}</a>
                </div>
            </div>
        </>
    )

    return (
        <>
            <motion.div 
                className={styles.dimLayer} 
                style={{ opacity, pointerEvents }}
                onClick={() => closeCard(-800)}
            />

            <motion.div 
                className={styles.card}
                style={{ y, pointerEvents }}
                initial={{ y: -800 }}
                animate={{ y: animateY }}
                transition={{ type: 'spring', duration: .2, stiffness: 150, damping: 17 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={.1}
                onDragEnd={(e, info) => handleDragEnd(e, info)}
            >
                {event && renderCardContent()}
            </motion.div>
        </>
    )
}

export default DetailsCard
