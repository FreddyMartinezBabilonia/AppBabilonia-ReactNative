import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { getEnviroment } from '../helpers';
import { DownloadFileParams, DownloadParams } from '../interfaces';
import { useLoaderStore } from '../store';

export const useDownload = () => {

    const setLoader = useLoaderStore(state => state.setLoader);

    const API_SERVICE = getEnviroment("API_SERVICE");
    const API_BASE_WEB = getEnviroment("API_BASE_WEB");

    const downloadFile = ({bearer, url, fileName, type, api = API_SERVICE}: DownloadFileParams) => {
        setLoader(true);
        const title = `${fileName}${Math.floor(new Date().getTime() / 1000)}.${type}`;
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        const configfb = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title,
            path: `${dirs.DownloadDir}/${title}`,
          },
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title,
          path: `${dirToSave}/${title}`,
        };
        const configOptions = Platform.select({
          ios: configfb,
          android: configfb,
        });

        const RUTA = `${api}/${url}`;
        RNFetchBlob.config(configOptions || {})
                    .fetch('GET', RUTA, {
                    Authorization : bearer,
                    })
                    .then((res) => {
                    
                        if (Platform.OS === 'ios') {
                            RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                            RNFetchBlob.ios.previewDocument(configfb.path);
                        }
                        if (Platform.OS === 'android') {
                            console.log("file downloaded")      
                        }

                        setLoader(false);
                    })                    
                    .catch((reason:any) => {
                        console.log(reason); 
                        setLoader(false);                       
                    })
    }

    const listings = ({bearer, url}: DownloadParams) => downloadFile({bearer, url, fileName: "Listings", type:"xlsx"});

    const interestedHome = ({bearer, url}: DownloadParams) => downloadFile({bearer, url, fileName: "Interested", type:"xlsx"});

    const interestedDetailListings = ({bearer, url}: DownloadParams) => downloadFile({bearer, url, fileName: "InterestedListingsDetail", type:"xlsx"});

    const interestedDetailProject = ({bearer, url}: DownloadParams) => downloadFile({bearer, url, fileName: "InterestedProyectsDetail", type:"xlsx"});

    const collections = ({bearer, url}: DownloadParams) => downloadFile({bearer, url, fileName: "Colecctions", type:"pdf", api: `https://${API_BASE_WEB}`});

    return{
        listings,
        interestedHome,
        interestedDetailListings,
        interestedDetailProject,
        collections,
    }
}
