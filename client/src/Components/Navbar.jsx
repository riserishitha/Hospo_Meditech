import { Link } from 'react-router-dom'; // {{ edit_1 }}

const Navbar = () => {
    return (
      <div>
          <div className="nav-bar flex justify-between items-center p-4 bg-gray-800 text-white">
              {/* logo div */}
              <div><p className="hospo-logo text-2xl font-bold">hospo</p></div>
              {/* middle buttons nav div  */}
              <div className="nav-bar-1 flex space-x-4">
                  <Link to="/doctors"><p className="nav-btn hover:text-blue-400">Doctors</p></Link> {/* {{ edit_2 }} */}
                  <p className="nav-btn hover:text-blue-400">About</p> {/* {{ edit_3 }} */}
                  <p className="nav-btn hover:text-blue-400">Our services</p> {/* {{ edit_4 }} */}
                  <p className="nav-btn hover:text-blue-400">Our team</p> {/* {{ edit_5 }} */}
                  <p className="nav-btn hover:text-blue-400">Reviews</p> {/* {{ edit_6 }} */}
                  <p className="nav-btn hover:text-blue-400">Contact</p> {/* {{ edit_7 }} */}
              </div>
              {/* get in touch div */}
              <div className="flex space-x-2">
                  <Link to="/"><button className="get-in-touch bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Home</button></Link> {/* {{ edit_8 }} */}
                  <Link to="/delivary"><button className="get-in-touch bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Delivery</button></Link> {/* {{ edit_9 }} */}
                  <Link to="/track"><button className="get-in-touch bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Track</button></Link> {/* {{ edit_10 }} */}
                  <button className="get-in-touch bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Get in touch</button> {/* {{ edit_11 }} */}
              </div>
  
          </div>
      </div>
    )
}
  
export default Navbar
