import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useTranslation } from 'react-i18next';
import styles from '../styles/Map.module.scss';
import Header from './Header';
import PageWrapper from './PageWrapper';
import dayjs from "dayjs";

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const Map = () => {
    const maxDistance = 25;
    const { t } = useTranslation();
    const [location, setLocation] = useState(null);
    const [timeInterval, setTimeInterval] = useState(null);
    const [ eventList, setEventList ] = useState([]);
    const [lastLocation, setLastLocation] = useState(null);

    const updatePosition = () => {
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat  = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation([
                lat, 
                lon
            ]);
        });
    }

    useEffect(()=>{
        updatePosition();

        setTimeInterval(
            setInterval(()=>{
                updatePosition();
            }, 1000*60)
        );

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

        return () => {
            clearInterval(timeInterval);
        }
    }, [])

    return (
        <div className={styles.Map}>
            <Header title={t("Map.Title")}/>
            {
                location ?
                <MapContainer center={location} zoom={13} scrollWheelZoom={true} className={styles.MapContainer}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        eventList.map((e) => (
                            <Marker position={[e.latitude, e.longitude]} key={e.event_id}>
                                <Popup>
                                    <PopupInside
                                        name={e.title}
                                        type={e.type}
                                        img_path={e.img_path ?
                                            "http://" + window.location.hostname+":5000"+e.img_path :
                                            "https://weeia.edu.p.lodz.pl/pluginfile.php/23134/user/icon/adaptable/f3?rev=1386054"
                                        }
                                        time={dayjs(e.start_date.slice(0, 23)+e.start_date.slice(24), "YYYY-mm-dd HH:mm:ss.SSS Z")}
                                        location={{lat: e.latitude, lon: e.longitude}}
                                        score={e.score}
                                        myPosition={location}
                                        lastLocation={lastLocation}
                                    />
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
                : <div className={styles.loader}></div>
            }
            <span className={styles.addEvent}></span>
        </div>
    )
}


const PopupInside = (props) => {
    const [remainingTime, setRemainingTime] = useState(1);
    const [distance, setDistance] = useState("Obliczanie odległości");
    const [timeInterval, setTimeInterval] = useState(1);
    const { t } = useTranslation();

    const getDistanceFromLatLonInKm = (lat1, lon1) => {
        const deg2rad = (deg) => {
            return deg * (Math.PI/180)
        }
          
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat2  = props.myPosition[0];
            const lon2 = props.myPosition[1];
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
    }, [props.time])

    return (
        <a className={styles.MapEvent} href={`http://maps.google.com/maps?daddr=${props.location.lat},${props.location.lon}&amp;ll=`}>
            <img alt={props.name+"-image"} src={props.img_path}/>
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
        </a>
    )
}

const MapWrapper = () => (
    <PageWrapper index={1}>
        <Map />
    </PageWrapper>
)

export default MapWrapper
