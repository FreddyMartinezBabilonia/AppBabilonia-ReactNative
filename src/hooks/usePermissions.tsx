import { PermissionsAndroid, Platform } from 'react-native';

export const usePermissions = () => {
    const requeststoragePermission = async () => {
        
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permiso de ubicación requerido',
                        message: 'Esta aplicación necesita acceder a tu ubicación',
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
      
    return {
        requeststoragePermission
    }
}
