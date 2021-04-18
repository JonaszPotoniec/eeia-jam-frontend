import React, { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next';
import styles from '../styles/Events.module.scss';
import Header from './Header';
import DetailsCard from './DetailsCard';
import dayjs from "dayjs";
import PageWrapper from './PageWrapper';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { AnimatePresence } from 'framer-motion';
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const Event = (props) => {
    const [remainingTime, setRemainingTime] = useState(1);
    const [distance, setDistance] = useState();
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
        },(err)=>console.warn(err));
      }

    const getDistanceFromLatLonInKm2 = (lat1, lon1, lat2, lon2) => {
        const deg2rad = (deg) => {
            return deg * (Math.PI/180)
        }
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

    useEffect(()=>{
        setRemainingTime(props.time.diff(dayjs()))
        if(props.lastLocation != null)
            getDistanceFromLatLonInKm2(props.location.lat, props.location.lon, props.lastLocation.lat, props.lastLocation.lon)
        else
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
    }, [props.time, props.location.lat, props.location.lon])

    return (
        <div 
            className={styles.event}
            onClick={props.onClick}
        >
            <img alt={props.name+"-image"} src="https://weeia.edu.p.lodz.pl/pluginfile.php/23134/user/icon/adaptable/f3?rev=1386054"/>
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
    const [ eventList, setEventList ] = useState([]);
    const maxDistance = 10000000;
    const [lastLocation, setLastLocation] = useState(null);
    
    //do DetailsCard
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat  = position.coords.latitude;
            const lon = position.coords.longitude;
            setLastLocation({lat: lat, lon: lon});

            fetch(`http://localhost:5000/events/nearest?lat=${lat}&lon=${lon}&dis=${maxDistance}`,{
                method: "GET"})
            .then(response => response.json())
            .then(json => setEventList(json))
            .catch(error => console.log(error));
        })
    }, []);


    return (<>
        <div className={styles.events}>
            <Header title={t("Events.Title")}/>
            <div className={styles.eventsList}>
                {
                    eventList?.map((e, i) => (
                        <Event
                            name={e.title}
                            type={e.type}
                            img={e.img}
                            time={dayjs(e.start_date.slice(0, 23)+e.start_date.slice(24), "YYYY-mm-dd HH:mm:ss.SSS Z")}
                            location={{lat: e.latitude, lon: e.longitude}}
                            score={e.score}
                            key={e.event_id}
                            lastLocation={lastLocation}
                            onClick={(e) => setSelectedEvent(e)}
                            // key={e.name + e.time + e.location}
                        />
                    ))
                }
            </div>
            <span className={styles.addEvent}></span>
        </div>

        {/* TODO */}
        <AnimatePresence>
            {selectedEvent && (
                <DetailsCard event={selectedEvent} close={() => setSelectedEvent(null)} />
            )}
        </AnimatePresence>
    </>)
}

const eventWrapper = () => (
    <PageWrapper index={0}>
        <Events />
    </PageWrapper>
)

export default eventWrapper