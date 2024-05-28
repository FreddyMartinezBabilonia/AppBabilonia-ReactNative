import { useEffect, useRef, useState } from 'react';
import { ModalNative } from '../components';
import { getEnviroment, getNewVersion, openPlayStore } from '../helpers';
import { ModalNativeProps } from '../interfaces';
import SplashScreen from 'react-native-splash-screen';
import { AppState, BackHandler, Linking } from 'react-native';
import { usePermissions } from './usePermissions';
import { WebViewNavigation } from 'react-native-webview';

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
    const { requeststoragePermission, requestCameraPermission, requestLocationPermission } = usePermissions();

    const _handleOpenURL = (url:any) => {
        if(!url) return;
        setUri(url);
    }

    /*cuando se carga por primera vez*/
    useEffect(() => {
      Linking.getInitialURL().then((e) => {
        _handleOpenURL(e);
      }).catch(err => {
          console.warn('An error occurred', err);
      });
      Linking.addEventListener('url', ({ url }) =>{ _handleOpenURL(url) });
    }, []);
    
    /*cuando se detecata el boton de retroceso*/
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [canGoBack]);
    
    /*cuando la vista es activa*/
    useEffect(() => {
      const subscription = AppState.addEventListener('change', async (nextAppState) => {
        if(appState.match(/inactive|background/) && nextAppState === 'active') {
          const newVersion = await getNewVersion();
          if(newVersion && update == false) launchAndroidAlert();
        }
        setAppState(nextAppState);
      });
      return () => {
        subscription.remove();
      };
    }, [appState]);

    /* func que define modal de alerta*/
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

    /* func cuando web termina de cargar*/
    const handleWebViewLoad = async () => {
      await requeststoragePermission();
      await requestCameraPermission();
      await requestLocationPermission();
      const newVersion = await getNewVersion();
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

    const onNavigationStateChange = async (event: WebViewNavigation) => {   
      setCanGoBack(event.canGoBack)
    }

    return {
        runFirst,
        webViewRef,
        uri,
        canGoBack,
        update,
        loader,

        setLoader,
        onNavigationStateChange,
        launchAndroidAlert,
        handleWebViewLoad,
        handleBackPress,
        setCanGoBack,
        setUpdate,
        
    }
}
