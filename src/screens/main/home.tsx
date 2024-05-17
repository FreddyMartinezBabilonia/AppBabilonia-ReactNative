import React from 'react'
import WebView from 'react-native-webview'

export const Home = () => {
  return (
    <WebView 
        source={{ uri: 'https://babilonia.pe/' }} 
        cacheEnabled={true}
        style={{ flex: 1 }} />
  )
}
