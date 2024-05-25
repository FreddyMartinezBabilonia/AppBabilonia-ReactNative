import { useEffect, useRef, useState } from 'react';
import { ModalNative } from '../components';
import { getEnviroment, openPlayStore } from '../helpers';
import { ModalNativeProps } from '../interfaces';
import { api } from '../api';
import SplashScreen from 'react-native-splash-screen';
import { AppState, BackHandler, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const useHome = () => {

    const runFirst = `   
        // cambiar todos los targets _blank por _self   
        document.querySelectorAll("a").forEach((item)=>{
        item.setAttribute("target","_self");
        });
    `;
    const domain = getEnviroment("API_BASE_WEB");
    
    const webViewRef = useRef<any>(null);
    const [uri, setUri] = useState(`https://${domain}/`)
    const [update, setUpdate] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    const [loader, setLoader] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    const _handleOpenURL = (url:any) => {
        if(!url) return;
        setUri(url);
    }

    useEffect(() => {
      Linking.getInitialURL().then((e) => {
        _handleOpenURL(e);
      }).catch(err => {
          console.warn('An error occurred', err);
      });
      Linking.addEventListener('url', ({ url }) =>{ _handleOpenURL(url) });
    }, []);
    
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [canGoBack]);
    
    useEffect(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if(appState.match(/inactive|background/) && nextAppState === 'active') {
          if(update == false) launchAndroidAlert();
        }
        setAppState(nextAppState);
      });
      return () => {
        subscription.remove();
      };
    }, [appState]);

    const launchAndroidAlert = () => {
        const props:ModalNativeProps = {
            title: 'Notificación', 
            message: 'Tenemos una actualización disponible', 
            buttons: [
              {text: 'Cancelar', onPress: () => { 
                setUpdate(true);
                SplashScreen.hide();
              }},
              {text: 'Descargar', onPress: () => openPlayStore()},
            ]
          }
          ModalNative(props);
    }

    const handleWebViewLoad = async () => {
        const response = await api.get("/public/app_config", {
          params : {
            platform : "android",
            version : DeviceInfo.getBuildNumber()
          }
        });  
        const data = response.data?.data ?? {};
        const newVersion = data.new_version.android ?? false;    
        if(newVersion && update == false){
            launchAndroidAlert();
            setUpdate(true);
            return;
        }
        SplashScreen.hide();
    };
    
    const handleBackPress = () => {
    if (canGoBack) {
        webViewRef!.current!.goBack();
        return true; // Previene que el comportamiento por defecto (salir de la app) ocurra
    }
    return false; // Permite que el comportamiento por defecto ocurra (salir de la app)
    };

    return {
        runFirst,
        webViewRef,
        uri,
        canGoBack,
        update,
        loader,

        setLoader,
        launchAndroidAlert,
        handleWebViewLoad,
        handleBackPress,
        setCanGoBack,
        setUpdate,
        
    }
}
