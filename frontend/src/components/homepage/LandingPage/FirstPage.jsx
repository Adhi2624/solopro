import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { gsap } from "gsap";
import './FirstPage.css';
import image from '../images/image.svg';
import Timeline from "./Timeline";
import { motion, useScroll } from "framer-motion";
// import navbarr
import Navbar from "../LandingPage/Navbarbri"

import SparklesText from "./magicui/sparkle-text";
import BoxReveal from './Box'
import AnimatedShinyText from './magicui/animatedShinyText'
import Scrambles from './Scrambles'; 
import PricingCards from "./PricingCards";
import TextParallaxContentExample from './Offering';
import Footer from './Footer';
import Lotie from './Lotie';


const FirstPage = () => {
  useEffect(() => {
    const targets = gsap.utils.toArray(".ball");
    const onMouseMove = (e) => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02
      });
    };

    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  
  const { scrollYProgress } = useScroll();

  return (
    <div className="entirePage">
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <div className="ball"></div>
      <Navbar />
      <div id="unleas" className="mx-auto text-center w-75 capablity">
        <img src={image} className="img-fluid" alt="logo" />
        <Scrambles text="Unleash Your Capability" />
        <p className="mt-2" style={{ color: '#C0D2FB' }}>Become an integral part of our thriving and prosperous startup environment.</p>
      </div>
      <SparklesText text="Simplify Your Startup Journey" />
      <Lotie />
      <BoxReveal />
      <AnimatedShinyText />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
  <div className="card-css" style={{ width: '100%', marginBottom: '200px' }}>
    <PricingCards />
  </div>
</div>


      <h1 style={{  background: 'linear-gradient(45deg, #883B94, #C52E65)', WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',marginBottom: '50px',fontSize: '40px',fontWeight: '100',textAlign: 'center',fontStyle:'montserrat'
      }} className="Serviceee">
        Our Carefully Selected Environment offers</h1>
      {/* <TextParallaxContentExample /> */}
      <div className="timeline">
        <h1 style={{  background: 'linear-gradient(45deg, #883B94, #C52E65)', WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',marginBottom: '50px',fontSize: '40px',fontWeight: '100',textAlign: 'center',fontStyle:'montserrat'}}>
          Your Journey
        </h1>
        <Timeline />
      </div>   
      <Footer/>
      <div className="solopro-section">
        <h1 className="solopro-text">SOLOPRO</h1>
      </div>
    </div>
  );
}

export default FirstPage;
