import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Events.module.scss';
import Header from './Header';
import Navbar from './Navbar';
import dayjs from "dayjs";

const Event = (props) => {
    const [remainingTime, setRemainingTime] = useState(1);
    const [distance, setDistance] = useState("Obliczanie odległości");
    const [timeInterval, setTimeInterval] = useState(1);
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
        });
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

        if(x == 1)
            return t(`Events.Event.Time.${scale}.Singular`, {count: x});
        if(x%10>=2 && x%10<=4 && (x%100<10 || x%100>=20))
            return t(`Events.Event.Time.${scale}.Plural1`, {count: x});
        
        return t(`Events.Event.Time.${scale}.Plural2`, {count: x});
    }

    useEffect(()=>{
        setRemainingTime(props.time.diff(dayjs()))
        getDistanceFromLatLonInKm(props.location.lat, props.location.lon)
        setTimeInterval(
            setInterval(()=>{
                setRemainingTime(props.time.diff(dayjs()))
                getDistanceFromLatLonInKm(props.location.lat, props.location.lon)
            }, 1000*60)
        );

        return () => {
            clearInterval(timeInterval);
        }
    }, [props.time])

    return (
        <div className={styles.event}>
            <img src="https://weeia.edu.p.lodz.pl/pluginfile.php/23134/user/icon/adaptable/f3?rev=1386054"/>
            <div>
                <h2>{props.name}</h2>
                <div>
                    <i className="fas fa-clock"></i>
                    <span>{getPlural(remainingTime)}</span>
                </div>
                <div>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{distance}</span>
                </div>
            </div>
        </div>
    )
}

const Events = () => {
    const { t } = useTranslation();
    const [ eventList, setEventList ] = useState([
        { name: "Nocny Kochanek", time: '2021-04-17 18:30:00', location: {lat: 50, lon: 21} },
        { name: "Nocny Kochanek", time: '2021-04-17 18:30:00', location: {lat: 50, lon: 21} },
    ]);


    return (
        <div className={styles.events}>
            <Header title={t("Events.Title")}/>
            <div className={styles.eventsList}>
                {
                    eventList.map((e, i) => (
                        <Event
                            name={e.name}
                            type={e.type}
                            img={e.img}
                            time={dayjs(e.time)}
                            location={e.location}
                            score={e.score}
                            key={i} //poki co, poki nie ma danych z bazy
                            // key={e.name + e.time + e.location}
                        />
                    ))
                }
            </div>
            <span className={styles.addEvent}></span>
        </div>
    )
}

export default Events
