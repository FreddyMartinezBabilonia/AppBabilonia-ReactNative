import { api } from '../api';
import { ListingDetail } from '../interfaces';
import { useListingDetailStore } from '../store';

export const useCard = () => {
    
    const id = useListingDetailStore((store) => store.id);

    const getListingDetail = async () => {

        try {
            const response = await api.get<ListingDetail>("/public/listing/detail", {
                params : {
                    id
                }
            });  
            
            return response.data.data;            
        } catch (error) {
            
        }
    }

    return {
        getListingDetail
    }
}
