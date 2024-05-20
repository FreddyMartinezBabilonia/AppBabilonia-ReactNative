import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, BackHandler, Linking, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import { api } from '../../api/api';

export const Home = () => {
  const domain = "www-testing.babilonia.pe";
  const [uri, setUri] = useState(`https://${domain}/`);
  const webViewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const handleWebViewLoad = async () => {

    const response = await api.get("/public/app_config");     

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

  useEffect(() => {
    console.log(webViewRef);
  }, [webViewRef])
  
  const runFirst = `   
      // cambiar todos los targets _blank por _self   
      document.querySelectorAll("a").forEach((item)=>{
        item.setAttribute("target","_self");
      });
    `;

  return (
    <>
      {
        loader &&
        (
          <View style={styles.loader}>
              <ActivityIndicator color={"#fff"} size={50} />
          </View>
        )
      }
      <WebView
        containerStyle={{ 
          display: loader ? 'none' : 'flex'
        }}
        cacheEnabled={true}
        injectedJavaScript={runFirst}
        onLoad={handleWebViewLoad}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        ref={webViewRef}
        setSupportMultipleWindows={true}
        source={{uri}}
        style={{flex: 1}}
        onLoadStart={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLoader(nativeEvent.loading);
        }}
        onLoadEnd={(syntheticEvent) => { 
          const { nativeEvent } = syntheticEvent;
          setLoader(nativeEvent.loading);

        }}
      />      
    </>
  );
}

const styles = StyleSheet.create({
    loader: {
      backgroundColor: "#083766",
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    }
});
/*

onOpenWindow={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        const {targetUrl} = nativeEvent;
       
        console.log(targetUrl);
        
        if (targetUrl.includes(domain) && !targetUrl.includes("wa.me")){
          console.log('open url');
          setUri(targetUrl);
        }else{
          Linking.openURL(targetUrl);
        }

      }}  

onNavigationStateChange={event => {
        console.log(event);
        if (event.url.includes(domain)) return false;
        Linking.openURL(event.url);
      }}
*/