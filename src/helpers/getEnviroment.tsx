import Config from "react-native-config";

export const getEnviroment = (path = '') => {
    if(!path || path.length === 0) return '';
    return Config[path];
}
