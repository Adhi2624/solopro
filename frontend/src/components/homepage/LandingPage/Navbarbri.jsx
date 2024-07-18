import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSend, FiMenu, FiX } from "react-icons/fi";
import logo from '../images/Icon.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo">
        <Link className="navbar-brand">
          <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
          <p className="brand-name">SOLOPRO</p>
        </Link>
      </div>
      <button className="toggle-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>
      <div className={`slide-tabs-container ${isMenuOpen ? 'open' : ''}`}>
        <SlideTabs isMenuOpen={isMenuOpen} />
      </div>
      {!isMenuOpen && <div className="top-right-button"><NeumorphismButton /></div>}
    </div>
  );
};

const NeumorphismButton = () => {
  return (
    <Link to="/signUp" className="neumorphism-button">
      <FiSend />
      <span><b>Join Now</b></span>
    </Link>
  );
};

const SlideTabs = ({ isMenuOpen }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="slide-tabs"
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>Storyline</Tab>
      <Tab setPosition={setPosition}>Initiatives</Tab>
      <Tab setPosition={setPosition}>Blogs</Tab>
      {isMenuOpen && <li className="tab-item"><NeumorphismButton /></li>}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="tab-item"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="tab-cursor"
    />
  );
};

export default Navbar;
