import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel"

function Home() {
  return (
    
      <div className="container-secondary">
        <h1 className="title">MUSIQUILLO</h1>
        <div className ="carousel">
        <h3>How to play</h3>  
        <Carousel/></div>
        
        <div>
          <Link to="/signup"><button className = "primary">Sign In</button></Link>
          <Link to="/login"><button className = "secondary">Log In</button></Link>
        </div>
      </div>
    
  );
}

export default Home;
