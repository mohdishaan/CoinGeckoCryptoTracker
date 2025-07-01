import AxiosInstance from "../Helpers/AxiosInstance";

export async function fetchCoinDetails(id){

    try{
        const response = await AxiosInstance.get(`/coins/${id}`);
        
        return response.data;
        
    }
    catch(error){
        console.log(error);
        return null;

    }
}