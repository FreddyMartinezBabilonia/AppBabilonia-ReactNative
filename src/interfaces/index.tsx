import { Region } from 'react-native-maps';
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion';

export * from './listingDetail'
export interface ModalNativeProps {
    title: string;
    message: string;
    buttons: { text: string; onPress: () => void }[];
}
export interface MessageResponse {
    id?:     number;
    bearer?: string;
    url?:    string;
    lat?:    number;
    lng?:    number;
    type?:   'listings' | 'interested.detail.listings' | 'interested.detail.project' | 'interested.home' | 'collections' | 'open-bottom-sheet' | 'show-map' | 'hidden-map';
}

export interface DownloadParams {
    bearer:    string;
    url:       string;
}

export interface DownloadFileParams extends DownloadParams{
    fileName:   string;
    type:       string;
    api?:        string;
}

export interface showMapState{
    show: boolean;
    lat?:  positionType;
    lng?:  positionType;
}

export interface options{
    latitude        :number,
    longitude       :number,
    heading         :number,
    zoom            :number,
    //latitudeDelta   :number,
    //longitudeDelta  :number,
}

export type positionType = number | undefined;

export type headingParam = number | undefined;

export type region = Region | AnimatedMapRegion | undefined;