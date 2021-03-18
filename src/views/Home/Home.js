import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    
      <div className="container-secondary">
        <h1 className="title">MUSIQUILLO</h1>
        <div>
          <Link to="/signup"><button className = "primary">Sign In</button></Link>
          <Link to="/login"><button className = "secondary">Log In</button></Link>
        </div>
      </div>
    
  );
}

export default Home;
