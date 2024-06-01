import React from 'react'
import { StyleSheet, Text, View, StyleProp, ViewStyle,} from 'react-native';
import CustomIcon from '../CustomIcon'

export interface props {
    style?: StyleProp<ViewStyle>;
}
export const IconTypeProperty = ({ style }: props) => {
  return (
    <View style={{...IconTypePropertyStyles.container, ...style as any}}>
        <CustomIcon name='home-2' size={15} color='white' />
        <View>
            <Text style={IconTypePropertyStyles.textProperty}>Casa</Text>
            <Text style={IconTypePropertyStyles.textSale}>en Alquiler</Text>
        </View>
    </View>
  )
}

const IconTypePropertyStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1ba7b6',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        paddingVertical:4,
        paddingHorizontal:8,
        borderRadius:5,
        gap:5,
    },
    textProperty:{
        fontSize:10,
        color:'white',
        fontFamily: "AvenirLTStd-Roman",
    },
    textSale:{
        fontSize:10,
        color:'white',
        fontFamily: "samsungsharpsans-bold",
    }
});