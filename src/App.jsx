import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './Components/Navbar/Navbar'
import CoinTable from './Components/CoinTable/CoinTable'
import Banner from './Components/Banner/Banner'
import Home from './Pages/Home'
import { CurrencyContext } from './Context/CurrencyContext'
import Routing from './Components/Routing/Routing'

function App() {
  
  const [currency , setcurrency] = useState('usd');
  return (
    <>

      <CurrencyContext.Provider value={{currency , setcurrency}}>
        <Routing/>
      </CurrencyContext.Provider>
    </>
  )
}

export default App
