import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const LoaderChangePage = () => {
  return (
    <>
        <View style={styles.loader}>
            <ActivityIndicator color={"#fff"} size={50} />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    loader: {
      backgroundColor: "#083766",
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    }
});