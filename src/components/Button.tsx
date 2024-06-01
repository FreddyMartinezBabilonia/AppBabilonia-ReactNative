import React from 'react'
import { ColorValue, GestureResponderEvent, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomIcon from './CustomIcon';

type Style = StyleProp<ViewStyle>;
type StyleText = StyleProp<TextStyle>;
interface Props {
    onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
    textColor?: ColorValue | undefined;
    textAlign?: "center" | "auto" | "left" | "right" | "justify" | undefined;
    textSize?: number | undefined;
    style?: Style;
    styleText?: StyleText;
    content: string | JSX.Element;
    iconName?: string;
    iconColor?: string;
    iconSize?: number;
}

export const Button = ({ onPress, content: nombre, style, styleText, iconName, iconColor, iconSize }: Props) => {
  return (
    <>
        <TouchableOpacity
            activeOpacity={0.9}
            style={style}
            onPress={ onPress }
            >
                { (iconName && iconColor && iconSize) && <CustomIcon name={iconName} size={iconSize} color={iconColor}/>}
                <Text style={styleText}>{ nombre }</Text>
            </TouchableOpacity>
    </>
  )
}