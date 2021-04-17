import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Events.module.scss';
import Header from './Header';
import dayjs from "dayjs";

const MapEvent = () => {

    return (
        <div></div>
    )
}

const Map = () => {
    const zoom = .005;
    const { t } = useTranslation();
    const [location, setLocation] = useState("Obliczanie odległości");
    const [timeInterval, setTimeInterval] = useState(null);
    const [ eventList, setEventList ] = useState([{name: "Nocny Kochanek", time: '2021-04-17 18:30:00', location: {lat: 50, lon: 21}}]);

    const updatePosition = () => {
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat  = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({lat: lat, lon: lon});
        });
    }

    useEffect(()=>{
        updatePosition();

        setTimeInterval(
            setInterval(()=>{
                updatePosition();
            }, 1000*60)
        );

        return () => {
            clearInterval(timeInterval);
        }
    }, [])

    return (
        <div className={styles.events}>
            <Header title={t("Map.Title")}/>
            <div className={styles.eventsList}>
            <iframe 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lon-zoom}%2C${location.lat-zoom}%2C${location.lon+zoom}%2C${location.lat+zoom}&amp;layer=transportmap&amp;marker=${location.lon}%2C${location.lat}`}
                style={{"border": "1px solid black", "height": "100%", "width": "100%"}}>

                </iframe>

            </div>
            <span className={styles.addEvent}></span>
        </div>
    )
}

export default Map
