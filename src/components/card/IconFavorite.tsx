import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomIcon from '../CustomIcon'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
}
export const IconFavorite = ({ style }:Props) => {
    const [favorite, setFavorite] = useState(false);
    return (
        <View style={style}>
            <TouchableOpacity style={styles.touchableStyle} onPress={() => setFavorite(!favorite)}>
                <CustomIcon name={favorite ? 'heart-filled' : 'heart1'} size={25} color={favorite ? '#ff4069' : '#fff'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    touchableStyle:{
       width: 25,
       height: 25, 
    }
});