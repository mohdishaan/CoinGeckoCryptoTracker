import { Route, Routes } from "react-router-dom";
import { lazy  , Suspense} from "react"
import MainLayout from "../../Pages/Layout";
import {Facebook} from "react-content-loader";
import MyLoader from "../PageLoader/PageLoader";
import CustomErrorBoundary from "../CustomErrorBoundary/CustomErrorBoundary";

const Home = lazy(() => import('../../Pages/Home.jsx'));

const CoinDetailsPage = lazy(()=> import('../../Pages/CoinDetailsPage.jsx'))

function Routing(){
    return(
        <CustomErrorBoundary>
            <Routes>
                <Route path="/" element={<MainLayout/>} >
                    <Route index element= {
                        <Suspense fallback= {<MyLoader/>}>
                            <Home/>
                        </Suspense>
                    } />
                    <Route path="/details/:coinid" element={
                        <Suspense fallback= {<MyLoader/>}>
                            <CoinDetailsPage  />
                        </Suspense>
                    } 
                    />
                </Route>
                
            </Routes>
        </CustomErrorBoundary>
    )
}
export default Routing;