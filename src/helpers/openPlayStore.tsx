import { Linking } from 'react-native';
import { getEnviroment } from './getEnviroment';

export const openPlayStore = () => {
    const url = getEnviroment("API_ANDROID_URL");
    
    if(url == undefined) return;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
}
