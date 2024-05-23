export interface ModalNativeProps {
    title: string;
    message: string;
    buttons: { text: string; onPress: () => void }[];
}