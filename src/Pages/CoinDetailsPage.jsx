import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../Services/fetchCoinDetails";
import parse from 'html-react-parser';
import { useContext } from "react";
import { fetchCoinHistoricData } from "../Services/fetchCoinHistoricData";
import { CurrencyContext } from "../Context/CurrencyContext";
import MyLoader from "../Components/PageLoader/PageLoader";
import CoinInfoContainer from "../Components/CoinInfo/CoinInfoContainer";
import Alert from "daisyui/components/alert";

function CoinDetailsPage(){

    const {currency} = useContext(CurrencyContext);
    const {coinid} = useParams();
    const { data : detail , isLoading , isError , error } = useQuery({
        queryKey : ['coindetail' , coinid] , 
        queryFn : ()=> fetchCoinDetails(coinid),
        retry: 2,
        retryDelay: 1000,
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    })

    if (isLoading){
        return <MyLoader/>
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    return(
        <>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 w-full flex flex-col items-center mt-6 md:mt-0 border-r-2 border-gray-500 ">
                    <img src={detail?.image?.large} alt={detail?.name} className="h-52 mb-5 "/>

                    <h1 className="text-4xl font-bold mb-5">
                        {detail?.name}
                    </h1>

                    <p className="w-full px-6 py-4 text-justify">
                        {typeof detail?.description?.en === "string"
                            ? parse(detail.description.en)
                            :"No Description Available"}
                    </p>

                    <div className="w-full flex flex-col md:flex-row md:justify-around ">
                        <div className="flex items-center mb-4 md:mb-0">
                            <h2 className="text-xl font-bold ">
                                Rank
                            </h2>
                            <span className="ml-3 text-xl">
                                {detail?.market_cap_rank}
                            </span>
                        </div>
                        <div className="flex items-center mb-4 md:mb-0">
                            <h2 className="text-xl text-yellow-400 font-bold ">
                                Current Price
                            </h2>
                            <span className="ml-3 text-xl">
                                {detail?.market_data.current_price[currency]}
                            </span>
                        </div>
                    </div>

                </div>

                <div className="md:w-2/3 items-center text-center w-full ">
                    <CoinInfoContainer coinid={coinid}/>
                </div>
            </div>

        </>
       
    );
}

export default CoinDetailsPage;