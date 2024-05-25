import DeviceInfo from 'react-native-device-info';
import { api } from '../api';

export const getNewVersion = async () => {
    const response = await api.get("/public/app_config", {
        params : {
            platform : "android",
            version : DeviceInfo.getBuildNumber()
        }
    });  
    const data = response.data?.data ?? {};
    const newVersion = data.new_version.android ?? false;    

    return newVersion;
}
