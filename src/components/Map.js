import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Map.module.scss';
import Header from './Header';
import dayjs from "dayjs";

const MapEvent = () => {

    return (
        <div></div>
    )
}

const UserMarker = (props) => {
  return (
    <div style={{
        "width": "32px",
        "height": "32px",
        "position": "relative",
        "left": "-16px",
        "top": "-16px",
        "color": "black"
      }} >{props.title}
      <img src="https://static.wixstatic.com/media/2cd43b_6e75597b8426458bae69d2f7e60abd9c~mv2.png/v1/fill/w_640,h_640,fp_0.50_0.50,q_95/2cd43b_6e75597b8426458bae69d2f7e60abd9c~mv2.png" alt="" />
    </div>
  );
}

const Map = () => {
    const zoom = .005;
    const { t } = useTranslation();
    const [location, setLocation] = useState(null);
    const [timeInterval, setTimeInterval] = useState(null);
    const [ eventList, setEventList ] = useState([{name: "Nocny Kochanek", time: '2021-04-17 23:30:00', location: {lat: 51.7526588, lon: 19.4532019}, img: "https://weeia.edu.p.lodz.pl/pluginfile.php/23134/user/icon/adaptable/f3?rev=1386054"}]);

    const updatePosition = () => {
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat  = position.coords.latitude;
            const lon = position.coords.longitude;
            // setLocation({
            //     latitude: lat, 
            //     longitude: lon
            // });
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

        return () => {
            clearInterval(timeInterval);
        }
    }, [])

    return (
        <div className={styles.Map}>
            <Header title={t("Map.Title")}/>
            {
                location &&
                <MapContainer center={location} zoom={13} scrollWheelZoom={true} className={styles.MapContainer}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        eventList.map((e) => (
                            <Marker position={[e.location.lat, e.location.lon]} key={e.name + e.time + e.location}>
                                <Popup>
                                    <PopupInside
                                        name={e.name}
                                        type={e.type}
                                        img={e.img}
                                        time={dayjs(e.time)}
                                        location={e.location}
                                        score={e.score}
                                        myPosition={location}
                                    />
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
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
        <div className={styles.MapEvent}>
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

export default Map
