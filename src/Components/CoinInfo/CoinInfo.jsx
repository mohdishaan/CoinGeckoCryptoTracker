import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import Alert from "../Alert/Alert";
import { chartdays } from "../../Helpers/Constants";


function CoinInfo({Historicdata , setdays , setcoininterval , days , currency}){


    function handleDayChange(e){
        const DaysSelected = e.target.options[e.target.selectedIndex].value;
        if(DaysSelected==1){
            setcoininterval('');
        }
        else{
            setcoininterval('daily');
        }
        setdays(e.target.options[e.target.selectedIndex].value);


    }

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


    if(!Historicdata){
        return <Alert message="No Data Available" type='error' />
    }
    return(
        <div className="flex flex-col items-center justify-center mt-6 p-6 w-full ">

        <div className="h-[500px] w-full">
                <Line 
                data={{
                labels : Historicdata.prices.map((coinPrice) => {
                    let date = new Date(coinPrice[0]) ;
                    let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM` ;
                    return days == 1 ?  time : date.toLocaleDateString();
                }) ,
                datasets : [
                   {
                    label : `Price (Past ${days} ${days==1 ? 'Day' : 'Days'}) in ${currency.toUpperCase()}`,
                    data: Historicdata.prices.map(coinPrice => coinPrice[1]),
                    borderColor: "#00ffcc", 
                    backgroundColor: "rgba(0, 255, 204, 0.2)",
                   }
                ]
                }}
                options={{
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius:0
                    }
                }
                
                }}
                />
        </div>


            <div className="flex justify-center mt-5 w-full ">
                <select className="select select-primary w-full max-w-xs" onChange={handleDayChange}>
                    {chartdays.map((day , index)=>{
                        return (
                            <option selected={days == day.value} key={index} value={day.value}> {day.label} </option>
                        )
                    })}
                </select>
            </div> 

        </div>



    )
}
export default CoinInfo;