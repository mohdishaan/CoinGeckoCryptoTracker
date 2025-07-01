import AxiosInstance from "../Helpers/AxiosInstance";

export async function fetchCoinData(page = 1, currency ){

    const perpage = 20 ;
    try{
        const response = await AxiosInstance.get(`/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perpage}&page=${page}`);
        
        return response.data;
        
    }
    catch(error){
        console.log(error);
        
        return null;

    }
}