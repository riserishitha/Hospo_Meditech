import Home from "./Components/Home"
import "./App.css"
import "./Fonts.css"
import MedCardReg from "./Components/MedCardReg"
import { Route, Routes } from "react-router"
import Doctors from "./Components/Doctors"
import Meeting from "./Components/Meeting"
import DeliveryBoy from "./Components/DelivartBoy"
import TrackDelivery from "./Components/Track"
import Docmet from "./doctor meet"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/doctors" element={<Doctors/>}/>
      <Route path="/medcardreg/:doctorId" element={<MedCardReg/>}/>
      <Route path="/meeting/:userid" element={<Meeting/>}/>
      <Route path="/delivary" element={<DeliveryBoy/>}/>
      <Route path="/track" element={<TrackDelivery/>}/>
      <Route path="/doc" element={<Docmet/>}/>
    </Routes>
  )
}

export default App
