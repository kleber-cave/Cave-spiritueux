import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";

const BottomNav = ({ onAddClick }) => {
  return (
    <nav className={styles.bottomNav}>
      <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Home</span>
      </NavLink>
      <button className={`${styles.navItem} ${styles.addButton}`} onClick={onAddClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
      <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>About</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
