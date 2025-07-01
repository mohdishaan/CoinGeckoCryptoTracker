import { useContext, useState } from "react";
import CoinInfo from "./CoinInfo"
import { CurrencyContext } from "../../Context/CurrencyContext";
import { fetchCoinHistoricData } from "../../Services/fetchCoinHistoricData";
import MyLoader from "../PageLoader/PageLoader";
import Alert from "../Alert/Alert"; 
import { useQuery } from "@tanstack/react-query";

function CoinInfoContainer({coinid} ){

    const {currency} = useContext(CurrencyContext);

    const [days , setdays] = useState(7);

    const [interval , setcoininterval] = useState('daily');

    const {data: Historicdata, isLoading, isError, error } = useQuery({
        queryKey: ['coinhistoricdata', coinid , currency , days],
        queryFn: () => fetchCoinHistoricData(coinid , interval , days , currency),
        retry: 2,
        retryDelay: 1000,
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    });

    if(isLoading){
        return <MyLoader/>
    }

    if(isError){
        return <Alert message='Error Fetching the data' type="error"/>
    }

    return( 
        <>
            <CoinInfo Historicdata={Historicdata} setdays={setdays} setcoininterval={setcoininterval} days={days} currency={currency}/>
        </>
    )
}
export default CoinInfoContainer