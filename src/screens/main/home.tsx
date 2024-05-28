import React from 'react'
import WebView from 'react-native-webview';
import { useHome } from '../../hooks';
import { LoaderChangePage } from '../../components';

export const Home = () => {

  const {uri, runFirst, webViewRef, loader, onNavigationStateChange, setLoader, handleWebViewLoad } = useHome();
  
  return (
    <>
      { loader && <LoaderChangePage /> }
      <WebView
        containerStyle={{  display: loader ? 'none' : 'flex' }}
        cacheEnabled={true}
        injectedJavaScript={runFirst}
        onLoad={handleWebViewLoad}
        onNavigationStateChange={onNavigationStateChange}
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

        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        originWhitelist={['*']}
        mixedContentMode="always"
        
      />      
    </>
  );
}
