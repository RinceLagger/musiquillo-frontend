import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel"
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const FadeInDiv = styled.div`
  animation: 3s ${fadeInAnimation};
`;

function Home() {
  return (
    
      <FadeInDiv className="container-secondary">
        <h1 className="title">MUSIQUILLO</h1>
        <div className ="carousel">
        <h3>How to play</h3>  
        <Carousel/></div>
        
        <div>
          <Link to="/signup"><button className = "primary">Sign Up</button></Link>
          <Link to="/login"><button className = "secondary">Log In</button></Link>
        </div>
      </FadeInDiv>
    
  );
}

export default Home;
