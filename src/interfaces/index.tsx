export interface ModalNativeProps {
    title: string;
    message: string;
    buttons: { text: string; onPress: () => void }[];
}
export interface MessageResponse {
    id?:     number;
    bearer?: string;
    url?:    string;
    type?:   'listings' | 'interested.detail.listings' | 'interested.detail.project' | 'interested.home' | 'collections' | 'open-bottom-sheet';
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