import Home from "./Components/Home"
import "./App.css"
import "./Fonts.css"
import MedCardReg from "./Components/MedCardReg"
import { Route, Routes } from "react-router"
import Doctors from "./Components/Doctors"
import Medcards from "./Components/Medcards"
import Meeting from "./Components/Meeting"
import DeliveryBoy from "./Components/DelivartBoy"
import TrackDelivery from "./Components/Track"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/doctors" element={<Doctors/>}/>
      <Route path="/medcards" element={<Medcards/>}/>
      <Route path="/medcardreg/:doctorId" element={<MedCardReg/>}/>
      <Route path="/meeting/:userid" element={<Meeting/>}/>
      <Route path="/delivary" element={<DeliveryBoy/>}/>
      <Route path="/track" element={<TrackDelivery/>}/>
      </Routes>
  )
}

export default App
