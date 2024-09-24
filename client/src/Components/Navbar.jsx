import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return (
        <div>
        <div className="nav-bar">
            {/* logo div */}
            <Link to="/">
            <div><p className="hospo-logo">hospo</p></div></Link>
            {/* middle buttons nav div  */}
            <div className="nav-bar-1">
                <Link to="/doctors"><p className="nav-btn">Doctors</p></Link>
                <Link to="/error"><p className="nav-btn">About</p></Link>
                <Link to="/error"><p className="nav-btn">Our&nbsp;services</p></Link>
                <Link to="/delivary"><p className="nav-btn">Delivery</p></Link>
                <Link to="/track"><p className="nav-btn">Track</p></Link>
                <Link to="/error"><p className="nav-btn">Contact</p></Link>
                
            </div>
            {/* get in touch div */}
            <div>
                <button className="get-in-touch">Get in touch</button>
            </div>
            </div>
            </div>

    )}
export default Navbar
