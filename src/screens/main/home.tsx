import React, { useState } from 'react'
import WebView from 'react-native-webview'

export const Home = () => {
  const [uri, setUri] = useState("https://www-testing.babilonia.pe/");
  return (
    <WebView 
        source={{ uri }} 
        cacheEnabled={true}
        onOpenWindow={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const { targetUrl } = nativeEvent
          setUri(targetUrl);
          //console.log('Intercepted OpenWindow for', targetUrl)
        }}
        style={{ flex: 1 }} />
  )
}