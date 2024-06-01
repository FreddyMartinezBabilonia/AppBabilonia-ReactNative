import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import CustomIcon from '../CustomIcon'

interface Props {
    style?: StyleProp<ViewStyle>;
}
export const IconCamera = ({ style }: Props) => {
  return (
    <View style={{...styles.container, ...style as any}}>
        <CustomIcon name="camera" size={16} color={"#fff"}/>
        <Text style={styles.text}>7</Text>        
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.85,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    text:{
        color: "#fff",
        fontSize: 11,
        marginLeft: 4,
        fontFamily: "AvenirLTStd-Roman",
    }
});