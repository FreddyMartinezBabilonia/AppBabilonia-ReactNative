import React, { useState } from 'react'
import { Linking } from 'react-native';
import WebView from 'react-native-webview'

export const Home = () => {
  const domain = "www-testing.babilonia.pe";
  const [uri, setUri] = useState(`https://${domain}/`);
  return (
    <WebView
      
      source={{uri}}
      cacheEnabled={true}
      
      onOpenWindow={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        const {targetUrl} = nativeEvent;
        /*
        console.log({
          domain: targetUrl,
          isTrue:targetUrl.includes(domain) && !targetUrl.includes("wa.me")
        });
        */
        if (targetUrl.includes(domain) && !targetUrl.includes("wa.me")){
          setUri(targetUrl);
        }else{
          Linking.openURL(targetUrl);
        }

      }}
      
      style={{flex: 1}}
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