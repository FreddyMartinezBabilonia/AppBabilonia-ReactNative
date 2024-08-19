import React from 'react'
import WebView from 'react-native-webview';
import { useHome } from '../../hooks';
import { BottomSheetCustom, LoaderChangePage, Map } from '../../components';

export const Home = () => {

  const {uri, runFirst, webViewRef, loader, showMap, onNavigationStateChange, setLoader, handleWebViewLoad, onMessage } = useHome();
  //return()
  
  return (
    <>
      { loader && <LoaderChangePage /> }
      { (showMap.show && showMap.lat && showMap.lng) ?  <Map lat={showMap.lat} lng={showMap.lng} /> : '' }
      <WebView
        containerStyle={{  display: loader ? 'none' : 'flex' }}
        cacheEnabled={true}
        injectedJavaScript={runFirst}
        onLoad={handleWebViewLoad}
        onNavigationStateChange={onNavigationStateChange}
        sharedCookiesEnabled={true}
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
          setTimeout(() => {
            setLoader(nativeEvent.loading);
          }, 250);

        }}

        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        originWhitelist={['*']}
        mixedContentMode="always"
        onMessage={onMessage}
        
      />
    </>
  );
}
