import Animation from '../assets/animation1.webm';

const Glitch = () => {
  return (
    <div>
      <center className='animation1' >
        <video autoPlay loop muted>
          <source src={Animation} type="video/webm"/>
        </video>
        <p className='line4'>We are working on this site. Thank you for your patience.</p>
        <p className='line4'>Thank you by Team Hospo</p>
      </center>
    </div>
  );
};

export default Glitch;
