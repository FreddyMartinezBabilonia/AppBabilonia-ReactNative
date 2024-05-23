import { Alert } from 'react-native';
import { ModalNativeProps } from '../interfaces';
export const ModalNative = (props: ModalNativeProps) => {
    const { title, message, buttons } = props;
    Alert.alert(title, message, buttons);
}
