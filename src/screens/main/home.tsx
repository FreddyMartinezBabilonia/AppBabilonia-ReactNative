import React, { useEffect, useRef, useState } from 'react'
import { BackHandler, Linking } from 'react-native';
import WebView from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';

export const Home = () => {
  const domain = "www-testing.babilonia.pe";
  const [uri, setUri] = useState(`https://${domain}/`);
  const webViewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  
  const handleWebViewLoad = () => {
    // Ocultar el splash screen cuando el WebView haya cargado
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [canGoBack]);

  return (
    <WebView
      ref={webViewRef}
      source={{uri}}
      cacheEnabled={false}
      onLoad={handleWebViewLoad}
      onOpenWindow={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        const {targetUrl} = nativeEvent;
        /*
        console.log({
          domain: targetUrl,
          isTrue:targetUrl.includes(domain) && !targetUrl.includes("wa.me")
        });
        */
       console.log(targetUrl);
        if (targetUrl.includes(domain) && !targetUrl.includes("wa.me")){
          console.log('open url');
          setUri(targetUrl);
        }else{
          Linking.openURL(targetUrl);
        }

      }}
      
      style={{flex: 1}}
      onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
    />
  );
}
/*
onNavigationStateChange={event => {
        console.log(event);
        if (event.url.includes(domain)) return false;
        Linking.openURL(event.url);
      }}
*/