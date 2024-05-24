import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

export const LoaderChangePage = () => {
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <>
        <View style={styles.loader}>
          <LottieView
            ref={animationRef}
            source={require("../resources/json/loader.json")}
            style={styles.animateView}
          />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    loader: {
      backgroundColor: "#ffffff",
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    },
    animateView : {
      width: "100%",
      height: "100%",
      flex: 1
    }
});