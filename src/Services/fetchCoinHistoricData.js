import AxiosInstance from "../Helpers/AxiosInstance";

export async function fetchCoinHistoricData(id ,interval,days = 7 , currency = 'usd'){

    try{
        const response = await AxiosInstance.get(`/coins/${id}/market_chart?days=${days}&vs_currency=${currency}&interval=${interval}`);
        
        return response.data;
        
    }
    catch(error){
        console.log(error);
        return null;

    }
}