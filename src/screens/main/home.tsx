import React from 'react'
import WebView from 'react-native-webview';
import { useHome } from '../../hooks';
import { LoaderChangePage } from '../../components';

export const Home = () => {

  const {uri, runFirst, webViewRef, loader, setLoader, handleWebViewLoad, setCanGoBack } = useHome();
  
  return (
    <>
      { loader && <LoaderChangePage /> }
      <WebView
        containerStyle={{  display: loader ? 'none' : 'flex' }}
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
