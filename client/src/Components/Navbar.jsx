import { Link } from 'react-router-dom'; // {{ edit_1 }}

const Navbar = () => {
    return (
      <div>
          <div className="nav-bar">
              {/* logo div */}
              <div><p className="hospo-logo">hospo</p></div>
              {/* middle buttons nav div  */}
              <div className="nav-bar-1">
                  <Link to="/doctors"><p className="nav-btn">Doctors</p></Link> {/* {{ edit_2 }} */}
                  <p className="nav-btn">About</p>
                  <p className="nav-btn">Our services</p>
                  <p className="nav-btn">Our team</p>
                  <p className="nav-btn">Reviews</p>
                  <p className="nav-btn">Contact</p>
              </div>
              {/* get in touch div */}
              <div>
                  <Link to="/"><button className="get-in-touch">Home</button></Link> {/* {{ edit_3 }} */}
                  <Link to="/delivary"><button className="get-in-touch">Delivery</button></Link> {/* {{ edit_4 }} */}
                  <Link to="/track"><button className="get-in-touch">Track</button></Link> {/* {{ edit_5 }} */}
                  <button className="get-in-touch">Get in touch</button>
              </div>
  
          </div>
      </div>
    )
}
  
export default Navbar
