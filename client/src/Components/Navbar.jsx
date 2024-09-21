const Navbar = () => {
    return (
      <div>
          <div className="nav-bar">
              {/* logo div */}
              <div><p className="hospo-logo">hospo</p></div>
              {/* middle buttons nav div  */}
              <div className="nav-bar-1">
                  <p className="nav-btn">About</p>
                  <p className="nav-btn">Our services</p>
                  <p className="nav-btn">Our team</p>
                  <p className="nav-btn">Reviews</p>
                  <p className="nav-btn">Contact</p>
              </div>
              {/* get in touch div */}
              <div>
                  <button className="get-in-touch">Get in touch</button>
              </div>
  
          </div>
      </div>
    )
  }
  
  export default Navbar
  