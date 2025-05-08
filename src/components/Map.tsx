import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  setUpdateIntervalForType,
  magnetometer,
  SensorTypes
} from "react-native-sensors";

// import CompassHeading from 'react-native-compass-heading';

import { usePermissions } from '../hooks';
import { headingParam, options, region } from '../interfaces';

const constAddRadius = 200;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface props {
  lat?: number,
  lng?: number
}
export const Map = ({lat, lng}:props) => {

  const { requestLocationPermission } = usePermissions();
  const mapRef = useRef<MapView>(null);
  const [optionsParams, setOptionsParams] = useState<options>({
    latitude: -12.0466945,
    longitude: -77.0426086,
    heading: 0,
    zoom: 18   
  })
  const [watchId, setWatchId] = useState<null|number>(null);
  const [markerRotate, setMarkerRotate] = useState(0);
  const [heading, setHeading] = useState(0);
  const [zoom, setZoom] = useState(14);
  const [userLocation, setUserLocation] = useState({
    latitude: -12.0466945,
    longitude: -77.0426086
  })

  const getRotation = ():number => {
    
    const marker1 = {
      latitude: optionsParams.latitude,
      longitude: optionsParams.longitude,
    };
    const marker2 = {
      latitude: lat,
      longitude: lng,
    };
    
    
    if(!marker2.latitude && !marker2.longitude) return 0;
    
    const deltaY = (marker2.latitude ?? 0) - marker1.latitude;
    const deltaX = (marker2.longitude ?? 0) - marker1.longitude;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    return angleInDegrees+85;
  }

  const getHeadingByHardware = () => {
    //setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) =>{
      //const heading = Math.atan2(y, x) * (180 / Math.PI);
      //console.log('heading', heading);
      let heading;
      if (Math.atan2(y, x) >= 0) {
        heading = Math.atan2(y, x) * (180 / Math.PI)
      } else {
        heading = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
      }
      
      //console.log(heading);
      //updateHeading(heading);
    });
    //subscription.unsubscribe();
  }

  const updateHeading = (heading: headingParam) => {
    if(mapRef.current == null || heading == 0) return;
    const map = mapRef.current;
    map.animateCamera({
      heading,  // Cambia el heading dinámicamente      
    });
  }

  const getLocation = async () => {
    // console.log(`consultando disponibilidad de permisos de ubicación : lat = ${lat} lng = ${lng}`);
    const granted = await requestLocationPermission();

    if(granted){
      const success: Geolocation.SuccessCallback = (position) => {
        const coords = position.coords;
        const latitude = coords.latitude ?? 0;
        const longitude = coords.longitude ?? 0;
        setOptionsParams((e) => ({
          ...e,
          latitude,
          longitude
        }));

        setUserLocation({ latitude, longitude });

        //const headingCalc = Math.abs(heading - 360);
        //console.log(`heading = ${heading}, headingCalc = ${headingCalc}`);
        //if(heading!=0)
        //updateHeading(headingCalc);
      }
      const error: Geolocation.ErrorCallback = (error) => {
        console.log(error);
      }
      const options = {
        enableHighAccuracy: true,
        timeout: 3500,
        interval: 100,
        distanceFilter: 0,
        forceRequestLocation: true,
      };
      const id = Geolocation.watchPosition(success,error,options);
      setWatchId(id);
    }

  }


  useEffect(() => {
    getLocation();
    return () => {
      if(watchId !== null) {
        //Geolocation.clearWatch(watchId);
      }
    };
  }, [])

  /*
  useEffect(() => {
    const degree_update_rate = 1;

    CompassHeading.start(degree_update_rate, ({heading}:{heading:number}) => {

      const rotate = getRotation();

      setMarkerRotate(rotate);
      setOptionsParams((e)=>({
        ...e,
        heading
      }))
    });

    return () => {
      CompassHeading.stop();
    };
  }, []) */
  

  useEffect(() => {
    
    //getHeadingByHardware()
    
  }, [])
  
  
  

  return (
  <View style={styles.container}>
     <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      
      camera={{
        center:{
          latitude: optionsParams.latitude,
          longitude: optionsParams.longitude,
        },
        heading: optionsParams.heading,
        pitch: 1,
        zoom: optionsParams.zoom
      }}

      onPanDrag = {(e) => {
        const latitude = e.nativeEvent.coordinate.latitude ?? 0;
        const longitude = e.nativeEvent.coordinate.longitude ?? 0;
        setOptionsParams({
          ...optionsParams,
          latitude,
          longitude
        });
      }}
     >
      <Marker
          key={`user-location`}
          coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
          image={require('../../assets/images/gps-95.png')}   
          rotation={markerRotate}
          flat={true}   
        />
        {
          (lat && lng) &&
          (
            <Marker
                key={`building-location`}
                coordinate={{ latitude: lat, longitude: lng }}               
                image={require('../../assets/images/house-95.png')}
              />
          )
        }
     </MapView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: (windowWidth + constAddRadius),
    height: (windowWidth + constAddRadius)/2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: windowHeight-((windowWidth + constAddRadius)/2),
    bottom:0,
    left: "-50%",
    transform:[
      { translateX : windowWidth * 0.20 }
    ]
  },
  map: {
     ...StyleSheet.absoluteFillObject,
     bottom:0
  },
});