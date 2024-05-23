import { useEffect, useRef, useState } from 'react';
import { ModalNative } from '../components';
import { getEnviroment, openPlayStore } from '../helpers';
import { ModalNativeProps } from '../interfaces';
import { api } from '../api';
import SplashScreen from 'react-native-splash-screen';
import { AppState, BackHandler } from 'react-native';

export const useHome = () => {

    const runFirst = `   
        // cambiar todos los targets _blank por _self   
        document.querySelectorAll("a").forEach((item)=>{
        item.setAttribute("target","_self");
        });
    `;
    const domain = getEnviroment("API_BASE_WEB");
    const uri = `https://${domain}/`;

    const webViewRef = useRef<any>(null);
    const [update, setUpdate] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    const [loader, setLoader] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      }, [canGoBack]);
    
      useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          if(appState.match(/inactive|background/) && nextAppState === 'active') {
            launchAndroidAlert();
          }
          setAppState(nextAppState);
        });
    
        return () => {
          subscription.remove();
        };
      }, [appState]);

    const launchAndroidAlert = () => {
        const props:ModalNativeProps = {
            title: 'Actualizar', 
            message: 'Hay una nueva versión disponible en la app. Desea actualizar?', 
            buttons: [
              {text: 'OK', onPress: () => openPlayStore()},
            ]
          }
          ModalNative(props);
    }

    const handleWebViewLoad = async () => {
        const response = await api.get("/public/app_config");  
        const data = response.data?.data ?? {};
        const newVersion = data.new_version.android ?? false;    
        if(newVersion){
            launchAndroidAlert();
            setUpdate(true);
            return;
        }
        SplashScreen.hide();
    };
    
      // Manejar el evento de retroceso
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
