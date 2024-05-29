import { PermissionsAndroid, Platform } from 'react-native';
import { ModalNative } from '../components';
import { ModalNativeProps } from '../interfaces';
import { openSettings } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

export const usePermissions = () => {
    const requeststoragePermission = async () => {
        
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permiso de guardado requerido',
                        message: 'Esta aplicación necesita acceder a tu guardado',
                        buttonNeutral: 'Preguntar luego',
                        buttonNegative: 'Cancelar',
                        buttonPositive: 'Aceptar',
                    }
                );
                
                if(granted === PermissionsAndroid.RESULTS.GRANTED){
                    return true;
                }else if(granted === PermissionsAndroid.RESULTS.DENIED){
                    return false;
                }else if(granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN){

                    const response = await DeviceInfo.getSystemVersion();
                    if(parseInt(response) >=  10) return;

                    const props:ModalNativeProps = {
                        title: 'Notificación', 
                        message: 'Debe activar los permisos de almacenamiento para continuar', 
                        buttons: [
                          {text: 'Activar', onPress: () => openSettings()},
                        ]
                    }
                    ModalNative(props);                    
                }                
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
      
    const requestCameraPermission = async () => {
        
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Permiso de camara requerido',
                        message: 'Esta aplicación necesita acceder a tu camara',
                        buttonNeutral: 'Preguntar luego',
                        buttonNegative: 'Cancelar',
                        buttonPositive: 'Aceptar',
                    }
                );
                return (granted === PermissionsAndroid.RESULTS.GRANTED) ? true: false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    const requestLocationPermission = async () => {
        
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Permiso de ubicación requerido',
                        message: 'Esta aplicación necesita acceder a tu ubicación',
                        buttonNeutral: 'Preguntar luego',
                        buttonNegative: 'Cancelar',
                        buttonPositive: 'Aceptar',
                    }
                );
                return (granted === PermissionsAndroid.RESULTS.GRANTED) ? true: false
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    return {
        requeststoragePermission,
        requestCameraPermission,
        requestLocationPermission,
    }
}
