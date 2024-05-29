import { useEffect, useRef, useState } from 'react';
import { ModalNative } from '../components';
import { getEnviroment, getNewVersion, openPlayStore } from '../helpers';
import { MessageResponse, ModalNativeProps } from '../interfaces';
import SplashScreen from 'react-native-splash-screen';
import { AppState, BackHandler, Linking, Platform } from 'react-native';
import { WebViewNavigation } from 'react-native-webview';
import { usePermissions, useDownload } from './index';
import { useLoaderStore } from '../store';
import { openSettings } from 'react-native-permissions';


export const useHome = () => {

    const platform  = Platform.OS == 'ios' ? 'ios' : 'android';

    const runFirst = `   
        // cambiar todos los targets _blank por _self
        window.sourceAndroidIos='${platform}';
        document.querySelectorAll("a").forEach((item)=>{
          item.setAttribute("target","_self");
        });
        true;
    `;
    const domain = getEnviroment("API_BASE_WEB");
    
    const webViewRef = useRef<any>(null);
    const [uri, setUri] = useState(`https://${domain}/`)
    const [update, setUpdate] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    
    const loader = useLoaderStore(state => state.loader);
    const setLoader = useLoaderStore(state => state.setLoader);

    const [appState, setAppState] = useState(AppState.currentState);
    const { requeststoragePermission, requestCameraPermission, requestLocationPermission } = usePermissions();
    const { listings, interestedHome, interestedDetailListings, interestedDetailProject, collections } = useDownload()

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
      
      if(event.url.includes('/ar')){
        const responseCameraPermission = await requestCameraPermission();
        const responseLocationPermission = await requestLocationPermission();
        
        if(responseCameraPermission == false || responseLocationPermission == false){          
          const props:ModalNativeProps = {
            title: 'Notificación', 
            message: 'Debe activar los permisos de cámara, ubicación y storage para continuar', 
            buttons: [
              {text: 'Activar', onPress: () => openSettings()},
            ]
          }
          ModalNative(props);          
          webViewRef.current.injectJavaScript(`
            window.history.back();
            window.location.reload();
          `);          
        }                  
      }else{
        setCanGoBack(event.canGoBack)
      }
    }

    const onMessage = async (event: any) => {
      const data:MessageResponse = JSON.parse(event.nativeEvent.data);
      const type = data.type ?? '';
      const bearer = data.bearer ?? '';
      const url = data.url ?? '';
      
      await requeststoragePermission();  

      if(type == 'listings') {
        listings({url, bearer});
      }else if(type == 'interested.home'){
        interestedHome({url, bearer});
      }else if(type == 'interested.detail.listings'){
        interestedDetailListings({url, bearer});
      }else if(type == 'interested.detail.project'){
        interestedDetailProject({url, bearer});
      }else if(type == 'collections'){
        collections({url, bearer});
      }
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
        onMessage,
    }
}
