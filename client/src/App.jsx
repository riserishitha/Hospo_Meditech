import Home from "./Components/Home"
import "./App.css"
import "./Fonts.css"
import "./Animations.css"
import MedCardReg from "./Components/MedCardReg"
import { Route, Routes } from "react-router"
import Doctors from "./Components/Doctors"
import Meeting from "./Components/Meeting"
import DeliveryBoy from "./Components/DelivartBoy"
import TrackDelivery from "./Components/Track"
import Docmet from "./doctor meet"
import Glitch from "./Components/Glitch"

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
      <Route path="/error" element={<Glitch />} />
    </Routes>
  )
}

export default App
